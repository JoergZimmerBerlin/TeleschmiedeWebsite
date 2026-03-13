---
title: "Entität (Entity)"
description: "Eine Entität ist ein eindeutig identifizierbares Objekt – wie eine Person, ein Ort oder ein Konzept. Sie ist der Grundbaustein der modernen semantischen Suche."
date: "2026-03-10"
image: "../../assets/images/glossar/themes/glossar-theme-technical.webp"
related_terms: ["knowledge-graph", "mention", "geo"]
key_takeaways:
  - "Vom Wort zum Ding: Google versteht die Welt heute in Objekten (Entitäten), nicht nur in Zeichenketten."
  - "Semantische Vernetzung: Eine Entität wird durch ihre Beziehungen zu anderen Objekten definiert."
  - "KI-Treiber: GEO basiert fast vollständig auf der Identifizierung und Validierung von Entitäten."
faqs:
  - question: "Ist meine Website automatisch auch eine Entität?"
    answer: "Nein, nicht automatisch. Deine Website wird im Knowledge Graph meist dem Typ 'WebSite' zugeordnet, aber der eigentliche Entity-Status bezieht sich auf dein Unternehmen ('Organization') oder dich als Person ('Person'). Damit Google dich als echte Entität begreift, musst du konsistente Signale senden: sauberes Schema.org Markup, eine strukturierte Grounding Page und stetige Erwähnungen in deinem Themenumfeld. Erst dann wandelst du dich von einer simplen URL zu einem anerkannten Konzept im Semantic Web."
  - question: "Wie prüfe ich, ob Google mich als Entität erkannt hat?"
    answer: "Der offensichtlichste Beweis ist ein eigenes Knowledge Panel in den Google-Suchergebnissen, wenn du nach deinem Markennamen suchst. Ein weiterer starker Indikator ist, wenn Google in der automatischen Suchvervollständigung (Google Suggest) deinen Namen vorschlägt und ihn direkt kategorisiert (z.B. 'Jörg Zimmer SEO'). Für eine tiefe technische Analyse nutze ich das Google Knowledge Graph Search API, um abzufragen, mit welchem Confidence-Score eine bestimmte Entität im Google-System verankert ist."
  - question: "Helfen Backlinks beim Aufbau meines Entity-Status?"
    answer: "Definitiv, aber die Qualität und der Kontext sind hier noch entscheidender als beim klassischen SEO. Ein Link von einer vertrauenswürdigen Fachseite in deiner Nische bestätigt Google, dass du ein relevanter Knotenpunkt in diesem thematischen Netzwerk bist ('Co-Occurrence'). Noch wichtiger sind sogenannte Citations und ungelinkte Brand Mentions in starken Medien – sie trainieren KI-Systeme und festigen deinen Status als Autorität in deinem Fachgebiet, auch ganz ohne Hyperlink."
---

Früher verstand Google das Internet als eine Ansammlung von Zeichenketten (Strings). Wenn jemand nach "Apple" suchte, suchte der Algorithmus nach Seiten, auf denen das Wort oft vorkam. Heute versteht Google die Welt in **Entitäten** (Things, not Strings).

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <p class="font-bold text-lime-600 mb-2"> Jörgs SEO-Klartext (LinkedIn Insights)</p>
  <p class="italic text-dark mb-0">"AI-Strategie ist Chefsache, keine Aufgabe für den Praktikanten am Freitagnachmittag."</p>
</div>

