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

## Was ist eine MCP Server Card?

Eine MCP Server Card ist ein maschinenlesbares Metadaten-Dokument im JSON-Format, das einen MCP-Server und seine Fähigkeiten umfassend beschreibt. Ähnlich wie eine `robots.txt` traditionellen Suchmaschinen-Crawlern mitteilt, welche Seiten gecrawlt werden dürfen, signalisiert die Server Card anfragenden KI-Assistenten (wie Claude, Cursor oder dezentralen Autonomous Agents), welche Funktionen auf dem Host verfügbar sind.

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
*   **SEP-2127 (Canonical mcp.json):** Die neuere Spezifikation der MCP Working Group empfiehlt den schlankeren Pfad `/.well-known/mcp.json`. Er vereinheitlicht die Nomenklatur analog zu `ai-plugin.json` oder `security.txt`.

In Produktivumgebungen empfiehlt sich ein Dual-Stack-Ansatz: Das Manifest wird unter `/.well-known/mcp.json` bereitgestellt, während `/.well-known/mcp/server-card.json` als HTTP-Redirect (301) oder synchronisierte Datei vorgehalten wird.

### Praxis-Beispiel: Das universelle Server-Card-Manifest

Das folgende JSON-Dokument demonstriert den standardkonformen Aufbau eines universellen MCP-Discovery-Manifests:

```json
{
  "$schema": "https://modelcontextprotocol.io/schemas/server-card-v1.json",
  "name": "Unternehmens-Analyse-Server",
  "version": "1.2.0",
  "description": "Stellt Analyse-Tools und Entitäts-Abfragen für B2B-Projekte bereit.",
  "homepage": "https://deinedomain.de",
  "transport": {
    "type": "sse",
    "endpoint": "https://api.deinedomain.de/mcp/sse",
    "messageEndpoint": "https://api.deinedomain.de/mcp/messages"
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

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-2xl">
  <p class="font-bold text-lime-800 mb-2">💡 Jörg Zimmer aus der SEO-Praxis:</p>
  <blockquote class="italic text-dark mb-3">
    „SEOs sind die Schnittstelle, um das Web ein Stück besser zu machen.“
  </blockquote>
  <a href="https://www.linkedin.com/feed/update/urn:li:activity:7119353116784779264" target="_blank" rel="noopener noreferrer" class="text-sm font-bold text-lime-700 hover:underline inline-block">
    ↗ Zur Diskussion auf LinkedIn
  </a>
</div>

## Die 3 häufigsten Fehler bei der Bereitstellung von MCP Server Cards

In der Praxis verhindern häufig kleine Implementierungsfehler die erfolgreiche Tool-Discovery:

1. **Exponieren von Geheimnissen und Passwörtern:** Die Server Card ist ein öffentliches Verzeichnisdokument. Entwickler, die API-Keys oder interne IP-Adressen in die JSON-Datei schreiben, schaffen massive Sicherheitslücken.
2. **Fehlende CORS-Header (`Access-Control-Allow-Origin`):** Web-basierte Agenten (z. B. Erweiterungen in Chrome oder Chat-Clients) können das Manifest aus Sicherheitsgründen nicht parsen, wenn die Server-Antwort keinen offenen CORS-Header enthält.
3. **Diskrepanz zwischen Schema und tatsächlicher API-Funktion:** Wenn das `inputSchema` in der Server Card Pflichtparameter deklariert, die vom Backend anders interpretiert werden, stürzen anfragende Agenten mit Validierungsfehlern ab.

## Terminal-Test: MCP Server Card per curl validieren

Systemadministratoren können die fehlerfreie Auslieferung des Manifests direkt auf der Kommandozeile prüfen:

```bash
# Validierung des Manifests im Terminal (Domain anpassen)
curl -s -H "Accept: application/json" https://deinedomain.de/.well-known/mcp.json | jq '{
  name: .name,
  transport: .transport.type,
  tools: [.tools[].name]
}'
```

Gibt der Befehl die Werkzeuge und den Transport-Typ sauber formatiert aus, steht der vollautomatischen Erkennung durch KI-Clients nichts mehr im Weg.

## Einordnung in das Ökosystem der Agent Readiness

Die MCP Server Card bildet zusammen mit der [agent-card.json](/glossar/agent-card-json/) und dem [A2A-Protocol](/glossar/a2a-protocol/) den Kern für fortgeschrittene [Agent Readiness](/glossar/agent-readiness/). Während die Agent Card die Identität des Akteurs beschreibt, stellt die Server Card die konkreten Werkzeuge zur Verfügung.

Wie sich fortschrittliche Plattformen im Zeitalter generativer KI positionieren, veranschaulicht unser [Vergleich der Top 9 AI Visibility Tools](/blog/top-9-ai-visibility-tools/). Die damit verbundenen Infrastrukturkosten lassen sich im [SEO-Tool Kostenrechner](/tools/seo-tool-kostenrechner/) betriebswirtschaftlich berechnen. Wer heute standardisierte MCP-Schnittstellen bereitstellt, erschließt sich die rasant wachsende Zielgruppe autonomer Software-Agenten.
