---
category: 'Technisches SEO & UX'
title: "Schema Markup Generator: Vom Inselschnipsel zum Wissensgraphen"
meta_title: "Schema Markup Generator: Graph-Code (2026)"
description: "Schema Markup Generator im Test: Warum Standard-Tools isolierte Dateninseln erzeugen und wie du vernetzte JSON-LD Graphs für KI baust. (2026)"
meta_description: "Schema Markup Generator im Test: Warum Standard-Tools isolierte Dateninseln erzeugen und wie du vernetzte JSON-LD Graphs für KI baust. (2026)"
sameAs: "https://www.wikidata.org/wiki/Q3475322"
date: "2026-09-18"
image: "../../assets/images/glossar/3d-light/glossar-schema-markup-generator-3d.webp"
image_alt: "Schema Markup Generator 3D Infografik - Von der Formulareingabe über die Codesynthese zum vernetzten Graph"
synonyms: ["Schema Generator", "JSON-LD Generator", "Strukturierte Daten Generator", "Schema.org Generator"]
related_terms: ["strukturierte-daten", "technisches-schema-markup", "entity-seo", "confidence-score", "knowledge-graph", "grounding-page"]
key_takeaways:
  - "Herkömmliche Schema Markup Generatoren erzeugen isolierte Einzel-Snippets, die im Quellcode als unverbundene Dateninseln enden."
  - "Moderne KI-Suchmaschinen und LLMs verlangen relationale @graph-Container mit eindeutigen @id-Fragment-URIs statt loser Attribut-Sammlungen."
  - "Ein professioneller Generator verknüpft Personen, Organisationen, Angebote und Webseiten über semantische Kanten wie founder, publisher und provider."
  - "Vor der Produktivschaltung ist die Überprüfung auf Dateninseln im Graph-Visualizer ebenso entscheidend wie der reine Syntax-Check bei Google."
faqs:
  - question: "Was unterscheidet einen modernen Schema Markup Generator von alten Standard-Tools?"
    answer: "Traditionelle Generatoren fragen isolierte Formularfelder für genau einen Typen ab – beispielsweise LocalBusiness oder FAQPage. Sie geben ein einzelnes Script-Tag aus. Ein moderner Entitäten-Graph-Generator hingegen modelliert das gesamte Beziehungsnetz einer Domain in einem zusammenhängenden @graph-Container, inklusive bidirektionaler Referenzen und externem Wikidata-Grounding."
  - question: "Warum führen mehrere getrennte JSON-LD Snippets zu Problemen in der KI-Suche?"
    answer: "Werden mehrere eigenständige script-Tags auf einer Seite eingebunden, fehlen dem Parser verbindende relationale Kanten. Suchmaschinen und Answer Engines erkennen zwar, dass eine Organisation und ein Produkt existieren, können aber nicht mathematisch sicher nachweisen, dass die Organisation der Hersteller oder Verkäufer ist. Die Identitätskonfidenz sinkt drastisch."
  - question: "Welche technischen Eigenschaften muss valider JSON-LD Code 2026 aufweisen?"
    answer: "Der Code muss syntaktisch korrektes JSON-LD nach W3C-Standard sein, einen zentralen @context ('https://schema.org') nutzen und alle Typen in einem '@graph'-Array bündeln. Jede Hauptentität benötigt eine kanonische '@id' (z. B. 'https://deinedomain.de/#organization'), und Querverweise müssen diese IDs explizit referenzieren."
  - question: "Wie teste ich generiertes Schema Markup auf Fehler und Vollständigkeit?"
    answer: "Zunächst validierst du die Syntax im offiziellen Schema.org Validator oder in Googles Rich Results Test. Anschließend prüfst du die relationale Vernetzung in einem Graph-Visualizer, um sicherzustellen, dass keine isolierten Dateninseln vorhanden sind und alle Kanten korrekt schließen."
---

