---
category: 'AI SEO & Generative Search'
title: "MCP Server Card: Tool-Discovery für Agenten"
meta_title: "MCP Server Card: Discovery-Standard (2026)"
description: "Was ist eine MCP Server Card? Model Context Protocol Server Discovery, mcp.json Schema und wie KI-Agenten Schnittstellen autonom anbinden. (2026)"
meta_description: "Was ist eine MCP Server Card? Model Context Protocol Server Discovery, mcp.json Schema und wie KI-Agenten Schnittstellen autonom anbinden. (2026)"
date: "2026-07-22"
image: "../../assets/images/glossar/3d-light/glossar-mcp-server-card-3d.webp"
image_alt: "MCP Server Card Infografik mit Jörg Zimmer Wasserzeichen"
key_takeaways:
  - "Eine MCP Server Card ist das maschinenlesbare Entdeckungs-Manifest für Server des Model Context Protocol (MCP)."
  - "Autonome KI-Clients (wie Claude Desktop, Cursor oder Browser-Agenten) nutzen die Card zur vollautomatischen Konfiguration ohne Handarbeit."
  - "Der moderne Standard (SEP-2127) etabliert mcp.json und /.well-known/mcp/server-card.json als zentrale Well-Known-Pfade."
faqs:
  - question: "Was ist eine MCP Server Card und wofür wird sie benötigt?"
    answer: "Eine MCP Server Card ist der digitale Ausweis eines Model Context Protocol Servers. Sie informiert anfragende KI-Agenten im strukturierten JSON-Format über verfügbare Tools, Datenquellen, Transport-Protokolle (wie SSE oder Streamable HTTP) und Endpunkte. Dadurch entfällt die manuelle Konfiguration in Konfigurationsdateien."
  - question: "Wo wird das MCP Discovery Manifest auf dem Server abgelegt?"
    answer: "Das Manifest liegt standardmäßig im Well-Known-Verzeichnis der Domain. Historisch und nach SEP-1649 unter /.well-known/mcp/server-card.json sowie nach der neueren Spezifikation SEP-2127 direkt unter /.well-known/mcp.json. Für maximale Kompatibilität empfiehlt sich die parallele Bereitstellung beider Pfade."
  - question: "Welche Sicherheitsregeln gelten für die MCP Server Card?"
    answer: "Da die Server Card über den öffentlichen Well-Known-Pfad abrufbar ist, dürfen darin niemals API-Keys, Authentifizierungs-Tokens oder interne Netzwerkadressen stehen. Die Card dient rein der Entdeckung von Schnittstellen; die Authentifizierung erfolgt nachgelagert über Standards wie auth.md oder OAuth."
---

In der Software- und Websuche des Jahres 2026 vollzieht sich der Übergang von isolierten KI-Modellen hin zu vernetzten Agenten-Systemen. Große Sprachmodelle agieren nicht mehr als isolierte Wissensdatenbanken, sondern nutzen externe Werkzeuge, um Live-Daten abzurufen, Berechnungen anzustellen und Geschäftsprozesse auszuführen. Als offener Standard für diese Anbindung hat sich das [Model Context Protocol (MCP)](/glossar/model-context-protocol-mcp/) etabliert.

Um jedoch zu verhindern, dass Entwickler und KI-Clients jede Schnittstelle manuell in lokalen Konfigurationsdateien verdrahten müssen, definiert das Protokoll einen standardisierten Entdeckungsmechanismus: die **MCP Server Card** (auch als `mcp.json` Manifest bekannt).

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
    „SEOs sind die Schnittstelle, um das Web ein Stück besser zu machen – im KI-Zeitalter gilt das für maschinenlesbare Schnittstellen wie MCP erst recht. Wer Agenten wie Cursor oder Claude den automatischen Zugriff verwehrt, wird von den Programmierern und Entwicklern von morgen nicht mehr gefunden.“
  </blockquote>
  <figcaption class="mt-4 pt-3 border-t border-neutral-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
    <span>Experten-Zitat • <cite class="not-italic font-semibold text-neutral-700">Jörg Zimmer</cite></span>
    <a href="https://www.linkedin.com/feed/update/urn:li:activity:7119353116784779264" target="_blank" rel="noopener noreferrer" class="font-bold text-lime-700 hover:underline inline-flex items-center gap-1">
      Jörg Zimmer auf LinkedIn folgen →
    </a>
  </figcaption>
