// Page renderers + tiny SVG chart helpers. Charts are drawn from the same
// series printed beside them — what you see is the data, nothing decorative
// is invented.

import { HEADLINES, POPULATION, ECONOMY, PEOPLE } from './data.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** Vertical bar chart as inline SVG. Series: [{year, v}], unit in %. */
export function barChart(series, { w = 520, h = 210, color = '#b3232a', zero = true } = {}) {
  const vals = series.map((d) => d.v);
  let lo = Math.min(...vals, zero ? 0 : Infinity);
  let hi = Math.max(...vals, 0);
  if (!zero) lo = Math.floor(lo - (hi - lo) * 0.25);
  const pad = (hi - lo) * 0.12 || 1;
  hi += pad; lo -= lo < 0 ? pad : 0;
  const bw = w / series.length;
  const y = (v) => h - ((v - lo) / (hi - lo)) * (h - 28);
  const zeroY = y(0);
  let out = `<svg viewBox="0 0 ${w} ${h + 22}" role="img" aria-label="bar chart">`;
  out += `<line x1="0" y1="${zeroY}" x2="${w}" y2="${zeroY}" stroke="#191a1e" stroke-width="1"/>`;
  series.forEach((d, i) => {
    const x = i * bw + bw * 0.18;
    const width = bw * 0.64;
    const top = y(Math.max(d.v, 0));
    const bottom = y(Math.min(d.v, 0));
    out += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${width.toFixed(1)}" height="${Math.max(bottom - top, 1).toFixed(1)}" fill="${d.v < 0 ? '#5c6068' : color}"/>`;
    out += `<text x="${(x + width / 2).toFixed(1)}" y="${(top - 5).toFixed(1)}" text-anchor="middle" font-size="12.5" font-family="Arial" fill="#191a1e">${d.v.toFixed(2)}</text>`;
    out += `<text x="${(x + width / 2).toFixed(1)}" y="${h + 16}" text-anchor="middle" font-size="12" font-family="Arial" fill="#5c6068">${esc(d.year)}</text>`;
  });
  return out + '</svg>';
}

