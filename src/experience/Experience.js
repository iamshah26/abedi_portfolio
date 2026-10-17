import {
  Clock, CustomToneMapping, HalfFloatType, PCFShadowMap, PerspectiveCamera, Scene, SRGBColorSpace, Vector2,
  Vector3, WebGLRenderer, WebGLRenderTarget
} from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'
import gsap from 'gsap'

import { projects } from '../data/profile.js'
import { MaterialLibrary } from './materials/MaterialLibrary.js'
import { GradeShader } from './materials/shaders.js'
import { Environment } from './world/Environment.js'
import { ImpossibleFold } from './world/ImpossibleFold.js'
import { Gallery } from './world/Gallery.js'
import { EngineerAtrium } from './world/EngineerAtrium.js'
import { Director } from './director/Director.js'
import { CameraRig } from './director/CameraRig.js'
import { ScrollController } from './director/ScrollController.js'
import { keyframes, focusPose } from './director/keyframes.js'
import { PerformanceManager, initialTier } from './core/PerformanceManager.js'
import { Interaction } from './input/Interaction.js'
import { installToneMapping } from './core/toneMapping.js'
import { EXHIBITS, chapterAt, exhibitProgress } from './layout.js'


async function fontsReady() {
  if (!document.fonts) return
  const loads = ['200 100px Archivo', '400 100px Archivo', '400 40px "Geist Mono"', '400 64px "Instrument Serif"', 'italic 400 64px "Instrument Serif"']
    .map(f => document.fonts.load(f).catch(() => null))
  await Promise.race([Promise.all(loads), new Promise(r => setTimeout(r, 2500))])
}

/**
 * The experience engine: renderer, scene graph, timeline director, camera rig, input and performance.
 * Vue owns the DOM; this class owns everything inside the canvas.
 */
export class Experience {
  constructor({ canvas, track, onFrame, onSelectProject, onFail, debug = false }) {
    // Hot-reload guard: never allow two engines (and two render loops) to coexist.
    window.__activeExperience?.dispose()
    window.__activeExperience = this
    Object.assign(this, { canvas, track, onFrame, onSelectProject, onFail, debug })
    this.time = 0
    this.progress = 0
    this.hovered = null
    this.focusedId = null
    this.paused = false
    this.disposed = false
    this.listeners = []
  }

  async init() {
    const tier = initialTier()
    this.tier = tier
    const renderer = new WebGLRenderer({ canvas: this.canvas, antialias: !!tier.mobile, powerPreference: 'high-performance', stencil: false })
    this.renderer = renderer
    renderer.setPixelRatio(Math.min(devicePixelRatio, tier.dpr))
    renderer.outputColorSpace = SRGBColorSpace
    installToneMapping()
    renderer.toneMapping = CustomToneMapping
    renderer.toneMappingExposure = 1
    renderer.shadowMap.enabled = tier.shadows
    renderer.shadowMap.type = PCFShadowMap
    renderer.info.autoReset = false

    this.scene = new Scene()
    this.camera = new PerspectiveCamera(34, 1, 0.1, 700)
    this.size = { w: 0, h: 0 }

    await fontsReady()
    if (this.disposed) return

    this.mats = new MaterialLibrary({ transmission: tier.transmission })
    this.env = new Environment(renderer, this.scene, this.mats, tier)
    this.fold = new ImpossibleFold(this.mats, { quality: tier.mobile ? 'mobile' : 'high' })
    this.gallery = new Gallery(projects, this.mats)
    this.atrium = new EngineerAtrium(this.mats)
    this.scene.add(this.fold.group, this.gallery.group, this.atrium.group)
    this.glassMeshes = []
    this.scene.traverse(o => { if (o.isMesh && (o.material === this.mats.glass || (Array.isArray(o.material) && o.material.includes(this.mats.glass)))) this.glassMeshes.push(o) })

    this.rig = new CameraRig(this.camera)
    this.scroll = new ScrollController(this.track, { lambda: tier.mobile ? 5.5 : 4 })
    this.perf = new PerformanceManager(tier, t => this.applyTier(t))
    this.interaction = new Interaction(this.canvas, this.camera, {
      onHover: hit => this.handleHover(hit),
      onSelect: hit => this.handleSelect(hit),
      onPointer: ndc => this.rig.pointer.copy(ndc)
    })

    this.resize(true)
    this.setupComposer()
    this.bind(window, 'resize', () => this.resize())
    this.bind(this.canvas, 'webglcontextlost', e => { e.preventDefault(); this.stop(); this.onFail?.('context-lost') })

    this.progress = this.scroll.current
    this.update(0)
    try { await renderer.compileAsync(this.scene, this.camera) } catch { /* compile lazily */ }
    if (this.disposed) return
    this.clock = new Clock()
    renderer.setAnimationLoop(() => this.tick())

    // Deferred asset loading: product imagery once the visitor is underway or the browser is idle.
    const loadGallery = () => this.gallery.load()
    if ('requestIdleCallback' in window) this.idle = requestIdleCallback(loadGallery, { timeout: 3500 })
    else this.idleTimer = setTimeout(loadGallery, 2500)
    return this
  }

