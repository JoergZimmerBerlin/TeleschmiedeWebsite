import fs from 'fs';
import path from 'path';

const dir = 'src/content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const counts = {
  'SEO Praxis': 0,
  'AI SEO': 0,
  'Tech SEO & Tools': 0,
  'Events & Networking': 0
};

let fallbackCount = 0;

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  const match = content.match(/category:\s*"([^"]+)"/);
  
  let cat = 'SEO Praxis'; // fallback
  if (match) {
    cat = match[1];
  } else {
    fallbackCount++;
  }

  if (counts[cat] !== undefined) {
    counts[cat]++;
  } else {
    counts[cat] = 1; // track unexpected categories just in case
  }
}

console.log('--- KATEGORIEN-ZÄHLUNG ---');
console.log(`Insgesamt gefundene Blog-Artikel: ${files.length}`);
console.log(`Davon ohne Kategorie (automatisch "SEO Praxis"): ${fallbackCount}\n`);

for (const [key, value] of Object.entries(counts)) {
  console.log(`${key}: ${value} Artikel`);
}
