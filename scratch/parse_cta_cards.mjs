import fs from 'fs';

const filePath = 'C:\\Users\\mdsiu\\.gemini\\antigravity-ide\\brain\\d9d60325-2bad-4df7-9afa-6f10c2de9e4a\\.system_generated\\steps\\1223\\content.md';
const content = fs.readFileSync(filePath, 'utf-8');

// Match all elementor-widget-call-to-action
const ctaRegex = /<div[^>]*class="[^"]*elementor-widget-call-to-action[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi;
const ctas = content.match(ctaRegex) || [];
console.log('Total CTA cards found:', ctas.length);

ctas.forEach((cta, i) => {
  const title = cta.match(/<h2[^>]*class="[^"]*elementor-cta__title[^"]*"[^>]*>([\s\S]*?)<\/h2>/i)?.[1]?.trim();
  const link = cta.match(/href="([^"]+)"/i)?.[1];
  
  // Find image URL from background-image, data-bg, nitro-lazy-bg, or inline style
  const bgMatch = cta.match(/madilane\.com\/wp-content\/uploads\/[^\s"')]+/i);
  const img = bgMatch ? `https://${bgMatch[0]}` : '';
  
  console.log(`CTA ${i}:`, { title, link, img });
});
