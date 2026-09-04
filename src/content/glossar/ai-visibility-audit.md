---
title: AI Visibility Audit (AEO & GEO Audit)
meta_title: "AI Visibility Audit für SEOs (2026)"
description: "Wie führt man ein AI Visibility Audit (GEO-Audit) durch? Crawlability für KIs, RAG und Prompt-Mapping im B2B-Bereich (2026)"
meta_description: "Wie führt man ein AI Visibility Audit (GEO-Audit) durch? Crawlability für KIs, RAG und Prompt-Mapping im B2B-Bereich (2026)"
date: "2026-08-10"
image: "../../assets/images/glossar/3d-light/ai-visibility-audit-3d.webp"
image_alt: AI Visibility Audit B2B SEO
category: Technisches SEO & UX
key_takeaways:
  - "Ein AI Visibility Audit prüft, ob eine Domain von KI-Systemen (LLMs) wie ChatGPT oder Perplexity gelesen, verstanden und als Quelle zitiert wird."
  - "Klassisches Onpage-SEO reicht nicht mehr: KIs benötigen strukturierte Daten, maschinenlesbare Formate (z.B. llms.txt) und saubere Entitäten."
  - "Der Fokus verschiebt sich von isolierten Suchvolumina hin zum Prompt-Mapping und der Messung des Share of Voice in generativen Antworten."
faqs:
  - question: "Was ist ein AI Visibility Audit?"
    answer: "Ein AI Visibility Audit (auch GEO-Audit genannt) ist ein Prüfverfahren, das analysiert, wie gut eine Website für Large Language Models (LLMs) und Answer Engines optimiert ist. Es deckt Schwachstellen in der KI-Crawlability, der semantischen Struktur und der Entity Confidence auf."
  - question: "Wie unterscheidet sich ein AI Audit von einem normalen SEO Audit?"
    answer: "Ein klassisches SEO Audit fokussiert sich primär auf die Google-Richtlinien (z.B. Core Web Vitals, interne Verlinkung, H1-Struktur). Ein AI Audit fokussiert sich auf RAG (Retrieval-Augmented Generation). Es prüft, ob die Inhalte so aufbereitet sind, dass ein Bot sie isoliert extrahieren und in eine KI-Antwort einbauen kann."
  - question: "Welche Tools braucht man für ein AI Audit?"
    answer: "Für die Datenbasis und das Tracking der KI-Sichtbarkeit nutzen Agenturen Tools wie Rankscale (spezialisiert auf KI-Engines) oder den AI Tracker von SE Ranking. Für die technische Crawlability-Prüfung nutzt man zudem Logfile-Analysen und simulierte Crawler-Zugriffe (z.B. mit dem OpenAI-Bot)."
---

Jahrelang war der Ablauf in Agenturen identisch: Ein potenzieller Kunde klopft an, man lässt einen Crawler wie Screaming Frog über die Domain laufen, exportiert hunderte Fehler (fehlende Alt-Texte, 404-Fehler, zu lange Title-Tags) und präsentiert ein 50-seitiges PDF. Das klassische [SEO Audit](/glossar/seo-audit/) war geboren. 

Doch seit dem Aufstieg von Answer Engines wie Perplexity, ChatGPT Search und Google AI Overviews greift dieser Ansatz schlichtweg zu kurz. Wenn dein Kunde im B2B-Umfeld agiert und seine Käufer komplexe Fragen an KI-Systeme stellen, hilft es wenig, wenn die Meta-Description auf den Buchstaben genau 155 Zeichen lang ist. 

Was wir heute brauchen, ist ein **AI Visibility Audit** (oft auch GEO-Audit oder AEO-Audit genannt). Es prüft nicht nur, ob Google deine Seite indexiert, sondern ob moderne Large Language Models (LLMs) deine Inhalte **lesen**, **verstehen** und – das ist der entscheidende Punkt – als vertrauenswürdige **Quelle (Citation)** zitieren können.

