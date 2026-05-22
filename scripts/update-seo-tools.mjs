import fs from 'fs';
import path from 'path';

const files = [
  'beste-seo-tools-ai-search-prompt-tracking.md',
  'se-ranking-ai-tracker.md',
  'se-ranking-api-claude-code-praxis-test.md',
  'se-ranking-api-claude-code-setup.md',
  'se-ranking-api-endpunkte-kompass.md',
  'se-ranking-preise.md',
  'sistrix-vs-se-ranking.md'
];

for (const file of files) {
  const filePath = path.join('src/content/blog', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    // Replace the category line
    if (content.match(/^category:\s*".*?"/m)) {
      content = content.replace(/^category:\s*".*?"/m, 'category: "SEO Tools"');
    } else {
      // insert after title if category doesn't exist
      content = content.replace(/^title:\s*".*?"/m, `$&` + '\ncategory: "SEO Tools"');
    }
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}
