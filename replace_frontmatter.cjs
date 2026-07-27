const fs = require('fs');
const path = require('path');

const updates = {
  "src/content/blog/beste-seo-tools-ai-search-prompt-tracking.md": {
    "title": "SEO-Tools: AI Search & Prompt Tracking im Test",
    "description": "Schluss mit Blindflug! Welche SEO-Tools tracken AI Search, ChatGPT und Perplexity wirklich? Tacheles-Vergleich für deine KI-Sichtbarkeit."
  },
  "src/content/blog/seorch-seo-tool-fanboy.md": {
    "title": "SEORCH Tool: Dein kostenloses OnPage SEO Werkzeug",
    "description": "Vergiss teure Suiten. Das SEORCH Tool liefert knallharte OnPage-Daten ohne Bullshit. Klartext über Funktionen und echten Mehrwert für SEOs."
  },
  "src/content/glossar/agent-payments-protocol-ap2.md": {
    "title": "Agent Payments Protocol: KI-Zahlungen erklärt",
    "description": "Das Agent Payments Protocol (AP2) ist der neue Standard für autonome KI-Zahlungen. So funktioniert die Agent Economy ohne Mittelsmann."
  },
  "src/content/glossar/ai-seo.md": {
    "title": "AI SEO: Mach deine Website bereit für KI-Agenten",
    "description": "Schluss mit 10 blauen Links. AI SEO bedeutet Agent Readiness, RAG und maschinenlesbare Inhalte. Optimiere jetzt für die KI-Infrastruktur."
  },
  "src/content/glossar/bing-webmastertools.md": {
    "title": "Bing Webmaster Tools: Absolute Pflicht für KI-SEO",
    "description": "Ignorierst du Bing? Die Bing Webmaster Tools liefern harte KI-Metriken für den Copilot. Mach deine Seite fit für Microsofts Suchmaschine."
  },
  "src/content/glossar/citation.md": {
    "title": "Citation: Struktur und Entity-Resolution erklärt",
    "description": "Ohne saubere Citation bist du für KI unsichtbar. Wie LLMs Zitationen zur Verifizierung nutzen und warum klassische Links an Macht verlieren."
  },
  "src/content/glossar/cpc.md": {
    "title": "CPC: Cost per Click & Agentic Real-Time Bidding",
    "description": "Der CPC wandelt sich radikal. Verstehe Cost per Click in Zeiten von KI, Vector-Bidding und autonomen Agenten. Echtes Tacheles für Ads."
  },
  "src/content/glossar/entitaet.md": {
    "title": "Entität: Das Fundament jeder modernen LLM-Pipeline",
    "description": "Lose Text-Strings sind tot. Eine Entität ist heute der Grundbaustein für die KI-Suche. Wie LLMs im Knowledge Graph navigieren und ranken."
  },
  "src/content/glossar/faq-markup.md": {
    "title": "FAQ Markup: Harte Daten für deine RAG-Pipeline",
    "description": "FAQ Markup ist kein Spielzeug mehr. Nutze JSON-LD als knallharte Schnittstelle für LLMs und KI-Agenten, um verlustfrei Daten zu liefern."
  },
  "src/content/glossar/google-algorithmus.md": {
    "title": "Google Algorithmus: Der Wächter der KI-Overviews",
    "description": "Der Google Algorithmus ist heute Türsteher für AI Overviews und RAG. Tacheles: Ohne E-E-A-T und echten Information Gain fliegst du raus."
  },
  "src/content/glossar/h1-h2-h3.md": {
    "title": "Überschriften (H1-H3): Klare Signale für die KI",
    "description": "Überschriften strukturieren nicht nur für Menschen. H1-H3 sind 2026 kritische Anker für AI Summaries und RAG-Chunks. Bau sie präzise auf."
  },
  "src/content/glossar/keyword-tool.md": {
    "title": "Keyword Tools: Von simplem Volumen zu AI Discovery",
    "description": "Vergiss nackte Suchvolumina. Ein modernes Keyword Tool liefert tiefgreifende Intent-Analysen und Entity Tracking für echte KI-Sichtbarkeit."
  },
  "src/content/glossar/linkbuilding.md": {
    "title": "Linkbuilding: Der Weg zu echten Entity-Citations",
    "description": "Klassisches Linkbuilding ist tot. Baue jetzt maschinelles Vertrauen durch Entity-Citations auf, um RAG-Modelle strategisch zu dominieren."
  },
  "src/content/glossar/local-seo.md": {
    "title": "Local SEO: Sichtbarkeit im Kampf der KI-Agenten",
    "description": "Sichere dir lokale Relevanz im Zeitalter der KI. Technischer Deep-Dive zu JSON-LD, NAP-Konsistenz und dominanten Google AI Overviews."
  },
  "src/content/glossar/noindex.md": {
    "title": "Noindex: Seiten gnadenlos von der KI ausschließen",
    "description": "Kontrolliere dein Crawl-Budget mit dem Noindex Meta-Tag. So verbietest du KI-Crawlern radikal und technisch sauber den Zugriff auf Inhalte."
  },
  "src/content/glossar/rag.md": {
    "title": "RAG: Das echte Gehirn-Doping für KI-Inhalte",
    "description": "Mit Retrieval-Augmented Generation (RAG) fütterst du KI-Crawler gezielt mit eigenen Daten und verhinderst Halluzinationen. Echtes Tacheles."
  },
  "src/content/glossar/semantic-seo.md": {
    "title": "Semantic SEO: Themenwelten im Vektorraum steuern",
    "description": "So verarbeiten LLMs Konzepte im Vektorraum. Mit knallhartem Semantic SEO und Topical Authority machst du dich unersetzlich für jede KI."
  },
  "src/content/glossar/seo-consulting.md": {
    "title": "SEO Consulting: Strategische Architektur für KIs",
    "description": "SEO Consulting bedeutet heute knallharte Systemarchitektur. Etabliere auth.md und maschinenlesbare Endpunkte für aggressives KI-Wachstum."
  },
  "src/content/glossar/sovp-protocol.md": {
    "title": "SOVP Protocol: Determinismus in KI-Infrastrukturen",
    "description": "Alles über das Sovereign Validation Protocol (SOVP) und Infrastruktur-Zertifikate. Echtes Tacheles zu Determinismus in Systemen von morgen."
  },
  "src/content/glossar/title-tag.md": {
    "title": "Title Tag: Der entscheidende Filter für KI-Crawler",
    "description": "Der Title Tag bleibt auch für KI eines der stärksten Signale. Optimiere harte HTML-Titel für maximales LLM-Crawling und CTR ohne Bullshit."
  },
  "src/content/glossar/usability.md": {
    "title": "Usability: Perfekte UX für Menschen und Maschinen",
    "description": "Usability bedeutet heute: Deine Website muss für menschliche Besucher intuitiv und für KI-Agenten kompromisslos maschinenlesbar sein."
  },
  "src/content/glossar/wordpress-seo.md": {
    "title": "WordPress SEO: Markdown & technische KI-Updates",
    "description": "WordPress muss sich radikal wandeln. Headless-Markdown und saubere Endpunkte sind heute absolute Pflicht für ernsthafte KI-Optimierung."
  }
};

for (const [file, meta] of Object.entries(updates)) {
  const fullPath = path.join(process.cwd(), file);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${file}`);
    continue;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // replace title
  content = content.replace(/^title:\s*.*$/m, `title: '${meta.title}'`);
  // replace description
  content = content.replace(/^description:\s*.*$/m, `description: '${meta.description}'`);
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Updated ${file}`);
}
