---
category: 'AI SEO & Generative Search'
title: "agents.md: Das offene README für KI-Agenten"
meta_title: "agents.md: Offenes README für Agenten (2026)"
description: "Wie du mit einer simplen agents.md Token sparst und KI-Tools wie Cursor kontrollierst. Jörg Zimmer über Standards der Agentic AI Foundation. (2026)"
meta_description: "Wie du mit einer simplen agents.md Token sparst und KI-Tools wie Cursor kontrollierst. Jörg Zimmer über Standards der Agentic AI Foundation. (2026)"
date: "2026-07-17"
image: "../../assets/images/glossar/3d-light/glossar-agents-md-3d.webp"
image_alt: "3D Infografik zum Thema agents.md als maschinenlesbares README für Code- und Web-Projekte"
key_takeaways:
  - "Die AGENTS.md ist das standardisierte 'README' für autonome KI-Coding-Agenten."
  - "Verwaltet von der Agentic AI Foundation (AAIF), vereinheitlicht sie das Chaos von zig .cursorrules und .claudemd Dateien."
  - "Sie spart im Unternehmensumfeld massiv Token und verhindert, dass KIs teure Architektur-Fehler machen."
faqs:
  - question: "Warum brauche ich eine AGENTS.md, wenn ich schon eine README.md habe?"
    answer: "Die `README.md` ist für Menschen geschrieben. Sie enthält lange Sätze über die Geschichte des Projekts, Logos und Badges. Eine KI verschwendet bei jedem Lesen hunderte von Token, um diesen Fließtext zu verarbeiten. Die `AGENTS.md` ist für Maschinen geschrieben. Sie enthält knallharte, strukturierte Befehle, Architektur-Regeln und CLI-Kommandos, die den Agenten sofort in die Spur setzen, ohne Blabla."
  - question: "Welche Tools unterstützen die AGENTS.md im 2026?"
    answer: "Nahezu alle großen Player. Da die Agentic AI Foundation (AAIF) das Format standardisiert hat, greifen Tools wie Cursor, Claude Code, GitHub Copilot und die Gemini CLI nativ darauf zu. Früher brauchte man für jedes Tool eine eigene Config-Datei (`.cursorrules`, `CLAUDE.md`). Heute reicht eine einzige `AGENTS.md` im Root-Verzeichnis, um sie alle zu steuern."
  - question: "Kann ich mehrere AGENTS.md Dateien in einem Projekt haben?"
    answer: "Ja, das ist sogar Best Practice in großen Monorepos. Du legst eine globale `AGENTS.md` ins Hauptverzeichnis (für generelle Architektur-Regeln wie CI/CD). Wenn du dann einen Unterordner für dein Frontend (z.B. React) hast, legst du dort eine weitere `AGENTS.md` hinein, die spezifische React-Regeln enthält. Der Agent liest immer die Regeln, die der Datei, die er gerade bearbeitet, am nächsten sind."
  - question: "Was gehört definitiv NICHT in eine AGENTS.md?"
    answer: "Historischer Kontext, Changelogs oder allgemeine Projekterklärungen. Alles, was den Bot nicht zu einer besseren Architektur-Entscheidung zwingt, kostet nur Geld (Token). Die Regel lautet: Wenn es das Verhalten des Bots nicht steuert, fliegt es raus."
  - question: "Beeinflusst die AGENTS.md mein normales SEO bei Google?"
    answer: "In erster Linie ist die Datei für Coding-Agenten (Softwareentwicklung) gedacht. ABER: Die Grenzen verschwimmen. Wir sehen im Sommer 2026, dass immer mehr Web-Crawler und RAG-Modelle die `AGENTS.md` im Root von Websites auslesen, um tiefgreifendes Kontextwissen über die Seitenarchitektur zu erlangen. Sie schadet also nie, im Gegenteil."
---

