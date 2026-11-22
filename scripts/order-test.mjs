/**
 * VELORA Luxury Bridal Boutique
 * Supabase Server-Validated Orders Automated Test Script
 * (scripts/order-test.mjs)
 * 
 * Tests:
 *  [1] Tampered price is ignored: client sending price: 0.01 is ignored, server uses product_variants price.
 *  [2] Tampered total is ignored: client sending fake total is ignored, server calculates exact subtotal, tax, shipping, total.
 *  [3] Quantity 0 is rejected: place_order rejects non-positive quantities.
 *  [4] Invalid voucher is rejected: place_order rejects unknown or inactive vouchers.
 *  [5] Stock is not oversold: ordering more than available stock is rejected and stock remains safe.
 *  [6] Guest cannot read other users' orders: RLS blocks anon and User B from selecting User A's orders.
 * 
 * Cleans up created test orders and restores variant stock.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function loadEnvFile(fileName) {
  const filePath = path.join(rootDir, fileName);
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf-8');
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

async function runOrderTestSuite() {
  console.log('================================================================');
  console.log('VELORA Step 2.4 Server-Validated Orders Test Suite');
  console.log('================================================================\n');

  const envLocal = loadEnvFile('.env.local');
  const envServer = loadEnvFile('.env.server');

  const supabaseUrl = envLocal.VITE_SUPABASE_URL || envServer.SUPABASE_URL;
  const publishableKey = envLocal.VITE_SUPABASE_PUBLISHABLE_KEY || envLocal.VITE_SUPABASE_ANON_KEY;
  const secretKey = envServer.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !publishableKey) {
    console.error('[Configuration Error] Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env.local');
    process.exit(1);
  }

  // 1. Create anonymous client (guest)
  const clientAnon = createClient(supabaseUrl, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  // 2. Create User A and User B clients
  const clientUserA = createClient(supabaseUrl, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  const clientUserB = createClient(supabaseUrl, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  // 3. Optional Admin client for cleanup
  const clientAdmin = secretKey
    ? createClient(supabaseUrl, secretKey, {
        auth: { persistSession: false, autoRefreshToken: false }
      })
    : null;

  const timestamp = Date.now();
  const domain = envServer.TEST_EMAIL_DOMAIN || 'example.com';
  const emailA = `test-order-a-${timestamp}@${domain}`;
  const emailB = `test-order-b-${timestamp}@${domain}`;
  const testPassword = `VeloraOrder#${timestamp}!`;

  let userAId = null;
  let userBId = null;
  const createdOrderIds = [];
  let testVariant = null;
  let initialStock = 0;
  let stockDecrementedTotal = 0;

  const testResults = [];

  const recordResult = (id, name, passed, detail) => {
    testResults.push({ id, name, passed, detail });
    const tag = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`[${tag}] Test [${id}]: ${name}`);
    if (detail) {
      console.log(`       Detail: ${detail}`);
    }
  };

  try {
    // -------------------------------------------------------------
    // Setup Test Users
    // -------------------------------------------------------------
    console.log(`Signing up test User A (${emailA})...`);
    const { data: signA, error: errA } = await clientUserA.auth.signUp({
      email: emailA,
      password: testPassword,
      options: { data: { full_name: 'Test Bride Order A' } }
    });
    if (errA) throw new Error(`User A signup failed: ${errA.message}`);
    userAId = signA.user?.id;

    console.log(`Signing up test User B (${emailB})...`);
    const { data: signB, error: errB } = await clientUserB.auth.signUp({
      email: emailB,
      password: testPassword,
      options: { data: { full_name: 'Test Bride Order B' } }
    });
    if (errB) throw new Error(`User B signup failed: ${errB.message}`);
    userBId = signB.user?.id;

    // -------------------------------------------------------------
    // Find a real test variant
    // -------------------------------------------------------------
    const { data: variants, error: varErr } = await clientAnon
      .from('product_variants')
      .select('id, price, stock, product_id')
      .gt('stock', 5)
      .limit(1);

    if (varErr || !variants || variants.length === 0) {
      throw new Error(`Failed to find available product variant for test: ${varErr?.message || 'No variants with stock > 5'}`);
    }
    testVariant = variants[0];
    initialStock = testVariant.stock;
    console.log(`Using test variant '${testVariant.id}' (Server Price: $${testVariant.price}, Initial Stock: ${initialStock})\n`);

    const standardShipping = {
      firstName: 'Eleanor',
      lastName: 'Vance',
      street: '742 Evergreen Terrace',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      country: 'United States',
      email: emailA
    };

    // -------------------------------------------------------------
    // Test 1: Tampered price is ignored
    // -------------------------------------------------------------
    console.log('--- Running Test 1: Tampered Price Immunity ---');
    const { data: order1Data, error: order1Err } = await clientUserA.rpc('place_order', {
      items: [
        {
          variant_id: testVariant.id,
          quantity: 1,
          price: 0.01 // Tampered price attempt: $0.01 instead of actual price
        }
      ],
      shipping: standardShipping,
      shipping_method: 'std',
      payment_method: 'Cash on Delivery'
    });

    if (order1Err) {
      recordResult('1', 'Tampered price is ignored', false, `RPC returned error: ${order1Err.message}`);
    } else {
      createdOrderIds.push(order1Data.order_id);
      stockDecrementedTotal += 1;
      const expectedSubtotal = parseFloat(testVariant.price);
      const returnedSubtotal = parseFloat(order1Data.subtotal);
      const passed = Math.abs(returnedSubtotal - expectedSubtotal) < 0.01;
      recordResult(
        '1',
        'Tampered price is ignored (server uses product_variants price)',
        passed,
        `Client sent $0.01. Server calculated subtotal: $${returnedSubtotal} (Expected: $${expectedSubtotal})`
      );
    }

    // -------------------------------------------------------------
    // Test 2: Tampered total is ignored
    // -------------------------------------------------------------
    console.log('\n--- Running Test 2: Tampered Total Immunity ---');
    const { data: order2Data, error: order2Err } = await clientUserA.rpc('place_order', {
      items: [
        {
          variant_id: testVariant.id,
          quantity: 1,
          total: 1.00 // Tampered total attempt
        }
      ],
      shipping: standardShipping,
      shipping_method: 'std',
      payment_method: 'Cash on Delivery'
    });

    if (order2Err) {
      recordResult('2', 'Tampered total is ignored', false, `RPC returned error: ${order2Err.message}`);
    } else {
      createdOrderIds.push(order2Data.order_id);
      stockDecrementedTotal += 1;
      const subtotal = parseFloat(order2Data.subtotal);
      const discount = parseFloat(order2Data.discount);
      const shipping = parseFloat(order2Data.shipping);
      const tax = parseFloat(order2Data.tax);
      const expectedTotal = parseFloat((subtotal - discount + shipping + tax).toFixed(2));
      const returnedTotal = parseFloat(order2Data.total);
      const passed = Math.abs(returnedTotal - expectedTotal) < 0.01;
      recordResult(
        '2',
        'Tampered total is ignored (server computes exact subtotal + shipping + tax)',
        passed,
        `Server total: $${returnedTotal} matches formula ($${subtotal} - $${discount} + $${shipping} + $${tax} = $${expectedTotal})`
      );
    }

    // -------------------------------------------------------------
    // Test 3: Quantity 0 is rejected
    // -------------------------------------------------------------
    console.log('\n--- Running Test 3: Non-Positive Quantity Guard ---');
    const { data: order3Data, error: order3Err } = await clientUserA.rpc('place_order', {
      items: [
        {
          variant_id: testVariant.id,
          quantity: 0
        }
      ],
      shipping: standardShipping,
      shipping_method: 'std'
    });

    const qtyRejected = Boolean(order3Err) && !order3Data;
    recordResult(
      '3',
      'Quantity 0 is rejected',
      qtyRejected,
      qtyRejected
        ? `Correctly rejected: ${order3Err.message}`
        : 'Security breach: Order with quantity 0 was accepted'
    );

    // -------------------------------------------------------------
    // Test 4: Invalid voucher is rejected
    // -------------------------------------------------------------
    console.log('\n--- Running Test 4: Invalid Voucher Guard ---');
    const { data: order4Data, error: order4Err } = await clientUserA.rpc('place_order', {
      items: [
        {
          variant_id: testVariant.id,
          quantity: 1
        }
      ],
      shipping: standardShipping,
      voucher_code: 'FAKEVOUCHER999',
      shipping_method: 'std'
    });

    const voucherRejected = Boolean(order4Err) && !order4Data;
    recordResult(
      '4',
      'Invalid voucher is rejected',
      voucherRejected,
      voucherRejected
        ? `Correctly rejected: ${order4Err.message}`
        : 'Security breach: Fake voucher was accepted'
    );

    // -------------------------------------------------------------
    // Test 5: Stock is not oversold
    // -------------------------------------------------------------
    console.log('\n--- Running Test 5: Stock Depletion Guard ---');
    // Fetch latest stock
    const { data: currentVar } = await clientAnon
      .from('product_variants')
      .select('stock')
      .eq('id', testVariant.id)
      .single();

    const currentStock = currentVar?.stock ?? initialStock;
    const excessiveQuantity = currentStock + 500;

    const { data: order5Data, error: order5Err } = await clientUserA.rpc('place_order', {
      items: [
        {
          variant_id: testVariant.id,
          quantity: excessiveQuantity
        }
      ],
      shipping: standardShipping,
      shipping_method: 'std'
    });

    const oversellRejected = Boolean(order5Err) && !order5Data;
    recordResult(
      '5',
      'Stock is not oversold',
      oversellRejected,
      oversellRejected
        ? `Correctly rejected: ${order5Err.message} (Requested: ${excessiveQuantity}, Stock: ${currentStock})`
        : 'Security breach: Oversell allowed'
    );

    // -------------------------------------------------------------
    // Test 6: Guest cannot read other users' orders
    // -------------------------------------------------------------
    console.log('\n--- Running Test 6: Orders RLS Isolation ---');
    const targetOrderId = createdOrderIds[0];
    if (!targetOrderId) {
      recordResult('6', "Guest cannot read other users' orders", false, 'No created order from Test 1 to test RLS against');
    } else {
      // 1. User A (owner) selects own order -> must succeed
      const { data: userAOrder } = await clientUserA
        .from('orders')
        .select('id, total, user_id')
        .eq('id', targetOrderId)
        .maybeSingle();

      const userASeesIt = userAOrder?.id === targetOrderId;

      // 2. Guest (anon) tries to select User A's order -> must return zero rows
      const { data: guestOrders } = await clientAnon
        .from('orders')
        .select('*')
        .eq('id', targetOrderId);

      const guestSeesNothing = Array.isArray(guestOrders) && guestOrders.length === 0;

      // 3. User B tries to select User A's order -> must return zero rows
      const { data: userBOrders } = await clientUserB
        .from('orders')
        .select('*')
        .eq('id', targetOrderId);

      const userBSeesNothing = Array.isArray(userBOrders) && userBOrders.length === 0;

      const rlsPassed = userASeesIt && guestSeesNothing && userBSeesNothing;
      recordResult(
        '6',
        "Guest and other users cannot read User A's orders",
        rlsPassed,
        `User A sees own order: ${userASeesIt}; Guest sees: ${guestOrders?.length ?? 0} rows; User B sees: ${userBOrders?.length ?? 0} rows`
      );
    }

  } finally {
    // -------------------------------------------------------------
    // Cleanup created test orders & restore stock
    // -------------------------------------------------------------
    console.log('\nCleaning up created test orders and restoring inventory...');

    if (clientAdmin) {
      if (createdOrderIds.length > 0) {
        for (const ordId of createdOrderIds) {
          try {
            await clientAdmin.from('orders').delete().eq('id', ordId);
            console.log(`- Deleted test order '${ordId}'`);
          } catch (err) {
            console.warn(`- Failed to delete test order ${ordId}:`, err.message);
          }
        }
      }

      if (testVariant && stockDecrementedTotal > 0) {
        try {
          await clientAdmin
            .from('product_variants')
            .update({ stock: initialStock, updated_at: new Date().toISOString() })
            .eq('id', testVariant.id);
          console.log(`- Restored variant '${testVariant.id}' stock to ${initialStock}`);
        } catch (err) {
          console.warn(`- Failed to restore variant stock:`, err.message);
        }
      }
    } else {
      console.log('NOTE: SUPABASE_SECRET_KEY not provided in .env.server. Created test orders:');
      createdOrderIds.forEach(id => console.log(` - Order ID: ${id}`));
      console.log('Can be removed via Supabase Dashboard -> Table Editor -> orders.');
    }

    console.log('\n================================================================');
    console.log('ORDER TEST SUITE SUMMARY');
    console.log('================================================================');
    const totalPassed = testResults.filter(t => t.passed).length;
    console.log(`Total Tests Run: ${testResults.length}`);
    console.log(`Passed:          ${totalPassed} / ${testResults.length}`);
    console.log(`Failed:          ${testResults.length - totalPassed} / ${testResults.length}`);

    if (userAId || userBId) {
      console.log('\nNOTE FOR TEST USER REMOVAL:');
      if (userAId) console.log(` - User A: ${emailA} (ID: ${userAId})`);
      if (userBId) console.log(` - User B: ${emailB} (ID: ${userBId})`);
      console.log('Via Supabase Dashboard -> Authentication -> Users -> Delete user.');
    }
    console.log('================================================================\n');
  }
}

runOrderTestSuite().catch(err => {
  console.error('[Fatal Error] Order test suite failed:', err);
  process.exit(1);
});