Strukturierte Daten sind das Fundament, auf dem Google Rich Results aufbaut und aus dem Sprachmodelle wie Perplexity oder ChatGPT ihre Zitationen speisen. Dennoch schreibt kaum ein Entwickler oder SEO-Manager tausende Zeilen verschachtelten JSON-LD-Code von Hand. Die manuelle Syntaxerstellung ist fehleranfällig, zeitraubend und bei komplexen Attributen unübersichtlich.

Aus diesem Grund gehört ein zuverlässiger **Schema Markup Generator** (auch *JSON-LD Generator* oder *Schema Generator* genannt) zur festen Grundausstattung jeder technischen SEO-Werkzeugkiste. Doch zwischen den weit verbreiteten Generatoren der ersten Generation und den Anforderungen moderner generativer Suchmaschinen klafft eine gewaltige Lücke. Wer blindlings Standard-Snippets in sein CMS kopiert, erzeugt häufig das Gegenteil von semantischer Klarheit: unverbundene Datenfragmente, die Crawler verwirren und die maschinelle Vertrauensbildung sabotieren.

## Die fatale Schwachstelle klassischer Schema-Generatoren

Praktisch jeder Webmaster kennt die gängigen Online-Generatoren. Man wählt in einem Dropdown-Menü einen Typen wie `LocalBusiness`, `Organization`, `Article` oder `Product` aus, tippt Name, Adresse oder Preis in die Eingabemasken und erhält am Ende ein fertiges `<script type="application/ld+json">`-Tag.

Das Problem an dieser Vorgehensweise ist nicht die Syntax. Der erzeugte Code ist meist syntaktisch valide und besteht den Google Rich Results Test ohne Fehlermeldung. Die fundamentale Schwachstelle liegt in der **Isolation**:

Klassische Generatoren betrachten jede Entität als isolierte Insel. Wenn du für deine Startseite ein Snippet für dein Unternehmen generierst und auf derselben Seite über ein zweites Formular deine Dienstleistungen auszeichnest, erzeugst du zwei getrennte Datenblöcke. Für den Algorithmus von Google oder OpenAI existieren zwei Dinge nebeneinander: Ein Unternehmen irgendwo im Raum und eine Dienstleistung irgendwo im Raum. Die relationale Information – dass *dieses spezifische Unternehmen* der autorisierte Erbringer (*provider*) genau dieser Dienstleistung ist – geht vollständig verloren.

In der technischen Suchmaschinenoptimierung bezeichnen wir dieses Phänomen als **Dateninseln**. Sie senken den berechneten [Confidence Score](/glossar/confidence-score/) dramatischer als fehlende Attribute, weil Maschinen Widersprüche und Unklarheiten fürchten.

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
    „Es gibt tausende SEO Tools, die die Arbeit der Suchmaschinenoptimierer nicht überflüssig machen. Sie zeigen dir nur die Möglichkeiten und erleichtern das Leben.“
  </blockquote>
  <figcaption class="mt-4 pt-3 border-t border-neutral-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
    <span>Experten-Zitat • <cite class="not-italic font-semibold text-neutral-700">Jörg Zimmer</cite></span>
    <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="font-bold text-lime-700 hover:underline inline-flex items-center gap-1">
      Jörg Zimmer auf LinkedIn folgen →
    </a>
  </figcaption>
</figure>

## Die Architektur moderner Entitäten-Generatoren: Der @graph-Standard

Ein zukunftssicherer Schema Markup Generator für das Jahr 2026 erzeugt keine Einzelschnipsel mehr. Er konstruiert einen zusammenhängenden **Wissensgraphen**.

Das technische Herzstück dieser Architektur ist das `@graph`-Array im JSON-LD. Anstatt fünf separate `<script>`-Tags im HTML-Header zu verteilen, bündelt ein professioneller Generator sämtliche Entitäten einer Website in einem einzigen Container. Die Verknüpfung der Knoten erfolgt über kanonische Fragment-Identifier (`@id`):

* `https://deinedomain.de/#person` deklariert den Gründer oder Experten.
* `https://deinedomain.de/#organization` deklariert die juristische Person des Unternehmens.
* `https://deinedomain.de/#website` verankert die Web-Präsenz.
* `https://deinedomain.de/#service` oder `#product` beschreibt das konkrete Angebot.

