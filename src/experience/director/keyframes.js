import { EXHIBITS, exhibitProgress } from '../layout.js'

/**
 * Authored camera keyframes. Mirrors docs/STORYBOARD.md.
 * Each entry: [progress, position, target, verticalFov].
 */
const desktopBase = [
  [0.0, [5, 1.1, 18], [-3.2, 4.8, -2], 32],
  [0.07, [3.2, 1.6, 15.5], [-2.6, 4.8, -2], 32],
  [0.14, [-3.2, 3.4, 17.5], [-3.6, 5.2, -4], 34],
  [0.18, [-5.6, 3.7, 16.2], [-3.4, 4.8, -3], 34],
  [0.24, [-10.4, 5.4, 3.6], [0, 3.3, 0], 36],
  [0.32, [-3.2, 9.4, 8.2], [0, 3.2, 0], 40],
  [0.4, [0, 3.4, 7.0], [0, 3.3, -12], 48],
  [0.45, [0, 3.3, 0], [0, 3.1, -14], 58],
  [0.5, [0.6, 2.6, -11], [2.4, 2.2, -26], 44]
]
const desktopTail = [
  [0.755, [1.6, 5.2, -82], [-3, 0.6, -97], 44],
  [0.79, [-3, 19, -91], [-3, 0, -100.5], 42],
  [0.83, [-11, 2.0, -97], [2, 0.8, -106], 40],
  [0.865, [1.5, 2.3, -110], [0, 3.4, -140], 34],
  [0.91, [3.8, 2.6, -118], [0, 3.6, -140], 32],
  [0.95, [-10.2, 2.4, -125], [-4.6, 3.8, -139], 33],
  [1.0, [-8.6, 1.5, -126.6], [-4.3, 4.0, -139], 33]
]

const mobileBase = [
  [0.0, [3.5, 1.6, 21], [0.2, 5.2, -1], 52],
  [0.07, [2.6, 2.2, 19], [0.1, 5.0, -1], 51],
  [0.14, [0.4, 3.0, 20], [0, 5.4, -3], 50],
  [0.18, [-1.6, 3.4, 19], [0, 5.0, -3], 50],
  [0.24, [-12.5, 5.8, 9], [0, 3.5, 0], 52],
  [0.32, [-2.6, 10.5, 12.5], [0, 3.3, 0], 54],
  [0.4, [0, 3.4, 8.5], [0, 3.3, -12], 60],
  [0.45, [0, 3.3, 0], [0, 3.1, -14], 68],
  [0.5, [0.3, 2.8, -10], [1.2, 2.4, -26], 58]
]
const mobileTail = [
  [0.755, [0.8, 7, -80], [-3, 0.4, -96], 58],
  [0.79, [-3, 28, -88], [-3, 0, -95.5], 56],
  [0.83, [-9, 2.6, -95], [0, 0.8, -106], 56],
  [0.865, [1, 2.4, -108], [0, 3.6, -140], 50],
  [0.91, [2.6, 2.8, -114], [0, 3.8, -140], 50],
  [0.95, [-4.6, 3.0, -118], [0, 0.6, -140], 52],
  [1.0, [-3.8, 2.4, -119.5], [0, 0.8, -140], 52]
]

function galleryStops(mobile) {
  return EXHIBITS.map(({ side, position: e }, i) => {
    const p = exhibitProgress(i)
    if (mobile) return [p, [-side * 0.6, 2.6, e.z + 9.6], [e.x * 0.9, 2.05, e.z], 56]
    return [p, [-side * 1.6, 2.4, e.z + 6.8], [e.x - side * 1.6, 2.5, e.z], 40]
  })
}

export const keyframes = {
  desktop: [...desktopBase, ...galleryStops(false), ...desktopTail],
  mobile: [...mobileBase, ...galleryStops(true), ...mobileTail]
}

/** Camera pose that fills the frame with an exhibit, used by the case-study transition. */
export function focusPose(exhibit, mobile) {
  const { side, position: e } = exhibit
  const dist = mobile ? 6.2 : 4.4
  // Exhibits are rotated to face their desktop viewpoint; approach along that normal.
  const view = [-side * 1.6 - e.x, 2.4 - e.y, 6.8]
  const len = Math.hypot(...view)
  const pos = [e.x + (view[0] / len) * dist, e.y + 0.05, e.z + (view[2] / len) * dist]
  return { pos, target: [e.x, e.y, e.z], fov: mobile ? 50 : 38 }
}
