<template>
  <header class="cinematic-hud">
    <!-- Top-Left: Minimalist Brand -->
    <button class="hud-brand font-sans" @click="$emit('warp-to-chapter', 0)">
      <span class="brand-name">ALI HAIDER</span>
      <span class="brand-dot"></span>
    </button>

    <!-- Center: Discreet Chapter Landmark & Progress -->
    <div class="hud-center font-mono">
      <span class="chapter-indicator">{{ chapterNames[activeChapterIndex] }}</span>
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: `${scrollProgress * 100}%` }"></div>
      </div>
      <span class="chapter-count">0{{ activeChapterIndex + 1 }} / 06</span>
    </div>

    <!-- Top-Right: Direct CTA + MENU Button -->
    <div class="hud-right font-sans">
      <button class="hud-cta font-mono" @click="$emit('warp-to-chapter', 5)">
        <span>Let's Talk</span>
        <span>↗</span>
      </button>

      <button class="hud-menu-btn font-mono" @click="menuOpen = !menuOpen">
        <span>{{ menuOpen ? 'CLOSE ✕' : 'MENU +' }}</span>
      </button>
    </div>

    <!-- Fullscreen Minimalist Scene Selector Overlay Drawer -->
    <Transition name="drawer-fade">
      <div v-if="menuOpen" class="hud-drawer-backdrop" @click.self="menuOpen = false">
        <div class="hud-drawer">
          <div class="drawer-header font-mono">
            <span>WORLDS I'VE BUILT // SCENE SELECTOR</span>
            <button class="drawer-close font-mono" @click="menuOpen = false">✕</button>
          </div>

          <nav class="drawer-nav font-serif">
            <button
              v-for="(name, idx) in chapterNames"
              :key="idx"
              class="drawer-link"
              :class="{ 'is-current': activeChapterIndex === idx }"
              @click="handleSelectChapter(idx)"
            >
              <span class="link-num font-mono">0{{ idx + 1 }}</span>
              <span class="link-label">{{ name }}</span>
              <span class="link-arrow">→</span>
            </button>
          </nav>

          <div class="drawer-footer font-mono">
            <div class="drawer-external-links">
              <a
                href="/Syed_Ali_Haider_Abedi_Resume.pdf"
                download="Syed_Ali_Haider_Abedi_Resume.pdf"
                class="footer-link"
              >
                ↓ Download Resume
              </a>
              <a
                href="https://github.com/iamshah26"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link"
              >
                LinkedIn ↗
              </a>
              <a
                :href="personalInfo.whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link footer-green"
              >
                WhatsApp ↗
              </a>
            </div>
            <span class="footer-copy">ALI HAIDER · LAHORE, PAKISTAN</span>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { personalInfo } from '../data/portfolio.js';

const props = defineProps({
  activeChapterIndex: {
    type: Number,
    default: 0
  },
  scrollProgress: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['warp-to-chapter']);

const menuOpen = ref(false);

const chapterNames = [
  '01 // THE ENTRANCE',
  '02 // INTEVO PULSE',
  '03 // RAAHEE',
  '04 // ENTERACT ENGAGE',
  '05 // STUDIO & JOURNEY',
  '06 // THE CONNECTION'
];

function handleSelectChapter(idx) {
  emit('warp-to-chapter', idx);
  menuOpen.value = false;
}
</script>

<style scoped>
.cinematic-hud {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  pointer-events: none;
}

.cinematic-hud > * {
  pointer-events: auto;
}

/* TOP-LEFT BRAND */
.hud-brand {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0;
}

.brand-name {
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #FFFFFF;
}

.brand-dot {
  width: 6px;
  height: 6px;
  background: var(--accent-coral, #FF725E);
  border-radius: 50%;
}

/* CENTER LANDMARK */
.hud-center {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  color: rgba(244, 240, 232, 0.65);
  background: rgba(14, 13, 20, 0.55);
  backdrop-filter: blur(12px);
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.progress-track {
  width: 90px;
  height: 2px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 1px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent-coral, #FF725E);
  transition: width 0.1s linear;
}

.chapter-count {
  color: rgba(244, 240, 232, 0.4);
}

/* TOP-RIGHT BUTTONS */
.hud-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hud-cta {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
  padding: 0.55rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  backdrop-filter: blur(8px);
  transition: background 0.2s ease, border-color 0.2s ease;
}

.hud-cta:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: #FFFFFF;
}

.hud-menu-btn {
  background: var(--accent-coral, #FF725E);
  border: none;
  color: #FFFFFF;
  padding: 0.55rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}

.hud-menu-btn:hover {
  transform: translateY(-1px);
  background: #ff5c45;
}

/* FULLSCREEN DRAWER OVERLAY */
.hud-drawer-backdrop {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(9, 10, 16, 0.92);
  backdrop-filter: blur(28px);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
}

.hud-drawer {
  width: 100%;
  max-width: 640px;
  height: 100%;
  background: #0E0D14;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  color: rgba(244, 240, 232, 0.5);
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.drawer-close {
  background: none;
  border: none;
  color: #FFFFFF;
  font-size: 1.25rem;
  cursor: pointer;
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 3rem 0;
}

.drawer-link {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  text-align: left;
  padding: 0.5rem 0;
  transition: transform 0.2s ease;
}

.drawer-link:hover {
  transform: translateX(10px);
}

.link-num {
  font-size: 0.85rem;
  color: var(--accent-coral, #FF725E);
}

.link-label {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  color: rgba(244, 240, 232, 0.85);
  transition: color 0.2s ease;
}

.drawer-link:hover .link-label,
.drawer-link.is-current .link-label {
  color: #FFFFFF;
}

.link-arrow {
  opacity: 0;
  font-size: 1.5rem;
  color: var(--accent-coral, #FF725E);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.drawer-link:hover .link-arrow {
  opacity: 1;
  transform: translateX(5px);
}

.drawer-footer {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-size: 0.78rem;
}

.drawer-external-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-link {
  color: rgba(244, 240, 232, 0.65);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--accent-coral, #FF725E);
}

.footer-green {
  color: #10b981;
}

.footer-copy {
  color: rgba(244, 240, 232, 0.35);
  letter-spacing: 0.08em;
}

/* ANIMATIONS */
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .cinematic-hud {
    padding: 1.25rem 1.5rem;
  }
  .hud-center {
    display: none;
  }
  .hud-drawer {
    padding: 2rem;
  }
}
</style>