</figure>

<div class="bg-lime-accent/15 rounded-2xl border border-lime-accent/30 p-6 shadow-sm not-prose my-8">
  <div class="flex items-center gap-2 mb-3">
    <span class="bg-lime-accent text-dark font-bold text-xs px-2.5 py-1 rounded-full uppercase tracking-wider">30-Sekunden Inhaber-Check</span>
    <h4 class="font-bold text-base md:text-lg text-dark mb-0">Jörgs Praxistipp aus der SEO-Sprechstunde</h4>
  </div>
  <p class="text-sm md:text-base text-neutral-700 leading-relaxed mb-4">
    Prüfe mit einem schnellen Terminal-Aufruf, ob deine Domain unter <code>/.well-known/mcp.json</code> erreichbar ist und offene CORS-Header (<code>Access-Control-Allow-Origin: *</code>) mitsendet. Wenn Web-basierte Agenten wie Claude im Browser oder Cursor deine Schnittstellen nicht im ersten Anlauf parsen können, bricht der Discovery-Flow sofort ab – noch bevor auch nur ein einziges Tool ausgeführt wurde.
  </p>
  <div class="border-t border-lime-accent/30 pt-3">
    <p class="text-xs md:text-sm font-semibold text-neutral-800 mb-0">
      <strong>Kontrollfrage an deine Webagentur oder IT:</strong> „Haben wir für unsere APIs und Datenbestände bereits eine validierte <code>mcp.json</code> unter <code>/.well-known/</code> bereitgestellt, inklusive offener CORS-Header für Web-Agenten?“
    </p>
  </div>
</div>

## Was ist eine MCP Server Card?

Eine MCP Server Card ist ein maschinenlesbares Metadaten-Dokument im JSON-Format, das einen MCP-Server und seine Fähigkeiten umfassend beschreibt. Ähnlich wie eine [robots.txt](/glossar/robots-txt/) traditionellen Suchmaschinen-Crawlern mitteilt, welche Seiten gecrawlt werden dürfen, signalisiert die Server Card anfragenden KI-Assistenten (wie Claude, Cursor oder dezentralen Autonomous Agents), welche Funktionen auf dem Host verfügbar sind.

Die Server Card erfüllt drei unverzichtbare Kernaufgaben:

1. **Transport-Deklaration:** Sie spezifiziert, über welche Netzwerkprotokolle der Server erreichbar ist – typischerweise Server-Sent Events (SSE), WebSockets oder modernes Streamable HTTP.
2. **Tool- & Ressourcen-Katalog:** Sie listet die deklarierten Werkzeuge auf, inklusive deren semantischer Beschreibungen und Eingabeschemata (Input Schemas).
3. **Endpoint-Mapping:** Sie definiert die exakten URLs, an die ein KI-Agent seine JSON-RPC-2.0-Aufrufe richten muss.

## Architektur und Lebenszyklus einer autonomen MCP-Verbindung

Um den Mehrwert der MCP Server Card zu verstehen, muss man den Verbindungsaufbau zwischen Client (dem KI-Modell bzw. Agenten-Framework) und Server im Detail betrachten. Ohne Manifest muss ein Entwickler Endpunkte, HTTP-Header und Tool-Signaturen manuell im Client registrieren. Mit einer standardisierten Server Card läuft dieser Prozess vollautonom in vier Schritten ab:

