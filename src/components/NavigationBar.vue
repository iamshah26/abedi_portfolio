<template>
  <header
    class="header-container"
    :class="{ 'is-floating': isScrolled, 'is-hidden': isHidden }"
  >
    <div class="nav-pill" :class="{ 'pill-elevated': isScrolled }">
      <!-- Left: Monogram / Brand -->
      <a href="#hero" class="nav-brand font-sans">
        <span class="brand-title">ALI HAIDER<span class="brand-period">.</span></span>
      </a>

      <!-- Center: Clean Editorial Links -->
      <nav class="nav-menu font-sans">
        <a
          href="#work"
          class="nav-link"
          :class="{ 'is-active': activeSection === 'work' }"
          @click="closeMobileMenu"
        >
          Work
        </a>
        <a
          href="#build"
          class="nav-link"
          :class="{ 'is-active': activeSection === 'build' }"
          @click="closeMobileMenu"
        >
          Inside the Build
        </a>
        <a
          href="#experience"
          class="nav-link"
          :class="{ 'is-active': activeSection === 'experience' }"
          @click="closeMobileMenu"
        >
          Experience
        </a>
        <a
          href="#about"
          class="nav-link"
          :class="{ 'is-active': activeSection === 'about' }"
          @click="closeMobileMenu"
        >
          About
        </a>
      </nav>

      <!-- Right: Action CTA & Mobile Trigger -->
      <div class="nav-actions">
        <a
          href="#contact"
          class="btn-nav-talk font-sans"
        >
          <span>Let's Talk</span>
          <span class="talk-arrow">↗</span>
        </a>

        <!-- Mobile Menu Hamburger -->
        <button
          class="mobile-menu-btn"
          @click="isMobileOpen = !isMobileOpen"
          aria-label="Toggle navigation menu"
        >
          <span class="menu-bar" :class="{ 'bar-top': isMobileOpen }"></span>
          <span class="menu-bar" :class="{ 'bar-bottom': isMobileOpen }"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Fullscreen Overlay -->
    <transition name="mobile-fade">
      <div v-if="isMobileOpen" class="mobile-overlay font-sans">
        <div class="mobile-nav-links">
          <a href="#work" class="mobile-link" @click="closeMobileMenu">Work</a>
          <a href="#build" class="mobile-link" @click="closeMobileMenu">Inside the Build</a>
          <a href="#experience" class="mobile-link" @click="closeMobileMenu">Experience</a>
          <a href="#about" class="mobile-link" @click="closeMobileMenu">About</a>
          <a href="#contact" class="mobile-link" @click="closeMobileMenu">Contact</a>
          
          <div class="mobile-meta">
            <a
              href="/Syed_Ali_Haider_Abedi_Resume.pdf"
              target="_blank"
              download="Syed_Ali_Haider_Abedi_Resume.pdf"
              class="mobile-resume-link"
            >
              Download Resume (PDF) ↓
            </a>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const isHidden = ref(false);
const isMobileOpen = ref(false);
const activeSection = ref('hero');
let lastScrollY = 0;

const closeMobileMenu = () => {
  isMobileOpen.value = false;
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  // Transform to floating pill
  isScrolled.value = currentScrollY > 60;

  // Smart hide on rapid downward scroll, show on scroll up
  if (currentScrollY > 250 && currentScrollY > lastScrollY + 15) {
    isHidden.value = true;
  } else if (currentScrollY < lastScrollY - 8) {
    isHidden.value = false;
  }
  lastScrollY = currentScrollY;

  // Determine active section
  const sections = ['contact', 'about', 'experience', 'build', 'work', 'hero'];
  for (const id of sections) {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4) {
        activeSection.value = id;
        break;
      }
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1.5rem 2.5rem;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              padding 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.header-container.is-floating {
  padding: 1rem 2.5rem;
}

.header-container.is-hidden {
  transform: translateY(-100%);
}

.nav-pill {
  pointer-events: auto;
  width: 100%;
  max-width: var(--max-width);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.75rem;
  border-radius: var(--radius-pill);
  background: transparent;
  border: 1px solid transparent;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.pill-elevated {
  background: rgba(20, 20, 20, 0.78);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
  max-width: 980px;
}

.nav-brand {
  text-decoration: none;
  color: var(--text-light);
  display: flex;
  align-items: center;
}

.brand-title {
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.brand-period {
  color: var(--accent-vermilion);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2.25rem;
}

.nav-link {
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-light-secondary);
  transition: color 0.25s ease;
  position: relative;
  padding: 0.25rem 0;
}

.nav-link:hover,
.nav-link.is-active {
  color: var(--text-light);
}

.nav-link.is-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1.5px;
  background-color: var(--accent-vermilion);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-nav-talk {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.25rem;
  background: var(--accent-vermilion);
  color: #FFFFFF;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: var(--radius-pill);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 15px var(--accent-vermilion-glow);
}

.btn-nav-talk:hover {
  background: var(--accent-vermilion-hover);
  transform: translateY(-1px);
}

.talk-arrow {
  font-size: 0.9rem;
  transition: transform 0.2s ease;
}

.btn-nav-talk:hover .talk-arrow {
  transform: translate(2px, -2px);
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
}

.menu-bar {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text-light);
  transition: transform 0.3s ease;
}

.bar-top {
  transform: translateY(3.5px) rotate(45deg);
}

.bar-bottom {
  transform: translateY(-3.5px) rotate(-45deg);
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 15, 15, 0.97);
  backdrop-filter: blur(24px);
  z-index: -1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  pointer-events: auto;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.mobile-link {
  font-family: var(--font-serif);
  font-size: 2.75rem;
  color: var(--text-light);
  text-decoration: none;
  transition: color 0.2s ease;
}

.mobile-link:hover {
  color: var(--accent-vermilion);
}

.mobile-meta {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-on-dark);
}

.mobile-resume-link {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--accent-vermilion);
  text-decoration: none;
}

@media (max-width: 900px) {
  .nav-menu {
    display: none;
  }
  .mobile-menu-btn {
    display: flex;
  }
  .header-container {
    padding: 1rem;
  }
  .nav-pill {
    padding: 0.65rem 1.25rem;
  }
}
</style>
