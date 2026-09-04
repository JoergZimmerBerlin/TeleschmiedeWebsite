---
category: 'AI SEO & Generative Search'
title: 'API Catalog & ARD: Agentic Resource Discovery für KI-Systeme'
meta_title: 'API Catalog: ARD & ai-catalog.json (2026)'
description: 'Wie Agentic Resource Discovery (ARD) und ai-catalog.json Schnittstellen für KI-Agenten auffindbar machen. Praxis-Guide mit Schema & Code. (2026)'
meta_description: 'Wie Agentic Resource Discovery (ARD) und ai-catalog.json Schnittstellen für KI-Agenten auffindbar machen. Praxis-Guide mit Schema & Code. (2026)'
date: '2026-03-16'
image: '../../assets/images/glossar/3d-light/glossar-api-catalog-3d.webp'
image_alt: '3D-Infografik zu Agentic Resource Discovery und ai-catalog.json Schnittstellen'
key_takeaways:
  - 'Agentic Resource Discovery (ARD) ist der offene Industrie-Standard zur strukturierten Veröffentlichung von KI-Ressourcen und APIs.'
  - 'Die zentrale Manifest-Datei /.well-known/ai-catalog.json dient autonomen Agenten als dezentrale Landkarte aller verfügbaren Werkzeuge.'
  - 'ARD fungiert als universeller Entdeckungs-Layer, der vor der eigentlichen Protokoll-Ausführung (MCP, OpenAPI) greift.'
faqs:
  - question: 'Warum reicht eine traditionelle Swagger- oder OpenAPI-Dokumentation nicht mehr aus?'
    answer: 'Klassische Swagger-UIs und OpenAPI-HTML-Seiten wurden für menschliche Entwickler gebaut, die Endpunkte manuell lesen, ausprobieren und in Code integrieren. Ein autonomer KI-Agent kann komplexe HTML-Dokumentationen nicht zuverlässig parsen. Er benötigt ein normiertes, semantisch annotiertes Manifest wie die ai-catalog.json, um Fähigkeiten, Authentifizierungswege und Eingabe-Schemata maschinenlesbar zur Laufzeit zu erfassen.'
  - question: 'Wer steht hinter der Spezifikation Agentic Resource Discovery (ARD)?'
    answer: 'ARD wurde im Sommer 2026 von einer branchenweiten Allianz unter dem Dach der Linux Foundation ins Leben gerufen, der unter anderem Google, Microsoft, GoDaddy, Hugging Face und Snowflake angehören. Ziel ist es, ein herstellerunabhängiges, dezentrales Entdeckungs-Ökosystem ohne Vendor-Lock-in zu schaffen.'
  - question: 'Wie hängen ARD und das Model Context Protocol (MCP) zusammen?'
    answer: 'ARD und MCP ergänzen sich als zweistufige Pipeline: ARD übernimmt die Entdeckungsphase (Discovery), indem es in der ai-catalog.json auflistet, welche MCP-Server auf der Domain existieren und wie sie angesprochen werden. MCP übernimmt anschließend die Ausführungsphase (Execution), um Daten abzufragen oder Funktionen auszulösen.'
  - question: 'Wo muss die ai-catalog.json auf dem Webserver hinterlegt werden?'
    answer: 'Der Standard schreibt den einheitlichen Pfad https://deinedomain.de/.well-known/ai-catalog.json vor. Zudem sollte der HTTP-Response-Header via RFC 8288 auf diese Ressource verweisen, um Agenten bereits beim ersten Request auf die Schnittstelle aufmerksam zu machen.'
---

Die Transformation des Webs von rein menschlichen Interaktionen hin zu maschinellen Agenten-Netzwerken schreitet unaufhaltsam voran. Über viele Jahre hinweg galt eine saubere API-Dokumentation im OpenAPI-Format als das Nonplusultra moderner Web-Architektur. Entwickler klickten sich durch interaktive Swagger-UIs, lasen Beispiel-Payloads und implementierten Schnittstellen in tagelanger, mühsamer Handarbeit.