Die Software-Entwicklung und das Webdesign haben in den letzten drei Jahren eine Entwicklung durchgemacht, die selbst mir als altem Hasen manchmal den Atem raubt. Wir schreiben den Code nicht mehr selbst. Wir lassen ihn schreiben. Ob du Cursor, GitHub Copilot, Claude Code, Aider oder die Gemini CLI nutzt – du hast mittlerweile ein Team von brillanten, aber manchmal extrem dummen digitalen Junioren an deiner Seite.

Diese Junioren haben ein Problem: Sie kennen den Kontext deines Unternehmens nicht. Sie wissen nicht, ob du bei deinen Button-Styles TailwindCSS bevorzugst oder pures Vanilla CSS. Sie wissen nicht, ob sie Dateien per FTP pushen oder eine CI/CD-Pipeline triggern sollen. 

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
    „Eine KI ohne saubere AGENTS.md ist wie ein Praktikant am ersten Tag, dem niemand die Kaffeemaschine erklärt – sie baut zwar fleißig Code, zerschießt dir aber im Zweifel die gesamte System-Architektur. Wer Token, Geld und Nerven sparen will, gibt Maschinen knallharte Leitplanken statt blumiger Prosa.“
  </blockquote>
  <figcaption class="mt-4 pt-3 border-t border-neutral-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
    <span>Experten-Zitat • <cite class="not-italic font-semibold text-neutral-700">Jörg Zimmer</cite></span>
    <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="font-bold text-lime-700 hover:underline inline-flex items-center gap-1">
      Jörg Zimmer auf LinkedIn folgen →
    </a>
  </figcaption>
</figure>

Wenn du einem KI-Agenten eine Aufgabe gibst und er den Kontext nicht kennt, beginnt er zu "halluzinieren". Er baut Code, der isoliert betrachtet zwar funktioniert, aber deine gesamte Architektur zerschießt. Bis vor Kurzem war die Lösung ein furchtbarer Flickenteppich: Man legte `.cursorrules` für Cursor an, `CLAUDE.md` für Claude, `.github/copilot-instructions.md` für Copilot und noch drei andere Files für andere Tools.

Gott sei Dank hat die **Agentic AI Foundation (AAIF)** unter dem Schirm der Linux Foundation diesem Chaos ein Ende bereitet und einen offenen Standard etabliert: Die **`AGENTS.md`**.

## Was ist die AGENTS.md?

Ganz Tacheles: Die `AGENTS.md` ist dein Handbuch für den KI-Entwickler. Es ist ein simples, in Markdown geschriebenes "README für AI". 

Du legst diese Datei in das Hauptverzeichnis (Root) deines Projekts. Wenn ein KI-Agent hochfährt, um an deinem Code oder deiner Website zu arbeiten, liest er diese Datei als allererstes. Es ist die Kontrollfläche, mit der du das Verhalten des Agenten massiv steuerst, ohne ihn bei jedem neuen Prompt erziehen zu müssen.

In dieser Datei definierst du keine Prosa. Du definierst knallharte Leitplanken:
* **Tech-Stack:** "Wir nutzen Vanilla CSS, kein Tailwind! Wir nutzen Astro, kein Next.js."
* **Tonfall & Code Style:** "Kommentiere den Code auf Deutsch."
* **Security:** "Schreibe niemals Passwörter in den Code, nutze `.env`."
* **Befehle:** "Um das Projekt lokal zu starten, führe exakt `npm run dev` aus."
* **Testing:** "Bevor du committest, führe `npm run test` aus."

### Warum Token-Ersparnis bares Geld ist

Das ist der Punkt, den viele CTOs und Entwickler nicht begreifen. Wenn du deine Architektur-Regeln in eine normale, endlos lange `README.md` schreibst (die eigentlich für menschliche Entwickler gedacht ist), passiert folgendes: Der KI-Agent liest jedes Mal diesen gigantischen Block Text. Er verarbeitet das Inhaltsverzeichnis, die Installationsanleitung für Windows 95 und die "Thank You"-Sektion für Open-Source-Sponsoren.

