

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

async function main() {
  console.log('── Evolvia Tech Image Optimization ──');
  
  let sharp;
  try {
    const sharpModule = await import('sharp');
    sharp = sharpModule.default;
  } catch {
    console.error('sharp is not installed locally.');
    console.log('\nTo optimize images, run one of the following commands:');
    console.log('  Option 1: npx --yes sharp-cli -i "public/*.webp" -o public/ --webp');
    console.log('  Option 2: npm install --save-dev sharp && node scripts/optimize-images.mjs && npm uninstall sharp\n');
    process.exit(1);
  }

  const files = fs.readdirSync(publicDir).filter((f) => f.endsWith('.webp'));
  console.log(`Found ${files.length} WebP images in public/\n`);

  for (const file of files) {
    const inputPath = path.join(publicDir, file);
    const stat = fs.statSync(inputPath);
    const initialSizeKb = (stat.size / 1024).toFixed(1);

    let maxWidth = 800;
    let quality = 82;

    if (file === 'hero-poster.webp' || file === 'about.webp') {
      maxWidth = 1600;
      quality = 80;
    } else if (file.startsWith('logo')) {
      maxWidth = 320;
      quality = 88;
    } else if (file === 'asset-16.webp' || file === 'asset-18.webp' || file === 'asset-19.webp') {
      // Team / portrait images
      maxWidth = 600;
      quality = 82;
    }

    try {
      const metadata = await sharp(inputPath).metadata();
      if (!metadata.width) continue;

      const targetWidth = Math.min(metadata.width, maxWidth);
      const tempPath = `${inputPath}.tmp.webp`;

      await sharp(inputPath)
        .resize({ width: targetWidth, withoutEnlargement: true })
        .webp({ quality, effort: 6 })
        .toFile(tempPath);

      fs.renameSync(tempPath, inputPath);
      const newSizeKb = (fs.statSync(inputPath).size / 1024).toFixed(1);
      console.log(`✓ ${file}: ${initialSizeKb} KB → ${newSizeKb} KB (max ${targetWidth}px)`);
    } catch (err) {
      console.error(`✗ Error processing ${file}:`, err.message);
    }
  }

  console.log('\nImage optimization finished.');
}

main();
