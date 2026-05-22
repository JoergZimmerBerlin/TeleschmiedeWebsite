---
category: "Technisches SEO & UX"
title: 'Robots.txt: Anweisungen für Suchmaschinen-Crawler'
description: 'Die robots.txt steuert, welche Crawler, Suchmaschinen und KI-Agenten auf welche Verzeichnisse deiner Website zugreifen dürfen. ALOHA!'
date: "2026-03-10"
image: "../../assets/images/glossar/3d-light/glossar-robots-txt-3d.webp"
image_alt: "robots.txt 3D Infografik - Die Steuerung der Suchmaschinen-Crawler"
related_terms: ["crawling-vs-indexing", "geo", "sitemap"]
key_takeaways:
  - "Steuerzentrale für Crawler: Die Datei regelt den Zugriff von Bots auf deine Verzeichnisse."
  - "Keine Index-Garantie: Disallow in der robots.txt verhindert nicht die Indexierung, nur das Crawling."
  - "KI-Wächter: Über die robots.txt kannst du gezielt KI-Bots wie GPTBot blockieren oder erlauben."
faqs:
  - question: 'Wo genau muss die robots.txt Datei auf meinem Server liegen?'
    answer: 'Sie muss zwingend im Root-Verzeichnis deiner Domain liegen. Beispiel: https://deinedomain.de/robots.txt – du kannst meine Datei sehr gerne als Referenz nutzen. Wenn sie in einem Unterordner steckt oder einen anderen Namen hat, findet kein Bot sie. Das ist einer der Fehler, die ich in meiner Sprechstunde ständig sehe.'
  - question: 'Kann ich mit der robots.txt Seiten aus dem Google-Index entfernen?'
    answer: 'Nein, und das ist der häufigste und gefährlichste Irrtum im technischen SEO! Die robots.txt blockiert nur das Crawling – die Seite kann trotzdem im Index bleiben (nur ohne Beschreibung). Wenn du eine URL wirklich aus den Suchergebnissen entfernen willst, musst du das Noindex Meta-Tag setzen. Diesen Unterschied erkläre ich ausführlich im Glossar unter Crawling vs. Indexing.'
  - question: 'Wie teste ich, ob meine robots.txt korrekt funktioniert?'
    answer: 'Google bietet dafür ein kostenloses Tool in der Google Search Console: Den ''robots.txt Tester''. Dort kannst du einzelne URLs eingeben und prüfen, ob sie blockiert oder erlaubt sind. Außerdem empfehle ich nach jedem Relaunch einen manuellen Check: Ruf einfach deinedomain.de/robots.txt im Browser auf und prüf die Regeln Zeile für Zeile. In meinem Setup blockiere ich klassischerweise nur irrelevante Verzeichnisse (wie Admin-Bereiche) und verlinke natürlich die Sitemap.'
---

Moin!

Die robots.txt ist das Türschild deiner Website für die Google-Bots. Du sagst ihnen damit: "Hier dürft ihr rein, da bitte nicht." Klingt harmlos? Ist es aber nicht. Ein kleiner Fehler hier und deine wichtigste Landingpage verschwindet komplett aus dem Google-Index.

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <p class="font-bold text-lime-600 mb-2">Jörgs SEO-Klartext (LinkedIn Insights)</p>
  <p class="italic text-dark mb-0">"Die robots.txt ist kein Sicherheits-Tool. Sie ist eine Empfehlung an die Crawler. Wer sensible Daten verstecken will, braucht Passwörter oder 'noindex', kein Türschild."</p>
</div>

Bevor auch nur ein einziger Crawler deinen eigentlichen Code anschaut, liest er diese Datei. Im Rahmen meiner Arbeit als [SEO Freelancer in Berlin](/seo-freelancer-berlin/) ist die Prüfung der `robots.txt` daher zwingend Schritt 1 bei jedem technischen Audit. 

## Die Anatomie einer sauberen robots.txt

Das Regelwerk dahinter nennt sich *Robots Exclusion Protocol (REP)*. Es ist ein herrenloser Standard – seriöse Bots halten sich strikt daran, bösartige Spam-Scraper ignorieren es komplett.

