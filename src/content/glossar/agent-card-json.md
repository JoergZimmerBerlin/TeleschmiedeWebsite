---
category: 'AI SEO & Generative Search'
title: "agent-card.json: Der Ausweis für KI-Agenten"
meta_title: "agent-card.json: Ausweis für KI-Agenten (2026)"
description: "Wenn dein KI-Agent keine agent-card.json hat, existiert er für den B2B-Markt nicht. Jörg Zimmer zeigt dir das Setup für das A2A Protocol. (2026)"
meta_description: "Wenn dein KI-Agent keine agent-card.json hat, existiert er für den B2B-Markt nicht. Jörg Zimmer zeigt dir das Setup für das A2A Protocol. (2026)"
date: "2026-07-17"
image: "../../assets/images/glossar/3d-light/glossar-agent-card-json-3d.webp"
image_alt: "3D Infografik zur agent-card.json als maschinenlesbarer Personalausweis für KI-Agenten"
key_takeaways:
  - "Die agent-card.json ist das standardisierte Typenschild (Manifest) deines KI-Agenten."
  - "Sie ist ein essenzieller Bestandteil des A2A Protocols (v1.0.0) unter der Linux Foundation."
  - "Ohne sie können fremde Agenten nicht autonom mit deinem System interagieren."
faqs:
  - question: "Wofür genau braucht mein KI-Agent diese JSON-Datei?"
    answer: "Stell dir vor, du gehst auf eine fremde Messe ohne Namensschild und ohne Visitenkarte. Niemand weiß, wer du bist, was du anbietest oder wie man dich kontaktiert. Die `agent-card.json` ist die digitale, maschinenlesbare Visitenkarte deines Agenten. Fremde KIs scannen sie, um herauszufinden, über welche Endpunkte und mit welcher Autorisierung sie Aufgaben an dich delegieren können."
  - question: "Wo muss diese Datei auf meinem Server liegen?"
    answer: "Es gibt dafür einen knallharten, genormten Pfad. Die Datei MUSS zwingend im öffentlichen `.well-known` Verzeichnis im Root deiner Domain liegen (also z.B. `https://deinedomain.de/.well-known/agent-card.json`). Wenn sie woanders liegt, wird sie beim A2A Discovery Process schlichtweg ignoriert."
  - question: "Was ist der Unterschied zwischen der agent-card.json und der llms.txt?"
    answer: "Die `llms.txt` liefert einer anklopfenden KI *Inhalte* und *Wissen* über deine Seite (Content). Die `agent-card.json` liefert *Infrastruktur-Metadaten* und *Zugriffsrechte* (Protocol). Wenn die KI nur lesen will, reicht die `llms.txt`. Wenn die KI aber eine Aktion ausführen will (z.B. einen B2B-Termin buchen), MUSS sie die `agent-card.json` parsen."
  - question: "Wie verhält sich das zur Model Context Protocol (MCP) Spezifikation?"
    answer: "Die Agent Card deklariert dein Protokoll-Set. Du definierst darin, dass du das A2A Protocol v1.0.0 sprichst, kannst aber gleichzeitig in der Karte auflisten, welche deiner internen Tools über zustandsloses MCP (Stateless MCP) erreichbar sind. Es ist das Inhaltsverzeichnis deiner Agentic-Infrastruktur."
  - question: "Ist die Datei sicherheitskritisch? Darf die jeder lesen?"
    answer: "Die `agent-card.json` selbst ist rein deklarativ und MUSS für alle KIs offen im Netz liegen. Sensible Dinge stehen dort nicht drin. Stattdessen verweist die Karte unter dem Punkt 'Security' auf eine separate Policy-Datei (meist die `auth.md`), in der die harten kryptografischen Sicherheitsvorgaben (wie ID-JAGs) geregelt werden."
---

Wir schreiben das Jahr 2026. Das Internet ist nicht mehr nur ein bunter Katalog für Menschen, sondern ein hochkomplexes, verhandlungsstarkes Ökosystem für autonome Software-Agenten. Wenn wir heute über Lead-Generierung, E-Commerce-Transaktionen oder automatisierte Lieferketten sprechen, sprechen wir nicht mehr darüber, wie ein Mensch ein PDF herunterlädt. Wir sprechen darüber, wie der Einkaufs-Agent deines Kunden vollautonom mit deinem Sales-Agenten kommuniziert.

Das Problem dabei: Woher weiß der Agent deines Kunden überhaupt, dass dein Agent existiert? Und vor allem: Woher weiß er, welche "Sprache" dein Agent spricht, welche Aufgaben er ausführen kann und wo genau der digitale Briefkasten auf deinem Server hängt?