Über relationale Eigenschaften schließt der Generator die Lücken:
Die Organisation referenziert die Person als `founder`. Die WebSite verweist auf die Organisation als `publisher`. Das Angebot verweist auf das Unternehmen als `provider`.

Für KI-Crawler und [GraphRAG](/glossar/rag/)-Pipelines entsteht dadurch eine lückenlose semantische Landkarte. Das System muss keine Wahrscheinlichkeiten erraten, sondern liest ein mathematisch bewiesenes Netz aus Fakten und Beziehungen ab.

## Kriterienvergleich: Welcher Generator-Typ löst deine Aufgabe?

Die folgende Übersicht stellt die drei gängigen Ansätze der Schema-Generierung gegenüber:

| Kriterium | Klassischer Online-Generator (z. B. Merkle / JSONLD.com) | Manuelles Coden im Texteditor | Moderner Entitäten-Graph-Generator |
| :--- | :--- | :--- | :--- |
| **Ausgabe-Format** | Isolierte Einzelschnipsel pro Typ | Beliebig gestaltbar, hohe Fehlerquote | Monolithischer `@graph`-Container |
| **Vermeidung von Dateninseln** | ❌ Nein (erzeugt unverbundene Inseln) | ⚠️ Nur bei extremem Expertenwissen | ✅ Vollautomatisch über `@id`-Referenzen |
| **Entity Grounding (Wikidata)** | ❌ Selten bis gar nicht vorhanden | ⚠️ Manuell aufwendig zu recherchieren | ✅ Integrierte `sameAs`-Verknüpfung |
| **Archetypen-Unterstützung** | Starre Typenauswahl | Volle Flexibilität, hoher Zeitaufwand | Branchenspezifisch (B2B, Shop, Handwerk) |
| **Zeitaufwand pro Seite** | 10 bis 20 Minuten pro Einzelschnipsel | Mehrere Stunden pro komplexem Setup | Unter 2 Minuten für den gesamten Graphen |
| **Eignung für AI-SEO & LLMs** | Mäßig (nur für klassische Rich Results) | Hoch (wenn fehlerfrei gepflegt) | **Maximal** (Zitations-Readiness 2026) |

## Vorher-Nachher: Inselschnipsel versus vernetzter Wissensgraph

Um den technischen Unterschied plastisch zu machen, betrachten wir zwei Varianten desselben Unternehmens.

### Die alte Methode: Fragmentierte Inselschnipsel (Fehlerhaft)
Hier werden zwei getrennte Script-Blöcke erzeugt. Die Suchmaschine weiß nicht, ob die Person und das Unternehmen zusammengehören:

```html
<!-- Tag 1: Isolierte Person -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Max Mustermann",
  "jobTitle": "Geschäftsführer"
}
</script>

<!-- Tag 2: Isolierte Organisation ohne Beziehung -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Muster Bau GmbH",
  "url": "https://deinedomain.de"
}
</script>
```

