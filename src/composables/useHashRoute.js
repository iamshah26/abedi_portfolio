import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Minimal hash router. Routes:
 *   #/work/<projectId>   case study
 *   #/journey | #/work | #/experience | #/about | #/contact   chapter deep links
 * Hash routing needs no server rewrites, so refresh and deep links work on any static host.
 */
export function parseHash(hash = location.hash) {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  if (parts[0] === 'work' && parts[1]) return { project: decodeURIComponent(parts[1]), section: 'work' }
  return { project: null, section: parts[0] || null }
}

export function useHashRoute() {
  const route = ref(parseHash())
  const sync = () => { route.value = parseHash() }
  onMounted(() => window.addEventListener('hashchange', sync))
  onBeforeUnmount(() => window.removeEventListener('hashchange', sync))
  const push = hash => { if (location.hash !== hash) location.hash = hash; else sync() }
  const replace = hash => { history.replaceState(history.state, '', hash || location.pathname + location.search); sync() }
  return { route, push, replace }
}
