import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const bgPath = 'C:/Users/mdsiu/.gemini/antigravity-ide/brain/a6ad8818-4e89-4fee-b4d4-b72d23350203/bridal_salon_arch_1791480382070.jpg';
const modelJpgPath = 'public/images/model-bride.jpg';
const outDir = 'public/images/bridal';

async function processModel() {
  const modelImg = sharp(modelJpgPath);
  const { data, info } = await modelImg.raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const rgba = Buffer.alloc(width * height * 4);

  // Smooth background keying for studio white backdrop
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];

    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;

    // Background is near white (r > 235 && g > 235 && b > 235)
    // Floor shadow under dress has slight grey (r > 200, g > 195, b > 195)
    const brightness = (r + g + b) / 3;
    const isStudioWhite = r > 238 && g > 238 && b > 238;

    if (isStudioWhite) {
      rgba[i * 4 + 3] = 0; // Transparent
    } else if (r > 218 && g > 218 && b > 218) {
      // Soft transition edge
      const alpha = Math.max(0, Math.min(255, Math.round(((238 - brightness) / 20) * 255)));
      rgba[i * 4 + 3] = alpha;
    } else {
      rgba[i * 4 + 3] = 255;
    }
  }

  // Save clean transparent cutout
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(path.join(outDir, 'model-bride-clean.png'));

  console.log('Saved clean transparent bride cutout');

  // Now resize model to fit nicely in the 896x1200 background
  // Background arch is center width ~896, height ~1200
  // Bride should stand from y ~240 down to y ~1160 (height ~920px)
  const targetHeight = 940;
  const resizedModel = await sharp(path.join(outDir, 'model-bride-clean.png'))
    .resize({ height: targetHeight })
    .toBuffer();

  const resizedMeta = await sharp(resizedModel).metadata();
  const leftPos = Math.round((896 - resizedMeta.width) / 2);
  const topPos = 1200 - targetHeight - 20; // resting on parquet floor

  // Create subtle contact shadow under dress
  const shadowCanvas = Buffer.alloc(896 * 1200 * 4, 0);

  // Composite model onto background arch
  await sharp(bgPath)
    .composite([
      {
        input: resizedModel,
        top: topPos,
        left: leftPos
      }
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'hero-composite-bride.jpg'));

  console.log('Saved hero composite bride in bridal salon!');
}

processModel().catch(console.error);
