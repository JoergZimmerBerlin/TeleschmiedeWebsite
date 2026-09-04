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

Heute zeigt sich die Realität ernüchternd: Das ursprüngliche Plugin-Ökosystem von OpenAI wurde im April 2024 endgültig beerdigt. Die Datei `ai-plugin.json` ist ein technologisches Relikt der ersten experimentellen KI-Welle. Warum dieses proprietäre System so rasch kollabierte, welche Nachfolgetechnologien wie GPT Actions, das [Model Context Protocol (MCP)](/glossar/model-context-protocol-mcp/) und moderne Agent Plugins heute den Ton angeben und worauf Unternehmen bei der [AI Search Engine](/glossar/ai-search-engine/) sowie ganzheitlicher [Agent Readiness](/glossar/agent-readiness/) tatsächlich achten müssen, beleuchtet diese detaillierte Analyse.

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

Die Idee schien bestechend einfach, scheiterte in der Praxis jedoch an fundamentalen konzeptionellen Schwachstellen und der enormen Fragmentierung der KI-Landschaft.

## Warum das Konzept der ai-plugin.json scheiterte

Drei zentrale Faktoren besiegelten das Aus des ursprünglichen Plugin-Modells:

1. **Monopolistischer Silo-Ansatz:** Die Spezifikation war exklusiv auf ChatGPT zugeschnitten. Als Google mit Gemini, Anthropic mit Claude und Meta mit Open-Source-Lösungen in den Markt drängten, war kein Unternehmen bereit, für jeden KI-Bot separate proprietäre Manifeste und Middleware-Layer zu entwickeln und dauerhaft zu warten.
2. **Schlechte User Experience im Chatbot:** Nutzer mussten Plugins manuell suchen, im internen Store aktivieren und konnten pro Chat nur maximal drei Plugins parallel nutzen. Das Modell verfehlte häufig die richtige Zuordnung, rief falsche Endpunkte auf oder brach bei API-Timeouts komplett ab.
3. **Sicherheitsrisiken und Prompt Injections:** Drittanbieter-APIs, die ungefiltert Text an das Sprachmodell zurückgaben, öffneten Tür und Tor für Indirect Prompt Injections. Angreifer konnten über präparierte API-Antworten Anweisungen ins System einschleusen, um Tokens abzugreifen oder unerwünschte Aktionen auszulösen.

OpenAI zog im April 2024 die Reißleine, stellte den Plugin-Store ein und migrierte die Technologie im ersten Schritt auf Custom GPTs mit GPT Actions.

## Der moderne Technologiestack: GPT Actions vs. Model Context Protocol (MCP)

Unternehmen, die ihre Daten und Funktionen für moderne KI-Systeme verfügbar machen wollen, stehen heute vor einer grundlegend gewandelten Architekturlandschaft. Starre JSON-Dateien im `.well-known`-Verzeichnis wurden durch offene, standardisierte Säulen ersetzt:

* **OpenAI GPT Actions:** Innerhalb des ChatGPT-Ökosystems laden Entwickler ihre OpenAPI-Spezifikationen direkt im Builder-Interface hoch. Die Authentifizierung (OAuth, API-Keys) wird sicher von der Plattform verwaltet, ohne dass öffentlich exponierte Manifeste notwendig sind.
* **Model Context Protocol (MCP):** Das von Anthropic entwickelte und von der gesamten Open-Source-Community, OpenAI, Google und Microsoft adaptierte [Model Context Protocol (MCP)](/glossar/model-context-protocol-mcp/) fungiert als offener Schnittstellen-Standard. Unter der Schirmherrschaft der Agentic AI Foundation (AAIF) und Linux Foundation etablierte sich MCP als universeller Kommunikationskanal für Tools, Prompts und Datenquellen.
* **Agent Plugins (Spezifikation 2026):** Als Weiterentwicklung modularer Agenten bündeln moderne Agent Plugins portable Pakete aus MCP-Servern, Skills und Workflows, statt einzelne isolierte Endpunkte anzubieten.
* **Semantische Web-Standards & Content Negotiation:** Für das Auffinden redaktioneller Inhalte und strukturierter Daten setzen Webmaster auf [Markdown Content Negotiation](/glossar/markdown-content-negotiation/), Formate wie [llms.txt](/glossar/llms-txt/) sowie [llms-full.txt](/glossar/llms-full-txt/) und saubere [Entitäten](/glossar/entitaeten-building/).
* **Agent-to-Agent Kommunikation:** Mit dem offenen [A2A-Protokoll](/glossar/a2a-protocol/) und der [Agent Card JSON](/glossar/agent-card-json/) verhandeln autonome Agenten heute ihre Fähigkeiten dezentral und plattformübergreifend.

### Technologische Evolution im direkten Vergleich

