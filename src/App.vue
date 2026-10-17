<template>
  <a class="skip-link" href="#/work" @click.prevent="navigate('work')">Skip to Selected Work</a>

  <SiteHeader
    ref="header"
    :light="headerLight"
    :menu-open="menuOpen"
    :hidden="!!activeProject"
    @navigate="navigate"
    @toggle-menu="menuOpen ? closeMenu() : (menuOpen = true)"
  />
  <MenuOverlay
    :open="menuOpen"
    :mode="mode"
    :can-cinematic="webgl"
    @close="closeMenu"
    @navigate="navigate"
    @switch-mode="switchMode"
  />

  <ExperienceStage
    v-if="mode === 'experience'"
    ref="stage"
    :inert="overlayOpen || null"
    @ready="onReady"
    @open-project="openProject"
    @navigate="navigate"
    @fail="onFail"
    @frame="f => (porcelain = f.porcelain)"
  />
  <StaticPortfolio
    v-else
    :inert="overlayOpen || null"
    :notice="notice"
    :can-cinematic="webgl"
    @switch-mode="switchMode"
  />

  <CaseStudy :project="activeProject" @close="closeProject" @entered="onCaseEntered" @leaving="onCaseLeaving" />
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import SiteHeader from './components/ui/SiteHeader.vue'
import MenuOverlay from './components/ui/MenuOverlay.vue'
import CaseStudy from './components/CaseStudy.vue'
import StaticPortfolio from './components/StaticPortfolio.vue'
import { defineAsyncComponent } from 'vue'
import { projectById, projects } from './data/profile.js'
import { useHashRoute } from './composables/useHashRoute.js'
import { NAV_TARGETS, exhibitProgress, webglAvailable } from './experience/navigation.js'

// The WebGL stage (three.js, GSAP) is loaded only when the cinematic mode is used.
const ExperienceStage = defineAsyncComponent(() => import('./components/experience/ExperienceStage.vue'))

const params = new URLSearchParams(location.search)
const webgl = webglAvailable()
const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches
let optedIn = false
try { optedIn = sessionStorage.getItem('cinematic') === '1' } catch { /* storage may be blocked */ }

function initialMode() {
  if (params.has('static')) return ['static', '']
  if (!webgl) return ['static', 'This browser cannot run the WebGL installation, so you are seeing the simple version.']
  if (prefersReduced && !optedIn && !params.has('cinematic')) return ['static', 'Your system prefers reduced motion, so the cinematic camera is off.']
  return ['experience', '']
}
const [m0, n0] = initialMode()
const mode = ref(m0)
const notice = ref(n0)
const menuOpen = ref(false)
const stage = ref(null)
const header = ref(null)
const porcelain = ref(0)
const engine = ref(null)
const { route, push, replace } = useHashRoute()
let openedFromApp = false

const activeProject = computed(() => (route.value.project ? projectById(route.value.project) || null : null))
const overlayOpen = computed(() => menuOpen.value || !!activeProject.value)
const headerLight = computed(() => mode.value === 'experience' && porcelain.value > 0.6 && !menuOpen.value)

function closeMenu() {
  menuOpen.value = false
  nextTick(() => header.value?.focusMenuButton())
}

/** Chapter navigation for both modes. */
function navigate(id) {
  if (mode.value === 'experience') {
    const p = NAV_TARGETS[id] ?? 0
    engine.value?.goTo(p, { fly: !prefersReduced })
  } else {
    const el = document.getElementById(id === 'journey' ? 'journey' : id)
    el?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
  }
  if (route.value.section && !route.value.project) replace('')
}

/** Selecting an exhibit: the camera dollies into the artwork, then the case study opens. */
async function openProject(id) {
  if (engine.value && mode.value === 'experience') await engine.value.focusProject(id)
  openedFromApp = true
  push(`#/work/${id}`)
}

function closeProject() {
  if (openedFromApp && history.length > 1) history.back()
  else replace('')
}

function onCaseEntered() { engine.value?.setPaused(true) }
function onCaseLeaving() {
  engine.value?.setPaused(false)
  engine.value?.unfocus()
  openedFromApp = false
}

// Deep links and menu links to case studies: position the scene behind the overlay.
watch(() => route.value.project, id => {
  document.documentElement.style.overflow = id ? 'hidden' : ''
  if (!id || !engine.value) return
  const i = projects.findIndex(p => p.id === id)
  if (i >= 0 && engine.value.focusedId !== id) {
    engine.value.goTo(exhibitProgress(i), { fly: false })
    engine.value.focusProject(id, { instant: true })
  }
}, { immediate: true })

function onReady(exp) {
  engine.value = exp
  const { section, project } = route.value
  if (project) {
    const i = projects.findIndex(p => p.id === project)
    if (i >= 0) { exp.goTo(exhibitProgress(i), { fly: false }); exp.focusProject(project, { instant: true }) }
  } else if (section && NAV_TARGETS[section] !== undefined) {
    exp.goTo(NAV_TARGETS[section], { fly: false })
  }
}

function onFail(reason) {
  engine.value = null
  mode.value = 'static'
  notice.value = reason === 'context-lost'
    ? 'The 3D renderer was interrupted by the browser, so you are seeing the simple version.'
    : 'The 3D installation could not start in this browser, so you are seeing the simple version.'
}

function switchMode(next) {
  menuOpen.value = false
  if (next === 'experience') {
    try { sessionStorage.setItem('cinematic', '1') } catch { /* ignore */ }
    notice.value = ''
  }
  engine.value = null
  mode.value = next
  window.scrollTo({ top: 0 })
}
</script>