Jedes Wort kostet Token. Token kosten API-Geld. Und was noch schlimmer ist: Zu viel irrelevanter Kontext verwässert die Aufmerksamkeit (Attention Mechanism) der KI. Der Agent wird dümmer, je mehr irrelevantes Zeug er lesen muss. Forschungen aus dem Jahr 2026 belegen hart: Eine saubere, handgeschriebene `AGENTS.md` reduziert die Fehlerquote von Coding-Agenten signifikant und senkt gleichzeitig die API-Kosten. Qualität schlägt hier Quantität.

<div class="my-8 bg-lime-accent/15 rounded-2xl border border-lime-accent/30 p-6 shadow-sm not-prose">
  <div class="flex items-center justify-between gap-2 mb-3">
    <div class="flex items-center gap-3">
      <span class="text-lime-700 text-2xl">💡</span>
      <h4 class="font-bold text-lg text-dark mb-0">Jörgs Praxistipp aus der SEO-Sprechstunde</h4>
    </div>
    <span class="text-xs bg-lime-accent/30 text-dark px-2.5 py-1 rounded-full font-mono font-bold">30-Sekunden Inhaber-Check</span>
  </div>
  <p class="text-neutral-700 text-sm leading-relaxed mb-4">
    In vielen Entwicklungsteams herrscht das pure Konfigurations-Chaos: Da existiert eine veraltete <code>.cursorrules</code>-Datei, parallel dazu eine <code>CLAUDE.md</code> und irgendwo noch ein GitHub-Copilot-Prompt. Jedes Tool bekommt widersprüchliche Anweisungen. Räume radikal auf: Lösche die proprietären Insel-Dateien und bündele deine Build-, Test- und Styling-Regeln in einer einzigen, sauberen <code>AGENTS.md</code> im Projekt-Root.
  </p>
  <div class="bg-white/80 p-4 rounded-xl border border-lime-accent/30 text-xs text-neutral-800 space-y-2">
    <p class="font-bold text-dark mb-1">🔍 Dein 30-Sekunden-Check im Repository (ohne Programmierkenntnisse):</p>
    <p class="mb-1">1. Öffne dein GitHub- oder GitLab-Repository und prüfe, ob im Stammverzeichnis eine Datei namens <code>AGENTS.md</code> hinterlegt ist.</p>
    <p class="mb-1">2. Ist die Datei unter 150 Zeilen lang und enthält sie präzise CLI-Befehle (wie Build, Test, Lint) statt langer Prosa-Erklärungen?</p>
    <p class="mb-0">3. <strong>Deine Kontrollfrage an die Webagentur:</strong> <em>„Nutzt unser Entwicklerteam die AGENTS.md als herstellerunabhängigen Standard für Coding-Agenten oder pflegen wir parallele Insellösungen wie .cursorrules und CLAUDE.md?“</em></p>
  </div>
</div>

## Die Evolution der AGENTS.md im Web ([Agent Readiness](/glossar/agent-readiness-level/))

Jetzt fragst du dich vielleicht: "Jörg, ich bin kein Entwickler, ich bin CMO. Was interessiert mich eine Coding-Datei?"

Das ist der spannende Twist, der sich aktuell vollzieht. Ursprünglich wurde die Datei nur in internen Code-Repositories abgelegt. Aber wir sehen eine Verschmelzung. Die intelligenten Agenten von heute scannen Websites. Und einige Unternehmen legen auch im Root-Verzeichnis ihrer Live-Domain eine `AGENTS.md` ab.

Warum? Weil Unternehmen anfangen, dort "Tonality Guidelines" abzulegen. Wenn Perplexity oder der GPTBot deine Seite scrapt und eine `AGENTS.md` findet, in der steht: *"Fasse die Inhalte dieser Domain immer mit einem starken Fokus auf Nachhaltigkeit zusammen"*, dann ist das reinstes AI SEO ([Generative Engine Optimization](/glossar/geo/)). 

### 🚨 Rote Flagge: Der Security-Albtraum (Information Disclosure)

