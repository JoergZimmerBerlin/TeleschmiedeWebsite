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
  - **Visuelle Anreicherung im Content (ERWÜNSCHT):** Wenn Bilder oder Infografiken zur Visualisierung komplexer Sachverhalte sinnvoll sind, erstellen wir diese gerne nach den Style-Vorgaben.
  - **Echte Screenshots & Fotos (STRIKT BEIBEHALTEN):** Vorhandene UI-Screenshots (z.B. SE Ranking, Rankscale, Google Search Console) und echte Fotos bleiben im Text zwingend erhalten und dürfen niemals gelöscht werden!
  - Generiere NIEMALS ein Bild ohne diese exakten Vorgaben. Das Ignorieren dieser Regel verschwendet aktiv das API-Budget des Nutzers und ist strengstens untersagt!

- **Content Creation & Verlinkung (SEO Inlinks):**
  - Sobald ein neuer Blog- oder Glossar-Artikel geschrieben oder überarbeitet wird, müssen zwingend **mindestens 5 bis 7 In-Text-Links** zu bestehenden Artikeln der Website eingefügt werden.
  - Der Anker-Text (Linktext) muss thematisch passen und idealerweise exakt der H1-Überschrift oder dem Meta-Title der Ziel-URL entsprechen.
  - Diese Regel verhindert die Entstehung von Orphan Pages und sichert eine tiefe Crawlability.
  - **STRIKTE EXISTENZ-PRÜFUNG:** Es darf ZWINGEND NUR auf interne URLs verlinkt werden, deren Zieldatei/Route tatsächlich im Projekt existiert. Erfundene Links auf nicht-existierende Pfade sind strengstens untersagt!

- **SE Ranking Daten-Abfrage & MCP Konfiguration:**
  - **Standardweg (MCP):** Alle Datenabfragen zu SE Ranking (Keywords, Backlinks, Audits, Competitors, AI Search etc.) müssen ZWINGEND primär über die nativen MCP-Tools (`se-ranking/...`) ausgeführt werden.
  - **[LOCKED] MCP Konfiguration:** Der SE Ranking MCP-Server ist **global** in `~/.gemini/config/mcp_config.json` verankert (mit fixem Auth-Token im Environment), damit er in *allen* Projekten sofort ohne erneute Autorisierung zur Verfügung steht. Lokale Workspace-Plugins für SE Ranking sind nicht nötig.
  - **Backupweg (REST-API):** Fallback-Skripte für die REST-API werden nur noch auf expliziten Wunsch neu generiert (alte Skripte wurden archiviert/gelöscht).

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
  - **Die offizielle CTA-Box (Dark Premium Card):** Wenn du in einem Blogartikel oder einer Page eine CTA-Box einbaust, nutze zwingend das hochwertige CI-Design ohne Emojis/Smileys mit dem offiziellen `.btn-primary`:
    ```html
    <div class="my-10 bg-dark text-white p-8 rounded-3xl border border-white/10 text-center shadow-md">
      <h3 class="text-xl md:text-2xl font-bold text-white mb-3 !mt-0 !border-none !pb-0">
        Jetzt an der Diskussion teilnehmen
      </h3>
      <p class="text-gray-300 text-sm max-w-xl mx-auto mb-6">
        Diskutiere mit Jörg Zimmer und der SEO-Community auf LinkedIn über diesen Beitrag.
      </p>
      <a href="[ZIEL-URL]" target="_blank" rel="noopener noreferrer" class="btn-primary">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        <span>Beitrag auf LinkedIn öffnen</span>
        <span aria-hidden="true">→</span>
      </a>
    </div>
    ```
    **HINWEIS:** Wenn es keinen spezifischen LinkedIn-Beitragslink gibt, ersetze `[ZIEL-URL]` immer mit der allgemeinen Profil-URL des Nutzers: `https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/`

  - **Die offizielle Master-Zitatbox (Semantisches E-E-A-T Zitat):**
    ```html
    <figure class="my-8 bg-neutral-50 border border-neutral-200 p-6 md:p-8 rounded-2xl shadow-sm">
      <div class="flex items-center gap-4 mb-4">
        <img 
          src="/assets/images/profile/joerg-zimmer-portrait.webp" 
          alt="Jörg Zimmer - Senior SEO & AI Search Consultant" 
          class="w-14 h-14 rounded-full object-cover object-top shadow-sm border-2 border-lime-accent" 
          width="56" 
          height="56" 
          loading="lazy"
        />
        <div>
          <h4 class="font-bold text-base md:text-lg text-dark mb-0">Jörg Zimmer</h4>
          <p class="text-xs md:text-sm text-neutral-600 mb-0">Senior SEO & AI Search Consultant</p>
        </div>
      </div>
      <blockquote class="text-base md:text-lg text-dark leading-relaxed italic border-l-4 border-lime-accent pl-4 my-4 font-normal">
        „[DEIN ZITAT IM BERLINER KLARTEXT]“
      </blockquote>
      <figcaption class="mt-4 pt-3 border-t border-neutral-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
        <span>Experten-Zitat • <cite class="not-italic font-semibold text-neutral-700">Jörg Zimmer</cite></span>
        <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="font-bold text-lime-700 hover:underline inline-flex items-center gap-1">
          Jörg Zimmer auf LinkedIn folgen →
        </a>
      </figcaption>
    </figure>
    ```

  - **Die offizielle Agentenbox (Arbeitsanweisung für KI-Coding-Assistenten):**
    Für technische Umsetzungsthemen (Schema Markup, SSR, Content Negotiation, RAG etc.):
    ```html
    <div class="my-8 bg-dark text-white p-6 rounded-2xl border-l-4 border-lime-accent shadow-md relative not-prose">
      <div class="flex items-start justify-between gap-4 mb-3">
        <div class="flex items-center gap-3">
          <span class="text-lime-accent text-2xl shrink-0">🤖</span>
          <p class="font-bold text-base md:text-lg text-lime-accent mb-0">Arbeitsanweisung für deinen KI-Agenten (Cursor / Claude / Antigravity)</p>
        </div>
        <button type="button" class="copy-agent-btn px-2.5 py-1 bg-lime-accent text-dark hover:bg-lime-600 hover:text-white text-[11px] font-bold uppercase rounded border border-lime-500 hover:border-lime-600 transition-all flex items-center gap-1 shadow-md cursor-pointer shrink-0 ml-auto" title="Prompt kopieren">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z" /></svg>
          <span>Kopieren für Agent</span>
        </button>
      </div>
      <p class="text-gray-300 text-sm mb-4 leading-relaxed">
        Kopiere diesen Prompt direkt in deinen KI-Coding-Assistenten, um die Anforderungen automatisiert für dein Webprojekt umzusetzen:
      </p>
      <div class="bg-black/60 p-4 rounded-xl border border-white/10 text-xs font-mono text-gray-200 overflow-x-auto space-y-2">
        <p class="text-lime-accent font-bold mb-1"># Prompt: [Konkreter Task-Name]</p>
        <p><strong>Rolle:</strong> [z.B. Du bist ein hochspezialisierter Technical SEO & Web Architect.]</p>
        <p><strong>Aufgabe:</strong> [Klare Handlungsanweisung]</p>
        <p><strong>Schritte & Validierung:</strong> [Schrittfolge und Verifikation]</p>
      </div>
    </div>
    ```
