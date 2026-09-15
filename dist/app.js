import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const SUPABASE_URL = "https://lmqccqufyhtbdxafzsjj.supabase.co";
const SUPABASE_KEY = "sb_publishable_K0tN-7m59l6vl_nLVMb7FQ_jiLAo9bI";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { detectSessionInUrl: true, persistSession: true, autoRefreshToken: true } });

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const esc = (value = "") => String(value).replace(/[&<>'"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c]));
const titleCase = value => String(value || "").replaceAll("-", " ").replace(/\b\w/g, c => c.toUpperCase());
const portraitUrl = person => person?.portrait_base64 ? `data:${person.portrait_mime || "image/webp"};base64,${person.portrait_base64}` : "";
const evidenceName = value => ({ "verified": "Verified", "source-backed": "Source-backed", "reconstruction": "Family reconstruction", "open-question": "Open question", "historical-context": "Historical context" }[value] || titleCase(value));
const badge = value => `<span class="evidence" data-evidence="${esc(value)}">${esc(evidenceName(value))}</span>`;
const state = { session: null, member: null, people: [], relationships: [], stories: [], perspectives: [], sources: [], research: [], archive: [], archiveLoaded: false, pov: null };

function showToast(message) { const node = $("#toast"); node.textContent = message; node.classList.add("show"); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => node.classList.remove("show"), 4200); }
function setStatus(id, message, error = false) { const node = $(id); if (!node) return; node.textContent = message; node.style.color = error ? "var(--rust)" : "var(--green)"; }
function initials(name = "?") { return name.split(/\s+/).filter(Boolean).slice(0, 2).map(x => x[0]).join("").toUpperCase(); }
function personImage(person, className = "") { const url = portraitUrl(person); return url ? `<img class="${className}" src="${url}" alt="Portrait of ${esc(person.display_name)}">` : `<span class="portrait-initial ${className}" aria-hidden="true">${esc(initials(person?.display_name))}</span>`; }
function currentPov() { return state.perspectives.find(p => p.perspective_key === state.pov) || state.perspectives[0]; }
function personByKey(key) { return state.people.find(p => p.person_key === key); }

function openAccess(panel = "signin") { const dialog = $("#access-dialog"); switchPanel(panel); if (!dialog.open) dialog.showModal(); }
function switchPanel(panel) { $("#signin-panel").hidden = panel !== "signin"; $("#request-panel").hidden = panel !== "request"; }
$$('[data-open]').forEach(button => button.addEventListener("click", () => openAccess(button.dataset.open)));
$("#open-signin").addEventListener("click", () => openAccess("signin"));
$$('[data-switch]').forEach(button => button.addEventListener("click", () => switchPanel(button.dataset.switch)));
$$('.dialog-close').forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
$$('dialog').forEach(dialog => dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); }));

