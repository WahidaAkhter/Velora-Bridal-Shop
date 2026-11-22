-- ====================================================================
-- VELORA Luxury Bridal Boutique
-- Migration 005: Server-Validated Orders, Vouchers, & place_order RPC
-- ====================================================================

-- 1. VOUCHERS TABLE
create table if not exists public.vouchers (
  code text primary key,
  type text not null check (type in ('percentage', 'fixed', 'shipping')),
  value numeric(10, 2) not null check (value >= 0),
  min_spend numeric(10, 2) not null default 0 check (min_spend >= 0),
  active boolean not null default true,
  description text,
  created_at timestamptz not null default now()
);

-- Seed vouchers from src/data/vouchers.js
insert into public.vouchers (code, type, value, min_spend, active, description)
values
  ('VELORA20', 'percentage', 20.00, 50.00, true, '20% off luxury bridal gowns'),
  ('SALEOR20', 'percentage', 20.00, 50.00, true, '20% off luxury bridal gowns'),
  ('WELCOME10', 'fixed', 10.00, 30.00, true, '$10 off your first appointment & purchase'),
  ('FREESHIP', 'shipping', 100.00, 0.00, true, 'Complimentary White-Glove Bridal Delivery'),
  ('LUXE100', 'fixed', 100.00, 400.00, true, '$100 off luxury purchases over $400')
on conflict (code) do update set
  type = excluded.type,
  value = excluded.value,
  min_spend = excluded.min_spend,
  active = excluded.active,
  description = excluded.description;

-- Enable RLS on vouchers (validated on server only)
alter table public.vouchers enable row level security;

-- Admin can manage vouchers; public cannot directly read or enumerate vouchers
drop policy if exists "vouchers_admin_all" on public.vouchers;
create policy "vouchers_admin_all"
  on public.vouchers for all
  using (public.is_admin())
  with check (public.is_admin());

-- 2. ORDERS TABLE SCHEMA EXTENSIONS
alter table public.orders add column if not exists order_number text;
alter table public.orders add column if not exists customer_email text;

create unique index if not exists idx_orders_order_number on public.orders(order_number);
create index if not exists idx_orders_customer_email on public.orders(customer_email);

-- Ensure NO client insert/update policies exist for orders or order_items
drop policy if exists "orders_insert_own_or_admin" on public.orders;
drop policy if exists "orders_update_own_or_admin" on public.orders;
drop policy if exists "order_items_insert_own_or_admin" on public.order_items;
drop policy if exists "order_items_update_own_or_admin" on public.order_items;
drop policy if exists "order_items_update_admin" on public.order_items;

