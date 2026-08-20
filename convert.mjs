import sharp from 'sharp';
import path from 'path';

const input = '/Users/jorti/.gemini/antigravity/brain/538315fe-b6d5-45a1-8644-ee0276527bb1/blog_se_ranking_test_1787267379399.jpg';
const output = '/Users/jorti/Documents/Antigravity/src/assets/images/blog/3d-light/se-ranking-test-2026.webp';

sharp(input)
  .webp({ quality: 80 })
  .toFile(output)
  .then(() => console.log('Successfully converted to WEBP:', output))
  .catch(err => console.error('Error converting:', err));
