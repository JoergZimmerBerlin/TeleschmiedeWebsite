/**
 * Schema-Graph-Visualizer Client Engine
 * Teleschmiede (2026)
 * 
 * Deterministische Visualisierung, 3-Ebenen Entity-Scoring,
 * Vorher/Nachher-Morphismus und 1-Click-Demos.
 */

function initVisualizer() {
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

  // Globale Konfiguration für Schema-Typen (Semantische Icons, Typ-Badges, Farben)
  const TYPE_CONFIG = {
    'Person': { icon: '👤', label: 'PERSON', color: '#3b82f6' },
    'Physician': { icon: '🩺', label: 'ARZT', color: '#ec4899' },
    'Dentist': { icon: '🦷', label: 'ZAHNARZT', color: '#ec4899' },
    'Organization': { icon: '🏢', label: 'ORGANISATION', color: '#a855f7' },
    'LocalBusiness': { icon: '🏢', label: 'LOKALER BETRIEB', color: '#a855f7' },
    'ProfessionalService': { icon: '💼', label: 'BERATUNG / AGENTUR', color: '#a855f7' },
    'Corporation': { icon: '🏢', label: 'KONZERN', color: '#a855f7' },
    'MedicalBusiness': { icon: '🏥', label: 'PRAXIS', color: '#ec4899' },
    'FoodEstablishment': { icon: '🍽️', label: 'GASTRONOMIE', color: '#f97316' },
    'Restaurant': { icon: '🍽️', label: 'RESTAURANT', color: '#f97316' },
    'LodgingBusiness': { icon: '🏨', label: 'HOTEL', color: '#f97316' },
    'EducationalOrganization': { icon: '🎓', label: 'BILDUNGSTRÄGER', color: '#6366f1' },
    'Course': { icon: '📚', label: 'KURS / LEHRGANG', color: '#6366f1' },
    'NGO': { icon: '🤝', label: 'VEREIN / NGO', color: '#14b8a6' },
    'Nonprofit501cOrganization': { icon: '🤝', label: 'GEMEINNÜTZIG', color: '#14b8a6' },
    'GovernmentOrganization': { icon: '🏛️', label: 'BEHÖRDE', color: '#64748b' },
    'GovernmentService': { icon: '🏛️', label: 'BÜRGERSERVICE', color: '#10b981' },
    'WebSite': { icon: '🌐', label: 'WEBSITE', color: '#f59e0b' },
    'WebPage': { icon: '📄', label: 'WEBPAGE', color: '#f59e0b' },
    'ItemPage': { icon: '📄', label: 'UNTERSEITE', color: '#f59e0b' },
    'AboutPage': { icon: 'ℹ️', label: 'ÜBER UNS', color: '#f59e0b' },
    'ContactPage': { icon: '📞', label: 'KONTAKT', color: '#f59e0b' },
    'Product': { icon: '📦', label: 'PRODUKT', color: '#10b981' },
    'OnlineStore': { icon: '🛒', label: 'ONLINE-SHOP', color: '#10b981' },
    'Service': { icon: '⚙️', label: 'SERVICE', color: '#10b981' },
    'Offer': { icon: '🏷️', label: 'PREISANGEBOT', color: '#10b981' },
    'OfferCatalog': { icon: '📋', label: 'KATALOG', color: '#10b981' },
    'MerchantReturnPolicy': { icon: '↩️', label: 'RÜCKGABE', color: '#84cc16' },
    'AggregateRating': { icon: '⭐', label: 'BEWERTUNG', color: '#84cc16' },
    'Review': { icon: '⭐', label: 'REVIEW', color: '#84cc16' },
    'OpeningHoursSpecification': { icon: '🕒', label: 'ÖFFNUNGSZEIT', color: '#84cc16' },
    'ContactPoint': { icon: '📞', label: 'KONTAKT', color: '#84cc16' },
    'Article': { icon: '📝', label: 'ARTIKEL', color: '#10b981' },
    'NewsArticle': { icon: '📰', label: 'NEWS', color: '#10b981' },
    'BlogPosting': { icon: '✍️', label: 'BLOGPOST', color: '#10b981' },
    'Blog': { icon: '✍️', label: 'BLOG', color: '#f59e0b' },
    'SoftwareApplication': { icon: '💻', label: 'SOFTWARE', color: '#06b6d4' },
    'WebAPI': { icon: '🔌', label: 'API DOKU', color: '#84cc16' },
    'DefinedTermSet': { icon: '📖', label: 'GLOSSAR', color: '#84cc16' },
    'DefinedTerm': { icon: '🏷️', label: 'BEGRIFF', color: '#84cc16' },
    'Quotation': { icon: '💬', label: 'EEAT ZITAT', color: '#84cc16' },
    'SpeakableSpecification': { icon: '🔊', label: 'VOICE / AUDIO', color: '#06b6d4' },
    'Event': { icon: '📅', label: 'EVENT', color: '#ec4899' },
    'BreadcrumbList': { icon: '🧭', label: 'BREADCRUMBS', color: '#6366f1' },
    'FAQPage': { icon: '❓', label: 'FAQ', color: '#06b6d4' },
    'Question': { icon: '❓', label: 'FRAGE', color: '#06b6d4' },
    'PostalAddress': { icon: '📍', label: 'ADRESSE', color: '#84cc16' },
    'GeoCoordinates': { icon: '📍', label: 'GEO-KOORDINATEN', color: '#84cc16' },
    'Project': { icon: '🚀', label: 'PROJEKT', color: '#84cc16' }
  };

  function getNodeConfig(type) {
    if (!type) return { icon: '🏷️', label: 'THING', color: '#3b82f6' };
    const cleanType = type.split('/')[0].trim();
    return TYPE_CONFIG[cleanType] || {
      icon: '🏷️',
      label: cleanType.toUpperCase().substring(0, 12),
      color: '#3b82f6'
    };
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
        { id: "https://teleschmie.de/#person", label: "Jörg Zimmer", type: "Person", color: "#3b82f6", icon: "👤", x: 100, y: 125, isConnected: true, props: { hasOccupation: "2431 (Senior Consultant)", knowsLanguage: "de (Q188), en (Q1860)" } },
        { id: "https://teleschmie.de/#localbusiness", label: "Jörg Zimmer (Business)", type: "Organization", color: "#a855f7", icon: "🏢", x: 100, y: 285, isConnected: true, props: { slogan: "Berliner Klartext", currenciesAccepted: "EUR" } },
        { id: "https://teleschmie.de/#website", label: "teleschmie.de", type: "WebSite", color: "#f59e0b", icon: "🌐", x: 290, y: 205, isConnected: true, props: { inLanguage: "de-DE" } },
        { id: "https://teleschmie.de/glossar/#termset", label: "Glossar Lexicon", type: "DefinedTermSet", color: "#84cc16", icon: "📖", x: 490, y: 125, isConnected: true, props: { inLanguage: "de-DE" } },
        { id: "https://teleschmie.de/blog/#blog", label: "SEO & AI Blog", type: "Blog", color: "#f59e0b", icon: "✍️", x: 490, y: 285, isConnected: true, props: { inLanguage: "de-DE" } },
        { id: "https://teleschmie.de/tools/#software", label: "KI Tools Suite", type: "SoftwareApplication", color: "#06b6d4", icon: "💻", x: 645, y: 205, isConnected: true, props: { version: "2.0", offers: "0 EUR" } }
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
        { id: "_b1", label: "Shop Organization", type: "Organization", color: "#a855f7", icon: "🏢", x: 100, y: 125, isConnected: false, props: { name: "Mode Lifestyle GmbH", missing: "Keine @id Fragment-URI" } },
        { id: "_b2", label: "WebSite Root", type: "WebSite", color: "#f59e0b", icon: "🌐", x: 100, y: 285, isConnected: false, props: { url: "https://mode-lifestyle-store.de", missing: "Kein publisher-Verweis" } },
        { id: "_b3", label: "Produkt A (Sneaker)", type: "Product", color: "#10b981", icon: "📦", x: 490, y: 125, isConnected: false, props: { price: "89.95", missing: "Isolierter Block (Insel)" } },
        { id: "_b4", label: "Produkt B (Jacke)", type: "Product", color: "#10b981", icon: "📦", x: 490, y: 285, isConnected: false, props: { price: "129.00", missing: "Kein @id-Link zum Store" } }
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
        { id: "_h1", label: "Hans Schmidt (Meister)", type: "Person", color: "#3b82f6", icon: "👤", x: 100, y: 125, isConnected: false, props: { name: "Hans Schmidt", jobTitle: "Dachdeckermeister" } },
        { id: "_h2", label: "Schmidt Bedachungen", type: "LocalBusiness", color: "#a855f7", icon: "🏢", x: 100, y: 285, isConnected: false, props: { address: "Berlin", missing: "founder Link fehlt" } },
        { id: "_h3", label: "Dachsanierung", type: "Service", color: "#10b981", icon: "⚙️", x: 490, y: 205, isConnected: false, props: { serviceType: "Dacharbeiten", missing: "Kein provider-Link" } }
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
        { id: "_b1", label: "Cloud Analytics Inc.", type: "Organization", color: "#a855f7", icon: "🏢", x: 100, y: 125, isConnected: false, props: { name: "Cloud Analytics", url: "cloud-saas-analytics.io" } },
        { id: "_b2", label: "WebSite", type: "WebSite", color: "#f59e0b", icon: "🌐", x: 100, y: 285, isConnected: false, props: { name: "Cloud Analytics" } },
        { id: "_b3", label: "Case Study Whitepaper", type: "Article", color: "#10b981", icon: "📝", x: 490, y: 205, isConnected: false, props: { headline: "ROI von Analytics 2026", author: "Nur String (keine @id)" } }
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

    // 3. Archetype Label (Vollwertige 12-Schienen Matrix)
    const archMap = {
      'FREELANCER_COACH': 'Schiene 1: Freiberufler, Coach & Personal Brand',
      'LOCAL_CRAFT': 'Schiene 2: Handwerk, Meisterbetrieb & Lokales Gewerbe',
      'B2B_SERVICE': 'Schiene 3: B2B Dienstleister, Beratung & Agentur',
      'ECOMMERCE': 'Schiene 4: Online-Shop & Produkthersteller',
      'TECH_SAAS': 'Schiene 5: SaaS & Tech-Plattform',
      'CORPORATE_ORG': 'Schiene 6: Mittelstand, Industrie & Konzern',
      'PUBLISHER': 'Schiene 7: Publisher, Verlag & Fachmedium',
      'HEALTHCARE': 'Schiene 8: Praxis, Arzt & Gesundheitswesen',
      'HOSPITALITY': 'Schiene 9: Gastronomie, Hotel & Erlebnis',
      'EDUCATION': 'Schiene 10: Bildungsträger, Akademie & Institut',
      'NGO_NONPROFIT': 'Schiene 11: Gemeinnütziger Träger, Verein & NGO',
      'GOVERNMENT': 'Schiene 12: Behörde & Öffentliche Körperschaft',
      // Abwärtskompatible Aliase:
      'LOCAL_BUSINESS': 'Schiene 2: Handwerk, Meisterbetrieb & Lokales Gewerbe',
      'COACH_EXPERT': 'Schiene 1: Freiberufler, Coach & Personal Brand'
    };
    const currentArch = data.businessArchetype || data.detectedBusiness || 'B2B_SERVICE';
    const archLabel = archMap[currentArch] || currentArch;
    const archElem = document.getElementById('detected-archetype');
    if (archElem) {
      archElem.textContent = archLabel;
    }

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
      btnFixAi.href = `/tools/entitaeten-graph-generator/?domain=${encodeURIComponent(dom)}&archetype=${encodeURIComponent(currentArch)}`;
    }

    // Client-seitige Fallback-Synthese für Nodes & Edges, falls das Backend nur Rohentitäten liefert
    if ((!data.nodes || data.nodes.length === 0) && data.discoveredEntities && data.discoveredEntities.length > 0) {
      const coords = [
        { x: 100, y: 125 },
        { x: 100, y: 285 },
        { x: 290, y: 205 },
        { x: 490, y: 125 },
        { x: 490, y: 285 },
        { x: 645, y: 205 }
      ];
      data.nodes = data.discoveredEntities.slice(0, 6).map((ent, idx) => {
        const col = idx % 3;
        const row = Math.floor(idx / 3);
        const t = ent.type || 'Thing';
        const cfg = getNodeConfig(t);
        return {
          id: ent.id || `_node_${idx}`,
          label: (ent.name || t).substring(0, 20),
          type: t,
          icon: cfg.icon,
          color: cfg.color,
          x: coords[idx]?.x || (100 + col * 240),
          y: coords[idx]?.y || (125 + row * 150),
          isConnected: !!data.stats?.hasGraphContainer,
          props: ent.properties ? Object.fromEntries(ent.properties.map(p => [p, '✓ Vorhanden'])) : {}
        };
      });
      data.edges = [];
      if (data.nodes.length > 1) {
        for (let i = 0; i < data.nodes.length - 1; i++) {
          data.edges.push({
            from: i,
            to: i + 1,
            label: data.stats?.hasGraphContainer ? 'verknüpft' : 'isoliert',
            solid: !!data.stats?.hasGraphContainer
          });
        }
      }
    }

    // 6. Render SVG Graph
    renderVisualGraph();
  }

  // Dynamischer Soll-Zustand für alle 12 Schienen
  function getSollGraphForArchetype(arch) {
    switch (arch) {
      case 'ECOMMERCE':
        return {
          nodes: [
            { id: "#store", label: "OnlineStore", type: "OnlineStore", color: "#a855f7", x: 100, y: 205, props: { hasMerchantReturnPolicy: "applicableCountry: DE", currenciesAccepted: "EUR" } },
            { id: "#website", label: "Shop WebSite", type: "WebSite", color: "#f59e0b", x: 290, y: 205, props: { inLanguage: "de-DE", potentialAction: "SearchAction" } },
            { id: "#product", label: "Hauptprodukt", type: "Product", color: "#10b981", x: 490, y: 125, props: { brand: "Verifiziert", category: "Hardware/Fashion" } },
            { id: "#offer", label: "Preisangebot", type: "Offer", color: "#10b981", x: 490, y: 285, props: { price: "49.95", priceCurrency: "EUR", availability: "InStock" } },
            { id: "#returns", label: "Rückgaberichtlinie", type: "MerchantReturnPolicy", color: "#84cc16", x: 645, y: 125, props: { merchantReturnDays: 30, returnPolicyCategory: "FullRefund" } },
            { id: "#rating", label: "Produkt-Reviews", type: "AggregateRating", color: "#84cc16", x: 645, y: 285, props: { ratingValue: "4.9", reviewCount: "128" } }
          ],
          edges: [
            { from: 0, to: 1, label: "publisher", solid: true },
            { from: 1, to: 2, label: "hasPart", solid: true },
            { from: 2, to: 3, label: "offers", solid: true },
            { from: 3, to: 4, label: "hasMerchantReturnPolicy", solid: true },
            { from: 2, to: 5, label: "aggregateRating", solid: true }
          ]
        };

      case 'LOCAL_CRAFT':
      case 'LOCAL_BUSINESS':
        return {
          nodes: [
            { id: "#person", label: "Meister / Inhaber", type: "Person", color: "#3b82f6", x: 100, y: 125, props: { jobTitle: "Handwerksmeister", hasCredential: "Meisterbrief" } },
            { id: "#business", label: "Meisterbetrieb", type: "LocalBusiness", color: "#a855f7", x: 100, y: 285, props: { identifier: "HWK-Betriebsnummer", paymentAccepted: "Rechnung, EC", address: "Kanonisch", geo: "GeoCoordinates" } },
            { id: "#website", label: "Betriebs-WebSite", type: "WebSite", color: "#f59e0b", x: 290, y: 205, props: { inLanguage: "de-DE", areaServed: "Regional / 50km" } },
            { id: "#service", label: "Fachleistung / Montage", type: "Service", color: "#10b981", x: 490, y: 125, props: { provider: "#business", serviceType: "Vor-Ort-Service" } },
            { id: "#hours", label: "Öffnungszeiten", type: "OpeningHoursSpecification", color: "#84cc16", x: 490, y: 285, props: { dayOfWeek: "Mo-Fr", opens: "08:00", closes: "17:00" } },
            { id: "#review", label: "Kundenbewertung", type: "Review", color: "#84cc16", x: 645, y: 205, props: { itemReviewed: "#business", ratingValue: "5.0" } }
          ],
          edges: [
            { from: 0, to: 1, label: "founder", solid: true },
            { from: 0, to: 2, label: "author", solid: true },
            { from: 1, to: 2, label: "publisher", solid: true },
            { from: 2, to: 3, label: "hasPart", solid: true },
            { from: 1, to: 4, label: "openingHoursSpecification", solid: true },
            { from: 1, to: 5, label: "review", solid: true }
          ]
        };

      case 'TECH_SAAS':
        return {
          nodes: [
            { id: "#org", label: "Software-Unternehmen", type: "Organization", color: "#a855f7", x: 100, y: 205, props: { legalName: "Software GmbH / AG", sameAs: "Wikidata Q-ID" } },
            { id: "#website", label: "Plattform-WebSite", type: "WebSite", color: "#f59e0b", x: 290, y: 205, props: { inLanguage: "de-DE, en" } },
            { id: "#software", label: "SaaS Application", type: "SoftwareApplication", color: "#06b6d4", x: 490, y: 125, props: { applicationCategory: "BusinessApplication", operatingSystem: "Cloud" } },
            { id: "#pricing", label: "Preismodelle / Plans", type: "Offer", color: "#10b981", x: 490, y: 285, props: { priceCurrency: "EUR", billingDuration: "P1M" } },
            { id: "#features", label: "Feature-Katalog & Doku", type: "WebAPI", color: "#84cc16", x: 645, y: 125, props: { documentation: "API Reference", version: "2.0" } },
            { id: "#review", label: "Nutzer-Rating", type: "AggregateRating", color: "#84cc16", x: 645, y: 285, props: { ratingValue: "4.8", ratingCount: "350" } }
          ],
          edges: [
            { from: 0, to: 1, label: "publisher", solid: true },
            { from: 1, to: 2, label: "hasPart", solid: true },
            { from: 2, to: 3, label: "offers", solid: true },
            { from: 2, to: 4, label: "hasPart", solid: true },
            { from: 2, to: 5, label: "aggregateRating", solid: true }
          ]
        };

      case 'HEALTHCARE':
        return {
          nodes: [
            { id: "#doctor", label: "Facharzt / Leitung", type: "Physician", color: "#ec4899", x: 100, y: 125, props: { medicalSpecialty: "Fachgebiet / Behandlungen", alumniOf: "Universität" } },
            { id: "#clinic", label: "Praxis / Zentrum", type: "MedicalBusiness", color: "#a855f7", x: 100, y: 285, props: { address: "Praxisadresse", geo: "GeoCoordinates validiert" } },
            { id: "#website", label: "Praxis-WebSite", type: "WebSite", color: "#f59e0b", x: 290, y: 205, props: { inLanguage: "de-DE" } },
            { id: "#specialty", label: "Fachleistungsspektrum", type: "MedicalSpecialty", color: "#ec4899", x: 490, y: 125, props: { availableService: "Kassen- & Privatleistung" } },
            { id: "#hours", label: "Sprechzeiten", type: "OpeningHoursSpecification", color: "#84cc16", x: 490, y: 285, props: { dayOfWeek: "Mo-Fr", opens: "08:00", closes: "18:00" } },
            { id: "#contact", label: "Terminvergabe", type: "ContactPoint", color: "#84cc16", x: 645, y: 205, props: { contactType: "Terminvereinbarung", telephone: "Praxisnummer" } }
          ],
          edges: [
            { from: 0, to: 1, label: "founder", solid: true },
            { from: 1, to: 2, label: "publisher", solid: true },
            { from: 2, to: 3, label: "hasPart", solid: true },
            { from: 1, to: 4, label: "openingHoursSpecification", solid: true },
            { from: 1, to: 5, label: "contactPoint", solid: true }
          ]
        };

      case 'HOSPITALITY':
        return {
          nodes: [
            { id: "#chef", label: "Gastronom / Inhaber", type: "Person", color: "#3b82f6", x: 100, y: 125, props: { jobTitle: "Küchenchef / Inhaber" } },
            { id: "#restaurant", label: "Restaurant / Gasthaus", type: "Restaurant", color: "#f97316", x: 100, y: 285, props: { servesCuisine: "Regional / International", geo: "GeoCoordinates" } },
            { id: "#website", label: "Gastro-WebSite", type: "WebSite", color: "#f59e0b", x: 290, y: 205, props: { inLanguage: "de-DE" } },
            { id: "#menu", label: "Speisekarte", type: "Menu", color: "#f97316", x: 490, y: 125, props: { hasMenuItem: "Saisonale Gerichte" } },
            { id: "#hours", label: "Tischzeiten", type: "OpeningHoursSpecification", color: "#84cc16", x: 490, y: 285, props: { dayOfWeek: "Di-So", opens: "12:00", closes: "23:00" } },
            { id: "#reserve", label: "Tisch-Reservierung", type: "ReserveAction", color: "#84cc16", x: 645, y: 205, props: { target: "Online-Reservierung" } }
          ],
          edges: [
            { from: 0, to: 1, label: "founder", solid: true },
            { from: 1, to: 2, label: "publisher", solid: true },
            { from: 1, to: 3, label: "hasMenu", solid: true },
            { from: 1, to: 4, label: "openingHoursSpecification", solid: true },
            { from: 2, to: 5, label: "potentialAction", solid: true }
          ]
        };

      case 'EDUCATION':
        return {
          nodes: [
            { id: "#academy", label: "Akademie / Institut", type: "EducationalOrganization", color: "#6366f1", x: 100, y: 205, props: { legalName: "Staatlich anerkannt", sameAs: "Wikidata" } },
            { id: "#website", label: "Campus-WebSite", type: "WebSite", color: "#f59e0b", x: 290, y: 205, props: { inLanguage: "de-DE" } },
            { id: "#course", label: "Zertifikatslehrgang", type: "Course", color: "#6366f1", x: 490, y: 125, props: { courseCode: "CERT-2026", educationalLevel: "Fachausbildung" } },
            { id: "#credential", label: "Abschluss-Zertifikat", type: "EducationalOccupationalCredential", color: "#84cc16", x: 490, y: 285, props: { credentialCategory: "Zertifikat" } },
            { id: "#faculty", label: "Dozent / Fachleitung", type: "Person", color: "#3b82f6", x: 645, y: 125, props: { jobTitle: "Dozent", alumniOf: "Universität" } },
            { id: "#offer", label: "Studiengebühren", type: "Offer", color: "#10b981", x: 645, y: 285, props: { priceCurrency: "EUR", price: "Gebühr" } }
          ],
          edges: [
            { from: 0, to: 1, label: "publisher", solid: true },
            { from: 1, to: 2, label: "hasPart", solid: true },
            { from: 2, to: 3, label: "educationalCredentialAwarded", solid: true },
            { from: 2, to: 4, label: "instructor", solid: true },
            { from: 2, to: 5, label: "offers", solid: true }
          ]
        };

      case 'CORPORATE_ORG':
        return {
          nodes: [
            { id: "#holding", label: "Mutterkonzern (AG/SE)", type: "Corporation", color: "#a855f7", x: 100, y: 125, props: { identifier: "HRB 123456", numberOfEmployees: "500+" } },
            { id: "#subsidiary", label: "Tochtergesellschaft", type: "Organization", color: "#a855f7", x: 100, y: 285, props: { parentOrganization: "#holding" } },
            { id: "#website", label: "Corporate Portal", type: "WebSite", color: "#f59e0b", x: 290, y: 205, props: { inLanguage: "de-DE, en" } },
            { id: "#about", label: "Über den Konzern", type: "AboutPage", color: "#f59e0b", x: 490, y: 125, props: { about: "#holding", dateCreated: "1985" } },
            { id: "#press", label: "Investor Relations", type: "ContactPoint", color: "#84cc16", x: 490, y: 285, props: { contactType: "Press & IR", email: "ir@holding.com" } },
            { id: "#division", label: "Produktsparte / Werk", type: "Organization", color: "#a855f7", x: 645, y: 205, props: { department: "#holding" } }
          ],
          edges: [
            { from: 0, to: 1, label: "subOrganization", solid: true },
            { from: 0, to: 2, label: "publisher", solid: true },
            { from: 2, to: 3, label: "hasPart", solid: true },
            { from: 0, to: 4, label: "contactPoint", solid: true },
            { from: 0, to: 5, label: "department", solid: true }
          ]
        };

      case 'PUBLISHER':
        return {
          nodes: [
            { id: "#publisher", label: "Verlag / Medienhaus", type: "NewsMediaOrganization", color: "#a855f7", x: 100, y: 205, props: { legalName: "Medien GmbH", sameAs: "Wikidata" } },
            { id: "#website", label: "News-WebSite", type: "WebSite", color: "#f59e0b", x: 290, y: 205, props: { inLanguage: "de-DE" } },
            { id: "#article", label: "Leitartikel / News", type: "NewsArticle", color: "#10b981", x: 490, y: 125, props: { headline: "Exklusiver Fachreport 2026", datePublished: "ISO-8601" } },
            { id: "#author", label: "Redakteur / Journalist", type: "Person", color: "#3b82f6", x: 490, y: 285, props: { jobTitle: "Chef-Redakteur", knowsAbout: "Recherche" } },
            { id: "#speakable", label: "Voice / Audio Snippet", type: "SpeakableSpecification", color: "#06b6d4", x: 645, y: 125, props: { cssSelector: ["h1", ".lead-paragraph"] } },
            { id: "#ressort", label: "Themen-Ressort", type: "DefinedTermSet", color: "#84cc16", x: 645, y: 285, props: { name: "Wirtschaft & Tech" } }
          ],
          edges: [
            { from: 0, to: 1, label: "publisher", solid: true },
            { from: 1, to: 2, label: "hasPart", solid: true },
            { from: 2, to: 3, label: "author", solid: true },
            { from: 2, to: 4, label: "speakable", solid: true },
            { from: 1, to: 5, label: "hasPart", solid: true }
          ]
        };

      case 'NGO_NONPROFIT':
        return {
          nodes: [
            { id: "#ngo", label: "Gemeinnütziger Verein", type: "NGO", color: "#14b8a6", x: 100, y: 205, props: { identifier: "VR Vereinsregister", nonprofitStatus: "Gemeinnützig" } },
            { id: "#website", label: "Vereins-WebSite", type: "WebSite", color: "#f59e0b", x: 290, y: 205, props: { inLanguage: "de-DE" } },
            { id: "#donate", label: "Spenden-Aktion", type: "DonateAction", color: "#10b981", x: 490, y: 125, props: { recipient: "#ngo", priceCurrency: "EUR" } },
            { id: "#chair", label: "Vorstandsvorsitz", type: "Person", color: "#3b82f6", x: 490, y: 285, props: { jobTitle: "Vorstand", worksFor: "#ngo" } },
            { id: "#transparenz", label: "Satzung & Transparenz", type: "AboutPage", color: "#f59e0b", x: 645, y: 125, props: { about: "#ngo" } },
            { id: "#project", label: "Förderprojekt", type: "Project", color: "#84cc16", x: 645, y: 285, props: { sponsor: "#ngo" } }
          ],
          edges: [
            { from: 0, to: 1, label: "publisher", solid: true },
            { from: 1, to: 2, label: "potentialAction", solid: true },
            { from: 3, to: 0, label: "memberOf", solid: true },
            { from: 1, to: 4, label: "hasPart", solid: true },
            { from: 0, to: 5, label: "sponsor", solid: true }
          ]
        };

      case 'GOVERNMENT':
        return {
          nodes: [
            { id: "#authority", label: "Behörde / Amt", type: "GovernmentOrganization", color: "#64748b", x: 100, y: 205, props: { areaServed: "Bundesland / Landkreis" } },
            { id: "#website", label: "Bürgerportal", type: "WebSite", color: "#f59e0b", x: 290, y: 205, props: { inLanguage: "de-DE" } },
            { id: "#service", label: "Bürgerservice", type: "GovernmentService", color: "#10b981", x: 490, y: 125, props: { provider: "#authority", serviceType: "Amtliche Dienstleistung" } },
            { id: "#office", label: "Amtsgebäude / Dienststelle", type: "PostalAddress", color: "#84cc16", x: 490, y: 285, props: { streetAddress: "Amtsstraße", postalCode: "10115" } },
            { id: "#contact", label: "Bürgertelefon", type: "ContactPoint", color: "#84cc16", x: 645, y: 125, props: { contactType: "Bürgerservice", telephone: "115" } },
            { id: "#hours", label: "Amtszeiten", type: "OpeningHoursSpecification", color: "#84cc16", x: 645, y: 285, props: { dayOfWeek: "Mo-Fr", opens: "08:00", closes: "16:00" } }
          ],
          edges: [
            { from: 0, to: 1, label: "publisher", solid: true },
            { from: 1, to: 2, label: "hasPart", solid: true },
            { from: 0, to: 3, label: "address", solid: true },
            { from: 0, to: 4, label: "contactPoint", solid: true },
            { from: 0, to: 5, label: "openingHoursSpecification", solid: true }
          ]
        };

      case 'FREELANCER_COACH':
      case 'COACH_EXPERT':
        return {
          nodes: [
            { id: "#person", label: "Coach / Experte", type: "Person", color: "#3b82f6", x: 100, y: 125, props: { hasOccupation: "ISCO-08 Berufsfeld", knowsLanguage: "de, en", sameAs: "LinkedIn / Wikidata" } },
            { id: "#brand", label: "Personal Brand / Studio", type: "Organization", color: "#a855f7", x: 100, y: 285, props: { slogan: "Transformatives Coaching", legalName: "Bürgerlicher Name" } },
            { id: "#website", label: "Experten-WebSite", type: "WebSite", color: "#f59e0b", x: 290, y: 205, props: { inLanguage: "de-DE" } },
            { id: "#service", label: "1:1 Coaching / Mentoring", type: "Service", color: "#10b981", x: 490, y: 125, props: { provider: "#brand", areaServed: "DACH" } },
            { id: "#quote", label: "E-E-A-T Experten-Zitat", type: "Quotation", color: "#84cc16", x: 490, y: 285, props: { creator: "#person", spokenBy: "#person" } },
            { id: "#credential", label: "Vita & Qualifikationen", type: "EducationalOccupationalCredential", color: "#84cc16", x: 645, y: 205, props: { credentialCategory: "Master / Zertifikat" } }
          ],
          edges: [
            { from: 0, to: 1, label: "founder", solid: true },
            { from: 0, to: 2, label: "author", solid: true },
            { from: 1, to: 2, label: "publisher", solid: true },
            { from: 2, to: 3, label: "hasPart", solid: true },
            { from: 3, to: 4, label: "hasPart", solid: true },
            { from: 0, to: 5, label: "hasCredential", solid: true }
          ]
        };

      default: // B2B_SERVICE (Dienstleister, Kanzleien, Beratungen wie Teleschmiede)
        return {
          nodes: [
            { id: "#person", label: "Experte / Consultant", type: "Person", color: "#3b82f6", x: 100, y: 125, props: { hasOccupation: "ISCO-08 (Senior Consultant)", knowsLanguage: "de (Q188), en (Q1860)" } },
            { id: "#business", label: "B2B Beratung / Agentur", type: "ProfessionalService", color: "#a855f7", x: 100, y: 285, props: { slogan: "Verified Expertise", currenciesAccepted: "EUR", vatID: "DE..." } },
            { id: "#website", label: "Zentrale WebSite", type: "WebSite", color: "#f59e0b", x: 290, y: 205, props: { inLanguage: "de-DE", hasPart: "Relational" } },
            { id: "#services", label: "B2B Dienstleistungen", type: "Service", color: "#10b981", x: 490, y: 125, props: { provider: "#business", areaServed: "DACH" } },
            { id: "#content", label: "Fachpublikation & Case Studies", type: "Article", color: "#10b981", x: 490, y: 285, props: { author: "#person", publisher: "#business", wordCount: "Dynamisch" } },
            { id: "#quotation", label: "E-E-A-T Zitat (O-Ton)", type: "Quotation", color: "#84cc16", x: 645, y: 205, props: { creator: "#person", spokenBy: "#person" } }
          ],
          edges: [
            { from: 0, to: 1, label: "founder", solid: true },
            { from: 0, to: 2, label: "author", solid: true },
            { from: 1, to: 2, label: "publisher", solid: true },
            { from: 2, to: 3, label: "hasPart", solid: true },
            { from: 2, to: 4, label: "hasPart", solid: true },
            { from: 4, to: 5, label: "hasPart", solid: true }
          ]
        };
    }
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

    const svgZones = document.getElementById('visual-svg-zones');
    const svgEdges = document.getElementById('visual-svg-edges');
    const svgNodes = document.getElementById('visual-svg-nodes');
    if (svgZones) svgZones.innerHTML = '';
    if (svgEdges) svgEdges.innerHTML = '';
    if (svgNodes) svgNodes.innerHTML = '';

    // If Soll-Modus: synthesize an ideal connected setup for the specific archetype
    let displayNodes = currentAnalysisData.nodes || [];
    let displayEdges = currentAnalysisData.edges || [];

    if (currentViewMode === 'soll') {
      const curArch = currentAnalysisData.businessArchetype || currentAnalysisData.detectedBusiness || 'B2B_SERVICE';
      const sollData = getSollGraphForArchetype(curArch);
      displayNodes = sollData.nodes;
      displayEdges = sollData.edges;
    }

    // Leerer Graph: Keine Entitäten gefunden
    if (displayNodes.length === 0) {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      
      const icon = document.createElementNS("http://www.w3.org/2000/svg", "text");
      icon.setAttribute("x", "370");
      icon.setAttribute("y", "170");
      icon.setAttribute("text-anchor", "middle");
      icon.setAttribute("font-size", "36");
      icon.textContent = "🔍";
      
      const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
      title.setAttribute("x", "370");
      title.setAttribute("y", "215");
      title.setAttribute("text-anchor", "middle");
      title.setAttribute("fill", "#ffffff");
      title.setAttribute("font-size", "15");
      title.setAttribute("font-weight", "bold");
      title.textContent = "Kein Schema.org JSON-LD Markup auf den gescannten Seiten gefunden";

      const sub = document.createElementNS("http://www.w3.org/2000/svg", "text");
      sub.setAttribute("x", "370");
      sub.setAttribute("y", "245");
      sub.setAttribute("text-anchor", "middle");
      sub.setAttribute("fill", "#94a3b8");
      sub.setAttribute("font-size", "12");
      sub.textContent = "Google & KI-Suchmaschinen können deine Entitäten nicht maschinenlesbar verknüpfen.";

      g.appendChild(icon);
      g.appendChild(title);
      g.appendChild(sub);
      svgNodes.appendChild(g);

      document.getElementById('inspector-node-name').textContent = "Keine Entitäten vorhanden";
      document.getElementById('inspector-node-type').textContent = "0 Entitäten";
      document.getElementById('inspector-node-id').textContent = "Kein Schema.org Markup erkannt";
      document.getElementById('inspector-props-list').innerHTML = `
        <div class="p-3 text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-xl border border-amber-500/20">
          ⚠️ Auf dieser Domain wurden keine strukturierten Daten gefunden. Nutze unten den <strong>Entitäten Graph Generator</strong>, um einen vollständigen Wissensgraphen für dein CMS zu erzeugen.
        </div>
      `;
      return;
    }

    // Ermittle alle verbundenen Knoten (Solid Links)
    const connectedNodeIndices = new Set();
    displayEdges.forEach(edge => {
      if (edge.solid) {
        connectedNodeIndices.add(edge.from);
        connectedNodeIndices.add(edge.to);
      }
    });

    const hasIslands = displayNodes.some((_, idx) => !connectedNodeIndices.has(idx)) && currentViewMode === 'ist';

    // 1. Render Background Zones
    if (svgZones) {
      if (hasIslands) {
        const panelConnected = document.createElementNS("http://www.w3.org/2000/svg", "g");
        panelConnected.innerHTML = `
          <rect x="15" y="45" width="375" height="340" rx="16" fill="rgba(16, 185, 129, 0.04)" stroke="rgba(16, 185, 129, 0.25)" stroke-width="1.2" />
          <text x="32" y="70" fill="#34d399" font-size="10.5" font-weight="800" letter-spacing="1">✓ VERNETZTER GRAPH (@graph)</text>
        `;
        svgZones.appendChild(panelConnected);

        const panelIslands = document.createElementNS("http://www.w3.org/2000/svg", "g");
        panelIslands.innerHTML = `
          <rect x="405" y="45" width="320" height="340" rx="16" fill="rgba(239, 68, 68, 0.04)" stroke="rgba(239, 68, 68, 0.3)" stroke-width="1.2" stroke-dasharray="6,4" />
          <text x="422" y="70" fill="#f87171" font-size="10.5" font-weight="800" letter-spacing="1">⚠️ ISOLIERTE DATENINSELN (Unverbunden)</text>
        `;
        svgZones.appendChild(panelIslands);
      } else {
        const panelFull = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const headerTxt = currentViewMode === 'soll' 
          ? "✨ 2026 MASTER-GRAPH (Vollständig relational vernetzt)" 
          : "✓ VOLLSTÄNDIG VERNETZTER KNOWLEDGE GRAPH (Keine Dateninseln)";
        panelFull.innerHTML = `
          <rect x="15" y="45" width="710" height="340" rx="16" fill="rgba(16, 185, 129, 0.04)" stroke="rgba(16, 185, 129, 0.25)" stroke-width="1.2" />
          <text x="32" y="70" fill="#34d399" font-size="10.5" font-weight="800" letter-spacing="1">${headerTxt}</text>
        `;
        svgZones.appendChild(panelFull);
      }
    }

    // 2. Draw Edges with Badges
    displayEdges.forEach(edge => {
      const fromNode = displayNodes[edge.from];
      const toNode = displayNodes[edge.to];
      if (!fromNode || !toNode) return;

      const dx = toNode.x - fromNode.x;
      const dy = toNode.y - fromNode.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const r = 26;
      const x1 = fromNode.x + (dx / dist) * r;
      const y1 = fromNode.y + (dy / dist) * r;
      const x2 = toNode.x - (dx / dist) * (r + 4);
      const y2 = toNode.y - (dy / dist) * (r + 4);

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("stroke", edge.solid ? "#10b981" : "#ef4444");
      line.setAttribute("stroke-width", edge.solid ? "2.5" : "1.8");
      line.setAttribute("opacity", edge.solid ? "0.85" : "0.7");
      if (!edge.solid) {
        line.setAttribute("stroke-dasharray", "5,5");
      }
      line.setAttribute("marker-end", edge.solid ? "url(#arrow-green)" : "url(#arrow-red)");
      svgEdges.appendChild(line);

      // Label Badge
      const midX = (fromNode.x + toNode.x) / 2;
      const midY = (fromNode.y + toNode.y) / 2;
      const labelStr = edge.label || 'rel';
      const badgeWidth = Math.max(labelStr.length * 7.5 + 18, 56);

      const edgeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");

      const badgeRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      badgeRect.setAttribute("x", midX - badgeWidth / 2);
      badgeRect.setAttribute("y", midY - 10);
      badgeRect.setAttribute("width", badgeWidth);
      badgeRect.setAttribute("height", "20");
      badgeRect.setAttribute("rx", "10");
      badgeRect.setAttribute("fill", "#0b0f19");
      badgeRect.setAttribute("stroke", edge.solid ? "#10b981" : "#ef4444");
      badgeRect.setAttribute("stroke-width", "1.5");
      edgeGroup.appendChild(badgeRect);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", midX);
      text.setAttribute("y", midY + 4);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", edge.solid ? "#34d399" : "#f87171");
      text.setAttribute("font-size", "10");
      text.setAttribute("font-weight", "700");
      text.textContent = labelStr;
      edgeGroup.appendChild(text);

      svgEdges.appendChild(edgeGroup);
    });

    // 3. Draw Nodes with Icons, Badges & High-Contrast Labels
    displayNodes.forEach((node, idx) => {
      const isConnected = connectedNodeIndices.has(idx) || currentViewMode === 'soll';
      const isSelected = idx === selectedNodeIndex;
      const cfg = getNodeConfig(node.type);
      const nodeColor = node.color || cfg.color;
      const icon = node.icon || cfg.icon;
      const typeLabel = cfg.label;

      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", "cursor-pointer transition-transform duration-200 hover:scale-105");
      g.onclick = () => selectNodeInspector(idx, displayNodes);

      // A. If Island: floating red warning badge above node
      if (!isConnected && currentViewMode === 'ist') {
        const islandBadge = document.createElementNS("http://www.w3.org/2000/svg", "g");
        islandBadge.innerHTML = `
          <rect x="${node.x - 44}" y="${node.y - 44}" width="88" height="18" rx="9" fill="#ef4444" />
          <text x="${node.x}" y="${node.y - 32}" text-anchor="middle" fill="#ffffff" font-size="8.5" font-weight="800" letter-spacing="0.5">⚠️ DATENINSEL</text>
        `;
        g.appendChild(islandBadge);

        // Warning dashed outer ring
        const warnRing = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        warnRing.setAttribute("cx", node.x);
        warnRing.setAttribute("cy", node.y);
        warnRing.setAttribute("r", "31");
        warnRing.setAttribute("fill", "none");
        warnRing.setAttribute("stroke", "#ef4444");
        warnRing.setAttribute("stroke-width", "2");
        warnRing.setAttribute("stroke-dasharray", "4,3");
        g.appendChild(warnRing);
      }

      // B. If Selected: Lime Halo
      if (isSelected) {
        const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        halo.setAttribute("cx", node.x);
        halo.setAttribute("cy", node.y);
        halo.setAttribute("r", "33");
        halo.setAttribute("fill", "none");
        halo.setAttribute("stroke", "#d9ff00");
        halo.setAttribute("stroke-width", "2.5");
        halo.setAttribute("opacity", "0.9");
        g.appendChild(halo);
      }

      // C. Main Circle
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", node.x);
      circle.setAttribute("cy", node.y);
      circle.setAttribute("r", "25");
      circle.setAttribute("fill", nodeColor);
      circle.setAttribute("stroke", isSelected ? "#d9ff00" : (isConnected ? "rgba(255,255,255,0.8)" : "rgba(239,68,68,0.8)"));
      circle.setAttribute("stroke-width", isSelected ? "3" : "2");
      g.appendChild(circle);

      // D. Center Icon (Emoji / Micro-Symbol)
      const iconText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      iconText.setAttribute("x", node.x);
      iconText.setAttribute("y", node.y + 7);
      iconText.setAttribute("text-anchor", "middle");
      iconText.setAttribute("font-size", "18");
      iconText.textContent = icon;
      g.appendChild(iconText);

      // E. Line 1: Type Pill
      const typeWidth = Math.max(typeLabel.length * 6.5 + 14, 52);
      const typeRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      typeRect.setAttribute("x", node.x - typeWidth / 2);
      typeRect.setAttribute("y", node.y + 33);
      typeRect.setAttribute("width", typeWidth);
      typeRect.setAttribute("height", "16");
      typeRect.setAttribute("rx", "8");
      typeRect.setAttribute("fill", "#0f172a");
      typeRect.setAttribute("stroke", nodeColor);
      typeRect.setAttribute("stroke-width", "1.2");
      g.appendChild(typeRect);

      const typeText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      typeText.setAttribute("x", node.x);
      typeText.setAttribute("y", node.y + 44);
      typeText.setAttribute("text-anchor", "middle");
      typeText.setAttribute("fill", "#ffffff");
      typeText.setAttribute("font-size", "8.5");
      typeText.setAttribute("font-weight", "800");
      typeText.setAttribute("letter-spacing", "0.5");
      typeText.textContent = typeLabel;
      g.appendChild(typeText);

      // F. Line 2: Entity Name (Bold Pure White with Dark Halo)
      const labelText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      labelText.setAttribute("x", node.x);
      labelText.setAttribute("y", node.y + 64);
      labelText.setAttribute("text-anchor", "middle");
      labelText.setAttribute("fill", "#ffffff");
      labelText.setAttribute("font-size", "11.5");
      labelText.setAttribute("font-weight", "700");
      labelText.setAttribute("style", "paint-order: stroke fill; stroke: #0b0f19; stroke-width: 4px; stroke-linejoin: round;");
      const fullLabel = node.label || cfg.label;
      labelText.textContent = fullLabel.length > 20 ? fullLabel.substring(0, 18) + '…' : fullLabel;
      g.appendChild(labelText);

      svgNodes.appendChild(g);
    });

    selectNodeInspector(selectedNodeIndex, displayNodes);
  }

  function selectNodeInspector(index, nodes) {
    selectedNodeIndex = index;
    const node = nodes[index] || nodes[0];
    if (!node) return;

    const cfg = getNodeConfig(node.type);

    const nameEl = document.getElementById('inspector-node-name');
    if (nameEl) nameEl.textContent = node.label;
    
    const typeEl = document.getElementById('inspector-node-type');
    if (typeEl) {
      typeEl.innerHTML = `${cfg.icon} ${node.type}`;
      typeEl.style.borderColor = cfg.color;
      typeEl.style.color = cfg.color;
      typeEl.style.fontWeight = 'bold';
    }

    const idEl = document.getElementById('inspector-node-id');
    if (idEl) {
      if (!node.id || node.id.startsWith('_node_') || node.id.startsWith('_b') || node.id.startsWith('_h')) {
        idEl.innerHTML = '<span class="text-red-500 font-bold">⚠️ Keine @id Fragment-URI (Isolierte Dateninsel)</span>';
      } else {
        idEl.textContent = node.id;
      }
    }

    const propsContainer = document.getElementById('inspector-props-list');
    if (propsContainer) {
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
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVisualizer);
} else {
  initVisualizer();
}
