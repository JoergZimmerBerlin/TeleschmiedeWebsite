import fs from 'fs';
import path from 'path';

const dir = 'src/content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  if (!content.match(/category:\s*"/)) {
    console.log(file);
  }
}
