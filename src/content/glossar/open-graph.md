---
category: 'Technisches SEO & UX'
title: 'Open Graph: Protokoll, OG-Tags & Social Previews im Detail'
meta_title: 'Open Graph: OG-Tags & Social Media Guide (2026)'
description: 'Open Graph Tags steuern Bild, Titel und Snippets beim Teilen von URLs auf LinkedIn, WhatsApp und X. Alle Pflicht-Tags & Best Practices. (2026)'
meta_description: 'Open Graph Tags steuern Bild, Titel und Snippets beim Teilen von URLs auf LinkedIn, WhatsApp und X. Alle Pflicht-Tags & Best Practices. (2026)'
sameAs: 'https://www.wikidata.org/wiki/Q17107778'
date: '2026-09-18'
image: '../../assets/images/glossar/3d-light/glossar-open-graph-3d.webp'
image_alt: '3D-Infografik: Open Graph Protokoll, Metadaten und Social-Media-Vorschau'
synonyms:
  - 'OG-Tags'
  - 'Open Graph Protocol'
  - 'Social Graph Tags'
  - 'Facebook Open Graph'
related_terms:
  - 'meta-description'
  - 'title-tag'
  - 'canonical-tag'
  - 'technisches-seo'
key_takeaways:
  - 'Visuelle Visitenkarte: Open-Graph-Tags verwandeln statische Links in reichhaltige Medienobjekte mit Bild, Titel und Beschreibung auf Social- und Messenger-Plattformen.'
  - 'Harte Standards: 1200 x 630 Pixel im 1.91:1-Format, absolute HTTPS-URLs und minimale Ladezeiten sichern eine fehlerfreie Vorschau auf LinkedIn, WhatsApp, Slack und X.'
  - 'Relevanz für Crawler: Auch moderne KI-Suchmaschinen, Aggregatoren und autonome Bots werten Open-Graph-Metadaten aus, um den Kerninhalt von URLs schnell zu erfassen.'
faqs:
  - question: 'Was ist der Unterschied zwischen Open Graph und Schema.org Structured Data?'
    answer: 'Open Graph wurde primär entwickelt, um die optische Darstellung von geteilten Webseiten auf sozialen Netzwerken und in Messaging-Apps wie LinkedIn, WhatsApp, Slack oder iMessage festzulegen. Schema.org hingegen dient der semantischen Maschinenlesbarkeit für Suchmaschinen und KI-Agenten, um Entitäten, Relationen und Rich Results im Knowledge Graph abzubilden. Beide Technologien ergänzen sich im modernen Head-Bereich und ersetzen einander nicht.'
  - question: 'Welche Bildgröße ist für og:image im Jahr 2026 der verbindliche Standard?'
    answer: 'Die empfohlene Standardabmessung liegt bei 1200 x 630 Pixeln im Seitenverhältnis von 1,91:1. Wichtige Textelemente, Gesichter oder Logos sollten stets in der zentralen Safe-Zone von 1080 x 600 Pixeln platziert werden, da mobile Apps das Bild an den Rändern beschneiden können. Die Dateigröße sollte idealerweise unter 300 KB gehalten werden (z. B. als optimiertes WebP oder PNG), um Ladeverzögerungen beim ersten Teilen zu verhindern.'
  - question: 'Warum zeigt LinkedIn oder Facebook trotz neuer Tags immer noch das alte Vorschaubild?'
    answer: 'Große Plattformen cachen Open-Graph-Metadaten für mehrere Tage auf eigenen Proxyservern, um Bandbreite zu sparen. Wenn du ein Bild oder einen Titel änderst, sieht der Crawler der Plattform diese Änderung nicht sofort. Mit offiziellen Debugging-Tools wie dem LinkedIn Post Inspector oder dem Facebook Sharing Debugger lässt sich eine sofortige Cache-Invalidierung und Neu-Scraping der Ziel-URL erzwingen.'
  - question: 'Braucht man neben Open Graph auch noch Twitter Cards Tags?'
    answer: 'X (ehemals Twitter) greift automatisch auf Open-Graph-Tags zurück, wenn keine twitter-spezifischen Tags vorhanden sind. Allerdings ist der Tag <meta name="twitter:card" content="summary_large_image"> zwingend erforderlich, damit X das große Bildformat ausspielt statt einer kleinen quadratischen Miniaturansicht. Daher empfiehlt es sich, die Twitter-Card-Direktive parallel einzubinden und für Bild und Titel auf dieselben Datenquellen zu verweisen.'
---