Die Antwort ist simpel, brutal effektiv und absolut standardisiert: Die **`agent-card.json`**. 

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
    „Wer im Jahr 2026 noch glaubt, dass ein Kontaktformular für den B2B-Vertrieb reicht, hat den Schuss nicht gehört. Wenn autonome Einkaufs-Agenten von Großkonzernen das Web nach Dienstleistern scannen und deine Domain keine maschinenlesbare agent-card.json im .well-known-Verzeichnis ausliefert, dreht der Agent sofort wieder um. Ohne Protokoll-Standard bist du für die B2B-Agentenökonomie schlicht unsichtbar.“
  </blockquote>
  <figcaption class="mt-4 pt-3 border-t border-neutral-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
    <span>Experten-Zitat • <cite class="not-italic font-semibold text-neutral-700">Jörg Zimmer</cite></span>
    <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="font-bold text-lime-700 hover:underline inline-flex items-center gap-1">
      Jörg Zimmer auf LinkedIn folgen →
    </a>
  </figcaption>
</figure>

---

Sie ist das Typenschild, der Personalausweis und das Manifest deines KI-Systems. Wer dieses kleine Stück JSON-Code im Sommer 2026 ignoriert, schließt sein Unternehmen faktisch vom lukrativsten B2B-Markt des Jahrzehnts aus. Lass uns Tacheles reden.

## Der Engine-Raum der Agent-to-Agent Kommunikation

Um die Tragweite der `agent-card.json` zu begreifen, müssen wir uns kurz den Kontext ansehen. Seit März 2026 dominiert das [A2A Protocol (Agent-to-Agent Protocol)](/glossar/a2a-protocol/) in der Version v1.0.0 den Markt. Gesteuert durch die Linux Foundation, ist es der absolute Standard für die horizontale Kommunikation zwischen autonomen KIs.

Wenn das A2A Protocol die Autobahn ist, dann ist die `agent-card.json` das riesige, grell leuchtende Hinweisschild an der Ausfahrt. 

Der Prozess – in der Fachsprache "A2A Discovery Flow" genannt – läuft exakt so ab:
1. Ein fremder KI-Agent (z.B. von einem großen DAX-Konzern, der nach Dienstleistern sucht) pingt deine Domain an.
2. Der Agent sucht nicht nach einer schönen Startseite. Er steuert blind und zielsicher auf den Pfad `https://deinedomain.de/.well-known/agent-card.json` zu.
3. Findet er diese Datei, parst er sie in wenigen Millisekunden. Er weiß sofort, wer dein Agent ist, was er kann und wie er sich authentifizieren muss, um einen Deal abzuschließen.
4. Findet er die Datei NICHT, bricht er den Prozess sofort ab. Für ihn bist du nicht "Agent Ready". Er zieht weiter zur Konkurrenz.

Du hast in diesem Szenario keine zweite Chance. Es gibt keinen menschlichen Einkäufer, den du mit einem netten Telefonat zurückholen kannst. Die Maschine entscheidet knallhart nach Protokoll-Konformität.

## Anatomie eines Personalausweises: Was steht da drin?

Die Spezifikation der `agent-card.json` ist durch die `a2a-protocol.org` strikt geregelt. Es ist kein Platz für kreatives Marketing-Sprech. Es ist reine, maschinenlesbare Semantik. 

Ein sauberes Manifest besteht typischerweise aus elementaren Blöcken:

1. **Protocol & Identity:** Die KI muss wissen, ob sie es mit einem Legacy-System oder modernstem Code zu tun hat. Der Name deines Agenten, dein Unternehmen (Provider) und die A2A Version.
2. **Endpoints (Service):** Der wichtigste technische Teil. Wo genau nimmt dein Agent Anfragen entgegen? Das Routing muss hier präzise definiert sein.
3. **Capabilities & Skills:** Welche Features unterstützt dein Agent? Welche Aufgaben (Skills) kann er übernehmen? (z.B. Streaming, Push Notifications, SEO-Audits).
4. **Security:** Autonome Maschinen buchen Budgets und schließen Verträge. Sicherheit ist das A und O. Die Karte verweist hier meist auf eine externe `auth.md`, um komplexe Flows wie "Agent Verified" (via Identity Assertion JWT / ID-JAG) zu regeln.

## Praxisbeispiel: Wie ich das löse

Theorie ist schön und gut, aber lass uns einen Blick in den Maschinenraum werfen. Auf teleschmie.de optimiere ich meine eigene Infrastruktur genauso hart wie die meiner Kunden. Ich betreibe eine vollständige [Agent Readiness](/glossar/agent-readiness-level/) (Level 5 auf dem Cloudflare Radar).

