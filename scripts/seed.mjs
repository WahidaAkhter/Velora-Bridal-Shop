/**
 * VELORA Luxury Bridal Boutique
 * Supabase Catalog Seeder Script (scripts/seed.mjs)
 * 
 * Reads bridal gowns from src/data/allShopDresses.js
 * Inserts products and variants into Supabase using SUPABASE_URL and SUPABASE_SECRET_KEY from .env.server.
 * Products without variants automatically receive the standard default variant fallback.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
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
      // Remove surrounding quotes if present
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  }
  return env;
}

async function runSeed() {
  console.log('========================================================');
  console.log('VELORA Luxury Bridal - Supabase Catalog Seeder');
  console.log('========================================================\n');

  const env = loadEnvServer();
  const rawUrl = process.env.SUPABASE_URL || env.SUPABASE_URL;
  const rawKey = process.env.SUPABASE_SECRET_KEY || env.SUPABASE_SECRET_KEY;

  if (!rawUrl || !rawKey) {
    console.error('[Seed Error] Missing SUPABASE_URL or SUPABASE_SECRET_KEY in .env.server');
    process.exit(1);
  }

  // Sanitize URL: strip trailing /rest/v1 and trailing slashes
  const supabaseUrl = rawUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
  const supabaseSecretKey = rawKey.trim();

  console.log(`Connecting to Supabase at: ${supabaseUrl}`);
  console.log(`Using Secret Key: ${supabaseSecretKey.slice(0, 15)}...`);

  // Initialize Supabase admin client with secret/service role key
  const supabase = createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  const dresses = ALL_SHOP_DRESSES;
  console.log(`\nFound ${dresses.length} bridal gowns in src/data/allShopDresses.js.`);

  const productsPayload = [];
  const variantsPayload = [];

  for (const dress of dresses) {
    // 1. Prepare product payload matching exact schema
    productsPayload.push({
      id: dress.id,
      name: dress.name,
      slug: dress.slug,
      subtitle: dress.subtitle || null,
      price: dress.price || 0,
      original_price: dress.originalPrice || null,
      image: dress.image,
      hover_image: dress.hoverImage || null,
      images: Array.isArray(dress.images) && dress.images.length > 0 ? dress.images : [dress.image],
      video: dress.video || null,
      silhouette: dress.silhouette || null,
      shape: dress.shape || null,
      fabric: dress.fabric || null,
      neckline: dress.neckline || null,
      category: dress.category || 'all-dresses',
      category_name: dress.categoryName || 'All Wedding Dresses',
      collection: dress.collection || 'VELORA Bridal Atelier',
      description: dress.description || null,
      tags: Array.isArray(dress.tags) ? dress.tags : [],
      attributes: dress.attributes || {},
      rating: dress.rating ?? 5.0,
      stock: dress.stock ?? 10
    });

    // 2. Prepare variants payload
    // Products without variants receive one default variant, matching current AppContext fallback
    if (!dress.variants || !Array.isArray(dress.variants) || dress.variants.length === 0) {
      variantsPayload.push({
        id: `${dress.id}-default`,
        product_id: dress.id,
        name: 'Standard Atelier Sizing',
        color: null,
        color_hex: null,
        size: 'Standard',
        price: dress.price || 0,
        stock: dress.stock ?? 10,
        sku: `${dress.slug || dress.id}-STD`
      });
    } else {
      dress.variants.forEach((v, idx) => {
        variantsPayload.push({
          id: v.id || `${dress.id}-v${idx}`,
          product_id: dress.id,
          name: v.name || `${v.size || 'Standard'} / ${v.color || 'Ivory'}`,
          color: v.color || null,
          color_hex: v.colorHex || null,
          size: v.size || null,
          price: v.price ?? dress.price ?? 0,
          stock: v.stock ?? 10,
          sku: v.sku || `${dress.slug || dress.id}-${idx + 1}`
        });
      });
    }
  }

  // 3. Upsert products in chunks of 50
  console.log(`\nUpserting ${productsPayload.length} products into 'products' table...`);
  const chunkSize = 50;
  for (let i = 0; i < productsPayload.length; i += chunkSize) {
    const chunk = productsPayload.slice(i, i + chunkSize);
    const { error: prodErr } = await supabase
      .from('products')
      .upsert(chunk, { onConflict: 'id' });

    if (prodErr) {
      console.error(`[Seed Error] Failed to upsert products chunk ${i / chunkSize + 1}:`, prodErr.message);
      process.exit(1);
    }
  }
  console.log(`[OK] Successfully upserted ${productsPayload.length} products.`);

  // 4. Upsert variants in chunks of 50
  console.log(`\nUpserting ${variantsPayload.length} variants into 'product_variants' table...`);
  for (let i = 0; i < variantsPayload.length; i += chunkSize) {
    const chunk = variantsPayload.slice(i, i + chunkSize);
    const { error: varErr } = await supabase
      .from('product_variants')
      .upsert(chunk, { onConflict: 'id' });

    if (varErr) {
      console.error(`[Seed Error] Failed to upsert variants chunk ${i / chunkSize + 1}:`, varErr.message);
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

