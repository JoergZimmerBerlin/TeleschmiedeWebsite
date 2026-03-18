import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirsToProcess = [
  path.join(__dirname, '../src/content/glossar'),
  path.join(__dirname, '../src/content/blog')
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.md')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Update paths to default themes folder
      content = content.replace(/\.\.\/\.\.\/assets\/images\/glossar\//g, '../../assets/images/glossar/themes/');
      
      // Fix paths that were already in subdirectories
      content = content.replace(/\.\.\/\.\.\/assets\/images\/glossar\/themes\/3d-light\//g, '../../assets/images/glossar/3d-light/');
      content = content.replace(/\.\.\/\.\.\/assets\/images\/glossar\/themes\/photos\//g, '../../assets/images/glossar/photos/');
      
      // Change extensions to .webp for image lines in frontmatter or standard markdown images
      content = content.replace(/image: "(.+?)\.(png|jpg)"/g, 'image: "$1.webp"');
      content = content.replace(/!\[(.*?)\]\((.+?)\.(png|jpg)\)/g, '![$1]($2.webp)');

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

for (const dir of dirsToProcess) {
  if (fs.existsSync(dir)) {
    processDirectory(dir);
  }
}

console.log('Finished updating image paths and converting to .webp extensions.');
