import { Raycaster, Vector2 } from 'three'

/**
 * Pointer and touch input. Hover is evaluated once per frame (desktop only); taps and clicks raycast
 * immediately. Which objects are interactive depends on the current chapter.
 */
export class Interaction {
  constructor(canvas, camera, { onHover, onSelect, onPointer }) {
    this.canvas = canvas
    this.camera = camera
    this.ray = new Raycaster()
    this.ndc = new Vector2()
    this.dirty = false
    this.inside = false
    this.targets = []
    this.hit = null
    this.enabled = true
    this.onHover = onHover
    this.onSelect = onSelect
    this.onPointer = onPointer
    this.finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches

    this.move = e => {
      this.setNdc(e)
      this.inside = true
      this.dirty = true
      onPointer?.(this.ndc)
    }
    this.leave = () => { this.inside = false; this.dirty = true; onPointer?.(new Vector2()) }
    this.click = e => {
      if (!this.enabled) return
      this.setNdc(e)
      const hit = this.cast()
      if (hit) onSelect(hit)
    }
    window.addEventListener('pointermove', this.move, { passive: true })
    document.addEventListener('pointerleave', this.leave)
    canvas.addEventListener('click', this.click)
  }

  setNdc(e) {
    this.ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1)
  }

  setTargets(list) { this.targets = list }

  cast() {
    if (!this.targets.length) return null
    this.ray.setFromCamera(this.ndc, this.camera)
    const hits = this.ray.intersectObjects(this.targets, false)
    return hits[0] || null
  }

  update() {
    if (!this.finePointer || !this.dirty) return
    this.dirty = false
    const hit = this.enabled && this.inside ? this.cast() : null
    this.canvas.style.cursor = hit ? 'pointer' : ''
    this.onHover(hit)
  }

  dispose() {
    window.removeEventListener('pointermove', this.move)
    document.removeEventListener('pointerleave', this.leave)
    this.canvas.removeEventListener('click', this.click)
  }
}
