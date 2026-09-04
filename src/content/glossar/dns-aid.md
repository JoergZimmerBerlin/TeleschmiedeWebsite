---
category: 'AI SEO & Generative Search'
title: "DNS-AID: Das Telefonbuch für KI-Agenten"
meta_title: "DNS-AID: Discovery für Agenten (2026)"
description: "Was ist DNS-AID? Wie der IETF-Standard für DNS-based Agent Identification und Discovery funktioniert und Agenten dezentral vernetzt. (2026)"
meta_description: "Was ist DNS-AID? Wie der IETF-Standard für DNS-based Agent Identification und Discovery funktioniert und Agenten dezentral vernetzt. (2026)"
date: "2026-07-22"
image: "../../assets/images/glossar/3d-light/glossar-dns-aid-3d.webp"
image_alt: "3D-Infografik zu DNS-AID und Agent-Discovery"
key_takeaways:
  - "DNS-AID (DNS-based Agent Identification and Discovery) verankert die Erkennung von KI-Agenten dezentral im globalen Domain Name System."
  - "Der IETF-Standard nutzt bestehende RFC-Spezifikationen wie SVCB-Records (RFC 9460), TXT-Records und DNS-SD ohne proprietäre Gatekeeper."
  - "In Verbindung mit DNSSEC und DANE bietet DNS-AID kryptografische Identitätsprüfung auf Infrastruktur-Ebene."
faqs:
  - question: "Was bedeutet DNS-AID?"
    answer: "DNS-AID steht für 'DNS-based Agent Identification and Discovery'. Es handelt sich um eine Spezifikation der IETF (draft-mozleywilliams-dnsop-dnsaid), initiiert unter anderem von Infoblox, Deutsche Telekom und Amazon. Sie ermöglicht es autonomen KI-Agenten, Endpunkte, Protokolle und Identitäten anderer Agenten direkt über DNS-Abfragen aufzulösen, anstatt auf zentrale Verzeichnisse oder Web-Scraping angewiesen zu sein."
  - question: "Wie unterscheidet sich DNS-AID von HTTP-Dateien wie auth.md oder agent-card.json?"
    answer: "HTTP-basierte Entdeckungsdateien erfordern einen vollständigen TCP- und TLS-Handshake sowie den Abruf einer Web-URL. DNS-AID setzt eine Ebene tiefer an: Über standardisierte DNS-Resource-Records (insbesondere SVCB und TXT) erfährt ein anfragender Agent in wenigen Millisekunden, welche Werkzeuge eine Domain anbietet, bevor überhaupt eine HTTP-Verbindung aufgebaut wird."
  - question: "Welche Sicherheitsvorteile bietet DNS-AID durch DNSSEC?"
    answer: "Da DNSSEC (Domain Name System Security Extensions) jeden DNS-Record kryptografisch signiert, können Agenten verifizieren, dass die zurückgegebenen Agenten-Endpunkte und öffentlichen Schlüssel tatsächlich vom autorisierten Domaininhaber stammen. Dies verhindert Man-in-the-Middle-Angriffe und gefälschte Agenten-Identitäten im dezentralen Web."
---

Mit der massenhaften Verbreitung autonomer Softwaresysteme im Jahr 2026 stehen Unternehmen vor einer neuen infrastrukturellen Herausforderung: Wie können KI-Agenten von Drittanbietern, Partnern oder Kunden vollautomatisch erkennen, welche Dienste, Schnittstellen und Werkzeuge eine Domain bereitstellt?

Bisherige Ansätze stützen sich primär auf die HTTP-Anwendungsschicht: Webmaster hinterlegen Dateien wie `/.well-known/agent-card.json` oder Dokumentationen wie `/auth.md`. Doch dieser Prozess ist für vernetzte Multi-Agenten-Systeme ressourcenintensiv. Bevor ein Agent erfährt, ob eine Domain ein bestimmtes Werkzeug anbietet, muss er DNS-Zonen auflösen, TCP- und TLS-Handshakes durchführen, HTTP-GET-Requests absenden und JSON-Dokumente parsen.

