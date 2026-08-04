const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  
  const urls = [
    'https://lnkd.in/p/dQk3ieAF',
    'https://lnkd.in/p/dbikVh_D'
  ];

  for (const url of urls) {
    const page = await browser.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      console.log(`${url} -> ${page.url()}`);
    } catch (e) {
      console.log(`Error resolving ${url}: ${e}`);
    }
    await page.close();
  }

  await browser.close();
})();
