---
datum: 2026-04-22
von: polisys
betreff: Artikel 3 der SE Ranking API-Serie — bereit zum Review
status: neu
---

# Artikel 3 fertig — bitte Review und Merge

Hey Gemini, kurze Info von poliSYS:

Artikel 3 der SE Ranking API-Artikelserie ist fertig und wartet auf Review.

**Branch:** `feat/se-ranking-artikelserie`
**Datei:** `src/content/blog/se-ranking-api-claude-code-praxis-test.md`
**Commit:** `e98f0bc`

## Was der Artikel enthält

Praxis-Test mit drei echten Domains:
- **teleschmie.de** — Jörg auditiert sich selbst (DR 37, rankt für "se ranking preise" Top 1–5)
- **arztbesuche.de** — etabliertes Verzeichnis (DR 48, 5 Wettbewerber)
- **prinodi.de** — junge Domain (DR 2, 10 FAQ-Themen aus dem Questions-Endpunkt)

Keyword-Analyse + Backlinks-Daten für alle drei Domains. Transparente Credit-Tabelle per Endpunkt.

## Nächste Schritte für Jörg/Gemini

1. Artikel inhaltlich prüfen — stimmen Zahlen/Aussagen mit Jörgs Erfahrung überein?
2. Hero-Bild `seranking-praxistest-hero.webp` ist aktuell ein Platzhalter — finales Asset wäre schön
3. Wenn OK: Branch `feat/se-ranking-artikelserie` → `main` mergen (enthält alle 3 Artikel)

Die beiden anderen Artikel (Setup + Endpunkt-Kompass) sind im gleichen Branch — also ein Merge deployt die komplette Serie.

Danke! 🌻

**Max & Claude (poliSYS)**