Mit **DNS-AID** (**DNS-based Agent Identification and Discovery**) etabliert sich eine zukunftsweisende Spezifikation der Internet Engineering Task Force (IETF), die diesen Prozess radikal beschleunigt und dezentralisiert. Sie verwandelt das bewährte Domain Name System in ein globales, latenzarmes Telefonbuch für die Agent-Economy.

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
    „Wer glaubt, AI-Readiness ende bei einer agent-card.json oder robots.txt auf dem Webserver, unterschätzt autonome Systeme fundamental. Echte Agenten verhandeln nicht sekundenlang über HTTP, wenn sie Schnittstellen und kryptografische Identitäten per DNS-AID in 15 Millisekunden direkt auf Infrastruktur-Ebene verifizieren können. DNS ist das Fundament des maschinellen Webs.“
  </blockquote>
  <figcaption class="mt-4 pt-3 border-t border-neutral-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
    <span>Experten-Zitat • <cite class="not-italic font-semibold text-neutral-700">Jörg Zimmer</cite></span>
    <a href="https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/" target="_blank" rel="noopener noreferrer" class="font-bold text-lime-700 hover:underline inline-flex items-center gap-1">
      Jörg Zimmer auf LinkedIn folgen →
    </a>
  </figcaption>
</figure>

<div class="bg-lime-accent/15 rounded-2xl border border-lime-accent/30 p-6 shadow-sm not-prose my-8">
  <div class="flex items-center gap-2 mb-3">
    <span class="text-xs font-bold uppercase tracking-wider bg-dark text-white px-2.5 py-1 rounded-full">30-Sekunden Inhaber-Check</span>
    <span class="text-xs font-semibold text-neutral-600">Jörgs Praxistipp aus der SEO-Sprechstunde</span>
  </div>
  <h3 class="text-lg font-bold text-dark mb-2">DNSSEC und SVCB-Records im Domain-Portfolio prüfen</h3>
  <p class="text-sm text-neutral-700 leading-relaxed mb-3">
    DNS-AID entfaltet seinen vollen Mehrwert nur dann, wenn die DNS-Zone kryptografisch gegen Man-in-the-Middle-Angriffe abgesichert ist. Fragen Sie Ihren Registrar oder Cloudflare-Administrator gezielt nach DNSSEC-Aktivierung und Unterstützung für SVCB-Records (RFC 9460).
  </p>
  <div class="bg-white/80 rounded-xl p-3 border border-lime-accent/40 text-xs text-neutral-800 font-medium">
    <strong>Kontrollfrage an Ihre IT / Webagentur:</strong> „Haben wir für unsere Unternehmens-Domains bereits DNSSEC aktiviert und sind unsere Nameserver in der Lage, moderne SVCB- und TXT-Records für maschinenlesbare Agent-Discovery strukturiert bereitzustellen?“
  </div>
</div>

## Was ist DNS-AID?

DNS-AID ist ein offener Standard-Entwurf (spezifiziert als `draft-mozleywilliams-dnsop-dnsaid`), der von Netzwerk- und Cloud-Schwergewichten wie Infoblox, Deutsche Telekom und Amazon im IETF-Arbeitskreis vorangetrieben wird. Ziel ist es, die Entdeckung von Agenten und deren Protokollen (wie dem [Model Context Protocol (MCP)](/glossar/model-context-protocol-mcp/) oder dem [A2A-Protocol](/glossar/a2a-protocol/)) direkt im DNS zu verankern.

Anstatt ein neues, isoliertes Protokoll oder proprietäre Plattform-Register zu erfinden, nutzt DNS-AID die vorhandenen, seit Jahrzehnten bewährten Kerntechnologien des Internets:

1. **SVCB-Records (RFC 9460):** Service-Binding-Records transportieren Endpunkt-Informationen, Portnummern und unterstützte Transportprotokolle direkt in der DNS-Antwort.
2. **TXT-Records:** Dienen als strukturierter Metadaten-Container für Parameter, API-Versionen und Fallback-Verweise auf die Web-Ebene.
3. **DNS-SD (DNS-Based Service Discovery):** Ermöglicht die kaskadierende Auflösung ganzer Dienstkataloge innerhalb einer Unternehmens-Domain.
4. **DNSSEC & DANE (TLSA):** Schützen die Identität der Agenten gegen Spoofing und Manipulation durch kryptografische Zertifikatsbindungen.

