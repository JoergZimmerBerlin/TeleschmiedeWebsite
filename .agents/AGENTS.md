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
  - **STRIKTE EXISTENZ-PRÜFUNG:** Es darf ZWINGEND NUR auf interne URLs verlinkt werden, deren Zieldatei/Route tatsächlich im Projekt existiert. Erfundene Links auf nicht-existierende Pfade sind strengstens untersagt!

- **SE Ranking Daten-Abfrage (Standard & Backup):**
  - **Standardweg (MCP):** Alle Datenabfragen zu SE Ranking (Keywords, Backlinks, Audits, Competitors, AI Search etc.) müssen ZWINGEND primär über die nativen MCP-Tools (`se-ranking/...`) ausgeführt werden.
  - **Backupweg (REST-API):** Die Skripte `scripts/se_ranking_fetch.py` und `scripts/se_ranking_teleschmie.py` im Projektordner dienen ausschließlich als Fallback, falls der MCP-Server temporär unerreichbar ist.

- **Terminal & Sandbox Ausführung (Bypass Sandbox):**
  - Führe alle Terminal-Kommandos (`run_command`) STRIKT im sicheren Sandbox-Modus aus (`BypassSandbox: false`), wann immer es möglich ist.
  - Wenn die Sandbox aktiv ist, wird der Nutzer nicht durch lästige Bestätigungs-Popups gestört. Die Sandbox zu umgehen (Bypass) führt zu einem harten, vom System erzwungenen Sicherheits-Popup, das den Nutzer aus dem Workflow reißt. Vermeide das zwingend, es sei denn, es ist für Netzwerkzugriffe zwingend nötig. **WICHTIGE AUSNAHME:** Der Deployment-Prozess (`scripts/deploy.sh`) feuert zwingend Netzwerk-Requests gegen GitHub, IONOS, IndexNow und die Google Search Console API. Das Deploy-Skript MUSS deshalb IMMER mit `BypassSandbox: true` gestartet werden, andernfalls schlagen die APIs fehl!

- **Kategorie-Zuweisung für Blogartikel:**
  - Neue Blogartikel dürfen NIEMALS pauschal in die Kategorie "SEO Praxis" geworfen werden.
  - Prüfe JEDES MAL den Inhalt des Artikels und wähle die am besten passende Kategorie aus dem offiziellen Katalog:
    - **SEO Praxis** (für Fallstudien, generelle Strategien, Anleitungen)
    - **Tech SEO & Tools** (für Software, Tools wie SE Ranking, Sistrix, Page Speed, Coding)
    - **AI SEO** (für KI-Themen, AEO, ChatGPT, Claude, Agenten)
    - **Events & Networking** (für Konferenzen, OMR, Campixx, Meetups)
  - Vermeide Wildwuchs (z.B. "Agentur & Tools" oder "KI & SEO"). Nutze nur diese festgelegten Standards!

