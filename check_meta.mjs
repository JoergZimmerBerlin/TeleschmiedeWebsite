import fs from 'fs';
import path from 'path';

const dirs = ['./src/content/blog', './src/content/glossar'];
let count = 0;
let total = 0;
let overTitle = 0;
let overDesc = 0;
const filesToFix = [];

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  for (const file of files) {
    total++;
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const titleMatch = content.match(/^title:\s*['"]?(.*?)['"]?\s*$/m);
    const descMatch = content.match(/^description:\s*['"]?(.*?)['"]?\s*$/m);
    
    let needsFix = false;
    let tLen = 0;
    let dLen = 0;
    if (titleMatch) {
      tLen = titleMatch[1].length;
      if (tLen > 50) { needsFix = true; overTitle++; }
    }
    if (descMatch) {
      dLen = descMatch[1].length;
      if (dLen > 150) { needsFix = true; overDesc++; }
    }
    
    if (needsFix) {
      count++;
      filesToFix.push({file: path.join(dir, file), titleLength: tLen, descLength: dLen, title: titleMatch ? titleMatch[1] : '', desc: descMatch ? descMatch[1] : ''});
    }
  }
}

fs.writeFileSync('meta_check_results.json', JSON.stringify({
  total, count, overTitle, overDesc, filesToFix
}, null, 2));
console.log(`Total files: ${total}, Needing fix: ${count}`);
