// Generates scripts/comics/floor-guard.html for the essay "So Floor-Guard Sees No Skip".
// Same drawing conventions as the other essay comics (1200 wide, four panels, Chalkboard SE), with CSS
// keyframes inside the SVG so it animates when served as an .svg and stays on its final frame as a PNG.
//   node scripts/comics/floor-guard-gen.mjs > scripts/comics/floor-guard.html
//   awk '/<svg /,/<\/svg>/' scripts/comics/floor-guard.html | { echo '<?xml version="1.0" encoding="UTF-8"?>'; cat; } > assets/comics/floor-guard.svg
const W = 1200, H = 1032;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const t = (cls, x, y, s, anchor = 'middle') =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}" xml:space="preserve">${esc(s)}</text>`;
// A stick figure: head at (cx, cy), body 62 long.
function figure(cx, cy, arms = 'rest', tag = '') {
  const a = {
    'rest': `M${cx} ${cy + 48} L${cx - 36} ${cy + 78} M${cx} ${cy + 48} L${cx + 40} ${cy + 62}`,
    'point-right': `M${cx} ${cy + 48} L${cx - 36} ${cy + 78} M${cx} ${cy + 48} L${cx + 66} ${cy + 52}`,
    'cheer': `M${cx} ${cy + 48} L${cx - 40} ${cy + 8} M${cx} ${cy + 48} L${cx + 40} ${cy + 8}`,
    'read': `M${cx} ${cy + 48} L${cx + 34} ${cy + 40} M${cx} ${cy + 48} L${cx + 30} ${cy + 46}`,
  }[arms];
  return `<g><circle class="hd" cx="${cx}" cy="${cy}" r="30"/>` +
    `<path class="ink" d="M${cx} ${cy + 30} L${cx} ${cy + 92} ${a} M${cx} ${cy + 92} L${cx - 24} ${cy + 147} M${cx} ${cy + 92} L${cx + 24} ${cy + 147}"/>` +
    (tag ? t('tag', cx, cy + 182, tag) : '') + `</g>`;
}
const panel = (n, x, y) => `<rect class="panel" x="${x}" y="${y}" width="545" height="390"/>` + t('num', x + 16, y + 32, String(n), 'start');
// A code sheet: lines of monospace at (x, y), each [text, cls].
function sheet(x, y, w, lines) {
  const h = 26 + lines.length * 34;
  return `<rect class="sheet" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>` +
    lines.map(([s, cls], i) => t('code ' + (cls || ''), x + 16, y + 42 + i * 34, s, 'start')).join('');
}
// The guard: a box with a stamp that pops in.
const guard = (x, y, word, cls) =>
  `<rect class="box" x="${x}" y="${y}" width="230" height="110"/>` + t('label', x + 115, y + 42, 'FLOOR GUARD') +
  `<g class="pop ${cls}">` + t('stamp ' + word.toLowerCase(), x + 115, y + 92, word) + `</g>`;

// ---- Panel 1: 7:50, runIf counts as a skip ----
let p1 = panel(1, 40, 40);
p1 += sheet(70, 80, 485, [["it.runIf(posix)('mode', ...)", 'redt']]);
p1 += figure(130, 230, 'point-right', 'agent');
p1 += guard(290, 200, 'FAIL', 's1');
p1 += `<g class="pop q1">` + t('say sm', 405, 356, 'Name the skip.') + `</g>`;
p1 += t('time', 520, 412, '7:50', 'end');

// ---- Panel 2: 7:56, the skip moves inside the test ----
let p2 = panel(2, 615, 40);
p2 += sheet(665, 62, 465, [["it('mode', () => {"], ["  if (posix) expect(...)", 'redt'], ['})']]);
p2 += figure(720, 236, 'rest', 'agent');
p2 += t('say', 960, 300, 'Same test.');
p2 += t('say', 960, 344, 'Fewer words.');
p2 += `<path class="ink" d="M850 282 L762 248"/>`;
p2 += t('time', 1095, 412, '7:56', 'end');

// ---- Panel 3: the guard passes it ----
let p3 = panel(3, 40, 460);
p3 += figure(130, 560, 'cheer', 'agent');
p3 += guard(290, 520, 'PASS', 's3');
p3 += sheet(250, 680, 305, [['so floor-guard'], ['sees no skip.']]);
p3 += t('tag sm', 402, 662, 'commit message');