### Der 2026er Standard: Vernetzter @graph mit Relationen (Korrekt)
Ein moderner Generator erzeugt einen einzigen kohärenten Wissensknoten. Alle Entitäten besitzen eindeutige IDs und verweisen aufeinander:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://deinedomain.de/#person",
      "name": "Max Mustermann",
      "jobTitle": "Geschäftsführer",
      "sameAs": [
        "https://www.linkedin.com/in/dein-profil/",
        "https://www.wikidata.org/wiki/Q12345"
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://deinedomain.de/#organization",
      "name": "Muster Bau GmbH",
      "url": "https://deinedomain.de",
      "founder": {
        "@id": "https://deinedomain.de/#person"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://deinedomain.de/#website",
      "url": "https://deinedomain.de",
      "publisher": {
        "@id": "https://deinedomain.de/#organization"
      }
    }
  ]
}
</script>
```

Im zweiten Beispiel versteht jeder Crawler in Millisekunden: Max Mustermann ist der Gründer der Muster Bau GmbH, und die Muster Bau GmbH ist der offizielle Herausgeber dieser WebSite.

## Die Kern-Bausteine: Welche Klassen ein moderner Generator beherrschen muss

Ein praxistauglicher Schema Generator darf sich nicht auf triviale Basisfelder beschränken. Um im maschinellen [Entity SEO](/glossar/entity-seo/) maximale Relevanz aufzubauen, muss das Werkzeug die wichtigsten Entitätsklassen des Schema.org-Vokabulars nahtlos miteinander verweben:

### 1. Die Unternehmens-Entität (Organization & LocalBusiness)
Die juristische Person bildet den Dreh- und Angelpunkt jeder Domain. Neben Basisdaten wie `name`, `legalName` und `url` verlangen moderne Answer Engines harte Verankerungsmerkmale:
* **`address` (PostalAddress):** Kanonische Strukturierung nach Straße, Postleitzahl, Ort und Ländercode (`addressCountry: "DE"`).
* **`geo` (GeoCoordinates):** Exakte Geokoordinaten mit Breitengrad (`latitude`) und Längengrad (`longitude`), um lokale Verwechslungen im Kartenmaterial auszuschließen.
* **`vatID` & `identifier`:** Offizielle Handelsregisternummern oder Umsatzsteuer-Identifikationsnummern schaffen maximale Verifizierbarkeit.
* **`openingHoursSpecification`:** Strukturierte Geschäftszeiten mit Wochentagen, Öffnungs- und Schließzeiten.

### 2. Die Experten-Entität (Person)
Im Zeitalter von E-E-A-T und generativer Suche akzeptiert Google keine anonymen Texte mehr. Der Generator muss Urheber lückenlos abbilden:
* **`knowsAbout`:** Konkrete Themengebiete und Fachdisziplinen, idealerweise mit Wikidata-Verlinkung (z. B. Suchmaschinenoptimierung via `https://www.wikidata.org/wiki/Q180711`).
* **`hasOccupation`:** Standardisierte Berufsklassifikationen nach ISCO-08 oder Berufsbezeichnungen.
* **`alumniOf`:** Akademische Abschlüsse, Universitäten oder Fachzertifikate.

### 3. Die Angebots- und Leistungs-Entität (Service, Product, Offer)
Monetäre Dienstleistungen und Produkte dürfen niemals als isolierte Landingpages existieren. Sie müssen relational an das Unternehmen gekoppelt sein:
* **`provider`:** Rückverweis auf die Organization als autorisierter Erbringer.
* **`areaServed`:** Geografischer Aktionsradius (z. B. DACH-Region, Bundesland oder 50-km-Umkreis).
* **`offers` (Offer):** Preisspezifikationen, akzeptierte Währungen (`EUR`) und Verfügbarkeiten (`InStock`).
* **`hasMerchantReturnPolicy`:** Speziell für E-Commerce und Online-Shops verlangt Google seit 2024 verbindliche strukturierte Rückgaberichtlinien mit Rückgabefristen und Gebührenregeln.

### 4. Die Website-Entität (WebSite & WebPage)
Die WebSite deklariert die übergeordnete Plattform und verbindet den Quellcode mit internen Navigationsbäumen:
* **`inLanguage`:** Primäre Sprachauszeichnung (`de-DE`), um Sprachmodellen die korrekte Lokalisierung zu signalisieren.
* **`potentialAction` (SearchAction):** Deklaration der internen Suchfunktion für Sitelinks Searchboxen in den Google SERPs.

## Anatomie des Graph-Codes: Warum Fragment-URIs der Schlüssel sind

Der entscheidende Unterschied zwischen fehleranfälligem Code und professionellem Enterprise-Markup liegt in der Handhabung der Identifikatoren. Ein Blick auf die Funktionsweise von Knowledge Graph Triplestores verdeutlicht die Mechanik:

Graph-Datenbanken speichern Informationen nicht in Tabellen, sondern in sogenannten Tripeln: **Subjekt → Prädikat → Objekt**. 

