import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const distDir = path.join(process.cwd(), 'dist');

if (!fs.existsSync(distDir)) {
  console.error("Fehler: 'dist/' Ordner nicht gefunden. Bitte erst 'astro build' ausführen.");
  process.exit(1);
}

// Turndown konfigurieren
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});
turndownService.use(gfm);

// Hilfsfunktion: Alle HTML-Dateien im Verzeichnis rekursiv finden
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
let convertedCount = 0;

console.log(`Starte Markdown Content Negotiation Generierung für ${htmlFiles.length} HTML-Dateien...`);

htmlFiles.forEach(file => {
  try {
    const html = fs.readFileSync(file, 'utf-8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Störende Elemente entfernen
    const elementsToRemove = [
      'nav', 
      'footer', 
      'script', 
      'style', 
      'noscript',
      'iframe',
      '.cookie-banner',
      '#mobile-menu'
    ];

    elementsToRemove.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });

    // Hauptinhalt extrahieren (bevorzugt <main>, sonst <body>)
    const mainContent = document.querySelector('main') || document.querySelector('body');
    
    if (!mainContent) {
      console.warn(`Überspringe ${file}: Kein <main> oder <body> gefunden.`);
      return;
    }

    // HTML zu Markdown konvertieren
    const markdown = turndownService.turndown(mainContent.innerHTML);

    // Markdown-Datei speichern (.md statt .html)
    const mdFilePath = file.replace(/\.html$/, '.md');
    fs.writeFileSync(mdFilePath, markdown, 'utf-8');
    
    // Workaround für IONOS/Apache MultiViews: Wenn es eine index.html in einem Unterordner ist, 
    // generiere ZUSÄTZLICH eine .md Datei auf der Ebene darüber (z.B. foo/index.html -> foo.md)
    if (file.endsWith('/index.html') && file !== path.join(distDir, 'index.html')) {
        const parentDirMd = file.replace(/\/index\.html$/, '.md');
        fs.writeFileSync(parentDirMd, markdown, 'utf-8');
    }
    
    convertedCount++;
  } catch (error) {
    console.error(`Fehler bei der Verarbeitung von ${file}:`, error);
  }
});

console.log(`Erfolgreich ${convertedCount} Markdown-Dateien für KI-Agenten generiert.`);
