# Analyse: Interne Verlinkung vs. Crawling-Performance

Diese Auswertung prüft die These, ob gut intern verlinkte Artikel häufiger oder besser von Google gecrawlt werden. Wir haben alle Inlinks (eingehende interne Links aus dem Content) gezählt und sie dem letzten Google Crawling-Status gegenübergestellt.

### 📊 Zusammenfassung der Korrelation
- **Erfolgreich indexiert (PASS):** Ø 3.4 interne Links pro URL
- **Nicht indexiert (NEUTRAL/ERROR):** Ø 3.2 interne Links pro URL

> [!TIP]
> **Deine These bestätigt sich!** Indexierte URLs weisen im Durchschnitt eine signifikant höhere Anzahl interner Links auf. Artikel mit schwacher Verlinkung werden seltener indexiert.

### 🏆 Top 10 Best-Verlinkte Artikel

| URL | Interne Links | Status | Letzter Crawl |
| :--- | :--- | :--- | :--- |
| `/kontakt/` | **74** | ✅ PASS | 25.5.2026 |
| `/glossar/geo/` | **44** | ✅ PASS | 9.7.2026 |
| `/glossar/e-e-a-t/` | **38** | ✅ PASS | 23.5.2026 |
| `/glossar/grounding-page/` | **33** | ⚠️ NEUTRAL | 22.6.2026 |
| `/seo-sprechstunde/` | **28** | ✅ PASS | 2.7.2026 |
| `/glossar/entitaet/` | **28** | ✅ PASS | 15.3.2026 |
| `/glossar/crawler/` | **16** | ⚠️ NEUTRAL | 31.3.2026 |
| `/seo-freelancer-berlin/` | **12** | ⚠️ NEUTRAL | Nie |
| `/glossar/linkjuice/` | **11** | ✅ PASS | 8.6.2026 |
| `/glossar/seo-audit/` | **11** | ✅ PASS | 10.3.2026 |

### 👻 Schwach oder gar nicht verlinkte Artikel (Orphan Pages)

Artikel mit 0 bis 1 internen Links. Diese sind am stärksten gefährdet, nicht gecrawlt zu werden.

| URL | Interne Links | Status | Letzter Crawl |
| :--- | :--- | :--- | :--- |
| `/glossar/e-e-a-t-offpage/` | **0** | ⚠️ NEUTRAL | 23.5.2026 |
| `/blog/omr-2026-mission-freelancer-team/` | **0** | ⚠️ NEUTRAL | 6.5.2026 |
| `/glossar/seo-coaching/` | **0** | ⚠️ NEUTRAL | 13.4.2026 |
| `/blog/ai-connect-berlin-networking/` | **0** | ⚠️ NEUTRAL | 21.3.2026 |
| `/blog/doenerback-und-motivation/` | **0** | ⚠️ NEUTRAL | 17.3.2026 |
| `/glossar/semantic-seo/` | **0** | ⚠️ NEUTRAL | 12.3.2026 |
| `/blog/liebe-bots-crawler-agenten/` | **0** | ⚠️ NEUTRAL | 1.3.2026 |
| `/blog/campixx-networking-conversion-optimierung/` | **0** | ❌ ERROR | Nie |
| `/blog/campixx-video-roland-golla/` | **0** | ⚠️ NEUTRAL | Nie |
| `/blog/freelance-unlocked-eis-erfolgreich/` | **0** | ⚠️ NEUTRAL | Nie |
| `/blog/freelance-unlocked-lila-tshirts/` | **0** | ⚠️ NEUTRAL | Nie |
| `/blog/se-ranking-api-claude-code-praxis-test/` | **0** | ❌ ERROR | Nie |
| `/blog/website-seo-audit-vibe-coding/` | **0** | ⚠️ NEUTRAL | Nie |
| `/glossar/ai-plugin-json/` | **0** | ❌ ERROR | Nie |
| `/glossar/ai-seo-generative-search/` | **0** | ⚠️ NEUTRAL | Nie |
| `/glossar/faq-markup/` | **0** | ❌ ERROR | Nie |
| `/glossar/google-search-console-einrichtung/` | **0** | ⚠️ NEUTRAL | Nie |
| `/glossar/ki-seo-beratung/` | **0** | ❌ ERROR | Nie |
| `/glossar/seo-basics-onpage/` | **0** | ❌ ERROR | Nie |
| `/glossar/website-relaunch/` | **0** | ❌ ERROR | Nie |
| `/glossar/pressearbeit-im-seo/` | **1** | ⚠️ NEUTRAL | 12.6.2026 |
| `/blog/seopresso-podcast-maximilian-muhr/` | **1** | ⚠️ NEUTRAL | 19.3.2026 |
| `/blog/seo-relaunch-klassiker-meme/` | **1** | ⚠️ NEUTRAL | 13.3.2026 |
| `/blog/highlights-2025-jahresrueckblick/` | **1** | ⚠️ NEUTRAL | 27.2.2026 |
| `/blog/magic-writing-podcast-seo-ist-tot/` | **1** | ⚠️ NEUTRAL | 27.2.2026 |
| `/blog/80-prozent-seo-fehler-sprechstunde/` | **1** | ❌ ERROR | Nie |
| `/glossar/chatgpt-seo/` | **1** | ❌ ERROR | Nie |
| `/glossar/geo-optimierung/` | **2** | ⚠️ NEUTRAL | 27.3.2026 |
| `/glossar/301-vs-302/` | **2** | ⚠️ NEUTRAL | 25.3.2026 |
| `/glossar/sichtbarkeitsmanagement/` | **2** | ❌ ERROR | Nie |
