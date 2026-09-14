const STATUS = {
  verified: { label: "Verified", description: "A specific person or claim is supported by an independently checked institutional or first-hand source." },
  supported: { label: "Source-backed", description: "The family materials cite a record or show the person, but the underlying record has not yet been independently inspected here." },
  reconstructed: { label: "Family reconstruction", description: "A reasoned conclusion from the draft, tree, DNA account, or linked clues; useful, but not yet independently proven." },
  open: { label: "Open question", description: "The current evidence is incomplete, ambiguous, or conjectural." },
  context: { label: "Historical context", description: "The surrounding history is verified, but it does not prove what a particular ancestor believed or did." },
  private: { label: "Living · private", description: "The relationship is preserved while identifying details are minimized in this public edition." }
};

const people = [
  { id: "wolf", name: "Wolf Cymbalista", years: "born c. 1760s", generation: 1, places: "Przysucha", branch: "Cymbalista", status: "reconstructed", note: "The earliest named ancestor in the working family register. The draft describes him as a musician; the original record behind that statement is not attached yet.", sources: ["Family narrative draft"] },
  { id: "icyk", name: "Icyk (Isaac) Cymbalista", years: "born c. 1791", generation: 2, places: "Przysucha", branch: "Cymbalista", status: "reconstructed", note: "Wolf’s son and, according to the draft, a second-generation musician. Both the date and occupation remain working conclusions.", sources: ["Family narrative draft"] },
  { id: "rachmil", name: "Rachmil Cymbalista", alt: "Yerachmiel David bar Yitzchak", years: "1836–1918", generation: 3, places: "Przysucha · Warsaw · London", branch: "Cymbalista", status: "supported", note: "A Hebrew teacher remembered in family tradition as a rabbi. The draft reports that his gravestone praises a life occupied with Torah; a fresh photograph and translation would make that claim independently verifiable.", sources: ["Family narrative draft: civil records and gravestone summary"] },
  { id: "fajga", name: "Fajga Pejsa Szpitzberg", alt: "Feiga Pesi", years: "1835–1908", generation: 3, places: "Przysucha · Warsaw · London", branch: "Szpitzberg", status: "supported", note: "Daughter of Kaufman Szpitzberg and Gitla, and the matriarch shared by the later surname branches. The draft reports an 1855 marriage act and a death in the Stepney workhouse infirmary.", sources: ["Family narrative draft: marriage and family-record summary"] },
  { id: "isaac-wolf", name: "Isaac Wolf Simblist", years: "born 1858", generation: 4, places: "Przysucha · Warsaw · London", branch: "Simblist", status: "supported", note: "Rachmil and Fajga’s eldest surviving son. The draft places his grocery and ship-chandler shop at 60 West India Dock Road in London.", sources: ["Family narrative draft"] },
  { id: "leah", name: "Leah Simblist", years: "dates not yet attached", generation: 4, places: "London", branch: "Simblist", status: "open", note: "Isaac Wolf’s wife. The draft says they are buried with Rachmil and Fajga at Edmonton Federation Cemetery; burial entries still need to be linked person by person.", sources: ["Family narrative draft"] },
  { id: "aaron", name: "Aaron Cymbalist", years: "dates not yet attached", generation: 4, places: "Warsaw · London", branch: "Cymbalist", status: "supported", note: "One of the three brothers whose surname acquired a distinct English spelling. His branch remained largely in London.", sources: ["Family narrative draft"] },
  { id: "abram", name: "Abram Sucher Symberlist", years: "dates not yet attached", generation: 4, places: "Warsaw · London", branch: "Symberlist", status: "supported", note: "The draft identifies Abram as the pathbreaker who left Warsaw for London on 28 January 1882. That exact departure date still needs its underlying passenger or civil record attached.", sources: ["Family narrative draft"] },
  { id: "joseph", name: "Joseph Edward Johnson", alt: "Josel Cymbalista · ‘Zimbalist?’ in the source tree", years: "1890–c. 1953", generation: 5, places: "Warsaw · Cambridge, Massachusetts", branch: "Johnson", status: "reconstructed", photo: "assets/portraits/joseph.webp", note: "The working reconstruction says Josel Cymbalista became Joseph Edward Johnson in America. The identity is argued from DNA matches, a 1920 census, and Dorothy’s naturalization papers, but those items have not yet been attached for independent review.", sources: ["Family narrative draft", "171-person family-tree export"] },
  { id: "dorothy", name: "Dorothy Kate Dale", alt: "Dorothy Johnson", years: "dates not yet attached", generation: 5, places: "Marylebone · Massachusetts", branch: "Dale / Johnson", status: "supported", photo: "assets/portraits/dorothy.webp", note: "Joseph’s English-born wife. Her reported naturalization oath is a key part of the identity reconstruction because it describes Joseph as London-born.", sources: ["Family narrative draft", "171-person family-tree export"] },
  { id: "jacob", name: "Jacob Simblist", years: "dates not yet attached", generation: 5, places: "London · Boston", branch: "Simblist", status: "supported", note: "The draft says Jacob sailed for Boston in 1912 and later married Mary Sheff. The idea that he traveled partly to find Joseph is family memory, not yet a documented motive.", sources: ["Family narrative draft"] },
  { id: "mary-sheff", name: "Mary Sheff", years: "1894–1970", generation: 5, places: "Boston", branch: "Sheff", status: "supported", note: "Jacob’s wife. Her Sheff and Sherman ancestry is a separate family line that joins the compiler’s branch rather than the wider Cymbalista line.", sources: ["Family narrative draft coda"] },
  { id: "morris", name: "Morris Simblist", years: "dates not yet attached", generation: 5, places: "London · Boston", branch: "Simblist", status: "supported", note: "The draft places Morris’s arrival in Massachusetts in 1920. The immigration document is a useful next attachment.", sources: ["Family narrative draft"] },
  { id: "reuben", name: "Reuben Mark Simblist", years: "dates not yet attached", generation: 5, places: "London · Sydney", branch: "Simblist", status: "supported", note: "Founder of the Australian branch. External Jewish records independently identify him as Judge Samuel Simblist’s father, while the draft adds a 1906 marriage and a furniture business.", sources: ["Family narrative draft", "Australian Jewish Historical Society person record"] },
  { id: "kate", name: "Kate Rose", alt: "née Simblist", years: "dates not yet attached", generation: 5, places: "London", branch: "Simblist", status: "supported", note: "The draft says Kate married Moses Rose and remained in London. Individual marriage and burial references are not yet attached.", sources: ["Family narrative draft"] },
  { id: "annie", name: "Annie Vizard", alt: "née Simblist", years: "dates not yet attached", generation: 5, places: "London", branch: "Simblist", status: "supported", note: "The draft says Annie married Frederick Vizard and raised a family in England. Supporting vital records are still to be linked.", sources: ["Family narrative draft"] },
  { id: "charles", name: "Charles Symberlist", years: "reported 1886–1917", generation: 5, places: "London · Western Front", branch: "Symberlist", status: "open", note: "The draft says Charles died on the Somme and is named at Thiepval. A broad web search did not locate a matching Commonwealth War Graves entry under this spelling, so the military identity remains unverified.", sources: ["Family narrative draft"] },
  { id: "norah-sym", name: "Norah Symberlist", years: "dates not yet attached", generation: 5, places: "London", branch: "Symberlist", status: "supported", note: "The draft describes Norah as remaining in London and raising a family there. Her married name and supporting records are not yet attached.", sources: ["Family narrative draft"] },
  { id: "lazarus", name: "Lazarus Symberlist", alt: "Louis · Henry Sims", years: "reported –1953", generation: 5, places: "London · São Paulo", branch: "Symberlist", status: "reconstructed", note: "The draft traces a sequence of names—Lazarus, Louis, then Henry Sims—and a life ending in São Paulo. Each link in that identity chain still needs direct documentation.", sources: ["Family narrative draft", "Secondary family-history page"] },
  { id: "joseph-sidney", name: "Joseph Sidney Johnson", alt: "Sydney in the source tree", years: "dates not shown", generation: 6, places: "Massachusetts", branch: "Johnson", status: "supported", photo: "assets/portraits/joseph-sidney.webp", note: "Shown in the 171-person source tree as Joseph and Dorothy’s son. The preserved portrait comes from his person card in that export.", sources: ["171-person family-tree export"] },
  { id: "edward-johnson", name: "Edward Johnson", years: "dates not shown", generation: 6, places: "Massachusetts", branch: "Johnson", status: "supported", note: "Shown in the source tree as another son of Joseph and Dorothy. This public reconstruction does not yet have a separate biographical record for him.", sources: ["171-person family-tree export"] },
  { id: "barbara", name: "Barbara Ellen Johnson", alt: "née Mirling", years: "–2007", generation: 6, places: "Massachusetts", branch: "Mirling / Johnson", status: "supported", photo: "assets/portraits/barbara.webp", note: "Shown in the source tree as Joseph Sidney’s spouse and Richard Allen Johnson’s mother. Her birth year is absent from the source card.", sources: ["171-person family-tree export"] },
  { id: "samuel", name: "Samuel Hyman Simblist, Q.C.", alt: "Shmuel Chaim ben Reuven", years: "1909–1977", generation: 6, places: "Sydney", branch: "Simblist", status: "verified", note: "A District Court judge, synagogue supporter, Zionist organizer, Hebrew speaker, and advocate for Jewish immigrant welfare. His marriage and burial are independently indexed by the Australian Jewish Historical Society; Rabbi Raymond Apple’s eulogy documents his public and Jewish life.", sources: ["Australian Jewish Historical Society", "Rabbi Raymond Apple’s eulogy"] },
  { id: "faye", name: "Faye", years: "dates not yet attached", generation: 6, places: "Sydney", branch: "Simblist", status: "reconstructed", note: "Identified in the draft as Reuben’s daughter and a possible namesake of Fajga Pejsa. The intended naming connection is not independently documented.", sources: ["Family narrative draft"] },
  { id: "phyllis", name: "Phyllis", years: "dates not yet attached", generation: 6, places: "Boston", branch: "Simblist", status: "reconstructed", note: "Identified in the draft as Jacob’s pianist daughter and a possible namesake of Fajga Pejsa. The music connection is evocative, but still family-source evidence.", sources: ["Family narrative draft"] },
  { id: "richard", name: "Richard Allen Johnson", years: "born 1948", generation: 7, places: "Massachusetts", branch: "Johnson", status: "supported", photo: "assets/portraits/richard.webp", note: "Shown in the source tree as the son of Joseph Sidney and Barbara Ellen Johnson. His portrait is preserved from the original person card.", sources: ["171-person family-tree export"] },
  { id: "janet", name: "Janet Johnson", alt: "née Skomurski", years: "dates withheld", generation: 7, places: "Massachusetts", branch: "Skomurski / Johnson", status: "supported", photo: "assets/portraits/janet.webp", note: "Shown in the source tree as Richard Allen Johnson’s spouse and the link to the Skomurski branch.", sources: ["171-person family-tree export"] },
  { id: "robin", name: "Robin Richard Johnson", years: "born 1979", generation: 8, places: "Massachusetts", branch: "Johnson", status: "supported", photo: "assets/portraits/robin.webp", note: "The focus person in the source tree. His portrait has been cropped from the original card rather than replacing the tree with a scan.", sources: ["171-person family-tree export"] },
  { id: "april", name: "April Johnson", alt: "Israel in the source tree", years: "born 1981", generation: 8, places: "Massachusetts", branch: "Johnson", status: "supported", photo: "assets/portraits/april.webp", note: "Shown in the source tree as Robin’s sister and Richard and Janet’s daughter.", sources: ["171-person family-tree export"] },
  { id: "adi", name: "Adi", years: "living", generation: 8, places: "Massachusetts", branch: "Johnson", status: "private", note: "Robin’s partner and parent with Robin of the next generation. Additional identifying details are intentionally minimized in this public edition.", sources: ["Current family record"] },
  { id: "norah", name: "Norah Rosalyn Johnson", years: "living · details private", generation: 9, places: "Massachusetts", branch: "Johnson", status: "private", note: "Robin and Adi’s daughter. Her portrait and birth year are preserved in the private source tree, not published here.", sources: ["171-person family-tree export"] },
  { id: "nolan", name: "Nolan Benjamin Johnson", years: "living · details private", generation: 9, places: "Massachusetts", branch: "Johnson", status: "private", note: "Robin and Adi’s son. His portrait and birth details are preserved in the private source tree, not published here.", sources: ["171-person family-tree export"] }
];

