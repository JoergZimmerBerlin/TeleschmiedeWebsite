---
category: 'AI SEO & Generative Search'
title: "ai-plugin.json: Warum ChatGPT Plugins tot sind"
meta_title: "ai-plugin.json & Ende der Plugins (2026)"
description: "Die ai-plugin.json ist Geschichte: Warum ChatGPT Plugins abgelöst wurden und wie LLMs heute mit GPT Actions und dem MCP-Standard arbeiten. (2026)"
meta_description: "Die ai-plugin.json ist Geschichte: Warum ChatGPT Plugins abgelöst wurden und wie LLMs heute mit GPT Actions und dem MCP-Standard arbeiten. (2026)"
date: "2026-07-17"
image: "../../assets/images/glossar/3d-light/glossar-ai-plugin-json-3d.webp"
image_alt: "3D Infografik zum Thema ai-plugin.json und der Evolution hin zu modernen Schnittstellen"
key_takeaways:
  - "Die ai-plugin.json war 2023 das zentrale Manifest für ChatGPT Plugins, wurde von OpenAI jedoch im April 2024 vollständig eingestellt."
  - "Proprietäre Plugin-Silos scheiterten an mangelnder Skalierbarkeit, mangelnder Sicherheit und fehlender Standardisierung zwischen LLM-Anbietern."
  - "Moderne Architekturen setzen im OpenAI-Ökosystem auf GPT Actions mit OpenAPI-Spezifikationen und im offenen Web auf das Model Context Protocol (MCP)."
  - "Für nachhaltige KI-Sichtbarkeit und Agent Readiness zählen heute standardisierte RAG-Pipelines, strukturierte Daten und offene Schnittstellen."
faqs:
  - question: "Was genau war die ai-plugin.json?"
    answer: "Es war eine proprietäre Manifest-Datei von OpenAI im JSON-Format. Entwickler platzierten sie unter /.well-known/ai-plugin.json, um ChatGPT Informationen über API-Endpunkte, Authentifizierung und die verknüpfte OpenAPI-Spezifikation bereitzustellen."
  - question: "Warum hat OpenAI die ChatGPT Plugins eingestellt?"
    answer: "Das ursprüngliche Plugin-System war schwer zu warten, bot unzureichende Nutzererlebnisse und erforderte für jeden Anbieter eigene Manifeste. OpenAI ersetzte Plugins im April 2024 durch Custom GPTs mit integrierten GPT Actions."
  - question: "Sollte eine verbleibende ai-plugin.json auf dem Webserver gelöscht werden?"
    answer: "Ein akuter Zwang zur Löschung besteht nicht, da sie keine negativen SEO-Auswirkungen hat. Allerdings lohnt sich keinerlei Weiterentwicklung oder Pflege mehr. Budgets sollten stattdessen in llms.txt, strukturierte Daten und MCP-Schnittstellen investiert werden."
  - question: "Was ist heute der Standard für Schnittstellen zu KI-Modellen?"
    answer: "Im OpenAI-Universum dominieren GPT Actions auf Basis von OpenAPI 3.0. Plattformübergreifend etablierte sich das von Anthropic initiierte Model Context Protocol (MCP), das als universeller Standard für KI-Tools und Datenquellen dient."
---

Im Frühjahr 2023 glich die Stimmung in der Tech- und SEO-Welt einem Goldrausch. OpenAI hatte Plugins für ChatGPT vorgestellt, und fast jedes Marketing-Medium verkündete das Entstehen des nächsten gigantischen App Stores. Das Versprechen lautete: Wer eine unscheinbare Datei namens **`ai-plugin.json`** im Verzeichnis `.well-known` seines Servers platziert, katapultiert sein Unternehmen direkt in das operative Zentrum moderner generativer KI-Assistenten.

Heute zeigt sich die Realität ernüchternd: Das ursprüngliche Plugin-Ökosystem von OpenAI wurde im April 2024 endgültig beerdigt. Die Datei `ai-plugin.json` ist ein technologisches Relikt der ersten experimentellen KI-Welle. Warum dieses System so rasch kollabierte, welche Nachfolgetechnologien wie GPT Actions und das Model Context Protocol (MCP) heute den Ton angeben und worauf Unternehmen bei der [AI Search Engine](/glossar/ai-search-engine/) und moderner [Agent Readiness](/glossar/markdown-content-negotiation/) tatsächlich achten müssen, beleuchtet diese detaillierte Analyse.

## Anatomie und ursprünglicher Zweck der ai-plugin.json

Große Sprachmodelle (Large Language Models) besitzen ein fundamentales Architekturmerkmal: Sie verarbeiten und generieren Textmuster auf Basis historischer Trainingsdaten, können jedoch ohne externe Erweiterungen weder Live-Daten abrufen noch Aktionen in externen Systemen auslösen. Sie besitzen gewissermaßen keine eigenen Arme und Beine für das Internet.

OpenAI konzipierte das Plugin-System, um diese Barriere zu überwinden. Wenn ein Nutzer fragte: *"Suche mir die günstigsten Flüge von Berlin nach Mallorca und reserviere ein Hotelzimmer"*, sollte ChatGPT nicht bloß Textlinks ausgeben, sondern über REST-APIs direkt die Buchungssysteme von Partnern ansteuern.

