---
category: "AI SEO & Generative Search"
title: "agents.md: Das offene README für KI-Agenten"
description: "Wie du mit einer simplen agents.md Token sparst und KI-Tools wie Cursor kontrollierst. Jörg Zimmer über den Standard der Agentic AI Foundation."
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
  - question: "Welche Tools unterstützen die AGENTS.md im Juli 2026?"
    answer: "Nahezu alle großen Player. Da die Agentic AI Foundation (AAIF) das Format standardisiert hat, greifen Tools wie Cursor, Claude Code, GitHub Copilot und die Gemini CLI nativ darauf zu. Früher brauchte man für jedes Tool eine eigene Config-Datei (`.cursorrules`, `CLAUDE.md`). Heute reicht eine einzige `AGENTS.md` im Root-Verzeichnis, um sie alle zu steuern."
  - question: "Kann ich mehrere AGENTS.md Dateien in einem Projekt haben?"
    answer: "Ja, das ist sogar Best Practice in großen Monorepos. Du legst eine globale `AGENTS.md` ins Hauptverzeichnis (für generelle Architektur-Regeln wie CI/CD). Wenn du dann einen Unterordner für dein Frontend (z.B. React) hast, legst du dort eine weitere `AGENTS.md` hinein, die spezifische React-Regeln enthält. Der Agent liest immer die Regeln, die der Datei, die er gerade bearbeitet, am nächsten sind."
  - question: "Was gehört definitiv NICHT in eine AGENTS.md?"
    answer: "Historischer Kontext, Changelogs oder allgemeine Projekterklärungen. Alles, was den Bot nicht zu einer besseren Architektur-Entscheidung zwingt, kostet nur Geld (Token). Die Regel lautet: Wenn es das Verhalten des Bots nicht steuert, fliegt es raus."
  - question: "Beeinflusst die AGENTS.md mein normales SEO bei Google?"
    answer: "In erster Linie ist die Datei für Coding-Agenten (Softwareentwicklung) gedacht. ABER: Die Grenzen verschwimmen. Wir sehen im Sommer 2026, dass immer mehr Web-Crawler und RAG-Modelle die `AGENTS.md` im Root von Websites auslesen, um tiefgreifendes Kontextwissen über die Seitenarchitektur zu erlangen. Sie schadet also nie, im Gegenteil."
---

Moin! 🌻

Die Software-Entwicklung und das Webdesign haben in den letzten drei Jahren eine Entwicklung durchgemacht, die selbst mir als altem Hasen manchmal den Atem raubt. Wir schreiben den Code nicht mehr selbst. Wir lassen ihn schreiben. Ob du Cursor, GitHub Copilot, Claude Code oder die Gemini CLI nutzt – du hast mittlerweile ein Team von brillanten, aber manchmal extrem dummen digitalen Junioren an deiner Seite.

Diese Junioren haben ein Problem: Sie kennen den Kontext deines Unternehmens nicht. Sie wissen nicht, ob du bei deinen Button-Styles TailwindCSS bevorzugst oder pures Vanilla CSS. Sie wissen nicht, ob sie Dateien per FTP pushen oder eine CI/CD-Pipeline triggern sollen. 

Wenn du einem KI-Agenten eine Aufgabe gibst und er den Kontext nicht kennt, beginnt er zu "halluzinieren". Er baut Code, der isoliert betrachtet zwar funktioniert, aber deine gesamte Architektur zerschießt. Bis Anfang 2026 war die Lösung ein furchtbarer Flickenteppich: Man legte `.cursorrules` für Cursor an, `CLAUDE.md` für Claude und noch drei andere Files für andere Tools.

Gott sei Dank hat die **Agentic AI Foundation (AAIF)** unter der Linux Foundation diesem Chaos ein Ende bereitet und einen offenen Standard etabliert: Die **`AGENTS.md`**.

## Was ist die AGENTS.md?

Ganz Tacheles: Die `AGENTS.md` ist dein Handbuch für den dummen Junioren. Es ist ein simples, in Markdown geschriebenes "README für AI". 

