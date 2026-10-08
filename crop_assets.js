import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcImg = 'public/images/Exquisite Lavish Timeless Elegant Splendid Bridal Apparel Online Store UI Layout Branding Design.jpeg';
const outDir = 'public/images/bridal';

async function perfectExtract() {
  const img = sharp(srcImg);
  const meta = await img.metadata();
  console.log(`Original image size: ${meta.width} x ${meta.height}`);

  // 1. Logo (from header)
  await img.clone()
    .extract({ left: 22, top: 38, width: 165, height: 40 })
    .toFile(path.join(outDir, 'logo.png'));

  // 2. Hero Background / Hero model
  // Full hero right side (model in arch):
  await img.clone()
    .extract({ left: 350, top: 82, width: 386, height: 330 })
    .toFile(path.join(outDir, 'hero-bride.jpg'));

  // 3. Shop by Color: 7 gowns (Y: 502, Height: 134)
  // Let's accurately sample the X coordinates for each of the 7 cards:
  // Card 1: Ivory (left ~30, width ~88)
  // Card 2: Champagne (left ~129, width ~88)
  // Card 3: Blush Pink (left ~227, width ~88)
  // Card 4: Dusty Blue (left ~326, width ~88)
  // Card 5: Sage Green (left ~425, width ~88)
  // Card 6: Lavender (left ~523, width ~88)
  // Card 7: Black (left ~620, width ~88)
  const colors = [
    { name: 'ivory', left: 30, width: 88 },
    { name: 'champagne', left: 128, width: 88 },
    { name: 'blush-pink', left: 226, width: 88 },
    { name: 'dusty-blue', left: 326, width: 88 },
    { name: 'sage-green', left: 425, width: 88 },
    { name: 'lavender', left: 523, width: 88 },
    { name: 'black', left: 620, width: 88 }
  ];

  for (const c of colors) {
    await img.clone()
      .extract({ left: c.left, top: 502, width: c.width, height: 134 })
      .toFile(path.join(outDir, `color-${c.name}.jpg`));
  }

  // 4. Featured collection: 4 dress images (Y: 706, Height: 148)
  // Card 1: Lace Dream Gown (left ~30, width ~160)
  // Card 2: Satin Elegance (left ~203, width ~160)
  // Card 3: Floral Fantasy (left ~375, width ~160)
  // Card 4: Modern Romance (left ~546, width ~160)
  const featured = [
    { name: 'lace-dream', left: 30, width: 160 },
    { name: 'satin-elegance', left: 202, width: 160 },
    { name: 'floral-fantasy', left: 374, width: 160 },
    { name: 'modern-romance', left: 546, width: 160 }
  ];

  for (const f of featured) {
    await img.clone()
      .extract({ left: f.left, top: 706, width: f.width, height: 148 })
      .toFile(path.join(outDir, `featured-${f.name}.jpg`));
  }

  // 5. Testimonial Avatars (Bottom left)
  await img.clone()
    .extract({ left: 60, top: 1045, width: 100, height: 32 })
    .toFile(path.join(outDir, 'avatars.png'));

  console.log('All crops successfully extracted!');
}

perfectExtract().catch(console.error);
