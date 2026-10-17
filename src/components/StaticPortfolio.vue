<template>
  <main class="static" id="journey">
    <p v-if="notice" class="notice mono" role="note">
      <span>{{ notice }}</span>
      <button v-if="canCinematic" type="button" class="ink-link" @click="$emit('switch-mode', 'experience')">Enter the cinematic experience →</button>
    </p>

    <header class="s-hero">
      <div class="s-hero-text">
        <p class="mono kicker">The Space Between — a portfolio</p>
        <h1 class="display s-name">ALI HAIDER</h1>
        <p class="display s-role">Software Engineer / Product Builder</p>
        <p class="s-line serif-italic">The space between an idea and a working product.</p>
        <p class="s-where">{{ profile.roleLong }}. Based in {{ profile.location }}.</p>
      </div>
      <figure v-if="stillOk" class="s-still">
        <img :src="stillSrc" alt="Rendered still of The Impossible Fold, the portfolio's sculptural installation" width="1600" height="1000" @error="stillOk = false" />
      </figure>
    </header>

    <div class="s-glance"><AtAGlance uid="static-glance" /></div>

    <section id="work" class="s-section" aria-labelledby="s-work">
      <h2 id="s-work" class="mono s-h">03 — Selected Work</h2>
      <ol class="s-work">
        <li v-for="p in projects" :key="p.id">
          <a :href="`#/work/${p.id}`" class="s-item">
            <span class="s-media">
              <img :src="p.concept ? conceptDataURL(p.id) : p.image" :alt="p.concept ? `Conceptual illustration for ${p.title}` : `${p.title} — public home page`" width="1440" height="960" loading="lazy" decoding="async" />
            </span>
            <span class="mono s-idx">{{ p.index }} — {{ p.kicker }}</span>
            <span class="display s-title">{{ p.title }}</span>
            <span class="s-role-line">{{ p.role }}</span>
            <span class="mono s-open">Read the case study →</span>
          </a>
        </li>
      </ol>
    </section>

    <section id="experience" class="s-section s-two" aria-labelledby="s-eng">
      <div>
        <h2 id="s-eng" class="mono s-h">04 — The Engineer</h2>
        <p class="display s-big">Angular &amp; TypeScript, <span class="serif-italic">first.</span></p>
        <p class="s-soft">{{ expertise.statement }}</p>
        <p class="s-soft s-also"><span class="mono">Also</span> {{ expertise.additional.join(' · ') }}</p>
        <RxMarbles class="s-marbles" />
      </div>
      <ol class="s-timeline">
        <li v-for="e in experience" :key="e.id">
          <span class="mono">{{ e.period }}</span>
          <strong>{{ e.role }} — {{ e.org }}</strong>
          <span class="s-soft">{{ e.note }}</span>
        </li>
      </ol>
    </section>

    <section id="about" class="s-section s-two" aria-labelledby="s-about">
      <figure class="s-portrait"><img :src="profile.portrait" alt="Portrait of Ali Haider" width="864" height="1184" loading="lazy" /></figure>
      <div>
        <h2 id="s-about" class="mono s-h">05 — The Person</h2>
        <p class="display s-big">From enterprise to <span class="serif-italic">founder.</span></p>
        <p v-for="(line, i) in story" :key="i" class="s-soft">{{ line }}</p>
      </div>
    </section>

    <section id="contact" class="s-contact" aria-labelledby="s-contact">
      <p class="mono">06 — Contact</p>
      <h2 id="s-contact" class="display s-final">LET'S MAKE SOMETHING REMARKABLE.</h2>
      <p class="s-avail">{{ profile.availability }}</p>
      <ClientOffer class="s-offer" />
      <ContactLinks variant="light" />
      <p class="mono colophon">© 2026 {{ profile.fullName }}</p>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { expertise, experience, profile, projects, story } from '../data/profile.js'
import { conceptDataURL } from '../experience/world/conceptArt.js'
import ContactLinks from './ui/ContactLinks.vue'
import AtAGlance from './ui/AtAGlance.vue'
import ClientOffer from './ui/ClientOffer.vue'
import RxMarbles from './ui/RxMarbles.vue'

