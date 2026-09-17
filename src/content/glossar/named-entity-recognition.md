---
category: 'AI SEO & Generative Search'
title: 'Named Entity Recognition (NER): Wie KI Entitäten versteht'
meta_title: 'Named Entity Recognition (NER) & SEO (2026)'
description: 'Named Entity Recognition (NER) im SEO: Wie Google NLP & LLMs Personen, Firmen und Orte im Text erkennen und wie du Salienz gezielt steuerst. (2026)'
meta_description: 'Named Entity Recognition (NER) im SEO: Wie Google NLP & LLMs Personen, Firmen und Orte im Text erkennen und wie du Salienz gezielt steuerst. (2026)'
sameAs: 'https://www.wikidata.org/wiki/Q380971'
date: '2026-03-11'
image: '../../assets/images/glossar/3d-light/glossar-named-entity-recognition-3d.webp'
image_alt: 'Named Entity Recognition im NLP und Entity SEO'
synonyms:
  - 'Named Entity Recognition'
  - 'NER SEO'
  - 'Entitätserkennung'
  - 'Natural Language Processing NER'
related_terms:
  - 'entitaet'
  - 'entity-seo'
  - 'semantische-suche'
  - 'disambiguierung'
  - 'knowledge-graph'
  - 'wikidata'
  - 'confidence-score'
key_takeaways:
  - 'Named Entity Recognition (NER) ist ein NLP-Verfahren, das Entitäten (Personen, Organisationen, Orte, Produkte) aus unstrukturiertem Fließtext extrahiert.'
  - 'Google nutzt NER und die Cloud Natural Language API, um die thematische Salienz (Wichtigkeit) von Entitäten auf Webseiten zu bestimmen.'
  - 'Eine hohe Salienz der Ziel-Entität signalisiert Suchmaschinen und LLMs, worum es im Kern des Dokuments wirklich geht.'
  - 'Durch maschinenlesbares Schema.org JSON-LD Markup nimmst du KI-Systemen die Interpretationsarbeit ab und verhinderst Extraktionsfehler.'
faqs:
  - question: 'Was ist Named Entity Recognition (NER) genau?'
    answer: 'NER ist eine Schlüsseltechnologie des Natural Language Processing (NLP). Ein Algorithmus scannt unstrukturierten Text, identifiziert benannte Entitäten (wie Personen, Marken, Orte, Datumsangaben) und ordnet diese vordefinierten semantischen Kategorien zu.'
  - question: 'Welche Rolle spielt Salienz (Salience) bei der Entitätserkennung?'
    answer: 'Salienz ist ein Wert zwischen 0 und 1 (bzw. 0 % bis 100 %), der angibt, wie zentral eine Entität für das gesamte Dokument ist. Eine Entität in der H1-Überschrift, im ersten Absatz und in Kernargumenten erzielt eine wesentlich höhere Salienz als eine beiläufige Randnotiz.'
  - question: 'Wie kann ich die Entitäten meiner Website analysieren?'
    answer: 'Über die offizielle Google Cloud Natural Language API (oder deren kostenlose Web-Demo). Dort fügst du deinen Text ein und siehst in Echtzeit, welche Entitäten Google erkennt, wie sie kategorisiert werden und welche Salienz ihnen zugewiesen wird.'
  - question: 'Was ist der Unterschied zwischen NER und Entity Linking?'
    answer: 'NER erkennt und klassifiziert die Entität im Text (z. B. „Berlin = Location“). Entity Linking geht einen Schritt weiter und verknüpft diese erkannte Entität eindeutig mit einem Wissensknoten in einer Datenbank wie Wikidata oder dem Google Knowledge Graph.'
---

## Was ist Named Entity Recognition (NER)?

Die **Named Entity Recognition (NER)** – im Deutschen auch als *Entitätserkennung* bezeichnet – ist eine grundlegende Disziplin des Natural Language Processing (NLP) und des Machine Learning. Sie beschreibt die Fähigkeit von Algorithmen, in unstrukturierten Textdokumenten benannte [Entitäten](/glossar/entitaet/) (wie Personen, Unternehmen, Orte, Produkte, Kunstwerke oder Datumsangaben) automatisch zu lokalisieren und präzisen semantischen Klassen zuzuordnen.

