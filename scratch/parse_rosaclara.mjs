import fs from 'fs';

const html = fs.readFileSync('scratch/rosaclara.html', 'utf8');

const regex = /<item class="product">([\s\S]*?)<\/item>/gi;
let match;
const products = [];

while ((match = regex.exec(html)) !== null) {
  const block = match[1];
  const nameMatch = block.match(/<span class="product-name">([^<]+)<\/span>/i);
  const dataSrcMatch = block.match(/data-src="([^"]+)"/i) || block.match(/src="([^"]+)"/i);
  const altSrcMatch = block.match(/data-alt-src="([^"]+)"/i);
  const hrefMatch = block.match(/href="([^"]+)"/i);

  if (dataSrcMatch && nameMatch) {
    products.push({
      name: nameMatch[1].trim(),
      image: dataSrcMatch[1],
      altImage: altSrcMatch ? altSrcMatch[1] : null,
      link: hrefMatch ? hrefMatch[1] : null
    });
  }
}

console.log('Total products extracted:', products.length);
console.log('First 12 products:');
console.log(JSON.stringify(products.slice(0, 12), null, 2));

// Save all products to a json file
fs.writeFileSync('scratch/rosaclara_products.json', JSON.stringify(products, null, 2));
