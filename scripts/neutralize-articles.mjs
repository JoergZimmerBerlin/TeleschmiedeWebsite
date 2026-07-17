import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFiles = [
  'a2a-protocol.md',
  'agent-card-json.md',
  'agent-readiness-level.md',
  'agents-md.md',
  'ai-plugin-json.md',
  'ai-txt.md',
  'auth-md.md',
  'markdown-content-negotiation.md',
  'model-context-protocol-mcp.md'
];

const glossarDir = path.join(__dirname, '..', 'src', 'content', 'glossar');

const replacements = [
  // B2B -> Unternehmen
  { from: /B2B-Umfeld/g, to: 'Unternehmensumfeld' },
  { from: /B2B-Markt/g, to: 'Markt für Unternehmen' },
  { from: /B2B-Agenten/g, to: 'autonome Agenten (egal ob für Unternehmen oder Endkunden)' },
  { from: /B2B-Transaktionen/g, to: 'geschäftliche Transaktionen' },
  { from: /B2B-Entscheider/g, to: 'Entscheider in Unternehmen' },
  { from: /im B2B /g, to: 'für Unternehmen ' },
  { from: /B2B-Einkaufs-Agenten/g, to: 'Einkaufs-Agenten' },
  { from: /B2B-Verhandlungen/g, to: 'geschäftliche Verhandlungen' },
  { from: /B2B-KIs/g, to: 'Business-KIs' },
  { from: /B2B-Sektor/g, to: 'Unternehmenssektor' },
  { from: /B2B-Anmeldung/g, to: 'Kunden-Anmeldung' },
  { from: /B2B-Geschäft/g, to: 'Geschäft' },
  { from: /B2B-Lead-Generierung/g, to: 'Lead-Generierung' },
  { from: /B2B-Vertrieb/g, to: 'Vertrieb' },
  { from: /B2B-Messe/g, to: 'Messe' },

  // Level 5 Neutralization
  { from: /Cloudflare Agent Readiness Level 5/g, to: 'das Agent Readiness Reifegradmodell' },
  { from: /Agent Readiness Level 5/g, to: 'eine vollständige Agent Readiness' },
  { from: /Agent Readiness auf Level 5/g, to: 'eine vollständige Agent Readiness' },
  { from: /Level 5 \(dem höchsten Level im Cloudflare-Raster\)/g, to: 'modernsten Standards' },
  { from: /auf Level 5 zu kommen/g, to: 'komplett AI-Ready zu werden' },
  { from: /auf das ultimative Level 5/g, to: 'auf ein hohes Agent Readiness Level' },
  { from: /Level 5 \(Agent-Native\)/g, to: 'die volle Agenten-Kompatibilität' },
  { from: /auf Level 5 sind/g, to: 'komplett AI-Ready sind' },
  { from: /Level 5 erfordert/g, to: 'Eine echte Agent Readiness erfordert' },
  { from: /Level 5 ist die Kür/g, to: 'Die volle Agent-Kompatibilität ist die Kür' },
  { from: /Level 5 bedeutet:/g, to: 'Das bedeutet:' },
  { from: /Level 5 /g, to: 'die volle Agent-Kompatibilität ' },
  { from: /Cloudflare hat einen knallharten Branchenstandard definiert/g, to: 'In der Branche hat sich ein inoffizielles Reifegradmodell etabliert, an dem man sich orientieren kann' },
  { from: /Cloudflares isitagentready\.com deckt es auf/g, to: 'Tools wie isitagentready.com decken es auf' },
  { from: /dem offiziellen Cloudflare Raster/g, to: 'vielen Reifegradmodellen' },
  { from: /im offiziellen Cloudflare Raster/g, to: 'in vielen Reifegradmodellen' },
  { from: /Agent Readiness Level 5 Configuration/g, to: 'Agent Readiness Configuration' },
  { from: /die Blaupause für Agent Readiness Level 5 in Deutschland/g, to: 'eine Blaupause für Agent Readiness in Deutschland' },
  
  // Specific Title Fixes
  { from: /title: "ai.txt SEO: Agent Readiness Level 5 erreichen"/g, to: 'title: "ai.txt SEO: Mache deine Website 100% AI-Ready"' },
  { from: /title: "A2A Protocol: Autonome KI-Agenten im B2B-Umfeld"/g, to: 'title: "A2A Protocol: KI-Agenten im Unternehmensumfeld"' }
];

let totalChanges = 0;

targetFiles.forEach(file => {
  const filePath = path.join(glossarDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let fileChanged = false;
    
    replacements.forEach(rep => {
      if (content.match(rep.from)) {
        content = content.replace(rep.from, rep.to);
        fileChanged = true;
        totalChanges++;
      }
    });

    if (fileChanged) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated ${file}`);
    }
  } else {
    console.warn(`⚠️ File not found: ${file}`);
  }
});

console.log(`\nFertig! Insgesamt ${totalChanges} Ersetzungen durchgeführt.`);
