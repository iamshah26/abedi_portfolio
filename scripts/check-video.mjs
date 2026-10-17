// Samples frames from a recorded WebM to confirm it decodes and shows the journey. Usage: node scripts/check-video.mjs file.webm out.png
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
const [file, out] = process.argv.slice(2)
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true })
const p = await b.newPage()
await p.setViewport({ width: 1600, height: 900 })
const data = 'data:video/webm;base64,' + fs.readFileSync(file).toString('base64')
const info = await p.evaluate(async src => {
  const v = document.createElement('video'); v.src = src; v.muted = true; document.body.style.margin = 0
  await new Promise(r => (v.onloadeddata = r))
  // WebM from MediaRecorder lacks a duration header until seeked to the end
  v.currentTime = 1e6; await new Promise(r => (v.onseeked = r))
  const duration = v.currentTime
  const grid = document.createElement('div'); grid.style.cssText = 'display:grid;grid-template-columns:repeat(4,1fr);gap:4px;background:#111'
  document.body.append(grid)
  for (let i = 0; i < 8; i++) {
    v.currentTime = (duration * (i + 0.5)) / 8; await new Promise(r => (v.onseeked = r))
    const c = document.createElement('canvas'); c.width = v.videoWidth; c.height = v.videoHeight; c.style.width = '100%'
    c.getContext('2d').drawImage(v, 0, 0); grid.append(c)
  }
  return { duration: +duration.toFixed(1), w: v.videoWidth, h: v.videoHeight }
}, data)
await p.screenshot({ path: out, fullPage: true })
console.log(file, JSON.stringify(info))
await b.close()
