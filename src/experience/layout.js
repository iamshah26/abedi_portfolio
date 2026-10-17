import { Vector3 } from 'three'
import { exhibitSide } from './navigation.js'

/** World landmarks shared by geometry, camera keyframes and the storyboard (docs/STORYBOARD.md). */
export const SCULPTURE_ORIGIN = new Vector3(0, 3.4, 0)
export const FINAL_ORIGIN = new Vector3(0, 3.4, -140)
export const NAME_WALL = new Vector3(-6, 8.2, -11)
export const NAME_WALL_YAW = 0.25
export const NAME_WALL_MOBILE = new Vector3(0.5, 12.2, -10.5)
export const ATRIUM = new Vector3(-3, 0, -100)

export const EXHIBIT_Y = 2.6
export const EXHIBIT_SIZE = { w: 4.5, h: 3.0 }

/** Six exhibits alternate sides of the hall. side = +1 means right of the visitor (x > 0). */
export const EXHIBITS = Array.from({ length: 6 }, (_, i) => {
  const side = exhibitSide(i)
  return { side, position: new Vector3(side * 5.6, EXHIBIT_Y, -24 - i * 10) }
})

export { exhibitProgress, CHAPTERS, NAV_TARGETS, chapterAt } from './navigation.js'
