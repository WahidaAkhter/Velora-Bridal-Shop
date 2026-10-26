import fs from 'fs';

const filePath = 'C:\\Users\\mdsiu\\.gemini\\antigravity-ide\\brain\\d9d60325-2bad-4df7-9afa-6f10c2de9e4a\\.system_generated\\steps\\1165\\content.md';
const content = fs.readFileSync(filePath, 'utf-8');

// Look for any <img tags regardless of attribute order
const imgMatches = content.match(/<img[^>]+>/gi) || [];
console.log('Total <img> tags:', imgMatches.length);
imgMatches.slice(0, 10).forEach((img, i) => {
  console.log(`IMG ${i}:`, img.slice(0, 200));
});

// Search for the main content area (e.g. elementor-section or article or main or lookbook)
const mainMatches = content.match(/<main[^>]*>[\s\S]*?<\/main>/i) ||
                    content.match(/<article[^>]*>[\s\S]*?<\/article>/i) ||
                    content.match(/class="[^"]*lookbook[^"]*"[\s\S]{0,500}/gi);
console.log('Main matches:', mainMatches ? (Array.isArray(mainMatches) ? mainMatches.length : 'yes') : 'none');

// Let's search for "EXPLORE OUR Lookbooks" or "Lookbook" in the body
const bodyIdx = content.indexOf('<body');
const bodyContent = bodyIdx !== -1 ? content.slice(bodyIdx) : content;

// Find sections in body
const sectionMatches = bodyContent.match(/<section[^>]*>[\s\S]*?<\/section>/gi) || [];
console.log('Total <section> tags in body:', sectionMatches.length);
sectionMatches.forEach((sec, i) => {
  const text = sec.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`Section ${i} text preview:`, text.slice(0, 150));
});
