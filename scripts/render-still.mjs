// Renders the arrival composition (no overlays) to public/images/fold-still.webp for the static portfolio.
import puppeteer from 'puppeteer-core'
const BASE = process.argv[2] || 'http://127.0.0.1:5173/'
const wait = ms => new Promise(r => setTimeout(r, ms))
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--use-gl=angle', '--use-angle=d3d11', '--ignore-gpu-blocklist'] })
const p = await b.newPage()
await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }])
await p.setViewport({ width: 1600, height: 1000 })
await p.goto(BASE + '?diag&quality=high&dpr=1', { waitUntil: 'networkidle2' })
await p.waitForFunction(() => window.__experience?.webgl && !document.querySelector('.loader'), { timeout: 120000 })
await p.addStyleTag({ content: '.overlays,.site-header,.skip-link{display:none!important}' })
await p.evaluate(() => window.__activeExperience.goTo(0.035, { fly: false }))
await wait(4000)
await p.screenshot({ path: 'public/images/fold-still.webp', type: 'webp', quality: 82 })
await b.close()
console.log('wrote public/images/fold-still.webp')
