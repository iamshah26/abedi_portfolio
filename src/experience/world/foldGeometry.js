import { BufferGeometry, Float32BufferAttribute, Matrix4, Quaternion, Vector3 } from 'three'

/**
 * The Fold's spine: a superelliptic loop with a saddle in depth. The band's width direction turns half a
 * revolution along the loop, which makes the surface one-sided (a Möbius band).
 */
export class BandCurve {
  constructor({ a = 3.6, b = 2.75, n = 2.25, saddle = 1.25, twist0 = 0.9, samples = 2048 } = {}) {
    Object.assign(this, { a, b, n, saddle, twist0 })
    this.lengths = new Float32Array(samples + 1)
    this.samples = samples
    let prev = this.raw(0), total = 0
    this.lengths[0] = 0
    for (let i = 1; i <= samples; i++) {
      const p = this.raw((i / samples) * Math.PI * 2)
      total += p.distanceTo(prev)
      this.lengths[i] = total
      prev = p
    }
    this.total = total
  }

  raw(th, out = new Vector3()) {
    const { a, b, n, saddle } = this
    const s = Math.sin(th), c = Math.cos(th)
    const e = 2 / n
    return out.set(
      a * Math.sign(s) * Math.pow(Math.abs(s), e),
      b * Math.sign(c) * Math.pow(Math.abs(c), e),
      saddle * Math.sin(2 * th)
    )
  }

  /** Arc-length parameter s ∈ [0,1) → angle θ. */
  theta(s) {
    s = ((s % 1) + 1) % 1
    const target = s * this.total
    let lo = 0, hi = this.samples
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (this.lengths[mid] < target) lo = mid + 1
      else hi = mid
    }
    const i = Math.max(1, lo)
    const l0 = this.lengths[i - 1], l1 = this.lengths[i]
    const f = l1 > l0 ? (target - l0) / (l1 - l0) : 0
    return ((i - 1 + f) / this.samples) * Math.PI * 2
  }

  width(th) {
    return 1.45 + 0.75 * (0.5 + 0.5 * Math.cos(th + 0.6))
  }

  /** Orthonormal frame at s: T tangent, W across the band, D surface normal (thickness). */
  frame(s) {
    const th = this.theta(s)
    const p = this.raw(th)
    const T = this.raw(th + 1e-3).sub(this.raw(th - 1e-3)).normalize()
    const radial = new Vector3(p.x, p.y, 0).normalize()
    const N0 = radial.sub(T.clone().multiplyScalar(radial.dot(T))).normalize()
    const B0 = new Vector3().crossVectors(T, N0).normalize()
    const phi = th / 2 + this.twist0
    const W = N0.clone().multiplyScalar(Math.cos(phi)).add(B0.multiplyScalar(Math.sin(phi))).normalize()
    const D = new Vector3().crossVectors(T, W).normalize()
    return { p, T, W, D, th, width: this.width(th), radial: new Vector3(p.x, p.y, 0).normalize() }
  }
}

/**
 * Thick, curved leaf (half a plate) between s0..s1 on one side of the crease, in the local frame of
 * the plate centre. Cells listed in `holes` are cut out cleanly with inner walls (precision openings).
 * Group 0 = faces, group 1 = walls (rendered as polished edges).
 */