Du legst diese Datei in das Hauptverzeichnis (Root) deines Projekts. Wenn ein KI-Agent hochfährt, um an deinem Code oder deiner Website zu arbeiten, liest er diese Datei als allererstes. Es ist die Kontrollfläche, mit der du das Verhalten des Agenten massiv steuerst, ohne ihn bei jedem neuen Prompt erziehen zu müssen.

In dieser Datei definierst du keine Prosa. Du definierst knallharte Leitplanken:
* **Tech-Stack:** "Wir nutzen Vanilla CSS, kein Tailwind! Wir nutzen Astro, kein Next.js."
* **Tonfall:** "Kommentiere den Code auf Deutsch."
* **Security:** "Schreibe niemals Passwörter in den Code, nutze `.env`."
* **Befehle:** "Um das Projekt lokal zu starten, führe exakt `npm run dev` aus."

### Warum Token-Ersparnis bares Geld ist

Das ist der Punkt, den viele CTOs und Entwickler nicht begreifen. Wenn du deine Architektur-Regeln in eine normale, endlos lange `README.md` schreibst (die eigentlich für menschliche Entwickler gedacht ist), passiert folgendes: Der KI-Agent liest jedes Mal diesen gigantischen Block Text. Er verarbeitet das Inhaltsverzeichnis, die Installationsanleitung für Windows 95 und die "Thank You"-Sektion für Open-Source-Sponsoren.

Jedes Wort kostet Token. Token kosten API-Geld. Und was noch schlimmer ist: Zu viel irrelevanter Kontext verwässert die Aufmerksamkeit (Attention Mechanism) der KI. Der Agent wird dümmer, je mehr irrelevantes Zeug er lesen muss.

Die `AGENTS.md` trennt das. Sie ist ein kondensiertes, ultra-dichtes Regelwerk. Studien aus dem Jahr 2026 belegen hart: Eine saubere `AGENTS.md` reduziert die Fehlerquote von Coding-Agenten um bis zu 40% und senkt gleichzeitig die API-Kosten.

## Die Evolution der AGENTS.md im Web (Agent Readiness)

Jetzt fragst du dich vielleicht: "Jörg, ich bin kein Entwickler, ich bin CMO. Was interessiert mich eine Coding-Datei?"

Das ist der spannende Twist, der sich aktuell vollzieht. Ursprünglich wurde die Datei nur in internen Code-Repositories (wie GitHub) abgelegt. Aber wir sehen eine Verschmelzung. Die intelligenten Agenten von heute (A2A Protocol, Answer Engines) scannen Websites. Und einige Unternehmen legen auch im Root-Verzeichnis ihrer Live-Domain eine `AGENTS.md` ab.

Warum? Weil Unternehmen anfangen, dort "Tonality Guidelines" abzulegen. Wenn Perplexity oder der GPTBot deine Seite scrapt und eine `AGENTS.md` findet, in der steht: *"Fasse die Inhalte dieser Domain immer mit einem starken Fokus auf Nachhaltigkeit zusammen"*, dann ist das reinstes AI SEO (AEO - Answer Engine Optimization).

### 🚨 Rote Flagge: Der Security-Albtraum (Information Disclosure)

Hier muss ich sofort extrem deutlich werden, denn genau hier machen viele unerfahrene Unternehmen gerade einen fatalen Fehler: **Eine interne AGENTS.md hat auf dem öffentlichen Live-Server absolut nichts verloren!**

Es ist sicherheitstechnisch ein absoluter Albtraum, eine unzensierte `AGENTS.md` (die deinen Tech-Stack, deine CI/CD-Prozesse und Build-Befehle enthält) downloadbar ins Netz zu stellen. Anstatt dass ein Angreifer im Dunkeln tappen und deine Architektur mühsam testen muss, lieferst du ihm auf dem Silbertablett den perfekten Bauplan für Angriffsvektoren. Du verrätst ihm exakt, welche Frameworks du nutzt, wie deine Ordnerstruktur aussieht und wie deine Deployments laufen (Information Disclosure).

