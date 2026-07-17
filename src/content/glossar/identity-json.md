---
title: "identity.json – Das digitale Profil von KI-Agenten"
description: "Was ist eine identity.json? Erfahre alles über das maschinenlesbare Agenten Profil, den Aufbau von Vertrauen im Agentic Web und die enorme Bedeutung für AI SEO. Von Jörg Zimmer."
date: "2026-07-17"
category: "AI SEO"
image: "../../assets/images/glossar/3d-light/glossar-identity-json-3d.webp"
---

# identity.json – Die Visitenkarte der Agenten im KI-Zeitalter

Moin zusammen! Jörg Zimmer ist wieder am Start. 25 Jahre im SEO-Sumpf, unzählige Core-Updates überlebt, und ich kann euch sagen: Das Web erfindet sich gerade mal wieder komplett neu. Wir reden heute über etwas, das so unscheinbar klingt wie eine Textdatei aus den seligen 90er Jahren, aber die absolute Grundlage für das kommende Agentic Web bildet: Die **identity.json**. Wenn du als Webmaster, Entwickler oder Marketer verstehen willst, wie KI-Agenten Identität und Vertrauen im Netz etablieren und warum das für dein AI SEO überlebenswichtig ist, dann spitz jetzt die Ohren. Hier wird Tacheles geredet, ohne PR-Blabla.

## Was ist eigentlich eine identity.json und wozu der Hype?

Stell dir vor, du gehst auf eine große, elitäre Netzwerkveranstaltung. Was machst du als Erstes, wenn du einen potenziellen Geschäftspartner triffst? Richtig, du schüttelst die Hand und gibst ihm deine Visitenkarte. Darauf steht dein Name, deine Firma, wie man dich erreicht, dein Titel und vielleicht noch dein Fachgebiet. Ohne diese Karte bist du ein Niemand, ein unbeschriebenes Blatt, dem man erst einmal mit Skepsis begegnet.

Für einen KI-Agenten ist die `identity.json` exakt diese Visitenkarte, nur eben in einem strikt maschinenlesbaren, komprimierten JSON-Format. Es ist das standardisierte **Agenten Profil**. Wenn ein Agent das Web durchstreift und mit Servern, APIs oder anderen Agenten interagiert, muss er transparent und absolut eindeutig machen, wer er ist, wem er gehört und was er eigentlich vorhat. Eine vollkommen anonyme HTTP-Anfrage ist in der modernen Welt der autonomen Systeme heutzutage höchst verdächtig und wird in den meisten Fällen von Firewalls direkt blockiert.

Die `identity.json` wird üblicherweise unter einer festen, kryptografisch vertrauenswürdigen URL gehostet (meistens auf der offiziellen Domain des Unternehmens, das den Agenten betreibt) und liefert alle wesentlichen Metadaten, die ein anderer Server zwingend braucht, um zu entscheiden: "Lass ich diesen Burschen in mein Netzwerk rein, oder blockiere ich ihn direkt an der Firewall und schmeiße den Schlüssel weg?"

## Der anatomische Aufbau eines perfekten Agenten Profils

Was steht nun in so einem Ding konkret drin? Das ist absolut kein Freestyle-Wettbewerb. Es gibt klare Konventionen und Schemata, wie so ein Profil strukturiert sein muss, damit es von jedem System der Welt – egal ob in Tokio, New York oder Castrop-Rauxel – in Millisekunden geparst und fehlerfrei verstanden werden kann. Ein gutes, solides Agenten Profil umfasst in der Regel folgende essenzielle Bestandteile:

### 1. Stammdaten und Herkunft (Die Basics)
- **Name des Agenten**: Wie heißt das System offiziell? (z.B. "Shopify_Inventory_Sync_Bot_v2").
- **Eigentümer (Owner)**: Welches Unternehmen, welche Organisation oder natürliche Person betreibt diesen Agenten? Hier wird die kritische Brücke von der digitalen Logik in die rechtliche, reale Welt geschlagen.
- **Kontaktinformationen**: Eine Notfall-E-Mail-Adresse, ein spezieller Abuse-Kontakt oder ein Kontaktformular, falls der Agent durchdreht, Amok läuft, in einer Endlosschleife feststeckt und ein System-Admin manuell eingreifen muss.

