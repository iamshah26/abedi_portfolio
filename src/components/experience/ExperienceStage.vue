<template>
  <div class="stage" :class="{ mobile }">
    <canvas ref="canvas" class="stage-canvas" aria-hidden="true"></canvas>
    <div class="stage-grain" :class="{ on: mobile }" aria-hidden="true"></div>

    <main id="journey" class="track" ref="track" :style="{ height: trackHeight }">
      <h1 class="sr-only">Ali Haider — Software Engineer and Product Builder. The Space Between, an interactive portfolio.</h1>
      <p class="sr-only">
        An interactive 3D journey. Scroll to move through it, or use the menu to jump to a chapter or open a case study directly.
      </p>
    </main>

    <ChapterOverlays
      :frame="frame"
      :ready="ready"
      :mobile="mobile"
      @open="id => $emit('open-project', id)"
      @goto="p => engine?.goTo(p)"
      @navigate="id => $emit('navigate', id)"
    />

    <Transition name="curtain">
      <div v-if="!ready" class="loader" role="status" aria-live="polite">
        <p class="loader-name display">ALI HAIDER</p>
        <p class="mono loader-note">Preparing the installation</p>
        <i class="loader-line" aria-hidden="true"></i>
      </div>
    </Transition>

    <aside v-if="showPanel && diag" class="diag mono" aria-hidden="true">
      <div>progress {{ diag.progress }} · {{ diag.chapter }}</div>
      <div>camera {{ diag.camera.join(', ') }}</div>
      <div>target {{ diag.target.join(', ') }}</div>
      <div>fov {{ diag.fov }} · fps {{ diag.fps }} · tier {{ diag.tier }} · dpr {{ diag.dpr }}</div>
      <div>calls {{ diag.drawCalls }} · tris {{ diag.triangles }}</div>
    </aside>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch } from 'vue'
import { Experience } from '../../experience/Experience.js'
import { CHAPTERS } from '../../experience/navigation.js'
import ChapterOverlays from './ChapterOverlays.vue'

const emit = defineEmits(['open-project', 'navigate', 'fail', 'ready', 'frame'])
const canvas = ref(null)
const track = ref(null)
const engine = shallowRef(null)
const ready = ref(false)
const mobile = ref(innerWidth / innerHeight < 0.9)
const frame = reactive({ progress: 0, chapter: CHAPTERS[0], activeExhibit: -1, porcelain: 0 })
const params = new URLSearchParams(location.search)
const debug = import.meta.env.DEV || params.has('debug') || params.has('diag')
const showPanel = params.has('debug')
const diag = shallowRef(null)
const trackHeight = computed(() => (mobile.value ? '1300vh' : '1500vh'))
let raf = 0
watch(trackHeight, () => nextTick(() => engine.value?.scroll?.refresh()))

function onFrame(f) {
  // Write only when values change to keep Vue's work per frame minimal.
  if (Math.abs(f.progress - frame.progress) > 1e-5) frame.progress = f.progress
  if (f.chapter !== frame.chapter) frame.chapter = f.chapter
  if (f.activeExhibit !== frame.activeExhibit) frame.activeExhibit = f.activeExhibit
  frame.porcelain = f.porcelain
  emit('frame', frame)
}

function onResize() { mobile.value = innerWidth / innerHeight < 0.9 }

onMounted(async () => {
  window.addEventListener('resize', onResize)
  const exp = new Experience({
    canvas: canvas.value,
    track: track.value,
    debug,
    onFrame,
    onSelectProject: id => emit('open-project', id),
    onFail: reason => emit('fail', reason)
  })
  engine.value = exp
  try {
    await exp.init()
  } catch (err) {
    console.error('[experience] failed to start', err)
    emit('fail', 'init-error')
    return
  }
  if (exp.disposed) return
  // Give the first frames a moment to settle before lifting the curtain.
  setTimeout(() => { ready.value = true; emit('ready', exp) }, 450)
  if (showPanel) {
    const loop = () => { diag.value = window.__experience ? { ...window.__experience } : null; raf = setTimeout(loop, 250) }
    loop()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  clearTimeout(raf)
  engine.value?.dispose()
})

defineExpose({ engine })
</script>

<style scoped>
.stage-canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100lvh;
  display: block;
  touch-action: pan-y;
  z-index: 0;
}
.track { position: relative; z-index: 1; pointer-events: none; }
.stage-grain {
  position: fixed; inset: -50%; z-index: 2; pointer-events: none; opacity: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>");
}
.stage-grain.on { opacity: 0.07; animation: grain 1.2s steps(6) infinite; }
@keyframes grain { 0% { transform: translate(0, 0); } 33% { transform: translate(-3%, 2%); } 66% { transform: translate(2%, -3%); } 100% { transform: translate(0, 0); } }

.loader {
  position: fixed; inset: 0; z-index: 80;
  background: var(--obsidian);
  display: grid; place-content: center; justify-items: center; gap: 18px;
}
.loader-name { font-size: clamp(1.4rem, 1rem + 2vw, 2.6rem); letter-spacing: 0.4em; padding-left: 0.4em; }
.loader-note { color: var(--ink-faint); }
.loader-line { width: 140px; height: 1px; background: var(--line); position: relative; overflow: hidden; }
.loader-line::after { content: ''; position: absolute; inset: 0; background: var(--persimmon); transform-origin: left; animation: load 1.6s var(--ease-in-out) infinite; }
@keyframes load { 0% { transform: scaleX(0); } 60% { transform: scaleX(1); } 100% { transform: scaleX(1) translateX(100%); } }
.curtain-leave-active { transition: clip-path 1.3s var(--ease-in-out); }
.curtain-leave-to { clip-path: inset(0 0 100% 0); }

.diag {
  position: fixed; left: 12px; top: 72px; z-index: 90; padding: 10px 12px; background: rgba(0, 0, 0, 0.7);
  color: #9fe; font-size: 11px; line-height: 1.5; text-transform: none; letter-spacing: 0; pointer-events: none;
}
</style>
