import fs from 'fs';
import path from 'path';

const dir = 'src/content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.match(/category:\s*"(Technisches SEO|SEO Tools)"/)) {
    content = content.replace(/category:\s*"(Technisches SEO|SEO Tools)"/, 'category: "Tech SEO & Tools"');
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}
