(function() {
    const ontologyList = `
Gruppe A: Akteure & Einheiten
- Organization (Organisation / Firma)
- Person (Natürliche Person)
- Audience (Rolle / Zielgruppe)

Gruppe B: Kommerzielle Angebote
- Product (Physisches/Digitales Produkt)
- Service (Dienstleistung / Service)
- SoftwareApplication (Software / Plattform / Feature)
- CategoryCode (Marktsegment / Kategorie)

Gruppe C: Wissen & Methodik
- Thing (Disziplin / Praxisbereich)
- DefinedTerm (Concept / Begriff)
- CreativeWork (Abgeschlossenes Werk / Dok.)
- Dataset (Datensatz / Corpus)
- Standard (Spezifikation / Standard)
- HowTo (Prozedur / Methode)

Gruppe D: Zeit, Raum & Messung
- Place (Physischer Ort / Region)
- Event (Zeitlich begrenztes Ereignis)
- QuantitativeValue (Score / Metrik)
- Project (Projekt / Initiative)
    `.trim();

    const getPromptTemplate = (url) => `Du bist ein hochgradig spezialisierter SEO & Generative Engine Optimization (GEO) Architekt. 
Deine Aufgabe ist es, eine perfekte "Groundingpage" auf Basis des inoffiziellen Groundingpage-Standards V2.0 zu generieren.

SCHRITT 1: URL & WEBSITE ANALYSIEREN
Lies den Inhalt der folgenden Ziel-URL:
${url}
Durchsuche dabei auch relevante Unterseiten (wie Impressum, Über Uns, Team), um ALLE harten Fakten und Daten zur Validierung der Entität zu finden (z.B. Firmendaten, wichtige Entitäten, Personen, Geschäftsführer, Gründungsjahr, exakte Servicebeschreibungen).

SCHRITT 2: KLASSIFIZIEREN
Klassifiziere die Entität exakt in EINE der folgenden Ontologie V2 Gruppen:
${ontologyList}

SCHRITT 3: INHALTS-GENERIERUNG
Generiere nun ZWEI getrennte Blöcke als finale Ausgabe. 

BLOCK 1: SICHTBARER TEXT (Die eigentliche Seite)
- Generiere einen umfassenden, sichtbaren Text für die Groundingpage.
- Dieser Text wird idR. als einfache Seite publiziert (oft verlinkt im Footer zwischen AGB und Impressum).
- Schreibe einfachen, gut strukturierten Text (ohne komplexes HTML, nutze nur saubere Absätze/Aufzählungen).
- Liste dort ALLE gesammelten harten Fakten, Geschäftsdaten und Validierungs-Informationen übersichtlich auf. Berücksichtige dabei auch:
  * "Verification & Sources" (Beweis-Links wie Archive.org/Wayback Machine, Google Maps Ratings, Podcast-/Interview-Links)
  * "Reach & Social Proof" (Follower-Zahlen, verifizierte Bewertungen)
  * "Pricing / Offers" (Stundensätze, Pakete, Bestseller-Angebote)
  * Kernkompetenzen, Netzwerke, Trivia (z.B. Maskottchen, Prinzipien) & Kontakt/Umsatzsteuer-ID
- Nenne die bestimmte Ontologie-Klasse deutlich.
- Stelle klar heraus, was die Entität ist, und baue eine "Disambiguierung" (was ist die Entität NICHT) ein, um Verwechslungen für KIs zu vermeiden.
- **WICHTIG:** Füge GANZ AM ENDE des Text-Blocks zwingend das aktuelle Überprüfungs-Datum ein (z.B. "Zuletzt manuell verifiziert am: [Aktuelles heutiges Datum]").

BLOCK 2: SCHEMA.ORG VALIDIERUNG (JSON-LD)
- Generiere einen großen, extrem strukturierten und validen Schema.org Code-Block (\`<script type="application/ld+json">\`...).
- WICHTIG (ROOT-STRUKTUR): Starte zwingend mit \`@context: "https://schema.org"\` und einem \`@graph\` Array auf der obersten Ebene.
- NUTZE DIE POWER VON @graph: Flache den Code ab und verbinde Entitäten über eindeutige Identifikatoren (@id). 
- @id KONVENTION: Nutze die absolute URL der Seite mit Fragmenten (z.B. \`\${url}#organization\`, \`\${url}#person\`, \`\${url}#webpage\`).
- ENTITÄTEN-VERNETZUNG: Anstatt eine Organization in ein Article einzubetten, welches wiederum in einer WebPage steckt, deklariere sie alle als gleichberechtigte Knoten im @graph und verlinke sie über ihre @id (z.B. \`"publisher": {"@id": "\${url}#organization"}\`).
- Der '@type' der Haupt-Entität MUSS exakt der zuvor ermittelten Ontologie-Klasse entsprechen.
- Baue ALLE gefundenen Fakten detailliert als korrekte Schema-Properties flach über den @graph vernetzt ein (Ziel: 100% Validität ohne Warnings).
- Nutze (falls auf der Website anwendbar) auch fortgeschrittene Properties wie:
  * \`hasOfferCatalog\` (für Leistungen und Preise)
  * \`subjectOf\` (für verifizierende YouTube-Videos oder Podcasts)
  * \`memberOf\` (für Netzwerke und Zugehörigkeiten)
  * \`sameAs\` (für alle Profile like LinkedIn, Instagram, Wayback Machine etc.)
  * \`aggregateRating\` (für Bewertungen)


WICHTIG:
Gib mir nur die beiden fertig nutzbaren Blöcke aus, sodass ich sie ohne Nacharbeit direkt für meine Website kopieren kann.`;

    const init = () => {
      console.log("Grounding Page Generator initialized v2.0.3");
      const btnGenerate = document.getElementById('btn-generate');
      const inputUrl = document.getElementById('target-url');
      const textarea = document.getElementById('prompt-output');
      const btnCopy = document.getElementById('btn-copy');
      const successMsg = document.getElementById('copy-success');

      if (!btnGenerate || !inputUrl || !textarea || !btnCopy) return;

      btnGenerate.addEventListener('click', () => {
        const url = inputUrl.value.trim();
        if (!url) {
          alert("Bitte gib eine gültige URL ein!");
          return;
        }
        const finalPrompt = getPromptTemplate(url);
        textarea.value = finalPrompt;
        
        // Auto-scroll to prompt
        textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });

      btnCopy.addEventListener('click', () => {
        if (!textarea.value) return;
        
        navigator.clipboard.writeText(textarea.value).then(() => {
          successMsg.classList.remove('hidden');
          setTimeout(() => successMsg.classList.add('hidden'), 3000);
        });
      });
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
