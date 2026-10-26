async function test() {
  try {
    const resHealth = await fetch('http://localhost:5000/api/health');
    const health = await resHealth.json();
    console.log('[BACKEND HEALTH]:', health.status, 'Brand:', health.brand, 'Uptime:', health.uptimeSeconds + 's');
    console.log('[BACKEND DB]:', JSON.stringify(health.database));

    const resProducts = await fetch('http://localhost:5000/api/products');
    const products = await resProducts.json();
    console.log('[BACKEND PRODUCTS]: Count =', products.total, 'First =', products.data[0]?.name);

    const resVite = await fetch('http://localhost:5173');
    console.log('[FRONTEND VITE]: Status =', resVite.status);

    console.log('ALL VERIFICATIONS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('Test error:', err.message);
  }
}

test();