const peopleById = Object.fromEntries(people.map(person => [person.id, person]));

const directLine = [
  { label: "Generation 1", ids: ["wolf"] },
  { label: "Generation 2", ids: ["icyk"] },
  { label: "Generation 3", ids: ["rachmil", "fajga"], relation: "partners" },
  { label: "Generation 4", ids: ["isaac-wolf", "leah"], relation: "partners" },
  { label: "Generation 5", ids: ["joseph", "dorothy"], relation: "partners" },
  { label: "Generation 6", ids: ["joseph-sidney", "barbara"], relation: "partners" },
  { label: "Generation 7", ids: ["richard", "janet"], relation: "partners" },
  { label: "Generation 8", ids: ["robin", "adi"], relation: "partners" },
  { label: "Generation 9", ids: ["norah", "nolan"], relation: "siblings" }
];

const branchColumns = [
  { name: "Simblist", route: "London · Boston · Sydney", ids: ["isaac-wolf", "leah", "joseph", "jacob", "mary-sheff", "morris", "reuben", "samuel", "faye", "phyllis", "kate", "annie"] },
  { name: "Cymbalist", route: "London", ids: ["aaron"] },
  { name: "Symberlist", route: "London · Somme · São Paulo", ids: ["abram", "charles", "norah-sym", "lazarus"] }
];

