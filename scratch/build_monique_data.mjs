import fs from 'fs';

const html = fs.readFileSync('scratch/monique_lookbook.html', 'utf-8');

// Find all details slides
// In the HTML:
// <div class="lookbook-modal__details-slide" data-details-slide data-index="0" ...>
//   <div class="lookbook-details__inner">
//     <h3 class="lookbook-details__title">Wonderland</h3>
//     <div class="lookbook-details__description prose"><p>Taffeta & faille drop waist ball gown with attached sash and floral bouquets in skirt.<br/><br/>Paired with coordinating two-tier veil with floating rosettes.<br/><br/><em>Monique Lhuillier Platinum Collection</em></p></div>
//   </div>
// </div>

const slides = [...html.matchAll(/class=["']lookbook-modal__details-slide["'][^>]*data-index=["']([^"']*)["'][^>]*>([\s\S]*?)(?:<div\s+class=["']lookbook-modal__details-slide|<\/div>\s*<\/div>\s*<\/div>\s*<\/div>)/gi)];

const modalDetails = [];

// Alternatively find all lookbook-details__inner
const innerRegex = /<div class="lookbook-details__inner"><h3 class="lookbook-details__title">(.*?)<\/h3><div class="lookbook-details__description prose"><p>([\s\S]*?)<\/p><\/div><\/div>/gi;
const inners = [...html.matchAll(innerRegex)];

console.log('Inners found:', inners.length);
inners.forEach((m, idx) => {
  modalDetails.push({
    index: idx,
    title: m[1].trim(),
    descriptionText: m[2].replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').trim(),
    collection: m[2].includes('Platinum Collection') ? 'Platinum Collection' : (m[2].includes('Signature Collection') ? 'Signature Collection' : 'Runway Collection')
  });
});

console.log('Sample detail 0:', modalDetails[0]);

// 2. Extract grid items
const gridItems = [];
const itemRegex = /<li[^>]*class=["']lookbook__item([^"']*)["'][^>]*>([\s\S]*?)<\/li>/gi;
const matches = [...html.matchAll(itemRegex)];

let imageCounter = 0;

matches.forEach((m, i) => {
  const itemClass = m[1];
  const content = m[2];
  
  if (itemClass.includes('lookbook__item--text')) {
    const textMatch = content.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    gridItems.push({
      type: 'text',
      id: `text-${i + 1}`,
      text: textMatch ? textMatch[1].replace(/<br\s*\/?>/gi, ' ').trim() : ''
    });
  } else {
    const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']/i) || 
                     content.match(/<img[^>]+alt=["']([^"']*)["'][^>]*src=["']([^"']+)["']/i);
    
    let src = imgMatch ? imgMatch[1] : '';
    if (src.startsWith('//')) src = 'https:' + src;
    src = src.replace(/&amp;/g, '&');

    const title = imgMatch ? imgMatch[2] : '';
    const details = modalDetails[imageCounter] || {};
    imageCounter++;

    gridItems.push({
      type: 'image',
      id: `look-${imageCounter}`,
      lookNumber: imageCounter,
      title: title || details.title || `Look ${imageCounter}`,
      image: src,
      description: details.descriptionText || '',
      collectionTag: details.collection || 'Signature Collection'
    });
  }
});

console.log('Total grid items:', gridItems.length);
console.log('Sample image item:', gridItems[0]);

fs.writeFileSync('src/data/moniqueSpring2025Data.js', `export const MONIQUE_LOOKBOOK_SPRING_2025 = ${JSON.stringify(gridItems, null, 2)};\n`);
console.log('Saved to src/data/moniqueSpring2025Data.js');
