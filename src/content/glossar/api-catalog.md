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

Jede Ressource in einer ARD-Datei wird über einen eindeutigen Uniform Resource Name (URN) identifiziert und folgt der strikten *Value-or-Reference*-Konvention: Ein Eintrag verweist entweder per `url` auf eine externe Spezifikation oder bettet die Schemadaten per `data` direkt ein.

Das folgende Beispiel zeigt eine produktionsreife `ai-catalog.json` für eine moderne Web-Domain:

```json
{
  "specVersion": "1.0",
  "host": {
    "name": "Dein Unternehmensname",
    "url": "https://deinedomain.de",
    "description": "Anbieter digitaler Dienstleistungen, strukturierter Daten und KI-Schnittstellen."
  },
  "entries": [
    {
      "id": "urn:ai:deinedomain.de:mcp:analyse-service",
      "type": "mcp-server",
      "name": "Analysis Assistant",
      "description": "Liefert strukturierte Onpage- und Entitäts-Faktoren für Kundenanfragen.",
      "url": "https://deinedomain.de/.well-known/mcp/server-card.json"
    },
    {
      "id": "urn:ai:deinedomain.de:api:produkt-katalog",
      "type": "openapi",
      "name": "Product Catalog API",
      "description": "Liefert maschinenlesbare Schnittstellen zur Preis- und Produktabfrage.",
      "url": "https://deinedomain.de/api/v1/products/openapi.json"
    }
  ]
}
```

Ergänzend signalisiert der Server über den HTTP-Header nach [RFC 8288](/glossar/rfc-8288-link-headers/) das Vorhandensein des Katalogs:

```http
# HTTP-Header (Domain anpassen)
Link: <https://deinedomain.de/.well-known/ai-catalog.json>; rel="service-desc"; type="application/json"
```

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-2xl">
  <p class="font-bold text-lime-800 mb-2">💡 Jörg Zimmer aus der SEO-Praxis:</p>
  <blockquote class="italic text-dark mb-3">
    „Stelle sicher, dass SEO nahtlos mit anderen Abteilungen wie Marketing, Content-Erstellung und Entwicklung zusammenarbeitet.“
  </blockquote>
  <a href="https://www.linkedin.com/feed/update/urn:li:activity:7099038863783784448" target="_blank" rel="noopener noreferrer" class="text-sm font-bold text-lime-700 hover:underline inline-block">
    ↗ Zur Diskussion auf LinkedIn
  </a>
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
curl -s https://deinedomain.de/.well-known/ai-catalog.json | jq '{
  spec: .specVersion,
  anbieter: .host.name,
  anzahl_services: (.entries | length)
}'
```

Gibt die Konsole die erwartete Spezifikations-Version und die Anzahl der deklarierten Schnittstellen fehlerfrei aus, können automatisierte Agenten den Katalog reibungslos verarbeiten.

## Bedeutung für das Agent Readiness Level 5 und B2B-Geschäftsprozesse

Die Bereitstellung eines validen API-Catalogs in Kombination mit der [MCP Server Card](/glossar/mcp-server-card/) ist das Herzstück des [Agent Readiness Level](/glossar/agent-readiness-level/) 5. Websites, die diese Infrastruktur etablieren, ermöglichen autonomen Beschaffungs- und Einkaufsagenten das friktionslose Platzieren von Aufträgen und sichern sich die Marktführerschaft im Machine-to-Machine-Commerce. 

Unternehmen, die ihre Sichtbarkeit im neuen Agenten-Ökosystem systematisch nachverfolgen wollen, greifen auf etablierte Plattformen aus unserem [Vergleich der Top 9 AI Visibility Tools](/blog/top-9-ai-visibility-tools/) zurück. Zur exakten Budgetierung technischer Entwicklungs- und Softwarekosten dient der interaktive [SEO-Tool Kostenrechner](/tools/seo-tool-kostenrechner/). Wer seine Schnittstellen frühzeitig für KI-Agenten öffnet, verhindert teure Insellösungen, sichert die Auffindbarkeit seiner Daten und baut nachhaltige Marktrelevanz auf.