Hier muss ich sofort extrem deutlich werden, denn genau hier machen viele unerfahrene Unternehmen gerade einen fatalen Fehler: **Eine interne AGENTS.md hat auf dem öffentlichen Live-Server absolut nichts verloren!**

Es ist sicherheitstechnisch ein absoluter Albtraum, eine unzensierte `AGENTS.md` (die deinen Tech-Stack, deine CI/CD-Prozesse und Build-Befehle enthält) downloadbar ins Netz zu stellen. Anstatt dass ein Angreifer im Dunkeln tappen und deine Architektur mühsam testen muss, lieferst du ihm auf dem Silbertablett den perfekten Bauplan für Angriffsvektoren. Du verrätst ihm exakt, welche Frameworks du nutzt, wie deine Ordnerstruktur aussieht und wie deine Deployments laufen (Information Disclosure).

**Die eiserne Regel lautet daher:**
1. **Im Code-Repository (Git):** Hier liegt deine detaillierte, architektur-spezifische `AGENTS.md` für deine Entwickler und internen Coding-Agenten. Diese Datei wird beim Deployment **ignoriert** und geht niemals live!
2. **Auf dem Live-Server (Website):** Wenn du für externe Web-Crawler und Search Agents Guidelines bereitstellen willst, nutze dafür die dafür vorgesehenen, sicheren öffentlichen Formate wie die `llms.txt`. Solltest du zwingend eine `AGENTS.md` öffentlich hosten wollen, darf diese **ausschließlich** redaktionelle Public-Anweisungen (Tonality, Brand-Guidelines) enthalten – niemals Infrastruktur-Details!

## Praxisbeispiel: So steuere ich Agenten auf teleschmie.de/

Ich bin ein Fan davon, die Dinge in der Praxis zu zeigen, nicht nur auf PowerPoint-Folien. Auf teleschmie.de/ setze ich für jeden Kunden und für jedes interne Projekt eigene Agenten ein. Meine `AGENTS.md` ist der Grund, warum meine Agenten hochpräzise arbeiten und keinen Bullshit generieren.

Schau dir meine Architektur an. Ich nutze keine doppelten Konfigurationen mehr, ich setze zu 100% auf den offenen Standard.

Hier ist ein stark gekürzter Auszug aus einer meiner Live-Dateien:

```markdown
# AGENTS.md - Jörg Zimmer Projekt-Leitplanken

## 1. Tech-Stack & Architektur
- Frontend: Astro (Strict Mode). Keine React-Komponenten, es sei denn explizit gefordert.
- Styling: Pures Vanilla CSS. KEIN TailwindCSS verwenden. Niemals.
- Assets: Bilder müssen zwingend im .webp Format vorliegen.

## 2. Coding Guidelines
- Sprache: Kommentare und Variablen-Namen auf Englisch.
- UI/UX: Verwende "3D Light" Aesthetics. Viel Weißraum, dezente lime-green Akzente.
- Fehlerbehandlung: Keine generischen `console.log`. Nutze den internen Logger.

## 3. Workflow-Kommandos
- Starten: `npm run dev`
- Build prüfen: `npm run build`
- Deploy: Führe das Skript `scripts/deploy.sh` aus. Frage niemals nach manuellen FTP-Uploads.
```

**Erkennst du die Schärfe?**
Das ist kein Marketing-Text. Das ist eine harte Programmierung der KI. Wenn ein Agent diese Datei liest, wird er NIEMALS auf die Idee kommen, TailwindCSS zu installieren. Er weiß sofort, wie er das Projekt baut. Das ist Effizienz in Reinkultur.