| Dimension | Historische ai-plugin.json (2023) | OpenAI GPT Actions (2024–2026) | Model Context Protocol / MCP (2025–2026) |
| :--- | :--- | :--- | :--- |
| **Status** | Veraltet / Eingestellt (April 2024) | Aktiv im OpenAI-Ökosystem | Moderner plattformweiter Industriestandard |
| **Architektur** | Statische Datei auf eigenem Server | Im ChatGPT Builder hinterlegte Schemas | Client-Server-Protokoll (JSON-RPC 2.0 / Stateless HTTP) |
| **Schnittstellenformat** | Starre Kopplung an OpenAPI 3.0 | Standardisierte OpenAPI 3.0 / 3.1 | Tools, Resources und Prompts via MCP |
| **Plattformunterstützung** | Ausschließlich ChatGPT-Plugins | Ausschließlich Custom GPTs | Claude, Cursor, ChatGPT, Gemini, Antigravity |
| **Sicherheitsmodell** | Exponiert im Web, hohes Risiko | Plattform-gestützte OAuth-Flows | Granulare Berechtigungen auf Tool- und Scope-Ebene |
| **Wartungsaufwand** | Unverhältnismäßig hoch für Silo | Moderat für gezielte Use Cases | Gering durch universelle Wiederverwendbarkeit |

## Typische Praxisfehler bei KI-Schnittstellen

Wer in Unternehmen Schnittstellen für generative Systeme plant, stolpert häufig über klassische strategische Fehlentscheidungen:

### Fehler 1: Festhalten an toten Spezifikationen und veralteten Verzeichnissen
Manche Agenturen verkaufen ihren Kunden noch immer die Erstellung einer `ai-plugin.json` als zukunftsweisende Innovation. Entwicklungsbudgets fließen in veraltete Manifeste, die von keinem modernen Crawler mehr verarbeitet werden.

### Fehler 2: Verwechslung von Content-Bereitstellung und Funktionsaufrufen
Viele Webmaster glaubten fälschlicherweise, eine `ai-plugin.json` sei notwendig, um [in KI-Antworten erscheinen](/glossar/in-ki-antworten-erscheinen/) zu können. Dabei dienten Plugins rein dem Ausführen von Aktionen. Für reine Text- und Informationsabfragen sind semantisches HTML, [Technisches SEO](/glossar/technisches-seo/) und maschinenlesbare Textformate der einzig zielführende Weg.

### Fehler 3: Unzureichende API-Dokumentation und fehlende Fehlertoleranz
Große Sprachmodelle scheitern bei API-Aufrufen sofort, wenn Parameter-Beschreibungen in der OpenAPI-Spezifikation schwammig formuliert sind. Ohne präzise Datentypen, Beispielwerte und strikte Validierungsregeln erzeugen Modelle fehlerhafte Payloads, die zu Abbrüchen führen.

### Fehler 4: Sicherheitslücken durch verwaiste OpenAPI-Dateien
Oft bleibt die `ai-plugin.json` zwar gelöscht, aber die darunter referenzierte `openapi.yaml` liegt weiterhin ungeschützt auf dem Webserver. Automatisierte Bots scannen solche Dateien gezielt ab, um interne Pfade, geheime Parameter und ungesicherte API-Gateways zu identifizieren.

## Was tun mit bestehenden Plugin-Dateien auf dem Server?

Befindet sich auf deiner Website noch eine `ai-plugin.json`, musst du nicht in Panik verfallen. Das bloße Vorhandensein der Datei generiert keine direkten Google-Penalties. Dennoch empfiehlt sich ein strukturierter Frühjahrsputz:

1. **Entwicklungsbudgets stoppen:** Keine weiteren Mittel in die Pflege dieses veralteten Formats investieren.
2. **Dateiprüfung:** Überprüfen, ob die dort verlinkte OpenAPI-Datei sensible interne API-Pfade öffentlich preisgibt. Ist dies der Fall, sollte die Datei sofort entfernt oder per Server-Konfiguration gesperrt werden.
3. **Moderne Alternativen etablieren:** Falls du Daten für KI-Agenten bereitstellen möchtest, implementiere eine schlanke `llms.txt`, setze auf saubere strukturierte Daten (Schema.org) und prüfe für echte API-Tools die Implementierung eines standardisierten MCP-Servers mit zustandslosem HTTP-Transport.

<figure class="my-10 bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
  <img src="/assets/images/profile/joerg-zimmer-portrait.webp" alt="Jörg Zimmer" class="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-lime-accent flex-shrink-0" />
  <div>
    <blockquote class="text-base md:text-lg text-dark leading-relaxed italic mb-4">
      "Die Geschichte der ai-plugin.json zeigt eindrucksvoll, wie schnell proprietäre Hypes in der KI-Welt verpuffen. Wer sich 2023 an OpenAI-Silos geklammert hat, verbrannte fünfstellige Budgets. Heute gewinnen offene Protokolle wie MCP, das A2A-Protokoll und semantische Webstandards. Wer saubere Schnittstellen und solide strukturierte Daten pflegt, übersteht jeden Paradigmenwechsel unbeschadet."
    </blockquote>
    <figcaption class="text-sm font-bold text-gray-500 not-italic">
      Jörg Zimmer, <cite class="font-normal text-gray-400">SEO- & AEO-Experte für KI-Sichtbarkeit</cite>
    </figcaption>
  </div>
