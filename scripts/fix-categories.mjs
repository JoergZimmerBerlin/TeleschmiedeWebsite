import fs from 'fs';
import path from 'path';

const dir = 'src/content/blog';
const filesToFix = [
  'highlights-2025-jahresrueckblick.md',
  'willkommen-seo-jahr-2026.md',
  'einfachste-seo-verhaeltnisse.md',
  'google-search-console-zustaendigkeit-umfrage.md',
  'seo-feuerwehr-rettung.md',
  'seo-relaunch-klassiker-meme.md',
  'zwei-stunden-seo-potential.md'
];

for (const file of filesToFix) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.match(/category:\s*"SEO Strategie"/)) {
    content = content.replace(/category:\s*"SEO Strategie"/, 'category: "SEO Praxis"');
  } else if (!content.match(/category:\s*"/)) {
    // Insert after date
    content = content.replace(/(date:\s*"[^"]+"\n)/, '$1category: "SEO Praxis"\n');
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${file}`);
}
