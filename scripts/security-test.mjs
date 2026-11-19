/**
 * VELORA Luxury Bridal Boutique
 * Supabase Security & RLS Policy Automated Test Script
 * (scripts/security-test.mjs)
 * 
 * Uses ONLY the client publishable key (sb_publishable_...) from .env.local.
 * Creates two temporary test customer accounts to verify RLS isolation:
 * 
 * Tests:
 *  [a]   Sign up with options.data.role = 'admin' -> profile role must remain 'customer'
 *  [b]   Update own profile role to 'admin' -> must fail or have no effect
 *  [c]   Update own full_name -> must work
 *  [d.1] User A inserts address without ID -> database generates UUID
 *  [d.2] User A selects that address by id -> returns the row
 *  [d.3] User B selects it by id AND selects all addresses -> returns zero rows
 *  [d.4] User B tries to update and delete it -> affects zero rows, row unchanged
 *  [d.5] User B inserts an address with user_id = User A's id -> rejected by RLS
 *  [w.1] User A inserts wishlist row without ID ('gown-odelle') -> database generates UUID
 *  [w.2] User A selects that wishlist row by id -> returns the row
 *  [w.3] User B selects it by id AND selects all wishlists -> returns zero rows
 *  [w.4] User B tries to update and delete it -> affects zero rows, row unchanged
 *  [w.5] User B inserts a wishlist row with user_id = User A's id -> rejected by RLS
 *  [e]   User A inserts directly into orders -> must fail (closed policy)
 *  [f]   User A inserts directly into products -> must fail (public read only)
 *  [g]   Anonymous select on products works; on private tables returns nothing
 * 
 * Cleans up created test rows by generated UUIDs.
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

async function runSecuritySuite() {
  console.log('================================================================');
  console.log('VELORA Luxury Bridal - Automated Security & RLS Policy Test');
  console.log('Testing with client publishable key ONLY (No Service Key in test)');
  console.log('================================================================\n');

  const envLocal = loadEnvFile('.env.local');
  const envServer = loadEnvFile('.env.server');

  const rawUrl = process.env.VITE_SUPABASE_URL || envLocal.VITE_SUPABASE_URL || envServer.SUPABASE_URL;
  const rawKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || envLocal.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!rawUrl || !rawKey) {
    console.error('[Error] Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env.local');
    process.exit(1);
  }

  const supabaseUrl = rawUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
  const publishableKey = rawKey.trim();

  console.log(`Target URL: ${supabaseUrl}`);
  console.log(`Publishable Key Present: ${Boolean(publishableKey)}\n`);

  const clientAnon = createClient(supabaseUrl, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  const clientUserA = createClient(supabaseUrl, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  const clientUserB = createClient(supabaseUrl, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  const timestamp = Date.now();
  const domain = envServer.TEST_EMAIL_DOMAIN || 'example.com';
  const emailA = `test-bride-a-${timestamp}@${domain}`;
  const emailB = `test-bride-b-${timestamp}@${domain}`;
  const testPassword = `VeloraTest#${timestamp}!`;

  let userAId = null;
  let userBId = null;
  let createdAddressId = null;
  let createdWishlistId = null;

  const testResults = [];

  const recordResult = (id, name, passed, detail) => {
    testResults.push({ id, name, passed, detail });
    const tag = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`[${tag}] Test (${id}): ${name}`);
    if (detail) {
      console.log(`       Detail: ${detail}`);
    }
  };

  try {
    // -------------------------------------------------------------
    // Test A: Signup with options.data.role = 'admin'
    // -------------------------------------------------------------
    console.log(`Signing up User A (${emailA}) with role: 'admin'...`);
    const { data: signUpA, error: errSignUpA } = await clientUserA.auth.signUp({
      email: emailA,
      password: testPassword,
      options: {
        data: {
          full_name: 'Test Bride A',
          phone: '+1 (555) 111-2222',
          role: 'admin' // Attempted privilege escalation
        }
      }
    });

    if (errSignUpA) {
      recordResult('a', 'Signup privilege escalation check', false, `Signup failed: ${errSignUpA.message}`);
    } else {
      userAId = signUpA.user?.id;
      // Fetch profile row
      const { data: profileA, error: profErrA } = await clientUserA
        .from('profiles')
        .select('role, full_name')
        .eq('id', userAId)
        .single();

      if (profErrA) {
        recordResult('a', 'Signup privilege escalation check', false, `Profile fetch failed: ${profErrA.message}`);
      } else {
        const passed = profileA.role === 'customer';
        recordResult(
          'a',
          "Signup with role='admin' forces 'customer'",
          passed,
          `Expected role 'customer', found: '${profileA.role}'`
        );
      }
    }

    // -------------------------------------------------------------
    // Test B: Update own profile role to 'admin'
    // -------------------------------------------------------------
    if (userAId) {
      console.log("User A attempting to update own profile role to 'admin'...");
      const { error: updateRoleErr } = await clientUserA
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userAId);

      const { data: profileBCheck } = await clientUserA
        .from('profiles')
        .select('role')
        .eq('id', userAId)
        .single();

      const passed = profileBCheck?.role === 'customer';
      recordResult(
        'b',
        "Update own profile role to 'admin' must fail or be ignored",
        passed,
        updateRoleErr
          ? `Rejected with DB error: ${updateRoleErr.message}`
          : `Update silently ignored/trigger-protected. Role remains: '${profileBCheck?.role}'`
      );
    }

    // -------------------------------------------------------------
    // Test C: Update own full_name must work
    // -------------------------------------------------------------
    if (userAId) {
      const newName = 'Lady Eleanor Vance II';
      const { error: updateNameErr } = await clientUserA
        .from('profiles')
        .update({ full_name: newName })
        .eq('id', userAId);

      const { data: profileUpdated } = await clientUserA
        .from('profiles')
        .select('full_name')
        .eq('id', userAId)
        .single();

      const passed = !updateNameErr && profileUpdated?.full_name === newName;
      recordResult(
        'c',
        'Update own full_name must succeed',
        passed,
        `full_name is now: '${profileUpdated?.full_name}'`
      );
    }

    // -------------------------------------------------------------
    // Sign up User B for Cross-User Isolation Tests
    // -------------------------------------------------------------
    console.log(`Signing up User B (${emailB})...`);
    const { data: signUpB, error: errSignUpB } = await clientUserB.auth.signUp({
      email: emailB,
      password: testPassword,
      options: {
        data: {
          full_name: 'Test Bride B',
          phone: '+1 (555) 333-4444'
        }
      }
    });

    if (errSignUpB) {
      console.error(`User B signup failed: ${errSignUpB.message}`);
    } else {
      userBId = signUpB.user?.id;
    }

    // -------------------------------------------------------------
    // Test D: Addresses RLS & Isolation Suite
    // -------------------------------------------------------------
    if (userAId && userBId) {
      console.log('\n--- Running Addresses RLS Suite (d.1 - d.5) ---');

      // d.1: User A inserts address WITHOUT an id (let DB generate UUID)
      const addressStreet = '100 Madison Ave, Floor 8';
      const { data: insertedAddrA, error: insertAddrErrA } = await clientUserA
        .from('addresses')
        .insert({
          user_id: userAId,
          first_name: 'Eleanor',
          last_name: 'Vance',
          street: addressStreet,
          city: 'New York',
          state: 'NY',
          zip: '10016',
          country: 'United States',
          is_default: true
        })
        .select('id')
        .single();

      createdAddressId = insertedAddrA?.id;
      const d1Passed = !insertAddrErrA && Boolean(createdAddressId);
      recordResult(
        'd.1',
        "Insert address without id -> DB generates UUID",
        d1Passed,
        d1Passed
          ? `Generated address UUID: ${createdAddressId}`
          : `Insert failed: ${insertAddrErrA?.message}`
      );

      // d.2: User A selects that row by id -> must return it
      const { data: userAAddrView, error: userAAddrErr } = await clientUserA
        .from('addresses')
        .select('*')
        .eq('id', createdAddressId)
        .maybeSingle();

      const d2Passed = !userAAddrErr && userAAddrView?.id === createdAddressId && userAAddrView?.user_id === userAId;
      recordResult(
        'd.2',
        "User A selects own address by id -> returns row",
        d2Passed,
        d2Passed
          ? `Found row with id '${userAAddrView?.id}' belonging to user '${userAAddrView?.user_id}'`
          : `Select failed or row missing: ${userAAddrErr?.message || 'row not found'}`
      );

      // d.3: User B selects it by id AND selects all addresses -> must return zero rows
      const { data: userBAddrById } = await clientUserB
        .from('addresses')
        .select('*')
        .eq('id', createdAddressId);

      const { data: userBAllAddrs } = await clientUserB
        .from('addresses')
        .select('*');

      const bByIdZero = Array.isArray(userBAddrById) && userBAddrById.length === 0;
      const bAllZero = Array.isArray(userBAllAddrs) && userBAllAddrs.length === 0;
      const d3Passed = bByIdZero && bAllZero;
      recordResult(
        'd.3',
        "User B selects by id AND all addresses -> returns zero rows",
        d3Passed,
        `User B by-id rows: ${userBAddrById?.length ?? 0}, all-addresses rows: ${userBAllAddrs?.length ?? 0}`
      );

      // d.4: User B tries to update and delete it -> must affect zero rows, row unchanged
      const { data: updateDataB, error: updateErrB } = await clientUserB
        .from('addresses')
        .update({ street: 'Hacked Boulevard 999' })
        .eq('id', createdAddressId)
        .select();

      const updateZero = (updateDataB && updateDataB.length === 0) || Boolean(updateErrB);

      const { data: deleteDataB, error: deleteErrB } = await clientUserB
        .from('addresses')
        .delete()
        .eq('id', createdAddressId)
        .select();

      const deleteZero = (deleteDataB && deleteDataB.length === 0) || Boolean(deleteErrB);

      const { data: userAAddrVerify } = await clientUserA
        .from('addresses')
        .select('*')
        .eq('id', createdAddressId)
        .single();

      const addrUnchanged = userAAddrVerify?.street === addressStreet;
      const d4Passed = updateZero && deleteZero && addrUnchanged;
      recordResult(
        'd.4',
        "User B update & delete affect zero rows; User A verifies row unchanged",
        d4Passed,
        `Update affected: ${updateDataB?.length ?? 0} rows; Delete affected: ${deleteDataB?.length ?? 0} rows; Row street verified: '${userAAddrVerify?.street}'`
      );

      // d.5: User B inserts an address with user_id = User A's id -> must be rejected by RLS
      const { data: spoofAddrData, error: spoofAddrErr } = await clientUserB
        .from('addresses')
        .insert({
          user_id: userAId, // Attacker User B attempting to insert under User A
          first_name: 'Attacker',
          last_name: 'Spoof',
          street: 'Malicious Boulevard',
          city: 'Nowhere',
          state: 'NY',
          zip: '00000',
          country: 'United States'
        })
        .select();

      const d5Passed = Boolean(spoofAddrErr) || !spoofAddrData || spoofAddrData.length === 0;
      recordResult(
        'd.5',
        "User B inserts address with user_id = User A's id -> rejected by RLS",
        d5Passed,
        spoofAddrErr
          ? `Correctly rejected: ${spoofAddrErr.message}`
          : (d5Passed ? 'Zero rows inserted' : 'Security breach: insert succeeded')
      );
    }

    // -------------------------------------------------------------
    // Test W: Wishlists RLS & Isolation Suite
    // -------------------------------------------------------------
    if (userAId && userBId) {
      console.log('\n--- Running Wishlists RLS Suite (w.1 - w.5) ---');
      const testProductId = 'gown-odelle';

      // w.1: User A inserts a wishlist row without an id ('gown-odelle')
      const { data: insertedWishA, error: insertWishErrA } = await clientUserA
        .from('wishlists')
        .insert({
          user_id: userAId,
          product_id: testProductId
        })
        .select('id')
        .single();

      createdWishlistId = insertedWishA?.id;
      const w1Passed = !insertWishErrA && Boolean(createdWishlistId);
      recordResult(
        'w.1',
        "User A inserts wishlist row ('gown-odelle') without id -> DB generates UUID",
        w1Passed,
        w1Passed
          ? `Generated wishlist UUID: ${createdWishlistId}`
          : `Insert failed: ${insertWishErrA?.message}`
      );

      // w.2: User A selects that wishlist row by id -> must return it
      const { data: userAWishView, error: userAWishErr } = await clientUserA
        .from('wishlists')
        .select('*')
        .eq('id', createdWishlistId)
        .maybeSingle();

      const w2Passed = !userAWishErr && userAWishView?.id === createdWishlistId && userAWishView?.product_id === testProductId;
      recordResult(
        'w.2',
        "User A selects own wishlist row by id -> returns row",
        w2Passed,
        w2Passed
          ? `Found row id '${userAWishView?.id}' with product '${userAWishView?.product_id}'`
          : `Select failed or row missing: ${userAWishErr?.message || 'row not found'}`
      );

      // w.3: User B selects it by id AND selects all wishlists -> must return zero rows
      const { data: userBWishById } = await clientUserB
        .from('wishlists')
        .select('*')
        .eq('id', createdWishlistId);

      const { data: userBAllWish } = await clientUserB
        .from('wishlists')
        .select('*');

      const bWishByIdZero = Array.isArray(userBWishById) && userBWishById.length === 0;
      const bWishAllZero = Array.isArray(userBAllWish) && userBAllWish.length === 0;
      const w3Passed = bWishByIdZero && bWishAllZero;
      recordResult(
        'w.3',
        "User B selects wishlist by id AND all wishlists -> returns zero rows",
        w3Passed,
        `User B by-id rows: ${userBWishById?.length ?? 0}, all-wishlist rows: ${userBAllWish?.length ?? 0}`
      );

      // w.4: User B tries to update and delete it -> must affect zero rows, row unchanged
      const { data: updateWishB, error: updateWishErrB } = await clientUserB
        .from('wishlists')
        .update({ product_id: 'gown-opera' })
        .eq('id', createdWishlistId)
        .select();

      const updateWishZero = (updateWishB && updateWishB.length === 0) || Boolean(updateWishErrB);

      const { data: deleteWishB, error: deleteWishErrB } = await clientUserB
        .from('wishlists')
        .delete()
        .eq('id', createdWishlistId)
        .select();

      const deleteWishZero = (deleteWishB && deleteWishB.length === 0) || Boolean(deleteWishErrB);

      const { data: userAWishVerify } = await clientUserA
        .from('wishlists')
        .select('*')
        .eq('id', createdWishlistId)
        .single();

      const wishUnchanged = userAWishVerify?.product_id === testProductId;
      const w4Passed = updateWishZero && deleteWishZero && wishUnchanged;
      recordResult(
        'w.4',
        "User B update & delete affect zero rows; User A verifies row unchanged",
        w4Passed,
        `Update affected: ${updateWishB?.length ?? 0} rows; Delete affected: ${deleteWishB?.length ?? 0} rows; Product verified: '${userAWishVerify?.product_id}'`
      );

      // w.5: User B inserts a wishlist row with user_id = User A's id -> must be rejected by RLS
      const { data: spoofWishData, error: spoofWishErr } = await clientUserB
        .from('wishlists')
        .insert({
          user_id: userAId, // Attacker User B attempting to insert under User A
          product_id: 'gown-opera'
        })
        .select();

      const w5Passed = Boolean(spoofWishErr) || !spoofWishData || spoofWishData.length === 0;
      recordResult(
        'w.5',
        "User B inserts wishlist row with user_id = User A's id -> rejected by RLS",
        w5Passed,
        spoofWishErr
          ? `Correctly rejected: ${spoofWishErr.message}`
          : (w5Passed ? 'Zero rows inserted' : 'Security breach: insert succeeded')
      );
    }

    // -------------------------------------------------------------
    // Test E: User A inserts into orders directly (must fail)
    // -------------------------------------------------------------
    if (userAId) {
      console.log('\n--- Running Closed Table & Public Access Tests ---');
      const orderTestId = `ord-sec-${timestamp}`;
      const { error: insertOrderErr } = await clientUserA
        .from('orders')
        .insert({
          id: orderTestId,
          user_id: userAId,
          status: 'pending',
          payment_method: 'Credit Card',
          total: 5000.00
        });

      const passed = Boolean(insertOrderErr);
      recordResult(
        'e',
        'Direct insert into orders by customer must fail',
        passed,
        insertOrderErr ? `Blocked by RLS policy: ${insertOrderErr.message}` : 'Unexpected: Insert succeeded'
      );
    }

    // -------------------------------------------------------------
    // Test F: User A inserts into products (must fail)
    // -------------------------------------------------------------
    if (userAId) {
      const prodTestId = `prod-sec-${timestamp}`;
      const { error: insertProdErr } = await clientUserA
        .from('products')
        .insert({
          id: prodTestId,
          name: 'Unauthorized Gown',
          slug: `unauthorized-gown-${timestamp}`,
          price: 99.00
        });

      const passed = Boolean(insertProdErr);
      recordResult(
        'f',
        'Direct insert into products by customer must fail',
        passed,
        insertProdErr ? `Blocked by RLS policy: ${insertProdErr.message}` : 'Unexpected: Insert succeeded'
      );
    }

    // -------------------------------------------------------------
    // Test G: Anonymous access checks
    // -------------------------------------------------------------
    // 1. Anonymous can read products
    const { data: anonProducts, error: anonProdErr } = await clientAnon
      .from('products')
      .select('id, name')
      .limit(1);

    const anonProdPass = !anonProdErr && Array.isArray(anonProducts) && anonProducts.length > 0;

    // 2. Anonymous cannot read private tables
    const privateTables = ['profiles', 'addresses', 'wishlists', 'orders', 'order_items'];
    let privateLeak = false;
    let leakDetail = '';

    for (const table of privateTables) {
      const { data: pData } = await clientAnon.from(table).select('*').limit(5);
      if (Array.isArray(pData) && pData.length > 0) {
        privateLeak = true;
        leakDetail += `${table} returned ${pData.length} rows; `;
      }
    }

    const anonPass = anonProdPass && !privateLeak;
    recordResult(
      'g',
      'Anonymous access (products readable, private tables return zero rows)',
      anonPass,
      anonPass
        ? 'Products public read verified; 0 rows accessible on profiles, addresses, wishlists, orders, order_items.'
        : `Failure: ${leakDetail || 'Products unreadable'}`
    );

  } finally {
    // -------------------------------------------------------------
    // Cleanup created test rows by generated UUIDs (as User A)
    // -------------------------------------------------------------
    console.log('\nCleaning up created test rows in database (as User A)...');
    if (clientUserA && createdAddressId) {
      try {
        await clientUserA.from('addresses').delete().eq('id', createdAddressId);
        console.log(`- Deleted test address '${createdAddressId}'`);
      } catch (err) {
        console.warn(`- Failed to delete address ${createdAddressId}:`, err.message);
      }
    }

    if (clientUserA && createdWishlistId) {
      try {
        await clientUserA.from('wishlists').delete().eq('id', createdWishlistId);
        console.log(`- Deleted test wishlist '${createdWishlistId}'`);
      } catch (err) {
        console.warn(`- Failed to delete wishlist ${createdWishlistId}:`, err.message);
      }
    }

    console.log('\n================================================================');
    console.log('SECURITY SUITE SUMMARY');
    console.log('================================================================');
    const totalPassed = testResults.filter(t => t.passed).length;
    console.log(`Total Tests Run: ${testResults.length}`);
    console.log(`Passed:          ${totalPassed} / ${testResults.length}`);
    console.log(`Failed:          ${testResults.length - totalPassed} / ${testResults.length}`);

    if (userAId || userBId) {
      console.log('\nNOTE FOR TEST USER REMOVAL:');
      console.log('Because client publishable keys cannot delete auth.users rows, remove:');
      if (userAId) console.log(` - User A: ${emailA} (ID: ${userAId})`);
      if (userBId) console.log(` - User B: ${emailB} (ID: ${userBId})`);
      console.log('Via Supabase Dashboard -> Authentication -> Users -> Delete user.');
    }
    console.log('================================================================\n');
  }
}

runSecuritySuite().catch(err => {
  console.error('[Fatal Error] Security suite execution failed:', err);
  process.exit(1);
});