### 2. Kryptografische Schlüssel (Der absolute Vertrauens-Anker)
Das ist der mit Abstand kritischste Teil des gesamten Dokuments. Wie in unserem anderen Artikel über HTTP Message Signatures (RFC 9421) ausführlich besprochen, nutzt der Agent asymmetrische Kryptographie, um seine ausgehenden Anfragen fälschungssicher zu signieren. In der `identity.json` veröffentlicht der Agent seine **öffentlichen Schlüssel (Public Keys)**. 
Wenn dein Webserver eine signierte Anfrage von "Agent X" erhält, verlässt er sich nicht blind darauf. Er lädt die `identity.json` von der offiziellen Domain des Agenten herunter, holt sich den dokumentierten Public Key und verifiziert die Signatur der Anfrage mathematisch. Stimmen Signatur und Schlüssel überein, ist das der ultimative Beweis für die Authentizität. Eine Fälschung ist faktisch ausgeschlossen.

### 3. Intentionen und Berechtigungen (Was will der hier?)
Ein extrem spannender und oft unterschätzter Aspekt ist die Deklaration von Intentionen (Intents). Der Agent kann in seiner `identity.json` glasklar festhalten, wofür er überhaupt gebaut wurde und welche Aufgaben er im Netz verfolgt. Ist er ein reiner Lese-Crawler für Suchmaschinen-Indizes? Ist er ein Einkaufs-Agent mit Befugnis, Transaktionen durchzuführen und Budgets auszugeben? Diese proaktive Transparenz schafft massives **Vertrauen** beim Empfänger. 

### 4. Limits und Rate-Regeln (Gutes Benehmen)
Manchmal geben gut programmierte Agenten hier auch direkt an, wie sie konfiguriert sind, um fremde Server nicht in die Knie zu zwingen. Frei nach dem Motto: "Keine Panik, Freunde, ich bin so eingestellt, dass ich maximal 5 Anfragen pro Sekunde sende und eure API nicht kille." Solche Rücksichtnahme wird in der Agenten-Ökonomie extrem belohnt.

## Vertrauen (Trust) – Die unangefochtene neue Währung im Web

Lass uns über das allerwichtigste Wort im zukünftigen Internet sprechen: **Vertrauen**. Das Web wird in naher Zukunft mehrheitlich von autonomen Maschinen bevölkert. Du kannst nicht mehr jeden eingehenden Request manuell prüfen. Kein Sysadmin der Welt hat dafür die Zeit. Du musst als Unternehmen Systeme bauen, die vollautomatisiert Vertrauen bewerten und entsprechende Zugangsentscheidungen fällen.

Die `identity.json` ist das absolute Fundament dieser automatisierten Vertrauensbewertung. Wenn ein Agent eine komplett ausgefüllte, kryptografisch saubere Identitätsdatei auf einer hochgradig vertrauenswürdigen, langjährigen Domain (sagen wir mal `apple.com`, `microsoft.com` oder `openai.com`) hostet, dann hat dieser Agent von Haus aus einen enorm hohen Trust-Score. Dein Webserver wird ihn mit offenen Armen empfangen, ihm die besten, teuersten Daten liefern und garantiert keine nervigen Latenz-Bremsen einbauen.

Hat der Agent hingegen überhaupt keine Identitätsdatei, oder hostet er sie auf irgendeiner dubiosen, frisch registrierten `.xyz`-Domain in einem Off-Shore-Datencenter, sinkt sein Trust-Score in den absoluten Keller. Dein System wird ihn gnadenlos in eine Sandbox sperren, ihm nur völlig veraltete Cache-Daten geben, ihm endlose Rate-Limits aufdrücken oder ihn direkt auf Netzwerkevl mit einem 403 Forbidden oder 429 Too Many Requests in den virtuellen Orkus schicken.

### Dezentrale Identität vs. Zentrale Identität
Hier wird die Diskussion oft philosophisch. Werden Agenten in Zukunft von großen Monopolisten wie OpenAI zertifiziert (zentrale Identität), oder nutzen wir dezentrale Standards wie DIDs (Decentralized Identifiers), die über Blockchains oder andere verteilte Ledger gesichert sind? Meiner Erfahrung nach wird die `identity.json` vorerst der pragmatische Industriestandard bleiben. Er ist domänen-basiert, extrem schnell zu parsen und passt perfekt in die bestehende DNS- und HTTPS-Infrastruktur. Keine Krypto-Token, keine Gas-Fees, nur solides, altbewährtes Web-Engineering. Das ist es, was sich in der Praxis durchsetzt. Wir brauchen Pragmatismus, keine Whitepaper.

## Was bedeutet das für AI SEO und digitales Marketing?

Jetzt kommt der Knackpunkt, warum wir SEO-Leute und Online-Marketer uns zwingend mit diesem technischen Kram beschäftigen müssen. AI SEO dreht sich nicht mehr um Keyword-Dichte. Es dreht sich darum, von den großen KI-Modellen und deren riesigen Schwärmen von autonomen Agenten optimal gefunden, verarbeitet und vertraut zu werden. 

