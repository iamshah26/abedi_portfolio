<template>
  <header class="site-header" :class="{ 'is-light': light, 'is-hidden': hidden }">
    <a class="brand" href="#/journey" @click.prevent="$emit('navigate', 'journey')" aria-label="Ali Haider — back to the beginning">
      ALI HAIDER
    </a>
    <button
      ref="menuButton"
      class="menu-button"
      type="button"
      :aria-expanded="menuOpen"
      aria-controls="site-menu"
      @click="$emit('toggle-menu')"
    >
      <span class="menu-word">{{ menuOpen ? 'CLOSE' : 'MENU' }}</span>
      <span class="menu-plus" :class="{ open: menuOpen }" aria-hidden="true"></span>
    </button>
  </header>
</template>

<script setup>
import { ref } from 'vue'
defineProps({ light: Boolean, hidden: Boolean, menuOpen: Boolean })
defineEmits(['navigate', 'toggle-menu'])
const menuButton = ref(null)
defineExpose({ focusMenuButton: () => menuButton.value?.focus() })
</script>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 60;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: clamp(14px, 2.4vw, 30px) var(--gutter);
  pointer-events: none;
  color: var(--porcelain);
  transition: color 0.8s var(--ease-out), opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
}
.site-header.is-light { color: var(--obsidian); }
.site-header.is-hidden { opacity: 0; transform: translateY(-12px); }
.site-header > * { pointer-events: auto; }
.brand {
  font: 500 var(--step--1) / 1 var(--font-display);
  font-stretch: 125%;
  letter-spacing: 0.22em;
  text-decoration: none;
  padding: 12px 0;
}
.menu-button {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  background: none;
  border: 0;
  padding: 12px 0 12px 12px;
  cursor: pointer;
  font: 500 var(--step--1) / 1 var(--font-display);
  font-stretch: 125%;
  letter-spacing: 0.22em;
}
.menu-plus { position: relative; width: 14px; height: 14px; transition: transform 0.6s var(--ease-out); }
.menu-plus::before, .menu-plus::after {
  content: ''; position: absolute; left: 0; top: 50%; width: 100%; height: 1.5px; background: currentColor;
}
.menu-plus::after { transform: rotate(90deg); }
.menu-plus.open { transform: rotate(45deg); }
.menu-button:hover .menu-plus { transform: rotate(90deg); }
.menu-button:hover .menu-plus.open { transform: rotate(135deg); }
</style>
