import fs from 'fs';

const html = fs.readFileSync('scratch/monique_lookbook.html', 'utf-8');

// Find lookbook items
const itemMatches = [...html.matchAll(/<div[^>]*class=["']lookbook__item[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi)];
console.log('Lookbook items found:', itemMatches.length);

if (itemMatches.length > 0) {
  console.log('Sample item 1:');
  console.log(itemMatches[0][0].slice(0, 800));
}

// Find lookbook grid styles or container
const gridMatch = html.match(/<div[^>]*class=["'][^"']*lookbook__grid[^"']*["'][^>]*>/i);
console.log('Grid container tag:', gridMatch ? gridMatch[0] : 'not found');

// Extract all look images and names
const looks = [];
const imgRegex = /<img[^>]+(?:src|srcset)=["']([^"']+)["'][^>]*>/gi;
// Also look for captions / names
const lookbookSectionStart = html.indexOf('lookbook__grid');
if (lookbookSectionStart !== -1) {
  const lookbookSlice = html.slice(lookbookSectionStart, lookbookSectionStart + 25000);
  console.log('Lookbook slice preview:', lookbookSlice.slice(0, 1500));
}
