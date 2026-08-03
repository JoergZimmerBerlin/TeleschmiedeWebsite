const fs = require('fs');
const path = require('path');

const contentDirs = [
  path.join(__dirname, '../src/content/blog'),
  path.join(__dirname, '../src/content/glossar')
];

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = contentDirs.flatMap(dir => getAllFiles(dir));

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Extract description
  const descMatch = content.match(/^description:\s*(["']?)(.*?)\1$/m);
  if (!descMatch) continue;
  
  const description = descMatch[2];
  
  // Extract meta_description
  const metaDescMatch = content.match(/^meta_description:\s*(["']?)(.*?)\1$/m);
  
  let changed = false;
  
  if (!metaDescMatch) {
    // missing, insert after description
    content = content.replace(/^description:(.*)$/m, \`description:$1\\nmeta_description: "\${description}"\`);
    changed = true;
  } else if (metaDescMatch[2] !== description) {
    // replace it
    content = content.replace(/^meta_description:\s*(["']?).*?\1$/m, \`meta_description: "\${description}"\`);
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log('Synced meta_description for ' + path.basename(file));
  }
}
