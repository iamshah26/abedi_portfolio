<template>
  <Transition name="menu" @after-enter="focusFirst">
    <div
      v-if="open"
      id="site-menu"
      ref="root"
      class="menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      @keydown="onKeydown"
    >
      <div class="menu-inner">
        <nav class="menu-primary" aria-label="Journey chapters">
          <p class="mono menu-kicker">The Space Between</p>
          <ol>
            <li v-for="(item, i) in primary" :key="item.id" :style="{ '--i': i }">
              <a :href="`#/${item.id}`" @click.prevent="go(item.id)">
                <span class="mono idx">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="word">{{ item.label }}</span>
              </a>
            </li>
          </ol>
        </nav>
        <nav class="menu-work" aria-label="Case studies">
          <AtAGlance id="glance" ref="glance" class="menu-glance" />
          <p class="mono menu-kicker">Case studies</p>
          <ul>
            <li v-for="(p, i) in projects" :key="p.id" :style="{ '--i': i + 3 }">
              <a :href="`#/work/${p.id}`" @click="$emit('close')">
                <span class="mono idx">{{ p.index }}</span>
                <span class="title">{{ p.title }}</span>
                <span class="kicker">{{ p.kicker }}</span>
              </a>
            </li>
          </ul>
          <div class="menu-foot">
            <ContactLinks />
            <button v-if="mode === 'experience'" class="mono mode-switch" type="button" @click="$emit('switch-mode', 'static')">View the simple version →</button>
            <button v-else-if="canCinematic" class="mono mode-switch" type="button" @click="$emit('switch-mode', 'experience')">Enter the cinematic experience →</button>
          </div>
        </nav>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { projects } from '../../data/profile.js'
import ContactLinks from './ContactLinks.vue'
import AtAGlance from './AtAGlance.vue'

const props = defineProps({ open: Boolean, mode: String, canCinematic: Boolean, focusGlance: Boolean })
const emit = defineEmits(['close', 'navigate', 'switch-mode'])
const root = ref(null)

const primary = [
  { id: 'journey', label: 'Journey' },
  { id: 'glance', label: 'At a glance' },
  { id: 'work', label: 'Selected Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
]

function showGlance() {
  const el = root.value?.querySelector('#glance')
  el?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  el?.querySelector('a')?.focus({ preventScroll: true })
}

function go(id) {
  if (id === 'glance') return showGlance()
  emit('close')
  nextTick(() => emit('navigate', id))
}

function focusables() {
  return [...(root.value?.querySelectorAll('a[href], button:not([disabled])') || [])]
}
function focusFirst() {
  if (props.focusGlance) return showGlance()
  focusables()[0]?.focus()
}

function onKeydown(e) {
  if (e.key === 'Escape') { e.preventDefault(); emit('close'); return }
  if (e.key !== 'Tab') return
  const list = focusables()
  const first = list[0], last = list[list.length - 1]
  const header = document.querySelector('.menu-button')
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); (header || last).focus() }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); (header || first).focus() }
}
</script>

<style scoped>
.menu {
  position: fixed;
  inset: 0;
  z-index: 55;
  background: color-mix(in srgb, var(--obsidian) 94%, var(--aubergine));
  color: var(--porcelain);
  overflow-y: auto;
  overscroll-behavior: contain;
}
.menu::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(60% 50% at 85% 10%, rgba(185, 167, 232, 0.12), transparent 70%),
    radial-gradient(40% 40% at 10% 100%, rgba(241, 120, 93, 0.08), transparent 70%);
  pointer-events: none;
}
.menu-inner {
  position: relative;
  min-height: 100%;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: clamp(32px, 6vw, 120px);
  padding: clamp(96px, 14vh, 160px) var(--gutter) var(--gutter);
}
.menu-kicker { opacity: 0.55; margin-bottom: 22px; }
ol, ul { list-style: none; padding: 0; }
.menu-primary li, .menu-work li {
  opacity: 0;
  transform: translateY(18px);
  animation: rise 0.8s var(--ease-out) forwards;
  animation-delay: calc(0.05s * var(--i) + 0.12s);
}
@keyframes rise { to { opacity: 1; transform: none; } }
.menu-primary a {
  display: flex; align-items: baseline; gap: 18px;
  text-decoration: none;
  padding: 4px 0;
}
.menu-primary .word {
  font-family: var(--font-display);
  font-stretch: 125%;
  font-weight: 250;
  font-size: clamp(2.2rem, 1.4rem + 3.6vw, 5.2rem);
  line-height: 1.02;
  letter-spacing: -0.02em;
  transition: transform 0.6s var(--ease-out), color 0.4s;
}
.menu-primary a:hover .word, .menu-primary a:focus-visible .word { transform: translateX(14px); color: var(--lavender); }
.menu-primary a:hover .word { font-family: var(--font-serif); font-style: italic; font-stretch: normal; }
.idx { opacity: 0.5; min-width: 2.4em; }
.menu-work a {
  display: grid;
  grid-template-columns: 2.4em 1fr;
  gap: 2px 14px;
  padding: 14px 0;
  border-top: 1px solid var(--line);
  text-decoration: none;
}
.menu-work .title { font-size: var(--step-1); font-stretch: 112%; transition: color 0.3s; }
.menu-work .kicker { grid-column: 2; color: var(--ink-faint); font-size: var(--step--1); }
.menu-work a:hover .title, .menu-work a:focus-visible .title { color: var(--persimmon); }
.menu-foot { margin-top: 36px; display: grid; gap: 22px; }
.menu-glance { margin-bottom: 40px; scroll-margin-top: 90px; }
.mode-switch {
  justify-self: start; background: none; border: 0; padding: 10px 0; cursor: pointer; color: var(--ink-soft);
}
.mode-switch:hover { color: var(--porcelain); }

.menu-enter-active, .menu-leave-active { transition: clip-path 0.8s var(--ease-in-out), opacity 0.5s; }
.menu-enter-from, .menu-leave-to { clip-path: inset(0 0 100% 0); }
.menu-enter-to, .menu-leave-from { clip-path: inset(0 0 0 0); }

@media (max-width: 860px) {
  .menu-inner { grid-template-columns: 1fr; padding-top: 92px; }
}
</style>