const features = [
  { number: "01", title: "The surname is an occupation", text: "Cymbalista is understood as ‘cimbalom player’: a person who made music on a hammered-string instrument heard across Central and Eastern Europe. The draft says both Wolf and Icyk were musicians.", status: "reconstructed", foot: "Meaning is supported; the individual occupations still need records." },
  { number: "02", title: "A teacher, not merely a title", text: "Family memory elevated Rachmil to ‘rabbi.’ The more grounded version may be more meaningful: an honored Hebrew teacher whose reported epitaph centers a lifetime of Torah learning.", status: "supported", foot: "Based on the draft’s gravestone translation." },
  { number: "03", title: "One sound became three surnames", text: "Cymbalista became Simblist, Cymbalist, and Symberlist in London. The spelling changes capture how migration reshaped identity while kinship continued underneath.", status: "supported", foot: "Family register; civil records should be linked next." },
  { number: "04", title: "A hidden branch came back", text: "Joseph’s Johnson descendants reportedly grew up without knowing the Warsaw Jewish connection. The family reconstruction says DNA matches and paper records restored the link roughly a century later.", status: "reconstructed", foot: "Compelling account; raw DNA and document trail not attached." },
  { number: "05", title: "Jewish ethics met public law", text: "In Sydney, Samuel Simblist’s life joined law, synagogue service, Hebrew learning, support for Israel, and assistance to immigrants. His rabbi framed the judicial career through the biblical pursuit of justice.", status: "verified", foot: "AJHS indexes and Rabbi Raymond Apple’s first-hand eulogy." }
];