Im Zeitalter autonomer Software-Agenten ist dieser langsame, manuelle Prozess ein massiver geschäftlicher Engpass. Ein B2B-Einkaufsagent oder ein automatisierter Analyse-Bot kann keine unübersichtlichen PDF-Handbücher studieren oder sich durch unstrukturierte API-Portale navigieren. Er benötigt eine standardisierte, dezentrale Landkarte, die ihm in Sekundenbruchteilen mitteilt: Welche Schnittstellen bietet diese Domain an? Welche Autorisierungs-Methoden werden vorausgesetzt? Und wie lässt sich ein konkreter Geschäftsvorgang ohne menschliche Intervention abschließen? Die Antwort der Technologiebranche auf diese Herausforderung lautet **Agentic Resource Discovery (ARD)** mit der zentralen Manifest-Datei **`ai-catalog.json`**.

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
    „Agentic Resource Discovery ist für KI-Agenten genau das, was die sitemap.xml und robots.txt für Google-Crawler waren. Wer seine Schnittstellen und MCP-Server nicht sauber über eine standardisierte ai-catalog.json publiziert, bleibt für autonome Einkaufs- und Recherche-Agenten unsichtbar – völlig egal, wie gut die eigene REST-API dokumentiert ist.“
  </blockquote>
  <figcaption class="mt-4 pt-3 border-t border-neutral-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
    <span>Experten-Zitat • <cite class="not-italic font-semibold text-neutral-700">Jörg Zimmer</cite></span>
    <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="font-bold text-lime-700 hover:underline inline-flex items-center gap-1">
      Jörg Zimmer auf LinkedIn folgen →
    </a>
  </figcaption>
</figure>

## Was ist Agentic Resource Discovery und wie funktioniert die ai-catalog.json?

Agentic Resource Discovery (ARD) ist ein offener Standard, der von führenden Cloud- und KI-Pionieren im Rahmen einer Arbeitsgruppe der Linux Foundation definiert wurde. Das Protokoll löst das Problem des isolierten Entdeckens von Schnittstellen im Web.

Anstatt auf zentrale, proprietäre Marktplätze angewiesen zu sein, hostet jede Organisation ihre eigene Schnittstellen-Übersicht unter einer standardisierten URL: `https://example.com/.well-known/ai-catalog.json`.

Der Lebenszyklus einer maschinellen Interaktion gliedert sich in vier Phasen:

1.  **Veröffentlichung (Describe):** Das Unternehmen deklariert all seine öffentlich oder per Token zugänglichen APIs, [Model Context Protocol (MCP)](/glossar/model-context-protocol-mcp/) Server und Agenten-Fähigkeiten in einem validen JSON-Format.
2.  **Crawl & Indexierung (Curate):** Spezialisierte Crawler scannen das Web nach `ai-catalog.json`-Dateien und nehmen die deklarierten Services in dezentrale Wissensgraphen auf.
3.  **Bedarfsgesteuerte Entdeckung (Discover):** Sucht ein autonomer Agent nach einer bestimmten Funktionalität (z. B. „Buche einen Konferenzraum in Berlin-Mitte“), ermittelt die KI über das ARD-Verzeichnis die passende Domain.
4.  **Verbindung & Ausführung (Connect):** Der Agent ruft die im Manifest definierte Ziel-API direkt über das native Protokoll (OpenAPI, MCP oder A2A) auf.

## Direkter Vergleich: Klassische API-Dokumentation vs. Agentic Resource Discovery

Die fundamentale Differenz zwischen Mensch-orientierter und Agent-nativer Schnittstellen-Bereitstellung zeigt sich in folgenden Kriterien:

