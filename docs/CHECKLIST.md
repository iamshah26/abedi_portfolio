# Implementation checklist

Status as of 2026-10-17 (branch `feature/the-space-between`). "Verified" means checked in a real browser
by `scripts/verify.mjs` or by reviewing rendered frames — not inferred from code.

## Stages
- [x] Audit — legacy portfolio and the signal prototype reviewed; prototype and legacy components removed
      (recoverable from git: `e8b473a`, `d6542a0`, branch `codex/portfolio-before-cinematic-prototype`).
- [x] Research — references captured across scroll positions; Codrops articles read in full (see ART_DIRECTION).
- [x] Storyboard — `docs/STORYBOARD.md`, eight keyframes, desktop + mobile, mirrored in code.
- [x] 3D foundation — procedural sculpture, camera rig, director timeline, materials, shaders, interaction.
- [x] Cinematic introduction — arrival, reveal, identity, orbit, transformation, iris passage, hall reveal.
- [x] Gallery — six exhibits, real imagery / labelled concepts, hover + tap, dolly into case studies.
- [x] About, experience, contact — Engineer atrium, Person chapter, porcelain finale with working links.
- [x] Mobile art direction — separate camera path/FOV, stacked name wall, bottom captions, verified at 5 phone sizes.
- [x] Visual polish — four review passes on rendered frames (haze/tone mapping, silhouette, separation,
      highlights, passage, compositions, dead frames, responsive overlaps).
- [x] Browser verification — `npm run verify` (57 checks) + recordings.
- [x] Durable context — `CLAUDE.md`, this checklist, `docs/ART_DIRECTION.md`.

## Final acceptance test
- [x] Opening is an original, art-directed 3D composition (the Impossible Fold, name wall, monoliths, reflective floor).
- [x] It represents Ali Haider personally — no product branding or screens before the gallery.
- [x] Real Three.js geometry is central (≈20–300k triangles per frame depending on chapter and tier).
- [x] Spatial depth: foreground monoliths, mid-ground sculpture, background name wall/piers, fog, reflections.
- [x] Deliberate materials and lighting (studio environment maps, PBR library, toe-free tone mapping).
- [x] Scroll drives camera choreography (verified camera ranges: x 13.6 m, y 8 m, z 145 m on desktop).
- [x] Camera path is not a linear Z dolly (orbit, high angle, passage, overhead, glide, mirrored finale).
- [x] The sculpture transforms meaningfully (separate → fold → iris → partitions → re-assembly).
- [x] Geometry, light and materials animate in coordinated tracks of one GSAP timeline.
- [x] At least one outstanding reveal: the iris opening into the dark hall that ignites exhibit by exhibit.
- [x] Selected Work is immersive and interactive (raycast hover/click/tap verified on desktop and mobile).
- [x] No conventional repeated cards in the experience (the static fallback uses an editorial list by design).
- [x] Intevo and Intevo Pulse are separate case studies with correct relationship and scope.
- [x] Professional history follows the resume; no invented metrics. See open questions below.
- [x] Colour system: obsidian/porcelain/titanium neutrals, aubergine, lavender and persimmon accents.
- [x] Typography: Archivo stretched display, Instrument Serif italic, Geist Mono labels.
- [x] Mobile has composed scenes and its own camera behaviour.
- [x] Touch interaction works (CDP touch swipe scrolls; tap opens an exhibit) — Chrome emulation.
- [x] Content accessible without WebGL (static portfolio; reduced motion; context loss) — verified.
- [x] No video loops in the experience (recordings are evidence files only).
- [x] Visually reviewed in a browser at 9 viewports.
- [x] Performance: adaptive tiers, distance culling, merged seams, trimmed shadow casters, lazy imagery,
      three.js excluded from the static bundle. Physical-device performance not measured.
- [x] Production build succeeds.
- [x] Project links and contact links verified in the DOM; resume PDF returns 200.
- [x] Multiple genuine refinement passes (see `docs/ART_DIRECTION.md` decisions log).

## Open questions for Ali
1. ibex end date: copy says **Jan 2026** (earlier portfolio data); the PDF resume still says "May 2023 – Present".
   Update the resume or confirm the date.
2. Intevo co-founding year is not stated anywhere verifiable, so public copy omits it.
3. `public/profile.png` appears AI-generated (Gemini watermark). A real photograph would be better.
4. TheXperto's tech stack is not on the resume, so the case study lists responsibilities, not technologies.

## Next tasks
- Test on physical iOS/Android devices (Safari WebGL2, thermal throttling, URL-bar resizing).
- Optional Blender pass: bake ambient occlusion for the Fold and export GLB (Draco) if procedural shading
  ever looks too clean; the procedural pipeline is the current source of truth.
- Remove unused legacy public assets (`public/review-screenshots/`, `public/Developer Portfolio Showcase.mp4`)
  once confirmed unneeded — they are shipped with every build.
- Consider an opt-in ambient score (off by default) only if it is composed for this piece.
- Deployment has not been done and needs Ali's permission.
