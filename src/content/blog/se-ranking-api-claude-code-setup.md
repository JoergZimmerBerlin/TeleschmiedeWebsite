---
title: "SE Ranking API mit Claude Code verbinden: Mein Setup-Tutorial für SEO-Automatisierung"
description: "Schritt für Schritt: So bindest du die SE Ranking API an Claude Code an — inkl. Daily-Limit gegen Credit-Verbrauch. Praxis-Tutorial mit Screenshots. ALOHA! 🌻"
date: "2026-04-22"
image: "../../assets/images/blog/se-ranking-claude-code-setup.webp"
image_alt: "SE Ranking API mit Claude Code verbinden — Setup-Tutorial von Jörg Zimmer"
category: "SEO Tools"
tags: ["Tutorial", "API", "Claude Code", "Erfahrungsbericht"]
key_takeaways:
  - "Die SE Ranking API lässt sich in unter 30 Minuten an Claude Code anbinden — wenn man den richtigen Skill-Wrapper baut statt nackte requests.get() zu schreiben."
  - "Ein Daily-Credit-Limit gehört von Minute 1 dazu — nicht erst nachdem ein Agent mal eben 10.000 Credits in einem Call verbrannt hat."
  - "Der account/subscription-Endpunkt kostet 0 Credits und ist dein Rettungsanker — immer vor und nach jedem Job abfragen."
faqs:
  - question: "Brauche ich für das Setup Python-Erfahrung?"
    answer: "Grundkenntnisse helfen. Claude Code macht den Rest — es schreibt den Wrapper auf Ansage. Du musst nur lesen, was es produziert, und sagen, wo das Budget-Limit rein muss."
  - question: "Was kostet die API im Test?"
    answer: "Der Smoketest ist gratis. Der account/subscription-Endpunkt kostet 0 Credits. Erst produktive Abfragen (Keyword-Research, Domain-Overview) verbrauchen Guthaben — zwischen 1 und 7.500 Credits pro Call, je nach Endpunkt."
  - question: "Warum extra Claude Code und nicht einfach Postman?"
    answer: "Weil Claude Code den ganzen Stack baut: Wrapper, Tests, Budget-Guardrails, Credit-Log. Postman ist Debugging-Tool — Claude Code ist ein Produktions-Setup."
---

Moin! 🌻

Mein Kumpel <a href="https://www.linkedin.com/in/maximilian-muhr/" target="_blank" rel="noopener noreferrer">Maximilian D. Muhr</a> — ja, der, den ich schon [im SEOpresso-Podcast-Artikel](../seopresso-podcast-maximilian-muhr/) erwähnt habe — saß mit mir letzte Woche beim Kaffee und erzählte mir eine Geschichte, die mich seitdem nicht loslässt. Er nutzt seit einer Weile die **Sistrix-API mit Claude Code** für automatisierte SEO-Analysen — sauber aufgesetzt, Wrapper gebaut, alles gut.

Bis an einem dieser Tage, an dem man irgendwas schnell testen will.

Ein anderer Agent bei ihm machte eine **Mini-Anfrage**. Eine. Kleine. Abfrage.

Ergebnis: **10.000 Sistrix-Credits weg in einem Rutsch.**

Das komplette Wochenbudget. Pulverisiert. Für eine Frage, die eigentlich einen Credit hätte kosten sollen — aber durch einen undokumentierten Endpoint-Preis eben 10.000 kostete.

Und ich dachte mir: *Das kann ich mit <a href="https://seranking.com/de/?ga=4169588&source=link" target="_blank" rel="noopener noreferrer">SE Ranking</a> doch auch. Nur dass ich bei dem Fehler nicht noch mal hängen bleiben will.*

Deshalb gibt es diesen Artikel. Ein Setup-Tutorial, bei dem das **Daily-Credit-Limit von Minute 1 dabei ist** — nicht nachträglich.

## Warum SE Ranking API + Claude Code

<a href="https://seranking.com/de/?ga=4169588&source=link" target="_blank" rel="noopener noreferrer">SE Ranking</a> kenne ich aus der täglichen Arbeit. Sichtbarkeits-Index, Keyword-Research, Backlink-Profile — das All-in-One-Werkzeug, das ich seit Jahren für meine Kunden nutze. Claude Code wiederum ist seit ein paar Monaten mein zweiter Schreibtisch: kein Dashboard-Klick, sondern echte Skripte, die bleiben. Einmal geschrieben, immer reproduzierbar.

