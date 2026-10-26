import fs from 'fs';

const filePath = 'C:\\Users\\mdsiu\\.gemini\\antigravity-ide\\brain\\d9d60325-2bad-4df7-9afa-6f10c2de9e4a\\.system_generated\\steps\\1223\\content.md';
const content = fs.readFileSync(filePath, 'utf-8');

// Find data-elementor-type="wp-page"
const pageIdx = content.indexOf('data-elementor-type="wp-page"');
console.log('pageIdx:', pageIdx);

if (pageIdx !== -1) {
  const pageHtml = content.slice(pageIdx, pageIdx + 50000);
  
  // Extract all text inside this page
  const clean = pageHtml.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const textRegex = />([^<]{2,})</g;
  let match;
  const texts = [];
  while ((match = textRegex.exec(clean)) !== null) {
    const t = match[1].trim();
    if (t && !t.includes('{') && !t.includes('function') && !t.includes('var ') && !t.includes('elementor')) {
      texts.push(t);
    }
  }
  console.log('Page texts:', texts);
}
