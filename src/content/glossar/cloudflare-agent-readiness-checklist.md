---
category: 'AI SEO & Generative Search'
title: "Cloudflare Agent Readiness Checklist: Der Guide"
meta_title: "Cloudflare Agent Readiness (2026)"
description: "Cloudflare Agent Readiness Checklist: Vollständiger Guide zu CanAgentUse, Protocol Discovery, RFC 8288 und agentenoptimierten Web-Standards. (2026)"
meta_description: "Cloudflare Agent Readiness Checklist: Vollständiger Guide zu CanAgentUse, Protocol Discovery, RFC 8288 und agentenoptimierten Web-Standards. (2026)"
date: "2026-07-22"
image: "../../assets/images/glossar/3d-light/glossar-cloudflare-agent-readiness-checklist-3d.webp"
image_alt: "3D-Infografik einer Cloudflare Agent Readiness Checkliste mit KI-Agenten"
key_takeaways:
  - "Die Cloudflare Agent Readiness Checklist (CanAgentUse) bewertet Websites nach ihrer Fähigkeit, von autonomen KI-Agenten gelesen, verstanden und bedient zu werden."
  - "Das Prüfmodell umfasst fünf Kernbereiche: Discoverability, Content Accessibility, Bot Access Control, Protocol Discovery und Commerce."
  - "Eine saubere Umsetzung nach Cloudflare Level 5 Standards sichert Marken den entscheidenden Wettbewerbsvorteil in generativen Such- und Handlungssystemen."
faqs:
  - question: "Was ist die Cloudflare Agent Readiness Checklist?"
    answer: "Die Cloudflare Agent Readiness Checklist (teilweise auch als CanAgentUse-Audit bezeichnet) ist ein technischer Prüfkatalog von Cloudflare Radar und dem Cloudflare URL Scanner. Sie testet automatisiert, ob eine Domain moderne Protokolle für autonome KI-Agenten bereitstellt – darunter maschinenlesbare Schnittstellen-Manifeste, standardisierte HTTP-Header, Markdown-Auslieferung und Authentifizierungs-Workflows."
  - question: "Warum ist Agent Readiness für modernes AI SEO unverzichtbar?"
    answer: "Autonome Sprachmodelle und KI-Agenten (wie ChatGPT Agent, Claude Computer Use oder Google Gemini) steuern Websites nicht mehr wie menschliche Nutzer über visuelle Benutzeroberflächen an. Sie erwarten standardisierte Schnittstellen und schlanke Datenformate. Websites, welche die Checkliste erfüllen, werden von Agenten bevorzugt gecrawlt, zitiert und für geschäftliche Transaktionen ausgewählt."
  - question: "Muss jede Website alle fünf Kategorien der Checkliste abdecken?"
    answer: "Nein. Reine Informations- und B2B-Websites konzentrieren sich primär auf Discoverability, Content Accessibility und Protocol Discovery (z. B. agent-card.json, auth.md, llms.txt). Die komplexen Commerce- und Payment-Protokolle (wie x402 oder MPP) sind vor allem für E-Commerce-Plattformen und Buchungsportale relevant, auf denen Agenten eigenständig Transaktionen ausführen sollen."
---

Das Web durchläuft die tiefgreifendste Transformation seit der Erfindung des Hypertext Transfer Protocol. Wo bisher menschliche Nutzer über grafische Browser navigierten und Suchmaschinen wie Google starre Ergebnislisten ausgaben, interagieren im Jahr 2026 zunehmend autonome Software-Agenten direkt mit Web-Infrastrukturen. Diese KI-Agenten suchen nicht nur nach Informationen – sie buchen Tickets, aggregieren Daten, initiieren Einkäufe und verhandeln Schnittstellenverträge.

Um Transparenz über die Zukunftsfähigkeit von Websites zu schaffen, hat der Netzwerkgigant Cloudflare über seine Plattform Cloudflare Radar die **Agent Readiness Checklist** (auch bekannt als *CanAgentUse*-Standard) etabliert. Sie fungiert als globaler technischer Maßstab dafür, wie zugänglich und handlungsfähig eine Domain für autonome KI-Systeme aufgestellt ist.

## Was ist die Cloudflare Agent Readiness Checklist?

Die Cloudflare Agent Readiness Checklist ist ein strukturierter Prüfkatalog, der Websites auf fünf hierarchischen Ebenen evaluiert. Ähnlich wie die Core Web Vitals die visuelle und technische Performance für menschliche Besucher messen, quantifiziert der Agent-Readiness-Score die maschinelle Interaktionsqualität für KI-Agenten.

