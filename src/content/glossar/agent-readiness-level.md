---
category: "AI SEO & Generative Search"
title: "Agent Readiness Level: Stufe 5 für autonome KIs"
description: "Cloudflares isitagentready.com deckt es auf: Die meisten Websites hängen auf Level 0 fest. Jörg Zimmer zeigt den Weg zum Agent Readiness Level 5."
date: "2026-07-17"
image: "../../assets/images/glossar/3d-light/glossar-agent-readiness-level-3d.webp"
image_alt: "3D Infografik zum Cloudflare Agent Readiness Level für Websites"
key_takeaways:
  - "Das Agent Readiness Level (0-5) ist die neue Metrik, die klassisches SEO im B2B-Sektor ablöst."
  - "Level 5 erfordert volle Autonomie: A2A-Kompatibilität, auth.md und OAuth-geschützte Metadaten."
  - "Wer heute nicht auf KI-Sichtbarkeit optimiert, verliert morgen seine wichtigsten Leads."
faqs:
  - question: "Was ist das Agent Readiness Level genau?"
    answer: "Es ist ein Branchenstandard und eine diagnostische Metrik (z.B. von Cloudflare im April 2026 als *isitagentready.com* gelauncht), die misst, wie gut eine Website darauf vorbereitet ist, von KI-Agenten maschinenlesbar verstanden und vollautonom bedient zu werden. Es geht nicht um bunte Bilder, sondern um harte, semantische Schnittstellen."
  - question: "Reicht es nicht, wenn meine Website ein gutes Google-Ranking hat?"
    answer: "Nein. Ein hohes Ranking bei Google hilft Menschen, dich zu finden. Aber im Jahr 2026 delegieren B2B-Entscheider die Suche an autonome Agenten. Diese Agenten klicken nicht auf Google-Links. Sie scrapen APIs, werten `agent-card.json` Dateien aus und prüfen `llms.txt` Dateien. Wenn du dort unsichtbar bist, nutzt dir Platz 1 bei Google absolut gar nichts."
  - question: "Welche Dateien brauche ich, um Level 5 zu erreichen?"
    answer: "Du benötigst ein sauberes Setup im `.well-known` Verzeichnis. Das Rückgrat bilden die `ai.txt` (für Crawling-Regeln), die `llms.txt` (für Answer Engines), sowie die `agent-card.json` und die `auth.md` (für die A2A-Kommunikation und autonome Authentifizierung). Außerdem müssen deine internen Tools via stateless MCP angebunden sein."
  - question: "Ist Level 5 für einen kleinen B2B-Dienstleister überhaupt machbar?"
    answer: "Absolut! Level 5 erfordert kein millionenschweres IT-Budget. Es erfordert lediglich sauberes, technisches Verständnis moderner Web-Standards. Oft reicht es schon, statische JSON- und Markdown-Dateien im Root-Verzeichnis abzulegen und serverseitig Content Negotiation (Markdown) zu aktivieren, um 95% der Konkurrenz abzuhängen."
  - question: "Wie kann ich mein eigenes Level heute testen?"
    answer: "Du kannst offizielle Diagnose-Tools wie das Cloudflare Radar (URL Scanner) nutzen, oder du nutzt einfach deinen eigenen KI-Assistenten. Wenn du einem Agenten den Befehl gibst, deine Agent Readiness zu prüfen, wird er die fehlenden Standard-Dateien schonungslos aufdecken."
---

Moin! 🌻

Die SEO-Branche der letzten zwanzig Jahre war ein ziemlich durchschaubares Spiel: Du baust eine Website, optimierst die H1-Überschriften, jagst die Ladezeiten (Core Web Vitals) in den grünen Bereich, kaufst dir ein paar Backlinks und hoffst, dass Google dich auf Seite 1 platziert, damit ein Mensch auf dein Suchergebnis klickt.

Dieses Spiel ist vorbei. Wer im Sommer 2026 noch Webseiten primär für Menschen optimiert, betreibt aktive Unternehmensgefährdung. 

Wir befinden uns in der Ära der Answer Engines (AEO) und der autonomen Agent-to-Agent (A2A) Kommunikation. Einkäufer und CTOs googeln nicht mehr stundenlang nach Dienstleistern. Sie beauftragen ihren KI-Agenten, den Markt zu scannen, die Daten auszuwerten und direkt die besten drei Anbieter zu kontaktieren. Und genau hier greift eine neue, brutale Metrik, die entscheidet, ob du den Deal bekommst oder unsichtbar bleibst: Das **Agent Readiness Level**.

