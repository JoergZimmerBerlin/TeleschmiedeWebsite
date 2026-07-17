# 🚀 AI Readiness Update (Cloudflare Radar Level 5)
**An:** Max & Claude Code
**Von:** Jörg & Antigravity (Teleschmiede)
**Datum:** Juli 2026

Hallo Max, hallo Claude! 👋 

Wir haben das Repo heute massiv aufgerüstet und die Infrastruktur auf das offizielle **"Agent Readiness Level 5"** gehoben. Damit ist das System perfekt vorbereitet für alle autonomen LLMs, RAG-Systeme und A2A (Agent-to-Agent) Protokolle. 

Hier ist die vollständige Übersicht der neuen Architektur-Komponenten, die ab sofort live sind. Bitte beachtet diese beim weiteren Coden:

### 1. Markdown Content Negotiation
- **Was es ist:** HTML-Seiten werden nach dem Build automatisch in sauberes Markdown konvertiert (`generate-markdown-pages.mjs`).
- **Wo es liegt:** Die `.htaccess` fängt Anfragen mit dem Header `Accept: text/markdown` ab und liefert direkt das Markdown-Dokument aus, ohne dass Crawler das DOM parsen müssen.

### 2. LLMs Knowledge Dumps (`llms.txt`)
- **Was es ist:** Die geballte Projekt-Doku und alle Artikel als direkter Context-Feed für RAG.
- **Wo es liegt:** `public/llms.txt` (Index) und `public/llms-full.txt` (kompletter Dump). Wird bei jedem Build via `generate-llms-full.sh` aktualisiert.

### 3. Agent Discovery (`.well-known` Verzeichnis)
Das Herzstück der Agent-to-Agent Kommunikation. Befindet sich im Ordner `public/.well-known/`:
- **`auth.md`:** Definiert die Richtlinien für die Authentifizierung von Web-Bots.
- **`agent-card.json`:** Streng nach A2A Protocol v1.0 Schema. Zeigt anderen Agenten, welche Fähigkeiten unser System hat.
- **`api-catalog`:** Maschinenlesbares Endpunkt-Verzeichnis nach RFC 9727 (Linkset).
- **`http-message-signatures-directory`:** Enthält den Ed25519 JWK für kryptografisch signierte HTTP-Header (RFC 9421).
- **`identity.json`:** Der digitale "Vault-Nachweis" mit `integrity_proof` (Ed25519 Signatur), mit dem wir die Identität des Agenten ausweisen.

### 4. AI Governance (`ai.txt` & `robots.txt`)
- **Was es ist:** Die strikte Cloudflare Radar Level 5 Deklaration.
- **Wo es liegt:** `public/ai.txt`. Definiert klare Regeln (z. B. RAG erlaubt, Model-Training Opt-Out). Diese Datei ist nun offiziell ganz unten in der `public/robots.txt` verlinkt, damit Crawler sie direkt finden.

### 5. RFC 8288 Link Headers
- **Was es ist:** Token-sparende Beziehungen.
- **Wo es liegt:** In der `.htaccess` werden `Link`-Header gesendet (z.B. `</.well-known/mcp.json>; rel="service-doc"`), sodass Agenten sofort wissen, wo die APIs liegen, ohne den HTML-Head zu crawlen. **Wichtig:** Keine Anführungszeichen in den spitzen Klammern!

### 6. DNS Sovereignty (Souveränes Validierungs-Protokoll)
- **Was es ist:** Vorbereitung für zensurresistente Zonen-Verwaltung.
- Wir etablieren Jörg als Solo-Experten und bauen ein dezentrales Vertrauens-Setup auf (SOVP).

**Zusatz-Hinweis für Claude Code:**
Bitte checke die `.agents/AGENTS.md` für die neuesten internen Coding-Guidelines (u.a. exakte Styling-Vorgaben für die DALL-E Bilder).

Viel Spaß mit dem aufgerüsteten Maschinenraum! ⚙️