1. **Discovery-Phase (Auto-Discovery):** Der KI-Agent stößt auf eine Domain oder einen Service und sendet einen GET-Request an `/.well-known/mcp.json`. Bei Erfolg empfängt er das JSON-Manifest und prüft dessen Gültigkeit anhand des JSON-Schemas.
2. **Handshake & Capability-Exchange:** Der Client liest das `transport`-Objekt aus. Wenn der Server Server-Sent Events (SSE) anbietet, öffnet der Agent eine dauerhafte HTTP-Verbindung zum Event-Stream (`endpoint`). Über diese Verbindung senden Client und Server Initialisierungsnachrichten (`initialize`-Methode), in denen Protokollversionen und Features (z. B. Unterstützung für Pagination oder Fortschritts-Benachrichtigungen) abgeglichen werden.
3. **Tool-Registrierung im Kontextfenster:** Der Agent parst das Array der deklarierten Werkzeuge (`tools`). Die darin enthaltenen `inputSchema`-Definitionen (auf Basis von JSON Schema) werden direkt in das Function-Calling-System des angebundenen Sprachmodells (z. B. Anthropic Claude, OpenAI GPT oder Google Gemini) geladen. Das LLM weiß nun exakt, mit welchen Parametern es das Werkzeug aufrufen darf.
4. **Ausführung & Session-Handling:** Benötigt der Agent ein Werkzeug zur Beantwortung einer Nutzeranfrage, generiert das LLM einen JSON-RPC-2.0-Aufruf (`tools/call`) und schickt ihn via HTTP POST an den `messageEndpoint`. Der Server verarbeitet den Request und streamt das Ergebnis zurück zum Agenten.

Dieser automatisierte Zyklus reduziert die Integrationszeit für neue Datenquellen von Stunden auf wenige Millisekunden. Wenn ein Webdienst neue Analyse- oder Buchungs-Tools freischaltet, stehen diese sofort jedem Agenten zur Verfügung, ohne dass der Entwickler ein lokales Update ausrollen muss.

## Vergleichstabelle: Manuelle Konfiguration vs. MCP Server Card Discovery

Die Einführung automatisierter Server Cards markiert den Schritt von starren Entwickler-Setups zur dynamischen Agent-Economy:

| Kriterium | Manuelle MCP-Einbindung (Legacy) | MCP Server Card Discovery (Standard 2026) |
|:---|:---|:---|
| **Verbindungsaufbau** | Entwickler tippt Pfade in `claude_desktop_config.json` | **Vollautomatische Zero-Touch-Erkennung durch den Agenten** |
| **Transport-Aushandlung**| Fest verdrahtet (meist rein lokales `stdio`) | **Dynamische Wahl zwischen SSE, HTTP & WebSockets** |
| **Tool-Aktualisierungen** | Manuelles Nachpflegen bei jeder Schema-Änderung | **Echtzeit-Synchronisation über das Manifest** |
| **Cross-Platform Nutzung**| Beschränkt auf lokale Entwickler-Rechner | **Universell nutzbar im Web, in Clouds und auf Mobilgeräten** |
| **Browser-Integration** | Unmöglich ohne native Hilfsprogramme | **Nativ kompatibel mit [WebMCP](/glossar/webmcp/) im Browser** |
| **Sicherheits-Layer** | Statische Zugangsdaten in lokalen Textdateien | **Entkoppelte Autorisierung via [auth.md](/glossar/auth-md/)** |

## Die Entwicklung des Standards: SEP-1649 vs. SEP-2127

Die Standardisierung von MCP-Discovery-Dateien hat eine rasante Evolution durchlaufen. Entwickler sollten die beiden maßgeblichen Spezifikations-Entwürfe kennen:

*   **SEP-1649 (Server Card Entwurf):** Führte den dedizierten Pfad `/.well-known/mcp/server-card.json` ein. Dieser Standard wird von vielen etablierten Tool-Verzeichnissen und Frameworks aus der ersten Jahreshälfte 2025/2026 verwendet.
*   **SEP-2127 (Canonical mcp.json):** Die neuere Spezifikation der MCP Working Group empfiehlt den schlankeren Pfad `/.well-known/mcp.json`. Er vereinheitlicht die Nomenklatur analog zu `ai-plugin.json` oder [llms.txt](/glossar/llms-txt/).

