// ─────────────────────────────────────────────────────────────
// BEYOND THE RESUME — everything in the "Off the clock" deck.
// Add, remove, or reorder entries; the deck and its filter
// buttons (All / Hackathons / Outdoors / Athletics / Notes) update themselves.
// A group with no entries simply disappears.
// ─────────────────────────────────────────────────────────────

window.PERSONAL = {
  // ── Hackathons ────────────────────────────────────────────
  //   event  – competition name              (required)
  //   place  – "1st place", "Finalist", …    (starts with "1st" → gold badge)
  //   title  – what you built                (optional)
  //   date, text, tags[], link, team         (optional)
  //   image, alt, focus                      (optional photo shown at the top of the card)
  hackathons: [
    {
      event: "Chick-fil-A Ignite Hackathon",
      place: "1st place",
      date: "Nov 2025",
      image: "img/ignite-hackathon.jpg",
      alt: "William holding the Ignite Hackathon trophy in front of the Ignite sign",
      focus: "50% 58%",
      title: "Restaurant Technology Explorer",
      text: "A full-stack app with an interactive 3D restaurant model that maps the software, infrastructure, and technology running in-store. I led backend development and the team's ceremonies, and designed and deployed the AWS-hosted APIs and databases behind its real-time data within 24 hours.",
      tags: ["AWS", "Python", "JavaScript"],
    },
    {
      event: "MongoDB AI Agent Challenge",
      place: "1st place",
      date: "May 2026",
      // TODO: add what you built (title), stack, and a link
      text: "First place in MongoDB's AI agent challenge at Tech Week 2026.",
      image: "img/mongodb-tech-week.jpg",
      alt: "William holding his prize next to a Tech Week 2026 banner",
      focus: "50% 55%",
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
      link: "https://github.com/wfquiroz/FlightStrain",
    },
  ],

  // ── Outdoors ──────────────────────────────────────────────
  //   Shown as ONE album card; the FIRST photo is the cover. Clicking opens the rest.
  //   image – path to a photo in img/        (required)
  //   title – short caption                  (required)
  //   place – small line under the title     (optional)
  //   alt   – description for screen readers (recommended)
  //   focus – which part of the photo to keep when cropped, e.g. "50% 30%" (default center)
  outdoors: [
    { image: "img/kilimanjaro.jpg",      title: "Kilimanjaro",     place: "Stella Point · 5,756 m",
      alt: "William celebrating at the Stella Point sign on Mount Kilimanjaro", focus: "50% 40%" },
    { image: "img/ice-climbing.jpg",     title: "Ice climbing",    place: "Glacier wall",
      alt: "William ice climbing up a steep blue glacier wall", focus: "48% 68%" },
    { image: "img/half-dome.jpg",        title: "Half Dome",       place: "Yosemite",
      alt: "William in front of the Half Dome cable route in Yosemite", focus: "35% 55%" },
    { image: "img/rock-scramble.jpg",    title: "Rock scramble",
      alt: "William scrambling up a boulder ridge above a forested valley", focus: "50% 70%" },
    { image: "img/offshore-fishing.jpg", title: "Offshore fishing", place: "Mahi-mahi",
      alt: "William on a fishing boat holding a large mahi-mahi", focus: "50% 38%" },
  ],

  // ── Athletics ─────────────────────────────────────────────
  //   Same as Outdoors: one album card, FIRST photo is the cover.
  athletics: [
    { image: "img/ironman-70-3-finish.jpg",         title: "IRONMAN 70.3",
      alt: "William running toward the finish line of an IRONMAN 70.3", focus: "58% 50%" },
    { image: "img/ironman-barranquilla-finish.jpg", title: "IRONMAN 70.3", place: "Barranquilla, Colombia",
      alt: "William running down the IRONMAN 70.3 Barranquilla finish chute", focus: "40% 55%" },
    { image: "img/hyrox.jpg",                       title: "HYROX",        place: "Finish time 1:20:44",
      alt: "William and a fellow racer flexing in front of a HYROX finish-time screen reading 1:20:44", focus: "50% 45%" },
    { image: "img/nyc-marathon.jpg",                title: "NYC Marathon", place: "TCS New York City Marathon",
      alt: "William holding his bib at the TCS New York City Marathon expo", focus: "50% 55%" },
    { image: "img/ironman-barranquilla-medal.jpg",  title: "Finisher",     place: "IRONMAN 70.3 Barranquilla",
      alt: "William holding his finisher medal in front of the IRONMAN 70.3 Barranquilla sign", focus: "50% 45%" },
  ],

  // ── Top 5 reads ───────────────────────────────────────────
  //   title, author (required) · note – one line on why (optional)
  //   cover – "img/covers/…jpg" (optional; without it a styled placeholder cover is drawn)
  //   Listed in rank order; only the first 5 show.
  reads: [
  ],

  // ── Notes ─────────────────────────────────────────────────
  //   tag, title, text                       (required)
  //   date, emoji, image ("img/…jpg"), link  (optional; image wins over emoji)
  notes: [
    // e.g. { tag: "Race report", date: "Oct 2026", emoji: "🏁", title: "IRONMAN Maryland", text: "Two sentences." }
  ],
};