| Architektur-Merkmal | Klassische API-Dokumentation (Swagger/OpenAPI) | Agentic Resource Discovery (ARD ai-catalog.json) |
|:---|:---|:---|
| **Primäre Zielgruppe** | Menschliche Software-Entwickler | **Autonome KI-Agenten & Reasoning-Engines** |
| **Auffindbarkeit** | Manuelle Suche in Portalen oder Google | **Standardisierter Pfad `/.well-known/ai-catalog.json`** |
| **Entdeckungsmodus** | Statische Dokumenten-Lektüre | **Dynamisches Schema-Parsing zur Laufzeit** |
| **Protokoll-Bandbreite**| Meist rein RESTful HTTP / JSON | **Multi-Protokoll (REST, MCP, A2A, GraphQL)** |
| **Verknüpfung zu Auth**| Manuelles Kopieren von API-Keys | **Direkte Verknüpfung mit [auth.md](/glossar/auth-md/) & OAuth Discovery** |
| **Agent Readiness Level** | Stufe 2 bis 3 (Passive API-Präsenz) | **Stufe 5 (Vollautomatisiert transaktionsfähig)** |

## Praxis-Beispiel: Aufbau einer normgerechten ai-catalog.json

<div class="bg-lime-accent/15 rounded-2xl border border-lime-accent/30 p-6 shadow-sm not-prose my-8">
  <div class="flex items-center gap-3 mb-3">
    <span class="px-3 py-1 bg-lime-accent/30 text-dark font-mono text-xs font-bold rounded-full">30-Sekunden Inhaber-Check</span>
    <span class="text-xs font-bold text-neutral-600 uppercase tracking-wider">Praxis-Check</span>
  </div>
  <h3 class="text-lg font-bold text-dark mb-2">Jörgs Praxistipp aus der SEO-Sprechstunde</h3>
  <p class="text-sm text-neutral-700 leading-relaxed mb-4">
    Prüfen Sie mit einem einzigen cURL-Befehl, ob Ihre Domain bereits Agent-Ready ist: Wenn <code>curl -I https://teleschmie.de/.well-known/ai-catalog.json</code> keinen Status 200 liefert und der Link-Header fehlt, können autonome KI-Agenten Ihre Produkte und Dienstleistungen nicht direkt buchen oder anfragen.
  </p>
  <div class="border-t border-lime-accent/30 pt-3">
    <p class="text-xs text-neutral-600 font-semibold mb-1">Frage an Ihre Webagentur oder Ihr Inhouse-Team:</p>
    <p class="text-xs text-neutral-800 italic">
      „Haben wir unter <code>/.well-known/ai-catalog.json</code> bereits ein standardisiertes ARD-Manifest für autonome KI-Agenten hinterlegt und senden wir den entsprechenden RFC 8288 Link-Header auf allen HTTP-Antworten?“
    </p>
  </div>
</div>

Jede Ressource in einer ARD-Datei wird über einen eindeutigen Uniform Resource Name (URN) identifiziert und folgt der strikten *Value-or-Reference*-Konvention: Ein Eintrag verweist entweder per `url` auf eine externe Spezifikation oder bettet die Schemadaten per `data` direkt ein.

Das folgende Beispiel zeigt eine produktionsreife `ai-catalog.json` für eine moderne Web-Domain:

```json
{
  "specVersion": "1.0",
  "host": {
    "name": "Dein Unternehmensname",
    "url": "https://teleschmie.de",
    "description": "Anbieter digitaler Dienstleistungen, strukturierter Daten und KI-Schnittstellen."
  },
  "entries": [
    {
      "id": "urn:ai:teleschmie.de:mcp:analyse-service",
      "type": "mcp-server",
      "name": "Analysis Assistant",
      "description": "Liefert strukturierte Onpage- und Entitäts-Faktoren für Kundenanfragen.",
      "url": "https://teleschmie.de/.well-known/mcp/server-card.json"
    },
    {
      "id": "urn:ai:teleschmie.de:api:produkt-katalog",
      "type": "openapi",
      "name": "Product Catalog API",
      "description": "Liefert maschinenlesbare Schnittstellen zur Preis- und Produktabfrage.",
      "url": "https://teleschmie.de/api/v1/products/openapi.json"
    }
  ]
}
```

