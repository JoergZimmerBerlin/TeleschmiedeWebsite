# General Rules

- **Trailing Slashes:** Interne Links (`teleschmie.de`) müssen zwingend auf `/` enden. Das gilt sowohl für den Code (Markdown/HTML) als auch für alle URLs, die in Chat-Antworten an den Nutzer ausgegeben werden (sowohl im Text als auch im Link-Ziel).

- **Agent Readiness & Cloudflare Radar (Level 5):**
  - **Auth.md:** Muss zwingend kleingeschrieben werden (`auth.md`) und als allererste H1-Überschrift `# auth.md` enthalten.
  - **A2A Agent Card:** Muss als `agent-card.json` benannt sein und strikt dem JSON-Schema von `a2a-protocol.org` v1.0 entsprechen (mit den Feldern `supportedInterfaces`, `capabilities`, `skills`).
  - **Link Headers (RFC 8288):** In der `.htaccess` dürfen bei `Header add Link` **keine Anführungszeichen** innerhalb der spitzen Klammern stehen (Korrekt: `<url>; rel="type"`, Falsch: `<url">; rel="type"`).
  - **IONOS Deployment:** Bei Änderungen an `.htaccess` oder Dateien im `.well-known` Ordner muss nach dem FTP-Upload zwingend das Skript `https://teleschmie.de/activate_htaccess.php` im Browser oder per cURL aufgerufen werden, damit die Änderungen auf dem Webserver aktiv werden.

- **STRIKTE BILDGENERIERUNG (BUDGET-SCHUTZ):** 
  - **NIEMALS ENGLISCH:** Infografiken und 3D-Bilder für das Projekt müssen ZWINGEND **deutsche Beschriftungen** haben. Der Prompt muss ausdrücklich fordern: `All text in GERMAN: [dein deutscher Text]`.
  - **Style-Vorgaben:** Reinweißer Hintergrund (`#FFFFFF`), lime-grüne Akzente (`#D9FF00`) und das Wasserzeichen "Jörg Zimmer" unten rechts sind absolute Pflicht. **Zusätzlich:** Die Infografiken sollten 4 bis 6 Kernelemente enthalten. Die Schrift muss extrem groß und fett sein, damit sie auch als kleines Vorschaubild (Thumbnail) perfekt lesbar bleibt. Vermeide kleinteilige Details.
  - Generiere NIEMALS ein Bild ohne diese exakten Vorgaben. Das Ignorieren dieser Regel verschwendet aktiv das API-Budget des Nutzers und ist strengstens untersagt!

- **Content Creation & Verlinkung (SEO Inlinks):**
  - Sobald ein neuer Blog- oder Glossar-Artikel geschrieben oder überarbeitet wird, müssen zwingend **mindestens 3 In-Text-Links** zu bestehenden Artikeln der Website eingefügt werden.
  - Der Anker-Text (Linktext) muss thematisch passen und idealerweise exakt der H1-Überschrift oder dem Meta-Title der Ziel-URL entsprechen.
  - Diese Regel verhindert die Entstehung von Orphan Pages und sichert eine tiefe Crawlability.