Ein KI-Agent besitzt keine Geduld für unstrukturierte HTML-DOM-Bäume, JavaScript-Renderblocker oder unklare Login-Formulare. Er benötigt maschinenlesbare Pfade, standardisierte Metadaten und performante Endpunkte. Domains, die in der Cloudflare-Prüfung grüne Statuswerte erzielen, signalisieren autonomen Systemen: *„Diese Plattform ist bereit für maschinelle Zusammenarbeit.“*

<figure class="my-8 bg-neutral-50 border border-neutral-200 p-6 md:p-8 rounded-2xl shadow-sm">
  <div class="flex items-center gap-4 mb-4">
    <img 
      src="/assets/images/profile/joerg-zimmer-portrait.webp" 
      alt="Jörg Zimmer - Senior SEO & AI Search Consultant" 
      class="w-14 h-14 rounded-full object-cover object-top shadow-sm border-2 border-lime-accent" 
      width="56" 
      height="56" 
      loading="lazy"
    />
    <div>
      <h4 class="font-bold text-base md:text-lg text-dark mb-0">Jörg Zimmer</h4>
      <p class="text-xs md:text-sm text-neutral-600 mb-0">Senior SEO & AI Search Consultant</p>
    </div>
  </div>
  <blockquote class="text-base md:text-lg text-dark leading-relaxed italic border-l-4 border-lime-accent pl-4 my-4 font-normal">
    „Developer und SEOs MÜSSEN zusammenarbeiten – besonders wenn es um AI Readiness geht. Es bringt nichts, wenn die Website visuell glänzt, aber autonome KI-Agenten an RFC-8288-Syntaxfehlern oder blockierten Markdown-Headern zerschellen. Wer Level 5 auf Cloudflare Radar anstrebt, muss Technik und Content von Tag 1 an zusammendenken.“
  </blockquote>
  <figcaption class="mt-4 pt-3 border-t border-neutral-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
    <span>Experten-Zitat • <cite class="not-italic font-semibold text-neutral-700">Jörg Zimmer</cite></span>
    <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="font-bold text-lime-700 hover:underline inline-flex items-center gap-1">
      Jörg Zimmer auf LinkedIn folgen →
    </a>
  </figcaption>
</figure>

<div class="bg-lime-accent/15 rounded-2xl border border-lime-accent/30 p-6 shadow-sm not-prose my-8">
  <div class="flex items-center gap-2 mb-3">
    <span class="text-xs font-bold uppercase tracking-wider bg-dark text-white px-2.5 py-1 rounded-full">30-Sekunden Inhaber-Check</span>
    <span class="text-xs font-semibold text-neutral-600">Jörgs Praxistipp aus der SEO-Sprechstunde</span>
  </div>
  <p class="text-neutral-800 text-sm md:text-base leading-relaxed mb-3">
    <strong>Die Kontrollfrage an deine Webagentur oder dein Inhouse-Team:</strong><br>
    <em>„Haben wir in unserer Webserver-Konfiguration RFC 8288 Link-Header aktiv, die ohne Anführungszeichen innerhalb der spitzen Klammern direkt auf unsere <code>/.well-known/agent-card.json</code> und <code>/auth.md</code> verweisen – und liefert unser Server bei <code>Accept: text/markdown</code> schlankes Markdown aus?“</em>
  </p>
  <p class="text-xs text-neutral-600 mb-0">
    Hintergrund: Wenn Link-Header fehlerhaft formatiert sind oder die <code>auth.md</code> im CMS nicht erreichbar ist, stuft Cloudflare Radar die Domain nicht als Level-5-fähig ein – autonome Agenten brechen die maschinelle Interaktion ab.
  </p>
</div>

## Die 5 Säulen der Cloudflare Agent Readiness

Das Framework gliedert sich in fünf aufeinander aufbauende Dimensionen, die von der grundlegenden Auffindbarkeit bis hin zu autonomen Bezahlprozessen reichen:

### 1. Discoverability (Auffindbarkeit)

Agenten müssen rasch erkennen, wo relevante Ressourcen liegen, ohne Terabytes an Daten sinnlos scrapen zu müssen:

