# THE SPACE BETWEEN — Storyboard

Source of truth for camera choreography. Numbers are mirrored in `src/experience/director/keyframes.js`
(camera) and `src/experience/director/Director.js` (every other track). Re-tune both together; place
landmarks numerically with `node scripts/frame-solver.mjs` before checking frames by eye.

Rendered evidence for every keyframe: `artifacts/final/frames/` (desktop + mobile at 0/15/30/45/60/75/90/100%),
`artifacts/final/viewports/`, and full-sequence recordings `artifacts/final/desktop-journey.webm` and
`mobile-journey.webm` (regenerate with `npm run verify`, `npm run record:desktop`, `npm run record:mobile`).

World conventions: metres, Y up, floor at `y = 0`; the visitor travels broadly toward `-Z`.

| Landmark | Position | Notes |
|---|---|---|
| The Impossible Fold `S` | `(0, 3.4, 0)` | Creased Möbius band of 28 folded plates, yaw −22°, roll 5°. |
| Name wall (landscape) | `(-6, 10.2, -11)`, yaw 0.25, 18 × 2.81 m | Above the sculpture's crown; the band overlaps the lower third of the letters at arrival. Unfogged, mirrored by the floor. |
| Name wall (portrait) | `(0.5, 12.2, -10.5)`, 9.4 × 6.43 m | "ALI / HAIDER" stacked for mobile. |
| Iris plane | `z = -1.2` | Plates gather into an aperture (r 2.75 → 6.6 m) the camera flies through. |
| Selected Work hall | `z = -14 … -82` | Six exhibits alternating `x = ±5.6`, every 10 m from `z = -24`. |
| Engineer atrium | `(-3, 0, -100)` | Type slabs and reactive light streams. |
| Final stage `F` | `(0, 3.4, -140)` | The Fold re-assembles, yaw 38°, in porcelain light. |

## Narrative in one line

An abstract idea is pulled apart; the visitor passes through an iris made of its plates; the plates become the
architecture that holds the real work; then they fly ahead and re-assemble the idea in daylight.

## Keyframes (desktop camera → target, vertical FOV · mobile)

### 01 — Arrival · `p = 0.00`
- Desktop `(5, 1.1, 18) → (-3.2, 4.8, -2)`, 32°. Mobile `(3.5, 1.6, 21) → (0.2, 5.2, -1)`, 52°.
- Low three-quarter shot. Sculpture at ~62% of frame width; name wall spans 23–85% across the upper third
  and is crossed by the band's crown. Obsidian monolith frames the left; hall piers hidden by fog.
- Light: warm key from above-left, orbiting persimmon sweep, lavender rim, soft stage beam, floor mirror.
- Type: HTML "SOFTWARE ENGINEER / PRODUCT BUILDER", letter-by-letter after the loader curtain lifts.

### 02 — Sculpture reveal · `p = 0.07`
- Desktop `(3.2, 1.6, 15.5) → (-2.6, 4.8, -2)`, 32°. Mobile `(2.6, 2.2, 19) → (0.1, 5, -1)`.
- Push-in; louvre core begins to fan; environment light rises 0.45 → 1.0.

### 03 — Identity typography · `p = 0.14`
- Desktop `(-3.2, 3.4, 17.5) → (-3.6, 5.2, -4)`, 34°. Mobile `(0.4, 3.0, 20) → (0, 5.4, -3)`, 50°.
- The name reads cleanly above the sculpture; italic line "The space between an idea and a working product."

### 04 — Camera orbit · `p = 0.24`
- Desktop `(-10.4, 5.4, 3.6) → (0, 3.3, 0)`, 36°. Mobile `(-12.5, 5.8, 9) → (0, 3.5, 0)`, 52°.
- Profile of the twist. `separate` 0 → 1 over 0.17–0.27: plates lift off the spine evenly and unwind as a
  helix (an exploded diagram, not debris). Hinges open to 122°. Kinetic line: "*Abstract* ideas,".

### 05 — Geometry transformation · `p = 0.32`
- Desktop `(-3.2, 9.4, 8.2) → (0, 3.2, 0)`, 40°. Mobile `(-2.6, 10.5, 12.5) → (0, 3.3, 0)`, 54°.
- High angle into the loop; hinges fold to 72°; `explode` gathers plates toward the iris. "folded into structure,".

### 06 — Passage through the structure · `p = 0.38 → 0.47`
- `0.40`: `(0, 3.4, 7) → (0, 3.3, -12)`, 48°. `0.45`: `(0, 3.3, 0)`, 58° (mobile +10°).
- The iris is complete at 0.395, seams flare persimmon, the core's louvres split into a doorway, then the
  iris opens and rotates (`iris` 0.395 → 0.445) as the camera crosses it. "*made into* working products."
- Reveal: beyond the iris the hall is dark; "SELECTED WORK" resolves its letter-spacing; exhibit beams and
  floor guide lines ignite in sequence (`hall` 0.455 → 0.53).

### 07 — Interactive gallery · `p = 0.50 → 0.74`
- `0.50`: `(0.6, 2.6, -11) → (2.4, 2.2, -26)`, 44°. Exhibit stops at `0.53 + 0.04·i`: desktop camera at
  `(∓1.6, 2.4, z + 6.8)` aimed 1.6 m to the path side of the exhibit (artwork on two thirds, caption on the
  other third); mobile at `(∓0.6, 2.6, z + 9.6)` aimed low so the artwork sits in the upper half, caption below.
- Plates fly from the iris into triptych partitions and a coffered ceiling (`toGallery` 0.465 → 0.565).
- Interaction: hover ripple + chromatic split, tap/click dollies into the frame and opens the case study.

### Bridge — The Engineer `0.755 → 0.85` and The Person `0.85 → 0.925`
- `0.755` `(1.6, 5.2, -82) → (-3, 0.6, -97)`; `0.79` overhead `(-3, 19, -91) → (-3, 0, -100.5)` (mobile
  `(-3, 28, -88) → (-3, 0, -95.5)`); `0.83` glide `(-11, 2, -97) → (2, 0.8, -106)`.
- Slabs rise from the floor (`atrium` 0.728 → 0.785) and streams draw in.
- Person: `0.865` `(1.5, 2.3, -110) → (0, 3.4, -140)`; the world turns porcelain (0.815 → 0.9) while the plates
  stream past the lens toward the final stage (`toFinal` 0.8 → 0.955).

### 08 — Closing composition · `p = 0.95 → 1.00`
- Desktop `0.95` `(-10.2, 2.4, -125) → (-4.6, 3.8, -139)`; `1.0` `(-8.6, 1.5, -126.6) → (-4.3, 4.0, -139)`, 33°.
  Mobile `(-4.6, 3.0, -118) → (0, 0.6, -140)` → `(-3.8, 2.4, -119.5) → (0, 0.8, -140)`, 52°.
- A mirror of the arrival grammar, now in porcelain: sculpture on the right third (desktop) or upper half
  (mobile); "LET'S MAKE SOMETHING REMARKABLE." word by word; email, LinkedIn, GitHub, resume.

## Rhythm

| Chapter | Progress | Scroll length |
|---|---|---|
| 01 Arrival | 0.00 – 0.18 | desktop track 1500 vh, mobile 1300 vh |
| 02 Transformation + passage | 0.18 – 0.47 | |
| 03 Selected Work | 0.47 – 0.755 | |
| 04 The Engineer | 0.755 – 0.85 | |
| 05 The Person | 0.85 – 0.925 | |
| 06 Final scene | 0.925 – 1.00 | |
