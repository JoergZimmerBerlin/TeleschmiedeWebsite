---
title: "Robots.txt"
description: "Die robots.txt ist eine essenzielle Textdatei im Wurzelverzeichnis von Websites. Sie steuert, welche Crawler, Suchmaschinen und KI-Agenten auf welche Verzeichnisse zugreifen dürfen."
date: "2026-03-10"
image: "../../assets/images/blog/bot-evolution.png"
related_terms: ["crawling-vs-indexing", "geo", "sitemap"]
key_takeaways:
  - "Steuerzentrale für Crawler: Die Datei regelt den Zugriff von Bots auf deine Verzeichnisse."
  - "Keine Index-Garantie: Disallow in der robots.txt verhindert nicht die Indexierung, nur das Crawling."
  - "KI-Wächter: Über die robots.txt kannst du gezielt KI-Bots wie GPTBot blockieren oder erlauben."
faqs:
  - question: "Wo muss die robots.txt liegen?"
    answer: "Sie muss zwingend im Hauptverzeichnis (Root) deiner Domain liegen, z. B. unter teleschmie.de/robots.txt."
  - question: "Kann man mit der robots.txt Inhalte deindexieren?"
    answer: "Nein. Wenn du Inhalte aus dem Google-Index entfernen willst, musst du das 'noindex' Meta-Tag nutzen."
  - question: "Was bedeutet 'Disallow: /'?"
    answer: "Diese Zeile sperrt die gesamte Website für den entsprechenden Crawler – ein gefährlicher Standardfehler nach Relaunchs."
---

Moin!

Die `robots.txt` ist das digitale "Betreten verboten"-Schild deiner Website. 
Es ist eine extrem simple Textdatei, aber lass dich nicht täuschen: Ein kleiner Tippfehler hier kann deine gesamte Online-Präsenz vernichten.

Bevor der Googlebot oder ein moderner KI-Crawler deine eigentliche Seite sieht, checkt er diese Datei.
Im Rahmen meiner täglichen Arbeit als [SEO Freelancer in Berlin](/seo-freelancer-berlin/) ist der Blick in die `robots.txt` daher immer Schritt Eins bei jedem Audit.

## Die Anatomie einer sauberen robots.txt

Das Regelwerk dahinter nennt sich *Robots Exclusion Protocol (REP)*. 
Es ist ein herrenloser Standard – seriöse Bots halten sich dran, die bösen Skripte ignorieren es.

<div class="my-8 bg-[#1A1A1A] text-white p-8 rounded-2xl font-mono text-sm leading-relaxed overflow-x-auto shadow-inner">
  <p class="mb-2"><span class="text-lime-400">User-agent:</span> *</p>
  <p class="mb-2"><span class="text-lime-400">Disallow:</span> /internes-backend/</p>
  <p class="mb-0"><span class="text-lime-400">Sitemap:</span> https://teleschmie.de/sitemap-index.xml</p>
</div>

### Die wichtigsten Befehle erklärt:

1.  **`User-agent:`** An wen richtet sich die Regel? Das Sternchen (`*`) gilt für alle.
2.  **`Disallow:`** Der "Blocker". Er verbietet das [Crawling](/glossar/crawling-vs-indexing/) eines Verzeichnisses.
3.  **`Allow:`** Die Ausnahme von der Regel. Erlaubt Zugriff auf Dateien in einem gesperrten Ordner.
4.  **`Sitemap:`** Der Wegweiser zum Inhaltsverzeichnis deiner Seite. Gehört in jede gute Datei.

## Der größte Mythos: robots.txt vs. Indexierung

Ich sehe es immer wieder in meiner [SEO Sprechstunde](/blog/80-prozent-seo-fehler-sprechstunde/): Kunden sperren eine URL in der `robots.txt` und wundern sich, dass sie immer noch bei Google auftaucht.

**Die Wahrheit:** `Disallow` verhindert nur, dass der Bot die Seite *herunterlädt*. 
Wenn andere Seiten (über [Linkjuice](/glossar/linkjuice/)) darauf verlinken, führt Google die URL trotzdem im Index – nur ohne Beschreibung. Das sieht furchtbar aus und schadet deinem Branding.
Willst du eine Seite wirklich weg haben? Nutze `noindex`.

## Die robots.txt im Zeitalter der KI (GEO)

Ganz neu: Du kannst gezielt KI-Trainings-Bots blockieren.
`User-agent: GPTBot` mit `Disallow: /` hält OpenAI von deinen Inhalten fern. 
Aber Achtung: Wer alles blockiert, wird in der neuen [Generative Engine Optimization](/glossar/geo/) keine Rolle mehr spielen. Keine Citations, keine Erwähnungen, keine KI-Sichtbarkeit.

Das ist das "AI-Agency Paradoxon": Wir wollen unsere Daten schützen, müssen sie aber zeigen, um relevant zu bleiben.

### Fazit (Handhabung mit Sorgfalt)

Die `robots.txt` ist ein mächtiges, wenn auch stumpfes Schwert. 
Sperre Backend-URLs und Suchergebnisse, aber lass die Finger von Content-Seiten, wenn du nicht genau weißt, was du tust.
Nutze professionelle Tools wie [SE Ranking](/blog/sistrix-vs-se-ranking/), um deine Datei live zu überwachen.

ALOHA ✌️

---

<div class="blog-cta-box">
  <h3 class="text-2xl font-bold mb-4">Sicher, dass deine robots.txt korrekt ist?</h3>
  <p class="mb-6">Ein falscher Klick kann dich das Ranking kosten. Lass uns in einer kurzen Sprechstunde dein Setup prüfen.</p>
  <a href="/seo-sprechstunde/" class="btn-primary inline-flex">Sprechstunde buchen →</a>
</div>

* **Lese-Tipp:** [Crawling vs. Indexing verstehen](/glossar/crawling-vs-indexing/)
* **Lese-Tipp:** [Sitemap Optimierung](/glossar/sitemap/)