### Wenn du einen eigenen Agenten betreibst (Outbound)
Wenn dein eigenes Unternehmen Agenten aussendet (z.B. um komplexe Marktdaten bei Konkurrenten zu aggregieren, Preise zu vergleichen oder automatisierte B2B-Bestellungen bei hunderten Lieferanten auszuführen), **musst** du eine blitzsaubere `identity.json` bereitstellen. Punkt. Tust du das nicht, werden deine Agenten massenhaft von den Firewalls und WAFs der Partner-Websites geblockt. Deine Crawler laufen ins Leere, deine Automatisierung scheitert, du bist geschäftsunfähig. Eine sorgfältig gepflegte, verifizierte Identität sorgt für eine enorm hohe Akzeptanzrate (Delivery Rate) deiner automatisierten Prozesse. Dein Code wird durchgewinkt.

### Wenn du willst, dass Agenten zu dir kommen (Inbound)
Wenn du hochwertige Inhalte oder lukrative Produkte anbietest und willst, dass KI-Agenten diese finden und ihren menschlichen Nutzern (den Endkunden) empfehlen, musst du im Backend eine Infrastruktur aufbauen, die `identity.json` Dateien liest, auswertet und bewertet. Du musst zwingend die guten Agenten (die echten Traffic, Sales oder Reputation bringen) von den schlechten (die nur blind scrapen, deinen Content klauen oder Serverkapazität fressen) unterscheiden können. 

Stell dir vor, der offizielle, verifizierte Einkaufs-Agent eines riesigen Konzerns oder der Empfehlungs-Agent von Perplexity kommt auf deine Seite. Du willst hundertprozentig sicher sein, dass es wirklich dieser Agent ist, bevor du ihm deine wertvollsten, teuer aufbereiteten und vielleicht sogar personalisierten Daten auslieferst. Du checkst automatisiert seine `identity.json`, verifizierst die kryptografische Signatur in Millisekunden, und bäm – du weißt: Du hast extrem hochkarätigen VIP-Besuch. 

Diesem VIP lieferst du deine Inhalte extrem schnell, hochgradig strukturiert und völlig ohne künstliche Latenzen aus. Das ist das wahre AI SEO der Zukunft! Du optimierst nicht mehr nur den textlichen Content auf der Oberfläche, du optimierst die fundamentalen **Maschinen-Beziehungen** im Hintergrund.

## Ein Blick in die Zukunft: Das Web of Trust für Agenten

Wir stehen hier wirklich erst ganz am Anfang. Was wir in den nächsten Jahren sehen werden, ist die Entstehung eines gigantischen "Web of Trust" für Agenten. Agenten werden sich gegenseitig bewerten. Eine `identity.json` könnte in Zukunft nicht nur Eigenaussagen enthalten, sondern auch Zertifikate und Endorsements (Empfehlungen) von anderen, bereits etablierten Agenten. 

"Dieser Agent hat in den letzten 12 Monaten fehlerfrei und ohne Betrugsversuche 50.000 Transaktionen in unserem Netzwerk durchgeführt." Solche verifizierbaren Claims werden Teil der Identität werden. Wer eine schwache oder suspekte Identität hat, wird von diesem gigantischen Marktplatz der Maschinen komplett ausgeschlossen. Wer sich frühzeitig um diese Infrastruktur kümmert, sichert sich den Zugang zum wichtigsten Vertriebskanal des nächsten Jahrzehnts.

## Die praktische Implementierung: So wird's auf Servern gemacht

Wie kriegt man das nun in der Praxis hin? Eigentlich ist es konzeptionell simpel, erfordert in der Umsetzung aber absolute Konsequenz.