Die Kombination macht etwas Spezielles möglich: du baust dir dein eigenes SEO-Tooling. Kein SaaS on top, keine Zapier-Kette, keine Drittabhängigkeit. Nur deine Fragen, deine Daten, dein Report.

Persönliches Versprechen: Ich zeige dir genau den Weg, den ich gegangen bin — inklusive der einen Stelle, wo ich extra ein Limit eingebaut habe, damit mir **nicht** passiert, was Max passiert ist.

## Was du brauchst

- SE Ranking Account mit API-Zugang (Core-Tarif reicht, Pro optional)
- Claude Code Installation (mac/windows/linux)
- Terminal-Grundkenntnisse
- ~30 Minuten Zeit
- Kaffee ☕ (optional, aber bewährt)

## Schritt 1: API-Key holen

Log dich in dein SE Ranking Dashboard ein und navigiere zu **Admin → API**. Dort generierst du deinen persönlichen Token.

![SE Ranking Admin-Panel mit API-Key-Generierung (Key verpixelt)](../../assets/images/blog/se-ranking-api-dashboard.webp)

Einmal kopieren, sofort in einen Passwort-Manager oder `.env.local`. Und dann testest du ihn genau einmal per curl:

```bash
curl -H "Authorization: Token DEIN_KEY" \
  https://api.seranking.com/account/subscription
```

<div class="my-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
  <p class="font-bold text-amber-700 mb-2">⚠️ Warnung</p>
  <p class="italic text-dark mb-0">Niemals in Commits, Screenshots, Slack oder Whatsapp — behandle den API-Key wie deinen Haustürschlüssel. Einmal öffentlich, einmal rotieren.</p>
</div>

## Schritt 2: Claude Code Projekt aufsetzen

Neues Verzeichnis, Claude Code starten, loslegen:

```bash
mkdir seo-analyse && cd seo-analyse
claude
```

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <p class="font-bold text-lime-600 mb-2">Jörgs SEO-Klartext (LinkedIn Insights)</p>
  <p class="italic text-dark mb-0">"Claude Code ist wie ein Praktikant, der wirklich liest, was du sagst. Erklär ihm, was du willst, lass ihn schreiben, prüfe — fertig."</p>
</div>

Meinen ersten echten Prompt an Claude Code habe ich fast eins zu eins so eingetippt:

> "Erstelle einen Python-Client für die SE Ranking Data API. Base-URL `https://api.seranking.com`. Auth: Header `Authorization: Token {KEY}`. Plus Smoketest gegen `account/subscription`. Plus Tests mit pytest-mock. Key aus `.env.local` via python-dotenv."

Claude Code legt dir daraufhin eine saubere Struktur an: `scripts/seo_api/seranking.py` für den Client, `scripts/seranking_smoke.py` für den Smoketest, `tests/` für die Testfälle. Der Wrapper sitzt, die Tests laufen, alles ist committbar. Keine 10 Minuten Arbeit.

![Architektur-Skizze: User → Claude Code → Wrapper → budget.py → api.seranking.com](../../assets/images/blog/claude-code-seranking-architektur.webp)

## Schritt 3: Daily-Limit einbauen (das Wichtigste!)

Jetzt kommt der Teil, wo ich an Max zurückdenke.

Vor jedem produktiven Call macht mein Wrapper einen Vor-Check via `account/subscription`. Der Endpunkt kostet **0 Credits** — der kostet dich nichts, außer einer Netzwerkverbindung. Er liefert dir zurück, wie viele Units du gerade noch hast. Danach schätze ich den geplanten Call-Verbrauch. Vergleiche beides mit drei Grenzwerten. Fertig.

| Gate | Schwelle | Aktion |
|------|----------|--------|
| 🟢 Grün | `units_left > 100.000` | Alles läuft, keine OK-Pflicht |
| 🟡 Gelb | `units_left` 50.000 – 100.000 | Admin-OK für die Session nötig |
| 🔴 Rot | `units_left < 50.000` | Stop. Kein weiterer Call. |
| 🔴 Rot | `heute > 100.000 verbraucht` | Daily-Cap — Stop bis morgen |

![Die drei Gates als Budget-Ampel](../../assets/images/blog/seranking-budget-ampel.webp)

