/**
 * posts-data.js
 * ---------------------------------------------------------
 * Dati di esempio per la griglia "Notizie" della homepage.
 * In questa versione statica i post sono presi da un array
 * qui sotto (contenuti reali già pubblicati su pdsardegna.it,
 * usati come segnaposto realistico).
 *
 * PER RENDERLI DAVVERO AUTOMATICI (come sul sito nazionale):
 * sostituire la costante SAMPLE_POSTS con una fetch alla REST
 * API di WordPress, che è già disponibile di default su ogni
 * sito WP, es.:
 *
 *   fetch('https://www.pdsardegna.it/wp-json/wp/v2/posts?_embed&per_page=9')
 *     .then(r => r.json())
 *     .then(data => renderPosts(data.map(mapWpPostToCard)));
 *
 * La funzione mapWpPostToCard(post) qui sotto mostra come
 * trasformare la risposta WP nel formato { title, excerpt,
 * image, url, category, date } usato da script.js.
 * ---------------------------------------------------------
 */

const SAMPLE_POSTS = [
  {
    title: "L’OPPOSIZIONE ALLA MATEMATICA: I 100 MILIONI SERVONO A FAR RESISTERE LA SANITÀ",
    excerpt: "L’editoriale di Franco Meloni su “L’Unione Sarda” interpreta la richiesta di 100 milioni avanzata dal Gruppo Consiliare del Partito Democratico come una proposta di aumento della spesa, quando invece serve a difendere i servizi esistenti.",
    image: "https://www.pdsardegna.it/wp-content/uploads/2026/04/682707040_122223629534362046_1679866910748202328_n-768x960.jpg",
    url: "https://www.pdsardegna.it/lopposizione-alla-matematica-i-100-milioni-servono-a-far-resistere-la-sanita/",
    category: "Sanità",
    date: "2026-04-18",
    featured: true
  },
  {
    title: "SALUTE E NUTRIZIONE: PER L’ISTITUZIONE DELLA RETE REGIONALE DI NUTRIZIONE CLINICA",
    excerpt: "Istituire una Rete Regionale di Nutrizione Clinica per garantire una presa in carico multidisciplinare, contrastare la malnutrizione e assicurare cure appropriate su tutto il territorio.",
    image: "https://www.pdsardegna.it/wp-content/uploads/2026/04/681340724_17933827314250933_8904318136697418556_n-768x960.jpg",
    url: "https://www.pdsardegna.it/salute-e-nutrizione-per-listituzione-della-rete-regionale-di-nutrizione-clinica/",
    category: "Sanità",
    date: "2026-04-10"
  },
  {
    title: "SANITÀ SARDA: IL PD INTERVIENE SULLO STATO DI CRISI DELLA SANITÀ IN SARDEGNA",
    excerpt: "Il Gruppo Consiliare del PD si è riunito per valutare un documento tecnico e dettagliato sulla situazione della sanità regionale.",
    image: "https://www.pdsardegna.it/wp-content/uploads/2023/09/375922418_678688820960923_5661290234694392985_n-768x961.jpg",
    url: "https://www.pdsardegna.it/sanita-sarda-il-pd-interviene-sullo-stato-di-crisi-della-sanita-in-sardegna/",
    category: "Notizie",
    date: "2026-03-28"
  },
  {
    title: "DIRITTO ALLO STUDIO: AUMENTO DELLE RISORSE PER LE BORSE E MISURE INEDITE",
    excerpt: "Nessun taglio al diritto allo studio in Sardegna, ma una programmazione finanziaria orientata esclusivamente al potenziamento dei servizi e all’introduzione di nuove misure.",
    image: "https://www.pdsardegna.it/wp-content/uploads/2023/09/377270448_677653541064451_324134144465657193_n-240x300.jpg",
    url: "https://www.pdsardegna.it/%f0%9f%9f%a5-diritto-allo-studio-aumento-delle-risorse-per-le-borse-e-misure-inedite/",
    category: "Documenti",
    date: "2026-03-15"
  },
  {
    title: "Lavorare non è morire",
    excerpt: "Il nostro Partito, la nostra comunità vuole unire storie e culture diverse, ma anche immaginare un progetto nuovo, un Partito strutturato più vicino ai territori.",
    image: "https://www.pdsardegna.it/wp-content/uploads/2023/09/375974900_678319350997870_2871022939807387546_n-240x300.jpg",
    url: "https://www.pdsardegna.it/lavorare-non-e-morire/",
    category: "Notizie",
    date: "2023-09-20"
  },
  {
    title: "È il Nostro Tempo, riprendiamoci il nostro futuro",
    excerpt: "Il nostro Partito, la nostra comunità vuole unire storie e culture diverse, ma anche immaginare un progetto nuovo per la Sardegna.",
    image: "https://www.pdsardegna.it/wp-content/uploads/2023/09/375981450_677590207737451_2187259017334472814_n-219x300.jpg",
    url: "https://www.pdsardegna.it/e-il-nostro-tempo-riprendiamoci-il-nostro-futuro/",
    category: "Notizie",
    date: "2023-09-12"
  }
];

