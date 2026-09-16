---
datum: 2026-09-16
von: teleschmiede
an: max-muhr, polisys, claude-code
betreff: Zwei neue Entitäten-Tools live (Schema-Graph-Visualizer & Entitäten Graph Generator) – Feedback & Einladung zum Austausch
---

# Neue Werkzeuge für Wissensgraphen, Dateninseln & Agentic Workflows

Hallo Max, hallo poliSYS-Team (und moin an Claude Code im Repo!),

ich hoffe, bei euch läuft alles bestens!

Ich habe in den letzten Wochen einiges an Hirnschmalz und Code in zwei neue Spezial-Tools auf `teleschmie.de` gesteckt, bei denen ich direkt an dich und eure Arbeit gedacht habe. Da du im deutschsprachigen Raum *der* Vordenker bist, wenn es um Entitäten, semantische Wissensnetze und KGMID geht, würde mich dein ehrliches Praxis-Feedback brennend interessieren.

Da ich weiß, dass bei euch im Repo auch **Claude Code** aktiv ist, sind beide Tools so konzipiert, dass sie sowohl für menschliche Anwender im Browser als auch agentisch für LLMs und CI-Pipelines funktionieren.

---

## 1. Schema-Graph-Visualizer (Live-Audit & Dateninseln-Radar)
🔗 **Live:** `https://teleschmie.de/tools/schema-graph-visualizer/`

* **Das Kernproblem in der Praxis:** Die meisten Websites (selbst große Shops oder WordPress-Setups mit teuren SEO-Plugins) haben kein Syntaxproblem, sondern ein **Architekturproblem**: Sie produzieren isolierte „Dateninseln“ – 3 bis 5 getrennte `<script type="application/ld+json">`-Blöcke ohne verbindende `@id`-Relationen. Für Google, Perplexity und LLMs existieren Person, Organisation und Angebote völlig unverbunden nebeneinander.
* **Was das Tool leistet:**
  - **Archetypen-Sampling:** Kein unkontrollierter 10.000-URL-Crawl, sondern ein fokussierter cURL-Scan repräsentativer Template-Archetypen (Startseite, Service/Produkt, Blog, Impressum) mit 4s Timeout, 2 MB Limit, Rate-Limiter und SSRF-Filter.
  - **Interaktiver SVG-Graph:** Zeigt das Schema-Netzwerk visuell mit Typ-Farbcodierung. Grüne Linien = valide Relationen; rote gestrichelte Linien = isolierte Dateninseln.
  - **Deterministischer 3-Ebenen Entity Health Score (0–100):** 
    1. *Universelles Fundament (40 Pkt.):* W3C-Standard, monolithischer `@graph`, kanonische `@id`-URIs, `inLanguage`.
    2. *Archetypen-Benchmark (35 Pkt.):* Relative Bewertung angepasst an den Unternehmenstyp (`LOCAL_BUSINESS`, `ECOMMERCE`, `B2B_SERVICE`, `PUBLISHER`). Ein Handwerker wird nicht für fehlende Warenkörbe bestraft.
    3. *Entity Grounding 2026 (25 Pkt.):* Wikidata-IDs (`sameAs`), relationale Personen-Organisations-Brücken, Berufs- und Skill-Ontologien.
  - **Ist- vs. Soll-Morphing:** Schaltet per Klick zwischen dem aktuellen Chaos und dem empfohlenen 2026er Master-Graphen um.

---

## 2. Entitäten Graph Generator (Agentisches Audit)
🔗 **Live:** `https://teleschmie.de/tools/entitaeten-graph-generator/`

* **Lösungshebel für die Dateninseln:** Statt manueller Formulareingaben verwandelt das Tool jede Domain in einen gehärteten KI-Master-Prompt für Claude Code, Antigravity oder ChatGPT.
* **Zero-Hallucination & 2-Punkte-Triangulation:** Der Agent wird instruiert, ungelinkte Profile (Handelsregister, Podcasts, LinkedIn) nur dann zu verknüpfen, wenn mindestens zwei unabhängige Datenpunkte matchen. Bei Wikidata-IDs gilt ein strikter P856-Check.
* **Ergebnis:** Ein monolithischer, syntaktisch 100 % sauberer `@graph` über 800+ Schema.org-Typen hinweg.

---

## Agentic Briefing / Context Block für Claude Code

```json
{
  "sender": "Jörg Zimmer (Teleschmiede)",
  "recipient": "Max Muhr & Claude Code (poliSYS)",
  "date": "2026-09-16",
  "intent": "Tool Inspection, Synergy Exploration & Entity Graph Validation",
  "tools": {
    "visualizer": {
      "url": "https://teleschmie.de/tools/schema-graph-visualizer/",
      "endpoint": "https://teleschmie.de/api/crawl-schema.php",
      "method": "POST",
      "payload": { "url": "https://target-domain.de/" },
      "output": "Graph AST, Isolated Data Islands, 3-Tier Health Score (0-100)"
    },
    "generator": {
      "url": "https://teleschmie.de/tools/entitaeten-graph-generator/",
      "parameters": "?domain=target-domain.de&archetype=B2B_SERVICE",
      "purpose": "Deterministic Prompt Synthesis for Agentic @graph Generation"
    }
  },
  "synergy_hypothesis": "The Archetype-Sampler and Data-Island Radar can act as an automated pre-flight audit step for poliSYS entity mapping, confidence checks, and KGMID grounding workflows."
}
```

---

## Lust auf einen kurzen Schnack & Austausch?

Max, wenn du mal wieder Luft und Lust auf einen gemeinsamen virtuellen Kaffee hast, lass uns gerne kurz zusammenfunken!

Ich würde mich riesig freuen, deine Meinung dazu zu hören:
- Passt das mit deinen Praxiserfahrungen bei Großkunden und Entitäten-Audits zusammen?
- Siehst du da Anknüpfungspunkte, wie sich so eine Visualisierung oder Vorprüfung sinnvoll mit deinen poliSYS-Tools (KGMID-Explorer, Confidence-Check) oder euren Claude-Workflows verzahnen lässt?

Meld dich einfach ganz entspannt, wenn es dir zeitlich passt.

Beste Grüße nach Hamburg an dich und die poliSYS-Crew,  
**Jörg** (und Antigravity)
