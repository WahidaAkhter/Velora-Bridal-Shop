// Automated verification test of all data and pages
import { PRODUCTS, COLOR_DRESSES, CATEGORIES } from '../src/data/products.js';
import { QUICK_SHIP_GOWNS, QUICK_SHIP_HERO_INFO } from '../src/data/quickShipData.js';
import { SIGNATURE_GOWNS_PAGES } from '../src/data/signatureStylesData.js';
import { WEDDING_DRESS_OPTIONS_DATA } from '../src/data/weddingDressesFeatures.js';
import { VOUCHERS, INITIAL_USER } from '../src/data/vouchers.js';
import fs from 'fs';
import path from 'path';

let errors = [];

function checkFile(relPath, label) {
  const full = path.join(process.cwd(), 'public', relPath);
  if (!fs.existsSync(full)) {
    errors.push(`Missing asset: ${relPath} for [${label}]`);
  }
}

console.log('--- 1. Testing Products Data ---');
PRODUCTS.forEach(p => {
  if (!p.id || !p.name || !p.price || !p.images || p.images.length === 0) {
    errors.push(`Invalid product: ${JSON.stringify(p)}`);
  }
  p.images.forEach(img => {
    if (img.startsWith('/')) checkFile(img, `Product ${p.name}`);
  });
});
console.log(`✓ Checked ${PRODUCTS.length} standard products.`);

console.log('--- 2. Testing Shop By Color Gowns ---');
COLOR_DRESSES.forEach(c => {
  if (!c.id || !c.colorName || !c.image) errors.push(`Invalid color dress: ${c.id}`);
  if (c.image.startsWith('/')) checkFile(c.image, `Color ${c.colorName}`);
});
console.log(`✓ Checked ${COLOR_DRESSES.length} color collection dresses.`);

console.log('--- 3. Testing Quick Ship Gowns ---');
QUICK_SHIP_GOWNS.forEach(g => {
  if (!g.id || !g.name || !g.price || !g.images) errors.push(`Invalid quick ship gown: ${g.id}`);
  g.images.forEach(img => {
    if (img.startsWith('/')) checkFile(img, `Quick Ship ${g.name}`);
  });
});
console.log(`✓ Checked ${QUICK_SHIP_GOWNS.length} quick ship gowns.`);

console.log('--- 4. Testing Signature Styles Pages 1 to 8 ---');
for (let i = 1; i <= 8; i++) {
  const page = SIGNATURE_GOWNS_PAGES[i];
  if (!page || page.length === 0) {
    errors.push(`Missing signature page ${i}`);
  } else {
    page.forEach(g => {
      if (g.image.startsWith('/')) checkFile(g.image, `Signature Gown ${g.name}`);
    });
  }
}
console.log(`✓ Checked all 8 pages of signature gowns.`);

console.log('--- 5. Testing Wedding Dress Feature Categories ---');
const featureKeys = Object.keys(WEDDING_DRESS_OPTIONS_DATA);
featureKeys.forEach(k => {
  const feat = WEDDING_DRESS_OPTIONS_DATA[k];
  if (!feat.title || !feat.heroImage) errors.push(`Missing feature info for [${k}]`);
  if (feat.heroImage.startsWith('/')) checkFile(feat.heroImage, `Feature [${k}] hero`);
  (feat.curatedGowns || []).forEach(cg => {
    if (cg.image && cg.image.startsWith('/')) checkFile(cg.image, `Curated Gown ${cg.name}`);
  });
});
console.log(`✓ Checked ${featureKeys.length} wedding dress feature options.`);

console.log('--- 6. Testing User & Initial Appointments ---');
if (!INITIAL_USER.appointments || INITIAL_USER.appointments.length === 0) {
  errors.push('INITIAL_USER is missing appointments array');
}
if (!INITIAL_USER.orders || INITIAL_USER.orders.length === 0) {
  errors.push('INITIAL_USER is missing orders array');
}
console.log(`✓ Checked INITIAL_USER: ${INITIAL_USER.name}, ${INITIAL_USER.appointments.length} appointments, ${INITIAL_USER.orders.length} orders.`);

console.log('\n=======================================');
if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} errors:`);
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
} else {
  console.log('ALL 6 PAGE DATASETS & 100+ ASSETS VERIFIED PERFECTLY! ZERO ERRORS.');
}