*   **robots.txt & Sitemaps:** Die Basis-Infrastruktur zur Steuerung von Crawlern und Bereitstellung von URL-Indizes.
*   **RFC 8288 Link Headers:** HTTP-Header, die beim Abruf jeder beliebigen URL auf maschinenlesbare Dokumente verweisen (z. B. `<https://teleschmie.de/.well-known/agent-card.json>; rel="agent-card"`).
*   **DNS for AI Discovery ([DNS-AID](/glossar/dns-aid/)):** Ein DNS-TXT-Record-Standard, der Agenten bereits vor dem ersten HTTP-Request mitteilt, welche KI-Schnittstellen eine Domain unterstützt.

### 2. Content Accessibility (Inhalts-Zugänglichkeit)

Sprachmodelle arbeiten am effizientesten mit reinem Text, frei von werblichen Skripten und Layout-Ballast:

*   **[Markdown Content Negotiation](/glossar/markdown-content-negotiation/):** Der Server liefert auf Anfrage mit dem HTTP-Header `Accept: text/markdown` sofort sauberes Markdown anstelle von HTML aus.
*   **llms.txt & llms-full.txt:** Standardisierte Inhaltsverzeichnisse im Stammverzeichnis, die Agenten einen komprimierten Überblick über Kernwissen und Dokumentationen bieten.

### 3. Bot Access Control (Zugriffskontrolle)

Differenzierung zwischen erwünschten Recherche-Agenten und aggressiven Datendieben:

*   **Granulare [Content-Signale](/glossar/content-signals/):** Trennung von Suchindexierung (`search=yes`), RAG-Inferenz (`ai-input=yes`) und Modelltraining (`ai-train=no`).
*   **Web Bot Auth:** Kryptografische Verifizierung legitimer Agenten über TLS-Fingerprints, Reverse DNS und Signaturprüfungen.

### 4. Protocol Discovery (Protokoll- und Schnittstellen-Erkennung)

Der Dreh- und Angelpunkt für die Funktionsfähigkeit autonomer Werkzeuge:

*   **[A2A Agent Card](/glossar/a2a-protocol/):** Das standardisierte Manifest `/.well-known/agent-card.json`, das Namen, Fähigkeiten (`capabilities`) und Skills des Domain-Agenten deklariert.
*   **[auth.md](/glossar/auth-md/):** Eine Datei im Root-Verzeichnis (`/auth.md`), die Agenten Schritt für Schritt erklärt, wie sie sich via OAuth oder API-Keys autorisieren.
*   **[MCP Server Card](/glossar/mcp-server-card/):** Die maschinenlesbare `mcp.json` des [Model Context Protocol](/glossar/model-context-protocol-mcp/), über die LLMs Werkzeuge direkt ins Kontextfenster laden.
*   **API Catalog (RFC 9727):** Zentraler Katalog unter `/.well-known/api-catalog`, der OpenAPI-Spezifikationen referenziert.
*   **[OAuth Protected Resource](/glossar/oauth-protected-resource/):** RFC-konforme Metadaten zur automatisierten Aushandlung geschützter Ressourcen.

### 5. Autonomous Commerce (Transaktionen & Agent-Economy)

Ermöglicht Agenten den rechtsverbindlichen Kauf von Dienstleistungen und Produkten:

*   **[x402 Protocol](/glossar/x402-protocol/):** Standard zur Bezahlung digitaler Güter direkt über den HTTP-Statuscode 402 Payment Required.
*   **Machine Payment Protocol (MPP) & AP2:** Protokolle für dezentrale, Wallet-basierte Mikrozahlungen zwischen Maschinen.
*   **Universal Commerce Protocol (UCP):** Vereinheitlichtes Schema für Produktsuche, Warenkorbführung und Checkout durch autonome Einkäufer.

## Vergleichstabelle: Traditionelle Website vs. Cloudflare Level 5 Agent Readiness

| Dimension | Traditionelle Website | Cloudflare Level 5 Agent Readiness |
|:---|:---|:---|
| **Interaktionspartner** | Menschliche Besucher via Browser | **Menschen UND autonome KI-Agenten** |
| **Header-Discovery** | Keine maschinenlesbaren Link-Header | **Strikte RFC 8288 Link-Header (`rel="agent-card"`, etc.)** |
| **Inhaltsauslieferung** | Schwerfälliges HTML / Client-Side JS | **Zero-Latency Markdown Negotiation (`Accept: text/markdown`)** |
| **Schnittstellen-Erkennung** | Manuelle PDF- oder Swagger-Doku | **Vollautomatische Discovery via `mcp.json` & `api-catalog`** |
| **Authentifizierung** | Menschliche Registrierungsformulare | **Maschinenlesbare Onboarding-Route via `/auth.md`** |
| **Bezahlvorgänge** | Manuelles Ausfüllen von Kreditkartenmasken | **Autonome HTTP-402- & MPP-Transaktionen** |

