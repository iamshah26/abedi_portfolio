<template>
  <div class="overlays" :class="{ ready, mobile }">
    <!-- 01 Arrival -->
    <section class="arrival" :style="fade(-1, 0, 0.075, 0.11)" :aria-hidden="vis(-1, 0, 0.075, 0.11) ? null : 'true'">
      <p class="mono kicker">The Space Between — a portfolio</p>
      <p class="role display" aria-label="Software engineer and product builder">
        <template v-for="(word, w) in roleWords" :key="w"><span class="word" aria-hidden="true"><span v-for="(ch, i) in word.chars" :key="i" class="ch" :style="{ '--d': `${0.6 + (word.offset + i) * 0.022}s` }">{{ ch }}</span></span>{{ ' ' }}</template>
      </p>
      <p class="where">Based in Lahore, Pakistan.<br />Building with teams worldwide.</p>
    </section>

    <div v-if="!mobile" class="cue mono" :style="{ opacity: ready ? 1 - smooth(0.004, 0.025, p) : 0 }" aria-hidden="true">
      <span>Scroll to enter</span><i></i>
    </div>

    <!-- Identity line -->
    <p class="identity serif-italic" :style="fade(0.11, 0.135, 0.19, 0.22)">
      The space between an idea<br v-if="mobile" /> and a working product.
    </p>

    <!-- 02 Transformation: kinetic statements -->
    <div class="kinetic" aria-hidden="true">
      <p v-for="(line, i) in kinetic" :key="i" class="display k-line" :class="`k${i}`" :style="kineticStyle(i)">
        <span v-if="line.serif" class="serif-italic">{{ line.serif }}</span> {{ line.text }}
      </p>
    </div>
    <p class="sr-only">Abstract ideas, folded into structure, made into working products.</p>

    <!-- Selected Work title -->
    <h2 class="work-title display" :style="workTitleStyle">Selected Work</h2>

    <!-- 03 Gallery captions -->
    <div class="captions">
      <article
        v-for="(proj, i) in projects"
        :key="proj.id"
        class="caption"
        :class="[exhibitSide(i) > 0 ? 'on-left' : 'on-right']"
        :style="captionStyle(i)"
        :aria-hidden="captionOpacity(i) > 0.5 ? null : 'true'"
        :inert="captionOpacity(i) > 0.5 ? null : true"
      >
        <p class="mono c-kicker"><span class="c-idx">{{ proj.index }} / 06</span> {{ proj.kicker }}</p>
        <h3 class="display c-title">{{ proj.title }}</h3>
        <p class="c-role">{{ proj.role }}</p>
        <p class="c-text">{{ firstSentence(proj.overview) }}</p>
        <div class="c-actions">
          <a class="c-open" :href="`#/work/${proj.id}`" @click.prevent="$emit('open', proj.id)">
            Open case study <span aria-hidden="true">→</span>
          </a>
          <a v-if="proj.links[0]" class="c-live mono ink-link" :href="proj.links[0].href" target="_blank" rel="noopener noreferrer">{{ proj.links[0].label }} ↗<span class="sr-only"> (opens in a new tab)</span></a>
        </div>
      </article>
    </div>

    <nav class="rail" :style="fade(0.49, 0.505, 0.745, 0.76)" :inert="vis(0.49, 0.505, 0.745, 0.76) ? null : true" aria-label="Exhibits">
      <button
        v-for="(proj, i) in projects"
        :key="proj.id"
        type="button"
        :class="{ on: frame.activeExhibit === i }"
        :aria-label="`Go to exhibit ${proj.index}: ${proj.title}`"
        :aria-current="frame.activeExhibit === i ? 'true' : null"
        @click="$emit('goto', exhibitProgress(i))"
      >
        <span class="mono">{{ proj.index }}</span>
      </button>
    </nav>

    <!-- 04 The Engineer -->
    <section class="engineer" :style="fade(0.765, 0.785, 0.84, 0.855)" :inert="vis(0.765, 0.785, 0.84, 0.855) ? null : true" aria-labelledby="engineer-title">
      <div class="eng-intro">
        <p class="mono kicker">04 — The Engineer</p>
        <h2 id="engineer-title" class="display eng-title">Angular &amp; TypeScript,<br /><span class="serif-italic">first.</span></h2>
        <p class="eng-text">{{ expertise.statement }}</p>
        <RxMarbles class="eng-marbles" :compact="mobile" />
      </div>
      <ol class="timeline">
        <li v-for="item in experience" :key="item.id">
          <span class="mono t-period">{{ item.period }}</span>
          <span class="t-role">{{ item.role }}</span>
          <span class="t-org">{{ item.org }}</span>
        </li>
      </ol>
    </section>

    <!-- 05 The Person -->
    <section class="person" :style="fade(0.86, 0.875, 0.915, 0.93)" :inert="vis(0.86, 0.875, 0.915, 0.93) ? null : true" aria-labelledby="person-title">
      <figure class="portrait">
        <img :src="profile.portrait" alt="Portrait of Ali Haider" width="810" height="1080" loading="lazy" decoding="async" />
      </figure>
      <div class="person-text">
        <p class="mono kicker">05 — The Person</p>
        <h2 id="person-title" class="display person-title">Enterprise engineer,<br /><span class="serif-italic">product founder.</span></h2>
        <p v-for="(line, i) in personStory" :key="i">{{ line }}</p>
      </div>
    </section>

    <!-- 06 Final scene -->
    <section class="final" :style="fade(0.935, 0.962, 2, 3)" :inert="vis(0.935, 0.962, 2, 3) ? null : true" aria-labelledby="final-title">
      <p class="mono kicker">06 — Contact</p>
      <h2 id="final-title" class="display final-title">
        <span v-for="(w, i) in finalWords" :key="i" class="fw" :style="finalWordStyle(i)">{{ w }}</span>
      </h2>
      <p class="final-note">{{ profile.availability }}</p>
      <ClientOffer class="final-offer" :compact="mobile" />
      <ContactLinks variant="light" />
      <p class="mono colophon">© 2026 {{ profile.fullName }} · Lahore · Built with Vue, Three.js and GSAP</p>
    </section>

    <!-- Seam wipe: a persimmon line sweeps across at every chapter change -->
    <i v-if="wipe.key" :key="wipe.key" class="seam-wipe" :class="{ back: wipe.back }" aria-hidden="true"></i>

    <!-- Persistent, minimal HUD -->
    <div class="hud" :style="{ opacity: ready ? 1 - smooth(0.93, 0.95, p) : 0 }">
      <button v-if="p < 0.44" class="mono skip ink-link" type="button" @click="$emit('navigate', 'work')">Skip to Selected Work ↓</button>
      <span v-else></span>
      <nav class="chapter" aria-label="Chapters">
        <span class="mono chapter-label" aria-live="polite">{{ frame.chapter.index }} — {{ frame.chapter.label }}</span>
        <span class="track-line"><i :style="{ transform: `scaleX(${p})` }"></i></span>
        <button
          v-for="ch in CHAPTERS"
          :key="ch.id"
          type="button"
          class="tick"
          :class="{ on: frame.chapter.id === ch.id, past: p >= ch.start }"
          :style="{ left: `${ch.start * 100}%` }"
          :aria-label="`Go to chapter ${ch.index}: ${ch.label}`"
          @click="$emit('goto', CHAPTER_TARGETS[ch.id])"
        ><span class="mono tick-tip">{{ ch.index }} {{ ch.label }}</span></button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import { expertise, experience, profile, projects, story } from '../../data/profile.js'
