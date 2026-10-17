<template>
  <figure class="marbles" :class="[`is-${variant}`, { compact }]">
    <figcaption class="mono m-head">
      <span>Reactive streams, live</span>
      <code>source$.pipe(<b>{{ current.code }}</b>)</code>
    </figcaption>

    <div class="ops" role="radiogroup" aria-label="RxJS operator">
      <button
        v-for="op in OPS"
        :key="op.id"
        type="button"
        role="radio"
        :aria-checked="op.id === active"
        :class="{ on: op.id === active }"
        @click="active = op.id"
      >{{ op.id }}</button>
    </div>

    <svg :viewBox="`0 0 ${W} 132`" class="lanes" role="img" :aria-label="ariaText">
      <!-- input lane -->
      <line x1="10" :x2="W - 14" y1="34" y2="34" class="lane" />
      <path :d="`M${W - 18} 29 L${W - 10} 34 L${W - 18} 39`" class="lane" fill="none" />
      <!-- operator box -->
      <rect x="10" y="54" :width="W - 24" height="24" rx="12" class="op-box" />
      <text :x="W / 2 - 7" y="70" text-anchor="middle" class="op-text">{{ current.code }}</text>
      <!-- output lane -->
      <line x1="10" :x2="W - 14" y1="104" y2="104" class="lane" />
      <path :d="`M${W - 18} 99 L${W - 10} 104 L${W - 18} 109`" class="lane" fill="none" />
      <!-- playhead -->
      <line :x1="xAt(now)" :x2="xAt(now)" y1="16" y2="122" class="playhead" />

      <g v-for="(e, i) in INPUT" :key="`in-${i}`" :class="['m', { lit: now >= e.t }]" :transform="`translate(${xAt(e.t)} 34)`">
        <circle r="8.5" :style="{ fill: color(e.v) }" />
        <text y="3.5" text-anchor="middle">{{ e.v }}</text>
      </g>
      <g v-for="(e, i) in output" :key="`${active}-${i}`" :class="['m', 'out', { lit: now >= e.t }]" :transform="`translate(${xAt(e.t)} 104)`">
        <circle r="8.5" :style="{ fill: color(e.c ?? e.v) }" />
        <text y="4" text-anchor="middle">{{ e.v }}</text>
      </g>
    </svg>
    <p class="m-note">{{ current.note }}</p>
  </figure>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

defineProps({ variant: { type: String, default: 'dark' }, compact: Boolean })

/** One loop of input events: time in ms within a 6 s window, value. */
const LOOP = 6000
// Bursts are 350 ms apart: tight enough for debounce/switchMap to act, wide enough to read on a phone.
const INPUT = [
  { t: 300, v: 1 }, { t: 650, v: 2 }, { t: 1000, v: 3 }, { t: 2200, v: 4 },
  { t: 3200, v: 5 }, { t: 3550, v: 6 }, { t: 3900, v: 7 }, { t: 5000, v: 8 }
]

/** Each operator's output is computed from INPUT with the operator's real semantics. */
const OPS = [
  {
    id: 'map',
    code: 'map(x => x * 10)',
    note: 'Every event is transformed as it arrives — state derived from a stream.',
    run: src => src.map(e => ({ t: e.t, v: e.v * 10, c: e.v }))
  },
  {
    id: 'filter',
    code: 'filter(x => x % 2 === 0)',
    note: 'Only events that pass the predicate continue — routing chats from one channel.',
    run: src => src.filter(e => e.v % 2 === 0)
  },
  {
    id: 'debounceTime',
    code: 'debounceTime(400)',
    note: 'Bursts collapse into the last value after 400 ms of quiet — search inputs, resize, typing.',
    run: src => src.filter((e, i) => !src[i + 1] || src[i + 1].t - e.t > 400).map(e => ({ t: e.t + 400, v: e.v }))
  },
  {
    id: 'switchMap',
    code: 'switchMap(x => request(x))',
    note: 'A new event cancels the in-flight request — only the latest response reaches the UI.',
    run: src => src
      .filter((e, i) => !src[i + 1] || src[i + 1].t - e.t > 500)
      .map(e => ({ t: e.t + 500, v: `${e.v}′`, c: e.v }))
  }
]

const active = ref('switchMap')
const current = computed(() => OPS.find(o => o.id === active.value))
const output = computed(() => current.value.run(INPUT).filter(e => e.t < LOOP))
const W = 360
const xAt = t => 18 + (t / LOOP) * (W - 44)
const PALETTE = ['#B9A7E8', '#F1785D', '#C1C4CB', '#F3F0E9']
const color = v => PALETTE[(Number.parseInt(v, 10) - 1) % PALETTE.length]
const ariaText = computed(() => `Marble diagram for ${current.value.code}: input values ${INPUT.map(e => e.v).join(', ')}; output values ${output.value.map(e => e.v).join(', ')}.`)

const now = ref(0)
let raf = 0, start = 0
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
onMounted(() => {
  if (reduced) { now.value = LOOP; return }
  start = performance.now()
  const tick = t => { now.value = (t - start) % LOOP; raf = requestAnimationFrame(tick) }
  raf = requestAnimationFrame(tick)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<style scoped>
.marbles { margin: 0; display: grid; gap: 12px; max-width: 460px; }
.m-head { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px 14px; color: var(--ink-faint); text-transform: none; letter-spacing: 0.02em; }
.m-head code { font: inherit; color: var(--ink-soft); }
.m-head b { color: var(--persimmon); font-weight: 500; }
.ops { display: flex; flex-wrap: wrap; gap: 6px; }
.ops button {
  font: 500 var(--step--1) / 1 var(--font-mono); letter-spacing: 0.02em;
  min-height: 34px; padding: 0 12px; border-radius: 999px; cursor: pointer;
  background: transparent; color: var(--ink-soft); border: 1px solid var(--line);
  transition: background 0.3s var(--ease-out), color 0.3s, border-color 0.3s;
}
.ops button:hover { border-color: var(--ink-soft); color: var(--porcelain); }
.ops button.on { background: var(--porcelain); color: var(--obsidian); border-color: var(--porcelain); }
.lanes { width: 100%; height: auto; overflow: visible; }
.lane { stroke: rgba(193, 196, 203, 0.45); stroke-width: 1; }
.op-box { fill: rgba(243, 240, 233, 0.04); stroke: rgba(193, 196, 203, 0.3); }
.op-text { font: 500 11px var(--font-mono); fill: var(--ink-soft); }
.playhead { stroke: var(--persimmon); stroke-width: 1; opacity: 0.55; }
.m circle { opacity: 0.28; transition: opacity 0.25s; stroke: rgba(13, 13, 17, 0.6); }
.m text { font: 600 9px var(--font-mono); fill: var(--obsidian); opacity: 0.4; transition: opacity 0.25s; }
.m.lit circle, .m.lit text { opacity: 1; }
.m.out circle, .m.out text { animation: drop 0.5s var(--ease-out) both; }
@keyframes drop { from { opacity: 0; transform: translateY(-8px); } }
.m-note { color: var(--ink-soft); font-size: var(--step--1); line-height: 1.5; min-height: 3em; }
.compact .m-note { display: none; }
.compact .m-head span { display: none; }
.is-light .lane { stroke: rgba(13, 13, 17, 0.35); }
.is-light .op-box { fill: rgba(13, 13, 17, 0.03); stroke: rgba(13, 13, 17, 0.2); }
.is-light .op-text, .is-light .m-head code, .is-light .m-note { fill: rgba(13, 13, 17, 0.7); color: rgba(13, 13, 17, 0.7); }
</style>
