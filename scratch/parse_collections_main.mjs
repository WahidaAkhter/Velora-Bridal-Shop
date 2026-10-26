import fs from 'fs';

const filePath = 'C:\\Users\\mdsiu\\.gemini\\antigravity-ide\\brain\\d9d60325-2bad-4df7-9afa-6f10c2de9e4a\\.system_generated\\steps\\1223\\content.md';
const content = fs.readFileSync(filePath, 'utf-8');

// Find the main section content between </header> and <footer
const headerEnd = content.indexOf('</header>');
const footerStart = content.indexOf('<footer');
const mainHtml = content.slice(headerEnd !== -1 ? headerEnd : 0, footerStart !== -1 ? footerStart : content.length);

// Clean scripts and styles to inspect pure HTML elements
const cleanHtml = mainHtml.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');

// Print all text blocks and elements
const lines = cleanHtml.split('\n')
  .map(l => l.trim())
  .filter(l => l.length > 0 && !l.startsWith('<!--') && !l.startsWith('var ') && !l.startsWith('window.'));

console.log('Total non-empty lines in main:', lines.length);

// Search for all text nodes
const textRegex = />([^<]{3,})</g;
let match;
const texts = [];
while ((match = textRegex.exec(cleanHtml)) !== null) {
  const t = match[1].trim();
  if (t && !t.includes('{') && !t.includes('function') && !t.includes('var ')) {
    texts.push(t);
  }
}
console.log('Texts in main:', texts);
