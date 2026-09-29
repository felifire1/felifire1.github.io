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

/* ---------- "Beyond the resume": render personal.js (hackathons · outdoors · athletics · notes) ---------- */
const ICONS = {
  github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
  photos: '<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/><path d="m3 17 4-4 3 3 3-3 4 4"/>',
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
  { key: "outdoors", label: "Outdoors", album: true },
  { key: "athletics", label: "Athletics", album: true },
  { key: "notes", label: "Notes" },
];

// album card: the first photo is the cover, stacked "prints" behind it hint there are more;
// clicking opens the gallery viewer at the first photo
function albumCard(label, photos) {
  const cover = photos[0];
  const card = el("button", "slide album");
  card.type = "button";
  card.setAttribute("aria-label", `${label}: ${photos.length} photos, open album`);
  const stack = el("span", "album-stack");
  stack.setAttribute("aria-hidden", "true");
  stack.append(el("span", "album-layer l2"), el("span", "album-layer l1"));
  const face = el("span", "album-face");
  const img = el("img");
  img.src = cover.image; img.alt = cover.alt || cover.title || ""; img.loading = "lazy"; img.decoding = "async";
  if (cover.focus) img.style.objectPosition = cover.focus;
  const count = el("span", "album-count");
  count.innerHTML = svg("photos");
  count.append(String(photos.length));
  const cap = el("span", "photo-cap");
  cap.append(el("span", "photo-title", label));
  if (cover.title) cap.append(el("span", "photo-place", cover.title));
  const more = el("span", "album-more", window.matchMedia("(hover: none)").matches ? "Tap for more " : "Click for more ");
  more.append(el("span", "arrow", "→"));
  cap.append(more);
  face.append(img, count, cap);
  card.append(stack, face);
  card.addEventListener("click", () => openViewer(photos, 0));
  return card;
}

