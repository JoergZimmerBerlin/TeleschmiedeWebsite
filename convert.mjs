import sharp from 'sharp';
import path from 'path';

const input = '/Users/jorti/.gemini/antigravity/brain/538315fe-b6d5-45a1-8644-ee0276527bb1/glossar_grounding_queries_1787266172127.jpg';
const output = '/Users/jorti/Documents/Antigravity/src/assets/images/glossar/3d-light/glossar-grounding-queries-3d.webp';

sharp(input)
  .webp({ quality: 80 })
  .toFile(output)
  .then(() => console.log('Successfully converted to WEBP:', output))
  .catch(err => console.error('Error converting:', err));
