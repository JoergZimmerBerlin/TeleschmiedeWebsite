---
title: "Sitemap"
description: "Eine Sitemap ist der Wegweiser für Google. Sie hilft Crawlern, alle wichtigen Seiten deiner Website schnell und effizient zu finden."
date: "2026-03-10"
image: "../../assets/images/glossar/glossar-theme-technical.webp"
related_terms: ["crawler", "robots-txt", "crawling-vs-indexing"]
key_takeaways:
  - "Crawler-Effizienz: Eine saubere Sitemap spart wertvolles Crawl-Budget."
  - "Vollständigkeit: Sie garantiert, dass auch verwaiste Seiten (Orphan Pages) gefunden werden."
  - "Schnelle Indexierung: Neue Inhalte werden über die Sitemap deutlich schneller von Google erfasst."
faqs:
  - question: "Wo finde ich meine Sitemap und wie prüfe ich, ob sie korrekt ist?"
    answer: "Die Sitemap liegt standardmäßig unter deiner-domain.de/sitemap.xml. Meine eigene findest du unter https://joergzimmer.de/sitemap.xml – schau sie dir gerne als Referenz an. In der robots.txt sollte sie außerdem verlinkt sein. Und ganz wichtig: Reiche sie in der Google Search Console unter 'Sitemaps' ein und prüfe dort, ob alle URLs korrekt verarbeitet werden oder Fehler auftreten."
  - question: "Sollte wirklich jede meiner URLs in die Sitemap?"
    answer: "Auf keinen Fall! Nur URLs, die auch tatsächlich indexiert werden sollen und einen HTTP-Status 200 zurückgeben. Seiten mit noindex, Weiterleitungen (301/302), veraltete Inhalte oder interne Suchergebnisseiten haben in der Sitemap nichts verloren. Eine 'aufgeblähte' Sitemap mit tausenden irrelevanten URLs verschwendet dein Crawl-Budget und verwirrt Google. Qualität vor Quantität!"
  - question: "Wie oft sollte die Sitemap aktualisiert werden?"
    answer: "Am besten automatisch bei jeder Veröffentlichung! Auf meiner Seite wird die Sitemap bei jedem Build-Prozess dynamisch generiert – das gewährleistet, dass neue Glossar-Einträge oder Blogartikel sofort für Google sichtbar sind. Bei WordPress erledigen das Plugins wie Yoast automatisch. Wer seine Sitemap manuell pflegt, vergisst es garantiert – Automatisierung ist hier Pflicht."
---Moin!

Eine Sitemap ist die Landkarte deiner Website. 
Ganz einfach: Ein Dokument, das alle URLs deiner Seite auflistet. 
Das Ziel? Google sagen: "Hey, hier sind meine Inhalte, bitte schau sie dir an!"

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <p class="font-bold text-lime-600 mb-2">💬 Jörgs SEO-Klartext (LinkedIn Insights)</p>
  <p class="italic text-dark mb-0">"Eine Website ohne klare Hierarchie und interne Verlinkung ist wie ein Supermarkt ohne Wegweiser."</p>
</div>

Zwar findet Google viele Seiten auch über [interne Verlinkungen](/glossar/interne-verlinkung/), aber die Sitemap ist das Sicherheitsnetz. 
Besonders für neue Websites oder Seiten mit tausenden Artikeln ist sie absolut unverzichtbar.

## Die zwei Arten von Sitemaps

Wir unterscheiden im Wesentlichen:

1.  **XML-Sitemap:** Das ist die Version für Maschinen. Sie liegt meistens unter `/sitemap.xml/`. Sie ist purer Code, den der [Crawler](/glossar/crawler/) ausliest.
2.  **HTML-Sitemap:** Das ist eine Seite für Menschen (oft im Footer verlinkt). Gut für die [Usability](/glossar/usability/), aber SEO-technisch weniger relevant als die XML-Version.

## Warum brauchst du eine Sitemap?

Selbst wenn dein Link-Geflecht perfekt ist, hilft die Sitemap Google massiv:

*   **Schnelligkeit:** Neue Unterseiten werden oft erst nach Wochen via Crawling gefunden. Über die Sitemap erfährt Google sofort davon.
*   **Priorisierung:** Du kannst Google zeigen, wann eine Seite zuletzt geändert wurde (`<lastmod>`).
*   **Vollständigkeit:** Verwaiste Seiten (Orphan Pages), die du vergessen hast zu verlinken, haben so noch eine Chance auf den Index.

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <h4 class="text-xl font-bold text-dark mb-2 mt-0">Wichtiger Hinweis für Profis</h4>
  <p class="mb-0 text-sm">Pack niemals URLs in die Sitemap, die auf <a href="/glossar/noindex/" class="underline font-semibold text-lime-600 hover:text-lime-700">noindex</a> stehen oder per <a href="/glossar/robots-txt/" class="underline font-semibold text-lime-600 hover:text-lime-700">robots.txt</a> gesperrt sind. Das verwirrt Google und verschwendet wertvolles Crawl-Budget.</p>
</div>

## Monitoring in der Search Console

Es reicht nicht, eine Sitemap zu haben.
Du musst sie Google auch geben.
Das machst du in der Google Search Console.
Dort siehst du auch sofort, ob Google die Sitemap lesen konnte und wie viele URLs daraus indexiert wurden.
Wenn du dort Fehler siehst -> Sofort handeln! Das ist Basis-SEO.

## Sitemaps und die KI-Suche ([GEO](/glossar/geo/))

Auch KI-Bots wie der GPTBot scannen Sitemaps.
Sie nutzen sie als Inhaltsverzeichnis, um effizient "Wissenstöne" für ihre Large Language Models zu sammeln.
Eine saubere Sitemap sorgt dafür, dass deine [Entität](/glossar/entitaet/) vollständig erfasst wird.
In Kombination mit einer [LLMs.txt](/glossar/llms-txt/) baust du so die perfekte Infrastruktur für die Zukunft der Suche.

## Meine Erfahrung als [SEO Berater](/seo-freelancer-berlin/)

In meinen [Audits](/glossar/seo-audit/) sehe ich oft Sitemaps, die völlig veraltet sind.
Oder solche, die 50.000 URLs enthalten, wovon die Hälfte Fehler produziert.
Eine schlechte Sitemap ist schlimmer als gar keine.
Sie muss dynamisch sein. Sie muss sauber sein. Sie muss der Wahrheit entsprechen.

## Jörgs Action-Plan

Die Sitemap ist dein direkter Draht zum Googlebot. Mach es der Maschine so einfach wie möglich. Ein klarer Wegweiser führt zu schnelleren Rankings und besserer Indexierung. Kein High-Level SEO, sondern solides Handwerk. Aber ohne Handwerk kein Masterpiece.

ALOHA ✌️

---

<div class="blog-cta-box">
  <h3 class="text-2xl font-bold mb-4">Probleme mit der Indexierung?</h3>
  <p class="mb-6">Lass uns in einer SEO-Sprechstunde prüfen, ob deine Sitemap Google in die Irre führt oder dein Crawl-Budget verschwendet wird.</p>
  <a href="/seo-sprechstunde/" class="btn-primary inline-flex">Sprechstunde anfragen →</a>
</div>

* **Lese-Tipp:** [Warum Crawler so wichtig sind](/glossar/crawler/)
* **Lese-Tipp:** [Was ist GEO?](/glossar/geo/)
