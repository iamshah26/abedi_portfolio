// Vite plugin: prerenders one crawlable, shareable HTML page per case study at /work/<id>/,
// plus sitemap.xml and robots.txt. Content comes from src/data/profile.js (single source of truth),
// so the static pages can never drift from the interactive experience.
import { projects, profile, SITE_ORIGIN, atAGlance } from '../src/data/profile.js'

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const list = items => `<ul>${items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`
const clip = (s, n = 155) => (s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s)

function page(p, i) {
  const url = `${SITE_ORIGIN}/work/${p.id}/`
  const image = `${SITE_ORIGIN}${p.image || '/images/fold-still.webp'}`
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]
  const title = `${p.title} — case study · Ali Haider`
  const description = clip(p.overview)
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title,
    description: p.overview,
    url,
    image,
    author: { '@type': 'Person', name: profile.fullName, alternateName: profile.name, url: SITE_ORIGIN }
  }
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<link rel="canonical" href="${url}" />
<meta name="theme-color" content="#0d0d11" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<meta property="og:type" content="article" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:image" content="${image}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(description)}" />
<meta name="twitter:image" content="${image}" />
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Geist+Mono:wght@300..600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
<style>
:root{--o:#0d0d11;--p:#f3f0e9;--t:#c1c4cb;--l:#b9a7e8;--s:#f1785d;--line:rgba(193,196,203,.22)}
*{box-sizing:border-box}body{margin:0;background:var(--o);color:var(--p);font:400 1rem/1.6 Archivo,Arial,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit}main{max-width:1180px;margin:0 auto;padding:clamp(20px,4vw,56px)}
.bar{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;font:500 .78rem/1 "Geist Mono",monospace;letter-spacing:.1em;text-transform:uppercase}
.bar a{text-decoration:none;padding:10px 0}.bar a:hover{color:var(--s)}
.k{font:400 .78rem/1.4 "Geist Mono",monospace;letter-spacing:.08em;text-transform:uppercase;color:rgba(193,196,203,.7)}
h1{font-stretch:125%;font-weight:250;font-size:clamp(2.6rem,1.2rem + 6vw,7rem);line-height:.95;letter-spacing:-.03em;margin:18px 0 28px}
dl{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:18px;margin:0 0 40px}dt{margin-bottom:6px}dd{margin:0}
figure{margin:0 0 56px}img{width:100%;height:auto;border:1px solid var(--line)}figcaption{margin-top:10px}
.lead{font-family:"Instrument Serif",Georgia,serif;font-size:clamp(1.5rem,1rem + 2vw,2.6rem);line-height:1.18;max-width:32ch;margin:0 0 56px}
section{display:grid;grid-template-columns:minmax(160px,240px) 1fr;gap:24px;padding:28px 0;border-top:1px solid var(--line)}
section p,section ul{margin:0;color:rgba(243,240,233,.8)}ul{padding-left:18px}li{margin:6px 0}
.cta{display:flex;flex-wrap:wrap;gap:12px;margin:48px 0}.btn{display:inline-flex;align-items:center;gap:10px;min-height:48px;padding:0 22px;border-radius:999px;border:1px solid var(--p);text-decoration:none}
.btn.solid{background:var(--p);color:var(--o)}.btn:hover{background:var(--s);border-color:var(--s);color:var(--o)}
nav.pn{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line)}nav.pn a{padding:28px 0;text-decoration:none;font-stretch:115%;font-size:1.4rem}nav.pn a:last-child{text-align:right}
footer{margin-top:40px;color:rgba(193,196,203,.6);font:400 .78rem/1.6 "Geist Mono",monospace}
@media(max-width:700px){section{grid-template-columns:1fr;gap:10px}}
</style>
</head>
<body>
<main>
  <div class="bar"><a href="/">Ali Haider</a><a href="/#/work/${p.id}">Open in the interactive portfolio →</a></div>
  <p class="k" style="margin-top:56px">${esc(p.index)} — ${esc(p.kicker)}</p>
  <h1>${esc(p.title)}</h1>
  <dl>
    <div><dt class="k">Role</dt><dd>${esc(p.role)}</dd></div>
    <div><dt class="k">Context</dt><dd>${esc(p.org)}</dd></div>
    <div><dt class="k">Period</dt><dd>${esc(p.period)}</dd></div>
  </dl>
  ${p.image ? `<figure><img src="${p.image}" alt="${esc(p.title)} — public home page" width="1440" height="960" /><figcaption class="k">Public screen of ${esc(p.title)}, captured from the live site.</figcaption></figure>` : `<p class="k" style="margin:0 0 48px">${esc(p.conceptNote)}</p>`}
  <p class="lead">${esc(p.overview)}</p>
  <section><h2 class="k">The problem</h2><p>${esc(p.problem)}</p></section>
  <section><h2 class="k">My role</h2><p>${esc(p.responsibility)}</p></section>
  <section><h2 class="k">Key features</h2>${list(p.features)}</section>
  <section><h2 class="k">Engineering challenges</h2>${list(p.challenges)}</section>
  <section><h2 class="k">Implementation</h2>${list(p.implementation)}</section>
  <section><h2 class="k">Results and deliverables</h2>${list(p.outcomes)}</section>
  <section><h2 class="k">Stack</h2><p>${esc(p.stack.join(' · '))}</p></section>
  <div class="cta">
    ${p.links.map(l => `<a class="btn" href="${l.href}" target="_blank" rel="noopener noreferrer">${esc(l.label)} ↗</a>`).join('')}
    <a class="btn solid" href="/#/work/${p.id}">See it in the exhibition →</a>
  </div>
  <nav class="pn" aria-label="More case studies"><a href="/work/${prev.id}/">← ${esc(prev.title)}</a><a href="/work/${next.id}/">${esc(next.title)} →</a></nav>
  <footer>${esc(profile.fullName)} · ${esc(atAGlance.headline)} · <a href="${profile.links.email}">${esc(profile.email)}</a> · <a href="${profile.links.linkedin}">LinkedIn</a> · <a href="${profile.links.github}">GitHub</a> · <a href="${profile.links.resume}">Resume</a></footer>
</main>
</body>
</html>
`
}

export function prerenderCaseStudies() {
  return {
    name: 'prerender-case-studies',
    apply: 'build',
    generateBundle() {
      projects.forEach((p, i) => this.emitFile({ type: 'asset', fileName: `work/${p.id}/index.html`, source: page(p, i) }))
      const urls = ['/', ...projects.map(p => `/work/${p.id}/`)]
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${SITE_ORIGIN}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`
      })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n` })
    }
  }
}