Wenn du ein Schema ohne `@id` schreibst, erzeugt der Parser sogenannte „Blind-Knoten“ (*Blank Nodes*). Ein Blank Node hat keine eindeutige Adresse. Möchte ein Sprachmodell nun eine Verknüpfung zwischen dem Autor eines Artikels und der Firma herstellen, scheitert der Vorgang, weil der Autor keinen maschinenlesbaren Bezeichner besitzt.

Durch den Einsatz von Fragment-URIs (`https://deinedomain.de/#person`) vergibt der Generator eine permanente, unveränderliche Speicheradresse. Jede andere Entität auf jeder beliebigen Unterseite der Website kann diesen Knoten über ein einfaches Objekt `{ "@id": "https://deinedomain.de/#person" }` referenzieren. Das spart Ladezeit, verhindert Redundanzen und erzeugt ein unzerstörbares semantisches Netz.

## Automatisierung: Schema-Generierung in moderne CI/CD-Pipelines einbinden

Wer hunderte oder tausende Seiten verwaltet, kann JSON-LD nicht manuell in HTML-Dateien kopieren. Moderne Entwicklungsteams binden die Generierungslogik direkt in ihre Template-Engines (Astro, Next.js, Nuxt, PHP oder Laravel) ein:

1. **Globale Basis-Entitäten (Layout-Ebene):** Erstelle eine zentrale Komponente, die auf jeder Unterseite den unveränderlichen Kern rendert (WebSite, Organization, Founder).
2. **Dynamische Seiten-Entitäten (Page-Ebene):** Ergänze auf Artikelebene lediglich die spezifischen Typen (`BlogPosting`, `Product` oder `FAQPage`) und verlinke sie über `isPartOf` oder `author` mit den IDs des globalen Layouts.
3. **Automatisierte Pre-Flight-Tests:** Binde in deine GitHub Actions oder Deployment-Skripte einen automatisierten Validator ein. So wird verhindert, dass Syntaxfehler oder unvollständige Pflichtfelder den Livegang unbemerkt passieren.

## Die 3 häufigsten Praxis-Fehler beim Einsatz von Schema-Generatoren

Trotz automatisierter Tools schleichen sich in Kundenprojekten immer wieder gravierende Fehler ein, die Rankings und KI-Sichtbarkeit kosten:

### 1. Doppelter Plugin-Wildwuchs im CMS
Viele WordPress- oder Shopify-Betreiber installieren ein SEO-Plugin (wie Yoast oder Rank Math), parallel ein Bewertungs-Plugin und zusätzlich ein lokales Business-Plugin. Jedes dieser Tools bringt seinen eigenen rudimentären Generator mit. Das Resultat im DOM-Tree: Vier verschiedene `@context`-Aufrufe und konkurrierende Unternehmensdeklarationen. Deaktiviere redundante Schema-Ausgaben im CMS und nutze stattdessen eine zentrale Vorlage.

### 2. Autorenschaft als reiner Textstring statt Entität
Wenn Generatoren Blogartikel (`BlogPosting`) auszeichnen, tragen viele Nutzer in das Feld `author` lediglich einen einfachen Textnamen ein (`"author": "Max Mustermann"`). Für moderne Antwortmaschinen ist ein Name ohne `@id` wertlos. Verknüpfe den Autor zwingend als echtes `Person`-Objekt mit biografischer Verlinkung und Expertise-Nachweisen (`knowsAbout`).

### 3. Fehlende Content Parity (Ghost Schema)
Ein Schema Generator verführt dazu, Eigenschaften auszufüllen, die im eigentlichen Webseitentext gar nicht vorkommen – beispielsweise Servicepreise, Öffnungszeiten oder Auszeichnungen. Weichen die Schema-Daten vom für den menschlichen Besucher sichtbaren HTML ab, schlagen Googles Algorithmen gnadenlos zu: Das Markup wird als Täuschungsversuch eingestuft und vollständig entwertet.

## So erstellst du deinen perfekten Graph-Code in der Praxis

