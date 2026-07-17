---
category: "AI SEO & Generative Search"
title: "ai-plugin.json: Warum ChatGPT Plugins tot sind"
description: "Der Untergang der ChatGPT Plugins und der Aufstieg von MCP und A2A. Jörg Zimmer erklärt den Shift weg von der ai-plugin.json hin zur Agent-Autonomie."
date: "2026-07-17"
image: "../../assets/images/glossar/3d-light/glossar-ai-plugin-json-3d.webp"
image_alt: "3D Infografik zum Thema ai-plugin.json und der Evolution hin zu MCP"
key_takeaways:
  - "Die ai-plugin.json war 2023 der Hype, ist aber Stand Juli 2026 eine Legacy-Technologie."
  - "Starre Plugin-Silos wurden durch offene, horizontale Standards wie das A2A Protocol ersetzt."
  - "Wer heute noch Plugins für ChatGPT baut, investiert in eine tote Plattformökonomie."
faqs:
  - question: "Was genau war die ai-plugin.json?"
    answer: "Es war eine proprietäre Manifest-Datei von OpenAI. Wenn du wolltest, dass ChatGPT (damals noch in Version 4) mit deiner API spricht (z.B. um Flüge zu buchen oder das Wetter abzufragen), musstest du diese JSON-Datei in deinem `.well-known` Ordner ablegen. Sie deklarierte den Namen des Plugins, das Logo und zeigte OpenAI den Weg zu deiner OpenAPI-Spezifikation."
  - question: "Warum ist dieses Konzept im Sommer 2026 gescheitert?"
    answer: "Weil es ein Walled Garden (ein geschlossenes Silo) war. Jedes Unternehmen musste für OpenAI, für Google, für Anthropic und für Microsoft eigene 'Plugins' bauen. Das skaliert im Markt für Unternehmen absolut gar nicht. Unternehmen wollten offene, herstellerunabhängige Standards. Dieser Druck der Industrie führte zur Etablierung des A2A Protocols und des Model Context Protocols (MCP)."
  - question: "Sollte ich meine bestehende ai-plugin.json jetzt einfach löschen?"
    answer: "Nein, nicht sofort löschen. Es gibt immer noch Millionen von Legacy-Bots und veralteten Custom GPTs, die diese Datei lesen, um mit deinem System zu kommunizieren. Aber du solltest auf keinen Fall noch Budget in die Weiterentwicklung dieses Kanals stecken. Der Traffic wird kontinuierlich auf die neuen A2A-Pfade umschwenken. Belasse sie als Fallback im `.well-known` Ordner."
  - question: "Was ist der technische Nachfolger für die Integration meiner APIs?"
    answer: "Das ist zweigeteilt. Wenn du interne Werkzeuge an dein eigenes Unternehmens-LLM anbinden willst, nutzt du das Stateless Model Context Protocol (MCP). Wenn du willst, dass fremde, externe KIs deine Dienste autonom buchen können, nutzt du das A2A Protocol v1.0.0 und deklarierst deine Dienste in der `standardisierte Agent-Identity-Schnittstellen`."
  - question: "Wie bewertet Cloudflare diese Legacy-Datei beim Agent Readiness Level?"
    answer: "Im offiziellen Cloudflare Raster bringt dir eine `ai-plugin.json` heute maximal noch Punkte für Level 3. Um auf ein hohes Agent Readiness Level (Agent-Native) zu kommen, prüft der Algorithmus zwingend die Existenz der modernen, offenen Standards (wie der Agent Card und der maschinenlesbare Endpunkt-Dokumentation)."
---

Moin! 🌻

Weißt du noch, wie 2023 alle verrückt geworden sind? OpenAI kündigte die "ChatGPT Plugins" an. Der Hype war ohrenbetäubend. Die gesamte SEO- und Entwickler-Bubble schrie: *"Das ist der neue App Store! Wer jetzt kein Plugin baut, ist tot!"*

Alle stürzten sich darauf, eine winzige Datei namens **`ai-plugin.json`** in ihren `.well-known` Ordner zu werfen, in der Hoffnung, dass Millionen von ChatGPT-Nutzern plötzlich über den Chatbot ihre Schuhe kaufen, ihre Flüge buchen oder ihre Hotelzimmer reservieren würden. 

