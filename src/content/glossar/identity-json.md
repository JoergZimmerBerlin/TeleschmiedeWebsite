---
title: "identity.json & Open Agent Identity: Das Gesicht deines AI Agents"
description: "Wie /.well-known/agent-identity.json funktioniert und warum Open Agent Identity 2026 der Standard ist."
category: "AI SEO"
date: "2026-07-17"
image: "../../assets/images/glossar/3d-light/glossar-identity-json-3d.webp"
---

# identity.json & Open Agent Identity: Das Gesicht deines AI Agents

Moin Leute, hier ist euer Jörg Zimmer. Wenn ich an meine 25 Jahre in der Berliner SEO-Szene zurückdenke, muss ich oft schmunzeln. Früher haben wir uns Nächte um die Ohren geschlagen, um Googlebot durch geschicktes Crawl-Budget-Management auf die richtigen Seiten zu lotsen. Wir haben in den Server-Logs nach obskuren User-Agents gesucht, um herauszufinden, ob da nun der Bing-Bot, der Baidu-Spider oder einfach nur ein schlecht geschriebenes Python-Skript von irgendeinem Studenten auf unseren Servern herumgeistert. Das war alles ein großes Ratespiel.

Spulen wir vor ins Jahr 2026. Der User-Agent Header im HTTP-Request ist endgültig tot. Niemand, der im Agentic Web noch ganz bei Trost ist, verlässt sich auf einen Text-String, den jeder Zwölfjährige in Postman fälschen kann. Heute haben wir es mit autonomen AI Agents zu tun, die reale ökonomische Werte verschieben. Sie buchen Flüge, verhandeln Preise, platzieren Großhandelsbestellungen und unterzeichnen B2B-Verträge. Da kannst du dich nicht auf einen geparsten String verlassen. Du brauchst harte, kryptografische Identität. 

Und genau deshalb sprechen wir heute über **Open Agent Identity (OAI)**, die **Agent Discovery Files (ADF) Architektur** und die absolute Pflichtdatei für jeden Betreiber von autonomen Systemen: die `/.well-known/agent-identity.json`.

## Was ist Open Agent Identity (OAI)?

Stell dir vor, du gehst in eine Bank in Kreuzberg und willst eine Million Euro abheben. Du sagst: "Hallo, ich bin der Jörg, geben Sie mir das Geld." Der Kassierer lacht dich aus und verlangt deinen Personalausweis, um deine Identität zweifelsfrei festzustellen. 

Open Agent Identity (OAI) ist genau das – der kryptografische Personalausweis für AI Agents. Es ist ein dezentralisiertes Identitäts-Framework, das es Maschinen ermöglicht, sich gegenüber anderen Maschinen absolut zweifelsfrei zu authentifizieren, ohne dass eine zentrale Behörde dazwischenfunken muss. 

Das Kernstück dieser Architektur ist eine öffentlich erreichbare JSON-Datei, die auf der Domain des Agenten-Betreibers gehostet wird. Der Pfad ist, analog zu vielen anderen modernen Standards, hart vorgegeben: `/.well-known/agent-identity.json`. 

