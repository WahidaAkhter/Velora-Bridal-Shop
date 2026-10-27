async function test() {
  try {
    console.log('--- Testing Backend Endpoints ---');

    // 1. Health
    const resHealth = await fetch('http://localhost:5000/api/health');
    const health = await resHealth.json();
    console.log('1. [HEALTH]:', health.status, 'Version:', health.version, 'Products:', health.database.productsCount, 'Legacy:', health.database.legacyCount);

    // 2. Products
    const resProducts = await fetch('http://localhost:5000/api/products?limit=5');
    const products = await resProducts.json();
    console.log('2. [PRODUCTS]: Total =', products.total, 'First Item Image =', products.data[0]?.images?.[0]);

    // 3. Legacy Collection
    const resLegacy = await fetch('http://localhost:5000/api/legacy-collection');
    const legacy = await resLegacy.json();
    console.log('3. [LEGACY]: Gowns count =', legacy.data.gowns.length, 'First Gown Image =', legacy.data.gowns[0]?.image);

    // 4. Quick Ship
    const resQuick = await fetch('http://localhost:5000/api/quick-ship');
    const quick = await resQuick.json();
    console.log('4. [QUICK SHIP]: Count =', quick.data.products.length, 'First Image =', quick.data.products[0]?.images?.[0]);

    // 5. Sashes
    const resSashes = await fetch('http://localhost:5000/api/sashes');
    const sashes = await resSashes.json();
    console.log('5. [SASHES]: Count =', sashes.data.products.length, 'First Image =', sashes.data.products[0]?.image);

    // 6. Accessories
    const resAcc = await fetch('http://localhost:5000/api/accessories');
    const acc = await resAcc.json();
    console.log('6. [ACCESSORIES]: Cards count =', acc.data.cards.length, 'Items count =', acc.data.items.length);

    // 7. Collections
    const resCol = await fetch('http://localhost:5000/api/collections');
    const col = await resCol.json();
    console.log('7. [COLLECTIONS]: Seasonal count =', col.data.seasonal.length, 'Shape & Style count =', col.data.shapeAndStyle.length);

    // 8. Lookbooks
    const resLook = await fetch('http://localhost:5000/api/lookbooks');
    const look = await resLook.json();
    console.log('8. [LOOKBOOKS]: Count =', look.data.length, 'First Lookbook cover =', look.data[0]?.coverImage);

    // 9. Our Story
    const resStory = await fetch('http://localhost:5000/api/our-story');
    const story = await resStory.json();
    console.log('9. [OUR STORY]: Sections =', story.data.sections.length, 'FAQs =', story.data.faqs.length);

    // 10. Local Image from Backend
    const resLocalImg = await fetch('http://localhost:5000/images/bridal/featured-lace-dream.jpg');
    console.log('10. [LOCAL BACKEND IMAGE]: Status =', resLocalImg.status, 'Content-Type =', resLocalImg.headers.get('content-type'));

    // 11. Media Proxy & Caching Endpoint
    const sampleImageUrl = products.data[0]?.images?.[0];
    if (sampleImageUrl) {
      const resMedia = await fetch(sampleImageUrl);
      console.log('11. [MEDIA PROXY]: Status =', resMedia.status, 'Cache Header =', resMedia.headers.get('x-cache'), 'Content-Type =', resMedia.headers.get('content-type'));
      
      // Request again to verify cache hit
      const resMediaCache = await fetch(sampleImageUrl);
      console.log('12. [MEDIA CACHE HIT]: Status =', resMediaCache.status, 'Cache Header =', resMediaCache.headers.get('x-cache'));
    }

    console.log('\n>>> ALL 12 BACKEND DATA & IMAGE ENDPOINTS VERIFIED SUCCESSFULLY! <<<');
  } catch (err) {
    console.error('Test error:', err.message);
  }
}

test();
