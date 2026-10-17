import { CanvasTexture, Group, Mesh, MeshStandardMaterial, PlaneGeometry, SRGBColorSpace, Vector3 } from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { ATRIUM } from '../layout.js'
import { palette } from '../palette.js'
import { streamMaterial } from '../materials/shaders.js'
import { ribbon } from './Environment.js'

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }

function typeTexture(text, sub, w, d, emphasis) {
  const ppm = 160
  const c = document.createElement('canvas')
  c.width = Math.round(w * ppm); c.height = Math.round(d * ppm)
  const g = c.getContext('2d')
  g.fillStyle = palette.obsidian
  if ('fontStretch' in g) g.fontStretch = emphasis ? 'expanded' : 'normal'
  const size = Math.min(c.height * (sub ? 0.5 : 0.62), (c.width * 0.9) / (text.length * (emphasis ? 0.78 : 0.62)))
  g.font = `${emphasis ? 300 : 400} ${size}px "Archivo", Arial, sans-serif`
  g.textBaseline = 'alphabetic'
  g.fillText(text, c.height * 0.18, c.height * (sub ? 0.58 : 0.74), c.width * 0.92)
  if (sub) {
    g.globalAlpha = 0.6
    g.font = `400 ${c.height * 0.15}px "Geist Mono", monospace`
    g.fillText(sub, c.height * 0.18, c.height * 0.84, c.width * 0.92)
  }
  const t = new CanvasTexture(c)
  t.colorSpace = SRGBColorSpace
  t.anisotropy = 8
  return t
}

/** Chapter 04 — The Engineer. Expertise as architecture: type slabs linked by reactive streams. */
export class EngineerAtrium {
  constructor(mats) {
    this.group = new Group()
    this.group.name = 'engineer-atrium'
    this.group.position.copy(ATRIUM)
    const A = (x, z) => new Vector3(x, 0, z)
    const slabs = [
      ['ANGULAR', null, 11, 2.6, 0.5, -0.5, 1.2, true],
      ['TYPESCRIPT', null, 9, 1.9, 0.9, 1.0, -2.6, true],
      ['RxJS', 'observables', 3.2, 1.5, 0.3, -5.2, 4.8],
      ['NgRx', 'state', 3.2, 1.5, 0.6, -1.6, 4.8],
      ['Signals', 'reactivity', 4.4, 1.5, 0.42, 2.6, 4.8],
      ['SignalR', 'real-time', 4.0, 1.4, 1.2, 7.0, 0.8],
      ['Jasmine · Karma', 'testing', 5.0, 1.3, 0.25, -6.6, -5.6],
      ['SonarQube · CI', 'quality', 5.0, 1.3, 0.7, 1.8, -6.4]
    ]
    this.slabs = slabs.map(([text, sub, w, d, h, x, z, emphasis], i) => {
      const g = new Group()
      const body = new Mesh(new RoundedBoxGeometry(w, h, d, 2, 0.04), mats.porcelain)
      body.castShadow = body.receiveShadow = true
      body.position.y = h / 2
      const top = new Mesh(new PlaneGeometry(w * 0.98, d * 0.96), new MeshStandardMaterial({ map: typeTexture(text, sub, w, d, emphasis), transparent: true, roughness: 0.55 }))
      top.rotation.x = -Math.PI / 2
      top.position.y = h + 0.002
      g.add(body, top)
      g.position.set(x, 0, z)
      g.userData = { h, delay: i * 0.06 }
      this.group.add(g)
      return g
    })

    // Routed streams: events flow into reactive state and out to the interface
    const routes = [
      [A(-5.2, 4.0), A(-5.2, 2.5), A(-3, 2.5)],
      [A(-1.6, 4.0), A(-1.6, 2.5)],
      [A(2.6, 4.0), A(2.6, 2.5)],
      [A(7.0, 0.1), A(7.0, -1.6), A(5.5, -1.6)],
      [A(1.0, -1.65), A(1.0, -0.1)],
      [A(-6.6, -4.95), A(-6.6, -3.2), A(-3.5, -3.2), A(-3.5, -1.65)],
      [A(1.8, -5.75), A(1.8, -3.55)],
      [A(-16, 6.5), A(-9, 6.5), A(-9, 4.8), A(-6.8, 4.8)],
      [A(14, 3.5), A(9.5, 3.5), A(9.5, 0.8), A(9.0, 0.8)],
      [A(5.5, -2.6), A(12, -2.6), A(12, -12), A(16, -12)],
      [A(-11, -9), A(-11, -5.6), A(-9.1, -5.6)]
    ]
    this.streamMat = streamMaterial()
    for (const r of routes) {
      const pts = []
      for (let k = 0; k < r.length - 1; k++) {
        const a = r[k], b = r[k + 1]
        const n = Math.max(2, Math.round(a.distanceTo(b) * 12))
        for (let j = 0; j < n; j++) pts.push(a.clone().lerp(b, j / n))
      }
      pts.push(r[r.length - 1].clone())
      const m = new Mesh(ribbon(pts, 0.07, { y: 0.016, seeds: true }), this.streamMat)
      m.renderOrder = 1
      this.group.add(m)
    }
  }

  update(st, time) {
    const r = st.atrium
    this.group.visible = r > 0.001
    for (const s of this.slabs) {
      const t = smooth(s.userData.delay, s.userData.delay + 0.5, r)
      s.position.y = -s.userData.h * 1.05 * (1 - t)
    }
    this.streamMat.uniforms.uTime.value = time
    this.streamMat.uniforms.uDraw.value = smooth(0.35, 1, r) * 1.02
  }

  dispose() {
    this.group.traverse(o => {
      o.geometry?.dispose()
      if (o.material?.map) { o.material.map.dispose(); o.material.dispose() }
    })
    this.streamMat.dispose()
  }
}
