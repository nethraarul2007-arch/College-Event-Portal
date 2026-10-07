"use strict";

/* ---------- helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
    else node.setAttribute(key, value);
  });
  [].concat(children).forEach((child) => node.append(child));
  return node;
}

const formatFee = (fee) => (fee === 0 ? "Free" : `₹${fee}`);
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

/* ---------- shared: nav, branding ---------- */
function initShared() {
  $$("[data-fest-name]").forEach((n) => (n.textContent = SITE.festName));
  $$("[data-college]").forEach((n) => (n.textContent = SITE.college));
  $$("[data-email]").forEach((n) => { n.textContent = SITE.contactEmail; n.href = `mailto:${SITE.contactEmail}`; });
  $$("[data-phone]").forEach((n) => { n.textContent = SITE.contactPhone; n.href = `tel:${SITE.contactPhone.replace(/\s/g, "")}`; });
  $$("[data-year]").forEach((n) => (n.textContent = new Date().getFullYear()));

  const toggle = $(".nav-toggle");
  const nav = $("#site-nav");
  if (!toggle || !nav) return;
  const setOpen = (open) => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

/* ---------- shared renderers ---------- */
function eventCard(event) {
  return el("article", { class: "card" }, [
    el("span", { class: `tag tag--${event.category}`, text: event.category }),
    el("h3", { text: event.title }),
    el("p", { class: "meta", text: `${SITE.days[event.day - 1]} · ${event.time}` }),
    el("p", { class: "meta", text: `${event.venue} · ${formatFee(event.fee)}` }),
    el("p", { text: event.desc }),
    el("a", { class: "btn", href: `register.html?event=${event.id}`, "aria-label": `Register for ${event.title}`, text: "Register" }),
  ]);
}

function renderAnnouncements(list, limit) {
  list.replaceChildren(
    ...ANNOUNCEMENTS.slice(0, limit).map((a) =>
      el("li", {}, [el("time", { datetime: a.date, text: formatDate(a.date) }), a.text])
    )
  );
}

/* ---------- home ---------- */
function initHome() {
  const target = new Date(SITE.start).getTime();
  const box = $("#countdown");
  const parts = { days: $("[data-d]"), hours: $("[data-h]"), mins: $("[data-m]"), secs: $("[data-s]") };
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) { box.textContent = "The fest is on. Come join us!"; clearInterval(timer); return; }
    const pad = (n) => String(n).padStart(2, "0");
    parts.days.textContent = Math.floor(diff / 864e5);
    parts.hours.textContent = pad(Math.floor(diff / 36e5) % 24);
    parts.mins.textContent = pad(Math.floor(diff / 6e4) % 60);
    parts.secs.textContent = pad(Math.floor(diff / 1e3) % 60);
  }
  const timer = setInterval(tick, 1000);
  tick();

  $("#stat-events").textContent = EVENTS.length;
  renderAnnouncements($("#announcements"), 3);
  $("#featured").replaceChildren(...EVENTS.slice(0, 3).map(eventCard));
}

/* ---------- events ---------- */
function initEvents() {
  const grid = $("#event-grid");
  const status = $("#event-status");
  const search = $("#event-search");
  const chipBox = $("#category-chips");
  const categories = ["All", ...new Set(EVENTS.map((e) => e.category))];
  let activeCategory = "All";

  chipBox.replaceChildren(
    ...categories.map((c) =>
      el("button", {
        type: "button", class: "chip", "aria-pressed": String(c === "All"), text: c,
        onclick: () => { activeCategory = c; render(); },
      })
    )
  );

  function render() {
    const q = search.value.trim().toLowerCase();
    const shown = EVENTS.filter(
      (e) => (activeCategory === "All" || e.category === activeCategory) &&
        (`${e.title} ${e.desc} ${e.venue}`.toLowerCase().includes(q))
    );
    $$(".chip", chipBox).forEach((b) => b.setAttribute("aria-pressed", String(b.textContent === activeCategory)));
    grid.replaceChildren(...shown.map(eventCard));
    status.textContent = shown.length
      ? `Showing ${shown.length} of ${EVENTS.length} events`
      : "No events match your search. Try another word or choose All.";
  }
  search.addEventListener("input", render);
  render();

  // schedule tabs
  const tabs = $("#schedule-tabs");
  const body = $("#schedule-body");
  function showDay(day) {
    $$(".tab", tabs).forEach((t) => t.setAttribute("aria-selected", String(Number(t.dataset.day) === day)));
    const rows = EVENTS.filter((e) => e.day === day)
      .sort((a, b) => new Date(`2000-01-01 ${a.time}`) - new Date(`2000-01-01 ${b.time}`))
      .map((e) => el("tr", {}, [el("td", { text: e.time }), el("td", { text: e.title }), el("td", { text: e.venue }), el("td", { text: e.category })]));
    body.replaceChildren(...rows);
  }
  tabs.replaceChildren(
    ...SITE.days.map((label, i) =>
      el("button", { type: "button", class: "tab", role: "tab", "data-day": i + 1, "aria-selected": "false", text: label, onclick: () => showDay(i + 1) })
    )
  );
  showDay(1);
}

