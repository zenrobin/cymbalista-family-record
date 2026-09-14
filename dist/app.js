(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const perspectives = {
    richard: {
      name: "Richard Johnson",
      openingLabel: "Richard’s view",
      title: "The Cymbalista line<br>that became Johnson.",
      standfirst: "For Richard, this story begins with the parents and grandparents behind the Johnson name, then follows what their history means for the generations after him.",
      context: "April’s branch remains part of the shared record because it is the maternal inheritance of Richard’s grandchildren. It appears later in this view, not with less evidentiary weight.",
      treeTitle: "Richard’s ancestors first, then the family after him",
      treeIntro: "The Cymbalista–Johnson branch leads this reading. Descendant and in-law branches follow. Lines indicate relationship, while each label states the strength of the evidence.",
      storyIntro: "From Richard’s position, the central arc is a Jewish family connection obscured by migration and later reconstructed.",
      readerLabel: "From Richard’s point of view",
      readerNote: "The closest historical route runs backward through the Johnson, Simblist, and Cymbalista names toward London, Warsaw, and Przysucha. April’s line matters here through Nolan and Norah.",
      treeOrder: ["johnson", "wider", "current", "april"],
      storyOrder: ["rediscovery", "migration", "teaching", "music", "april"],
      currentTitle: "Richard’s descendants in the present record",
      currentIntro: "Robin’s marriages and children show how Richard’s branch continues.",
      aprilStoryTitle: "A second ancestry enters Richard’s descendants"
    },
    robin: {
      name: "Robin Johnson",
      openingLabel: "Robin’s view",
      title: "The histories Robin inherited—<br>and passes on.",
      standfirst: "Robin stands between the Cymbalista–Johnson past and the living family recorded here. His view begins with his ancestry, then follows the relationships through which two family histories reach Nolan and Norah.",
      context: "April is Robin’s former wife and Nolan and Norah’s mother. Adi is Robin’s current wife as of 22 August 2026; Robin and Adi have no children together.",
      treeTitle: "Robin’s ancestry, immediate family, and connected branches",
      treeIntro: "The order follows Robin’s closest relationships. Every claim keeps the same evidence label regardless of where it appears.",
      storyIntro: "For Robin, the record connects rediscovered ancestry with the responsibility to preserve both sides of his children’s history.",
      readerLabel: "From Robin’s point of view",
      readerNote: "The Johnson and Cymbalista route is Robin’s ancestry. The Israel–Parajas–Apostol route enters his family through April and belongs fully to Nolan and Norah.",
      treeOrder: ["johnson", "current", "april", "wider"],
      storyOrder: ["rediscovery", "migration", "music", "teaching", "april"],
      currentTitle: "Robin’s immediate family",
      currentIntro: "Former and current marriages are recorded without collapsing distinct relationships.",
      aprilStoryTitle: "A second migration history enters Robin’s family"
    },
    nolan: {
      name: "Nolan or Norah",
      openingLabel: "A child’s view of both parental lines",
      title: "Two family lines,<br>kept in one record.",
      standfirst: "This is the ancestry Nolan and Norah inherit through both parents: Robin’s Cymbalista–Johnson line and April’s Israel–Parajas–Apostol line.",
      context: "Neither parental line is treated as an appendix. Records remain distinct from reconstruction, and uncertainty is shown because an honest question is more useful than a confident mistake.",
      treeTitle: "Two parental lines meet in one immediate family",
      treeIntro: "The present family comes first, followed by each parental branch. Lines indicate descent, not certainty; open each card for the current evidence.",
      storyIntro: "From Nolan or Norah’s position, the distinctive story is the meeting of Jewish European and Filipino family histories.",
      readerLabel: "From Nolan or Norah’s point of view",
      readerNote: "The roots in Poland, England, the United States, Australia, and the Philippines all belong in this view. Family history can explain inheritance without prescribing belief.",
      treeOrder: ["current", "johnson", "april", "wider"],
      storyOrder: ["music", "teaching", "migration", "rediscovery", "april"],
      currentTitle: "Nolan and Norah’s immediate family",
      currentIntro: "The two parental lines meet here.",
      aprilStoryTitle: "The children inherit a second migration history"
    },
    april: {
      name: "April",
      openingLabel: "April’s view",
      title: "The Israel, Parajas,<br>and Apostol inheritance.",
      standfirst: "April’s view begins with the Filipino family recorded in her supplied chart: the Israel, Parajas, Apostol, Cruz, Tiozon, and related lines.",
      context: "Her former marriage to Robin connects this ancestry to Nolan and Norah. The Cymbalista–Johnson line remains their paternal history and follows later in this reading.",
      treeTitle: "April’s ancestry first, then the family connections",
      treeIntro: "The Philippine branch leads this view. Supplied-chart claims, public-index matches, and open questions remain visibly distinct.",
      storyIntro: "For April, the unfinished work is as important as the known names: Pangasinan is a strong lead, while towns, parishes, customs, and oral histories still need documentation.",
      readerLabel: "From April’s point of view",
      readerNote: "Pangasinan is the clearest place to begin, but it is a province rather than a complete route. Birth, marriage, baptismal, burial, and family interview evidence can make this branch more specific.",
      treeOrder: ["april", "current", "johnson", "wider"],
      storyOrder: ["april", "migration", "rediscovery", "music", "teaching"],
      currentTitle: "April’s children and co-parenting family",
      currentIntro: "April and Robin are former spouses and the parents of Nolan and Norah.",
      aprilStoryTitle: "The Israel–Parajas–Apostol inheritance"
    },
    cymbalista: {
      name: "Cymbalista or Simblist relative",
      openingLabel: "The Cymbalista–Simblist family view",
      title: "A family name reshaped<br>across borders.",
      standfirst: "This view follows the Cymbalista name and its related spellings through Poland, London, the United States, Australia, and Brazil.",
      context: "Surname similarity alone is not proof. The branch register separates documented public lives from identity chains and relationships that still need direct records.",
      treeTitle: "The wider surname branches, then the Johnson line",
      treeIntro: "The broad Cymbalista–Simblist network comes first, followed by the branch reaching Robin and the living family.",
      storyIntro: "From a wider relative’s position, migration, spelling change, religious community, and the recovery of separated branches are the recurring themes.",
      readerLabel: "From a Cymbalista or Simblist relative’s point of view",
      readerNote: "Przysucha, Warsaw, London, Boston, Sydney, and São Paulo form the main research geography. A remote cousin may be able to strengthen a weak link without sharing living-family details publicly.",
      treeOrder: ["wider", "johnson", "current", "april"],
      storyOrder: ["migration", "music", "teaching", "rediscovery", "april"],
      currentTitle: "How this branch reaches the living family",
      currentIntro: "Robin, Nolan, and Norah connect the older surname history to the present record.",
      aprilStoryTitle: "A Filipino line joins the recorded family"
    },
    israel: {
      name: "Israel or Apostol relative",
      openingLabel: "The Israel–Apostol family view",
      title: "A Filipino family line,<br>ready for deeper research.",
      standfirst: "This view begins with Benjamin Parajas Israel, Asuncion Israel, and the Israel, Parajas, Apostol, Cruz, Tiozon, and connected surnames preserved in April’s chart.",
      context: "The record has promising public-index matches and a strong Pangasinan lead, but many town-level relationships, dates, faith practices, and traditions still require records or attributed interviews.",
      treeTitle: "The Philippine branch first, with its open questions intact",
      treeIntro: "April’s ancestry leads this reading. The living-family connection and the children’s paternal branch follow without changing their evidence status.",
      storyIntro: "For an Israel or Apostol relative, the most valuable next chapter may come from local records, photographs, and memories not yet represented here.",
      readerLabel: "From an Israel or Apostol relative’s point of view",
      readerNote: "Pangasinan is the leading destination and research area. The next useful contribution is a specific municipality, parish, cemetery, document, or attributed family memory.",
      treeOrder: ["april", "current", "johnson", "wider"],
      storyOrder: ["april", "migration", "rediscovery", "teaching", "music"],
      currentTitle: "How this branch reaches Nolan and Norah",
      currentIntro: "April and Robin are former spouses and the parents of Nolan and Norah.",
      aprilStoryTitle: "The Israel–Parajas–Apostol inheritance"
    }
  };

  const gate = document.getElementById("perspective-gate");
  const changeButton = document.getElementById("change-perspective");
  const tree = document.getElementById("tree");
  const stories = document.querySelector("#story .stories");
  const storyHeading = document.querySelector("#story .section-head > p:last-child");
  const currentHeading = document.querySelector("#current-branch h3");
  const currentIntro = document.querySelector("#current-branch header p");
  const aprilStoryHeading = document.querySelector('[data-story="april"] h3');

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function safeStorageGet() {
    try { return window.localStorage.getItem("family-record-perspective"); }
    catch (_) { return null; }
  }

  function safeStorageSet(value) {
    try { window.localStorage.setItem("family-record-perspective", value); }
    catch (_) { /* The view still works when storage is unavailable. */ }
  }

  function reorder(container, order, attribute) {
    if (!container) return;
    order.forEach((key) => {
      const node = container.querySelector('[' + attribute + '="' + key + '"]');
      if (node) container.appendChild(node);
    });
  }

  function renumber(selector) {
    document.querySelectorAll(selector).forEach((node, index) => {
      node.textContent = String(index + 1).padStart(2, "0");
    });
  }

  function openGate() {
    if (!gate) return;
    if (typeof gate.showModal === "function") {
      if (!gate.open) gate.showModal();
    } else {
      gate.setAttribute("open", "");
    }
  }

  function closeGate() {
    if (!gate) return;
    if (typeof gate.close === "function" && gate.open) gate.close();
    else gate.removeAttribute("open");
  }

  function applyPerspective(key, options = {}) {
    const view = perspectives[key];
    if (!view) return;

    document.documentElement.dataset.perspective = key;
    setText("perspective-name", view.name);
    setText("opening-label", view.openingLabel);

    const title = document.getElementById("opening-title");
    if (title) title.innerHTML = view.title;

    setText("opening-standfirst", view.standfirst);
    setText("opening-context", view.context);
    setText("tree-title", view.treeTitle);
    setText("tree-intro", view.treeIntro);
    setText("reader-label", view.readerLabel);
    setText("reader-note", view.readerNote);

    if (storyHeading) storyHeading.textContent = view.storyIntro;
    if (currentHeading) currentHeading.textContent = view.currentTitle;
    if (currentIntro) currentIntro.textContent = view.currentIntro;
    if (aprilStoryHeading) aprilStoryHeading.textContent = view.aprilStoryTitle;

    reorder(tree, view.treeOrder, "data-branch");
    reorder(stories, view.storyOrder, "data-story");
    renumber("#tree > .tree-chapter .chapter-number");
    renumber("#story .stories > article > span");

    if (options.persist !== false) safeStorageSet(key);
    if (options.updateUrl !== false) {
      const url = new URL(window.location.href);
      url.searchParams.set("view", key);
      window.history.replaceState({ perspective: key }, "", url);
    }

    closeGate();
    window.dispatchEvent(new CustomEvent("familyPerspectiveChange", {
      detail: { key, name: view.name }
    }));
  }

  document.querySelectorAll("[data-perspective-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      applyPerspective(button.dataset.perspectiveChoice);
      document.getElementById("opening-title")?.focus({ preventScroll: true });
    });
  });

  if (changeButton) changeButton.addEventListener("click", openGate);
  if (gate) gate.addEventListener("cancel", (event) => event.preventDefault());

  const queryKey = new URLSearchParams(window.location.search).get("view");
  const savedKey = safeStorageGet();
  const initialKey = perspectives[queryKey] ? queryKey : (perspectives[savedKey] ? savedKey : null);

  if (initialKey) applyPerspective(initialKey, { updateUrl: Boolean(queryKey) });
  else openGate();
})();
