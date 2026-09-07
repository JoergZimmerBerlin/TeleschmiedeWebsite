---
title: "PageSpeed 100/100: So wurde die Website schnell"
meta_title: "PageSpeed: So wird die Website schnell (2026)"
description: "PageSpeed: Perfekter Score von 100/100 für deine Website. Erfahre im Detail, welche Optimierungen nötig sind, um Ladezeiten extrem zu senken. (2026)"
meta_description: "PageSpeed: Perfekter Score von 100/100 für deine Website. Erfahre im Detail, welche Optimierungen nötig sind, um Ladezeiten extrem zu senken. (2026)"
date: "2026-01-29"
linkedin_url: "https://www.linkedin.com/posts/joerg-zimmer-seo-sea-freelancer-berlin-spandau_pagespeed-100-perfekte-performance-activity-7290107283416819712-lP49"
image: "../../assets/images/blog/pagespeed-tuning-guide.webp"
image_alt: "PageSpeed 100/100 für teleschmie.de - Jörg Zimmer optimiert die Performance"
category: "Tech SEO & Tools"
tags: []
key_takeaways:
  - "Eine 100 im PageSpeed-Index ist kein Selbstzweck, sondern ein Wettbewerbsvorteil."
  - "Astro überzeugt durch 'Zero JS by default' und schlägt WordPress in der Performance deutlich."
  - "Bilder-Optimierung (WebP/AVIF) und Caching sind die 'Low-Hanging Fruits' für schnelle Ladezeiten."
faqs:
  - question: "Warum ist PageSpeed wichtig für SEO?"
    answer: "Google nutzt die Core Web Vitals als Ranking-Faktor. Eine schnelle Seite verbessert die Nutzererfahrung und führt zu höheren Conversion-Rates."
  - question: "Ist Astro besser als WordPress?"
    answer: "Für reine Content-Seiten und Performance ist Astro überlegen, da es statisches HTML ohne unnötiges JavaScript ausliefert."
  - question: "Was ist die wichtigste Performance-Metrik?"
    answer: "Der LCP (Largest Contentful Paint) ist entscheidend. Er misst, wann der Hauptinhalt gerendert ist – idealerweise in unter 1,5 Sekunden."
---

Diese Website hat einen **PageSpeed Score von 100/100** – und zwar nicht nur auf dem schicken Desktop-Monitor mit Glasfaser-Anschluss, sondern auch auf Mobile. Das ist kein Zufall, kein Glück und auch kein "Voodoo"-Plugin, das alles magisch löst. Es ist das Ergebnis von über 25 Jahren Erfahrung und der radikalen Entscheidung, Performance über alles zu stellen. 

In diesem Artikel lege ich die Karten auf den Tisch. Ich zeige dir jede einzelne Schraube, an der ich gedreht habe, damit diese Seite rennt, als gäbe es kein Morgen.

<figure class="my-8 bg-neutral-50 border border-neutral-200 p-6 md:p-8 rounded-2xl shadow-sm">
  <div class="flex items-center gap-4 mb-4">
    <img 
      src="/assets/images/profile/joerg-zimmer-portrait.webp" 
      alt="Jörg Zimmer - Senior SEO & AI Search Consultant" 
      class="w-14 h-14 rounded-full object-cover object-top shadow-sm border-2 border-lime-accent" 
      width="56" 
      height="56" 
      loading="lazy"
    />
    <div>
      <h4 class="font-bold text-base md:text-lg text-dark mb-0">Jörg Zimmer</h4>
      <p class="text-xs md:text-sm text-neutral-600 mb-0">Senior SEO & AI Search Consultant</p>
    </div>
  </div>
  <blockquote class="text-base md:text-lg text-dark leading-relaxed italic border-l-4 border-lime-accent pl-4 my-4 font-normal">
    „PageSpeed 100 ist kein Ego-Projekt. Es ist die Grundvoraussetzung, um in einer Welt von KI-Antworten und anspruchsvollen mobilen Nutzern überhaupt noch stattzufinden. Wer langsam lädt, verliert sofort.“
  </blockquote>
  <figcaption class="mt-4 pt-3 border-t border-neutral-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
    <span>Experten-Zitat • <cite class="not-italic font-semibold text-neutral-700">Jörg Zimmer</cite></span>
    <a href="https://www.linkedin.com/posts/joerg-zimmer-seo-sea-freelancer-berlin-spandau_pagespeed-100-perfekte-performance-activity-7290107283416819712-lP49" target="_blank" rel="noopener noreferrer" class="font-bold text-lime-700 hover:underline inline-flex items-center gap-1">
      Jörg Zimmer auf LinkedIn folgen →
    </a>
  </figcaption>
</figure>

![PageSpeed Tuning Guide: Die 4 wichtigsten Performance-Module](../../assets/images/blog/pagespeed-tuning-guide.webp)

## Warum ich von 100/100 besessen bin

