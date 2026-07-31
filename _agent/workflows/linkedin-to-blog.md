---
description: Die vollautomatische "Content-Fabrik" (LinkedIn zu Blog + Glossar-Erweiterung) für teleschmie.de
---

# Die Content-Fabrik: LinkedIn to Blog & Glossar Workflow

Dieser Workflow wird ausgelöst, wenn Jörg eine LinkedIn-URL einreicht. Es handelt sich um einen geschlossenen End-to-End-Prozess, der ZWINGEND in genau dieser Reihenfolge abgearbeitet werden muss.

## Phase 1: Content Extraction (LinkedIn -> Blog)
1. **Original URL & Text sichern**: Lade den rohen Content der URL via `read_url_content` (oder per Skript/Embed), um an die *echten* JSON-Daten und Texte zu kommen. Rate niemals!
2. **Content & Comments analysieren**: Scan the comments for common questions or controversial takes. Use these for the **FAQ section** and **Key Takeaways** im Frontmatter.
3. **Authentizität & Zitate**: Der Blog lebt vom Tacheles-Austausch. Der originale LinkedIn-Post ist IMMER die Basis des Artikels.
   - **STRIKTE REGEL 1**: Der originale LinkedIn-Text (also Jörgs kompletter Beitrag inklusive aller Listen/Stichpunkte) MUSS in voller Länge als Herzstück in den Artikel übernommen werden. Nicht nur der erste Satz!
   - **STRIKTE REGEL 2**: Wenn LinkedIn-Kommentare existieren, MÜSSEN diese im Artikel aufgegriffen werden. Du darfst NIEMALS Kommentare, Fragen oder Namen frei erfinden, abändern oder paraphrasieren! Nutze **IMMER den 1:1 exakten Original-Wortlaut** aus dem echten LinkedIn-Post und lasse die Kommentare natürlich in den fließenden Text einfließen.
4. **Hero-Bild (NEUE BILDREGEL)**:
   - Alle Bilder müssen als `.webp` formatiert und in `src/assets/images/blog/` gespeichert werden.
   - **WENN JA:** Lade das originale Bild des Posts herunter, konvertiere es in `.webp` und nutze es als Haupt-Hero-Bild.
   - **WENN NEIN:** Nur wenn der Post *kein* Bild enthält, generiere via `generate_image` eine 3D-Infografik nach den strikten Vorgaben (weiß/lime-grün, DEUTSCHER Text) und nutze diese.
   - **WICHTIG**: Das in der Frontmatter verlinkte Bild wird vom Astro-Template automatisch oben gerendert. Füge dieses Bild NIEMALS manuell per `![Alt](...)` in den Markdown-Body ein!

## Phase 2: Writing Style Guidelines & Artikel-Struktur (Blog)
- **Dateiname**: Wähle einen deskriptiven Slug (z.B. `seo-feuerwehr-rettung.md`).
- **Länge**: Der fertige Artikel sollte kurz und knackig sein (ca. 1000-1500 Zeichen).
- **LinkedIn Flow**: Short paragraphs, often single sentences.
- **Dynamic Formatting**: Use bold text for emphasis.
- **Direct Address**: Use "Moin! 🌻" or "Aloha! 🌻✌️".

Jeder Blogartikel (`src/content/blog/`) bekommt diese Frontmatter:
```yaml
---
title: "SEO-Titel ohne Emoji mit besten Keywords (ca. 50 Zeichen)"
description: "Frische Zusammenfassung mit Keywords, ohne Emojis (ca. 140 Zeichen)"
date: "YYYY-MM-DD"
linkedin_url: "https://www.linkedin.com/posts/..."
image: "../../assets/images/blog/filename.webp"
image_alt: "Descriptive alt text"
category: "SEO Praxis" (Erlaubt sind NUR exakt: "SEO Praxis", "AI SEO", "KI & SEO", "Events & Networking", "Tech SEO & Tools", "Agentur & Tools")
tags: ["Tag1", "Tag2"]
key_takeaways:
  - "Insight 1"
  - "Insight 2"
faqs:
  - question: "Question from comments?"
    answer: "Expert answer in Jörg's style."
---
```
**Visueller Aufbau (Zwingende HTML-Elemente):**
1. **Kontext-Satz:** Vor dem allerersten Zitat (dem LinkedIn-Post) MUSS zwingend dieser Satz stehen: `*Diese Diskussion wurde von mir auf LinkedIn am [DD.MM.YYYY] gestartet:*`
2. **Zitat-Boxen für Post & Kommentare:** Nutze das folgende visuelle HTML-Element, um *jeden* originalen Kommentar und *jede* originale Jörg-Antwort hervorzuheben:
   ```html
   <div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
     <p class="font-bold text-lime-600 mb-2">💬 [Name] (LinkedIn Insights/Kommentar)</p>
     <div class="italic text-dark mb-0"><p>[Exakter Original-Text]</p></div>
   </div>
   ```
