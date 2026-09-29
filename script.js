const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- Hero: split headline into words for staggered entrance ---------- */
(() => {
  const h1 = document.querySelector("h1.stagger");
  if (!h1 || reduceMotion) return;
  let i = 0;
  const wrap = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.append(part); return; }
        const s = document.createElement("span");
        s.className = "w"; s.style.setProperty("--i", i++); s.textContent = part;
        frag.append(s);
      });
      node.replaceWith(frag);
    } else {
      [...node.childNodes].forEach(wrap);
    }
  };
  wrap(h1);
})();

/* ---------- "Beyond the resume": render personal.js (hackathons · training · notes) ---------- */
const ICONS = {
  swim: '<path d="M2 16c2-2 3.5-2 5 0s3 2 5 0 3.5-2 5 0 3 2 5 0M8 10a2 2 0 1 0 0-.1M10 12l4-4 4 3"/>',
  hyrox: '<path d="M6 7v10M18 7v10M3 9v6M21 9v6M6 12h12"/>',
  run: '<path d="M13 4a2 2 0 1 0 0 .1M7 21l3-6 3 2 1 4M10 15l1-5 4 3 3-1M11 10l-3 1-2 3"/>',
  mountain: '<path d="m2 20 7-13 4 7 2-3 7 9Z"/><path d="m7 11 2 1.5 2-1.5"/>',
  fish: '<path d="M4 12c3-4 9-5 13-1-4 4-10 3-13-1Zm13-1 4-3v6ZM8 11h.01"/>',
  cook: '<path d="M6 13h12v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2ZM4 13h16M9 9c0-2 2-2 2-4M13 9c0-2 2-2 2-4"/>',
  bike: '<circle cx="5.5" cy="16" r="3.5"/><circle cx="18.5" cy="16" r="3.5"/><path d="m5.5 16 4-7h6l3 7M9.5 9 12 16h-6.5M14 6h2.5"/>',
  github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
};
const svg = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;
// tiny element helper — text always goes through textContent, so personal.js can't inject markup
function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}
function tagList(tags) {
  const ul = el("ul", "tags");
  (tags || []).forEach((t) => ul.append(el("li", null, t)));
  return ul;
}

const GROUPS = [
  { key: "hackathons", label: "Hackathons" },
  { key: "training", label: "Training" },
  { key: "notes", label: "Notes" },
];

const renderCard = {
  hackathons(h) {
    const card = el("article", "slide hack glow");
    const top = el("div", "card-top");
    const place = h.place || "";
    const medal = /^1st/i.test(place) ? "🥇 " : /^2nd/i.test(place) ? "🥈 " : /^3rd/i.test(place) ? "🥉 " : "";
    const badge = el("span", "place" + (/^1st/i.test(place) ? " gold" : ""), medal + place);
    top.append(badge);
    if (h.date) top.append(el("span", "mono", h.date));
    card.append(top, el("h3", null, h.title || h.event));
    const where = [h.title ? h.event : null, h.team].filter(Boolean).join(" · ");
    if (where) card.append(el("p", "where", where));
    if (h.text) card.append(el("p", null, h.text));
    if (h.link) {
      const links = el("div", "card-links");
      const a = el("a");
      a.href = h.link; a.target = "_blank"; a.rel = "noopener";
      const isGH = /github\.com/.test(h.link);
      a.innerHTML = svg(isGH ? "github" : "link");
      a.append(isGH ? "Code" : "Link");
      links.append(a);
      card.append(links);
    }
    if (h.tags?.length) card.append(tagList(h.tags));
    return card;
  },
  training(t) {
    const card = el("article", "slide log-card");
    if (t.color) card.style.setProperty("--tint", t.color);
    card.insertAdjacentHTML("afterbegin", svg(t.icon));
    card.append(el("h3", null, t.title), el("p", null, t.text));
    return card;
  },
  notes(n) {
    const card = el(n.link ? "a" : "article", "slide note glow");
    if (n.link) { card.href = n.link; card.target = "_blank"; card.rel = "noopener"; }
    const media = el("div", "note-media");
    if (n.image) { const img = el("img"); img.src = n.image; img.alt = ""; img.loading = "lazy"; media.append(img); }
    else media.textContent = n.emoji || "✦";
    const body = el("div", "note-body");
    const meta = el("div", "mono");
    meta.append(el("b", null, n.tag || ""));
    if (n.date) meta.append(el("span", null, "· " + n.date));
    body.append(meta, el("h3", null, n.title), el("p", null, n.text));
    card.append(media, body);
    return card;
  },
};

