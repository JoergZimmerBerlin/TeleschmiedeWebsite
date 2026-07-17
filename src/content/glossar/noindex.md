---
category: "SEO Basics & Onpage"
title: 'Noindex: Seiten von der Suche ausschließen'
description: 'Noindex Meta-Tag: So kontrollierst du radikal, welche Seiten Google und KI-Agenten indexieren dürfen. Der Wächter deines Indexing-Budgets. ALOHA!'
sameAs: "https://www.wikidata.org/wiki/Q4045426"
date: "2026-07-17"
image: "../../assets/images/glossar/themes/glossar-theme-technical.webp"
robots: "index, follow"
related_terms: ["crawling-vs-indexing", "robots-txt", "seo-audit"]
key_takeaways:
  - "Die ultimative Löschung: Das Noindex-Tag entfernt URLs gnadenlos und zuverlässig aus dem Index von Google und modernen LLM-Datenbanken."
  - "Index-Hygiene für KIs: Wenn LLMs deinen Thin Content (z.B. AGBs oder leere Tag-Seiten) trainieren, verwässert das deine Marken-Repräsentation im Latent Space."
  - "Sichtbarkeits-GAU: Ein vergessenes Noindex-Tag nach einem Relaunch auf dem Live-Server killt deine gesamte Sichtbarkeit innerhalb weniger Tage. Aufpassen!"
faqs:
  - question: 'Wie baue ich das noindex-Tag technisch korrekt ein?'
    answer: 'Die sicherste Methode ist das Meta-Tag im HTML-Head-Bereich: `<meta name="robots" content="noindex">`. Alternativ (z.B. für PDF-Dateien, die keinen HTML-Head haben) muss der X-Robots-Tag als HTTP-Header vom Server gesetzt werden. In CMS wie WordPress erledigen das oft SEO-Plugins per Klick. Bei Headless- oder Astro-Projekten integriere ich das dynamisch in die Head-Komponenten, gesteuert übers Frontmatter. So bleibt die volle Kontrolle beim Entwickler.'
  - question: 'Welche Seiten meiner Website MUSS ich zwingend auf noindex setzen?'
    answer: 'Grundsätzlich alles, was für einen Suchenden (und eine trainierende KI) absoluten Null-Mehrwert bietet. Dazu zählen: Dankesseiten nach Formulareinsendungen (Thank-You-Pages zerschießen sonst das Tracking), rechtliche Pflichtseiten wie AGB/Datenschutz, interne Suchergebnisseiten (niemals Suchergebnisse in der Suche indexieren!), Paginierungs-Enden ohne Wert und massenhaft generierte Tag-Archive. Jörgs Tacheles-Regel: Wenn du dich schämen würdest, diese Unterseite einem Top-Kunden als Referenz zu schicken – noindex!'
  - question: 'Darf ich ein noindex-Tag und eine robots.txt-Blockierung gleichzeitig für dieselbe URL verwenden?'
    answer: 'NEIN! Diese Kombination ist der absolute Endgegner im technischen SEO und ein tödlicher Logikfehler. Wenn du eine URL in der robots.txt per `Disallow` sperrst, verbietest du dem Crawler den Zugriff auf die Seite. Das bedeutet: Er darf die Seite nicht crawlen und sieht dein `noindex`-Tag im Quellcode logischerweise gar nicht! Die Seite bleibt dann oft als seelenloser ''Zombie'' im Index hängen (nur mit URL, ohne Beschreibung). Die einzige sichere Methode: Crawling in der robots.txt ERLAUBEN und die Löschung NUR über das Meta-Tag `noindex` erzwingen.'
---

Moin! 🌻

Wenn es in der gesamten Webentwicklung einen einzigen Code-Schnipsel gibt, der das Schicksal eines Millionen-Euro-Onlineshops, einer B2B-Plattform oder eines SaaS-Startups in Millisekunden besiegeln kann, dann ist es dieses winzige Stück Text im `<head>` deiner HTML-Datei:

```html
<meta name="robots" content="noindex">
```

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <p class="font-bold text-lime-600 mb-2">Jörgs SEO-Klartext (LinkedIn Insights)</p>
  <p class="italic text-dark mb-0">"Das Noindex-Tag ist das schärfste Werkzeug der Suchmaschinenoptimierung. Wer hier pfuscht, radiert seine gesamte Sichtbarkeit in Millisekunden aus. Aber wer es klug nutzt, formt die perfekte Wissensbasis für AI-Agents."</p>
</div>

