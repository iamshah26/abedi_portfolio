# The Space Between — a portfolio by Ali Haider

An immersive, scroll-driven WebGL portfolio for **Syed Ali Haider Abedi (Ali Haider)** — software engineer,
product builder and co-founder of Intevo. Built with Vue 3, Vite, Three.js and GSAP.

Scroll moves a camera through one authored installation: **The Impossible Fold**, a creased Möbius band of
folded plates, comes apart, opens into an iris the visitor flies through, becomes the architecture of a
gallery of real work, and re-assembles in porcelain light for the closing scene. Every project has a readable
case study (`#/work/<id>`), and visitors who prefer reduced motion — or whose browser cannot run WebGL — get a
designed static version of the same content.

## Run

```sh
npm install
npm run dev            # http://localhost:5173  (append ?debug for live camera/fps diagnostics)
npm run build          # production build in dist/
npm run preview        # serve the build at http://localhost:4173
```

Useful URLs: `?static` (simple version), `?cinematic` (force the 3D mode under reduced motion),
`?quality=high|medium|low|minimal|mobile` (lock a rendering tier), `#/work/raahee` (deep link to a case study),
`#/contact` (deep link to the final scene).

## Verify

With a dev or preview server running:

```sh
npm run verify                         # browser suite → artifacts/final/verification.json + screenshots
npm run record:desktop                 # WebM of the real scroll sequence → artifacts/final/
npm run record:mobile
node scripts/shots.mjs out 1440 900 0,0.5,1 high   # quick review frames
```

The scripts drive the locally installed Google Chrome through `puppeteer-core`.

## Project map

- `src/data/profile.js` — every public claim, traceable to the resume or live product sites.
- `src/experience/` — the engine (renderer, director timeline, camera rig, world, materials, shaders).
- `src/components/` — overlays, case studies, menu, static portfolio.
- `docs/STORYBOARD.md`, `docs/ART_DIRECTION.md`, `docs/CHECKLIST.md` — creative brief, decisions and status.
- `CLAUDE.md` — guidance for future development sessions.

Nothing is deployed by these scripts.
