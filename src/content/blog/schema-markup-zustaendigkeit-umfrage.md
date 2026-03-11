---
title: "Wer ist für die Einrichtung der Google Search Console zuständig? 🛠️"
description: "Die große Streitfrage: Muss der Webdesigner die Search Console einrichten oder ist das reine SEO-Sache? Die ehrlichen Antworten aus über 70 Kommentaren."
date: "2026-03-11"
image: "../../assets/images/blog/seo-responsibility-chain.webp"
image_alt: "Illustrative Darstellung der Verknüpfung von Design und SEO"
key_takeaways:
  - "Die Google Search Console (GSC) ist keine optionale Spielerei, sondern das absolute Pflicht-Werkzeug jedes Web-Projekts vom ersten Tag an."
  - "Die Verantwortung fürs initiale Setup liegt fast immer beim Designer oder Entwickler – wer baut, prüft auch, ob das Fundament trägt."
  - "Egal wer einrichtet: Die Admin-Hoheit muss immer beim Kunden selbst liegen, niemals bei der Agentur."
faqs:
  - question: "Warum ist die GSC so essenziell für jedes Webprojekt?"
    answer: "Die Google Search Console ist die absolute Gesundheits-App deiner Website – und das völlig kostenlos. Hier siehst du, welche Seiten Google crawlt, welche Seiten indexiert werden (und welche nicht!), welche Keywords dir Traffic bringen und wo technische Fehler lauern. Ohne GSC fliegst du nach einem Relaunch im totalen Blindflug. Du weißt nicht, ob Google die neue Sitemap kennt, ob Seiten versehentlich auf 'noindex' stehen oder ob ein Crawl-Fehler deinen gesamten Shop unsichtbar macht."
  - question: "Muss ein Webdesigner also tiefes SEO-Wissen haben?"
    answer: "Nein, er muss kein SEO-Strategie-Guru sein. Aber die technischen Launches-Basics müssen absolut sitzen: Die Domain in der GSC verifizieren, die Sitemap einreichen und prüfen, ob die Seite nicht versehentlich mit 'noindex'-Tags gesperrt ist. Das ist wie ein Elektriker, der nach der Installation prüft, ob der Strom fließt. Es gehört zum Handwerk, nicht zur Erweiterungsleistung."
  - question: "Was ist mit dem Datenschutz beim GSC-Tracking?"
    answer: "Es gibt eine verbreitete Fehlannahme: Die Google Search Console ist kein Tracking-Tool im DSGVO-Sinne wie Google Analytics 4. Sie gibt keine individuellen Nutzerprofile aus und greift keine Cookie-basierten User-Daten ab. Sie analysiert aggregierte Server-Daten aus Googles eigenem Index. Es gibt also keine rechtliche Ausrede, sie nicht einzurichten. Wer das zuständige Team mit DSGVO-Argumenten hinhalten will, schiebt nur Verantwortung weg."
---

Moin! 🌻

Hier kommt eines der Themen, bei dem in Projektmeetings regelmäßig die Fetzen fliegen – und ich das eigentlich seit Jahren nicht mehr ertrage: **Wer ist verdammt nochmal für die Einrichtung der Google Search Console (GSC) zuständig?** 🛠️

Das klingt nach einer banalen Frage. Ist es nicht.

Stell dir vor: Du baust ein teures Haus. Nach dem Einzug stellst du fest, dass der Wasseranschluss nie final angemeldet wurde. Wer trägt die Verantwortung? Der Architekt, der das Dach geplant hat? Die Sanitärfirma? Oder du als Hausherr, der unter der trockenen Dusche steht?

## Warum das jeden betrifft

Die Google Search Console ist die Gesundheits-App jeder Website. Hier sehen wir:
- Welche Seiten Google crawlt – und welche er ignoriert
- Technische Fehler, die das Ranking blockieren
- Core Web Vitals in Echtzeit
- Welche Keywords wirklich Traffic bringen
- Ob der Relaunch sauber indiziert wurde

