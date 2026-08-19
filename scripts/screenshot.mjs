import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });
  await page.goto('file:///Users/jorti/Documents/Antigravity/dist/videos/index.html', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'videos_preview.png', fullPage: true });
  await browser.close();
})();
