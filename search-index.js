/**
 * search-index.js
 * Indice statico delle pagine e delle persone del sito, usato dalla
 * casella di ricerca nell'header. I percorsi (url) sono sempre scritti
 * relativi alla radice del sito (root); resolveSearchUrl() li adatta
 * automaticamente a seconda che ci si trovi in / o in /pagine/.
 */

const SITE_INDEX = [
  { title: "Home", url: "index.html", type: "Pagina" },
  { title: "Gruppo PD in Consiglio regionale", url: "pagine/consiglio-regionale.html", type: "Pagina" },
  { title: "Segreteria Regionale", url: "pagine/segreteria-regionale.html", type: "Pagina" },
  { title: "Segreterie Provinciali", url: "pagine/segreterie-provinciali.html", type: "Pagina" },
  { title: "Contattaci", url: "pagine/contattaci.html", type: "Pagina" },

  // Gruppo Consiliare PD - Consiglio regionale
  { title: "Roberto Deriu", url: "pagine/consiglio-regionale.html", type: "Consigliere" },
  { title: "Gianluigi Piano", url: "pagine/consiglio-regionale.html", type: "Consigliere" },
  { title: "Carla Fundoni", url: "pagine/consiglio-regionale.html", type: "Consigliere" },
  { title: "Piero Comandini", url: "pagine/consiglio-regionale.html", type: "Consigliere" },
  { title: "Salvatore Corrias", url: "pagine/consiglio-regionale.html", type: "Consigliere" },
  { title: "Giuseppe Meloni", url: "pagine/consiglio-regionale.html", type: "Consigliere" },
  { title: "Alessandro Pilurzu", url: "pagine/consiglio-regionale.html", type: "Consigliere" },
  { title: "Valter Piscedda", url: "pagine/consiglio-regionale.html", type: "Consigliere" },
  { title: "Antonio Sau", url: "pagine/consiglio-regionale.html", type: "Consigliere" },
  { title: "Antonio Solinas", url: "pagine/consiglio-regionale.html", type: "Consigliere" },
  { title: "Camilla Gerolama Soru", url: "pagine/consiglio-regionale.html", type: "Consigliere" },

  // Segreteria Regionale
  { title: "Silvio Lai", url: "pagine/segreteria-regionale.html", type: "Segreteria regionale" },
  { title: "Antonello Lullia", url: "pagine/segreteria-regionale.html", type: "Segreteria regionale" },
  { title: "Luca Pirisi", url: "pagine/segreteria-regionale.html", type: "Segreteria regionale" },
  { title: "Elsa Ranno", url: "pagine/segreteria-regionale.html", type: "Segreteria regionale" },
  { title: "Giovanna Scanu", url: "pagine/segreteria-regionale.html", type: "Segreteria regionale" }
];

/**
 * Trasforma un url "root-relative" (es. "pagine/contattaci.html")
 * nel percorso corretto rispetto alla pagina in cui ci si trova ora.
 */
function resolveSearchUrl(url) {
  const inPagine = window.location.pathname.includes("/pagine/");
  if (!inPagine) return url;
  if (url.startsWith("pagine/")) return url.slice("pagine/".length);
  return "../" + url;
}

/**
 * Esegue la ricerca su SITE_INDEX + SAMPLE_POSTS (se disponibile in
 * questa pagina) e restituisce al massimo `limit` risultati.
 */
function runSiteSearch(query, limit = 7) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  let results = SITE_INDEX
    .filter(item => item.title.toLowerCase().includes(q))
    .map(item => ({ title: item.title, url: resolveSearchUrl(item.url), type: item.type }));

  if (typeof SAMPLE_POSTS !== "undefined") {
    const postMatches = SAMPLE_POSTS
      .filter(p => p.title.toLowerCase().includes(q))
      .map(p => ({ title: p.title, url: p.url, type: "Notizia", external: true }));
    results = results.concat(postMatches);
  }

  return results.slice(0, limit);
}

/** Collega un campo di ricerca + pannello risultati alla ricerca del sito. */
function wireSiteSearch(inputId, resultsId) {
  const input = document.getElementById(inputId);
  const results = document.getElementById(resultsId);
  if (!input || !results) return;

  const render = () => {
    const matches = runSiteSearch(input.value);
    if (!input.value.trim()) {
      results.innerHTML = "";
      results.classList.remove("visible");
      return;
    }
    if (!matches.length) {
      results.innerHTML = `<p class="search-empty">Nessun risultato per "${input.value.trim()}"</p>`;
      results.classList.add("visible");
      return;
    }
    results.innerHTML = matches.map(m => `
      <a class="search-result" href="${m.url}" ${m.external ? 'target="_blank" rel="noopener"' : ""}>
        <span class="search-result-title">${m.title}</span>
        <span class="search-result-type">${m.type}</span>
      </a>`).join("");
    results.classList.add("visible");
  };

  input.addEventListener("input", render);
  input.addEventListener("focus", render);
}
