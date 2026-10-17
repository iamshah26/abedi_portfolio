import {
  BackSide, BoxGeometry, BufferGeometry, CanvasTexture, CatmullRomCurve3, Color, CylinderGeometry, DirectionalLight,
  Float32BufferAttribute, FogExp2, Group, HemisphereLight, PointLight, InstancedMesh, MathUtils, Matrix4, Mesh, MeshBasicMaterial,
  MeshPhysicalMaterial, Object3D, PlaneGeometry, PMREMGenerator, Points, Quaternion, Scene, SphereGeometry,
  SpotLight, SRGBColorSpace, Vector3, Euler
} from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { coneMaterial, dustMaterial, FloorReflectorShader, guideMaterial, skyMaterial } from '../materials/shaders.js'
import { palette } from '../palette.js'
import { ATRIUM, EXHIBITS, FINAL_ORIGIN, NAME_WALL, NAME_WALL_MOBILE, NAME_WALL_YAW, SCULPTURE_ORIGIN } from '../layout.js'

const C = hex => new Color(hex)

/** Studio environment for PBR reflections: dark room with designed softboxes (dark) or a bright gallery (porcelain). */
function studioEnvironment(renderer, bright) {
  const scene = new Scene()
  const room = new Mesh(new BoxGeometry(40, 20, 40), new MeshBasicMaterial({ color: bright ? C('#d9d3c8') : C('#060609'), side: BackSide }))
  scene.add(room)
  const box = (w, h, color, intensity, pos, rot) => {
    const m = new Mesh(new PlaneGeometry(w, h), new MeshBasicMaterial({ color: C(color).multiplyScalar(intensity), side: 2 }))
    m.position.set(...pos)
    m.rotation.set(...rot)
    scene.add(m)
  }
  if (bright) {
    box(18, 8, '#fff6ea', 2.4, [0, 9.5, 0], [Math.PI / 2, 0, 0])
    box(2, 12, palette.persimmon, 1.1, [-19, 3, 0], [0, Math.PI / 2, 0])
    box(12, 3, '#ffffff', 1.4, [0, 4, -19], [0, 0, 0])
  } else {
    box(14, 5, '#fff3e4', 3.8, [-2, 9.5, 2], [Math.PI / 2, 0, 0])
    box(3, 9, '#fff1e4', 1.6, [-12, 4, 14], [0, Math.PI * 0.8, 0])
    box(1.4, 12, palette.lavender, 1.1, [-19, 3, -4], [0, Math.PI / 2, 0])
    box(1.0, 12, palette.titanium, 2.8, [19, 3, 3], [0, -Math.PI / 2, 0])
    box(9, 0.7, palette.persimmon, 2.4, [4, 1.1, -19], [0, 0, 0])
    box(10, 3, '#ffffff', 0.35, [0, 3, 19], [0, Math.PI, 0])
  }
  const pmrem = new PMREMGenerator(renderer)
  const rt = pmrem.fromScene(scene, 0.035)
  pmrem.dispose()
  scene.traverse(o => { o.geometry?.dispose(); o.material?.dispose() })
  return rt
}

/** The name wall: one line for landscape compositions, stacked for portrait (mobile) compositions. */
function nameTexture(stacked) {
  const c = document.createElement('canvas')
  c.width = stacked ? 2048 : 4096
  c.height = stacked ? 1400 : 640
  const g = c.getContext('2d')
  g.fillStyle = '#ffffff'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  if ('fontStretch' in g) g.fontStretch = 'expanded'
  if ('letterSpacing' in g) g.letterSpacing = stacked ? '28px' : '40px'
  g.font = `200 ${stacked ? 540 : 470}px "Archivo", "Helvetica Neue", Arial, sans-serif`
  if (stacked) {
    g.fillText('ALI', 1024, 380, 1900)
    g.fillText('HAIDER', 1024, 1020, 1900)
  } else g.fillText('ALI HAIDER', 2048, 340, 3900)
  const t = new CanvasTexture(c)
  t.colorSpace = SRGBColorSpace
  t.anisotropy = 8
  return t
}

