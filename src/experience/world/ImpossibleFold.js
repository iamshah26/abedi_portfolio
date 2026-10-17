import {
  BufferAttribute, CatmullRomCurve3, CylinderGeometry, Euler, Group, MathUtils, Matrix4, Mesh,
  MeshBasicMaterial, Object3D, Quaternion, TubeGeometry, Vector3
} from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { BandCurve, buildLeaf, quatFromBasis } from './foldGeometry.js'
import { seamMaterial } from '../materials/shaders.js'
import { EXHIBITS, EXHIBIT_Y, FINAL_ORIGIN, SCULPTURE_ORIGIN } from '../layout.js'
import { focusYaw } from './exhibitFrame.js'

const N = 28
const IRIS_Z = SCULPTURE_ORIGIN.z - 1.2
const MATERIAL_PATTERN = ['ti', 'ti', 'gr', 'po', 'ti', 'gl', 'ti', 'ir', 'gr', 'ti', 'po', 'ti', 'ti', 'gr', 'ti', 'po', 'gl', 'ti', 'ir', 'gr', 'ti', 'ti', 'po', 'ti', 'gr', 'ti', 'ti', 'gl']
const clamp01 = x => Math.min(1, Math.max(0, x))
const ease = t => t * t * (3 - 2 * t)
const stagger = (t, d, w) => ease(clamp01((t - d * (1 - w)) / w))

/** Precision openings: long slots or a single window, cut on grid lines so edges stay crisp. */
const slots = (u, v, nu, nv) => v >= 2 && v <= nv - 3 && [3, 4, 8, 9, 13, 14].includes(u)
const windowCut = (u, v, nu, nv) => v >= 2 && v <= nv - 3 && u >= 5 && u <= nu - 6

/**
 * THE IMPOSSIBLE FOLD — the portfolio's signature sculpture.
 * 28 folded plates on a Möbius band. Each plate has four authored poses:
 *   P0 assembled at the arrival, P1 exploded into a tunnel the camera passes through,
 *   P2 gallery architecture (partitions behind exhibits, ceiling fragments), P3 re-assembled at the finale.
 */
