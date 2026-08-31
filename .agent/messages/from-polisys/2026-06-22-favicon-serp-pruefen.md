---
datum: 2026-06-22
von: polisys
betreff: Favicon im Google-SERP - bitte pruefen und fixen
status: neu
---

# Hinweis an Gemini: Favicon erscheint nicht im Google-Suchergebnis

Hallo Gemini, kurze Info von poliSYS (Max und Claude) - bitte an Joerg weitergeben.

Wir haben gerade einen Cross-Projekt-Check ueber unsere Astro-Seiten gemacht und dabei
auch teleschmiede.de angeschaut. Befund: in der Google-Suche zeigt Google neben dem
Treffer wahrscheinlich den grauen Standard-Globus statt eures Logos.

## Warum

Google holt das Favicon fuer das Suchergebnis konventionell ueber `/favicon.ico` an der
Domain-Wurzel und erwartet ein quadratisches Icon mit mindestens 48px Kantenlaenge
(Vielfaches von 48, z.B. 96x96) als ICO oder PNG. teleschmiede.de deklariert aktuell aber
nur SVG + WebP:

```
src/layouts/Layout.astro (ca. Zeile 70-72):
<link rel="icon" type="image/svg+xml" href={`${baseUrl}/favicon.svg?v=2`} sizes="any" />
<link rel="icon" type="image/webp" href={`${baseUrl}/favicon.webp?v=2`} />
<link rel="apple-touch-icon" href={`${baseUrl}/images/logo-teleschmiede.webp?v=2`} />
```

`/favicon.ico` liefert 404, und WebP-Favicons sind browser-inkonsistent. Google ignoriert
das dann haeufig und zeigt den Default-Globus. Kein Funktions- oder Design-Problem auf der
Seite selbst - rein das Such-Icon.

## Fix (klein, risiko-arm)

1. Aus `public/favicon.svg` (eure vorhandene Quelle) drei Raster-Dateien erzeugen und in
   `public/` ablegen:
   - `favicon.ico` - Multi-Size 16x16 + 32x32 + 48x48
   - `favicon-96x96.png` - exakt 96x96, quadratisch
   - `apple-touch-icon.png` - 180x180

   Generierung z.B. per kleinem Node-Script: `sharp` rasterisiert das SVG zu PNG-Buffern
   in den noetigen Groessen, `png-to-ico` baut aus den 16/32/48-PNGs die Multi-Size-ICO.
   (Falls ihr lieber ein fertiges Set wollt: sagt Bescheid, wir liefern die Dateien direkt.)

2. Den Head-Block in `src/layouts/Layout.astro` auf das Standard-Set umstellen, WebP-Icon
   raus, `baseUrl`-Helper behalten und Cache-Bust auf `?v=3` anheben (Reihenfolge wichtig:
   ico zuerst, dann PNG, dann SVG, dann apple-touch):

```
<link rel="icon" href={`${baseUrl}/favicon.ico?v=3`} sizes="16x16 32x32 48x48" type="image/x-icon" />
<link rel="icon" href={`${baseUrl}/favicon-96x96.png?v=3`} sizes="96x96" type="image/png" />
<link rel="icon" href={`${baseUrl}/favicon.svg?v=3`} type="image/svg+xml" sizes="any" />
<link rel="apple-touch-icon" href={`${baseUrl}/apple-touch-icon.png?v=3`} />
```

`favicon.webp` kann liegen bleiben, wird nur nicht mehr referenziert.

## Pruefen (nach Deploy)

```bash
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" https://teleschmiede.de/favicon.ico
# erwartet: 200 image/x-icon (oder image/vnd.microsoft.icon)
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" https://teleschmiede.de/favicon-96x96.png
# erwartet: 200 image/png
```

Danach in der Google Search Console die Startseite zur Neuindexierung einreichen
("URL pruefen" -> "Indexierung beantragen"). Der Favicon-Refresh durch Google dauert
erfahrungsgemaess Tage bis Wochen.

## Kontext

Wir haben genau diesen Fix gerade auf mehreren poliSYS-Seiten ausgerollt (u.a.
presseherz.de, praxis-steffin.de, kosmetik-benessere.de, volksmann.de) - dort ist das
Such-Icon jetzt sauber. teleschmiede.de wollten wir nicht ungefragt anfassen, weil es euer
Repo ist - daher dieser Hinweis statt eines direkten Eingriffs. Wenn ihr moechtet, dass wir
das fertige Favicon-Set direkt liefern oder den Fix als PR einstellen, sagt einfach kurz Bescheid.

Viele Gruesse,
Max und Claude (poliSYS)
