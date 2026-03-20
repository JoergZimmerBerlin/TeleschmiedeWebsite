import fs from 'node:fs';
import path from 'node:path';

const GLOSSAR_DIR = './src/content/glossar';
const BLOG_DIR = './src/content/blog';
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
        slug: slug,
        type: 'glossar'
      });
    }
  }
  return terms;
}

// 2. Load Blog Posts
function loadBlog() {
  const posts = [];
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const titleMatch = content.match(/title:\s*"(.*?)"/);
    const descMatch = content.match(/description:\s*"(.*?)"/);
    const slug = file.replace(/\.mdx?$/, '');
    
    if (titleMatch) {
      posts.push({
        title: titleMatch[1].replace(/[:"]/g, ''), // Clean title for matching
        description: descMatch ? descMatch[1] : '',
        slug: slug,
        type: 'blog'
      });
    }
  }
  return posts;
}

// 3. Process HTML Files
function processDirectory(dir, allTerms) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath, allTerms);
    } else if (item.endsWith('.html')) {
      linkHtml(fullPath, allTerms);
    }
  }
}

function linkHtml(filePath, allTerms) {
  const absolutePath = path.resolve(filePath);
  const currentFileName = path.basename(filePath, '.html');
  
  let html = fs.readFileSync(filePath, 'utf-8');
  
  // Content areas to scan
  let startIdx = html.indexOf('id="blog-content"');
  if (startIdx === -1) {
    startIdx = html.indexOf('class="blog-content prose');
  }
  
  if (startIdx === -1) return;

  const startTagEnd = html.indexOf('>', startIdx);
  if (startTagEnd === -1) return;
  
  let endDivIdx = html.indexOf('</div> </div> </div>', startTagEnd); 
  if (endDivIdx === -1) {
    endDivIdx = html.indexOf('</div>', startTagEnd);
  }
  if (endDivIdx === -1) return;

  let content = html.substring(startTagEnd + 1, endDivIdx);
  const originalContent = content;

  const glossaryMap = new Map();
  const patternParts = [];
  
  for (const term of allTerms) {
    // Skip if it's the current page
    if (currentFileName === term.slug) continue;
    if (filePath.includes(`/${term.type}/${term.slug}/`)) continue;
    
    // Exact title match (case insensitive)
    const escapedTitle = term.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    patternParts.push(escapedTitle);
    glossaryMap.set(term.title.toLowerCase(), term);
  }

  if (patternParts.length === 0) return;

  const unifiedRegex = new RegExp(`\\b(${patternParts.join('|')})\\b`, 'gi');
  let matchesCount = 0;
  const linkedTerms = new Set(); // Link each term only ONCE per page for better UX

  content = content.replace(unifiedRegex, (match, p1, offset) => {
    const term = glossaryMap.get(match.toLowerCase());
    if (!term || linkedTerms.has(term.slug)) return match;

    const upToMatch = content.substring(0, offset);
    
    // Safety checks
    const lastOpen = upToMatch.lastIndexOf('<');
    const lastClose = upToMatch.lastIndexOf('>');
    if (lastOpen > lastClose) return match;

    const lastAOpen = upToMatch.toLowerCase().lastIndexOf('<a');
    const lastAClose = upToMatch.toLowerCase().lastIndexOf('</a');
    if (lastAOpen > lastAClose) return match;

    const lastHOpen = upToMatch.toLowerCase().lastIndexOf('<h');
    const lastHClose = upToMatch.toLowerCase().lastIndexOf('</h');
    if (lastHOpen > lastHClose) {
        const headingTagMatch = upToMatch.substring(lastHOpen).match(/^<h[1-6]/i);
        if (headingTagMatch) return match;
    }

    matchesCount++;
    linkedTerms.add(term.slug);
    
    if (term.type === 'glossar') {
        return `<a href="/glossar/${term.slug}/" class="glossary-link" data-tooltip-title="${term.title}" data-tooltip-body="${term.description}">${match}</a>`;
    } else {
        return `<a href="/blog/${term.slug}/" class="internal-blog-link text-lime-600 underline decoration-lime-300 font-medium">${match}</a>`;
    }
  });

  if (content !== originalContent) {
    const newHtml = html.substring(0, startTagEnd + 1) + content + html.substring(endDivIdx);
    fs.writeFileSync(filePath, newHtml);
    console.log(`✅ Linked ${matchesCount} items in: ${filePath}`);
  }
}

console.log('🚀 Starting Intelligent Cross-Linking (Blog & Glossar)...');
const glossary = loadGlossary();
const blog = loadBlog();
const allTerms = [...glossary, ...blog].sort((a, b) => b.title.length - a.title.length);

console.log(`📚 Loaded ${glossary.length} glossary terms and ${blog.length} blog posts.`);

if (fs.existsSync(DIST_DIR)) {
  processDirectory(DIST_DIR, allTerms);
  console.log('✨ Cross-Linking Complete!');
} else {
  console.error('❌ dist directory not found. Run build first.');
}
