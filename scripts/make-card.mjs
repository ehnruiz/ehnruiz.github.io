// Renders a 1200x630 Open Graph card, in the manner of the site: cream background, Newsreader, text bottom-left.
//   node scripts/make-card.mjs assets/cards/site-card-2.png                       # site card: the name alone
//   node scripts/make-card.mjs assets/cards/<slug>.png "Essay title"             # essay card: title, name beneath
//   node scripts/make-card.mjs assets/cards/<slug>.png "Essay title" scripts/brand/xray-mark-navy-1024.png
//                                                                                # ... with a mark above the title
// Social networks cache a card by URL for about a week, so a redesigned card needs a new file name.
// Needs Playwright with Chromium. On this machine it is installed in ~/projects/microsite-xray, so run with
//   NODE_PATH=$HOME/projects/microsite-xray/node_modules node scripts/make-card.mjs ...
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const require = createRequire(process.env.NODE_PATH ? path.join(process.env.NODE_PATH, '/') : import.meta.url);
const { chromium } = require('playwright');

const [out, title, mark] = process.argv.slice(2);
if (!out) { console.error('usage: make-card.mjs <out.png> [essay title]'); process.exit(2); }
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(path.resolve('scripts/card.html')).href);
await page.evaluate(({ title, mark }) => {
  document.getElementById('name').textContent = 'Emmanuel Ruiz';
  if (mark) document.getElementById('mark').src = mark;
  document.getElementById('cta').textContent = title ? 'Read the essay at mister99.dev' : 'Read the essays at mister99.dev';
  if (title) {
    document.getElementById('card').classList.add('essay');
    const t = document.getElementById('title');
    t.textContent = title; t.hidden = false;
    if (title.length > 44) t.classList.add('verylong'); else if (title.length > 26) t.classList.add('long');
  } else {
    const tag = document.getElementById('tagline');
    tag.textContent = 'Essays on building software at the frontier, from inside Arthrex.'; tag.hidden = false;
  }
}, { title, mark: mark ? pathToFileURL(path.resolve(mark)).href : '' });
await page.evaluate(() => document.fonts.ready);
if (mark) await page.waitForFunction(() => document.getElementById('mark').complete);
await page.waitForTimeout(300);
await page.screenshot({ path: out, type: 'png' });
await browser.close();
console.log('wrote', out);
