# Ali Haider — personal introduction prototype

This is the revised artistic introduction through the **Selected Work** gallery entrance. The current implementation supersedes the previous entrance-to-product concept. No product imagery, company branding, dashboards, sound visualizers or detailed project exhibits are loaded by this introduction.

## Run and review

```sh
npm run dev -- --host 127.0.0.1 --port 5173
npm run build
```

Open `http://127.0.0.1:5173/` and scroll. Select a suspended artwork at the end, or use its equivalent text control. MENU jumps among the six compositions. Reduced-motion preferences start in still-frame mode with manually selectable frames; motion can be enabled explicitly.

The existing portfolio is preserved in local commit `e8b473a` on `codex/portfolio-before-cinematic-prototype`. New work is on `codex/signal-cinematic-prototype`. The retained portfolio source is also accessible through `?portfolio=1` for reference; the default experience is the personal introduction. Nothing was pushed or deployed.

## Changed files

- `src/App.vue`: selects the new prototype by default and preserves access to the prior implementation.
- `src/PortfolioApp.vue`: retained copy of the previous active portfolio.
- `src/prototype/SignalPrototype.vue`: Vue lifecycle, Three.js renderer, GSAP scroll state, menu, semantic controls, diagnostic interface, reduced-motion and WebGL fallback.
- `src/prototype/scene.js`: camera control points, original architectural lamellae, abstract passage, folded sculpture geometry, spatial typography and artwork selection.
- `src/prototype/prototype.css`: minimal overlay, responsive captions, navigation, focus states and still-frame controls.
- `scripts/verify-prototype.mjs`: desktop and mobile browser acceptance checks and captures.
- `scripts/record-prototype.mjs`: records the rendered WebGL canvas during the actual scroll sequence.
- `artifacts/prototype/STORYBOARD.md`: replacement six-frame personal storyboard.
- `artifacts/prototype/`: final screenshots, recordings and diagnostic verification report.

The earlier research captures in `public/images/products/` remain retained assets from the first narrative, but the personal introduction does not request them. No new dependencies were needed. Vue 3.5.26, Three.js 0.186.1 and GSAP 3.15.0 remain the foundation.

## Geometry, lighting and motion

The arrival sculpture contains two interleaved wings of rounded, solid sections swept along original architectural curves. Scrolling separates, tilts and redistributes the wings in depth. The abstract passage continues this visual language through wider reflective folds and a shader-lit overhead seam. The gallery holds three original open pleated surfaces: Form, Structure and Possibility. They are artistic studies, not project exhibits or placeholder product cards.

Metallic physical materials use restrained orchid, pearl and mineral-aqua color, environmental reflections, roughness and clearcoat. Directional and local lighting shape the surfaces. Desktop bloom has a high luminance threshold; mobile bypasses the post-processing chain. There are no particle clouds, rotating primitive sculptures, videos playing in the experience, or audio.

One GSAP ScrollTrigger proxy supplies progress from native browser scrolling. The renderer samples separate authored Catmull–Rom curves for camera position and look target. That same progress opens the chamber, reveals the abstract passage, assembles the gallery and converges the two spatial title elements. Reverse scrolling reverses the complete sequence. Artwork selection uses a separate GSAP pose parameter and never takes control of the camera.

The mobile camera has its own control points and field of view. At the ending, the side studies sit farther behind the central sculpture. Rendering caps pixel ratio at 1.25 on narrow screens and 1.5 on desktop, with a further reduction as low as 0.75 under sustained slow frames. Desktop post-processing is also disabled after repeated low frame-rate samples. Rendering pauses when the document is hidden, a menu is open or the scene settles. Shader preparation uses `compileAsync`. Geometry, material textures, post-processing targets, event handlers and GSAP resources are cleaned up on teardown.

## Six-frame narrative

| Frame | Progress | Composition |
|---|---|---|
| A — Arrival | 0–15% | Personal sculptural environment and atmospheric depth. |
| B — Identity | 15–30% | Camera arc and ALI HAIDER typography reveal. |
| C — Transformation | 30–50% | Wings open and reorganize as the camera crosses the threshold. |
| D — Immersion | 50–70% | Reflective folds, vaulted light and a curved spatial passage. |
| E — Discovery | 70–90% | Suspended Form, Structure and Possibility studies assemble. |
| F — Selected Work | 90–100% | Spatial title convergence and interactive sculpture selection. |

## Verification

`npm run build` passed. The final browser run passed at **1440 × 900** and **390 × 844**:

- WebGL initialized and real geometry rendered at all five required capture positions.
- Camera displacement from 0% to 50% exceeded 25 world units; orientation changed as well.
- 100% reached the Selected Work composition.
- Reverse scrolling restored the original camera coordinates.
- Actual desktop wheel and emulated native mobile touch swipes advanced the camera.
- Raycast selection and keyboard-accessible equivalents changed the artwork pose.
- Menu focus containment and Escape worked.
- Reduced-motion preferences exposed manual frame selection.
- Forced WebGL context loss displayed the accessible personal fallback.
- No JavaScript application errors, failed local resource requests or product-asset requests were recorded.
- Development diagnostics were absent from the compiled JavaScript output.

In development, `window.__signalPrototype` reports progress, phase, camera position, target, quaternion, viewport, WebGL status, approximate recent FPS, draw calls, triangle workload, quality and selection state. FPS is sampled from animation frame timing and is not physical-device certification. See `verification.json` for the actual per-frame observations.

## Evidence

For both `desktop` and `mobile`, screenshots are saved at `0`, `25`, `50`, `75` and `100` percent: for example, `artifacts/prototype/desktop-50.png` and `mobile-100.png`. Interaction and reduced-motion captures are included separately.

`desktop-transition.webm` and `mobile-transition.webm` record the actual rendered WebGL canvas during a continuous scroll from 0 to 100%. They do not include the HTML captions or menu; those are shown in the full viewport screenshots. The videos are evidence files and are not embedded as looping media in the experience.

## Research and limits

The implementation studied the public [ITom repository](https://github.com/ITomPoland/portfolio-itom), including its actual App, Experience and PerformanceContext source: scene ownership, shader preparation and device tiers. It also studied the [Codrops camera-path article](https://tympanus.net/codrops/2026/07/07/building-a-scroll-driven-3d-gallery-using-a-blender-camera-path-with-three-js-and-gsap/) and [GSAP cinematic camera article](https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/), plus the supplied experiential references. No reference artwork, branding or assets are reused.

Blender was not available on PATH. All geometry and camera control points are original procedural work, and the sculpture remains a prototype subject to visual review. Mobile testing uses Chrome device emulation, not a physical handset. No detailed project exhibits are implemented in this introduction. Expansion stops here pending visual approval.

### Final recorded performance

The final development-browser samples are listed below. These approximate recent-frame samples include rendering, browser capture and this Windows test environment. They are not Lighthouse results or physical-phone measurements.

| Progress | Desktop FPS / DPR | Mobile emulation FPS / DPR |
|---|---|---|
| 0% | 60 / 1.00 | 60 / 1.00 |
| 25% | 19 / 1.00 | 60 / 1.00 |
| 50% | 35 / 0.75 | 60 / 1.00 |
| 75% | 60 / 0.75 | 60 / 1.00 |
| 100% | 60 / 0.75 | 60 / 1.00 |

Dense passages remain the performance risk on constrained GPUs. The prototype lowers quality automatically; a constant 60 FPS is not claimed. The final full suite passed with zero application errors, failed local requests or product-asset requests.
