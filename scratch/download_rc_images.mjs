import fs from 'fs';
import path from 'path';

const products = JSON.parse(fs.readFileSync('scratch/rosaclara_products.json', 'utf8'));
const outDir = 'public/images/bridal/rosa-clara';
fs.mkdirSync(outDir, { recursive: true });

async function downloadAll() {
  const downloaded = [];

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    // skip video links
    if (!p.image.endsWith('.jpg') && !p.image.endsWith('.png') && !p.image.endsWith('.webp')) {
      continue;
    }

    const cleanName = p.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const fullUrl = p.image.replace('-thumb.jpg', '.jpg');
    const thumbUrl = p.image;
    const destFile = path.join(outDir, `${cleanName}.jpg`);

    try {
      let res = await fetch(fullUrl);
      if (!res.ok) {
        res = await fetch(thumbUrl);
      }

      if (res.ok) {
        const buf = await res.arrayBuffer();
        fs.writeFileSync(destFile, Buffer.from(buf));
        const relPath = `/images/bridal/rosa-clara/${cleanName}.jpg`;
        console.log(`[${i + 1}/${products.length}] Saved ${cleanName}.jpg (${buf.byteLength} bytes)`);
        downloaded.push({
          name: p.name,
          image: relPath,
          fullUrl,
          link: p.link,
          size: buf.byteLength
        });
      } else {
        console.warn(`Failed to fetch ${p.name}: ${res.status}`);
      }
    } catch (e) {
      console.error(`Error downloading ${p.name}:`, e.message);
    }
  }

  fs.writeFileSync('scratch/downloaded_rc_dresses.json', JSON.stringify(downloaded, null, 2));
  console.log(`\nSuccessfully downloaded ${downloaded.length} images from Rosa Clara!`);
}

downloadAll();
