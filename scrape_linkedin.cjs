const puppeteer = require('puppeteer');

const url = process.argv[2];

if (!url) {
    console.error("Fehler: Bitte eine LinkedIn-URL als Parameter übergeben!");
    console.error("Beispiel: node scrape_linkedin.cjs https://www.linkedin.com/posts/...");
    process.exit(1);
}

async function scrapePost(page, targetUrl) {
    try {
        console.error(`Scraping URL: ${targetUrl}`);
        // Navigate and wait for content
        await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        // Wait a bit for JS to render images and comments
        await new Promise(r => setTimeout(r, 4000));
        
        // Auto-scroll to trigger lazy loading of images and comments
        for(let i=0; i<8; i++) {
            await page.evaluate(() => window.scrollBy(0, 1000));
            await new Promise(r => setTimeout(r, 1000));
        }

        const data = await page.evaluate(() => {
            // Main post text
            let postText = '';
            const postElement = document.querySelector('.update-components-text');
            if (postElement) {
                postText = postElement.innerText;
            } else {
                // Fallback
                const metaDesc = document.querySelector('meta[property="og:description"]');
                if (metaDesc) postText = metaDesc.getAttribute('content');
            }

            // Image URL (Priority: actual img tag inside post, then og:image fallback)
            let imageUrl = '';
            const imgElement = document.querySelector('.update-components-image__image');
            if (imgElement && imgElement.src && !imgElement.src.startsWith('data:')) {
                imageUrl = imgElement.src;
            } else {
                const metaImg = document.querySelector('meta[property="og:image"]');
                if (metaImg) imageUrl = metaImg.getAttribute('content');
            }

            // Comments
            const comments = [];
            const commentNodes = document.querySelectorAll('.comments-comment-item__main-content, .comment__body, article .update-components-text');
            commentNodes.forEach(node => {
                if (node.innerText && node.innerText !== postText && node.innerText.trim().length > 0) {
                     comments.push(node.innerText.trim());
                }
            });

            return { postText, imageUrl, comments: [...new Set(comments)] }; // Unique comments
        });

        return data;
    } catch(e) {
         console.error(`Scraping failed: ${e.message}`);
         return null;
    }
}

(async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    // Set a realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    
    // We intentionally DO NOT block images here anymore, because we want the browser to resolve the actual image URL
    // instead of keeping the lazy-loaded base64 placeholder.
    
    const data = await scrapePost(page, url);
    await browser.close();

    if (data) {
        // Output raw JSON to standard output so the agent can parse it
        console.log(JSON.stringify(data, null, 2));
    } else {
        process.exit(1);
    }
})();
