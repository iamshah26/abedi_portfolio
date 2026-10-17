// Composes PNG frames into one labelled contact sheet. Usage: node scripts/contact-sheet.mjs out.png cols a.png b.png ...
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import path from 'node:path'
const [out, cols, ...files] = process.argv.slice(2)
const cells = files.map(f => `<figure><img src="data:image/png;base64,${fs.readFileSync(f).toString('base64')}"><figcaption>${path.basename(f)}</figcaption></figure>`).join('')
const html = `<html><body style="margin:0;background:#222;display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px;padding:6px;font:12px monospace;color:#ddd">${cells}<style>figure{margin:0}img{width:100%;display:block}</style></body></html>`
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true })
const p = await b.newPage()
await p.setViewport({ width: 1800, height: 900 })
await p.setContent(html)
await p.screenshot({ path: out, fullPage: true })
await b.close()
