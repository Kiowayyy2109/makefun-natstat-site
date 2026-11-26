// Nusantara in Figures — the data layer.
// Every figure is a published Badan Pusat Statistik (BPS) number, labelled
// with its reference period on the page. No figure is loaded over the
// network; this file is the whole dataset.

export const META = {
  country: 'Indonesia',
  office: 'Badan Pusat Statistik (BPS)',
  updated: 'November 2026',
};

export const HEADLINES = [
  { label: 'Population', value: '281.6 M', sub: 'mid-2024 estimate · 270.2 M at the 2020 census', delta: '+1.11% a year' },
  { label: 'GDP', value: 'Rp 22,139 T', sub: '2024, current prices · about US$1.40 trillion', delta: '+5.03% real growth' },
  { label: 'GDP per capita', value: 'Rp 78.0 M', sub: '2024 · about US$4,981', delta: '+4.2% on 2023' },
  { label: 'Inflation', value: '1.57%', sub: 'December 2024, year on year', delta: 'inside the 2.5±1% target band' },
  { label: 'Poverty rate', value: '8.47%', sub: 'March 2025 · 23.85 million people', delta: 'lowest ever recorded' },
  { label: 'Unemployment', value: '4.76%', sub: 'February 2025, open unemployment rate', delta: 'down from 4.82% a year earlier' },
];

export const POPULATION = {
  total: '281,603,800',
  census2020: '270,203,917',
  growth: '1.11%',
  density: '148 people per km²',
  landArea: '1,904,569 km²',
  islands: '17,001 islands',
  provinces: 38,
  medianAge: '30.4 years',
  urban: '58.6% urban',
  ageShares: [
    { band: '0–14 years', pct: 24.4 },
    { band: '15–64 years', pct: 68.9 },
    { band: '65+ years', pct: 6.7 },
  ],
  topProvinces: [
    { name: 'West Java', pop: 48.27 },
    { name: 'East Java', pop: 40.67 },
    { name: 'Central Java', pop: 36.52 },
    { name: 'North Sumatra', pop: 14.80 },
    { name: 'Banten', pop: 11.90 },
    { name: 'Jakarta', pop: 10.56 },
    { name: 'South Sulawesi', pop: 9.07 },
    { name: 'Lampung', pop: 9.01 },
  ],
  note: 'Province figures are the 2020 census counts, in millions. Three Javanese provinces alone hold 125.5 million people — more than all but eleven countries on Earth.',
};

export const ECONOMY = {
  gdpGrowth: [
    { year: '2020', v: -2.07 },
    { year: '2021', v: 3.70 },
    { year: '2022', v: 5.31 },
    { year: '2023', v: 5.05 },
    { year: '2024', v: 5.03 },
  ],
  inflationDec: [
    { year: '2020', v: 1.68 },
    { year: '2021', v: 1.87 },
    { year: '2022', v: 5.51 },
    { year: '2023', v: 2.61 },
    { year: '2024', v: 1.57 },
  ],
  structure: [
    { sector: 'Manufacturing', pct: 18.98 },
    { sector: 'Wholesale & retail trade', pct: 13.08 },
    { sector: 'Agriculture & forestry', pct: 12.61 },
    { sector: 'Construction', pct: 9.89 },
    { sector: 'Mining & quarrying', pct: 9.12 },
  ],
  trade: { exports: 'US$264.7 B', imports: 'US$233.7 B', balance: '+US$31.0 B', year: '2024' },
  note: 'Indonesia has grown at about 5% a year for a decade outside the pandemic dip — one of the steadiest large economies in the world.',
};

export const PEOPLE = {
  poverty: [
    { year: '2020', v: 10.19 },
    { year: '2021', v: 10.14 },
    { year: '2022', v: 9.54 },
    { year: '2023', v: 9.36 },
    { year: '2024', v: 9.03 },
    { year: '2025', v: 8.47 },
  ],
  hdi: { value: '74.20', year: '2024', band: 'high human development' },
  lifeExpectancy: { value: '72.4 years', year: '2024' },
  literacy: { value: '96.0%', sub: 'of people aged 15+, 2024' },
  unemploymentAug: [
    { year: '2022', v: 5.86 },
    { year: '2023', v: 5.32 },
    { year: '2024', v: 4.91 },
  ],
  note: 'The poverty rate has fallen every March since 2020, through a pandemic and a global food-price shock. In March 2025 it reached 8.47% — the first reading below 9% in the republic\'s history.',
};
