<template>
  <div class="spatial-overlay" :class="{ 'is-interactive': hoveredObject }">
    <!-- Spatial Hover Cursor / Tooltip for 3D Raycasting -->
    <div
      v-if="hoveredObject"
      class="spatial-cursor-tooltip font-mono"
      :style="{ transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)` }"
    >
      <span class="tooltip-dot"></span>
      <span>Click to inspect {{ hoveredObject.name }}</span>
    </div>

    <!-- CHAPTER 01: THE ENTRANCE -->
    <section
      class="spatial-chapter chapter-entrance"
      :class="{ 'is-active': activeChapterIndex === 0, 'is-hidden': activeChapterIndex !== 0 }"
    >
      <div class="chapter-content">
        <div class="kicker-pill font-mono">
          <span class="kicker-pulse"></span>
          <span>WORLDS I'VE BUILT // 3D IMMERSIVE PORTFOLIO</span>
        </div>

        <h1 class="hero-name font-sans">
          ALI HAIDER<span class="dot-accent">.</span>
        </h1>

        <div class="hero-role-badge font-mono">
          <span>SENIOR FRONTEND ENGINEER</span>
          <span class="badge-separator">/</span>
          <span>PRODUCT BUILDER</span>
          <span class="badge-separator">/</span>
          <span>CO-FOUNDER @ INTEVO</span>
        </div>

        <p class="hero-pitch font-sans">
          Engineering complexity into clarity. Traveling through real-time AI voice platforms, 
          high-concurrency enterprise architectures, travel marketplaces, and independent digital ventures.
        </p>

        <div class="entrance-actions font-sans">
          <button class="btn-primary" @click="$emit('warp-to-chapter', 1)">
            <span>Enter Intevo Pulse</span>
            <span class="arrow-icon">→</span>
          </button>
          <a
            href="/Syed_Ali_Haider_Abedi_Resume.pdf"
            download="Syed_Ali_Haider_Abedi_Resume.pdf"
            class="btn-secondary font-mono"
          >
            <span>Download Resume</span>
            <span>↓</span>
          </a>
        </div>

        <div class="scroll-instruction font-mono">
          <div class="scroll-mouse-icon">
            <div class="mouse-wheel"></div>
          </div>
          <span>SCROLL TO TRAVEL THROUGH WORLDS</span>
        </div>
      </div>
    </section>

    <!-- CHAPTER 02: INTEVO PULSE (THE VOICE UNIVERSE) -->
    <section
      class="spatial-chapter chapter-pulse"
      :class="{ 'is-active': activeChapterIndex === 1, 'is-hidden': activeChapterIndex !== 1 }"
    >
      <div class="chapter-content card-editorial">
        <div class="chapter-meta font-mono">
          <span class="chapter-num">CHAPTER 02</span>
          <span class="meta-divider">/</span>
          <span class="tag-accent">FLAGSHIP AI VOICE PRODUCT</span>
        </div>

        <h2 class="chapter-title font-serif">
          Intevo Pulse.
        </h2>

        <p class="chapter-subtitle font-sans">
          VOICE INTELLIGENCE, ENGINEERED.
        </p>

        <p class="chapter-desc font-sans">
          Proprietary AI voice automation infrastructure built at Intevo. Replaces legacy IVRs with human-grade, 
          multilingual conversational agents with real-time call supervision, live sentiment scoring, and operational telemetry.
        </p>

        <div class="chapter-stats-grid font-mono">
          <div class="stat-pill">
            <span class="stat-value">~380ms</span>
            <span class="stat-label">Voice Latency</span>
          </div>
          <div class="stat-pill">
            <span class="stat-value">0.94</span>
            <span class="stat-label">Sentiment Score</span>
          </div>
          <div class="stat-pill">
            <span class="stat-value">Vue 3 + WebSockets</span>
            <span class="stat-label">Frontend Stack</span>
          </div>
        </div>

        <div class="chapter-actions font-sans">
          <button class="btn-primary" @click="$emit('open-modal', 'intevo-pulse')">
            <span>Inspect Full Case Study</span>
            <span class="arrow-icon">↗</span>
          </button>
          <a
            href="https://intevopulse.ai"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-text font-mono"
          >
            <span>Visit intevopulse.ai</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>

    <!-- CHAPTER 03: RAAHEE (THE WORLD OF EXPLORATION) -->
    <section
      class="spatial-chapter chapter-raahee"
      :class="{ 'is-active': activeChapterIndex === 2, 'is-hidden': activeChapterIndex !== 2 }"
    >
      <div class="chapter-content card-editorial">
        <div class="chapter-meta font-mono">
          <span class="chapter-num">CHAPTER 03</span>
          <span class="meta-divider">/</span>
          <span class="tag-emerald">INDEPENDENT PRODUCT</span>
        </div>

        <h2 class="chapter-title font-serif">
          Raahee.
        </h2>

        <p class="chapter-subtitle font-sans">
          EXPLORATION, REIMAGINED.
        </p>

        <p class="chapter-desc font-sans">
          Pakistan's domestic tourism operating system and group-tour booking marketplace. 
          Unites travelers with 30+ verified local tour operators across northern Pakistan with 
          transparent pricing and real-time seat inventory.
        </p>

        <div class="chapter-stats-grid font-mono">
          <div class="stat-pill">
            <span class="stat-value">30+</span>
            <span class="stat-label">Verified Operators</span>
          </div>
          <div class="stat-pill">
            <span class="stat-value">Next.js + Supabase</span>
            <span class="stat-label">Architecture</span>
          </div>
          <div class="stat-pill">
            <span class="stat-value">Production</span>
            <span class="stat-label">Status</span>
          </div>
        </div>

        <div class="chapter-actions font-sans">
          <button class="btn-primary" @click="$emit('open-modal', 'raahee-pk')">
            <span>Inspect Full Case Study</span>
            <span class="arrow-icon">↗</span>
          </button>
          <a
            href="https://www.raahee.pk"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-text font-mono"
          >
            <span>Visit raahee.pk</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>

    <!-- CHAPTER 04: ENTERACT ENGAGE (ENGINEERING AT SCALE) -->
    <section
      class="spatial-chapter chapter-enteract"
      :class="{ 'is-active': activeChapterIndex === 3, 'is-hidden': activeChapterIndex !== 3 }"
    >
      <div class="chapter-content card-editorial">
        <div class="chapter-meta font-mono">
          <span class="chapter-num">CHAPTER 04</span>
          <span class="meta-divider">/</span>
          <span class="tag-turquoise">ENTERPRISE ARCHITECTURE // ibex</span>
        </div>

        <h2 class="chapter-title font-serif">
          Enteract Engage.
        </h2>

        <p class="chapter-subtitle font-sans">
          COMPLEXITY, MADE USABLE.
        </p>

        <p class="chapter-desc font-sans">
          High-throughput enterprise omnichannel workspace built at ibex. Powers daily operations 
          for 5,000+ simultaneous support agents managing customer channels, live chat, and voice telephony 
          with real-time SignalR streams and zero-defect SonarQube quality gates.
        </p>

        <div class="chapter-stats-grid font-mono">
          <div class="stat-pill">
            <span class="stat-value">5,000+</span>
            <span class="stat-label">Daily Enterprise Agents</span>
          </div>
          <div class="stat-pill">
            <span class="stat-value">Angular 16+ Signals</span>
            <span class="stat-label">Reactive Core</span>
          </div>
          <div class="stat-pill">
            <span class="stat-value">SignalR (WebSockets)</span>
            <span class="stat-label">Real-Time Streams</span>
          </div>
        </div>

        <div class="chapter-actions font-sans">
          <button class="btn-primary" @click="$emit('open-modal', 'enteract-engage')">
            <span>Inspect Architecture Case Study</span>
            <span class="arrow-icon">↗</span>
          </button>
        </div>
      </div>
    </section>

    <!-- CHAPTER 05: INTEVO STUDIO & JOURNEY -->
    <section
      class="spatial-chapter chapter-studio"
      :class="{ 'is-active': activeChapterIndex === 4, 'is-hidden': activeChapterIndex !== 4 }"
    >
      <div class="chapter-content card-editorial">
        <div class="chapter-meta font-mono">
          <span class="chapter-num">CHAPTER 05</span>
          <span class="meta-divider">/</span>
          <span class="tag-amber">VENTURES & ENGINEERING JOURNEY</span>
        </div>

        <h2 class="chapter-title font-serif">
          Intevo & The Journey.
        </h2>

        <p class="chapter-subtitle font-sans">
          PRODUCT MINDSET, ENGINEERING DEPTH.
        </p>

        <p class="chapter-desc font-sans">
          As Co-Founder at Intevo (registered in Dubai Digital Park) and creator of platforms like 
          TheXperto and Raahee, I merge senior frontend engineering with product strategy and real-world execution.
        </p>

        <div class="journey-mini-timeline font-mono">
          <div class="j-step">
            <span class="j-dot dot-orange"></span>
            <div class="j-info">
              <strong>Intevo Solutions (2024–Present)</strong>
              <span>Co-Founder · AI Voice & SaaS Platforms</span>
            </div>
          </div>
          <div class="j-step">
            <span class="j-dot dot-blue"></span>
            <div class="j-info">
              <strong>ibex (2023–2026)</strong>
              <span>Senior Frontend Engineer (Analyst Software Engineer)</span>
            </div>
          </div>
          <div class="j-step">
            <span class="j-dot dot-gold"></span>
            <div class="j-info">
              <strong>Voltro by Falkenherz (2021–2022)</strong>
              <span>Frontend Engineer · Vue.js & Nuxt.js</span>
            </div>
          </div>
        </div>

        <div class="chapter-actions font-sans">
          <button class="btn-primary" @click="$emit('open-modal', 'thexperto')">
            <span>Inspect TheXperto Case Study</span>
            <span class="arrow-icon">↗</span>
          </button>
          <a
            href="https://theintevo.com"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-text font-mono"
          >
            <span>Visit theintevo.com</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>

    <!-- CHAPTER 06: THE FINAL CONNECTION (CONTACT) -->
    <section
      class="spatial-chapter chapter-contact"
      :class="{ 'is-active': activeChapterIndex === 5, 'is-hidden': activeChapterIndex !== 5 }"
    >
      <div class="chapter-content card-editorial contact-box">
        <div class="chapter-meta font-mono">
          <span class="chapter-num">CHAPTER 06</span>
          <span class="meta-divider">/</span>
          <span class="tag-gold">THE FINAL CONNECTION</span>
        </div>

        <h2 class="contact-title font-sans">
          LET'S BUILD WHAT'S NEXT<span class="dot-accent">.</span>
        </h2>

        <p class="contact-subhead font-sans">
          Have an enterprise frontend challenge, high-performance product role, or ambitious idea? Let's make it real.
        </p>

        <!-- Direct Contact Actions Grid -->
        <div class="contact-direct-grid font-sans">
          <!-- Action 1: Email Copy -->
          <div class="direct-card" @click="copyEmail">
            <div class="card-icon">✉</div>
            <div class="card-text">
              <span class="card-label font-mono">DIRECT INBOX</span>
              <strong class="card-val">{{ personalInfo.email }}</strong>
            </div>
            <button class="pill-badge font-mono">
              {{ emailCopied ? 'COPIED ✓' : 'COPY' }}
            </button>
          </div>

          <!-- Action 2: WhatsApp Conversion Link -->
          <a
            :href="personalInfo.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="direct-card whatsapp-card"
            @click="handleWhatsAppClick"
          >
            <div class="card-icon">💬</div>
            <div class="card-text">
              <span class="card-label font-mono">WHATSAPP DIRECT</span>
              <strong class="card-val">{{ personalInfo.phone }}</strong>
            </div>
            <span class="pill-badge pill-green font-mono">START CHAT ↗</span>
          </a>
        </div>

        <!-- Secondary Links: Resume, GitHub, LinkedIn -->
        <div class="contact-links-row font-mono">
          <a
            :href="personalInfo.resumeUrl"
            download="Syed_Ali_Haider_Abedi_Resume.pdf"
            class="link-item"
          >
            <span>↓ Download Resume (PDF)</span>
          </a>
          <a
            :href="personalInfo.github"
            target="_blank"
            rel="noopener noreferrer"
            class="link-item"
          >
            <span>GitHub ↗</span>
          </a>
          <a
            :href="personalInfo.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="link-item"
          >
            <span>LinkedIn ↗</span>
          </a>
        </div>

        <!-- Quick Inquiry Form -->
        <form class="mini-form font-sans" @submit.prevent="submitForm">
          <div class="form-row">
            <input
              v-model="form.name"
              type="text"
              placeholder="Your name"
              required
              class="form-input"
            />
            <input
              v-model="form.email"
              type="email"
              placeholder="Your email address"
              required
              class="form-input"
            />
          </div>
          <textarea
            v-model="form.message"
            rows="3"
            placeholder="Tell me about your product, project, or role..."
            required
            class="form-input form-textarea"
          ></textarea>
          <button type="submit" class="btn-primary btn-submit font-sans" :disabled="formSubmitting">
            <span v-if="formSubmitted">Message Received — Talk Soon! ✓</span>
            <span v-else-if="formSubmitting">Transmitting...</span>
            <span v-else>Send Message ↗</span>
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { personalInfo } from '../data/portfolio.js';
import confetti from 'canvas-confetti';