export class ImpossibleFold {
  constructor(materials, { quality = 'high' } = {}) {
    this.materials = materials
    this.group = new Group()
    this.group.name = 'impossible-fold'
    this.curve = new BandCurve()
    this.seam = seamMaterial()
    this.plates = []
    this.interactive = []
    this.hoverIndex = -1
    this.ripple = 0
    const res = quality === 'mobile' ? { nu: 12, nv: 5 } : { nu: 18, nv: 7 }

    const rootS = new Matrix4().compose(SCULPTURE_ORIGIN, new Quaternion().setFromEuler(new Euler(0, MathUtils.degToRad(-22), MathUtils.degToRad(5))), new Vector3(1, 1, 1))
    const rootF = new Matrix4().compose(FINAL_ORIGIN, new Quaternion().setFromEuler(new Euler(MathUtils.degToRad(-6), MathUtils.degToRad(38), MathUtils.degToRad(-4))), new Vector3(1, 1, 1))
    const qS = new Quaternion().setFromRotationMatrix(rootS)
    const qF = new Quaternion().setFromRotationMatrix(rootF)
    const gap = 0.045

    for (let i = 0; i < N; i++) {
      const s0 = (i + gap) / N, s1 = (i + 1 - gap) / N, sc = (i + 0.5) / N
      const f = this.curve.frame(sc)
      const kind = MATERIAL_PATTERN[i]
      const faceMat = { ti: materials.titanium, gr: materials.graphite, po: materials.porcelain, gl: materials.glass, ir: materials.iridescent }[kind]
      const holesA = i % 4 === 1 ? slots : i % 7 === 3 ? windowCut : null
      const holesB = i % 4 === 1 ? slots : null

      const plate = new Object3D()
      plate.name = `plate-${i}`
      const pivotA = new Object3D(), pivotB = new Object3D()
      const opts = { ...res, thickness: kind === 'gl' ? 0.08 : 0.13 }
      const leafA = new Mesh(buildLeaf(this.curve, s0, s1, 1, f, { ...opts, holes: holesA }), [faceMat, materials.edge])
      const leafB = new Mesh(buildLeaf(this.curve, s0, s1, -1, f, { ...opts, holes: holesB }), [faceMat, materials.edge])
      for (const m of [leafA, leafB]) {
        m.castShadow = m.receiveShadow = kind !== 'gl'
        m.userData.plateIndex = i
        this.interactive.push(m)
      }
      pivotA.add(leafA)
      pivotB.add(leafB)
      plate.add(pivotA, pivotB)

      // Luminous crease seams on both faces
      const pts = []
      for (let k = 0; k <= 16; k++) pts.push(this.curve.frame(s0 + ((s1 - s0) * k) / 16).p.clone().sub(f.p))
      const inv = new Matrix4().makeBasis(f.T, f.W, f.D).invert()
      const tubes = [1, -1].map(sgn => {
        const local = pts.map(p => p.clone().applyMatrix4(inv).add(new Vector3(0, 0, sgn * (opts.thickness / 2 + 0.004))))
        const tube = new TubeGeometry(new CatmullRomCurve3(local), 24, 0.013, 5, false)
        const count = tube.attributes.position.count
        const aS = new Float32Array(count)
        for (let v = 0; v < count; v++) aS[v] = s0 + ((s1 - s0) * Math.floor(v / 6)) / 24
        tube.setAttribute('aS', new BufferAttribute(aS, 1))
        tube.deleteAttribute('uv')
        return tube
      })
      plate.add(new Mesh(mergeGeometries(tubes), this.seam))
      tubes.forEach(t => t.dispose())

      // Pose P0 (assembled) and P3 (finale) from the band frame
      const qLocal = quatFromBasis(f.T, f.W, f.D)
      const p0 = f.p.clone().applyMatrix4(rootS)
      const p3 = f.p.clone().applyMatrix4(rootF)
      const r0 = qS.clone().multiply(qLocal)
      const r3 = qF.clone().multiply(qLocal)
      const radialWorld = f.radial.clone().applyQuaternion(qS)
      const wWorld = f.W.clone().applyQuaternion(qS)

      // Pose P1: a rotating elliptical tunnel around the passage axis (world -Z through the sculpture)
      const a = (i / N) * Math.PI * 2 * 1.0 + 0.35
      const p1Base = { angle: a, z: SCULPTURE_ORIGIN.z + 4.6 - (i / N) * 15.5, r: 4.7 + 0.5 * ((i * 7) % 3) }

      // Pose P2: gallery architecture
      let p2, r2, sc2
      if (i < 18) {
        const ex = EXHIBITS[Math.floor(i / 3)]
        const j = (i % 3) - 1
        const yaw = focusYaw(ex)
        const exQ = new Quaternion().setFromEuler(new Euler(0, yaw, 0))
        const local = new Vector3(j * 2.75, EXHIBIT_Y + 0.55 - ex.position.y, -1.7 + Math.abs(j) * 0.6)
        p2 = ex.position.clone().add(local.applyQuaternion(exQ))
        const lean = new Quaternion().setFromEuler(new Euler(0, -j * 0.42, 0))
        r2 = exQ.clone().multiply(lean).multiply(quatFromBasis(new Vector3(0, 1, 0), new Vector3(1, 0, 0), new Vector3(0, 0, -1)))
        sc2 = 2.25
      } else {
        const k = i - 18
        // A coffered ceiling rhythm: flat panels alternating either side of the hall's axis
        p2 = new Vector3((k % 2 ? 1 : -1) * 2.7, 10.4, -20 - k * 6.6)
        r2 = quatFromBasis(new Vector3(0, 0, -1), new Vector3(1, 0, 0), new Vector3(0, -1, 0))
          .multiply(new Quaternion().setFromEuler(new Euler((k % 2 ? 1 : -1) * 0.16, 0, 0)))
        sc2 = 1.9
      }

      plate.userData = { i, s: sc, kind, pivotA, pivotB, p0, r0, p2, r2, sc2, p3, r3, radialWorld, wWorld, p1Base, hover: 0 }
      this.plates.push(plate)
      this.group.add(plate)
    }

    this.buildCore(materials, qS)
    this._v = new Vector3(); this._q = new Quaternion(); this._q2 = new Quaternion(); this._e = new Euler()
    this._x = new Vector3(); this._y = new Vector3(); this._z = new Vector3(); this._t = new Vector3()
  }

  /** Internal mechanism: a twisted stack of louvres that fans open and splits to form a doorway. */
  buildCore(materials, qS) {
    this.core = new Group()
    this.core.name = 'fold-core'
    this.core.position.copy(SCULPTURE_ORIGIN)
    this.core.quaternion.copy(qS)
    this.coreSlabs = []
    const geo = new RoundedBoxGeometry(2.3, 0.05, 0.62, 2, 0.022)
    const n = 11
    for (let i = 0; i < n; i++) {
      const m = new Mesh(geo, i % 3 === 1 ? materials.graphite : i % 3 === 2 ? materials.titanium : materials.porcelain)
      m.castShadow = m.receiveShadow = true
      m.userData = { i, y: -1.25 + (i * 2.5) / (n - 1), yaw: i * 0.24 }
      this.core.add(m)
      this.coreSlabs.push(m)
    }
    const thread = new Mesh(new CylinderGeometry(0.005, 0.005, 26, 6), new MeshBasicMaterial({ color: 0xd9d2c6, transparent: true, opacity: 0.55 }))
    thread.position.y = 1.35 + 13
    this.core.add(thread)
    this.thread = thread
    this.coreStart = SCULPTURE_ORIGIN.clone()
    this.coreEnd = FINAL_ORIGIN.clone()
    this.qCoreS = qS.clone()
    this.qCoreF = new Quaternion().setFromEuler(new Euler(0, MathUtils.degToRad(38), 0))
    this.group.add(this.core)
  }

