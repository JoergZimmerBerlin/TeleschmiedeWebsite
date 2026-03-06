---
description: Grundanforderungen und Schreibregeln für neue Blogartikel
---

# Blog-Schreibregeln & Struktur (800-1000 Wörter)

Diese Anforderungen gelten für alle neuen Blogartikel auf teleschmie.de, um SEO-Relevanz, Lesbarkeit und Markenidentität zu gewährleisten.

## 1. Umfang & Metadaten
- **Länge:** Jeder Artikel muss zwischen **800 und 1000 Wörtern** liegen.
- **Frontmatter:** Muss `title`, `description`, `date`, `linkedin_url`, `image`, `image_alt`, `key_takeaways` und `faqs` enthalten. Die `key_takeaways` müssen aus exakt 3 prägnanten Bulletpoints bestehen. Die `faqs` müssen 3-4 relevante Fragen und Antworten enthalten.
- **URL-Slug:** Kurz, kleingeschrieben, mit Bindestrichen (z.B. `rankscale-ai-tracking`).
- **Interne Links:** Alle internen Links müssen zwingend mit einem **abschließenden Trailing Slash** enden (z.B. `[Link](/seite/)` statt `[Link](/seite)`). Dies gilt global für alle Markdown-Dateien und Komponenten.

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
    - Enthält eine direkte Handlungsaufforderung (z.B. Buchung einer SEO-Sprechstunde) oder passenden Affiliate-Link.
5.  **Weiterführende Artikel (Lesetipps):**
    - Nach der CTA-Box müssen 2-3 inhaltlich passende interne Links eingefügt werden, formatiert als `* **Lese-Tipp:** [Titel](/link/)`.

## 3. Authentizität & LinkedIn-Integration
- Integriere regelmäßig **Original-Zitate aus LinkedIn-Posts oder Kommentaren** (eigene oder von Experten).
- Nutze dafür die Blockquote-Syntax (`>`), um Authentizität und Community-Bezug zu stärken.
- Erwähne konkrete Personen oder Diskussionen, um den E-E-A-T Faktor (Experience) zu untermauern.

## 4. SEO & Schema (Automatisch)
- Der Artikel generiert automatisch `Article` und `Author` (Jörg Zimmer) Schema-Daten basierend auf dem Frontmatter.
- Sorge dafür, dass `title`, `description` und `image` im Frontmatter präzise und optimiert sind.

## 5. Schreibstil & Tonalität (Brand Voice)
- **Persönlich & Nahbar:** Schreibe in der Ich-Form. Nutze Formulierungen wie "Ich habe getestet...", "Meiner Meinung nach...".
- **Seniorität:** Zeige Expertise ohne unnötigen Jargon. Erkläre komplexe Themen einfach.
- **Begrüßung/Abschied:** Nutze "Moin!" oder vergleichbare lockere Einstiege und schließe immer mit einem **"ALOHA ✌️"**.
- **Layout-Regel:** Nutze kurze Absätze. Sorge für genügend Weißraum (wird durch das `blog/[slug].astro` CSS automatisch unterstützt).
- **Verbotene Phrasen/Wörter:** Folgende Floskeln/Wörter dürfen in Blogartikeln **niemals** verwendet werden:
    - "Mein Fazit" (Nutze stattdessen z.B. "Lohnt sich das?", "Endgültige Einschätzung", oder ähnliches.)
    - "Linkbuilding" (Nutze stattdessen deutsche Begriffe wie "Linkaufbau" oder thematisch spezifischere Bezeichnungen.)
    - "Keyword-Dichte" (Nutze stattdessen "Termgewichtung" oder "relevante Suchbegriffe".)

## 5. Bildmaterial
- **Header-Bild:** Hochwertig (PNG/WebP), Format 16:9 oder quadratisch.
- **Infografiken:**
    - **Anzahl:** 1-2 Infografiken pro Blogartikel.
    - **Inhalt:** Visualisieren den Inhalt (z.B. Prozesse, Vergleiche, Statistiken).
    - **Stil:** Moderner 3D-Stil mit Lime-Akzenten (`#D9FF00` / `lime-accent`), passend zur Brand Identity von teleschmie.de.
    - **Sprache:** Alle Textelemente innerhalb der Infografiken müssen zwingend auf **Deutsch** sein.
    - **Watermark:** Jede Infografik muss zwingend unten rechts ein kleines Wasserzeichen oder den Text "Jörg Zimmer" enthalten.
    - **Einbau:** Optisch ansprechend in den Textfluss integriert (meist nach relevanten Abschnitten oder vor dem Fazit).
- **Speicherort:** `/public/images/blog/`.
- **Git-Hinweis:** Da `public/images` oft in der `.gitignore` ist, neue Bilder mit `git add -f [Pfad]` forcen.

## 6. Qualitätssicherung
- Vor jedem Release muss der Artikel gemäß dem [QA-Workflow](file:///Users/jorti/Documents/Antigravity/.agents/workflows/qa-workflow.md) geprüft werden.