const props = defineProps({
  activeChapterIndex: {
    type: Number,
    default: 0
  },
  hoveredObject: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['warp-to-chapter', 'open-modal']);

const cursorPos = reactive({ x: -100, y: -100 });
const emailCopied = ref(false);
const formSubmitting = ref(false);
const formSubmitted = ref(false);

const form = reactive({
  name: '',
  email: '',
  message: ''
});

function handlePointerMove(e) {
  cursorPos.x = e.clientX + 16;
  cursorPos.y = e.clientY + 16;
}

function copyEmail() {
  navigator.clipboard.writeText(personalInfo.email);
  emailCopied.value = true;
  setTimeout(() => {
    emailCopied.value = false;
  }, 2500);
}

function handleWhatsAppClick() {
  if (typeof window.gtag_report_conversion === 'function') {
    window.gtag_report_conversion();
  }
}

function submitForm() {
  formSubmitting.value = true;
  setTimeout(() => {
    formSubmitting.value = false;
    formSubmitted.value = true;
    if (typeof window.gtag_report_lead_conversion === 'function') {
      window.gtag_report_lead_conversion();
    }
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#F16445', '#B783FF', '#65D9D0', '#F7C56C']
    });
  }, 900);
}

onMounted(() => {
  window.addEventListener('pointermove', handlePointerMove);
});

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', handlePointerMove);
});
</script>