Für moderne Suchmaschinen und generative Antwortsysteme ist NER das entscheidende Werkzeug, um den Übergang von der reinen Textsuche zur [semantischen Suche](/glossar/semantische-suche/) zu meistern. Wenn Google, ChatGPT oder Perplexity einen Webseitentext crawlen, zählen sie keine Keyword-Wiederholungen mehr. Sie zerlegen den Text mithilfe von NER in seine semantischen Bausteine, analysieren die Beziehungen der erkannten Entitäten und gleichen diese mit dem globalen [Knowledge Graph](/glossar/knowledge-graph/) ab.

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
    „Durch die Analyse von Daten kann man das Verhalten und die Wünsche der Zielgruppe besser verstehen und die Marketingstrategie entsprechend anpassen.“
  </blockquote>
  <figcaption class="mt-4 pt-3 border-t border-neutral-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
    <span>Experten-Zitat • <cite class="not-italic font-semibold text-neutral-700">Jörg Zimmer</cite></span>
    <a href="https://www.linkedin.com/feed/update/urn:li:activity:7019828915183452160" target="_blank" rel="noopener noreferrer" class="font-bold text-lime-700 hover:underline inline-flex items-center gap-1">
      Quelle auf LinkedIn ansehen →
    </a>
  </figcaption>
</figure>

---

## Wie NER funktioniert: Vom Fließtext zur semantischen Karte

Der Prozess der Entitätserkennung durchläuft im NLP-Modell mehrere aufeinander aufbauende Phasen:

```
[ Unstrukturierter Webtext: "Jörg Zimmer leitet SEO-Projekte in Berlin." ]
                                   │
                                   ▼
+-------------------------------------------------------------------------+
|  1. Tokenisierung & Part-of-Speech Tagging                              |
|  Identifikation von Eigennamen, Verben, Substantiven und Satzstrukturen |
+-------------------------------------------------------------------------+
                                   │
                                   ▼
+-------------------------------------------------------------------------+
|  2. Klassifikation (Named Entity Recognition)                           |
|  "Jörg Zimmer" -> PERSON | "Berlin" -> LOCATION | "SEO" -> TOPIC        |
+-------------------------------------------------------------------------+
                                   │
                                   ▼
+-------------------------------------------------------------------------+
|  3. Salienz-Berechnung (Salience Score)                                 |
|  Gewichtung der Wichtigkeit der Entitäten im Kontext des Dokuments       |
+-------------------------------------------------------------------------+
                                   │
                                   ▼
+-------------------------------------------------------------------------+
|  4. Entity Linking & Disambiguierung                                    |
|  Abgleich mit Wikidata (Q-IDs) und Zuweisung im Knowledge Graph         |
+-------------------------------------------------------------------------+
```

1. **Tokenisierung:** Der Text wird in einzelne Spracheinheiten zerlegt.
2. **Klassifikation:** Machine-Learning-Klassifikatoren ordnen den Tokens Entitätstypen zu (`PERSON`, `ORGANIZATION`, `LOCATION`, `EVENT`, `CONSUMER_GOOD`).
3. **Salience (Salienz):** Algorithmen ermitteln anhand syntaktischer Tiefe und Position, welche Entität das Hauptthema darstellt.
4. **Entity Linking:** Über [Disambiguierung](/glossar/disambiguierung/) wird die identifizierte Entität mit externen Knoten wie [Wikidata](/glossar/wikidata/) verknüpft.

---

## Salienz: Der geheime Rankingfaktor im semantischen SEO

Viele Webseiten ranken nicht für ihre Wunschthemen, weil ihre Entitäten-Salienz verwässert ist. Wenn du einen Artikel über *„Enterprise SEO Beratung“* verfasst, aber 60 % des Textes über allgemeine Büromöbel oder IT-Infrastruktur sprichst, stuft die Google NLP API die falschen Entitäten als hochsalient ein.

Für erstklassige Zitationschancen in KI-Overviews und hohe Rankings im [Entitäten SEO](/glossar/entity-seo/) gilt:

* **Fokussierte Spitzenpositionierung:** Die Hauptentität muss in der H1-Überschrift, der Einleitung und den ersten 150 Wörtern klar etabliert sein.
* **Semantisches Co-Occurrence Netzwerk:** Verwende fachlich eng verwandte Entitäten, die das Thema logisch stützen.
* **Hohe Salienzwerte:** In Tests mit der Google Natural Language API sollte deine Ziel-Entität einen Salience-Wert von über 0.30 bis 0.50 aufweisen.
* **Robuste Faktenbasis:** Je konsistenter deine Aussagen mit der Ground Truth übereinstimmen, desto höher fällt der [Confidence Score](/glossar/confidence-score/) aus.

