/**
 * Schema-Graph-Visualizer Client Engine
 * Teleschmiede (2026)
 * 
 * Deterministische Visualisierung, 3-Ebenen Entity-Scoring,
 * Vorher/Nachher-Morphismus und 1-Click-Demos.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const targetUrlInput = document.getElementById('target-url');
  const btnAnalyze = document.getElementById('btn-analyze');
  const analysisProgress = document.getElementById('analysis-progress');
  const progressBar = document.getElementById('progress-bar');
  const progressStatus = document.getElementById('progress-status');
  const resultsContainer = document.getElementById('results-container');
  const errorContainer = document.getElementById('error-container');
  const errorText = document.getElementById('error-text');

  // Tabs
  const tabCrawlBtn = document.getElementById('tab-crawl-btn');
  const tabManualBtn = document.getElementById('tab-manual-btn');
  const crawlInputSection = document.getElementById('crawl-input-section');
  const manualInputSection = document.getElementById('manual-input-section');
  const manualJsonInput = document.getElementById('manual-json-input');
  const btnAnalyzeManual = document.getElementById('btn-analyze-manual');

  // Toggle Ist vs Soll
  const toggleIstBtn = document.getElementById('toggle-ist-btn');
  const toggleSollBtn = document.getElementById('toggle-soll-btn');

  // Quick Demo Buttons
  const demoButtons = document.querySelectorAll('.demo-btn');

  // State
  let currentAnalysisData = null;
  let currentViewMode = 'ist'; // 'ist' or 'soll'
  let selectedNodeIndex = 0;

  // Tab Switching
  if (tabCrawlBtn && tabManualBtn) {
    tabCrawlBtn.addEventListener('click', () => {
      tabCrawlBtn.classList.add('bg-dark', 'text-lime-accent');
      tabCrawlBtn.classList.remove('text-gray-600');
      tabManualBtn.classList.remove('bg-dark', 'text-lime-accent');
      tabManualBtn.classList.add('text-gray-600');
      crawlInputSection.classList.remove('hidden');
      manualInputSection.classList.add('hidden');
    });

    tabManualBtn.addEventListener('click', () => {
      tabManualBtn.classList.add('bg-dark', 'text-lime-accent');
      tabManualBtn.classList.remove('text-gray-600');
      tabCrawlBtn.classList.remove('bg-dark', 'text-lime-accent');
      tabCrawlBtn.classList.add('text-gray-600');
      manualInputSection.classList.remove('hidden');
      crawlInputSection.classList.add('hidden');
    });
  }

  // Demo Profiles (Deterministisch & Faktenbasiert)
  const demoProfiles = {
    teleschmiede: {
      domain: "teleschmie.de",
      businessArchetype: "B2B_SERVICE",
      healthScore: {
        total: 96,
        breakdown: {
          foundation: { score: 40, max: 40 },
          archetype: { score: 35, max: 35 },
          grounding: { score: 21, max: 25 }
        }
      },
      stats: { totalScriptTags: 1, uniqueEntityTypes: 10, hasGraphContainer: true },
      issues: [
        { severity: "info", title: "Maximaler Connected Graph", desc: "Alle 334 Routen sind monolithisch im @graph verankert (0 Dateninseln)." }
      ],
      nodes: [
        { id: "https://teleschmie.de/#person", label: "Jörg Zimmer", type: "Person", color: "#3b82f6", x: 80, y: 80, isConnected: true, props: { hasOccupation: "2431 (Senior Consultant)", knowsLanguage: "de (Q188), en (Q1860)" } },
        { id: "https://teleschmie.de/#localbusiness", label: "Jörg Zimmer (Business)", type: "Organization", color: "#a855f7", x: 80, y: 260, isConnected: true, props: { slogan: "Berliner Klartext", currenciesAccepted: "EUR" } },
        { id: "https://teleschmie.de/#website", label: "teleschmie.de", type: "WebSite", color: "#f59e0b", x: 260, y: 170, isConnected: true, props: { inLanguage: "de-DE" } },
        { id: "https://teleschmie.de/glossar/#termset", label: "Glossar Lexicon", type: "DefinedTermSet", color: "#f59e0b", x: 440, y: 80, isConnected: true, props: { inLanguage: "de-DE" } },
        { id: "https://teleschmie.de/blog/#blog", label: "SEO & AI Blog", type: "Blog", color: "#f59e0b", x: 440, y: 260, isConnected: true, props: { inLanguage: "de-DE" } },
        { id: "https://teleschmie.de/tools/#software", label: "KI Tools Suite", type: "SoftwareApplication", color: "#10b981", x: 620, y: 170, isConnected: true, props: { version: "2.0", offers: "0 EUR" } }
      ],
      edges: [
        { from: 0, to: 1, label: "founder", solid: true },
        { from: 0, to: 2, label: "author", solid: true },
        { from: 1, to: 2, label: "publisher", solid: true },
        { from: 2, to: 3, label: "hasPart", solid: true },
        { from: 2, to: 4, label: "hasPart", solid: true },
        { from: 2, to: 5, label: "hasPart", solid: true }
      ]
    },
    ecommerce: {
      domain: "mode-lifestyle-store.de",
      businessArchetype: "ECOMMERCE",
      healthScore: {
        total: 42,
        breakdown: {
          foundation: { score: 15, max: 40 },
          archetype: { score: 20, max: 35 },
          grounding: { score: 7, max: 25 }
        }
      },
      stats: { totalScriptTags: 4, uniqueEntityTypes: 4, hasGraphContainer: false },
      issues: [
        { severity: "error", title: "3 isolierte Dateninseln", desc: "WooCommerce & SEO-Plugin erzeugen unverbundene Tags ohne @graph." },
        { severity: "warning", title: "Keine Brand-Relation", desc: "Produkte verweisen nicht auf die Organization als Hersteller/Verkäufer." },
        { severity: "info", title: "Kein Wikidata-Grounding", desc: "Das Unternehmen ist nicht mit globalen Knowledge Bases verlinkt." }
      ],
      nodes: [
        { id: "_b1", label: "Shop Organization", type: "Organization", color: "#a855f7", x: 90, y: 110, isConnected: false, props: { name: "Mode Lifestyle GmbH", missing: "Keine @id Fragment-URI" } },
        { id: "_b2", label: "WebSite Root", type: "WebSite", color: "#f59e0b", x: 90, y: 250, isConnected: false, props: { url: "https://mode-lifestyle-store.de", missing: "Kein publisher-Verweis" } },
        { id: "_b3", label: "Produkt A (Sneaker)", type: "Product", color: "#10b981", x: 380, y: 110, isConnected: false, props: { price: "89.95", missing: "Isolierter Block (Insel)" } },
        { id: "_b4", label: "Produkt B (Jacke)", type: "Product", color: "#10b981", x: 380, y: 250, isConnected: false, props: { price: "129.00", missing: "Kein @id-Link zum Store" } }
      ],
      edges: [
        { from: 0, to: 1, label: "getrennt", solid: false },
        { from: 0, to: 2, label: "fehlt", solid: false },
        { from: 0, to: 3, label: "fehlt", solid: false }
      ]
    },
    handwerk: {
      domain: "dachdecker-meister-schmidt.de",
      businessArchetype: "LOCAL_BUSINESS",
      healthScore: {
        total: 38,
        breakdown: {
          foundation: { score: 15, max: 40 },
          archetype: { score: 15, max: 35 },
          grounding: { score: 8, max: 25 }
        }
      },
      stats: { totalScriptTags: 2, uniqueEntityTypes: 3, hasGraphContainer: false },
      issues: [
        { severity: "error", title: "Dateninsel zwischen Meister & Betrieb", desc: "Der Dachdeckermeister ist nicht als founder oder Inhaber der LocalBusiness verknüpft." },
        { severity: "warning", title: "Geo-Koordinaten fehlen", desc: "Lokale Rankings werden durch fehlende geo-Breitengrade geschwächt." },
        { severity: "warning", title: "Keine Öffnungszeiten", desc: "openingHoursSpecification fehlt komplett im Schema." }
      ],
      nodes: [
        { id: "_h1", label: "Hans Schmidt (Meister)", type: "Person", color: "#3b82f6", x: 120, y: 100, isConnected: false, props: { name: "Hans Schmidt", jobTitle: "Dachdeckermeister" } },
        { id: "_h2", label: "Schmidt Bedachungen", type: "LocalBusiness", color: "#a855f7", x: 120, y: 260, isConnected: false, props: { address: "Berlin", missing: "founder Link fehlt" } },
        { id: "_h3", label: "Dachsanierung", type: "Service", color: "#10b981", x: 420, y: 180, isConnected: false, props: { serviceType: "Dacharbeiten", missing: "Kein provider-Link" } }
      ],
      edges: [
        { from: 0, to: 1, label: "nicht verlinkt", solid: false },
        { from: 1, to: 2, label: "keine Relation", solid: false }
      ]
    },
    b2b: {
      domain: "cloud-saas-analytics.io",
      businessArchetype: "B2B_SERVICE",
      healthScore: {
        total: 45,
        breakdown: {
          foundation: { score: 20, max: 40 },
          archetype: { score: 15, max: 35 },
          grounding: { score: 10, max: 25 }
        }
      },
      stats: { totalScriptTags: 3, uniqueEntityTypes: 4, hasGraphContainer: false },
      issues: [
        { severity: "error", title: "SoftwareApplication nicht ausgezeichnet", desc: "Das Kernprodukt SaaS besitzt kein Schema-Markup." },
        { severity: "warning", title: "Blog-Autoren anonym", desc: "Artikel enthalten nur einen Namensstring statt echter Person-Referenz." }
      ],
      nodes: [
        { id: "_b1", label: "Cloud Analytics Inc.", type: "Organization", color: "#a855f7", x: 100, y: 120, isConnected: false, props: { name: "Cloud Analytics", url: "cloud-saas-analytics.io" } },
        { id: "_b2", label: "WebSite", type: "WebSite", color: "#f59e0b", x: 100, y: 260, isConnected: false, props: { name: "Cloud Analytics" } },
        { id: "_b3", label: "Case Study Whitepaper", type: "Article", color: "#10b981", x: 400, y: 180, isConnected: false, props: { headline: "ROI von Analytics 2026", author: "Nur String (keine @id)" } }
      ],
      edges: [
        { from: 0, to: 1, label: "isoliert", solid: false },
        { from: 0, to: 2, label: "kein publisher", solid: false }
      ]
    }
  };

  // Demo Button Clicks
  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const demoKey = btn.getAttribute('data-demo');
      if (demoProfiles[demoKey]) {
        targetUrlInput.value = demoProfiles[demoKey].domain;
        runSimulatedAnalysis(demoProfiles[demoKey]);
      }
    });
  });

  // Start Real Crawl
  if (btnAnalyze) {
    btnAnalyze.addEventListener('click', () => {
      const url = targetUrlInput.value.trim();
      if (!url) {
        showError('Bitte gib eine gültige Domain oder Website-URL ein.');
        return;
      }
      runLiveCrawl(url);
    });
  }

  // Start Manual Analysis
  if (btnAnalyzeManual) {
    btnAnalyzeManual.addEventListener('click', () => {
      const rawJson = manualJsonInput.value.trim();
      if (!rawJson) {
        showError('Bitte füge mindestens einen JSON-LD Block oder Quelltext ein.');
        return;
      }
      runManualAnalysis(rawJson);
    });
  }

  function showError(msg) {
    errorText.textContent = msg;
    errorContainer.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    analysisProgress.classList.add('hidden');
  }

  function hideError() {
    errorContainer.classList.add('hidden');
  }

  // Execute Live Crawl against /api/crawl-schema.php
  async function runLiveCrawl(url) {
    hideError();
    resultsContainer.classList.add('hidden');
    analysisProgress.classList.remove('hidden');

    // Multi-step progress animation
    const steps = [
      { pct: 20, text: "Starte cURL-Handshake & prüfe Startseite..." },
      { pct: 45, text: "Erkenne sitemap.xml & Template-Archetypen..." },
      { pct: 70, text: "Scanne Unterseiten nach Schema.org JSON-LD..." },
      { pct: 85, text: "Analysiere @graph & entlarve Dateninseln..." },
      { pct: 98, text: "Berechne 3-Ebenen Entity Health Score..." }
    ];

    let currentStep = 0;
    const progressInterval = setInterval(() => {
      if (currentStep < steps.length) {
        progressBar.style.width = steps[currentStep].pct + '%';
        progressStatus.textContent = steps[currentStep].text;
        currentStep++;
      }
    }, 1800);

    try {
      const response = await fetch('/api/crawl-schema.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url })
      });

      clearInterval(progressInterval);
      progressBar.style.width = '100%';
      progressStatus.textContent = "Auswertung abgeschlossen!";

      const data = await response.json();

      if (!data.success) {
        if (data.isBlocked) {
          showError('Die Ziel-Website blockiert Bots (Cloudflare/403). Wechsle bitte oben auf "Quelltext / JSON-LD manuell einfügen".');
        } else {
          showError(data.error || 'Fehler bei der Analyse.');
        }
        return;
      }

      setTimeout(() => {
        analysisProgress.classList.add('hidden');
        renderAnalysisResults(data);
      }, 500);

    } catch (e) {
      clearInterval(progressInterval);
      showError('Verbindung zum Server fehlgeschlagen. Bitte prüfe deine Internetverbindung.');
    }
  }

  function runSimulatedAnalysis(profile) {
    hideError();
    resultsContainer.classList.add('hidden');
    analysisProgress.classList.remove('hidden');

    let pct = 0;
    const interval = setInterval(() => {
      pct += 25;
      progressBar.style.width = pct + '%';
      if (pct === 25) progressStatus.textContent = "Lade Test-Profil...";
      if (pct === 75) progressStatus.textContent = "Erkenne Relationen & Relationale IDs...";
      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          analysisProgress.classList.add('hidden');
          renderAnalysisResults(profile);
        }, 300);
      }
    }, 200);
  }

  function runManualAnalysis(rawInput) {
    hideError();
    try {
      let parsed;
      if (rawInput.includes('<script')) {
        const matches = rawInput.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
        if (!matches || matches.length === 0) {
          showError('Kein <script type="application/ld+json"> im eingefügten Text gefunden.');
          return;
        }
        const blocks = matches.map(m => {
          const content = m.replace(/<[^>]+>/g, '').trim();
          return JSON.parse(content);
        });
        parsed = blocks.length === 1 ? blocks[0] : { "@graph": blocks };
      } else {
        parsed = JSON.parse(rawInput);
      }

      // Convert manual parsed into standard result structure
      const isGraph = !!parsed['@graph'];
      const items = isGraph ? parsed['@graph'] : (Array.isArray(parsed) ? parsed : [parsed]);
      
      const entities = items.map((item, i) => ({
        id: item['@id'] || `_node_${i}`,
        label: item.name || item.headline || item['@type'] || 'Entität',
        type: Array.isArray(item['@type']) ? item['@type'].join('/') : (item['@type'] || 'Thing'),
        color: '#3b82f6',
        x: 100 + (i * 120),
        y: 120 + ((i % 2) * 100),
        isConnected: isGraph,
        props: item
      }));

      const syntheticResult = {
        domain: "Manuelle Eingabe",
        businessArchetype: "B2B_SERVICE",
        healthScore: {
          total: isGraph ? 70 : 35,
          breakdown: {
            foundation: { score: isGraph ? 30 : 15, max: 40 },
            archetype: { score: 25, max: 35 },
            grounding: { score: 15, max: 25 }
          }
        },
        stats: { totalScriptTags: isGraph ? 1 : items.length, uniqueEntityTypes: entities.length, hasGraphContainer: isGraph },
        issues: isGraph ? [] : [{ severity: "error", title: "Isolierte Dateninseln", desc: "Kein umschließender @graph Container vorhanden." }],
        nodes: entities,
        edges: []
      };

      renderAnalysisResults(syntheticResult);
    } catch (err) {
      showError('Ungültiges JSON-Format: ' + err.message);
    }
  }

  // Render Full Results
  function renderAnalysisResults(data) {
    currentAnalysisData = data;
    resultsContainer.classList.remove('hidden');

    // 1. KPI Badges & Score
    const totalScore = data.healthScore.total;
    const scoreValEl = document.getElementById('score-value');
    const scoreRingEl = document.getElementById('score-ring');
    const scoreBadgeEl = document.getElementById('score-badge');

    scoreValEl.textContent = totalScore;
    
    // Color thresholds
    let ringColor = '#ef4444'; // Red
    let badgeText = 'Kritischer Handlungsbedarf';
    let badgeClass = 'bg-red-500/10 text-red-500 border-red-500/30';

    if (totalScore >= 80) {
      ringColor = '#10b981'; // Green
      badgeText = 'Hervorragend vernetzt (2026 Ready)';
      badgeClass = 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30';
    } else if (totalScore >= 50) {
      ringColor = '#f59e0b'; // Amber
      badgeText = 'Mittleres Optimierungspotenzial';
      badgeClass = 'bg-amber-500/10 text-amber-500 border-amber-500/30';
    }

    scoreRingEl.setAttribute('stroke', ringColor);
    // Circumference = 2 * PI * 40 = ~251.2
    const strokeDash = (totalScore / 100) * 251.2;
    scoreRingEl.setAttribute('stroke-dasharray', `${strokeDash}, 251.2`);

    scoreBadgeEl.textContent = badgeText;
    scoreBadgeEl.className = `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${badgeClass}`;

    // 2. Score Breakdown Bars
    document.getElementById('foundation-score-txt').textContent = `${data.healthScore.breakdown.foundation.score} / ${data.healthScore.breakdown.foundation.max}`;
    document.getElementById('foundation-bar').style.width = `${(data.healthScore.breakdown.foundation.score / data.healthScore.breakdown.foundation.max) * 100}%`;

    document.getElementById('archetype-score-txt').textContent = `${data.healthScore.breakdown.archetype.score} / ${data.healthScore.breakdown.archetype.max}`;
    document.getElementById('archetype-bar').style.width = `${(data.healthScore.breakdown.archetype.score / data.healthScore.breakdown.archetype.max) * 100}%`;

    document.getElementById('grounding-score-txt').textContent = `${data.healthScore.breakdown.grounding.score} / ${data.healthScore.breakdown.grounding.max}`;
    document.getElementById('grounding-bar').style.width = `${(data.healthScore.breakdown.grounding.score / data.healthScore.breakdown.grounding.max) * 100}%`;

    // 3. Archetype Label
    const archMap = {
      'ECOMMERCE': 'Online-Shop / E-Commerce',
      'LOCAL_BUSINESS': 'Lokales Unternehmen / Handwerk',
      'B2B_SERVICE': 'B2B Dienstleister / Beratung',
      'PUBLISHER': 'Publisher / Magazin'
    };
    document.getElementById('detected-archetype').textContent = archMap[data.businessArchetype] || data.businessArchetype;

    // 4. Issues Radar
    const issuesContainer = document.getElementById('issues-radar-list');
    issuesContainer.innerHTML = '';
    
    if (data.issues && data.issues.length > 0) {
      data.issues.forEach(issue => {
        const item = document.createElement('div');
        const isErr = issue.severity === 'error';
        const isWarn = issue.severity === 'warning';
        const borderCls = isErr ? 'border-red-500/40 bg-red-500/5' : (isWarn ? 'border-amber-500/40 bg-amber-500/5' : 'border-blue-500/40 bg-blue-500/5');
        const iconCls = isErr ? 'text-red-500' : (isWarn ? 'text-amber-500' : 'text-blue-500');

        item.className = `p-3 rounded-xl border flex items-start gap-3 ${borderCls}`;
        item.innerHTML = `
          <div class="${iconCls} mt-0.5 shrink-0 font-bold">
            ${isErr ? '❌' : (isWarn ? '⚠️' : 'ℹ️')}
          </div>
          <div>
            <h4 class="text-sm font-bold text-dark dark:text-white mb-0.5">${issue.title}</h4>
            <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-0">${issue.desc}</p>
          </div>
        `;
        issuesContainer.appendChild(item);
      });
    } else {
      issuesContainer.innerHTML = `
        <div class="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
          <span>✅ Keine gravierenden Dateninseln gefunden. Dein Setup ist exzellent verknüpft!</span>
        </div>
      `;
    }

    // 5. Update Conversion Button URL (Direct handoff to generator)
    const btnFixAi = document.getElementById('btn-fix-with-ai');
    if (btnFixAi) {
      const dom = data.targetDomain || data.domain || '';
      btnFixAi.href = `/tools/entitaeten-graph-generator/?domain=${encodeURIComponent(dom)}&archetype=${encodeURIComponent(data.businessArchetype)}`;
    }

    // 6. Render SVG Graph
    renderVisualGraph();
  }

  // Toggle Ist vs Soll View
  if (toggleIstBtn && toggleSollBtn) {
    toggleIstBtn.addEventListener('click', () => {
      currentViewMode = 'ist';
      toggleIstBtn.className = 'px-3 py-1.5 text-xs font-bold rounded-lg bg-dark text-lime-accent shadow-sm transition-all cursor-pointer';
      toggleSollBtn.className = 'px-3 py-1.5 text-xs font-bold rounded-lg text-gray-500 hover:text-dark transition-all cursor-pointer';
      renderVisualGraph();
    });

    toggleSollBtn.addEventListener('click', () => {
      currentViewMode = 'soll';
      toggleSollBtn.className = 'px-3 py-1.5 text-xs font-bold rounded-lg bg-dark text-lime-accent shadow-sm transition-all cursor-pointer';
      toggleIstBtn.className = 'px-3 py-1.5 text-xs font-bold rounded-lg text-gray-500 hover:text-dark transition-all cursor-pointer';
      renderVisualGraph();
    });
  }

  function renderVisualGraph() {
    if (!currentAnalysisData) return;

    const svgEdges = document.getElementById('visual-svg-edges');
    const svgNodes = document.getElementById('visual-svg-nodes');
    svgEdges.innerHTML = '';
    svgNodes.innerHTML = '';

    // If Soll-Modus: synthesize an ideal connected setup
    let displayNodes = currentAnalysisData.nodes || [];
    let displayEdges = currentAnalysisData.edges || [];

    if (currentViewMode === 'soll') {
      displayNodes = [
        { id: "#person", label: "Autor / Inhaber", type: "Person", color: "#3b82f6", x: 80, y: 90, props: { hasOccupation: "ISCO-08", knowsLanguage: "sameAs Wikidata" } },
        { id: "#business", label: "Unternehmen / Brand", type: "Organization", color: "#a855f7", x: 80, y: 260, props: { slogan: "Verified", currenciesAccepted: "EUR" } },
        { id: "#website", label: "Zentrale WebSite", type: "WebSite", color: "#f59e0b", x: 260, y: 175, props: { inLanguage: "de-DE", hasPart: "Relational" } },
        { id: "#services", label: "Dienstleistungen", type: "Service / Product", color: "#10b981", x: 440, y: 90, props: { provider: "#business", areaServed: "DACH" } },
        { id: "#content", label: "Fachinhalte & Blog", type: "Article", color: "#10b981", x: 440, y: 260, props: { author: "#person", publisher: "#business", wordCount: "Dynamisch" } },
        { id: "#quotation", label: "E-E-A-T Zitat", type: "Quotation", color: "#84cc16", x: 620, y: 175, props: { creator: "#person", spokenBy: "#person" } }
      ];
      displayEdges = [
        { from: 0, to: 1, label: "founder", solid: true },
        { from: 0, to: 2, label: "author", solid: true },
        { from: 1, to: 2, label: "publisher", solid: true },
        { from: 2, to: 3, label: "hasPart", solid: true },
        { from: 2, to: 4, label: "hasPart", solid: true },
        { from: 4, to: 5, label: "hasPart", solid: true }
      ];
    }

    // Draw Edges
    displayEdges.forEach(edge => {
      const fromNode = displayNodes[edge.from];
      const toNode = displayNodes[edge.to];
      if (!fromNode || !toNode) return;

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", fromNode.x);
      line.setAttribute("y1", fromNode.y);
      line.setAttribute("x2", toNode.x);
      line.setAttribute("y2", toNode.y);
      line.setAttribute("stroke", edge.solid ? "rgba(16, 185, 129, 0.6)" : "rgba(239, 68, 68, 0.6)");
      line.setAttribute("stroke-width", edge.solid ? "2" : "1.5");
      if (!edge.solid) {
        line.setAttribute("stroke-dasharray", "5,5");
      }
      line.setAttribute("marker-end", edge.solid ? "url(#arrow-green)" : "url(#arrow-red)");
      svgEdges.appendChild(line);

      // Label
      const midX = (fromNode.x + toNode.x) / 2;
      const midY = (fromNode.y + toNode.y) / 2;
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", midX);
      text.setAttribute("y", midY - 4);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", edge.solid ? "#10b981" : "#ef4444");
      text.setAttribute("font-size", "9");
      text.setAttribute("font-family", "monospace");
      text.setAttribute("font-weight", "bold");
      text.textContent = edge.label;
      svgEdges.appendChild(text);
    });

    // Draw Nodes
    displayNodes.forEach((node, idx) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", "cursor-pointer transition-transform hover:scale-105");
      g.onclick = () => selectNodeInspector(idx, displayNodes);

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", node.x);
      circle.setAttribute("cy", node.y);
      circle.setAttribute("r", "20");
      circle.setAttribute("fill", node.color || "#3b82f6");
      circle.setAttribute("stroke", idx === selectedNodeIndex ? "#d9ff00" : "rgba(255,255,255,0.3)");
      circle.setAttribute("stroke-width", idx === selectedNodeIndex ? "3" : "1.5");

      const initials = document.createElementNS("http://www.w3.org/2000/svg", "text");
      initials.setAttribute("x", node.x);
      initials.setAttribute("y", node.y + 4);
      initials.setAttribute("text-anchor", "middle");
      initials.setAttribute("fill", "#ffffff");
      initials.setAttribute("font-size", "10");
      initials.setAttribute("font-weight", "bold");
      initials.textContent = (node.type || 'T').substring(0, 2).toUpperCase();

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", node.x);
      label.setAttribute("y", node.y + 34);
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("fill", "currentColor");
      label.setAttribute("font-size", "11");
      label.setAttribute("font-weight", "600");
      label.textContent = node.label.length > 18 ? node.label.substring(0, 16) + '…' : node.label;

      g.appendChild(circle);
      g.appendChild(initials);
      g.appendChild(label);
      svgNodes.appendChild(g);
    });

    selectNodeInspector(selectedNodeIndex, displayNodes);
  }

  function selectNodeInspector(index, nodes) {
    selectedNodeIndex = index;
    const node = nodes[index] || nodes[0];
    if (!node) return;

    document.getElementById('inspector-node-name').textContent = node.label;
    document.getElementById('inspector-node-type').textContent = node.type;
    document.getElementById('inspector-node-id').textContent = node.id || 'Keine @id Fragment-URI vorhanden (Dateninsel-Gefahr!)';

    const propsContainer = document.getElementById('inspector-props-list');
    propsContainer.innerHTML = '';

    if (node.props) {
      for (const [key, val] of Object.entries(node.props)) {
        const row = document.createElement('div');
        row.className = "flex flex-col sm:flex-row sm:items-center justify-between text-xs py-1 border-b border-gray-100 dark:border-gray-800 gap-1";
        const valStr = typeof val === 'object' ? JSON.stringify(val) : String(val);
        row.innerHTML = `<span class="font-mono font-bold text-lime-700 dark:text-lime-400">${key}:</span> <span class="text-gray-700 dark:text-gray-300 break-all">${valStr}</span>`;
        propsContainer.appendChild(row);
      }
    }
  }
});
