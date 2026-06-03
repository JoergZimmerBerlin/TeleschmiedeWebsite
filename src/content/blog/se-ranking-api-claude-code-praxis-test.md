---
title: "SE Ranking API - Der Praxis-Test"
description: "Praxis-Test: So nutze ich die SE Ranking API und Claude Code für SEO-Analysen. Alle Infos zu Kosten, Credits und Endpunkten für deine Domains."
date: "2026-04-29"
image: "../../assets/images/blog/seranking-praxistest-hero.webp"
image_alt: "SE Ranking API Praxis-Test - drei Domains im Vergleich mit Claude Code"
category: "Tech SEO & Tools"
tags: ["Case Study", "API", "Keyword-Analyse", "Praxis"]
related_posts: ["se-ranking-api-claude-code-setup", "se-ranking-api-endpunkte-kompass", "se-ranking-preise"]
key_takeaways:
  - "~3.721 Credits, ~0,59 Euro für drei komplette Keyword- und Backlinks-Analysen - Endpunkt für Endpunkt nachvollziehbar, kein Credit verschwendet."
  - "prinodi.de lieferte als einzige Domain echte Nutzerfragen zurück - 10 FAQ-Themen die direkt in Artikel fließen können. Der unterschätzteste Endpunkt der SE Ranking API."
  - "Meine eigene Seite rankt für 'se ranking preise' in Top 1-5 - das wusste ich nicht, bevor die API mir das gezeigt hat."
faqs:
  - question: "Welche SEO-Daten liefert die SE Ranking API bei einer Domain-Analyse?"
    answer: "Die SE Ranking API liefert dir einen massiven Datensatz für jede SEO-Analyse. Du bekommst nicht nur grundlegende Metriken wie die organische Sichtbarkeit und den Traffic-Wert, sondern kannst extrem tief in das Keyword-Profil und die Backlinks eintauchen. Von Long-Tail-Suchanfragen über exakte Wettbewerbsdaten bis hin zu W-Fragen der Nutzer - die API bündelt alles, was du für eine fundierte Strategie brauchst."
  - question: "Was kostet eine komplette Domain-Analyse mit der SE Ranking API in Credits?"
    answer: "Das ist das Schöne an diesem Setup: Du behältst die volle Kostenkontrolle. Eine umfassende Analyse mit sechs Endpunkten (Overview, Keywords, Related, Questions, Longtail, Competitors) kostet im Schnitt zwischen 1.100 und 1.400 Credits. In meinem 24M-Credits-Tarif entspricht das extrem günstigen 15 bis 22 Cent pro Domain. So wird SEO-Automatisierung für Agenturen und Freelancer extrem rentabel."
  - question: "Warum ist Claude Code das perfekte Tool für diesen Praxis-Test?"
    answer: "Claude Code übernimmt die komplette Orchestrierung der API-Calls. Statt mühsam manuell Daten aus verschiedenen Dashboards zusammenzuklicken, koordinierst du den Ablauf mit einem simplen Kommandozeilenbefehl. Claude Code steuert die sechs Endpunkte in der perfekten Reihenfolge an, fragt die Daten ab und sichert sie, während ein Python-Wrapper im Hintergrund dein Credit-Limit überwacht. Das spart Stunden an manueller Arbeit."
  - question: "Liefert die API auch verlässliche Daten zu direkten Wettbewerbern?"
    answer: "Ja, der Competitors-Endpunkt ist eines der stärksten Features, um Konkurrenten zu analysieren. Allerdings gibt es eine Besonderheit in sehr engen oder neuen Nischen: Hier gibt der Endpunkt manchmal keine direkten Wettbewerber zurück (wie im Test bei prinodi.de und teleschmie.de). Das ist kein Fehler der API, sondern ein klares algorithmisches Signal, dass dein Markt noch sehr spitz oder organisch kaum besetzt ist."
  - question: "Wie nützlich ist der Questions-Endpunkt für die Content-Erstellung?"
    answer: "Für mich ist der Questions-Endpunkt der heimliche Star der gesamten SE Ranking API. Für nur einen Credit pro Abfrage liefert er dir echte Nutzerfragen (W-Fragen), die Menschen exakt so bei Google eintippen. Das ist kein generischer Keyword-Brei, sondern pures Gold für deine Redaktionsplanung und den Aufbau von FAQ-Bereichen, die sofort auf lokale Suchintentionen und Featured Snippets abziehen."
