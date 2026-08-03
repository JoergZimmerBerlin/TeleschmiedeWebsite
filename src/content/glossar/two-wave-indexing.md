---
category: 'Technisches SEO & UX'
title: "Was ist Two-Wave Indexing?"
meta_title: "Two-Wave Indexing: SEO & JavaScript (2026)"
description: "Wie Google Webseiten mit JavaScript verarbeitet. Alles über Two-Wave Indexing, Verzögerungen beim Crawling & Technisches SEO (2026)"
meta_description: "Wie Google Webseiten mit JavaScript verarbeitet. Alles über Two-Wave Indexing, Verzögerungen beim Crawling & Technisches SEO (2026)"
date: "2026-08-03"
image: "../../assets/images/glossar/two-wave-indexing-3d.webp"
image_alt: "3D Infografik zum Thema Two-Wave Indexing mit HTML und JavaScript Verarbeitung"
key_takeaways:
  - "Googlebot und KI-Crawler verarbeiten Websites in zwei asynchronen Phasen: Zuerst das rohe HTML, später das komplexe JavaScript."
  - "Die zweite Welle (Rendering) kann Tage oder Wochen auf sich warten lassen. Dies führt bei reinen JavaScript-Seiten zu temporärer Unsichtbarkeit."
  - "Server-Side Rendering (SSR) ist zwingend erforderlich, um die Abhängigkeit von der ressourcenintensiven zweiten Welle zu umgehen."
faqs:
  - question: "Was bedeutet Two-Wave Indexing?"
    answer: "Two-Wave Indexing beschreibt den zweistufigen Prozess, mit dem Suchmaschinen wie Google moderne Webseiten verarbeiten. In der ersten Welle wird ausschließlich das statische HTML blitzschnell gecrawlt und indexiert. Da das Ausführen von JavaScript (Rendering) extrem rechenintensiv ist, wird die Seite in eine Warteschlange verschoben. Die zweite Welle, in der das JavaScript durch den Web Rendering Service (WRS) ausgeführt wird, folgt asynchron und oft mit massiver zeitlicher Verzögerung."
  - question: "Warum ist die zweite Welle für SEO gefährlich?"
    answer: "Wenn eine Website stark auf Client-Side Rendering (CSR) basiert, ist das initiale HTML oft ein leeres Gerüst. Die eigentlichen Inhalte, Links und Metadaten werden erst durch JavaScript geladen. Verzögert sich die zweite Welle um Wochen, bleibt die Website in dieser Zeit für Suchmaschinen und KI-Agenten praktisch unsichtbar. Wichtige Rankings können massiv einbrechen."
  - question: "Wie kann man die Nachteile des Two-Wave Indexing umgehen?"
    answer: "Die sicherste Methode ist der Einsatz von Server-Side Rendering (SSR) oder Static Site Generation (SSG). Dabei wird das JavaScript bereits auf dem Server ausgeführt, sodass dem Googlebot sofort ein vollständig gerendertes HTML-Dokument ausgeliefert wird. Die erste Welle erfasst somit bereits alle geschäftsrelevanten Inhalte. Der Umweg über den teuren Web Rendering Service entfällt nahezu komplett."
  - question: "Werden KI-Crawler (z.B. von OpenAI) jemals die zweite Welle nutzen?"
    answer: "Aktuell meiden autonome KI-Agenten komplexes Rendering aus Kostengründen komplett. Sie greifen fast ausschließlich auf statisches HTML zurück. Es ist zwar möglich, dass KI-Dienste in Zukunft eigene Headless-Browser einsetzen, doch bis dahin bleibt Server-Side Rendering die einzige Garantie für eine saubere KI-Erfassung."
---

Das **Two-Wave Indexing** ist eine der größten architektonischen Hürden im modernen Web. Wer heute eine Website rein auf JavaScript-Basis baut, riskiert massive Sichtbarkeitsverluste, da Suchmaschinen die Inhalte nur zeitverzögert erfassen.

Moderne Webentwicklung basiert stark auf JavaScript. Frameworks wie React, Vue und Angular sind Branchenstandard. Doch für Suchmaschinen und KI-Agenten stellt diese Technologie ein massives Problem dar. Die Verarbeitung von JavaScript-Code ist **extrem teuer** und Rechenkapazitäten sind weltweit begrenzt. Die technische Lösung der Suchmaschinenbetreiber für dieses Ressourcenproblem lautet Two-Wave Indexing.