  bind(target, type, fn, opts) {
    target.addEventListener(type, fn, opts)
    this.listeners.push(() => target.removeEventListener(type, fn, opts))
  }

  setupComposer() {
    this.composer?.dispose()
    this.composer = null
    const t = this.tier
    if (!t.bloom && !t.grade) return
    const { w, h } = this.size
    const pr = this.renderer.getPixelRatio()
    // Multisampled targets combined with UnrealBloom render black on some ANGLE/D3D11 drivers,
    // so anti-aliasing is done with FXAA after tone mapping instead.
    const rt = new WebGLRenderTarget(w * pr, h * pr, { type: HalfFloatType })
    const composer = new EffectComposer(this.renderer, rt)
    composer.addPass(new RenderPass(this.scene, this.camera))
    if (t.bloom) {
      this.bloom = new UnrealBloomPass(new Vector2(w, h), 0.2, 0.42, 0.94)
      composer.addPass(this.bloom)
    }
    composer.addPass(new OutputPass())
    this.fxaa = new ShaderPass(FXAAShader)
    composer.addPass(this.fxaa)
    this.grade = new ShaderPass(GradeShader)
    composer.addPass(this.grade)
    composer.setSize(w, h)
    this.fxaa.material.uniforms.resolution.value.set(1 / (w * pr), 1 / (h * pr))
    this.composer = composer
  }