Das Open Graph Protocol (häufig abgekürzt als OGP oder OG-Tags) ist ein von Facebook im Jahr 2010 eingeführter Web-Standard, der beliebige HTML-Webseiten in strukturierte Graph-Objekte innerhalb sozialer Netzwerke verwandelt. Sobald ein Nutzer eine URL in Plattformen wie LinkedIn, Facebook, Slack, Discord, WhatsApp, Telegram oder iMessage einfügt, steuern diese Meta-Tags haargenau, welcher Titel, welcher Teaser-Text und welches Vorschaubild für die visuelle Link-Vorschau gerendert werden. Ohne saubere Open-Graph-Konfiguration entscheidet der jeweilige Crawler der Plattform völlig willkürlich, welches Zufallsbild aus dem Fließtext gegriffen wird.

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
    „Developer und SEOs MÜSSEN zusammen arbeiten! Gerade wenn es um Relaunch geht. Da wirst als SEO nach den Live Gang hinzugeholt und sollst dann erklären, warum du beispielsweise die Struktur anders aufgesetzt hättest. Außerdem produziert das Frust und Arbeit, die man hätte gleich zusammen besser lösen können. Für mich gehört Webentwicklung mit technischen SEO Basics einfach zusammen.“
  </blockquote>
  <figcaption class="mt-4 pt-3 border-t border-neutral-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
    <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span>Experten-Zitat • <cite class="not-italic font-semibold text-neutral-700">Jörg Zimmer</cite></span>
      <span class="text-neutral-300 hidden sm:inline">•</span>
      <a href="https://www.linkedin.com/feed/update/urn:li:activity:6979120413486280706" target="_blank" rel="noopener noreferrer" class="text-neutral-600 hover:text-dark underline inline-flex items-center gap-1">
        <span>Quelle: LinkedIn-Beitrag von Jörg Zimmer</span>
        <svg class="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
      </a>
    </div>
    <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="font-bold text-lime-700 hover:underline inline-flex items-center gap-1 shrink-0">
      Jörg Zimmer auf LinkedIn folgen →
    </a>
  </figcaption>
</figure>

In der Schnittmenge von [Technisches SEO](/glossar/technisches-seo/) und Conversion-Optimierung stellen Open-Graph-Tags ein oft unterschätztes Werkzeug dar. Ein geteilter Link ohne ansprechendes Vorschaubild verliert im Newsfeed oder Chatverlauf bis zu 70 % seiner Klickrate (CTR). Während klassische Suchmaschinenoptimierer primär auf das [Title Tag](/glossar/title-tag/) und die [Meta Description](/glossar/meta-description/) für Google-SERPs achten, definiert das Open-Graph-Protokoll die visuelle Visitenkarte auf allen Drittplattformen.

---

## Wie das Open Graph Protokoll technisch aufgebaut ist

Technisch gesehen besteht das Protokoll aus einfachen `<meta>`-Elementen, die im `<head>`-Bereich des HTML-Dokuments platziert werden. Anstelle des Attributs `name` verwendet die Spezifikation das Attribut `property` mit dem Prefix `og:`. 

Die offizielle Spezifikation (dokumentiert unter ogp.me) unterscheidet zwischen vier obligatorischen Pflicht-Tags und einer Vielzahl optionaler Metadaten:

1. **`og:title`**: Der Titel des Inhalts. Er kann sich bewusst vom HTML-Title unterscheiden, da Social-Media-Überschriften oft direkter formuliert werden als suchmaschinenoptimierte Title-Tags.
2. **`og:type`**: Der Objekttyp. Für standardmäßige Webseiten, Landingpages und Blogartikel lautet der Wert fast ausnahmslos `website` oder `article`. Spezialisierte Werte wie `book`, `profile` oder `video.movie` sind möglich, spielen im regulären Web publishing aber eine untergeordnete Rolle.
3. **`og:image`**: Die absolute URL zu der Bilddatei, die als Vorschaubild ausgespielt werden soll.
4. **`og:url`**: Die kanonische Ziel-URL der Seite. Sie sollte exakt mit dem [Canonical Tag](/glossar/canonical-tag/) übereinstimmen, um Fragmentierungen von Social Signals zu verhindern.

### Übersicht der wichtigsten Open-Graph- und Social-Tags

