import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const updates = {
  'src/content/blog/ms-clarity-session-campixx.md': {
    title: 'MS Clarity: Nutzerverhalten hart analysieren',
    description: 'Mach Schluss mit Raten. Nutze MS Clarity für Heatmaps und Session Recordings, um echte Usability-Probleme deiner User sofort aufzudecken.'
  },
  'src/content/glossar/a2a-protocol.md': {
    title: 'A2A Protocol: Standard für KI-Agenten',
    description: 'Vergiss APIs für Menschen. Das A2A Protocol ist der Industrie-Standard für Agent-to-Agent Kommunikation. Jörg Zimmer redet Tacheles.'
  },
  'src/content/glossar/agent-skills.md': {
    title: 'Agent Skills: KI-Agenten extrem aufrüsten',
    description: 'Mach deine KI-Agenten durch modulare Agent Skills und Tools mächtig. Keine Spielereien, harte Praxis und Tacheles von Jörg Zimmer.'
  },
  'src/content/glossar/api-catalog.md': {
    title: 'Agentic Resource Discovery: Der harte Standard',
    description: 'Ohne Agentic Resource Discovery und ai-catalog.json bist du in 2026 unsichtbar. Erfahre von Jörg Zimmer die harte Wahrheit für AI SEO.'
  },
  'src/content/glossar/canonical-tag.md': {
    title: 'Canonical Tag: Schluss mit Duplicate Content',
    description: 'Das Canonical Tag ist dein harter Schutzschild. Zwinge LLMs und Crawler auf die Originalquelle und beende den Content-Kannibalismus.'
  },
  'src/content/glossar/conversion-rate.md': {
    title: 'Conversion Rate: Harte Optimierung für AI',
    description: 'Vergiss einfache Klicks. Die Conversion Rate von heute erfordert hartes serverseitiges Tracking und Architektur-Wissen. Klartext pur.'
  },
  'src/content/glossar/dns-sovereignty.md': {
    title: 'DNS Sovereignty: Dein Nameserver entscheidet',
    description: 'Langsame DNS-Server zerstören deine Indexierung. Hol dir DNS Sovereignty, senke die Latenz und sichere dir echte Crawl-Sichtbarkeit.'
  },
  'src/content/glossar/experience-eeat.md': {
    title: 'Experience: Praxiserfahrung schlägt KI-Müll',
    description: 'Experience ist die harte Währung gegen LLM-Halluzinationen. Nur echte Praxiserfahrung belohnt dich in modernen RAG-Pipelines. Tacheles!'
  },
  'src/content/glossar/geo-vs-seo.md': {
    title: 'GEO vs SEO: Architektur-Shift in LLM-Pipelines',
    description: 'GEO vs SEO im Reality Check: HTML-SEO stirbt. Markdown in LLM-Pipelines definiert jetzt Sichtbarkeit. Jörg redet Tacheles zur Technik.'
  },
  'src/content/glossar/google-search-console.md': {
    title: 'Google Search Console: Radar für Sichtbarkeit',
    description: 'Nutze die Google Search Console für echtes Index-Tracking. Ohne harte GSC-Daten fliegst du im Blindflug. Zeit für ungeschönten Klartext.'
  },
  'src/content/glossar/identity-json.md': {
    title: 'Identity JSON: Das Gesicht deiner Entität',
    description: 'Identity JSON (JSON-LD) ist pure Pflicht. Präsentiere KI-Agenten harte Fakten und baue strukturierte Entitäts-Daten ohne Kompromisse.'
  },
  'src/content/glossar/ki-sichtbarkeit-messen-optimieren.md': {
    title: 'KI-Sichtbarkeit messen: Harte Fakten und Guide',
    description: 'Steigere deine Präsenz in ChatGPT und Co. Harte Technik, Tools und Tacheles zu Agent Readiness und echter KI-Sichtbarkeit. Los geht\'s!'
  },
  'src/content/glossar/llms-full-txt.md': {
    title: 'LLMs-full.txt: Die harte Wahrheit zum KI-Trend',
    description: 'LLMs-full.txt ist kein offizieller Google-Standard, sondern ein wildes Experiment. Tacheles: Lohnt sich die fette Daten-Pipeline wirklich?'
  },
  'src/content/glossar/mention.md': {
    title: 'Mention: Relevanz in LLM-Pipelines aufbauen',
    description: 'Eine Mention ist der harte Treibstoff für dein Entity-Building. Ohne echte Erwähnungen ignorieren KIs deine Autorität völlig. Tacheles!'
  },
  'src/content/glossar/pagespeed.md': {
    title: 'PageSpeed: Latenz ist der harte Ranking-Killer',
    description: 'PageSpeed ist mehr als Vitals. Langsame Time-to-First-Byte führt sofort zum Crawl-Abbruch. Harter Klartext zur Latenz-Optimierung.'
  },
  'src/content/glossar/robots-txt.md': {
    title: 'Robots.txt: Hartes Limit für KI-Bots und Crawler',
    description: 'Die robots.txt entscheidet heute eiskalt über deine Sichtbarkeit bei GPTBot und RAG-Pipelines. Übernimm endlich die harte Kontrolle.'
  },
  'src/content/glossar/seo-beratung.md': {
    title: 'SEO Beratung: Umbau für harte LLM-Architekturen',
    description: 'Echte SEO Beratung baut deine Infrastruktur zur gnadenlosen LLM-Datenquelle um. Keyword-Dichte war gestern. Harter Tacheles von Jörg.'
  },
  'src/content/glossar/sitemap.md': {
    title: 'Sitemap: Echte Architektur für RAG-Pipelines',
    description: 'Eine Sitemap ist der harte Wegweiser für Agenten. Baue maschinenlesbare Endpunkte mit exakter mtime-Logik. Keine faulen Kompromisse.'
  },
  'src/content/glossar/technisches-schema-markup.md': {
    title: 'Technisches Schema-Markup: Pure KI-Infrastruktur',
    description: 'Technisches Schema-Markup baut harte Endpunkte. Nutze Entity-Depth für Agenten und vergiss alberne Snippets. Zeit für echten Klartext.'
  },
  'src/content/glossar/ueberstunde-berlin.md': {
    title: 'Überstunde Berlin: Harte Fakten zum Network-Event',
    description: 'Die Überstunde Berlin ist der Ort für echtes Networking ohne steife Visitenkarten-Shows. Triff Macher der Digitalszene und rede Tacheles.'
  },
  'src/content/glossar/website-relaunch.md': {
    title: 'Website Relaunch: Rettung vor hartem Pfusch',
    description: 'Verhindere das SEO-Desaster. Beim Website Relaunch brauchst du gnadenlose technische KI-Optimierung und harte Redirects. Tacheles pur.'
  },
  'src/content/glossar/zero-click-content.md': {
    title: 'Zero-Click Content: Überleben als harte Entität',
    description: 'Klicks sind tot. RAG-Injections und direkte API-Antworten definieren Zero-Click Content. Optimiere hart für KIs und werde zur Autorität.'
  }
};

async function updateFiles() {
  for (const [file, newData] of Object.entries(updates)) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${file}`);
      continue;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let titleReplaced = false;
    let descReplaced = false;

    for (let i = 0; i < Math.min(25, lines.length); i++) {
      if (!titleReplaced && lines[i].startsWith('title:')) {
        lines[i] = `title: "${newData.title}"`;
        titleReplaced = true;
      }
      if (!descReplaced && lines[i].startsWith('description:')) {
        lines[i] = `description: "${newData.description}"`;
        descReplaced = true;
      }
    }
    
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`Updated ${file}`);
  }
}

updateFiles();
