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

1. **DNS-Discovery-Request:** Der Agent fordert den SVCB-Record unter einem standardisierten Prefix an (z. B. `_agent._tcp.deinedomain.de`).
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
_agent._tcp.deinedomain.de.    3600 IN SVCB 1 mcp.api.deinedomain.de. (
                                alpn="mcp"
                                port="443"
                                key65300="v=dns-aid1"
                              )

; 2. TXT-Record Fallback mit Metadaten und Auth-Verweis
_agent._tcp.deinedomain.de.    3600 IN TXT "v=dns-aid1; id=company-agent; auth=https://api.deinedomain.de/auth.md; mcp=https://api.deinedomain.de/.well-known/mcp.json"

; 3. DANE TLSA-Record zur kryptografischen Authentifizierung
_443._tcp.mcp.api.deinedomain.de. 3600 IN TLSA 3 1 1 d2ab65...deine_hash_signatur...
```

<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-2xl">
  <p class="font-bold text-lime-800 mb-2">💡 Jörg Zimmer aus der SEO-Praxis:</p>
  <blockquote class="italic text-dark mb-3">
    „Hinter jeder Domain steht eine Strategie, eine Historie und ein Wunsch ganz oben dazu gehören.“
  </blockquote>
  <a href="https://www.linkedin.com/feed/update/urn:li:activity:6997882103384154112" target="_blank" rel="noopener noreferrer" class="text-sm font-bold text-lime-700 hover:underline inline-block">
    ↗ Zur Diskussion auf LinkedIn
  </a>
</div>

## Die 3 häufigsten Fehler bei der Implementierung von DNS-AID

Da DNS-Einträge bei Fehlern weltweite Auswirkungen auf die Namensauflösung haben können, müssen Administratoren folgende Fallstricke meiden:

1. **Fehlende oder inkorrekte DNSSEC-Signierung:** Wird DNS-AID ohne aktives DNSSEC betrieben, stufen sicherheitsorientierte Agenten-Netzwerke die Einträge als nicht vertrauenswürdig ein und verweigern autonome Handlungen (Zero-Trust-Prinzip).
2. **Überlange TXT-Records ohne String-Splitting:** DNS-TXT-Records dürfen nach RFC 1035 pro Text-Segment maximal 255 Bytes enthalten. Wer Metadaten-Strings ungeteilt einfügt, riskiert Parsing-Fehler bei strikten Resolvern.
3. **Diskrepanz zwischen DNS-Endpunkten und HTTP-Manifesten:** Wenn der DNS-Record auf einen Server verweist, dessen [MCP Server Card](/glossar/mcp-server-card/) oder [auth.md](/glossar/auth-md/) nicht aktuell ist, schlägt der Verbindungsaufbau nach dem DNS-Lookup fehl.

## Terminal-Test: DNS-AID Records mit dig validieren

Systemadministratoren können die publizierten Einträge mit Standard-Netzwerk-Tools aus dem Terminal heraus überprüfen:

```bash
# Abfrage des SVCB-Records für den Agenten (Domain anpassen)
dig +short SVCB _agent._tcp.deinedomain.de

# Prüfung des TXT-Metadaten-Records inklusive DNSSEC-Validierung
dig +dnssec TXT _agent._tcp.deinedomain.de
```

Liefert die Abfrage die deklarierten Ports, Protokolle und das `ad`-Flag (Authenticated Data) für DNSSEC zurück, ist die Domain lückenlos für dezentrale Agent-Discovery gerüstet.

## Automatisierte DNS-AID-Bereitstellung in CI/CD-Pipelines

In modernen Cloud- und Enterprise-Infrastrukturen werden DNS-Einträge selten manuell gepflegt. Da sich Microservices, API-Versionen und Agenten-Endpunkte dynamisch ändern, muss auch DNS-AID automatisiert in Deployment-Pipelines integriert werden.

Unternehmen setzen hierbei auf Infrastructure-as-Code (IaC) wie Terraform oder OpenTofu sowie spezialisierte DNS-Management-APIs:

1. **Terraform-Integration:** Über standardisierte DNS-Provider werden SVCB- und TXT-Records deklarativ als Code definiert. Ändert sich der Endpunkt des MCP-Servers, aktualisiert die CI/CD-Pipeline den DNS-Record zeitgleich mit dem Rollout des neuen Container-Images.
2. **API-gestützte Synchronisation (z. B. via Infoblox oder Cloudflare API):** Das Open-Source-Toolkit `dns-aid-core` bietet fertige Schnittstellen, um beim Start eines neuen Agenten-Services selbstständig einen DNS-AID-Eintrag im internen oder öffentlichen Nameserver zu registrieren.
3. **Health-Checks und automatisches Failover:** Fortgeschrittene DNS-Load-Balancer überwachen den HTTP-Status des registrierten Agenten. Antwortet ein MCP-Server nicht mehr mit HTTP 200, wird der SVCB-Record automatisch deaktiviert oder auf einen Ausweich-Endpunkt umgeschaltet.

Diese Automatisierung verhindert „tote“ Agenten-Einträge im globalen Namensraum und garantiert anfragenden Systemen maximale Zuverlässigkeit bei geschäftskritischen Transaktionen.

## Strategische Einordnung im Zeitalter der Agent Readiness

DNS-AID markiert die Speerspitze der [Agent Readiness](/glossar/agent-readiness/). Während die Basisanforderungen (Level 1 bis 5) den Schutz und die Bereitstellung von Inhalten auf Web-Ebene regeln, verankert DNS-AID die maschinelle Identität eines Unternehmens unlösbar in seiner Kern-Domain. In Kombination mit standardisierten Schnittstellen nach dem [A2A-Protocol](/glossar/a2a-protocol/) stellen Sie sicher, dass Ihre Marke von der nächsten Generation autonomer Systeme nicht nur gefunden, sondern als maßgebliche Entität anerkannt wird.

Welche Analysewerkzeuge Ihnen helfen, Ihre digitale Präsenz im KI-Ökosystem zu messen, erfahren Sie in unserem Vergleich der [Top 9 AI Visibility Tools](/blog/top-9-ai-visibility-tools/). Zur wirtschaftlichen Planung Ihrer technischen SEO- und API-Architektur steht Ihnen unser [SEO-Tool Kostenrechner](/tools/seo-tool-kostenrechner/) zur Verfügung.