import { CHAPTERS, exhibitProgress, exhibitSide } from '../../experience/navigation.js'
import ContactLinks from '../ui/ContactLinks.vue'
import ClientOffer from '../ui/ClientOffer.vue'
import RxMarbles from '../ui/RxMarbles.vue'

const props = defineProps({ frame: Object, ready: Boolean, mobile: Boolean })
defineEmits(['open', 'goto', 'navigate'])

const p = computed(() => props.frame.progress)

const CHAPTER_TARGETS = { arrival: 0, transformation: 0.24, work: 0.515, engineer: 0.8, person: 0.885, contact: 1 }
const wipe = reactive({ key: 0, back: false })
watch(() => props.frame.chapter, (now, before) => {
  if (!props.ready || !before || now === before) return
  wipe.back = CHAPTERS.indexOf(now) < CHAPTERS.indexOf(before)
  wipe.key++
})
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }
const win = (a, b, c, d) => smooth(a, b, p.value) * (1 - smooth(c, d, p.value))
const vis = (a, b, c, d) => win(a, b, c, d) > 0.5
const fade = (a, b, c, d) => {
  const o = win(a, b, c, d)
  return { opacity: o, visibility: o < 0.01 ? 'hidden' : 'visible', transform: `translateY(${(1 - o) * 14}px)` }
}

