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
console.log(`Starte Video Sitemap Generierung für ${htmlFiles.length} HTML-Dateien...`);

let urlsXml = '';
let totalVideos = 0;
const globalSeenVideos = new Set();

// Ensure videos/index.html is processed first so videos are associated with their canonical page
htmlFiles.sort((a, b) => {
  if (a.includes('/videos/index.html')) return -1;
  if (b.includes('/videos/index.html')) return 1;
  return 0;
});

htmlFiles.forEach(file => {
  try {
    const html = fs.readFileSync(file, 'utf-8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Finde alle JSON-LD Skripte
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    if (scripts.length === 0) return;

    let relativePath = file.replace(distDir, '').replace(/\\/g, '/');
    if (relativePath.endsWith('index.html')) {
        relativePath = relativePath.replace('index.html', '');
    }
    const pageLoc = `${baseUrl}${relativePath}`;

    if (relativePath.includes('404')) return;

    let videoTags = '';

    scripts.forEach(script => {
      try {
        const json = JSON.parse(script.textContent);
        
        // Helferfunktion zum Finden aller VideoObjects im JSON
        const findVideos = (obj, results = []) => {
          if (!obj) return results;
          if (typeof obj === 'object') {
            if (obj['@type'] === 'VideoObject') {
              results.push(obj);
            }
            if (Array.isArray(obj)) {
              obj.forEach(item => findVideos(item, results));
            } else {
              Object.values(obj).forEach(val => findVideos(val, results));
            }
          }
          return results;
        };

        const videos = findVideos(json);
        
        videos.forEach(vid => {
          // Wir brauchen mindestens URL und Thumbnail
          const embedUrl = vid.embedUrl || vid.contentUrl;
          let thumbnail = vid.thumbnailUrl;
          if (Array.isArray(thumbnail)) thumbnail = thumbnail[0];
          
          if (!embedUrl || !thumbnail) return;

          // Vermeide Duplikate global
          if (globalSeenVideos.has(embedUrl)) return;
          globalSeenVideos.add(embedUrl);

          videoTags += `
    <video:video>
      <video:thumbnail_loc>${escapeXml(thumbnail)}</video:thumbnail_loc>
      <video:title>${escapeXml(vid.name)}</video:title>
      <video:description>${escapeXml(vid.description)}</video:description>
      <video:player_loc>${escapeXml(embedUrl)}</video:player_loc>
      ${vid.uploadDate ? `<video:publication_date>${escapeXml(vid.uploadDate)}</video:publication_date>` : ''}
    </video:video>`;
          totalVideos++;
        });

      } catch (e) {
        // Parse Fehler im JSON ignorieren
      }
    });

    if (videoTags !== '') {
        urlsXml += `
  <url>
    <loc>${escapeXml(pageLoc)}</loc>${videoTags}
  </url>`;
    }
  } catch (error) {
    console.error(`Fehler bei der Verarbeitung von ${file}:`, error);
  }
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlsXml}
</urlset>`;

fs.writeFileSync(path.join(distDir, 'sitemap-videos.xml'), sitemap, 'utf-8');
console.log(`Erfolgreich Video Sitemap mit ${totalVideos} Videos generiert!`);
