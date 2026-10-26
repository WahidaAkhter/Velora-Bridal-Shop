import fs from 'fs';

const filePath = 'C:\\Users\\mdsiu\\.gemini\\antigravity-ide\\brain\\d9d60325-2bad-4df7-9afa-6f10c2de9e4a\\.system_generated\\steps\\1223\\content.md';
const content = fs.readFileSync(filePath, 'utf-8');

console.log('Total length:', content.length);

// Extract all sections in body
const bodyIdx = content.indexOf('<body');
const body = bodyIdx !== -1 ? content.slice(bodyIdx) : content;

const sections = body.match(/<section[^>]*>[\s\S]*?<\/section>/gi) || [];
console.log('Total sections in body:', sections.length);

sections.forEach((sec, idx) => {
  const text = sec.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const headings = sec.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi) || [];
  const cleanHeadings = headings.map(h => h.replace(/<[^>]+>/g, '').trim());
  const imgs = sec.match(/src="([^">]+)"|nitro-lazy-src="([^">]+)"|data-src="([^">]+)"/gi) || [];
  console.log(`\n--- SECTION ${idx} ---`);
  console.log('Headings:', cleanHeadings);
  console.log('Text preview:', text.slice(0, 180));
  console.log('Images count:', imgs.length);
  if (imgs.length > 0) {
    console.log('First 3 images:', imgs.slice(0, 3));
  }
});
