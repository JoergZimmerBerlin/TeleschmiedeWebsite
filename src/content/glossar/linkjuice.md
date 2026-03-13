---
title: "Linkjuice (Linkkraft)"
description: "Linkjuice ist ein umgangssprachlicher SEO-Begriff für die Verteilung von Ranking-Power (PageRank), die durch interne und externe Verlinkungen weitergegeben wird."
date: "2026-03-10"
image: "../../assets/images/glossar/3d-light/glossar-linkjuice-3d.webp"
image_alt: "Linkjuice (Linkkraft) 3D Infografik"
related_terms: ["crawling-vs-indexing"]
key_takeaways:
  - "Linkjuice beschreibt die Verteilung von Autorität und Vertrauen durch interne und externe Links."
  - "Strategische interne Verlinkung leitet Ranking-Power gezielt auf deine wichtigsten Fokus-Seiten."
  - "In der KI-Suche wandelt sich Linkjuice zur semantischen Referenz (Marken-Nennung im Kontext)."
---


Moin! 
Linkjuice (häufig auch "Linkkraft" oder "Link Equity" genannt) ist einer der prägendsten Begriffe in der Geschichte der Suchmaschinenoptimierung. Obwohl Google intern ausschließlich von [PageRank](https://en.wikipedia.org/wiki/PageRank) spricht – benannt nach Google-Gründer Larry Page –, hat sich der bildliche Begriff des "Link-Saftes" in der SEO-Szene durchgesetzt. Er beschreibt anschaulich den Fluss von Autorität und Vertrauen durch das Netzwerk des Internets.

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <p class="font-bold text-lime-600 mb-2"> Jörgs SEO-Klartext (LinkedIn Insights)</p>
  <p class="italic text-dark mb-0">"Vergiss das 'Keyword-Vollstopfen'. Schreib für Menschen, strukturiere für Maschinen."</p>
</div>

Jeder Hyperlink, der von einer Seite (A) zu einer anderen Seite (B) gesetzt wird, fungiert als eine Art "Empfehlung". Diese Empfehlung gibt einen Teil der Autorität von Seite A an Seite B weiter. Das systematische Leiten dieses Linkjuices ist das fundamentale Prinzip von strategischer interner Verlinkung und OffPage-SEO (Linkaufbau).

## Wie der PageRank-Algorithmus (vereinfacht) funktioniert

Stell dir das Web als ein gigantisches Netzwerk aus miteinander verbundenen Gefäßen vor. Jede Website hat eine bestimmte Menge an "Saft" (Vertrauen/Autorität). 

Wenn deine Startseite sehr stark ist (weil z. B. viele bekannte externe Domains wie die Wikipedia oder große Zeitungen auf sie verlinken), ist ihr Gefäß bis zum Rand mit Linkjuice gefüllt. Setzt du nun von deiner Startseite einen Link zu deinem neuesten Blog-Artikel, fließt ein beachtlicher Teil dieses Saftes in den Artikel. Dieser gewinnt an [Sichtbarkeit](/glossar/sichtbarkeit/) im Google-Index. Dank Tools wie <a href="https://seranking.com/de/?ga=4169588&source=link" target="_blank" rel="noopener noreferrer">SE Ranking</a> kannst du diesen Zuwachs an Autorität präzise tracken.

![Infografik: Die Verteilung von Signalen](../../assets/images/blog/core-web-vitals-pfeiler.webp)

<div class="my-8 bg-gray-50 border border-gray-200 p-8 rounded-2xl shadow-sm">
  <h3 class="text-xl font-bold text-dark mt-0 mb-4 text-center">Die Mathematik hinter dem Fluss</h3>
  <div class="space-y-4">
    <div class="p-4 bg-white rounded-lg border-l-4 border-lime-500 shadow-sm flex items-start gap-4">
      <div class="bg-lime-accent/20 p-2 rounded-full text-lime-800 font-bold shrink-0">1</div>
      <div>
        <strong class="block text-dark mb-1">Verteilung der Kraft (The Damping Factor)</strong>
        <p class="text-sm text-gray-500 mb-0">Eine Seite gibt niemals 100% ihrer Kraft weiter. Es gibt einen sogenannten "Dämpfungsfaktor" (meist auf 0.85 geschätzt). Das bedeutet, bei jedem Link-Knotenpunkt geht ein winziger Teil der Kraft im System "verloren".</p>
      </div>
    </div>
    <div class="p-4 bg-white rounded-lg border-l-4 border-lime-500 shadow-sm flex items-start gap-4">
      <div class="bg-lime-accent/20 p-2 rounded-full text-lime-800 font-bold shrink-0">2</div>
      <div>
        <strong class="block text-dark mb-1">Division durch ausgehende Links (Outbound Links)</strong>
        <p class="text-sm text-gray-500 mb-0">Der weitergegebene Linkjuice einer Seite wird (vereinfacht) durch die Anzahl ALLER ausgehenden internen und externen Links auf dieser Seite geteilt. Hast du 10 Links auf deiner Startseite, bekommt jeder Link ~1/10 der Kraft. Hast du 100 Links, bekommt jeder nur ~1/100.</p>
      </div>
    </div>
    <div class="p-4 bg-white rounded-lg border-l-4 border-lime-500 shadow-sm flex items-start gap-4">
      <div class="bg-lime-accent/20 p-2 rounded-full text-lime-600 font-bold shrink-0">3</div>
      <div>
        <strong class="block text-dark mb-1">Der Nofollow-Mythos (PageRank Sculpting)</strong>
        <p class="text-sm text-gray-500 mb-0">Früher konnte man Links auf <code>rel="nofollow"</code> setzen, um den Linkjuice künstlich auf andere Links "umzuleiten". Google hat diesen Trick (PageRank Sculpting) längst unterbunden. Ein Nofollow-Link "verbrennt" heute den für ihn vorgesehenen Anteil der Kraft einfach, anstatt ihn umzuverteilen.</p>
      </div>
    </div>
  </div>
</div>

## Faktoren für einen "starken" Backlink

Nicht jeder Linkjuice-Fluss ist gleich viel wert. Wenn ein Algorithmus die Wertigkeit einer Empfehlung bemisst, betrachtet er nicht nur das nackte `href`-Attribut, sondern den gesamten semantischen und strukturellen Kontext.

1.  **Themenrelevanz (Topical Authority):** Ein Link von einer Auto-Tuning-Website zu einer Bäckerei gibt zwar theoretisch PageRank weiter, wird vom Algorithmus aber im Spam-Kontext massiv abgewertet. Der Linkjuice wirkt nur optimal, wenn die thematische Nähe (Topical Relevance) gegeben ist.
2.  **Positionierung im Text:** Ein Link "In Content" (also fließend oben im redaktionellen Text) gibt signifikant mehr Kraft weiter als ein Boilerplate-Link im Footer oder der Seitenleiste. 
3.  **Der Ankertext (Anchor Text):** Der klickbare Text des Links. Verlinkt die Wikipedia auf dich mit dem Text "Bester SEO Freelancer", sendet der Linkjuice neben purer Autorität auch ein extrem starkes Relevanz-Signal für exakt diesen Suchbegriff.
4.  **Die "Link-Nachbarschaft":** Wohin verlinkt die Quelle noch? Wenn eine Seite auf seriöse Unternehmen, aber gleichzeitig auf Online-Casinos oder Spam-Netzwerke verlinkt, befindet sie sich in einer "Bad Neighborhood", was ihren ausgehenden Linkjuice toxisch machen kann (Google Penguin Update).

## Die optimale Verteilung auf deiner Website

Eine der häufigsten Aufgaben für mich als [SEO Freelancer in Berlin](/seo-freelancer-berlin/) ist die Reparatur zerstörter interner Link-Netzwerke. Viele mittelständische Unternehmen fokussieren sich krampfhaft auf den Kauf externer Backlinks, verschenken aber das massive Potenzial, diese hart erkämpfte Autorität auf der eigenen Seite sinnig zu verteilen.

Ein Fehler, den ich regelmäßig in meiner [SEO Sprechstunde](/seo-sprechstunde/) sehe, sind komplett isolierte URLs (Orphan Pages) oder eine flache Architektur, bei der unwichtige Seiten (z.B. Impressum, AGB, veraltete News) über die Hauptnavigation zu viel Linkjuice von der Startseite absaugen.

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <h4 class="text-xl font-bold text-dark mb-2 mt-0">Best Practice: Interne Verlinkung wie ein Wiki</h4>
  <p class="mb-0 text-sm">Nimm dir ein Beispiel an der Wikipedia. Jeder Fachbegriff im Text wird hart kontextuell intern verlinkt. Baue sogenannte <strong>Silo-Strukturen (Content Hubs)</strong>. Wenn du eine starke Ratgeber-Seite zum Thema "Google Ads Optimierung" hast, verlinke von dort aus logisch in die Tiefe (zu spezifischen Kampagnen-Artikeln) und von den tiefen Artikeln wieder zurück zum Hub nach oben. So zirkuliert der Linkjuice im perfekten semantischen Cluster und zeigt Google glasklar die Hierarchie deiner Seite.</p>
</div>

## Linkjuice in Zeiten von KI und GEO

Mit dem Aufkommen der generativen Suche ([Generative Engine Optimization](/glossar/geo/)) verändert sich die Bedeutung des klassischen Linkaufbaus. 

KIs wie LLMs nutzen bei der Beantwortung komplexer Fragen keine PageRank-Berechnung in Echtzeit. Stattdessen gewichten sie *Co-Occurrences* – wie oft dein Markenname im Kontext eines Themas im Trainingsdatensatz auftaucht. Hier wandelt sich der technische "Linkjuice" in eine Art "Semantische Referenz". 

Das bedeutet: Zukünftig wird es immer weniger wichtig sein, *woher* der harte HTML-Link kommt (PageRank), sondern *wer* über dich in welchem Kontext berichtet (Entitäten-Autorität). Ein reiner Text-Mention ohne Link in einem bekannten Fachmagazin kann für KI-Agenten bald wertvoller sein, als ein harter Backlink aus einem anonymen Artikel-Verzeichnis. Wer sich nicht rechtzeitig darauf einstellt, begeht einen der klassischen [80% SEO-Fehler der Zukunft](/blog/80-prozent-seo-fehler-sprechstunde/).

### Zusammenfassung: Linkjuice ist Steuerung

ALOHA 🌻 

<div class="blog-cta-box">
  <h3 class="text-2xl font-bold mb-4">Verschenkst du wertvollen Linkjuice?</h3>
  <p class="mb-6">Ich zeige dir, wie du deine interne Kraft verdoppelst und externe Autorität aufbaust. Mit <a href="https://seranking.com/de/?ga=4169588&source=link" target="_blank" rel="noopener noreferrer">SE Ranking</a> finden wir deine Power-Pages.</p>
  <a href="/kontakt/" class="btn-primary inline-flex">Jetzt Link-Audit anfragen </a>
</div>

* **Lese-Tipp:** [Was ist Authority?](/glossar/authoritativeness-eeat/)
* **Lese-Tipp:** [Interne Verlinkung](/glossar/interne-verlinkung/)