## Der Prozess der zwei Wellen

Die Verarbeitung von Webseiten erfolgt asynchron in zwei völlig voneinander getrennten Phasen.

### Welle 1: Das statische HTML
Der Googlebot besucht eine URL. Er lädt das rohe HTML herunter. Dieser Vorgang dauert nur wenige Millisekunden. Alle im Quellcode vorhandenen Texte, Links und Metadaten werden sofort verarbeitet und indexiert. 

Ist die Website klassisch programmiert (z.B. reines HTML/PHP), ist der Prozess hier abgeschlossen. Das Dokument ist *sofort* im Index verfügbar.

### Welle 2: Der Web Rendering Service (WRS)
Basiert die Seite jedoch auf [Client-Side Rendering (CSR)](/glossar/client-side-rendering/), ist das erste HTML oft nur ein leeres Gerüst. 

Google erkennt das Vorhandensein von JavaScript und verschiebt die URL in eine Rendering-Warteschlange. Hier beginnt das Warten. Es können Stunden vergehen. Manchmal Tage. In extremen Fällen sogar Wochen. 

Sobald Ressourcen frei sind, übernimmt der Web Rendering Service (ein Headless Chromium Browser). Er führt das JavaScript aus, rendert die Seite visuell und baut den finalen DOM (Document Object Model) auf. **Erst jetzt** "sieht" die Suchmaschine die tatsächlichen Inhalte.

> "Das Rendering von JavaScript im großen Stil ist teuer. Deshalb gibt es keine Garantie, dass Google eine JavaScript-Seite sofort nach dem Crawlen rendert." – *Offizielle Google Search Central Dokumentation*

## Welle 1 vs. Welle 2: Der direkte Vergleich

| Merkmal | Welle 1 (Initiales Crawling) | Welle 2 (Rendering) |
| :--- | :--- | :--- |
| **Geschwindigkeit** | Millisekunden | Stunden bis Wochen |
| **Ressourcenverbrauch** | Sehr niedrig | Extrem hoch (CPU/RAM) |
| **Sichtbare Elemente** | Nur statisches HTML (Source Code) | Der finale, gerenderte DOM |
| **KI-Agenten Support** | 100% (Alle Crawler lesen HTML) | Nahezu 0% (KIs rendern meist nicht) |

## Risiken für die Sichtbarkeit

Die zeitliche Diskrepanz zwischen Welle 1 und Welle 2 ist für Unternehmen hochgradig gefährlich. Ein neuer Blogartikel oder ein wichtiges Produkt-Update bleibt wochenlang unsichtbar. 

Hier sind die kritischen Folgen:
*   **Verzögerte Indexierung:** Neue Inhalte tauchen nicht bei Google auf.
*   **Verlorene Verlinkungen:** Wichtige interne Links werden nicht sofort erkannt, was den PageRank-Fluss unterbricht.
*   **KI-Unsichtbarkeit:** Autonome KI-Agenten (wie der ChatGPT-Searchbot) ignorieren komplexes JavaScript oft völlig. Sie crawlen ausschließlich die erste Welle. Finden sie dort nur leeres HTML, verwerfen sie die URL. Die Folge ist null Sichtbarkeit in generativen KI-Antworten.

## Die technische Lösung

Die Abhängigkeit vom Web Rendering Service muss aktiv minimiert werden. Das Fundament eines soliden [Technisches SEO](/glossar/technisches-seo/) Setups ist die Verlagerung der Rechenlast auf den eigenen Server. 

Durch die Implementierung von [Server-Side Rendering (SSR)](/glossar/server-side-rendering/) oder Pre-Rendering wird das JavaScript bereits bei dir auf dem Server ausgeführt. Der Crawler erhält im Bruchteil einer Sekunde ein *fertig gerendertes HTML-Dokument*. Alle relevanten Links, Texte und Meta-Informationen sind bereits in der ersten Welle verfügbar. 

Die unsichere Wartezeit auf die zweite Welle entfällt komplett. Dies garantiert eine sofortige, vollständige Erfassung durch alle gängigen Suchalgorithmen und KI-Systeme.