defineProps({ notice: String, canCinematic: Boolean })
defineEmits(['switch-mode'])
const stillOk = ref(true)
const stillSrc = "/images/fold-still.webp"
</script>

<style scoped>
.static { padding-top: 88px; }
.notice {
  margin: 0 var(--gutter) 24px; padding: 14px 18px; border: 1px solid var(--line);
  display: flex; flex-wrap: wrap; gap: 10px 22px; align-items: center; color: var(--ink-soft); text-transform: none; letter-spacing: 0.02em;
}
.notice button { background: none; border: 0; color: var(--porcelain); cursor: pointer; padding: 8px 0; font: inherit; }
.kicker { color: var(--ink-soft); margin-bottom: 22px; }
.s-hero { display: grid; grid-template-columns: 1fr 1.1fr; gap: var(--gutter); align-items: center; padding: clamp(24px, 6vh, 80px) var(--gutter) clamp(48px, 10vh, 120px); }
.s-name { font-size: clamp(3rem, 1rem + 8vw, 9.5rem); font-weight: 200; letter-spacing: 0.04em; }
.s-role { font-size: var(--step-1); margin-top: 16px; letter-spacing: 0.06em; }
.s-line { font-size: var(--step-2); margin-top: 28px; color: var(--lavender); }
.s-where { margin-top: 18px; color: var(--ink-soft); max-width: 46ch; }
.s-still img { width: 100%; height: auto; border: 1px solid var(--line); }
.s-glance { padding: 0 var(--gutter) clamp(48px, 9vh, 100px); max-width: 980px; }
.s-marbles { margin-top: 32px; }
.s-offer { margin-bottom: 36px; }
.s-section { padding: clamp(56px, 12vh, 140px) var(--gutter); border-top: 1px solid var(--line); }
.s-h { color: var(--ink-faint); margin-bottom: 32px; font-weight: 400; }
.s-work { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(28px, 4vw, 64px); }
.s-item { display: grid; gap: 10px; text-decoration: none; }
.s-media { display: block; overflow: hidden; border: 1px solid var(--line); }
.s-media img { aspect-ratio: 3 / 2; object-fit: cover; width: 100%; transition: transform 1s var(--ease-out); }
.s-item:hover img { transform: scale(1.03); }
.s-idx { color: var(--ink-faint); margin-top: 8px; }
.s-title { font-size: var(--step-3); font-weight: 250; }
.s-role-line { color: var(--ink-soft); }
.s-open { color: var(--persimmon); }
.s-two { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(28px, 6vw, 110px); align-items: start; }
.s-big { font-size: var(--step-3); font-weight: 250; margin-bottom: 22px; }
.s-big .serif-italic { color: var(--persimmon); font-stretch: normal; }
.s-soft { color: var(--ink-soft); margin-top: 10px; max-width: 60ch; }
.s-also .mono { margin-right: 8px; color: var(--ink-faint); }
.s-timeline { list-style: none; padding: 0; }
.s-timeline li { display: grid; gap: 4px; padding: 18px 0; border-top: 1px solid var(--line); }
.s-timeline .mono { color: var(--ink-faint); }
.s-portrait { max-width: 360px; }
.s-portrait img { filter: grayscale(1); aspect-ratio: 3 / 4; object-fit: cover; object-position: 38% 20%; }
.s-contact { background: var(--porcelain); color: var(--obsidian); padding: clamp(64px, 14vh, 160px) var(--gutter) var(--gutter); }
.s-final { font-size: clamp(2.4rem, 0.8rem + 6.6vw, 8.6rem); font-weight: 250; letter-spacing: -0.03em; margin: 22px 0 28px; max-width: 14ch; }
.s-avail { margin-bottom: 30px; color: rgba(13, 13, 17, 0.72); }
.colophon { margin-top: 26px; opacity: 0.55; }
@media (max-width: 800px) {
  .s-hero, .s-two, .s-work { grid-template-columns: 1fr; }
}
</style>
