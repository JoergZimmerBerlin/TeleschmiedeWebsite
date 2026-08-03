---
category: 'Technisches SEO & UX'
title: "SEORCH AI Check: 22 Kriterien für GEO & KI-Agents"
meta_title: "SEORCH AI Check: 22 Kriterien für GEO (2026)"
description: "Erfahre alles über den neuen SEORCH AI Check. Wir erklären die 22 Kriterien für Generative Engine Optimization (GEO) und KI-Sichtbarkeit (2026)"
meta_description: "Erfahre alles über den neuen SEORCH AI Check. Wir erklären die 22 Kriterien für Generative Engine Optimization (GEO) und KI-Sichtbarkeit (2026)"
date: "2026-08-03"
image: "../../assets/images/glossar/seorch-ai-check.webp"
image_alt: "SEORCH AI Check Infografik mit einem Roboter und einer Checkliste"
faqs:
  - question: "Ist der SEORCH AI Check kostenlos?"
    answer: "Ja, der Check auf der Startseite von SEORCH ist grundsätzlich kostenlos nutzbar und liefert sofortige Ergebnisse."
  - question: "Warum sind KI-Bots blockiert, obwohl ich das nicht eingestellt habe?"
    answer: "Sehr oft blockieren CDN-Anbieter wie Cloudflare oder Sicherheits-Plugins (WAF) ungewollt KI-Crawler wie den ChatGPT-Search-Bot. Prüfe deine Bot-Management-Einstellungen in der Cloudflare-Konsole."
  - question: "Reicht es aus, nur eine llms.txt Datei anzulegen?"
    answer: "Eine `llms.txt` ist ein hervorragender erster Schritt für die maschinelle Lesbarkeit. Um jedoch als echte Autorität zu gelten und das volle GEO-Potenzial auszuschöpfen, solltest du langfristig alle 22 Kriterien des Audits anvisieren."
---

Das renommierte SEO-Tool **SEORCH** hat sein Angebot um einen brandneuen, revolutionären Audit erweitert: den **SEORCH AI Check**.

Dieser Check testet Websites vollautomatisch auf 22 hochgradig technische und inhaltliche Kriterien, die essenziell sind, um von autonomen KI-Agenten und großen Sprachmodellen (LLMs) indexiert, verstanden und in Chat-Antworten zitiert zu werden.

<div class="my-8 bg-lime-accent text-dark p-6 rounded-2xl text-center shadow-sm">
  <p class="font-bold text-xl mb-4">💬 Jetzt an der Diskussion teilnehmen!</p>
  <a href="https://lnkd.in/p/dbikVh_D" target="_blank" rel="noopener noreferrer" class="inline-block bg-dark text-white font-bold py-2 px-6 rounded-full hover:bg-gray-800 transition-colors">
    Beitrag auf LinkedIn öffnen
  </a>
</div>

## Warum klassisches SEO nicht mehr reicht (GEO)

Die Art und Weise, wie Nutzer im Netz recherchieren, befindet sich in einem tiefgreifenden Wandel. Anstatt Suchbegriffe einzutippen und sich manuell durch zehn blaue Links auf der Google-Startseite (den sogenannten SERPs) zu klicken, stellen Nutzer komplexe Fragen an KI-Tools. Die Antwort wird direkt im Interface des Sprachmodells zusammengefasst – oft ohne dass der Nutzer jemals die Quell-Website besucht.

Wenn du als Marke, Agentur oder Unternehmen in diesen KI-Antworten nicht als Quelle (*Citation*) auftauchst, existierst du in der neuen digitalen Realität praktisch nicht mehr. 

Um von KI-Modellen zitiert zu werden, muss deine Website nicht nur klassische SEO-Kriterien erfüllen, sondern sich aktiv als **maschinenlesbare, vertrauenswürdige Wissensdatenbank** positionieren. Hier kommt der SEORCH AI Check ins Spiel: Er testet, ob deine Infrastruktur den modernen Web-Standards für KI-Crawler (wie `GPTBot` oder `ClaudeBot`) entspricht.

## Die 22 Prüfkriterien des SEORCH AI Checks im Detail

Der SEORCH AI Check untersucht Webseiten auf 22 spezifische Metriken, die in drei Kategorien unterteilt sind: **KI / LLM**, **Technisch** und **GEO**. Nachfolgend findest du die komplette Liste. Wir haben jeden Punkt direkt mit unserem Experten-Glossar verknüpft, damit du sofort erfährst, wie du den jeweiligen Fehler beheben kannst.

