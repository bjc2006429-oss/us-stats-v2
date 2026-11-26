// United States in Numbers — charts (V2, source-first edition)
// Hand-drawn SVG line charts and state bar rows. No libraries, no
// network: everything is computed from data.js and rendered as inline
// SVG. V2 is the source-first edition, so its charts are static
// pictures of the data — the numbers themselves link out to the
// official series (see views.js), and there are no pop-up panels.

import { META } from './data.js';

export function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

// Ten-year line chart. `key` names the indicator (for the chart's
// accessible label), `yrs`/`vals` are the slice actually drawn (a
// range button may show 2015-2019 or 2020-2024), `color` is the series colour.
export function lineChart(key, yrs, vals, color) {
  const W = 680, H = 240, P = { l: 56, r: 14, t: 14, b: 30 };
  const min = Math.min(...vals), max = Math.max(...vals);
  const lo = Math.floor(min - (max - min) * 0.15), hi = Math.ceil(max + (max - min) * 0.15);
  const X = i => P.l + (W - P.l - P.r) * (i / (vals.length - 1));
  const Y = v => P.t + (H - P.t - P.b) * (1 - (v - lo) / (hi - lo));
  const pts = vals.map((v, i) => X(i).toFixed(1) + ',' + Y(v).toFixed(1)).join(' ');
  const area = 'M' + X(0).toFixed(1) + ',' + Y(vals[0]).toFixed(1) + ' ' +
    'L' + vals.map((v, i) => X(i).toFixed(1) + ' ' + Y(v).toFixed(1)).join(' L ') +
    ' L' + X(vals.length - 1).toFixed(1) + ',' + (H - P.b) +
    ' L' + X(0).toFixed(1) + ',' + (H - P.b) + ' Z';
  let grid = '';
  for (let g = 0; g <= 3; g++) {
    const v = lo + (hi - lo) * g / 3, y = Y(v);
    grid += '<line x1="' + P.l + '" y1="' + y + '" x2="' + (W - P.r) + '" y2="' + y + '" stroke="#e8edf1"/>' +
      '<text x="' + (P.l - 8) + '" y="' + (y + 4) + '" font-size="11" fill="#8a97a3" text-anchor="end">' + v.toLocaleString() + '</text>';
  }
  // Plain dots with a text title (hover tooltip), no click hooks.
  const dots = vals.map((v, i) =>
    '<circle class="dot" cx="' + X(i) + '" cy="' + Y(v) + '" r="4.5" fill="' + color + '">' +
    '<title>' + yrs[i] + ': ' + META[key].f(v) + '</title></circle>').join('');
  const xl = yrs.map((y, i) =>
    '<text x="' + X(i) + '" y="' + (H - 8) + '" font-size="11" fill="#8a97a3" text-anchor="middle">' + y + '</text>').join('');
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(META[key].t) + ' chart">' +
    '<desc>' + esc(META[key].t) + ' from ' + yrs[0] + ' (' + META[key].f(vals[0]) + ') to ' + yrs[yrs.length - 1] + ' (' + META[key].f(vals[vals.length - 1]) + ').</desc>' +
    '<path d="' + area + '" fill="' + color + '" opacity="0.10"/>' +
    '<polyline points="' + pts + '" fill="none" stroke="' + color + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>' +
    grid + dots + xl + '</svg>';
}

// Horizontal bars for the four largest state economies. In V2 the
// bars are static; the state names link to the BEA release (views.js).
export function barChart(rows) {
  const max = Math.max(...rows.map(r => r.gdp));
  return rows.map(r =>
    '<div class="bar-row">' +
    '<div class="lbl">' + esc(r.name) + '</div>' +
    '<div class="track"><div class="fill" style="width:' + (r.gdp / max * 100).toFixed(1) + '%"></div></div>' +
    '<div class="val">$' + r.gdp.toFixed(2) + 'T</div></div>').join('');
}
