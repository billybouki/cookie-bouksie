# Handoff notes — bouksi.com rebuild

Status snapshot for whoever (or whichever Claude session) picks this up next.

## Immediate pending requests (asked, not yet done)

From the end of this session, Billy asked for the following — none of this is
implemented yet, do it first:

1. **Works page sorting** — DONE this session: cards in `works.html` are now
   grouped by category (matching the filter button order) instead of
   insertion order, and a short keyword line was added under the `<h1>`
   summarizing the category range. Revisit if the grid still feels "stuffed"
   with more projects added.
2. **Featured project (Home) — typing animation** — NOT done. Add a small
   typewriter-style reveal effect to the featured project title (and/or
   summary) in `assets/js/main.js`, inside the `render()` function of the
   featured-project-cycler IIFE (search for `FEATURED_PROJECTS`). Keep it
   subtle/quick, not gimmicky.
3. **Featured project — auto-advance** — NOT done. Currently the "Next →"
   button only advances on click. Add a `setInterval` (e.g. every 5-6s) that
   auto-advances through `FEATURED_PROJECTS`, starting automatically on page
   load (so it moves to the *second* project on its own, per the request).
   Clicking "Next" manually should probably reset the timer so it doesn't
   double-advance right after a manual click.
4. **More Works-page clarity** — the keyword line (item 1) was a first pass;
   Billy may want more — ask before over-building this.
