// Records the full rendered viewport (WebGL + typography) during a continuous scroll through the journey.
// Frames come from the Chrome DevTools screencast; they are then encoded to WebM in-browser with
// MediaRecorder (no ffmpeg needed). Usage: node scripts/record.mjs [desktop|mobile] [seconds] [baseUrl]
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const [profile = 'desktop', seconds = '28', BASE = 'http://127.0.0.1:5173/'] = process.argv.slice(2)
const mobile = profile === 'mobile'
const [width, height] = mobile ? [390, 844] : [1280, 800]
const OUT = 'artifacts/final'
fs.mkdirSync(OUT, { recursive: true })
const wait = ms => new Promise(r => setTimeout(r, ms))

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--use-gl=angle', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required']
})
try {
  const page = await browser.newPage()
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }])
  await page.setViewport({ width, height, isMobile: mobile, hasTouch: mobile })
  await page.goto(`${BASE}?diag&quality=${mobile ? 'mobile' : 'medium'}`, { waitUntil: 'networkidle2', timeout: 120000 })
  await page.waitForFunction(() => window.__experience?.webgl && !document.querySelector('.loader'), { timeout: 120000 })
  await wait(2500)

  const cdp = await page.createCDPSession()
  const frames = []
  cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
    frames.push({ data, t: metadata.timestamp })
    await cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {})
  })
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 80, maxWidth: width, maxHeight: height, everyNthFrame: 1 })

  // Continuous scroll from 0 → 1 with a short hold at each end; the engine damps it like a real visitor.
  const duration = +seconds * 1000
  await wait(1200)
  await page.evaluate(async duration => {
    const e = window.__activeExperience
    const start = performance.now()
    await new Promise(resolve => {
      const step = () => {
        const t = Math.min(1, (performance.now() - start) / duration)
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
        window.scrollTo({ top: e.scrollYFor(eased * 0.62 + t * 0.38), behavior: 'instant' })
        t < 1 ? requestAnimationFrame(step) : resolve()
      }
      requestAnimationFrame(step)
    })
  }, duration)
  await wait(2500)
  await cdp.send('Page.stopScreencast')
  console.log(`captured ${frames.length} frames over ${(frames.at(-1).t - frames[0].t).toFixed(1)} s`)

  // Encode to WebM inside a blank page, respecting the original frame timing.
  const enc = await browser.newPage()
  await enc.setViewport({ width, height })
  await enc.setContent('<canvas id="c"></canvas>')
  const t0 = frames[0].t
  // Transfer frames in chunks (one huge argument crashes the target), decode just in time while recording.
  for (let k = 0; k < frames.length; k += 60) {
    await enc.evaluate(chunk => { (window.F ||= []).push(...chunk) }, frames.slice(k, k + 60).map(f => ({ src: 'data:image/jpeg;base64,' + f.data, ms: (f.t - t0) * 1000 })))
  }
  const base64 = await enc.evaluate(async ({ width, height }) => {
    const timeline = window.F
    const c = document.getElementById('c'); c.width = width; c.height = height
    const g = c.getContext('2d')
    const decode = async src => createImageBitmap(await (await fetch(src)).blob())
    const stream = c.captureStream(30)
    const rec = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9', videoBitsPerSecond: 6_000_000 })
    const chunks = []
    rec.ondataavailable = e => chunks.push(e.data)
    const done = new Promise(r => (rec.onstop = r))
    let next = decode(timeline[0].src)
    rec.start(250)
    const start = performance.now()
    for (let i = 0; i < timeline.length; i++) {
      const bmp = await next
      if (i + 1 < timeline.length) next = decode(timeline[i + 1].src)
      const wait = timeline[i].ms - (performance.now() - start)
      if (wait > 0) await new Promise(r => setTimeout(r, wait))
      g.drawImage(bmp, 0, 0, width, height)
      bmp.close()
    }
    await new Promise(r => setTimeout(r, 400))
    rec.stop()
    await done
    const blob = new Blob(chunks, { type: 'video/webm' })
    const buf = new Uint8Array(await blob.arrayBuffer())
    let s = ''
    for (let k = 0; k < buf.length; k += 0x8000) s += String.fromCharCode(...buf.subarray(k, k + 0x8000))
    return btoa(s)
  }, { width, height })
  const file = `${OUT}/${profile}-journey.webm`
  fs.writeFileSync(file, Buffer.from(base64, 'base64'))
  console.log('wrote', file, (fs.statSync(file).size / 1e6).toFixed(1), 'MB')
} finally {
  await browser.close()
}
