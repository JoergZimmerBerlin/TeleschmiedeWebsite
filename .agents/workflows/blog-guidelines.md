---
description: Grundanforderungen und Schreibregeln für neue Blogartikel
---

# Blog-Schreibregeln & Struktur (800-1000 Wörter)

Diese Anforderungen gelten für alle neuen Blogartikel auf teleschmie.de, um SEO-Relevanz, Lesbarkeit und Markenidentität zu gewährleisten.

## 1. Umfang & Metadaten
- **Länge:** Jeder Artikel muss zwischen **800 und 1000 Wörtern** liegen.
- **Frontmatter:** Muss `title`, `description`, `date`, `linkedin_url`, `image` und `image_alt` enthalten.
- **URL-Slug:** Kurz, kleingeschrieben, mit Bindestrichen (z.B. `rankscale-ai-tracking`).

## 2. Strukturierter Aufbau
Ein Artikel muss logisch in folgende Abschnitte unterteilt sein:

1.  **Der Hook (Einleitung):**
    - Ein persönlicher Einstieg (z.B. "Da bin ich wochenlang auf der Suche...").
    - Das Problem skizzieren.
2.  **Der Hauptteil (Deep Dive):**
    - Klare Struktur durch `h2` und `h3` Überschriften.
    - Analyse, Features, Praxisbeispiele oder Tests.
    - Verwendung von Listen (`ul`) und fettgedruckten Textstellen (`strong`) als Leseanker.
3.  **Das Fazit:**
    - Zusammenfassung der Erkenntnisse.
    - Persönliche Empfehlung.
4.  **CTA-Box (Call-to-Action):**
    - Eine auffällige Box mit der Klasse `<div class="blog-cta-box">`.
    - Enthält eine direkte Handlungsaufforderung (z.B. Buchung einer SEO-Sprechstunde).

## 3. SEO & Schema (Automatisch)
- Der Artikel generiert automatisch `Article` und `Author` (Jörg Zimmer) Schema-Daten basierend auf dem Frontmatter.
- Sorge dafür, dass `title`, `description` und `image` im Frontmatter präzise und optimiert sind.

## 4. Schreibstil & Tonalität (Brand Voice)
- **Persönlich & Nahbar:** Schreibe in der Ich-Form. Nutze Formulierungen wie "Ich habe getestet...", "Meiner Meinung nach...".
- **Seniorität:** Zeige Expertise ohne unnötigen Jargon. Erkläre komplexe Themen einfach.
- **Begrüßung/Abschied:** Nutze "Moin!" oder vergleichbare lockere Einstiege und schließe immer mit einem **"ALOHA ✌️"**.
- **Layout-Regel:** Nutze kurze Absätze. Sorge für genügend Weißraum (wird durch das `blog/[slug].astro` CSS automatisch unterstützt).

## 5. Bildmaterial
- **Header-Bild:** Hochwertig (PNG/WebP), Format 16:9 oder quadratisch.
- **Speicherort:** `/public/images/blog/`.
- **Git-Hinweis:** Da `public/images` oft in der `.gitignore` ist, neue Bilder mit `git add -f [Pfad]` forcen.