Ergänzend signalisiert der Server über den HTTP-Header nach [RFC 8288](/glossar/rfc-8288-link-headers/) das Vorhandensein des Katalogs:

```http
# HTTP-Header (Domain anpassen)
Link: <https://teleschmie.de/.well-known/ai-catalog.json>; rel="service-desc"; type="application/json"
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
    Kopiere diesen Prompt direkt in deinen KI-Coding-Assistenten, um ein valides ARD-Manifest für deine Web-Domain zu generieren und zu konfigurieren:
  </p>
  <div class="bg-black/60 p-4 rounded-xl border border-white/10 text-xs font-mono text-gray-200 overflow-x-auto space-y-2">
    <p class="text-lime-accent font-bold mb-1"># Prompt: ARD ai-catalog.json Manifest-Generierung</p>
    <p><strong>Rolle:</strong> Du bist ein Senior Web Architect & AI Systems Specialist.</p>
    <p><strong>Aufgabe:</strong> Erstelle ein valides <code>/.well-known/ai-catalog.json</code> Manifest gemäß ARD-Spezifikation v1.0 und passe die Server-Header an.</p>
    <p><strong>Schritte & Validierung:</strong></p>
    <p>1. Definiere <code>specVersion: "1.0"</code>, <code>host</code>-Metadaten und <code>entries</code> mit eindeutigen URNs für alle MCP- und REST-Schnittstellen.</p>
    <p>2. Achte strikt auf die Value-or-Reference-Regel (niemals <code>url</code> und <code>data</code> im selben Eintrag).</p>
    <p>3. Konfiguriere den Apache/Nginx Link-Header nach RFC 8288: <code>Link: &lt;https://teleschmie.de/.well-known/ai-catalog.json&gt;; rel="service-desc"; type="application/json"</code>.</p>
  </div>
</div>

## Die 3 häufigsten Fehler bei der Implementierung eines API-Catalogs

Bei der Bereitstellung von ARD-Manifesten schleichen sich in Entwicklungsabteilungen typische Fallstricke ein:

1. **Gleichzeitige Verwendung von `url` und `data` (Strictness-Bruch):** Die ARD-Spezifikation verbietet es strikt, für einen Eintrag gleichzeitig eine externe URL und eingebettete JSON-Daten auszuliefern. Dieser Fehler führt dazu, dass Validatoren das gesamte Manifest als korrupt ablehnen.
2. **Fehlende URN-Eindeutigkeit:** Werden URN-Identifikatoren doppelt vergeben oder entsprechen sie nicht dem Format `urn:ai:<domain>:<namespace>:<name>`, können dezentrale Verzeichnisdienste die Ressourcen nicht disambiguieren.
3. **Mangelnde Synchronisation bei API-Updates:** Wird ein Backend-Endpunkt aktualisiert, die `ai-catalog.json` jedoch nicht versioniert, laufen autonome Agenten ins Leere und stufen die Domain als unzuverlässig ein.

## Dezentrale Registry-Crawler: Wie Agenten ARD-Kataloge finden

Ähnlich wie traditionelle Suchmaschinen das Web über Hyperlinks crawlen, nutzen Agenten-Ökosysteme dezentrale Registry-Crawler. Führende KI-Plattformen und Open-Source-Gemeinschaften (wie Hugging Face oder das Linux Foundation AI-Projekt) betreiben sogenannte Discovery-Bots:

*   **DNS- und Well-Known-Scans:** Crawler prüfen systematisch Domains aus Top-Level-Listen auf die Erreichbarkeit von `/.well-known/ai-catalog.json`.
*   **Semantische Klassifikation:** Die in den `entries` deklarierten Namen und Beschreibungen werden in Vektor-Datenbanken eingebettet. Sucht ein Nutzer in einem KI-Chatbot nach einer spezifischen Funktion, matcht das System die Absicht mit dem semantisch passendsten Katalog-Eintrag.
*   **Vertrauens- und Signaturprüfung:** Seriöse Kataloge signieren ihre Einträge kryptografisch (z. B. über Decentralized Identifiers wie `did:web`). Dies garantiert dem Agenten, dass die API tatsächlich von der angegebenen Organisation betrieben wird.

### Terminal-Praxis: Validierung der ai-catalog.json mit curl und jq

Entwickler können die syntaktische und strukturelle Korrektheit ihres Katalogs über einen einfachen Befehl überprüfen (ersetze die Domain durch deine eigene URL):

```bash
# Validierung des ai-catalog.json Endpunkts
curl -s https://teleschmie.de/.well-known/ai-catalog.json | jq '{
  spec: .specVersion,
  anbieter: .host.name,
  anzahl_services: (.entries | length)
}'
```

Gibt die Konsole die erwartete Spezifikations-Version und die Anzahl der deklarierten Schnittstellen fehlerfrei aus, können automatisierte Agenten den Katalog reibungslos verarbeiten.

## Bedeutung für das Agent Readiness Level 5 und B2B-Geschäftsprozesse

Die Bereitstellung eines validen API-Catalogs in Kombination mit der [MCP Server Card](/glossar/mcp-server-card/) ist das Herzstück des [Agent Readiness Level](/glossar/agent-readiness-level/) 5. Websites, die diese Infrastruktur etablieren, ermöglichen autonomen Beschaffungs- und Einkaufsagenten das friktionslose Platzieren von Aufträgen und sichern sich die Marktführerschaft im Machine-to-Machine-Commerce. 

Unternehmen, die ihre Sichtbarkeit im neuen Agenten-Ökosystem systematisch nachverfolgen wollen, greifen auf etablierte Plattformen aus unserem [Vergleich der Top 9 AI Visibility Tools](/blog/top-9-ai-visibility-tools/) zurück. Zur exakten Budgetierung technischer Entwicklungs- und Softwarekosten dient der interaktive [SEO-Tool Kostenrechner](/tools/seo-tool-kostenrechner/). Wer seine Schnittstellen frühzeitig für KI-Agenten öffnet, verhindert teure Insellösungen, sichert die Auffindbarkeit seiner Daten und baut nachhaltige Marktrelevanz auf.

<div class="my-10 bg-dark text-white p-8 rounded-3xl border border-white/10 text-center shadow-md not-prose">
  <span class="text-xs uppercase tracking-widest text-lime-accent font-mono font-bold mb-3 block">
    Aus Jörgs LinkedIn-Feed
  </span>
  <blockquote class="text-base md:text-lg text-gray-200 italic max-w-2xl mx-auto mb-4 border-none font-normal">
    „SEO ist auch Architektur und Management.“
  </blockquote>
  <p class="text-gray-300 text-sm max-w-xl mx-auto mb-6">
    Diskutiere mit Jörg Zimmer und der SEO-Community auf LinkedIn über diesen Beitrag.
  </p>
  <a href="https://www.linkedin.com/feed/update/urn:li:activity:7000899641269452800" target="_blank" rel="noopener noreferrer" class="btn-primary">
    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    <span>Beitrag auf LinkedIn öffnen</span>
    <span aria-hidden="true">→</span>
  </a>
</div>

### Verwandte Glossar-Begriffe
* [Model Context Protocol (MCP)](/glossar/model-context-protocol-mcp/)
* [MCP Server Card im Detail](/glossar/mcp-server-card/)
* [Agent Readiness Level Stufe 5](/glossar/agent-readiness-level/)
* [auth.md Sicherheits-Standard](/glossar/auth-md/)
* [RFC 8288 Link Headers](/glossar/rfc-8288-link-headers/)