// Federazioni provinciali del PD Sardegna, con segretari reali
// (fonte: pagine pubbliche "Segreteria provinciale" e "Direzione regionale"
// di pdsardegna.it). Geolocalizzate sul capoluogo di ciascun territorio,
// dato che non esistono indirizzi pubblici dei singoli circoli
// (la pagina "Circoli Territoriali" del sito è protetta ed è vuota).
// Federazione della Città Metropolitana di Cagliari</h3><p>Segretario: Efisio De Muru<br>Sede regionale, Via Emilia 39 Cagliari</p></div>
const MAP_MARKERS = [
  { name: "Federazione della Città Metropolitana di Cagliari", lat: 39.2238, lng: 9.1217, info: "Segretario: Efisio De Muru <br>Sede regionale, Via Emilia 39 Cagliari" },
  { name: "ederazione della Città Metropolitana di Sassari", lat: 40.7259, lng: 8.5557, info: "Segretario: Massimo Pintus  <br>Via xxxxx xx Sassari" },
  { name: "Federazione di Nuoro", lat: 40.3210, lng: 9.3284, info: "Segretaria: Maria Elisa Marongiu <br>Via xxxxx xx Nuoro" },
  { name: "Federazione di Oristano", lat: 39.9034, lng: 8.5904, info: "Segretario: Massimiliano Daga <br>Via xxxxx xx Oristano" },
  { name: "Federazione di Gallura Nord- Est Sardegna", lat: 40.9236, lng: 9.4988, info: "Segretaria: Mariangela Marchio <br>Via xxxxx xx Olbia" },
  { name: "Federazione del Medio Campidano", lat: 39.5486, lng: 8.7847, info: "Segretario: Alessio Frau <br>Via xxxxx xx Medio Campidano" },
  { name: "Federazione di Carbonia Iglesias", lat: 39.3212, lng: 8.5339, info: "Segretario: Mauro Esu <br>Via Antas 7, Iglesias" },
  { name: "Federazione dell'Ogliastra", lat: 39.9298, lng: 9.5827, info: "Segretario: Francesco Mattia Mascia <br>Via xxxxx xx Ogliastra" }
];

/**
 * Esempio di mapping da un post WordPress (REST API) al formato
 * usato dalle card qui sopra. Da usare quando si collega il
 * template al sito WordPress reale.
 */
function mapWpPostToCard(post) {
  const media = post._embedded && post._embedded["wp:featuredmedia"];
  const terms = post._embedded && post._embedded["wp:term"];
  return {
    title: post.title.rendered,
    excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, "").trim(),
    image: media && media[0] ? media[0].source_url : "assets/placeholder.jpg",
    url: post.link,
    category: terms && terms[0] && terms[0][0] ? terms[0][0].name : "Notizie",
    date: post.date
  };
}
