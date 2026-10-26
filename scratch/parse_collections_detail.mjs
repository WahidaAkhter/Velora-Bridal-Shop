import fs from 'fs';

const filePath = 'C:\\Users\\mdsiu\\.gemini\\antigravity-ide\\brain\\d9d60325-2bad-4df7-9afa-6f10c2de9e4a\\.system_generated\\steps\\1223\\content.md';
const content = fs.readFileSync(filePath, 'utf-8');

const pageIdx = content.indexOf('data-elementor-type="wp-page"');
const footerIdx = content.indexOf('<footer');
const pageHtml = content.slice(pageIdx, footerIdx !== -1 ? footerIdx : content.length);

console.log('Page HTML length:', pageHtml.length);

// Find all top-level sections or containers inside pageHtml
// Match data-element_type="container" or data-element_type="section"
const sectionMatches = pageHtml.match(/<(?:section|div)[^>]+(?:data-element_type="(?:section|container)"|class="[^"]*e-con[^"]*")[^>]*>/gi) || [];
console.log('Top elements count:', sectionMatches.length);

// Let's inspect each major section/block:
// 1. Hero block: "New Collection Legacy", "Explore Now"
// 2. "All Collections" block with seasonal description
// 3. Grid of collections / campaign cards (Terra, Poeme, Solara, Ceres, Memoirs, Epilogue, Baciami, Nostalgia)
// 4. "Shape & Style" block with 10 facet cards:
//    - A-LINE
//    - PRINCESS
//    - FIT & FLARE
//    - SIMPLE
//    - PLUS SIZE
//    - LACE
//    - BASQUE WAIST
//    - LONG SLEEVES
//    - STATEMENT BACK
//    - BOHO
// 5. Bottom banner / call to action

// Let's extract the image URLs and links for each collection card and each shape & style card!
const imageTags = pageHtml.match(/<img[^>]+>/gi) || [];
console.log('Image tags in page:', imageTags.length);
imageTags.forEach((img, i) => {
  const alt = img.match(/alt="([^"]*)"/)?.[1];
  const title = img.match(/title="([^"]*)"/)?.[1];
  const src = img.match(/nitro-lazy-src="([^"]*)"/)?.[1] || img.match(/src="([^"]*)"/)?.[1];
  console.log(`IMG ${i}:`, { alt, title, src });
});