Hierfür definierte OpenAI ein strenges Protokoll:
1. **Speicherort:** Auf dem Server des Dienstanbieters musste unter `https://deinedomain.de/.well-known/ai-plugin.json` eine statische Konfigurationsdatei bereitgestellt werden.
2. **Metadaten:** Die JSON-Struktur enthielt Bezeichnungen (`name_for_human`, `name_for_model`), Beschreibungen des Funktionsumfangs, Kontaktdaten sowie URLs zu Logo-Assets und Nutzungsbedingungen.
3. **API-Kopplung:** Über das Attribut `api.url` verwies das Manifest auf eine standardisierte OpenAPI-Spezifikation (YAML oder JSON), welche die konkreten Endpunkte, Parameter und Datenformate beschrieb.

### Beispiel eines historischen ai-plugin.json Manifests

Zur Veranschaulichung zeigt das folgende Listing den Aufbau eines typischen, heute veralteten Manifests für eine neutrale Beispiel-Domain:

```json
{
  "schema_version": "v1",
  "name_for_human": "Beispiel Flugsuche",
  "name_for_model": "flightSearchApp",
  "description_for_human": "Suche tagesaktuelle Flugverbindungen und Ticketpreise.",
  "description_for_model": "Plugin zur Abfrage von Flugverbindungen und Tarifen. Erfordert Abflugort, Zielort und Reisedatum.",
  "auth": {
    "type": "none"
  },
  "api": {
    "type": "openapi",
    "url": "https://deinedomain.de/openapi.yaml",
    "is_user_authenticated": false
  },
  "logo_url": "https://deinedomain.de/assets/plugin-logo.png",
  "contact_email": "kontakt@deinedomain.de",
  "legal_info_url": "https://deinedomain.de/impressum/"
}
```

Die Idee schien bestechend einfach, scheiterte in der Praxis jedoch an konzeptionellen Schwachstellen und der enormen Fragmentierung der KI-Landschaft.

## Warum das Konzept der ai-plugin.json scheiterte

Drei zentrale Faktoren besiegelten das Aus des ursprünglichen Plugin-Modells:

1. **Monopolistischer Silo-Ansatz:** Die Spezifikation war exklusiv auf ChatGPT zugeschnitten. Als Google mit Gemini, Anthropic mit Claude und Meta mit Open-Source-Lösungen in den Markt drängten, war kein Unternehmen bereit, für jeden KI-Bot separate proprietäre Manifeste und Middleware-Layer zu entwickeln und dauerhaft zu warten.
2. **Schlechte User Experience im Chatbot:** Nutzer mussten Plugins manuell suchen, im internen Store aktivieren und konnten pro Chat nur maximal drei Plugins parallel nutzen. Das Modell verfehlte häufig die richtige Zuordnung, rief falsche Endpunkte auf oder brach bei API-Timeouts komplett ab.
3. **Sicherheitsrisiken und Prompt Injections:** Drittanbieter-APIs, die ungefiltert Text an das Sprachmodell zurückgaben, öffneten Tür und Tor für Indirect Prompt Injections. Angreifer konnten über präparierte API-Antworten Anweisungen ins System einschleusen, um Tokens abzugreifen oder unerwünschte Aktionen auszulösen.

OpenAI zog im April 2024 die Reißleine, stellte den Plugin-Store ein und migrierte die Technologie vollständig auf Custom GPTs.

## Der moderne Technologiestack: GPT Actions vs. Model Context Protocol (MCP)

Unternehmen, die ihre Daten und Funktionen für moderne KI-Systeme verfügbar machen wollen, stehen heute vor einer grundlegend gewandelten Architekturlandschaft. Starre JSON-Dateien im `.well-known`-Verzeichnis wurden durch zwei Hauptsäulen ersetzt:

* **OpenAI GPT Actions:** Innerhalb des geschlossenen ChatGPT-Ökosystems laden Entwickler ihre OpenAPI-Spezifikationen direkt im Builder-Interface hoch. Die Authentifizierung (OAuth, API-Keys) wird sicher von der Plattform verwaltet, ohne dass öffentlich exponierte Manifeste notwendig sind.
* **Model Context Protocol (MCP):** Das von Anthropic entwickelte und von der gesamten Open-Source-Community sowie OpenAI adaptierte MCP fungiert als offener Schnittstellen-Standard. Ähnlich wie USB-C für Hardware-Geräte ermöglicht MCP die standardisierte Anbindung beliebiger Datenquellen und Tools an unterschiedlichste KI-Modelle.
* **Semantische Web-Standards:** Für das Auffinden redaktioneller Inhalte und strukturierter Daten setzen Webmaster auf Formate wie [llms.txt](/glossar/llms-txt/) sowie [llms-full.txt](/glossar/llms-full-txt/) und saubere [Entitäten](/glossar/entitaeten-building/).

### Technologische Evolution im direkten Vergleich

