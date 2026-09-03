---
description: Dedizierter Workflow für die Erstellung und Erweiterung von Glossar-Artikeln inkl. SE Ranking Recherche
---

# Glossar-Produktion & Erweiterung Workflow

Dieser Workflow ist zuständig für die Erstellung neuer und die Erweiterung bestehender SEO-Glossar-Artikel. Er funktioniert **als separater Trigger (Standalone)** oder **als Sub-Routine** aus der Content-Fabrik (`linkedin-to-blog.md`).

## 1. Recherche & Keyword-Matching (SE Ranking)
1. **SE Ranking Recherche**: Nutze das SE Ranking MCP Tool (z.B. `DATA_getRelatedKeywords`), um basierend auf dem Ursprungsthema 3 bis 5 semantisch verwandte Keywords zu finden.
   - **Filter-Vorgabe:** Geografischer Fokus zwingend auf *Deutschland*, Suchvolumen muss mindestens >= 10 sein.
2. **Anti-Duplikat-Regel (STRIKT)**: Prüfe via `list_dir` im Ordner `src/content/glossar/`, ob das identifizierte Keyword (oder ein nahes Synonym) bereits als Artikel existiert.
   - **Falls existent**: Erweitere und optimiere den bestehenden Artikel mit den neuen Erkenntnissen (keinen neuen anlegen!).
   - **Falls neu**: Erstelle einen neuen Glossar-Artikel (`[slug].md`).

## 2. Faktische Erstellung & Tiefenrecherche (Zero Hallucination)
1. **Tiefenrecherche im Web (ZWINGEND 2-STUFIG)**: Führe ZWINGEND mindestens zwei gezielte Web-Recherchen (`search_web`) durch:
   - *Stufe 1 (Technischer Standard)*: Offizielle Google Search Central Dokumentation, W3C/IETF RFCs oder Entwickler-Spezifikationen für das Jahr 2026.
   - *Stufe 2 (Reale Praxis & Fallstricke)*: Echte Community-Diskussionen, häufige Fehlerquellen und Lösungsansätze in Kundenprojekten.
2. **Keine Halluzinationen / Kein simulierter Handel**: Es dürfen **keine** kommerziellen Angebote, Preise oder Dienstleistungen erfunden werden. Keine Ausnahmen.
3. **Länge & High-Premium Tiefe**: Der Glossar-Artikel MUSS eine Länge von **1.000 bis 1.500 Wörtern** erreichen. Reine kurze Begriffsdefinitionen sind verboten!
4. **Zwingende Content-Elemente für maximale Nutzerfreundlichkeit:**
   - **Vergleichs- oder Kriterien-Tabelle (PFLICHT)**: Mindestens eine strukturierte Markdown-Tabelle (z.B. *„Kriterien-Vergleich“*, *„Do's & Don'ts“*, *„Status-Codes / Parameter im Überblick“*).
   - **Echtes Code- / Konfigurations-Snippet (PFLICHT bei Tech-Themen)**: Konkrete, copy-paste-fähige Code-Blöcke (z.B. JSON-LD Schema, `.htaccess`, Nginx, HTTP Link-Header, curl-Befehle).
   - **Die 3 häufigsten Praxis-Fehler (PFLICHT)**: Ein eigener Abschnitt mit ungeschminkter Praxiserfahrung aus 25 Jahren SEO.
   - **E-E-A-T Zitat-Box aus Jörgs LinkedIn-Archiv (PFLICHT)**: Suche via `view_file` in `src/data/joerg-quotes.json` nach einem thematisch passenden Zitat von Jörg Zimmer und baue es als formatierte Box mit Original-LinkedIn-Link ein:
     ```html
     <div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-2xl">
       <p class="font-bold text-lime-800 mb-2">💡 Jörg Zimmer aus der SEO-Praxis:</p>
       <blockquote class="italic text-dark mb-3">
         „[Zitat aus src/data/joerg-quotes.json]“
       </blockquote>
       <a href="[url]" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-lime-700 hover:underline">
         ↗ Zur Diskussion auf LinkedIn
       </a>
     </div>
     ```
5. **Kategorien (STRIKT)**: Jeder Glossar-Artikel MUSS in der Frontmatter zwingend eine dieser exakten Kategorien zugewiesen bekommen: `"SEO Basics & Onpage"`, `"Technisches SEO & UX"`, `"AI SEO & Generative Search"`, `"E-E-A-T & Offpage"`.
6. **Globale Guidelines**: Befolge beim Schreiben ZWINGEND alle weiteren Format- und Tonalitätsvorgaben aus der Hauptdatei `.agents/workflows/content-guidelines.md` (z.B. Key Takeaways im Frontmatter, streng journalistischer Anti-KI-Stil, KEINE KI-Floskeln).
7. **Affiliate-Links (ZWINGEND)**: Wenn Tools wie "Rankscale" oder "SE Ranking" im Text vorkommen, MUSST du via `grep_search` in bestehenden Blog-Artikeln nach den exakten Affiliate-Links des Nutzers suchen und diese exakt so in den neuen Text einbauen.

## 2.5 STRIKTER PRE-FLIGHT-CHECK VOR DEM SCHREIBEN
**AGENTEN-REGEL:** Du DARFST den Artikel erst via `write_to_file` auf der Festplatte speichern, wenn du intern folgende Checkliste validiert hast:
1. Wurde `search_web` (2-stufig) für aktuelle Fakten wirklich aufgerufen?
2. Sind Affiliate-Links (falls Tools erwähnt werden) korrekt via `grep_search` verifiziert und eingebaut?
3. Ist der Textumfang massiv genug (> 1.000 Wörter)?
4. Sind 3-5 ausführliche FAQs in der Frontmatter hinterlegt (für das automatische Astro HTML5-Rendering)?
5. Ist mindestens eine Vergleichs- / Kriterien-Tabelle im Artikel enthalten?
6. Wurde ein passendes Zitat aus `src/data/joerg-quotes.json` mit Original-LinkedIn-Link eingebaut?
7. Wurden Text-Auflockerungen (Bold, Bulletpoints) und die grüne LinkedIn-CTA-Box genutzt?
Wenn ein Punkt fehlt, MUSS der Text im Speicher vor dem Schreiben korrigiert werden!

## 3. Visuelles Setup (3D-Infografik)
1. Generiere für *jeden* neuen Glossar-Artikel zwingend ein eigenes 3D-Thumbnail.
2. **Design-Regel**: Reinweißer Hintergrund, lime-grüne Akzente, Beschriftungen zwingend auf **DEUTSCH**, Wasserzeichen "Jörg Zimmer" unten rechts.
3. Speichere das Bild im `.webp` Format ab und trage es *nur* in die Frontmatter ein. Das Bild darf **NIEMALS** per Markdown in den Textfluss (`![Alt](...)`) eingefügt werden, da Astro es ohnehin automatisch rendert (Vermeidung von Doppel-Bildern).

## 4. Rückgabe & Verlinkung (Daisy-Chaining)
1. **Wenn als Sub-Routine gestartet:** Gehe nach der Erstellung der neuen Glossar-Artikel zurück in den Ursprungs-Artikel (z.B. Blog) und verlinke die neu geschriebenen Glossar-Begriffe dort direkt im Fließtext.
2. **Immer ausführen:** Führe nach Abschluss das `quality-gate.cjs` über die neu erstellten Glossar-Artikel aus (`--type=glossar`).
3. **Wenn Standalone gestartet:** Führe den Artikel direkt in den Deploy-Workflow (`.agents/workflows/deploy.md`) über, wenn der Nutzer zustimmt.
