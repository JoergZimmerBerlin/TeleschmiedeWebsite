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
  
  // Map to track incoming links for each valid file
  // Key: absolute path to local dist file, Value: Set of source files
  const incomingLinks = new Map();

  for (const file of htmlFiles) {
    if (!incomingLinks.has(file)) {
      incomingLinks.set(file, new Set());
    }
    
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
            path.join(DIST_DIR, relativePath, 'index.html'), // Directory (z.B. /blog/) -> /blog/index.html
            path.join(DIST_DIR, relativePath.endsWith('/') ? relativePath + 'index.html' : relativePath + '/index.html'),
            path.join(DIST_DIR, relativePath) // Exakt (z.B. assets/...)
        ];
        
        targetPath = variants.find(v => {
          try {
            return fs.statSync(v).isFile();
          } catch (e) {
            return false;
          }
        });
      }

      if (!targetPath || !fs.existsSync(targetPath)) {
        brokenLinksCount++;
        brokenLinks.push({
          source: file,
          target: link
        });
      } else {
        // Record the valid incoming link
        if (!incomingLinks.has(targetPath)) {
          incomingLinks.set(targetPath, new Set());
        }
        incomingLinks.get(targetPath).add(file);
      }
    }
  }

  console.log(`📊 Validated ${totalLinks} internal links across ${htmlFiles.length} files.`);
  
  let hasErrors = false;

  if (brokenLinksCount > 0) {
    hasErrors = true;
    console.error(`\n❌ Found ${brokenLinksCount} broken internal links (404-Fehler):`);
    const grouped = brokenLinks.reduce((acc, curr) => {
        if (!acc[curr.source]) acc[curr.source] = [];
        acc[curr.source].push(curr.target);
        return acc;
    }, {});

    for (const [source, targets] of Object.entries(grouped)) {
        console.error(`  In ${source.replace(DIST_DIR, '')}:`);
        targets.forEach(t => console.error(`    - "${t}"`));
    }
  } else {
    console.log('✅ Keine 404-Fehler: Alle verlinkten Seiten existieren!');
  }
  
  // Check for the 3-links rule for Content pages (Blog and Glossar)
  let underlinkedCount = 0;
  console.log('\n🔍 Checking "Minimum 3 Internal Links" rule for Blog & Glossar...');
  
  for (const [targetFile, sources] of incomingLinks.entries()) {
    const isContentPage = targetFile.includes('/blog/') || targetFile.includes('/glossar/');
    const isPagination = targetFile.match(/\/[0-9]+\/index\.html$/); // Ignore pagination pages like /blog/2/
    
    if (isContentPage && !isPagination) {
      // Ignore Astro Redirect Pages
      const html = fs.readFileSync(targetFile, 'utf-8');
      if (html.includes('<meta http-equiv="refresh"')) {
          continue; // Skip redirect pages
      }

      if (sources.size < 3) {
        hasErrors = true;
        underlinkedCount++;
        console.log(`  ⚠️ Zu wenig interne Links (${sources.size}/3): ${targetFile}`);
        
        // Print the sources for debugging
        const sourceList = Array.from(sources).join(', ');
        console.log(`     Verlinkt von: ${sourceList || 'Niemandem'}`);
      }
    }
  }
  
  if (underlinkedCount > 0) {
    console.error(`\n❌ ${underlinkedCount} Seiten haben weniger als 3 eingehende Links!`);
  } else {
    console.log('✅ Alle Blog- und Glossarseiten sind mindestens 3x intern verlinkt!');
  }

  if (hasErrors) {
    process.exit(1);
  } else {
    console.log('\n🎉 Perfekt! Das Projekt erfüllt alle strengen SEO-Link-Regeln.\n');
  }
}

checkLinks();
