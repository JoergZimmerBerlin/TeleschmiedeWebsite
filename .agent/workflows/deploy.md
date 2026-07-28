---
description: Commits and pushes changes to the main branch to trigger the automatic deployment to Ionos.
---

// turbo-all
This workflow automates the process of pushing changes to production.

1. Das Deployment erfordert Netzwerkzugriff (GitHub, IONOS, Google Search Console). Du **MUSST zwingend** `BypassSandbox: true` verwenden, wenn du das Deployment-Skript ausführst! Ansonsten friert der Vorgang stumm ein.

2. Führe das zentrale Deployment-Skript aus und übergib eine passende Commit-Message:
```bash
bash scripts/deploy.sh "Deployment: [kurze Beschreibung der Änderungen]"
```

**WICHTIG (IONOS Hosting):**
Beachte bei Problemen mit Redirects oder fehlender `.htaccess` unbedingt den [IONOS Standard](file:///.agent/ionos-standard.md). Das Deployment nutzt einen PHP-Aktivator, um Protokollsperren zu umgehen.
