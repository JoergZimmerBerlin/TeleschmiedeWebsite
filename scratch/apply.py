import json
import os

rewrites = [
  {
    "file": "src/content/blog/beste-seo-tools-ai-search-prompt-tracking.md",
    "meta_title": "SEO-Tools: AI Search & Tracking Test (2026)",
    "description": "Schluss mit Blindflug! Welche SEO-Tools tracken AI Search, ChatGPT und Perplexity wirklich? Tacheles-Vergleich für deine KI-Sichtbarkeit. (2026)"
  },
  {
    "file": "src/content/blog/linkedin-google-bewertungen.md",
    "meta_title": "LinkedIn & Google Maps Bewertungen sammeln (2026)",
    "description": "Kundenbewertungen sind Gold wert. Warum es sich lohnt, Bewertungen parallel auf LinkedIn und Google Maps zu sammeln und so Trust aufzubauen. (2026)"
  },
  {
    "file": "src/content/blog/se-ranking-api-claude-code-setup.md",
    "meta_title": "SE Ranking API mit Claude Code verbinden (2026)",
    "description": "Schritt für Schritt: So bindest du die SE Ranking API an Claude Code an - inkl. Daily-Limit gegen Credit-Verbrauch. Echtes Praxis-Tutorial. (2026)"
  },
  {
    "file": "src/content/blog/seo-mega-prompt-claude-agent.md",
    "meta_title": "Geheimer Mega-Prompt für SEO in Claude (2026)",
    "description": "Wie ein einziger Prompt in Claude Code angeblich einen SEO-Experten mit 25 Jahren Erfahrung ersetzt – und warum Humor in der KI-Welt hilft. (2026)"
  },
  {
    "file": "src/content/blog/seo-stammtisch-berlin-axel-springer.md",
    "meta_title": "SEO Stammtisch Berlin bei Axel Springer (2026)",
    "description": "Netzwerken über den Dächern Berlins. Einmal im Jahr trifft sich der SEO Stammtisch Berlin in einzigartiger Atmosphäre beim Axel Springer. (2026)"
  },
  {
    "file": "src/content/blog/seorch-seo-tool-fanboy.md",
    "meta_title": "SEORCH Tool: Dein kostenloses OnPage SEO (2026)",
    "description": "Vergiss teure Suiten. Das SEORCH Tool liefert knallharte OnPage-Daten ohne Bullshit. Klartext über Funktionen und echten Mehrwert für SEOs. (2026)"
  },
  {
    "file": "src/content/blog/transparente-seo-preise-erfahrung.md",
    "meta_title": "Transparente SEO-Preise auf der Website (2026)",
    "description": "Warum ich meine SEO-Preise öffentlich auf der Website zeige, was das für die Kundenqualität bedeutet und warum ich die Stundensätze erhöhe. (2026)"
  },
  {
    "file": "src/content/glossar/agent-card-json.md",
    "meta_title": "agent-card.json: Ausweis für KI-Agenten (2026)",
    "description": "Wenn dein KI-Agent keine agent-card.json hat, existiert er für den B2B-Markt nicht. Jörg Zimmer zeigt dir das Setup für das A2A Protocol. (2026)"
  },
  {
    "file": "src/content/glossar/agent-payments-protocol-ap2.md",
    "meta_title": "Agent Payments Protocol: KI-Zahlung pur (2026)",
    "description": "Das Agent Payments Protocol (AP2) ist der neue Standard für autonome KI-Zahlungen. So funktioniert die Agent Economy ohne Mittelsmann. (2026)"
  },
  {
    "file": "src/content/glossar/agents-md.md",
    "meta_title": "agents.md: Offenes README für Agenten (2026)",
    "description": "Wie du mit einer simplen agents.md Token sparst und KI-Tools wie Cursor kontrollierst. Jörg Zimmer über Standards der Agentic AI Foundation. (2026)"
  },
  {
    "file": "src/content/glossar/ai-seo.md",
    "meta_title": "AI SEO: Mach deine Website KI ready (2026)",
    "description": "Schluss mit 10 blauen Links. AI SEO bedeutet Agent Readiness, RAG und maschinenlesbare Inhalte. Optimiere jetzt für die KI-Infrastruktur. (2026)"
  },
  {
    "file": "src/content/glossar/bing-webmastertools.md",
    "meta_title": "Bing Webmaster Tools: Pflicht für KI-SEO (2026)",
    "description": "Ignorierst du Bing? Die Bing Webmaster Tools liefern harte KI-Metriken für den Copilot. Mach deine Seite fit für Microsofts Suchmaschine. (2026)"
  },
  {
    "file": "src/content/glossar/citation.md",
    "meta_title": "Citation: Struktur und Entity-Resolution (2026)",
    "description": "Ohne saubere Citation bist du für KI unsichtbar. Wie LLMs Zitationen zur Verifizierung nutzen und warum klassische Links an Macht verlieren. (2026)"
  },
  {
    "file": "src/content/glossar/cpc.md",
    "meta_title": "CPC: Cost per Click & Agentic Bidding (2026)",
    "description": "Der CPC wandelt sich radikal. Verstehe Cost per Click in Zeiten von KI, Vector-Bidding und autonomen Agenten. Echtes Tacheles für Ads. (2026)"
  },
  {
    "file": "src/content/glossar/crawling-vs-indexing.mdx",
    "meta_title": "Crawling vs. Indexing 2026 in der KI (2026)",
    description": "Crawling ist ungleich Indexierung. Verstehe die mehrstufigen Pipelines von RAG-Systemen, um De-Indexierung und Timeouts zu verhindern. (2026)"
  },
  {
    "file": "src/content/glossar/entitaet.md",
    "meta_title": "Entität: Das Fundament moderner Pipelines (2026)",
    description: "Lose Text-Strings sind tot. Eine Entität ist heute der Grundbaustein für die KI-Suche. Wie LLMs im Knowledge Graph navigieren und ranken. (2026)"
  },
  {
    "file": "src/content/glossar/faq-markup.md",
    "meta_title": "FAQ Markup: Harte Daten für RAG-Pipelines (2026)",
    description: "FAQ Markup ist kein Spielzeug mehr. Nutze JSON-LD als knallharte Schnittstelle für LLMs und KI-Agenten, um verlustfrei Daten zu liefern. (2026)"
  },
  {
    "file": "src/content/glossar/geo-agentur.md",
    "meta_title": "GEO Agentur (Generative Engine Optimize) (2026)",
    description: "Eine GEO Agentur optimiert deine Infrastruktur für KI-Systeme wie ChatGPT, Perplexity und LLM-Pipelines nach modernsten Standards. ALOHA! (2026)"
  },
  {
    "file": "src/content/glossar/geo-optimierung.md",
    "meta_title": "GEO Optimierung: Deine RAG-Sichtbarkeit (2026)",
    description: "GEO Optimierung (Generative Engine Optimization) 2026: Content Negotiation, llms.txt, API-Endpunkte und RAG-Chunking im Tacheles-Check. (2026)"
  },
  {
    "file": "src/content/glossar/google-algorithmus.md",
    "meta_title": "Google Algorithmus: Der KI-Wächter (2026)",
    description: "Der Google Algorithmus ist heute Türsteher für AI Overviews und RAG. Tacheles: Ohne E-E-A-T und echten Information Gain fliegst du raus. (2026)"
  },
  {
    "file": "src/content/glossar/h1-h2-h3.md",
    meta_title: "Überschriften (H1-H3): Klare KI-Signale (2026)",
    description: "Überschriften strukturieren nicht nur für Menschen. H1-H3 sind 2026 kritische Anker für AI Summaries und RAG-Chunks. Bau sie präzise auf. (2026)"
  },
  {
    "file": "src/content/glossar/interne-verlinkung.md",
    "meta_title": "Interne Verlinkung 2026: Dein Entity Graph (2026)",
    description: "Interne Verlinkung 2026: Baue deinen eigenen Entity Graph für KIs, steuere den Crawler-Flow und maximiere AI Overviews Citations. ALOHA! (2026)"
  },
  {
    "file": "src/content/glossar/keyword-tool.md",
    meta_title: "Keyword Tools: Vom Suchvolumen zu AI (2026)",
    description: "Vergiss nackte Suchvolumina. Ein modernes Keyword Tool liefert tiefgreifende Intent-Analysen und Entity Tracking für echte KI-Sichtbarkeit. (2026)"
  },
  {
    "file": "src/content/glossar/linkbuilding.md",
    meta_title: "Linkbuilding: Auf dem Weg zu Citations (2026)",
    description: "Klassisches Linkbuilding ist tot. Baue jetzt maschinelles Vertrauen durch Entity-Citations auf, um RAG-Modelle strategisch zu dominieren. (2026)"
  },
  {
    "file": "src/content/glossar/local-seo.md",
    meta_title: "Local SEO: Sichtbarkeit und KI-Agenten (2026)",
    description: "Sichere dir lokale Relevanz im Zeitalter der KI. Technischer Deep-Dive zu JSON-LD, NAP-Konsistenz und dominanten Google AI Overviews. (2026)"
  },
  {
    "file": "src/content/glossar/meta-description.md",
    "meta_title": "Meta Description 2026: Vektor-Kontext (2026)",
    description: "Meta Description Optimierung für KI-Crawler: So formulierst du Snippets, die CTR maximieren und LLMs den perfekten Einstiegs-Vektor liefern. (2026)"
  },
  {
    "file": "src/content/glossar/noindex.md",
    "meta_title": "Noindex: Seiten vor KI radikal verbergen (2026)",
    description: "Kontrolliere dein Crawl-Budget mit dem Noindex Meta-Tag. So verbietest du KI-Crawlern radikal und technisch sauber den Zugriff auf Inhalte. (2026)"
  },
  {
    "file": "src/content/glossar/rag.md",
    "meta_title": "RAG: Echtes Gehirn-Doping für KI-Inhalte (2026)",
    description: "Mit Retrieval-Augmented Generation (RAG) fütterst du KI-Crawler gezielt mit eigenen Daten und verhinderst Halluzinationen. Echtes Tacheles. (2026)"
  },
  {
    "file": "src/content/glossar/semantic-seo.md",
    meta_title: "Semantic SEO: Themenwelten steuern (2026)",
    description: "So verarbeiten LLMs Konzepte im Vektorraum. Mit knallhartem Semantic SEO und Topical Authority machst du dich unersetzlich für jede KI. (2026)"
  },
  {
    "file": "src/content/glossar/seo-consulting.md",
    "meta_title": "SEO Consulting: Architektur für Agenten (2026)",
    description: "SEO Consulting bedeutet heute knallharte Systemarchitektur. Etabliere auth.md und maschinenlesbare Endpunkte für aggressives KI-Wachstum. (2026)"
  },
  {
    "file": "src/content/glossar/seo-stammtisch-berlin.md",
    "meta_title": "SEO Stammtisch Berlin: Die Netzwerker (2026)",
    description: "Der SEO Stammtisch Berlin ist die Institution für Vernetzung in der Hauptstadt. Hier trifft sich die Szene zum ehrlichen Fachaustausch. (2026)"
  },
  {
    "file": "src/content/glossar/sichtbarkeitsindex.md",
    "meta_title": "Sichtbarkeitsindex 2026: Keine blauen Links (2026)",
    description: "Der alte Sichtbarkeitsindex hat ausgedient. Warum im Juli 2026 nur noch Citation-Stability, auth.md und maschinenlesbare Architektur zählen. (2026)"
  },
  {
    "file": "src/content/glossar/sovp-protocol.md",
    "meta_title": "SOVP Protocol: Determinismus in der KI (2026)",
    description: "Alles über das Sovereign Validation Protocol (SOVP) und Infrastruktur-Zertifikate. Echtes Tacheles zu Determinismus in Systemen von morgen. (2026)"
  },
  {
    "file": "src/content/glossar/title-tag.md",
    "meta_title": "Title Tag: Der KI-Crawler Filter (2026)",
    description: "Der Title Tag bleibt auch für KI eines der stärksten Signale. Optimiere harte HTML-Titel für maximales LLM-Crawling und CTR ohne Bullshit. (2026)"
  },
  {
    "file": "src/content/glossar/trustworthiness-eeat.md",
    "meta_title": "Trustworthiness: E-E-A-T Vertrauen für KIs (2026)",
    description: "Trustworthiness 2026: Warum Vertrauen der wichtigste Faktor für KI-Suchmaschinen ist. Halluzinations-Schutz durch Disambiguierung und Fakten. (2026)"
  },
  {
    "file": "src/content/glossar/usability.md",
    "meta_title": "Usability: Perfekte UX für Menschen & KI (2026)",
    description: "Usability bedeutet heute: Deine Website muss für menschliche Besucher intuitiv und für KI-Agenten kompromisslos maschinenlesbar sein. (2026)"
  },
  {
    "file": "src/content/glossar/wordpress-seo.md",
    "meta_title": "WordPress SEO: Markdown & technische Updates (2026)",
    description: "WordPress muss sich radikal wandeln. Headless-Markdown und saubere Endpunkte sind heute absolute Pflicht für ernsthafte KI-Optimierung. (2026)"
  }
]

import re

base_path = "."
for rw in rewrites:
    file_path = os.path.join(base_path, rw["file"])
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    lines = content.split('\n')
    new_lines = []
    has_meta_title = False
    
    for line in lines:
        if line.startswith("meta_title:"):
            new_lines.append(f'meta_title: "{rw["meta_title"]}"')
            has_meta_title = True
        elif line.startswith("description:"):
            new_lines.append(f'description: "{rw["description"]}"')
        else:
            new_lines.append(line)
            
    if not has_meta_title:
        # Find where to insert it
        for i, line in enumerate(new_lines):
            if line.startswith("title:"):
                new_lines.insert(i + 1, f'meta_title: "{rw["meta_title"]}"')
                break
                
    with open(file_path, "w", encoding="utf-8") as f:
        f.write('\n'.join(new_lines))
        
    print(f"Updated {file_path}")
