---
title: "Core Web Vitals (CWV)"
description: "Die Core Web Vitals sind ein essenzielles Set standardisierter Metriken von Google, die die reale User Experience (UX) einer Webseite quantifizieren. Erfahre alles über LCP, INP und CLS."
date: "2026-03-10"
related_terms: ["geo"]
---

Die Core Web Vitals (CWV) sind offizielle Rankingfaktoren im Google-Algorithmus, die sich nicht auf den Inhalt (*Was steht auf der Seite?*), sondern auf die User Experience (*Wie fühlt sich die Bedienung der Seite an?*) konzentrieren. Sie wurden von Google ins Leben gerufen, um Webentwicklern und SEOs weltweit einen objektiven, messbaren Standard an die Hand zu geben, um Ladezeiten, Interaktivität und visuelle Stabilität plattformübergreifend bewerten zu können.

Da Google seit Jahren dem "Mobile First"-Paradigma folgt, sind die Core Web Vitals für die mobile Ansicht einer Website von kritischer Bedeutung. In umkämpften Suchergebnislisten (SERPs) kann ein "rotes" Core Web Vitals Dashboard den entscheidenen Unterschied zwischen Platz 3 und Platz 1 ausmachen.

## Die drei Hauptmetriken im Detail

Google misst Hunderte von Signalen, doch aktuell definieren drei zentrale Metriken die "Core" Experience. Diese werden kontinuierlich evaluiert und von Zeit zu Zeit von Google angepasst (wie z. B. der kürzliche Wechsel von FID zu INP).

<div class="my-8 bg-gray-50 border border-gray-200 p-8 rounded-2xl shadow-sm">
  <h3 class="text-xl font-bold text-dark mt-0 mb-4 text-center">Die CWV Schwellenwerte im Überblick</h3>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
    <div class="p-4 bg-white rounded-lg border-b-4 border-green-500 shadow-sm">
      <div class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">LCP (Ladezeit)</div>
      <div class="text-3xl font-black text-dark mb-1">< 2,5<span class="text-lg">s</span></div>
      <div class="text-xs text-gray-400">Largest Contentful Paint</div>
    </div>
    <div class="p-4 bg-white rounded-lg border-b-4 border-green-500 shadow-sm">
      <div class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">INP (Interaktion)</div>
      <div class="text-3xl font-black text-dark mb-1">< 200<span class="text-lg">ms</span></div>
      <div class="text-xs text-gray-400">Interaction to Next Paint</div>
    </div>
    <div class="p-4 bg-white rounded-lg border-b-4 border-green-500 shadow-sm">
      <div class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">CLS (Stabilität)</div>
      <div class="text-3xl font-black text-dark mb-1">< 0.1</div>
      <div class="text-xs text-gray-400">Cumulative Layout Shift</div>
    </div>
  </div>
</div>

### 1. Largest Contentful Paint (LCP) - Fokus Ladezeit
Der LCP misst die Renderzeit des *größten Bildes oder Textblocks*, der innerhalb des sichtbaren Bereichs (Viewport) des Nutzers auf dem Bildschirm gerendert wird. Er markiert psychologisch den Punkt, an dem der Hauptinhalt der Seite (z. B. das große Hero-Image eines Artikels oder die wichtigste Überschrift) "geladen" hat.

*   **Gut (Grün):** Der LCP sollte bei unter 2,5 Sekunden liegen.
*   **Verbesserungswürdig (Orange):** Zwischen 2,5 und 4,0 Sekunden.
*   **Schlecht (Rot):** Alles über 4,0 Sekunden.

**Optimierungshebel für den LCP:** Bessere Server-Antwortzeiten (TTFB, Time to First Byte), Implementierung von schnellen CDNs, moderne Bildformate wie WebP/AVIF, Lazy Loading für sichtfeld-fremde Bilder, sowie das Priorisieren des kritischen Rendering-Pfades (`<link rel="preload">`).

### 2. Interaction to Next Paint (INP) - Fokus Reaktivität
INP hat im März 2024 den alten "First Input Delay" (FID) abgelöst. Während der alte FID nur die Verzögerung nach der *allerersten* Interaktion auf einer Seite gemessen hat, überwacht der INP die Latenz *aller* Klicks, Taps und Tastatureingaben während der *gesamten Lebensdauer* des Seitenbesuchs. Ein klassisches Problem mit einem schlechten INP: Man drückt auf dem Handy das "Hamburger-Menü", aber der Browser ist mit schweren JavaScript-Aufgaben blockiert (Main-Thread Blocking), sodass das Menü erst eine halbe Sekunde später aufspringt.

