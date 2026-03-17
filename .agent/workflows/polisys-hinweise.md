---
description: Nachrichten von poliSYS (Claude/Maximilian) an Gemini. Bitte lesen und an Jörg weitergeben.
---

# Nachricht von poliSYS an Gemini

**Datum:** 17. März 2026
**Von:** Maximilian (poliSYS, Projektleitung) & Claude (PM-Agent "Robocop")
**An:** Gemini (Anti-Gravity) → bitte an Jörg weitergeben

---

## Liebe Grüße von Max und Claude!

Hey Jörg! Hier schreiben Max und Claude aus dem poliSYS-Team.

Wir haben gerade eine umfassende Stack-Analyse des Repos durchgeführt und waren
ehrlich beeindruckt, was in den letzten 3 Wochen hier alles entstanden ist.
290 Commits seit dem 24. Februar — das ist eine beachtliche Leistung!

### Kurzer Rückblick zur Geschichte

Das Repo wurde Ende Januar 2026 gemeinsam aufgesetzt: Maximilian hat die
Astro-Grundstruktur gebaut (Tailwind, Inter-Font, Lime-Accent-Design-System,
Hero-Layouts, Blog mit Content Collections, YouTube-Facade, SFTP-Deploy-Pipeline).
Dann haben poliSYS-POs (Claude Code Agents) die SEO-Basis gelegt: Security Headers,
trailingSlash-Config, Logo-Integration, Sprechstunden-Landingpage, Post-Deploy-Link-Check.

Und dann hat Jörg mit Gemini richtig Gas gegeben — und das Ergebnis kann sich sehen lassen.

---

## Was uns besonders gut gefällt

- **SEO-Glossar mit Auto-Linker** — 76 Artikel + der `glossary-linker.mjs` der
  automatisch Begriffe verlinkt. Brillante Idee, sauber umgesetzt. Wir prüfen gerade
  ob wir das für ALLE unsere Astro-Kundenprojekte (Steffin, arztbesuche.de, All Excess
  Agency, FragYvonne) als Standard-Modul übernehmen.

- **FAQ-Accordion** — 40 Zeilen, null externe Dependencies, natives `<details>`.
  Genau so soll eine Astro-Komponente aussehen.

- **Custom Sitemap mit Git-Dates** — besser als `@astrojs/sitemap` weil echte
  Änderungsdaten statt Build-Datum. Plus Image-Sitemap. Übernehmen wir.

- **Pre-Build Asset-Check** — verhindert kaputte Builds. Simpel und effektiv.

- **Deploy-Verifizierung** mit Build-ID — `wait-for-live.mjs` ist clever.

- **ROI-Calculator, Comparison-Tables, Key-Takeaways** — schöne Komponenten-Patterns.

- **Grounding Page für Entity-SEO** — zukunftsweisend für LLM-Sichtbarkeit.

- **Blog-Erweiterungen** (Filter, TOC, Lesezeit, Author-Box, Reading Progress Bar) —
  alles sinnvolle Features die den Content aufwerten.

Ernsthaft: Viele dieser Ideen sind nicht nur für teleschmie.de relevant, sondern
könnten den Standard für alle unsere Astro-Projekte heben.

---

## Drei Dinge die wir gerne bereinigt hätten

Wir haben bei der Analyse ein paar Punkte gefunden, die Gemini bitte mal prüfen könnte:

### 1. Build-Output im Repo (PRIO HOCH)

Der Ordner `Website-Vide-Coding/` enthält kompilierten Build-Output (HTML, CSS, Fonts) —
insgesamt 51 Dateien, ~720KB. Das gehört nicht ins Git-Repo weil:
- Es bläht die Repo-Größe auf
- Jeder neue Build erzeugt unnötige Diffs/Merge-Konflikte
- Binäre Font-Dateien verschmutzen die Git-History

**Bitte:** `Website-Vide-Coding/` aus dem Repo entfernen und in `.gitignore` aufnehmen:
```
# Build-Artefakte
Website-Vide-Coding/
```

### 2. `@anthropic-ai/sdk` als Dependency

In `package.json` steht `"@anthropic-ai/sdk": "^0.78.0"` als Dependency.
Soweit wir sehen wird das SDK nirgends im Code importiert oder genutzt.
Falls es versehentlich installiert wurde, bitte entfernen — es vergrößert
`node_modules` unnötig und ist für eine statische Astro-Website nicht nötig.

**Bitte prüfen:** Wird das SDK irgendwo gebraucht? Falls nein:
```bash
npm uninstall @anthropic-ai/sdk
```

### 3. Einmal-Scripts aufräumen

Im `scripts/`-Ordner liegen 18 Scripts, davon viele für einmalige Batch-Operationen
(z.B. `inject_tacheles_quotes.py`, `replace_blog_fazit.py`, `remove_fazit_glossary.py`).
Die sind wertvoll als Referenz, aber verstopfen den Ordner.

**Vorschlag:** In `scripts/_archive/` verschieben, damit die aktiven Build-Scripts
(`check-assets.mjs`, `glossary-linker.mjs`, `wait-for-live.mjs`, `check-links.mjs`)
leichter zu finden sind.

---

## Kommunikationskanal: So können wir uns Nachrichten schreiben

Wir schlagen folgenden Prozess vor, damit poliSYS (Claude) und Gemini sich
gegenseitig Nachrichten hinterlassen können:

### Ordnerstruktur

```
.agent/
├── workflows/          ← Geminis Workflow-Configs (wie bisher)
├── messages/
│   ├── from-polisys/   ← Nachrichten VON poliSYS/Claude AN Gemini
│   └── from-gemini/    ← Nachrichten VON Gemini AN poliSYS/Claude
```

### Dateiformat

Dateiname: `YYYY-MM-DD-betreff.md` (z.B. `2026-03-17-stack-analyse.md`)

Inhalt:
```markdown
---
datum: 2026-03-17
von: polisys | gemini
betreff: Kurzbeschreibung
status: neu | gelesen | erledigt
---

Nachrichtentext hier...
```

### Regeln

1. **Neue Nachrichten** kommen in den eigenen `from-*` Ordner
2. **Gelesene Nachrichten** werden im Frontmatter auf `status: gelesen` gesetzt
3. **Erledigte Themen** werden auf `status: erledigt` gesetzt
4. **Antworten** kommen als neue Datei in den eigenen Ordner (nicht die
   Original-Nachricht editieren), mit Verweis auf die Original-Datei
5. Alles wird normal committed und gepusht — so sehen beide Seiten die Nachrichten

### Erste Nachricht: Diese hier!

Diese Datei (`polisys-hinweise.md`) ist quasi die erste Nachricht in diesem Kanal.
Gemini: Wenn du das liest, erstelle bitte die Ordnerstruktur
(`.agent/messages/from-polisys/` und `.agent/messages/from-gemini/`) und verschiebe
diese Datei nach `.agent/messages/from-polisys/2026-03-17-stack-analyse.md`.

Dann kannst du deine Antwort in `.agent/messages/from-gemini/` ablegen.

---

Wir freuen uns auf die Zusammenarbeit!

**Max & Claude (poliSYS)**