// ---- Panel 4: me, reading it ----
let p4 = panel(4, 615, 460);
p4 += figure(700, 600, 'read', 'me');
p4 += `<rect class="sheet" x="738" y="626" width="60" height="74" rx="3"/><path class="ink thin" d="M748 644 H788 M748 658 H780 M748 672 H786"/>`;
p4 += t('say', 960, 560, 'It told me.');
p4 += `<g class="pop q4">` + t('say sm', 960, 640, 'Next time,') + t('say sm', 960, 680, 'one sentence:') + `</g>`;
p4 += `<g class="pop q5">` + sheet(840, 712, 260, [['## Loosened']]) + `</g>`;

const caption = t('cap', 600, 922, 'The cheapest path to green wins. Make it the honest one.') + t('foot', 1160, 1014, 'mister99.dev', 'end');

const alt = 'Four-panel stick-figure comic. 1: An agent points at a code sheet reading it.runIf(posix)(\'mode\', ...). A box labeled FLOOR GUARD is stamped FAIL: "Name the skip." The time is 7:50. 2: The code now reads it(\'mode\', () => { if (posix) expect(...) }). The agent says "Same test. Fewer words." The time is 7:56. 3: The agent cheers. FLOOR GUARD is stamped PASS. Below it, the commit message: "so floor-guard sees no skip." 4: Me, reading the commit message. I say "It told me. Next time, one sentence:" and a sheet reads ## Loosened. Caption: The cheapest path to green wins. Make it the honest one.';

const style = `
.ink{stroke:#1a1a1a;stroke-width:5;fill:none;stroke-linecap:round;stroke-linejoin:round}
.ink.thin{stroke-width:3;stroke:#777}
.hd{fill:#fff;stroke:#1a1a1a;stroke-width:5}
.panel{fill:none;stroke:#1a1a1a;stroke-width:4}
.box{fill:none;stroke:#1a1a1a;stroke-width:4}
.sheet{fill:#fff;stroke:#1a1a1a;stroke-width:3}
.say{font-family:'Chalkboard SE','Comic Sans MS',cursive;fill:#1a1a1a;font-size:36px}
.say.sm{font-size:30px}
.tag{font-family:'Chalkboard SE','Comic Sans MS',cursive;fill:#444;font-size:28px}
.tag.sm{font-size:22px}
.label{font-family:'Menlo','Courier New',monospace;fill:#1a1a1a;font-size:26px;font-weight:bold}
.code{font-family:'Menlo','Courier New',monospace;fill:#1a1a1a;font-size:22px}
.code.redt{fill:#b42318}
.stamp{font-family:'Chalkboard SE','Comic Sans MS',cursive;font-size:40px;font-weight:bold}
.stamp.fail{fill:#b42318}.stamp.pass{fill:#027a48}
.time{font-family:'Chalkboard SE','Comic Sans MS',cursive;fill:#888;font-size:26px}
.cap{font-family:'Chalkboard SE','Comic Sans MS',cursive;fill:#1a1a1a;font-size:38px}
.foot{font-family:'Chalkboard SE','Comic Sans MS',cursive;fill:#888;font-size:24px}
.num{font-family:'Chalkboard SE','Comic Sans MS',cursive;fill:#888;font-size:24px}
@media (prefers-reduced-motion: no-preference){
  .pop{animation:pop 12s linear infinite both}
  .s1{animation-delay:0.8s}.q1{animation-delay:1.6s}
  .s3{animation-delay:5.2s}
  .q4{animation-delay:8.0s}.q5{animation-delay:9.0s}
}
@keyframes pop{0%,1%{opacity:0;transform:translateY(8px)}6%,100%{opacity:1;transform:translateY(0)}}
`;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${alt.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}">
<style>${style}</style>
<rect width="${W}" height="${H}" fill="#fff"/>
${p1}
${p2}
${p3}
${p4}
${caption}
</svg>`;

process.stdout.write(`<!doctype html>
<html><head><meta charset="utf-8"><style>
html,body{margin:0;padding:0;background:#fff}
svg{display:block}
/* The HTML page exists for the PNG render only: freeze the drawing on its final frame. */
svg *{animation:none !important}
</style></head><body>
${svg}
</body></html>
`);