Meine Live-Datei liegt genau dort, wo sie liegen muss. Wenn du wissen willst, wie so etwas in freier Wildbahn aussieht, rufe sie dir einfach auf: `https://teleschmie.de/.well-known/agent-card.json`.

Das ist kein Geheimnis, das ist pure Transparenz für das KI-Ökosystem. Ein Ausschnitt meiner Konfiguration zeigt, wie kompakt und präzise die Informationen geliefert werden:

```json
{
  "$schema": "https://a2a-protocol.org/schemas/v1.0/agent-card.json",
  "a2a_version": "1.0.0",
  "identity": {
    "name": "Service Agent",
    "provider": "Jörg Zimmer",
    "description": "Autonomer Agent für SEO-Audits und Agent Readiness Beratung"
  },
  "endpoints": {
    "service": "https://teleschmie.de/api/a2a/task",
    "discovery": "https://teleschmie.de/.well-known/api-catalog"
  },
  "supportedInterfaces": ["mcp-stateless-v2"],
  "skills": ["seo-analysis", "agent-readiness-audit"],
  "security": {
    "auth_required": true,
    "auth_policy": "https://teleschmie.de/auth.md"
  }
}
```

Jedes fremde KI-System, das auf meine Domain trifft, weiß durch diese simplen Codezeilen sofort, dass es mit einem hochprofessionellen, protokolltreu agierenden Partner zu tun hat. Das schafft "Machine Trust" – das maschinelle Vertrauen, das die Basis für jedes zukünftige Geschäft ist.

<div class="my-8 bg-lime-accent/15 rounded-2xl border border-lime-accent/30 p-6 shadow-sm not-prose">
  <div class="flex items-center justify-between gap-2 mb-3">
    <div class="flex items-center gap-3">
      <span class="text-lime-700 text-2xl">💡</span>
      <h4 class="font-bold text-lg text-dark mb-0">Jörgs Praxistipp aus der SEO-Sprechstunde</h4>
    </div>
    <span class="text-xs bg-lime-accent/30 text-dark px-2.5 py-1 rounded-full font-mono font-bold">30-Sekunden Inhaber-Check</span>
  </div>
  <p class="text-neutral-700 text-sm leading-relaxed mb-4">
    Viele Website-Inhaber glauben, Agent Readiness sei ein Zukunftsthema für 2030. Falsch gedacht! Wenn Enterprise-Unternehmen ihre Procurement-KIs losschicken, um Vorqualifizierungen durchzuführen, prüfen diese Systeme zuerst standardisierte Protokolle. Wenn deine Webagentur die <code>agent-card.json</code> zwar hochgeladen hat, aber die CORS-Header vergisst oder die Datei hinter einer Weiterleitung versteckt, scheitert der automatisierte Abruf mit einem kryptischen Netzwerkfehler.
  </p>
  <div class="bg-white/80 p-4 rounded-xl border border-lime-accent/30 text-xs text-neutral-800 space-y-2">
    <p class="font-bold text-dark mb-1">🔍 Dein 30-Sekunden-Check im Browser (ohne Programmierkenntnisse):</p>
    <p class="mb-1">1. Rufe deine Domain im Browser auf und hänge <code>/.well-known/agent-card.json</code> an die URL (z. B. <code>deinedomain.de/.well-known/agent-card.json</code>).</p>
    <p class="mb-1">2. Erhältst du ein valides JSON-Dokument oder leitet dein Server auf eine 404-Fehlerseite oder die Homepage weiter?</p>
    <p class="mb-0">3. <strong>Deine Kontrollfrage an die Webagentur:</strong> <em>„Entspricht unsere <code>agent-card.json</code> exakt dem A2A Protocol Schema v1.0 mit definierten supportedInterfaces, capabilities und skills, und sind die CORS-Header für externe Bots freigeschaltet?“</em></p>
  </div>
</div>

## Vermeide diese fatalen Fehler

Bei der Implementierung bei meinen Kunden sehe ich oft die gleichen handwerklichen Fehler, die dazu führen, dass der gesamte A2A-Flow zusammenbricht:

**Fehler 1: Der falsche Speicherort**
Die Datei MUSS im Verzeichnis `/.well-known/agent-card.json` liegen. Punkt. Nicht im Root als `agent.json`, nicht im `/assets/` Ordner und schon gar nicht hinter einem Passwortschutz. Wenn das `.well-known` Verzeichnis durch deinen Provider (Stichwort: IONOS) blockiert wird, musst du über das Skript `activate_htaccess.php` deine Regeln aktualisieren.

**Fehler 2: CORS Header vergessen**
Ein fremder Agent im Browser-Kontext will deine Datei per JavaScript abrufen. Wenn dein Webserver die Header nicht auf `Access-Control-Allow-Origin: *` für diesen speziellen Ordner setzt, scheitert der Abruf am CORS-Fehler. Das ist Anfänger-Pfusch.

