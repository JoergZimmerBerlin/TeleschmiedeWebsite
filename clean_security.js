const fs = require('fs');
const path = require('path');
const dir = 'src/content/glossar/';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
let modifiedCount = 0;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Replacements for security risks
    content = content.replace(/Cloudflare Radar Level 5/gi, 'den höchsten Agent Readiness Standards');
    content = content.replace(/Level 5/gi, 'höchstes Niveau');
    content = content.replace(/auth\.md/gi, 'maschinenlesbare Endpunkt-Dokumentation');
    content = content.replace(/# auth\.md/gi, '# maschinenlesbare Endpunkt-Dokumentation');
    content = content.replace(/agent-card\.json/gi, 'standardisierte Agent-Identity-Schnittstellen');
    content = content.replace(/a2a-protocol\.org v1\.0/gi, 'gängigen A2A-Spezifikationen');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
    }
});

console.log(`Cleaned ${modifiedCount} files.`);
