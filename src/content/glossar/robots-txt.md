---
title: "Robots.txt"
description: "Die robots.txt ist eine essenzielle Textdatei im Wurzelverzeichnis von Websites. Sie steuert, welche Crawler, Suchmaschinen und KI-Agenten auf welche Verzeichnisse zugreifen dürfen."
date: "2026-03-10"
related_terms: ["crawling-vs-indexing", "geo"]
---

Die `robots.txt` ist das digitale "Betreten verboten"-Schild deiner Website. Es handelt sich dabei um eine extrem simple, kleine Textdatei, die physisch zwingend im Hauptverzeichnis (Root) deiner Domain liegen muss (z. B. `https://teleschmie.de/robots.txt`).

Trotz ihrer Schlichtheit ist sie das allererste Dokument, das der Googlebot, der Bingbot oder ein moderner OpenAI-Crawler anfragt, bevor er auch nur eine einzige tatsächliche Seite deiner Domain besucht. Ein einziger Tippfehler in dieser Datei kann dafür sorgen, dass deine gesamte Website komplett aus allen Suchmaschinen der Welt verschwindet.

Im Rahmen meiner täglichen Arbeit als [SEO Freelancer in Berlin](/seo-freelancer-berlin/) ist der Blick in die `robots.txt` des Kunden daher immer Schritt Eins bei jedem technischen Audit. Defekte hier sind regelmäßige [Hauptfehlerkanidaten in meiner SEO-Sprechstunde](/blog/80-prozent-seo-fehler-sprechstunde/).

## Funktionsweise und Syntax des Robots Exclusion Protocol

Das Regelwerk, nach dem Bots diese Datei interpretieren, nennt sich *Robots Exclusion Protocol (REP)*. Es ist ein freiwilliger Standard! Bösartige Spambots, Hacker-Skripte oder schlecht programmierte Scraper ignorieren die Regeln der Datei einfach. Seriöse Suchmaschinen halten sich jedoch weitesgehend strikt an die Vorgaben.

<div class="my-8 bg-gray-50 border border-gray-200 p-8 rounded-2xl shadow-sm">
  <h3 class="text-xl font-bold text-dark mt-0 mb-4 text-center">⚙️ Die Anatomie einer robots.txt</h3>
  <div class="bg-[#1A1A1A] text-white p-6 rounded-xl font-mono text-sm leading-relaxed overflow-x-auto shadow-inner">
    <p class="mb-2"><span class="text-lime-400">User-agent:</span> *</p>
    <p class="mb-2"><span class="text-lime-400">Disallow:</span> /internes-backend/</p>
    <p class="mb-2"><span class="text-lime-400">Disallow:</span> /wp-admin/</p>
    <p class="mb-6"><span class="text-lime-400">Allow:</span> /wp-admin/admin-ajax.php</p>
    
    <p class="mb-2"><span class="text-lime-400">User-agent:</span> GPTBot</p>
    <p class="mb-6"><span class="text-lime-400">Disallow:</span> /</p>
    
    <p class="text-gray-400"># Meine XML-Sitemap für Google</p>
    <p class="mb-0"><span class="text-lime-400">Sitemap:</span> https://teleschmie.de/sitemap-index.xml</p>
  </div>
</div>

### Die wichtigsten Direktiven erklärt:

1.  **`User-agent:`** Dies ist die Zeile, die anspricht, VER WEN diese Regel gilt. Das Sternchen (`*`) fungiert als Platzhalter (Wildcard) für *alle* Crawler. Man kann aber gezielt Bots ansprechen (z.B. `Googlebot`, `Bingbot` oder `Applebot`).
2.  **`Disallow:`** Der wichtigste Befehl überhaupt. Er blockiert das [Crawling](/glossar/crawling-vs-indexing/) (das Aufrufen/Herunterladen) des angegebenen Verzeichnisses. Einer der tödlichsten Fehler nach Website-Launches ist ein versehentlich vergessenes `Disallow: /`, das die komplette Domain sperrt (passiert öfter als man denkt in WordPress). Beachte: Ein leeres `Disallow:` (ohne Schrägstrich danach) bedeutet paradoxerweise das genaue Gegenteil – es erlaubt vollen Zugriff!
3.  **`Allow:`** Erlaubt Ausnahmen innerhalb eines gesperrten Verzeichnisses. Wenn du `/wp-admin/` aus Sicherheitsgründen sperrst, aber möchtest, dass Google wichtige CSS-Dateien daraus laden kann, nutzt du `Allow`. Das ist essenziell für die [Core Web Vitals](/glossar/core-web-vitals/), da Google nur dann Ladezeiten bewerten kann, wenn es die Design-Dateien (CSS/JS) crawlen darf.
4.  **`Sitemap:`** Ganz unten in der Datei sollte zwingend der absolute Pfad zu deiner XML-Sitemap liegen. Wenn Suchmaschinen deine `robots.txt` einlesen, wissen sie so sofort, wo dein Inhaltsverzeichnis (die Sitemap) liegt und können effizienter crawlen.

