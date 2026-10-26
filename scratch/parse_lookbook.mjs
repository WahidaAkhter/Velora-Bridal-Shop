import fs from 'fs';

const filePath = 'C:\\Users\\mdsiu\\.gemini\\antigravity-ide\\brain\\d9d60325-2bad-4df7-9afa-6f10c2de9e4a\\.system_generated\\steps\\1165\\content.md';
const content = fs.readFileSync(filePath, 'utf-8');

console.log('Total length:', content.length);

// Extract all h1, h2, h3, h4, h5, h6
const headings = [];
const hRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
let match;
while ((match = hRegex.exec(content)) !== null) {
  headings.push({ level: match[1], text: match[2].replace(/<[^>]+>/g, '').trim() });
}
console.log('Headings:', headings);

// Look for lookbook entries or image links
// Search for images with lookbook or collection or uploads
const imgRegex = /<img[^>]+src="([^">]+)"[^>]*alt="([^">]*)"[^>]*>/gi;
const images = [];
while ((match = imgRegex.exec(content)) !== null) {
  images.push({ src: match[1], alt: match[2] });
}
console.log('Total images found:', images.length);
console.log('Sample images:', images.slice(0, 15));

// Look for links that might link to collections or lookbooks
const linkRegex = /<a[^>]+href="([^">]+)"[^>]*>([\s\S]*?)<\/a>/gi;
const links = [];
while ((match = linkRegex.exec(content)) !== null) {
  const text = match[2].replace(/<[^>]+>/g, '').trim();
  if (text && !text.includes('function') && text.length < 100) {
    links.push({ href: match[1], text });
  }
}
console.log('Links count:', links.length);
console.log('Sample links:', links.filter(l => /lookbook|collection|explore|view/i.test(l.text) || /lookbook|collection/i.test(l.href)).slice(0, 20));
