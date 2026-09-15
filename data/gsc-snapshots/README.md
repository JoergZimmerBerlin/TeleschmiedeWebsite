# GSC Crawl History & Snapshot Tracker

Dieses Verzeichnis speichert periodische Voll-Snapshots der Google Search Console URL-Inspection-Daten für alle URLs der Domain `teleschmie.de/`.

## Warum machen wir das?
Die Google Search Console API liefert standardmäßig **nur den letzten Crawl-Zeitstempel (`lastCrawlTime`)** und überschreibt ältere Daten bei jedem Recrawl. Google bietet über die API keine Historie und keinen Erst-Crawl-Zeitstempel (`firstCrawlTime`).

Durch dieses lokale Snapshot-Tracking bauen wir unsere eigene historische Zeitreihe auf, um genau zu verstehen:
1. **Recrawl-Kadenz:** Wie viele Wochen/Tage vergehen im Schnitt, bis Googlebot eine Seite erneut rendert?
2. **First-Crawl-Speed:** Wie schnell nach Veröffentlichung wird eine neue Seite zum allerersten Mal gecrawlt?
3. **Index-Status-Dynamik:** Welche URLs wechseln von `Gecrawlt – zurzeit nicht indexiert` oder `Discovered` zu `Gesendet und indexiert` (PASS)?
4. **Crawl-Vakuum:** Welche URLs werden von Google über Monate komplett ignoriert?

---

## Gespeicherte Snapshots

- **`snapshot-2026-09-15.json`** (Baseline nach 5 Monaten Projektlaufzeit):
  - **Umfang:** 320 URLs
  - **Indexiert (PASS):** 287 URLs (89,7 %)
  - **Warteschlange / Neutral:** 33 URLs (10,3 %)
  - **Fehler (FAIL):** 0
  - **Gecrawlt:** 311 URLs (97,2 %)
  - **Noch nie gecrawlt:** 9 URLs (2,8 %)
- **`latest.json`**:
  - Jeweils die aktuellste Kopie des letzten Scans.

---

## Workflow für den Re-Check in 4 Wochen (Oktober 2026)

### Schritt 1: Neuen Scan durchführen
```bash
node scripts/generate-crawl-report.mjs
```
*(Dauert ca. 1–2 Minuten über die GSC URL Inspection API und aktualisiert `crawl-report.json`.)*

### Schritt 2: Neuen Snapshot sichern
```bash
node -e '
import fs from "fs";
import path from "path";
const data = JSON.parse(fs.readFileSync("crawl-report.json", "utf8"));
const snapshot = {
  metadata: {
    snapshotDate: new Date().toISOString(),
    totalUrls: data.length,
    indexedPass: data.filter(d => d.verdict === "PASS").length,
    neutralQueue: data.filter(d => d.verdict === "NEUTRAL").length
  },
  items: data
};
fs.writeFileSync("data/gsc-snapshots/snapshot-2026-10-15.json", JSON.stringify(snapshot, null, 2));
fs.writeFileSync("data/gsc-snapshots/latest.json", JSON.stringify(snapshot, null, 2));
console.log("✅ Neuer Snapshot gesichert!");
'
```

### Schritt 3: Differenz-Analyse & Schlüsse ziehen
```bash
node scripts/compare-crawl-snapshots.mjs data/gsc-snapshots/snapshot-2026-09-15.json data/gsc-snapshots/latest.json
```
Das Skript zeigt sofort:
- Welche URLs in den 4 Wochen neu gecrawlt wurden (+Tage seit letztem Crawl)
- Welche der 9 bisher unbesuchten Seiten ihren allerersten Besuch erhalten haben
- Welche Seiten den Sprung in den Index geschafft haben (`Status-Upgrades`)
- Welche Seiten unverändert im Crawl-Vakuum geblieben sind
