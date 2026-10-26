import https from 'https';

const hashes = [
  { id: 1, hash: 'QTU1RkI1QTdDNkYremNpNjUzdXJ6cA==' },
  { id: 2, hash: 'QTU1RkI1QTdDNkYrdmhpcTk5dGJkYw==' },
  { id: 3, hash: 'QTU1RkI1QTdDNkYreGNzNGtrejRvdA==' },
  { id: 4, hash: 'QTU1RkI1QTdDNkYrZHRpNmZmNXVuZg==' },
  { id: 5, hash: 'QTU1RkI1QTdDNkYrdWpmZ2ZmbTFjaQ==' },
  { id: 6, hash: 'QTU1RkI1QTdDNkYrdWtpeW5jejRvdA==' },
  { id: 7, hash: 'QTU1RkI1QTdDNkYraGMzZXB1N3diMQ==' },
  { id: 8, hash: 'QTU1RkI1QTdDNkYraDkwZDU1a3Z4bg==' },
  { id: 9, hash: 'QTU1RkI1QTdDNkYrZHhwbHR6YjAydg==' }
];

async function fetchMeta(item) {
  return new Promise((resolve) => {
    const url = `https://player.flipsnack.com?hash=${item.hash}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const titleMatch = data.match(/<title[^>]*>([^<]*)<\/title>/i);
        const ogTitleMatch = data.match(/property=["']og:title["']\s+content=["']([^"']*)["']/i);
        const ogImageMatch = data.match(/property=["']og:image["']\s+content=["']([^"']*)["']/i);
        const ogDescMatch = data.match(/property=["']og:description["']\s+content=["']([^"']*)["']/i);
        
        resolve({
          id: item.id,
          hash: item.hash,
          title: ogTitleMatch ? ogTitleMatch[1] : (titleMatch ? titleMatch[1] : ''),
          image: ogImageMatch ? ogImageMatch[1] : '',
          desc: ogDescMatch ? ogDescMatch[1] : ''
        });
      });
    }).on('error', () => resolve({ id: item.id, hash: item.hash, error: true }));
  });
}

async function run() {
  const results = [];
  for (const h of hashes) {
    const meta = await fetchMeta(h);
    results.push(meta);
  }
  console.log(JSON.stringify(results, null, 2));
}

run();
