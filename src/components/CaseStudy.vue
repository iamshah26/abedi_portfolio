<template>
  <Transition name="case" appear @after-enter="onEntered" @before-leave="$emit('leaving')">
    <article
      v-if="project"
      :key="project.id"
      ref="root"
      class="case"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`case-title-${project.id}`"
      :style="{ '--accent': project.accent }"
      tabindex="-1"
      @keydown="onKeydown"
    >
      <div ref="scroller" class="case-scroll">
        <div class="case-bar">
          <button ref="backButton" class="back mono" type="button" @click="$emit('close')">
            <span aria-hidden="true">←</span> Back to the exhibition
          </button>
          <span class="mono position">{{ project.index }} / {{ String(projects.length).padStart(2, '0') }}</span>
        </div>

        <header class="case-hero">
          <p class="mono kicker"><span class="dot" aria-hidden="true"></span>{{ project.kicker }}</p>
          <h1 :id="`case-title-${project.id}`" class="display title">{{ project.title }}</h1>
          <dl class="facts">
            <div><dt class="mono">Role</dt><dd>{{ project.role }}</dd></div>
            <div><dt class="mono">Context</dt><dd>{{ project.org }}</dd></div>
            <div><dt class="mono">Period</dt><dd>{{ project.period }}</dd></div>
          </dl>
        </header>

        <figure class="case-media">
          <div class="frame">
            <img :src="heroSrc" :alt="heroAlt" width="1440" height="960" decoding="async" />
          </div>
          <figcaption class="mono">{{ project.concept ? project.conceptNote : `Public screen of ${project.title}, captured from the live site.` }}</figcaption>
        </figure>

        <div class="case-body">
          <section class="lead">
            <h2 class="mono">Overview</h2>
            <p class="lead-text">{{ project.overview }}</p>
          </section>

          <section class="split">
            <div>
              <h2 class="mono">The problem</h2>
              <p>{{ project.problem }}</p>
            </div>
            <div>
              <h2 class="mono">My role</h2>
              <p>{{ project.responsibility }}</p>
            </div>
          </section>

          <section>
            <h2 class="mono">Key features</h2>
            <ol class="numbered">
              <li v-for="(f, i) in project.features" :key="i"><span class="mono n">{{ String(i + 1).padStart(2, '0') }}</span><span>{{ f }}</span></li>
            </ol>
          </section>

          <figure v-if="project.gallery" class="case-gallery">
            <img v-for="(src, i) in project.gallery" :key="src" :src="src" :alt="`${project.title} — public product page, detail ${i + 1}`" width="1440" height="960" loading="lazy" decoding="async" />
            <figcaption class="mono">Public product pages of {{ project.title }}.</figcaption>
          </figure>

          <section class="split">
            <div>
              <h2 class="mono">Engineering challenges</h2>
              <ul class="ticks"><li v-for="(c, i) in project.challenges" :key="i">{{ c }}</li></ul>
            </div>
            <div>
              <h2 class="mono">Implementation</h2>
              <ul class="ticks"><li v-for="(c, i) in project.implementation" :key="i">{{ c }}</li></ul>
            </div>
          </section>

          <section class="outcomes">
            <h2 class="mono">Results and deliverables</h2>
            <ul><li v-for="(o, i) in project.outcomes" :key="i">{{ o }}</li></ul>
          </section>

          <section class="stack">
            <h2 class="mono">Stack</h2>
            <p>{{ project.stack.join('  ·  ') }}</p>
          </section>

          <section v-if="project.links.length" class="links">
            <h2 class="mono">Live</h2>
            <ul>
              <li v-for="l in project.links" :key="l.href">
                <a :href="l.href" target="_blank" rel="noopener noreferrer">{{ l.label }} <span aria-hidden="true">↗</span><span class="sr-only">(opens in a new tab)</span></a>
              </li>
            </ul>
          </section>
          <p v-else class="mono private-note">Internal enterprise software — no public link.</p>
        </div>

        <nav class="case-next" aria-label="More case studies">
          <a :href="`#/work/${prev.id}`" class="prev"><span class="mono">Previous</span><span class="t">{{ prev.title }}</span></a>
          <a :href="`#/work/${next.id}`" class="next"><span class="mono">Next</span><span class="t">{{ next.title }}</span></a>
        </nav>
      </div>
    </article>
  </Transition>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { projects } from '../data/profile.js'
