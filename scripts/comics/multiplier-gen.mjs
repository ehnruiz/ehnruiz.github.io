// Generates scripts/comics/multiplier.html for the essay "I Measured My Own Multiplier".
// Same drawing conventions as the other essay comics (1200 wide, four panels, Chalkboard SE), plus CSS
// keyframes inside the SVG so the drawing animates when served as an .svg and stays a still when
// rendered to PNG (the PNG is the final frame). Reduced-motion readers get the final frame too.
//   node scripts/comics/multiplier-gen.mjs > scripts/comics/multiplier.html
const W = 1200, H = 1032;
const t = (cls, x, y, s, anchor = 'middle') =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}" xml:space="preserve">${s}</text>`;
// A stick figure: head at (cx, cy), body 62 long.
function figure(cx, cy, arms = 'rest', tag = '', cls = '') {
  const a = {
    'rest': `M${cx} ${cy + 48} L${cx - 36} ${cy + 78} M${cx} ${cy + 48} L${cx + 40} ${cy + 62}`,
    'point-right': `M${cx} ${cy + 48} L${cx - 36} ${cy + 78} M${cx} ${cy + 48} L${cx + 66} ${cy + 52}`,
    'point-left': `M${cx} ${cy + 48} L${cx - 66} ${cy + 52} M${cx} ${cy + 48} L${cx + 36} ${cy + 78}`,
    'type': `M${cx} ${cy + 48} L${cx + 44} ${cy + 72} M${cx} ${cy + 48} L${cx + 40} ${cy + 80}`,
    'read': `M${cx} ${cy + 48} L${cx - 34} ${cy + 40} M${cx} ${cy + 48} L${cx - 30} ${cy + 46}`,
  }[arms];
  return `<g class="${cls}"><circle class="hd" cx="${cx}" cy="${cy}" r="30"/>` +
    `<path class="ink" d="M${cx} ${cy + 30} L${cx} ${cy + 92} ${a} M${cx} ${cy + 92} L${cx - 24} ${cy + 147} M${cx} ${cy + 92} L${cx + 24} ${cy + 147}"/>` +
    (tag ? t('tag', cx, cy + 182, tag) : '') + `</g>`;
}
// A small figure (an agent): head r=18, body 40.
function small(cx, cy, tag, cls = '') {
  return `<g class="${cls}"><circle class="hd" cx="${cx}" cy="${cy}" r="18"/>` +
    `<path class="ink" d="M${cx} ${cy + 18} L${cx} ${cy + 58} M${cx} ${cy + 30} L${cx - 22} ${cy + 50} M${cx} ${cy + 30} L${cx + 22} ${cy + 50} M${cx} ${cy + 58} L${cx - 15} ${cy + 92} M${cx} ${cy + 58} L${cx + 15} ${cy + 92}"/>` +
    t('tag', cx, cy + 122, tag) + `</g>`;
}
// A contribution grid: cols x 7 squares of size s, gap g, at (x, y). `cls(col,row)` -> square classes.
function grid(x, y, cols, s, g, cls) {
  let out = '';
  for (let c = 0; c < cols; c++) for (let r = 0; r < 7; r++)
    out += `<rect class="sq ${cls(c, r)}" x="${x + c * (s + g)}" y="${y + r * (s + g)}" width="${s}" height="${s}" rx="2"/>`;
  return out;
}
const rnd = (c, r) => ((c * 7 + r) * 2654435761 >>> 0) % 97;
const panel = (n, x, y) => `<rect class="panel" x="${x}" y="${y}" width="545" height="390"/>` + t('num', x + 16, y + 32, String(n), 'start');
const desk = (x, y) => `<path class="ink" d="M${x} ${y} H${x + 150} M${x + 14} ${y} V${y + 60} M${x + 136} ${y} V${y + 60}"/><rect class="box" x="${x + 44}" y="${y - 54}" width="70" height="50"/>`;

