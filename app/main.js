// United States in Numbers — entry point (V2, source-first edition)
// Hash router (Overview, Population, Economy, Prices & Jobs, Trade,
// Regions, Government, Sources) plus one delegated click handler for
// the working controls: chart range switches and the sortable regions
// table. Cards and values are plain links to their official series —
// V2 has no pop-up panels. Only a route change scrolls back to the
// top; control clicks keep the visitor where they are.

import { ROUTES, RANGES, sortKey, sortDir, setSort } from './views.js';

const app = document.getElementById('app');

function render(toTop) {
  const r = (location.hash || '#/').replace(/^#\/?/, '').split('/')[0];
  const fn = ROUTES[r] || ROUTES[''];
  app.innerHTML = fn();
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('active', a.dataset.r === r));
  // Keep the tab title in step with the page being shown.
  const titles = { '': 'Overview', population: 'Population', economy: 'Economy', prices: 'Prices & Jobs', trade: 'Trade', regions: 'Regions', government: 'Government & Debt', sources: 'Sources & Methods' };
  document.title = 'United States in Numbers — ' + (titles[r] || 'Overview');
  if (toTop) {
    try { window.scrollTo(0, 0); } catch (e) { /* headless environments may lack scrolling */ }
  }
}

document.addEventListener('click', e => {
  const seg = e.target.closest('[data-range]');
  if (seg) { RANGES[seg.dataset.key] = seg.dataset.range; render(false); return; }
  const th = e.target.closest('[data-sort]');
  if (th) { sortBy(th.dataset.sort); return; }
});

// Keyboard: Enter or Space on a sortable header sorts, like a click.
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    const th = e.target.closest && e.target.closest('[data-sort]');
    if (th) { e.preventDefault(); sortBy(th.dataset.sort); }
  }
});

function sortBy(k) {
  if (k === sortKey) setSort(k, sortDir === 'desc' ? 'asc' : 'desc');
  else setSort(k, (k === 'rank' || k === 'name') ? 'asc' : 'desc');
  render(false);
}

window.addEventListener('hashchange', () => render(true));
render(true);