let setBeyondFilter = () => {};
(() => {
  const section = document.getElementById("log");
  const deck = document.getElementById("beyond");
  const track = deck?.querySelector(".track");
  const filterBar = section?.querySelector(".filters");
  if (!track) return;
  const data = window.PERSONAL || {};
  const present = GROUPS.filter((g) => (data[g.key] || []).length);
  if (!present.length) { section.remove(); return; }

  present.forEach((g) => data[g.key].forEach((item) => {
    const card = renderCard[g.key](item);
    card.dataset.group = g.key;
    track.append(card);
  }));

  // filter buttons: All + one per non-empty group (hidden when there's only one group)
  const total = track.children.length;
  const options = [{ key: "all", label: "All", n: total }, ...present.map((g) => ({ ...g, n: data[g.key].length }))];
  const buttons = options.map((o) => {
    const b = el("button", "filter");
    b.type = "button"; b.dataset.key = o.key;
    b.append(o.label, el("span", "n", String(o.n)));
    b.addEventListener("click", () => setBeyondFilter(o.key));
    filterBar.append(b);
    return b;
  });
  if (present.length < 2) filterBar.remove();

  let active = "all";
  setBeyondFilter = (key, instant = false) => {
    if (!buttons.some((b) => b.dataset.key === key)) key = "all";
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.key === key)));
    if (key === active && !instant) return;
    active = key;
    const apply = () => {
      [...track.children].forEach((c) => { c.hidden = !(key === "all" || c.dataset.group === key); });
      deck.refresh?.();
      track.classList.remove("swapping");
    };
    if (instant || reduceMotion) { apply(); return; }
    track.classList.add("swapping");
    setTimeout(apply, 180);
  };
  buttons[0].setAttribute("aria-pressed", "true");

  // any link with data-filter="hackathons" (etc.) jumps straight to that view
  document.querySelectorAll("[data-filter]").forEach((a) =>
    a.addEventListener("click", () => setBeyondFilter(a.dataset.filter, true)));
})();

