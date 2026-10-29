import fs from 'fs';
const products = JSON.parse(fs.readFileSync('scratch/rosaclara_products.json'));
console.log('Total count:', products.length);
products.forEach((p, i) => console.log(`${i+1}. ${p.name}: ${p.image}`));
