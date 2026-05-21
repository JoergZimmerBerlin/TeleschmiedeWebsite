---
title: 'Noindex: Seiten von der Suche ausschließen'
description: 'Noindex Meta-Tag: So kontrollierst du, welche Seiten Google indexiert. Der wichtigste Befehl zum Schutz deines Indexing-Budgets. ALOHA!'
date: "2026-03-10"
image: "../../assets/images/glossar/themes/glossar-theme-technical.webp"
robots: "index, follow"
related_terms: ["crawling-vs-indexing", "robots-txt", "seo-audit"]
key_takeaways:
  - "Ultimative Löschung: Noindex entfernt Seiten zuverlässig aus dem Google-Index."
  - "Index-Hygiene: Nutze Noindex für AGB, Impressum oder Thin Content, um die Relevanz zu steigern."
  - "Sichtbarkeits-GAU: Ein vergessenes Noindex auf dem Live-Server kann die gesamte Sichtbarkeit vernichten."
faqs:
  - question: 'Wie baue ich das noindex-Tag technisch korrekt ein?'
    answer: 'Die gängigste Methode ist ein Meta-Tag im HTML-Head-Bereich: <meta name=''robots'' content=''noindex''>. Alternativ (z.B. für PDFs) kann man den X-Robots-Tag als HTTP-Header setzen. In WordPress erledigen das Plugins wie Yoast oder RankMath per Klick. Bei meinen eigenen Astro-Projekten steuere ich das direkt im Code – so habe ich volle Kontrolle und keine Plugin-Abhängigkeit.'
  - question: 'Welche Seiten meiner Website sollte ich konkret auf noindex setzen?'
    answer: 'Alles, was für einen Google-Nutzer keinen Mehrwert bietet: Dankesseiten (Thank-You-Pages), die nach Formulareingabe erscheinen, AGB/Impressum (rechtlich nötig, aber kein SEO-Wert), interne Suchergebnisseiten, Tag-Archive ohne Content, und veraltete ''Trend''-Artikel, die nur noch peinlich sind. Jörgs Tacheles-Regel: Wenn du dich schämen würdest, einem Kunden die Seite zu zeigen – noindex!'
  - question: 'Darf ich noindex und eine robots.txt-Blockierung gleichzeitig verwenden?'
    answer: 'Diese Kombi ist der gefährlichste Fehler im technischen SEO! Wenn du eine URL per robots.txt sperrst, kann der Googlebot sie nicht mehr crawlen. Das bedeutet: Er sieht dein noindex-Tag gar nicht. Die Seite bleibt also als ''Zombie'' im Index. Die sichere Methode: Crawling erlauben (keine Disallow-Regel) und NUR über das Meta-Tag noindex steuern. So kann Google die Seite lesen und den Befehl ''bitte raus aus dem Index'' auch tatsächlich ausführen.'
---

Moin!

Wenn es einen einzigen Code-Schnipsel gibt, der das Schicksal eines Millionen-Euro-Onlineshops oder einer B2B-Plattform in Millisekunden besiegeln kann, dann ist es dieses winzige Stück Text im `<head>` deiner HTML-Datei:

```html
<meta name="robots" content="noindex">
```

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <p class="font-bold text-lime-600 mb-2">Jörgs SEO-Klartext (LinkedIn Insights)</p>
  <p class="italic text-dark mb-0">"Das Noindex-Tag ist das schärfste Werkzeug der Suchmaschinenoptimierung. Wer hier pfuscht, radiert seine gesamte Sichtbarkeit in Millisekunden aus."</p>
</div>

Es ist ein gnadenloser Befehl: *"Lieber Googlebot, ganz gleich, wie geil dieser Content ist oder wie viele externe Links darauf zeigen – ich befehle dir hiermit, diese Seite sofort aus dem öffentlichen Google-Index zu löschen!"*

Als [SEO Freelancer in Berlin](/seo-freelancer-berlin/) erlebe ich die Folgen von "Noindex-Unfällen" fast jeden Monat. Ein Relaunch crasht? Oft ist es genau dieser kleine Tag, den jemand auf dem Live-Server vergessen hat. Einer der dümmsten [80-Prozent-SEO-Fehler](/blog/80-prozent-seo-fehler-sprechstunde/), den du machen kannst.

## Warum braucht man "Noindex" überhaupt?

Wenn das Tag so gefährlich ist, wieso nutzt man es dann? Weil effektives SEO nicht bedeutet, jeden Müll in den Index zu pressen. Effektives SEO bedeutet **Hyper-Relevanz**.

