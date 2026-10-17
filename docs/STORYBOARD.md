# THE SPACE BETWEEN — Storyboard

This storyboard is the source of truth for the camera choreography. The numbers below are mirrored in
`src/experience/director/keyframes.js`. When a frame is re-tuned during visual review, both files change together.
Rendered evidence frames for each keyframe live in `docs/frames/` after `npm run verify`.

World conventions: metres, Y up, floor at `y = 0`. The visitor travels broadly toward `-Z`.

| Landmark | Position | Notes |
|---|---|---|
| The Impossible Fold (arrival) `S` | `(0, 3.4, 0)` | Creased Möbius band made of 28 thick folded plates, yawed −22°. |
| Name wall "ALI HAIDER" | `(-0.6, 4.6, -9)` | 3D type plane, deliberately occluded by the sculpture and mirrored in the floor. |
| Selected Work hall | `z = -14 … -82` | Six exhibits alternating sides at `x = ±5.6`. |
| Engineer atrium | `(-3, 0, -100)` | Floor typography and reactive light streams. |
| Final stage `F` | `(0, 3.4, -140)` | The Fold re-assembles in porcelain light. |

## Narrative in one line

An abstract idea (the Fold) is pulled apart, the visitor passes through its centre, and its plates become the
architecture of a gallery of real work. At the end the plates fly ahead and re-assemble into the idea again, now
in daylight.

## Keyframes

Progress is the single normalised scroll value `p ∈ [0, 1]`. Desktop and portrait mobile have separate
camera positions; everything else (geometry, light, materials) is shared and driven by the same `p`.

### 01 — Arrival · `p = 0.00`
- **Camera** desktop `(9.6, 1.5, 13.8)` → target `(0.4, 3.7, 0)`, FOV 34. Mobile `(5.4, 2.2, 19.5)` → `(0, 3.9, 0)`, FOV 52.
- **Composition** Low three-quarter view. The Fold sits right of centre; a foreground obsidian monolith crops the left
  edge; the giant name wall sits behind, half-hidden by the band. Floor mirrors everything.
- **Geometry** Fully assembled. Hinges at 158° (a shallow crease). Internal louvre core turning slowly.
- **Light** Darkness with a single warm key from above-left; a persimmon sweep light orbits slowly and "draws"
  across the plates. Lavender rim from behind.
- **Materials / colour** Obsidian ground, satin titanium plates, two porcelain plates, one smoked-glass plate, two
  iridescent plates. Persimmon seam pulses run along the creases.
- **Type** 3D name wall in porcelain. HTML: small "SOFTWARE ENGINEER / PRODUCT BUILDER", "Lahore — working worldwide".
- **Motion in/out** Loader fades out over the frame while the camera drifts 1 m forward. Exits by pushing in.

### 02 — Sculpture reveal · `p = 0.07`
- **Camera** `(7.2, 2.4, 10.6)` → `(0.2, 3.6, 0)`, FOV 32. Mobile `(4.2, 2.8, 16)` → `(0, 3.8, 0)`.
- **Composition** Closer; band fills two-thirds of frame. Seams visible.
- **Geometry** Louvre core begins to fan (`core.fan` 0 → 0.25).
- **Light** Sweep light completes its first pass; env intensity rises 0.6 → 1.0.
- **Type** HTML role line resolves letter-by-letter.

### 03 — Identity typography · `p = 0.14`
- **Camera** `(1.6, 3.2, 12.6)` → `(-0.2, 3.9, -3)`, FOV 30. Mobile `(0.6, 3.4, 17.5)` → `(0, 4, -3)`.
- **Composition** Near-symmetric frontal shot. The name wall reads through and around the loop's opening — the
  hero composition. Strong negative space above.
- **Type** "ALI HAIDER" is fully readable in 3D; HTML italic line "The space between an idea and a working product."
- **Exit** Camera begins its orbit left.

### 04 — Camera orbit · `p = 0.24`
- **Camera** `(-10.4, 5.4, 3.6)` → `(0, 3.3, 0)`, FOV 36. Mobile `(-9.5, 5.8, 9)` → `(0, 3.5, 0)`.
- **Composition** Profile of the band; its twist becomes legible (the "impossible" one-sided surface).
- **Geometry** `separate` 0 → 0.35: plates slide apart along the band, revealing the gaps and inner seams.
  Hinges open to 120°.