const places = [
  { city: "Przysucha", country: "Poland", type: "Ancestral place", title: "Begin where the name begins", text: "Visit the eighteenth-century synagogue exterior and the Jewish cemetery, including the ohelim of the Holy Jew and Simcha Bunim. The synagogue’s owner reported a 2024 agreement to finish restoration and return it to prayer use; arrange access before going.", status: "supported", links: [["Synagogue project", "https://fodz.pl/?d=5&id=93&l=pl"], ["Community history", "https://www.jprzysucha.com/"]] },
  { city: "Warsaw", country: "Poland", type: "Document trail", title: "Walk the city that opened in 1862", text: "The family reportedly lived around Nalewki, Nowolipki, and Smocza after Jewish residence restrictions eased. POLIN explains the larger thousand-year story; the Jewish Historical Institute offers genealogy help and collections.", status: "context", links: [["POLIN Museum", "https://www.polin.pl/en"], ["Jewish Historical Institute", "https://www.jhi.pl/en"]] },
  { city: "London", country: "United Kingdom", type: "Direct family connection", title: "Shopfront, synagogue, and cemetery", text: "Look for the setting of 60 West India Dock Road, visit the historic Jewish East End around Whitechapel, and arrange a respectful visit to Edmonton Federation Cemetery. Sandys Row is a living East End synagogue, not a proven family congregation.", status: "supported", links: [["Sandys Row visits", "https://sandysrowsynagogue.org/visits/"], ["Federation cemeteries", "https://www.federation.org.uk/cemeteries/"]] },
  { city: "Boston & Cambridge", country: "United States", type: "Research stop", title: "Find the Johnson chapter", text: "The draft places Joseph’s ice-cream business in Cambridge and Jacob and Morris in the Boston area. Exact addresses and archival call numbers should be found before treating a modern storefront as an ancestral site.", status: "reconstructed", links: [["Boston City Archives", "https://www.boston.gov/departments/archives-and-records-management"]] },
  { city: "Sydney", country: "Australia", type: "Verified Jewish connection", title: "See the community Samuel served", text: "The Australian Jewish Historical Society preserves Samuel’s marriage and burial indexes. The Great Synagogue offers tours and context for the city’s Jewish life; Central Synagogue is the congregation named in Samuel’s 1939 marriage record and later service.", status: "verified", links: [["AJHS collections", "https://collections.ajhs.com.au/"], ["Great Synagogue", "https://www.greatsynagogue.org.au/"]] },
  { city: "Thiepval & São Paulo", country: "France · Brazil", type: "Leads to verify", title: "Two distant branch endpoints", text: "The draft links Charles Symberlist to the Thiepval Memorial and Lazarus/Henry Sims to São Paulo. Both deserve a visit only after the exact military and civil identities are documented.", status: "open", links: [["CWGC record search", "https://www.cwgc.org/find-records/find-war-dead/"]] }
];