Im April 2026 hat Cloudflare mit dem Tool *isitagentready.com* die Bombe platzen lassen und einen knallharten Branchenstandard definiert. Die Skala reicht von Level 0 bis Level 5. Wer auf Level 0 herumdümpelt, ist faktisch von der digitalen Zukunft abgeschnitten. Lass uns Tacheles reden und schauen, wo du wirklich stehst.

## Die harte Wahrheit: Die 6 Stufen der Agent Readiness

Das Agent Readiness Level bewertet nicht, wie schön dein CSS-Framework ist oder ob dein Firmenvideo tolle Drohnenaufnahmen hat. Es bewertet einzig und allein die maschinenlesbare Infrastruktur für KI-Bots.

Der "Digitale Senior" weiß: Man muss ein Haus auf einem soliden Fundament bauen. Lass uns die Stufen von 0 bis 5 durchgehen.

### Level 0: Der blinde Fleck (Not Ready)
Du hast keine einzige Agent-Discovery-Datei auf dem Server. Für einen KI-Agenten ist deine Domain eine schwarze Box. Er muss das gesamte HTML (inklusive kaputtem JavaScript, Popups und Tracking-Pixeln) mühsam parsen, um überhaupt zu verstehen, worum es auf deiner Seite geht. Meistens bricht der Agent hier ab, weil es zu teuer und ineffizient ist (Token-Verschwendung).

### Level 1: Grundlegende Crawlbarkeit (Basic Web Presence)
Du hast immerhin die absoluten Basics aus den 90er Jahren erledigt. Eine saubere `robots.txt` und eine `sitemap.xml`. Das sagt dem Agenten zumindest, wo er suchen darf und wo nicht. Das ist besser als nichts, aber weit entfernt von "Agent Ready".

### Level 2: Text-Optimierung & Bot-Aware
Deine Seite sendet grundlegende Signale an Bots. Du nutzt strukturiertes Schema.org-Markup, sodass Entitäten (z.B. "Firma", "Person", "Produkt") klar definiert sind. Vielleicht hast du sogar schon eine [ai.txt](/glossar/ai-txt/) im Einsatz, die klar regelt, ob Daten für RAG (Realtime Search) genutzt werden dürfen oder für Training gesperrt sind.

### Level 3: KI-Lesbarkeit (Agent-Readable)
Hier beginnt die Profiliga. Auf Level 3 unterstützt deine Website Formate, die explizit für KIs gemacht sind. 
* Du bietest eine [llms.txt](/glossar/llms-txt/) an, die dem Bot eine saubere, strukturierte Zusammenfassung deines Contents im Markdown-Format liefert.
* Dein Server unterstützt [Markdown Content Negotiation](/glossar/markdown-content-negotiation/). Wenn ein KI-Bot mit `Accept: text/markdown` anfragt, liefert dein Server den reinen Text ohne nerviges HTML-Gerüst aus. Das spart dem Agenten massive Token-Kosten.

### Level 4: Dynamische Maschinen-Integration (Agent-Integrated)
Deine Infrastruktur ist jetzt eine Plattform. Du hast API-Kataloge und [MCP-Server-Definitionen](/glossar/model-context-protocol-mcp/) in deinem `.well-known` Ordner hinterlegt. Ein anklopfender Agent sieht nicht nur Content, sondern er sieht die Werkzeuge (Tools) und Datenbanken, die du für autorisierte Systeme freigibst.

### Level 5: Volle Autonomie (Agent-Native)
Die Königsklasse! Die Website ist voll an das [A2A-Protokoll](/glossar/a2a-protocol/) angeschlossen. Sie besitzt eine gültige `agent-card.json` als maschinenlesbaren Ausweis. Wenn ein fremder Agent eine Aktion ausführen will, regelt deine Seite die Zugriffe über die `auth.md` vollautonom, z.B. durch "Agent Verified" Flows und ID-JAGs. Es gibt keine Captchas mehr. Maschinen buchen Budgets bei Maschinen. Genau das bauen wir in der Teleschmiede für unsere Kunden.

## Warum ist Level 5 so überlebenswichtig?

Viele Geschäftsführer, mit denen ich spreche, halten das für Zukunftsmusik. Sie sagen: *"Herr Zimmer, unsere Kunden sind Menschen. Menschen kaufen von Menschen. Warum brauche ich eine auth.md?"*

