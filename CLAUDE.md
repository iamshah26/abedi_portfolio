# CLAUDE.md — Ali Haider portfolio: "The Space Between"

Durable guidance for future sessions. Read this before changing anything. Deeper notes:
`docs/STORYBOARD.md` (camera keyframes), `docs/ART_DIRECTION.md` (decisions), `docs/CHECKLIST.md` (status).

## Who this is for
- **Syed Ali Haider Abedi**, public name **ALI HAIDER**. Lahore, Pakistan. Open to international remote roles.
- Positioning: **Senior Frontend Engineer · Software Engineer · Product Builder · Co-Founder of Intevo**.
- ~4 years of experience. Strongest: **Angular, TypeScript**, JavaScript, RxJS, NgRx, Signals, SignalR,
  responsive/enterprise frontend. Not primarily React, not a backend/infra or 3D-artist professional —
  the site's artistry is the showcase, not a job title.

## Truthfulness rules (non-negotiable)
- `src/data/profile.js` is the **single source of truth** for public copy. Every claim must trace to the
  resume (`public/Syed_Ali_Haider_Abedi_Resume.pdf`) or the live product sites. No invented metrics,
  testimonials or responsibilities. Older docs (`PORTFOLIO_CONTENT.md`, etc.) contain unverified claims —
  do not copy from them.
- **ibex is the current employer** (Analyst Software Engineer, May 2023 — Present; confirmed by Ali in
  Oct 2026, superseding the earlier brief). Ali is also Co-Founder of Intevo. Use present tense for ibex work.
- **Intevo** = the company (product & technology engineering, theintevo.com). Ali is a **Co-Founder**.
  **Intevo Pulse** = an AI voice product of Intevo (intevopulse.ai, app., ops.). Separate case studies.
  Ali delivered Pulse's client app, Ops dashboard and product site; do NOT claim the AI/telephony/backend.
- Verified numbers only: 5,000+ Enteract Engage agents; KE Listening across millions of customers;
  Raahee 30 verified operators; TheXperto 20+ orders; supported 3–4 interns at Voltro.
- Enteract Engage and Voltro visuals are **labelled conceptual illustrations** (`conceptArt.js`).
- Portrait: `public/images/profile.jpeg` (real photograph supplied by Ali, white background, 810×1080),
  cropped to head and shoulders and lightly desaturated in Chapter 05 and the static page. The old
  `public/profile.png` (AI-generated) is no longer used.

## Links (verified from the resume PDF)
Email haiderabedi26@gmail.com · LinkedIn https://linkedin.com/in/syed-ali-haider-abedi-09a743233 ·
GitHub https://github.com/iamshah26 · Resume `/Syed_Ali_Haider_Abedi_Resume.pdf`.

## Stack
Vue 3.5 + Vite 7 (plain JS), Three.js 0.186, GSAP 3 + ScrollTrigger. No router library (hash routes),
no UI framework, no Lenis (native scroll + engine damping), no React. Puppeteer-core + local Chrome for verification.

## Creative concept
**THE SPACE BETWEEN — a portfolio by Ali Haider.** The signature object is **THE IMPOSSIBLE FOLD**: a creased
Möbius band of 28 thick folded plates (satin titanium, graphite, porcelain, smoked glass, restrained
iridescent film; polished edges; persimmon crease seams; slots and windows cut on grid lines) around an
internal louvre core. Narrative: the idea is pulled apart, the visitor passes through an opening iris of its
plates, the plates become the gallery architecture, then fly ahead and re-assemble in porcelain daylight.

Chapters (progress): 01 Arrival 0–.18 · 02 Transformation + passage .18–.47 · 03 Selected Work .47–.755 ·
04 The Engineer .755–.85 · 05 The Person .85–.925 · 06 Final scene .925–1.

## Colour tokens (`src/styles/tokens.css`, mirrored in `src/experience/palette.js`)
Obsidian #0D0D11 · Porcelain #F3F0E9 · Titanium #C1C4CB · Aubergine #24202D · Lavender #B9A7E8 ·
Persimmon #F1785D. ~70% neutrals / 20% material colour / 10% accent. Lavender and persimmon live in
light, reflections and selected type. Typography: Archivo (variable, stretched 125% for display),
Instrument Serif italic for expressive accents, Geist Mono for labels.

