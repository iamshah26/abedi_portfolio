<template>
  <div class="offer" :class="{ compact }">
    <ol class="o-items">
      <li v-for="(item, i) in offer.items" :key="item.title">
        <span class="mono o-n">{{ String(i + 1).padStart(2, '0') }}</span>
        <strong>{{ item.title }}</strong>
        <span v-if="!compact" class="o-text">{{ item.text }}</span>
      </li>
    </ol>
    <a class="o-start" :href="offer.startProject" @click="trackContact('start-project')">
      Start a project <span aria-hidden="true">→</span>
    </a>
  </div>
</template>

<script setup>
import { offer } from '../../data/profile.js'
import { trackContact } from '../../utils/tracking.js'

defineProps({ compact: Boolean })
</script>

<style scoped>
.offer { display: grid; grid-template-columns: 1fr auto; gap: 18px 36px; align-items: end; }
.o-items { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
.o-items li { display: grid; gap: 4px; align-content: start; }
.o-n { color: #b4472f; }
.o-items strong { font-weight: 500; font-size: var(--step-0); }
.o-text { font-size: var(--step--1); line-height: 1.45; opacity: 0.72; }
.o-start {
  display: inline-flex; align-items: center; gap: 12px; min-height: 52px; padding: 0 28px; border-radius: 999px;
  background: var(--obsidian); color: var(--porcelain); text-decoration: none; font-weight: 500; white-space: nowrap;
  transition: background 0.4s var(--ease-out), transform 0.4s var(--ease-out);
}
.o-start:hover, .o-start:focus-visible { background: #b4472f; transform: translateX(3px); }
.compact { grid-template-columns: 1fr; gap: 12px; }
.compact .o-items { grid-template-columns: 1fr; gap: 6px; }
.compact .o-items li { grid-template-columns: 2.2em 1fr; }
.compact .o-items strong { font-size: var(--step--1); }
.compact .o-start { justify-self: start; min-height: 46px; }
@media (max-width: 900px) {
  .offer { grid-template-columns: 1fr; }
  .o-items { grid-template-columns: 1fr; }
}
</style>
