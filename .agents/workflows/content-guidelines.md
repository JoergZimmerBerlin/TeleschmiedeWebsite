---
description: Universelle Richtlinien für Content-Erstellung, Design-Standards und Qualitätssicherung (teleschmie.de)
---

# Unified Content & Quality Guidelines (teleschmie.de)

Dieses Dokument ist die einzige Quelle der Wahrheit (Single Source of Truth) für alle redaktionellen und technischen Qualitätsstandards auf der Website.

---

> [!IMPORTANT]
> **Permanenter Auftrag:** Diese Standards sind die absolute Grundlage für *jeden* Inhalt (Texte, Bilder, Code-Komponenten), der für teleschmie.de erstellt wird. Abweichungen sind nur nach expliziter Rücksprache zulässig.

## 1. Jörgs Brand Voice & Personal Style
*Ziel: Authentizität durch Seniorität, Tacheles und Empathie.*

### Tonalität & Schreibstil
- **Der "Digitale Dinosaurier":** Nutze die 24+ Jahre Erfahrung als USP. Keine Angst vor dem Wort "früher", aber immer mit dem Link zur modernen KI-Welt.
- **Tacheles reden:** Keine SEO-Phrasen ("Linkbuilding", "Keyword-Dichte"). Sprich Klartext. Wenn etwas Müll ist, nenn es beim Namen.
- **Metaphern & Analogien:** Nutze verständliche Bilder (z.B. "SEO ist wie ein guter Wein", "Tools sind nur Hämmer").
- **Seniorität meets Aloha:** Kompetent und autoritär in der Sache, aber locker und wertschätzend im Umgang.
- **LinkedIn-Vibe:** Die Texte sollen sich wie ein sehr guter, tiefgründiger LinkedIn-Post lesen. Kurze Absätze, viele Leseanker.

### Redaktionelle Richtlinien (Blog & Glossar)
*Ziel: SEO-Relevanz, Lesbarkeit und Markenidentität.*

### Blogartikel (800-1000 Wörter)
- **Struktur:** Einleitung (Hook), Hauptteil (Deep Dive via h2/h3), Fazit, CTA-Box, Lesetipps.
- **Tonalität:** Authentische Ich-Form. Nutze Formulierungen wie "Ich habe getestet...", "Meiner Meinung nach...".
- **Besonderheiten:** Nutze das Format `💬 Jörgs SEO-Klartext (LinkedIn Insights)` für Einschübe.
- **Begrüßung & Abschied:** Immer mit "Moin!" beginnen und mit "ALOHA ✌️" enden.
- **LinkedIn-Integration:** Zitate aus echten Posts/Kommentaren einbinden, um E-E-A-T (Experience) zu stärken.
- **Trailing Slashes:** Interne Links müssen zwingend auf `/` enden (z.B. `[Link](/seite/)`).

### Metadaten & SEO
- **Frontmatter:** Jeder Artikel benötigt `title`, `description`, `date`, `image`, `image_alt`, `key_takeaways` (exakt 3) und `faqs` (3-4).
- **Slug:** Kurz, kleingeschrieben, Trennung durch Bindestriche.

---

## 2. Design-Standards (Infografiken)
*Ziel: Hochwertige, konsistente Visualisierung komplexer SEO-Themen.*

### Der visuelle Standard (3D Light Standard)
- **Hintergrund:** Reinweiß (`#FFFFFF`) für maximale Klarheit (Clean Desktop Look).
- **Stil:** **Premium Minimalismus**. Moderner isometrischer **3D-Stil**. Keine Comic-Optik, sondern technisch-elegant.
- **Akzentfarbe:** Lime-Grün (`#D9FF00`) als pulsierendes Element.
- **Sprache:** Alle Grafiken und Beschriftungen zwingend auf **Deutsch**.
- **Wasserzeichen:** "Jörg Zimmer" dezent unten rechts.

### Prompt-Vorgabe (DALL-E / Image Gen)
> "A professional, high-end isometric 3D infographic for [THEMA]. Background is pure white (#FFFFFF). Features sleek 3D elements with vibrant lime green (#D9FF00) accents. Typography is modern, clean dark grey. All text in GERMAN: [LABEL 1], [LABEL 2], [LABEL 3]. Small subtle watermark 'Jörg Zimmer' in bottom right corner."

- **Speicherorte:** Blog-Bilder → `/public/images/blog/`, Glossar-Bilder → `src/assets/images/glossar/`.

---

## 3. Qualitätssicherung (Definition of Done)
*Ziel: Fehlerfreie Releases und optimale Nutzererfahrung.*

### Die Checkliste vor jedem Release
1.  **Mobile-First:** Sieht das Layout auf dem Smartphone perfekt aus?
2.  **Konsole:** Keine JavaScript-Fehler oder CSP-Warnungen in den DevTools.
3.  **Schema Check:** Rich Results (Article, FAQ, Person) via Rich Results Test fehlerfrei.
4.  **Link Check:** Alle internen Links enden auf `/`. Keine 404-Fehler.
5.  **Git Check:** Neue Bilder wurden via `git add -f` hinzugefügt (falls nötig).
6.  **Readability:** Überschriften haben ausreichende Abstände (mt-20/mt-16), Absätze nutzen `mb-8`.

---

*Letzter Stand: 11. März 2026*
