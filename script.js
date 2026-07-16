/**
 * script.js
 * Logica del template: ticker, menu mobile, ricerca, rendering
 * delle card notizie da posts-data.js, filtro categorie e mappa
 * interattiva dei circoli territoriali (Leaflet + OpenStreetMap).
 */

document.addEventListener("DOMContentLoaded", () => {
  renderTicker();
  renderHero();
  renderNewsGrid("Tutte");
  initTabs();
  initMobileMenu();
  initSearch();
  initMap();
});

/* ---------------- Ticker ---------------- */
function renderTicker() {
  const list = document.getElementById("ticker-list");
  if (!list) return;
  const items = SAMPLE_POSTS.slice(0, 6);
  list.innerHTML = items
    .map(p => `<li><a href="${p.url}" target="_blank" rel="noopener">${p.title}</a></li>`)
    .join("");
}

/* ---------------- Hero (primo blocco in alto) ---------------- */
function renderHero() {
  const main = document.getElementById("hero-main");
  const side = document.getElementById("hero-side");
  if (!main || !side) return;

  const featured = SAMPLE_POSTS.find(p => p.featured) || SAMPLE_POSTS[0];
  const rest = SAMPLE_POSTS.filter(p => p !== featured).slice(0, 3);

  main.innerHTML = `
    <a class="card" href="${featured.url}" target="_blank" rel="noopener">
      <img src="${featured.image}" alt="${featured.title}">
      <div class="card-overlay">
        <span class="card-tag">${featured.category}</span>
        <h3>${featured.title}</h3>
      </div>
    </a>`;

  side.innerHTML = rest.map(p => `
    <a class="card" href="${p.url}" target="_blank" rel="noopener">
      <img src="${p.image}" alt="${p.title}">
      <div class="card-body">
        <span class="card-tag">${p.category}</span>
        <h3>${p.title}</h3>
      </div>
    </a>`).join("");
}

/* ---------------- Griglia notizie con filtro categoria ---------------- */
function renderNewsGrid(category) {
  const grid = document.getElementById("news-grid");
  if (!grid) return;
  const posts = category === "Tutte"
    ? SAMPLE_POSTS
    : SAMPLE_POSTS.filter(p => p.category === category);

  grid.innerHTML = posts.map(p => `
    <a class="card" href="${p.url}" target="_blank" rel="noopener">
      <img src="${p.image}" alt="${p.title}">
      <div class="card-body">
        <span class="card-tag">${p.category}</span>
        <h3>${p.title}</h3>
        <p class="excerpt">${p.excerpt}</p>
        <p class="date">${formatDate(p.date)}</p>
      </div>
    </a>`).join("") || `<p>Nessun articolo in questa categoria.</p>`;
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" });
}

function initTabs() {
  const tabs = document.querySelectorAll("#category-tabs .tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderNewsGrid(tab.dataset.cat);
    });
  });
}

/* ---------------- Menu mobile ---------------- */
function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => nav.classList.toggle("open"));

  document.querySelectorAll(".has-dropdown > a").forEach(link => {
    link.addEventListener("click", e => {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        link.parentElement.classList.toggle("open");
      }
    });
  });
}

/* ---------------- Ricerca ---------------- */
function initSearch() {
  const btn = document.getElementById("search-toggle");
  const panel = document.getElementById("search-panel");
  if (!btn || !panel) return;
  btn.addEventListener("click", () => {
    panel.classList.toggle("open");
    if (panel.classList.contains("open")) {
      const input = document.getElementById("search-input");
      if (input) input.focus();
    }
  });
  if (typeof wireSiteSearch === "function") wireSiteSearch("search-input", "search-results");
}

/* ---------------- Mappa circoli territoriali ---------------- */
function initMap() {
  const el = document.getElementById("sardegna-map");
  if (!el || typeof L === "undefined") return;

  const map = L.map(el, { scrollWheelZoom: false }).setView([40.05, 9.0], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 18
  }).addTo(map);

  const pdIcon = L.divIcon({
    className: "pd-marker",
    html: '<div style="background:#E4032E;width:16px;height:16px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 2px #E4032E;"></div>',
    iconSize: [16, 16]
  });

  MAP_MARKERS.forEach(m => {
    L.marker([m.lat, m.lng], { icon: pdIcon })
      .addTo(map)
      .bindPopup(`<b>${m.name}</b><br>${m.info}`);
  });
}
