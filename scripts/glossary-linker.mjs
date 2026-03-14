import fs from 'node:fs';
import path from 'node:path';

const GLOSSAR_DIR = './src/content/glossar';
const DIST_DIR = './dist';

// 1. Load Glossary Terms
function loadGlossary() {
  const terms = [];
  const files = fs.readdirSync(GLOSSAR_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(GLOSSAR_DIR, file), 'utf-8');
    const titleMatch = content.match(/title:\s*"(.*?)"/);
    const descMatch = content.match(/description:\s*"(.*?)"/);
    const slug = file.replace(/\.mdx?$/, '');
    
    if (titleMatch) {
      terms.push({
        title: titleMatch[1],
        description: descMatch ? descMatch[1] : '',
        slug: slug
      });
    }
  }
  // Sort by length descending to match longer terms first (e.g., "Core Web Vitals" before "SEO")
  return terms.sort((a, b) => b.title.length - a.title.length);
}

// 2. Process HTML Files
function processDirectory(dir, glossary) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath, glossary);
    } else if (item.endsWith('.html')) {
      linkHtml(fullPath, glossary);
    }
  }
}

function linkHtml(filePath, glossary) {
  const absolutePath = path.resolve(filePath);
  if (!absolutePath.includes('/blog/') && !absolutePath.includes('/glossar/')) return;
  
  let html = fs.readFileSync(filePath, 'utf-8');
  
  // Try ID first, then class
  let startIdx = html.indexOf('id="blog-content"');
  if (startIdx === -1) {
    startIdx = html.indexOf('class="blog-content prose');
  }
  
  if (startIdx === -1) return;

  const startTagEnd = html.indexOf('>', startIdx);
  if (startTagEnd === -1) return;
  
  // Find the end of this content area by searching for the corresponding </div>
  // Using a simpler approach that just finds the end of the section
  let endDivIdx = html.indexOf('</div> </div> </div>', startTagEnd); 
  if (endDivIdx === -1) {
    endDivIdx = html.indexOf('</div>', startTagEnd);
  }
  if (endDivIdx === -1) return;

  let content = html.substring(startTagEnd + 1, endDivIdx);
  const originalContent = content;
  let matchesCount = 0;

  // Link terms
  for (const term of glossary) {
    if (filePath.includes(`/glossar/${term.slug}/`)) continue;

    const regex = new RegExp(`\\b(${term.title})\\b`, 'gi');
    
    content = content.replace(regex, (match, offset) => {
      const upToMatch = content.substring(0, offset);
      const openTags = upToMatch.match(/<[a-zA-Z]+/g) || [];
      const closeTags = upToMatch.match(/<\/[a-zA-Z]+/g) || [];
      if (openTags.length > closeTags.length) return match;

      const lastAOpen = upToMatch.lastIndexOf('<a');
      const lastAClose = upToMatch.lastIndexOf('</a');
      if (lastAOpen > lastAClose) return match;

      const lastHOpen = upToMatch.search(/<h[1-6]/i);
      const lastHClose = upToMatch.search(/<\/h[1-6]/i);
      if (lastHOpen > lastHClose) return match;

      matchesCount++;
      return `<a href="/glossar/${term.slug}/" class="glossary-link" data-tooltip-title="${term.title}" data-tooltip-body="${term.description}">${match}</a>`;
    });
  }

  if (content !== originalContent) {
    const newHtml = html.substring(0, startTagEnd + 1) + content + html.substring(endDivIdx);
    fs.writeFileSync(filePath, newHtml);
    console.log(`✅ Linked ${matchesCount} terms in: ${filePath}`);
  }
}

console.log('🚀 Starting Server-Side Glossary Linking...');
const glossary = loadGlossary();
console.log(`📚 Loaded ${glossary.length} terms.`);

if (fs.existsSync(DIST_DIR)) {
  processDirectory(DIST_DIR, glossary);
  console.log('✨ Build-Time Linking Complete!');
} else {
  console.error('❌ dist directory not found. Run build first.');
}
