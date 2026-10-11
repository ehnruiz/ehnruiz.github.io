// Renders assets/favicon.png (32px) and assets/webclip.png (180px) from scripts/icon.html. Same Playwright note as make-card.mjs.
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const require = createRequire(process.env.NODE_PATH ? path.join(process.env.NODE_PATH, '/') : import.meta.url);
const { chromium } = require('playwright');
const browser = await chromium.launch();
for (const [file, size] of [['assets/webclip.png', 180], ['assets/favicon.png', 32]]) {
  const page = await browser.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: size / 180 });
  await page.goto(pathToFileURL(path.resolve('scripts/icon.html')).href);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  await page.screenshot({ path: file, type: 'png' });
  console.log('wrote', file, size + 'px');
}
await browser.close();