const renderCard = {
  hackathons(h) {
    const card = el("article", "slide hack glow");
    if (h.image) {
      const media = el("button", "hack-media");
      media.type = "button";
      media.setAttribute("aria-label", `${h.event}: view photo`);
      const img = el("img");
      img.src = h.image; img.alt = h.alt || h.event; img.loading = "lazy"; img.decoding = "async";
      if (h.focus) img.style.objectPosition = h.focus;
      media.append(img);
      media.addEventListener("click", () => openViewer([{ image: h.image, alt: h.alt, title: h.event, place: h.place }]));
      card.append(media);
    }
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

  present.forEach((g) => {
    const photos = g.album ? data[g.key].filter((p) => p.image) : [];
    const cards = g.album
      ? (photos.length ? [albumCard(g.label, photos)] : [])
      : data[g.key].map((item) => renderCard[g.key](item));
    cards.forEach((card) => { card.dataset.group = g.key; track.append(card); });
  });

  // filter buttons: All + one per group. Only worth showing once 2+ groups have several cards each
  // (albums count as one card), otherwise the deck is short enough to just swipe.
  const countOf = (key) => track.querySelectorAll(`[data-group="${key}"]`).length;
  const total = track.children.length;
  const options = [{ key: "all", label: "All", n: total }, ...present.map((g) => ({ ...g, n: countOf(g.key) }))];
  const buttons = options.map((o) => {
    const b = el("button", "filter");
    b.type = "button"; b.dataset.key = o.key;
    b.append(o.label, el("span", "n", String(o.n)));
    b.addEventListener("click", () => setBeyondFilter(o.key));
    filterBar.append(b);
    return b;
  });
  if (present.filter((g) => countOf(g.key) >= 2).length < 2) filterBar.remove();

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

/* ---------- Top 5 reads ---------- */
(() => {
  const section = document.getElementById("reads");
  const list = section?.querySelector(".reads");
  if (!list) return;
  const reads = (window.PERSONAL?.reads || []).slice(0, 5);
  if (!reads.length) {
    section.remove();
    document.querySelector('.nav-links a[href="#reads"]')?.remove();
    return;
  }
  reads.forEach((r, i) => {
    const li = el("li", "read");
    const cover = el("div", "read-cover");
    const drawBlank = () => {
      cover.replaceChildren();
      cover.classList.add("blank");
      cover.style.setProperty("--hue", String((i * 47 + 18) % 360));
      cover.append(el("span", "read-cover-title", r.title), el("span", "read-cover-author", r.author));
    };
    if (r.cover) {
      const img = el("img"); img.src = r.cover; img.alt = `Cover of ${r.title}`; img.loading = "lazy";
      img.addEventListener("error", drawBlank, { once: true }); // e.g. the cover host is down
      cover.append(img);
    } else {
      drawBlank();
    }
    const body = el("div", "read-body");
    body.append(el("span", "read-rank", String(i + 1).padStart(2, "0")), el("h3", null, r.title), el("p", "where", r.author));
    if (r.note) body.append(el("p", "read-note", r.note));
    li.append(cover, body);
    list.append(li);
  });
})();

/* ---------- Photo viewer (gallery) ---------- */
let viewer, vStrip, vCount, vPrev, vNext, vItems = [], vIndex = 0;
function openViewer(items, start = 0) {
  if (!viewer) {
    viewer = document.createElement("dialog");
    viewer.className = "viewer";
    viewer.setAttribute("aria-label", "Photo gallery");
    viewer.innerHTML = `
      <div class="viewer-strip"></div>
      <span class="viewer-count" aria-live="polite"></span>
      <button class="viewer-nav viewer-prev" type="button" aria-label="Previous photo"><svg viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg></button>
      <button class="viewer-nav viewer-next" type="button" aria-label="Next photo"><svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg></button>
      <button class="viewer-close" type="button" aria-label="Close gallery">✕</button>`;
    document.body.append(viewer);
    vStrip = viewer.querySelector(".viewer-strip");
    vCount = viewer.querySelector(".viewer-count");
    vPrev = viewer.querySelector(".viewer-prev");
    vNext = viewer.querySelector(".viewer-next");
    vPrev.addEventListener("click", () => viewerGo(vIndex - 1));
    vNext.addEventListener("click", () => viewerGo(vIndex + 1));
    // close on the ✕ or on empty space around the photo
    viewer.addEventListener("click", (e) => {
      if (e.target.closest(".viewer-close") || e.target.classList.contains("viewer-slide") || e.target === viewer) viewer.close();
    });
    viewer.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); viewerGo(vIndex + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); viewerGo(vIndex - 1); }
    });
    // keep the counter in sync with touch swipes
    let raf;
    vStrip.addEventListener("scroll", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const i = Math.round(vStrip.scrollLeft / vStrip.clientWidth);
        if (i !== vIndex) { vIndex = i; viewerUpdate(); }
      });
    }, { passive: true });
  }
  vItems = items;
  vStrip.replaceChildren(...items.map((it) => {
    const fig = el("figure", "viewer-slide");
    const img = el("img");
    img.src = it.image; img.alt = it.alt || it.title || ""; img.decoding = "async";
    fig.append(img);
    const caption = [it.title, it.place].filter(Boolean).join(" · ");
    if (caption) fig.append(el("figcaption", null, caption));
    return fig;
  }));
  viewer.classList.toggle("single", items.length < 2);
  viewer.showModal();
  vIndex = Math.max(0, Math.min(items.length - 1, start));
  vStrip.scrollLeft = vIndex * vStrip.clientWidth;
  viewerUpdate();
}
function viewerGo(i) {
  vIndex = Math.max(0, Math.min(vItems.length - 1, i));
  vStrip.scrollTo({ left: vIndex * vStrip.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
  viewerUpdate();
}
function viewerUpdate() {
  vCount.textContent = `${vIndex + 1} / ${vItems.length}`;
  vPrev.disabled = vIndex <= 0;
  vNext.disabled = vIndex >= vItems.length - 1;
}

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
