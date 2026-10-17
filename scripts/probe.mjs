// Art-direction probe: renders the same frame with individual elements toggled to find what a look comes from.
// Usage: node scripts/probe.mjs <progress> <quality>
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const [p = '0', quality = 'high'] = process.argv.slice(2)
const out = 'artifacts/review/probe'
fs.mkdirSync(out, { recursive: true })
const wait = ms => new Promise(r => setTimeout(r, ms))
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--use-gl=angle', '--use-angle=d3d11', '--ignore-gpu-blocklist'] })
const page = await b.newPage()
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }])
await page.setViewport({ width: 900, height: 560 })
await page.goto(`http://127.0.0.1:5173/?quality=${quality}`, { waitUntil: 'networkidle2' })
await page.waitForFunction(() => window.__experience?.webgl)
await page.evaluate(p => window.__activeExperience.goTo(+p, { fly: false }), p)
await page.addStyleTag({ content: '.overlays,.site-header{display:none!important}' })
await wait(2500)
const toggles = {
  base: 'null',
  noSky: 'e.env.sky.visible=false',
  noCones: 'e.env.stageCone.visible=false; e.env.stageCone.material.uniforms.uIntensity.value=0',
  noDust: 'e.env.dust.visible=false',
  noFloor: 'if(e.env.reflector) e.env.reflector.visible=false; e.env.floorFallback.visible=false',
  noGrade: 'e.grade && (e.grade.enabled=false)',
  noBloom: 'e.bloom && (e.bloom.enabled=false)',
  noEnv: 'e.scene.environment=null',
  noFold: 'e.fold.group.visible=false',
  noTransmission: 'e.mats.setTransmission(false, e.glassMeshes)'
}
for (const [name, code] of Object.entries(toggles)) {
  await page.evaluate(code => {
    const e = window.__activeExperience
    e._origUpdate ||= e.env.update.bind(e.env)
    e.env.update = (...a) => { e._origUpdate(...a); new Function('e', code)(e) }
  }, code)
  await wait(700)
  const px = await page.evaluate(() => {
    const c = document.querySelector('canvas'); const g = c.getContext('webgl2'); return null
  })
  await page.screenshot({ path: `${out}/${name}.png` })
  console.log(name, px)
  await page.evaluate(() => { const e = window.__activeExperience; e.env.update = e._origUpdate; e.env.sky.visible = true; e.env.dust.visible = true; if (e.env.reflector) e.env.reflector.visible = true; e.grade && (e.grade.enabled = true); e.bloom && (e.bloom.enabled = true) })
}
await b.close()
