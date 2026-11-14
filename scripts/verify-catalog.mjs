/**
 * VELORA Luxury Bridal Boutique
 * Catalog Verification Script (scripts/verify-catalog.mjs)
 * 
 * - Loads products and embedded variants from Supabase using the read-only publishable key (.env.local)
 * - Maps every database row using mapRowToProduct()
 * - Deep-compares all 298 products and 1462 variants against PRODUCTS from src/data/products.js
 * - Prints a list of every field difference grouped by field name
 * - Target: Zero differences
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import { PRODUCTS } from '../src/data/products.js';
import { mapRowToProduct } from '../src/services/productsService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to parse key-value pairs from .env.local
function loadEnvLocal() {
  const envPath = path.join(rootDir, '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error(`[Verify Error] .env.local not found at: ${envPath}`);
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

async function verifyCatalog() {
  console.log('========================================================');
  console.log('VELORA Luxury Bridal - Catalog Deep Verification');
  console.log('Target: Exact parity (0 differences) against local PRODUCTS');
  console.log('========================================================\n');

  const env = loadEnvLocal();
  const rawUrl = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL;
  const rawKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!rawUrl || !rawKey) {
    console.error('[Verify Error] Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env.local');
    process.exit(1);
  }

  const supabaseUrl = rawUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
  const publishableKey = rawKey.trim();

  console.log(`Connecting to: ${supabaseUrl}`);
  console.log(`Publishable Key set: ${Boolean(publishableKey)}\n`);

  // Initialize read-only client
  const supabase = createClient(supabaseUrl, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  // Fetch all rows from Supabase with embedded variants
  console.log('Fetching live catalog from Supabase...');
  const pageSize = 500;
  let from = 0;
  let allRows = [];
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_variants (*)
      `)
      .order('sort_order', { ascending: true })
      .range(from, from + pageSize - 1);

    if (error) {
      console.error('[Verify Error] Query failed:', error.message);
      process.exit(1);
    }

    if (data && data.length > 0) {
      allRows = allRows.concat(data);
      if (data.length < pageSize) hasMore = false;
      else from += pageSize;
    } else {
      hasMore = false;
    }
  }

  console.log(`Retrieved ${allRows.length} products from database.\n`);

  // Build local reference deduplicated by ID
  const localMap = new Map();
  for (const item of PRODUCTS) {
    if (item && item.id && !localMap.has(item.id)) {
      localMap.set(item.id, item);
    }
  }
  const localProducts = Array.from(localMap.values());
  const localVariantsCount = localProducts.reduce((sum, p) => sum + (p.variants?.length || 0), 0);

  const mappedProducts = allRows.map(mapRowToProduct);
  const dbVariantsCount = mappedProducts.reduce((sum, p) => sum + (p.variants?.length || 0), 0);

  console.log(`Catalog Totals Check:`);
  console.log(`  Products : DB = ${mappedProducts.length} | Local = ${localProducts.length} (${mappedProducts.length === localProducts.length ? 'PASS' : 'FAIL'})`);
  console.log(`  Variants : DB = ${dbVariantsCount} | Local = ${localVariantsCount} (${dbVariantsCount === localVariantsCount ? 'PASS' : 'FAIL'})\n`);

  // Deep comparison
  const dbMap = new Map(mappedProducts.map(p => [p.id, p]));
  const differencesByField = new Map();

  function recordDiff(field, productId, details) {
    if (!differencesByField.has(field)) {
      differencesByField.set(field, []);
    }
    differencesByField.get(field).push({ productId, details });
  }

  for (let idx = 0; idx < localProducts.length; idx++) {
    const local = localProducts[idx];
    const dbProduct = dbMap.get(local.id);

    if (!dbProduct) {
      recordDiff('_missing_product', local.id, 'Product missing from database');
      continue;
    }

    // Verify sort order matches original index
    if (mappedProducts[idx]?.id !== local.id) {
      recordDiff('sort_order', local.id, `Index mismatch at position ${idx}: expected ${local.id}, got ${mappedProducts[idx]?.id}`);
    }

    const localKeys = Object.keys(local).sort();
    const dbKeys = Object.keys(dbProduct).sort();

    // Missing keys in DB
    const missingKeys = localKeys.filter(k => !(k in dbProduct));
    for (const mk of missingKeys) {
      recordDiff(mk, local.id, `Missing key in DB (local value: ${JSON.stringify(local[mk])})`);
    }

    // Extra keys in DB
    const extraKeys = dbKeys.filter(k => !(k in local));
    for (const ek of extraKeys) {
      recordDiff(ek, local.id, `Extra key in DB (value: ${JSON.stringify(dbProduct[ek])})`);
    }

    // Value comparisons
    for (const key of localKeys) {
      if (key in dbProduct) {
        const valLocal = JSON.stringify(local[key]);
        const valDb = JSON.stringify(dbProduct[key]);
        if (valLocal !== valDb) {
          recordDiff(key, local.id, `Value mismatch: local=${valLocal} vs db=${valDb}`);
        }
      }
    }
  }

  // Print Report
  console.log('========================================================');
  console.log('FIELD DIFFERENCES REPORT');
  console.log('========================================================');

  if (differencesByField.size === 0) {
    console.log('\n>>> SUCCESS: ZERO DIFFERENCES FOUND! <<<');
    console.log(`All ${localProducts.length} products and ${localVariantsCount} variants match the local catalog with 100% precision.\n`);
    process.exit(0);
  } else {
    console.log(`\nFound differences across ${differencesByField.size} fields:\n`);
    for (const [field, diffs] of differencesByField.entries()) {
      console.log(`Field "${field}": ${diffs.length} product(s) differing`);
      diffs.slice(0, 3).forEach(({ productId, details }) => {
        console.log(`  - [${productId}]: ${details}`);
      });
      if (diffs.length > 3) {
        console.log(`  ... and ${diffs.length - 3} more`);
      }
      console.log('');
    }
    process.exit(1);
  }
}

// Notice: user requested not to run this automatically.
verifyCatalog().catch(err => {
  console.error('[Fatal Error]:', err.message);
  process.exit(1);
});
