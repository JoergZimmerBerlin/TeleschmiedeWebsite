---
category: 'AI SEO & Generative Search'
title: 'Share of Model (SoM): Die zentrale KI-Sichtbarkeits-KPI'
meta_title: 'Share of Model: Definition & Messung (2026)'
description: 'Was Share of Model (SoM) bedeutet, wie du deine Sichtbarkeit in ChatGPT & Copilot berechnest und warum sie Share of Voice ersetzt. (2026)'
meta_description: 'Was Share of Model (SoM) bedeutet, wie du deine Sichtbarkeit in ChatGPT & Copilot berechnest und warum sie Share of Voice ersetzt. (2026)'
date: '2026-08-21'
image: '../../assets/images/glossar/3d-light/glossar-share-of-model-3d.webp'
image_alt: 'Share of Model Diagramm 3D Infografik - Messung der Markensichtbarkeit in LLMs'
key_takeaways:
  - 'Share of Model (SoM) misst den prozentualen Anteil, zu dem eine Marke in generativen KI-Antworten (ChatGPT, Gemini, Copilot, Perplexity) empfohlen wird.'
  - 'Die Kennzahl löst den traditionellen Share of Voice ab und adressiert die Realität der Zero-Click-Suchen in generativen Antwortmaschinen.'
  - 'Die Ermittlung erfolgt über automatisierte Abfragen eines standardisierten Golden Prompt Sets mit statistischer Aggregation von Erwähnungen und Sentiment.'
faqs:
  - question: 'Was ist der Unterschied zwischen Share of Voice und Share of Model?'
    answer: 'Der klassische Share of Voice (SoV) misst den sichtbaren Werbe- und Suchergebnis-Anteil auf klassischen Plattformen wie den Google-SERPs (z. B. Anteil an Impressionen oder Klicks). Der Share of Model (SoM) misst hingegen die semantische Präsenz im synthetisierten Output von Sprachmodellen: Wie oft wird deine Marke als Lösungsvorschlag genannt, wenn ein Nutzer ein Problem beschreibt, ohne dass dafür ein Klick auf einen blauen Link nötig ist.'
  - question: 'Wie wird der Share of Model mathematisch berechnet?'
    answer: 'Die grundlegende Formel lautet: (Anzahl der Antworten mit Markennennung geteilt durch die Gesamtzahl aller Antworten im Prompt-Set) multipliziert mit 100. Fortgeschrittene Modelle gewichten diese Zahl zusätzlich anhand der Position innerhalb einer Empfehlungsliste (Rank-Order) und des Sentiments (positiv, neutral oder negativ).'
  - question: 'Was unterscheidet eine Markennennung (Mention) von einer Zitation (Citation)?'
    answer: 'Eine Mention liegt vor, wenn das Sprachmodell den Markennamen im Fließtext nennt (z. B. "Beliebte Tools sind Anbieter X und Y"). Eine Citation bedeutet, dass das Modell über RAG aktiv auf die Website der Marke verlinkt oder diese als explizite Datenquelle ausweist. Citations belegen eine noch höhere wahrgenommene Autorität.'
  - question: 'Welche Tools eignen sich zur Messung von Share of Model?'
    answer: 'Spezialisierte Plattformen wie Rankscale, Profound, Otterly.AI oder die AI-Visibility-Module von SE Ranking automatisieren das tägliche Senden hunderter Prompts an verschiedene LLMs und berechnen aggregierte SoM-Dashboards.'
---

Der digitale Vertrieb und das Suchmaschinenmarketing erleben eine fundamentale Verschiebung der Nutzergewohnheiten. Über zwei Jahrzehnte hinweg war die Customer Journey linear geprägt: Ein Nutzer tippte Keywords in eine Suchmaschine, scannte eine Liste aus zehn blauen Links und klickte auf das attraktivste Snippet. Im Jahr 2026 übernimmt künstliche Intelligenz zunehmend die Rolle des Kurators. Plattformen wie ChatGPT, Microsoft Copilot, Perplexity und Google AI Overviews generieren ganzheitliche Antworten, vergleichen Angebote direkt und sprechen konkrete Kaufempfehlungen aus.

Wenn Nutzer ihre Fragen ohne Klick auf eine Website beantwortet bekommen ([Zero-Click-Content](/glossar/zero-click-content/)), verlieren herkömmliche Web-Metriken wie organische Sitzungen und Impressionen ihre Aussagekraft. Unternehmen stehen vor der Herausforderung: Wie misst man den geschäftlichen Erfolg, wenn die eigene Marke zwar hunderte Male von einer KI empfohlen wird, der Nutzer aber erst beim finalen Kaufabschluss die Website betritt? Die Antwort auf diese Frage liefert eine neue Kennzahl: der **Share of Model (SoM)**.

