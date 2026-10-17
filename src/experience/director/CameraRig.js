import { CatmullRomCurve3, MathUtils, Vector2, Vector3 } from 'three'

/**
 * Samples two authored centripetal Catmull–Rom curves (position and look target) by the director's
 * camera index. Adds damped pointer parallax and a slow breath, and blends into a focus pose for the
 * case-study transition.
 */
export class CameraRig {
  constructor(camera) {
    this.camera = camera
    this.pos = new Vector3()
    this.target = new Vector3()
    this.pointer = new Vector2()
    this.parallax = new Vector2()
    this.focus = 0
    this.focusPose = null
    this._f = new Vector3(); this._r = new Vector3(); this._u = new Vector3(); this._fp = new Vector3(); this._ft = new Vector3()
    this.up = new Vector3(0, 1, 0)
  }

  setFrames(frames) {
    const v = i => frames.map(f => new Vector3(...f[i]))
    this.posCurve = new CatmullRomCurve3(v(1), false, 'centripetal')
    this.targetCurve = new CatmullRomCurve3(v(2), false, 'centripetal')
    this.n = frames.length
  }

  update(st, dt, time, { parallax = true } = {}) {
    const u = MathUtils.clamp(st.cam / (this.n - 1), 0, 1)
    this.posCurve.getPoint(u, this.pos)
    this.targetCurve.getPoint(u, this.target)
    let fov = st.fov
    // Landscape compositions are authored at 16:10. On narrower landscape screens (4:3, split views) widen
    // the vertical FOV so the horizontal coverage, and therefore caption/exhibit separation, is preserved.
    const aspect = this.camera.aspect
    if (aspect >= 0.9 && aspect < 1.6) fov = MathUtils.radToDeg(2 * Math.atan((Math.tan(MathUtils.degToRad(fov) / 2) * 1.6) / aspect))

    if (this.focus > 0 && this.focusPose) {
      const f = this.focus
      this.pos.lerp(this._fp.fromArray(this.focusPose.pos), f)
      this.target.lerp(this._ft.fromArray(this.focusPose.target), f)
      fov = MathUtils.lerp(fov, this.focusPose.fov * (aspect >= 0.9 && aspect < 1.6 ? 1.6 / aspect : 1), f)
    }

    const k = 1 - Math.exp(-dt * 2.2)
    this.parallax.x += ((parallax ? this.pointer.x : 0) - this.parallax.x) * k
    this.parallax.y += ((parallax ? this.pointer.y : 0) - this.parallax.y) * k
    const fwd = this._f.subVectors(this.target, this.pos).normalize()
    const right = this._r.crossVectors(fwd, this.up).normalize()
    const up = this._u.crossVectors(right, fwd).normalize()
    const calm = 1 - this.focus
    this.pos.addScaledVector(right, this.parallax.x * 0.42 * calm)
    this.pos.addScaledVector(up, (this.parallax.y * 0.24 + Math.sin(time * 0.5) * 0.045) * calm)

    this.camera.position.copy(this.pos)
    this.camera.lookAt(this.target)
    if (Math.abs(this.camera.fov - fov) > 1e-3) {
      this.camera.fov = fov
      this.camera.updateProjectionMatrix()
    }
  }
}
