import fs from 'fs';
import path from 'path';

const files = [
  'freelance-unlocked-eis.md',
  'freelancer-team-omr-hamburg.md',
  'omr-2026-mission-freelancer-team.md',
  'omr-freelancer-stand-roi.md',
  'ai-connect-berlin-networking.md',
  'campixx-seo-agentur-umfrage.md',
  'linkedin-ist-ein-forum-seo.md',
  'wir-seos-sind-schuld-community.md',
  'wir-seos-zusammenhalt.md'
];

for (const file of files) {
  const filePath = path.join('src/content/blog', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    // Replace the category line
    if (content.match(/^category:\s*".*?"/m)) {
      content = content.replace(/^category:\s*".*?"/m, 'category: "Events & Networking"');
    } else {
      // insert after title if category doesn't exist
      content = content.replace(/^title:\s*".*?"/m, `$&` + '\ncategory: "Events & Networking"');
    }
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}
