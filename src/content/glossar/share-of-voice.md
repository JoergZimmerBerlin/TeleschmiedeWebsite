---
title: "Was ist Share of Voice? SEO & AI Voice (2026)"
meta_title: "Share of Voice & Share of Model (2026)"
description: "Was ist Share of Voice? Berechnung von SOV, Share of Search und Share of Model in KI-Suchmaschinen. Formeln, Benchmarks und Metriken. (2026)"
meta_description: "Was ist Share of Voice? Berechnung von SOV, Share of Search und Share of Model in KI-Suchmaschinen. Formeln, Benchmarks und Metriken. (2026)"
date: "2026-08-20"
image: "../../assets/images/glossar/3d-light/glossar-share-of-voice-3d.webp"
image_alt: "3D Illustration Share of Voice in grün und weiß"
category: "E-E-A-T & Offpage"
key_takeaways:
  - "Share of Voice (SOV) quantifiziert den prozentualen Sichtbarkeits- und Konversationsanteil einer Marke im definierten Zielmarkt."
  - "Im Zeitalter generativer KI erweitert sich klassischer SEO-SOV zum Share of Search (Nachfrage) und Share of Model (KI-Zitierungen)."
  - "Ein steigender SOV ist ein anerkannter Frühindikator (Leading Indicator) für nachhaltiges Marktwachstum und betriebswirtschaftlichen Umsatz."
faqs:
  - question: "Wie wird der klassische Share of Voice berechnet?"
    answer: "Die Grundformel lautet: (Eigene Markensichtbarkeit / Gesamte Marktsichtbarkeit aller relevanten Wettbewerber) × 100. Im organischen SEO wird die Sichtbarkeit meist durch CTR-gewichtete Keyword-Rankings multipliziert mit dem monatlichen Suchvolumen ermittelt."
  - question: "Was ist der Unterschied zwischen Share of Voice, Share of Search und Share of Model?"
    answer: "Share of Voice misst die Präsenz in Suchergebnislisten (SERPs) oder Werbeanzeigen. Share of Search quantifiziert das organische Suchvolumen nach dem eigenen Markennamen im Verhältnis zu allen Marken der Branche. Share of Model (SoM) ist der neue Standard für generative KI und misst, wie oft eine Marke von Sprachmodellen in ungestützten Antworten und RAG-Quellen zitiert wird."
  - question: "Warum sind isolierte Traffic-Zahlen ohne SOV irreführend?"
    answer: "Ein Traffic-Wachstum von 10 % erscheint positiv, bedeutet aber einen realen Marktanteilsverlust, wenn das Markt- und Suchvolumen im gleichen Zeitraum um 30 % gewachsen ist. Nur der relative Share of Voice offenbart, ob ein Unternehmen Wettbewerber verdrängt oder schleichend an Boden verliert."
---

In der traditionellen Betriebswirtschaft und im Marketing zählt der **Share of Voice (SOV)** seit Jahrzehnten zu den wichtigsten strategischen Leistungskennzahlen. Wörtlich übersetzt als „Stimmanteil“, beziffert die Metrik den prozentualen Anteil eines Unternehmens an der gesamten Kommunikations- und Sichtbarkeitsleistung innerhalb eines definierten Marktes oder Branchensegments.

Wer den höchsten Share of Voice besitzt, prägt die Wahrnehmung der Zielgruppe und wird im Relevant Set der Käufer als Standardlösung verankert. Mit dem Aufstieg generativer KI-Systeme, Chatbots und autonomer Antwortmaschinen im Jahr 2026 hat sich das Konzept jedoch grundlegend transformiert: Die bloße Präsenz in zehn blauen Links auf Google reicht nicht mehr aus. Heute entscheidet das Zusammenspiel aus organischem Such-SOV, Markennachfrage ([Share of Search]) und der Nennung in Sprachmodellen (**Share of Model**) über den Markterfolg.

## Die Evolution der Kennzahl: Vom Werbebudget zum Algorithmen-Konsens

Ursprünglich stammt das Konzept aus der Offline-Werbung (Print, Radio, TV). Dort war die Berechnung trivial: Man teilte die eigenen Werbeausgaben durch die gesamten Werbeausgaben der Branche (*Share of Spend*).

Mit der Digitalisierung vollzog sich der Wandel hin zu granularen Kontaktpunkten:

