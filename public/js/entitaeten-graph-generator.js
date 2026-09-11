(function() {
  const getPromptTemplate = (url) => `Bitte analysiere die folgende Ziel-Domain gründlich, führe ein fundiertes Entity-Audit durch und erstelle einen global vernetzten, 100 % validen Schema.org @graph JSON-LD Wissensgraphen:

ZIEL-DOMAIN: ${url}

Rolle: Du agierst als hochgradig spezialisierter Technical SEO Architect, Knowledge Graph Ontologe und forensischer Daten-Prüfer für alle erdenklichen Unternehmensformen, Webseiten-Architekturen und Branchen-Szenarien weltweit.

==============================
STRIKTE DIRECTIVES & ZERO-HALLUCINATION PROTOCOL (HÖCHSTE PRIORITÄT):
==============================
1. ZERO-HALLUCINATION & LINK-PROVENANCE:
   - Erfinde oder rate NIEMALS URLs oder Social-Media-Links.
   - Profile dürfen NUR DANN in 'sameAs' aufgenommen werden, wenn sie entweder direkt auf der Website verlinkt sind (z. B. Footer-Links zu LinkedIn, YouTube, Instagram, X, TikTok, GitHub) ODER ein autoritatives Profil (LinkedIn Org/Person, Crunchbase, North Data, GitHub) in seiner Bio die Ziel-Domain explizit aufführt (verifizierte Triangulation). Unbestätigte Profile Dritter gehören in die Quarantäne-Tabelle!

2. WIKIDATA Q-ID VERIFIKATIONS-GATE:
   - Erfinde NIEMALS Wikidata Q-IDs!
   - Für Organisation/Personen: Wikidata-Property 'official website' (P856) muss mit der Domain matchen. Fehlt der Eintrag: KEINE Q-ID verwenden!
   - Für Fachdisziplinen ('knowsAbout'): Nutze nur reale, universelle Wikidata-URIs etablierter Fachkonzepte (z. B. Q223788 für SEO).

3. STRIKTE JSON-SYNTAX & PARSER-SAFETY (KEINE KOMMENTARE):
   - Der finale JSON-LD Code-Block darf AUSNAHMSLOS NUR 100 % valides JSON enthalten.
   - Schreibe NIEMALS JavaScript-Kommentare (weder // noch /* */) in den JSON-Code, da dies Parser und den Google Rich Results Test zum Absturz bringt!

4. STRIKTER EIGENNAMEN-SCHUTZ (ANTI-TRANSLATION MANDATE):
   - Eigennamen von Personen, Gründern, Autoren, Marken und Firmen MÜSSEN ZWINGEND in ihrer amtlichen Originalschreibweise belassen werden! Übersetze NIEMALS Vor- oder Nachnamen in andere Sprachen!

5. PFLICHT-KNOTEN VOLLSTÄNDIGKEIT & STRENGES PLATZHALTER-VERBOT (ANTI-PLACEHOLDER GUARD):
   - JEDE reale Schlüsselperson (Inhaber, Geschäftsführer, Gründer, Hauptautoren), die namentlich im Impressum oder auf Team-Seiten genannt ist, MUSS ZWINGEND als eigenständiger '@type': 'Person' Knoten im '@graph'-Array generiert werden!
   - STRENGSTES PLATZHALTER- & DUMMY-VERBOT:
     * Ein 'Person'-Knoten darf AUSNAHMSLOS NUR DANN erzeugt werden, wenn ein ECHTER, bürgerlicher Vor- und Zuname einer realen natürlichen Person (z. B. "Nicole Voigt", "Andreas Absmeier") nachgewiesen wurde!
     * Es ist STRENGSTENS UNTERSAGT, Amts-/Berufsbezeichnungen oder Platzhalter wie "Geschäftsführung digitalagentur.berlin", "Agenturleitung", "Inhaber", "Team" oder "Admin" als 'name', 'givenName' oder 'familyName' einzusetzen! Solche Dummy-Knoten zerstören E-E-A-T!
     * Fehlt auf der gesamten Website ein Vor- und Zuname: Erstelle KEINEN 'Person'-Knoten! Die Felder 'founder' und 'employee' entfallen dann ersatzlos.
   - Bidirektionale Kopplung & Array-Zwang:
     * Die Organisation referenziert Personen ZWINGEND als Array: 'founder': [{"@id": "${url}#person-[slug]"}] oder 'employee': [{"@id": "${url}#person-[slug]"}] (auch bei 1 Person immer als Array!).
     * Der Person-Knoten enthält 'worksFor': {"@id": "${url}#organization"}.
     * Trianguliere für jede Person offizielle Profile (LinkedIn, X) und hinterlege sie im 'sameAs'-Array des Person-Knotens!

6. DEFINEDTERM-STANDARD FÜR 'KNOWSABOUT':
   - Formatiere 'knowsAbout' bevorzugt als semantische 'DefinedTerm'-Objekte mit 'name' und kanonischer Wikidata-URI in 'sameAs' (z. B. {"@type": "DefinedTerm", "name": "Digital Twin", "sameAs": "https://www.wikidata.org/wiki/Q25384725"}).

7. DISAMBIGUIERUNG PROPRIETÄRER MARKEN:
   - Besitzt die Ziel-Domain geschützte Markennamen oder Technologien ohne Wikidata-Item: Nutze 'disambiguatingDescription', um den Unterschied zu generischen Begriffen glasklar zu definieren.

8. ANTI-TRUNCATION GUARD:
   - Beschränke den 'OfferCatalog' im JSON-LD strikt auf die 3 bis 5 wichtigsten Kern-Leistungen/Hauptkategorien, um Token-Limits zu schützen. Der Block muss sauber mit </script> schließen!

9. SPRACH-SYNCHRONITÄT:
   - Alle Schema-Texte ('description', 'itemOffered.description') müssen in der primären Website-Sprache ('inLanguage') formuliert sein.

10. AUTHENTISCHE REVIEWS & MEDIA-PROVENANCE:
    - Erstelle 'review'- und 'VideoObject'-Knoten AUSNAHMSLOS NUR DANN, wenn echte Kundenrezensionen oder reale Videos auf der Website existieren. Fake-Reviews sind strengstens verboten!

11. SCHEMA.ORG VALIDATOR COMPLIANCE & ZERO PSEUDO-TYPES:
    - Verwende NUR offiziell existierende Schema-Typen! Pseudo-Typen wie 'Manufacturer', 'ConsultingService', 'Agency' oder 'SaaSCompany' sind verboten.
    - Für Industrie/Hersteller: '@type': 'Corporation' (oder ['Organization', 'Corporation']) + additionalType: 'https://www.wikidata.org/wiki/Q131269'.
    - Für Berater/Agenturen: '@type': 'ProfessionalService' + additionalType: 'https://www.wikidata.org/wiki/Q6498770'.
    - Für Online-Shops: 'OnlineStore'.

12. LOCALBUSINESS VS. ORGANIZATION PROPERTY-RESTRIKTIONEN:
    - 'priceRange', 'openingHoursSpecification', 'hasMap', 'geo', 'paymentAccepted', 'currenciesAccepted' sind NUR auf 'LocalBusiness' (oder Place) zulässig! Auf reiner 'Organization'/'Corporation' wirft der Schema.org Validator sofort harte Fehler!
    - Hat die Firma physische Standorte/Kundenzeiten, nutze Multi-Type: ["Organization", "LocalBusiness"] bzw. ["Corporation", "LocalBusiness"]. Reine Digital-/Holding-Firmen dürfen diese Felder NICHT im Hauptknoten führen.

13. REVIEW PFLICHTFELD 'itemReviewed':
    - Jedes 'Review'-Objekt MUSS ZWINGEND "itemReviewed": { "@id": "${url}#organization" } enthalten!

14. EXAKTER DOMAIN-ANKER & ANTI-HOMONYM-SCHRANKE (ABSOLUTE PRIORITÄT):
    - Die ZIEL-DOMAIN '${url}' ist die EINZIGE Quelle der Wahrheit! Fremdfirmen gleichen Namens an anderen Orten (Homonyme) dürfen NIEMALS vermischt werden.
    - ANTI-SURFACE BIAS: Schließe niemals von der Domain blind auf ein Standard-Modell (z. B. 'digitalagentur.berlin' ist kein Dienstleister, sondern Senatsförderung). Die On-Page-Selbstbeschreibung sticht jedes LLM-Vorurteil!

15. UNIVERSELLE MULTI-SCHIENEN MATRIX:
    - SCHIENE A (FREIBERUFLER & EINZELUNTERNEHMER): Kein HRB, Inhaber ist natürliche Person. 'name' ist die Marke/Plattform (z. B. "Freelancer Team"), 'legalName' ist der bürgerliche Name des Inhabers laut Impressum (z. B. "Andreas Absmeier")! Verknüpfe die Inhaber-Person nahtlos mit der Organisation via 'founder', 'worksFor' und 'provider'.
    - SCHIENE B (KMU, MITTELSTAND & MEISTERBETRIEBE): GmbH, UG, e.K. mit HRB/HRA. Suche im Impressum nach Handwerkskammer Betriebsnummer (HWK), Installateurverzeichnis Stromnetz und binde sie als 'PropertyValue' in 'identifier' ein!
    - SCHIENE C (KONZERNE & HOLDINGS): AG, SE mit 'parentOrganization' / 'subOrganization'.
    - SCHIENE D (GEMEINNÜTZIGE TRÄGER & NGOS): e.V., gGmbH ('NGO', 'Nonprofit501cOrganization').
    - SCHIENE E (BILDUNG & BEHÖRDEN): 'EducationalOrganization', 'GovernmentOrganization'.
    - SCHIENE F (E-COMMERCE): 'OnlineStore' mit 'MerchantReturnPolicy' und 'Offer'.
    - SCHIENE G (SAAS & TECH-PLATTFORMEN): 'SoftwareApplication' / 'Corporation' (keine unzulässigen 'geo'-Felder!).
    - SCHIENE H (ALLE ARCHITEKTUREN): Multi-Page, One-Pager (Anker), Subdomains, Mehrsprachigkeit.

==============================
DAS UNIVERSELLE SCHEMA.ORG 800+ PFLICHTENHEFT:
==============================

A. CORE COMPANY PFLICHT-KATALOG (ORGANIZATION & SUBKLASSEN):
- 'legalName': Amtlicher Name laut Handelsregister / Impressum inklusive Rechtsform (z. B. "DAB Digitalagentur Berlin GmbH", "Teleschmiede GmbH"). Bei Einzelunternehmen / Freiberuflern (Schiene A) ist 'legalName' der amtliche bürgerliche Name des Inhabers (z. B. "Andreas Absmeier")! Niemals die nackte Domain als legalName einsetzen!
- 'name': Etablierter Marken- oder Plattformname (z. B. "Freelancer Team")
- 'alternateName': Gängige Abkürzungen/Aliasse
- 'additionalType': Nischen-Disambiguierung via Wikidata-URI
- 'foundingDate' & 'foundingLocation': Gründungsjahr und Gründungsort (z. B. {"@type": "Place", "name": "Berlin"})
- 'numberOfEmployees': Teamgröße / Mitarbeiterzahl
- 'slogan' & 'description': Offizieller Claim und prägnante Beschreibung
- 'address': Vollständige PostalAddress ('streetAddress' mit Hausnummer, 'postalCode', 'addressLocality', 'addressRegion', 'addressCountry')
- 'geo' & 'hasMap': Bei physischen Standorten GeoCoordinates und Google Maps URL
- 'contactPoint': ContactPoint mit 'telephone', 'email', 'contactType' und 'availableLanguage'
- 'vatID': USt-IdNr. (z. B. "DE123456789")
- 'taxID': Amtliche Steuernummer (HRB/HRA gehört NIEMALS in taxID!)
- 'identifier': Handelsregister (HRB/HRA) sowie Meister-/Handwerksregister (HWK-Betriebsnummer, Installateurverzeichnis) ZWINGEND als PropertyValue-Array: [{"@type": "PropertyValue", "propertyID": "Commercial Register Number", "name": "Handelsregister", "value": "HRB 12345"}, {"@type": "PropertyValue", "propertyID": "Crafts Chamber Operating Number", "name": "Handwerkskammer Betriebsnummer", "value": "140161"}]
- 'areaServed': Strukturiertes Array aus 'Country'/'AdministrativeArea' mit Wikidata-URIs (z. B. [{"@type": "Country", "name": "Deutschland", "sameAs": "https://www.wikidata.org/wiki/Q183"}, ...])
- 'priceRange' & 'openingHoursSpecification': Nur bei physischem Gewerbe/LocalBusiness
- 'hasCredential' / 'award': ISO-Zertifikate, Meisterbriefe, Auszeichnungen
- 'memberOf': Kammer-/Verbandsmitgliedschaften (IHK, HWK) mit Wikidata-URI
- 'subjectOf': Verifizierte Presseartikel, Podcasts, Videos (CreativeWork / VideoObject)
- 'review': 2 bis 3 authentische Rezensionen (mit 'reviewRating', 'author', 'reviewBody', 'itemReviewed') – keine Fake-Reviews!
- 'founder' & 'employee': ZWINGEND als ARRAY mit Referenzen ([{"@id": "${url}#person-[slug]"}])
- 'knowsAbout': Array mit kanonischen Wikidata-URIs / DefinedTerms der Fachgebiete
- 'logo' & 'image': Absolute Bild-URLs (Logo, Open-Graph-Image)
- 'sameAs': Verifizierte Profile (LinkedIn Company, YouTube, Instagram, Facebook, TikTok, North Data, Maps, kgmid)

B. DEEP PERSON & E-E-A-T KATALOG (FÜR ALLE SCHLÜSSELPERSONEN):
Erfasse ausnahmslos ALLE auf der Website (Impressum, Team) auffindbaren realen Personen:
- '@id': '${url}#person-[slug]', '@type': 'Person'
- 'name', 'givenName', 'familyName' (STRENG IN ORIGINAL-SCHREIBWEISE, NIEMALS ÜBERSETZEN!)
- 'jobTitle', 'image', 'description', 'worksFor': {"@id": "${url}#organization"}
- 'alumniOf': Universitäten mit Name und Wikidata-URI
- 'hasCredential' / 'hasOccupation': Abschlüsse, Meisterbriefe, Zertifikate
- 'knowsLanguage': Gesprochene Sprachen (z. B. ["de", "en"])
- 'knowsAbout': DefinedTerms mit Wikidata-URIs
- 'sameAs': Individuelle verifizierte Profile (LinkedIn Person, X, GitHub, ORCID)

C. DYNAMISCHES SUBKLASSEN-MAPPING & ANGEBOTSKATALOG:
- LOKALES GEWERBE: Subklasse von 'LocalBusiness' (geo, openingHours, priceRange, paymentAccepted).
- BERATER & AGENTUREN: 'ProfessionalService' mit additionalType: "https://www.wikidata.org/wiki/Q6498770" (niemals ConsultingService!).
  * 'hasOfferCatalog' -> 'OfferCatalog' -> 'itemListElement' ('Offer' mit 'seller', 'itemOffered' als 'Service').
  * SERVICE-REGEL: 'serviceType' gehört laut Schema.org ZWINGEND direkt an den 'Service' (z. B. "Remote-Service", "Vor-Ort-Montage"), NIEMALS an den 'ServiceChannel'! 'availableChannel' ist ein 'ServiceChannel' mit 'serviceUrl', 'servicePhone', 'availableLanguage'.
- SHOPS: 'OnlineStore' mit Product, Offer, MerchantReturnPolicy.
- SAAS: 'SoftwareApplication'.
- INDUSTRIE: 'Corporation' mit additionalType: "https://www.wikidata.org/wiki/Q131269".

==============================
ABLAUF DES AGENTISCHEN AUDITS:
==============================

PHASE 1: ON-PAGE MULTI-PFADE-CRAWL:
1. Startseite (${url}): Slogan, Kernangebote, Meta-Tags (og:image, description), Favicon. Suche im Footer ganz gezielt nach Social-Media-Icon-Links (<a> mit href zu LinkedIn, YouTube, Instagram, Facebook, TikTok, X, GitHub)! Übersehe NIEMALS Social-Links im Footer!
2. Impressum (DYNAMISCHE PFAD-AUFLÖSUNG):
   - Suche im Footer nach Links wie /impressum/, /imprint/, /legal/, /rechtliches/, /kontakt/.
   - Extrahiere die amtlichen Fakten: Juristischer Name, Inhaber/Geschäftsführer (Vor- und Zuname für Person-Knoten!), Anschrift, Telefon, E-Mail, HRB/HRA, Registergericht, USt-IdNr.
3. Über-uns & Team (/ueber-uns/, /about/, /team/): Gründungsjahr, Teamgröße, Führungspersonen, Vita, Porträts.
4. Angebote (/leistungen/, /services/): Die 3 bis 5 wichtigsten Kernleistungen für OfferCatalog.

PHASE 2: DEEP WEB-RECHERCHE & 2-PUNKTE-TRIANGULATION:
- Trianguliere ungelinkte Unternehmensregister (North Data), verifizierte Social-Profile (LinkedIn, Crunchbase) und Bewertungen (Google Maps, ProvenExpert).
- 2-Punkte-Check: Name + Arbeitgeber matcht Domain ODER Stadt & Fachthema stimmen überein.

PHASE 3: SCHEMA.ORG @graph SYNTHESE (FLACH & VOLL VERNETZT):
- '${url}#organization': Hauptknoten mit vollem Core-Katalog (legalName, Adresse, identifier, sameAs, founder, etc.)
- '${url}#website': WebSite mit publisher, inLanguage, potentialAction (SearchAction) und hasPart (Blog, Glossar falls vorhanden)
- '${url}#about': AboutPage mit url, name, isPartOf und about: {"@id": "${url}#organization"}
- '${url}#contact': ContactPage mit url, name, isPartOf und mainEntity: {"@id": "${url}#organization"}
- '${url}#person-[slug]': Für jede identifizierte Schlüsselperson mit vollem E-E-A-T Katalog und worksFor
- '${url}#offer-catalog': OfferCatalog mit Services (serviceType direkt an Service deklariert)

PHASE 4: SCHEMA.ORG VALIDATOR PRE-FLIGHT AUDIT:
1. TYPEN: Nur existierende Schema-Typen (kein Manufacturer, kein ConsultingService).
2. DOMAIN/RANGE: geo, openingHours, priceRange nur auf LocalBusiness/Place.
3. IDENTIFIER: Handelsregister und Handwerksregister in 'identifier' als PropertyValue, niemals in 'taxID'.
4. REVIEW: Jedes Review enthält 'itemReviewed': {"@id": "${url}#organization"}.
5. SERVICE: 'serviceType' liegt direkt am 'Service', niemals am 'ServiceChannel'.
6. KNOTEN: Alle identifizierten Personen sind als Person-Knoten im @graph enthalten.
7. SYNTAX: 100 % valides JSON, absolut KEINE Kommentare (// oder /* */).

PHASE 5: REALITY-CHECK:
- Haluziniere keine Autorität herbei! Fehlen externe Signale, liefere einen 5-Schritte-Fahrplan zur Entitäten-Etablierung.

==============================
FINALE AUSGABE (ZWEI PFLICHT-BLÖCKE):
==============================

BLOCK 1: DER ENTITY-AUDIT REPORT (MARKDOWN-TABELLEN)
1. Tabelle „Verifizierte Entitäten & Vollständigkeits-Check“:
   | Entität | Schema.org Typ | Eindeutige @id | Erfasste Pflicht-Attribute (Gründung, Adresse, E-E-A-T, Zertifikate) | Verifikations-Quelle |
2. Tabelle „Link-Provenance & Social Profiles“:
   | Plattform / Dienst | Profil-URL | Status (On-Page verifiziert / Trianguliert / Quarantäne) |
3. Tabelle „CMS & Technische Infrastruktur“:
   | Komponente | Erkannte Software / Plattform | Einbindung im Graph |
4. „Knowledge Graph Reality-Check & Lückenanalyse“:
   - Was ist die Entität und was ist sie NICHT (Disambiguierung)?
   - 3 bis 5 konkrete Handlungsempfehlungen für externe Signale.
5. „1-Klick Schema.org Validator Schnelltest“:
   - Direkter Test-Link: https://validator.schema.org/#url=${url}

BLOCK 2: DER GLOBAL VALIDIERBARE SCHEMA.ORG @graph JSON-LD CODE
- Ein einziger, vollständiger Code-Block in der passenden Hauptsprache der Website:
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      ...
    ]
  }
  </script>
- Vollständig valider Syntax-Code (KEINE JavaScript-Kommentare!), bereit für den Google Rich Results Test und den Schema.org Validator.`;

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
      const originalHtml = btnCopy.innerHTML;
      try {
        await navigator.clipboard.writeText(textarea.value);
      } catch (err) {
        textarea.select();
        document.execCommand('copy');
      }

      btnCopy.classList.add('!bg-lime-500', '!text-dark');
      btnCopy.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        <span>Kopiert!</span>
      `;
      if (successMsg) successMsg.classList.remove('hidden');
      setTimeout(() => {
        btnCopy.innerHTML = originalHtml;
        btnCopy.classList.remove('!bg-lime-500', '!text-dark');
        if (successMsg) successMsg.classList.add('hidden');
      }, 3500);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