---

Moin! 🌻

Genug Theorie. Heute der Praxis-Test: Ich ziehe mit der SE Ranking API und Claude Code drei komplette Domain-Analysen durch - und zeige dir was am Ende wirklich rauskommt.

Die drei Kandidaten: **teleschmie.de** (meine eigene Seite, maximale Ehrlichkeit), **[arztbesuche.de](https://arztbesuche.de)** (ein etabliertes medizinisches Verzeichnis aus unserem Netzwerk) und **[prinodi.de](https://prinodi.de)** (eine aufsteigende Domain die gerade Fahrt aufnimmt). Drei völlig unterschiedliche Ausgangssituationen - drei völlig unterschiedliche Erkenntnisse.

Spoiler: **~3.721 Credits zusammen**, das sind etwa 0,59 Euro - Keyword-Analyse plus Backlinks für alle drei Domains. Für drei Reports, für die ich früher locker einen halben Tag gebraucht hätte.

## Wie ich das Setup aufgebaut habe

Falls du noch nicht weißt wie man die SE Ranking API mit Claude Code verbindet: Das hab ich [im ersten Teil dieser Serie](../se-ranking-api-claude-code-setup/) Schritt für Schritt erklärt. Die [sechs Endpunkt-Kategorien](../se-ranking-api-endpunkte-kompass/) kenne ich inzwischen auswendig - und ich weiß welche Credits kosten.

Für diesen Test habe ich **Variante B** gefahren: overview + keywords + related + questions + longtail + competitors. Alle sechs Endpunkte in einem Durchlauf, Claude Code koordiniert die Calls, ein Python-Wrapper prüft vor und nach dem Run den Credit-Stand.

---

## Die drei Domains im Überblick

| Domain | Typ | Rankende Keywords | Traffic-Wert/Monat |
|--------|-----|--------------------|---------------------|
| teleschmie.de | SEO-Freelancer-Blog | 23 | ~24 EUR |
| arztbesuche.de | Medizinisches Verzeichnis | 5.892 | ~6.071 EUR |
| prinodi.de | Aufsteiger (Arzt-Notdienst) | 92 | ~18 EUR |

Der "Traffic-Wert" ist der Gegenwert, den du zahlen würdest wenn du diese Keywords als Google Ads buchst. Kein echter Umsatz - aber ein fairer Sichtbarkeits-Indikator.

---

## Pilot 1 - teleschmie.de: Ich audit mich selbst

Das war die interessanteste Analyse. Weil man bei der eigenen Seite sofort spürt: stimmt das was die API sagt mit dem überein was man sich gedacht hat?

**Was die API zeigt:**
- 23 rankende Keywords
- Traffic-Summe: 20 (geringe organische Klicks, aber das ist für ein Nischen-Blog normal)
- Top-Keyword: **„se ranking preise"** - in Position 1–5

Das letzte überraschte mich ehrlich. Ich hab einen Artikel über SE Ranking geschrieben und ranke jetzt für das Pricing-Keyword des Tools selbst. Das klingt zufällig, ist aber logisch: Wer über ein Tool schreibt, fängt oft genau die Keywords ab, die potenzielle Käufer googlen.

**Content-Gaps die die API direkt ausspuckt:**
- „web ranking seo"
- „seo ranking software"

Zwei Artikel-Ideen in weniger als zehn Sekunden. Früher hätte ich das in einer halben Stunde KeywordRecherche herausgefunden - wenn überhaupt.

**Was fehlte:** Der Competitors-Endpunkt gab nichts zurück. Keine Wettbewerber. Das ist kein Bug - das ist ein Signal. Als SEO-Freelancer-Blog bin ich so spezialisiert, dass der Algorithmus keine direkte algorithmische Konkurrenz findet. Kann man als Stärke lesen. Kann man auch als Warnung lesen: Wer keine Konkurrenz hat, hat vielleicht auch kein Marktvolumen.

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <p class="font-bold text-lime-600 mb-2">Jörgs SEO-Klartext</p>
  <p class="italic text-dark mb-0">„Wenn deine eigene Seite dir zeigt, dass du für das Pricing-Keyword eines Tools rankst das du empfiehlst - dann funktioniert dein Content-Marketing. Nicht weil du es geplant hast, sondern weil du ehrlich geschrieben hast."</p>
</div>

**Credit-Verbrauch:** ~1.100 Credits = ~0,17 Euro.

---

## Pilot 2 - arztbesuche.de: Seriöse Konkurrenz im Blick

Ganz anderes Bild. arztbesuche.de ist ein etabliertes medizinisches Notdienst-Verzeichnis mit echter Reichweite.

**Was die API zeigt:**
- 5.892 rankende Keywords
- Traffic-Summe: 14.981
- Top-Keywords: „ärztlicher bereitschaftsdienst", „notarzt", „arzt in meiner nähe"
- **5 direkte Wettbewerber** mit vollständigen Traffic-Daten

Der Competitors-Endpunkt war hier besonders aufschlussreich:

| Wettbewerber | Gemeinsame Keywords | Traffic-Schätzwert |
|--------------|---------------------|--------------------|
| rab-arztbesuche.de | 3.161 | ~11.156 |
| arztbesucheberlin.de | 1.296 | ~13.739 |
| arztbesuche.berlin | 1.408 | ~4.074 |

Das Interessante: arztbesucheberlin.de liegt beim Traffic fast auf Augenhöhe (13.739 vs. 14.981), aber mit nur 1.389 Keywords - einem viel schmaleren Profil. arztbesuche.de hat die Breite, der Berliner Mitbewerber hat Tiefe. Das sind zwei verschiedene SEO-Strategien, die man ohne diesen API-Call nie so klar nebeneinander sehen würde.

Für Jörg als Freelancer heißt das: Bei einem Pitch für solche Projekte kann ich nach einem 15-Minuten-API-Lauf fundiert sagen wo die Wettbewerbssituation steht. Das ist kein Bauchgefühl mehr - das sind Zahlen.

**Credit-Verbrauch:** ~1.100 Credits = ~0,17 Euro.

---

## Pilot 3 - prinodi.de: Der FAQ-Goldschatz

prinodi.de ist die frischeste der drei Domains - eine aufstrebende Plattform rund um privatärztliche Notdienste. Hier hat die API etwas geliefert, das die anderen beiden nicht hatten.

**Was die API zeigt:**
- 92 rankende Keywords (davon 89 neu!)
- Traffic-Summe: 45
- Keine Top-1-5-Positionen - alles in den Positionen 11 bis 100

Das klingt nach wenig. Aber dann kam das:

**10 echte Nutzerfragen aus dem Questions-Endpunkt:**
- „Welcher Arzt hat Notdienst in meiner Nähe?"
- „Welcher Arzt hat Notdienst in Braunschweig?"
- „Welcher Arzt hat heute in Gifhorn Notdienst?"

Das sind keine keyword-genierten Phrasen. Das sind echte Suchanfragen, die Menschen tippen wenn sie abends um elf einen Arzt brauchen. Pro Frage: 1 Credit. Zehn Fragen: 10 Credits. Zehn fertige Artikel-Themen.

<div class="my-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
  <p class="font-bold text-amber-700 mb-2">Warum der Questions-Endpunkt so unterschätzt ist</p>
  <p class="text-dark mb-0">Der Questions-Endpunkt kostet 1 Credit pro Frage und liefert direkte FAQPage-Schema-Kandidaten. Für Seiten mit lokalem Intent (Arztpraxen, Handwerksbetriebe, Anwälte) ist das regelmäßig der wertvollste Call im ganzen Batch.</p>
</div>

Auch bei prinodi.de: keine Wettbewerber-Daten. Selbe Diagnose wie bei teleschmie.de - die Domain ist noch zu jung und zu nischig für algorithmische Konkurrenz-Erkennung. In sechs Monaten sieht das anders aus.

**Credit-Verbrauch:** 1.400 Credits = ~0,22 Euro. Mehr als die anderen beiden, weil der Long-Tail-Endpunkt mit vielen lokalen Varianten zurückkam.

---

## Bonus: Backlinks - was die API noch draufgelegt hat

Keyword-Daten waren der Hauptauftrag. Aber nachdem ich die SE Ranking API eh schon geöffnet hatte, wollte ich wissen: Was hat sie noch? Also hab ich für alle drei Domains noch die Backlinks-Endpunkte mitlaufen lassen - Summary, Refdomains, Anchors.

Das Ergebnis war lehrreicher als erwartet.

| Domain | DR | Backlinks | Dofollow | Nofollow |
|--------|----|-----------|---------:|--------:|
| teleschmie.de | 37 | 341 | 295 | 46 |
| arztbesuche.de | 48 | 240 | 91 | 149 |
| prinodi.de | 2 | 26 | 2 | 24 |

**teleschmie.de:** DR 37 ist solide für eine persönliche Freelancer-Seite. Das Interessante: 115 der 341 Links haben den Anchor-Text „Impressum". Das ist das klassische Freelancer-Muster - Footer-Attribution-Links von Kundenprojekten, die Jörg gebaut hat. Legitimer, natürlicher Linkaufbau. Die 295 Dofollow-Links zeigen echtes SEO-Gewicht.

**arztbesuche.de:** DR 48 - stärkste der drei Domains. Überraschend: mehr Nofollow (149) als Dofollow (91). Das deutet auf Business-Directory-Einträge die standardmäßig nofollow setzen. Schwesterprojekte aus dem Netzwerk ([hausarztsteffin.de](https://hausarztsteffin.de), [praxis-steffin.de](https://praxis-steffin.de)) verlinken - positives Netzwerk-Signal.

**prinodi.de:** DR 2, 26 Backlinks, fast ausschließlich Nofollow. Typisches Bild einer jungen Domain. Kein Problem - es zeigt, dass die Seite noch am Anfang steht. Mindestens 5–10 Dofollow-Links würden den DR schon deutlich bewegen.

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <p class="font-bold text-lime-600 mb-2">Warum Backlinks-Daten beim Pitch zählen</p>
  <p class="italic text-dark mb-0">„Ich kann jetzt in ein Erstgespräch gehen und sagen: Deine Domain hat DR 2, 26 Backlinks, davon 2 Dofollow. Das ist keine Meinung - das sind Zahlen aus der API. Das Gespräch läuft dann ganz anders."</p>
</div>

**Credit-Verbrauch Backlinks:** ~121 Credits für alle drei Domains zusammen - also etwa 40 Credits pro Domain. So wenig, weil die Refdomains- und Anchor-Endpunkte jeweils 1 Credit pro Datensatz kosten, und die meisten Domains nicht tausende Records zurückgeben.

---

## Die Credit-Abrechnung - Endpunkt für Endpunkt

Transparenz ist mir wichtig, also zeige ich hier was jeder einzelne Call kostet. So kannst du selbst einschätzen welche Endpunkte für dein Use-Case sinnvoll sind.

**Keyword-Analyse (Variante B) - Kosten pro Endpunkt:**

| Endpunkt | Modell | Kosten/Lauf |
|----------|--------|-------------|
| `domain/overview` | Flatrate | 100 Credits |
| `domain/keywords` | Flatrate | 100 Credits |
| `keywords/related` | 10 Credits/Record | ~100–300 Credits |
| `keywords/questions` | 10 Credits/Record | ~50–200 Credits |
| `keywords/longtail` | 1 Credit/Record | ~200–700 Credits |
| `domain/competitors` | Flatrate | 100 Credits |

**Backlinks - Kosten pro Endpunkt:**

| Endpunkt | Modell | Kosten/Lauf |
|----------|--------|-------------|
| `backlinks/summary` | 100 Credits/Record | 100 Credits (limit=1) |
| `backlinks/refdomains` | 1 Credit/Record | 1–50 Credits |
| `backlinks/anchors` | 1 Credit/Record | 1–50 Credits |

**Was das pro Domain bedeutet:**

| Domain | Keyword-Analyse | Backlinks | Gesamt | Euro |
|--------|----------------|-----------|--------|------|
| teleschmie.de | ~1.100 | ~40 | ~1.140 | ~0,18 € |
| arztbesuche.de | ~1.100 | ~40 | ~1.140 | ~0,18 € |
| prinodi.de | ~1.400 | ~41 | ~1.441 | ~0,23 € |
| **Gesamt** | **~3.600** | **~121** | **~3.721** | **~0,59 €** |

Der longtail-Endpunkt macht den Unterschied bei prinodi.de: viele lokale Varianten (Braunschweig, Gifhorn, etc.) treiben die Record-Zahl hoch. Das ist kein Nachteil - das sind echte Content-Ideen.

Zum Vergleich: Eine manuelle Keyword- und Backlink-Analyse für drei Domains würde bei einem SEO-Freelancer zwischen 4 und 8 Stunden dauern. Das kostet bei marktüblichen Tagessätzen zwischen 200 und 600 Euro.

Ich sage nicht, dass die API-Ergebnisse dasselbe leisten wie eine ausführliche manuelle Analyse. Aber als Ersteinstieg - als Grundlage für ein Erstgespräch, als Pitch-Vorbereitung, als Content-Briefing - kommt kein anderes Werkzeug auch nur annähernd ran.

---

## Der Workflow mit Claude Code (kurz)

Der Ablauf ist inzwischen zur Routine geworden: Claude Code koordiniert die sechs Endpunkt-Calls in der richtigen Reihenfolge, der Python-Wrapper prüft vor und nach dem Run den Credit-Stand, das Ergebnis landet als Markdown-Report im Projektordner.

Was früher ein halbstündiges Dashboard-Klicken war, ist jetzt ein Befehl:

```
claude "Fahre Variante B für teleschmie.de und erstelle den Summary-Report"
```

Dreißig Sekunden später liegt eine strukturierte Analyse vor. [Wie du das selbst aufsetzt](../se-ranking-api-claude-code-setup/) hab ich in Teil 1 erklärt.

---

## Tacheles am Ende

Drei Domains, drei komplett verschiedene Ausgangssituationen - und überall haben sich Erkenntnisse ergeben, die ich so nicht auf dem Schirm hatte.

Bei meiner eigenen Seite: Ich ranke für Keywords die ich nie bewusst angesteuert habe. Bei arztbesuche.de: Die Konkurrenz ist näher als gedacht, aber das Profil ist breiter. Bei prinodi.de: Die Fragen-Daten sind ein direkter Content-Fahrplan für die nächsten Monate.

Das ist der Mehrwert: nicht dass die API dir alles erklärt, sondern dass sie dir die richtigen Fragen zeigt.

Mein Fazit nach diesem Test: <a href="https://www.linkedin.com/in/maximilianmuhr/" target="_blank" rel="noopener noreferrer">Max</a> hatte recht. Mit dem richtigen Wrapper ist das ein **Workflow-Beschleuniger** - wobei „Beschleuniger" genau das nüchterne Wort ist, das ich bevorzuge. Kein Hype, keine Revolution. Einfach: schneller bessere Ausgangsdaten. 🌻

Die [SE Ranking API](https://seranking.com/?ga=4169588&source=link) in Kombination mit <a href="https://www.anthropic.com/claude-code" target="_blank" rel="noopener noreferrer">Claude Code</a> liefert für Freelancer und kleine SEO-Teams ein Setup, das man sonst nur mit eigenem Entwickler und mehreren Dashboards hinbekommt.

Danke an Max und die Crew von <a href="https://polisys.de" target="_blank" rel="noopener noreferrer">poliSYS</a> für den Stups — und an [SE Ranking](https://seranking.com/?ga=4169588&source=link) für die API.

Auf die nächsten 10.000 Credits. Diesmal mit vorher gewusstem Plan.