Es ist ein gnadenloser, unmissverständlicher Befehl: *"Lieber Googlebot, lieber GPTBot, lieber Claude-Crawler – ganz gleich, wie geil dieser Content scheinbar ist oder wie viele externe Links darauf zeigen: Ich befehle dir hiermit, diese Seite sofort aus deinem Index, deinen Vektordatenbanken und deinem RAG-System zu löschen!"*

Als [SEO Berater in Berlin](/seo-freelancer-berlin/) erlebe ich die brutalen Folgen von "Noindex-Unfällen" fast jeden Monat. Ein Relaunch geht live und plötzlich stürzen die Umsätze auf Null? In 9 von 10 Fällen ist es genau dieses kleine Tag, das irgendein Entwickler versehentlich vom Staging- auf den Live-Server kopiert hat. Es ist der dümmste, aber teuerste [80-Prozent-SEO-Fehler](/blog/80-prozent-seo-fehler-sprechstunde/), den du machen kannst.

## Warum braucht man "Noindex" 2026 überhaupt noch?

Wenn dieses Tag so massiv gefährlich ist, wieso nutzen wir es dann so intensiv? Weil exzellentes SEO im Jahr 2026 nicht mehr bedeutet, jeden erdenklichen Müll und jede URL-Variante in den Index zu pressen. Effektives SEO bedeutet **Hyper-Relevanz und Agent Readiness**.

### Index-Hygiene und der Latent Space

Wir müssen heute weiter denken als nur an klassische Suchergebnisse. KI-Modelle durchsuchen deine Website, um ihr Weltwissen (den sogenannten "Latent Space") anzureichern oder Antworten per Retrieval-Augmented Generation (RAG) zu generieren. 

Denk an ein Rosenbeet: Alles, was kein wertvoller Blütentrieb ist (also dein Core-Content), musst du gnadenlos abschneiden (deindexieren), damit die Hauptpflanze die volle Energie abbekommt. 

Wenn KI-Agenten deine hunderten leeren Tag-Seiten, deine veralteten AGBs von 2018 und deine zerschossenen Filter-URLs lesen, speichern sie diese Daten. Dein "Entitäts-Profil" verwässert. Die Maschine lernt, dass deine Domain zu 80% aus irrelevanter Grütze besteht. Du verlierst Trust, du verlierst dein [E-E-A-T](/glossar/e-e-a-t/) Profil und du tauchst in den Antworten der LLMs schlichtweg nicht mehr auf.

**Diese Seiten MUSST du zwingend auf `noindex` setzen:**

1.  **Thin Content & Veralteter Müll:** Dein peinlicher Blogbeitrag "Marketing-Trends 2014" zieht die Qualitätsbewertung deiner gesamten Domain in den Keller. Wenn du ihn nicht löschen willst: Noindex!
2.  **Dankesseiten (Thank-You Pages):** Jemand kauft im Shop oder trägt sich in den Newsletter ein und landet auf der "Danke"-Seite. Wenn diese Seite frei im Google-Index herumfliegt und Leute über die Suche darauf klicken, zerschießt es dir dein komplettes Conversion-Tracking für Google Ads und Analytics.
3.  **Rechtliches (AGB, Impressum, Datenschutz):** Rechtlich absolute Pflicht, aber für SEO und KI-Training völlig wertlos. Niemand sucht nach deinen AGBs, um etwas bei dir zu kaufen. Raus damit aus dem Index.
4.  **Interne Suchergebnisseiten:** Ein absolutes No-Go! Wenn du zulässt, dass Suchmaschinen deine internen Suchergebnisse indexieren, erzeugst du unendlich viele Spam-URLs. Das führt zu Abstrafungen. Immer Noindex!
5.  **Tag-Friedhöfe in WordPress:** Hunderte automatisch generierte Tag-Seiten, auf denen nur Snippets ohne eigenen Text stehen? Das ist die Definition von Indexverstopfung. 

<div class="my-8 bg-gray-50 border border-gray-200 p-8 rounded-2xl shadow-sm">
  <h3 class="text-xl font-bold text-dark mt-0 mb-4 text-center">Der Relaunch-Tod: Die Staging-Falle</h3>
  <p class="mb-4">Eine Agentur baut deine neue Hochleistungs-Website auf einem geheimen Testserver (Staging). Um Google fernzuhalten, setzen sie global ein `noindex` oder haken in WordPress "Suchmaschinen davon abhalten..." an.</p>
  <div class="p-4 bg-lime-accent/10 border-l-4 border-lime-600 rounded-lg">
    <strong class="text-lime-800">Der tödliche Fehler:</strong> Freitagnachmittag. Die Seite geht live. Der Schampus knallt. Aber das Noindex-Häkchen bleibt gesetzt. Der Live-Server funkt nun an Google, Perplexity und OpenAI ein hartes `noindex`. Binnen 3 bis 7 Tagen löschen die Maschinen alle deine Rankings unwiderruflich aus dem Netz. Dein Traffic fällt auf exakt Null. Dein Business steht am Abgrund. Teste ALLES vor dem Go-Live!
  </div>
