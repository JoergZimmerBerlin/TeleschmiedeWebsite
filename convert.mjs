import sharp from 'sharp';
import fs from 'fs';

const input = '/Users/jorti/.gemini/antigravity/brain/538315fe-b6d5-45a1-8644-ee0276527bb1/citation_frequency_1787263497161.jpg';
const outputDir = 'src/assets/images/glossar/3d-light';
const output = outputDir + '/glossar-citation-frequency-3d.webp';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

sharp(input)
  .webp({ quality: 80 })
  .toFile(output)
  .then(() => console.log('Converted to ' + output))
  .catch(err => console.error(err));
