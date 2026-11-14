-- ====================================================================
-- VELORA Luxury Bridal Boutique - 003_product_sort_order.sql
-- Migration: Add sort_order column & neutralize defaults for exact parity
-- ====================================================================

-- 1. Add sort_order column to preserve exact original catalog array order
alter table public.products
  add column if not exists sort_order integer;

create index if not exists idx_products_sort_order on public.products(sort_order);

-- NOTE on making sort_order NOT NULL safely:
-- Once all existing rows have been populated with sort_order by the seeder,
-- you can safely make the column NOT NULL by running:
--   update public.products set sort_order = 0 where sort_order is null;
--   alter table public.products alter column sort_order set not null;

-- 2. Drop NOT NULL constraints & defaults so local catalog entries without
-- these fields can store explicit NULLs instead of falling back to synthetic defaults.
alter table public.products alter column image drop not null;
alter table public.products alter column category_name drop not null;
alter table public.products alter column category_name drop default;
alter table public.products alter column rating drop default;
alter table public.products alter column stock drop default;
alter table public.products alter column review_count drop default;
alter table public.products alter column is_new drop default;
alter table public.products alter column is_bestseller drop default;
alter table public.products alter column colors drop default;
alter table public.products alter column styles drop default;
alter table public.products alter column color_swatches drop default;
alter table public.products alter column reviews drop default;
alter table public.products alter column colorways drop default;
