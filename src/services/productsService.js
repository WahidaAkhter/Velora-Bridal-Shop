/**
 * VELORA Luxury Bridal Boutique
 * Products Service Layer
 * 
 * Interacts with Supabase to fetch products and embedded variants.
 * Maps relational DB rows back to the exact shape of local PRODUCTS entries.
 * Features:
 * - Embedded variants query (`*, product_variants (*)`)
 * - Range pagination to handle 1000+ records cleanly
 * - In-memory and local fallback if Supabase is unconfigured or request fails
 * - Updates catalogStore so all subscribers re-render seamlessly
 * - Dev mode verification logs
 */

import { supabase } from '../lib/supabaseClient.js';
import { setCatalog, getCatalog } from './catalogStore.js';

export const isSupabaseConfigured = Boolean(
  typeof import.meta !== 'undefined' &&
  import.meta.env?.VITE_SUPABASE_URL &&
  import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY
);

/**
 * Maps a database product row with embedded product_variants back to the EXACT
 * shape of the local PRODUCTS entries, omitting any keys whose DB value is null.
 */
export function mapRowToProduct(row) {
  if (!row) return null;

  // 1. Map embedded variants
  let variants = undefined;
  if (Array.isArray(row.product_variants) && row.product_variants.length > 0) {
    variants = row.product_variants.map((v) => {
      const item = {
        id: v.id,
        name: v.name
      };
      if (v.color != null) item.color = v.color;
      if (v.color_hex != null) item.colorHex = v.color_hex;
      if (v.size != null) item.size = v.size;
      if (v.price != null) item.price = Number(v.price);
      if (v.stock != null) item.stock = Number(v.stock);
      if (v.sku != null) item.sku = v.sku;
      return item;
    });
  }

  // 2. Base product shape
  const product = {
    id: row.id,
    name: row.name,
    slug: row.slug
  };

  if (row.subtitle != null) product.subtitle = row.subtitle;
  if (row.price != null) product.price = Number(row.price);
  if (row.original_price != null) product.originalPrice = Number(row.original_price);
  if (row.image != null) product.image = row.image;
  if (row.hover_image != null) product.hoverImage = row.hover_image;
  if (row.images != null) product.images = row.images;
  if (row.video != null) product.video = row.video;
  if (row.silhouette != null) product.silhouette = row.silhouette;
  if (row.shape != null) product.shape = row.shape;
  if (row.fabric != null) product.fabric = row.fabric;
  if (row.neckline != null) product.neckline = row.neckline;
  if (row.category != null) product.category = row.category;
  if (row.category_name != null) product.categoryName = row.category_name;
  if (row.collection != null) product.collection = row.collection;
  if (row.description != null) product.description = row.description;
  if (row.tags != null) product.tags = row.tags;
  if (variants != null) product.variants = variants;
  if (row.attributes != null) product.attributes = row.attributes;

  // 3. Extra catalog fields
  if (row.velora_id != null) product.veloraId = Number(row.velora_id) || row.velora_id;
  if (row.code != null) product.code = row.code;
  if (row.rating != null) product.rating = Number(row.rating);
  if (row.review_count != null) product.reviewCount = Number(row.review_count);
  if (row.is_new != null) product.isNew = Boolean(row.is_new);
  if (row.is_bestseller != null) product.isBestseller = Boolean(row.is_bestseller);
  if (row.stock != null) product.stock = Number(row.stock);
  if (row.colors != null) product.colors = row.colors;
  if (row.accessory_type != null) product.accessoryType = row.accessory_type;
  if (row.badge != null) product.badge = row.badge;
  if (row.title != null) product.title = row.title;
  if (row.material != null) product.material = row.material;
  if (row.style_category != null) product.styleCategory = row.style_category;
  if (row.color_swatches != null) product.colorSwatches = row.color_swatches;
  if (row.reviews != null) product.reviews = row.reviews;
  if (row.video_url != null) product.videoUrl = row.video_url;
  if (row.styles != null) product.styles = row.styles;
  if (row.train != null) product.train = row.train;
  if (row.sleeves != null) product.sleeves = row.sleeves;
  if (row.back != null) product.back = row.back;
  if (row.boning != null) product.boning = row.boning;
  if (row.colorways != null) product.colorways = row.colorways;
  if (row.timeline != null) product.timeline = row.timeline;

  return product;
}

/**
 * Fetches all products with embedded variants from Supabase.
 * Uses range pagination to ensure no rows are truncated.
 * Falls back to local PRODUCTS on failure or missing credentials.
 */
export async function getProducts() {
  if (!supabase || !isSupabaseConfigured) {
    return {
      success: true,
      fromDb: false,
      isConfigured: false,
      data: getCatalog(),
      error: null
    };
  }

  try {
    const pageSize = 500;
    let from = 0;
    let allRows = [];
    let hasMore = true;

    while (hasMore) {
      let query = supabase
        .from('products')
        .select(`
          *,
          product_variants (*)
        `)
        .range(from, from + pageSize - 1);

      try {
        query = query.order('sort_order', { ascending: true });
      } catch {
        // Fallback if sort_order migration not yet applied
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        allRows = allRows.concat(data);
        if (data.length < pageSize) {
          hasMore = false;
        } else {
          from += pageSize;
        }
      } else {
        hasMore = false;
      }
    }

    const mappedProducts = allRows.map(mapRowToProduct);
    const totalVariants = mappedProducts.reduce((sum, p) => sum + (p.variants?.length || 0), 0);

    // Update central catalog store
    setCatalog(mappedProducts);

    // Development verification log
    if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
      console.log(`[VELORA Supabase Verification] Loaded ${mappedProducts.length} products and ${totalVariants} variants from Supabase.`);
    }

    return {
      success: true,
      fromDb: true,
      isConfigured: true,
      data: mappedProducts,
      error: null
    };
  } catch (err) {
    console.warn('[VELORA Catalog] Supabase query failed, using local catalog fallback:', err.message);
    return {
      success: false,
      fromDb: false,
      isConfigured: true,
      data: getCatalog(),
      error: err.message
    };
  }
}

/**
 * Fetches a single product by slug from Supabase.
 * Falls back to local lookup if offline or unconfigured.
 */
export async function getProductBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = String(slug).toLowerCase().trim();

  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_variants (*)
        `)
        .eq('slug', cleanSlug)
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return mapRowToProduct(data[0]);
      }
    } catch (err) {
      console.warn(`[VELORA Catalog] getProductBySlug('${slug}') failed, using local fallback:`, err.message);
    }
  }

  // Local fallback lookup
  return getCatalog().find((p) => String(p.slug).toLowerCase() === cleanSlug) || null;
}
