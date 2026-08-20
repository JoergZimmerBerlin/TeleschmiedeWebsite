import sharp from 'sharp';
import fs from 'fs';

const input = '/Users/jorti/.gemini/antigravity/brain/538315fe-b6d5-45a1-8644-ee0276527bb1/chatgpt_unternehmen_1787262523306.jpg';
const outputDir = 'src/assets/images/blog/3d-light';
const output = outputDir + '/chatgpt-unternehmen-3d.webp';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

sharp(input)
  .webp({ quality: 80 })
  .toFile(output)
  .then(() => console.log('Converted to ' + output))
  .catch(err => console.error(err));