function ribbon(points, width, { y = 0.012, seeds = false } = {}) {
  const pos = [], uv = [], len = [], idx = [], seed = []
  const n = points.length
  const s = Math.random()
  for (let i = 0; i < n; i++) {
    const p = points[i]
    const q = points[Math.min(n - 1, i + 1)], r = points[Math.max(0, i - 1)]
    const dir = new Vector3().subVectors(q, r).setY(0).normalize()
    const perp = new Vector3(-dir.z, 0, dir.x).multiplyScalar(width / 2)
    pos.push(p.x - perp.x, y, p.z - perp.z, p.x + perp.x, y, p.z + perp.z)
    uv.push(i / (n - 1), 0, i / (n - 1), 1)
    len.push(i / (n - 1), i / (n - 1))
    seed.push(s, s)
    if (i < n - 1) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2) }
  }
  const g = new BufferGeometry()
  g.setAttribute('position', new Float32BufferAttribute(pos, 3))
  g.setAttribute('uv', new Float32BufferAttribute(uv, 2))
  g.setAttribute('aLen', new Float32BufferAttribute(len, 1))
  if (seeds) g.setAttribute('aSeed', new Float32BufferAttribute(seed, 1))
  g.setIndex(idx)
  return g
}
export { ribbon }

export class Environment {
  constructor(renderer, scene, mats, tier) {
    this.scene = scene
    this.mats = mats
    this.tier = tier
    this.group = new Group()
    this.group.name = 'environment'
    scene.add(this.group)

    // Lighting environments
    this.envDark = studioEnvironment(renderer, false)
    this.envBright = studioEnvironment(renderer, true)
    scene.environment = this.envDark.texture
    scene.environmentIntensity = 0.6

    // Sky + fog
    this.sky = new Mesh(new SphereGeometry(400, 32, 16), skyMaterial())
    this.sky.renderOrder = -10
    this.sky.frustumCulled = false
    this.group.add(this.sky)
    this.fog = new FogExp2(palette.obsidian, 0.045)
    scene.fog = this.fog
    scene.background = C(palette.obsidian)

    this.buildFloor(tier)
    this.buildLights(tier)
    this.buildMonoliths()
    this.buildDust(tier)
    this.buildGuides()
    this.buildNameWall()

    // Stage cones over the sculpture at arrival and finale
    this.stageCone = new Mesh(new CylinderGeometry(0.2, 4.4, 24, 48, 1, true), coneMaterial(palette.porcelain))
    this.stageCone.position.set(SCULPTURE_ORIGIN.x, 12, SCULPTURE_ORIGIN.z)
    this.finalCone = new Mesh(new CylinderGeometry(0.2, 5.2, 24, 48, 1, true), coneMaterial('#fff4e6'))
    this.finalCone.position.set(FINAL_ORIGIN.x, 12, FINAL_ORIGIN.z)
    this.coneScale = tier.mobile ? 0.55 : 1
    this.group.add(this.stageCone, this.finalCone)

    this.colors = {
      fogDark: C('#0b0b0e'), fogHall: C('#131011'), fogPorcelain: C('#ece7de'),
      skyTopDark: C('#060608'), skyHorDark: C('#0e0d12'), skyBotDark: C('#050506'),
      skyTopP: C('#f4f1ea'), skyHorP: C('#e9e3d9'), skyBotP: C('#ddd6ca'),
      floorDark: C(palette.obsidian), floorP: C("#d9d2c5"),
      tmp: new Color()
    }
    this.stage = new Vector3()
  }

