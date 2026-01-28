---
title: "PageSpeed 100/100: So wurde diese Website blitzschnell"
description: "Ein Blick hinter die Kulissen: Welche Optimierungen waren nötig, um einen perfekten PageSpeed Score von 100/100 zu erreichen?"
date: "2026-01-29"
linkedin_url: "https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/"
image: "/images/pages/hero-pose.jpg"
image_alt: "PageSpeed 100/100 - So wurde teleschmie.de blitzschnell"
---

Diese Website hat einen **PageSpeed Score von 100/100** – sowohl auf Mobile als auch auf Desktop. Kein Zufall, sondern das Ergebnis gezielter Optimierungen. In diesem Artikel zeige ich dir alle Maßnahmen, die dafür nötig waren.

---

## Inhaltsverzeichnis

1. [Die Ausgangslage: Content aus LinkedIn](#die-ausgangslage-content-aus-linkedin)
2. [SEO Best Practice: Bilder optimieren](#seo-best-practice-bilder-optimieren)
3. [SEO Best Practice: System-Fonts statt Google Fonts](#seo-best-practice-system-fonts-statt-google-fonts)
4. [SEO Best Practice: YouTube Lazy Loading](#seo-best-practice-youtube-lazy-loading)
5. [SEO Best Practice: Core Web Vitals optimieren](#seo-best-practice-core-web-vitals-optimieren)
6. [SEO Best Practice: Statische Generierung](#seo-best-practice-statische-generierung)
7. [Das Ergebnis: Perfekte Scores](#das-ergebnis-perfekte-scores)
8. [Was kostet so eine Website?](#was-kostet-so-eine-website)

---

## Die Ausgangslage: Content aus LinkedIn

Alle Inhalte dieser Website – Texte, Bilder, sogar die Blog-Artikel – stammen ursprünglich aus meinen LinkedIn-Posts. Das spart enorm Zeit bei der Content-Erstellung, bringt aber technische Herausforderungen mit sich.

### Das Problem mit LinkedIn-Bildern

LinkedIn-Bilder haben mehrere Nachteile für schnelle Websites:

- **Ablaufdatum in der URL:** Nach einigen Wochen laden die Bilder nicht mehr
- **Keine Größenoptimierung:** Oft größer als nötig
- **Fehlende Alt-Texte:** Schlecht für SEO und Barrierefreiheit
- **Kein modernes Bildformat:** Nur JPG/PNG, kein WebP

---

## SEO Best Practice: Bilder optimieren

### Lokale Speicherung statt Hotlinking

Alle LinkedIn-Bilder wurden heruntergeladen und lokal gespeichert. Das verhindert Ausfälle durch ablaufende URLs und gibt volle Kontrolle über die Optimierung.

### WebP-Format für kleinere Dateigrößen

Jedes Bild wurde in das moderne **WebP-Format** konvertiert:

- **25-35% kleinere Dateigröße** als JPG
- **Gleiche visuelle Qualität**
- **Von allen modernen Browsern unterstützt**

### Alt-Texte für SEO und Accessibility

Jedes Bild erhielt einen beschreibenden Alt-Text:

```html
<img
  src="/images/profile/joerg-zimmer.webp"
  alt="Jörg Zimmer - SEO Freelancer aus Berlin-Spandau"
/>
```

**Warum wichtig für SEO:**
- Google kann Bilder besser indexieren
- Erscheint in der Google Bildersuche
- Verbessert die Barrierefreiheit (Screenreader)

### Explizite Bildabmessungen

Jedes Bild hat `width` und `height` Attribute:

```html
<img
  src="/images/hero.webp"
  alt="..."
  width="1200"
  height="630"
/>
```

**SEO-Vorteil:** Verhindert Layout-Verschiebungen (Cumulative Layout Shift / CLS) – ein wichtiger Core Web Vital.

---

## SEO Best Practice: System-Fonts statt Google Fonts

### Das Problem mit Google Fonts

Viele Websites laden Schriftarten von Google Fonts. Das kostet Performance:

| Problem | Auswirkung |
|---------|------------|
| Zusätzliche DNS-Anfrage | +100-200ms Ladezeit |
| Render-Blocking CSS | Verzögerte Darstellung |
| DSGVO-Bedenken | Cookie-Banner nötig |

### Die Lösung: Native System-Fonts

Diese Website nutzt ausschließlich Schriftarten, die bereits auf dem Gerät installiert sind:

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**Das Ergebnis:**

| Gerät | Geladene Schriftart |
|-------|---------------------|
| Mac/iPhone | San Francisco |
| Windows | Segoe UI |
| Android | Roboto |

**SEO-Vorteile:**
- ✅ Keine externen Requests für Fonts
- ✅ Sofortige Textdarstellung (kein FOUT/FOIT)
- ✅ DSGVO-konform ohne Cookie-Banner
- ✅ Schnellere First Contentful Paint (FCP)

---

## SEO Best Practice: YouTube Lazy Loading

### Das Problem: YouTube als Performance-Killer

Ein einziges YouTube-Embed lädt standardmäßig:

| Ressource | Größe | Blockierzeit |
|-----------|-------|--------------|
| JavaScript | 500+ KB | ~500ms |
| CSS-Dateien | 90+ KB | - |
| Iframe | - | Main-Thread blockiert |

**Ergebnis:** Der YouTube-Player allein kostete **45 PageSpeed-Punkte!**

### Die Lösung: Facade Pattern

Statt YouTube direkt einzubetten, zeigen wir zunächst nur ein Vorschaubild mit Play-Button:

**Schritt 1:** Nur das Thumbnail laden (~20 KB)
```html
<img src="https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg" />
```

**Schritt 2:** SVG-Play-Button darüber legen

**Schritt 3:** Bei Klick → echten YouTube-Player laden

**SEO-Vorteile:**
- ✅ Keine YouTube-Last beim initialen Seitenaufruf
- ✅ Dramatisch verbesserte Ladezeit
- ✅ Bessere Core Web Vitals (LCP, TBT)
- ✅ Nutzer, die das Video nicht anschauen, profitieren von schneller Seite

---

## SEO Best Practice: Core Web Vitals optimieren

Die **Core Web Vitals** sind offizielle Google-Ranking-Faktoren. So wurden sie optimiert:

### LCP (Largest Contentful Paint) optimieren

Das größte sichtbare Element soll in unter 2,5 Sekunden laden.

**Maßnahmen:**
- Hero-Bild mit `fetchpriority="high"` priorisieren
- Kritische Ressourcen preloaden
- Keine Render-Blocking Resources

```html
<img
  src="/images/hero.webp"
  loading="eager"
  fetchpriority="high"
/>
```

### CLS (Cumulative Layout Shift) vermeiden

Keine Layout-Verschiebungen während des Ladens.

**Maßnahmen:**
- Alle Bilder mit expliziten Dimensionen (`width`, `height`)
- Fonts sofort verfügbar (System-Fonts)
- Kein nachladen von Inhalten über dem Fold

### FID/INP (First Input Delay / Interaction to Next Paint)

Schnelle Reaktion auf Nutzer-Interaktionen.

**Maßnahmen:**
- Minimales JavaScript
- Kein Main-Thread-Blocking
- YouTube erst bei Interaktion laden

---

## SEO Best Practice: Statische Generierung

### Warum Astro?

Diese Website wurde mit **Astro** gebaut – einem Static Site Generator, der standardmäßig kein JavaScript ausliefert.

**Vorteile für SEO:**

| Feature | SEO-Vorteil |
|---------|-------------|
| Statische HTML-Dateien | Schnellste mögliche Auslieferung |
| Kein Server-Rendering | Keine Wartezeit auf Datenbank |
| Automatisches CSS-Purging | Nur genutztes CSS wird geladen |
| HTML-Minifizierung | Kleinere Dateigröße |

### Lazy Loading für Below-the-Fold Content

Bilder unterhalb des sichtbaren Bereichs werden erst geladen, wenn der Nutzer scrollt:

```html
<img src="/images/blog/artikel.webp" loading="lazy" />
```

**SEO-Vorteil:** Schnellere initiale Ladezeit, bessere Core Web Vitals.

### Minimales CSS durch Tailwind Purging

Tailwind CSS entfernt automatisch alle ungenutzten Styles. Die finale CSS-Datei ist nur **~15 KB** groß – statt mehrerer hundert KB bei ungepurgtem CSS.

---

## Das Ergebnis: Perfekte Scores

Nach allen Optimierungen zeigt **Google PageSpeed Insights**:

| Kategorie | Score |
|-----------|-------|
| 🟢 Performance | **100/100** |
| 🟢 Accessibility | **94/100** |
| 🟢 Best Practices | **100/100** |
| 🟢 SEO | **100/100** |

### Core Web Vitals im Detail

| Metrik | Wert | Status |
|--------|------|--------|
| LCP (Largest Contentful Paint) | < 1.5s | 🟢 Gut |
| FID (First Input Delay) | < 50ms | 🟢 Gut |
| CLS (Cumulative Layout Shift) | < 0.05 | 🟢 Gut |

---

## Zusammenfassung: SEO Best Practices Checkliste

✅ **Bilder:** WebP-Format, Alt-Texte, explizite Dimensionen, Lazy Loading
✅ **Fonts:** System-Fonts statt Google Fonts
✅ **Videos:** Facade Pattern statt direktes Embed
✅ **Core Web Vitals:** LCP, CLS, FID optimiert
✅ **Hosting:** Statische Generierung, CDN-freundlich
✅ **CSS:** Minimiert, nur genutztes CSS
✅ **JavaScript:** Minimal, kein Render-Blocking

---

## Was kostet so eine Website?

Du fragst dich, was eine solche Website kosten würde? Hier eine realistische Einschätzung:

### Leistungsumfang

- ~20 Unterseiten
- Content aus LinkedIn extrahiert
- PageSpeed 100/100
- SEO-optimiert
- Responsive Design

### Zeitrahmen & Kosten

| Aspekt | Wert |
|--------|------|
| **Umsetzungszeit** | Unter 3 Tagen |
| **Kosten** | Ab 1.000 € |

Bei Sonderwünschen – etwa individuellem Design, speziellen Funktionen oder umfangreichen Anpassungen – kann es natürlich auch deutlich aufwendiger und teurer werden.

### Interesse?

Für konkrete Angebote gerne anfragen. Ich vermittle Aufträge zu mit mir befreundeten Developern in allen Preisklassen – vom Freelancer bis zur Agentur.

**[Jetzt Kontakt aufnehmen](/kontakt)**