1. **Paid SOV (Performance Marketing):** Anteil an bezahlten Werbeeinblendungen (Ad Impressions) im Google-Ads- oder Meta-Auktionssystem (Impression Share).
2. **SEO SOV (Organische Suche):** Anteil am potenziellen Klickvolumen für ein strategisches Keyword-Cluster, basierend auf Klickwahrscheinlichkeiten (CTR-Modellen) und Suchvolumen.
3. **Share of Search (SoS):** Der von Marketing-Forscher Les Binet popularisierte Ansatz, der das Verhältnis von Marken-Suchanfragen im Zeitverlauf analysiert. Ein steigender Share of Search korreliert empirisch nachweisbar mit zukünftigem Marktanteilswachstum.
4. **Share of Model (SoM / AI Share of Voice):** Der 2026 maßgebliche Standard für AEO (Answer Engine Optimization). Er misst den Prozentsatz generativer KI-Antworten (ChatGPT, Perplexity, Gemini, Claude), in denen eine Marke als empfohlene Lösung oder verlässliche Quelle zitiert wird.

## Vergleichstabelle: Die drei Säulen moderner Sichtbarkeitsmessung

Die folgende Übersicht systematisiert die drei relevanten Kennzahlen der heutigen Markenführung:

| Dimension | Share of Voice (SEO) | Share of Search (SoS) | Share of Model (SoM / AI SOV) |
|:---|:---|:---|:---|
| **Fokus** | Sichtbarkeit in Suchmaschinen | Reale Markennachfrage | Autorität & Modell-Empfehlung |
| **Datenquelle** | SERP-Rankings & Suchvolumen | Google Trends / Suchvolumen-APIs | Generative LLM-Outputs & RAG |
| **Kerneinheit** | Geschätzte Klicks / Impressions | Marken-Suchabfragen im Markt | Zitationen in [Promptsets](/glossar/promptset/) |
| **Nutzerverhalten** | Klick auf organischen Link | Aktive Suche nach Markenbegriff | Rezeption synthetischer Antworten |
| **Frühindikator für** | Traffic-Veränderungen | Realer Marktanteil (Sales) | Zukünftige KI-Dominanz & Kauftrends |
| **Kern-Optimierung** | [Topical Authority](/glossar/topical-authority/) & Onpage | PR, Brand Awareness & Vertrauen | [E-E-A-T](/glossar/authoritativeness-eeat/) & [Agent Readiness](/glossar/agent-readiness/) |

## Mathematische Modellierung und universelles Python-Berechnungsskript

Um den Share of Voice (SEO) und Share of Model datenbasiert im Team zu berechnen, empfiehlt sich eine automatisierte Pipeline. 

### Die klassische SEO-SOV Formel

$$\text{SEO SOV} = \frac{\sum (\text{CTR}(\text{Position}_i) \times \text{Suchvolumen}_i)_{\text{Brand}}}{\sum (\text{CTR}(\text{Position}_i) \times \text{Suchvolumen}_i)_{\text{Gesamtmarkt}}} \times 100$$

### Universelles Python-Skript zur SOV- und SoM-Kalkulation

Das folgende neutrale Skript liest Ranking- und LLM-Monitoringdaten ein und berechnet die Kennzahlen für alle Marktteilnehmer:

