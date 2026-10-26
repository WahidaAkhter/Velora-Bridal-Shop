import https from 'https';

https.get('https://madilane.com/shop/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const titleMatch = data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    console.log('H1:', titleMatch ? titleMatch[1].trim() : 'None');

    // Search for filter button, filter panel, or top header
    const matches = data.match(/<div[^>]*class="[^"]*(?:filter|shop-header|collection-header|toolbar|heading)[^"]*"[^>]*>[\s\S]{0,300}<\/div>/gi);
    if (matches) {
      console.log('Found divs:', matches.slice(0, 5));
    }

    // Search for any FILTER text or buttons
    const filterBtn = data.match(/<button[^>]*>[\s\S]*?filter[\s\S]*?<\/button>/gi) ||
                      data.match(/<a[^>]*>[\s\S]*?filter[\s\S]*?<\/a>/gi) ||
                      data.match(/<span[^>]*class="[^"]*filter[^"]*"[^>]*>[\s\S]*?<\/span>/gi);
    console.log('Filter button elements:', filterBtn?.slice(0, 5));

    // Pagination
    const pagination = data.match(/<nav[^>]*pagination[^>]*>[\s\S]*?<\/nav>/i) || data.match(/class="[^"]*page-numbers[^"]*"[\s\S]{0,400}/i);
    console.log('Pagination preview:', pagination ? pagination[0].slice(0, 300) : 'None');
  });
});