export function buildLeaf(curve, s0, s1, side, frame0, { nu = 18, nv = 7, thickness = 0.11, crease = 0.014, holes = null } = {}) {
  const R = new Matrix4().makeBasis(frame0.T, frame0.W, frame0.D)
  const Rinv = R.clone().invert()
  const O = frame0.p
  const grid = []
  const normals = []
  for (let u = 0; u <= nu; u++) {
    const s = s0 + ((s1 - s0) * u) / nu
    const f = curve.frame(s)
    const half = f.width / 2
    const col = [], ncol = []
    for (let v = 0; v <= nv; v++) {
      const w = side * (crease + (half - crease) * (v / nv))
      const base = f.p.clone().addScaledVector(f.W, w)
      const top = base.clone().addScaledVector(f.D, thickness / 2).sub(O).applyMatrix4(Rinv)
      const bot = base.clone().addScaledVector(f.D, -thickness / 2).sub(O).applyMatrix4(Rinv)
      col.push([top, bot])
      ncol.push(f.D.clone().applyMatrix4(Rinv).normalize())
    }
    grid.push(col)
    normals.push(ncol)
  }
  const kept = (u, v) => u >= 0 && v >= 0 && u < nu && v < nv && !(holes && holes(u, v, nu, nv))

  const pos = [], nor = [], uv = []
  const lenScale = (curve.total * (s1 - s0)) / 1.4
  const tri = (a, b, c, na, nb, nc, ua, ub, uc) => {
    pos.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z)
    nor.push(na.x, na.y, na.z, nb.x, nb.y, nb.z, nc.x, nc.y, nc.z)
    uv.push(...ua, ...ub, ...uc)
  }
  const e1 = new Vector3(), e2 = new Vector3(), fn = new Vector3()
  const quad = (a, b, c, d, na, nb, nc, nd, ua, ub, uc, ud, desired) => {
    fn.crossVectors(e1.subVectors(b, a), e2.subVectors(c, a))
    if (fn.dot(desired) < 0) {
      tri(a, c, b, na, nc, nb, ua, uc, ub)
      tri(a, d, c, na, nd, nc, ua, ud, uc)
    } else {
      tri(a, b, c, na, nb, nc, ua, ub, uc)
      tri(a, c, d, na, nc, nd, ua, uc, ud)
    }
  }
  const U = (u, v) => [(u / nu) * lenScale, (v / nv) * 0.6]

  // Faces
  for (let u = 0; u < nu; u++) for (let v = 0; v < nv; v++) {
    if (!kept(u, v)) continue
    for (const layer of [0, 1]) {
      const sgn = layer === 0 ? 1 : -1
      const p = (uu, vv) => grid[uu][vv][layer]
      const n = (uu, vv) => normals[uu][vv].clone().multiplyScalar(sgn)
      quad(p(u, v), p(u + 1, v), p(u + 1, v + 1), p(u, v + 1),
        n(u, v), n(u + 1, v), n(u + 1, v + 1), n(u, v + 1),
        U(u, v), U(u + 1, v), U(u + 1, v + 1), U(u, v + 1), n(u, v))
    }
  }
  const faceCount = pos.length / 3

  // Walls on every boundary edge of the kept region (outer rim and hole rims)
  const centre = (u, v) => grid[u][v][0].clone().add(grid[u + 1][v + 1][0]).multiplyScalar(0.5)
  const edges = [
    [0, -1, (u, v) => [[u, v], [u + 1, v]]],
    [0, 1, (u, v) => [[u, v + 1], [u + 1, v + 1]]],
    [-1, 0, (u, v) => [[u, v], [u, v + 1]]],
    [1, 0, (u, v) => [[u + 1, v], [u + 1, v + 1]]]
  ]
  for (let u = 0; u < nu; u++) for (let v = 0; v < nv; v++) {
    if (!kept(u, v)) continue
    for (const [du, dv, get] of edges) {
      if (kept(u + du, v + dv)) continue
      const [[ua, va], [ub, vb]] = get(u, v)
      const a = grid[ua][va][0], b = grid[ub][vb][0], c = grid[ub][vb][1], d = grid[ua][va][1]
      const mid = a.clone().add(b).multiplyScalar(0.5)
      const out = mid.sub(centre(u, v)).normalize()
      quad(a, b, c, d, out, out, out, out, [0, 0], [1, 0], [1, 0.1], [0, 0.1], out)
    }
  }

  const g = new BufferGeometry()
  g.setAttribute('position', new Float32BufferAttribute(pos, 3))
  g.setAttribute('normal', new Float32BufferAttribute(nor, 3))
  g.setAttribute('uv', new Float32BufferAttribute(uv, 2))
  g.addGroup(0, faceCount, 0)
  g.addGroup(faceCount, pos.length / 3 - faceCount, 1)
  g.computeBoundingSphere()
  return g
}

export const quatFromBasis = (x, y, z) => new Quaternion().setFromRotationMatrix(new Matrix4().makeBasis(x, y, z))