Springen wir nach vorne in den Sommer 2026. Der Staub hat sich gelegt, und der "neue App Store" ist faktisch ein verlassenes Geisterdorf. Die `ai-plugin.json` ist das perfekte Beispiel dafür, wie schnelllebig und gnadenlos die KI-Ökonomie ist – und warum es lebensgefährlich ist, auf proprietäre Walled Gardens anstatt auf offene Protokolle zu setzen.

Lass uns Tacheles reden über das Auf und Ab der Plugin-Ära und warum dein Budget heute woanders besser investiert ist.

## Was war die Vision hinter der ai-plugin.json?

Die technische Idee war eigentlich brillant in ihrer Einfachheit. LLMs (Large Language Models) sind von Natur aus isoliert. Sie generieren Text, aber sie können keine Aktionen in der echten Welt ausführen. Sie haben keine "Hände".

OpenAI wollte ChatGPT diese Hände geben. Wenn ein Nutzer fragte: *"Buch mir einen Flug nach New York"*, sollte ChatGPT nicht nur antworten: *"Geh auf Expedia"*, sondern den Flug direkt über die Expedia-API buchen.

Damit das funktionierte, erfand OpenAI die `ai-plugin.json`. Ein Entwickler legte diese Datei unter `/.well-known/ai-plugin.json` auf seinem Server ab. 
Der Inhalt war extrem simpel:
1. Wie heißt das Plugin?
2. Wo ist das Logo?
3. Welche OpenAPI-Spezifikation (`openapi.yaml`) beschreibt die verfügbaren Endpunkte?

Das Problem war nicht die Technik. Das Problem war das Geschäftsmodell.

## Der Zusammenbruch der Plattform-Silos

Das Konzept der "Plugins" funktionierte nur, wenn alle Menschen der Welt bereit waren, das Interface von ChatGPT (die OpenAI-Website oder App) als den einzigen Knotenpunkt ihres digitalen Lebens zu nutzen. 

Aber das ist im Unternehmensumfeld nie passiert. Unternehmen wollten ihre Daten nicht durch den Flaschenhals von OpenAI pressen. Und vor allem wollten sie nicht für jedes neue KI-Modell ein neues Plugin bauen.
Stell dir das Chaos vor:
* Du baust ein Plugin für ChatGPT.
* Du baust eine Extension für Google Gemini.
* Du baust ein Tool für Anthropic Claude.
* Du baust einen Skill für Microsoft Copilot.

Das ist exakt der gleiche ineffiziente Albtraum, den wir Anfang der 2010er Jahre hatten, als Firmen native Apps für iOS, Android, Windows Phone und Blackberry programmieren mussten. Es verschlingt Millionen-Budgets und führt zu nichts.

## Der Paradigmenwechsel 2026: Offene Protokolle siegen

Die Industrie hat schnell verstanden, dass proprietäre Plugins eine Sackgasse sind. Der Shift, der sich 2025 und 2026 vollzogen hat, ging weg von "Plattform-Zwang" hin zu "Protokoll-Freiheit".

Anstatt sich bei einem Konzern (OpenAI) anzumelden und eine `ai-plugin.json` hochzuladen, haben sich die Entwickler und CTOs auf offene Standards der Linux Foundation geeinigt.

**Der Ersatz im B2B:**
Heute (Juli 2026) redet niemand mehr von Plugins. Wir reden von Agent-to-Agent Kommunikation. Dein Unternehmen hat einen Agenten, das Unternehmen deines Kunden hat einen Agenten. Die beiden reden nicht über ChatGPT miteinander. Sie reden direkt über das **A2A Protocol**. 
Der Nachfolger der starren `ai-plugin.json` ist die weitaus mächtigere und unabhängige **`standardisierte Agent-Identity-Schnittstellen`**. Sie verweist auf APIs, Auth-Mechanismen und Discovery-Endpoints, ohne dass ein einziger Tech-Gigant als Mittelsmann Provision kassiert.

