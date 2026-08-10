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
1. **Tiefenrecherche im Web (ZWINGEND)**: Führe ZWINGEND eine ausführliche Web-Recherche aus (`search_web`), um aktuelle, echte Fakten zum Begriff zu sammeln. KI-Wissen oder "Konserven-Content" ist strengstens verboten! Der Beitrag muss semantisch sinnvoll, hochaktuell und absolut nützlich wie ein echtes Fach-Glossar sein.
2. **Keine Halluzinationen / Kein simulierter Handel**: Es dürfen **keine** kommerziellen Angebote, Preise oder Dienstleistungen erfunden werden. Keine Ausnahmen.
3. **Länge & Struktur**: Der Glossar-Artikel MUSS in der Regel eine Länge von **1.000 bis 1.500 Wörtern** erreichen (ausführlich, tiefgründig, mit FAQs).
4. **Kategorien (STRIKT)**: Jeder Glossar-Artikel MUSS in der Frontmatter zwingend eine dieser exakten Kategorien zugewiesen bekommen: `"SEO Basics & Onpage"`, `"Technisches SEO & UX"`, `"AI SEO & Generative Search"`, `"E-E-A-T & Offpage"`.
5. **Globale Guidelines**: Befolge beim Schreiben ZWINGEND alle weiteren Format- und Tonalitätsvorgaben aus der Hauptdatei `.agents/workflows/content-guidelines.md` (z.B. Key Takeaways im Frontmatter, streng journalistischer Anti-KI-Stil, KEINE KI-Floskeln).
6. **Affiliate-Links (ZWINGEND)**: Wenn Tools wie "Rankscale" oder "SE Ranking" im Text vorkommen, MUSST du via `grep_search` in bestehenden Blog-Artikeln nach den exakten Affiliate-Links des Nutzers suchen und diese exakt so in den neuen Text einbauen.

## 2.5 STRIKTER PRE-FLIGHT-CHECK VOR DEM SCHREIBEN
**AGENTEN-REGEL:** Du DARFST den Artikel erst via `write_to_file` auf der Festplatte speichern, wenn du intern folgende Checkliste validiert hast:
1. Wurde `search_web` für aktuelle Fakten wirklich aufgerufen?
2. Sind Affiliate-Links (falls Tools erwähnt werden) korrekt via `grep_search` verifiziert und eingebaut?
3. Ist der Textumfang massiv genug (> 1.000 Wörter)?
4. Sind 3-5 ausführliche FAQs in der Frontmatter hinterlegt (für das automatische Astro HTML5-Rendering)?
5. Wurden Text-Auflockerungen (Tabellen, Quotes, Bold, Bulletpoints) und die grüne LinkedIn-CTA-Box genutzt?
Wenn ein Punkt fehlt, MUSS der Text im Speicher vor dem Schreiben korrigiert werden!

## 3. Visuelles Setup (3D-Infografik)
1. Generiere für *jeden* neuen Glossar-Artikel zwingend ein eigenes 3D-Thumbnail.
2. **Design-Regel**: Reinweißer Hintergrund, lime-grüne Akzente, Beschriftungen zwingend auf **DEUTSCH**, Wasserzeichen "Jörg Zimmer" unten rechts.
3. Speichere das Bild im `.webp` Format ab und trage es *nur* in die Frontmatter ein. Das Bild darf **NIEMALS** per Markdown in den Textfluss (`![Alt](...)`) eingefügt werden, da Astro es ohnehin automatisch rendert (Vermeidung von Doppel-Bildern).

## 4. Rückgabe & Verlinkung (Daisy-Chaining)
1. **Wenn als Sub-Routine gestartet:** Gehe nach der Erstellung der neuen Glossar-Artikel zurück in den Ursprungs-Artikel (z.B. Blog) und verlinke die neu geschriebenen Glossar-Begriffe dort direkt im Fließtext.
2. **Immer ausführen:** Führe nach Abschluss das `quality-gate.cjs` über die neu erstellten Glossar-Artikel aus (`--type=glossar`).
3. **Wenn Standalone gestartet:** Führe den Artikel direkt in den Deploy-Workflow (`.agents/workflows/deploy.md`) über, wenn der Nutzer zustimmt.
