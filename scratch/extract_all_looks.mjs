import fs from 'fs';

const html = fs.readFileSync('scratch/monique_lookbook.html', 'utf-8');

// Find all look items in the grid
const itemRegex = /<li[^>]*class=["']lookbook__item[^"']*["'][^>]*>([\s\S]*?)<\/li>/gi;
const items = [...html.matchAll(itemRegex)];
console.log('Total lookbook items:', items.length);

const looks = [];
items.forEach((item, idx) => {
  const content = item[1];
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']/i) || 
                   content.match(/<img[^>]+alt=["']([^"']*)["'][^>]*src=["']([^"']+)["']/i);
  
  const alt = imgMatch ? (imgMatch[2] || imgMatch[1]) : `Look ${idx + 1}`;
  const src = imgMatch ? (imgMatch[1].startsWith('//') ? 'https:' + imgMatch[1] : imgMatch[1]) : '';
  
  looks.push({
    index: idx + 1,
    title: alt,
    image: src
  });
});

console.log('Extracted Looks:', looks.slice(0, 10));

// Find the modal dialog content
const modalMatch = html.match(/<div[^>]*class=["']lookbook-modal[^"']*["'][\s\S]*?<\/lookbook-modal>/i);
if (modalMatch) {
  console.log('Modal match preview:', modalMatch[0].slice(0, 800));
}

// Find descriptions / captions
const descMatches = [...html.matchAll(/class=["']lookbook__text[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)];
console.log('Text blocks found:', descMatches.length);
descMatches.forEach((d, i) => console.log(`Text ${i}:`, d[1].replace(/<[^>]+>/g, '').trim().slice(0, 100)));

fs.writeFileSync('scratch/extracted_looks.json', JSON.stringify(looks, null, 2));
console.log('Saved to scratch/extracted_looks.json');