const evidenceRows = [
  ["Przysucha was a major Hasidic center", "context", "YIVO history and the Polish Jewish heritage foundation agree; leading Peshischa figures are buried there.", "None for the town history; do not infer family membership."],
  ["The family followed the Peshischa Hasidic court", "open", "No direct evidence in the supplied materials; the draft explicitly cautions against the claim.", "Congregational, tax, or Hasidic court records naming an ancestor."],
  ["Rachmil was a Torah teacher", "supported", "The draft cites his occupation and gravestone wording.", "Attach the original civil entry and a new epitaph photo/translation."],
  ["The move to Warsaw followed 1862 emancipation", "context", "YIVO verifies the reform and new residence rights; family births bracket the move to the early 1860s.", "Attach the cited Przysucha and Warsaw birth records."],
  ["Abram left one month after the 1881 Warsaw pogrom", "reconstructed", "The pogrom is independently documented; the exact 28 January 1882 family departure is only in the draft.", "Locate passenger, passport, or British arrival evidence."],
  ["Josel Cymbalista and Joseph E. Johnson were one person", "reconstructed", "The draft describes DNA clustering plus census and naturalization evidence, but the raw chain is not attached.", "Add match relationships, shared-cM data, census image, and naturalization oath."],
  ["Samuel Simblist’s Jewish and legal public life", "verified", "AJHS marriage/burial indexes and Rabbi Raymond Apple’s first-hand eulogy converge.", "Optional: attach court appointment and Botany Bay inquiry records."],
  ["Charles Symberlist is commemorated at Thiepval", "open", "The family draft states it; an exact CWGC match was not located under the supplied spelling.", "Search service files and spelling variants; identify regiment/service number."],
  ["Fanny, Phyllis, and Faye were named for Fajga", "reconstructed", "The repeated names and family narrative are suggestive, not direct proof of intent.", "Ask descendants; compare Hebrew naming records or baby announcements."]
];

