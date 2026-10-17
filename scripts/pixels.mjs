// Reads average colours of regions in PNGs. Usage: node scripts/pixels.mjs file.png x,y,w,h [...]
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
const [file, ...regions] = process.argv.slice(2)
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true })
const p = await b.newPage()
const res = await p.evaluate(async (src, regions) => {
  const img = new Image(); img.src = src; await img.decode()
  const c = document.createElement('canvas'); c.width = img.width; c.height = img.height
  const g = c.getContext('2d'); g.drawImage(img, 0, 0)
  return regions.map(r => { const [x, y, w, h] = r.split(',').map(Number); const d = g.getImageData(x, y, w, h).data; let s = [0, 0, 0]; for (let i = 0; i < d.length; i += 4) { s[0] += d[i]; s[1] += d[i + 1]; s[2] += d[i + 2] } const n = d.length / 4; return r + ' → ' + s.map(v => Math.round(v / n)).join(',') })
}, 'data:image/png;base64,' + fs.readFileSync(file).toString('base64'), regions)
console.log(res.join('\n'))
await b.close()