5. **Collect more images** — "from the current website and elsewhere." This
   is vague — the old WordPress site (bouksi.com) was hacked and may or may
   not still be reachable/worth scraping; there's also the earlier static
   attempt at `D:\__Portfolio\macbook\my-website\images\` which still has
   unused folders (e.g. `misc/JACOB`, `movies/REVOLUTION`, `music/*`) that
   were never migrated. Ask Billy where exactly he wants images pulled from
   before doing anything — don't scrape live sites without confirming scope.

## New asset folders with NO project page yet

**DONE** — `ferro.html` and `kalliplokamos.html` built, wired into
`works.html` (category **Installations** in the new taxonomy, keyword
**Electronics** — see below), added to `FEATURED_PROJECTS`, and spliced
into the project-nav loop (`ermafa → ferro → kalliplokamos → vhf`).
Category and description are still guesses from the images alone — Ferro
in particular assumes a ferrofluid display from the coil/PCB rig plus the
crowd around a reflective surface in `01.jpg`; Kalliplokamos assumes an
EL-wire figure sculpture. Both need Billy's confirmation (role/client/year
are all TBD, same as every other placeholder project page).

Follow the same pattern as the last several projects added (see
`projects/ttt.html` or `projects/siemens.html` for the simplest template):
slugified lowercase folder name, `cover.jpg` for grid/featured thumbnail,
optimize images with the ffmpeg pass below if they're not already small,
build the page, add a Works grid card, add to `FEATURED_PROJECTS`, and
splice into the project-nav "Next project" loop.

## Image/video optimization convention established this session

Large source images get run through:
```
ffmpeg -y -i input.ext -vf "scale='min(1920,iw)':'min(1920,ih)':force_original_aspect_ratio=decrease" -q:v 3 output.jpg
```
PNGs get converted to JPEG this way too (nothing on the site currently needs
alpha transparency). Videos get a WebM (VP9) + MP4 (H.264) pair; GIFs found
in source material (e.g. `germanos/normal-loop.gif`, was 9.6MB) get
converted to that same video pair instead of shipped as a GIF.

## All current projects — content status

| Project | Page | Category (confirmed?) | Text content | Notes |
|---|---|---|---|---|
| Poseidon's Island | `poseidons-island.html` | 3D Graphics & Motion Design ✅ | placeholder | Most content-ready; role/client known, year TBD. Extra images (02-09, 11.jpg) sitting in folder unplaced. |
| Komprai | `komprai.html` | Realities (guess) | placeholder | Need artist/track name, date, post-production details from Billy. |
| Ermafa | `ermafa.html` | Machines ✅ | placeholder | Has real video (partner's footage from intolight.de, credited). Images added by Billy. |
| VHF | `vhf.html` | Interactives & Games (guess) | placeholder | Guessed from photos (touchscreen energy-planning table, France/CH/DE). |
| Potential Drawer | `potential-drawer.html` | Products & Commercial (guess) | placeholder | Renamed from "AI Drawer" — folder and all references updated. YouTube embed (`98aAtKarF2A`), titled "AI as a brand experience" on YouTube. |
| Edition of One | `edition-of-one.html` | Interactives & Games (guess) | placeholder | **Possibly the "Posters" / Mathildenhöhe AI project** from the original brief — photo shows German museum text + Jugendstil mural. Unconfirmed, flagged to Billy, not yet corrected. |
| Athens by Sound | `athens-by-sound.html` | Interactives & Games (guess) | placeholder | Headphone listening installation. |
| Germanos | `germanos.html` | Interactives & Games (guess) | placeholder | Guessed client = Germanos (Greek retailer) from folder name only. |
| Memory Cinema | `memory-cinema.html` | 3D Graphics & Motion Design (guess) | placeholder | Motion-capture-style generative visualization. |
| Narcos | `narcos.html` | Interactives & Games (guess) | placeholder | Treadmill game branded "Narcos Plata" + vintage tape/radar prop photos — may actually be two different things merged into one project, needs confirming. |
| Siemens | `siemens.html` | Projections (guess) | placeholder | Projection-mapped checkerboard pillar installation. |
| TTT | `ttt.html` | Interactives & Games (guess) | placeholder | Kinect-tracked table tennis game, matches old site's `games/TTT`. |
| Ferro | `ferro.html` | Installations (guess) | placeholder | Coil/PCB rig + reflective surface — guessed ferrofluid kinetic sculpture from the name and `01.jpg`. |
| Kalliplokamos | `kalliplokamos.html` | Installations (guess) | placeholder | Glowing EL-wire sculpture in a human figure. No context beyond the images — needs Billy's input. |

**Still no images/pages at all**: Vhf ~~(done)~~, Converse, Milano, AI
Photobooth, Pinball, Screamers.

## Deployment status

- Git repo initialized, pushed to `https://github.com/billybouki/cookie-bouksie.git`
  (branch `master`).
- **Not yet connected to Netlify.** Next step per the original brief: connect
  this GitHub repo to Netlify for auto-deploy, then point Namecheap DNS at
  it, confirm it works, then cancel the Namecheap hosting plan (no email on
  the domain, so no migration blocker there).
- `gh` CLI is not installed in this environment — repo creation/pushes were
  done by Billy creating the repo manually and this session adding the
  remote + pushing over HTTPS (credential manager handled auth silently).

## Dev environment notes

- Local dev server: `npm run dev` (browser-sync, serves at
  `http://localhost:3000`, live-reloads on `**/*.html`,
  `assets/css/**/*.css`, `assets/js/**/*.js`).
- Browser-sync has crashed twice this session with a Node
  "JavaScript heap out of memory" error (exit code 134) after long
  sessions with many file-watch reloads. Not a code problem — just restart
  it with `npm run dev` (run in background) if it dies.
- `ffmpeg`/`ffprobe` are available on this machine and were used throughout
  for image/video optimization (see convention above).

## Design system quick reference

- Palette switcher: 6 palettes (cream, sky, mustard, teal, rose, ink) via
  `data-palette` on `<html>`, defined in `assets/css/style.css`. Ink and sky
  were ported over from the earlier prototype at
  `D:\__Portfolio\macbook\my-website\script.js` (`bgOptions` array) at
  Billy's request.
- Indent scale: `--indent-0/1/2` (1.5rem/3rem/4.5rem) — logo/footer at level
  0, page content at level 1, nested content (e.g. featured card) at level 2.
- Logo is a text-based blinking cursor `[bouksi_]`, not an image — this was
  corrected once already this session after an initial wrong guess (a GIF
  file that turned out to be unrelated).
- Nav links intentionally look like classic blue/underlined hyperlinks
  (matches inline prose links); palette-switcher and buttons keep their own
  distinct styling.