let offset = 0
const roleWords = 'SOFTWARE ENGINEER / PRODUCT BUILDER'.split(' ').map(word => { const w = { chars: [...word], offset }; offset += word.length + 1; return w })
const kinetic = [
  { serif: 'Abstract', text: 'ideas,' },
  { serif: '', text: 'folded into structure,' },
  { serif: 'made into', text: 'working products.' }
]
const kineticWindows = [[0.19, 0.215, 0.26, 0.285], [0.275, 0.3, 0.335, 0.36], [0.35, 0.37, 0.41, 0.435]]
function kineticStyle(i) {
  const [a, b, c, d] = kineticWindows[i]
  const o = win(a, b, c, d)
  const local = (p.value - a) / (d - a)
  const dir = i % 2 ? 1 : -1
  return { opacity: o, visibility: o < 0.01 ? 'hidden' : 'visible', transform: `translate3d(${dir * (local - 0.5) * 9}vw, 0, 0)` }
}

const workTitleStyle = computed(() => {
  const o = win(0.44, 0.47, 0.5, 0.515)
  const t = smooth(0.44, 0.5, p.value)
  const spread = props.mobile ? 0.3 : 0.55
  return { opacity: o, visibility: o < 0.01 ? 'hidden' : 'visible', letterSpacing: `${spread - t * spread * 0.7}em`, transform: `scale(${1.08 - t * 0.08})` }
})

const captionOpacity = i => 1 - smooth(0.007, 0.0185, Math.abs(p.value - exhibitProgress(i)))
function captionStyle(i) {
  const o = captionOpacity(i)
  const d = p.value - exhibitProgress(i)
  return { opacity: o, visibility: o < 0.01 ? 'hidden' : 'visible', transform: `translate3d(0, ${d * -900}px, 0)` }
}
const firstSentence = s => s.split(/(?<=\.)\s/)[0]

const personStory = [story[1], story[2]]

const finalWords = ["LET'S", 'MAKE', 'SOMETHING', 'REMARKABLE.']
function finalWordStyle(i) {
  const t = smooth(0.94 + i * 0.008, 0.965 + i * 0.008, p.value)
  return { opacity: t, transform: `translate3d(0, ${(1 - t) * 0.6}em, 0)` }
}
</script>

<style scoped>
.overlays { position: fixed; inset: 0; z-index: 10; pointer-events: none; color: var(--porcelain); }
.overlays :is(a, button) { pointer-events: auto; }
section, .caption, .identity, .work-title, .k-line, .hud, .cue, .rail { will-change: opacity, transform; }

.kicker { color: var(--ink-soft); margin-bottom: 18px; }

/* Arrival */
.arrival { position: absolute; left: var(--gutter); bottom: clamp(84px, 13vh, 140px); max-width: min(46ch, 90vw); }
.role { font-size: clamp(1.15rem, 0.7rem + 1.6vw, 2.2rem); font-weight: 300; line-height: 1.1; letter-spacing: 0.02em; }
.word { display: inline-block; white-space: nowrap; }
.ch { display: inline-block; opacity: 0; transform: translateY(0.5em); }
.ready .ch { animation: chIn 0.9s var(--ease-out) forwards; animation-delay: var(--d); }
@keyframes chIn { to { opacity: 1; transform: none; } }
.where { margin-top: 18px; color: var(--ink-soft); font-size: var(--step--1); line-height: 1.6; letter-spacing: 0.02em; }

.cue { position: absolute; left: 50%; bottom: 28px; transform: translateX(-50%); display: grid; justify-items: center; gap: 12px; color: var(--ink-soft); transition: opacity 0.6s; }
.cue i { width: 1px; height: 46px; background: linear-gradient(var(--porcelain), transparent); animation: cue 2.4s var(--ease-in-out) infinite; transform-origin: top; }
@keyframes cue { 0% { transform: scaleY(0); } 50% { transform: scaleY(1); } 100% { transform: scaleY(1); opacity: 0; } }