Eine Entität ist ein Ding oder ein Konzept, das singulär, einzigartig und von anderen Dingen klar unterscheidbar ist. "Apple Inc." ist eine Entität (ein Unternehmen), "Apfel" ist eine Entität (eine Frucht), "Steve Jobs" ist eine Entität (eine verstorbene Person). Die moderne SEO-Arbeit dreht sich fast ausschließlich darum, Google dabei zu helfen, deine Identität als Entität zweifelsfrei zu begreifen und sie im [Knowledge Graph](/glossar/knowledge-graph/) richtig zu verknüpfen. Mit dem [Entity-Tracking von Rankscale](https://rankscale.ai/?via=offer) messen wir heute den Erfolg: KI-Systeme erkennen deine Marke präzise als Entität.

## Die drei Merkmale einer starken Entität

Damit Google eine Entität versteht, muss sie drei Kriterien erfüllen:

1.  **Identität:** Sie muss eindeutig benannt sein. (Beispiel: Jörg Zimmer, SEO Freelancer).
2.  **Typologie:** Sie muss einer Kategorie zugeordnet werden können (z.B. Person, LocalBusiness, Produkt).
3.  **Beziehungen (Nodes & Edges):** Die Entität muss mit anderen bekannten Entitäten verknüpft sein. (Beispiel: Jörg Zimmer *arbeitet in* Berlin, *kennt sich aus mit* [PageSpeed](/glossar/pagespeed/), *veröffentlicht auf* LinkedIn).

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <h4 class="text-xl font-bold text-dark mb-2 mt-0">Info-Box: Disambiguierung (Eindeutigkeit)</h4>
  <p class="mb-0 text-sm">Eines der größten Probleme für SEOs ist die Mehrdeutigkeit. Heißt dein Unternehmen wie ein gebräuchliches deutsches Wort (z.B. "Schildkröte GmbH"), musst du massiv daran arbeiten, deine Marke als eigenständige geschäftliche Entität von der biologischen Entität abzugrenzen. Hierbei helfen <a href="/glossar/citation/" class="underline font-semibold text-lime-600 hover:text-lime-700">Citations</a> und semantisches Markup radikal.</p>
</div>

## Wie man zur Entität für Google wird

Der wichtigste Hebel ist die maschinenlesbare Deklaration. Google ist intelligent, aber wir sollten den Algorithmus nicht raten lassen.

*   **Strukturierte Daten (Schema.org):** Nutze JSON-LD Markup auf deiner Website, um explizit zu sagen: `"@type": "Person"` oder `"@type": "Organization"`. Verweise dabei auf externe Identitäten wie dein Wikipedia-Profil oder deinen LinkedIn-Account (`sameAs` Attribut).
*   **Thematische Autorität (Topical Authority):** Veröffentliche nicht wahllos Content. Werde zum Experten für ein spezifisches Cluster. Wenn dein Name (Mention) immer im Kontext von "lokalem SEO" fällt, festigt das deine Entitäts-Rolle in diesem Bereich.
*   **Google Business Profile:** Für lokale Firmen ist dies der offizielle "Geburtsschein" als Entität im Google-Universum.

## Entitäten im Kontext von KI und GEO

Moderne KI-Sprachmodelle (LLMs) wie ChatGPT navigieren durch einen sogenannten Vektorraum. In diesem Raum liegen Konzepte (Entitäten) nah beieinander, wenn sie semantisch miteinander verwandt sind. 

In der [Generative Engine Optimization (GEO)](/glossar/geo/) optimieren wir nicht mehr auf Keywords, sondern auf "Entitäts-Verbindungen". Dein Ziel ist es, dass eine KI deine Marke im Vektorraum so nah wie möglich an das Problem deines Kunden rückt. Wenn der Kunde fragt: "Wer hilft mir bei [Core Web Vitals](/glossar/core-web-vitals/)?", muss deine Entität so stark mit dem Konzept "PageSpeed" verknüpft sein, dass die KI gar nicht umhin kommt, dich zu nennen. Wie ich in meinem Artikel zu den [AI-SEO Praktikanten](/blog/ai-seo-geo-praktikanten/) warnte: Wer kein klares Entitäts-Profil hat, wird von der KI ignoriert.

### Zusammenfassung

Entitäten sind die neue Währung der Suche. Google möchte nicht mehr nur nach passenden Worten suchen, sondern Antworten auf Konzepte liefern. Werde für Google zu einer greifbaren, eindeutigen und hochgradig vernetzten Entität. Sorge für konsistente Daten im Netz, nutze Schema-Markup und positioniere dich als unangefochtener Experte in deiner Nische. Wenn Google weiß, *wer* du bist, folgen die Rankings fast von ganz alleine.


### Lese-Tipp
* **Lese-Tipp:** [Keywörter (Keywords)](/glossar/keywoerter/)
* **Lese-Tipp:** [Semantic SEO einfach erklärt](/glossar/semantic-seo/)

---

<div class="mt-20 p-8 bg-gray-50 border border-gray-100 rounded-3xl text-center">
  <h3 class="text-2xl font-bold mb-4">LinkedIn von Jörg Zimmer folgen</h3>
  <p class="text-gray-muted mb-6">Täglich frische SEO-Insights, glasklarer Fokus und kein Bullshit. Diskutiere mit anderen Experten.</p>
  <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="btn-primary inline-flex">Jetzt auf LinkedIn folgen </a>
</div>
