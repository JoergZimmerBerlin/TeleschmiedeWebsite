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

## Die 5 Säulen der Cloudflare Agent Readiness

Das Framework gliedert sich in fünf aufeinander aufbauende Dimensionen, die von der grundlegenden Auffindbarkeit bis hin zu autonomen Bezahlprozessen reichen:

### 1. Discoverability (Auffindbarkeit)

Agenten müssen rasch erkennen, wo relevante Ressourcen liegen, ohne Terabytes an Daten sinnlos scrapen zu müssen:

*   **robots.txt & Sitemaps:** Die Basis-Infrastruktur zur Steuerung von Crawlern und Bereitstellung von URL-Indizes.
*   **RFC 8288 Link Headers:** HTTP-Header, die beim Abruf jeder beliebigen URL auf maschinenlesbare Dokumente verweisen (z. B. `<https://deinedomain.de/.well-known/agent-card.json>; rel="agent-card"`).
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
Header add Link "<https://api.deinedomain.de/.well-known/agent-card.json>; rel=\"agent-card\""
Header add Link "<https://api.deinedomain.de/.well-known/mcp.json>; rel=\"mcp-server-card\""
Header add Link "<https://api.deinedomain.de/auth.md>; rel=\"help\"; type=\"text/markdown\""
Header add Link "<https://api.deinedomain.de/.well-known/api-catalog>; rel=\"api-catalog\""
```

### 2. Universelle agent-card.json (A2A Protocol v1.0)

Unter `/.well-known/agent-card.json` wird das Profil des Web-Assistenten publiziert:

```json
{
  "$schema": "https://a2a-protocol.org/schemas/v1.0/agent-card.json",
  "name": "Unternehmens-Recherche-Agent",
  "description": "Stellt Branchenanalysen und Unternehmensdaten für Partner-Agenten bereit.",
  "version": "1.0.0",
  "homepage": "https://deinedomain.de",
  "supportedInterfaces": ["mcp", "a2a-rest"],
  "capabilities": {
    "search": true,
    "analysis": true,
    "transactions": false
  },
  "auth": {
    "type": "oauth2",
    "discoveryUrl": "https://api.deinedomain.de/.well-known/oauth-authorization-server"
  }
}
```

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-2xl">
  <p class="font-bold text-lime-800 mb-2">💡 Jörg Zimmer aus der SEO-Praxis:</p>
  <blockquote class="italic text-dark mb-3">
    „Developer und SEOs MÜSSEN zusammen arbeiten! Gerade wenn es um Relaunch geht. Da wirst als SEO nach den Live Gang hinzugeholt und sollst dann erklären, warum du beispielsweise die Struktur anders aufgesetzt hättest. Außerdem produziert das Frust und Arbeit, die man hätte gleich zusammen besser lösen können. Für mich gehört Webentwicklung mit technischen SEO Basics einfach zusammen.“
  </blockquote>
  <a href="https://www.linkedin.com/feed/update/urn:li:activity:6979120413486280706" target="_blank" rel="noopener noreferrer" class="text-sm font-bold text-lime-700 hover:underline inline-block">
    ↗ Zur Diskussion auf LinkedIn
  </a>
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
curl -I -s https://deinedomain.de/ | grep -i "^link:"

# Validierung der Erreichbarkeit von agent-card.json und auth.md
curl -s -o /dev/null -w "%{http_code}\n" https://deinedomain.de/.well-known/agent-card.json
curl -s -o /dev/null -w "%{http_code}\n" https://deinedomain.de/auth.md
```

Geben die letzten beiden Befehle jeweils den Statuscode `200` zurück und listet der Link-Header die Manifeste sauber auf, ist die technische Basis für Level 5 gelegt.

## Strategische Bedeutung für Marken und AI SEO

Die Erfüllung der Cloudflare Agent Readiness Checklist ist weit mehr als eine technische Spielerei. Sie entscheidet darüber, ob Unternehmen in den Antworten autonomer Einkaufs- und Suchassistenten als privilegierte Datenquelle herangezogen werden. Ergänzt durch fundierte [Agent Readiness](/glossar/agent-readiness/) und gezielte [Agent Skills](/glossar/agent-skills/) schaffen Sie ein unverzichtbares Fundament für das generative Web.

Wie Sie Ihre Sichtbarkeit im KI-Zeitalter systematisch überwachen, zeigt unser Vergleich der [Top 9 AI Visibility Tools](/blog/top-9-ai-visibility-tools/). Die Wirtschaftlichkeit automatisierter API-Infrastrukturen können Sie mit dem [SEO-Tool Kostenrechner](/tools/seo-tool-kostenrechner/) transparent analysieren.

