// Quick visual review: captures the rendered experience at chosen progress values.
// Usage: node scripts/shots.mjs <outDir> <width> <height> <p1,p2,...> [quality] [baseUrl]
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const [out = 'artifacts/review', w = '1440', h = '900', list = '0,0.15,0.3,0.45,0.6,0.75,0.9,1', quality = 'high', base = 'http://127.0.0.1:5173/'] = process.argv.slice(2)
fs.mkdirSync(out, { recursive: true })
const width = +w, height = +h
const mobile = width < 600
const wait = ms => new Promise(r => setTimeout(r, ms))
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--use-gl=angle', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-gpu-rasterization']
})
const errors = []
try {
  const page = await browser.newPage()
  page.on('pageerror', e => errors.push('pageerror: ' + e.message))
  page.on('console', m => { if (['error', 'warning'].includes(m.type())) errors.push(`${m.type()}: ${m.text()}`) })
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }])
  await page.setViewport({ width, height, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 })
  await page.goto(`${base}?quality=${quality}${process.env.EXTRA || ""}`, { waitUntil: 'networkidle2', timeout: 90000 })
  await page.waitForFunction(() => window.__experience?.webgl, { timeout: 90000 })
  await wait(2500)
  for (const p of list.split(',').map(Number)) {
    await page.evaluate(p => window.__activeExperience.goTo(p, { fly: false }), p)
    await wait(2200)
    const d = await page.evaluate(() => window.__experience)
    const name = `${out}/${mobile ? 'm' : 'd'}${width}-${String(Math.round(p * 1000)).padStart(4, '0')}.png`
    await page.screenshot({ path: name })
    console.log(name, d.chapter, 'cam', d.camera.join(','), 'fps', d.fps, 'tris', d.triangles, 'calls', d.drawCalls)
  }
} finally {
  await browser.close()
  console.log(errors.length ? errors.slice(0, 30).join('\n') : 'no console errors')
}