-- 3. SERVER-VALIDATED place_order FUNCTION
create or replace function public.place_order(
  items jsonb,
  shipping jsonb,
  shipping_method text default 'std',
  voucher_code text default null,
  payment_method text default 'Cash on Delivery'
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user_id uuid;
  v_customer_email text;
  v_order_id text;
  v_order_number text;
  v_item record;
  v_variant record;
  v_subtotal numeric(10, 2) := 0.00;
  v_discount numeric(10, 2) := 0.00;
  v_shipping numeric(10, 2) := 0.00;
  v_tax numeric(10, 2) := 0.00;
  v_total numeric(10, 2) := 0.00;
  v_shipping_method text := coalesce(lower(trim(shipping_method)), 'std');
  v_clean_voucher text := null;
  v_voucher_rec record;
  v_applied_voucher text := null;
  v_voucher_type text := null;
  v_payment_method text := coalesce(payment_method, 'Cash on Delivery');
  v_payment_status text := 'pending_cod';
begin
  -- Rule check: empty cart
  if items is null or jsonb_typeof(items) <> 'array' or jsonb_array_length(items) = 0 then
    raise exception 'Cart cannot be empty';
  end if;

  -- Generate server order ID and order number
  v_order_id := 'ord-' || gen_random_uuid()::text;
  v_order_number := 'VEL-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(gen_random_uuid()::text, 1, 6));

  -- Identify caller: authenticated user or guest (user_id = null)
  v_user_id := auth.uid();
  v_customer_email := coalesce(
    nullif(trim(shipping->>'email'), ''),
    (select email from auth.users where id = v_user_id)
  );

  -- First pass: row-lock variants, check stock, update inventory, calculate subtotal from server prices
  for v_item in
    select
      (elem->>'variant_id')::text as variant_id,
      sum((elem->>'quantity')::integer)::integer as quantity
    from jsonb_array_elements(items) as elem
    group by (elem->>'variant_id')::text
  loop
    if v_item.variant_id is null or trim(v_item.variant_id) = '' then
      raise exception 'Variant ID is required for each cart item';
    end if;

    if v_item.quantity is null or v_item.quantity <= 0 then
      raise exception 'Quantity must be greater than zero for variant %', v_item.variant_id;
    end if;

    -- Row lock variant with FOR UPDATE
    select
      pv.id,
      pv.product_id,
      pv.name as variant_name,
      pv.price,
      pv.stock,
      p.name as product_name,
      p.image
    into v_variant
    from public.product_variants pv
    join public.products p on p.id = pv.product_id
    where pv.id = v_item.variant_id
    for update of pv;

    if not found then
      raise exception 'Unknown product variant: %', v_item.variant_id;
    end if;

    if v_variant.stock < v_item.quantity then
      raise exception 'Insufficient stock for % (requested: %, available: %)',
        v_variant.product_name || ' (' || v_variant.variant_name || ')',
        v_item.quantity,
        v_variant.stock;
    end if;

    -- Decrement stock inside the transaction
    update public.product_variants
    set stock = stock - v_item.quantity,
        updated_at = now()
    where id = v_item.variant_id;

    -- Accumulate server subtotal (ignoring any client price or client total)
    v_subtotal := v_subtotal + (v_variant.price * v_item.quantity);
  end loop;

  -- Validate Voucher (Server-only validation)
  if voucher_code is not null and trim(voucher_code) <> '' then
    v_clean_voucher := upper(trim(voucher_code));

    select * into v_voucher_rec
    from public.vouchers
    where code = v_clean_voucher;

    if not found then
      raise exception 'Invalid voucher code: %', v_clean_voucher;
    end if;

    if not v_voucher_rec.active then
      raise exception 'Voucher % is no longer active', v_clean_voucher;
    end if;

    if v_subtotal < v_voucher_rec.min_spend then
      raise exception 'Minimum spend of $% required for voucher %', v_voucher_rec.min_spend, v_clean_voucher;
    end if;

    v_applied_voucher := v_clean_voucher;
    v_voucher_type := v_voucher_rec.type;

    if v_voucher_type = 'percentage' then
      v_discount := round((v_subtotal * (v_voucher_rec.value / 100.0)), 2);
    elsif v_voucher_type = 'fixed' then
      v_discount := least(v_subtotal, v_voucher_rec.value);
    elsif v_voucher_type = 'shipping' then
      v_discount := 0.00;
    end if;
  end if;

  -- Shipping Calculation
  -- Standard: $5, free when subtotal >= $100. Priority: $15. Eco: $0. Shipping voucher makes shipping 0.
  if v_shipping_method = 'prio' then
    v_shipping := 15.00;
  elsif v_shipping_method = 'eco' then
    v_shipping := 0.00;
  else
    if v_subtotal >= 100.00 then
      v_shipping := 0.00;
    else
      v_shipping := 5.00;
    end if;
  end if;

  if v_voucher_type = 'shipping' then
    v_shipping := 0.00;
  end if;

  -- Tax: 8% of (subtotal - discount). Shipping is NOT taxed.
  v_tax := round(greatest(0.00, (v_subtotal - v_discount)) * 0.08, 2);

  -- Final Total
  v_total := round(v_subtotal - v_discount + v_shipping + v_tax, 2);

  -- Insert order
  insert into public.orders (
    id,
    order_number,
    user_id,
    customer_email,
    status,
    payment_method,
    payment_status,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    currency,
    shipping_address,
    voucher_code,
    created_at,
    updated_at
  ) values (
    v_order_id,
    v_order_number,
    v_user_id,
    v_customer_email,
    'pending',
    v_payment_method,
    v_payment_status,
    v_subtotal,
    v_discount,
    v_shipping,
    v_tax,
    v_total,
    'USD',
    coalesce(shipping, '{}'::jsonb),
    v_applied_voucher,
    now(),
    now()
  );

  -- Second pass: insert order_items with server-verified prices and details
  for v_item in
    select
      (elem->>'variant_id')::text as variant_id,
      sum((elem->>'quantity')::integer)::integer as quantity
    from jsonb_array_elements(items) as elem
    group by (elem->>'variant_id')::text
  loop
    select
      pv.id,
      pv.product_id,
      pv.name as variant_name,
      pv.price,
      p.name as product_name,
      coalesce(p.image, '') as image
    into v_variant
    from public.product_variants pv
    join public.products p on p.id = pv.product_id
    where pv.id = v_item.variant_id;

    insert into public.order_items (
      order_id,
      product_id,
      variant_id,
      name,
      variant_name,
      price,
      quantity,
      image,
      created_at
    ) values (
      v_order_id,
      v_variant.product_id,
      v_variant.id,
      v_variant.product_name,
      v_variant.variant_name,
      v_variant.price,
      v_item.quantity,
      v_variant.image,
      now()
    );
  end loop;

  -- Return complete order summary to caller
  return jsonb_build_object(
    'order_id', v_order_id,
    'order_number', v_order_number,
    'subtotal', v_subtotal,
    'discount', v_discount,
    'shipping', v_shipping,
    'tax', v_tax,
    'total', v_total,
    'status', 'pending',
    'payment_status', v_payment_status
  );
end;
$$;

-- Grant execution to authenticated users and anonymous visitors (guest checkout)
grant execute on function public.place_order(jsonb, jsonb, text, text, text) to authenticated, anon;
