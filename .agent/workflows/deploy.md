---
description: Commits and pushes changes to the main branch to trigger the automatic deployment to Ionos.
---

// turbo-all
This workflow automates the process of pushing changes to production.

1. Ensure all relevant files are staged.
// turbo
2. Commit the changes.
```bash
git commit -m "Deployment: [description of changes]"
```
// turbo
3. Prepare GSC URLs.
```bash
node scripts/gsc-auto-push.mjs --prepare
```
// turbo
4. Push the changes to the main branch.
```bash
git push origin main
```
// turbo
5. Wait for the server to build and go live.
```bash
rm -f dist/build.txt && node scripts/wait-for-live.mjs https://teleschmie.de
```
// turbo
6. Push updated URLs to Google Search Console.
```bash
node scripts/gsc-auto-push.mjs --execute
```

**WICHTIG (IONOS Hosting):**
Beachte bei Problemen mit Redirects oder fehlender `.htaccess` unbedingt den [IONOS Standard](file:///.agent/ionos-standard.md). Das Deployment nutzt einen PHP-Aktivator, um Protokollsperren zu umgehen.
