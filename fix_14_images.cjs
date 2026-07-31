const fs = require('fs');
const path = require('path');

const updates = [
  { file: 'cloudflare-agent-readiness-scan.md', img: 'cloudflare-agent-readiness-scan.webp' },
  { file: 'geo-seo-agentic-eigene-disziplin.md', img: 'geo_nebenbei.jpg' },
  { file: 'ich-befinde-mich-in-der-geo-transformation.md', img: 'geo_transformation.jpg' },
  { file: 'ki-website-leuchtturm.md', img: 'ki-website-leuchtturm.webp' },
  { file: 'linkedin-google-bewertungen.md', img: 'linkedin-google-bewertungen.webp' },
  { file: 'reines-seo-vs-geo.md', img: 'reines-seo-vs-geo.webp' },
  { file: 'se-ranking-chatgpt-app.md', img: 'se-ranking-chatgpt.webp' },
  { file: 'se-ranking-ki-sichtbarkeit.md', img: 'se-ranking-ki-sichtbarkeit.webp' },
  { file: 'seo-mega-prompt-claude-agent.md', img: 'mega_prompt_claude.jpg' },
  { file: 'seo-stammtisch-berlin-axel-springer.md', img: 'linkedin-stammtisch-berlin.jpg' },
  { file: 'seo-wird-groesser-geo-welle.md', img: 'seo_wird_groesser.jpg' },
  { file: 'sistrix-podcast-entitaeten-mapping.md', img: 'linkedin-sistrix-podcast.jpg' },
  { file: 'tldv-meeting-notetaker-ki.md', img: 'tldv-meeting-notetaker-ki.webp' },
  { file: 'transparente-seo-preise-erfahrung.md', img: 'transparente-seo-preise-erfahrung.webp' }
];

const dir = path.join(__dirname, 'src', 'content', 'blog');

for (const update of updates) {
  const filePath = path.join(dir, update.file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${update.file}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the image in frontmatter
  const regex = /^image:\s*".*?"/m;
  const newImageLine = `image: "../../assets/images/blog/${update.img}"`;
  
  if (regex.test(content)) {
    content = content.replace(regex, newImageLine);
  } else {
    console.log(`Warning: Could not find image: in ${update.file}`);
  }
  
  // Replace any inline markdown images that use the old generated dummy image path
  const inlineImageRegex = /!\[(.*?)\]\(\/.*?\.jpg\)/g;
  content = content.replace(inlineImageRegex, `![$1](../../assets/images/blog/${update.img})`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${update.file} -> ${update.img}`);
}
