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
    // Match anything that looks like an image path in src/assets
    const imageRefs = content.match(/((\.\.\/)+|(\/))assets\/images\/[^ )"']+\.(webp|png|jpg|jpeg|svg)/g);

    if (imageRefs) {
        imageRefs.forEach(ref => {
            // Normalize path: remove leading / or ../ and join with src
            const cleanRef = ref.replace(/^(\.\.\/)+/, '').replace(/^\//, '');
            const fullPath = path.join(process.cwd(), ASSETS_DIR, cleanRef);
            
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
