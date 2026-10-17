# Art direction and design decisions

## Research outcome

References studied in a real browser (scripted captures across scroll positions) and by reading the
articles' full text: drop.peachworlds.com, itomdev.com, bruno-simon.com (concept), the Codrops pieces on
Aurel's Grand Theater (Vue + Three + GSAP + Blender), cinematic GSAP scroll, the Blender camera-path gallery,
and "More than a portfolio". Nothing from them is reused — no geometry, textures, branding or copy.

| | What it is | What it feels like |
|---|---|---|
| 1. Webpage + CSS scroll animation | Document flow; elements fade/slide as they enter | Reading a page |
| 2. Webpage + decorative Three.js | A canvas behind or beside sections; scroll nudges an object | A page with a screensaver |
| 3. Scroll-driven WebGL environment | The canvas *is* the page; scroll moves a camera through authored space; every scene has foreground, midground, background and its own light; type is placed relative to 3D composition | Being somewhere |

What made the references work, and what we took as principles:
- **One focal object, restrained palette, darkness as material** (Drop): a single lit form in a black void;
  type partially occluded by the object; foreground framing forms (rocks) for depth; reflective ground.
- **Camera as narrator** (Codrops camera path / cinematic GSAP): separate position and look-target curves,
  one scrubbed timeline, dwell at compositions, accelerate between them.
- **World ↔ document transitions** (Aurel): readable project pages are allowed, but entering them must be a
  camera move, not a page swap.
- **Discipline over effects** (Something to Say): culling, tiers, instancing, compressed assets; nothing that
  costs frames without earning the image.

## Concept

**THE SPACE BETWEEN.** Ali's work happens between an abstract idea and a shipped product. The installation
makes that literal: an impossible, one-sided folded form is taken apart, the visitor passes through its
centre, and its plates become the architecture that holds the real work.

## The Impossible Fold
- **Why a Möbius band:** an endless, one-sided surface is a recognisable sculptural silhouette (in the
  lineage of Max Bill's *Endless Ribbon*) that is neither a sphere/torus nor a particle cloud. The twist reads
  differently from every camera angle, which rewards an orbiting camera.
- **Why plates:** a continuous ribbon was tried in the previous prototype and read as "wireframe ribbons".
  Thick plates with real hinges, polished edges and precision cuts read as fabricated objects. Plates also
  give the transformation a vocabulary: slide apart, fold, gather into an iris, become partitions.
- **Construction:** superelliptic spine (n = 2.25) with a 1.25 m saddle; width 1.45–2.2 m; 28 plates; each
  plate is two hinged leaves meeting at a crease (dihedral 158° at rest, 72° at peak fold); slots on every
  fourth plate, a window on others; walls rendered as polished edges.
- **Core:** an 11-louvre twisted stack that fans open and splits to form a doorway during the passage.

## Materials
Satin titanium (brushed roughness map), graphite titanium, porcelain (clearcoat, faint lavender sheen),
smoked glass (transmission on high tier; translucent fallback elsewhere), iridescent film (kept to a narrow
thickness range so it shifts lavender/bronze, never green), polished edges, obsidian stone. The premium look
comes from roughness contrast and environment reflections from a designed studio environment (softboxes:
warm key strip, lavender strip, titanium strip, low persimmon kicker) — not from emissive glow.

## Light and atmosphere
- Toe-free Khronos Neutral tone mapping (stock Neutral crushed obsidian into purple — measured, then fixed).
- Arrival: warm key spot, orbiting persimmon sweep light, lavender rim, soft stage beam, dense fog that
  hides the hall. Passage: seams flare, key drops. Hall: lights ignite in sequence (cones, follow spot, floor
  guide lines). Finale: environment, fog, sky, floor and obsidian materials shift to porcelain; a second,
  bright studio environment takes over.
- Bloom is high-threshold and weak; grain, vignette and slight lateral aberration in a display-referred grade.

## Typography
Archivo variable at 125% width and light weights for the name and statements (wide, architectural);
Instrument Serif italic for the human counter-voice ("Abstract", "first.", "founder."); Geist Mono for
indices and labels. The name lives in 3D (occluded and mirrored by the scene); HTML type carries meaning
and accessibility.

## Gallery
Each exhibit: real screenshot (or labelled conceptual illustration) in a graphite frame, porcelain plinth
with a printed label, a folded triptych partition made of the Fold's plates, an overhead beam, and one
signature object (channel panes, topographic peak, waveform, folded linen, iridescent keystone, flight arc).
Captions sit on the opposite third of the frame on desktop and at the bottom on mobile.

## Decisions log
- Hash routes (`#/work/<id>`) instead of vue-router: deep links survive any static host; no dependency.
- No Lenis: native scroll + engine damping keeps one source of truth and avoids double smoothing.
- No Blender on this machine → all geometry procedural (`foldGeometry.js`); no GLTF/Draco/KTX2 needed.
- FXAA instead of MSAA in the composer (MSAA + bloom rendered black on ANGLE/D3D11).
- Reduced motion and no-WebGL get a designed static editorial page, not a stripped canvas.
- Static mode never downloads three.js (navigation constants split from the engine).
