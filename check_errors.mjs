import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('response', response => {
    if (!response.ok()) console.log('HTTP ERROR:', response.status(), response.url());
  });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  const content = await page.evaluate(() => document.getElementById('root').innerHTML);
  console.log('ROOT CONTENT LENGTH:', content.length);
  await browser.close();
})();
