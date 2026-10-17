import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Native scroll → normalised progress (ScrollTrigger), then frame-rate independent damping.
 * No scroll hijacking: the browser owns the scrollbar; the scene follows it with inertia.
 * Long jumps (menu navigation) are flown with a GSAP tween so the camera travels the authored path.
 */
export class ScrollController {
  constructor(track, { lambda = 4 } = {}) {
    this.track = track
    this.lambda = lambda
    this.trigger = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: s => { this.target = s.progress }
    })
    this.target = this.current = this.trigger.progress
  }

  update(dt) {
    if (this.flight) {
      if (Math.abs(this.target - this.flightEnd) > 0.02) { this.flight.kill(); this.flight = null }
      else return this.current
    }
    const k = 1 - Math.exp(-dt * this.lambda)
    this.current += (this.target - this.current) * k
    if (Math.abs(this.target - this.current) < 1e-5) this.current = this.target
    return this.current
  }

  scrollYFor(p) {
    return this.trigger.start + p * (this.trigger.end - this.trigger.start)
  }

  /** Move to progress p. `fly` animates the camera along the path; otherwise it snaps. */
  jump(p, { fly = true } = {}) {
    this.flight?.kill()
    this.flight = null
    window.scrollTo({ top: this.scrollYFor(p), behavior: 'instant' })
    this.target = p
    if (!fly) { this.current = p; return }
    const distance = Math.abs(p - this.current)
    this.flightEnd = p
    this.flight = gsap.to(this, {
      current: p,
      duration: Math.min(3.2, 1.1 + distance * 3.2),
      ease: 'power2.inOut',
      onComplete: () => { this.flight = null }
    })
  }

  refresh() { ScrollTrigger.refresh() }

  dispose() {
    this.flight?.kill()
    this.trigger.kill()
  }
}
