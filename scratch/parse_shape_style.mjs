import fs from 'fs';

const filePath = 'C:\\Users\\mdsiu\\.gemini\\antigravity-ide\\brain\\d9d60325-2bad-4df7-9afa-6f10c2de9e4a\\.system_generated\\steps\\1223\\content.md';
const content = fs.readFileSync(filePath, 'utf-8');

const shapeIdx = content.indexOf('Shape &#038; Style');
if (shapeIdx !== -1) {
  const shapeSection = content.slice(shapeIdx, shapeIdx + 20000);
  console.log('Shape section length:', shapeSection.length);

  // Search for background-image, img, or links in this section
  const bgs = shapeSection.match(/url\(['"]?([^'")\s]+)['"]?\)/gi) || [];
  console.log('Backgrounds in shape section:', bgs);

  // Search for images
  const imgs = shapeSection.match(/<img[^>]+>/gi) || [];
  console.log('Imgs in shape section:', imgs);

  // Search for cards / blocks
  const cards = shapeSection.match(/<div[^>]+data-element_type="container"[^>]*>[\s\S]*?VIEW[\s\S]*?<\/div>/gi) || [];
  console.log('Cards matching VIEW:', cards.length);
  cards.forEach((c, i) => {
    console.log(`Card ${i} preview:`, c.replace(/<style[\s\S]*?<\/style>/gi, '').slice(0, 250));
  });
}
