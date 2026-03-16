import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST_DIR = './dist';

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

function extractInternalLinks(html) {
  const links = [];
  const regex = /href=["']([^"'\s#]+?)["']/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const href = match[1];
    // Nur interne Links prüfen (starten mit /)
    if (href.startsWith('/') && !href.startsWith('//')) {
      links.push(href);
    }
  }
  return links;
}

function checkLinks() {
  console.log('🧪 Starting Local Link Validation in /dist...');
  
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Error: dist directory not found. Run build first.');
    process.exit(1);
  }

  const htmlFiles = getHtmlFiles(DIST_DIR);
  let totalLinks = 0;
  let brokenLinksCount = 0;
  const brokenLinks = [];

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const links = extractInternalLinks(content);
    
    for (const link of links) {
      totalLinks++;
      
      // Clean URL: remove query params and hashes
      let cleanPath = link.split('?')[0].split('#')[0];
      
      // Map absolute path to local dist file
      let targetPath;
      if (cleanPath === '/' || cleanPath === '') {
        targetPath = path.join(DIST_DIR, 'index.html');
      } else {
        // Remove leading slash for local mapping
        const relativePath = cleanPath.substring(1);
        
        // Verschiedene Pfad-Varianten prüfen
        const variants = [
            path.join(DIST_DIR, relativePath), // Exakt (z.B. assets/...)
            path.join(DIST_DIR, relativePath, 'index.html'), // Directory (z.B. /blog)
            path.join(DIST_DIR, relativePath.endsWith('/') ? relativePath + 'index.html' : relativePath + '/index.html')
        ];
        
        targetPath = variants.find(v => fs.existsSync(v));
      }

      if (!targetPath || !fs.existsSync(targetPath)) {
        brokenLinksCount++;
        brokenLinks.push({
          source: file,
          target: link
        });
      }
    }
  }

  console.log(`📊 Validated ${totalLinks} internal links across ${htmlFiles.length} files.`);

  if (brokenLinksCount > 0) {
    console.error(`\n❌ Found ${brokenLinksCount} broken internal links:`);
    // Gruppieren nach Quelle für bessere Übersicht
    const grouped = brokenLinks.reduce((acc, curr) => {
        if (!acc[curr.source]) acc[curr.source] = [];
        acc[curr.source].push(curr.target);
        return acc;
    }, {});

    for (const [source, targets] of Object.entries(grouped)) {
        console.error(`  In ${source.replace(DIST_DIR, '')}:`);
        targets.forEach(t => console.error(`    - "${t}"`));
    }
    process.exit(1);
  } else {
    console.log('✅ All internal links verified successfully!\n');
  }
}

checkLinks();