/** Horizontal bars for ranked lists: [{name, v}] with a unit suffix. */
export function hBars(rows, { w = 520, unit = '', color = '#191a1e' } = {}) {
  const max = Math.max(...rows.map((r) => r.v));
  const rh = 30;
  const h = rows.length * rh + 4;
  let out = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="ranked bars">`;
  rows.forEach((r, i) => {
    const y0 = i * rh + 4;
    const labelW = 128;
    const bw = ((w - labelW - 64) * r.v) / max;
    out += `<text x="0" y="${y0 + 15}" font-size="13.5" font-family="Arial" fill="#191a1e">${esc(r.name)}</text>`;
    out += `<rect x="${labelW}" y="${y0 + 3}" width="${bw.toFixed(1)}" height="13" fill="${color}"/>`;
    out += `<text x="${(labelW + bw + 7).toFixed(1)}" y="${y0 + 15}" font-size="13" font-family="Arial" fill="#33363c">${r.v.toFixed(2)}${unit}</text>`;
  });
  return out + '</svg>';
}

const card = (c) => `
  <article class="card">
    <div class="label">${esc(c.label)}</div>
    <div class="value">${esc(c.value)}</div>
    <div class="sub">${esc(c.sub)}</div>
    <div class="delta">${esc(c.delta)}</div>
  </article>`;

export function homeView() {
  return `
    <p class="kicker">The Republic of Indonesia · National Statistics</p>
    <h1>281 million people, one economy, counted properly.</h1>
    <p class="standfirst">The headline numbers of the world's fourth most populous country — population, output, prices and welfare — from Badan Pusat Statistik, the office that counts Indonesia. Every figure below carries its period; every chart is drawn from the series beside it.</p>
    <section class="cards">${HEADLINES.map(card).join('')}</section>
    <div class="cols">
      <div>
        <h2>Growth, through the shock</h2>
        <figure class="chart">${barChart(ECONOMY.gdpGrowth)}
          <figcaption>Real GDP growth, % a year. The 2020 pandemic contraction (−2.07%) and the return to the ~5% path Indonesia has held for a decade.</figcaption>
        </figure>
      </div>
      <div>
        <h2>Poverty, falling every year</h2>
        <figure class="chart">${barChart(PEOPLE.poverty, { color: '#1e7a4f' })}
          <figcaption>Poverty rate, % of population, each March. March 2025: 8.47% — the first reading below 9% in the republic's history.</figcaption>
        </figure>
      </div>
    </div>
    <p class="note">${esc(ECONOMY.note)}</p>
    <p class="src">Start with <a href="#/population">Population</a> for who the 281.6 million are, <a href="#/economy">Economy</a> for what they produce, and <a href="#/people">People &amp; Welfare</a> for how they live.</p>`;
}


export function populationView() {
  const P = POPULATION;
  const rows = P.topProvinces.map((p) => `<tr><td>${esc(p.name)}</td><td class="num">${p.pop.toFixed(2)} M</td></tr>`).join('');
  const ages = P.ageShares.map((a) => `<tr><td>${esc(a.band)}</td><td class="num">${a.pct.toFixed(1)}%</td></tr>`).join('');
  return `
    <p class="kicker">Population</p>
    <h1>The fourth-largest nation on Earth.</h1>
    <p class="standfirst">Indonesia counted ${esc(P.census2020)} people at the 2020 census and an estimated ${esc(P.total)} by mid-2024, spread over ${esc(P.islands)} and ${P.provinces} provinces — half of them on one island, Java.</p>
    <h2>Most populous provinces, 2020 census</h2>
    <figure class="chart">${hBars(P.topProvinces.map((p) => ({ name: p.name, v: p.pop })), { unit: ' M' })}
      <figcaption>Population in millions, 2020 census. West Java alone outnumbers every country in Africa except Nigeria and Ethiopia.</figcaption>
    </figure>
    <div class="cols">
      <div>
        <h2>The count in full</h2>
        <table class="facts">
          <tr><th>Measure</th><th class="num">Figure</th></tr>
          ${rows}
        </table>
      </div>
      <div>
        <h2>A young country, ageing slowly</h2>
        <table class="facts">
          <tr><th>Age band, 2024</th><th class="num">Share</th></tr>
          ${ages}
          <tr><td>Median age</td><td class="num">${esc(P.medianAge)}</td></tr>
          <tr><td>Population density</td><td class="num">${esc(P.density)}</td></tr>
          <tr><td>Annual growth</td><td class="num">${esc(P.growth)}</td></tr>
          <tr><td>Residence</td><td class="num">${esc(P.urban)}</td></tr>
        </table>
      </div>
    </div>
    <p class="note">${esc(P.note)}</p>
    <p class="src">Source: BPS, 2020 Population Census and mid-2024 population estimates.</p>`;
}

export function economyView() {
  const E = ECONOMY;
  const sectors = E.structure.map((s) => `<tr><td>${esc(s.sector)}</td><td class="num">${s.pct.toFixed(2)}%</td></tr>`).join('');
  return `
    <p class="kicker">Economy</p>
    <h1>A trillion-dollar economy on a 5% path.</h1>
    <p class="standfirst">GDP reached Rp 22,139 trillion in 2024 — about US$1.40 trillion, the largest economy in Southeast Asia. Growth has held near 5% for a decade; inflation, after the 2022 global shock, is back inside the central bank's band.</p>
    <div class="cols">
      <div>
        <h2>Real GDP growth, % a year</h2>
        <figure class="chart">${barChart(E.gdpGrowth)}
          <figcaption>Annual real growth. 2024: +5.03%, the third straight year at or above 5% since the pandemic.</figcaption>
        </figure>
      </div>
      <div>
        <h2>Inflation, December year-on-year</h2>
        <figure class="chart">${barChart(E.inflationDec, { color: '#b98a1c' })}
          <figcaption>Consumer price inflation, December on December. The 2022 spike (5.51%) was imported — fuel and food — and has fully unwound.</figcaption>
        </figure>
      </div>
    </div>
    <h2>What the economy is made of, 2024</h2>
    <figure class="chart">${hBars(E.structure.map((s) => ({ name: s.sector, v: s.pct })), { unit: '%', color: '#b3232a' })}
      <figcaption>Share of GDP by industry, 2024. Manufacturing remains the largest single sector at just under a fifth of output.</figcaption>
    </figure>
    <table class="facts">
      <tr><th>Industry</th><th class="num">Share of GDP</th></tr>
      ${sectors}
    </table>
    <h2>Trade, ${esc(E.trade.year)}</h2>
    <table class="facts">
      <tr><th>Flow</th><th class="num">Value</th></tr>
      <tr><td>Exports of goods</td><td class="num">${esc(E.trade.exports)}</td></tr>
      <tr><td>Imports of goods</td><td class="num">${esc(E.trade.imports)}</td></tr>
      <tr><td>Trade balance</td><td class="num">${esc(E.trade.balance)}</td></tr>
    </table>
    <p class="note">${esc(E.note)}</p>
    <p class="src">Source: BPS national accounts, consumer price index and foreign trade statistics, 2024.</p>`;
}

export function peopleView() {
  const P = PEOPLE;
  return `
    <p class="kicker">People &amp; Welfare</p>
    <h1>Longer lives, fuller classrooms, fewer poor.</h1>
    <p class="standfirst">The welfare ledger: poverty at a record low, human development in the "high" band, a child born in 2024 expecting 72.4 years of life, and 96 of every 100 adults able to read and write.</p>
    <div class="cols">
      <div>
        <h2>Poverty rate, each March</h2>
        <figure class="chart">${barChart(P.poverty, { color: '#1e7a4f', zero: false })}
          <figcaption>% of the population below the national poverty line. The fall paused for the pandemic, then resumed — every March since 2020 has set a new low.</figcaption>
        </figure>
      </div>
      <div>
        <h2>Unemployment, each August</h2>
        <figure class="chart">${barChart(P.unemploymentAug, { color: '#191a1e', zero: false })}
          <figcaption>Open unemployment rate, %. February 2025 read 4.76%, continuing the post-pandemic tightening of the labour market.</figcaption>
        </figure>
      </div>
    </div>
    <section class="cards">
      ${card({ label: 'Human Development Index', value: P.hdi.value, sub: `${P.hdi.year} · ${P.hdi.band}`, delta: 'up from 73.55 in 2023' })}
      ${card({ label: 'Life expectancy', value: P.lifeExpectancy.value, sub: `at birth, ${P.lifeExpectancy.year}`, delta: 'gains of ~0.3 years a year' })}
      ${card({ label: 'Literacy', value: P.literacy.value, sub: P.literacy.sub, delta: 'near-universal under age 45' })}
    </section>
    <p class="note">${esc(P.note)}</p>
    <p class="src">Source: BPS poverty, labour force (Sakernas), and human development statistics, 2024–2025.</p>`;
}
