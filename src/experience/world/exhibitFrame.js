import {
  CanvasTexture, CatmullRomCurve3, ExtrudeGeometry, Group, Mesh, MeshStandardMaterial, Shape, SRGBColorSpace,
  TubeGeometry, Vector3, BoxGeometry, PlaneGeometry
} from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { palette } from '../palette.js'
import { drawConcept } from './conceptArt.js'

/** Yaw that turns an exhibit toward its desktop viewpoint (see keyframes.galleryStops). */
export function focusYaw({ side, position: e }) {
  const dx = -side * 1.6 - e.x
  const dz = 6.8
  return Math.atan2(dx, dz)
}

const FONT_DISPLAY = '"Archivo", "Helvetica Neue", Arial, sans-serif'
const FONT_MONO = '"Geist Mono", ui-monospace, monospace'
const FONT_SERIF = '"Instrument Serif", Georgia, serif'

function canvas(w, h) {
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  return [c, c.getContext('2d')]
}

function toTexture(c) {
  const t = new CanvasTexture(c)
  t.colorSpace = SRGBColorSpace
  t.anisotropy = 8
  return t
}

/** Plinth label: index, title and kicker, printed in obsidian ink. */
export function labelTexture(project) {
  const [c, g] = canvas(1024, 384)
  g.fillStyle = palette.obsidian
  g.font = `500 40px ${FONT_MONO}`
  g.fillText(project.index, 56, 92)
  g.font = `300 34px ${FONT_MONO}`
  g.globalAlpha = 0.65
  g.fillText(project.kicker.toUpperCase(), 160, 92)
  g.globalAlpha = 1
  g.font = `400 104px ${FONT_DISPLAY}`
  if ('fontStretch' in g) g.fontStretch = 'expanded'
  g.fillText(project.title.toUpperCase(), 50, 240, 930)
  g.fillRect(56, 300, 120, 4)
  return toTexture(c)
}

export function conceptTexture(id) {
  return toTexture(drawConcept(id))
}

/** Signature objects: one small sculptural note per project, sharing the Fold's materials. */
export function signatureObject(id, mats) {
  const g = new Group()
  g.name = `signature-${id}`
  const add = (geo, mat, x = 0, y = 0, z = 0) => { const m = new Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; g.add(m); return m }

  if (id === 'enteract-engage') {
    // Three channel panes held in depth: social, messaging, voice
    for (let i = 0; i < 3; i++) {
      const pane = add(new RoundedBoxGeometry(0.62, 0.82, 0.03, 2, 0.012), i === 1 ? mats.porcelain : mats.glass, (i - 1) * 0.16, 0.45 + i * 0.05, (i - 1) * 0.22)
      pane.rotation.y = -0.5
    }
  } else if (id === 'raahee') {
    // Topographic model: stacked contour slabs of a single peak
    for (let k = 0; k < 7; k++) {
      const sh = new Shape()
      const r = 0.62 - k * 0.075
      for (let a = 0; a <= 40; a++) {
        const t = (a / 40) * Math.PI * 2
        const rr = r * (1 + 0.18 * Math.sin(t * 3 + k) + 0.08 * Math.sin(t * 7 - k * 2))
        a ? sh.lineTo(Math.cos(t) * rr + k * 0.03, Math.sin(t) * rr * 0.75) : sh.moveTo(Math.cos(t) * rr + k * 0.03, Math.sin(t) * rr * 0.75)
      }
      const m = add(new ExtrudeGeometry(sh, { depth: 0.045, bevelEnabled: false }), k % 2 ? mats.titanium : mats.porcelain, 0, 0.03 + k * 0.05, 0)
      m.rotation.x = -Math.PI / 2
    }
  } else if (id === 'intevo-pulse') {
    // A voice waveform in titanium bars
    const geo = new BoxGeometry(0.035, 1, 0.035)
    for (let k = 0; k < 23; k++) {
      const h = 0.12 + Math.abs(Math.sin(k * 0.55)) * 0.7 * (0.35 + 0.65 * Math.sin((k / 22) * Math.PI))
      const bar = add(geo, k === 11 ? mats.porcelain : mats.titanium, (k - 11) * 0.06, h / 2, 0)
      bar.scale.y = h
      bar.userData.h = h
    }
    g.userData.wave = true
  } else if (id === 'thexperto') {
    // Folded linen: three soft slabs, slightly rotated
    const geo = new RoundedBoxGeometry(0.9, 0.09, 0.62, 3, 0.04)
    ;[mats.porcelain, mats.titanium, mats.porcelain].forEach((m, k) => {
      const s = add(geo, m, k * 0.03, 0.05 + k * 0.1, -k * 0.02)
      s.rotation.y = k * 0.18 - 0.2
    })
  } else if (id === 'intevo') {
    // A keystone: a miniature folded plate in iridescent film
    const geo = new RoundedBoxGeometry(0.42, 1.1, 0.05, 2, 0.02)
    const a = add(geo, mats.iridescent, -0.17, 0.55, 0); a.rotation.y = 0.55
    const b = add(geo, mats.titanium, 0.17, 0.55, 0); b.rotation.y = -0.55
  } else {
    // Flight arc over a stack of rooms
    for (let k = 0; k < 4; k++) add(new BoxGeometry(0.42, 0.12, 0.42), k % 2 ? mats.graphite : mats.porcelain, -0.25, 0.06 + k * 0.13, 0)
    const arc = new CatmullRomCurve3([new Vector3(-0.25, 0.55, 0), new Vector3(0.05, 1.05, 0.05), new Vector3(0.45, 0.85, 0), new Vector3(0.6, 0.2, 0)])
    add(new TubeGeometry(arc, 48, 0.012, 6, false), mats.edge)
  }
  return g
}

/** Exhibit frame + plinth + label geometry. */
export function exhibitBody(mats, size) {
  const g = new Group()
  const frame = new Mesh(new RoundedBoxGeometry(size.w + 0.26, size.h + 0.26, 0.16, 3, 0.035), mats.graphite)
  frame.castShadow = true
  g.add(frame)
  const plinth = new Mesh(new RoundedBoxGeometry(2.6, 0.95, 1.2, 3, 0.05), mats.porcelain)
  plinth.position.set(0, -2.6 + 0.475, 0.1)
  plinth.castShadow = plinth.receiveShadow = true
  g.add(plinth)
  for (const x of [-0.9, 0.9]) {
    const rod = new Mesh(new BoxGeometry(0.03, 0.4, 0.03), mats.edge)
    rod.position.set(x, -size.h / 2 - 0.27, 0)
    g.add(rod)
  }
  return { group: g, frame, plinth }
}

export function labelMesh(texture) {
  const m = new Mesh(new PlaneGeometry(2.2, 0.825), new MeshStandardMaterial({ map: texture, transparent: true, roughness: 0.5, metalness: 0 }))
  return m
}