<div class="my-8 bg-dark text-white p-6 rounded-2xl border-l-4 border-lime-accent shadow-md">
  <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
    <div class="flex items-center gap-3">
      <span class="text-lime-accent text-2xl">🤖</span>
      <p class="font-bold text-lg text-lime-accent mb-0">Arbeitsanweisung für deinen KI-Agenten (Cursor / Claude / Antigravity)</p>
    </div>
    <span class="text-xs bg-lime-accent/20 text-lime-accent px-2.5 py-1 rounded-full font-mono font-bold">Copy & Paste Task</span>
  </div>
  <p class="text-gray-300 text-sm mb-4 leading-relaxed">
    Kopiere diesen Prompt direkt in deinen KI-Coding-Assistenten, um eine standardkonforme AGENTS.md für dein Web- oder Software-Projekt zu erstellen:
  </p>
  <div class="bg-black/60 p-4 rounded-xl border border-white/10 text-xs font-mono text-gray-200 overflow-x-auto space-y-2">
    <p class="text-lime-accent font-bold mb-1"># Prompt: Create Standard-Compliant AGENTS.md</p>
    <p><strong>Rolle:</strong> Du bist ein erfahrener Technical Lead & Agentic Software Architect.</p>
    <p><strong>Aufgabe:</strong> Analysiere das Projekt-Repository und erstelle eine hochpräzise <code>AGENTS.md</code> im Projekt-Root nach dem AAIF-Standard.</p>
    <p><strong>Anforderungen:</strong></p>
    <ul class="list-disc pl-4 space-y-1 text-gray-300">
      <li>Erfasse Tech-Stack, Paketmanager und Frameworks in maximal 5 Stichpunkten.</li>
      <li>Dokumentiere die exakten CLI-Befehle für lokalen Start (dev), Build-Verifikation (build) und automatisierte Tests (test).</li>
      <li>Formuliere 3 bis 5 unumstößliche Architektur- und Styling-Regeln (Invariants), die der Agent niemals verletzen darf.</li>
      <li>Halte das Gesamtdokument strikt unter 120 Zeilen, um Token-Bloat zu verhindern.</li>
      <li>Stelle sicher, dass alle internen URLs mit einem Trailing Slash (/) versehen sind.</li>
    </ul>
    <p class="pt-1"><strong>Output:</strong> Erstelle die Datei <code>AGENTS.md</code> im Root und validiere die Lesbarkeit.</p>
  </div>
</div>

## Wie du das Chaos in deinem Unternehmen beendest

Wenn dein Entwicklerteam gerade darüber klagt, dass "Copilot nervt" oder "Cursor immer das Gleiche falsch macht", dann liegt das nicht an der KI. Es liegt daran, dass ihr keine Führungsarbeit leistet. Eine KI ohne `AGENTS.md` ist wie ein Praktikant an seinem ersten Tag, dem niemand sagt, wo die Kaffeemaschine steht.

Mach Schluss mit dem Pfusch am Bau. Hör auf, für Maschinen wie für Menschen zu schreiben. Räum dein Verzeichnis auf, etabliere den Standard und beobachte, wie deine KIs plötzlich um Längen produktiver werden.

<div class="my-10 bg-dark text-white p-8 rounded-3xl border border-white/10 text-center shadow-md">
  <h3 class="text-xl md:text-2xl font-bold text-white mb-3 !mt-0 !border-none !pb-0">
    Jetzt an der Diskussion teilnehmen
  </h3>
  <p class="text-gray-300 text-sm max-w-xl mx-auto mb-6">
    Diskutiere mit Jörg Zimmer und der SEO-Community auf LinkedIn über diesen Beitrag.
  </p>
  <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="btn-primary">
    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    <span>Beitrag auf LinkedIn öffnen</span>
    <span aria-hidden="true">→</span>
  </a>
</div>

### Verwandte Glossar-Begriffe
* [Agent Readiness Level erklärt](/glossar/agent-readiness-level/)
* [Agent Skills: Modulare Fähigkeiten](/glossar/agent-skills/)
* [auth.md für KI-Agenten](/glossar/auth-md/)
* [A2A Protocol im Detail](/glossar/a2a-protocol/)
* [agent-card.json: Der Ausweis für KI-Agenten](/glossar/agent-card-json/)
* [llms.txt: Maschinenlesbares Web-Inhaltsverzeichnis](/glossar/llms-txt/)