  buildFloor(tier) {
    const geo = new PlaneGeometry(420, 420)
    this.floorFallback = new Mesh(geo, new MeshPhysicalMaterial({ color: C('#0c0c10'), metalness: 0.6, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.15, envMapIntensity: 0.8 }))
    this.floorFallback.rotation.x = -Math.PI / 2
    this.floorFallback.receiveShadow = true
    this.floorFallback.position.z = -70
    this.group.add(this.floorFallback)
    this.reflector = null
    if (tier.reflector > 0) {
      const w = Math.round(window.innerWidth * tier.dpr * tier.reflector)
      const h = Math.round(window.innerHeight * tier.dpr * tier.reflector)
      this.reflector = new Reflector(geo, { shader: FloorReflectorShader, textureWidth: w, textureHeight: h, clipBias: 0.003, multisample: 0 })
      this.reflector.material.fog = true
      this.reflector.material.uniforms.uTexel.value.set(1 / w, 1 / h)
      this.reflector.rotation.x = -Math.PI / 2
      this.reflector.position.y = 0.001
      this.reflector.position.z = -70
      this.group.add(this.reflector)
      this.floorFallback.visible = false
    }
  }

  setReflectorScale(scale, dpr) {
    if (!this.reflector) return
    if (scale <= 0) {
      this.reflector.visible = false
      this.floorFallback.visible = true
      return
    }
    const w = Math.round(window.innerWidth * dpr * scale), h = Math.round(window.innerHeight * dpr * scale)
    this.reflector.getRenderTarget().setSize(w, h)
    this.reflector.material.uniforms.uTexel.value.set(1 / w, 1 / h)
  }

  buildLights(tier) {
    this.hemi = new HemisphereLight(C('#2b2634'), C('#0d0d11'), 0.5)
    this.key = new SpotLight(C('#fff1e2'), 260, 0, 0.5, 0.85, 2)
    this.key.position.set(-6, 14, 8)
    this.key.castShadow = tier.shadows
    this.key.shadow.mapSize.set(1024, 1024)
    this.key.shadow.bias = -0.0004
    this.key.shadow.normalBias = 0.02
    this.key.shadow.camera.near = 4
    this.key.shadow.camera.far = 40
    this.rim = new DirectionalLight(C(palette.lavender), 1.4)
    this.rim.position.set(5, 6, -10)
    this.sweep = new SpotLight(C(palette.persimmon), 140, 0, 0.32, 1, 2)
    this.follow = new SpotLight(C('#fff6ec'), 0, 0, 0.42, 0.9, 2)
    this.follow.position.set(0, 9, -20)
    // Pointer light (fine pointers only): a warm lamp the visitor can move across the sculpture
    this.cursor = tier.mobile ? null : new PointLight(C('#ffd8c2'), 0, 10, 2)
    if (this.cursor) this.group.add(this.cursor)
    this.group.add(this.hemi, this.key, this.key.target, this.rim, this.rim.target, this.sweep, this.sweep.target, this.follow, this.follow.target)
  }

  buildMonoliths() {
    const mono = (w, h, d, x, z, ry = 0, rz = 0) => {
      const m = new Mesh(new RoundedBoxGeometry(w, h, d, 3, 0.06), this.mats.obsidian)
      m.position.set(x, h / 2 - 0.05, z)
      m.rotation.set(0, ry, rz)
      m.receiveShadow = true
      this.group.add(m)
      return m
    }
    // Arrival: foreground framing and depth layers
    mono(1.5, 9.5, 1.1, -8.4, 8.6, 0.35, 0.03)
    mono(2.3, 13, 1.7, -13.5, -7, 0.2)
    mono(1.7, 11, 1.6, 11.5, -9, -0.45)
    mono(4.2, 1.1, 1.4, 7.4, 7.6, -0.6)
    mono(0.9, 6.5, 0.9, 15, 4, 0.2, -0.04)
    // Finale: the same grammar, mirrored
    mono(1.6, 10, 1.3, 8.6, -131, -0.4)
    mono(2.2, 12.5, 1.8, -12.5, -150, 0.25)
    mono(4, 1.0, 1.3, -6.8, -133.5, 0.5)
    // Hall: an instanced colonnade of obsidian piers
    const geo = new RoundedBoxGeometry(1, 1, 1, 2, 0.04)
    const piers = []
    for (let z = -28; z >= -84; z -= 11) for (const side of [-1, 1]) piers.push([side * (10.5 + ((z * 7) % 3)), z + side * 2, 1.2 + ((-z * 3) % 5) * 0.12, 9 + ((-z * 13) % 5)])
    const inst = new InstancedMesh(geo, this.mats.obsidian, piers.length)
    const m4 = new Matrix4(), q = new Quaternion()
    piers.forEach(([x, z, w, h], i) => {
      m4.compose(new Vector3(x, h / 2, z), q.setFromEuler(new Euler(0, (i % 3) * 0.2, 0)), new Vector3(w, h, w))
      inst.setMatrixAt(i, m4)
    })
    this.group.add(inst)
  }

