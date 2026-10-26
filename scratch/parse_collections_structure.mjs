import fs from 'fs';

const filePath = 'C:\\Users\\mdsiu\\.gemini\\antigravity-ide\\brain\\d9d60325-2bad-4df7-9afa-6f10c2de9e4a\\.system_generated\\steps\\1223\\content.md';
const content = fs.readFileSync(filePath, 'utf-8');

// Find all elements between the start of the collection list and footer
// Let's print out the structure around IMG 1 to 16
for (let i = 1; i <= 16; i++) {
  const marker = `IMG ${i}`;
}

// Let's extract each collection block:
// Look at the html around each collection image
const imgRegex = /<div[^>]*class="[^"]*elementor-widget-image[^"]*"[\s\S]*?<\/div>\s*<\/div>/gi;
const matches = content.match(imgRegex) || [];
console.log('Image widgets:', matches.length);

// Let's find container blocks with images and links
const blocks = content.match(/<div[^>]*class="[^"]*e-con-inner[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi) || [];
console.log('e-con-inner blocks:', blocks.length);

// Let's search for "Terra", "Poeme", "Solara", "Ceres", "Memoirs", "Epilogue", "Baciami", "Nostalgia", "Legacy"
const collections = ['Legacy', 'Terra', 'Poeme', 'Solara', 'Ceres', 'Memoirs', 'Epilogue', 'Baciami', 'Nostalgia'];
collections.forEach(col => {
  const regex = new RegExp(`[\\s\\S]{0,200}${col}[\\s\\S]{0,400}`, 'i');
  const m = content.match(regex);
  if (m) {
    console.log(`\n=== Found ${col} ===`);
    console.log(m[0].replace(/<style[\s\S]*?<\/style>/gi, '').slice(0, 350));
  }
});