### 1. Agent Readiness Level (Cloudflare Standard)
Dieser Check prüft, ob deine Website den Standards für das [Agent Readiness Level](/glossar/agent-readiness-level/) entspricht. Es geht darum, wie gut autonome Agenten deine Seite nicht nur lesen, sondern auch mit ihr interagieren können (z.B. Transaktionen durchführen).

### 2. Identity-Standard (identity.json)
KI-Systeme hassen Unsicherheit. Über eine zentrale [identity.json](/glossar/identity-json/) Datei im Root-Verzeichnis verifizierst du kryptografisch, wer du bist und stellst sicher, dass die KI deine Marke korrekt zuordnet, ohne Halluzinationen zu erzeugen.

### 3. Maschinelles Marken-Manifest (llms.txt)
Sucht nach einer standardisierten [llms.txt](/glossar/llms-txt/) Datei. Diese Datei bietet KI-Systemen eine prägnante, maschinenlesbare Zusammenfassung deiner Produkte, Preise und Kernbotschaften im Markdown-Format, anstatt die KI das überladene HTML durchforsten zu lassen.

### 4. ai.txt Konfiguration
Prüft auf das Vorliegen einer standardisierten [ai.txt](/glossar/ai-txt/). Diese Datei regelt die rechtlichen und ethischen Rahmenbedingungen. Du kannst KI-Crawlern hier granular vorschreiben, wie sie deine Daten zum Trainieren verwenden dürfen.

### 5. HTTP Link-Header (RFC 8288)
Validiert, ob deine Server-Antworten strukturierte [RFC 8288 Link-Headers](/glossar/rfc-8288-link-headers/) mitsenden. Diese Header ermöglichen es KI-Agenten, wichtige API-Endpunkte und strukturierte Daten-Pfade automatisch zu entdecken (Discovery), ohne den HTML-Body laden zu müssen.

### 6. Markdown für KI-Agenten
Analysiert, ob deine Website eine [Markdown Content Negotiation](/glossar/markdown-content-negotiation/) anbietet. Wenn ein Bot deine URL aufruft und explizit nach Text fragt, solltest du ihm eine cleane Markdown-Version liefern, statt ihn mit unnötigem JavaScript und CSS-Code zu belasten.

### 7. Content-Signals (robots.txt)
Sucht nach modernen, KI-spezifischen Direktiven in deiner [robots.txt](/glossar/robots-txt/). Mit Befehlen wie `Google-Extended` oder speziellen `ai-train` Signals kannst du dein Urheberrecht gegenüber KI-Modellen gezielt schützen, falls gewünscht.

### 8. API-Katalog (RFC 9727)
Sucht nach einer standardisierten [API-Katalog](/glossar/api-catalog/) Schnittstelle (`/.well-known/api-catalog`). Autonome Agenten nutzen diese Datei, um zu verstehen, welche APIs deine Website anbietet und wie sie diese für Buchungen oder Abfragen nutzen können.

### 9. MCP Server Card (SEP-1649)
Erkennt, ob du Model Context Protocol (MCP) Server Cards anbietest. Das [MCP (Model Context Protocol)](/glossar/model-context-protocol-mcp/) sowie die zugehörigen [MCP Server Cards](/glossar/mcp-server-card/) erlauben KI-Modellen einen gesicherten, direkten Kontext-Zugriff auf deine Backend-Datenbanken.

### 10. Agent Skills Index
Prüft auf einen standardisierten Skill-Index (`/.well-known/agent-skills/index.json`). In unserem Ratgeber zu [Agent Skills](/glossar/agent-skills/) erfährst du, wie du KI-Agenten vordefinierte Werkzeuge zur direkten Problemlösung auf deiner Plattform bereitstellst.

### 11. WebMCP Browser API
Erkennt Schnittstellen für den Datenaustausch via [WebMCP](/glossar/webmcp/). Diese Technologie verbindet den Browser des Nutzers lokal und sicher mit LLMs, um Kontextextraktion direkt im Client durchzuführen.

### 12. Universal Commerce Protocol (UCP)
Erkennt dezentrale Warenkorb- und Shopschnittstellen. Das [Universal Commerce Protocol (UCP)](/glossar/universal-commerce-protocol-ucp/) erlaubt es KI-Agenten, Produkte und Preise maschinenlesbar auszulesen und direkt in KI-Antworten als kaufbare Widgets darzustellen.