Um den Übergang von isolierten Schnipseln zu einem echten [Knowledge Graph](/glossar/knowledge-graph/) zu meistern, steht dir auf dieser Plattform eine kostenlose Suite spezialisierter Werkzeuge zur Verfügung:

1. **Code generieren:** Nutze unseren interaktiven **[Entitäten-Graph-Generator](/tools/entitaeten-graph-generator/)**. Wähle deinen passenden Branchen-Archetypen (Freiberufler, Handwerksbetrieb, B2B-Dienstleister, Online-Shop oder Praxis) und trage deine Grunddaten ein. Der Generator verknüpft Personen, Organisationen, Angebote und Webseiten automatisch in einem validierten `@graph`-Container.
2. **Qualität prüfen & visualisieren:** Nach dem Einbinden in deinen HTML-Header prüfst du deine Domain im **[Schema-Graph-Visualizer](/tools/schema-graph-visualizer/)**. Das Tool fungiert als Dateninseln-Radar: Es deckt unverbundene Knoten auf, berechnet deinen 3-Ebenen Entity Health Score und vergleicht deinen Ist-Zustand mit dem optimalen Soll-Graphen.
3. **Auditieren & Monitoren:** Um sicherzustellen, dass keine Serverprobleme oder Skriptblockaden die Auslesbarkeit behindern, empfiehlt sich ein regelmäßiges Site-Audit mit **[SE Ranking (Partnerlink)](https://seranking.com/de/?ga=4169588&source=link)**. Wer zusätzlich nachweisen will, wie stark generative Sprachmodelle die erzeugten Entitäten zitierten, greift auf das KI-Monitoring von **[Rankscale (Partnerlink)](https://rankscale.ai/?via=offer)** zurück.

Mit dieser Kombination verwandelst du unstrukturierte Webseiten in mathematisch saubere Wissensquellen, die in klassischen Google-Ergebnissen ebenso wie in generativen KI-Antworten als unverzichtbare Autorität wahrgenommen werden.

<div class="my-10 bg-dark text-white p-6 md:p-8 rounded-3xl border border-white/10 shadow-md relative not-prose">
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-accent text-xs font-bold">
      <span>🌐</span>
      <span>Kostenloser Live-Scanner</span>
    </div>
    <span class="text-xs text-gray-400 font-mono hidden sm:inline">100% kostenlos &amp; ohne Registrierung</span>
  </div>
  <h3 class="text-xl md:text-2xl font-bold text-white mb-2 !mt-0 !border-none !pb-0 leading-snug">
    Deinen Schema.org Graph live im Visualizer prüfen
  </h3>
  <p class="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
    Erkenne isolierte Dateninseln, prüfe deinen 3-Ebenen Entity Health Score und teste, wie Suchmaschinen und KI-Modelle deinen Wissensgraphen wahrnehmen.
  </p>
  <div class="flex flex-wrap items-center gap-4">
    <a href="/tools/schema-graph-visualizer/" class="btn-primary">
      <span>Domain im Visualizer prüfen</span>
      <span aria-hidden="true">→</span>
    </a>
    <a href="/tools/entitaeten-graph-generator/" class="text-xs font-semibold text-gray-400 hover:text-white transition-colors">
      Oder Entitäten Graph Generator nutzen →
    </a>
  </div>
</div>

<div class="my-10 bg-dark text-white p-8 rounded-3xl border border-white/10 text-center shadow-md">
  <h3 class="text-xl md:text-2xl font-bold text-white mb-3 !mt-0 !border-none !pb-0">
    Jetzt an der Diskussion teilnehmen
  </h3>
  <p class="text-gray-300 text-sm max-w-xl mx-auto mb-6">
    Diskutiere mit Jörg Zimmer und der SEO-Community auf LinkedIn über Schema Markup Generatoren, Dateninseln und vernetzte Knowledge Graphs.
  </p>
  <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="btn-primary">
    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    <span>Jörg Zimmer auf LinkedIn kontaktieren</span>
    <span aria-hidden="true">→</span>
  </a>
</div>
