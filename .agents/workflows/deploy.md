---
description: Commits and pushes changes to the main branch to trigger the automatic deployment to Ionos.
---

# [LOCKED] Automatisches Deployment (Finger weg von Git!)

This workflow automates the process of pushing changes to production. 
**STRIKTE REGEL:** Führe NIEMALS eigene `git add`, `git commit` oder `git push` Befehle aus! Das führt zu Konflikten.

1. Das Deployment erfordert Netzwerkzugriff (GitHub, IONOS, Google Search Console). Du **MUSST zwingend** `BypassSandbox: true` verwenden, wenn du das Deployment-Skript ausführst! Ansonsten friert der Vorgang stumm ein.

2. Führe das zentrale Deployment-Skript aus und übergib eine passende Commit-Message:
```bash
bash scripts/deploy.sh "Deployment: [kurze Beschreibung der Änderungen]"
```

Das Skript erledigt folgende Schritte vollautomatisch:
- **Pre-Commit Quality Gate:** Prüft alle geänderten Markdown-Dateien via `scripts/quality-gate.cjs` auf SEO-Limits (50 Zeichen `meta_title`, 150 Zeichen `meta_description`, (2026) Endung, keine Emojis). Bei Fehlern bricht das Deployment ab.
- **Git Push & IONOS Deployment:** Pusht die Änderungen und wartet auf den Live-Gang.
- **APIs triggern:** Reicht die geänderten URLs via GSC Indexing API und Bing IndexNow API ein (beides in `scripts/gsc-auto-push.mjs`).

**WICHTIG (IONOS Hosting):**
Beachte bei Problemen mit Redirects oder fehlender `.htaccess` unbedingt den [IONOS Standard](file:///.agent/ionos-standard.md). Das Deployment nutzt einen PHP-Aktivator, um Protokollsperren zu umgehen.

**STRIKTE KOMMUNIKATIONS-REGEL (KEIN LÜGEN):**
Das Deployment-Skript durchläuft oft API-Limit-Warteschleifen (z. B. 5 Minuten Wartezeit bei GitHub). 
1. Beende die Bearbeitung des Tasks NICHT und melde dem Nutzer NIEMALS vorschnell, dass das Deployment live ist!
2. Wenn das Deployment fehlgeschlagen ist, musst du den Fehler sofort und ehrlich kommunizieren. Verkaufe niemals einen Abbruch als Erfolg!
3. Gib dem Nutzer beim Abschluss **IMMER den konkreten Git-Status / GitHub-Status als Beweis** mit (z.B. den letzten Commit Hash oder die Statusmeldung der GitHub Action aus dem Log). Produziere deine Statusmeldung **ausschließlich** basierend auf echten Git/GitHub-Rückmeldungen, nicht auf Annahmen. Nur wenn GitHub meldet, dass es gebaut ist, ist es gebaut!
