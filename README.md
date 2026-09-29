# williamquiroz — portfolio

Static site, no build step. Open `index.html` or serve the folder:

```bash
python3 -m http.server 8765
```

## Editing

| What | Where |
|---|---|
| Resume content (now, projects, experience) | `index.html` |
| Hackathons, outdoors, athletics, and notes cards ("Off the clock") | `personal.js`, grouped by type |
| Colors, fonts, spacing | `:root` variables at the top of `styles.css` |
| Hero "athlete profile" values | `index.html`, `<aside class="readout">` |

### When your role changes

The site is written to stay true long-term. Only two spots mention your current job:

1. **Now section** (`id="block"` in `index.html`): swap in the new role and bump the `updated …` date in its label.
2. **Experience timeline** (`id="course"`): change the current `📍 Now` item's tag to the next `CP` number and class from `cp here` to `cp`, then add the new role above it as `<li class="cp here">` with the `📍 Now` tag.

Keep job-search details (availability dates, where you'd relocate) off the site. They go stale; they belong on the resume.

### Adding to "Off the clock"

`personal.js` holds `hackathons`, `outdoors`, `athletics`, `notes`, and `reads` (Top 5 reads, its own section). Empty lists hide themselves. Filter buttons appear automatically once two or more kinds of cards have several entries each. Add an object to any list:

```js
// hackathons
{ event: "HackMIT", place: "1st place", date: "Sep 2027", title: "What you built",
  text: "Two sentences.", tags: ["Python"], link: "https://github.com/…", team: "3-person team" }

// outdoors / athletics — each list shows as ONE album card; the first photo is the cover,
// clicking it opens a swipeable gallery of the whole list (put photos in img/)
{ image: "img/race.jpg", title: "Race name", place: "City · finish time", alt: "What the photo shows", focus: "50% 40%" }

// notes — image is optional (drop the file in img/); otherwise the emoji shows
{ tag: "Race report", date: "Oct 2026", title: "IRONMAN Maryland", text: "…", image: "img/maryland.jpg", link: "https://…" }
```

A `place` starting with "1st" gets the gold 🥇 badge.

## Deploying

Live at **https://wfquiroz.github.io** via GitHub Pages (repo `wfquiroz/wfquiroz.github.io`, branch `main`, root). Any push to `main` redeploys in a minute or two. First time on a new machine, run `gh auth setup-git` once so `git push` can use your GitHub CLI login.

```bash
git add -A && git commit -m "Update site" && git push
```