In Produktivumgebungen empfiehlt sich ein Dual-Stack-Ansatz: Das Manifest wird unter `/.well-known/mcp.json` bereitgestellt, während `/.well-known/mcp/server-card.json` als HTTP-Redirect (301) oder synchronisierte Datei vorgehalten wird.

### Praxis-Beispiel: Das universelle Server-Card-Manifest

Das folgende JSON-Dokument demonstriert den standardkonformen Aufbau eines universellen MCP-Discovery-Manifests:

```json
{
  "$schema": "https://modelcontextprotocol.io/schemas/server-card-v1.json",
  "name": "Unternehmens-Analyse-Server",
  "version": "1.2.0",
  "description": "Stellt Analyse-Tools und Entitäts-Abfragen für B2B-Projekte bereit.",
  "homepage": "https://teleschmie.de",
  "transport": {
    "type": "sse",
    "endpoint": "https://api.teleschmie.de/mcp/sse",
    "messageEndpoint": "https://api.teleschmie.de/mcp/messages"
  },
  "capabilities": {
    "tools": true,
    "resources": true,
    "prompts": false
  },
  "tools": [
    {
      "name": "analysiereWebseite",
      "description": "Führt ein strukturiertes Onpage- und Entitäts-Audit durch.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "zielUrl": { "type": "string", "format": "uri" }
        },
        "required": ["zielUrl"]
      }
    }
  ]
}
```

### CORS-Header und Server-Konfiguration

Damit KI-Agenten und Browser-basierte Assistenten das Manifest abrufen können, muss der Webserver den passenden CORS-Header ausliefern:

```http
# Server-Response für /.well-known/mcp.json
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
Cache-Control: public, max-age=3600
```

## Die 3 häufigsten Fehler bei der Bereitstellung von MCP Server Cards

In der Praxis verhindern häufig kleine Implementierungsfehler die erfolgreiche Tool-Discovery:

1. **Exponieren von Geheimnissen und Passwörtern:** Die Server Card ist ein öffentliches Verzeichnisdokument. Entwickler, die API-Keys oder interne IP-Adressen in die JSON-Datei schreiben, schaffen massive Sicherheitslücken.
2. **Fehlende CORS-Header (`Access-Control-Allow-Origin`):** Web-basierte Agenten (z. B. Erweiterungen in Chrome oder Chat-Clients) können das Manifest aus Sicherheitsgründen nicht parsen, wenn die Server-Antwort keinen offenen CORS-Header enthält.
3. **Diskrepanz zwischen Schema und tatsächlicher API-Funktion:** Wenn das `inputSchema` in der Server Card Pflichtparameter deklariert, die vom Backend anders interpretiert werden, stürzen anfragende Agenten mit Validierungsfehlern ab.

## Terminal-Test: MCP Server Card per curl validieren

Systemadministratoren können die fehlerfreie Auslieferung des Manifests direkt auf der Kommandozeile prüfen:

```bash
# Validierung des Manifests im Terminal (Domain anpassen)
curl -s -H "Accept: application/json" https://teleschmie.de/.well-known/mcp.json | jq '{
  name: .name,
  transport: .transport.type,
  tools: [.tools[].name]
}'
```

Gibt der Befehl die Werkzeuge und den Transport-Typ sauber formatiert aus, steht der vollautomatischen Erkennung durch KI-Clients nichts mehr im Weg.

## Einordnung in das Ökosystem der Agent Readiness

Die MCP Server Card bildet zusammen mit der [agent-card.json](/glossar/agent-card-json/) und dem [A2A-Protocol](/glossar/a2a-protocol/) den Kern für fortgeschrittene [Agent Readiness](/glossar/agent-readiness/). Während die Agent Card die Identität des Akteurs beschreibt, stellt die Server Card die konkreten Werkzeuge zur Verfügung.