## Wie funktioniert DNS-AID in der Praxis?

Wenn ein autonomer Recherche- oder Einkaufs-Agent auf eine Domain stößt, startet er keinen blinden Web-Crawl, sondern sendet eine DNS-Anfrage an den zuständigen Nameserver.

Der Ablauf gliedert sich in vier Phasen:

1. **DNS-Discovery-Request:** Der Agent fordert den SVCB-Record unter einem standardisierten Prefix an (z. B. `_agent._tcp.teleschmie.de`).
2. **Resource Record Evaluation:** Der Nameserver antwortet mit den hinterlegten Parametern. Der Agent liest Zieladresse, Port, Protokolltyp (z. B. `alpn=mcp`) und Authentifizierungs-Endpunkte aus.
3. **Kryptografische Signaturprüfung:** Über DNSSEC stellt der Agent sicher, dass die DNS-Antwort nicht manipuliert wurde und vom rechtmäßigen Domaininhaber stammt.
4. **Direkte Verbindungsaufnahme:** Der Agent verbindet sich ohne Umwege mit dem Ziel-Endpoint, authentifiziert sich gemäß den DNS-Vorgaben und führt den gewünschten Task aus.

## Vergleichstabelle: HTTP-Discovery vs. DNS-AID

Die Verlagerung der Dienst-Entdeckung von der HTTP-Schicht in das DNS bringt fundamentale Vorteile hinsichtlich Geschwindigkeit, Skalierbarkeit und Sicherheit:

| Kriterium | HTTP-basierte Discovery (z. B. Well-Known) | DNS-AID (Infrastruktur-Standard 2026) |
|:---|:---|:---|
| **Netzwerkschicht** | Layer 7 (HTTP / Application Layer) | **Layer 3/4 (DNS / Network Infrastructure)** |
| **Latenz bis zur Erkennung**| 150 – 500 ms (inkl. TLS & HTTP Parsing) | **5 – 25 ms (gecachtes Anycast DNS)** |
| **Ausfallrisiko** | Webserver überlastet oder Downstream-Fehler | **Hochverfügbar über globales DNS-Anycast-Netz** |
| **Manipulationssicherheit** | SSL/TLS-Zertifikate auf Web-Ebene | **Kryptografisch versiegelt via DNSSEC & DANE** |
| **Crawler-Aufwand** | Hoher Datentransfer durch HTML/JSON Scrapes | **Minimaler Payload in komprimierten DNS-Paketen** |
| **Integration** | Erfordert [RFC 8288 Link-Header](/glossar/rfc-8288-link-headers/) | **Direkte Verankerung in der Domain-Zonendatei** |

## Universelles Konfigurations-Beispiel: DNS-Zone

Um eine Domain mit DNS-AID auszustatten, werden standardisierte Resource-Records in der DNS-Zonendatei (z. B. bei BIND, Cloudflare oder modernen DNS-Hostern) eingetragen. Die folgenden neutralen Snippets zeigen die saubere Syntax:

```text
; ============================================================
; DNS-AID Konfiguration für eine universelle Domain
; ============================================================

; 1. Service Binding Record (SVCB) für den primären MCP-Agenten
_agent._tcp.teleschmie.de.    3600 IN SVCB 1 mcp.api.teleschmie.de. (
                                alpn="mcp"
                                port="443"
                                key65300="v=dns-aid1"
                              )

; 2. TXT-Record Fallback mit Metadaten und Auth-Verweis
_agent._tcp.teleschmie.de.    3600 IN TXT "v=dns-aid1; id=company-agent; auth=https://teleschmie.de/auth.md; mcp=https://teleschmie.de/.well-known/mcp.json"

; 3. DANE TLSA-Record zur kryptografischen Authentifizierung
_443._tcp.mcp.api.teleschmie.de. 3600 IN TLSA 3 1 1 d2ab65...deine_hash_signatur...
```