<figure class="my-8 bg-neutral-50 border border-neutral-200 p-6 md:p-8 rounded-2xl shadow-sm">
  <div class="flex items-center gap-4 mb-4">
    <img 
      src="/assets/images/profile/joerg-zimmer-portrait.webp" 
      alt="Jörg Zimmer - Senior SEO & AI Search Consultant" 
      class="w-14 h-14 rounded-full object-cover object-top shadow-sm border-2 border-lime-accent" 
      width="56" 
      height="56" 
      loading="lazy"
    />
    <div>
      <h4 class="font-bold text-base md:text-lg text-dark mb-0">Jörg Zimmer</h4>
      <p class="text-xs md:text-sm text-neutral-600 mb-0">Senior SEO & AI Search Consultant</p>
    </div>
  </div>
  <blockquote class="text-base md:text-lg text-dark leading-relaxed italic border-l-4 border-lime-accent pl-4 my-4 font-normal">
    „Ein 80-seitiges PDF voller Alt-Tag-Warnungen bringt dir im KI-Zeitalter keinen einzigen Neukunden mehr. Ein AI Visibility Audit prüft die harte Realität: Versteht das Sprachmodell deine Kernleistungen als verifizierte Entität und wirst du in Perplexity und ChatGPT als Primärquelle zitiert? Wer dieses Audit überspringt, optimiert für einen Googlebot von gestern und bleibt in den Antwortmaschinen von morgen unsichtbar.“
  </blockquote>
  <figcaption class="mt-4 pt-3 border-t border-neutral-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
    <span>Experten-Zitat • <cite class="not-italic font-semibold text-neutral-700">Jörg Zimmer</cite></span>
    <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="font-bold text-lime-700 hover:underline inline-flex items-center gap-1">
      Jörg Zimmer auf LinkedIn folgen →
    </a>
  </figcaption>
</figure>

## Was ist ein AI Visibility Audit?

Ein AI Visibility Audit ist eine strategische und technische Untersuchung einer Website mit dem Ziel, ihre Sichtbarkeit und Autorität innerhalb von KI-gestützten Suchsystemen zu maximieren. 

Im Gegensatz zu traditionellen Suchmaschinen, die eine Liste von Links (SERPs) ausgeben, arbeiten KI-Systeme nach dem Prinzip der **Retrieval-Augmented Generation ([RAG](/glossar/rag/))**. Das bedeutet, dass sie das Web in Echtzeit nach Informationen durchsuchen, diese extrahieren, zusammenfassen und eine direkte, konversationelle Antwort generieren.

Ein AI Audit beantwortet drei fundamentale Fragen:
1. **Accessibility (Zugänglichkeit):** Können die KI-Bots (z.B. `OAI-SearchBot` von OpenAI oder der `PerplexityBot`) deine Inhalte technisch überhaupt abrufen?
2. **Entity Confidence (Entitäten-Vertrauen):** Weiß die KI zweifelsfrei, wer du bist, was dein Produkt ist und dass du ein Branchenexperte bist?
3. **Citation Readiness (Zitierfähigkeit):** Ist dein Text so strukturiert, dass eine KI die Kernaussagen einfach isolieren und als Fakten-Beleg nutzen kann?

## Der 3-Phasen-Prozess eines AI Visibility Audits

Ein professionelles AI Audit für B2B-Kunden ist kein Knopfdruck-Report. Es erfordert eine methodische Herangehensweise, die menschliche Analytik mit modernen Tool-Daten verbindet. Ich strukturiere diese Audits (siehe auch meinen Beitrag zum [GEO Audit](/glossar/geo-audit/)) in drei klare Phasen:

