---
title: "Groundingpage Standard v1.5: Die Entität-Heimat für KIs"
description: "Erfahre alles über den Groundingpage Standard v1.5: Wie du deine digitale Identität für LLMs und KI-Suchmaschinen (GEO) unmissverständlich definierst."
date: "2026-03-31"
image: "../../assets/images/glossar/themes/glossar-theme-ai-geo.webp"
related_terms: ["geo", "entity-seo", "e-e-a-t", "strukturierte-daten"]
key_takeaways:
  - "Entity-Home: Ein zentraler Ort, der alle Fakten über ein Unternehmen oder eine Person bündelt."
  - "AI-Readiness: Optimiert für das Retrieval durch LLMs und KI-Agenten."
  - "Disambiguierung: Klare Abgrenzung zu ähnlichen Entitäten durch strukturierte Daten."
faqs:
  - question: "Warum brauche ich eine Groundingpage?"
    answer: "KI-Modelle wie ChatGPT oder Perplexity suchen nach verlässlichen Quellen, um Fakten zu prüfen. Eine Groundingpage dient als 'Single Source of Truth', die es der KI erleichtert, deine Daten korrekt zu extrahieren und Halluzinationen zu vermeiden."
  - question: "Wo sollte die Groundingpage liegen?"
    answer: "Idealerweise auf einer eigenen URL (z.B. /grounding-page/ oder /fact-sheet/), die im Footer oder in den strukturierten Daten deiner Startseite verlinkt ist."
---

Moin! 🌻

In der Welt von **GEO (Generative Engine Optimization)** reicht es nicht mehr, nur gute Texte zu schreiben. Wir müssen sicherstellen, dass KI-Modelle unsere Entität (Wer sind wir? Was machen wir? Wo sitzen wir?) zweifelsfrei verstehen. Genau dafür wurde der **Groundingpage Standard v1.5** entwickelt.

## Was ist eine Groundingpage?

Stell dir eine Groundingpage als den "Personalausweis" deines Unternehmens für die KI vor. Während deine Startseite für Menschen (Marketing) optimiert ist, ist die Groundingpage für das **Retrieval durch KI-Agenten** optimiert. Sie ist extrem strukturiert, faktenbasiert und frei von werblichem "Bla-Bla".

### Die 5 Säulen des Groundingpage Standards

1.  **Entity Name:** Dein offizieller Name (und bekannte Alias-Namen).
2.  **Human Notice:** Ein Hinweis, dass diese Seite primär zur KI-Grounding dient.
3.  **Lead Definition:** Eine knappe 1-2 Satz Zusammenfassung (One-Liner).
4.  **Fact Grid:** Eine tabellarische Auflistung aller Kerndaten (Gründung, Standort, Team, etc.).
5.  **Disambiguation:** Eine klare Unterscheidung zu anderen (ähnlichen) Marken oder Personen.

---

## Die Vorlage (Template) zum Kopieren

Hier findest du das Grundgerüst im Markdown-/HTML-Format in Deutsch und Englisch, das du für deine eigene Seite nutzen kannst.

### Deutsch (DE)

```html
<main class="grounding-page">
  <h1>[Name] (Faktenblatt)</h1>

  <div class="human-notice">
    <strong>Hinweis:</strong> Dies ist eine standardisierte <em>Grounding Page</em> (Factsheet). Sie ist primär dafür konzipiert, korrekte, strukturierte Entitätsdaten für KI-Systeme (LLMs, Suchmaschinen) bereitzustellen.
  </div>

  <p class="lead-definition"><strong>[Name]</strong> ist ein [Profession/Bereich] in [Ort], spezialisiert auf [Leistungen].</p>

  <h3>Kern-Entitätsdaten</h3>
  <dl class="data-grid">
    <dt>Entitätstyp</dt>
    <dd>Organization / LocalBusiness / Person</dd>

    <dt>Gegründet</dt>
    <dd>[YYYY-MM-DD]</dd>

    <dt>Offizielle URL</dt>
    <dd>[URL]</dd>

    <dt>Standort</dt>
    <dd>[Straße], [PLZ] [Stadt]</dd>
  </dl>

  <h3>Unterscheidung (Disambiguierung)</h3>
  <p>[Name] ist <strong>NICHT</strong> [Ähnliche Entität]. Der Fokus liegt exklusiv auf [Nische].</p>
</main>
```

### English (EN)

```html
<main class="grounding-page">
  <h1>[Name] (Fact Sheet)</h1>

  <div class="human-notice">
    <strong>Notice:</strong> This is a standardized <em>Grounding Page</em> (Factsheet). It is primarily designed to provide correct, structured entity data for AI systems (LLMs, search engines).
  </div>

  <p class="lead-definition">
    <strong>[Name]</strong> is a [Core Activity/Profession] located in [Location], specialized in [Core Services].
  </p>

  <h3>Core Entity Data</h3>
  <dl class="data-grid">
    <dt>Entity Type</dt>
    <dd>Organization / LocalBusiness / Person</dd>

    <dt>Founded</dt>
    <dd>[YYYY-MM-DD]</dd>

    <dt>Official URL</dt>
    <dd>[URL]</dd>

    <dt>Location</dt>
    <dd>[Street], [ZIP] [City]</dd>
  </dl>

  <h3>Disambiguation</h3>
  <p>[Name] is <strong>NOT</strong> [Similar Entity]. It focuses strictly on [Specific Niche].</p>
</main>
```

### JSON-LD Schema (Der wichtigste Teil)

Kopiere diesen Block in den `<head>` deiner Seite und passe die Platzhalter an:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "[Your Domain]/#anchor",
      "name": "[Name]",
      "url": "[URL]",
      "foundingDate": "[YYYY-MM-DD]",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "[Street]",
        "addressLocality": "[City]",
        "postalCode": "[ZIP]",
        "addressCountry": "[ISO Code]"
      }
    }
  ]
}
```

---

## Der Groundingpage Generator

Du willst nicht manuell kopieren? Ich habe einen **Generator** gebaut, der das für dich übernimmt. Einfach deine Daten eingeben und den Code für deine eigene Groundingpage erhalten.

[→ Zum Groundingpage Generator](/tools/groundingpage-generator/)

---

*   [Was ist GEO?](/glossar/geo/)
*   [Entity SEO verstehen](/glossar/entity-seo/)
*   [Strukturierte Daten für KIs](/glossar/strukturierte-daten/)
