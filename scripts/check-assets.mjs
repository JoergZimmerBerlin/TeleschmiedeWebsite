import fs from 'fs';
import path from 'path';

const CONTENT_DIR = 'src/content';
const ASSETS_DIR = 'src';

console.log('🚀 Starting Pre-build Asset Check...');

function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file));
        } else {
            if (file.endsWith('.md')) results.push(file);
        }
    });
    return results;
}

const files = getFiles(CONTENT_DIR);
let missingCount = 0;

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const imageRefs = content.match(/\/assets\/images\/[^ )"']+\.(webp|png|jpg|jpeg|svg)/g);

    if (imageRefs) {
        imageRefs.forEach(ref => {
            const fullPath = path.join(process.cwd(), ASSETS_DIR, ref);
            if (!fs.existsSync(fullPath)) {
                console.error(`❌ Missing asset: ${ref} referenced in ${file}`);
                missingCount++;
            }
        });
    }
});

if (missingCount > 0) {
    console.error(`\n🛑 Build aborted: ${missingCount} missing assets found.`);
    process.exit(1);
} else {
    console.log('✅ All assets verified!');
}