**Fehler 3: Das Manifest als Marketing-Fläche missbrauchen**
Die `agent-card.json` ist keine Werbebroschüre. Packe keine 500 Wörter SEO-Texte in das Feld "description". Maschinen belohnen Präzision, nicht Geschwafel.

## Der Selbsttest: Ist deine Domain A2A-Ready?

Du musst mir nicht glauben. Du kannst die Agent Readiness deiner eigenen Website in exakt 30 Sekunden selbst überprüfen. Schnapp dir dein bevorzugtes KI-Tool und lass ihn die harte Arbeit machen. 

Dieser Test zeigt dir schonungslos, wie blind deine Infrastruktur für den B2B-Markt von morgen ist, wenn du das Thema ignorierst.

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
    Kopiere diesen Prompt in deinen KI-Coding-Assistenten, um einen vollständigen A2A Discovery Audit und die Validierung deiner agent-card.json durchzuführen:
  </p>
  <div class="bg-black/60 p-4 rounded-xl border border-white/10 text-xs font-mono text-gray-200 overflow-x-auto space-y-2">
    <p class="text-lime-accent font-bold mb-1"># Prompt: A2A Protocol Discovery & agent-card.json Audit</p>
    <p><strong>Rolle:</strong> Du bist ein erfahrener AI Agent Architect & Protocol Compliance Engineer.</p>
    <p><strong>Aufgabe:</strong> Überprüfe das Vorhandensein und die Konformität der <code>/.well-known/agent-card.json</code> nach den Standards des A2A Protocol v1.0.0 der Linux Foundation.</p>
    <p><strong>Anforderungen:</strong></p>
    <ul class="list-disc pl-4 space-y-1 text-gray-300">
      <li>Validiere die Datei gegen das offizielle Schema von <code>https://a2a-protocol.org/schemas/v1.0/agent-card.json</code>.</li>
      <li>Prüfe, ob die Pflichtfelder <code>supportedInterfaces</code>, <code>capabilities</code> und <code>skills</code> deklariert sind.</li>
      <li>Verifiziere, dass Server-Header <code>Access-Control-Allow-Origin: *</code> für den <code>.well-known</code>-Pfad gesetzt sind.</li>
      <li>Stelle sicher, dass referenzierte Endpunkte (z. B. <code>auth.md</code> oder API-Routen) erreichbar sind und interne Links auf Trailing Slashes (/) enden.</li>
    </ul>
    <p class="pt-1"><strong>Output:</strong> Liefere das validierte JSON-Manifest inklusive Server-Konfigurationsschnipsel für CORS.</p>
  </div>
</div>

Es ist Zeit aufzuwachen. Wer heute noch Webseiten ausschließlich für den Chrome-Browser baut, hat den Paradigmenwechsel verschlafen. Mach deine Domain fit für die Agenten-Ökonomie.

<div class="my-10 bg-dark text-white p-8 rounded-3xl border border-white/10 text-center shadow-md not-prose">
  <span class="text-xs uppercase tracking-widest text-lime-accent font-mono font-bold mb-3 block">
    Aus Jörgs LinkedIn-Feed
  </span>
  <blockquote class="text-base md:text-lg text-gray-200 italic max-w-2xl mx-auto mb-4 border-none font-normal">
    „Halte das Team auf dem neuesten Stand der SEO-Trends und -Best Practices. Fortlaufende Schulungen sind wichtig, um mit den sich ändernden Algorithmen Schritt zu halten.“
  </blockquote>
  <p class="text-gray-300 text-sm max-w-xl mx-auto mb-6">
    Diskutiere mit Jörg Zimmer und der SEO-Community auf LinkedIn über diesen Beitrag.
  </p>
  <a href="https://www.linkedin.com/feed/update/urn:li:activity:7099038863783784448" target="_blank" rel="noopener noreferrer" class="btn-primary">
    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    <span>Beitrag auf LinkedIn öffnen</span>
    <span aria-hidden="true">→</span>
  </a>
</div>

### Verwandte Glossar-Begriffe
* [A2A Protocol im Detail](/glossar/a2a-protocol/)
* [Agent Readiness Level erklärt](/glossar/agent-readiness-level/)
* [auth.md für KI-Agenten](/glossar/auth-md/)
* [llms.txt: Maschinenlesbares Web-Inhaltsverzeichnis](/glossar/llms-txt/)
* [Generative Engine Optimization (GEO)](/glossar/geo-optimierung/)
* [Markdown Content Negotiation](/glossar/markdown-content-negotiation/)

