const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    await page.goto('https://lnkd.in/p/dh-ysttS', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Auto-scroll a bit
    for(let i=0; i<3; i++) {
        await page.evaluate(() => window.scrollBy(0, 1000));
        await new Promise(r => setTimeout(r, 1000));
    }

    const data = await page.evaluate(() => {
        let postText = '';
        const postElement = document.querySelector('.update-components-text');
        if (postElement) postText = postElement.innerText;
        else {
            const metaDesc = document.querySelector('meta[property="og:description"]');
            if (metaDesc) postText = metaDesc.getAttribute('content');
        }

        let imageUrl = '';
        const metaImg = document.querySelector('meta[property="og:image"]');
        if (metaImg) imageUrl = metaImg.getAttribute('content');

        const comments = [];
        document.querySelectorAll('.comments-comment-item__main-content, .comment__body, article').forEach(node => {
            const text = node.innerText;
            if(text && text !== postText && !comments.includes(text)) comments.push(text.trim());
        });
        
        return { postText, imageUrl, comments };
    });
    
    console.log(JSON.stringify(data, null, 2));
    await browser.close();
})();