const sources = [
  ["Przysucha Synagogue project", "Foundation for the Preservation of Jewish Heritage in Poland", "https://fodz.pl/?d=5&id=93&l=pl"],
  ["Hasidism: historical overview", "YIVO Encyclopedia of Jews in Eastern Europe", "https://encyclopedia.yivo.org/article.aspx/Hasidism/Historical_Overview"],
  ["Warsaw", "YIVO Encyclopedia of Jews in Eastern Europe", "https://encyclopedia.yivo.org/article.aspx/Warsaw"],
  ["Samuel Hyman Simblist records", "Australian Jewish Historical Society", "https://collections.ajhs.com.au/Detail/entities/216840"],
  ["Eulogy for Judge S. H. Simblist", "Rabbi Raymond Apple, OzTorah", "https://oztorah.com/2013/09/eulogy-for-judge-sh-simblist/"],
  ["East End synagogue history", "Sandys Row Synagogue", "https://sandysrowsynagogue.org/history/"],
  ["Cemetery visitor information", "Federation of Synagogues", "https://www.federation.org.uk/cemeteries/"],
  ["Planning a Warsaw visit", "POLIN Museum of the History of Polish Jews", "https://www.polin.pl/en"]
];

let selectedId = "joseph";
let treeView = "line";

const treeCanvas = document.getElementById("tree-canvas");
const personPanel = document.getElementById("person-panel");

function initials(name) {
  return name.replace(/\([^)]*\)/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("");
}

function statusBadge(status, extraClass = "") {
  return `<span class="status ${status} ${extraClass}">${STATUS[status].label}</span>`;
}

function personCard(person, compact = false) {
  const portrait = person.photo
    ? `<img src="${person.photo}" alt="Portrait preserved from the family-tree source for ${person.name}" loading="lazy">`
    : `<span class="portrait-placeholder" aria-label="No verified portrait available"><b>${initials(person.name)}</b><small>${person.status === "private" ? "private" : "no photo"}</small></span>`;
  return `<button class="person-card ${compact ? "compact" : ""} ${selectedId === person.id ? "selected" : ""}" data-person="${person.id}" aria-pressed="${selectedId === person.id}">
    <span class="portrait">${portrait}</span>
    <span class="card-copy"><strong>${person.name}</strong><small>${person.alt ? `${person.alt} · ` : ""}${person.years}</small>${statusBadge(person.status)}</span>
  </button>`;
}

function bindPersonCards() {
  treeCanvas.querySelectorAll("[data-person]").forEach(button => {
    button.addEventListener("click", () => selectPerson(button.dataset.person));
  });
}

function renderDirectLine() {
  treeCanvas.className = "tree-canvas direct-tree";
  treeCanvas.innerHTML = `<div class="tree-guide"><span>Earlier records</span><span>Present day</span></div>` + directLine.map((group, index) => {
    const cards = group.ids.map(id => personCard(peopleById[id])).join(`<span class="relation-label">${group.relation === "siblings" ? "siblings" : "partners"}</span>`);
    return `<div class="generation-row ${index ? "connected" : ""}">
      <span class="generation-tag">${group.label}</span>
      <div class="generation-people ${group.relation || "single"}">${cards}</div>
    </div>`;
  }).join("");
  bindPersonCards();
}

function renderBranches() {
  treeCanvas.className = "tree-canvas branch-tree";
  treeCanvas.innerHTML = `<div class="branch-ancestor">
      <span class="generation-tag">Shared ancestors</span>
      <div class="generation-people partners">${personCard(peopleById.rachmil)}<span class="relation-label">partners</span>${personCard(peopleById.fajga)}</div>
    </div>
    <div class="branch-fork" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="branch-columns">${branchColumns.map(branch => `<section class="branch-column">
      <header><p>${branch.route}</p><h3>${branch.name}</h3></header>
      <div class="branch-stack">${branch.ids.map(id => personCard(peopleById[id], true)).join("")}</div>
    </section>`).join("")}</div>`;
  bindPersonCards();
}

function renderTree() {
  if (treeView === "line") renderDirectLine();
  else renderBranches();
}

