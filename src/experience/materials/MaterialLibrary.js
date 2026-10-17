import {
  CanvasTexture, Color, MeshPhysicalMaterial, MeshStandardMaterial, RepeatWrapping, NoColorSpace
} from 'three'
import { palette } from '../palette.js'

/** Procedural brushed-metal roughness texture: fine anisotropic streaks with soft banding. */
function brushedTexture(size = 512) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')
  g.fillStyle = 'rgb(128,128,128)'
  g.fillRect(0, 0, size, size)
  for (let i = 0; i < 2600; i++) {
    const y = Math.random() * size
    const v = 100 + Math.random() * 70
    g.strokeStyle = `rgba(${v},${v},${v},${0.08 + Math.random() * 0.22})`
    g.lineWidth = 0.4 + Math.random() * 1.1
    g.beginPath()
    const x = Math.random() * size
    g.moveTo(x - size * 0.6, y)
    g.lineTo(x + size * 0.6, y + (Math.random() - 0.5) * 2)
    g.stroke()
  }
  const t = new CanvasTexture(c)
  t.wrapS = t.wrapT = RepeatWrapping
  t.colorSpace = NoColorSpace
  t.anisotropy = 4
  return t
}

/** Large-scale mottled roughness for obsidian stone. */
function stoneTexture(size = 256) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')
  g.fillStyle = 'rgb(110,110,110)'
  g.fillRect(0, 0, size, size)
  for (let i = 0; i < 420; i++) {
    const v = 70 + Math.random() * 110
    g.fillStyle = `rgba(${v},${v},${v},0.12)`
    g.beginPath()
    g.arc(Math.random() * size, Math.random() * size, 4 + Math.random() * 28, 0, Math.PI * 2)
    g.fill()
  }
  const t = new CanvasTexture(c)
  t.wrapS = t.wrapT = RepeatWrapping
  t.colorSpace = NoColorSpace
  return t
}

/**
 * Coordinated material library. Everything is physically based; colour comes from the palette, and
 * emphasis comes from roughness/clearcoat contrast rather than emissive glow.
 */
export class MaterialLibrary {
  constructor({ transmission = true } = {}) {
    this.textures = { brushed: brushedTexture(), stone: stoneTexture() }
    this.textures.brushed.repeat.set(2, 1)
    this.textures.stone.repeat.set(3, 3)

    this.titanium = new MeshPhysicalMaterial({
      name: 'satin-titanium',
      color: new Color(palette.titanium),
      metalness: 1,
      roughness: 0.34,
      roughnessMap: this.textures.brushed,
      clearcoat: 0.25,
      clearcoatRoughness: 0.3,
      envMapIntensity: 1.1
    })
    this.graphite = new MeshPhysicalMaterial({
      name: 'graphite-titanium',
      color: new Color('#5a5a63'),
      metalness: 1,
      roughness: 0.4,
      roughnessMap: this.textures.brushed,
      envMapIntensity: 1.0
    })
    this.porcelain = new MeshPhysicalMaterial({
      name: 'porcelain',
      color: new Color(palette.porcelain),
      metalness: 0,
      roughness: 0.36,
      clearcoat: 0.7,
      clearcoatRoughness: 0.12,
      sheen: 0.35,
      sheenRoughness: 0.5,
      sheenColor: new Color(palette.lavender),
      envMapIntensity: 0.9
    })
    this.iridescent = new MeshPhysicalMaterial({
      name: 'iridescent-film',
      color: new Color('#3a3448'),
      metalness: 1,
      roughness: 0.22,
      iridescence: 0.75,
      iridescenceIOR: 1.38,
      iridescenceThicknessRange: [260, 420],
      envMapIntensity: 1.25
    })
    this.glassPhysical = new MeshPhysicalMaterial({
      name: 'smoked-glass',
      color: new Color('#cfc8dc'),
      metalness: 0,
      roughness: 0.14,
      transmission: 1,
      thickness: 0.5,
      ior: 1.46,
      attenuationColor: new Color(palette.aubergine),
      attenuationDistance: 0.9,
      envMapIntensity: 1.2
    })
    this.glassLite = new MeshPhysicalMaterial({
      name: 'smoked-glass-lite',
      color: new Color('#3b3547'),
      metalness: 0.1,
      roughness: 0.1,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      clearcoat: 1,
      envMapIntensity: 1.4
    })
    this.glass = transmission ? this.glassPhysical : this.glassLite
    this.edge = new MeshStandardMaterial({
      name: 'polished-edge',
      color: new Color('#d9d6d0'),
      metalness: 1,
      roughness: 0.2,
      envMapIntensity: 1.1
    })
    this.obsidian = new MeshPhysicalMaterial({
      name: 'obsidian',
      color: new Color(palette.obsidian),
      metalness: 0.3,
      roughness: 0.52,
      roughnessMap: this.textures.stone,
      clearcoat: 0.35,
      clearcoatRoughness: 0.4,
      envMapIntensity: 0.32
    })
    this.obsidianBase = this.obsidian.color.clone()
    this.obsidianPorcelain = new Color('#dcd6cb')
    this.obsidianEnv = 0.32
  }

  /** Called when the adaptive quality tier drops transmission. */
  setTransmission(on, meshes) {
    const next = on ? this.glassPhysical : this.glassLite
    if (next === this.glass) return
    for (const m of meshes) {
      if (Array.isArray(m.material)) m.material = m.material.map(x => (x === this.glass ? next : x))
      else if (m.material === this.glass) m.material = next
    }
    this.glass = next
  }

  /** Environment shift toward porcelain at the end of the journey. */
  applyPorcelain(t) {
    this.obsidian.color.copy(this.obsidianBase).lerp(this.obsidianPorcelain, t)
    this.obsidian.metalness = 0.3 * (1 - t)
    this.obsidian.roughness = 0.52 - 0.2 * t
    this.obsidian.envMapIntensity = this.obsidianEnv + 0.6 * t
  }

  dispose() {
    for (const t of Object.values(this.textures)) t.dispose()
    for (const k of ['titanium', 'graphite', 'porcelain', 'iridescent', 'glassPhysical', 'glassLite', 'edge', 'obsidian']) this[k].dispose()
  }
}