.identity { position: absolute; left: 0; right: 0; bottom: clamp(70px, 14vh, 150px); text-align: center; font-size: clamp(1.5rem, 1rem + 2vw, 3rem); line-height: 1.1; color: var(--porcelain); text-shadow: 0 2px 30px rgba(0, 0, 0, 0.6); padding: 0 var(--gutter); }

/* Kinetic statements */
.kinetic { position: absolute; inset: 0; }
.k-line { position: absolute; left: var(--gutter); right: var(--gutter); font-size: clamp(2.2rem, 1rem + 5.4vw, 7rem); font-weight: 250; letter-spacing: -0.025em; white-space: nowrap; text-shadow: 0 4px 40px rgba(0, 0, 0, 0.55); }
.k-line .serif-italic { font-stretch: normal; color: var(--lavender); letter-spacing: -0.01em; }
.k0 { top: 22vh; }
.k1 { top: 46vh; text-align: right; }
.k2 { bottom: 16vh; }

.work-title { position: absolute; inset: 0; display: grid; place-items: center; margin: 0; font-size: clamp(1.6rem, 0.8rem + 3.4vw, 4.6rem); font-weight: 250; text-transform: uppercase; white-space: nowrap; text-shadow: 0 4px 50px rgba(0, 0, 0, 0.7); }

/* Gallery captions */
.caption { position: absolute; top: 50%; margin-top: -170px; width: min(34vw, 470px); }
.caption.on-left { left: var(--gutter); }
.caption.on-right { right: var(--gutter); }
.caption::before { content: ''; position: absolute; inset: -60px -80px; background: radial-gradient(closest-side, rgba(13, 13, 17, 0.72), transparent); z-index: -1; }
.c-kicker { color: var(--ink-soft); display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 18px; }
.c-idx { color: var(--persimmon); }
.c-title { font-size: clamp(2rem, 1.1rem + 2.8vw, 4.2rem); font-weight: 250; letter-spacing: -0.02em; line-height: 0.98; }
.c-role { margin-top: 16px; color: var(--lavender); font-size: var(--step--1); letter-spacing: 0.02em; }
.c-text { margin-top: 12px; color: var(--ink-soft); line-height: 1.55; }
.c-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 18px 26px; margin-top: 26px; }
.c-open {
  display: inline-flex; align-items: center; gap: 12px; min-height: 48px; padding: 0 24px;
  background: var(--porcelain); color: var(--obsidian); border-radius: 999px; text-decoration: none;
  font-size: var(--step--1); font-weight: 500; letter-spacing: 0.04em;
  transition: background 0.4s var(--ease-out), transform 0.4s var(--ease-out);
}
.c-open:hover, .c-open:focus-visible { background: var(--persimmon); transform: translateX(3px); }
.c-live { color: var(--ink-soft); }

.rail { position: absolute; left: 0; right: 0; bottom: 26px; display: flex; justify-content: center; gap: 6px; pointer-events: none; }
.rail button { background: none; border: 0; cursor: pointer; padding: 10px 8px; min-width: 44px; min-height: 44px; color: var(--ink-faint); display: grid; place-items: center; }
.rail button span { padding-bottom: 6px; border-bottom: 1px solid transparent; transition: color 0.3s, border-color 0.3s; }
.rail button.on span, .rail button:hover span { color: var(--porcelain); border-color: var(--persimmon); }

/* Engineer */
.engineer { position: absolute; inset: auto var(--gutter) clamp(70px, 10vh, 110px) var(--gutter); display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(28px, 6vw, 120px); align-items: end; }
.engineer::before { content: ''; position: absolute; inset: -120px -60px -80px; background: linear-gradient(to top, rgba(13, 13, 17, 0.88), rgba(13, 13, 17, 0)); z-index: -1; }
.eng-title { font-size: clamp(2rem, 1rem + 3.4vw, 4.6rem); font-weight: 250; letter-spacing: -0.02em; }
.eng-title .serif-italic { color: var(--persimmon); font-stretch: normal; }
.eng-text { margin-top: 18px; color: var(--ink-soft); max-width: 46ch; }
.eng-marbles { margin-top: 26px; }
.eng-intro { position: relative; }
.eng-intro::before { content: ''; position: absolute; inset: -60px -90px -50px -60px; background: radial-gradient(closest-side, rgba(13, 13, 17, 0.82), rgba(13, 13, 17, 0)); z-index: -1; pointer-events: none; }
.engineer :deep(button) { pointer-events: auto; }
.final-offer { margin-bottom: 26px; }
.mobile .final-offer :deep(.o-items) { display: none; }
.mobile .final-offer { margin-bottom: 16px; }
.timeline { list-style: none; padding: 0; }
.timeline li { display: grid; grid-template-columns: 11.5em 1fr; gap: 2px 16px; padding: 10px 0; border-top: 1px solid var(--line); }
.t-period { color: var(--ink-faint); grid-row: span 2; padding-top: 2px; }
.t-role { font-size: var(--step-0); }
.t-org { color: var(--ink-soft); font-size: var(--step--1); }

