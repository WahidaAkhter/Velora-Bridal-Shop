import https from 'https';

const url = 'https://player.flipsnack.com?hash=QTU1RkI1QTdDNkYremNpNjUzdXJ6cA==';
https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Player length:', data.length);
    // Find script tags or json config
    const scripts = data.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || [];
    console.log('Scripts found:', scripts.length);
    scripts.forEach((s, idx) => {
      if (s.includes('window.') || s.includes('config') || s.includes('collection') || s.includes('title') || s.includes('hash')) {
        console.log(`Script ${idx} preview:`, s.slice(0, 300));
      }
    });

    // Look for api calls or json endpoints
    const apiMatches = data.match(/https?:\/\/[^"'\s]+\.json[^"'\s]*/gi) || data.match(/\/api\/[^"'\s]+/gi);
    console.log('API matches:', apiMatches);
  });
});