/* ---------- validation ---------- */
function setError(input, message) {
  const holder = input.closest(".field") || input.closest("fieldset");
  const out = holder.querySelector(".error");
  out.textContent = message;
  if (input.tagName === "FIELDSET") return;
  input.setAttribute("aria-invalid", message ? "true" : "false");
}
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isPhone = (v) => /^[6-9]\d{9}$/.test(v.replace(/[\s-]/g, "").replace(/^\+91/, ""));

/* ---------- registration ---------- */
function initRegister() {
  const form = $("#register-form");
  const list = $("#event-choices");
  const preselect = new URLSearchParams(location.search).get("event");

  list.append(
    ...EVENTS.map((e) =>
      el("label", { class: "check" }, [
        el("input", { type: "checkbox", name: "events", value: e.id, ...(e.id === preselect ? { checked: "" } : {}) }),
        el("span", { text: `${e.title} (${SITE.days[e.day - 1].split(" · ")[0]}, ${e.time}, ${formatFee(e.fee)})` }),
      ])
    )
  );

  const total = $("#fee-total");
  const updateTotal = () => {
    const chosen = $$("input[name=events]:checked", form).map((c) => EVENTS.find((e) => e.id === c.value));
    total.textContent = `${chosen.length} selected · Total fee ${formatFee(chosen.reduce((s, e) => s + e.fee, 0))}`;
  };
  list.addEventListener("change", updateTotal);
  updateTotal();

  const rules = {
    name: (v) => (v.trim().length < 2 ? "Enter your full name." : ""),
    email: (v) => (isEmail(v.trim()) ? "" : "Enter a valid email address."),
    phone: (v) => (isPhone(v) ? "" : "Enter a 10-digit mobile number."),
    college: (v) => (v.trim() ? "" : "Enter your college name."),
    year: (v) => (v ? "" : "Choose your year of study."),
  };
  Object.keys(rules).forEach((name) => {
    const input = form.elements[name];
    input.addEventListener("blur", () => setError(input, rules[name](input.value)));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let firstBad = null;
    Object.keys(rules).forEach((name) => {
      const input = form.elements[name];
      const msg = rules[name](input.value);
      setError(input, msg);
      if (msg && !firstBad) firstBad = input;
    });
    const chosen = $$("input[name=events]:checked", form).map((c) => c.value);
    const fieldset = $("#event-fieldset");
    setError(fieldset, chosen.length ? "" : "Select at least one event.");
    if (!chosen.length && !firstBad) firstBad = $("input[name=events]", form);
    const terms = form.elements.terms;
    setError(terms, terms.checked ? "" : "Please accept the rules to continue.");
    if (!terms.checked && !firstBad) firstBad = terms;
    if (firstBad) { firstBad.focus(); return; }

    const entry = {
      id: `SPC-${Date.now().toString(36).toUpperCase().slice(-6)}`,
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      college: form.elements.college.value.trim(),
      year: form.elements.year.value,
      events: chosen,
      createdAt: new Date().toISOString(),
    };
    try {
      const all = JSON.parse(localStorage.getItem("registrations") || "[]");
      all.push(entry);
      localStorage.setItem("registrations", JSON.stringify(all));
    } catch { /* storage may be blocked; the confirmation still shows */ }

    const done = $("#register-success");
    done.replaceChildren(
      el("h2", { text: "You're registered" }),
      el("p", { text: `Thanks ${entry.name}. Your registration ID is ${entry.id}. Keep it for check-in on the first day.` }),
      el("p", { text: `Events: ${chosen.map((id) => EVENTS.find((x) => x.id === id).title).join(", ")}` }),
      el("a", { class: "btn", href: "events.html", text: "Back to events" })
    );
    done.classList.remove("hidden");
    form.classList.add("hidden");
    done.setAttribute("tabindex", "-1");
    done.focus();
  });
}