Diese Denkweise ist fatal. Ja, am Ende entscheidet oft noch ein Mensch über das finale Budget. Aber der **Research-Prozess** (die Evaluierung) wird bereits heute an Maschinen ausgelagert.

Stell dir vor, du bist eine SAP-Beratung. Der CTO eines Mittelständlers nutzt im Juli 2026 seinen KI-Assistenten (der auf Stateless MCP läuft) und sagt: *"Scanne den Markt in DACH nach den 5 besten SAP-Beratern, prüfe ihre Verfügbarkeit über ihre APIs und buche mir nächste Woche bei den Top 3 einen Discovery-Call."*

* **Beratung A (Level 0):** Die KI muss die Website mühsam parsen, findet keine sauberen Preise, findet kein Kontaktformular, das ohne Captcha auskommt. Die KI bricht ab.
* **Beratung B (Level 5):** Die KI pingt die Domain an, liest in Millisekunden die `agent-card.json`, verifiziert sich über die `auth.md`, holt sich via MCP die Kalender-Verfügbarkeit des Beraters und bucht den Termin. 

Beratung B bekommt den Auftrag. Beratung A hat nicht einmal mitbekommen, dass sie überhaupt auf dem Radar war. Das ist die brutale Realität von Agent Readiness.

## Praxisbeispiel: Die Infrastruktur der Teleschmiede

Ich rede hier nicht von abstrakten Konzepten. Schau dir unsere eigene Domain an. Die Teleschmiede ist die Blaupause für Agent Readiness Level 5 in Deutschland. Wir haben das Fundament so gegossen, dass wir für jedes Agenten-System der Zukunft gerüstet sind.

Wenn du als CTO wissen willst, was es braucht, um auf Level 5 zu kommen, analysiere einfach unseren öffentlichen `.well-known` Ordner (`https://teleschmie.de/.well-known/`). 
Dort findest du unsere `agent-card.json`, unsere `auth.md`, unsere OpenAPI-Spezifikationen und alles, was dazugehört, um KIs glücklich zu machen.

Wir nutzen diese Architektur nicht nur, um gut auszusehen, sondern weil es **effizient** ist. Wir reduzieren Reibungsverluste im Vertrieb auf null, indem wir Maschinen die Vorarbeit leisten lassen, auf die ohnehin kein Sales-Manager Lust hat.

## Der gnadenlose Selbsttest für CTOs und Marketer

Genug geredet. Es ist Zeit, dass du die Hosen herunterlässt und prüfst, wie Agent Ready dein Unternehmen wirklich ist. Vergiss teure SEO-Audits von Agenturen, die dir für 5000 Euro einen PDF-Report mit Ladezeiten generieren. 

Nutze die KI, um die KI-Tauglichkeit deiner Seite zu prüfen.

### Der universelle Readiness-Prompt

Nimm diesen Prompt, kopiere ihn in ChatGPT, Claude, Perplexity oder deinen firmeneigenen Agenten. Erledige das heute noch. Du musst den Text nicht anpassen, die KI wird dich nach deiner Domain fragen.

**Prompt für deinen KI-Agenten:**
```text
Führe ein ungeschöntes 'Agent Readiness Audit' für meine Domain durch. Bewerte meine Infrastruktur nach den Cloudflare-Kriterien (Level 0 bis 5) mit Stand Juli 2026. 
- Prüfe systematisch das Vorhandensein von `robots.txt`, `ai.txt`, `llms.txt`, `.well-known/agent-card.json` und `.well-known/auth.md`. 
- Teste, ob mein Server 'Markdown Content Negotiation' unterstützt.
- Liefere mir als CTO einen extrem kritischen Status-Report. Wenn ich auf Level 0 oder 1 stecke, erkläre mir messerscharf, welche konkreten B2B-Umsätze ich durch diese technische Ignoranz in der aktuellen Agenten-Ökonomie an Mitbewerber (die auf Level 5 sind) verliere. Schreibe mir einen priorisierten Maßnahmenplan, um Level 5 zu erreichen.
```

Das Web hat sich verändert. Du kannst entweder weiter H1-Tags für Google optimieren und dich wundern, warum die Leads ausbleiben, oder du richtest deine Architektur radikal auf das Agenten-Zeitalter aus. Die Entscheidung liegt bei dir.

ALOHA! 🌻✌️
