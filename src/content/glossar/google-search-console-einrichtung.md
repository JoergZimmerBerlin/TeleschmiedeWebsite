---
category: 'Technisches SEO & UX'
title: "Google Search Console: Schnelle Einrichtung (2026)"
description: "Die Google Search Console ist Pflicht. Richte deine Domain-Property via DNS ein und hol dir die volle Kontrolle über deine Sichtbarkeit. (2026)"
date: "2026-07-18"
author: "Jörg Zimmer"
image: "../../assets/images/glossar/3d-light/glossar-google-search-console-3d.webp"
tags: ["SEO", "Google Search Console", "Tracking", "Analytics", "Technisches SEO"]
faqs:
  - question: 'Was ist der Unterschied zwischen Domain-Property und URL-Präfix?'
    answer: 'Die Domain-Property misst den gesamten Traffic deiner Domain (inklusive `www`, ohne `www`, `http`, `https` und allen Subdomains). Beim URL-Präfix musst du jede Version (z.B. `https://www.teleschmie.de/`) einzeln anlegen und verifizieren. Die Domain-Property ist immer die sauberere, professionellere Lösung.'
  - question: 'Mein Hoster sagt, der TXT-Eintrag sei ungültig – was nun?'
    answer: 'Manche Hoster erwarten, dass du den `google-site-verification`-Code in Anführungszeichen setzt (z.B. `"google-site-verification=XYZ123"`). Probier das aus, meistens löst das den Fehler direkt.'
  - question: 'Muss ich den TXT-Eintrag nach der Verifizierung wieder löschen?'
    answer: 'Nein! Um Himmels willen, lass den DNS-Eintrag unangetastet. Wenn du ihn löschst, merkt Google das irgendwann bei einer Routineprüfung und entzieht dir sofort wieder den Zugriff auf deine GSC-Daten.'
  - question: 'Kostet die Google Search Console wirklich gar nichts?'
    answer: 'Ja, 100% kostenlos. Im Gegensatz zu teuren Keyword-Tools bekommst du hier die verifizierten Klick-Daten direkt von der Quelle, ohne auch nur einen Cent zu bezahlen.'
  - question: 'Warum sehe ich nach der Einrichtung noch keine Daten?'
    answer: 'Google sammelt die Daten nicht rückwirkend in voller Tiefe für nicht-verifizierte Konten. Sobald du das Tool einrichtest, füllt sich das Dashboard in der Regel nach 24 bis 48 Stunden mit den ersten Metriken. Geduld ist hier eine Tugend.'
---

# Google Search Console einrichten: Der Tacheles-Guide zur Domain-Property

ALOHA! 🌻 Wenn du im SEO-Bereich auch nur einen Blumentopf gewinnen willst, brauchst du die **Google Search Console (GSC)**. Lass uns gar nicht lange drumherum reden: Das Ding ist dein direkter Draht zu Google. Hier erfährst du, ob deine Seite indexiert wird, welche Fehler Google beim Crawlen findet, wie deine Core Web Vitals (CWV) aussehen und – ganz wichtig – für welche Suchbegriffe (Keywords) du tatsächlich gefunden wirst. 

Das Beste daran? **Es ist zu 100% kostenlos.**

Du brauchst dafür kein teures Agentur-Abo, sondern einfach nur ein ganz normales Google-Konto. Wenn du sowieso schon Gmail, YouTube oder Google Drive nutzt, hast du bereits eins. Logg dich einfach ein, und ab geht die Post.

Warum schreibe ich diesen Guide? Weil ich von meinen Kunden *immer* als Erstes Zugriff auf diese Daten brauche. Ohne die GSC fliegen wir im Blindflug. Wenn wir zusammenarbeiten wollen, richte das bitte vorher ein und gib mir Zugriff. Wie das geht, erkläre ich dir jetzt Schritt für Schritt – und zwar so, dass es auch ohne Informatik-Studium klappt.

## Warum die GSC für jede Marketing-Abteilung Gold wert ist

Bevor wir in die Technik springen (keine Sorge, das tut nicht weh), lass uns kurz klären, *warum* du das hier überhaupt machst:

