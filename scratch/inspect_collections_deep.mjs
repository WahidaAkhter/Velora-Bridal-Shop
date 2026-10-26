import fs from 'fs';

const filePath = 'C:\\Users\\mdsiu\\.gemini\\antigravity-ide\\brain\\d9d60325-2bad-4df7-9afa-6f10c2de9e4a\\.system_generated\\steps\\1223\\content.md';
const content = fs.readFileSync(filePath, 'utf-8');

// Find all elements with data-element_type="container" or class="e-con"
const containers = content.match(/<div[^>]*class="[^"]*e-con-inner[^"]*"[^>]*>[\s\S]*?<\/div>/gi) || [];
console.log('Containers count:', containers.length);

// Let's search for "New Collection" or other collection names
const headings = content.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi) || [];
console.log('All headings count:', headings.length);
headings.forEach((h, i) => {
  console.log(`H${i}:`, h.replace(/<[^>]+>/g, '').trim());
});

// Look for images or background-image styles in the page
const bgImages = content.match(/url\(['"]?([^'")\s]+)['"]?\)/gi) || [];
console.log('Background images count:', bgImages.length);
console.log('Sample bg images:', [...new Set(bgImages)].filter(u => /wp-content\/uploads/i.test(u)).slice(0, 15));

// Look for image tags
const imgTags = content.match(/<img[^>]+>/gi) || [];
console.log('IMG tags count:', imgTags.length);
imgTags.forEach((img, i) => {
  console.log(`IMG ${i}:`, img.slice(0, 250));
});

// Let's search for links to collections:
const colLinks = content.match(/<a[^>]+href="[^"]*collection[^"]*"[^>]*>[\s\S]*?<\/a>/gi) || [];
console.log('Collection links count:', colLinks.length);
colLinks.slice(0, 20).forEach((l, i) => {
  const href = l.match(/href="([^"]+)"/)?.[1];
  const text = l.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`Link ${i}:`, { href, text });
});