1. **JSON nach Standard erstellen**: Du baust ein valides, sauber formatiertes JSON-Dokument. Es gibt etablierte Community-Standards und Schemata für die `identity.json`, an die du dich strikt halten solltest. Nutze keine exotischen, selbst erfundenen Felder, bleib konsequent beim Standard, damit die Parser der anderen nicht über deinen Code stolpern.
2. **Robustes Hosting**: Du packst die Datei auf deinen produktiven Webserver. Ein extrem guter, standardisierter Ort ist oft das Root-Verzeichnis oder, noch besser, das `.well-known/` Verzeichnis. Die URL muss über Jahre hinweg stabil bleiben. `https://deine-domain.de/identity.json` oder `https://deine-domain.de/.well-known/identity.json`.
3. **CORS Headers setzen (Vergiss das nicht!)**: Das ist ein absoluter Anfängerfehler, den ich in der Teleschmiede bei unseren Audits ständig sehe. Da hosten Unternehmen die Datei wunderschön, mit viel Aufwand generiert, aber setzen verdammte Axt keine Cross-Origin Resource Sharing (CORS) Header im Webserver! Wenn ein fremder Server oder ein Skript die Datei laden will, wird das vom Browser oder der Engine knallhart blockiert. Setze `Access-Control-Allow-Origin: *` exklusiv für diese spezifische Datei – sie ist ja schließlich dazu da, von der ganzen Welt öffentlich gelesen zu werden!
4. **Schlüssel-Rotation**: Private Keys können kompromittiert werden, Server gehackt werden. Du musst feste, automatisierte Prozesse in der Pipeline haben, um die Public Keys in der `identity.json` regelmäßig zu rotieren, ohne dass laufende Sessions und Verbindungen sofort gnadenlos abbrechen. Das erfordert ein verdammt gutes Versionsmanagement innerhalb der JSON-Datei.

## Fallstricke und das nervige Bullshit-Bingo

Lass dir auf Konferenzen von teuren Software-Verkäufern keinen Bären aufbinden. Du brauchst für eine solide, funktionierende `identity.json` keine Blockchain, kein Web3-Gedöns und keine "Decentralized Autonomous Orbits"-Magie aus dem Kaugummiautomaten. Es ist im Kern eine verdammt einfache, maschinenlesbare Textdatei, die clever via HTTPS und klassischer Kryptographie genutzt wird. Keep it simple, stupid! Bau erstmal die Basics, bevor du Luftschlösser programmierst.

Der größte Fehler, den Unternehmen in der Praxis machen, ist Inkonsistenz. Da wird für viel Geld ein Agent programmiert, der beim Server-Handshake sagt "Ich bin Agent A", aber seine im Netz liegende `identity.json` ist völlig veraltet, wird nicht gepflegt und referenziert noch "Agent B" aus einem Testlauf von vor drei Monaten, der von einem Praktikanten aufgesetzt wurde. 

Maschinen hassen Inkonsistenz. Sie kennen keine Kulanz. Wenn die kryptografischen Daten nicht matchen, wenn die Signatur nicht zum Schlüssel im Profil passt, fliegt der Request ohne Vorwarnung in den digitalen Mülleimer und die IP wird gebannt. 

## Teleschmiede Fazit: Deine unumstößliche digitale Ausweispflicht

Freunde, wir stehen wirklich am absoluten Anfang einer gewaltigen, irreversiblen Entwicklung. Die Zeit der komplett anonymen Bots, die fröhlich und ohne jegliche Konsequenzen das Web leer saugen, Bandbreite klauen und Content kopieren, geht definitiv zu Ende. Das kommende Agentic Web fordert gnadenlose Verantwortlichkeit von allen Teilnehmern. 

Die `identity.json` ist das entscheidende, technische Instrument, um diese Verantwortlichkeit technisch zu erzwingen und zu überprüfen. Sie etabliert das Agenten Profil und ist die unabdingbare Basis für jegliches **Vertrauen** zwischen autonomen Systemen, die in Lichtgeschwindigkeit miteinander verhandeln. 

Für uns als Pioniere im Bereich AI SEO bedeutet das ganz konkret: Wir müssen diese Mechanismen verstehen, wir müssen sie aktiv unterstützen und wir müssen sie proaktiv in unsere eigenen Server-Architekturen einbauen. Wer kryptografisch sauber authentifiziert ist, wird bevorzugt behandelt und bekommt die besten Plätze an der Sonne. Wer anonym bleibt oder technisch unsauber arbeitet, wird von den Maschinen-Netzwerken aussortiert und verschwindet in der Bedeutungslosigkeit.

Das ist harte Arbeit, das ist tiefes, kompromissloses technisches SEO auf Enterprise-Level, aber genau das trennt in Zukunft die absolute Spreu vom Weizen. Verlinkt eure internen Dokumentationen sauber miteinander (achtet verdammt nochmal auf die [Trailing Slashes](/)), haltet eure JSON-Dateien valide, setzt eure CORS-Header richtig und baut euch ein massives Vertrauens-Fundament auf. Das ist der einzige nachhaltige Weg, um im Web der Zukunft zu dominieren. Macht es gut und bleibt technisch sauber!

---
```markdown
A professional, high-end isometric 3D infographic for identity.json. Background is pure white (#FFFFFF). Features sleek 3D elements with vibrant lime green (#D9FF00) accents. Typography is modern, clean dark grey. All text in GERMAN: identity.json, Agenten Profil, Vertrauen. Small subtle watermark 'Jörg Zimmer' in bottom right corner.
```
