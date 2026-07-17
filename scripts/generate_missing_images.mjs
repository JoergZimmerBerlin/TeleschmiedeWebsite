import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hole den API Key aus der Umgebungsvariablen
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("FEHLER: GEMINI_API_KEY ist nicht gesetzt!");
  console.error("Bitte exportiere den Key vorher im Terminal: export GEMINI_API_KEY='dein-key'");
  process.exit(1);
}

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key=${API_KEY}`;
const TARGET_DIR = path.resolve(__dirname, '../src/assets/images/glossar/3d-light');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const imagesToGenerate = [
  {
    name: 'glossar-sovp-protocol-3d',
    prompt: "A professional, high-end isometric 3D infographic for Sovereign Validation Protocol (SOVP). Background is pure white (#FFFFFF). Features sleek 3D elements with vibrant lime green (#D9FF00) accents. Typography is modern, clean dark grey. All text in GERMAN: Sovereign Validation, Zertifizierung, Agenten Trust. Small subtle watermark 'Jörg Zimmer' in bottom right corner."
  },
  {
    name: 'glossar-dns-sovereignty-3d',
    prompt: "A professional, high-end isometric 3D infographic for DNS Sovereignty. Background is pure white (#FFFFFF). Features sleek 3D elements with vibrant lime green (#D9FF00) accents. Typography is modern, clean dark grey. All text in GERMAN: DNS Souveränität, Dezentrale Identität, Agent Discovery. Small subtle watermark 'Jörg Zimmer' in bottom right corner."
  },
  {
    name: 'glossar-rfc-8288-link-headers-3d',
    prompt: "A professional, high-end isometric 3D infographic for RFC 8288 Link Headers. Background is pure white (#FFFFFF). Features sleek 3D elements with vibrant lime green (#D9FF00) accents. Typography is modern, clean dark grey. All text in GERMAN: Web Linking, Maschinenlesbar, Token Ersparnis. Small subtle watermark 'Jörg Zimmer' in bottom right corner."
  }
];

async function generateImage(imageData) {
  console.log(`\nGeneriere Bild für: ${imageData.name}...`);
  
  const requestBody = {
    instances: [ { prompt: imageData.prompt } ],
    parameters: {
      sampleCount: 1,
      aspectRatio: "1:1",
      outputOptions: { mimeType: "image/jpeg" }
    }
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Fehler (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.predictions || data.predictions.length === 0) {
      throw new Error("Keine Vorhersagen in der API-Antwort.");
    }

    const base64Image = data.predictions[0].bytesBase64Encoded;
    const jpgPath = path.join(TARGET_DIR, `${imageData.name}.jpg`);
    const webpPath = path.join(TARGET_DIR, `${imageData.name}.webp`);

    fs.writeFileSync(jpgPath, Buffer.from(base64Image, 'base64'));
    console.log(`✅ JPG geladen: ${jpgPath}`);

    console.log(`Konvertiere in WebP...`);
    execSync(`npx --yes cwebp-bin ${jpgPath} -o ${webpPath}`);
    
    fs.unlinkSync(jpgPath);
    console.log(`✅ WebP erstellt: ${webpPath}`);

  } catch (error) {
    console.error(`❌ Fehler bei ${imageData.name}:`, error.message);
  }
}

async function run() {
  console.log("Starte AI Studio Custom Generator (Pay-As-You-Go By-Pass)...");
  for (const img of imagesToGenerate) {
    await generateImage(img);
  }
  console.log("\n🎉 Alle Bilder verarbeitet!");
}

run();