  applyTier(tier) {
    this.tier = tier
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, tier.dpr))
    // Shadows are a high-tier luxury; dropping them costs one shader recompile, once.
    if (tier.name !== 'high' && this.env.key.castShadow) this.env.key.castShadow = false
    this.env.setReflectorScale(tier.reflector, Math.min(devicePixelRatio, tier.dpr))
    this.mats.setTransmission(tier.transmission, this.glassMeshes)
    this.setupComposer()
    this.resize(true)
  }

  resize(force = false) {
    const w = innerWidth
    const h = Math.max(innerHeight, this.stableHeight || 0)
    // Mobile browsers resize the viewport when the URL bar moves; ignore small height-only changes.
    if (!force && w === this.size.w && Math.abs(h - this.size.h) < 160 && this.tier.mobile) return
    this.size = { w, h }
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.composer?.setSize(w, h)
    if (this.fxaa) { const pr = this.renderer.getPixelRatio(); this.fxaa.material.uniforms.resolution.value.set(1 / (w * pr), 1 / (h * pr)) }
    const profile = w / h < 0.9 ? 'mobile' : 'desktop'
    if (profile !== this.profile) {
      this.profile = profile
      this.director?.dispose()
      this.director = new Director(keyframes[profile])
      this.rig.setFrames(keyframes[profile])
      this.env.setProfile(profile)
    }
    this.scroll.refresh()
  }

  handleHover(hit) {
    const id = hit?.object.userData.projectId ?? null
    const plate = hit?.object.userData.plateIndex ?? -1
    this.hovered = id
    this.fold.setHover(plate)
    if (id && hit.uv) this.gallery.setPointerUV(id, hit.uv)
  }

  handleSelect(hit) {
    const id = hit.object.userData.projectId
    if (id) return this.onSelectProject?.(id)
    if (hit.object.userData.plateIndex !== undefined) {
      gsap.fromTo(this.fold, { ripple: 0 }, { ripple: 1, duration: 2.4, ease: 'power1.inOut' })
    }
  }

  /** Camera dollies into an exhibit; resolves when the frame fills the view. */
  focusProject(id, { instant = false } = {}) {
    const i = projects.findIndex(p => p.id === id)
    if (i < 0) return Promise.resolve()
    this.focusedId = id
    this.rig.focusPose = focusPose(EXHIBITS[i], this.profile === 'mobile')
    gsap.killTweensOf(this.rig, 'focus')
    if (instant) { this.rig.focus = 1; return Promise.resolve() }
    return new Promise(resolve => gsap.to(this.rig, { focus: 1, duration: 1.1, ease: 'power3.inOut', onComplete: resolve }))
  }

  unfocus({ instant = false } = {}) {
    gsap.killTweensOf(this.rig, 'focus')
    this.paused = false
    const done = () => { this.focusedId = null }
    if (instant) { this.rig.focus = 0; done(); return }
    gsap.to(this.rig, { focus: 0, duration: 1.0, ease: 'power3.inOut', onComplete: done })
  }

  /** Stop rendering while an opaque overlay covers the canvas. */
  setPaused(p) { this.paused = p }

  goTo(progress, opts) { this.scroll.jump(progress, opts) }

  /** Scroll position for a given progress, used by the static navigation and tests. */
  scrollYFor(p) { return this.scroll.scrollYFor(p) }

  tick() {
    if (this.paused) { this.clock.getDelta(); return }
    const dt = Math.min(this.clock.getDelta(), 0.1)
    this.update(dt)
    this.render()
    this.perf.sample(dt)
  }

  update(dt) {
    this.time += dt
    const t = this.time
    this.progress = this.scroll.update(dt)
    const p = this.progress
    const st = this.director.seek(p)

    this.rig.update(st, dt, t, { parallax: this.interaction.finePointer })
    const active = this.activeExhibit(p)
    this.env.update(st, t, this.camera, active >= 0 ? EXHIBITS[active].position : null)
    this.fold.update(st, t)
    this.gallery.update(st, t, p, this.hovered, this.focusedId, this.camera)
    this.atrium.update(st, t)
    if (p > 0.25) this.gallery.load()

    // Interactive set follows the chapter: sculpture first, exhibits in the hall.
    const targets = p < 0.3 ? this.fold.interactive : p > 0.47 && p < 0.77 ? this.gallery.interactive : []
    if (targets !== this.lastTargets) { this.interaction.setTargets(targets); this.lastTargets = targets; this.interaction.dirty = true }
    this.interaction.update()

    this.renderer.toneMappingExposure = st.exposure
    if (this.grade) {
      const u = this.grade.uniforms
      u.uTime.value = t
      u.uFlash.value = st.flash
      u.uVignette.value = 0.34 * (1 - st.porcelain * 0.6)
      u.uLiftAmount.value = 0.06 * (1 - st.porcelain)
    }
    if (this.bloom) this.bloom.strength = 0.16 + st.seam * 0.05

    this.onFrame?.({ progress: p, chapter: chapterAt(p), activeExhibit: active, porcelain: st.porcelain })
    if (this.debug) this.writeDiagnostics(st, active)
  }

  activeExhibit(p) {
    let best = -1, bestD = 0.022
    for (let i = 0; i < EXHIBITS.length; i++) {
      const d = Math.abs(p - exhibitProgress(i))
      if (d < bestD) { best = i; bestD = d }
    }
    return best
  }

  render() {
    this.renderer.info.reset()
    if (this.composer) this.composer.render()
    else this.renderer.render(this.scene, this.camera)
  }

  writeDiagnostics(st, active) {
    const c = this.camera
    const target = this.rig.target
    const info = this.renderer.info.render
    window.__experience = {
      progress: +this.progress.toFixed(4),
      scrollProgress: +this.scroll.target.toFixed(4),
      chapter: chapterAt(this.progress).id,
      camera: c.position.toArray().map(v => +v.toFixed(3)),
      target: target.toArray().map(v => +v.toFixed(3)),
      quaternion: c.quaternion.toArray().map(v => +v.toFixed(4)),
      fov: +c.fov.toFixed(2),
      webgl: !!this.renderer.getContext(),
      fps: this.perf.fps,
      tier: this.tier.name,
      dpr: this.renderer.getPixelRatio(),
      drawCalls: info.calls,
      triangles: info.triangles,
      activeExhibit: active,
      hovered: this.hovered,
      focus: +this.rig.focus.toFixed(3),
      state: Object.fromEntries(Object.entries(st).map(([k, v]) => [k, +(+v).toFixed(3)])),
      plate0: this.fold.plates[0].position.toArray().map(v => +v.toFixed(3)),
      projectScreen: this.projectScreenPositions()
    }
  }

  /** Screen-space centres of exhibits (used by automated interaction tests). */
  projectScreenPositions() {
    const v = new Vector3()
    return this.gallery.exhibits.map(ex => {
      ex.image.getWorldPosition(v).project(this.camera)
      return { id: ex.project.id, x: (v.x * 0.5 + 0.5) * innerWidth, y: (-v.y * 0.5 + 0.5) * innerHeight, visible: v.z < 1 && Math.abs(v.x) < 1 && Math.abs(v.y) < 1 }
    })
  }

  stop() { this.renderer?.setAnimationLoop(null) }

  dispose() {
    if (this.disposed) return
    this.disposed = true
    if (window.__activeExperience === this) window.__activeExperience = null
    this.stop()
    if (this.idle) cancelIdleCallback(this.idle)
    clearTimeout(this.idleTimer)
    this.listeners.forEach(off => off())
    gsap.killTweensOf(this.rig)
    gsap.killTweensOf(this.fold)
    this.interaction?.dispose()
    this.scroll?.dispose()
    this.director?.dispose()
    this.fold?.dispose()
    this.gallery?.dispose()
    this.atrium?.dispose()
    this.env?.dispose()
    this.mats?.dispose()
    this.composer?.dispose()
    this.renderer?.dispose()
    delete window.__experience
  }
}