import { conceptDataURL } from '../experience/world/conceptArt.js'

const props = defineProps({ project: Object })
const emit = defineEmits(['close', 'entered', 'leaving'])
const root = ref(null)
const scroller = ref(null)
const backButton = ref(null)

const idx = computed(() => projects.findIndex(p => p.id === props.project?.id))
const next = computed(() => projects[(idx.value + 1) % projects.length])
const prev = computed(() => projects[(idx.value - 1 + projects.length) % projects.length])
const heroSrc = computed(() => (props.project?.concept ? conceptDataURL(props.project.id) : props.project?.image))
const heroAlt = computed(() => (props.project?.concept ? `Conceptual illustration for ${props.project.title}` : `${props.project?.title} — public home page`))

function onEntered() {
  emit('entered')
  backButton.value?.focus({ preventScroll: true })
}

watch(() => props.project?.id, async (id, old) => {
  if (id && old) {
    await nextTick()
    scroller.value?.scrollTo({ top: 0 })
    backButton.value?.focus({ preventScroll: true })
  }
})

function onKeydown(e) {
  if (e.key === 'Escape') { e.preventDefault(); emit('close'); return }
  if (e.key !== 'Tab') return
  const list = [...root.value.querySelectorAll('a[href], button')]
  const first = list[0], last = list[list.length - 1]
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
}
</script>

<style scoped>
.case {
  position: fixed;
  inset: 0;
  z-index: 70;
  background: var(--obsidian);
  color: var(--porcelain);
  outline: none;
}
.case::before {
  content: '';
  position: fixed; inset: 0;
  background:
    radial-gradient(70% 45% at 80% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%),
    radial-gradient(50% 40% at 0% 30%, rgba(36, 32, 45, 0.9), transparent 70%);
  pointer-events: none;
}
.case-scroll {
  position: relative;
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}
.case-bar {
  position: sticky; top: 0; z-index: 2;
  display: flex; justify-content: space-between; align-items: center;
  padding: clamp(14px, 2.4vw, 30px) var(--gutter);
  background: linear-gradient(var(--obsidian) 40%, transparent);
}
.back {
  background: none; border: 0; cursor: pointer; padding: 12px 0; color: var(--porcelain);
  display: inline-flex; gap: 10px; align-items: center;
}
.back:hover span { transform: translateX(-4px); }
.back span { transition: transform 0.4s var(--ease-out); }
.position { opacity: 0.6; }

.case-hero { padding: clamp(32px, 8vh, 96px) var(--gutter) clamp(28px, 5vh, 56px); max-width: 1500px; }
.kicker { display: flex; align-items: center; gap: 12px; color: var(--ink-soft); margin-bottom: 22px; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 20%, transparent); }
.title { font-size: clamp(2.6rem, 1.4rem + 6vw, 8.4rem); font-weight: 250; letter-spacing: -0.03em; overflow-wrap: anywhere; }
.facts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; margin-top: clamp(28px, 5vh, 56px); max-width: 1100px; }
.facts dt { opacity: 0.5; margin-bottom: 8px; }
.facts dd { margin: 0; font-size: var(--step-0); }