  buildDust(tier) {
    const count = tier.dust
    const pos = new Float32Array(count * 3), seed = new Float32Array(count)
    const zones = [[SCULPTURE_ORIGIN, 9, 7], [new Vector3(0, 3, -48), 9, 34], [ATRIUM, 9, 9], [FINAL_ORIGIN, 10, 9]]
    for (let i = 0; i < count; i++) {
      const [c, r, depth] = zones[i % zones.length]
      pos[i * 3] = c.x + (Math.random() - 0.5) * 2 * r
      pos[i * 3 + 1] = 0.3 + Math.random() * 8
      pos[i * 3 + 2] = c.z + (Math.random() - 0.5) * 2 * depth
      seed[i] = Math.random()
    }
    const g = new BufferGeometry()
    g.setAttribute('position', new Float32BufferAttribute(pos, 3))
    g.setAttribute('aSeed', new Float32BufferAttribute(seed, 1))
    this.dust = new Points(g, dustMaterial(tier.dpr))
    this.dust.frustumCulled = false
    this.group.add(this.dust)
  }

  buildGuides() {
    const curve = new CatmullRomCurve3([[0, -12], [0.5, -24], [-0.5, -34], [0.5, -44], [-0.5, -54], [0.5, -64], [-0.5, -74], [-2.2, -86], [-3, -94]].map(([x, z]) => new Vector3(x, 0, z)))
    const base = curve.getSpacedPoints(360)
    this.guideMat = guideMaterial(palette.porcelain)
    for (const off of [-2.5, 2.5]) {
      const pts = base.map((p, i) => {
        const t = curve.getTangentAt(i / 360)
        return p.clone().add(new Vector3(-t.z, 0, t.x).multiplyScalar(off))
      })
      const m = new Mesh(ribbon(pts, 0.04), this.guideMat)
      m.renderOrder = 1
      this.group.add(m)
    }
  }

  buildNameWall() {
    this.nameMat = new MeshBasicMaterial({ map: nameTexture(false), color: C('#d6d0c5'), transparent: true, depthWrite: false, fog: false })
    this.nameWall = new Mesh(new PlaneGeometry(18, 2.81), this.nameMat)
    this.nameWall.position.copy(NAME_WALL)
    this.nameWall.rotation.y = NAME_WALL_YAW
    this.group.add(this.nameWall)
  }

  /** Swap the name wall between the landscape and portrait compositions. */
  setProfile(profile) {
    const stacked = profile === 'mobile'
    if (this.nameStacked === stacked) return
    this.nameStacked = stacked
    this.nameMat.map.dispose()
    this.nameMat.map = nameTexture(stacked)
    this.nameWall.geometry.dispose()
    this.nameWall.geometry = stacked ? new PlaneGeometry(9.4, 6.43) : new PlaneGeometry(18, 2.81)
    this.nameWall.position.copy(stacked ? NAME_WALL_MOBILE : NAME_WALL)
    this.nameWall.rotation.y = stacked ? 0 : NAME_WALL_YAW
  }

