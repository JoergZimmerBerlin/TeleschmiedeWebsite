import fs from 'fs';

const updates = [
  {
    file: 'src/content/blog/freelance-unlocked-eis-erfolgreich.md',
    title: 'Freelance Unlocked: Erfolgreiche Eiscreme-Aktion',
    desc: 'Freelance Unlocked Eiscreme-Aktion war ein voller Erfolg. Vom LinkedIn-Kommentar zur echten Eismaschine – so geht Netzwerken mit Tacheles.'
  },
  {
    file: 'src/content/glossar/301-vs-302.md',
    title: '301 vs. 302 Redirects: Der KI-Deep-Dive',
    desc: '301 vs. 302 Redirects im Tacheles-Check. Warum der 301er deinen Linkjuice rettet und KI-Crawler den 302er ablehnen. Alles zur Server-Basis.'
  },
  {
    file: 'src/content/glossar/agent-readiness-level.md',
    title: 'Agent Readiness Level: Metrik für autonome KIs',
    desc: 'Agent Readiness Level deckt auf: Die meisten Websites sind völlig veraltet. Jörg Zimmer zeigt den Weg zur vollständigen KI-Kompatibilität.'
  },
  {
    file: 'src/content/glossar/ai-tracking-tools.md',
    title: 'AI Tracking Tools: Wahre Sichtbarkeit messen',
    desc: 'AI Tracking Tools messen nicht nur Rankings, sondern RAG-Hitrates und Share of Model. Klartext: So misst du deine echte KI-Sichtbarkeit.'
  },
  {
    file: 'src/content/glossar/brand-mentions.md',
    title: 'Brand Mentions: Warum KI Entitäten liebt',
    desc: 'Brand Mentions sind der Kern für AI Visibility. Schluss mit Link-Spam – so verankern Answer Engines deine Marke fest im Knowledge Graph.'
  },
  {
    file: 'src/content/glossar/cloudflare-agent-readiness-checklist.md',
    title: 'Cloudflare Agent Readiness Checklist: Der Guide',
    desc: 'Die Cloudflare Agent Readiness Checklist im Klartext. Optimiere deine Website knallhart für autonome KI-Agenten, Crawler und Protokolle.'
  },
  {
    file: 'src/content/glossar/crawler.md',
    title: 'Crawler: Bots, RAG-Pipelines und llms.txt',
    desc: 'Crawler sind heute autonome Daten-Agents. Vergiss simple Skripte. Erfahre im Klartext, wie Bots ticken und du dein Crawl-Budget optimierst.'
  },
  {
    file: 'src/content/glossar/entitaeten-building.md',
    title: 'Entitäten-Building: Autorität in der LLM-Suche',
    desc: 'Entitäten-Building ist hartes Data-Engineering. So verankerst du deine Identität unzerstörbar im Knowledge Graph und RAG-Pipelines.'
  },
  {
    file: 'src/content/glossar/geo-audit.md',
    title: 'GEO Audit: Stresstest für KI-Sichtbarkeit',
    desc: 'Ein GEO Audit prüft deine Infrastruktur für LLM-Pipelines. Klartext zu Markdown Negotiation, RAG-Readiness und harten Crawler-Protokollen.'
  },
  {
    file: 'src/content/glossar/google-core-update.md',
    title: 'Google Core Update: Qualitätshammer für AI',
    desc: 'Ein Google Core Update ist ein Erdbeben für deine Sichtbarkeit. Es geht um echten Mehrwert und E-E-A-T. Jörg Zimmer redet Tacheles.'
  },
  {
    file: 'src/content/glossar/html-struktur.md',
    title: 'HTML-Struktur: Semantik für KI-Crawler & RAG',
    desc: 'Eine saubere HTML-Struktur ist im KI-Zeitalter Pflicht. Der wichtigste Faktor für fehlerfreies Parsing durch LLMs und Agents. Klartext.'
  },
  {
    file: 'src/content/glossar/keywordrecherche.md',
    title: 'Keywordrecherche: Semantische Basis für SEO',
    desc: 'Keywordrecherche dreht sich heute um Entitäten, Intents und Themen-Cluster. Erfahre im Tacheles-Modus, warum der Fanout alles verändert.'
  },
  {
    file: 'src/content/glossar/linkjuice.md',
    title: 'Linkjuice: Vom PageRank zum Entity-Trust',
    desc: 'Linkjuice erklärt: Wie sich Ranking-Power durch harte Entity-Citations verteilt. Lerne, wie KI-Modelle Vertrauensflüsse werten. Tacheles.'
  },
  {
    file: 'src/content/glossar/markdown-content-negotiation.md',
    title: 'Markdown Content Negotiation: AEO Optimierung',
    desc: 'Dein HTML ist ein Albtraum für Crawler. Jörg Zimmer erklärt Tacheles, wie Markdown Content Negotiation Serverkosten drückt und AEO pusht.'
  },
  {
    file: 'src/content/glossar/oauth-oidc-discovery.md',
    title: 'OAuth/OIDC Discovery: Puzzleteil für Agenten',
    desc: 'So funktioniert OAuth/OIDC Discovery für autonome KI-Agenten. Lerne im Klartext, wie du mit der Konfiguration Agent Readiness sicherstellst.'
  },
  {
    file: 'src/content/glossar/rankingfaktoren.md',
    title: 'Rankingfaktoren: Was KIs wirklich bewerten',
    desc: 'Rankingfaktoren ungeschönt: Die harten Kriterien für Generative Engines. Tacheles darüber, was über Seite 1 und KI-Zitierungen entscheidet.'
  },
  {
    file: 'src/content/glossar/seo-agentur.md',
    title: 'SEO Agentur: Vom Dienstleister zum KI-Architekt',
    desc: 'Die klassische SEO Agentur ist tot. Heute entscheiden RAG-Optimierung, KI-Crawler und LLM-Architektur über deine Sichtbarkeit. Tacheles!'
  },
  {
    file: 'src/content/glossar/sichtbarkeit.md',
    title: 'Sichtbarkeit: KI-Crawler & Citation-Stability',
    desc: 'Sichtbarkeit bedeutet heute: Von KIs gefunden werden. Warum Citation-Stability durch auth.md relevanter ist als Klicks. Klartext pur.'
  },
  {
    file: 'src/content/glossar/strukturierte-daten.md',
    title: 'Strukturierte Daten: Grounding & LLM-Fütterung',
    desc: 'Strukturierte Daten im Klartext: Vergiss Rich Snippets. Mach deine Seite durch harte KI-Protokolle, JSON-LD und RAG maschinenlesbar.'
  },
  {
    file: 'src/content/glossar/topical-authority.md',
    title: 'Topical Authority: Königsdisziplin KI-Zeitalter',
    desc: 'Topical Authority entscheidet gnadenlos, ob LLMs, ChatGPT und Google deine Marke als echte Expertenquelle wahrnehmen und zitieren. Tacheles.'
  },
  {
    file: 'src/content/glossar/web-bot-auth.md',
    title: 'Web Bot Auth: Identität für KI-Agenten',
    desc: 'Vergiss User-Agents. Web Bot Auth ist der neue Standard für sichere Bot-Identitäten. Tacheles zur Agenten-Verifizierung ohne Kompromisse.'
  },
  {
    file: 'src/content/glossar/x402-protocol.md',
    title: 'x402 Protokoll: Agent-Native Commerce für KI',
    desc: 'Was ist das x402 Protokoll? Wie HTTP Payments den M2M-Handel revolutionieren. Klartext zur Zukunft des E-Commerce ohne Zwischenhändler.'
  }
];

for (const update of updates) {
  if (fs.existsSync(update.file)) {
    let content = fs.readFileSync(update.file, 'utf-8');
    
    // Replace title: "..." or title: '...' or title: ...
    content = content.replace(/^title:\s*(["']?).*?\1$/m, `title: "${update.title}"`);
    
    // Replace description: "..." or description: '...' or description: ...
    content = content.replace(/^description:\s*(["']?).*?\1$/m, `description: "${update.desc}"`);
    
    fs.writeFileSync(update.file, content, 'utf-8');
    console.log(`Updated ${update.file}`);
  } else {
    console.log(`File not found: ${update.file}`);
  }
}