```python
#!/usr/bin/env python3
"""
Universelles Skript zur Berechnung von Share of Voice (SEO) und Share of Model (AI).
Funktioniert mit beliebigen Marken- und Keyword-Datensätzen.
"""

def calculate_seo_sov(rankings_data: dict, ctr_curve: dict) -> dict:
    """
    Berechnet den organischen Share of Voice auf Basis von Keyword-Rankings.
    """
    market_traffic = {}
    total_market_clicks = 0.0

    for brand, keywords in rankings_data.items():
        brand_clicks = 0.0
        for kw, data in keywords.items():
            rank = data.get("rank", 100)
            vol = data.get("volume", 0)
            ctr = ctr_curve.get(rank, 0.0)
            brand_clicks += vol * ctr
        market_traffic[brand] = brand_clicks
        total_market_clicks += brand_clicks

    if total_market_clicks == 0:
        return {b: 0.0 for b in rankings_data}

    return {b: round((c / total_market_clicks) * 100, 2) for b, c in market_traffic.items()}


def calculate_share_of_model(ai_eval_results: list) -> dict:
    """
    Berechnet den Share of Model (SoM) aus einer Promptset-Evaluierung.
    ai_eval_results: Liste von Dictionaries [ {"prompt_id": 1, "cited_brands": ["BrandA", "BrandB"]} ]
    """
    total_prompts = len(ai_eval_results)
    if total_prompts == 0:
        return {}

    mention_counts = {}
    for res in ai_eval_results:
        for brand in res.get("cited_brands", []):
            mention_counts[brand] = mention_counts.get(brand, 0) + 1

    return {brand: round((count / total_prompts) * 100, 2) for brand, count in mention_counts.items()}


if __name__ == "__main__":
    # Standard-CTR Kurve für Position 1 bis 5
    CTR_MODEL = {1: 0.32, 2: 0.17, 3: 0.10, 4: 0.06, 5: 0.04}

    # Neutrale Beispieldaten zweier Wettbewerber
    sample_rankings = {
        "Brand_Alpha": {"cloud erp": {"rank": 1, "volume": 5000}, "saas buchhaltung": {"rank": 3, "volume": 2000}},
        "Brand_Beta": {"cloud erp": {"rank": 2, "volume": 5000}, "saas buchhaltung": {"rank": 1, "volume": 2000}}
    }

    seo_sov = calculate_seo_sov(sample_rankings, CTR_MODEL)
    print("Organischer SEO Share of Voice (%):", seo_sov)

    sample_ai_results = [
        {"prompt_id": 1, "cited_brands": ["Brand_Alpha"]},
        {"prompt_id": 2, "cited_brands": ["Brand_Alpha", "Brand_Beta"]},
        {"prompt_id": 3, "cited_brands": ["Brand_Beta"]}
    ]
    som_sov = calculate_share_of_model(sample_ai_results)
    print("Share of Model in KI-Antworten (%):", som_sov)
```

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-2xl">
  <p class="font-bold text-lime-800 mb-2">💡 Jörg Zimmer aus der SEO-Praxis:</p>
  <blockquote class="italic text-dark mb-3">
    „SEO ist Markenaufbau. Vergiss alles, was du glaubst, über SEO zu wissen. In diesem Spiel geht darum, eine Marke sichtbar zu machen.“
  </blockquote>
  <a href="https://www.linkedin.com/feed/update/urn:li:activity:6987152268865216512" target="_blank" rel="noopener noreferrer" class="text-sm font-bold text-lime-700 hover:underline inline-block">
    ↗ Zur Diskussion auf LinkedIn
  </a>
</div>

## Die 3 häufigsten Fehler bei der Messung des Share of Voice

In der Unternehmenspraxis führen unzureichende Messmethoden häufig zu falschen strategischen Schlüssen:

1. **Fokus auf ungewichtete Keyword-Listen (Vanity Rankings):** Wer einfach die Anzahl rankender Suchbegriffe zählt, ohne Suchvolumen und Klickraten zu berücksichtigen, verzerrt das Bild. Zehn Top-1-Rankings für Longtail-Begriffe mit je 10 monatlichen Suchen wiegen weniger als Position 3 für ein transaktionales Hauptkeyword mit 20.000 monatlichen Suchen.
2. **Ignorieren generativer KI-Suchräume (Share of Model Blindheit):** Viele Marketingabteilungen feiern stabile organische Klickraten auf Google, übersehen jedoch, dass jüngere B2B-Entscheider Perplexity, Claude oder ChatGPT konsultieren. Wer in diesen Synthese-Antworten nicht als Primärquelle zitiert wird, verliert kaufbereite Leads, bevor sie überhaupt eine Suchmaske öffnen.
3. **Mangelnde Definition des Wettbewerbssets beim Share of Search:** Wird das Marken-Suchvolumen nicht mit allen direkten Konkurrenten in Relation gesetzt, spiegeln Trends rein saisonale Schwankungen wider, statt echte Marktanteilsverschiebungen aufzudecken.

## Strategische Hebel zur Steigerung des SOV im generativen Zeitalter

Um den Share of Voice in modernen Suchumgebungen auszubauen, müssen SEO, Content-Marketing und PR synchronisiert werden. Es geht darum, [Grounding-Queries](/glossar/grounding-queries/) in generativen Systemen zu dominieren und durch lückenlose [Topical Authority](/glossar/topical-authority/) sicherzustellen, dass KI-Modelle das eigene Unternehmen als maßgebliche Fachinstanz identifizieren.

Wie Sie die Markensichtbarkeit in modernen Tools analysieren, erfahren Sie in unserem Guide über die [Top 9 AI Visibility Tools](/blog/top-9-ai-visibility-tools/). Die Wirtschaftlichkeit datengetriebener Kampagnen und Tool-Stacks können Sie transparent mit unserem [SEO-Tool Kostenrechner](/tools/seo-tool-kostenrechner/) bewerten.

