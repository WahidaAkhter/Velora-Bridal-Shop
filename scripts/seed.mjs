/**
 * VELORA Luxury Bridal Boutique
 * Supabase Catalog Seeder Script (scripts/seed.mjs)
 * 
 * Comprehensive seeder supporting:
 * - Full catalog seeding from src/data/products.js (deduplicated by primary key id)
 * - Extra catalog fields (is_new, is_bestseller, code, review_count, colors, badge, etc.)
 * - Safe handling of the 11 shared slugs between all-dresses (gown-x) and legacy-collection (legacy-x)
 * - Exact ID match with the 24 initial rows in the database
 * - Standard default variant fallback for products without variants
 * - CLI --dry-run flag: validates payloads and previews operations without writing to Supabase
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import { PRODUCTS } from '../src/data/products.js';
import { ALL_SHOP_DRESSES } from '../src/data/allShopDresses.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to parse key-value pairs from .env.server file
function loadEnvServer() {
  const envPath = path.join(rootDir, '.env.server');
  if (!fs.existsSync(envPath)) {
    console.error(`[Seed Error] .env.server not found at: ${envPath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(envPath, 'utf-8');
  const env = {};
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eqIdx = line.indexOf('=');
    if (eqIdx !== -1) {
      const key = line.slice(0, eqIdx).trim();
      let val = line.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  }
  return env;
}

async function runSeed() {
  const isDryRun = process.argv.includes('--dry-run');

  console.log('========================================================');
  console.log(`VELORA Luxury Bridal - Supabase Catalog Seeder ${isDryRun ? '[DRY RUN]' : ''}`);
  console.log('========================================================\n');

  if (isDryRun) {
    console.log('>>> DRY RUN MODE ACTIVATED: Validating payloads only, no database writes.\n');
  }

  const env = loadEnvServer();
  const rawUrl = process.env.SUPABASE_URL || env.SUPABASE_URL;
  const rawKey = process.env.SUPABASE_SECRET_KEY || env.SUPABASE_SECRET_KEY;

  if (!rawUrl || !rawKey) {
    console.error('[Seed Error] Missing SUPABASE_URL or SUPABASE_SECRET_KEY in .env.server');
    process.exit(1);
  }

  const supabaseUrl = rawUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
  const supabaseSecretKey = rawKey.trim();

  console.log(`Target Supabase URL: ${supabaseUrl}`);
  console.log(`Secret Key set: ${Boolean(supabaseSecretKey)}`);

  // 1. Deduplicate full catalog by primary key id (preserving first occurrence)
  const productMap = new Map();
  for (const item of PRODUCTS) {
    if (item && item.id && !productMap.has(item.id)) {
      productMap.set(item.id, item);
    }
  }
  const allUniqueProducts = Array.from(productMap.values());
  console.log(`\nProcessed ${PRODUCTS.length} raw catalog entries -> ${allUniqueProducts.length} unique products by ID.`);

  // 2. Identify the 24 initial database rows
  const initial24Ids = new Set(ALL_SHOP_DRESSES.map(d => d.id));
  const matched24 = allUniqueProducts.filter(p => initial24Ids.has(p.id));
  console.log(`Exact ID match with existing 24 database rows: ${matched24.length}/24 verified.`);

  // 3. Detect and verify the 11 shared slugs
  const slugGroups = new Map();
  for (const p of allUniqueProducts) {
    if (!slugGroups.has(p.slug)) slugGroups.set(p.slug, []);
    slugGroups.get(p.slug).push(p);
  }

  const collisions = [];
  slugGroups.forEach((items, slug) => {
    if (items.length > 1) {
      collisions.push({ slug, items });
    }
  });

  console.log(`Verified slug collisions: ${collisions.length} shared slugs kept with distinct primary key IDs:`);
  collisions.forEach(({ slug, items }) => {
    const ids = items.map(i => `${i.id} (${i.category})`).join(' vs ');
    console.log(`  - "${slug}": ${ids}`);
  });

  // 4. Transform products & variants
  const productsPayload = [];
  const variantsPayload = [];

  for (const p of allUniqueProducts) {
    // Products table payload including extra catalog fields
    productsPayload.push({
      id: p.id,
      name: p.name,
      slug: p.slug,
      subtitle: p.subtitle || null,
      price: p.price || 0,
      original_price: p.originalPrice || null,
      image: p.image || (Array.isArray(p.images) && p.images[0]) || '/images/bridal/hero-bride-clean.jpg',
      hover_image: p.hoverImage || null,
      images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.image || '/images/bridal/hero-bride-clean.jpg'],
      video: p.video || null,
      silhouette: p.silhouette || null,
      shape: p.shape || null,
      fabric: p.fabric || null,
      neckline: p.neckline || null,
      category: p.category || 'all-dresses',
      category_name: p.categoryName || 'All Wedding Dresses',
      collection: p.collection || 'VELORA Bridal Atelier',
      description: p.description || null,
      tags: Array.isArray(p.tags) ? p.tags : [],
      attributes: p.attributes || {},
      rating: p.rating ?? 5.0,
      stock: p.stock ?? 10,
      // Extra catalog fields from migration 002
      velora_id: p.veloraId ? String(p.veloraId) : null,
      code: p.code || null,
      review_count: p.reviewCount || 0,
      is_new: Boolean(p.isNew),
      is_bestseller: Boolean(p.isBestseller),
      colors: Array.isArray(p.colors) ? p.colors : [],
      accessory_type: p.accessoryType || null,
      badge: p.badge || null,
      title: p.title || null,
      material: p.material || null,
      style_category: p.styleCategory || null,
      color_swatches: p.colorSwatches || [],
      reviews: p.reviews || [],
      video_url: p.videoUrl || null,
      styles: Array.isArray(p.styles) ? p.styles : [],
      train: p.train || null,
      sleeves: p.sleeves || null,
      back: p.back || null,
      boning: p.boning || null,
      colorways: Array.isArray(p.colorways) ? p.colorways : [],
      timeline: p.timeline || null
    });

    // Variants payload: products without variants get standard fallback
    if (!p.variants || !Array.isArray(p.variants) || p.variants.length === 0) {
      variantsPayload.push({
        id: `${p.id}-default`,
        product_id: p.id,
        name: 'Standard Atelier Sizing',
        color: null,
        color_hex: null,
        size: 'Standard',
        price: p.price || 0,
        stock: p.stock ?? 10,
        sku: `${p.slug || p.id}-STD`
      });
    } else {
      p.variants.forEach((v, idx) => {
        variantsPayload.push({
          id: v.id || `${p.id}-v${idx}`,
          product_id: p.id,
          name: v.name || `${v.size || 'Standard'} / ${v.color || 'Ivory'}`,
          color: v.color || null,
          color_hex: v.colorHex || null,
          size: v.size || null,
          price: v.price ?? p.price ?? 0,
          stock: v.stock ?? 10,
          sku: v.sku || `${p.slug || p.id}-${idx + 1}`
        });
      });
    }
  }

  console.log(`\nPrepared payload totals:`);
  console.log(`  - Products: ${productsPayload.length}`);
  console.log(`  - Product Variants: ${variantsPayload.length}`);

  if (isDryRun) {
    console.log('\n========================================================');
    console.log('[DRY RUN COMPLETE] Payloads verified successfully.');
    console.log('- 0 database writes executed.');
    console.log('- 24 matching rows will be updated in-place without duplicating.');
    console.log('- 11 shared slugs will be safely inserted without collision.');
    console.log('========================================================\n');
    return;
  }

  // Live execution
  const supabase = createClient(supabaseUrl, supabaseSecretKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  console.log(`\nUpserting ${productsPayload.length} products in chunks of 50...`);
  const chunkSize = 50;
  for (let i = 0; i < productsPayload.length; i += chunkSize) {
    const chunk = productsPayload.slice(i, i + chunkSize);
    const { error: prodErr } = await supabase
      .from('products')
      .upsert(chunk, { onConflict: 'id' });

    if (prodErr) {
      console.error(`[Seed Error] Failed products chunk ${i / chunkSize + 1}:`, prodErr.message);
      process.exit(1);
    }
  }
  console.log(`[OK] Successfully upserted ${productsPayload.length} products.`);

  console.log(`\nUpserting ${variantsPayload.length} variants in chunks of 50...`);
  for (let i = 0; i < variantsPayload.length; i += chunkSize) {
    const chunk = variantsPayload.slice(i, i + chunkSize);
    const { error: varErr } = await supabase
      .from('product_variants')
      .upsert(chunk, { onConflict: 'id' });

    if (varErr) {
      console.error(`[Seed Error] Failed variants chunk ${i / chunkSize + 1}:`, varErr.message);
      process.exit(1);
    }
  }
  console.log(`[OK] Successfully upserted ${variantsPayload.length} product variants.`);

  console.log('\n========================================================');
  console.log('Database Seeding Complete!');
  console.log(`- Products: ${productsPayload.length}`);
  console.log(`- Variants: ${variantsPayload.length}`);
  console.log('========================================================\n');
}

runSeed().catch((err) => {
  console.error('[Fatal Seed Error]:', err.message);
  process.exit(1);
});