- **Light** Key cools toward titanium; lavender rim grows. Sweep light hands over to a top light.

### 05 — Geometry transformation · `p = 0.32`
- **Camera** `(-3.2, 9.4, 8.2)` → `(0, 3.2, 0)`, FOV 40. Mobile `(-2.6, 10.5, 12.5)` → `(0, 3.3, 0)`.
- **Composition** High angle looking down into the loop; the louvre core fans open like pages.
- **Geometry** `explode` 0 → 0.4: plates lift off the curve, rotate individually, and begin forming a ring around
  the opening. Hinges fold sharply to 70°.
- **Light** Seams flare persimmon; everything else darkens slightly to aim the eye at the opening.

### 06 — Passage through the structure · `p = 0.40 → 0.47`
- **Camera** `0.40`: `(0, 3.4, 7.0)` → `(0, 3.3, -12)`, FOV 48. `0.45`: `(0, 3.3, 0)` (inside the ring) FOV 58.
  Mobile identical but FOV +10.
- **Composition** Tunnel shot: the exploded plates form a rotating aperture around the lens. The core's louvres
  split up and down to open a doorway.
- **Geometry** `explode` 0.4 → 1.0, ring rotation adds ~40°.
- **Reveal** On exit the hall beyond is dark; then, in sequence, six exhibit light cones and the floor guide lines
  ignite (`hall.lights` 0 → 1 over `p = 0.46 → 0.53`). This is the surprise beat.

### 07 — Interactive gallery reveal · `p = 0.50 → 0.74`
- **Camera** `0.50`: `(0.6, 2.6, -11)` → `(2.4, 2.2, -26)`, FOV 42. Then six stops, one per exhibit, every 0.04 of
  progress from `0.53`. For an exhibit at `E = (±5.6, 2.6, z)` the camera sits at `(∓1.6, 2.4, z + 6.8)` looking
  at `E`; mobile sits at `(∓0.6, 2.5, z + 9.4)` with FOV 56.
- **Composition** Exhibit occupies the right/left two-thirds; the HTML caption takes the opposite third. Each
  exhibit is a lit image inside a titanium frame on a porcelain plinth, backed by a folded partition made from the
  Fold's plates, plus one small signature object per project.
- **Geometry** `toGallery` 0 → 1 over `0.47 → 0.56`: plates fly from the ring into partitions (staggered).
- **Interaction** Hover (desktop) and tap (touch) on an exhibit: image ripple and frame lift; click opens the case
  study with a camera dolly into the frame.

### 08 — Closing composition · `p = 0.93 → 1.00`
- Preceded by **The Engineer** (`0.76 → 0.84`, overhead of floor typography and reactive light streams) and
  **The Person** (`0.85 → 0.91`, eye-level, portrait and story overlay, the Fold re-assembling in the distance).
- **Camera** `0.95`: `(-7.2, 2.2, -127.5)` → `(0, 3.7, -140)`, FOV 33. `1.00`: `(-5.4, 1.4, -129.5)` → `(0, 3.9, -140)`.
  Mobile `(-4.2, 2.4, -122)` → `(0, 4, -140)`, FOV 52.
- **Composition** A mirror of the arrival: same three-quarter grammar from the opposite side, now in porcelain.
- **Geometry** `toFinal` 0 → 1 over `0.80 → 0.95`: plates stream past the camera and re-assemble. Hinges close
  to 165°. Core stands still.
- **Light** Environment, fog, floor and background shift from obsidian to warm porcelain `#F3F0E9`; key turns warm;
  persimmon becomes the single accent.
- **Type** "LET'S MAKE SOMETHING REMARKABLE." in obsidian; contact links beneath.

## Rhythm

| Chapter | Progress | Scroll length (desktop / mobile) |
|---|---|---|
| 01 Arrival | 0.00 – 0.18 | |
| 02 Transformation + passage | 0.18 – 0.50 | |
| 03 Selected Work | 0.50 – 0.76 | |
| 04 The Engineer | 0.76 – 0.85 | |
| 05 The Person | 0.85 – 0.92 | |
| 06 Final scene | 0.92 – 1.00 | |
| Total | | 1500 vh / 1300 vh |