</div>

## Noindex vs. Robots.txt: Der tödliche Logikfehler

Das ist das mit Abstand gefährlichste Missverständnis im Technical SEO und ein Fehler, den selbst erfahrene Developer regelmäßig machen: Die Vermengung von `noindex` und einem `Disallow`-Befehl in der `robots.txt`. Ich erkläre die Systematik im Detail unter [Crawling vs. Indexing](/glossar/crawling-vs-indexing/), aber hier ist die Kurzfassung:

**Die goldene, unumstößliche Regel:** 
Sperre *niemals* eine URL, die du aktiv deindexieren willst, zusätzlich über die [robots.txt](/glossar/robots-txt/)! 

**Warum ist das so schlimm?** 
Die `robots.txt` steuert das *Crawling* (das Betreten der Seite), nicht das *Indexing* (das Speichern der Seite). Wenn du eine URL in der robots.txt blockierst, sagst du dem Googlebot: "Du darfst diese URL nicht betreten."
Da er die Seite nicht betreten darf, kann er dein neues, sauberes `<meta name="robots" content="noindex">` Tag im Quellcode überhaupt nicht lesen! Er weiß nicht, dass er die Seite löschen soll. 
Ergebnis: Die URL bleibt als nutzloser "Zombie" im Index hängen (oft mit dem Hinweis "Für diese Seite sind keine Informationen verfügbar"). 

**So machst du es technisch richtig:** 
Crawling in der robots.txt explizit ERLAUBEN (keine Disallow-Regel für diese Pfade) und die Löschung rein über das HTML-Tag `noindex` steuern. Nur so kann der Bot die Seite betreten, den Lösch-Befehl lesen und auch tatsächlich ausführen.

### Fließt Linkjuice bei Noindex?

Gibt eine Seite, die auf `noindex` steht, eigentlich noch Rankingpower (Linkjuice) an interne Links weiter? 
Ja! Sofern du das Tag korrekt formulierst: `<meta name="robots" content="noindex, follow">`. 

Du sagst den Maschinen damit: "Schmeiß diese spezifische URL aus euren Suchergebnissen, ABER folgt brav allen Links, die auf dieser Seite stehen, und vererbt den [Linkjuice](/glossar/linkjuice/) weiter." 
Ein perfekter Use-Case dafür sind Paginierungs-Seiten (Seite 2, 3, 4 im Blog). Du willst sie nicht im Index haben, aber die Bots sollen die Links zu den alten Artikeln finden.

*(Achtung Nerd-Wissen: Google hat vor einiger Zeit angemerkt, dass ein langfristiges `noindex` irgendwann wie ein `nofollow` behandelt werden kann. Trotzdem ist das Setup `noindex, follow` weiterhin Best Practice für sauberes Routing).*

## Mein Tacheles-Rat für dich

Eine technisch schlanke, radikal aufgeräumte Domain rankt exponentiell leichter und wird von KI-Agenten bevorzugt zitiert, als ein fetter, zugemüllter Daten-Sumpf. 

Hab keine Angst vor dem Noindex-Tag – nutze es als dein schärfstes Skalpell für kompromisslose Index-Hygiene. Wirf jeden Ballast über Bord. Klasse statt Masse ist 2026 die absolut einzige Währung, die bei Google, OpenAI und Anthropic noch zählt.

ALOHA! 🌻 

---

<div class="blog-cta-box mt-16 p-8 bg-gray-50 border border-gray-100 rounded-3xl text-center">
  <h3 class="text-2xl font-bold mb-4">Angst vor dem Ranking-Absturz?</h3>
  <p class="mb-6 text-gray-muted">Hast du unbemerkten Müll im Index? Blockierst du KI-Crawler versehentlich? Wir checken dein technisches Setup gnadenlos durch und räumen rigoros auf, damit Maschinen nur deine stärksten Seiten bewerten.</p>
  <a href="/glossar/seo-audit/" class="btn-primary inline-flex">Jetzt Tech-SEO Audit anfragen</a>
</div>

### Verwandte Themen & Deep Dives
* [Crawling vs. Indexing radikal verstehen](/glossar/crawling-vs-indexing/)
* [Warum die robots.txt allein nicht reicht](/glossar/robots-txt/)
* [Das Canonical Tag: Dein Schutzschild](/glossar/canonical-tag/)
* [Trailing Slashes im Tech-SEO](/glossar/trailing-slashes/)