/* Person */
.person { position: absolute; left: var(--gutter); bottom: clamp(80px, 14vh, 150px); display: grid; grid-template-columns: minmax(150px, 230px) minmax(0, 46ch); gap: clamp(24px, 3vw, 48px); align-items: end; color: var(--obsidian); }
.person::before { content: ''; position: absolute; inset: -80px -100px; background: radial-gradient(closest-side, rgba(243, 240, 233, 0.85), transparent); z-index: -1; }
.portrait { aspect-ratio: 3 / 4; overflow: hidden; position: relative; background: #e6e0d5; }
.portrait img { width: 100%; height: 100%; object-fit: cover; object-position: 54% 0%; filter: grayscale(0.85) contrast(1.08); mix-blend-mode: multiply; transform: scale(2.2); transform-origin: 54% 5%; }
.portrait::after { content: ''; position: absolute; inset: 0; background: linear-gradient(160deg, rgba(185, 167, 232, 0.28), rgba(241, 120, 93, 0.16)); mix-blend-mode: soft-light; pointer-events: none; }
.person .kicker { color: rgba(13, 13, 17, 0.6); }
.person-title { font-size: clamp(1.8rem, 1rem + 2.8vw, 3.8rem); font-weight: 250; margin-bottom: 18px; }
.person-title .serif-italic { color: #b4472f; font-stretch: normal; }
.person-text p:not(.kicker) { color: rgba(13, 13, 17, 0.78); margin-top: 10px; }

/* Final */
.final { position: absolute; inset: auto var(--gutter) clamp(28px, 5vh, 56px); color: var(--obsidian); }
.final .kicker { color: rgba(13, 13, 17, 0.55); }
.final-title { font-size: clamp(2.3rem, 0.6rem + 6.6vw, 9rem); font-weight: 250; letter-spacing: -0.035em; line-height: 0.92; display: flex; flex-wrap: wrap; gap: 0 0.28em; max-width: 14ch; }
.fw { display: inline-block; }
.final-note { margin: 26px 0 30px; max-width: 52ch; color: rgba(13, 13, 17, 0.72); }
.colophon { margin-top: 22px; color: rgba(13, 13, 17, 0.5); text-transform: none; letter-spacing: 0.02em; }

/* HUD */
.hud { position: absolute; left: var(--gutter); right: var(--gutter); bottom: 22px; display: flex; justify-content: space-between; align-items: end; transition: opacity 0.6s; }
.skip { background: none; border: 0; cursor: pointer; color: var(--ink-soft); padding: 12px 0; }
.skip:hover { color: var(--porcelain); }
.chapter { position: relative; width: min(340px, 34vw); padding-bottom: 10px; color: var(--ink-soft); text-align: right; }
.chapter-label { display: block; margin-bottom: 10px; }
.track-line { position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: var(--line); }
.track-line i { position: absolute; inset: 0; background: var(--persimmon); transform-origin: left; }
.tick { position: absolute; bottom: -10px; width: 22px; height: 22px; margin-left: -11px; padding: 0; border: 0; background: none; cursor: pointer; }
.tick::before { content: ''; position: absolute; left: 50%; top: 50%; width: 5px; height: 5px; margin: -2px 0 0 -2px; border-radius: 50%; background: var(--titanium); opacity: 0.5; transition: transform 0.3s var(--ease-out), background 0.3s, opacity 0.3s; }
.tick.past::before { background: var(--persimmon); opacity: 1; }
.tick.on::before, .tick:hover::before, .tick:focus-visible::before { transform: scale(1.8); opacity: 1; }
.tick-tip { position: absolute; bottom: 26px; right: 50%; transform: translateX(50%); white-space: nowrap; padding: 6px 9px; background: rgba(13, 13, 17, 0.86); color: var(--porcelain); opacity: 0; pointer-events: none; transition: opacity 0.25s; }
.tick:hover .tick-tip, .tick:focus-visible .tick-tip { opacity: 1; }
.seam-wipe { position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: linear-gradient(90deg, transparent, var(--persimmon) 18%, #ffd2c2 50%, var(--persimmon) 82%, transparent); box-shadow: 0 0 18px 1px rgba(241, 120, 93, 0.55); transform-origin: left; animation: seamWipe 1.1s var(--ease-in-out) forwards; pointer-events: none; }
.seam-wipe.back { transform-origin: right; }
@keyframes seamWipe { 0% { transform: scaleX(0); opacity: 1; } 55% { transform: scaleX(1); opacity: 1; } 100% { transform: scaleX(1); opacity: 0; } }

/* Mobile art direction */
.mobile .arrival { bottom: 92px; }
.mobile .work-title { font-size: clamp(1.25rem, 6.4vw, 1.8rem); }
.mobile .k-line { white-space: normal; font-size: clamp(2rem, 9vw, 3.4rem); line-height: 1; }
.mobile .k1 { text-align: left; top: auto; bottom: 34vh; }
.mobile .k0 { top: 18vh; }
.mobile .k2 { bottom: 14vh; }
.mobile .caption { top: auto; bottom: 86px; margin-top: 0; left: var(--gutter); right: var(--gutter); width: auto; }
.mobile .caption::before { inset: -40px -24px -90px; background: linear-gradient(to top, rgba(13, 13, 17, 0.92) 55%, rgba(13, 13, 17, 0)); }
.mobile .c-title { font-size: clamp(1.9rem, 8.4vw, 2.8rem); }
.mobile .c-text { display: none; }
.mobile .c-actions { margin-top: 16px; }
.mobile .rail { bottom: 14px; }
.mobile .engineer { grid-template-columns: 1fr; gap: 18px; bottom: 64px; }
.mobile .engineer::before { inset: -80px -24px -70px; }
.mobile .eng-text { display: none; }
.mobile .timeline { display: none; }
.mobile .eng-marbles { margin-top: 14px; }
.mobile .timeline li { grid-template-columns: 9.5em 1fr; padding: 6px 0; }
.mobile .t-org { display: none; }
.mobile .t-period { grid-row: auto; }
.mobile .person { bottom: 70px; grid-template-columns: 96px 1fr; right: var(--gutter); align-items: start; }
.mobile .person-text p:not(.kicker):last-child { display: none; }
.mobile .person::before { inset: -60px -24px; background: linear-gradient(to top, rgba(243, 240, 233, 0.95) 60%, rgba(243, 240, 233, 0)); }
.mobile .final-title { font-size: clamp(2.1rem, 11vw, 3.6rem); }
.mobile .final::before { content: ''; position: absolute; inset: -70px -24px -40px; background: linear-gradient(to top, rgba(243, 240, 233, 0.94) 62%, rgba(243, 240, 233, 0)); z-index: -1; }
.mobile .final-note { margin: 16px 0 18px; font-size: var(--step--1); }
.mobile .colophon { display: none; }
.mobile .hud { bottom: 12px; }
.mobile .hud .chapter { display: none; }
/* Short landscape screens (phones held sideways) */
@media (max-height: 520px) and (orientation: landscape) {
  .arrival { bottom: 64px; }
  .arrival .kicker, .where, .cue { display: none; }
  .role { font-size: 1rem; }
  .caption { margin-top: -110px; }
  .c-text { display: none; }
  .rail { display: none; }
  .engineer .timeline { display: none; }
  .person .portrait { display: none; }
  .person-text p:not(.kicker):last-child { display: none; }
  .final { bottom: 14px; }
  .final .kicker, .final-note, .colophon, .final-offer, .eng-marbles { display: none; }
  .final-title { font-size: clamp(1.6rem, 5.4vw, 2.6rem); margin-bottom: 14px; }
  .k-line { font-size: clamp(1.8rem, 6vw, 3.2rem); }
}
</style>
