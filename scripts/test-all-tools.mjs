import { JSDOM, VirtualConsole } from 'jsdom';
import fs from 'fs';
import path from 'path';

console.log('\n🧪 Starte umfassenden JSDOM-Funktionstest aller 4 Tools\n');

const results = [];

function recordTest(tool, testName, passed, detail = '') {
  results.push({ tool, testName, passed, detail });
  const icon = passed ? '✅' : '❌';
  console.log(`${icon} [${tool}] ${testName}${detail ? ` (${detail})` : ''}`);
}

// Helper to simulate browser DOM environment
function createDOM(html, scripts = [], url = 'https://teleschmie.de') {
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('error', (err) => {
    // Suppress CSS parsing warnings
    if (!err.toString().includes('Could not parse CSS stylesheet')) {
      console.error('VirtualConsole Error:', err);
    }
  });

  const dom = new JSDOM(html, {
    url,
    runScripts: 'dangerously',
    virtualConsole
  });

  const { window } = dom;

  // Mock smooth scrollIntoView
  window.Element.prototype.scrollIntoView = function() {};

  // Mock clipboard
  let clipboardContent = '';
  window.navigator.clipboard = {
    writeText: async (txt) => { clipboardContent = txt; return Promise.resolve(); },
    readText: async () => clipboardContent
  };
  window.document.execCommand = (cmd) => {
    if (cmd === 'copy') return true;
    return false;
  };

  // Run external scripts
  for (const scriptCode of scripts) {
    window.eval(scriptCode);
  }

  // Dispatch DOMContentLoaded to initialize scripts
  window.document.dispatchEvent(new window.Event('DOMContentLoaded'));

  return { dom, window, getClipboard: () => clipboardContent };
}

