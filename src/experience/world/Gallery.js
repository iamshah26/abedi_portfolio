import {
  CylinderGeometry, DataTexture, Group, Mesh, PlaneGeometry, SRGBColorSpace, TextureLoader, Vector3
} from 'three'
import { EXHIBITS, EXHIBIT_SIZE, exhibitProgress } from '../layout.js'
import { coneMaterial, exhibitImageMaterial } from '../materials/shaders.js'
import { conceptTexture, exhibitBody, focusYaw, labelMesh, labelTexture, signatureObject } from './exhibitFrame.js'
import { palette } from '../palette.js'

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }

/**
 * Chapter 03 — Selected Work. Six exhibits, each a lit artwork in a graphite frame on a porcelain plinth,
 * backed by partitions made from the Fold's plates (positioned by ImpossibleFold pose P2).
 */
export class Gallery {
  constructor(projects, mats, { anisotropy = 8 } = {}) {
    this.group = new Group()
    this.group.name = 'gallery'
    this.exhibits = []
    this.interactive = []
    this.anisotropy = anisotropy
    this.loaded = false
    const blank = new DataTexture(new Uint8Array([13, 13, 17, 255]), 1, 1)
    blank.needsUpdate = true

    projects.forEach((project, i) => {
      const layout = EXHIBITS[i]
      const g = new Group()
      g.position.copy(layout.position)
      g.rotation.y = focusYaw(layout)
      const body = exhibitBody(mats, EXHIBIT_SIZE)
      body.plinth.castShadow = false
      g.add(body.group)

      const mat = exhibitImageMaterial(blank)
      const image = new Mesh(new PlaneGeometry(EXHIBIT_SIZE.w, EXHIBIT_SIZE.h), mat)
      image.position.z = 0.085
      image.userData = { projectId: project.id, exhibitIndex: i }
      body.frame.userData = image.userData
      g.add(image)

      const label = labelMesh(labelTexture(project))
      label.position.set(0, -2.6 + 0.5, 0.1 + 0.605)
      g.add(label)

      const sig = signatureObject(project.id, mats)
      sig.position.set(layout.side > 0 ? 0.55 : -0.55, -2.6 + 0.95, 0.1)
      sig.userData.projectId = project.id
      g.add(sig)

      // Overhead light cone (fake volumetric) that ignites during the reveal
      const cone = new Mesh(new CylinderGeometry(0.25, 3.1, 9, 40, 1, true), coneMaterial(project.accent || palette.porcelain))
      cone.position.set(0, 9 / 2 - 2.6 + 0.35, 0.6)
      cone.renderOrder = 2
      g.add(cone)

      this.group.add(g)
      this.interactive.push(image, body.frame)
      this.exhibits.push({ project, layout, group: g, image, mat, cone, sig, hover: 0, reveal: 0, focus: 0 })
    })
  }

  /** Deferred: product imagery is only requested as the visitor approaches the hall. */
  load() {
    if (this.loaded) return
    this.loaded = true
    const loader = new TextureLoader()
    for (const ex of this.exhibits) {
      if (ex.project.concept) {
        ex.mat.uniforms.map.value = conceptTexture(ex.project.id)
        continue
      }
      loader.load(ex.project.image, tex => {
        tex.colorSpace = SRGBColorSpace
        tex.anisotropy = this.anisotropy
        ex.mat.uniforms.map.value = tex
      })
    }
  }

  worldCenter(i, out = new Vector3()) {
    return this.exhibits[i].image.getWorldPosition(out)
  }

  update(st, time, progress, hoveredId, focusedId, camera) {
    for (let i = 0; i < this.exhibits.length; i++) {
      const ex = this.exhibits[i]
      // Distance culling: beyond ~46 m the fog has fully absorbed an exhibit.
      const visible = !camera || camera.position.distanceTo(ex.layout.position) < 46
      ex.group.visible = visible
      if (!visible) continue
      const at = exhibitProgress(i)
      const lightOn = smooth(0.455 + i * 0.012, 0.49 + i * 0.012, progress) * st.hall
      ex.cone.material.uniforms.uIntensity.value = lightOn * (0.8 + 0.6 * ex.hover)
      ex.cone.material.uniforms.uTime.value = time
      ex.cone.visible = lightOn > 0.001
      ex.reveal = smooth(at - 0.05, at - 0.012, progress) * st.hall
      const near = 1 - smooth(0.012, 0.03, Math.abs(progress - at))
      ex.focus += ((Math.max(near, focusedId === ex.project.id ? 1 : 0)) - ex.focus) * 0.08
      ex.hover += ((hoveredId === ex.project.id ? 1 : 0) - ex.hover) * 0.1
      const u = ex.mat.uniforms
      u.uReveal.value = ex.reveal
      u.uFocus.value = Math.max(ex.focus, ex.hover * 0.8) * st.hall
      u.uHover.value = ex.hover
      u.uTime.value = time
      // Exhibits gently lift when hovered; signature objects turn slowly, faster on hover
      ex.group.position.y = ex.layout.position.y + ex.hover * 0.06
      ex.sig.rotation.y += 0.002 + ex.hover * 0.02
      if (ex.sig.userData.wave) ex.sig.children.forEach((bar, k) => { bar.scale.y = bar.userData.h * (0.75 + 0.25 * Math.sin(time * 2.2 + k * 0.7) * (0.4 + ex.hover)) })
    }
  }

  setPointerUV(projectId, uv) {
    const ex = this.exhibits.find(e => e.project.id === projectId)
    if (ex && uv) ex.mat.uniforms.uPointer.value.copy(uv)
  }

  dispose() {
    this.group.traverse(o => {
      if (o.geometry) o.geometry.dispose()
      if (o.material && !Array.isArray(o.material) && o.material.name !== 'satin-titanium') {
        const m = o.material
        if (m.uniforms?.map?.value) m.uniforms.map.value.dispose()
        if (m.map) m.map.dispose()
        if (['exhibit-image', 'light-cone', ''].includes(m.name) || m.type === 'MeshStandardMaterial') m.dispose()
      }
    })
  }
}