Manche sagen: "Jörg, 90 reicht doch auch." Meine Antwort: Warum sich mit "Gut" zufrieden geben, wenn "Perfekt" machbar ist? Im modernen SEO ist Performance kein nettes Extra mehr. Es ist das Fundament für nachhaltigen [PageSpeed im SEO](/glossar/pagespeed/). Eine schnelle Website ist der höflichste Gruß, den du einem potenziellen Kunden schicken kannst. Du sagst ihm: "Ich schätze deine Zeit."

Außerdem: Google liebt Speed. In einer Welt, in der KI-Antworten immer mehr Klicks fressen, musst du technisch so sauber sein, dass keine Maschine eine Ausrede hat, dich nicht zu zitieren.

---

## Inhaltsverzeichnis

1. <a href="#die-ausgangslage-content-aus-linkedin" class="hover:underline">Die Ausgangslage: Content aus LinkedIn</a>
2. <a href="#seo-best-practice-bilder-optimieren" class="hover:underline">SEO Best Practice: Bilder optimieren</a>
3. <a href="#seo-best-practice-system-fonts-statt-google-fonts" class="hover:underline">SEO Best Practice: System-Fonts statt Google Fonts</a>
4. <a href="#seo-best-practice-youtube-lazy-loading" class="hover:underline">SEO Best Practice: YouTube Lazy Loading</a>
5. <a href="#seo-best-practice-core-web-vitals-optimieren" class="hover:underline">SEO Best Practice: Core Web Vitals optimieren</a>
6. <a href="#seo-best-practice-statische-generierung" class="hover:underline">SEO Best Practice: Statische Generierung</a>
7. <a href="#faq-eure-brennendsten-fragen-zu-pagespeed" class="hover:underline">FAQ: Eure brennendsten Fragen zu PageSpeed</a>
8. <a href="#was-kostet-so-eine-website" class="hover:underline">Was kostet so eine High-Performance-Website?</a>

---

## Die Ausgangslage: Content-Recycling mit Hürden

Fast alle Inhalte dieser Website stammen ursprünglich aus meinen LinkedIn-Posts. Das ist strategisches Content-Recycling. Aber LinkedIn liefert mir Bilder und Formate, die für das Web erst mal "schmutzig" sind. 

Die Bilder von LinkedIn haben oft Kryptische URLs, die nach ein paar Wochen ablaufen (Hotlinking-Tod!), sie sind meist viel zu groß und haben keine modernen Formate wie WebP. Wenn ich die einfach so übernommen hätte, wäre mein Score direkt auf 60 abgerutscht. Ich musste also jedes einzelne Element anfassen.

---

## SEO Best Practice: Bilder radikal optimieren

### Lokale Speicherung ist Pflicht
Ich habe jedes LinkedIn-Bild heruntergeladen und lokal auf den Server gepackt. Das ist Schritt eins für Stabilität. Keine Abhängigkeit von externen CDN-URLs, die kommen und gehen.

### WebP: Das neue Gold der Bildformate
Jedes Bild wurde in WebP konvertiert. Warum? Weil es bei gleicher Qualität ca. 30% kleiner ist als ein JPG. Kleiner bedeutet schneller. Schneller bedeutet glücklichere Nutzer.

### Alt-Texte: Google soll wissen, was wir zeigen
Viele vergessen das Thema Barrierefreiheit. Jedes Bild hat einen individuellen Alt-Text bekommen. Das hilft nicht nur Screenreadern, sondern sorgt dafür, dass meine Bilder auch in der Google Bildersuche ranken (Stichwort: Bilder-SEO).

```html
<img
  src="/images/profile/joerg-lifestyle.webp"
  alt="Jörg Zimmer - SEO Experte aus Berlin Spandau vor dem Laptop"
  width="800"
  height="600"
/>
```

**Wichtig:** Die `width` und `height` Angaben verhindern den zuckenden Layout-Effekt beim Laden (CLS). Das ist einer der kritischsten Punkte für das "Gefühl" einer Website.

---

## SEO Best Practice: Die Font-Diät (System-Fonts)

Google Fonts sind schick, ja. Aber sie kosten Zeit. Eine extra DNS-Verbindung, ein extra Request, das Rendern... das sind wertvolle Millisekunden. Ich habe mich für native System-Fonts entschieden.

Das heißt: Auf einem Mac siehst du die Apple-Schrift, auf Windows die Microsoft-Schrift. Das Ergebnis ist eine Seite, die Text anzeigt, bevor überhaupt das erste Stylesheet fertig geladen ist. Das nennt man "Zero-Latency-Typography".

---

## SEO Best Practice: YouTube-Fassaden (Facade Pattern)

Videos sind der Tod jeder Performance – wenn man sie falsch einbettet. Ein normales YouTube-Iframe lädt im Hintergrund hunderte Kilobyte an JavaScript, noch bevor du auf "Play" geklickt hast.

**Meine Lösung:** Ich lade nur eine "Fassade". Ein kleines Bild mit einem Fake-Play-Button. Erst wenn der Nutzer wirklich klickt, lade ich den schweren YouTube-Player. Der Effekt: Ein Geschwindigkeits-Boost von 40+ Punkten im PageSpeed Score.