function renderPersonPanel(person) {
  const portrait = person.photo
    ? `<img class="detail-portrait" src="${person.photo}" alt="Portrait preserved from the family-tree source for ${person.name}">`
    : `<div class="detail-placeholder"><b>${initials(person.name)}</b><span>${person.status === "private" ? "Living-family details protected" : "No verified portrait in the supplied sources"}</span></div>`;
  personPanel.innerHTML = `${portrait}
    <div class="detail-heading">${statusBadge(person.status)}<span>Generation ${person.generation} · ${person.branch}</span></div>
    <h3>${person.name}</h3>
    <p class="detail-alt">${person.alt ? `${person.alt} · ` : ""}${person.years}</p>
    <p class="detail-note">${person.note}</p>
    <dl><div><dt>Places</dt><dd>${person.places}</dd></div><div><dt>Why this rating</dt><dd>${STATUS[person.status].description}</dd></div><div><dt>Current sources</dt><dd>${person.sources.join(" · ")}</dd></div></dl>`;
}

function selectPerson(id, scroll = false) {
  const person = peopleById[id];
  if (!person) return;
  selectedId = id;
  renderTree();
  renderPersonPanel(person);
  if (scroll) {
    requestAnimationFrame(() => treeCanvas.querySelector(`[data-person="${id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" }));
  }
}

function setTreeView(view) {
  treeView = view;
  document.querySelectorAll("[data-tree-view]").forEach(button => {
    const active = button.dataset.treeView === view;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active);
  });
  renderTree();
}

document.querySelectorAll("[data-tree-view]").forEach(button => button.addEventListener("click", () => setTreeView(button.dataset.treeView)));

const searchInput = document.getElementById("person-search");
const searchResults = document.getElementById("search-results");
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) { searchResults.hidden = true; return; }
  const matches = people.filter(person => `${person.name} ${person.alt || ""} ${person.places} ${person.branch}`.toLowerCase().includes(query)).slice(0, 8);
  searchResults.innerHTML = matches.length
    ? matches.map(person => `<button data-result="${person.id}"><strong>${person.name}</strong><small>${person.years} · ${STATUS[person.status].label}</small></button>`).join("")
    : `<em>No matching person in this public edition.</em>`;
  searchResults.hidden = false;
  searchResults.querySelectorAll("[data-result]").forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.result;
    const inDirect = directLine.some(group => group.ids.includes(id));
    setTreeView(inDirect ? "line" : "branches");
    selectPerson(id, true);
    searchInput.value = peopleById[id].name;
    searchResults.hidden = true;
  }));
});
document.addEventListener("click", event => {
  if (!event.target.closest(".search-field")) searchResults.hidden = true;
});

document.getElementById("feature-grid").innerHTML = features.map(feature => `<article class="feature-card">
  <span class="feature-number">${feature.number}</span>
  <h3>${feature.title}</h3>
  <p>${feature.text}</p>
  <div>${statusBadge(feature.status)}<small>${feature.foot}</small></div>
</article>`).join("");

document.getElementById("place-grid").innerHTML = places.map(place => `<article class="place-card">
  <div class="place-top"><span>${place.type}</span>${statusBadge(place.status)}</div>
  <p class="place-location">${place.city} <small>${place.country}</small></p>
  <h3>${place.title}</h3>
  <p>${place.text}</p>
  <div class="place-links">${place.links.map(([label, href]) => `<a href="${href}" target="_blank" rel="noreferrer">${label}<span aria-hidden="true">↗</span></a>`).join("")}</div>
</article>`).join("");

document.getElementById("evidence-body").innerHTML = evidenceRows.map(([claim, status, basis, next]) => `<tr>
  <th scope="row">${claim}</th><td>${statusBadge(status)}</td><td>${basis}</td><td>${next}</td>
</tr>`).join("");

document.getElementById("source-list").innerHTML = sources.map(([title, org, href], index) => `<a href="${href}" target="_blank" rel="noreferrer"><span>${String(index + 1).padStart(2, "0")}</span><span><strong>${title}</strong><small>${org}</small></span><b aria-hidden="true">↗</b></a>`).join("");

renderTree();
renderPersonPanel(peopleById[selectedId]);