Wie sich fortschrittliche Plattformen im Zeitalter generativer KI positionieren, veranschaulicht unser [Vergleich der Top 9 AI Visibility Tools](/blog/top-9-ai-visibility-tools/). Die damit verbundenen Infrastrukturkosten lassen sich im [SEO-Tool Kostenrechner](/tools/seo-tool-kostenrechner/) betriebswirtschaftlich berechnen. Wer heute standardisierte MCP-Schnittstellen bereitstellt, erschließt sich die rasant wachsende Zielgruppe autonomer Software-Agenten.

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
    Kopiere diesen Prompt direkt in deinen KI-Coding-Assistenten, um die MCP Server Card für deine Domain automatisiert zu generieren und zu validieren:
  </p>
  <div class="bg-black/60 p-4 rounded-xl border border-white/10 text-xs font-mono text-gray-200 overflow-x-auto space-y-2">
    <p class="text-lime-accent font-bold mb-1"># Prompt: MCP Server Card Generierung & Validierung</p>
    <p><strong>Rolle:</strong> Du bist ein hochspezialisierter Technical SEO & AI Systems Architect.</p>
    <p><strong>Aufgabe:</strong> Erstelle ein standardkonformes MCP Server Discovery Manifest unter <code>public/.well-known/mcp.json</code> (sowie einen Symlink oder Redirect von <code>/.well-known/mcp/server-card.json</code>) und konfiguriere die Webserver-Header für CORS.</p>
    <p><strong>Schritte & Validierung:</strong></p>
    <p>1. Erzeuge die Datei <code>public/.well-known/mcp.json</code> mit Schema <code>https://modelcontextprotocol.io/schemas/server-card-v1.json</code>, aktuellem Versionsstand, Transport-Definition (SSE oder HTTP) und allen aktiven Tools inklusive JSON Schema für die Parameter.</p>
    <p>2. Konfiguriere in der Webserver-Konfiguration (.htaccess / Nginx) für Pfade unter <code>/.well-known/mcp*</code> die Header: <code>Access-Control-Allow-Origin "*"</code>, <code>Access-Control-Allow-Methods "GET, OPTIONS"</code> und <code>Content-Type "application/json; charset=utf-8"</code>.</p>
    <p>3. Führe im Terminal <code>curl -I https://teleschmie.de/.well-known/mcp.json</code> aus und verifiziere Status 200 sowie die CORS-Header. Validiere die Syntax anschließend mit <code>jq . public/.well-known/mcp.json</code>.</p>
  </div>
</div>

<div class="my-10 bg-dark text-white p-8 rounded-3xl border border-white/10 text-center shadow-md not-prose">
  <span class="text-xs uppercase tracking-widest text-lime-accent font-mono font-bold mb-3 block">
    Aus Jörgs LinkedIn-Feed
  </span>
  <blockquote class="text-base md:text-lg text-gray-200 italic max-w-2xl mx-auto mb-4 border-none font-normal">
    „Durch die Analyse von Daten kann man das Verhalten und die Wünsche der Zielgruppe besser verstehen und die Marketingstrategie entsprechend anpassen.“
  </blockquote>
  <p class="text-gray-300 text-sm max-w-xl mx-auto mb-6">
    Diskutiere mit Jörg Zimmer und der SEO-Community auf LinkedIn über diesen Beitrag.
  </p>
  <a href="https://www.linkedin.com/feed/update/urn:li:activity:7019828915183452160" target="_blank" rel="noopener noreferrer" class="btn-primary">
    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    <span>Beitrag auf LinkedIn öffnen</span>
    <span aria-hidden="true">→</span>
  </a>
</div>

### Verwandte Glossar-Begriffe
* [Model Context Protocol (MCP)](/glossar/model-context-protocol-mcp/)
* [WebMCP](/glossar/webmcp/)
* [Agent Card (agent-card.json)](/glossar/agent-card-json/)
* [A2A-Protokoll](/glossar/a2a-protocol/)
* [Agent Readiness](/glossar/agent-readiness/)
* [Auth.md](/glossar/auth-md/)
