import fs from 'fs';

const html = fs.readFileSync('scratch/monique_lookbook.html', 'utf-8');
const mainStart = html.indexOf('<main');
const mainEnd = html.indexOf('</main>');
const mainHtml = html.slice(mainStart, mainEnd + 7);

console.log('Main length:', mainHtml.length);

// Extract headings
const headings = [...mainHtml.matchAll(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Headings:', headings);

// Extract paragraphs
const paragraphs = [...mainHtml.matchAll(/<p[^>]*>(.*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
console.log('Paragraphs:', paragraphs);

// Extract images
const imgMatches = [...mainHtml.matchAll(/<img[^>]+(?:src|data-src)=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Images total:', imgMatches.length);
console.log('Sample images:', imgMatches.slice(0, 8));

// Find sections and their content
const sectionMatches = [...mainHtml.matchAll(/<section[^>]*id=["']([^"']*)["'][^>]*class=["']([^"']*)["'][^>]*>/gi)];
console.log('Sections found:');
sectionMatches.forEach(m => console.log('ID:', m[1], 'Class:', m[2]));

// Find lookbook items or gallery items
const galleryItems = [...mainHtml.matchAll(/class=["']([^"']*(?:lookbook|gallery|media|grid|item|card)[^"']*)["']/gi)].map(m => m[1]);
console.log('Unique item classes:', [...new Set(galleryItems)].slice(0, 15));