| Tag / Eigenschaft | Typ | Zweck | Best Practice & Abmessung |
| :--- | :--- | :--- | :--- |
| `og:title` | Pflicht | Überschrift im Social Feed | 40–60 Zeichen, Kernaussage nach vorne |
| `og:description` | Empfohlen | Kurzer Teaser-Text unter dem Titel | 2–4 prägnante Sätze (max. 150–200 Zeichen) |
| `og:image` | Pflicht | Großes Vorschaubild (Rich Preview) | 1200 x 630 px (1.91:1), max. 300 KB, WebP/PNG/JPG |
| `og:image:width` | Empfohlen | Pixelbreite des Bildes | Exakter Wert (z. B. `1200`) |
| `og:image:height` | Empfohlen | Pixelhöhe des Bildes | Exakter Wert (z. B. `630`) |
| `og:image:alt` | Empfohlen | Barrierefreier Alternativtext | Deskriptive Beschreibung des Bildinhalts |
| `og:url` | Pflicht | Kanonische URL des Objekts | Absolute HTTPS-URL inklusive Trailing Slash `/` |
| `og:type` | Pflicht | Dokumententyp | `website` (Pages) oder `article` (Blog) |
| `og:site_name` | Empfohlen | Name der Dachmarke / Webpräsenz | z. B. `Teleschmiede` oder Firmenname |
| `og:locale` | Empfohlen | Sprach- und Regionscode | z. B. `de_DE` für Deutschland (Default: `en_US`) |
| `twitter:card` | Ergänzung | Kartentyp für die Plattform X | `summary_large_image` für große Bilddarstellung |

---

## Die perfekte og:image Spezifikation für 2026

Das Vorschaubild ist das wichtigste visuelle Element einer jeden geteilten URL. Ein pixeliges, abgeschnittenes oder fehlendes Bild zerstört das Vertrauen des Nutzers sofort.

Für eine fehlerfreie Darstellung auf allen Plattformen gelten folgende Maßgaben:

- **Abmessungen:** **1200 x 630 Pixel** ist der universelle Goldstandard. Dieses Format entspricht dem Seitenverhältnis von 1,91:1.
- **Zentrale Safe-Zone:** Messenger wie WhatsApp oder Telegram sowie mobile Facebook- und LinkedIn-Feeds schneiden Vorschaukarten gelegentlich dynamisch zu quadratischen Kacheln oder engeren Ausschnitten zu. Platziere Texte, Logos und Porträts daher in einem geschützten Bereich von **1080 x 600 Pixeln** in der Bildmitte.
- **Dateigröße und Format:** Auch wenn Plattformen Uploads bis zu 8 MB theoretisch akzeptieren, muss das Bild von Social [Crawler](/glossar/crawler/)-Bots extrem schnell heruntergeladen werden. Verwende komprimierte Formate wie modernes WebP oder optimiertes PNG/JPEG mit einer Zielgröße von **unter 300 KB**. 
- **Explizite Dimensionen im HTML:** Werden die Tags `og:image:width` und `og:image:height` im Quellcode mitgeliefert, kann der Social-Bot die Vorschau-Box sofort mit dem korrekten Seitenverhältnis vorberechnen. Dies verhindert, dass beim allerersten Teilen einer frischen URL die Bildanzeige fehlschlägt.

---

## Universelles Code-Snippet für moderne Webprojekte

Die folgende Konfiguration deckt alle Anforderungen für moderne Plattformen ab und verbindet Open Graph mit Twitter Cards:

```html
<!-- Open Graph Protokoll (Universal) -->
<meta property="og:locale" content="de_DE" />
<meta property="og:site_name" content="Dein Markenname" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Prägnanter Titel für Social Media und Messenger" />
<meta property="og:description" content="Eine klare, klickstarke Zusammenfassung des Seiteninhalts in maximal zwei bis drei Sätzen." />
<meta property="og:url" content="https://deinedomain.de/deine-zielseite/" />
<meta property="og:image" content="https://deinedomain.de/media/social-preview-1200x630.webp" />
<meta property="og:image:secure_url" content="https://deinedomain.de/media/social-preview-1200x630.webp" />
<meta property="og:image:type" content="image/webp" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Deskriptiver Alternativtext des Vorschaubildes" />

<!-- Twitter / X Card Ergänzung -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Prägnanter Titel für Social Media und Messenger" />
<meta name="twitter:description" content="Eine klare, klickstarke Zusammenfassung des Seiteninhalts in maximal zwei bis drei Sätzen." />
<meta name="twitter:image" content="https://deinedomain.de/media/social-preview-1200x630.webp" />
<meta name="twitter:image:alt" content="Deskriptiver Alternativtext des Vorschaubildes" />
```

---

## Die 3 häufigsten Praxis-Fehler bei Open Graph