// ---- Panel 1: me in 2019, one ticket at a time ----
let p1 = panel(1, 40, 40);
p1 += t('say', 312, 118, 'One ticket. One day.');
p1 += `<path class="ink" d="M200 132 L182 196"/>`;
p1 += figure(160, 230, 'type', 'me, 2019');
p1 += desk(196, 322);
// a light grid: an ordinary year, a few greens
p1 += grid(360, 180, 8, 15, 4, (c, r) => (rnd(c, r) < 30 ? 'l1' : 'l0'));
p1 += t('tag', 426, 342, 'two months');
p1 += t('big', 426, 408, '0.8 PRs a day');

// ---- Panel 2: me in 2026, tickets out to a team of agents ----
let p2 = panel(2, 615, 40);
p2 += t('say', 887, 118, 'Tickets out.');
p2 += `<path class="ink" d="M760 132 L738 196"/>`;
p2 += figure(730, 230, 'point-right', 'me, 2026');
const agents = [['scout', 850, 190], ['builder', 935, 190], ['tester', 1020, 190], ['reviewer', 1105, 190]];
agents.forEach(([name, x, y], i) => {
  p2 += `<g class="pop a${i}">` + small(x, y, name).replace('class="tag"', 'class="tag sm"') +
    `<path class="ink thin arrow" d="M800 280 Q${(800 + x) / 2} ${y + 10} ${x - 26} ${y + 56}"/></g>`;
});
// the dark grid fills column by column, along the bottom
p2 += grid(830, 330, 12, 9, 2, (c, r) => `fill d${Math.min(c, 5)}`);
p2 += `<g class="pop pop2">` + t('big', 1058, 410, '15 a day') + `</g>`;

// ---- Panel 3: the two of me and the baselines ----
let p3 = panel(3, 40, 460);
p3 += figure(120, 650, 'rest', 'me, 2019');
p3 += figure(510, 650, 'point-left', 'me, 2026');
p3 += t('say', 312, 538, 'Which number is true?');
p3 += `<path class="ink" d="M190 552 L150 606"/>`;
const rows = [['2019', '19x'], ['2024', '23x'], ['last year', '98x'], ['summer', '261x']];
rows.forEach(([a, b], i) => {
  const y = 612 + i * 44;
  p3 += `<g class="pop r${i}">` + t('tag', 220, y, 'vs ' + a, 'start') + t('tag', 445, y, b, 'end') + `</g>`;
});
p3 += `<rect class="box" x="205" y="574" width="250" height="190"/>`;
p3 += `<g class="pop pop3">` + t('say sm', 312, 808, 'All of them.') + t('say sm', 312, 842, 'Pick a baseline.') + `</g>`;

// ---- Panel 4: diffs in, every day ----
let p4 = panel(4, 615, 460);
p4 += t('say', 887, 538, 'Diffs in. Every day.');
p4 += `<path class="ink" d="M820 552 L792 606"/>`;
p4 += figure(760, 650, 'read', 'me, 2026');
// the diff sheet in hand
p4 += `<rect class="sheet" x="686" y="672" width="56" height="70" rx="3"/><path class="ink thin green" d="M696 690 H732 M696 702 H724"/><path class="ink thin redl" d="M696 716 H728"/>`;
// the gate stamp
p4 += `<rect class="box" x="880" y="600" width="230" height="110"/>` + t('code', 995, 642, 'FLOOR GUARD') + `<g class="pop stamp">` + t('stamp', 995, 690, 'PASS') + `</g>`;
// the calendar: 52 squares filling
let cal = '';
for (let i = 0; i < 52; i++) { const c = i % 13, r = Math.floor(i / 13); cal += `<rect class="sq fill cal c${Math.floor(i / 9)}" x="${880 + c * 17}" y="${730 + r * 17}" width="13" height="13" rx="2"/>`; }
p4 += cal;
p4 += `<g class="pop pop4">` + t('big', 995, 842, '52 of 52 days') + `</g>`;

const caption = t('cap', 600, 922, 'Same engineer. The work changed shape.') + t('foot', 1160, 1014, 'mister99.dev', 'end');

