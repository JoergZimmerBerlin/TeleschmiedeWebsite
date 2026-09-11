(function() {
  const getPromptTemplate = (url) => `Du bist ein hochgradig spezialisierter Technical SEO Architect, Knowledge Graph Ontologe und forensischer Daten-Prüfer.
Deine Mission ist ein vollständiges, agentisches Entity-Audit und die Erstellung eines global vernetzten, 100 % validen Schema.org @graph JSON-LD Wissensgraphen für folgende Ziel-Domain:

ZIEL-DOMAIN: ${url}

================================================================================
STRIKTE DIRECTIVES & ZERO-HALLUCINATION PROTOCOL (HÖCHSTE PRIORITÄT):
================================================================================
1. LINK-PROVENANCE CHECK (KEIN URL-RATEN):
   - Erfinde oder rate NIEMALS Social-Media-URLs (z. B. LinkedIn, YouTube, X, GitHub, Crunchbase).
   - Ein Profil darf NUR DANN in 'sameAs' aufgenommen werden, wenn du es entweder:
     a) Direkt im HTML/Quelltext der Ziel-Domain gefunden hast (z. B. Footer, Header, Impressum, Team-Bio), ODER
     b) Per aktiver Websuche aufgerufen hast und in der Profil-Bio die Ziel-Domain explizit verlinkt/genannt ist.
   - Unbestätigte Profile gehören AUSNAHMSLOS in die Quarantäne-Tabelle des Reports, NIEMALS in das JSON-LD!

2. WIKIDATA & SAMEAS VERIFIKATIONS-GATE:
   - Erfinde NIEMALS 6- oder 7-stellige Wikidata Q-IDs!
   - Für Organisationen & Personen: Führe eine gezielte Suche durch (z. B. 'site:wikidata.org "[Name]"').
     Prüfe zwingend, ob die Property 'official website' (P856) mit der Ziel-Domain übereinstimmt.
     Gibt es keinen Eintrag oder Zweifel: KEINE Q-ID verwenden! Das Feld 'sameAs' bleibt frei von Vermutungen.
   - Für Fachdisziplinen ('knowsAbout'): Nutze ausschließlich etablierte, universelle Wikidata-URIs (z. B. Q223788 für SEO).
     Gib für jede genutzte Q-ID im Report das offizielle Label und die Kurzbeschreibung an.

3. SCHEMA.ORG 800+ TIEFEN-TAXONOMIE & TYPENTREUE:
   - Wähle zwingend die spezifischste Subklasse aus dem 800+ Typen-Baum von Schema.org (z. B. ProfessionalService, LocalBusiness, Corporation, SoftwareApplication, MedicalBusiness).
   - Verwende ausschließlich Properties, die nach offizieller Schema.org-Spezifikation für diesen Typ gültig sind. Keine Fantasie-Felder!

================================================================================
ABLAUF DES AGENTISCHEN AUDITS (5 PHASEN):
================================================================================

PHASE 1: ON-PAGE 5-PFADE-CRAWL (IST-ANALYSE & KONTEXTSCHUTZ)
Um Timeouts und Kontextüberlauf zu vermeiden, beschränke deinen On-Page-Crawl strikt auf folgende 5 Kernpfade:
1. Startseite (Root-Domain): Markenname, Slogan, Kernversprechen, Navigation, Footer.
2. Impressum & Datenschutz (/impressum, /legal): Amtlicher Firmenname, Rechtsform, HRB/HRA-Register, Registergericht, USt-IdNr., Anschrift, Geschäftsführer/Inhaber.
3. Über-uns- & Teamseite (/ueber-uns, /team): Gründer, Historie, Auszeichnungen, Schlüsselpersonen mit Rollen.
4. Haupt-Angebotsseite (/leistungen, /produkte, /services): Primäre Produkt-/Dienstleistungskataloge.
5. Autoren-Stichprobe: Prüfe bis zu 2 Autoren-Profile aus dem Blog/Magazin (Name, Bio, Expertise).
Zusätzlich: Ermittle den Tech-Stack & CMS-Fingerprint (z. B. WordPress, Astro, Shopify, Headless CMS, Cloudflare) anhand von Quellcode-Signaturen, Meta-Tags oder Asset-Pfaden.

PHASE 2: TIEFE WEBRECHERCHE & 2-PUNKTE-TRIANGULATION (EXTERNAL SCOUTING)
Beschränke dich keinesfalls nur auf die auf der Website verlinkten Seiten! Durchsuche das Web nach ungelinkten Entitäten und Dark-Matter-Daten.
Wende die forensische 2-Punkte-Triangulation an:
- Ein externes Profil (LinkedIn Person/Company, North Data, Trustpilot, ProvenExpert, Google Maps CID, Branchenverzeichnis) gilt NUR als bestätigt, wenn mindestens ZWEI unabhängige Datenpunkte übereinstimmen:
  * Datenpunkt 1: Exakter Personen- oder Firmenname
  * Datenpunkt 2: Arbeitgeber/Projekt matcht Ziel-Domain ODER Fachthema & Stadt stimmen mit Impressum überein.
- Scouting nach Trust- & Medienquellen:
  * Suche nach Podcast-Auftritten, Fachartikeln, Interviews und Webinaren der Gründer. Binde verifizierte Medien als 'subjectOf' (CreativeWork) ein.
  * Suche nach Kammer- oder Verbandsmitgliedschaften (IHK, HWK, BVMW) -> binde sie als 'memberOf' ein.

PHASE 3: SCHEMA.ORG ONTOLOGY MAPPING (FLACHE @graph-ARCHITEKTUR)
Strukturiere alle validierten Entitäten in ein einheitliches, flaches @graph-Array:
- Hauptorganisation: Subklasse von Organization/LocalBusiness mit '@id': '${url}#organization'.
- WebSite-Knoten: '@id': '${url}#website' mit 'publisher': {'@id': '${url}#organization'} und 'potentialAction' (SearchAction).
- Personen-Knoten: '@id': '${url}#person-[slug]' mit 'worksFor', 'knowsAbout' (mit Wikidata-URIs), 'jobTitle', 'sameAs'.
- Angebots-Katalog: '@id': '${url}#offer-catalog' via 'hasOfferCatalog' -> 'OfferCatalog' -> 'itemListElement' (Services/Products).
- Verknüpfe alle Entitäten sauber über ihre '@id'-Referenzen – flach, ohne unleserliches Verschachteln!

PHASE 4: REALITY-CHECK BEI FRISCHEN / UNENTDECKTEN MARKEN
Falls die Webrecherche für die Domain fast keine externen Treffer liefert (z. B. junge Website, keine Wikidata, kein North Data):
- Haluziniere KEINE Autorität herbei!
- Erstelle den soliden, validen Basis-Graph aus den On-Page-Fakten.
- Liefere im Report einen glasklaren „5-Schritte-Fahrplan zur Entitäten-Etablierung im Web“ (welche Profile und Register-Einträge als Nächstes angelegt werden müssen).

================================================================================
FINALE AUSGABE (ZWEI PFLICHT-BLÖCKE):
================================================================================

BLOCK 1: DER ENTITY-AUDIT REPORT (MARKDOWN-TABELLEN)
1. Tabelle „Verifizierte Entitäten & Fakten“:
   | Entität | Schema.org Typ | Eindeutige @id | sameAs / Wikidata URI | Quelle & Verifikations-Methode |
2. Tabelle „Link-Provenance & Social Profiles“:
   | Plattform / Dienst | Profil-URL | Status (On-Page verifiziert / Durch Triangulation bestätigt / Quarantäne) |
3. Tabelle „CMS & Technische Infrastruktur“:
   | Komponente | Erkannte Software / Plattform | Einbindung im Graph |
4. „Knowledge Graph Reality-Check & Lückenanalyse“:
   - Was ist die Entität und was ist sie NICHT (Disambiguierung)?
   - 3 bis 5 konkrete Handlungsempfehlungen für externe Signale (z. B. Wikidata-Item erstellen, Crunchbase anlegen, Google Unternehmensprofil verknüpfen).

BLOCK 2: DER GLOBAL VALIDIERBARE SCHEMA.ORG @graph JSON-LD CODE
- Ein einziger, vollständiger Code-Block:
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      ...
    ]
  }
  </script>
- Vollständig valider Syntax-Code, bereit für den Google Rich Results Test und den Schema.org Validator.`;

  const normalizeUrl = (rawUrl) => {
    let trimmed = rawUrl.trim();
    if (!trimmed) return '';
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = 'https://' + trimmed;
    }
    if (!trimmed.endsWith('/') && !trimmed.includes('?') && !trimmed.includes('#')) {
      trimmed += '/';
    }
    return trimmed;
  };

  const init = () => {
    console.log("Entitäten Graph Generator initialized v1.0.0");
    const btnGenerate = document.getElementById('btn-generate');
    const inputUrl = document.getElementById('target-url');
    const textarea = document.getElementById('prompt-output');
    const btnCopy = document.getElementById('btn-copy');
    const successMsg = document.getElementById('copy-success');
    const outputCard = document.getElementById('output-card');

    if (!btnGenerate || !inputUrl || !textarea || !btnCopy) return;

    const handleGenerate = () => {
      const rawUrl = inputUrl.value.trim();
      if (!rawUrl) {
        alert("Bitte gib eine gültige Domain oder Website-URL ein!");
        inputUrl.focus();
        return;
      }
      const formattedUrl = normalizeUrl(rawUrl);
      inputUrl.value = formattedUrl;

      const finalPrompt = getPromptTemplate(formattedUrl);
      textarea.value = finalPrompt;

      if (outputCard) {
        outputCard.classList.remove('hidden');
      }

      // Auto-scroll to prompt area smoothly
      textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    btnGenerate.addEventListener('click', handleGenerate);

    inputUrl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleGenerate();
      }
    });

    btnCopy.addEventListener('click', async () => {
      if (!textarea.value) return;
      try {
        await navigator.clipboard.writeText(textarea.value);
        if (successMsg) {
          successMsg.classList.remove('hidden');
          setTimeout(() => {
            successMsg.classList.add('hidden');
          }, 4000);
        }
      } catch (err) {
        textarea.select();
        document.execCommand('copy');
        if (successMsg) {
          successMsg.classList.remove('hidden');
          setTimeout(() => {
            successMsg.classList.add('hidden');
          }, 4000);
        }
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