/* ---------- Swipe decks ---------- */
function initDeck(deck) {
  const track = deck.querySelector(".track");
  const dots = deck.querySelector(".dots");
  const controls = document.querySelector(`.deck-controls[data-for="${deck.id}"]`);
  const prev = controls?.querySelector(".deck-prev");
  const next = controls?.querySelector(".deck-next");

  let slides = [], dotEls = [];
  let current = 0;
  let programmatic = false, settleTimer;
  const last = () => slides.length - 1;
  const maxScroll = () => track.scrollWidth - track.clientWidth;
  // scroll position that puts slide i at the track's start edge (snap points are relative to the track padding)
  const posOf = (i) => Math.min(maxScroll(), slides[i].offsetLeft - slides[0].offsetLeft);
  // which slide the current scroll position corresponds to
  const indexAt = (left) => {
    if (!slides.length) return 0;
    if (left >= maxScroll() - 2) return last();
    let best = 0;
    slides.forEach((_, i) => { if (Math.abs(posOf(i) - left) < Math.abs(posOf(best) - left)) best = i; });
    return best;
  };

  function render() {
    slides.forEach((s, i) => s.classList.toggle("is-active", i === current));
    dotEls.forEach((d, i) => d.classList.toggle("on", i === current));
    if (prev) prev.disabled = current <= 0;
    if (next) next.disabled = current >= last();
  }
  function goTo(i) {
    if (!slides.length) return;
    current = Math.max(0, Math.min(last(), i));
    programmatic = true;
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => { programmatic = false; }, 700); // fallback where scrollend is unsupported
    track.scrollTo({ left: posOf(current), behavior: reduceMotion ? "auto" : "smooth" });
    render();
  }
  // (re)collect visible slides and rebuild the dots — called on load and whenever a filter changes
  function build() {
    slides = [...track.querySelectorAll(".slide:not([hidden])")];
    dots.replaceChildren();
    dotEls = slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.setAttribute("role", "tab"); b.setAttribute("aria-label", `Slide ${i + 1}`);
      b.addEventListener("click", () => goTo(i));
      dots.append(b);
      return b;
    });
    current = 0;
    track.scrollTo({ left: 0, behavior: "auto" });
    render();
  }
  deck.refresh = build;

  prev?.addEventListener("click", () => goTo(current - 1));
  next?.addEventListener("click", () => goTo(current + 1));

  // keep index in sync with native scroll / touch swipes (ignored while a button/dot scroll is animating)
  let raf;
  track.addEventListener("scroll", () => {
    if (programmatic) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const i = indexAt(track.scrollLeft);
      if (i !== current) { current = i; render(); }
    });
  }, { passive: true });
  track.addEventListener("scrollend", () => { programmatic = false; clearTimeout(settleTimer); });

  // mouse drag-to-swipe (touch uses native scrolling)
  let down = false, startX = 0, startLeft = 0, startIndex = 0, moved = 0;
  track.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    down = true; moved = 0; startX = e.clientX; startLeft = track.scrollLeft; startIndex = current;
  });
  track.addEventListener("pointermove", (e) => {
    if (!down) return;
    if (!(e.buttons & 1)) { down = false; return; } // button released outside the track
    const dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    if (moved <= 4) return; // still a click, not a drag — leave links clickable
    if (!track.classList.contains("dragging")) {
      track.classList.add("dragging");
      track.setPointerCapture(e.pointerId);
    }
    track.scrollLeft = startLeft - dx;
  });
  const release = (e) => {
    if (!down) return;
    down = false;
    const wasDrag = track.classList.contains("dragging");
    track.classList.remove("dragging");
    if (!wasDrag) return;
    const dx = e.clientX - startX;
    // snap to wherever the drag landed; a short flick still advances one slide
    let target = indexAt(track.scrollLeft);
    if (target === startIndex && Math.abs(dx) > 40) target = startIndex + (dx < 0 ? 1 : -1);
    goTo(target);
  };
  track.addEventListener("pointerup", release);
  track.addEventListener("pointercancel", release);
  track.addEventListener("click", (e) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);

  // keyboard
  deck.tabIndex = 0;
  deck.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(current + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(current - 1); }
  });

  window.addEventListener("resize", render);
  build();
}
document.querySelectorAll(".deck").forEach(initDeck);

/* ---------- Scroll reveal ---------- */
const hidden = new Set(document.querySelectorAll(".reveal"));
function reveal() {
  const line = window.innerHeight * 0.92;
  hidden.forEach((el) => {
    if (el.getBoundingClientRect().top < line) {
      el.classList.add("visible");
      hidden.delete(el);
    }
  });
}

/* ---------- Progress bar + active nav ---------- */
const bar = document.querySelector(".progress span");
const links = [...document.querySelectorAll(".nav-links a")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (bar) bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  const y = window.scrollY + 140;
  let cur = null;
  sections.forEach((s, i) => { if (s && s.offsetTop <= y) cur = i; });
  links.forEach((a, i) => a.classList.toggle("active", i === cur));
  reveal();
}
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", reveal);
onScroll();

/* ---------- Cursor glow on cards + hero card tilt (desktop only) ---------- */
if (finePointer && !reduceMotion) {
  document.addEventListener("pointermove", (e) => {
    const g = e.target.closest?.(".glow");
    if (g) {
      const r = g.getBoundingClientRect();
      g.style.setProperty("--mx", `${e.clientX - r.left}px`);
      g.style.setProperty("--my", `${e.clientY - r.top}px`);
    }
  }, { passive: true });

  const tilt = document.querySelector(".tilt");
  if (tilt) {
    tilt.addEventListener("pointermove", (e) => {
      const r = tilt.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      tilt.style.transform = `perspective(900px) rotate(1.2deg) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateY(-2px)`;
    });
    tilt.addEventListener("pointerleave", () => { tilt.style.transform = ""; });
  }
}

/* ---------- Mobile menu ---------- */
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.forEach((a) => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();
