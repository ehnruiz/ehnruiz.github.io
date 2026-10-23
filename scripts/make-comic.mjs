// Renders an essay comic from its HTML source (one SVG, drawn 1200 wide so it stays sharp in the 600px column).
//   node scripts/make-comic.mjs scripts/comics/<name>.html assets/comics/<name>.png
// Needs Playwright with Chromium. On this machine it is installed in ~/projects/microsite-xray, so run with
//   NODE_PATH=$HOME/projects/microsite-xray/node_modules node scripts/make-comic.mjs ...
// The type is Chalkboard SE, which ships with macOS; elsewhere the fallback font changes the look, so render on a Mac.
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const require = createRequire(process.env.NODE_PATH ? path.join(process.env.NODE_PATH, '/') : import.meta.url);
const { chromium } = require('playwright');

const [src, out] = process.argv.slice(2);
if (!src || !out) { console.error('usage: make-comic.mjs <comic.html> <out.png>'); process.exit(2); }
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(path.resolve(src)).href);
await page.evaluate(() => document.fonts.ready);
const chalkboard = await page.evaluate(() => document.fonts.check("36px 'Chalkboard SE'"));
await page.locator('svg').screenshot({ path: out, type: 'png' });
await browser.close();
console.log('wrote', out, chalkboard ? '' : '(Chalkboard SE missing: fallback font used)');
