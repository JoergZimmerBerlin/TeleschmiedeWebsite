import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const distDir = path.join(process.cwd(), 'dist');
const baseUrl = 'https://teleschmie.de'; // Production only

if (!fs.existsSync(distDir)) {
  console.error("Fehler: 'dist/' Ordner nicht gefunden. Bitte erst 'astro build' ausführen.");
  process.exit(1);
}

// XML-Escape Helper
const escapeXml = (unsafe) => {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
};

function getAllHtmlFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllHtmlFiles(fullPath, arrayOfFiles);
    } else {
      if (fullPath.endsWith('.html')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`Starte Image Sitemap Generierung für ${htmlFiles.length} HTML-Dateien...`);

let urlsXml = '';
let totalImages = 0;

htmlFiles.forEach(file => {
  try {
    const html = fs.readFileSync(file, 'utf-8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Finde alle Bilder
    const images = document.querySelectorAll('img');
    if (images.length === 0) return;

    // Errechne die korrekte öffentliche URL für die Seite
    let relativePath = file.replace(distDir, '').replace(/\\/g, '/');
    if (relativePath.endsWith('index.html')) {
        relativePath = relativePath.replace('index.html', '');
    }
    const pageLoc = `${baseUrl}${relativePath}`;

    // Wenn es eine 404 Seite ist oder Ähnliches, überspringen
    if (relativePath.includes('404')) return;

    let imageTags = '';
    const seenImages = new Set();

    images.forEach(img => {
      let src = img.getAttribute('src');
      let alt = img.getAttribute('alt') || document.title || 'Teleschmiede Image';
      
      // Filtere base64, leere, und Tracking-Bilder aus
      if (!src || src.startsWith('data:') || src.includes('google-analytics')) return;
      
      // Mache src absolut
      if (src.startsWith('/')) {
          src = `${baseUrl}${src}`;
      } else if (!src.startsWith('http')) {
          return; // relative path that we skip for now
      }

      // Vermeide Duplikate pro Seite
      if (seenImages.has(src)) return;
      seenImages.add(src);

      imageTags += `
    <image:image>
      <image:loc>${escapeXml(src)}</image:loc>
      <image:title>${escapeXml(alt)}</image:title>
    </image:image>`;
      totalImages++;
    });

    if (imageTags !== '') {
        urlsXml += `
  <url>
    <loc>${escapeXml(pageLoc)}</loc>${imageTags}
  </url>`;
    }
  } catch (error) {
    console.error(`Fehler bei der Verarbeitung von ${file}:`, error);
  }
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlsXml}
</urlset>`;

fs.writeFileSync(path.join(distDir, 'sitemap-images.xml'), sitemap, 'utf-8');
console.log(`Erfolgreich Image Sitemap mit ${totalImages} Bildern generiert!`);
