// ─────────────────────────────────────────────────────────────
// BEYOND THE RESUME — everything in the "Off the clock" deck.
// Add, remove, or reorder entries; the deck and its filter
// buttons (All / Hackathons / Training / Notes) update themselves.
// A group with no entries simply disappears.
// ─────────────────────────────────────────────────────────────

window.PERSONAL = {
  // ── Hackathons ────────────────────────────────────────────
  //   event  – competition name              (required)
  //   place  – "1st place", "Finalist", …    (starts with "1st" → gold badge)
  //   title  – what you built                (optional)
  //   date, text, tags[], link, team         (optional)
  hackathons: [
    {
      event: "Chick-fil-A Ignite Hackathon",
      place: "1st place",
      date: "Nov 2025",
      title: "Restaurant Technology Explorer",
      text: "A full-stack app with an interactive 3D restaurant model that maps the software, infrastructure, and technology running in-store. I led backend development and the team's ceremonies, and designed and deployed the AWS-hosted APIs and databases behind its real-time data within 24 hours.",
      tags: ["AWS", "Python", "JavaScript"],
    },
    {
      event: "MongoDB AI Agent Challenge",
      place: "1st place",
      // TODO: add date, what you built, stack, and a link
      text: "First place in MongoDB's AI agent challenge.",
      tags: ["MongoDB", "AI agents"],
    },
    {
      event: "ASI Hackathon · Hacking the 4th Dimension",
      place: "Finalist",
      date: "May 2026",
      title: "FlightStrain",
      team: "2-person team",
      text: "A multi-agent copilot for airline dispatchers. Eight Claude-backed agents watch live US airspace (~15,000 flights, real NOAA weather) and recommend climbing over or waiting out turbulence instead of rerouting around it, using ~64% less fuel.",
      tags: ["FastAPI", "Claude", "Cesium", "Scikit-Learn"],
      link: "https://github.com/felifire1/FlightStrain",
    },
  ],

  // ── Training ──────────────────────────────────────────────
  //   icon  – swim | hyrox | run | mountain | fish | cook | bike
  //   color – accent color for the card
  training: [
    { icon: "swim",     color: "#ff7a45", title: "IRONMAN",        text: "2.4 mi swim · 112 mi bike · 26.2 mi run. The best day-long argument for pacing yourself." },
    { icon: "hyrox",    color: "#ffc861", title: "Hyrox",          text: "8 km of running broken up by 8 functional stations. Sleds, burpees, wall balls." },
    { icon: "run",      color: "#f472b6", title: "Marathons",      text: "26.2, on repeat. Boston is a good city for it." },
    { icon: "mountain", color: "#60a5fa", title: "Mountaineering", text: "Up is the fun part. Down is where you find out what your legs think." },
    { icon: "fish",     color: "#4ade80", title: "Fishing",        text: "Active recovery. Mostly patience training." },
    { icon: "cook",     color: "#c084fc", title: "Culinary arts",  text: "Refueling, taken seriously. Training volume needs a kitchen to match." },
  ],

  // ── Notes ─────────────────────────────────────────────────
  //   tag, title, text                       (required)
  //   date, emoji, image ("img/…jpg"), link  (optional; image wins over emoji)
  notes: [
    // e.g. { tag: "Race report", date: "Oct 2026", emoji: "🏁", title: "IRONMAN Maryland", text: "Two sentences." }
  ],
};
