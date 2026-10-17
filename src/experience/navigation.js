/**
 * Narrative timing shared by the DOM and the engine. Kept free of three.js so the static fallback and
 * overlays never pull the WebGL bundle.
 */
export const EXHIBIT_COUNT = 6
/** side = +1: exhibit stands right of the visitor (caption goes left); -1: the reverse. */
export const exhibitSide = i => (i % 2 === 0 ? 1 : -1)
/** Progress at which the camera rests in front of exhibit i. */
export const exhibitProgress = i => 0.53 + i * 0.04

export const CHAPTERS = [
  { id: 'arrival', label: 'Arrival', index: '01', start: 0.0 },
  { id: 'transformation', label: 'Transformation', index: '02', start: 0.18 },
  { id: 'work', label: 'Selected Work', index: '03', start: 0.47 },
  { id: 'engineer', label: 'The Engineer', index: '04', start: 0.755 },
  { id: 'person', label: 'The Person', index: '05', start: 0.85 },
  { id: 'contact', label: 'Final Scene', index: '06', start: 0.925 }
]

/** Progress targets used by navigation. */
export const NAV_TARGETS = { journey: 0, work: 0.515, experience: 0.8, about: 0.885, contact: 1 }

export const chapterAt = p => {
  let c = CHAPTERS[0]
  for (const ch of CHAPTERS) if (p >= ch.start - 1e-4) c = ch
  return c
}

export function webglAvailable() {
  try {
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    return false
  }
}