---

## FAQ: Eure brennendsten Fragen zu PageSpeed

### 1. Brauche ich wirklich 100/100 für gute Rankings?
Ehrlich gesagt: Nein. Google sagt, alles im "grünen Bereich" (über 90) ist erst mal okay. Aber: In hart umkämpften Nischen kann der Speed das Zünglein an der Waage sein. Außerdem sinkt mit jeder Millisekunde Ladezeit deine Conversion-Rate. 100/100 ist also eher eine Investition in deinen Umsatz als nur in SEO.

### 2. Kann ich das mit WordPress auch schaffen?
Möglich? Ja. Schwierig? Absolut. WordPress lädt von Haus aus viel Ballast. Du brauchst sehr gute Caching-Plugins, eine radikale Reduzierung der Plugins und meistens ein Custom-Theme. Astro (was ich hier nutze) ist da im Vorteil, weil es standardmäßig gar kein JavaScript an den Browser schickt.

![Vergleich: WordPress (Schwerfällig) vs. Astro (Minimalistisch & Schnell)](../../assets/images/blog/astro-vs-wordpress-performance.webp)

### 3. Was ist die wichtigste Metrik für mich?
Konzentriere dich auf den **LCP (Largest Contentful Paint)** und die [Core Web Vitals](/glossar/core-web-vitals/). Das ist der Moment, in dem der Nutzer das Gefühl hat: "Ah, jetzt ist die Seite da." Wenn der unter 1.5 Sekunden liegt, bist du vorne mit dabei.

---

## Das Ergebnis: Ein digitales Rennauto

Nach all diesen Maßnahmen zeigt **Google PageSpeed Insights** nun vier grüne Kreise. Performance, Barrierefreiheit, Best Practices und SEO – alles am Anschlag. Damit ich diese Ergebnisse halte, auditiere ich die Seite regelmäßig mit <a href="https://seranking.com/de/?ga=4169588&source=link" target="_blank" rel="noopener noreferrer">SE Ranking</a> und prüfe mit <a href="https://rankscale.ai/?via=offer" target="_blank" rel="noopener noreferrer">Rankscale</a>, wie die Geschwindigkeit auf meine KI-Präsenz einzahlt.

### Tacheles am Ende

Du fragst dich jetzt sicher: "Jörg, was muss ich auf den Tisch legen für so ein digitales Rennauto?" 

Es ist wie beim Autokauf: Ein Standard-Modell ist günstig, aber wenn du Performance willst, musst du ins Tuning investieren. Eine Seite wie diese, mit ca. 20 Unterseiten und optimiertem LinkedIn-Content, ist bei befreundeten Developern ab ca. 1.000 € machbar. Wenn du allerdings ein komplexes Design oder hunderte Produkte hast, steigt der Aufwand natürlich.

<div class="my-8 bg-neutral-900 text-white p-8 rounded-2xl border border-neutral-700 text-center shadow-md">
  <h3 class="text-xl md:text-2xl font-bold text-white mb-2 !mt-0 !border-none !pb-0">
    Willst du auch ein digitales Rennauto?
  </h3>
  <p class="text-neutral-300 text-sm max-w-xl mx-auto mb-6">
    Ich helfe dir, deine Website technisch auf Weltklasse-Niveau zu heben und Ladezeiten drastisch zu senken.
  </p>
  <a href="/kontakt/" class="btn-primary inline-flex">
    <span>Jetzt Performance-Check anfragen</span>
    <span aria-hidden="true">→</span>
  </a>
</div>

<!-- CTA Box -->
<div class="my-10 bg-dark text-white p-8 rounded-3xl border border-white/10 text-center shadow-md">
  <h3 class="text-xl md:text-2xl font-bold text-white mb-3 !mt-0 !border-none !pb-0">
    Jetzt an der Diskussion teilnehmen
  </h3>
  <p class="text-gray-300 text-sm max-w-xl mx-auto mb-6">
    Diskutiere mit Jörg Zimmer und der SEO-Community auf LinkedIn über diesen Beitrag.
  </p>
  <a href="https://www.linkedin.com/posts/joerg-zimmer-seo-sea-freelancer-berlin-spandau_pagespeed-100-perfekte-performance-activity-7290107283416819712-lP49" target="_blank" rel="noopener noreferrer" class="btn-primary">
    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    <span>Beitrag auf LinkedIn öffnen</span>
    <span aria-hidden="true">→</span>
  </a>
</div>

---

### Weiterführende Artikel
* **Lese-Tipp:** [Core Web Vitals: Warum dein UX-Bericht wichtiger ist als du denkst](/blog/core-web-vitals-ux-bericht/)
* **Lese-Tipp:** [25 Jahre SEO - und wir machen immer noch die gleichen Fehler](/blog/24-jahre-seo-gleiche-fehler/)
* **Lese-Tipp:** [Sistrix vs. SE Ranking: Welches Tool liefert bessere Audits?](/blog/sistrix-vs-se-ranking/)
