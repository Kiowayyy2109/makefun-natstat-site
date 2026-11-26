// Hash router: four pages, no build step, no network. Unknown routes fall
// back to the overview rather than a dead end.

import { homeView, populationView, economyView, peopleView } from './views.js';

const ROUTES = {
  '/': { key: 'home', view: homeView, title: "Nusantara in Figures — Indonesia's National Statistics" },
  '/population': { key: 'population', view: populationView, title: 'Population — Nusantara in Figures' },
  '/economy': { key: 'economy', view: economyView, title: 'Economy — Nusantara in Figures' },
  '/people': { key: 'people', view: peopleView, title: 'People & Welfare — Nusantara in Figures' },
};

function render() {
  const path = location.hash.replace(/^#/, '') || '/';
  const route = ROUTES[path] ?? ROUTES['/'];
  document.getElementById('app').innerHTML = route.view();
  document.title = route.title;
  for (const a of document.querySelectorAll('.tabs a')) {
    a.classList.toggle('on', a.dataset.route === route.key);
  }
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