<style scoped>
.spatial-overlay {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 3D Raycasting Tooltip */
.spatial-cursor-tooltip {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(14, 13, 20, 0.9);
  border: 1px solid var(--accent-iridescent, #B783FF);
  color: #FFFFFF;
  padding: 0.4rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
}

.tooltip-dot {
  width: 6px;
  height: 6px;
  background: var(--accent-coral, #FF725E);
  border-radius: 50%;
  animation: pulse-dot 1.2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}

/* Chapter Presentation */
.spatial-chapter {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 2rem 5vw;
  transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

.spatial-chapter.is-active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.spatial-chapter.is-hidden {
  opacity: 0;
  transform: translateY(30px);
  pointer-events: none;
}

.chapter-content {
  max-width: 680px;
  width: 100%;
}

/* CHAPTER 01: ENTRANCE HERO */
.chapter-entrance {
  justify-content: flex-start;
  padding-left: 8vw;
}

.kicker-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  color: var(--accent-coral, #FF725E);
  margin-bottom: 1.25rem;
}

.kicker-pulse {
  width: 8px;
  height: 8px;
  background: var(--accent-coral, #FF725E);
  border-radius: 50%;
  animation: pulse-dot 1.5s infinite;
}

.hero-name {
  font-size: clamp(3.8rem, 8vw, 7.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: #FFFFFF;
  margin-bottom: 1rem;
}

.dot-accent {
  color: var(--accent-coral, #FF725E);
}

.hero-role-badge {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  color: var(--accent-iridescent, #B783FF);
  margin-bottom: 1.5rem;
}

.badge-separator {
  opacity: 0.35;
}

.hero-pitch {
  font-size: clamp(1.05rem, 1.8vw, 1.3rem);
  color: rgba(244, 240, 232, 0.85);
  line-height: 1.55;
  margin-bottom: 2.25rem;
  max-width: 580px;
}

.entrance-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 3.5rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  background: var(--accent-coral, #FF725E);
  color: #FFFFFF;
  padding: 0.95rem 1.85rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  box-shadow: 0 10px 30px rgba(255, 114, 94, 0.35);
}

.btn-primary:hover {
  transform: translateY(-2px);
  background: #ff5c45;
  box-shadow: 0 15px 35px rgba(255, 114, 94, 0.5);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #FFFFFF;
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  padding: 0.9rem 1.5rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  transition: border-color 0.2s ease, background 0.2s ease;
}

.btn-secondary:hover {
  border-color: #FFFFFF;
  background: rgba(255, 255, 255, 0.1);
}

.scroll-instruction {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  color: rgba(244, 240, 232, 0.5);
}

.scroll-mouse-icon {
  width: 18px;
  height: 28px;
  border: 1.5px solid rgba(244, 240, 232, 0.4);
  border-radius: 12px;
  position: relative;
}

.mouse-wheel {
  width: 3px;
  height: 6px;
  background: var(--accent-coral, #FF725E);
  border-radius: 2px;
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  animation: mouse-scroll 1.5s infinite;
}

@keyframes mouse-scroll {
  0% { top: 5px; opacity: 1; }
  100% { top: 14px; opacity: 0; }
}

/* CARD EDITORIAL FOR PROJECTS */
.card-editorial {
  background: rgba(14, 13, 20, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(24px);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8);
}

.chapter-pulse {
  justify-content: flex-end;
  padding-right: 8vw;
}

.chapter-raahee {
  justify-content: flex-start;
  padding-left: 8vw;
}

.chapter-enteract {
  justify-content: flex-end;
  padding-right: 8vw;
}

.chapter-studio {
  justify-content: flex-start;
  padding-left: 8vw;
}

.chapter-contact {
  justify-content: center;
}

.chapter-meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  margin-bottom: 1rem;
}

.meta-divider {
  opacity: 0.35;
}

.tag-accent {
  color: var(--accent-coral, #FF725E);
  font-weight: 700;
}

.tag-emerald {
  color: #10b981;
  font-weight: 700;
}

.tag-turquoise {
  color: var(--accent-turquoise, #65D9D0);
  font-weight: 700;
}

.tag-amber {
  color: #f59e0b;
  font-weight: 700;
}

.tag-gold {
  color: var(--accent-gold, #F7C56C);
  font-weight: 700;
}

.chapter-title {
  font-size: clamp(3rem, 5vw, 4.5rem);
  font-weight: 400;
  line-height: 1;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
}

.chapter-subtitle {
  font-size: 0.88rem;
  letter-spacing: 0.14em;
  color: rgba(244, 240, 232, 0.7);
  margin-bottom: 1.25rem;
}

.chapter-desc {
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(244, 240, 232, 0.85);
  margin-bottom: 1.8rem;
}

.chapter-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-pill {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-size: 1.15rem;
  font-weight: 700;
  color: #FFFFFF;
}

.stat-label {
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  color: rgba(244, 240, 232, 0.55);
}

.chapter-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.btn-text {
  color: #FFFFFF;
  text-decoration: none;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: color 0.2s ease;
}

.btn-text:hover {
  color: var(--accent-coral, #FF725E);
}

/* JOURNEY MINI TIMELINE */
.journey-mini-timeline {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.j-step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.j-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-top: 0.35rem;
  flex-shrink: 0;
}

.dot-orange { background: #F16445; }
.dot-blue { background: #3b82f6; }
.dot-gold { background: #F7C56C; }

.j-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: 0.78rem;
}

.j-info strong {
  color: #FFFFFF;
}

.j-info span {
  color: rgba(244, 240, 232, 0.6);
}

/* CHAPTER 06: CONTACT BOX */
.contact-box {
  max-width: 760px;
  text-align: center;
}

.contact-title {
  font-size: clamp(2.5rem, 4.5vw, 4rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #FFFFFF;
  margin-bottom: 0.75rem;
}

.contact-subhead {
  font-size: 1.15rem;
  color: rgba(244, 240, 232, 0.8);
  margin-bottom: 2rem;
}

.contact-direct-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.direct-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: border-color 0.2s ease, background 0.2s ease;
  text-align: left;
}

.direct-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.25);
}

.card-icon {
  font-size: 1.5rem;
}

.card-text {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-label {
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: rgba(244, 240, 232, 0.5);
}

.card-val {
  font-size: 0.95rem;
  color: #FFFFFF;
}

.pill-badge {
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  border: none;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  cursor: pointer;
}

.pill-green {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.contact-links-row {
  display: flex;
  justify-content: center;
  gap: 1.75rem;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  margin-bottom: 2rem;
}

.link-item {
  color: rgba(244, 240, 232, 0.7);
  text-decoration: none;
  transition: color 0.2s ease;
}

.link-item:hover {
  color: var(--accent-coral, #FF725E);
}

/* MINI FORM */
.mini-form {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  text-align: left;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

.form-input {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 0.85rem 1rem;
  color: #FFFFFF;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  border-color: var(--accent-coral, #FF725E);
}

.form-textarea {
  resize: vertical;
}

.btn-submit {
  width: 100%;
  justify-content: center;
  padding: 1rem;
}

/* RESPONSIVE DESIGN */
@media (max-width: 900px) {
  .spatial-chapter {
    padding: 1.5rem;
    justify-content: center !important;
  }
  .card-editorial {
    padding: 2rem;
  }
  .contact-direct-grid {
    grid-template-columns: 1fr;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>