## Universelle Konfigurations-Beispiele

Um die Checkliste in einem eigenen Projekt zu erfüllen, müssen die entsprechenden Header und Manifeste sauber konfiguriert werden.

### 1. Universelle RFC 8288 Link-Header (Apache / .htaccess)

Die HTTP-Header signalisieren jedem Agenten sofort die Existenz der Kern-Manifeste. Wichtig: Die URLs innerhalb der spitzen Klammern dürfen keine Anführungszeichen enthalten:

```apache
# RFC 8288 konforme Discovery-Header für Agenten
Header add Link "<https://teleschmie.de/.well-known/agent-card.json>; rel=\"agent-card\""
Header add Link "<https://teleschmie.de/.well-known/mcp.json>; rel=\"mcp-server-card\""
Header add Link "<https://teleschmie.de/auth.md>; rel=\"help\"; type=\"text/markdown\""
Header add Link "<https://teleschmie.de/.well-known/api-catalog>; rel=\"api-catalog\""
```

### 2. Universelle agent-card.json (A2A Protocol v1.0)

Unter `/.well-known/agent-card.json` wird das Profil des Web-Assistenten publiziert:

```json
{
  "$schema": "https://a2a-protocol.org/schemas/v1.0/agent-card.json",
  "name": "Unternehmens-Recherche-Agent",
  "description": "Stellt Branchenanalysen und Unternehmensdaten für Partner-Agenten bereit.",
  "version": "1.0.0",
  "homepage": "https://teleschmie.de/",
  "supportedInterfaces": ["mcp", "a2a-rest"],
  "capabilities": {
    "search": true,
    "analysis": true,
    "transactions": false
  },
  "auth": {
    "type": "oauth2",
    "discoveryUrl": "https://teleschmie.de/.well-known/oauth-authorization-server"
  }
}
```

<div class="my-8 bg-dark text-white p-6 rounded-2xl border-l-4 border-lime-accent shadow-md">
  <div class="flex items-start justify-between gap-4 mb-3">
    <div class="flex items-center gap-3">
      <span class="text-lime-accent text-2xl shrink-0">🤖</span>
      <p class="font-bold text-base md:text-lg text-lime-accent mb-0">Arbeitsanweisung für deinen KI-Agenten (Cursor / Claude / Antigravity)</p>
    </div>
    <button type="button" class="copy-agent-btn px-2.5 py-1 bg-lime-accent text-dark hover:bg-lime-600 hover:text-white text-[11px] font-bold uppercase rounded border border-lime-500 hover:border-lime-600 transition-all flex items-center gap-1 shadow-md cursor-pointer shrink-0 ml-auto" title="Prompt kopieren">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z" /></svg>
      <span>Kopieren für Agent</span>
    </button>
  </div>
  <p class="text-gray-300 text-sm mb-4 leading-relaxed">
    Kopiere diesen Prompt direkt in deinen KI-Coding-Assistenten, um Cloudflare Level 5 Agent Readiness für dein Webprojekt umzusetzen:
  </p>
  <div class="bg-black/60 p-4 rounded-xl border border-white/10 text-xs font-mono text-gray-200 overflow-x-auto space-y-2">
    <p class="text-lime-accent font-bold mb-1"># Prompt: Cloudflare Agent Readiness Level 5 Implementation</p>
    <p><strong>Rolle:</strong> Du bist ein hochspezialisierter Technical SEO & Web Infrastructure Architect.</p>
    <p><strong>Aufgabe:</strong> Richte alle erforderlichen Manifeste und Server-Header für Cloudflare Agent Readiness Level 5 ein.</p>
    <p><strong>Schritte & Validierung:</strong></p>
    <p>1. Erstelle `/.well-known/agent-card.json` strikt nach A2A Protocol v1.0 Schema mit Feldern `supportedInterfaces`, `capabilities` und `skills`.</p>
    <p>2. Erstelle `/auth.md` in Kleinbuchstaben mit der ersten Überschrift `# auth.md` und maschinenlesbaren Authentifizierungsschritten.</p>
    <p>3. Konfiguriere RFC 8288 Link-Header im Webserver (z. B. `.htaccess` oder Nginx) ohne Anführungszeichen in den spitzen Klammern: `Header add Link "&lt;https://teleschmie.de/.well-known/agent-card.json&gt;; rel=\"agent-card\""`.</p>
    <p>4. Validiere die Header per `curl -I -s https://teleschmie.de/ | grep -i "^link:"` und prüfe HTTP-Status 200 aller Endpunkte.</p>
  </div>
