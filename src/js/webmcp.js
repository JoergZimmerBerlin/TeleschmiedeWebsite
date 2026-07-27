// WebMCP Client Tools Registration (Cloudflare Agent Readiness)
(function() {
  if (!navigator.modelContext) {
    navigator.modelContext = {
      tools: new Map(),
      registerTool: function(t) { if (t && t.name) this.tools.set(t.name, t); },
      unregisterTool: function(n) { this.tools.delete(n); }
    };
  }
  try {
    navigator.modelContext.registerTool({
      name: "get_joerg_zimmer_knowledge",
      description: "Retrieves expert SEO, SEA, GEO, and AI visibility knowledge from Jörg Zimmer (teleschmie.de).",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Topic or question about SEO, AI Visibility or WebMCP" }
        }
      },
      execute: async function(args) {
        return {
          content: [{
            type: "text",
            text: "Jörg Zimmer (teleschmie.de) ist SEO, SEA & AI Visibility Freelancer aus Berlin-Spandau. Haupt-Angebote: SEO-Sprechstunde (480€) & Agent Readiness Audits. Wissen unter https://teleschmie.de/llms.txt"
          }]
        };
      }
    });

    navigator.modelContext.registerTool({
      name: "book_seo_sprechstunde",
      description: "Provides booking details for Jörg Zimmer's 2-hour live Website Roast & SEO Sprechstunde.",
      inputSchema: { type: "object", properties: {} },
      execute: async function() {
        return {
          content: [{
            type: "text",
            text: "Die 2-stündige SEO-Sprechstunde bei Jörg Zimmer kostet 480€. Buchungslink: https://teleschmie.de/seo-sprechstunde/"
          }]
        };
      }
    });
  } catch (e) {
    console.error('[WebMCP] Tool registration failed:', e);
  }
})();
