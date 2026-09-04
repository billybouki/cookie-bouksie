# Handoff notes — bouksi.com rebuild

Status snapshot for whoever (or whichever Claude session) picks this up next.

## To-do

1. **Copy** — write/finalize project text content across pages.
2. **B&W cover images** — treat project cover images in black &amp; white.
3. **Separate old and new projects** — distinguish older vs. newer work
   somewhere in the Works presentation (grouping, label, or similar — not
   yet decided).

## Pending reorder (agreed 2026-09-04, not yet applied)

Billy wants projects 08–20 renumbered (folders + pages + all cross-refs):
08=Landmarks of 1821 (was 20), 09=Ferro (unchanged), 10=Gendarmenmarkt
(unchanged), 11=Memory Cinema (was 13), 12=TTT (was 16), 13=Germanos (was
11), then Athens by Sound, Love My Self, Narcos: Manhunt, Tee Tiler,
Vagonetto, Jacob Collier, Music Production shift down to fill 14–20 in
their original relative order. Confirmed with Billy but deliberately not
yet executed — do this as its own pass (folder renames + every href +
`works.html` grid + project-nav chain + any image paths), separate from
content work, to keep it reviewable.

## New asset folders with NO project page yet

**DONE (2026-09-04)** — `18-jacob-collier-one-man-tour.html` built from the
existing `assets/images/jacob-collier-one-man-tour/` source folder (raw
360-camera photos + a stage screenshot), optimized into
`assets/images/18-jacob-collier-one-man-tour/`, wired into `works.html`
(category **Music Various**, keyword **Video**). Year (2016–2017) is
inferred from photo filename timestamps, not confirmed by Billy. Still
needs an actual tour video link/embed — placeholder line ("Why not watch a
video?") and a TODO comment mark the spot.

**DONE (2026-09-04)** — `20-landmarks-of-1821.html` built following the
`01-edition-of-one.html` structure (page-top wrapper, no tag/meta block,
`span.mono` section labels) per Billy's request, using copy from
`notes/project-copy-backup.md`. Source images
(`assets/images/20-landmarks-of-1821/`) were raw PNGs+JPGs dumped by Billy;
PNGs converted to JPEG and originals discarded per his instruction. Client
named as ERT from the copy but exact series title, year, and Billy's
specific role are still unconfirmed (TODO left in place). Category set to
**Various** as a neutral placeholder — Billy said Various taxonomy is
"we'll do that later," so this should be revisited once that's decided.

Both 18 and 20 are wired into the project-nav loop
(`17 → 18 → 20 → 01`) and added to `works.html`, but **not** added to the
homepage `FEATURED_PROJECTS` carousel, since Billy trimmed that list to a
fixed set (01, 02, 03, 04, 06, 07) earlier this session.

**DONE (2026-09-04)** — populated real body copy (from
`notes/project-copy-backup.md`) into six previously-placeholder pages,
replacing `[Intro/Closing text goes here.]` stand-ins: `06-siemens-markenfilm`
(now has Year 2014, Client "Siemens Home Appliances" confirmed from the
copy), `07-kalliplokamos`, `11-germanos` (Client "Germanos" now confirmed),
`13-memory-cinema` (hero summary and `<span class="tag">` were previously
wrong — guessed from images alone as a motion-capture/3D-Graphics piece;
the real copy says it's a VR musical film, tag corrected to **Immersive**
to match `works.html`), `14-narcos-manhunt` (confirmed the treadmill photo
IS one of the four branded games, not a mismatched/separate project as
previously flagged — Client set to Netflix, Role to "Game design &
production, Intolight"), `15-tee-tiler`, `16-ttt`. Role/Client/Year still
TBD wherever the backup copy didn't state them explicitly — did not guess
beyond what the copy says.

Billy has also since added a raw `assets/images/19-music-production/`
folder (one image, `unnamed.png`, no description text) with no page built
yet — needs actual copy from Billy before a page can be written.

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
- **Live via GitHub Pages**: https://billybouki.github.io/cookie-bouksie/index.html
  — auto-updates on push to `master`, no separate deploy step needed.
- **Custom domain live (confirmed 2026-09-04)**: `CNAME` file added to repo
  root (bouksi.com), Namecheap DNS updated (4 A records to GitHub Pages IPs +
  `www` CNAME to `billybouki.github.io`). HTTPS certificate is issued and
  approved for both `bouksi.com` and `www.bouksi.com` (expires 2026-12-03),
  Enforce HTTPS is on. **https://bouksi.com is the live canonical URL.**
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
