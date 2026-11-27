-- 007_member_tier.sql
-- Computes VELORA VIP Club / Member since tier on the server from orders and profiles.

create or replace function public.get_my_tier()
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user_id uuid := auth.uid();
  v_is_vip boolean := false;
  v_member_since int;
begin
  if v_user_id is null then
    return null;
  end if;

  select extract(year from p.created_at)::int
    into v_member_since
    from public.profiles p
   where p.id = v_user_id;

  select exists (
    select 1
      from public.orders o
     where o.user_id = v_user_id
       and o.total >= 2500
       and o.status <> 'cancelled'::public.order_status
  )
    into v_is_vip;

  return jsonb_build_object(
    'is_vip', coalesce(v_is_vip, false),
    'member_since', v_member_since
  );
end;
$$;

revoke all on function public.get_my_tier() from public;
grant execute on function public.get_my_tier() to authenticated;