</div>

## Die 3 häufigsten Implementierungsfehler

Beim Auditieren von Websites nach Cloudflare-Kriterien fallen wiederkehrende Fallstricke auf:

1. **Syntaxfehler in RFC 8288 Link-Headern:** Viele Entwickler setzen fälschlicherweise Anführungszeichen in die spitzen Klammern (`<"https://...">`). Parser nach RFC 8288 brechen hier sofort mit einem Syntax-Error ab, wodurch das gesamte Discovery-Signal verpufft.
2. **Großgeschriebene oder deplatzierte Auth-Dateien:** Cloudflare und Agenten-Scraping-Tools erwarten `/auth.md` exakt in Kleinbuchstaben und mit einer H1-Überschrift (`# auth.md`). Liegt die Datei in einem Unterordner oder heißt `Auth.md`, scheitert der Readiness-Check.
3. **Fehlende CORS-Freigaben für Well-Known-Dateien:** Werden JSON-Dateien wie `agent-card.json` oder `mcp.json` ohne `Access-Control-Allow-Origin: *` ausgeliefert, können Browser-Agenten (z. B. Chrome Extensions) diese nicht laden.

## Terminal-Test: Agent Readiness per curl auditieren

Entwickler können die korrekte Ausspielung aller wesentlichen Discovery-Elemente direkt im Terminal prüfen:

```bash
# Prüfung der RFC 8288 Link-Header auf der Hauptdomain
curl -I -s https://teleschmie.de/ | grep -i "^link:"

# Validierung der Erreichbarkeit von agent-card.json und auth.md
curl -s -o /dev/null -w "%{http_code}\n" https://teleschmie.de/.well-known/agent-card.json
curl -s -o /dev/null -w "%{http_code}\n" https://teleschmie.de/auth.md
```

Geben die letzten beiden Befehle jeweils den Statuscode `200` zurück und listet der Link-Header die Manifeste sauber auf, ist die technische Basis für Level 5 gelegt.

## Strategische Bedeutung für Marken und AI SEO

Die Erfüllung der Cloudflare Agent Readiness Checklist ist weit mehr als eine technische Spielerei. Sie entscheidet darüber, ob Unternehmen in den Antworten autonomer Einkaufs- und Suchassistenten als privilegierte Datenquelle herangezogen werden. Ergänzt durch fundierte [Agent Readiness](/glossar/agent-readiness/) und gezielte [Agent Skills](/glossar/agent-skills/) schaffen Sie ein unverzichtbares Fundament für das generative Web.

Wie Sie Ihre Sichtbarkeit im KI-Zeitalter systematisch überwachen, zeigt unser Vergleich der [Top 9 AI Visibility Tools](/blog/top-9-ai-visibility-tools/). Die Wirtschaftlichkeit automatisierter API-Infrastrukturen können Sie mit dem [SEO-Tool Kostenrechner](/tools/seo-tool-kostenrechner/) transparent analysieren.

<div class="my-10 bg-dark text-white p-8 rounded-3xl border border-white/10 text-center shadow-md not-prose">
  <span class="text-xs uppercase tracking-widest text-lime-accent font-mono font-bold mb-3 block">
    Aus Jörgs LinkedIn-Feed
  </span>
  <blockquote class="text-base md:text-lg text-gray-200 italic max-w-2xl mx-auto mb-4 border-none font-normal">
    „Du musst zu den Top 10 in deiner Branche gehören und das technisch und inhaltlich beweisen.“
  </blockquote>
  <p class="text-gray-300 text-sm max-w-xl mx-auto mb-6">
    Diskutiere mit Jörg Zimmer und der SEO-Community auf LinkedIn über diesen Beitrag.
  </p>
  <a href="https://www.linkedin.com/feed/update/urn:li:activity:7113862535262392320" target="_blank" rel="noopener noreferrer" class="btn-primary">
    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    <span>Beitrag auf LinkedIn öffnen</span>
    <span aria-hidden="true">→</span>
  </a>
</div>

## Verwandte Glossar-Begriffe

* [Agent Readiness](/glossar/agent-readiness/)
* [Agent Skills](/glossar/agent-skills/)
* [A2A Protocol](/glossar/a2a-protocol/)
* [Auth.md](/glossar/auth-md/)
* [Markdown Content Negotiation](/glossar/markdown-content-negotiation/)
* [Model Context Protocol (MCP)](/glossar/model-context-protocol-mcp/)

