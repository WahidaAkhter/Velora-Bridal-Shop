-- ====================================================================
-- VELORA Luxury Bridal Boutique - 001_init.sql
-- Complete Supabase Schema Initialization
-- Tables: profiles, products, product_variants, addresses,
--         wishlists, orders, order_items, appointments
-- Includes:
--   - Role checks ('customer', 'admin')
--   - Profiles trigger on auth.users signup
--   - Security definer public.is_admin() helper
--   - Orders status enum and snapshots
--   - Appointments unique constraint on (boutique_location, slot_start)
--   - Strict Row Level Security (RLS) across all tables
-- ====================================================================

-- 1. EXTENSIONS
create extension if not exists "pgcrypto";

-- 2. HELPER FUNCTIONS & TYPES

-- Order status enum
do $$ begin
  create type public.order_status as enum (
    'pending',
    'confirmed',
    'in_production',
    'shipped',
    'delivered',
    'cancelled'
  );
exception
  when duplicate_object then null;
end $$;

-- 3. PROFILES TABLE
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Admin verification security-definer function
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(
    (select role = 'admin' from public.profiles where id = auth.uid()),
    false
  );
$$;

-- Trigger to create profile row automatically when a user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  )
  on conflict (id) do update set
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    phone = coalesce(excluded.phone, public.profiles.phone);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 4. PRODUCTS TABLE (Matching exact shape from allShopDresses.js)
create table if not exists public.products (
  id text primary key,
  name text not null,
  slug text unique not null,
  subtitle text,
  price numeric(10, 2) not null default 0,
  original_price numeric(10, 2),
  image text not null,
  hover_image text,
  images text[] not null default '{}',
  video text,
  silhouette text,
  shape text,
  fabric text,
  neckline text,
  category text not null default 'all-dresses',
  category_name text not null default 'All Wedding Dresses',
  collection text,
  description text,
  tags text[] default '{}',
  attributes jsonb default '{}'::jsonb,
  rating numeric(3, 2) default 5.0,
  stock integer default 10,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_shape on public.products(shape);

-- 5. PRODUCT VARIANTS TABLE
create table if not exists public.product_variants (
  id text primary key,
  product_id text not null references public.products(id) on delete cascade,
  name text not null,
  color text,
  color_hex text,
  size text,
  price numeric(10, 2) not null default 0,
  stock integer not null default 0,
  sku text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_product_variants_product_id on public.product_variants(product_id);

-- 6. ADDRESSES TABLE
create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text default 'Primary Residence',
  is_default boolean default false,
  first_name text not null,
  last_name text not null,
  street text not null,
  city text not null,
  state text not null,
  zip text not null,
  country text not null default 'United States',
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_addresses_user_id on public.addresses(user_id);

-- 7. WISHLISTS TABLE
create table if not exists public.wishlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint uq_wishlists_user_product unique (user_id, product_id)
);

create index if not exists idx_wishlists_user_id on public.wishlists(user_id);

-- 8. ORDERS TABLE
create table if not exists public.orders (
  id text primary key,
  user_id uuid references auth.users(id) on delete set null,
  status public.order_status not null default 'pending',
  payment_method text not null default 'Credit Card',
  payment_status text not null default 'paid',
  subtotal numeric(10, 2) not null default 0,
  discount numeric(10, 2) not null default 0,
  shipping numeric(10, 2) not null default 0,
  tax numeric(10, 2) not null default 0,
  total numeric(10, 2) not null default 0,
  currency text not null default 'USD',
  shipping_address jsonb not null default '{}'::jsonb,
  tracking_number text,
  carrier text,
  estimated_delivery text,
  voucher_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_orders_status on public.orders(status);

-- 9. ORDER ITEMS TABLE
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id text not null references public.orders(id) on delete cascade,
  product_id text references public.products(id) on delete set null,
  variant_id text references public.product_variants(id) on delete set null,
  name text not null,
  variant_name text,
  price numeric(10, 2) not null default 0,
  quantity integer not null default 1 check (quantity > 0),
  image text,
  created_at timestamptz not null default now()
);

create index if not exists idx_order_items_order_id on public.order_items(order_id);

-- 10. APPOINTMENTS TABLE
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  boutique_location text not null default 'VELORA Atelier Flagship, New York',
  slot_start timestamptz not null,
  service text not null default 'Signature Bridal Gown Consultation',
  wedding_date date,
  stylist text default 'Chloe Laurent (Master Bridal Stylist)',
  status text not null default 'Confirmed' check (status in ('Confirmed', 'Cancelled', 'Completed')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint uq_appointments_location_slot unique (boutique_location, slot_start)
);

create index if not exists idx_appointments_user_id on public.appointments(user_id);
create index if not exists idx_appointments_slot on public.appointments(boutique_location, slot_start);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- Enable RLS on EVERY table
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.addresses enable row level security;
alter table public.wishlists enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.appointments enable row level security;

-- PROFILES RLS
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "profiles_insert_own_or_admin"
  on public.profiles for insert
  with check (auth.uid() = id or public.is_admin());

create policy "profiles_update_own_or_admin"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

create policy "profiles_delete_admin"
  on public.profiles for delete
  using (public.is_admin());

-- PRODUCTS RLS: Public read, Admin write
create policy "products_public_select"
  on public.products for select
  using (true);

create policy "products_admin_insert"
  on public.products for insert
  with check (public.is_admin());

create policy "products_admin_update"
  on public.products for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "products_admin_delete"
  on public.products for delete
  using (public.is_admin());

-- PRODUCT VARIANTS RLS: Public read, Admin write
create policy "product_variants_public_select"
  on public.product_variants for select
  using (true);

create policy "product_variants_admin_insert"
  on public.product_variants for insert
  with check (public.is_admin());

create policy "product_variants_admin_update"
  on public.product_variants for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "product_variants_admin_delete"
  on public.product_variants for delete
  using (public.is_admin());

-- ADDRESSES RLS: Own rows or Admin
create policy "addresses_select_own_or_admin"
  on public.addresses for select
  using (auth.uid() = user_id or public.is_admin());

create policy "addresses_insert_own_or_admin"
  on public.addresses for insert
  with check (auth.uid() = user_id or public.is_admin());

create policy "addresses_update_own_or_admin"
  on public.addresses for update
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

create policy "addresses_delete_own_or_admin"
  on public.addresses for delete
  using (auth.uid() = user_id or public.is_admin());

-- WISHLISTS RLS: Own rows or Admin
create policy "wishlists_select_own_or_admin"
  on public.wishlists for select
  using (auth.uid() = user_id or public.is_admin());

create policy "wishlists_insert_own_or_admin"
  on public.wishlists for insert
  with check (auth.uid() = user_id or public.is_admin());

create policy "wishlists_delete_own_or_admin"
  on public.wishlists for delete
  using (auth.uid() = user_id or public.is_admin());

-- ORDERS RLS: Own rows or Admin
create policy "orders_select_own_or_admin"
  on public.orders for select
  using (auth.uid() = user_id or public.is_admin());

create policy "orders_insert_own_or_admin"
  on public.orders for insert
  with check (auth.uid() = user_id or public.is_admin());

create policy "orders_update_own_or_admin"
  on public.orders for update
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

create policy "orders_delete_admin"
  on public.orders for delete
  using (public.is_admin());

-- ORDER ITEMS RLS: Matching Order owner or Admin
create policy "order_items_select_own_or_admin"
  on public.order_items for select
  using (
    public.is_admin() or
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and o.user_id = auth.uid()
    )
  );

create policy "order_items_insert_own_or_admin"
  on public.order_items for insert
  with check (
    public.is_admin() or
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and o.user_id = auth.uid()
    )
  );

create policy "order_items_update_admin"
  on public.order_items for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "order_items_delete_admin"
  on public.order_items for delete
  using (public.is_admin());

-- APPOINTMENTS RLS: Own rows or Admin
create policy "appointments_select_own_or_admin"
  on public.appointments for select
  using (auth.uid() = user_id or public.is_admin());

create policy "appointments_insert_own_or_admin"
  on public.appointments for insert
  with check (auth.uid() = user_id or public.is_admin());

create policy "appointments_update_own_or_admin"
  on public.appointments for update
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

create policy "appointments_delete_admin"
  on public.appointments for delete
  using (public.is_admin());

