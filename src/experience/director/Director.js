import gsap from 'gsap'

/**
 * One authoritative cinematic timeline. Duration is exactly 1, so timeline time == scroll progress.
 * Every scene parameter (camera index, FOV, geometry poses, light, material and atmosphere) is a track
 * here; nothing else animates these values, which avoids ownership conflicts.
 *
 * Track format: [[progress, value], ...]; each pair becomes a fromTo tween between consecutive keys.
 */
export const TRACKS = {
  fold: [[0, 158], [0.18, 158], [0.24, 122], [0.34, 72], [0.44, 98], [0.53, 150], [0.86, 150], [0.95, 166]],
  separate: [[0, 0], [0.17, 0], [0.27, 1]],
  explode: [[0.25, 0], [0.33, 0.5], [0.395, 1]],
  iris: [[0.395, 0], [0.445, 1]],
  toGallery: [[0.465, 0], [0.565, 1]],
  toFinal: [[0.8, 0], [0.955, 1]],
  coreFan: [[0.04, 0], [0.3, 1], [0.86, 1], [0.95, 0.25]],
  coreSplit: [[0.355, 0], [0.43, 1], [0.86, 1], [0.95, 0]],
  coreTravel: [[0.84, 0], [0.95, 1]],
  sweep: [[0, 1], [0.2, 1], [0.32, 0.15], [0.86, 0.15], [0.95, 1]],
  key: [[0, 1], [0.3, 0.85], [0.4, 0.6], [0.5, 0.2], [0.86, 0.2], [0.95, 1.1]],
  rim: [[0, 0.6], [0.24, 1.1], [0.42, 0.45], [0.92, 0.7]],
  env: [[0, 0.45], [0.08, 1.0], [0.36, 0.7], [0.5, 0.85], [0.86, 0.85], [0.96, 1.3]],
  seam: [[0, 0.6], [0.3, 0.9], [0.385, 2.6], [0.46, 2.0], [0.5, 0.7], [0.95, 1.0]],
  hall: [[0.455, 0], [0.53, 1], [0.8, 1], [0.9, 0]],
  guides: [[0.455, 0], [0.6, 0.55], [0.74, 1]],
  hallTint: [[0.42, 0], [0.55, 1], [0.85, 1], [0.9, 0]],
  atrium: [[0.728, 0], [0.785, 1], [0.865, 1], [0.9, 0]],
  porcelain: [[0.85, 0], [0.955, 1]],
  stage: [[0.82, 0], [0.92, 1]],
  name: [[0, 1], [0.3, 1], [0.38, 0]],
  fog: [[0, 0.045], [0.3, 0.042], [0.42, 0.034], [0.5, 0.024], [0.86, 0.02], [0.96, 0.014]],
  exposure: [[0, 1], [0.42, 0.85], [0.5, 1], [1, 1.04]],
  flash: [[0.44, 0], [0.455, 0.12], [0.48, 0]]
}

const GALLERY = [0.5, 0.74]

export class Director {
  constructor(frames) {
    this.state = { cam: 0, fov: frames[0][3] }
    for (const [k, keys] of Object.entries(TRACKS)) this.state[k] = keys[0][1]
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'sine.inOut', immediateRender: false } })

    for (let i = 1; i < frames.length; i++) {
      const p0 = frames[i - 1][0], p1 = frames[i][0]
      const inGallery = p0 >= GALLERY[0] - 1e-6 && p1 <= GALLERY[1] + 1e-6
      tl.fromTo(this.state, { cam: i - 1, fov: frames[i - 1][3] }, { cam: i, fov: frames[i][3], duration: p1 - p0, ease: inGallery ? 'sine.inOut' : 'none' }, p0)
    }
    for (const [k, keys] of Object.entries(TRACKS)) {
      for (let i = 1; i < keys.length; i++) {
        const [t0, v0] = keys[i - 1], [t1, v1] = keys[i]
        tl.fromTo(this.state, { [k]: v0 }, { [k]: v1, duration: t1 - t0 }, t0)
      }
    }
    tl.set({}, {}, 1)
    this.timeline = tl
    this.frames = frames
  }

  seek(progress) {
    this.timeline.progress(Math.min(1, Math.max(0, progress)))
    return this.state
  }

  dispose() { this.timeline.kill() }
}
