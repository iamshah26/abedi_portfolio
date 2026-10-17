/**
 * Adaptive rendering tiers. The experience starts at a tier chosen from the device class and steps down
 * when sustained frame rate is low. It never steps back up within a session, which avoids oscillation.
 */
export const TIERS = {
  high: { name: 'high', dpr: 1.75, bloom: true, grade: true, reflector: 0.5, shadows: true, transmission: true, dust: 520, msaa: 0 },
  medium: { name: 'medium', dpr: 1.3, bloom: true, grade: true, reflector: 0.38, shadows: true, transmission: true, dust: 380, msaa: 0 },
  low: { name: 'low', dpr: 1.0, bloom: false, grade: true, reflector: 0.28, shadows: true, transmission: false, dust: 240, msaa: 0 },
  minimal: { name: 'minimal', dpr: 0.85, bloom: false, grade: false, reflector: 0, shadows: true, transmission: false, dust: 160, msaa: 0 },
  mobile: { name: 'mobile', dpr: 1.5, bloom: false, grade: false, reflector: 0.32, shadows: false, transmission: false, dust: 160, msaa: 0, mobile: true },
  mobileLow: { name: 'mobileLow', dpr: 1.1, bloom: false, grade: false, reflector: 0, shadows: false, transmission: false, dust: 120, msaa: 0, mobile: true }
}
const NEXT = { high: 'medium', medium: 'low', low: 'minimal', mobile: 'mobileLow', mobileLow: null, minimal: null }

/** Optional URL overrides for diagnostics, e.g. ?quality=high&bloom=0&msaa=0 */
function overrides(tier, params) {
  for (const k of ['bloom', 'grade', 'shadows', 'transmission']) if (params.has(k)) tier[k] = params.get(k) === '1'
  for (const k of ['msaa', 'dpr', 'reflector']) if (params.has(k)) tier[k] = +params.get(k)
  return tier
}

export function initialTier() {
  const params = new URLSearchParams(location.search)
  const q = params.get('quality')
  if (q && TIERS[q]) return overrides({ ...TIERS[q], locked: true }, params)
  const coarse = matchMedia('(pointer: coarse)').matches
  const small = Math.min(innerWidth, innerHeight) < 820
  return { ...TIERS[coarse && small ? 'mobile' : small ? 'medium' : 'high'] }
}

export class PerformanceManager {
  constructor(tier, onChange) {
    this.tier = tier
    this.onChange = onChange
    this.frames = 0
    this.elapsed = 0
    this.warmup = 2.5
    this.low = 0
    this.cooldown = 0
    this.fps = 60
    this.history = []
  }

  sample(dt) {
    if (document.hidden) return
    if (this.warmup > 0) { this.warmup -= dt; return }
    this.frames++
    this.elapsed += dt
    this.cooldown = Math.max(0, this.cooldown - dt)
    if (this.elapsed < 1.5) return
    this.fps = Math.round(this.frames / this.elapsed)
    this.history.push(this.fps)
    if (this.history.length > 40) this.history.shift()
    this.frames = 0
    this.elapsed = 0
    if (this.tier.locked || this.cooldown > 0) return
    this.low = this.fps < 42 ? this.low + 1 : 0
    if (this.low >= 2) {
      const next = NEXT[this.tier.name]
      if (next) {
        this.tier = { ...TIERS[next] }
        this.low = 0
        this.cooldown = 3
        this.onChange(this.tier)
      }
    }
  }
}
