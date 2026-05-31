import fs from 'fs';
import path from 'path';

const dir = 'src/content/glossar';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

const missing = [];
const stats = {
  'SEO Basics & Onpage': 0,
  'Technisches SEO & UX': 0,
  'AI SEO & Generative Search': 0,
  'E-E-A-T & Offpage': 0
};

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  const match = content.match(/category:\s*"(.*?)"/);
  
  if (!match) {
    missing.push(file);
  } else {
    const cat = match[1];
    if (stats[cat] !== undefined) {
      stats[cat]++;
    } else {
      console.log(`Unknown category in ${file}: ${cat}`);
    }
  }
}

console.log(`Total files: ${files.length}`);
console.log(`Files missing category: ${missing.length}`);
if (missing.length > 0) {
  console.log('Missing files:', missing);
}
console.log('Stats:', stats);