.case-media { padding: 0 var(--gutter); }
.frame {
  position: relative;
  border: 1px solid var(--line);
  padding: clamp(8px, 1.2vw, 16px);
  background: linear-gradient(145deg, #1b1a20, #0f0f13);
  box-shadow: 0 40px 80px -40px rgba(0, 0, 0, 0.8);
  animation: unveil 1.3s 0.25s var(--ease-out) both;
}
.frame img { width: 100%; height: auto; aspect-ratio: 3 / 2; object-fit: cover; }
@keyframes unveil { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 0 0); } }
figcaption { margin-top: 14px; color: var(--ink-faint); text-transform: none; letter-spacing: 0.02em; }

.case-body { padding: clamp(48px, 10vh, 120px) var(--gutter); display: grid; gap: clamp(48px, 9vh, 110px); max-width: 1500px; }
h2.mono { color: var(--ink-faint); margin-bottom: 18px; font-weight: 400; }
.lead-text { font-family: var(--font-serif); font-size: clamp(1.6rem, 1.1rem + 2.1vw, 3.2rem); line-height: 1.15; max-width: 30ch; }
.split { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(28px, 6vw, 96px); }
.split p, .ticks { color: var(--ink-soft); max-width: 58ch; }
.numbered { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 clamp(28px, 6vw, 96px); }
.numbered li { display: grid; grid-template-columns: 3em 1fr; gap: 10px; padding: 18px 0; border-top: 1px solid var(--line); }
.numbered .n { color: var(--accent); padding-top: 3px; }
.ticks { list-style: none; padding: 0; display: grid; gap: 12px; }
.ticks li { padding-left: 22px; position: relative; }
.ticks li::before { content: ''; position: absolute; left: 0; top: 0.72em; width: 10px; height: 1px; background: var(--persimmon); }
.case-gallery { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.case-gallery img { border: 1px solid var(--line); aspect-ratio: 3 / 2; object-fit: cover; }
.case-gallery figcaption { grid-column: 1 / -1; }
.outcomes ul { list-style: none; padding: 0; display: grid; gap: 4px; }
.outcomes li { font-size: var(--step-2); font-stretch: 110%; font-weight: 300; line-height: 1.2; padding: 14px 0; border-bottom: 1px solid var(--line); }
.stack p { font-family: var(--font-mono); font-size: var(--step-0); color: var(--ink-soft); }
.links ul { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 12px; }
.links a {
  display: inline-flex; gap: 10px; align-items: center; min-height: 48px; padding: 0 22px;
  border: 1px solid var(--porcelain); border-radius: 999px; text-decoration: none;
  transition: background 0.4s var(--ease-out), color 0.4s;
}
.links a:hover, .links a:focus-visible { background: var(--porcelain); color: var(--obsidian); }
.private-note { color: var(--ink-faint); }

.case-next { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--line); }
.case-next a { display: grid; gap: 8px; padding: clamp(28px, 6vh, 64px) var(--gutter); text-decoration: none; transition: background 0.5s var(--ease-out); }
.case-next a:hover { background: rgba(243, 240, 233, 0.04); }
.case-next .next { text-align: right; border-left: 1px solid var(--line); }
.case-next .t { font-size: var(--step-3); font-stretch: 120%; font-weight: 250; line-height: 1; }
.case-next .mono { opacity: 0.55; }

.case-enter-active { transition: clip-path 1s var(--ease-in-out), opacity 0.6s; }
.case-leave-active { transition: clip-path 0.8s var(--ease-in-out), opacity 0.8s; }
.case-enter-from { clip-path: inset(18% 12% 18% 12% round 6px); opacity: 0; }
.case-leave-to { clip-path: inset(18% 12% 18% 12% round 6px); opacity: 0; }
.case-enter-to, .case-leave-from { clip-path: inset(0 0 0 0); opacity: 1; }

@media (max-width: 760px) {
  .facts, .split, .numbered, .case-gallery { grid-template-columns: 1fr; }
  .case-next { grid-template-columns: 1fr; }
  .case-next .next { text-align: left; border-left: 0; border-top: 1px solid var(--line); }
}
</style>
