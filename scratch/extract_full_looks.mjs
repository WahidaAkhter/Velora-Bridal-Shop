import fs from 'fs';

const html = fs.readFileSync('scratch/monique_lookbook.html', 'utf-8');

// Look for modal slides which contain full descriptions
const slideRegex = /<div[^>]*class=["']lookbook-modal__text-slide[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi;
const slides = [...html.matchAll(slideRegex)];
console.log('Text slides found:', slides.length);

slides.forEach((s, idx) => {
  const text = s[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`Slide ${idx + 1}: ${text}`);
});

// Extract all 30 items
const itemRegex = /<li[^>]*class=["']lookbook__item[^"']*["'][^>]*>([\s\S]*?)<\/li>/gi;
const items = [...html.matchAll(itemRegex)];

const lookbookData = items.map((it, idx) => {
  const content = it[1];
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']/i) || 
                   content.match(/<img[^>]+alt=["']([^"']*)["'][^>]*src=["']([^"']+)["']/i);
  
  let src = imgMatch ? imgMatch[1] : '';
  if (src.startsWith('//')) src = 'https:' + src;
  src = src.replace(/&amp;/g, '&');
  
  const alt = imgMatch ? imgMatch[2] : `Look ${idx + 1}`;
  
  // Find text description if inside the slide
  const desc = slides[idx] ? slides[idx][1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';

  return {
    id: `look-${idx + 1}`,
    lookNumber: idx + 1,
    name: alt,
    image: src,
    description: desc
  };
});

fs.writeFileSync('scratch/full_lookbook_data.json', JSON.stringify(lookbookData, null, 2));
console.log('Saved 30 looks to scratch/full_lookbook_data.json');