3. **CTA-Box (Ganz am Ende):** Nach der Verabschiedung ("ALOHA! 🌻✌️") MUSS zwingend diese CTA-Box eingefügt werden:
   ```html
   <div class="my-8 bg-lime-600 text-white p-6 rounded-lg text-center">
     <p class="font-bold text-xl mb-4">💬 Jetzt an der Diskussion teilnehmen!</p>
     <a href="[ORIGINALE-LINKEDIN-URL-HIER-EINSETZEN]" target="_blank" rel="noopener noreferrer" class="inline-block bg-white text-lime-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors">
       Beitrag auf LinkedIn öffnen
     </a>
   </div>
   ```

## Phase 3: Metadata, Verification & Verlinkungs-Regeln
- **Reading Time**: Ensure the layout calculates this (Standard: 180 wpm for German).
- **Origin Attribution**: Ensure the slug template renders "Dieser Beitrag entstand aus diesem LinkedIn-Beitrag".
- **Mindest-Inlinks**: Jeder Artikel (Blog & Glossar) MUSS zwingend mind. 3 interne Links zu bestehenden Beiträgen (z.B. Glossar-Items) enthalten.
- **Affiliate-Links**: Sobald Tools wie "SE Ranking" im Text erwähnt werden, MUSS zwingend ein Affiliate-Link gesetzt werden (z. B. `[SE Ranking](https://seranking.com/de/?ga=4169588&source=link)`).
- **Sprechstunde**: Sobald Begriffe wie "Sprechstunde", "Beratung" oder "Termin" fallen, MUSS zwingend ein interner Link zur SEO-Sprechstunde gesetzt werden.

## Phase 4: Glossar-Erweiterung (SE Ranking & Web-Recherche)
Sobald der Blogartikel steht, beginnt der Glossar-Loop:
1. **SE Ranking Recherche**: Nutze das SE Ranking MCP Tool (z.B. `DATA_getRelatedKeywords`), um basierend auf dem Blog-Thema 3 bis 5 semantisch verwandte Keywords zu finden (Filter: Deutschland, Suchvolumen >= 10).
2. **Anti-Duplikat-Regel (STRIKT)**: Prüfe via `list_dir` in `src/content/glossar/`, ob das Thema schon existiert.
   - **Falls existent**: Erweitere/optimiere den bestehenden Artikel (keinen neuen anlegen!).
   - **Falls neu**: Erstelle einen neuen Glossar-Artikel.
3. **Faktische Erstellung & Bild**: 
   - Führe zwingend eine **Web-Recherche** aus (`search_web`), um aktuelle, echte Fakten zu sammeln.
   - Es darf in Glossar-Artikeln **kein Handel simuliert werden** (keine erfundenen kommerziellen Angebote).
   - Generiere für *jeden* neuen Glossar-Artikel ein eigenes 3D-Thumbnail (weiß/lime-grün, DEUTSCHER Text) und speichere es im `.webp` Format ab.

## Phase 5: Social Media Distribution (Auto-Upload)
**ACHTUNG: Dieser Schritt darf niemals übersprungen werden, falls ein Video vorhanden ist!**
- **Condition**: Only execute this phase if the original LinkedIn post contains a **Video**. If it only contains an image/text, skip this phase completely!
- **Action**: Once the blog post is written and the video is in `public/videos/`, you must immediately execute the `upload.js` script to distribute the video.
- **Execution**:
  ```bash
  cd scripts/social-upload
  node upload.js \
    --video="../../public/videos/slug.mp4" \
    --thumb="../../public/images/slug.webp" \
    --title="Your SEO Title" \
    --desc="Short summary." \
    --tags="Tag1, Tag2, SEO" \
    --blog="https://teleschmie.de/blog/slug/" \
    --linkedin="https://www.linkedin.com/posts/..."
  ```

## Phase 6: Reporting an den Nutzer
Sobald alles erledigt und via `npm run build` (lokal) fehlerfrei geprüft ist, lieferst du Jörg einen exakten Statusbericht in kurzer Listenform:
1. Bestätigung: "Der Blogartikel ist jetzt live." (Oder lokal bereit zum Deploy).
2. Liste der erstellten/aktualisierten Glossar-Artikel: "Dazu habe ich 3-5 Glossar-Artikel produziert, die wir bislang noch nicht hatten, mit folgendem Suchvolumen: [Liste der Keywords + Volumen]".
3. Kurze Erklärung: Erkläre abschließend in 2-3 Sätzen, was du genau gemacht hast.