</figure>

<div class="my-8 p-6 bg-lime-accent/15 rounded-2xl border border-lime-accent/30 shadow-sm not-prose">
  <div class="flex items-center gap-2 mb-3">
    <span class="bg-lime-accent text-dark font-black text-xs px-3 py-1 rounded-full uppercase tracking-wide">30-Sekunden Inhaber-Check</span>
    <strong class="text-lg text-dark">Jörgs Praxistipp aus der SEO-Sprechstunde</strong>
  </div>
  <p class="text-dark/90 text-sm leading-relaxed mb-4">
    Prüfe per Browser-Aufruf sofort, ob unter <code>/.well-known/ai-plugin.json</code> auf deiner Domain noch eine Datei liegt. Wenn ja, öffne sie: Verweist das Feld <code>url</code> auf eine interne OpenAPI-Datei, die vertrauliche Backend-Routen, interne Parameter oder undokumentierte Test-Endpunkte offenlegt? Solche verwaisten Manifeste sind ein gefundenes Fressen für automatisierte Schwachstellen-Scanner und Sicherheitsanalysen.
  </p>
  <div class="bg-white/80 rounded-xl p-4 border border-lime-accent/40">
    <p class="text-xs font-bold text-dark/70 uppercase tracking-wider mb-1">Kontrollfrage für deine Webagentur oder dein Inhouse-Team:</p>
    <p class="text-sm font-semibold text-dark italic">
      "Haben wir noch verwaiste Manifeste wie eine ai-plugin.json oder ungesicherte openapi.yaml im /.well-known/-Verzeichnis liegen, und setzen wir für moderne Agenten-Schnittstellen bereits auf offene Standards wie das Model Context Protocol (MCP) statt auf veraltete Silos?"
    </p>
  </div>
</div>

<div class="my-8 bg-dark text-white p-6 rounded-2xl border-l-4 border-lime-accent shadow-md not-prose">
  <div class="flex items-center gap-2 mb-4">
    <span class="bg-lime-accent text-dark font-black text-xs px-3 py-1 rounded-full uppercase tracking-wide">Copy & Paste Task</span>
    <strong class="text-white text-lg">Agent Readiness & MCP Prompt für Cursor, Claude Code oder Antigravity</strong>
  </div>
  <p class="text-gray-300 text-sm mb-4">
    Kopiere diesen Prompt in deinen bevorzugten Coding-Agenten, um veraltete Plugin-Dateien zu bereinigen und deine Website auf den modernen MCP- und Agent-Readiness-Standard vorzubereiten:
  </p>
  <div class="bg-black/50 p-4 rounded-xl font-mono text-xs text-lime-accent overflow-x-auto border border-white/10 leading-relaxed">
    <p class="text-gray-400 mb-2"># Rolle: AI Systems Architect & Security Engineer</p>
    <p class="text-white font-semibold mb-2">Task: Bereinige veraltete ChatGPT-Plugin-Manifeste und erstelle eine Roadmap für MCP- und Agent-Readiness (Cloudflare Radar Level 5).</p>
    <p class="text-gray-300 mb-1">Anforderungen:</p>
    <p class="text-gray-300">1. Prüfe das Verzeichnis <code>public/.well-known/</code> auf Vorhandensein einer <code>ai-plugin.json</code> oder exponierter <code>openapi.yaml/json</code>-Dateien.</p>
    <p class="text-gray-300">2. Entferne verwaiste Plugin-Dateien oder sichere sensible API-Definitionen gegen unbefugten Direktzugriff ab.</p>
    <p class="text-gray-300">3. Erstelle stattdessen eine standardkonforme <code>agent-card.json</code> nach a2a-protocol.org v1.0 sowie eine <code>llms.txt</code> für Content-Discovery.</p>
    <p class="text-gray-300">4. Falls funktionale API-Tools für KI-Agenten exponiert werden sollen: Implementiere einen standardisierten Model Context Protocol (MCP) Server mit stateless HTTP Transport (Spezifikation 2026).</p>
    <p class="text-lime-accent mt-2">Output: Audit-Bericht der bereinigten Dateien plus Validierung der Agent-Card-Struktur im Terminal.</p>
  </div>
</div>

<div class="my-8 bg-dark text-white p-8 rounded-3xl border border-white/10 text-center shadow-md">
  <p class="font-bold text-xl mb-4">Jetzt an der Diskussion teilnehmen!</p>
  <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="btn-primary inline-flex items-center gap-2">
    Beitrag auf LinkedIn öffnen
    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
    </svg>
  </a>
</div>

