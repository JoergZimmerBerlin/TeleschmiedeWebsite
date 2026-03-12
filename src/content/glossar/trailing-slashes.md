---
title: "Trailing Slashes"
description: "Trailing Slashes (der Schrägstrich am Ende einer URL) sind ein oft übersehenes technisches SEO-Detail, das zu Duplicate-Content-Problemen und Ranking-Verlusten führen kann."
date: "2026-03-10"
image: "../../assets/images/glossar/glossar-theme-technical.webp"
related_terms: ["technisches-seo", "crawling-vs-indexing", "robots-txt", "sitemap"]
key_takeaways:
  - "Duplicate Content Gefahr: /seite und /seite/ sind für Google zwei verschiedene URLs – ohne Canonical wird es problematisch."
  - "Framework-Abhängig: Jedes Framework (Astro, WordPress, Next.js) handhabt Trailing Slashes anders."
  - "Konsistenz ist King: Egal ob mit oder ohne Slash – Hauptsache, du entscheidest dich für EINE Variante und setzt sie konsequent um."
faqs:
  - question: "Ist es besser, URLs mit oder ohne Trailing Slash zu verwenden?"
    answer: "Es gibt keine 'richtige' Antwort – beides ist technisch korrekt. Entscheidend ist die Konsistenz. Wenn du dich für eine Variante entscheidest, musst du sie überall durchziehen: In der Sitemap, in internen Links, in Canonical Tags und in der Google Search Console. Bei meinen eigenen Projekten nutze ich konsistent Trailing Slashes (z.B. /glossar/trailing-slashes/), weil Astro das standardmäßig so handhabt. Mische niemals beide Varianten – das führt zu Duplicate Content."
  - question: "Was passiert, wenn ich beide Varianten (mit und ohne Slash) im Einsatz habe?"
    answer: "Dann hat Google im schlimmsten Fall zwei verschiedene URLs mit identischem Inhalt im Index – der Klassiker für Duplicate Content. Google muss dann selbst entscheiden, welche Variante die 'richtige' ist, und dein Linkjuice wird auf zwei URLs aufgeteilt statt konzentriert. Die Lösung: 301-Redirects von der ungewünschten auf die gewünschte Variante und ein sauberes Canonical Tag. In der Google Search Console kannst du unter 'URL-Prüfung' checken, welche Version Google bevorzugt."
  - question: "Wie konfiguriere ich Trailing Slashes in meinem Framework korrekt?"
    answer: "Das hängt vom Stack ab. In Astro setzt du 'trailingSlash: always' oder 'trailingSlash: never' in der astro.config.mjs. In Next.js gibt es die trailingSlash-Option in next.config.js. In WordPress steuert das die Permalink-Struktur in den Einstellungen. Auf meiner Seite (Astro-basiert) habe ich 'trailingSlash: always' konfiguriert – so enden alle URLs sauber auf einem Slash und es gibt keine Inkonsistenzen."
---

Moin!

Klingt nach einem Nerd-Detail? Ist es auch. Aber dieses Nerd-Detail kann der Unterschied zwischen sauberem [technischem SEO](/glossar/technisches-seo/) und einem chaotischen Duplicate-Content-Desaster sein.

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <p class="font-bold text-lime-600 mb-2">💬 Jörgs SEO-Klartext (LinkedIn Insights)</p>
  <p class="italic text-dark mb-0">"Unsere wichtigste Skill ist die Übersetzung von 'Canonical Tag fehlt' in 'Wir verlieren gerade Umsatz, Chef'."</p>
</div>

Ein **Trailing Slash** ist der Schrägstrich `/` am Ende einer URL:
*   `https://teleschmie.de/glossar/` ← **mit** Trailing Slash
*   `https://teleschmie.de/glossar` ← **ohne** Trailing Slash

Für den Nutzer sieht das gleich aus. Für Google sind es **zwei verschiedene URLs**. Und genau hier beginnt das Problem.

## Warum Trailing Slashes ein SEO-Problem sein können

Wenn deine Website beide Varianten ausliefert (also `/seite` und `/seite/` zeigen denselben Inhalt), passiert Folgendes:

1.  **Duplicate Content:** Google indexiert möglicherweise beide Versionen. Dein Content existiert doppelt im Index.
2.  **Linkjuice-Split:** Externe [Backlinks](/glossar/linkbuilding/) verteilen sich auf zwei URLs statt sich auf einer zu konzentrieren.
3.  **Crawl-Budget Verschwendung:** Der [Crawler](/glossar/crawler/) besucht beide Varianten – das ist doppelter Aufwand für null Mehrwert.
4.  **Analytics-Chaos:** Deine Tracking-Daten sind auf zwei URLs verteilt, was deine Auswertungen verfälscht.

## Die Lösung: Konsistenz + Redirects

### 1. Entscheide dich für eine Variante
In deiner Framework-Konfiguration legst du fest: **immer mit** oder **immer ohne** Trailing Slash.

<div class="my-8 bg-[#1A1A1A] text-white p-8 rounded-2xl font-mono text-sm leading-relaxed overflow-x-auto shadow-inner">
  <p class="mb-2 text-gray-400">// astro.config.mjs (Beispiel aus meiner Config)</p>
  <p class="mb-2"><span class="text-lime-400">export default</span> defineConfig({</p>
  <p class="mb-2 ml-4"><span class="text-lime-400">trailingSlash:</span> 'always',</p>
  <p class="mb-0">});</p>
</div>

### 2. 301-Redirects einrichten
Leite die ungewünschte Variante per 301-Redirect auf die gewünschte um. Das kann über die `.htaccess` (Apache), `nginx.conf` oder direkt im Framework geschehen.

### 3. Sitemap und Canonical prüfen
Stelle sicher, dass deine [Sitemap](/glossar/sitemap/) nur URLs in der gewählten Variante enthält. Und dass jede Seite ein Canonical Tag hat, das auf die korrekte URL zeigt.

### 4. Interne Links vereinheitlichen
Prüfe alle internen Links in deinem Content – verlinken sie konsistent auf die richtige Variante? Ein einziger falscher Link kann eine Redirect-Kette auslösen, die deinen [PageSpeed](/glossar/pagespeed/) verschlechtert.

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <h4 class="text-xl font-bold text-dark mb-2 mt-0">Praxis-Check: So testest du es</h4>
  <p class="mb-0 text-sm">Ruf in deinem Browser beide Varianten deiner URL auf (mit und ohne Slash). Wirst du weitergeleitet? Zeigen beide denselben Inhalt ohne Redirect? Schau in die Google Search Console unter 'Seitenindexierung' – wenn du dort beide Varianten siehst, hast du ein Problem.</p>
</div>

## Trailing Slashes und verschiedene Frameworks

| Framework | Standard | Konfiguration |
|---|---|---|
| **Astro** | `always` (mit Slash) | `trailingSlash` in astro.config.mjs |
| **Next.js** | ohne Slash | `trailingSlash: true` in next.config.js |
| **WordPress** | mit Slash | Permalink-Einstellungen |
| **Hugo** | mit Slash | `uglyURLs` in config.toml |

## Mein Tacheles-Rat für dich

Öffne jetzt deine Website und teste es: Ruf eine beliebige Seite einmal mit und einmal ohne Trailing Slash auf. Leitet eine Variante auf die andere weiter? Perfekt. Wenn nicht, musst du handeln. Prüfe deine Framework-Config, setze 301-Redirects, und durchlauf deine Sitemap. Es sind 30 Minuten Arbeit, die dir monatelangen Ranking-Ärger ersparen können.

ALOHA ✌️

---

<div class="blog-cta-box">
  <h3 class="text-2xl font-bold mb-4">Technisches SEO macht dir Kopfschmerzen?</h3>
  <p class="mb-6">Trailing Slashes, Redirects, Canonical Tags – ich bringe deine technische Basis in Ordnung. Wir nutzen [SE Ranking](https://seranking.com/de/?ga=4169588&source=link) für das technische Audit und [Rankscale](https://app.rankscale.ai/auth/signup?via=joerg) für die Messung deines KI-Erfolgs.</p>
  <a href="/seo-sprechstunde/" class="btn-primary inline-flex">Jetzt technisches SEO-Audit anfragen →</a>
</div>

* **Lese-Tipp:** [Technisches SEO verstehen](/glossar/technisches-seo/)
* **Lese-Tipp:** [Crawling vs. Indexing](/glossar/crawling-vs-indexing/)
* **Lese-Tipp:** [Robots.txt richtig konfigurieren](/glossar/robots-txt/)
