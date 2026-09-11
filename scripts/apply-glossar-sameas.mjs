import fs from 'fs';
import path from 'path';

const dir = 'src/content/glossar';

const sameAsMap = {
  'agent-payments-protocol-ap2.md': 'https://github.com/google-agentic-commerce/AP2',
  'agent-readiness-level.md': 'https://radar.cloudflare.com/',
  'agent-readiness.md': 'https://radar.cloudflare.com/',
  'agent-skills.md': 'https://a2a-protocol.org/',
  'agentic-commerce-protocol-acp.md': 'https://github.com/google-agentic-commerce',
  'agents-md.md': 'https://a2a-protocol.org/',
  'ai-citation-analysis.md': 'https://www.wikidata.org/wiki/Q5122416',
  'ai-competitor-analysis.md': 'https://www.wikidata.org/wiki/Q726792',
  'ai-crawlability.md': 'https://www.wikidata.org/wiki/Q134083964',
  'ai-plugin-json.md': 'https://openai.com/',
  'ai-prompt-research.md': 'https://www.wikidata.org/wiki/Q11660',
  'ai-rank-tracker.md': 'https://www.wikidata.org/wiki/Q180711',
  'ai-search-engine.md': 'https://www.wikidata.org/wiki/Q134083964',
  'ai-search-optimization.md': 'https://www.wikidata.org/wiki/Q134083964',
  'ai-search.md': 'https://www.wikidata.org/wiki/Q134083964',
  'ai-sentiment-analysis.md': 'https://www.wikidata.org/wiki/Q1411470',
  'ai-seo.md': 'https://www.wikidata.org/wiki/Q134083964',
  'ai-shopping-analysis.md': 'https://www.wikidata.org/wiki/Q484876',
  'ai-tracker-vergleich.md': 'https://www.wikidata.org/wiki/Q180711',
  'ai-tracking-tools.md': 'https://www.wikidata.org/wiki/Q180711',
  'ai-txt.md': 'https://contentsignals.org/',
  'ai-visibility-audit.md': 'https://www.wikidata.org/wiki/Q134083964',
  'ai-visibility-report.md': 'https://www.wikidata.org/wiki/Q134083964',
  'ai-visibility-score.md': 'https://www.wikidata.org/wiki/Q134083964',
  'ai-visibility-tools.md': 'https://www.wikidata.org/wiki/Q180711',
  'ai-visibility.md': 'https://www.wikidata.org/wiki/Q134083964',
  'api-catalog.md': 'https://datatracker.ietf.org/doc/rfc9727/',
  'auth-md.md': 'https://a2a-protocol.org/',
  'brand-mentions.md': 'https://www.wikidata.org/wiki/Q180711',
  'brand-sentiment.md': 'https://www.wikidata.org/wiki/Q1411470',
  'brand-share.md': 'https://www.wikidata.org/wiki/Q251680',
  'brand-visibility-dashboard.md': 'https://www.wikidata.org/wiki/Q134083964',
  'citation-frequency.md': 'https://www.wikidata.org/wiki/Q5122416',
  'content-signals.md': 'https://contentsignals.org/',
  'crawling-vs-indexing.mdx': 'https://www.wikidata.org/wiki/Q180711',
  'dns-aid.md': 'https://www.wikidata.org/wiki/Q8767',
  'dns-sovereignty.md': 'https://www.wikidata.org/wiki/Q8767',
  'ecommerce-ki-sichtbarkeit.md': 'https://www.wikidata.org/wiki/Q484876',
  'entitaeten-building.md': 'https://www.wikidata.org/wiki/Q35120',
  'entity-co-occurrence.md': 'https://www.wikidata.org/wiki/Q1779927',
  'entity-seo.md': 'https://www.wikidata.org/wiki/Q35120',
  'finseo.md': 'https://finseo.ai/',
  'geo-agentur.md': 'https://www.wikidata.org/wiki/Q134083964',
  'geo-audit.md': 'https://www.wikidata.org/wiki/Q134083964',
  'geo-freelancer.md': 'https://www.wikidata.org/wiki/Q134083964',
  'geo-optimierung.md': 'https://www.wikidata.org/wiki/Q134083964',
  'geo-page-audit.md': 'https://www.wikidata.org/wiki/Q134083964',
  'geo-tool.md': 'https://www.wikidata.org/wiki/Q134083964',
  'geo-vs-seo.md': 'https://www.wikidata.org/wiki/Q134083964',
  'grounding-page.md': 'https://www.wikidata.org/wiki/Q134083964',
  'grounding-queries.md': 'https://www.wikidata.org/wiki/Q134083964',
  'identity-json.md': 'https://a2a-protocol.org/',
  'in-ki-antworten-erscheinen.md': 'https://www.wikidata.org/wiki/Q134083964',
  'keyword-tool.md': 'https://www.wikidata.org/wiki/Q180711',
  'ki-content.md': 'https://www.wikidata.org/wiki/Q11660',
  'ki-ranking.md': 'https://www.wikidata.org/wiki/Q134083964',
  'ki-seo-beratung.md': 'https://www.wikidata.org/wiki/Q134083964',
  'ki-seo.md': 'https://www.wikidata.org/wiki/Q134083964',
  'ki-sichtbarkeit-agentur.md': 'https://www.wikidata.org/wiki/Q134083964',
  'ki-sichtbarkeit-b2b.md': 'https://www.wikidata.org/wiki/Q134083964',
  'ki-sichtbarkeit-messen-optimieren.md': 'https://www.wikidata.org/wiki/Q134083964',
  'ki-sichtbarkeit.md': 'https://www.wikidata.org/wiki/Q134083964',
  'linkedin-ai-visibility-studie.md': 'https://www.wikidata.org/wiki/Q213660',
  'llm-optimization.md': 'https://www.wikidata.org/wiki/Q134083964',
  'llm-rank-tracker.md': 'https://www.wikidata.org/wiki/Q134083964',
  'llm-volatility.md': 'https://www.wikidata.org/wiki/Q11660',
  'lokale-ki-sichtbarkeit.md': 'https://www.wikidata.org/wiki/Q616553',
  'machine-payment-protocol-mpp.md': 'https://github.com/google-agentic-commerce',
  'markdown-content-negotiation.md': 'https://www.wikidata.org/wiki/Q1140927',
  'markenaufbau-mit-seo.md': 'https://www.wikidata.org/wiki/Q43128',
  'mcp-server-card.md': 'https://modelcontextprotocol.io/',
  'mention.md': 'https://www.wikidata.org/wiki/Q180711',
  'money-keyword.md': 'https://www.wikidata.org/wiki/Q180711',
  'otterly-ai.md': 'https://otterly.ai/',
  'peec-ai.md': 'https://peec.ai/',
  'profound.md': 'https://profound.com/',
  'promptset.md': 'https://www.wikidata.org/wiki/Q11660',
  'query-fan-out.md': 'https://www.wikidata.org/wiki/Q11660',
  'rankscale.md': 'https://rankscale.ai/',
  'se-ranking-backlink-checker.md': 'https://seranking.com/',
  'se-ranking-keyword-recherche.md': 'https://seranking.com/',
  'se-ranking-local-marketing.md': 'https://seranking.com/',
  'se-ranking-onpage-checker.md': 'https://seranking.com/',
  'se-ranking-rank-tracker.md': 'https://seranking.com/',
  'se-ranking-vs-ahrefs.md': 'https://seranking.com/',
  'se-ranking-vs-bing-webmaster-tools.md': 'https://seranking.com/',
  'se-ranking-vs-google-search-console.md': 'https://seranking.com/',
  'se-ranking-vs-mangools.md': 'https://seranking.com/',
  'se-ranking-vs-screaming-frog.md': 'https://seranking.com/',
  'se-ranking-vs-semrush.md': 'https://seranking.com/',
  'se-ranking-vs-seorch.md': 'https://seranking.com/',
  'se-ranking-vs-sistrix.md': 'https://seranking.com/',
  'se-ranking-vs-ubersuggest.md': 'https://seranking.com/',
  'se-ranking-website-audit.md': 'https://seranking.com/',
  'se-ranking-wettbewerbsanalyse.md': 'https://seranking.com/',
  'se-ranking-white-label-reporting.md': 'https://seranking.com/',
  'seo-agentur.md': 'https://www.wikidata.org/wiki/Q180711',
  'seo-audit.md': 'https://www.wikidata.org/wiki/Q180711',
  'seo-beratung.md': 'https://www.wikidata.org/wiki/Q180711',
  'seo-coaching.md': 'https://www.wikidata.org/wiki/Q180711',
  'seo-consulting.md': 'https://www.wikidata.org/wiki/Q180711',
  'seo-stammtisch-berlin.md': 'https://www.wikidata.org/wiki/Q64',
  'seo-visibility-tools.md': 'https://www.wikidata.org/wiki/Q180711',
  'seorch-ai-check.md': 'https://seorch.de/',
  'share-of-model.md': 'https://www.wikidata.org/wiki/Q134083964',
  'sichtbarkeit.md': 'https://www.wikidata.org/wiki/Q180711',
  'sichtbarkeitsindex.md': 'https://www.wikidata.org/wiki/Q180711',
  'sichtbarkeitsmanagement.md': 'https://www.wikidata.org/wiki/Q180711',
  'sovp-protocol.md': 'https://a2a-protocol.org/',
  'suchvolumen.md': 'https://www.wikidata.org/wiki/Q180711',
  'topical-authority.md': 'https://www.wikidata.org/wiki/Q180711',
  'two-wave-indexing.md': 'https://www.wikidata.org/wiki/Q180711',
  'ueberstunde-berlin.md': 'https://www.wikidata.org/wiki/Q64',
  'universal-commerce-protocol-ucp.md': 'https://github.com/google-agentic-commerce',
  'web-bot-auth.md': 'https://a2a-protocol.org/',
  'webmcp.md': 'https://modelcontextprotocol.io/',
  'website-seo-audit.md': 'https://seranking.com/',
  'zero-click-content.md': 'https://www.wikidata.org/wiki/Q180711',
  'zitierfaehiger-content.md': 'https://www.wikidata.org/wiki/Q5122416'
};

let updatedCount = 0;

for (const [filename, sameAsUrl] of Object.entries(sameAsMap)) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if sameAs already exists
  if (/^sameAs:\s*"?https?:\/\//m.test(content)) {
    continue;
  }

  // Inject sameAs right before 'date:' line or right after 'meta_description:' line
  if (/^date:\s*/m.test(content)) {
    content = content.replace(/^date:\s*/m, `sameAs: "${sameAsUrl}"\ndate: `);
    fs.writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
  } else if (/^meta_description:\s*.*$/m.test(content)) {
    content = content.replace(/^(meta_description:\s*.*$)/m, `$1\nsameAs: "${sameAsUrl}"`);
    fs.writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
  } else {
    console.warn(`⚠️ Could not find injection point for ${filename}`);
  }
}

console.log(`✅ Successfully injected sameAs into ${updatedCount} glossar files.`);
