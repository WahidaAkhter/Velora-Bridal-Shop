import fs from 'fs';

const filePath = 'C:\\Users\\mdsiu\\.gemini\\antigravity-ide\\brain\\d9d60325-2bad-4df7-9afa-6f10c2de9e4a\\.system_generated\\steps\\1223\\content.md';
const content = fs.readFileSync(filePath, 'utf-8');

const regex = /<a[^>]*class="[^"]*elementor-cta[^"]*"[^>]*href="([^"]+)"[\s\S]*?<h2[^>]*class="[^"]*elementor-cta__title[^"]*"[^>]*>([\s\S]*?)<\/h2>/gi;
let match;
const cards = [];

while ((match = regex.exec(content)) !== null) {
  const link = match[1];
  const title = match[2].trim();
  
  // Extract snippet around this match to get the image
  const snippet = content.slice(match.index - 300, match.index + match[0].length + 300);
  const imgMatch = snippet.match(/madilane\.com\/wp-content\/uploads\/[^\s"')]+/i);
  const img = imgMatch ? `https://${imgMatch[0]}` : '';

  cards.push({ title, link, img });
}

console.log('Total CTA cards extracted:', cards.length);
console.log(JSON.stringify(cards, null, 2));