| Dimension | Historische ai-plugin.json (2023) | OpenAI GPT Actions (2024–2026) | Model Context Protocol / MCP (2025–2026) |
| :--- | :--- | :--- | :--- |
| **Status** | Veraltet / Eingestellt (April 2024) | Aktiv im OpenAI-Ökosystem | Moderner plattformweiter Industriestandard |
| **Architektur** | Statische Datei auf eigenem Server | Im ChatGPT Builder hinterlegte Schemas | Client-Server-Protokoll (JSON-RPC 2.0) |
| **Schnittstellenformat** | Starre Kopplung an OpenAPI 3.0 | Standardisierte OpenAPI 3.0 / 3.1 | Tools, Resources und Prompts via MCP |
| **Plattformunterstützung** | Ausschließlich ChatGPT-Plugins | Ausschließlich Custom GPTs | Claude, Cursor, ChatGPT, Gemini, Open-Source |
| **Sicherheitsmodell** | Exponiert im Web, hohes Risiko | Plattform-gestützte OAuth-Flows | Granulare Berechtigungen auf Tool-Ebene |
| **Wartungsaufwand** | Unverhältnismäßig hoch für Silo | Moderat für gezielte Use Cases | Gering durch universelle Wiederverwendbarkeit |

## Typische Praxisfehler bei KI-Schnittstellen

Wer in Unternehmen Schnittstellen für generative Systeme plant, stolpert häufig über klassische strategische Fehlentscheidungen:

### Fehler 1: Festhalten an toten Spezifikationen und veralteten Verzeichnissen
Manche Agenturen verkaufen ihren Kunden noch immer die Erstellung einer `ai-plugin.json` als zukunftsweisende Innovation. Entwicklungsbudgets fließen in veraltete Manifeste, die von keinem modernen Crawler mehr verarbeitet werden.

### Fehler 2: Verwechslung von Content-Bereitstellung und Funktionsaufrufen
Viele Webmaster glaubten fälschlicherweise, eine `ai-plugin.json` sei notwendig, um [in KI-Antworten erscheinen](/glossar/in-ki-antworten-erscheinen/) zu können. Dabei dienten Plugins rein dem Ausführen von Aktionen. Für reine Text- und Informationsabfragen sind semantisches HTML, [Technisches SEO](/glossar/technisches-seo/) und maschinenlesbare Textformate der einzig zielführende Weg.

### Fehler 3: Unzureichende API-Dokumentation und fehlende Fehlertoleranz
Große Sprachmodelle scheitern bei API-Aufrufen sofort, wenn Parameter-Beschreibungen in der OpenAPI-Spezifikation schwammig formuliert sind. Ohne präzise Datentypen, Beispielwerte und strikte Validierungsregeln erzeugen Modelle fehlerhafte Payloads, die zu Abbrüchen führen.

## Was tun mit bestehenden Plugin-Dateien auf dem Server?

Befindet sich auf deiner Website noch eine `ai-plugin.json`, musst du nicht in Panik verfallen. Das bloße Vorhandensein der Datei generiert keine SEO-Penalties und schadet dem Ranking nicht. Dennoch empfiehlt sich ein strukturierter Frühjahrsputz:

1. **Entwicklungsbudgets stoppen:** Keine weiteren Mittel in die Pflege dieses veralteten Formats investieren.
2. **Dateiprüfung:** Überprüfen, ob die dort verlinkte OpenAPI-Datei sensible interne API-Pfade öffentlich preisgibt. Ist dies der Fall, sollte die Datei entfernt werden.
3. **Moderne Alternativen etablieren:** Falls du Daten für KI-Agenten bereitstellen möchtest, implementiere eine schlanke `llms.txt`, setze auf saubere strukturierte Daten (Schema.org) und prüfe für echte API-Tools die Implementierung eines standardisierten MCP-Servers.

<div class="my-8 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
  <div class="flex items-center gap-3 mb-3">
    <span class="text-2xl">💡</span>
    <strong class="text-lg text-dark">Jörg Zimmer aus der SEO-Praxis:</strong>
  </div>
  <p class="text-gray-700 italic mb-2">
    "Die Geschichte der ai-plugin.json zeigt eindrucksvoll, wie schnell proprietäre Hypes in der KI-Welt verpuffen. Wer sich damals an OpenAI-Silos geklammert hat, verbrannte fünfstellige Budgets. Heute gewinnen offene Protokolle wie MCP und herkömmliche semantische Webstandards. Wer saubere APIs und solide strukturierte Daten pflegt, übersteht jeden Paradigmenwechsel unbeschadet."
  </p>
  <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="text-sm font-bold text-lime-700 hover:underline inline-block">
    [↗ Zur Diskussion auf LinkedIn]
  </a>
</div>

<div class="my-8 bg-lime-accent text-dark p-6 rounded-2xl text-center shadow-sm">
  <p class="font-bold text-xl mb-4">💬 Jetzt an der Diskussion teilnehmen!</p>
  <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="inline-block bg-dark text-white font-bold py-2 px-6 rounded-full hover:bg-gray-800 transition-colors">
    Beitrag auf LinkedIn öffnen
  </a>
</div>

