import { palette } from '../palette.js'

const FONT_DISPLAY = '"Archivo", "Helvetica Neue", Arial, sans-serif'
const FONT_MONO = '"Geist Mono", ui-monospace, monospace'
const FONT_SERIF = '"Instrument Serif", Georgia, serif'

function canvas(w, h) {
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  return [c, c.getContext('2d')]
}

/** Original conceptual illustration for Enteract Engage (confidential enterprise product). */
function enteractConcept() {
  const [c, g] = canvas(1440, 960)
  const bg = g.createLinearGradient(0, 0, 1440, 960)
  bg.addColorStop(0, '#1b1822'); bg.addColorStop(1, '#0f0e13')
  g.fillStyle = bg; g.fillRect(0, 0, 1440, 960)
  g.strokeStyle = 'rgba(193,196,203,0.12)'; g.lineWidth = 1
  for (let x = 0; x < 1440; x += 48) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 960); g.stroke() }
  // three-pane workspace
  const panes = [[90, 150, 300, 690], [420, 150, 600, 690], [1050, 150, 300, 690]]
  for (const [x, y, w, h] of panes) {
    g.fillStyle = 'rgba(243,240,233,0.035)'; g.fillRect(x, y, w, h)
    g.strokeStyle = 'rgba(193,196,203,0.28)'; g.strokeRect(x + 0.5, y + 0.5, w, h)
  }
  g.font = `400 20px ${FONT_MONO}`; g.fillStyle = 'rgba(193,196,203,0.7)'
  g.fillText('CHANNELS', 112, 190); g.fillText('CONVERSATION', 442, 190); g.fillText('CONTEXT', 1072, 190)
  const ch = ['Social', 'Messaging', 'Voice', 'Social', 'Messaging']
  ch.forEach((name, i) => {
    const y = 240 + i * 108
    g.fillStyle = i === 2 ? palette.persimmon : 'rgba(185,167,232,0.85)'
    g.beginPath(); g.arc(134, y + 22, 14, 0, Math.PI * 2); g.fill()
    g.fillStyle = 'rgba(243,240,233,0.85)'; g.font = `400 26px ${FONT_DISPLAY}`; g.fillText(name, 166, y + 31)
    g.fillStyle = 'rgba(193,196,203,0.25)'; g.fillRect(166, y + 48, 150 - i * 12, 6)
  })
  // conversation bubbles
  const bubbles = [[0, 260, 0.56], [1, 350, 0.42], [0, 440, 0.66], [1, 540, 0.36], [0, 630, 0.5], [1, 720, 0.6]]
  for (const [right, y, f] of bubbles) {
    const w = 560 * f
    const x = right ? 420 + 600 - 24 - w : 444
    g.fillStyle = right ? 'rgba(185,167,232,0.22)' : 'rgba(243,240,233,0.08)'
    g.beginPath(); g.roundRect(x, y, w, 58, 14); g.fill()
    g.fillStyle = 'rgba(243,240,233,0.35)'; g.fillRect(x + 22, y + 24, w * 0.6, 8)
  }
  // real-time event stream
  g.strokeStyle = palette.persimmon; g.lineWidth = 2
  g.beginPath(); g.moveTo(420, 800); for (let x = 0; x <= 600; x += 6) g.lineTo(420 + x, 800 - Math.abs(Math.sin(x * 0.045)) * 26 * (0.4 + 0.6 * Math.sin(x * 0.011) ** 2)); g.stroke()
  // context lines
  for (let i = 0; i < 9; i++) {
    g.fillStyle = 'rgba(243,240,233,0.14)'; g.fillRect(1074, 240 + i * 62, 230 - (i % 3) * 50, 8)
    g.fillStyle = 'rgba(193,196,203,0.4)'; g.fillRect(1074, 256 + i * 62, 90, 5)
  }
  g.fillStyle = palette.porcelain; g.font = `400 64px ${FONT_SERIF}`; g.fillText('Enteract Engage', 90, 100)
  g.font = `400 20px ${FONT_MONO}`; g.fillStyle = palette.persimmon; g.fillText('● LIVE', 1270, 100)
  g.fillStyle = 'rgba(193,196,203,0.75)'; g.fillText('CONCEPTUAL ILLUSTRATION — NOT THE PRODUCTION INTERFACE', 90, 900)
  return c
}

/** Original conceptual illustration for MICELOC & JetClass (no approved imagery available). */
function voltroConcept() {
  const [c, g] = canvas(1440, 960)
  g.fillStyle = '#efebe3'; g.fillRect(0, 0, 1440, 960)
  g.strokeStyle = 'rgba(13,13,17,0.08)'
  for (let y = 0; y < 960; y += 40) { g.beginPath(); g.moveTo(0, y); g.lineTo(1440, y); g.stroke() }
  // room grid (group booking)
  for (let r = 0; r < 5; r++) for (let k = 0; k < 9; k++) {
    const sel = (r === 2 && k > 2 && k < 7) || (r === 3 && k > 3 && k < 6)
    g.fillStyle = sel ? palette.aubergine : 'rgba(13,13,17,0.1)'
    g.fillRect(110 + k * 64, 470 + r * 64, 52, 52)
  }
  g.font = `400 20px ${FONT_MONO}`; g.fillStyle = 'rgba(13,13,17,0.6)'
  g.fillText('GROUP BOOKING — ROOMS & VENUES', 110, 440)
  // flight arc
  g.setLineDash([10, 12]); g.strokeStyle = palette.aubergine; g.lineWidth = 3
  g.beginPath(); g.moveTo(780, 780); g.bezierCurveTo(900, 300, 1200, 260, 1330, 520); g.stroke(); g.setLineDash([])
  g.fillStyle = palette.persimmon; g.beginPath(); g.arc(1330, 520, 12, 0, Math.PI * 2); g.fill()
  g.fillStyle = palette.obsidian; g.beginPath(); g.arc(780, 780, 9, 0, Math.PI * 2); g.fill()
  g.fillStyle = palette.obsidian; g.font = `400 132px ${FONT_SERIF}`
  g.fillText('MICELOC', 104, 300)
  g.font = `italic 400 96px ${FONT_SERIF}`; g.fillText('& JetClass', 820, 210)
  g.font = `400 20px ${FONT_MONO}`; g.fillStyle = 'rgba(13,13,17,0.65)'
  g.fillText('VUE 2 · VUEX · VUETIFY · LARAVEL', 104, 360)
  g.fillText('CONCEPTUAL ILLUSTRATION — NO PRODUCT SCREENS SHOWN', 104, 900)
  return c
}

/** Canvas for a project's conceptual illustration (used by WebGL exhibits and case-study pages). */
export function drawConcept(id) {
  return id === 'enteract-engage' ? enteractConcept() : voltroConcept()
}

const cache = {}
export function conceptDataURL(id) {
  return (cache[id] ||= drawConcept(id).toDataURL('image/webp', 0.9))
}
