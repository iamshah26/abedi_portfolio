# Worlds I’ve Built — implementation notes

## Run locally

Use Node 22.12+ (Node 24 was used here).

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 5173
npm run build
npm run preview
```

Nothing was deployed or pushed. The existing Vue 3 / Vite stack and Google Ads integration in `index.html` are retained. A snapshot of the pre-existing dirty working tree is in `.checkpoints/before-worlds-rebuild.zip` (ignored by Git). Legacy components and content remain available; the active entry point is `src/App.vue`.

## Art direction

Midnight Orchid and Liquid Light: a folded, open ribbon sculpture leads into a voice exhibit, a layered travel landscape, a connected enterprise interface system, a product studio and a warm pearl finale. The ribbon uses a custom ruled surface, not a torus primitive. Environmental reflections and controlled directional light shape metallic surfaces. Animated shader highlights travel along the connecting route. There is no video playback or autoplay audio.

The real public websites of Intevo Pulse, Raahee, Intevo and TheXperto were captured on 16 October 2026. These are marketing-page captures, not private app screenshots. Their visible claims belong to the captured websites; no numerical achievements are asserted in the portfolio’s case-study copy. Enterprise modules are explicitly illustrative and contain no customer or employer data.

## Architecture and changed files

- `src/App.vue`: native scrolling, a single GSAP ScrollTrigger timeline, six chapter overlays, chapter jumps, accessible menu, reading-mode selection and contact links.
- `src/components/WorldCanvas.vue`: lazy-loaded Three.js renderer; camera position, target, lighting and background keyed to the shared scroll state; responsive framing, raycast selection, render lifecycle and cleanup.
- `src/experience/worlds.js`: procedural ribbon surface, signal shader, real screenshot textures, travel strata, enterprise module diagrams and exhibit factories.
- `src/components/ProjectModal.vue`: native modal dialog with case-study imagery, responsibilities, engineering detail, external product links, focus containment and Escape handling.
- `src/data/exhibition.js`: curated chapter and project data, corrected LinkedIn URL, résumé and email links. Retained historical data is not silently overwritten.
- `src/assets/main.css`: responsive exhibition, reading view, touch targets, contrast, focus indicators and dialog presentation.
- `vite.config.js`: removed the intrusive development toolbar from the preview; retained the existing build setup.
- `public/images/products/*.webp`: four authentic public-page captures, approximately 273 KB combined.
- `scripts/capture-products.mjs`: repeatable public page capture.
- `scripts/verify-worlds.mjs`: browser acceptance checks and evidence generation.
- `artifacts/worlds/`: desktop/mobile screenshots, interaction screenshots and machine-readable verification results.

### Scroll and rendering

The timeline maps scroll progress 0–1 to six anchors at world depths 0, −32, −64, −96, −128 and −160. Camera position and look target advance together; lateral movement opens perspective between anchors. GSAP scrubbing is reversible. Browser touch scrolling is native; no wheel interception or scroll lock is used for the journey. Opening a modal temporarily locks the background.

The renderer is code-split. Worlds are constructed on approach and neighboring worlds are culled. The pixel ratio is capped at 1.25 on narrow viewports and 1.6 on larger viewports, with a further reduction after sustained slow frames. Animation stops when the page is hidden, a dialog is open or the scene settles after idle. Geometry, textures, environment targets, listeners and animation timelines are disposed on teardown.

The mobile camera uses a centered, more distant composition with the artwork above the text. Below 800 px the presentation changes to an upper artwork / lower caption layout. Reading mode uses ordinary semantic sections and product images. Reduced motion skips WebGL entirely. Renderer initialization failure or context loss switches to the same reading experience.

### Interaction

Use the menu to jump directly to any world, contact or the about panel. Select an exhibit screen, or its equivalent text button, to read the case study. All important canvas interactions have a semantic alternative. Native dialogs provide focus containment and Escape-to-close; focus is restored afterward. Email, LinkedIn, GitHub and the local résumé are directly accessible.

## Reference research

- [The Drop](https://drop.peachworlds.com/): spatial rather than grid-based storytelling and depth-led transitions.
- [ITom](https://itomdev.com/): coherent handmade identity, discoverable rooms and meaningful shader treatments.
- [Bruno Simon](https://bruno-simon.com/): portfolio as a navigable world, with explicit interaction and recovery controls.
- [Codrops cinematic scroll techniques](https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/): shared scroll state for camera position, look target and DOM storytelling.

These principles informed original geometry and layouts; no reference artwork or source code was copied.

## Verification and limits

The browser suite checks camera displacement and reversal, every chapter, all nine requested widths, horizontal overflow and text bounds, mobile tap selection, menu contact access, modal keyboard containment and Escape, résumé HTTP response, reduced-motion mode, WebGL-unavailable fallback and local failed requests. Screenshots include desktop, mobile and landscape. The JSON report records measured frame intervals and renderer draw workload from this Windows Chrome environment.

Emulated mobile dimensions are not physical-device GPU tests. Frame timing from headless Chrome is not a Lighthouse score or a promise of 60 FPS on phones. External platform login flows, email delivery and third-party profile availability are outside the local test.

Private Pulse application/operations screenshots and independently verified employment dates remain unavailable. Existing source files disagree about some dates, so the new career panel omits dates and links to the supplied résumé. The experience does not claim measured business impact, awards or production performance results.

### Recorded results

- `npm run build`: passed after final source changes and favicon addition.
- Nine viewport widths passed: 320, 360, 375, 390, 430, 768, 1024, 1440 and 1920 px; each checked at all six chapter anchors.
- 844 × 390 landscape captured and visually reviewed.
- No JavaScript application errors in the full browser run.
- An earlier run found a missing `/favicon.ico` request from the résumé PDF viewer. After adding the icon, the complete browser suite was rerun successfully: zero application errors and zero failed local resources. The current results are in `verification.json`; the production smoke check is in `production-check.json`.
- Measured frame interval: median 16.7 ms; 95th percentile 16.8 ms over 100 frames of gentle scrolling at 1440 × 900, DPR 1, Windows headless Chrome / D3D11. This is a limited sample, not physical-phone certification.
- Scene-anchor workloads: 6–66 draw calls and 2,914–8,714 triangles. Opening transition sample: 71 draw calls.
- Main JavaScript plus animation bundle: 77.78 KB gzip. Separately loaded Three.js/world bundle: 147.60 KB gzip. CSS: 3.06 KB gzip.
- Direct 3D-screen raycast selection passed. Six intermediate transition frames and actual camera positions are in `motion-evidence.json` and `transition-0.png` through `transition-5.png`.

Evidence files are local under `artifacts/worlds/`: `desktop-0.png` through `desktop-5.png`, `mobile-0.png` through `mobile-5.png`, `case-study.png`, `mobile-case-study.png`, `menu.png`, `landscape.png`, `reduced-motion.png` and the three JSON reports.

### Animation-library audit

Verified installed with `npm ls --depth=0`: Vue 3.5.26, Three.js 0.186.1, GSAP 3.15.0 and Vite 7.3.1. ScrollTrigger ships with GSAP and is explicitly registered in App.vue. No dependencies were missing, so no installation or framework migration was necessary. Direct Three.js is used within the Vue lifecycle; TresJS and Motion were considered unnecessary wrappers for this implementation. GSAP owns the master scroll timeline and entry typography; Three.js consumes its progress for real camera, scene and shader rendering.