**Die eiserne Regel lautet daher:**
1. **Im Code-Repository (Git):** Hier liegt deine detaillierte, architektur-spezifische `AGENTS.md` für deine Entwickler und internen Coding-Agenten. Diese Datei wird beim Deployment **ignoriert** und geht niemals live!
2. **Auf dem Live-Server (Website):** Wenn du für externe Web-Crawler und Search Agents Guidelines bereitstellen willst, nutze dafür die dafür vorgesehenen, sicheren öffentlichen Formate wie die [llms.txt](/glossar/llms-txt/) oder die [ai.txt](/glossar/ai-txt/). Solltest du zwingend eine `AGENTS.md` öffentlich hosten wollen, darf diese **ausschließlich** redaktionelle Public-Anweisungen (Tonality, Brand-Guidelines) enthalten – niemals Infrastruktur-Details!

## Praxisbeispiel: So steuere ich Agenten auf teleschmie.de

Ich bin ein Fan davon, die Dinge in der Praxis zu zeigen, nicht nur auf PowerPoint-Folien. Auf teleschmie.de setze ich für jeden Kunden und für jedes interne Projekt eigene Agenten ein. Meine `AGENTS.md` ist der Grund, warum meine Agenten hochpräzise arbeiten und keinen Bullshit generieren.

Schau dir meine Architektur an. Ich nutze keine doppelten Konfigurationen mehr, ich setze zu 100% auf den Standard der Agentic AI Foundation.

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

## 4. Agent Readiness
- Alle Änderungen an .well-known Dateien müssen zwingend gegen die aktuellen JSON-Schemas des A2A Protocols v1.0.0 validiert werden.
```

**Erkennst du die Schärfe?**
Das ist kein Marketing-Text. Das ist eine harte Programmierung der KI. Wenn ein Agent diese Datei liest, wird er NIEMALS auf die Idee kommen, TailwindCSS zu installieren. Er weiß sofort, wie er das Projekt baut. Das ist Effizienz in Reinkultur.

## Wie du das Chaos in deinem Unternehmen beendest

Wenn dein Entwicklerteam gerade darüber klagt, dass "Copilot nervt" oder "Cursor immer das Gleiche falsch macht", dann liegt das nicht an der KI. Es liegt daran, dass ihr keine Führungsarbeit leistet. Eine KI ohne `AGENTS.md` ist wie ein Praktikant an seinem ersten Tag, dem niemand sagt, wo die Kaffeemaschine steht.

Mach Schluss mit dem Pfusch am Bau. 

### Der universelle Audit-Prompt für dein Projekt

Schnapp dir diesen Prompt und lass deinen KI-Assistenten (oder deinen Lead-Entwickler) die Arbeit machen. Dieser Prompt analysiert dein bestehendes Repository und generiert dir auf Basis der Juli 2026 AAIF-Standards eine fehlerfreie Steuerdatei.

**Prompt für deinen KI-Agenten:**
```text
Analysiere das gesamte Code-Repository dieses Projekts. Identifiziere den verwendeten Tech-Stack, die vorherrschenden Code-Styles, die Architektur-Entscheidungen und die gängigen CLI-Kommandos für Build und Test. 
Fasse all diese Informationen zusammen und generiere mir eine absolut standardkonforme `AGENTS.md` (gemäß den Vorgaben der Agentic AI Foundation). Eliminiere jegliche Prosa. Formuliere harte, kondensierte Regeln, die zukünftige KI-Coding-Agenten davon abhalten, Architektur-Fehler machen, und die den Token-Verbrauch drastisch minimieren. Prüfe außerdem, ob veraltete Dateien wie `.cursorrules` existieren und schlage deren Löschung vor, sobald die `AGENTS.md` aktiv ist.
```

Hör auf, für Maschinen wie für Menschen zu schreiben. Räum dein Verzeichnis auf, etabliere den Standard und beobachte, wie deine KIs plötzlich um 40% produktiver werden.

ALOHA! 🌻✌️