### Phase 1: Strategisches Prompt-Mapping & Baseline
Bevor wir tief in den Quellcode eintauchen, müssen wir die strategische Ausgangslage (die Baseline) definieren. Bei Google haben wir Keywords recherchiert, bei KI-Systemen mappen wir Prompts:
- **Identifikation von Core-Prompts:** Welche Fragen stellen deine Kunden, bevor sie kaufen? (Beispiel B2B-Software: *„Was sind die Nachteile von SAP gegenüber Salesforce für mittelständische Logistikunternehmen?“*). Wir definieren ein Set von 20 bis 50 geschäftskritischen Prompts.
- **Baseline-Tracking:** Wir nutzen spezielle [AI Tracking Tools](/glossar/ai-tracking-tools/), um den aktuellen Status Quo zu messen. Taucht deine Marke in den Antworten auf? Wenn ja, in welchem Kontext (Sentiment)?
- **Tool-Setup:** Für das exakte Monitoring dieser KI-Erwähnungen eignet sich **[Rankscale](https://rankscale.ai/?via=offer)**, das sich komplett auf die Auswertung von LLMs spezialisiert hat. Um dies mit traditionellen Suchdaten abzugleichen, bietet **[SE Ranking](https://seranking.com/de/?ga=4169588&source=link)** ein leistungsstarkes Modul.

### Phase 2: Technische Crawlability für KIs
KI-Crawler arbeiten unter strengen Latenzgrenzen und parsen selten aufwendiges JavaScript:
- **Robots.txt & Bot-Ausschluss:** Blockierst du unbewusst KI-Crawler? Viele Unternehmen haben aus Panik vor Datendiebstahl rigoros alle LLM-Bots per `robots.txt` gesperrt. Das ist ein fataler Fehler, wenn man Sichtbarkeit in Answer Engines anstrebt. Ein Audit prüft diese Direktiven.
- **Maschinenlesbare Formate:** Bietest du deine Inhalte maschinengerecht an? Ein entscheidendes Instrument ist die [llms.txt](/glossar/llms-txt/), die es KI-Systemen extrem erleichtert, die wichtigsten Inhalte deiner Domain ohne störendes Design-Markup zu konsumieren.
- **Strukturierte Daten (Schema.org):** KIs benötigen semantischen Kontext. Ein AI Audit prüft, ob [Strukturierte Daten](/glossar/strukturierte-daten/) wie Organization, Product, FAQPage und Article fehlerfrei implementiert sind.

### Phase 3: Content-Architektur & Zitierfähigkeit
In dieser Phase prüfen wir den eigentlichen Textkörper (Payload) der Website:
- **Das BLUF-Prinzip (Bottom Line Up Front):** Sind deine Inhalte so geschrieben, dass die wichtigste Information zuerst kommt? KI-Systeme hassen es, wenn die Antwort auf eine Kernfrage im letzten Absatz versteckt ist.
- **Chunking (Modularität):** Kann man deinen Text in logische Blöcke (Chunks) zerlegen? Ein AI Audit prüft die Heading-Struktur (H2, H3). Jede Überschrift sollte idealerweise als direkte Frage formuliert sein, gefolgt von einer prägnanten Antwort.
- **Beweisführung (Citations):** Nutzt du selbst Quellen, Statistiken und Daten, um deine Aussagen zu untermauern? KI-Systeme bevorzugen Informationsquellen mit hohem Information Gain.

<div class="bg-lime-accent/15 rounded-2xl border border-lime-accent/30 p-6 shadow-sm not-prose my-8">
  <div class="flex items-center gap-2 mb-3">
    <span class="text-xs uppercase tracking-wider font-bold bg-lime-accent text-dark px-2.5 py-1 rounded-full">30-Sekunden Inhaber-Check</span>
  </div>
  <h3 class="text-lg md:text-xl font-bold text-dark mb-2">Jörgs Praxistipp aus der SEO-Sprechstunde</h3>
  <p class="text-sm md:text-base text-neutral-700 leading-relaxed mb-4">
    Untersuche das sogenannte „Ghost Citation Phänomen“: Nutze ChatGPT oder Perplexity mit deiner Kernkompetenz und prüfe, ob die KI deine Argumente und Formulierungen wiedergibt, aber die Zitations-Fußnote auf einen Drittanbieter oder Mitbewerber setzt. Passiert das, fehlt deiner Domain klare Entitäts-Autorität und eindeutiges Schema.org-Markup zur Absender-Zuordnung.
  </p>
  <div class="border-t border-lime-accent/30 pt-3 mt-3">
    <p class="text-xs font-semibold text-neutral-600 mb-0">
      Kontrollfrage an deine Webagentur: „Beinhaltet unser technisches Audit bereits ein Prompt-Mapping für B2B-Kaufentscheidungen und eine Überprüfung der Entity Confidence in gängigen LLMs?“
    </p>
  </div>
</div>

## Fallbeispiel B2B: Warum das AI Audit Leads rettet

Stell dir vor, du verkaufst eine hochpreisige HR-Software. Dein klassisches SEO-Audit sagt dir: Alles ist grün, du rankst auf Platz 1 für "HR Software". 

Doch deine Leads brechen ein. Warum? Weil IT-Leiter heute ChatGPT oder Perplexity öffnen und prompten: *„Erstelle mir einen Vergleich der besten HR-Softwares für deutsches Arbeitsrecht mit Vor- und Nachteilen.“*

Wenn deine Website technisch nicht für RAG optimiert ist, keine klaren FAQs zu Vor- und Nachteilen besitzt und deine Marke auf Dritt-Plattformen nicht als Entität etabliert ist, wird ChatGPT deine Software in diesem Bericht **komplett ignorieren**. Ein Mitbewerber, der auf Position 8 bei Google steht, aber perfekte KI-Crawlability aufweist, wird stattdessen als Top-Empfehlung zitiert. Ein AI Visibility Audit deckt genau diesen blinden Fleck auf.

<div class="my-8 bg-dark text-white p-6 rounded-2xl border-l-4 border-lime-accent shadow-md">
  <div class="flex items-start justify-between gap-4 mb-3">
    <div class="flex items-center gap-3">
      <span class="text-lime-accent text-2xl shrink-0">🤖</span>
      <p class="font-bold text-base md:text-lg text-lime-accent mb-0">Arbeitsanweisung für deinen KI-Agenten (Cursor / Claude / Antigravity)</p>
    </div>
    <button type="button" class="copy-agent-btn px-2.5 py-1 bg-lime-accent text-dark hover:bg-lime-600 hover:text-white text-[11px] font-bold uppercase rounded border border-lime-500 hover:border-lime-600 transition-all flex items-center gap-1 shadow-md cursor-pointer shrink-0 ml-auto" title="Prompt kopieren">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z" /></svg>
      <span>Kopieren für Agent</span>
    </button>
  </div>
  <p class="text-gray-300 text-sm mb-4 leading-relaxed">
    Kopiere diesen Prompt direkt in deinen KI-Coding-Assistenten, um ein technisches AI-Visibility- und RAG-Audit für deine Website durchzuführen:
  </p>
  <div class="bg-black/60 p-4 rounded-xl border border-white/10 text-xs font-mono text-gray-200 overflow-x-auto space-y-2">
    <p class="text-lime-accent font-bold mb-1"># Prompt: Technisches AI Visibility & RAG-Readiness Audit</p>
    <p><strong>Rolle:</strong> Du bist ein hochqualifizierter AI Visibility Consultant & Technical SEO Auditor.</p>
    <p><strong>Aufgabe:</strong> Führe ein systematisches Audit der bereitgestellten Webseiten durch und analysiere RAG-Crawlability, Entity Confidence und Citation Readiness.</p>
    <p><strong>Schritte & Validierung:</strong></p>
    <p>1. Prüfe die Zugänglichkeit für KI-User-Agents (<code>OAI-SearchBot</code>, <code>PerplexityBot</code>) und identifiziere clientseitige JavaScript-Rendering-Blocker.</p>
    <p>2. Analysiere das JSON-LD Markup auf Vollständigkeit der Entitäts-Attribute (<code>@id</code>, <code>sameAs</code> zu Wikidata, <code>about</code>, <code>mentions</code>).</p>
    <p>3. Überprüfe die Textstruktur nach dem BLUF-Prinzip (Direktantwort in den ersten 50 Wörtern jeder H2-Sektion) und prüfe das Vorhandensein von <code>llms.txt</code>.</p>
    <p>4. Erstelle einen tabellarischen Maßnahmenplan mit konkreten Handlungsempfehlungen nach Aufwand und Hebelwirkung.</p>
  </div>
</div>

## Zusammenfassung: Das Audit als Startschuss für Generative Engine Optimization

Wer heute noch glaubt, dass ein paar grüne Haken in einem traditionellen Tool ausreichen, um die digitale Zukunft zu dominieren, wird ein böses Erwachen erleben. Ein AI Visibility Audit ist kein Ersatz für ein technisches Onpage-Audit, sondern dessen logische und zwingend notwendige Evolution. Es verlagert den Fokus von der bloßen Indexierbarkeit auf die aktive Zitierfähigkeit und bildet das Fundament für zukunftssichere [AEO](/glossar/aeo/) und [GEO](/glossar/geo/) Strategien.

<div class="my-10 bg-dark text-white p-8 rounded-3xl border border-white/10 text-center shadow-md not-prose">
  <span class="text-xs uppercase tracking-widest text-lime-accent font-mono font-bold mb-3 block">
    Aus Jörgs LinkedIn-Feed
  </span>
  <blockquote class="text-base md:text-lg text-gray-200 italic max-w-2xl mx-auto mb-4 border-none font-normal">
    „Es gibt tausende SEO Tools, die die Arbeit der Suchmaschinenoptimierer nicht überflüssig machen. Sie zeigen dir nur die Möglichkeiten und erleichtern das Leben.“
  </blockquote>
  <p class="text-gray-300 text-sm max-w-xl mx-auto mb-6">
    Diskutiere mit Jörg Zimmer und der SEO-Community auf LinkedIn über diesen Beitrag.
  </p>
  <a href="https://www.linkedin.com/feed/update/urn:li:activity:7055143807113129984" target="_blank" rel="noopener noreferrer" class="btn-primary">
    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    <span>Beitrag auf LinkedIn öffnen</span>
    <span aria-hidden="true">→</span>
  </a>
</div>

### Verwandte Glossar-Begriffe
* [GEO Audit: Der umfassende Prüfbericht für generative KIs](/glossar/geo-audit/)
* [AI Tracking Tools: Wahre Sichtbarkeit messen](/glossar/ai-tracking-tools/)
* [AI Visibility Report: Statusberichte für Vorstände und Teams](/glossar/ai-visibility-report/)
* [llms.txt: Der Inklusions-Leitfaden für KI-Agenten](/glossar/llms-txt/)
* [Generative Engine Optimization (GEO): Sichtbarkeit in KI-Modellen](/glossar/geo/)
* [Answer Engine Optimization (AEO): Optimierung für direkte Antworten](/glossar/aeo/)
* [RAG: Retrieval-Augmented Generation im Detail](/glossar/rag/)
* [Strukturierte Daten: Fakten für Wissensgraphen auszeichnen](/glossar/strukturierte-daten/)
* [SEO Audit: Das klassische Fundament](/glossar/seo-audit/)