Im Code sieht das — stark gekürzt — so aus:

```python
# Hard-Stop: niemals unter 50k
if left - estimated_cost < SERANKING_HARD_STOP:
    raise BudgetViolation(f"Hard-Stop: {left}-{estimated_cost} < 50000")

# Soft-Stop: unter 100k nur mit Admin-OK
if left < SERANKING_SOFT_STOP and not admin_ok:
    raise BudgetViolation("Soft-Stop: brauche Admin-OK")

# Daily-Cap: max 100k pro Session
if session_cumulative + estimated_cost > SERANKING_MAX_PER_SESSION:
    raise BudgetViolation("Daily-Limit erreicht")
```

Drei Zeilen Logik, und aus einem offenen Scheunentor wird ein Drehkreuz.

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <p class="font-bold text-lime-600 mb-2">Jörgs SEO-Klartext (LinkedIn Insights)</p>
  <p class="italic text-dark mb-0">"Ein API-Key ohne Daily-Limit ist wie ein Porsche ohne Tempomat — theoretisch cool, praktisch teuer."</p>
</div>

Zusätzlich schreibt der Wrapper jeden Call in ein append-only Log: Zeitstempel, Endpunkt, geschätzte Kosten, tatsächliche Units vorher/nachher, Delta. So weiß ich am Ende des Monats nicht nur, **was** ich verbraucht habe, sondern auch **wofür**.

## Schritt 4: Smoketest laufen lassen

Zeit für den ersten echten Call — kostet nichts, beweist alles:

```bash
python3 scripts/seranking_smoke.py
```

Erwartete Ausgabe (aus meinem echten Log):

```json
{
  "status": "active",
  "units_left": 300000,
  "expiration_date": "2027-03-29"
}
```

![Terminal mit grüner Smoketest-Ausgabe](../../assets/images/blog/seranking-smoketest-terminal.webp)

Falls die API statt `expiration_date` das Feld `expiraton_date` liefert — ja, das ist ein Typo bei SE Ranking. Nicht deiner. Mein Smoketest toleriert beide Schreibweisen. **SE Ranking, wenn ihr das lest: bitte fixen. 😉**

## Schritt 5: Der erste echte Call

Jetzt die erste kostenpflichtige Abfrage. `research/domain/overview/db` — 100 Credits, gibt dir Sichtbarkeit plus Keyword-Count einer Domain. Der perfekte Einstieg.

```python
client = SERankingClient()
overview = client.domain_overview("teleschmie.de")
print(overview["organic"]["traffic_sum"])
```

Und dann siehst du, wie dein Wrapper macht, was er soll: Vor-Check, Call, Nach-Check, Log-Eintrag, Ergebnis im Terminal. Sauber, transparent, reproduzierbar.

Bei dem Setup hat mir übrigens die Truppe von <a href="https://polisys.de" target="_blank" rel="noopener noreferrer">poliSYS</a> (das ist Max' Agentur) tatkräftig geholfen — die haben das genaue Wrapper-Pattern als Open-Source-Skill vorgemacht und auch den Budget-Guard mit den drei Gates. Wenn du das Rad nicht neu erfinden willst: rüberschauen lohnt.

## Tacheles am Ende

Wenn du einmal den Wrapper hast, sind alle weiteren Endpunkte eine Sache von fünf Minuten. `backlinks/summary`, `research/keyword/questions`, `audit/audits/standard` — alles nach dem gleichen Muster. Du baust dir im Lauf einer Woche dein eigenes kleines SEO-Tooling, das deinem Workflow entspricht und nicht dem eines SaaS-Produktmanagers in San Francisco.

<a href="https://seranking.com/de/?ga=4169588&source=link" target="_blank" rel="noopener noreferrer">SE Ranking</a> belohnt strukturierte Setups. Die API-Docs sind gut, die Endpunkte gut sortiert — aber Daily-Limits muss man selbst bauen. Jetzt weißt du, wie.

Im nächsten Teil der Serie sortiere ich, was die SE Ranking API eigentlich alles kann: **Ein Kompass durch die Endpunkte**. Sechs Kategorien, Kosten-Tabelle, Use-Cases. Teuerste Abfrage: 7.500 Credits. Günstigste: null. Dazwischen liegt eine Menge SEO-Arbeit.

Spart euch den 10k-Schock. Baut das Limit jetzt. ALOHA! 🌻