  /**
   * Evaluate every plate from the director state. All motion is a pure function of state + time,
   * so reverse scrolling reverses exactly.
   */
  update(st, time) {
    const { _v: v, _q: q, _q2: q2, _e: e } = this
    const sep = st.separate, ex = st.explode, tg = st.toGallery, tf = st.toFinal
    this.seam.uniforms.uTime.value = time
    this.seam.uniforms.uGlow.value = st.seam

    for (const plate of this.plates) {
      const d = plate.userData
      const i = d.i
      const alt = i % 2 ? 1 : -1

      // P0 with separation: plates slide off the band and tilt about their own tangent
      // An ordered exploded diagram: plates lift off the spine evenly and unwind as a helix.
      plate.position.copy(d.p0).addScaledVector(d.radialWorld, sep * 0.62)
      q.copy(d.r0).multiply(q2.setFromEuler(e.set(sep * (0.25 + (i / N) * 1.1), 0, 0)))
      let scale = 1

      // → P1 iris: the plates gather into an aperture around the passage axis, then open like
      // camera blades while the visitor flies through it.
      const te = stagger(ex, i / N, 0.55)
      if (te > 0) {
        const pb = d.p1Base
        const ang = pb.angle + ex * 0.5 + st.iris * 1.3
        const rx = MathUtils.lerp(2.75, 6.6, st.iris), ry = MathUtils.lerp(2.5, 3.05, st.iris)
        v.set(Math.cos(ang) * rx, SCULPTURE_ORIGIN.y + Math.sin(ang) * ry, IRIS_Z + (i % 2) * 0.14)
        const Y = this._y.set(Math.cos(ang), Math.sin(ang), 0)
        const Z = this._z.set(0, 0, 1).addScaledVector(this._t.set(-Math.sin(ang), Math.cos(ang), 0), 0.45).normalize()
        const X = this._x.crossVectors(Y, Z).normalize()
        Z.crossVectors(X, Y).normalize()
        q2.copy(quatFromBasis(X, Y, Z))
        plate.position.lerp(v, te)
        q.slerp(q2, te)
      }

      // → P2 gallery architecture, arcing up through the hall
      const tgi = stagger(tg, i < 18 ? Math.floor(i / 3) / 6 + (i % 3) * 0.02 : 0.25 + (i - 18) / 14, 0.42)
      if (tgi > 0) {
        plate.position.lerp(d.p2, tgi)
        plate.position.y += Math.sin(Math.PI * tgi) * 1.2
        q.slerp(d.r2, tgi)
        scale = MathUtils.lerp(scale, d.sc2, tgi)
      }

      // → P3 finale: plates stream forward and re-assemble
      const tfi = stagger(tf, ((i * 11) % N) / N, 0.5)
      if (tfi > 0) {
        plate.position.lerp(d.p3, tfi)
        plate.position.y += Math.sin(Math.PI * tfi) * 3.2
        q.slerp(d.r3, tfi)
        scale = MathUtils.lerp(scale, 1, tfi)
      }
      plate.quaternion.copy(q)
      plate.scale.setScalar(scale)

      // Hinge: dihedral angle in degrees, with breathing, hover response and click ripple
      d.hover += ((this.hoverIndex === i ? 1 : 0) - d.hover) * 0.12
      const rippleDist = Math.abs(((d.s - this.ripple * 1.15 + 1.5) % 1) - 0.5)
      const ripple = this.ripple > 0 && this.ripple < 1 ? Math.exp(-(rippleDist * rippleDist) / 0.004) * 38 : 0
      const breathe = Math.sin(time * 0.45 + i * 1.7) * (4 + 6 * sep)
      const dihedral = st.fold + breathe - d.hover * 26 - ripple
      const half = MathUtils.degToRad((180 - dihedral) / 2)
      d.pivotA.rotation.x = half
      d.pivotB.rotation.x = -half
    }

    // Core mechanism
    const coreMove = st.coreTravel
    this.core.position.lerpVectors(this.coreStart, this.coreEnd, coreMove)
    this.core.quaternion.slerpQuaternions(this.qCoreS, this.qCoreF, coreMove)
    const n = this.coreSlabs.length
    for (const slab of this.coreSlabs) {
      const { i, y, yaw } = slab.userData
      const k = i / (n - 1)
      const upper = y > 0 ? 1 : -1
      slab.position.y = y * (1 + st.coreFan * 0.35) + upper * st.coreSplit * (upper > 0 ? 3.2 : 1.4)
      slab.rotation.set(
        st.coreFan * (0.9 + 0.5 * Math.sin(k * 6 + time * 0.3)) * (1 - st.coreSplit * 0.6),
        yaw * (1 + st.coreFan) + time * 0.06 * (i % 2 ? 1 : -1),
        0
      )
      slab.scale.setScalar(1 - st.coreSplit * 0.25 * (upper < 0 ? 1 : 0))
    }
    this.thread.material.opacity = 0.5 * (1 - st.coreSplit)
  }

  setHover(index) { this.hoverIndex = index }

  dispose() {
    this.group.traverse(o => { if (o.geometry) o.geometry.dispose() })
    this.seam.dispose()
    this.thread.material.dispose()
  }
}
