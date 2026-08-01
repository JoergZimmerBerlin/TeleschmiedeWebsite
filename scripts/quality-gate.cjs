const fs = require('fs');
const path = require('path');

const VALID_CATEGORIES_BLOG = [
    'SEO Praxis', 
    'Tech SEO & Tools', 
    'AI SEO', 
    'Events & Networking'
];

const VALID_CATEGORIES_GLOSSAR = [
    'SEO Basics & Onpage',
    'Technisches SEO & UX',
    'AI SEO & Generative Search',
    'E-E-A-T & Offpage'
];

const EMOJI_REGEX = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

function runAudit(filePath, type) {
    console.log(`\n🔍 Starte Quality-Gate für: ${filePath} (Typ: ${type})`);
    
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Datei nicht gefunden: ${filePath}`);
        process.exit(1);
    }

    const content = fs.readFileSync(filePath, 'utf8');
    let hasErrors = false;
    
    const logError = (msg) => {
        console.error(`   ❌ FEHLER: ${msg}`);
        hasErrors = true;
    };

    const logSuccess = (msg) => {
        console.log(`   ✅ PASS: ${msg}`);
    };

    // 1. Frontmatter extrahieren
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) {
        logError("Kein valider Frontmatter-Block (---) gefunden.");
        process.exit(1);
    }
    const frontmatter = fmMatch[1];
    const body = content.substring(fmMatch[0].length);

    const getField = (field) => {
        const regex = new RegExp(`^${field}:\\s*(?:"([^"]*)"|'([^']*)'|([^\\n\\r]+))`, 'm');
        const match = frontmatter.match(regex);
        if (!match) return null;
        return match[1] || match[2] || match[3].trim();
    };

    // 2. Gemeinsame SEO-Checks (Blog & Glossar)
    const title = getField('title');
    if (!title) logError("Title fehlt.");
    else {
        if (title.length > 70) logError(`Title ist extrem lang (${title.length} Zeichen, max 70).`);
        else logSuccess(`Title-Länge (H1) im Rahmen (${title.length}/70).`);
        if (EMOJI_REGEX.test(title)) logError("Title enthält Emojis! (Strikte SEO-Regel verletzt).");
    }

    const metaTitle = getField('meta_title');
    if (!metaTitle) logError("Meta-Title (meta_title) fehlt.");
    else {
        if (metaTitle.length > 50) logError(`Meta-Title ist zu lang (${metaTitle.length} Zeichen, strikt max 50).`);
        else logSuccess(`Meta-Title-Länge korrekt (${metaTitle.length}/50).`);
        if (!metaTitle.endsWith("(2026)")) logError("Meta-Title endet nicht auf '(2026)'!");
        if (EMOJI_REGEX.test(metaTitle)) logError("Meta-Title enthält Emojis! (Strikte SEO-Regel verletzt).");
    }

    const metaDesc = getField('meta_description') || getField('description');
    if (!metaDesc) logError("meta_description (oder description) fehlt.");
    else {
        if (metaDesc.length > 150) logError(`Meta-Description ist zu lang (${metaDesc.length} Zeichen, strikt max 150).`);
        else logSuccess(`Meta-Description-Länge korrekt (${metaDesc.length}/150).`);
        if (!metaDesc.endsWith("(2026)")) logError("Meta-Description endet nicht auf '(2026)'!");
        if (EMOJI_REGEX.test(metaDesc)) logError("Meta-Description enthält Emojis! (Strikte SEO-Regel verletzt).");
    }

    // 3. Typ-Spezifische Checks
    if (type === 'blog') {
        const category = getField('category');
        if (!category) logError("Category fehlt (Blog Pflicht).");
        else if (!VALID_CATEGORIES_BLOG.includes(category)) logError(`Ungültige Kategorie: "${category}". Erlaubt: ${VALID_CATEGORIES_BLOG.join(', ')}`);
        else logSuccess(`Kategorie valide (${category}).`);

        const image = getField('image');
        if (image && (image.includes('_3d_') || image.includes('_178') || image.includes('_177'))) {
            logError(`Budget-Schutz: Bild "${image}" ist ein Dummy-Bild. Für Blogartikel Originalbild nutzen!`);
        } else logSuccess("Bildpfad sieht gut aus (Blog).");

        const linkMatches = body.match(/\[.*?\]\((?!http).*?\)/g) || [];
        if (linkMatches.length > 8) console.warn(`   ⚠️ WARNUNG: Zu viele interne Links! (${linkMatches.length} gefunden, max 8 erlaubt).`);
        else logSuccess(`Interne Links im Limit (${linkMatches.length}/8).`);

        if (!body.includes('bg-lime-600') && !body.includes('CTA')) {
            console.warn("   ⚠️ WARNUNG: Es scheint keine Standard CTA-Box im Blogartikel zu geben.");
        } else logSuccess("CTA-Box / Styling gefunden.");

    } else if (type === 'glossar') {
        const category = getField('category');
        if (!category) logError("Category fehlt (Glossar Pflicht).");
        else if (!VALID_CATEGORIES_GLOSSAR.includes(category)) logError(`Ungültige Glossar-Kategorie: "${category}". Erlaubt: ${VALID_CATEGORIES_GLOSSAR.join(', ')}`);
        else logSuccess(`Glossar-Kategorie valide (${category}).`);

        if (!body.includes('##') && body.length < 1500) {
            logError("Glossar-Artikel wirkt zu kurz oder hat keine tiefgehende Struktur (H2). Web-Recherche vergessen?");
        } else logSuccess("Glossar-Struktur wirkt valide.");
    }

    if (hasErrors) {
        console.error(`\n🚨 QUALITÄTS-CHECK FEHLGESCHLAGEN für ${path.basename(filePath)}. Bitte beheben!\n`);
        process.exit(1);
    } else {
        console.log(`\n🎉 QUALITÄTS-CHECK BESTANDEN für ${path.basename(filePath)}.\n`);
        process.exit(0);
    }
}

const args = process.argv.slice(2);
const filePathArg = args.find(a => !a.startsWith('--'));
const typeArgMatch = args.find(a => a.startsWith('--type='));
const type = typeArgMatch ? typeArgMatch.split('=')[1] : 'blog'; // default to blog

if (!filePathArg) {
    console.error("Bitte Dateipfad übergeben: node quality-gate.cjs <pfad> --type=[blog|glossar]");
    process.exit(1);
}

runAudit(filePathArg, type);