### 13. Agentic Commerce Protocol (ACP)
Prüft das Vorhandensein von autonomen Checkout- und Bestellschnittstellen (`/.well-known/acp.json`). Das [Agentic Commerce Protocol (ACP)](/glossar/agentic-commerce-protocol-acp/) ist der nächste Schritt: Es befähigt KIs, Transaktionen und Käufe völlig selbstständig im Namen des Nutzers abzuschließen.

### 14. Autorenschaft & E-E-A-T
Analysiert Autoren-Boxen und strukturierte Personendaten (Schema.org). KIs trainieren bevorzugt auf vertrauenswürdigem Inhalt von echten Experten. Die Einhaltung der [E-E-A-T](/glossar/e-e-a-t/) Kriterien (Experience, Expertise, Authoritativeness, Trustworthiness) ist für das Überleben im GEO-Zeitalter fundamental.

### 15. Cloudflare CDN & WAF Schutz
Überprüft, ob dein [Content Delivery Network (CDN)](/glossar/content-delivery-network/) oder deine [Web Application Firewall (WAF)](/glossar/web-application-firewall/) versehentlich nützliche KI-Dienste wie ChatGPT-Search (OAI-SearchBot) blockiert. Ein übereifriger Bot-Schutz ist aktuell die häufigste Ursache für verlorenen KI-Traffic.

### 16. Strukturierte Daten (Schema.org)
Sucht nach validem JSON-LD (WebSite, Product, Article, FAQ). Durch [Strukturierte Daten](/glossar/strukturierte-daten/) können KIs deine Inhalte, Preise und FAQs fehlerfrei einordnen und ohne Reibungsverluste auslesen.

### 17. Überschriftenstruktur (H1-H6)
Analysiert die semantische und hierarchische Ordnung deiner Überschriften. KIs lesen Webseiten von oben nach unten. Eine makellose [H1-H2-H3](/glossar/h1-h2-h3/) Struktur ist zwingend nötig, damit Sprachmodelle den logischen Faden deiner Seite perfekt verstehen.

### 18. Inhaltliche Qualität
Prüft die Textlänge, Informationsdichte und Metadaten. Dünner Content ("Thin Content") wird von LLMs radikal aussortiert. Auch Themen wie der [Information Gain bei KI-Content](/glossar/ki-content/) spielen hier eine wichtige Rolle.

### 19. Rendering-Typ (SSR vs. CSR)
Analysiert, ob deine Seite Server-Side-Rendering nutzt. KI-Crawler haben oft nicht die Zeit oder die Ressourcen, JavaScript auszuführen. Daher bevorzugen KIs ganz klar klassisches [Server-Side Rendering (SSR)](/glossar/server-side-rendering/), da reines [Client-Side Rendering (CSR)](/glossar/client-side-rendering/) oft nicht oder nur extrem zeitverzögert indexiert wird (Two-Wave Indexing).

### 20. Server- & Hoster-Integrität
Prüft PTR-Einträge, Server-Header und den TCP/IP-Antwortstatus bei Anfragen von KI-Benutzeragenten. Das Fundament von gutem [Technisches SEO](/glossar/technisches-seo/) ist ein sauber konfigurierter Server ohne versteckte Blockaden auf Netzwerkebene.

### 21. Common Crawl Index-Abdeckung
Fragst in Echtzeit ab, ob deine Website im [Common Crawl](/glossar/common-crawl/) Index erfasst ist. Der Common Crawl ist die primäre Datenquelle, mit der Giganten wie OpenAI oder Anthropic ihre Modelle trainieren. Wer dort fehlt, wird im KI-Training oft schlicht ignoriert.

### 22. KI-Text-Wahrscheinlichkeit
Analysiert deinen Haupttext mithilfe von Google Gemini auf sprachtypische Floskeln, um zu bewerten, wie stark der Text nach typischer KI-Generierung klingt. Um Googles SpamBrain-Filter zu entgehen, müssen Texte zwingend menschlich überarbeitet werden (siehe auch unseren Guide zu [KI-Content](/glossar/ki-content/)).

## Wie man den Check durchführt

Einen SEORCH AI Check durchzuführen ist extrem simpel:
1. Besuche die Startseite von SEORCH.
2. Gib die URL der Seite ein, die du prüfen möchtest.
3. Klicke auf "Prüfen".
4. Der Crawler analysiert die Seite in Echtzeit. Nach wenigen Sekunden erhältst du einen umfassenden Report, der dir genau aufschlüsselt, welche der 22 KI-Kriterien du bestanden hast und wo noch akuter Handlungsbedarf besteht.

