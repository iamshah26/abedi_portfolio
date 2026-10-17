// Captures non-scroll UI states (menu summary, static page, prerendered case study) for review.
import puppeteer from 'puppeteer-core'
const [dev = 'http://127.0.0.1:5173/', prod = 'http://127.0.0.1:4173/', out = 'artifacts/review/ui'] = process.argv.slice(2)
import fs from 'node:fs'; fs.mkdirSync(out, { recursive: true })
const wait = ms => new Promise(r => setTimeout(r, ms))
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--use-gl=angle', '--use-angle=d3d11'] })
const shot = async (url, file, { w = 1440, h = 900, reduced = false, full = false, delay = 2500 } = {}) => {
  const p = await b.newPage()
  await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }])
  await p.setViewport({ width: w, height: h, isMobile: w < 600, hasTouch: w < 600 })
  await p.goto(url, { waitUntil: 'networkidle2', timeout: 120000 }); await wait(delay)
  await p.screenshot({ path: `${out}/${file}`, fullPage: full }); await p.close(); console.log(file)
}
await shot(`${dev}?quality=low#/glance`, 'menu-glance.png', { delay: 6000 })
await shot(`${dev}?quality=mobile#/glance`, 'menu-glance-m.png', { w: 390, h: 844, delay: 6000 })
await shot(`${dev}?static`, 'static.png', { full: true })
await shot(`${prod}work/raahee/`, 'prerender-raahee.png', { full: true })
await b.close()
