import fs from 'fs';

const filePath = 'C:\\Users\\mdsiu\\.gemini\\antigravity-ide\\brain\\d9d60325-2bad-4df7-9afa-6f10c2de9e4a\\.system_generated\\steps\\1223\\content.md';
const content = fs.readFileSync(filePath, 'utf-8');

const matches = content.match(/<a[^>]+href="https:\/\/madilane\.com\/collection-category\/[^"]+"[\s\S]*?<\/a>/gi) || [];
console.log('Collection card matches:', matches.length);
matches.forEach((m, i) => {
  const href = m.match(/href="([^"]+)"/)?.[1];
  const title = m.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const imgMatch = m.match(/nitro-lazy-src="([^"]+)"/) || m.match(/src="([^"]+)"/) || m.match(/data-src="([^"]+)"/);
  console.log(`${i}:`, { href, title, img: imgMatch?.[1] });
});

// Also search for all headings or collection titles
const titles = content.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi) || [];
console.log('Headings:', titles.map(t => t.replace(/<[^>]+>/g, '').trim()).filter(Boolean));
