-- ====================================================================
-- VELORA Luxury Bridal Boutique - 002_catalog_fields.sql
-- Migration: Drop UNIQUE constraint on slug & Add Extra Catalog Fields
-- ====================================================================

-- 1. Drop UNIQUE constraint on products.slug (to support legacy & all-dresses duplicates)
alter table public.products drop constraint if exists products_slug_key;

-- 2. Ensure a normal non-unique index on slug exists for fast lookups
drop index if exists idx_products_slug;
create index if not exists idx_products_slug on public.products(slug);

-- 3. Add extra catalog fields found across the comprehensive product catalog
alter table public.products
  add column if not exists velora_id text,
  add column if not exists code text,
  add column if not exists review_count integer default 0,
  add column if not exists is_new boolean default false,
  add column if not exists is_bestseller boolean default false,
  add column if not exists colors text[] default '{}',
  add column if not exists accessory_type text,
  add column if not exists badge text,
  add column if not exists title text,
  add column if not exists material text,
  add column if not exists style_category text,
  add column if not exists color_swatches jsonb default '[]'::jsonb,
  add column if not exists reviews jsonb default '[]'::jsonb,
  add column if not exists video_url text,
  add column if not exists styles text[] default '{}',
  add column if not exists train text,
  add column if not exists sleeves text,
  add column if not exists back text,
  add column if not exists boning text,
  add column if not exists colorways text[] default '{}',
  add column if not exists timeline text;