Denk an ein Rosenbeet: Alles, was kein wertvoller Blütentrieb (starker Content) ist, musst du gnadenlos abschneiden (deindexieren), damit die Hauptpflanze die volle Energie (Crawl-Budget und [E-E-A-T](/glossar/e-e-a-t/) Trust) abbekommt. 

Diese Seiten *musst* du zwingend auf `noindex` setzen:

1.  **Thin & Veralteter Content:** Dein peinlicher Blogbeitrag "Trends 2014" zieht die Qualitätsbewertung deiner gesamten Domain runter. Raus damit!
2.  **Dankesseiten (Thank-You Pages):** Jemand kauft im Shop und landet auf der "Danke"-Seite. Wenn diese Seite frei im Google-Index herumfliegt, zerschießt es dir dein komplettes Conversion-Tracking für Google Ads und Analytics.
3.  **AGB, Impressum & Datenschutz:** Rechtlich Pflicht, für SEO völlig wertlos. Kein Nutzer sucht das.
4.  **Tag-Friedhöfe in WordPress:** Hunderte automatisch generierte Tag-Seiten ohne echten Text? Das ist Indexverstopfung. Noindex!

<div class="my-8 bg-gray-50 border border-gray-200 p-8 rounded-2xl shadow-sm">
  <h3 class="text-xl font-bold text-dark mt-0 mb-4 text-center">Der Relaunch-Tod: Die Sandbox-Falle</h3>
  <p class="mb-4">Eine Agentur baut deine neue Website auf einem Testserver (Staging). Um Google fernzuhalten, haken sie in WordPress "Suchmaschinen davon abhalten..." an. Das System setzt global `noindex`.</p>
  <div class="p-4 bg-lime-accent/10 border-l-4 border-lime-600 rounded-lg">
    <strong class="text-lime-800">Der tödliche Fehler:</strong> Die Seite geht live und das Häkchen bleibt gesetzt. Der Server funkt an Google hartes `noindex`. Binnen 7 Tagen löscht Google alle deine Rankings unwiderruflich aus dem Netz. Umsatz: Null.
  </div>
</div>

## Noindex vs. Robots.txt: Mach diesen Fehler nicht

Das ist das gefährlichste Missverständnis im Technical SEO: Die Vermengung von `noindex` und einem `Disallow`-Befehl in der `robots.txt`. Ich erkläre den Unterschied im Detail unter [Crawling vs. Indexing](/glossar/crawling-vs-indexing/).

**Die goldene Regel:** Sperre *niemals* eine URL, die du deindexieren willst, über die [robots.txt](/glossar/robots-txt/)! 
Warum? Wenn du die Seite in der robots.txt blockierst, darf der Googlebot die Seite nicht mehr crawlen. Er kann also dein neues `noindex`-Tag im Head gar nicht lesen! Die URL bleibt als nutzloser Zombie im Index.

**So machst du es richtig:** Crawling in der robots.txt erlauben und rein über das HTML-Tag `noindex` steuern. Nur so kann Google den Befehl lesen und ausführen.

### Fließt Linkjuice bei Noindex?

Gibt eine Seite mit `noindex` eigentlich noch Rankingpower weiter? Ja!
Setze das Tag als `<meta name="robots" content="noindex, follow">`. Google schmeißt die URL aus den Suchergebnissen, folgt aber brav den Links auf der Seite und vererbt den [Linkjuice](/glossar/linkjuice/) weiter.

## Mein Tacheles-Rat für dich

Eine technisch schlanke, saubere Domain rankt exponentiell leichter als ein fetter, zugemüllter Index. Hab keine Angst vor dem Noindex-Tag – nutze es als Präzisionswerkzeug für deine Index-Hygiene. Klasse statt Masse ist 2026 die einzige Währung bei Google.

ALOHA! Jörg

---

<div class="blog-cta-box mt-16 p-8 bg-gray-50 border border-gray-100 rounded-3xl text-center">
  <h3 class="text-2xl font-bold mb-4">Angst vor dem Ranking-Absturz?</h3>
  <p class="mb-6 text-gray-muted">Hast du Müll im Index? Wir checken dein Setup mit <a href="https://seranking.com/?ga=4169588&source=link" target="_blank" rel="noopener noreferrer">SE Ranking</a> und räumen rigoros auf, damit Google nur deine starken Seiten bewertet.</p>
  <a href="/glossar/seo-audit/" class="btn-primary inline-flex">Jetzt Index-Audit anfragen</a>
</div>

### Verwandte Begriffe
* [Crawling vs. Indexing verstehen](/glossar/crawling-vs-indexing/)
* [Warum die robots.txt allein nicht reicht](/glossar/robots-txt/)
