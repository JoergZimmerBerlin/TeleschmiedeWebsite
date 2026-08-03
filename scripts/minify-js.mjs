import fs from 'node:fs/promises';
import path from 'node:path';
import { minify } from 'terser';

const jsDir = path.resolve('dist/js');

async function minifyFiles() {
  try {
    const files = await fs.readdir(jsDir);
    const jsFiles = files.filter(f => f.endsWith('.js'));
    
    if (jsFiles.length === 0) {
      console.log('ℹ️ No JS files found in dist/js to minify.');
      return;
    }

    console.log(`🚀 Starting minification of ${jsFiles.length} JS files in dist/js/...`);
    
    let totalOriginalSize = 0;
    let totalMinifiedSize = 0;

    for (const file of jsFiles) {
      const filePath = path.join(jsDir, file);
      const originalCode = await fs.readFile(filePath, 'utf-8');
      const originalSize = Buffer.byteLength(originalCode, 'utf8');
      totalOriginalSize += originalSize;
      
      const result = await minify(originalCode, {
        compress: {
          passes: 2,
          drop_console: false, // Keep console logs if they exist
          drop_debugger: true,
        },
        mangle: true,
        format: {
          comments: false, // Strip all comments
        }
      });
      
      if (result.error) {
        console.error(`❌ Error minifying ${file}:`, result.error);
        continue;
      }
      
      const minifiedSize = Buffer.byteLength(result.code, 'utf8');
      totalMinifiedSize += minifiedSize;
      
      await fs.writeFile(filePath, result.code, 'utf-8');
      
      const savedKb = ((originalSize - minifiedSize) / 1024).toFixed(2);
      console.log(`✅ Minified ${file}: saved ${savedKb} KB`);
    }
    
    const totalSavedKb = ((totalOriginalSize - totalMinifiedSize) / 1024).toFixed(2);
    const reductionPercent = ((totalOriginalSize - totalMinifiedSize) / totalOriginalSize * 100).toFixed(1);
    console.log(`🎉 Minification complete! Saved a total of ${totalSavedKb} KB (${reductionPercent}% reduction).`);
    
  } catch (err) {
    console.error('❌ Minification failed:', err);
    process.exit(1);
  }
}

minifyFiles();