## Architecture
```
src/App.vue                     mode (experience | static), hash routing, menu, case study orchestration
src/data/profile.js             all public copy (see truthfulness rules)
src/components/experience/      ExperienceStage (canvas, scroll track, loader, diagnostics), ChapterOverlays
src/components/                 CaseStudy, StaticPortfolio (accessible fallback), ui/ (header, menu, contact,
                                AtAGlance recruiter card, ClientOffer, RxMarbles operator diagram)
scripts/prerender-plugin.mjs    build-time crawlable pages /work/<id>/ + sitemap.xml + robots.txt from profile.js
src/experience/Experience.js    engine: renderer, composer, loop, resize, tiers, context loss, diagnostics
src/experience/director/        Director (ONE GSAP timeline, duration 1 == progress), keyframes, CameraRig,
                                ScrollController (ScrollTrigger + damping + flown jumps)
src/experience/world/           ImpossibleFold (+ foldGeometry), Environment (sky, fog, floor reflector,
                                lights, env maps, monoliths, dust, name wall), Gallery (+ exhibitFrame,
                                conceptArt), EngineerAtrium
src/experience/materials/       MaterialLibrary, shaders (seam, cone, floor, sky, dust, guide, image, stream, grade)
src/experience/core/            PerformanceManager (tiers), toneMapping (toe-free Khronos Neutral)
src/experience/navigation.js    chapter timing; no three.js import (keeps the static bundle light)
```

## Audience features (added after the recruiter/client review)
- Recruiter: header RESUME link (desktop), "At a glance" card in the menu, shareable `#/glance`.
- Client: "What we can build together" + "Start a project" prefilled mailto in the finale and static page.
- Proof of skill: interactive RxJS marble diagram (map/filter/debounceTime/switchMap with real semantics).
- Discoverability: prerendered case-study pages with canonical, OG image and JSON-LD; Person JSON-LD on /.
- Motion: pointer-following warm light (desktop, arrival), idle orbit after 6 s at the arrival, persimmon
  seam wipe on chapter change, clickable HUD chapter ticks, a distinct clip-path reveal per case study,
  exhibit beams tinted with each project's accent.

## Animation rules
- **The Director owns every animated scene value.** Add a track to `TRACKS` in `Director.js`; never tween
  scene parameters elsewhere. Exceptions (UI-local): `rig.focus` (case-study dolly), `fold.ripple` (click).
- Everything is a pure function of progress (+ time for ambient breath), so reverse scrolling is exact.
- Camera keyframes live in `director/keyframes.js` with separate **desktop** and **mobile** sets (portrait
  when aspect < 0.9). Keep `docs/STORYBOARD.md` in sync. Use `scripts/frame-solver.mjs` to place landmarks
  on screen numerically before eyeballing.
- DOM overlays read the same damped progress (`ChapterOverlays.vue`), never their own ScrollTriggers.
- No scroll hijacking; native scroll with damping. Menu jumps are flown (`ScrollController.jump`).

## Desktop / mobile
- Tiers: high (bloom, grade, FXAA, shadows, transmission, reflector .5) → medium → low → minimal; mobile →
  mobileLow. Sustained < 42 fps steps down, never up. `?quality=<tier>` locks a tier; feature overrides
  `&bloom=0&transmission=0&reflector=0.3&dpr=1` exist for diagnosis.
- Mobile: own camera path and FOV, stacked name wall, fewer segments, no bloom/transmission/shadows, CSS
  grain, larger tap targets, captions at the bottom.
- Do not use MSAA render targets with UnrealBloom (renders black on ANGLE/D3D11) — FXAA is used instead.

## Visual anti-patterns (do not regress)
SaaS hero + sections; repeated rectangular cards; icon/skill grids; stock spheres/tori; particle clouds;
wireframe ribbons; neon glow / bloom on everything; dashboard headers; clocks/coordinates; fake metrics;
looping background video; product branding in the opening; dead empty frames between chapters.

## Commands
```sh
npm install
npm run dev                      # http://localhost:5173  (add ?debug for the diagnostics panel)
npm run build && npm run preview
npm run verify                   # full browser suite (or node scripts/verify.mjs <url>) → artifacts/final/ (needs dev or preview server)
node scripts/shots.mjs out 1440 900 0,0.5,1 high     # quick frames for visual review
node scripts/record.mjs desktop 30                    # WebM of the real scroll sequence
node scripts/render-still.mjs                         # regenerates public/images/fold-still.webp
```
Headless Chrome on this machine reports `prefers-reduced-motion: reduce`; scripts emulate `no-preference`.
`window.__experience` (dev or `?debug`) exposes progress, camera, target, quaternion, fps, tier, draw calls.

## Status and next tasks
See `docs/CHECKLIST.md`. Known gaps: no Blender pipeline (all geometry procedural); KTX2/Draco unused
(no heavy assets yet); mobile verified in Chrome emulation only, not on a
physical phone.