*   **Gut (Grün):** Unter 200 Millisekunden.
*   **Verbesserungswürdig (Orange):** Zwischen 200 und 500 Millisekunden.
*   **Schlecht (Rot):** Über 500 Millisekunden.

**Optimierungshebel für den INP:** Aggressives Minimieren von JavaScript, Auslagern von Drittanbieter-Skripten (Tracking, Chatbots), Code-Splitting und die Nutzung von Web Workern für schwere Hintergrundberechnungen, um den Main-Thread freizuhalten.

### 3. Cumulative Layout Shift (CLS) - Fokus Visuelle Stabilität
Der CLS misst die Summe aller unerwarteten Layoutverschiebungen, die während der Lebensdauer der Seite auftreten. Jeder kennt das Problem vom Nachrichtenseiten lesen: Man will einen Absatz lesen oder auf einen Link klicken, doch in dem Moment rendert weiter oben auf der Seite ein asynchron geladenes Werbebanner, der Text "springt" ruckartig nach unten und man klickt fälschlicherweise auf die Anzeige. Solche Verschiebungen erzeugen massiven Frust (Rage-Clicks) beim UX.

*   **Gut (Grün):** Unter 0.1 (Einheitenlose Punktezahl anhand einer Formel aus Impact Fraction und Distance Fraction).
*   **Verbesserungswürdig (Orange):** Zwischen 0.1 und 0.25.
*   **Schlecht (Rot):** Über 0.25.

**Optimierungshebel für CLS:** Immer statische Breiten- und Höhenattribute (`width` und `height`) bei Bildern und `iframes` angeben. Platzhalter (Skeleton-Screens) reservieren, wenn man Boxen oder Widgets per JavaScript später nachlädt, damit der Browser den Platz nicht im Nachhinein freischaufeln muss. Webfonts klug laden (z. B. `font-display: swap` oder Preloading), um den sogenannten "Flash of Unstyled Text (FOUT)" zu minimieren, der ebenfalls Layouts zerschießen kann.

## Warum "CrUX"-Daten die wahre Quelle sind
Ein häufiger Fehler im technischen SEO ist die Verwechslung von "Lab-Daten" und "Field-Daten". Wenn du Lighthouse in den Chrome DevTools drückst, simuliert *dein persönlicher Laptop* die Website-Geschwindigkeit (Lab Data). Google rankt eine Website jedoch auf Basis der real gemessenen Erfahrung der tatsächlichen echten menschlichen Besucher. 

Diese echten Daten werden anonym von Milliarden Chrome-Browsern gesammelt und heißen **Chrome User Experience Report (CrUX)**. In Googles Search Console (unter "Core Web Vitals") siehst du exakt diese real gemessenen Felddaten. Es dauert meist über 28 Tage, bis Optimierungsmaßnahmen am Code tatsächlich grüne Kurven im CrUX-Report bewirken – eine Tugend der Geduld ist hier beim SEO unabdingbar, genau wie ich in den häufigsten [80% SEO-Fehlern in meiner Sprechstunde](/blog/80-prozent-seo-fehler-sprechstunde/) oft aufzeige. 

Um CWVs langfristig im Auge zu behalten und mit dem Wettbewerb zu vergleichen, empfehle ich den professionellen Einsatz starker Tool-Suiten. Mehr zu den Tooling-Möglichkeiten und den Marktführern findest du in meinem Deep-Dive Vergleich: [Sichtbarkeitsindex – Sistrix vs. SE Ranking](/blog/sistrix-vs-se-ranking/).

## Zusammenfassung der Performance Metriken
Core Web Vitals bringen ein Maß an Objektivität in eine ansonsten subjektive "Design"-Debatte. Es nützt der schönste Content und die ausgefeilteste [GEO](/glossar/geo) Architektur nichts, wenn der Besucher die Seite vor dem vollendeten Rendern (wegen einem extrem schlechten LCP) genervt wieder verlässt (Bounce Rate). Technische Exzellenz durch grüne Core Web Vitals ist die notwendige Hausaufgabe jeder professionell betriebenen Website.