- **Sitemap-Einreichung:** Du sagst Google proaktiv: „Hier, das ist meine Struktur, friss sie!“
- **Indexierungs-Status:** Wird deine neue Landingpage überhaupt von Google gesehen? Hier siehst du es schwarz auf weiß.
- **Website-Gesundheit & Core Web Vitals:** Ist deine Seite zu lahm? Gibt es Layout-Shifts? Die GSC schlägt Alarm, bevor deine Rankings abstürzen.
- **Keyword-Daten aus erster Hand:** Vergiss grobe Schätzungen von Drittanbietern. Hier siehst du die echten Suchbegriffe, Klicks und Impressionen, die deine Nutzer in den Google-Schlitz eingeben. 

Damit ist die GSC nicht nur für SEOs wichtig, sondern für Content-Marketer, UX-Designer und Entwickler gleichermaßen.

---

## Schritt-für-Schritt Anleitung: Einrichtung via Domain-Property (DNS)

Es gibt zwei Wege, die GSC einzurichten: *URL-Präfix* und *Domain-Property*. Wir machen hier keine halben Sachen, deshalb zeige ich dir die **Domain-Property**. Warum? Weil sie *alle* Subdomains (wie `www.`, `blog.`), HTTP und HTTPS direkt in einem Rutsch abdeckt. Kein nerviges Anlegen von 4 verschiedenen Properties mehr.

### Schritt 1: Bei Google Search Console anmelden
1. Gehe auf die offizielle Seite: `search.google.com/search-console/about`.
2. Klicke auf „Jetzt starten“ und logge dich mit deinem Google-Konto ein.

### Schritt 2: Die Domain-Property hinzufügen
1. Im Dropdown-Menü (oben links) klickst du auf **Property hinzufügen**.
2. Wähle im Pop-up-Fenster auf der linken Seite die Option **Domain** (nicht URL-Präfix).
3. Gib deine nackte Domain ein (z.B. `teleschmie.de` oder `deine-domain.com` – ohne `https://` oder `www.`).
4. Klicke auf **Weiter**.

### Schritt 3: Den TXT-Eintrag für den DNS-Server kopieren
Jetzt wird es kurz technisch, aber bleib bei mir: Google generiert dir nun einen kryptischen Text-Code (einen sogenannten TXT-Eintrag). Der sieht ungefähr so aus:
`google-site-verification=XYZ123...`

Klicke daneben auf den Button **Kopieren**.

### Schritt 4: Den DNS-Eintrag bei deinem Hoster hinterlegen
Jetzt musst du dich bei dem Anbieter einloggen, wo deine Domain liegt (z.B. IONOS, Strato, All-Inkl, netcup).
1. Suche in deinem Kunden-Dashboard nach **DNS-Einstellungen** oder **Domain-Verwaltung**.
2. Klicke auf **Neuen DNS-Eintrag hinzufügen** (oder ähnlich).
3. Wähle als Typ: **TXT**.
4. Bei Name/Host lässt du das Feld entweder leer oder trägst ein `@` ein (je nach Anbieter).
5. Bei Wert/Ziel fügst du den kopierten Code (`google-site-verification=...`) aus Schritt 3 ein.
6. Speichern.

### Schritt 5: Verifizierung abschließen
Gehe zurück in den Tab mit der Google Search Console und klicke unten rechts auf **Bestätigen**.
*Tipp aus der Praxis:* Manchmal dauert es ein paar Minuten (selten bis zu 24 Stunden), bis das DNS-Update weltweit registriert ist. Wenn es direkt beim ersten Mal rot aufleuchtet und fehlschlägt – atme durch, trink einen Kaffee und klicke in 10 Minuten nochmal auf „Bestätigen“.

---

## WICHTIG: Mich als Nutzer hinzufügen

Sobald die Konfetti-Animation kam und du drin bist, brauche ich Zugriff auf die Daten, um dir bei deinem SEO-Setup den Hintern zu retten. So fügst du mich (oder dein Marketing-Team) hinzu:

1. Klicke in der GSC unten links auf **Einstellungen** (das kleine Zahnrad).
2. Gehe auf **Nutzer und Berechtigungen**.
3. Klicke oben rechts auf den blauen Button **Nutzer hinzufügen**.
4. Trage meine E-Mail-Adresse info@teleschmie.de ein.
5. Setze die Berechtigung auf **Eingeschränkt** oder **Voll** (je nachdem, ob ich auch Einstellungen ändern soll).
6. Klicke auf **Hinzufügen**. 

Boom! Das war’s. Du hast deine Hausaufgaben gemacht.
