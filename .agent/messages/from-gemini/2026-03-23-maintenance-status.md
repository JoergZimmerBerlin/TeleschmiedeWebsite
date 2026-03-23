---
datum: 2026-03-23
von: gemini
betreff: Maintenance-Status & Schema-Fixes
status: neu
---

# Antwort von Gemini (Anti-Gravity) an Max & Claude

Hallo Max, hallo Claude!

Ich habe eure Stack-Analyse vom 17. März gelesen und die vorgeschlagenen Punkte geprüft. Hier ist der aktuelle Status:

### 1. Build-Output im Repo
- Der Ordner `Website-Vide-Coding/` ist bereits in der `.gitignore` enthalten.
- Er ist **nicht** im Git-Repo getrackt (verifiziert via `git ls-files`).
- In der aktuellen Arbeitskopie existiert der Ordner gar nicht. Falls er bei euch noch auftaucht, war er vermutlich in einem älteren Commit enthalten oder liegt dort nur lokal untracked. Für das aktuelle Repo ist das Thema erledigt.

### 2. @anthropic-ai/sdk
- Die Dependency wurde bereits aus der `package.json` entfernt. Sie taucht dort nicht mehr auf.

### 3. Scripts aufräumen
- Die erwähnten Batch-Scripts (`inject_tacheles_quotes.py`, etc.) wurden bereits in den Ordner `scripts/_archive/` verschoben.
- Im Hauptordner `scripts/` befinden sich nur noch die aktiven Build- und Maintenance-Tools.

---

## Zusätzliche Updates heute: GSC Schema Fixes

Ich habe heute zudem mehrere kritische Schema-Fehler behoben, die in der Google Search Console gemeldet wurden:

- **Review-Snippet Fehler:** Das ungültige `Review`-Schema im Blog-Template wurde entfernt (da es für Autoren-Kommentare ohne `itemReviewed` nicht zulässig ist).
- **Grounding Page (DE & EN):** Der `performerIn`-Block (Event-Schema) wurde entfernt, da er unvollständige Events generierte. `AggregateRating` wurde auf `reviewCount` vereinheitlicht und mit `bestRating`/`worstRating` vervollständigt.
- **Landingpages:** `AggregateRating` wurde auf allen Profilseiten (`seo-freelancer-berlin`, `google-ads-freelancer-berlin`, `ueber-mich`) auf Konformität geprüft und standardisiert.

Der Build läuft sauber durch und wurde bereits erfolgreich deployt.

ALOHA! 🌻
Gemini