const alt = 'Four-panel stick-figure comic. 1: Me in 2019 at a desk, typing. I say "One ticket. One day." A small contribution grid is mostly pale. Below: 0.8 PRs a day. 2: Me in 2026 pointing at four small agents labeled scout, builder, tester and reviewer, with arrows from me to each. I say "Tickets out." A grid fills dark green. Below: 15 a day. 3: Me in 2019 asks "Which number is true?" Me in 2026 points at a board: vs 2019, 19x; vs 2024, 23x; vs last year, 98x; vs summer, 261x. "All of them. Pick a baseline." 4: Me in 2026 reading a diff. I say "Diffs in. Every day." A box labeled FLOOR GUARD is stamped PASS, and a calendar of 52 squares fills in. Below: 52 of 52 days. Caption: Same engineer. The work changed shape.';

// Animation timing: one 14 s loop with a hold on the final frame.
const style = `
.ink{stroke:#1a1a1a;stroke-width:5;fill:none;stroke-linecap:round;stroke-linejoin:round}
.ink.thin{stroke-width:3;stroke:#777}
.ink.thin.green{stroke:#027a48}.ink.thin.redl{stroke:#b42318}
.arrow{stroke-dasharray:8 8}
.hd{fill:#fff;stroke:#1a1a1a;stroke-width:5}
.panel{fill:none;stroke:#1a1a1a;stroke-width:4}
.box{fill:none;stroke:#1a1a1a;stroke-width:4}
.sheet{fill:#fff;stroke:#1a1a1a;stroke-width:3}
.say{font-family:'Chalkboard SE','Comic Sans MS',cursive;fill:#1a1a1a;font-size:36px}
.tag{font-family:'Chalkboard SE','Comic Sans MS',cursive;fill:#444;font-size:28px}
.tag.sm{font-size:23px}
.say.sm{font-size:30px}
.big{font-family:'Chalkboard SE','Comic Sans MS',cursive;fill:#1a1a1a;font-size:44px}
.code{font-family:'Menlo','Courier New',monospace;fill:#1a1a1a;font-size:26px;font-weight:bold}
.stamp{font-family:'Chalkboard SE','Comic Sans MS',cursive;fill:#027a48;font-size:40px;font-weight:bold}
.cap{font-family:'Chalkboard SE','Comic Sans MS',cursive;fill:#1a1a1a;font-size:40px}
.foot{font-family:'Chalkboard SE','Comic Sans MS',cursive;fill:#888;font-size:24px}
.num{font-family:'Chalkboard SE','Comic Sans MS',cursive;fill:#888;font-size:24px}
.sq{fill:#e6ece6;stroke:#cfd8cf;stroke-width:1}
.sq.l1{fill:#bfe0bf}
.sq.fill{fill:#1f7a3a;stroke:#1f7a3a}
@media (prefers-reduced-motion: no-preference){
  .sq.fill{animation:sqin 14s linear infinite both}
  ${[0,1,2,3,4,5].map((d) => `.sq.d${d}{animation-delay:${(1.4 + d * 0.3).toFixed(2)}s}`).join('\n  ')}
  ${[0,1,2,3,4,5].map((d) => `.sq.cal.c${d}{animation-delay:${(9.6 + d * 0.35).toFixed(2)}s}`).join('\n  ')}
  .pop{animation:pop 14s linear infinite both}
  .a0{animation-delay:0.4s}.a1{animation-delay:0.8s}.a2{animation-delay:1.2s}.a3{animation-delay:1.6s}
  .pop2{animation-delay:3.4s}
  .r0{animation-delay:4.6s}.r1{animation-delay:5.2s}.r2{animation-delay:5.8s}.r3{animation-delay:6.4s}
  .pop3{animation-delay:7.4s}
  .stamp{animation-delay:9.0s}
  .pop4{animation-delay:11.8s}
}
@keyframes sqin{0%,1%{fill:#e6ece6;stroke:#cfd8cf}6%,100%{fill:#1f7a3a;stroke:#1f7a3a}}
@keyframes pop{0%,1%{opacity:0;transform:translateY(8px)}6%,100%{opacity:1;transform:translateY(0)}}
`;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${alt.replace(/"/g, '&quot;')}">
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