## Was passiert, wenn ich eine indexierte URL per robots.txt sperre?

Hier lauert der größte Mythos der OnPage-Optimierung. Ein `Disallow` in der `robots.txt` verhindert **NICHT**, dass eine URL in den Google Suchergebnissen indexiert wird!

**Wie kann das sein?** Das Ausschlussprotokoll (Disallow) verbietet dem Bot nur den physischen Zugriff auf das Dokument (das Herunterladen des HTML-Codes). Wenn Google den Inhalt der Seite nicht mehr auslesen darf, sieht der Bot allerdings immer noch, dass andere Websites (über Links oder [Linkjuice](/glossar/linkjuice/)) auf diese URL zeigen. 

Das Ergebnis ist desaströs für deine UX: Google führt die URL im Index, zeigt in den Suchergebnissen aber nur eine kryptische Meldung an: *"Aufgrund der robots.txt dieser Website ist keine Beschreibung für dieses Ergebnis verfügbar."* 

Wenn du Inhalte eiskalt aus dem Google-Index werfen (also deindexieren) willst, MUSST du stattdessen über den HTTP-Header oder das HTML Meta-Tag `noindex` arbeiten. Wie das genau im Detail funktioniert, beleuchtet der Unterschied zwischen [Crawling und Indexing](/glossar/crawling-vs-indexing/). Nutze niemals die `robots.txt`, um Duplicate Content oder Thin Content final aus den SERPs (Search Engine Result Pages) zu verbannen!

## Die robots.txt im Zeitalter der LLMs und KI

Die rasante Entwicklung generativer KIs ([Generative Engine Optimization (GEO)](/glossar/geo/)) verleiht der `robots.txt` im Jahr 2024 ff. eine brisante neue, hochpolitische Bedeutung: Die Erlaubnis zum Training von Modellen. 

Da Firmen wie OpenAI, Anthropic oder Perplexity das gesamte öffentliche Web für das Training ihrer GPT-4 / Claude / Llama Sprachmodelle parsen wollen, nutzen sie eigene Webcrawler (z. B. `GPTBot` oder `CCBot`). Mittlerweile sperren Giganten wie die New York Times, Reuters oder CNN und große deutsche Publisher diese Agenten rigoros über die `robots.txt` aus Urheberrechtsgründen aus.

Auch du als Webseitenbesitzer kannst steuern, wer dich auslesen darf:

*   **`User-agent: GPTBot`** und dann **`Disallow: /`** sperrt explizit den Crawler von OpenAI aus. Dein Content wird nicht genutzt, um zukünftige GPT-Modelle zu trainieren.
*   **Strategisches Problem:** Wenn du `PerplexityBot` oder KIs aussperrst, sorgst du aber auch dafür, dass diese Engines dich nicht mehr im RAG-Prozess (Real-time Citations) erwähnen können. Du machst dich extrem sicher vor Datenverlust, aber gleichzeitig völlig unsichtbar in der generativen KI-Suche ([AI Overview Praktikanten Paradoxon](/blog/ai-seo-geo-praktikanten/)). 

![Infografik: Die Evolution der SEO Bots](../../assets/images/blog/bot-evolution.png)

### Zusammenfassung

Die `robots.txt` ist das Fundament des Crawl-Budgets (der Effizienz, mit der Google deine Seite besucht). Sperre hier logischerweise Backend-Seiten, Parameter-URLs, Warenkörbe, User-Profile oder Suchfunktions-Resultate aus. Die Datei ist ein mächtiges, wenn auch stumpfes Schwert: Handle bei Setzung und Änderung mit maximaler Sorgfalt, am besten, indem du das Tool zur "robots.txt Testung" in Googles Search Console vorab nutzt oder das Setup einem Tool wie [Sistrix und SE Ranking](/blog/sistrix-vs-se-ranking/) überlässt, die fehlkonfigurierte Anweisungen sofort mit feuerroten Alerts melden.