Aus zahllosen Website-Audits und Kundenprojekten kristallisieren sich immer wieder dieselben Stolpersteine heraus, die zu leeren Vorschaufenstern führen:

### Fehler 1: Relative URLs statt vollqualifizierter HTTPS-Pfade
Social-Media-Crawler sind externe Programme, die außerhalb deines lokalen Webseiten-Kontexts agieren. Ein Pfad wie `<meta property="og:image" content="/images/header.jpg" />` schlägt bei LinkedIn oder Facebook fehl. Der Crawler kann relative Pfade nicht auflösen. Es muss zwingend die absolute URL inklusive Protokoll angegeben werden (`https://deinedomain.de/images/header.jpg`).

### Fehler 2: Aggressives Caching und fehlende Cache-Invalidierung
Wird eine Seite einmal auf LinkedIn oder Facebook geteilt, speichert der Plattform-Server die extrahierten Metadaten in einem internen Cache. Selbst wenn du im CMS das Bild tauschst oder Tippfehler korrigierst, bleibt im Feed tagelang das veraltete Vorschaubild sichtbar. 

Zur Behebung muss der Cache aktiv über Entwickler-Werkzeuge invalidiert werden:
* **LinkedIn:** Nutze den offiziellen *LinkedIn Post Inspector* und klicke auf *Inspect*.
* **Facebook & Messenger:** Nutze den *Facebook Sharing Debugger* und führe ein *Scrape Again* durch.
* **X:** Sende die URL an den Card Validator oder hänge temporär einen unschädlichen Query-Parameter an (z. B. `?v=2`), um ein frisches Crawling zu erzwingen.

