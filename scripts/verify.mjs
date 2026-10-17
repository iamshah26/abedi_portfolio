// End-to-end browser verification of THE SPACE BETWEEN.
// Usage: node scripts/verify.mjs [baseUrl]   (dev server or `vite preview`)
// Writes screenshots and artifacts/final/verification.json. Exits non-zero if any check fails.
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const BASE = process.argv[2] || 'http://127.0.0.1:5173/'
const OUT = 'artifacts/final'
fs.mkdirSync(`${OUT}/frames`, { recursive: true })
fs.mkdirSync(`${OUT}/viewports`, { recursive: true })
const wait = ms => new Promise(r => setTimeout(r, ms))
const report = { base: BASE, date: new Date().toISOString(), checks: [], frames: {}, viewports: [], errors: [], failedRequests: [], fps: {} }
const check = (name, ok, detail = '') => { report.checks.push({ name, ok: !!ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`) }
const dist = (a, b) => Math.hypot(...a.map((v, i) => v - b[i]))

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--use-gl=angle', '--use-angle=d3d11', '--ignore-gpu-blocklist']
})

async function open({ width, height, mobile = false, reduced = false, hash = '', query = '' }) {
  const page = await browser.newPage()
  page.on('pageerror', e => report.errors.push(`[${width}] ${e.message}`))
  page.on('console', m => { if (m.type() === 'error') report.errors.push(`[${width}] console: ${m.text()}`) })
  page.on('response', r => { if (r.url().startsWith(BASE) && r.status() >= 400) report.failedRequests.push(`${r.status()} ${r.url()}`) })
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }])
  await page.setViewport({ width, height, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 })
  const q = query ? query + '&diag' : '?diag'
  await page.goto(`${BASE}${q}${hash}`, { waitUntil: 'networkidle2', timeout: 120000 })
  return page
}
const ready = page => page.waitForFunction(() => window.__experience?.webgl && !document.querySelector('.loader'), { timeout: 120000 })
const diag = page => page.evaluate(() => window.__experience)
async function scrollToProgress(page, p) {
  await page.evaluate(p => { const e = window.__activeExperience; window.scrollTo({ top: e.scrollYFor(p), behavior: 'instant' }) }, p)
}
async function settle(page, p, ms = 600) {
  await page.waitForFunction(p => Math.abs(window.__experience.progress - p) < 0.002, { timeout: 30000 }, p).catch(() => {})
  await wait(ms)
}

try {
  // ---------------------------------------------------------------- Frames: desktop + mobile
  const PROGRESS = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]
  for (const [name, width, height, mobile] of [['desktop', 1440, 900, false], ['mobile', 390, 844, true]]) {
    const page = await open({ width, height, mobile, query: '?quality=' + (mobile ? 'mobile' : 'high') })
    await ready(page)
    await wait(1500)
    report.frames[name] = []
    for (const p of PROGRESS) {
      await scrollToProgress(page, p)
      await settle(page, p, 1400)
      const d = await diag(page)
      report.frames[name].push({ p, progress: d.progress, chapter: d.chapter, camera: d.camera, target: d.target, quaternion: d.quaternion, fov: d.fov, fps: d.fps, drawCalls: d.drawCalls, triangles: d.triangles, state: d.state })
      await page.screenshot({ path: `${OUT}/frames/${name}-${String(Math.round(p * 100)).padStart(3, '0')}.png` })
    }
    const f = report.frames[name]
    check(`${name}: WebGL renders real geometry at every capture`, f.every(x => x.triangles > 5000), `min triangles ${Math.min(...f.map(x => x.triangles))}`)
    check(`${name}: progress reaches each requested position`, f.every(x => Math.abs(x.progress - x.p) < 0.003), f.map(x => x.progress).join(', '))
    const travel = dist(f[0].camera, f[3].camera)
    check(`${name}: camera travels through space (0%→45%)`, travel > 10, `${travel.toFixed(1)} m`)
    const axes = [0, 1, 2].map(k => Math.max(...f.map(x => x.camera[k])) - Math.min(...f.map(x => x.camera[k])))
    check(`${name}: camera path is non-linear (X, Y and Z all vary)`, axes.every(a => a > 3), `ranges x ${axes[0].toFixed(1)} y ${axes[1].toFixed(1)} z ${axes[2].toFixed(1)}`)
    check(`${name}: orientation changes`, dist(f[0].quaternion, f[2].quaternion) > 0.2)
    check(`${name}: geometry transforms with progress`, f[0].state.separate === 0 && f[2].state.separate > 0.9 && f[4].state.toGallery === 1 && f[7].state.toFinal === 1)
    check(`${name}: light and material state change`, f[0].state.porcelain === 0 && f[7].state.porcelain === 1 && f[3].state.seam !== f[0].state.seam)
    check(`${name}: final chapter reached`, f[7].chapter === 'contact')
    report.fps[name] = f.map(x => ({ p: x.p, fps: x.fps, drawCalls: x.drawCalls }))

    // Reverse scrolling restores the opening pose
    await scrollToProgress(page, 0)
    await settle(page, 0, 1500)
    const back = await diag(page)
    check(`${name}: reverse scroll restores the arrival camera`, dist(back.camera, f[0].camera) < 0.6, `Δ ${dist(back.camera, f[0].camera).toFixed(3)} m (pointer parallax and breath allowed)`)

    // Native input
    if (mobile) {
      const cdp = await page.createCDPSession()
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 200, y: 700 }] })
      for (let y = 680; y >= 200; y -= 24) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 200, y }] }); await wait(16) }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
      await cdp.detach()
    } else {
      await page.mouse.move(700, 450)
      for (let i = 0; i < 6; i++) { await page.mouse.wheel({ deltaY: 300 }); await wait(60) }
    }
    await wait(1500)
    const moved = await diag(page)
    check(`${name}: native ${mobile ? 'touch swipe' : 'wheel'} scrolls the journey`, moved.scrollProgress > 0.002, `progress ${moved.scrollProgress}`)

    // Exhibit interaction: raycast click/tap on the artwork opens its case study
    await scrollToProgress(page, 0.57)
    await settle(page, 0.57, 1500)
    const screens = (await diag(page)).projectScreen
    const target = screens.find(s => s.id === 'raahee')
    if (mobile) await page.touchscreen.tap(target.x, target.y)
    else { await page.mouse.move(target.x, target.y); await wait(400); await page.mouse.click(target.x, target.y) }
    await page.waitForFunction(() => location.hash === '#/work/raahee', { timeout: 8000 }).catch(() => {})
    await page.waitForSelector('.case h1', { timeout: 8000 }).catch(() => {})
    const caseTitle = await page.$eval('.case h1', e => e.textContent).catch(() => null)
    check(`${name}: tapping/clicking an exhibit opens its case study`, caseTitle === 'Raahee', `hash ${await page.evaluate(() => location.hash)}`)
    await wait(1400)
    await page.screenshot({ path: `${OUT}/frames/${name}-case-study.png` })
    await page.click('.case .back')
    await page.waitForFunction(() => !document.querySelector('.case'), { timeout: 8000 }).catch(() => {})
    check(`${name}: back button returns to the exhibition`, await page.evaluate(() => !document.querySelector('.case') && !location.hash.includes('work/')))

    // Menu: focus containment, escape, chapter navigation
    await page.click('.menu-button')
    await page.waitForSelector('#site-menu')
    await wait(900)
    await page.keyboard.press('Tab')
    const inMenu = await page.evaluate(() => document.getElementById('site-menu').contains(document.activeElement) || document.activeElement.classList.contains('menu-button'))
    check(`${name}: menu traps keyboard focus`, inMenu)
    await page.keyboard.press('Escape')
    await page.waitForFunction(() => !document.getElementById('site-menu'), { timeout: 5000 }).catch(() => {})
    check(`${name}: Escape closes the menu`, await page.evaluate(() => !document.getElementById('site-menu')))
    await page.click('.menu-button')
    await page.waitForSelector('#site-menu a[href="#/contact"]')
    await wait(700)
    await page.click('#site-menu a[href="#/contact"]')
    await page.waitForFunction(() => window.__experience.progress > 0.99, { timeout: 15000 }).catch(() => {})
    await wait(1200)
    check(`${name}: menu "Contact" flies to the final scene`, (await diag(page)).progress > 0.99)
    const links = await page.$$eval('.final .contact-links a', as => as.map(a => a.getAttribute('href')))
    check(`${name}: final scene exposes email, LinkedIn, GitHub and resume`, links.length === 4 && links[0].startsWith('mailto:') && links.some(h => h.includes('linkedin.com/in/')) && links.some(h => h.includes('github.com/')) && links.some(h => h.endsWith('.pdf')), links.join(' '))
    await page.screenshot({ path: `${OUT}/frames/${name}-contact.png` })
    const start = await page.$eval('.final .o-start', a => a.getAttribute('href')).catch(() => '')
    check(`${name}: "Start a project" opens a prefilled email`, start.startsWith('mailto:haiderabedi26@gmail.com?subject='))

    // Seam wipe appears when the chapter changes
    await scrollToProgress(page, 0.3)
    await settle(page, 0.3, 300)
    check(`${name}: chapter change triggers the seam wipe`, await page.evaluate(() => !!document.querySelector('.seam-wipe')))

    // Engineer chapter: RxJS operator switch recomputes the output stream
    await scrollToProgress(page, 0.8)
    await settle(page, 0.8, 1200)
    await page.click('.engineer .ops button:nth-child(3)')
    await wait(300)
    const marbles = await page.evaluate(() => ({ checked: document.querySelector('.engineer .ops button[aria-checked="true"]')?.textContent, out: document.querySelectorAll('.engineer .m.out').length }))
    check(`${name}: RxJS marble diagram switches operator (debounceTime → 4 outputs)`, marbles.checked === 'debounceTime' && marbles.out === 4, JSON.stringify(marbles))

    if (!mobile) {
      // Chapter ticks navigate
      await page.click('.chapter .tick:nth-of-type(3)')
      await page.waitForFunction(() => Math.abs(window.__experience.progress - 0.515) < 0.01, { timeout: 15000 }).catch(() => {})
      check('desktop: HUD chapter tick flies to Selected Work', Math.abs((await diag(page)).progress - 0.515) < 0.01)
      const resume = await page.$eval('.resume-link', a => a.getAttribute('href'))
      check('desktop: header resume link points to the PDF', resume.endsWith('.pdf'))
      // Idle drift: the arrival camera orbits after ~6 s without input
      await scrollToProgress(page, 0)
      await settle(page, 0, 1500)
      const a = (await diag(page)).camera
      await wait(11000)
      const b = (await diag(page)).camera
      check('desktop: idle drift moves the arrival camera', dist(a, b) > 0.1, `Δ ${dist(a, b).toFixed(2)} m`)
    }
    await page.close()
  }

  // ---------------------------------------------------------------- Resume and imagery reachable
  const page0 = await browser.newPage()
  for (const url of ['Syed_Ali_Haider_Abedi_Resume.pdf', 'images/products/raahee.webp', 'images/products/pulse.webp', 'images/products/thexperto.webp', 'images/products/intevo.webp', 'images/profile.jpeg']) {
    const res = await page0.goto(BASE + url)
    check(`asset reachable: /${url}`, [200, 304].includes(res.status()), `HTTP ${res.status()}`)
  }
  await page0.close()

  // ---------------------------------------------------------------- Deep link + refresh
  {
    const page = await open({ width: 1280, height: 800, hash: '#/work/intevo-pulse', query: '?quality=low' })
    await page.waitForSelector('.case h1', { timeout: 60000 })
    check('deep link #/work/intevo-pulse opens the case study on load', (await page.$eval('.case h1', e => e.textContent)) === 'Intevo Pulse')
    await page.reload({ waitUntil: 'networkidle2' })
    await page.waitForSelector('.case h1', { timeout: 60000 })
    check('refresh keeps the case study', (await page.$eval('.case h1', e => e.textContent)) === 'Intevo Pulse')
    await page.goto(`${BASE}?quality=low&diag#/work/raahee`, { waitUntil: 'networkidle2' })
    await page.waitForSelector('.case h1')
    await page.click('.case-next .next')
    await page.waitForFunction(() => location.hash === '#/work/intevo-pulse', { timeout: 8000 }).catch(() => {})
    await page.goBack()
    await page.waitForFunction(() => location.hash === '#/work/raahee', { timeout: 8000 }).catch(() => {})
    check('browser back navigates between case studies', await page.evaluate(() => location.hash === '#/work/raahee'))
    const pulseLinks = await page.evaluate(async () => { location.hash = '#/work/intevo-pulse'; await new Promise(r => setTimeout(r, 600)); return [...document.querySelectorAll('.case .links a')].map(a => a.href) })
    check('Intevo Pulse case study links the product, client app and Ops dashboard', ['intevopulse.ai', 'app.intevopulse.ai', 'ops.intevopulse.ai'].every(d => pulseLinks.some(h => h.includes(d))), pulseLinks.join(' '))
    await page.close()
  }

  // ---------------------------------------------------------------- Recruiter summary route
  {
    const page = await open({ width: 1280, height: 800, hash: '#/glance', query: '?quality=low' })
    await page.waitForSelector('#site-menu #glance', { timeout: 60000 }).catch(() => {})
    await wait(1200)
    const g = await page.evaluate(() => { const el = document.querySelector('#site-menu #glance'); if (!el) return null; const r = el.getBoundingClientRect(); return { visible: r.top < innerHeight && r.bottom > 0, resume: el.querySelector('a')?.getAttribute('href') } })
    check('#/glance opens the recruiter summary with a resume download', g && g.visible && g.resume?.endsWith('.pdf'), JSON.stringify(g))
    await page.screenshot({ path: `${OUT}/frames/recruiter-summary.png` })
    await page.close()
  }

  // ---------------------------------------------------------------- Prerendered case studies (production build only)
  {
    const page = await browser.newPage()
    const res = await page.goto(BASE + 'work/raahee/', { waitUntil: 'domcontentloaded' })
    const html = res.status() === 200 ? await page.content() : ''
    if (html.includes('case study · Ali Haider')) {
      check('prerendered /work/raahee/ has its own title, canonical and OG image', html.includes('<title>Raahee — case study · Ali Haider') && html.includes('rel="canonical"') && html.includes('og:image') && html.includes('application/ld+json'))
      const sm = await page.goto(BASE + 'sitemap.xml')
      const xml = sm.status() === 200 ? await sm.text() : ''
      check('sitemap.xml lists all case studies', ['raahee', 'intevo-pulse', 'enteract-engage', 'thexperto', 'intevo', 'voltro'].every(id => xml.includes(`/work/${id}/`)))
    } else console.log('SKIP  prerendered pages (dev server; run against vite preview)')
    await page.close()
  }

  // ---------------------------------------------------------------- Reduced motion → static portfolio
  {
    const page = await open({ width: 1280, height: 800, reduced: true })
    await page.waitForSelector('.static', { timeout: 30000 })
    const ok = await page.evaluate(() => !!document.querySelector('.static .notice') && !document.querySelector('canvas') && document.querySelectorAll('.s-work li').length === 6)
    check('reduced motion shows the accessible static portfolio (no WebGL)', ok)
    await page.screenshot({ path: `${OUT}/frames/reduced-motion.png`, fullPage: false })
    const ratios = await page.$$eval('.s-media img', imgs => Array.from(imgs).map(i => i.getBoundingClientRect()).map(r => +(r.width / r.height).toFixed(2)))
    check('static portfolio images keep their 3:2 proportions', ratios.length === 6 && ratios.every(r => Math.abs(r - 1.5) < 0.05), ratios.join(', '))
    await page.click('.s-work li:nth-child(1) a')
    await page.waitForSelector('.case h1')
    check('case studies work without WebGL', (await page.$eval('.case h1', e => e.textContent)) === 'Enteract Engage')
    const three = await page.evaluate(() => performance.getEntriesByType('resource').some(r => /three-.*\.js|three\.module/.test(r.name)))
    check('static mode does not download three.js', !three)
    await page.close()
  }

  // ---------------------------------------------------------------- WebGL context loss → fallback
  {
    const page = await open({ width: 1280, height: 800, query: '?quality=low' })
    await ready(page)
    await page.evaluate(() => document.querySelector('.stage-canvas').getContext('webgl2').getExtension('WEBGL_lose_context').loseContext())
    await page.waitForSelector('.static .notice', { timeout: 10000 }).catch(() => {})
    check('WebGL context loss falls back to the static portfolio', await page.evaluate(() => !!document.querySelector('.static .notice')))
    await page.close()
  }

  // ---------------------------------------------------------------- Viewport matrix
  const VIEWPORTS = [[320, 568, true], [375, 667, true], [390, 844, true], [430, 932, true], [844, 390, true], [768, 1024, true], [1024, 768, false], [1440, 900, false], [1920, 1080, false]]
  for (const [width, height, mobile] of VIEWPORTS) {
    const page = await open({ width, height, mobile, query: '?quality=' + (mobile ? 'mobile' : 'medium') })
    await ready(page)
    await wait(1200)
    const shots = []
    for (const p of [0, 0.57, 1]) {
      await scrollToProgress(page, p)
      await settle(page, p, 1300)
      const file = `${OUT}/viewports/${width}x${height}-${Math.round(p * 100)}.png`
      await page.screenshot({ path: file })
      shots.push(file)
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)
    const tapTargets = await page.evaluate(() => [...document.querySelectorAll('.final a, .menu-button')].filter(a => { const r = a.getBoundingClientRect(); return r.width > 0 && (r.height < 40) }).length)
    report.viewports.push({ width, height, shots, horizontalOverflow: overflow, smallTapTargets: tapTargets })
    check(`${width}×${height}: no horizontal overflow`, !overflow)
    await page.close()
  }
} catch (err) {
  check('suite ran to completion', false, err.stack)
} finally {
  await browser.close()
  check('no JavaScript errors', report.errors.length === 0, report.errors.slice(0, 5).join(' | '))
  check('no failed local requests', report.failedRequests.length === 0, report.failedRequests.slice(0, 5).join(' | '))
  fs.writeFileSync(`${OUT}/verification.json`, JSON.stringify(report, null, 2))
  const failed = report.checks.filter(c => !c.ok).length
  console.log(`\n${report.checks.length - failed}/${report.checks.length} checks passed`)
  process.exitCode = failed ? 1 : 0
}