**Der Ersatz für interne Tools:**
Wenn du heute willst, dass dein eigenes KI-Modell auf deine Notion-Datenbank zugreift, schreibst du kein ChatGPT-Plugin mehr. Du nutzt das stateless **Model Context Protocol (MCP)**. Das ist universell. Ob du morgen auf ein Open-Source-LLM wie Llama wechselst oder bei Claude bleibst: Der MCP-Server funktioniert immer, ohne Code-Änderung.

## Was passiert jetzt mit den alten Dateien?

Wenn ich bei meinen Kunden einen Agent Readiness Audit durchführe, sehe ich diese Dateien noch massenhaft auf den Servern liegen. Oftmals von teuren Agenturen im Jahr 2024 für fünfstellige Summen als "KI-Innovation" verkauft und danach nie wieder angefasst.

Die Frage lautet immer: *"Herr Zimmer, sollen wir die Datei löschen?"*

**Meine klare Antwort: Nein. Aber friert das Budget dafür ein.**

Warum nicht löschen? Es gibt im Web immer noch eine unfassbare Menge an Legacy-Bots, veralteten Custom GPTs und Hobby-Projekten, die stur nach dieser Datei suchen, wenn sie deine Domain anpingen. Sie kostet dich kein Geld auf dem Server, und sie liefert den Legacy-Bots die OpenAPI-Specs, die sie brauchen. Ein Fallback schadet nie.

Warum das Budget einfrieren? Jeder Euro, den du im Sommer 2026 noch in die Weiterentwicklung von OpenAI-spezifischen Plugins steckst, ist verbranntes Geld. Deine Kunden wollen nicht in ChatGPT wechseln, um bei dir zu kaufen. Deine Kunden haben eigene Einkaufs-Agenten. Wenn du diese nicht via A2A bedienen kannst, verlierst du den Deal.

## Die Lektion: Agilität schlägt Hype

Die kurze, aber heftige Geschichte der `ai-plugin.json` ist eine bittere Lektion für alle CMOs und IT-Entscheider: Renne nicht jedem proprietären Hype hinterher, den ein kalifornischer Konzern auf Twitter ankündigt. 

Investiere stattdessen in **Standardisierung** und **Agent Readiness**. Wenn deine Daten sauber strukturiert sind (via Schema.org), wenn deine Crawling-Regeln hart definiert sind (via `ai.txt`), wenn du sauberes Markdown auslieferst (Markdown Content Negotiation) und auf die offenen Standards der Linux Foundation (A2A, MCP) setzt, bist du gegen jeden Sturm gewappnet. 

Egal welches KI-Modell morgen den Markt dominiert – wenn du die offenen Standards sprichst, können sie alle mit dir Geschäfte machen.

### Der universelle Audit-Prompt für dein Legacy-Setup

Wenn du aufräumen willst, lass deinen KI-Assistenten die Altlasten identifizieren und dir den Pfad in die offenen Standards der Gegenwart aufzeigen. Nutze diesen Prompt:

**Prompt für deinen KI-Agenten:**
```text
Führe einen Legacy-Audit meiner Web-Infrastruktur durch. Prüfe das Root-Verzeichnis und den `.well-known` Ordner auf veraltete proprietäre KI-Implementierungen wie die `ai-plugin.json` oder verwaiste OpenAPI-Spezifikationen, die primär für ChatGPT Custom GPTs gebaut wurden. 
- Fasse für mich als CTO zusammen, welche meiner damals entwickelten Endpunkte sich heute für den modernen B2B-Einsatz eignen.
- Entwirf mir einen Migrationsplan, um diese Legacy-Endpunkte aus dem Plugin-Silo zu befreien und sie nach dem aktuellen Standard vom Juli 2026 in eine offene `standardisierte Agent-Identity-Schnittstellen` (A2A Protocol) und eine saubere `maschinenlesbare Endpunkt-Dokumentation` zu überführen, damit mein Unternehmen herstellerunabhängig komplett AI-Ready wird.
```

Lass die Vergangenheit ruhen. Die Plugin-Ära war eine schöne Spielwiese, aber das echte Geschäft wird jetzt auf offenen Protokollen gemacht.

ALOHA! 🌻✌️