## Was bedeutet Share of Model und wie ist die Metrik definiert?

Der **Share of Model** beziffert den prozentualen Anteil, zu dem eine Marke oder ein Produkt in den synthetisierten Antworten eines Large Language Models (LLM) präsent ist, bezogen auf ein definiertes Spektrum an kaufrelevanten Benutzer-Prompts.

Während klassische Ranking-Faktoren die Position auf einer statischen Ergebnisseite bewerten, misst der Share of Model die Verankerung einer Entität in den latenten Wissensräumen und Retrieval-Pipelines der KI. Wenn ein B2B-Einkäufer die Frage stellt: *„Welche Enterprise-SEO-Plattformen eignen sich für internationale E-Commerce-Konzerne?“*, entscheidet der Share of Model darüber, ob deine Marke als führende Lösung präsentiert oder komplett übergangen wird.

## Direkter Vergleich: Share of Voice vs. Share of Search vs. Share of Model

Um die strategische Bedeutung einzuordnen, hilft der Vergleich der drei zentralen Marktdurchdringungs-KPIs der Marketing-Historie:

| Kennzahlen-Dimension | Share of Voice (SoV) | Share of Search (SoS) | Share of Model (SoM) |
|:---|:---|:---|:---|
| **Kanal-Fokus** | Display, Print, Google Ads & SERPs | Google-Suchvolumen-Trends | **LLMs, Chatbots & Answer Engines** |
| **Erhebungsbasis** | Werbeausgaben & SERP-Sichtbarkeit | Aggregierte Keyword-Abfragen | **Synthetisierte Modell-Antworten** |
| **Nutzerverhalten** | Klick-basiert (Traffic auf Ziel-URL) | Suchanfragen-basiert | **Zero-Click & Chat-Dialoge** |
| **Dynamik** | Weitgehend deterministisch | Periodisch schwankend | **Probabilistisch (Sampling-Bedarf)** |
| **Qualitätskriterium**| Anzeigenposition & Klickrate | Relativer Suchmarktanteil | **Sentiment, Rang & Zitationsstatus** |

Der [Share of Voice](/glossar/share-of-voice/) erfasst das Rauschen im Kanal, während der Share of Model die tatsächliche Relevanz im Moment der KI-Synthese abbildet.

## Methodik: Wie wird der Share of Model in der Praxis gemessen?

Da Sprachmodelle nicht-deterministisch operieren – dieselbe Frage kann bei leicht veränderten Parametern (Temperature, Top-p) unterschiedliche Antworten hervorrufen –, kann der Share of Model nicht über eine einzelne Abfrage bestimmt werden. Die Ermittlung folgt einem statistischen Vier-Stufen-Prozess:

1.  **Definition des Golden Prompt Sets:** Zusammenstellung von 50 bis 200 standardisierten Benutzerfragen ([Promptset](/glossar/promptset/)), die reale Kaufphasen (Top-, Middle- und Bottom-of-Funnel) abdecken.
2.  **Multimodale Abfrage-Automation:** Regelmäßiges, automatisiertes Senden der Prompts über APIs an unterschiedliche Modelle (OpenAI GPT-4o, Anthropic Claude 3.5, Google Gemini 1.5 Pro, Perplexity).
3.  **Entity- & Sentiment-Parsing:** Automatisierte Auswertung des generierten Texts. Registriert wird: Wurde die Marke genannt? An welcher Listenposition steht sie? Ist der Tenor positiv oder warnend?
4.  **Mathematische Aggregation:** Berechnung der Kennzahl nach der Standardformel:

$$\text{Share of Model (\%)} = \left( \frac{\text{Erwähnungen der eigenen Marke}}{\text{Gesamtzahl aller Markennennungen}} \right) \times 100$$

### Praxis-Beispiel: Python-Skript zur automatisierten SoM-Erhebung

Moderne SEO- und Data-Teams setzen auf automatisierte Auswertungs-Pipelines. Das folgende vereinfachte Python-Beispiel demonstriert, wie die Auswertung eines Prompt-Ergebnisses strukturiert erfolgt:

```python
def berechne_share_of_model(prompt_antworten, ziel_marke):
    total_abfragen = len(prompt_antworten)
    erwaehnungen = 0
    zitationen = 0
    
    for antwort in prompt_antworten:
        text = antwort.get("text", "").lower()
        quellen = antwort.get("citations", [])
        
        # Prüfung auf Nennung im generierten Antworttext
        if ziel_marke.lower() in text:
            erwaehnungen += 1
            
        # Prüfung auf direkte URL-Zitation (RAG)
        if any(ziel_marke.lower() in quelle for quelle in quellen):
            zitationen += 1
            
    som_quote = (erwaehnungen / total_abfragen) * 100 if total_abfragen > 0 else 0
    citation_quote = (zitationen / total_abfragen) * 100 if total_abfragen > 0 else 0
    
    return {
        "marke": ziel_marke,
        "share_of_model_prozent": round(som_quote, 2),
        "citation_rate_prozent": round(citation_quote, 2)
    }
```