---

## Quellcode schlägt Textinterpretation: Schema.org als NER-Abkürzung

Obwohl NLP-Systeme hochentwickelt sind, beruht Textanalyse stets auf Wahrscheinlichkeiten. Crawler müssen raten und interpretieren. Mit strukturiertem [Schema.org Markup](/glossar/schema-org-markup/) nimmst du der Suchmaschine diese Unsicherheit vollständig ab.

Indem du deine Entitäten direkt im JSON-LD-Format deklarierst, lieferst du die NER-Klassifikation und das Entity Linking vorab servierfertig mit. Nutze einen modernen [Schema Markup Generator](/glossar/schema-markup-generator/) oder baue deine Relationen mit unserem interaktiven [Entitäten Graph Generator](/tools/entitaeten-graph-generator/). Die visuelle Überprüfung verwaister Knoten gelingt nahtlos im [Schema Graph Visualizer](/tools/schema-graph-visualizer/).

---

## Die offizielle Agentenbox: Content Entity Extraction & Salience Optimierung

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
    Kopiere diesen Prompt direkt in deinen KI-Coding-Assistenten, um deinen Web-Content auf maximale Entitäten-Salienz und NLP-Konformität zu optimieren:
  </p>
  <div class="bg-black/60 p-4 rounded-xl border border-white/10 text-xs font-mono text-gray-200 overflow-x-auto space-y-2">
    <p class="text-lime-accent font-bold mb-1"># Prompt: NER & Salience Content-Optimierung</p>
    <p><strong>Rolle:</strong> Du bist ein hochspezialisierter NLP Content Architect und Entity SEO Engineer.</p>
    <p><strong>Aufgabe:</strong> Analysiere den Seiteninhalt aus der Perspektive der Google Natural Language API. Identifiziere alle benannten Entitäten, berechne deren relative Salienz und optimiere den Text sowie das Schema-Markup für maximale thematische Relevanz.</p>
    <p class="text-lime-accent font-semibold pt-1"># Vorgehensweise & Sicherheitsregeln:</p>
    <p><strong>1. Tech-Stack- & Content-Analyse:</strong> Untersuche den Zieltext auf Haupt- und Nebenentitäten (Personen, Marken, Produkte, Standorte). Ermittle potenziell verwässernde Fremdentitäten.</p>
    <p><strong>2. Defensive & harmonische Optimierung:</strong> Strukturiere Absätze so um, dass die Primärentität in Überschriften und Kernsätzen führend bleibt, ohne den natürlichen Lesefluss zu stören.</p>
    <p><strong>3. Standard- & Schema-Verknüpfung:</strong> Übertrage die wichtigsten erkannten Entitäten in die 'about'- und 'mentions'-Eigenschaften des Article-Schemas mit direkten Wikidata-URIs.</p>
    <p><strong>4. Pre-Flight-Validierung:</strong> Überprüfe den Output auf semantische Klarheit und validiere das JSON-LD Markup im Schema Validator auf Fehlerfreiheit.</p>
    <p class="pt-1"><strong>Output:</strong> 1. Entitäten-Audit mit Salienz-Einschätzung, 2. Text-Optimierungsvorschläge, 3. Relationaler Schema.org Code-Diff.</p>
  </div>
</div>

---

<div class="my-10 bg-dark text-white p-8 rounded-3xl border border-white/10 text-center shadow-md">
  <h3 class="text-xl md:text-2xl font-bold text-white mb-3 !mt-0 !border-none !pb-0">
    Jetzt an der Diskussion teilnehmen
  </h3>
  <p class="text-gray-300 text-sm max-w-xl mx-auto mb-6">
    Diskutiere mit Jörg Zimmer und der SEO-Community auf LinkedIn über Named Entity Recognition, NLP und die Zukunft semantischer Suchmaschinen.
  </p>
  <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="btn-primary">
    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    <span>Beitrag auf LinkedIn öffnen</span>
    <span aria-hidden="true">→</span>
  </a>
</div>