- **Qualität, Workflows & Kommunikation (Premium-Anspruch):**
  - **Ressourcen-Management & Anti-Polling-Verbot:** Der Rechner des Nutzers ist ein älteres MacBook Pro (i7, 16GB RAM) und überhitzt extrem schnell. Es ist DIR DAHER ABSOLUT VERBOTEN, asynchrone Prozesse (wie `npm run build` oder Deployments) durch manuelles Polling wie `tail -f` oder `sleep 5 && cat ...` zu überwachen. Du MUSST den Befehl ausführen und danach das Tool-Calling beenden, um auf den automatischen Callback des Antigravity-Systems zu warten. Das Generieren von Endlos-Tasks (`tail -f`) blockiert die Maschine. Laufende Server (Dev-Server), die absichtlich mit `IsDaemon: true` gestartet wurden, MÜSSEN am Ende eines Tasks autonom via `manage_task` (kill) beendet werden. Keine Hintergrund-Prozesse als Karteileichen hinterlassen!
  - **Webrecherche-Pflicht für Glossar (Zero-Hallucination):** Vor dem Schreiben JEDES einzelnen Glossar-Artikels MUSS zwingend und ohne jede Ausnahme eine eigenständige, aktive Webrecherche (`search_web`) zum spezifischen Thema durchgeführt werden. Es darf sich NIEMALS nur auf internes KI-Modellwissen oder vorherige Batch-Suchen verlassen werden. Keine Umwege, keine Ausnahmen!
  - **Push-Back bei Überladung (Step-by-Step):** Der Nutzer priorisiert höchste Qualität über Schnelligkeit. Wenn ein Prompt zu viele Aufgaben auf einmal enthält, DARFST du nicht alle hastig abarbeiten und dabei Dinge vergessen. STOPPE stattdessen, teile die Aufgaben in kleine Blöcke auf und hole dir für jeden Block einzeln das Go des Nutzers. Qualität duldet kein Überspringen von Tasks.
  - **Kein "Blind-Batching":** Wenn mehrere URLs zur Verarbeitung eingereicht werden, dürfen maximal 3 URLs auf einmal bearbeitet werden. Jeder Batch muss zwingend das Quality Gate passieren, bevor der nächste begonnen wird.
  - **Die "Tacheles-Statusmeldung":** Melde dich beim Nutzer nicht einfach mit "Ist erledigt". Liefere einen transparenten Status: Was wurde gemacht? Welche Qualitätskriterien (Title-Länge, Anzahl Links) wurden geprüft? Was wurde nicht geschafft?
  - **Stopp-Signale bei Unklarheiten:** Wenn eine Design-Vorgabe (z.B. HTML-Formatierung von Zitaten) technisch bricht oder unklar ist, darfst du nicht improvisieren oder es unsauber hinterlassen. Halte den Prozess an (`/grill-me`) und frage den Nutzer nach einer Entscheidung.
  - **Fokus auf Original-Assets (LinkedIn):** Generiere NIEMALS Dummy-3D-Bilder für LinkedIn-Artikel, wenn der Post Bilder enthält. Nutze die Originalbilder. Wenn kein Bild existiert, frage proaktiv den Nutzer, anstatt Budget zu verbrennen.

- **[LOCKED] System-Architektur (Überschreibungs-Verbot):**
  - **NIEMALS WORKFLOWS ÜBERSCHREIBEN:** Du darfst Dateien in `.agents/workflows/` NIEMALS über `write_to_file` mit `Overwrite=true` komplett neu schreiben. Nutze ausschließlich `replace_file_content`, um isolierte Regeln hinzuzufügen oder zu ändern. Gelöschtes Wissen der letzten 5 Monate darf nicht verloren gehen!
  - **Git-Diff-Zwang:** Wenn du alte Workflow-Regeln entfernst, MUSST du stoppen und den Nutzer fragen: "Ist es okay, dass ich Regel X entferne?".
  - **Daisy-Chaining:** Wenn ein Workflow beendet ist (z.B. Content-Erstellung), befolge ZWINGEND die Anweisung am Ende des Workflows, welches Skript (z.B. Quality-Gate) oder welcher Folge-Workflow (z.B. Deploy) als Nächstes auszuführen ist. Erfinde NIEMALS eigene Prozesse.

- **[LOCKED] Globale UI-Komponenten (Master-Design):**
  - **Die offizielle CTA-Box:** Wenn du in einem Blogartikel oder einer Page eine CTA-Box einbaust, MUSST du EXAKT folgenden Code (Limettengrün) per Copy-Paste nutzen. Kein Abweichen, keine Improvisation:
    ```html
    <div class="my-8 bg-lime-accent text-dark p-6 rounded-2xl text-center shadow-sm">
      <p class="font-bold text-xl mb-4">💬 Jetzt an der Diskussion teilnehmen!</p>
      <a href="[ZIEL-URL]" target="_blank" rel="noopener noreferrer" class="inline-block bg-dark text-white font-bold py-2 px-6 rounded-full hover:bg-gray-800 transition-colors">
        Beitrag auf LinkedIn öffnen
      </a>
    </div>
    ```
    **HINWEIS:** Wenn es keinen spezifischen LinkedIn-Beitragslink gibt, ersetze `[ZIEL-URL]` immer mit der allgemeinen Profil-URL des Nutzers: `https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/`
