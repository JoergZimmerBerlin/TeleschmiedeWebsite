import sharp from 'sharp';
import { resolve } from 'path';
import { existsSync, readdirSync, unlinkSync } from 'fs';

const directory = '/Users/jorti/Documents/Antigravity/src/assets/images/glossar/3d-light/';
const files = [
  'glossar-google-search-console-3d.png',
  'glossar-google-core-update-3d.png',
  'glossar-sichtbarkeitsmanagement-3d.png',
  'glossar-ctr-3d.png',
  'glossar-keywordrecherche-3d.png'
];

async function convert() {
  for (const file of files) {
    const inputPath = resolve(directory, file);
    const outputPath = inputPath.replace('.png', '.webp');

    if (existsSync(inputPath)) {
      console.log(`Converting ${file} to WebP...`);
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      console.log(`✅ Converted to ${outputPath}`);
      
      // Cleanup PNG
      unlinkSync(inputPath);
    } else {
      console.error(`❌ File not found: ${inputPath}`);
    }
  }
}

convert();