## Die 3 häufigsten Fehler bei der Implementierung von DNS-AID

Da DNS-Einträge bei Fehlern weltweite Auswirkungen auf die Namensauflösung haben können, müssen Administratoren folgende Fallstricke meiden:

1. **Fehlende oder inkorrekte DNSSEC-Signierung:** Wird DNS-AID ohne aktives DNSSEC betrieben, stufen sicherheitsorientierte Agenten-Netzwerke die Einträge als nicht vertrauenswürdig ein und verweigern autonome Handlungen (Zero-Trust-Prinzip).
2. **Überlange TXT-Records ohne String-Splitting:** DNS-TXT-Records dürfen nach RFC 1035 pro Text-Segment maximal 255 Bytes enthalten. Wer Metadaten-Strings ungeteilt einfügt, riskiert Parsing-Fehler bei strikten Resolvern.
3. **Diskrepanz zwischen DNS-Endpunkten und HTTP-Manifesten:** Wenn der DNS-Record auf einen Server verweist, dessen [MCP Server Card](/glossar/mcp-server-card/) oder [auth.md](/glossar/auth-md/) nicht aktuell ist, schlägt der Verbindungsaufbau nach dem DNS-Lookup fehl.

## Terminal-Test: DNS-AID Records mit dig validieren

Systemadministratoren können die publizierten Einträge mit Standard-Netzwerk-Tools aus dem Terminal heraus überprüfen:

```bash
# Abfrage des SVCB-Records für den Agenten (Domain anpassen)
dig +short SVCB _agent._tcp.teleschmie.de

# Prüfung des TXT-Metadaten-Records inklusive DNSSEC-Validierung
dig +dnssec TXT _agent._tcp.teleschmie.de
```

Liefert die Abfrage die deklarierten Ports, Protokolle und das `ad`-Flag (Authenticated Data) für DNSSEC zurück, ist die Domain lückenlos für dezentrale Agent-Discovery gerüstet.

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
    Kopiere diesen Prompt direkt in deinen KI-Coding-Assistenten, um deine Domain-Zonendatei oder Terraform-Definition automatisiert mit DNS-AID-fähigen SVCB- und TXT-Records auszustatten:
  </p>
  <div class="bg-black/60 p-4 rounded-xl border border-white/10 text-xs font-mono text-gray-200 overflow-x-auto space-y-2">
    <p class="text-lime-accent font-bold mb-1"># Prompt: DNS-AID &amp; SVCB Resource Record Setup</p>
    <p><strong>Rolle:</strong> Du bist ein hochspezialisierter Network Engineer und Cloudflare Infrastructure Architect.</p>
    <p><strong>Aufgabe:</strong> Erstelle eine standardkonforme DNS-Konfiguration nach dem IETF-Entwurf draft-mozleywilliams-dnsop-dnsaid für unsere Domain, inklusive SVCB-Record (RFC 9460) und TXT-Metadaten.</p>
    <p><strong>Schritte &amp; Validierung:</strong></p>
    <p>1. Generiere die Zonendatei-Einträge für `_agent._tcp.teleschmie.de.` mit ALPN="mcp", Port 443 und v=dns-aid1.</p>
    <p>2. Formuliere den passenden TXT-Fallback-Record unter Einhaltung des 255-Byte-Limits für String-Segmente.</p>
    <p>3. Überprüfe die Konfiguration mit dig +short SVCB und stelle sicher, dass DNSSEC (ad-Flag) aktiv ist.</p>
  </div>
</div>

## Automatisierte DNS-AID-Bereitstellung in CI/CD-Pipelines

In modernen Cloud- und Enterprise-Infrastrukturen werden DNS-Einträge selten manuell gepflegt. Da sich Microservices, API-Versionen und Agenten-Endpunkte dynamisch ändern, muss auch DNS-AID automatisiert in Deployment-Pipelines integriert werden.

Unternehmen setzen hierbei auf Infrastructure-as-Code (IaC) wie Terraform oder OpenTofu sowie spezialisierte DNS-Management-APIs:

1. **Terraform-Integration:** Über standardisierte DNS-Provider werden SVCB- und TXT-Records deklarativ als Code definiert. Ändert sich der Endpunkt des MCP-Servers, aktualisiert die CI/CD-Pipeline den DNS-Record zeitgleich mit dem Rollout des neuen Container-Images.
2. **API-gestützte Synchronisation (z. B. via Linux Foundation Open Source Tools oder Cloudflare API):** Das Open-Source-Ökosystem bietet fertige SDK-Schnittstellen, um beim Start eines neuen Agenten-Services selbstständig einen DNS-AID-Eintrag im internen oder öffentlichen Nameserver zu registrieren.
3. **Health-Checks und automatisches Failover:** Fortgeschrittene DNS-Load-Balancer überwachen den HTTP-Status des registrierten Agenten. Antwortet ein MCP-Server nicht mehr mit HTTP 200, wird der SVCB-Record automatisch deaktiviert oder auf einen Ausweich-Endpunkt umgeschaltet.

Diese Automatisierung verhindert „tote“ Agenten-Einträge im globalen Namensraum und garantiert anfragenden Systemen maximale Zuverlässigkeit bei geschäftskritischen Transaktionen.

## Strategische Einordnung im Zeitalter der Agent Readiness

DNS-AID markiert die Speerspitze der [Agent Readiness](/glossar/agent-readiness/). Während die Basisanforderungen (Level 1 bis 5) den Schutz und die Bereitstellung von Inhalten auf Web-Ebene regeln, verankert DNS-AID die maschinelle Identität eines Unternehmens unlösbar in seiner Kern-Domain. In Kombination mit standardisierten Schnittstellen nach dem [A2A-Protocol](/glossar/a2a-protocol/) stellen Sie sicher, dass Ihre Marke von der nächsten Generation autonomer Systeme nicht nur gefunden, sondern als maßgebliche Entität anerkannt wird.

Welche Analysewerkzeuge Ihnen helfen, Ihre digitale Präsenz im KI-Ökosystem zu messen, erfahren Sie in unserem Vergleich der [Top 9 AI Visibility Tools](/blog/top-9-ai-visibility-tools/). Zur wirtschaftlichen Planung Ihrer technischen SEO- und API-Architektur steht Ihnen unser [SEO-Tool Kostenrechner](/tools/seo-tool-kostenrechner/) zur Verfügung.

<div class="my-10 bg-dark text-white p-8 rounded-3xl border border-white/10 text-center shadow-md not-prose">
  <span class="text-xs uppercase tracking-widest text-lime-accent font-mono font-bold mb-3 block">
    Aus Jörgs LinkedIn-Feed
  </span>
  <blockquote class="text-base md:text-lg text-gray-200 italic max-w-2xl mx-auto mb-4 border-none font-normal">
    „An erster Stelle steht für mich persönlich immer die saubere technische Indexierung. Ohne Indexierung keine Rankings, keine Ergebnisse.“
  </blockquote>
  <p class="text-gray-300 text-sm max-w-xl mx-auto mb-6">
    Diskutiere mit Jörg Zimmer und der SEO-Community auf LinkedIn über diesen Beitrag.
  </p>
  <a href="https://www.linkedin.com/feed/update/urn:li:activity:7090285441437851648" target="_blank" rel="noopener noreferrer" class="btn-primary">
    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    <span>Beitrag auf LinkedIn öffnen</span>
    <span aria-hidden="true">→</span>
  </a>
</div>

## Verwandte Glossar-Begriffe

- [DNS-Sovereignty](/glossar/dns-sovereignty/)
- [Agent Readiness](/glossar/agent-readiness/)
- [Model Context Protocol (MCP)](/glossar/model-context-protocol-mcp/)
- [A2A-Protocol](/glossar/a2a-protocol/)
- [MCP Server Card](/glossar/mcp-server-card/)
- [RFC 8288 Link-Header](/glossar/rfc-8288-link-headers/)
- [auth.md](/glossar/auth-md/)