Und trotzdem wird das GSC-Setup bei Webprojekten oft behandelt wie eine heiße Kartoffel: Jeder schiebt sie weiter, keiner fängt sie auf.

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <p class="font-bold text-lime-600 mb-2">💬 Jörgs SEO-Klartext (LinkedIn Insights)</p>
  <p class="italic text-dark mb-0">"Wer eine neue Website live schaltet ohne die GSC einzurichten und die Sitemap einzureichen, liefert ein unfertiges Produkt ab. Punkt. Das ist wie ein Auto ohne Tacho zu verkaufen und zu sagen: 'Die Geschwindigkeit müssen Sie selbst schätzen.'"</p>
</div>

## Was 71 Experten auf LinkedIn sagen

Ich habe diese Zuständigkeitsfrage öffentlich gepostet. 71 Kommentare später war das Bild glasklar.

| Zuständigkeit | Argument | Häufigkeit in Diskussion |
|---|---|---|
| **Webentwickler / Agentur** | Ist der erste tech. Kontaktpunkt beim Launch | Sehr häufig |
| **SEO-Spezialist** | Hat das Fachwissen für korrekte Konfiguration | Häufig |
| **Auftraggeber selbst** | Sollte ohnehin immer Admin sein | Mittel |
| **Keiner zuständig ("nicht mein Job")** | Klassischer Pfusch am Bau | Leider auch häufig |

Der Konsens war eindeutig: **Der Webentwickler oder die Agentur, die das Projekt live schaltet, ist beim Launch in der Pflicht.** Sie haben den technischen Zugriff, sie kennen die Hosting-Konfiguration, sie sind der erste Ansprechpartner.

Das heißt nicht, dass der SEO keine Rolle spielt. Der SEO kommt danach und analysiert die eingehenden Daten strategisch. Aber er kann erst anfangen zu arbeiten, wenn das Basis-Setup steht.

## Der Punkt, bei dem ich wirklich rasend werde

Es gibt eine noch schlimmere Variante des Problems, die ich in meinen [SEO-Sprechstunden](/seo-sprechstunde/) regelmäßig sehe: Die alte Agentur hat die Google Search Console **unter ihrer eigenen E-Mail-Adresse** eingerichtet.

Das bedeutet: Wenn der Kunde die Agentur wechselt, verliert er den Zugang zu seiner eigenen Website-Datenhistorie. Jahre von Daten sind weg. Manchmal sogar die Domainverifizierung.

**Das ist kein Versehen. Das ist Machtmissbrauch durch Datenfesthaltung.** 🦖

Die klare Regel lautet:

1. **Admin-Recht = Auftraggeber.** Der Domain-Eigentümer ist immer der primäre Eigentümer der GSC-Property.
2. **Agentur hat delegierten Zugang.** Sie kann vollständige Zugriffsrechte haben – aber nie die Eigentümerrolle.
3. **Beim Projektabschluss:** Agentur wird entfernt, Eigentümer behält alle Daten.

## Rollenverteilung beim Launch: Wer macht was?

Ein sauberer Website-Launch braucht klare Verantwortlichkeiten:

**Der Webentwickler:**
- Domain in der GSC verifizieren
- `sitemap.xml` einreichen
- Prüfen, ob keine `noindex`-Tags aktiv sind
- Core Web Vitals prüfen

**Der Auftraggeber:**
- Primärer Account-Eigentümer sein
- Zugänge dokumentieren
- Der Agentur delegierten Zugang geben (nicht umgekehrt!)

**Der SEO-Experte:**
- Holt sich delegierten Zugang
- Beginnt Baseline-Daten zu analysieren
- Entwickelt die langfristige [Keyword-Strategie](/glossar/keywordrecherche/)
- Prüft [technische SEO](/glossar/technisches-seo/)-Probleme

Wenn alle Parteien nach diesem Schema arbeiten, klappt es auch mit einem sauberen Ranking-Start. Wenn jeder sagt "Das stand nicht in meinem Pflichtenheft" – herzlich willkommen in der **Tracking-Hölle.**

Wie seht ihr das in euren Projekten? Wer zieht bei euch die GSC-Strippen am Launch-Tag?

ALOHA! 🌻✌️
