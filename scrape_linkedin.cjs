const puppeteer = require('puppeteer');
const fs = require('fs');

const urls = [
    { id: "2-stunden-seo-potential", url: "https://www.linkedin.com/posts/joerg-zimmer-seo-sea-freelancer-berlin-spandau_was-kann-man-in-2-stunden-seo-schon-erreichen-activity-7387503228730421248-7IKV" },
    { id: "wir-seos-zusammenhalt", url: "https://www.linkedin.com/posts/joerg-zimmer-seo-sea-freelancer-berlin-spandau_wir-seo-spezialisten-schlie%C3%9Fen-uns-zusammen-activity-7388537332120834049-loB_" },
    { id: "doenerback-und-motivation", url: "https://www.linkedin.com/posts/joerg-zimmer-seo-sea-freelancer-berlin-spandau_graesnewoche-daemnerback-activity-7287008474004086785-Z1tM" },
    { id: "seo-relaunch-klassiker-meme", url: "https://www.linkedin.com/posts/joerg-zimmer-seo-sea-freelancer-berlin-spandau_ich-liebe-es-wenn-ein-plan-funktioniert-activity-7301646738480300032-QvI_" },
    { id: "einfachste-seo-verhaeltnisse", url: "https://www.linkedin.com/posts/joerg-zimmer-seo-sea-freelancer-berlin-spandau_ich-komme-aus-einfachsten-seo-verh%C3%A4ltnissen-activity-7278788474004086785-Z1tM" },
    { id: "seo-feuerwehr-rettung", url: "https://www.linkedin.com/posts/joerg-zimmer-seo-sea-freelancer-berlin-spandau_ich-liebe-es-wenn-ein-plan-funktioniert-activity-7301646738480300032-QvI_" }, // using same A-Team one for feuerwehr per earlier context
    { id: "campixx-seo-agentur-umfrage", url: "https://www.linkedin.com/posts/joerg-zimmer-seo-sea-freelancer-berlin-spandau_ich-bin-gerade-auf-der-campixx-eine-frage-ugcPost-7339011979937738753-L6pW" },
    { id: "ai-geo-sichtbarkeit-umfrage", url: "https://www.linkedin.com/posts/joerg-zimmer-seo-sea-freelancer-berlin-spandau_sichtbarkeit-in-kimodellen-optimieren-wie-ugcPost-7413982210355089408-Eh4y" },
    { id: "schema-markup-zustaendigkeit-umfrage", url: "https://www.linkedin.com/posts/joerg-zimmer-seo-sea-freelancer-berlin-spandau_umfrage-wer-ist-f%C3%BCr-die-einrichtung-der-ugcPost-7375810636775071744-L5_O" }
];

async function scrapePost(page, item) {
    try {
        console.log(`Scraping ${item.id}...`);
        // Navigate and wait for content
        await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        // Wait a bit for JS to render comments if any
        await new Promise(r => setTimeout(r, 4000));
        
        // Auto-scroll a bit to trigger lazy loading of comments
        for(let i=0; i<5; i++) {
            await page.evaluate(() => window.scrollBy(0, 1000));
            await new Promise(r => setTimeout(r, 1000));
        }

        const data = await page.evaluate(() => {
            // Main post text
            let postText = '';
            const postElement = document.querySelector('.update-components-text');
            if (postElement) postText = postElement.innerText;
            else {
                // Fallback: try to grab all text from main article/div
                const mainDiv = document.querySelector('main') || document.body;
                // Just grabog description if available
                const metaDesc = document.querySelector('meta[property="og:description"]');
                if (metaDesc) postText = metaDesc.getAttribute('content');
            }

            // Image URL
            let imageUrl = '';
            const metaImg = document.querySelector('meta[property="og:image"]');
            if (metaImg) imageUrl = metaImg.getAttribute('content');

            // Comments (attempting to grab any text that looks like a comment)
            const comments = [];
            document.querySelectorAll('article').forEach(art => {
                 const textEl = art.querySelector('.update-components-text');
                 if(textEl && textEl.innerText !== postText) {
                     comments.push(textEl.innerText);
                 }
            });
            // If article tags aren't used for comments, look for comment containers
            if (comments.length === 0) {
                 const commentNodes = document.querySelectorAll('.comments-comment-item__main-content, .comment__body');
                 commentNodes.forEach(node => {
                     if (node.innerText) comments.push(node.innerText.trim());
                 });
            }

            return { postText, imageUrl, comments };
        });

        return data;
    } catch(e) {
         console.log(`Failed ${item.id}: ${e.message}`);
         return null;
    }
}

(async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    // Set a realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    
    // Block images/fonts to speed up scraping
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
            req.abort();
        } else {
            req.continue();
        }
    });

    const results = {};
    for (const item of urls) {
        const data = await scrapePost(page, item);
        if (data) {
            results[item.id] = data;
        }
    }

    await browser.close();
    fs.writeFileSync('/tmp/linkedin_full_data.json', JSON.stringify(results, null, 2));
    console.log("Done scraping.");
})();