  update(st, time, camera, activeExhibit) {
    const c = this.colors
    const P = st.porcelain
    // Stage origin travels from the arrival to the finale
    this.stage.lerpVectors(SCULPTURE_ORIGIN, FINAL_ORIGIN, st.stage)
    const s = this.stage

    // Fog and sky
    c.tmp.copy(c.fogDark).lerp(c.fogHall, st.hallTint).lerp(c.fogPorcelain, P)
    this.fog.color.copy(c.tmp)
    this.fog.density = st.fog
    this.scene.background.copy(c.tmp)
    const su = this.sky.material.uniforms
    su.uTop.value.copy(c.skyTopDark).lerp(c.skyTopP, P)
    su.uHorizon.value.copy(c.skyHorDark).lerp(c.skyHorP, P)
    su.uBottom.value.copy(c.skyBotDark).lerp(c.skyBotP, P)
    this.sky.position.copy(camera.position)

    // Environment lighting
    this.scene.environment = P > 0.55 ? this.envBright.texture : this.envDark.texture
    this.scene.environmentIntensity = st.env * (P > 0.55 ? 0.85 : 1)
    this.hemi.intensity = 0.45 + P * 1.6
    this.hemi.color.set('#2b2634').lerp(C('#fffaf2'), P)
    this.hemi.groundColor.set('#0d0d11').lerp(C('#d6cfc3'), P)

    this.key.position.set(s.x - 6, 14, s.z + 8)
    this.key.target.position.copy(s)
    this.key.intensity = 185 * st.key
    this.key.color.set('#fff1e2').lerp(C('#ffe6d2'), P)
    this.rim.position.set(s.x + 5, 6, s.z - 10)
    this.rim.target.position.copy(s)
    this.rim.intensity = 1.4 * st.rim
    const a = time * 0.22
    this.sweep.position.set(s.x + Math.cos(a) * 9, 5.5 + Math.sin(a * 0.7) * 2, s.z + Math.sin(a) * 9)
    this.sweep.target.position.copy(s)
    this.sweep.intensity = 95 * st.sweep

    // Gallery follow light rests over the exhibit in view
    if (activeExhibit) {
      this.follow.target.position.lerp(activeExhibit, 0.08)
      this.follow.position.lerp(new Vector3(activeExhibit.x * 0.6, 13.5, activeExhibit.z + 5), 0.08)
    }
    this.follow.intensity = 260 * st.hall * (1 - P)

    // Floor
    if (this.reflector) {
      const u = this.reflector.material.uniforms
      u.uBase.value.copy(c.floorDark).lerp(c.floorP, P)
      u.uStrength.value = 1 - P * 0.55
      u.uGlowPos.value.copy(s)
      u.uGlow.value = st.sweep * 0.22
      u.uTime.value = time
    }
    this.floorFallback.material.color.set('#0c0c10').lerp(C('#d9d2c5'), P)
    this.floorFallback.material.metalness = 0.6 * (1 - P)

    this.mats.applyPorcelain(P)

    // Atmosphere
    this.dust.material.uniforms.uTime.value = time
    this.dust.material.uniforms.uOpacity.value = 0.32 * (1 - P * 0.7)
    this.dust.material.uniforms.uColor.value.set('#e9e1d6').lerp(C('#b39a86'), P)
    this.stageCone.material.uniforms.uIntensity.value = 0.5 * this.coneScale * st.sweep * (1 - st.stage)
    this.stageCone.visible = st.stage < 0.99
    this.finalCone.material.uniforms.uIntensity.value = 0.2 * this.coneScale * st.stage
    this.finalCone.visible = st.stage > 0.01
    for (const cone of [this.stageCone, this.finalCone]) cone.material.uniforms.uTime.value = time
    this.guideMat.uniforms.uDraw.value = st.guides
    this.guideMat.uniforms.uTime.value = time
    this.guideMat.uniforms.uIntensity.value = 0.6 * (1 - P)

    this.nameMat.opacity = st.name
    this.nameWall.visible = st.name > 0.01
  }

  dispose() {
    this.envDark.dispose()
    this.envBright.dispose()
    this.reflector?.dispose()
    this.group.traverse(o => {
      o.geometry?.dispose()
      if (o.material && o.material !== this.mats.obsidian) { o.material.map?.dispose(); o.material.dispose?.() }
    })
  }
}
