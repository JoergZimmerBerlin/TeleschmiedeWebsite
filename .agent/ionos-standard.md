# Teleschmiede IONOS Deployment Standard (Stand April 2026)

Dieses Dokument beschreibt die stabilisierte Infrastruktur und die notwendigen Konfigurationen für den Betrieb der Teleschmiede Website auf IONOS Shared Hosting.

## 1. Das Transport-Problem (.htaccess Sperre)
IONOS blockiert das Hochladen von Dateien, die mit einem Punkt beginnen (`.htaccess`), über das SFTP-Protokoll in bestimmten Umgebungen.

**Lösung: Der PHP-Aktivator**
- Die Konfiguration wird als `htaccess.test` hochgeladen.
- Nach dem Upload wird das Skript `activate_htaccess.php` aufgerufen.
- Dieses Skript führt serverseitig `copy('htaccess.test', '.htaccess')` aus. Dies umgeht die Protokollsperre.

## 2. Der stabile Redirect-Standard (Loop-Fix)
Vermeide die Prüfung von `HTTP:X-Forwarded-Proto`, da dieser Header oft fehlt oder gefiltert wird. Nutze stattdessen:

```apacheconf
# HTTP zu HTTPS (Standard-Check)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://teleschmie.de%{REQUEST_URI} [L,R=301]

# WWW zu Non-WWW
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteRule ^(.*)$ https://teleschmie.de/$1 [L,R=301]
```

## 3. Build-Umgebung (CI/CD)
- **Node Version**: 22+ (stabilste Performance).
- **Environment**: `DEPLOY_TARGET: ionos` muss im Build-Schritt gesetzt sein, damit Astro den Root-Pfad (`/`) statt des Repo-Namens nutzt.
- **Parallelität**: `options: '--parallel=10'` im Mirror-Schritt ist stabil.

## 4. Diagnose-Tools
- `debug.php`: Zeigt alle `$_SERVER` Variablen und die aktuelle Dateiliste. Im Zweifel immer hier prüfen, ob die `.htaccess` physisch existiert.

---
*Dieser Standard wurde in Lauf #584 final verifiziert und sollte bei zukünftigen Deployment-Problemen als Referenz herangezogen werden.* 🌻