Wenn ein fremder Agent bei deiner [API auf teleschmie.de](https://teleschmie.de/) anklopft und behauptet, er sei der autorisierte Einkaufs-Agent von Volkswagen, dann verlässt sich mein Server nicht auf seine IP oder seinen User-Agent. Mein Server nimmt die Domain des Agenten, ruft dessen `agent-identity.json` ab, extrahiert den öffentlichen Schlüssel und verifiziert damit die Signatur des eingehenden HTTP-Requests (siehe auch meinen Artikel zu RFC 9421). Wenn die Mathematik stimmt, ist das Vertrauen hergestellt.

## Die Agent Discovery Files (ADF) Architektur

Die `agent-identity.json` ist Teil der umfassenderen **Agent Discovery Files (ADF)** Architektur. Wir haben längst verstanden, dass wir Maschinenlesbarkeit auf Domänen-Ebene standardisieren müssen. ADF definiert, dass alle relevanten Metadaten eines Agenten an einem vorhersehbaren Ort liegen müssen. 

Ein gut gebauter Agent liefert in seiner Identity-File nicht nur Keys, sondern Kontext. Lass uns mal einen Blick in eine saubere `agent-identity.json` werfen, wie wir sie bei unseren Kunden konfigurieren:

```json
{
  "$schema": "https://oai.dev/schema/agent-identity.json",
  "agent_name": "teleschmie.de B2B Purchaser",
  "operator": {
    "name": "Jörg Zimmer",
    "domain": "teleschmie.de",
    "contact": "mailto:agent-ops@teleschmie.de"
  },
  "capabilities": [
    "b2b_purchasing",
    "inventory_discovery",
    "price_negotiation"
  ],
  "public_keys": [
    {
      "id": "key-2026-01",
      "type": "Ed25519",
      "purpose": "request_signing",
      "public_key_base64": "vF4rO9...",
      "expires": "2027-01-01T00:00:00Z"
    }
  ],
  "trust_policies": {
    "respects_robots_txt": true,
    "max_requests_per_second": 50
  }
}
```

Ist das nicht ein Gedicht? Jedes System, das diesen Agenten auf seine API zugreifen lässt, weiß sofort: Wem gehört dieser Bot? Was ist sein Zweck (Capabilities)? Wie kann ich ihn verifizieren (Public Keys)? Und vor allem: Wer ist verantwortlich, wenn der Agent Amok läuft und meine Datenbank mit Requests zerschießt (Contact)?

## Eine Story aus der Praxis: Der gebannte Millionen-Bot

Ich muss euch eine Geschichte aus dem Frühjahr 2026 erzählen, die das Ganze ins perfekte Licht rückt. Ich saß an meiner Arbeit für [teleschmie.de](https://teleschmie.de/) und ein Kunde rief in absoluter Panik an. Es handelte sich um einen riesigen E-Commerce-Zulieferer für die Gastro-Branche. 

Das Problem: Ihr Firewall-System hatte in der Nacht zuvor tausende Anfragen eines unbekannten Bots blockiert. Der Bot verhielt sich untypisch, griff auf tiefe Produktkategorien zu und sendete hunderte Requests pro Minute. Die DevOps-Leute dachten: "Klarer Fall, ein chinesischer Scraper, der unsere Preise klaut." Also: IP-Ban, weg damit.

Ein paar Stunden später meldete sich ein Großkunde bei ihnen, eine der größten Hotelketten Europas. Deren automatisierter Einkaufs-Agent konnte keine Kaffeemaschinen-Ersatzteile mehr bestellen, weil der Server einen 403 Forbidden warf. 

Was war passiert? Der "böse Scraper" war der brandneue, autonome Einkaufs-Agent der Hotelkette, ausgestattet mit Millionenbudgets, um automatisiert Inventar aufzufüllen. Die Firewall des Gastro-Zulieferers konnte den Agenten nicht verifizieren, weil sie keine Open Agent Identity implementiert hatten. Sie verließen sich auf dämliche Heuristiken.

Ich habe meinem Team gesagt: "Wir räumen diesen Laden jetzt auf." Wir haben beim Kunden die ADF-Architektur ausgerollt. Wir haben eine Middleware gebaut, die bei jedem unbekannten Agenten sofort die `/.well-known/agent-identity.json` der aufrufenden Domain abholt und die Public Keys im Redis-Cache ablegt. 

Ab diesem Tag wurden Agenten nicht mehr anhand von wirren Rate-Limits und IP-Reputationen bewertet, sondern anhand kryptografischer Identität. Der Einkaufs-Agent der Hotelkette bekam ein "Verified"-Tag im Backend, und die Bestellungen liefen wieder vollautomatisch durch. Das ist der Moment, in dem aus einer simplen JSON-Datei harter Umsatz wird.

## Trust und Verifizierung: Wie es 2026 wirklich läuft

Die bloße Existenz einer `agent-identity.json` reicht natürlich nicht aus. Jeder kann eine Datei hosten. Die eigentliche Magie von Open Agent Identity passiert in der Validierungsschleife:

1. **Request:** Der Agent sendet einen HTTP Request (signiert nach RFC 9421) an deine API.
2. **Discovery:** Dein Server entnimmt dem Request die Host-Domain des Agenten.
3. **Fetch:** Dein Server ruft `https://[agent-domain]/.well-known/agent-identity.json` ab.
4. **Validation:** Dein Server verifiziert die Signatur des Requests gegen den öffentlichen Schlüssel aus der JSON-Datei.
5. **Authorization:** Wenn die Signatur stimmt, prüfst du die "Capabilities" und erteilst den Zugriff.

Das ist das TLS-Zertifikat der Agentenwelt. Früher hat das grüne Schloss im Browser dem Menschen signalisiert: "Hier bist du sicher." Heute signalisiert die kryptografische Prüfung der Identity-JSON der Maschine: "Der Agent ist der, der er vorgibt zu sein."

Wenn dein eigener Agent das Netz durchstreift, um für dich Deals auszuhandeln oder Recherchen anzustellen, und deine Domain keine saubere Identity-File ausliefert, wird jede ernstzunehmende B2B-Firewall der Welt deinen Bot an der Tür abweisen. Du bist dann wie ein Türsteher-Kandidat ohne Ausweis am Berghain. Keine Chance.

## AI SEO und das Vertrauen der Giganten

Das Thema hat aber auch eine massive AI SEO Komponente. Die großen Suchmaschinen und Agenten-Aggregatoren werten die Existenz und Pflege der `agent-identity.json` extrem stark. Google, Anthropic und OpenAI bauen riesige "Trust-Graphen" auf.

Wenn dein Agent sauber deklariert ist, die Keys regelmäßig rotiert werden und deine Contact-E-Mails erreichbar sind, steigt der Trust-Score deiner gesamten Domain massiv. Du zeigst dich als verantwortungsvoller Akteur im Agentic Web. Wer sich versteckt und seinen Bot als `Mozilla/5.0` tarnt, wird in die Ecke der Spam-Schleudern verbannt.

Ich in meiner täglichen Arbeit habe das früh verstanden und integriere die ADF-Architektur standardmäßig in alle meine [Services](https://teleschmie.de/services/). Das ist keine Raketenwissenschaft, es ist einfach nur sauberes, transparentes Handwerk, wie ich es in Berlin liebe.

## Fazit: Ohne Gesicht kein Geschäft

Lasst mich das Ganze abschließen: Wer 2026 noch versucht, Agenten-Traffic ohne eine saubere Open Agent Identity Architektur zu verwalten, der fährt nachts ohne Licht auf der Autobahn. Es wird krachen.

Die `/.well-known/agent-identity.json` ist das kryptografische Gesicht deines autonomen Systems. Sie schafft das Vertrauen, das notwendig ist, um maschinell Geschäfte abzuwickeln. Setzt euch mit euren DevOps-Leuten zusammen, generiert ein paar frische Ed25519-Keys und veröffentlicht diese Datei. 

Zeigt dem Agentic Web, wer ihr seid. Wenn ihr dabei Hilfe braucht, schaut bei meinen [Glossar-Artikeln](https://teleschmie.de/glossar/) vorbei oder ruft direkt bei mir an. Ich mache eure Agenten salonfähig.

Bleibt ehrlich, bleibt nachweisbar. Euer Jörg.

```text
DALL-E Prompt: A highly futuristic, glowing neon 3D representation of an identity JSON file floating in cyberspace. Lime green accents everywhere. In the background, autonomous AI agents are scanning and verifying holographic identity badges. High-tech, cinematic lighting, 8k resolution, Unreal Engine 5 render style. Subtle watermark "Jörg Zimmer" in the bottom right corner.
```
