<template>
  <section class="glance" :class="`is-${variant}`" :aria-labelledby="`${uid}-title`">
    <div class="g-top">
      <p class="mono g-kicker">At a glance — for recruiters</p>
      <h2 :id="`${uid}-title`" class="g-title">{{ atAGlance.headline }}</h2>
    </div>
    <dl class="g-facts">
      <div v-for="f in atAGlance.facts" :key="f.label">
        <dt class="mono">{{ f.label }}</dt>
        <dd>{{ f.value }}</dd>
      </div>
    </dl>
    <ul class="g-highlights">
      <li v-for="(h, i) in atAGlance.highlights" :key="i">{{ h }}</li>
    </ul>
    <div class="g-actions">
      <a class="g-primary" :href="profile.links.resume" target="_blank" rel="noopener noreferrer" @click="trackContact('resume')">
        Download resume <span aria-hidden="true">↗</span><span class="sr-only"> (PDF, opens in a new tab)</span>
      </a>
      <a class="mono ink-link" :href="profile.links.linkedin" target="_blank" rel="noopener noreferrer" @click="trackContact('linkedin')">LinkedIn ↗<span class="sr-only"> (opens in a new tab)</span></a>
      <a class="mono ink-link" :href="profile.links.email" @click="trackContact('email')">{{ profile.email }}</a>
    </div>
  </section>
</template>

<script setup>
import { atAGlance, profile } from '../../data/profile.js'
import { trackContact } from '../../utils/tracking.js'

defineProps({ variant: { type: String, default: 'dark' }, uid: { type: String, default: 'glance' } })
</script>

<style scoped>
.glance { display: grid; gap: 22px; padding: clamp(20px, 2.4vw, 32px); border: 1px solid var(--line); background: rgba(243, 240, 233, 0.03); }
.g-kicker { color: var(--persimmon); margin-bottom: 10px; }
.g-title { font-size: var(--step-2); font-stretch: 112%; font-weight: 300; line-height: 1.1; }
.g-facts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 24px; margin: 0; }
.g-facts dt { color: var(--ink-faint); margin-bottom: 4px; }
.g-facts dd { margin: 0; font-size: var(--step--1); line-height: 1.45; color: var(--ink-soft); }
.g-highlights { padding: 0; list-style: none; display: grid; gap: 8px; }
.g-highlights li { position: relative; padding-left: 20px; font-size: var(--step--1); line-height: 1.5; }
.g-highlights li::before { content: ''; position: absolute; left: 0; top: 0.7em; width: 10px; height: 1px; background: var(--persimmon); }
.g-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 22px; }
.g-primary {
  display: inline-flex; align-items: center; gap: 10px; min-height: 46px; padding: 0 22px; border-radius: 999px;
  background: var(--porcelain); color: var(--obsidian); text-decoration: none; font-size: var(--step--1); font-weight: 500;
  transition: background 0.4s var(--ease-out);
}
.g-primary:hover, .g-primary:focus-visible { background: var(--persimmon); }
.is-light { border-color: rgba(13, 13, 17, 0.18); background: rgba(13, 13, 17, 0.03); color: var(--obsidian); }
.is-light .g-facts dd, .is-light .g-facts dt { color: rgba(13, 13, 17, 0.7); }
.is-light .g-primary { background: var(--obsidian); color: var(--porcelain); }
@media (max-width: 560px) { .g-facts { grid-template-columns: 1fr; } }
</style>