$("#signin-form").addEventListener("submit", async event => {
  event.preventDefault(); const form = event.currentTarget; const email = new FormData(form).get("email").trim().toLowerCase();
  setStatus("#signin-status", "Sending your secure link…");
  const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${location.origin}/`, shouldCreateUser: true } });
  if (error) return setStatus("#signin-status", error.message, true);
  setStatus("#signin-status", "Check your email. The link works once and returns you here."); form.reset();
});

$("#request-form").addEventListener("submit", async event => {
  event.preventDefault(); const form = event.currentTarget; const data = new FormData(form);
  setStatus("#request-status", "Sending your request…");
  const payload = { name: data.get("name").trim(), email: data.get("email").trim().toLowerCase(), reason: data.get("reason").trim(), status: "pending" };
  const { error } = await supabase.from("access_requests").insert(payload);
  if (error) return setStatus("#request-status", error.message, true);
  setStatus("#request-status", "Request received. A family administrator will review it."); form.reset();
});

$("#signout").addEventListener("click", async () => { await supabase.auth.signOut(); location.assign("/"); });

async function initializeSession(session) {
  state.session = session;
  if (!session) return showPublic();
  const email = session.user.email?.toLowerCase();
  const { data: member, error } = await supabase.from("family_members").select("*").eq("email", email).maybeSingle();
  if (error || !member || member.status !== "approved") {
    await supabase.auth.signOut(); showPublic(); openAccess("request"); setStatus("#request-status", "That email is not yet approved. Please request family access.", true); return;
  }
  state.member = member; await loadRecord(); showPrivate();
}

function showPublic() { $("#public-home").hidden = false; $("#private-app").hidden = true; $("#open-signin").hidden = false; $("#signout").hidden = true; $("#session-label").hidden = true; }
function showPrivate() { $("#public-home").hidden = true; $("#private-app").hidden = false; $("#open-signin").hidden = true; $("#signout").hidden = false; $("#session-label").hidden = false; $("#session-label").textContent = state.member.display_name; $("#access-dialog").open && $("#access-dialog").close(); }

async function loadRecord() {
  const requests = [
    supabase.from("family_people").select("*").order("sort_order"),
    supabase.from("family_relationships").select("*"),
    supabase.from("family_stories").select("*").order("sort_order"),
    supabase.from("family_perspectives").select("*").order("sort_order"),
    supabase.from("source_files").select("source_key,title,filename,mime_type,byte_size,sha256,chunk_count,description,source_date").order("created_at"),
    supabase.from("research_sources").select("*").order("sort_order")
  ];
  const [people, relationships, stories, perspectives, sources, research] = await Promise.all(requests);
  const failed = [people, relationships, stories, perspectives, sources, research].find(result => result.error);
  if (failed) throw failed.error;
  Object.assign(state, { people: people.data, relationships: relationships.data, stories: stories.data, perspectives: perspectives.data, sources: sources.data, research: research.data });
  const saved = localStorage.getItem("family-record-pov");
  const defaultPov = state.perspectives.find(p => p.person_key === state.member.tree_person_key)?.perspective_key || "robin";
  state.pov = state.perspectives.some(p => p.perspective_key === saved) ? saved : defaultPov;
  populateControls(); renderPerspective(); renderSources(); renderResearch(); bindContributions();
  if (state.member.role === "admin") { $("#admin").hidden = false; $("#admin-link").hidden = false; await loadAccessRequests(); }
}

function populateControls() {
  $("#perspective-select").innerHTML = state.perspectives.map(p => `<option value="${esc(p.perspective_key)}">${esc(p.display_name)}</option>`).join("");
  $("#perspective-select").value = state.pov;
  $("#perspective-select").addEventListener("change", event => { state.pov = event.target.value; localStorage.setItem("family-record-pov", state.pov); renderPerspective(); window.scrollTo({ top: 0, behavior: "smooth" }); });
  $("#proposal-person").insertAdjacentHTML("beforeend", state.people.map(p => `<option value="${esc(p.person_key)}">${esc(p.display_name)}</option>`).join(""));
}

function renderPerspective() {
  const pov = currentPov(); const config = pov.config || {}; const focus = personByKey(pov.person_key);
  $("#pov-kicker").textContent = `The family record from ${pov.display_name}’s point of view`;
  $("#pov-title").textContent = config.opening_title || `The family from ${pov.display_name}’s point of view`;
  $("#pov-lede").textContent = config.lede || "The same evidence, approached through a different relationship to the family.";
  $("#focus-portrait").innerHTML = focus ? personImage(focus) : `<div class="portrait-initial">${esc(initials(pov.display_name))}</div>`;
  $("#people-heading").textContent = `${pov.display_name}’s family, branch by branch`;
  $("#places-intro").textContent = config.places_intro || "Places are research destinations, not claims of belonging by themselves.";
  $("#faith-title").textContent = config.faith_title || "Religious life, family practice, and the questions still open";
  renderConnection(pov); renderStories(pov); renderBranches(pov); renderJourney(pov); renderFaith(pov);
}

function buildGraph() {
  const graph = new Map(); const add = (a, b, type) => { if (!graph.has(a)) graph.set(a, []); graph.get(a).push({ key: b, type }); };
  state.relationships.forEach(r => { add(r.from_person_key, r.to_person_key, r.relationship_type); add(r.to_person_key, r.from_person_key, r.relationship_type); }); return graph;
}
function pathBetween(start, end) {
  if (!start || !end) return []; const graph = buildGraph(); const queue = [[start, []]]; const seen = new Set([start]);
  while (queue.length) { const [key, path] = queue.shift(); if (key === end) return path.concat({ key }); for (const next of graph.get(key) || []) if (!seen.has(next.key)) { seen.add(next.key); queue.push([next.key, path.concat({ key, via: next.type })]); } } return [];
}
function renderConnection(pov) {
  const target = pov.person_key; if (!target) { $("#connection").innerHTML = `<p><strong>This is a branch view.</strong> It begins with the wider surname family and follows documented links toward the present.</p>`; return; }
  const anchor = state.member.tree_person_key; const path = pathBetween(anchor, target);
  if (!path.length || anchor === target) { $("#connection").innerHTML = `<p><strong>This telling begins with ${esc(pov.display_name)}.</strong> Every branch title and story order below is phrased from that position.</p>`; return; }
  $("#connection").innerHTML = `<div class="connection-path"><strong>Your route to this viewpoint:</strong> ${path.map((step, i) => `${i ? `<i>— ${esc(titleCase(path[i-1].via || "family"))} →</i>` : ""}<span>${esc(personByKey(step.key)?.display_name || step.key)}</span>`).join(" ")}</div>`;
}

function storyFrame(story, pov) {
  const name = pov.display_name; const key = story.story_key;
  if (key === "april-branch") return pov.perspective_key === "april" ? "This is the family line April brings forward." : pov.perspective_key === "nolan" || pov.perspective_key === "norah" ? `This is ${name}’s maternal inheritance, not a side note.` : `From ${name}’s position, this branch enters through April and remains distinct in the evidence.`;
  if (key === "rediscovery") return `For ${name}, this chapter explains how the Johnson and Cymbalista identities are connected—and why that link remains labeled as a reconstruction.`;
  if (key === "migration") return `From ${name}’s place in the family, migration is the route by which names, livelihoods, and memories changed.`;
  if (key === "music") return `This is one of the family’s most distinctive inheritances: a name and oral record associated with musicianship, with limits on what the surviving evidence can prove.`;
  if (key === "teacher") return `This chapter follows remembered Jewish learning and the reputation of Rachmil, while keeping family testimony distinct from an independently inspected record.`;
  return "";
}
function renderStories(pov) {
  const order = pov.config?.story_order || []; const featured = order.map(key => state.stories.find(s => s.story_key === key)).filter(Boolean);
  $("#featured-stories").innerHTML = featured.map((story, index) => `<article class="story-card"><div class="story-number">${String(index + 1).padStart(2, "0")}</div><div><p class="eyebrow">${esc(storyFrame(story, pov))}</p><h3>${esc(story.title)}</h3>${badge(story.evidence_label)}<div class="story-body"><p>${esc(story.body)}</p></div><p class="source-note">Present basis: ${esc(story.source_note || "Family record")}</p></div></article>`).join("");
  const chapters = state.stories.filter(s => s.metadata?.full_chapter);
  $("#full-narrative").innerHTML = chapters.map((story, i) => `<article class="chapter"><p class="eyebrow">Chapter ${i + 1} · ${esc(pov.display_name)}’s reading</p><h3>${esc(story.title)}</h3>${badge(story.evidence_label)}<div class="story-body"><p>${esc(story.body)}</p></div><p class="source-note">${esc(story.source_note || "")}</p></article>`).join("");
}

function renderBranches(pov) {
  const config = pov.config || {}; const all = [...new Set(state.people.map(p => p.branch))]; const ordered = [...(config.branch_order || []), ...all.filter(x => !(config.branch_order || []).includes(x))];
  $("#branch-sections").innerHTML = ordered.map(branch => { const people = state.people.filter(p => p.branch === branch); if (!people.length) return ""; const title = config.branch_titles?.[branch] || `${pov.display_name} and the ${titleCase(branch)} branch`; return `<section class="branch-group"><header class="branch-head"><h3>${esc(title)}</h3><span>${people.length} ${people.length === 1 ? "person" : "people"}</span></header><div class="people-grid">${people.map(personCard).join("")}</div></section>`; }).join("");
  $$(".person-card").forEach(button => button.addEventListener("click", () => openPerson(button.dataset.person)));
}
function personCard(person) { const life = [person.birth_text && `Born ${person.birth_text}`, person.death_text && `Died ${person.death_text}`].filter(Boolean).join(" · "); return `<button class="person-card" data-person="${esc(person.person_key)}">${portraitUrl(person) ? personImage(person, "person-thumb") : `<span class="person-thumb">${esc(initials(person.display_name))}</span>`}<span><strong>${esc(person.display_name)}</strong><small>${esc(life || (person.living ? "Living family member" : "Dates not recorded"))}</small>${badge(person.evidence_label)}</span></button>`; }
function relationSentence(r, person) { const otherKey = r.from_person_key === person.person_key ? r.to_person_key : r.from_person_key; const other = personByKey(otherKey); return `${titleCase(r.relationship_type)}: ${other?.display_name || otherKey}${r.start_text ? ` (${r.start_text})` : ""}`; }
function openPerson(key) {
  const person = personByKey(key); if (!person) return; const relationships = state.relationships.filter(r => r.from_person_key === key || r.to_person_key === key); const metadata = person.metadata || {};
  const metaItems = Object.entries(metadata).filter(([, value]) => value !== null && value !== "" && (!Array.isArray(value) || value.length)).map(([label, value]) => `<li><strong>${esc(titleCase(label))}:</strong> ${esc(Array.isArray(value) ? value.join(", ") : typeof value === "object" ? JSON.stringify(value) : value)}</li>`).join("");
  $("#person-detail").innerHTML = `<div class="person-profile"><div>${personImage(person)}</div><div><p class="eyebrow">${esc(titleCase(person.branch))} branch</p><h2>${esc(person.display_name)}</h2>${badge(person.evidence_label)}<ul class="facts">${person.birth_text ? `<li><strong>Born:</strong> ${esc(person.birth_text)}</li>` : ""}${person.death_text ? `<li><strong>Died:</strong> ${esc(person.death_text)}</li>` : ""}${person.summary ? `<li>${esc(person.summary)}</li>` : ""}${relationships.map(r => `<li>${esc(relationSentence(r, person))} ${badge(r.evidence_label)}</li>`).join("")}${metaItems}</ul></div></div>`;
  $("#person-dialog").showModal();
}

function renderJourney(pov) {
  const includesPhilippines = ["nolan", "norah", "april", "israel", "robin", "richard", "adi"].includes(pov.perspective_key);
  const european = [{ place: "Przysucha", note: "The earliest named Cymbalista setting; visit as a research place, not as proof of every claimed link." }, { place: "Warsaw", note: "The family narrative places Rachmil, Fajga, and their children here before London." }, { place: "London’s East End", note: "Addresses, work, poor-law records, cemeteries, and changing surnames converge here." }, { place: "Massachusetts", note: "The Johnson identity, Joseph’s business life, and later generations take shape here." }];
  const filipino = [{ place: "Pangasinan", note: "The strongest Philippine lead. Exact municipalities, parishes, homes, and cemeteries remain open research questions." }];
  let stops = pov.perspective_key === "april" || pov.perspective_key === "israel" ? [...filipino, ...european] : [...european, ...(includesPhilippines ? filipino : [])];
  $("#journey").innerHTML = stops.map((stop, i) => `<article class="place-stop"><span>${String(i + 1).padStart(2, "0")}</span><h3>${esc(stop.place)}</h3><p>${esc(stop.note)}</p></article>`).join("");
}
function renderFaith(pov) {
  const isAprilFirst = ["april", "israel"].includes(pov.perspective_key); const name = pov.display_name;
  const jewish = `The Cymbalista record is unmistakably Jewish in setting: Torah teaching is attributed to Rachmil; Whitechapel’s Jewish immigrant world shaped the London chapter; and burial at Edmonton Federation Cemetery anchors the family in a documented communal landscape. The material does not yet justify assigning every person a precise level of observance or a specific Hasidic affiliation.`;
  const filipino = `The supplied Filipino chart names families and generations, but it does not yet document the household’s faith practice, feast days, parish life, language, recipes, or rites of passage. For ${name}, those absences are invitations for attributed memories and records—not permission to guess.`;
  $("#faith-copy").innerHTML = `<p>${esc(isAprilFirst ? filipino : jewish)}</p><p>${esc(isAprilFirst ? jewish : filipino)}</p><p><strong>Tradition worth preserving:</strong> the repeating passage of names—Feiga Pesi into Fanny, Phyllis, and Faye—is a concrete example of family memory surviving migration in altered form.</p>`;
}

function renderSources() {
  $("#source-files").innerHTML = state.sources.map(source => `<article class="source-card"><p class="eyebrow">Original ${esc(source.mime_type.includes("pdf") ? "PDF" : "document")}</p><h3>${esc(source.title)}</h3><p>${esc(source.description || "")}</p><p>${Number(source.byte_size || 0).toLocaleString()} bytes · SHA-256 preserved</p><button class="button button-secondary" data-download="${esc(source.source_key)}">Download original</button></article>`).join("");
  $$('[data-download]').forEach(button => button.addEventListener("click", () => downloadSource(button.dataset.download, button)));
  $("#load-archive").addEventListener("click", loadArchive);
  $("#archive-search").addEventListener("input", renderArchive);
}
async function downloadSource(key, button) {
  const source = state.sources.find(s => s.source_key === key); button.disabled = true; button.textContent = "Rebuilding file…";
  const { data, error } = await supabase.from("source_file_chunks").select("chunk_number,chunk_base64").eq("source_key", key).order("chunk_number");
  if (error || !data?.length) { button.disabled = false; button.textContent = "Download original"; return showToast(error?.message || "Source file is unavailable."); }
  const binary = atob(data.map(c => c.chunk_base64).join("")); const bytes = Uint8Array.from(binary, c => c.charCodeAt(0)); const url = URL.createObjectURL(new Blob([bytes], { type: source.mime_type })); const link = document.createElement("a"); link.href = url; link.download = source.filename; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); button.disabled = false; button.textContent = "Download original";
}
async function loadArchive() {
  const button = $("#load-archive"); button.disabled = true; button.textContent = "Loading private images…";
  const { data, error } = await supabase.from("archive_images").select("*").order("sort_order");
  if (error) { button.disabled = false; button.textContent = "Try again"; return showToast(error.message); }
  state.archive = data || []; state.archiveLoaded = true; button.textContent = `${state.archive.length} archive images loaded`; renderArchive();
}
function renderArchive() { if (!state.archiveLoaded) return; const term = $("#archive-search").value.trim().toLowerCase(); const filtered = state.archive.filter(item => !term || `${item.title} ${item.transcript || ""}`.toLowerCase().includes(term)); $("#archive-grid").innerHTML = filtered.slice(0, 180).map(item => `<figure class="archive-item"><img loading="lazy" src="data:${esc(item.image_mime)};base64,${item.image_base64}" alt="${esc(item.title)}"><figcaption><strong>${esc(item.title)}</strong>${item.transcript ? `<br>${esc(item.transcript.slice(0, 180))}` : ""}</figcaption></figure>`).join("") || `<p>No matching archive images.</p>`; }
function renderResearch() { $("#research-list").innerHTML = state.research.map(source => `<article class="research-item"><div>${badge(source.verification_status)}</div><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)}</a><p>${esc(source.citation || source.notes || "")}</p></article>`).join(""); }

let proposalBound = false;
function bindContributions() { if (proposalBound) return; proposalBound = true; $("#proposal-form").addEventListener("submit", async event => { event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); setStatus("#proposal-status", "Submitting…"); const payload = { submitted_by: state.session.user.id, person_key: data.get("person_key") || null, proposal_type: data.get("proposal_type"), proposed_change: data.get("proposed_change").trim(), source_description: data.get("source_description").trim() || null, status: "pending" }; const { error } = await supabase.from("change_proposals").insert(payload); if (error) return setStatus("#proposal-status", error.message, true); form.reset(); setStatus("#proposal-status", "Submitted with your identity and source note for family review."); }); }

async function loadAccessRequests() {
  const { data, error } = await supabase.from("access_requests").select("*").eq("status", "pending").order("requested_at", { ascending: false });
  if (error) return $("#request-list").textContent = error.message;
  $("#request-list").innerHTML = data.length ? data.map(request => `<article class="request-card"><div><h3>${esc(request.name)}</h3><p><a href="mailto:${esc(request.email)}">${esc(request.email)}</a></p><p>${esc(request.reason)}</p><small>${new Date(request.requested_at).toLocaleString()}</small></div><div class="request-actions"><button class="button button-primary" data-approve="${esc(request.id)}">Approve & send link</button><button class="button button-secondary" data-decline="${esc(request.id)}">Decline</button></div></article>`).join("") : `<p>No pending requests.</p>`;
  $$('[data-approve]').forEach(button => button.addEventListener("click", () => reviewRequest(button.dataset.approve, true, button, data)));
  $$('[data-decline]').forEach(button => button.addEventListener("click", () => reviewRequest(button.dataset.decline, false, button, data)));
}
async function reviewRequest(id, approve, button, requests) {
  const request = requests.find(item => item.id === id); if (!request) return; button.disabled = true;
  if (approve) {
    const email = request.email.trim().toLowerCase(); const { data: existing, error: lookupError } = await supabase.from("family_members").select("id").eq("email", email).maybeSingle();
    if (lookupError) return showToast(lookupError.message);
    const memberPayload = { email, display_name: request.name, role: "member", status: "approved", approved_at: new Date().toISOString(), approved_by: state.session.user.id };
    const write = existing ? await supabase.from("family_members").update(memberPayload).eq("id", existing.id) : await supabase.from("family_members").insert(memberPayload);
    if (write.error) { button.disabled = false; return showToast(write.error.message); }
    const { error: mailError } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${location.origin}/`, shouldCreateUser: true } });
    if (mailError) { button.disabled = false; return showToast(`Approved, but the email could not be sent: ${mailError.message}`); }
  }
  const { error } = await supabase.from("access_requests").update({ status: approve ? "approved" : "declined", reviewed_at: new Date().toISOString(), reviewed_by: state.session.user.id }).eq("id", id);
  if (error) { button.disabled = false; return showToast(error.message); }
  showToast(approve ? "Approved. A one-time link was sent." : "Request declined."); await loadAccessRequests();
}

supabase.auth.onAuthStateChange((event, session) => { if (event === "SIGNED_OUT") showPublic(); });
try { const { data: { session } } = await supabase.auth.getSession(); await initializeSession(session); } catch (error) { console.error(error); showPublic(); showToast("The private record could not be loaded. Please try signing in again."); }
