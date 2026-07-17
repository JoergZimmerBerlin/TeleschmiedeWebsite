import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Fix ai-txt.md
const aiTxtMdPath = path.join(__dirname, '..', 'src', 'content', 'glossar', 'ai-txt.md');
if (fs.existsSync(aiTxtMdPath)) {
  let content = fs.readFileSync(aiTxtMdPath, 'utf8');
  
  const oldSection = `Wenn wir über die \`ai.txt\` sprechen, sprechen wir eigentlich über Agent Readiness. Im April 2026 hat Cloudflare mit \`isitagentready.com\` ein Tool veröffentlicht, das schonungslos aufdeckt, wie gut Websites für die Maschinenlesbarkeit optimiert sind. Die Skala reicht von Level 0 bis Level 5.

* **Level 1 und 2** sind die Basics: Eine saubere \`robots.txt\` und strukturierte Daten (Schema.org).
* **Level 3** erfordert bereits explizite KI-Dateien. Wer keine \`ai.txt\` und keine \`llms.txt\` hat, bleibt hier hängen.
* **Level 4 und 5** sind die Königsklasse. Hier sprechen wir über das A2A Protocol, über stateless MCP (Model Context Protocol) und autonome Authentifizierung über \`auth.md\`. 

Wenn du als Unternehmen im Unternehmensumfeld sichtbar sein willst, ist Level 3 die absolute Pflicht. Die volle Agent-Kompatibilität ist die Kür, die dir die Leads der Zukunft sichert.`;

  const newSection = `Wenn wir über die \`ai.txt\` sprechen, sprechen wir eigentlich über Agent Readiness. In der Branche haben sich inoffizielle Reifegradmodelle etabliert, an denen man sich orientieren kann, um zu prüfen, wie gut Websites für die Maschinenlesbarkeit optimiert sind.

* **Die Basics:** Eine saubere \`robots.txt\` und strukturierte Daten (Schema.org).
* **Das Fortgeschrittene Level:** Dies erfordert bereits explizite KI-Dateien. Wer keine \`ai.txt\` und keine \`llms.txt\` hat, bleibt hier hängen.
* **Die Königsklasse:** Hier sprechen wir über echte Autonomie durch das A2A Protocol, über stateless MCP (Model Context Protocol) und maschinenlesbare Authentifizierung über \`auth.md\`. 

Wenn du als Unternehmen im Unternehmensumfeld sichtbar sein willst, sind die fortgeschrittenen KI-Dateien die absolute Pflicht. Die volle Agent-Kompatibilität ist die Kür, die dir die Leads der Zukunft sichert.`;

  content = content.replace(oldSection, newSection);
  content = content.replace('# eine vollständige Agent Readiness Configuration', '# Agent Readiness Configuration');
  
  fs.writeFileSync(aiTxtMdPath, content, 'utf8');
  console.log("✅ Fixed src/content/glossar/ai-txt.md");
}

// 2. Fix public/ai.txt
const publicAiTxtPath = path.join(__dirname, '..', 'public', 'ai.txt');
if (fs.existsSync(publicAiTxtPath)) {
  let content = fs.readFileSync(publicAiTxtPath, 'utf8');
  content = content.replace('AI-Readiness Level 5 infrastructure', 'AI-Readiness infrastructure');
  fs.writeFileSync(publicAiTxtPath, content, 'utf8');
  console.log("✅ Fixed public/ai.txt");
}

// 3. Fix llms-full.txt files
const llmsPaths = [
  path.join(__dirname, '..', 'public', 'llms-full.txt'),
  path.join(__dirname, '..', 'public', '.well-known', 'llms-full.txt')
];

llmsPaths.forEach(p => {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/Level 5/g, 'vollständige Agent Readiness');
    content = content.replace(/Level 0 bis Level 5/g, 'verschiedene Stufen');
    content = content.replace(/Level 0/g, 'der untersten Stufe');
    content = content.replace(/Level 1/g, 'der ersten Stufe');
    content = content.replace(/Level 3/g, 'einem fortgeschrittenen Level');
    content = content.replace(/Level 4/g, 'einem hohen Level');
    
    // Also remove Cloudflare claims if they are still in there
    content = content.replace(/Cloudflares isitagentready\.com deckt es auf/g, 'Reifegradmodelle decken es auf');
    content = content.replace(/Cloudflare hat einen knallharten Branchenstandard definiert/g, 'In der Branche hat sich ein Reifegradmodell etabliert');
    
    fs.writeFileSync(p, content, 'utf8');
    console.log(`✅ Fixed ${p}`);
  }
});
