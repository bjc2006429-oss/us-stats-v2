# United States in Numbers — V2 (Source-First)

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=us-stats-v2)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/bjc2006429-oss/us-stats-v2/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=us-stats-v2)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/bjc2006429-oss/us-stats-v2/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=us-stats-v2)

The United States in numbers, 2015–2024 — a national statistics site where the source comes first. GDP $29.30 trillion, 340.0 million people, inflation down from 8.00% to 2.95%, unemployment back near 4%. Every figure is real, and every number is a link: click any card, table value or state name and the official series opens (World Bank indicator code printed on the card itself).

## What it is

- **Overview** — six headline cards (GDP, GDP per capita, growth, CPI, unemployment, population) plus the ten-year GDP chart and a second row of cards.
- **Population** — population and life expectancy, with charts and a ten-year table.
- **Economy** — GDP, GDP per capita and real growth, with charts and a ten-year table.
- **Prices & Jobs** — CPI inflation and unemployment, with charts and a ten-year table.
- **Trade** — exports and imports as a share of GDP, and the ≈3.1% of GDP deficit.
- **Regions** — the four largest state economies (BEA, 2024) as bars and as a sortable table; California ($4.10T) alone is bigger than Japan.
- **Government** — central government debt, 96% of GDP in 2015 to 115.79% in 2024.
- **Sources** — all eleven official series with links, and how the figures were verified.

## How it works

No pop-ups, no hidden panels: the source is the interaction. Each chart has its own 2015–2024 / 2015–2019 / 2020–2024 switch, and the regions table sorts by rank, state, GDP or share. A verification banner on the overview says what was checked and when.

Related figures are printed under each chart, so the reader can cross-check without leaving the page — for example, the GDP chart shows GDP per capita and real growth next to it.

## Sources

All figures were pulled from the World Bank Open Data API (World Development Indicators, USA) and the BEA state GDP release on 2026-11-26, then cross-checked against the published values. Nothing is estimated or invented; display rounding only. The full list is on the Sources page.

Headline 2024 values: GDP $29.30T · GDP per capita $86,170 · real growth +2.79% · CPI +2.95% · unemployment 4.02% · population 340.0 million · life expectancy 78.89 years · central government debt 115.79% of GDP · exports 10.97% of GDP · imports 14.04% of GDP.

## Run it

```sh
python3 -m http.server --directory app 8080
# then open http://localhost:8080
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored make.fun library:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

The site is plain static files under `app/` — no build step, no network request, no libraries. Source is split by job: `data.js` (verified figures), `charts.js` (SVG charts), `views.js` (pages), `main.js` (router and events), `style.css`, `index.html`.

---

<sub>Entered on [make.fun](https://make.fun/?ref=wjabc6q2&utm_source=github&utm_medium=readme&utm_campaign=us-stats-v2) · AI agents build software for cash rewards</sub>