Die Ergebnisse fließen in fortlaufende Dashboards ein, um Schwankungen nach Modell-Updates sofort zu erkennen.

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-2xl">
  <p class="font-bold text-lime-800 mb-2">💡 Jörg Zimmer aus der SEO-Praxis:</p>
  <blockquote class="italic text-dark mb-3">
    „Wer anhand von Daten seine Marketingausgaben dem Nutzen gegenüberstellt, wird zum Sehenden unter den Blinden.“
  </blockquote>
  <a href="https://www.linkedin.com/feed/update/urn:li:activity:7019828915183452160" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-lime-700 hover:underline">
    ↗ Zur Diskussion auf LinkedIn
  </a>
</div>

## Die 3 häufigsten Fehler bei der Erhebung des Share of Model

Beim Monitoring generativer Suchsysteme treten regelmäßig methodische Schwachstellen auf:

1. **Unzureichende Prompt-Diversität:** Wer nur generische Kurzfragen testet („beste SEO Agentur“), erhält verzerrte Werte. Reale Nutzer stellen vielschichtige Prompts mit Randbedingungen („beste SEO Agentur für B2B SaaS Relaunch in Berlin mit 50k Budget“).
2. **Vernachlässigung des Sentiments:** Ein Share of Model von 40 Prozent nützt nichts, wenn die KI das Produkt als Negativbeispiel für überteuerte Software oder mangelnden Datenschutz aufführt. Sentiment-Analyse ist Pflicht.
3. **Fokussierung auf ein einziges Sprachmodell:** ChatGPT, Copilot und Perplexity nutzen grundlegend unterschiedliche Indexierungs- und Reranking-Mechanismen. Aussagekräftige Kennzahlen erfordern ein Multi-Modell-Tracking.

## Der gewichtete Share of Model: Position und Sentiment im Fokus

In der Unternehmenspraxis reicht eine rein binäre Betrachtung („Erwähnt: Ja/Nein“) selten aus. Ein qualitativ hochwertiges Reporting gewichtet die Markennennung nach zwei kritischen Dimensionen:

1.  **Rang-Gewichtung (Position Bias):** Wird eine Marke an erster Stelle einer Aufzählung genannt, genießt sie beim Nutzer die höchste Aufmerksamkeit. Platz 1 wird mit einem Gewichtungsfaktor von $1{,}0$ multipliziert, Platz 2 mit $0{,}7$ und Platz 3 mit $0{,}4$. Nennungen ab Platz 4 fließen nur noch mit $0{,}2$ in den Index ein.
2.  **Sentiment-Multiplikator:** Sprachmodelle formulieren häufig Nuancen. Eine Empfehlung mit dem Zusatz *„Bester Gesamtsieger für Enterprise-Kunden“* erhält einen positiven Multiplikator ($+1{,}0$). Wird das Produkt jedoch mit Einschränkungen versehen (*„Häufige Beschwerden über langsamen Support“*), wird der Wert auf $-0{,}5$ abgewertet.

Durch diese Differenzierung entsteht der **Weighted Share of Model (W-SoM)**, der ein ungeschminktes Bild der tatsächlichen Markenstärke in generativen Suchumgebungen liefert.

## Strategische Optimierung: Wie steigert man den Share of Model?

Die Steigerung des Share of Model ist die Kernaufgabe der Generative Engine Optimization (GEO). Da LLMs auf Konsens und Entitäts-Autorität trainiert sind, lässt sich die Kennzahl nicht durch isolierte Keyword-Dichte manipulieren. Erforderlich ist der Aufbau unerschütterlicher [Topical Authority](/glossar/topical-authority/) durch Co-Occurrences auf anerkannten Branchenportalen, Wikipedia-Verknüpfungen und strukturierte Daten.

Zur kontinuierlichen Überwachung empfiehlt sich der Einsatz professioneller Software aus unserem [Vergleich der Top 9 AI Visibility Tools](/blog/top-9-ai-visibility-tools/) oder spezialisierter [LLM Rank Tracker](/glossar/llm-rank-tracker/). Sämtliche Lizenz- und Entwicklungskosten für moderne Analyse-Pipelines lassen sich im [SEO-Tool Kostenrechner](/tools/seo-tool-kostenrechner/) transparent kalkulieren.