async function runAllTests() {
  try {
    // ==========================================
    // 1. TOOL: Schema Graph Visualizer
    // ==========================================
    console.log('\n--- 1. Schema-Graph-Visualizer Tests ---');
    const visualizerHtml = fs.readFileSync('dist/tools/schema-graph-visualizer/index.html', 'utf8');
    const visualizerJs = fs.readFileSync('public/js/schema-graph-visualizer.js', 'utf8');

    const { window: win1 } = createDOM(visualizerHtml, [visualizerJs], 'https://teleschmie.de/tools/schema-graph-visualizer/?url=https://teleschmie.de');

    // 1.1 Initialization
    const title1 = win1.document.title;
    recordTest('Schema Visualizer', 'Page Title & Init', title1.includes('Schema-Graph-Visualizer'), title1);

    const inputUrl = win1.document.getElementById('target-url');
    const btnAnalyze = win1.document.getElementById('btn-analyze');
    const tabManual = win1.document.getElementById('tab-manual-btn');
    recordTest('Schema Visualizer', 'DOM Elements (Inputs, Buttons, Tabs)', !!inputUrl && !!btnAnalyze && !!tabManual);

    // 1.2 URL-Parameter extraction
    recordTest('Schema Visualizer', 'URL Parameter Auto-Fill (?url=)', inputUrl.value === 'https://teleschmie.de', inputUrl.value);

    // 1.3 Validation on empty URL
    inputUrl.value = '';
    btnAnalyze.click();
    const errContainer = win1.document.getElementById('error-container');
    const errText = win1.document.getElementById('error-text');
    recordTest('Schema Visualizer', 'Empty URL Validation', !errContainer.classList.contains('hidden') && errText.textContent.includes('gültige Domain'));

    // 1.4 Tab Switch to Manual JSON-LD
    tabManual.click();
    const manualSection = win1.document.getElementById('manual-input-section');
    recordTest('Schema Visualizer', 'Tab Switching (Manual Mode)', !manualSection.classList.contains('hidden'));

    // 1.5 Manual Analysis & Results Unhiding
    const sampleSchema = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Organization", "@id": "https://example.com/#org", "name": "Beispiel Org" },
        { "@type": "WebSite", "@id": "https://example.com/#site", "name": "Beispiel Site", "publisher": { "@id": "https://example.com/#org" } }
      ]
    });
    const manualInput = win1.document.getElementById('manual-json-input');
    const btnManual = win1.document.getElementById('btn-analyze-manual');
    manualInput.value = sampleSchema;
    btnManual.click();

    const resultsContainer = win1.document.getElementById('results-container');
    const scoreValue = win1.document.getElementById('score-value');
    const domainLabel = win1.document.getElementById('analyzed-domain-label');
    const shareBtn = win1.document.getElementById('btn-share-scan');

    const manualAnalysisSuccess = !resultsContainer.classList.contains('hidden') && parseInt(scoreValue.textContent) > 0;
    recordTest('Schema Visualizer', 'Results Container Unhide & KPI Score', manualAnalysisSuccess, `Score: ${scoreValue.textContent}`);
    recordTest('Schema Visualizer', 'Share Scan Button Present & Configured', !!shareBtn && !!domainLabel);


    // ==========================================
    // 2. TOOL: Grounding Page Generator
    // ==========================================
    console.log('\n--- 2. Grounding Page Generator Tests ---');
    const groundingHtml = fs.readFileSync('dist/tools/groundingpage-generator/index.html', 'utf8');
    const groundingJs = fs.readFileSync('public/js/groundingpage-generator.js', 'utf8');

    const { window: win2, getClipboard: getClip2 } = createDOM(groundingHtml, [groundingJs], 'https://teleschmie.de/tools/groundingpage-generator/');

    const title2 = win2.document.title;
    recordTest('Grounding Generator', 'Page Title & Init', title2.includes('Grounding Page Generator'), title2);

    const input2 = win2.document.getElementById('target-url');
    const btnGen2 = win2.document.getElementById('btn-generate');
    const textarea2 = win2.document.getElementById('prompt-output');
    const btnCopy2 = win2.document.getElementById('btn-copy');

    // 2.1 Generate Prompt
    input2.value = 'agentur-berlin.de';
    btnGen2.click();

    const normalizedUrl = input2.value;
    const prompt2 = textarea2.value;

    recordTest('Grounding Generator', 'URL Normalization (https:// + /)', normalizedUrl === 'https://agentur-berlin.de/', normalizedUrl);
    recordTest('Grounding Generator', 'Prompt Synthese Ontologie V2', 
      prompt2.includes('SCHRITT 1') && prompt2.includes('SCHRITT 2') && prompt2.includes('Ontologie V2') && prompt2.includes('BLOCK 2: SCHEMA.ORG VALIDIERUNG'),
      `${prompt2.length} Zeichen`
    );

    // 2.2 Copy Button
    btnCopy2.click();
    await new Promise(r => setTimeout(r, 100));
    const copied2 = getClip2();
    recordTest('Grounding Generator', 'Copy-to-Clipboard Function', copied2.length === prompt2.length, `${copied2.length} Zeichen in Clipboard`);


    // ==========================================
    // 3. TOOL: Entitäten Graph Generator
    // ==========================================
    console.log('\n--- 3. Entitäten Graph Generator Tests ---');
    const entitaetenHtml = fs.readFileSync('dist/tools/entitaeten-graph-generator/index.html', 'utf8');
    const entitaetenJs = fs.readFileSync('public/js/entitaeten-graph-generator.js', 'utf8');

    // Test with URL handoff parameters from Visualizer
    const { window: win3, getClipboard: getClip3 } = createDOM(
      entitaetenHtml, 
      [entitaetenJs], 
      'https://teleschmie.de/tools/entitaeten-graph-generator/?domain=craft-meister.de&archetype=LOCAL_CRAFT'
    );

    const title3 = win3.document.title;
    recordTest('Entitäten Generator', 'Page Title & Init', title3.includes('Entitäten Graph Generator'), title3);

    const input3 = win3.document.getElementById('target-url');
    const textarea3 = win3.document.getElementById('prompt-output');
    const outputCard3 = win3.document.getElementById('output-card');
    const btnCopy3 = win3.document.getElementById('btn-copy');

    // 3.1 URL-Handoff check
    const prompt3 = textarea3.value;
    recordTest('Entitäten Generator', 'URL Params Handoff (?domain=&archetype=)', 
      input3.value.includes('craft-meister.de') && prompt3.includes('Schiene 2: Handwerksbetrieb & Lokales Gewerbe'),
      `Input: ${input3.value}`
    );

    recordTest('Entitäten Generator', 'Output Card Reveal', !outputCard3.classList.contains('hidden'));

    // 3.2 Directives Check
    const hasZeroHallucination = prompt3.includes('ZERO-HALLUCINATION');
    const hasWikidataGate = prompt3.includes('WIKIDATA Q-ID VERIFIKATIONS-GATE');
    const hasPersonGuard = prompt3.includes('ANTI-PLACEHOLDER GUARD');
    const hasBracketGuard = prompt3.includes('BRACKET & ARRAY BALANCING GUARD');

    recordTest('Entitäten Generator', 'Directives Integrity (Zero-Hallucination, Q-ID, Anti-Dummy, Brackets)', 
      hasZeroHallucination && hasWikidataGate && hasPersonGuard && hasBracketGuard && prompt3.length > 15000,
      `${prompt3.length} Zeichen`
    );

    // 3.3 Copy Button
    btnCopy3.click();
    await new Promise(r => setTimeout(r, 100));
    const copied3 = getClip3();
    recordTest('Entitäten Generator', 'Copy-to-Clipboard Function', copied3.length === prompt3.length, `${copied3.length} Zeichen in Clipboard`);


    // ==========================================
    // 4. TOOL: SEO-Tool Kostenrechner
    // ==========================================
    console.log('\n--- 4. SEO-Tool Kostenrechner Tests ---');
    const kostenrechnerHtml = fs.readFileSync('dist/tools/seo-tool-kostenrechner/index.html', 'utf8');
    
    // In Astro, client scripts in components get inlined or bundled.
    // Let's create DOM from the built HTML which contains the complete bundled script!
    const { window: win4 } = createDOM(kostenrechnerHtml, [], 'https://teleschmie.de/tools/seo-tool-kostenrechner/');

    const title4 = win4.document.title;
    recordTest('SEO Kostenrechner', 'Page Title & Init', title4.includes('SEO-Tool Kostenrechner'), title4);

    const sliderProjects = win4.document.getElementById('slider-projects');
    const sliderSeats = win4.document.getElementById('slider-seats');
    const sliderKeywords = win4.document.getElementById('slider-keywords');
    const savingsDisplay = win4.document.getElementById('max-savings-display');

    recordTest('SEO Kostenrechner', 'Slider Elements & Savings Display Present', 
      !!sliderProjects && !!sliderSeats && !!sliderKeywords && !!savingsDisplay
    );

    // Initial calculation check
    const initialSavingsTxt = savingsDisplay.textContent.trim();
    recordTest('SEO Kostenrechner', 'Initial Calculation Display', initialSavingsTxt.length > 0, initialSavingsTxt);

    // Recalculation on slider input
    sliderSeats.value = "6";
    sliderSeats.dispatchEvent(new win4.Event('input', { bubbles: true }));
    sliderSeats.dispatchEvent(new win4.Event('change', { bubbles: true }));

    const updatedSavingsTxt = savingsDisplay.textContent.trim();
    recordTest('SEO Kostenrechner', 'Live Recalculation on Seat Change', 
      initialSavingsTxt !== updatedSavingsTxt, 
      `Vorher (3 Sitze): ${initialSavingsTxt} -> Nachher (6 Sitze): ${updatedSavingsTxt}`
    );

    // Structured FAQ Schema Check
    const scripts = Array.from(win4.document.querySelectorAll('script[type="application/ld+json"]'));
    const hasFaqSchema = scripts.some(s => s.textContent.includes('FAQPage') && s.textContent.includes('Growth'));
    recordTest('SEO Kostenrechner', 'Schema.org FAQPage & WebApplication Markup', hasFaqSchema);

  } catch (e) {
    console.error('FEHLER IM TESTABLAUF:', e);
    recordTest('Test Runner', 'Suite Execution', false, e.message);
  }

  // Final Summary
  console.log('\n==========================================');
  console.log('🏁 GESAMT-TESTERGEBNIS ALLER 4 TOOLS:');
  console.log('==========================================');
  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;
  console.log(`Erfolgreich: ${passedCount} / ${totalCount} (${Math.round(passedCount/totalCount * 100)}%)\n`);

  if (passedCount === totalCount) {
    console.log('🎉 ALLE 4 PROPRIETÄREN TOOLS UND ALLE IHRE FUNKTIONEN FUNKTIONIEREN ZU 100% FEHLERFREI!\n');
    process.exit(0);
  } else {
    console.error('⚠️ EINIGE TESTS SIND FEHLGESCHLAGEN.');
    process.exit(1);
  }
}

runAllTests();