### Fehler 3: Blockieren von Social Bots in Firewalls oder robots.txt
Viele Sicherheits-Plugins oder Web Application Firewalls (Cloudflare, Wordfence) stufen Crawler wie `facebookexternalhit`, `LinkedInBot` oder `Twitterbot` versehentlich als verdächtige Scraper ein und werfen einen HTTP-Statuscode `403 Forbidden` zurück. Auch eine falsch konfigurierte `robots.txt`, die das Bildverzeichnis für User-Agents sperrt, verhindert die Auslese. Prüfe im Rahmen von technischem Onpage-Monitoring mit Tools wie [SE Ranking (Partnerlink)](https://seranking.com/de/?ga=4169588&source=link), ob alle statischen Assets öffentlich erreichbar sind.

---

## Live-Referenz: Open Graph Implementierung auf teleschmie.de

Auf dieser Website nutzen wir das moderne Web-Framework Astro in Kombination mit serverseitig erzeugten Metadaten. Anstatt Open-Graph-Tags für jeden Artikel manuell zu schreiben, generiert unser zentrales Layout-Template die Tags automatisch aus den Markdown-Frontmatter-Feldern:

```astro
<!-- Auszug aus src/layouts/Layout.astro -->
<meta property="og:title" content={displayTitle} />
<meta property="og:description" content={displayDescription} />
<meta property="og:type" content="website" />
<meta property="og:url" content={`${siteUrl}${currentPath}`} />
<meta property="og:image" content={ogImageUrl} />
<meta property="og:image:width" content={String(ogWidth)} />
<meta property="og:image:height" content={String(ogHeight)} />
<meta property="og:image:type" content="image/webp" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={displayTitle} />
<meta name="twitter:description" content={displayDescription} />
<meta name="twitter:image" content={ogImageUrl} />
```

Durch diese Architektur ist sichergestellt, dass jede URL stets ein individuelles 3D-Vorschaubild im Format 1200 x 630 Pixel erhält. Die URL-Pfadlogik erzwingt stets HTTPS und den obligatorischen Trailing Slash (`/`), wodurch Redirect-Ketten vermieden werden.

Wer ein Content-Management-System wie WordPress einsetzt, muss diese Logik nicht im Quellcode programmieren. Moderne SEO-Plugins wie [Rank Math](/glossar/rank-math/) übernehmen die automatische Generierung von OG-Tags und Bildskalierungen über standardisierte Menüs. Wie sich führende Plugins in diesem Bereich schlagen, beschreibe ich im Vergleichsartikel [Rank Math vs Yoast SEO](/blog/rank-math-vs-yoast-seo/).

---

## Relevanz für KI-Agenten, Chatbots und Modernes Crawling

Das Einsatzgebiet von Open-Graph-Tags beschränkt sich längst nicht mehr auf traditionelle soziale Netzwerke. Mit dem Aufkommen generativer Suchsysteme und KI-Agenten hat das Protokoll eine zweite Renaissance erfahren.

Wenn Chat-Assistenten wie ChatGPT, Claude, Perplexity oder Copilot Webrecherchen durchführen und Links als Quellennachweise (Citations) formatieren, werten ihre Parser die im `<head>` hinterlegten Open-Graph-Tags aus. Das Tag `og:description` liefert dem Modell eine sofort konsumierbare Zusammenfassung ohne Parsing-Overhead des eigentlichen DOM-Baums. 

Eine saubere Auszeichnung erleichtert die [AI Crawlability](/glossar/ai-crawlability/) und stellt sicher, dass deine Marke in KI-Zitaten mit dem gewünschten Branding und klaren Titeln erscheint. Zusammen mit semantischen JSON-LD-Auszeichnungen für [Strukturierte Daten](/glossar/strukturierte-daten/) bildet Open Graph das Rückgrat jeder modernen Metadaten-Architektur.

---

<div class="my-8 bg-dark text-white p-6 rounded-2xl border-l-4 border-lime-accent shadow-md relative not-prose">
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
    Kopiere diesen Prompt direkt in deinen KI-Coding-Assistenten, um Open-Graph- und Twitter-Card-Metadaten automatisiert und defensiv in deinem Webprojekt zu integrieren:
  </p>
  <div class="bg-black/60 p-4 rounded-xl border border-white/10 text-xs font-mono text-gray-200 overflow-x-auto space-y-2">
    <p class="text-lime-accent font-bold mb-1"># Prompt: Open-Graph- & Social-Preview-Integration</p>
    <p><strong>Rolle:</strong> Du bist ein hochspezialisierter Technical SEO & Frontend Web Architect.</p>
    <p><strong>Aufgabe:</strong> Implementiere ein vollständiges, valides Open-Graph- und Twitter-Card-Metadaten-System für alle Seiten des Projekts.</p>
    <p class="text-lime-accent font-semibold pt-1"># Vorgehensweise & Sicherheitsregeln:</p>
    <p><strong>1. Tech-Stack-Analyse (Erst prüfen, dann handeln):</strong> Ermittle das Framework oder CMS (WordPress, Shopify, Astro, Next.js, Nuxt, Laravel oder statisches HTML) sowie vorhandene Metadaten-Plugins. Prüfe die aktuelle Generierung von Title-Tags und Canonical-URLs im Quellcode.</p>
    <p><strong>2. Defensive & konfliktfreie Integration:</strong> Überschreibe keine bestehenden Meta-Tags blind. Vermeide doppelte Tags (wie doppelte og:title oder og:image). Greife auf vorhandene dynamische Variablen für Titel, Beschreibung und Beitragsbilder zurück. Binde og:title, og:description, og:image, og:url, og:type und twitter:card (summary_large_image) harmonisiert ein.</p>
    <p><strong>3. Standard- & URL-Hygiene:</strong> Verwende ausnahmslos absolute HTTPS-URLs für og:image und og:url. Stelle sicher, dass die og:url exakt der kanonischen URL der Seite entspricht (inklusive Trailing Slashes bei Verzeichnispfaden). Verwende für Vorschaubilder die Abmessung 1200 x 630 Pixel mit expliziter Definition von og:image:width und og:image:height.</p>
    <p><strong>4. Pre-Flight-Validierung:</strong> Überprüfe das generierte HTML auf korrekte Syntax. Simuliere das Rendering und stelle sicher, dass die Bilddateien existieren und öffentlich mit HTTP 200 erreichbar sind. Teste die URL anschließend im Facebook Sharing Debugger und LinkedIn Post Inspector.</p>
    <p class="pt-1"><strong>Output:</strong> 1. Befund des analysierten Tech-Stacks, 2. Code-Diff oder Template-Komponente, 3. Schritt-für-Schritt-Anleitung zur Cache-Validierung.</p>
  </div>
</div>

---

<div class="my-10 bg-dark text-white p-8 rounded-3xl border border-white/10 text-center shadow-md">
  <h3 class="text-xl md:text-2xl font-bold text-white mb-3 !mt-0 !border-none !pb-0">
    Jetzt an der Diskussion teilnehmen
  </h3>
  <p class="text-gray-300 text-sm max-w-xl mx-auto mb-6">
    Diskutiere mit Jörg Zimmer und der SEO-Community auf LinkedIn über saubere Metadaten und technische Indexierung.
  </p>
  <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="btn-primary">
    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    <span>Beitrag auf LinkedIn öffnen</span>
    <span aria-hidden="true">→</span>
  </a>
</div>