<div class="my-8 bg-[#1A1A1A] text-white p-8 rounded-2xl font-mono text-sm leading-relaxed overflow-x-auto shadow-inner">
  <p class="mb-2"><span class="text-lime-400">User-agent:</span> *</p>
  <p class="mb-2"><span class="text-lime-400">Disallow:</span> /internes-backend/</p>
  <p class="mb-0"><span class="text-lime-400">Sitemap:</span> https://deinedomain.de/sitemap.xml</p>
</div>

### Die knallharten Befehle:

1.  **`User-agent:`** An wen richtest du dich? Das Sternchen (`*`) gilt für alle Crawler weltweit.
2.  **`Disallow:`** Der Blocker. Er verbietet das [Crawling](/glossar/crawling-vs-indexing/) eines Verzeichnisses.
3.  **`Allow:`** Die Ausnahme. Erlaubt den Zugriff auf spezifische Dateien tief in einem gesperrten Ordner.
4.  **`Sitemap:`** Der Wegweiser zu deiner [Sitemap](/glossar/sitemap/). Absoluter Pflicht-Eintrag!

## Das größte Missverständnis: robots.txt vs. Indexierung

Ich sehe es wöchentlich in meiner [SEO Sprechstunde](/blog/80-prozent-seo-fehler-sprechstunde/): Kunden wollen eine peinliche Seite aus Google rausbekommen und blockieren sie in der `robots.txt`. 

**Das ist grob fahrlässig!** Ein `Disallow` verhindert nur, dass der Bot die Seite *liest* (Crawling). Wenn andere URLs auf diese Seite verlinken, führt Google sie trotzdem im Index auf – oft mit einem kryptischen "Für diese Seite sind keine Informationen verfügbar". 

Willst du eine Seite wirklich und endgültig aus den Google-Ergebnissen entfernen? Dann musst du das Meta-Tag [Noindex](/glossar/noindex/) im HTML-Code setzen. Und damit der Bot das Noindex-Tag überhaupt lesen kann, darf die Seite in der robots.txt eben **nicht** blockiert sein! 

## Die robots.txt im KI-Zeitalter (GEO)

Ganz neues Spielfeld: Du kannst KI-Trainings-Bots (Scraper für LLMs) über die robots.txt aussperren. 
`User-agent: GPTBot` kombiniert mit `Disallow: /` hält OpenAI davon ab, deine Texte fürs Training zu nutzen.

Aber Vorsicht: Das ist das "AI-Agency Paradoxon". Wenn du alle KI-Modelle aussperrst, wirst du in der [Generative Engine Optimization (GEO)](/glossar/geo/) künftig keine Rolle spielen. Keine Erwähnungen, keine Citations, null KI-Sichtbarkeit für deine Entität. Denk gut nach, bevor du hier dicht machst.

## Mein Tacheles-Rat für dich

Fass die `robots.txt` nur an, wenn du exakt weißt, was du tust. Sperre sinnlose Backend-URLs, interne Such-Parameter und Admin-Bereiche. Lass den Content in Ruhe.

Ich prüfe diese sensiblen Setups täglich mit professionellen Werkzeugen wie <a href="https://seranking.com/?ga=4169588&source=link" target="_blank" rel="noopener noreferrer">SE Ranking</a>. Und mit <a href="https://rankscale.ai/?via=offer" target="_blank" rel="noopener noreferrer">Rankscale</a> stellen wir sicher, dass du die richtigen KI-Crawler nicht versehentlich aussperrst. Halte die Datei sauber, kurz und fehlerfrei.

ALOHA! Jörg

---

<div class="blog-cta-box mt-16 p-8 bg-gray-50 border border-gray-100 rounded-3xl text-center">
  <h3 class="text-2xl font-bold mb-4">Ist deine robots.txt ein Risiko?</h3>
  <p class="mb-6 text-gray-muted">Ein falscher Slash sperrt Google aus. Ich auditiere dein technisches Setup, behebe fatale Fehler und stelle deine Crawlbarkeit sicher.</p>
  <a href="/seo-sprechstunde/" class="btn-primary inline-flex">Jetzt Tech-Audit anfragen</a>
</div>

### Verwandte Begriffe
* [Crawling vs. Indexing verstehen](/glossar/crawling-vs-indexing/)
* [Warum Noindex die wirksamere Methode ist](/glossar/noindex/)
* [Was ist GEO?](/glossar/geo/)