/* ---------- gallery ---------- */
function visual(item, cls) {
  if (item.src) return el("img", { src: item.src, alt: item.title, loading: "lazy", class: cls });
  const tile = el("div", { class: cls, role: "img", "aria-label": item.title });
  tile.style.background = `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]})`;
  tile.style.width = "100%"; tile.style.height = "100%";
  return tile;
}

function initGallery() {
  const grid = $("#gallery-grid");
  const chips = $("#gallery-chips");
  const cats = ["All", ...new Set(GALLERY.map((g) => g.category))];
  let active = "All";
  let visible = GALLERY;
  let current = 0;
  let opener = null;

  function render() {
    visible = GALLERY.filter((g) => active === "All" || g.category === active);
    $$(".chip", chips).forEach((b) => b.setAttribute("aria-pressed", String(b.textContent === active)));
    grid.replaceChildren(
      ...visible.map((g, i) =>
        el("button", { type: "button", class: "shot", "aria-label": `Open photo: ${g.title}`, onclick: (e) => openBox(i, e.currentTarget) }, [
          visual(g, "thumb"), el("span", { text: g.title }),
        ])
      )
    );
  }
  chips.replaceChildren(
    ...cats.map((c) => el("button", { type: "button", class: "chip", "aria-pressed": String(c === "All"), text: c, onclick: () => { active = c; render(); } }))
  );

  const box = $("#lightbox");
  function fill() {
    const item = visible[current];
    $("#lb-visual").replaceChildren(visual(item, "lb-img"));
    $("#lb-caption").textContent = `${item.title} · ${item.category} (${current + 1} of ${visible.length})`;
  }
  function openBox(i, trigger) { opener = trigger; current = i; fill(); box.classList.remove("hidden"); $("#lb-close").focus(); document.body.style.overflow = "hidden"; }
  function closeBox() { box.classList.add("hidden"); document.body.style.overflow = ""; if (opener) opener.focus(); }
  const step = (d) => { current = (current + d + visible.length) % visible.length; fill(); };
  $("#lb-close").addEventListener("click", closeBox);
  $("#lb-prev").addEventListener("click", () => step(-1));
  $("#lb-next").addEventListener("click", () => step(1));
  box.addEventListener("click", (e) => { if (e.target === box) closeBox(); });
  document.addEventListener("keydown", (e) => {
    if (box.classList.contains("hidden")) return;
    if (e.key === "Escape") closeBox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  render();
}

/* ---------- contact ---------- */
function initContact() {
  const form = $("#contact-form");
  const counter = $("#msg-count");
  form.elements.message.addEventListener("input", (e) => (counter.textContent = `${e.target.value.length}/500`));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const checks = {
      name: (v) => (v.trim().length < 2 ? "Enter your name." : ""),
      email: (v) => (isEmail(v.trim()) ? "" : "Enter a valid email address."),
      subject: (v) => (v ? "" : "Choose a topic."),
      message: (v) => (v.trim().length < 10 ? "Write at least 10 characters." : ""),
    };
    let firstBad = null;
    Object.keys(checks).forEach((n) => {
      const input = form.elements[n];
      const msg = checks[n](input.value);
      setError(input, msg);
      if (msg && !firstBad) firstBad = input;
    });
    if (firstBad) { firstBad.focus(); return; }
    // No server: open the visitor's email app with the message filled in.
    const body = `${form.elements.message.value}\n\nFrom: ${form.elements.name.value} (${form.elements.email.value})`;
    const out = $("#contact-success");
    out.textContent = "Thanks for writing. Your email app should open with the message ready to send.";
    out.classList.remove("hidden");
    location.href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(form.elements.subject.value)}&body=${encodeURIComponent(body)}`;
    form.reset();
    counter.textContent = "0/500";
  });
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initShared();
  const page = document.body.dataset.page;
  ({ home: initHome, events: initEvents, register: initRegister, gallery: initGallery, contact: initContact })[page]?.();
});
