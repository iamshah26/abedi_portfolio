<template>
  <section class="hero-section section-dark" id="hero">
    <!-- Subtle Ambient Glow -->
    <div class="ambient-glow"></div>

    <div class="container hero-container">
      <!-- Top Editorial Eyebrow -->
      <div class="hero-eyebrow font-mono">
        <span class="eyebrow-dash">—</span>
        <span>INDEPENDENT PRODUCT BUILDER / SENIOR FRONTEND ENGINEER</span>
      </div>

      <!-- Main Monumental Editorial Headline -->
      <div class="hero-headline-wrap">
        <h1 class="hero-headline font-serif">
          I build digital products that <span class="italic-serif">feel</span> as good as they <span class="italic-serif">work</span>.
        </h1>
      </div>

      <!-- Supporting Narrative & Identity Bar -->
      <div class="hero-middle-row">
        <div class="hero-bio">
          <p class="hero-subline font-sans">
            From high-throughput enterprise applications to autonomous AI-powered platforms, I design and engineer digital experiences built for real people.
          </p>
          <div class="hero-meta-badges font-mono">
            <span class="meta-tag">Ali Haider (Syed Ali Haider Abedi)</span>
            <span class="meta-separator">/</span>
            <span class="meta-tag">Co-Founder @ Intevo</span>
            <span class="meta-separator">/</span>
            <span class="meta-tag">Ex-ibex Enterprise Frontend</span>
          </div>
        </div>

        <div class="hero-ctas">
          <a href="#work" class="btn btn-vermilion font-sans">
            <span>Explore My Work</span>
            <span class="cta-arrow">↘</span>
          </a>
          <a href="#contact" class="btn btn-outline-light font-sans">
            <span>Let's Build Something</span>
            <span class="cta-arrow">↗</span>
          </a>
        </div>
      </div>

      <!-- Interactive Layered Product Composition (Realistic UIs) -->
      <div
        class="product-stage"
        ref="stageRef"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      >
        <!-- Card 1: Intevo Pulse (AI Voice Product) -->
        <div class="stage-card card-pulse" :style="pulseTransform">
          <div class="card-glass-header">
            <div class="header-left">
              <span class="live-dot"></span>
              <span class="header-status font-mono">LIVE AI CONVERSATION // 02:45</span>
            </div>
            <span class="product-badge font-mono">INTEVO PULSE</span>
          </div>

          <!-- Waveform Visualizer -->
          <div class="waveform-box">
            <div
              v-for="(bar, i) in waveBars"
              :key="i"
              class="wave-bar"
              :style="{
                height: `${bar.height}%`,
                animationDelay: `${bar.delay}s`
              }"
            ></div>
          </div>

          <!-- Dialogue Snippet -->
          <div class="dialogue-box font-sans">
            <div class="dialogue-row user-row">
              <span class="dialogue-who font-mono">CALLER</span>
              <p class="dialogue-text">“Can you verify the arrival time for the northern tour departure?”</p>
            </div>
            <div class="dialogue-row ai-row">
              <span class="dialogue-who font-mono ai-who">AI VOICE AGENT</span>
              <p class="dialogue-text">“Confirmed. The Hunza convoy leaves at 06:30 AM tomorrow. Your digital pass is verified.”</p>
            </div>
          </div>

          <!-- Telemetry Footer -->
          <div class="telemetry-bar font-mono">
            <div class="tel-item">
              <span class="tel-label">LATENCY</span>
              <span class="tel-val">380ms</span>
            </div>
            <div class="tel-item">
              <span class="tel-label">PIPELINE</span>
              <span class="tel-val text-vermilion">WebSockets + Realtime Audio</span>
            </div>
            <div class="tel-item">
              <span class="tel-label">HANDOFF</span>
              <span class="tel-val">Supervisor Ready</span>
            </div>
          </div>
        </div>

        <!-- Card 2: Raahee.pk (Travel OS & Marketplace) -->
        <div class="stage-card card-raahee" :style="raaheeTransform">
          <div class="card-glass-header">
            <div class="header-left">
              <span class="card-tag font-mono">RAAHEE.PK</span>
            </div>
            <span class="status-verified font-mono">✓ 30 OPERATORS VERIFIED</span>
          </div>

          <div class="raahee-content">
            <div class="tour-preview">
              <div class="tour-dest font-mono">HUNZA &amp; SKARDU // 7-DAY EXPEDITION</div>
              <div class="tour-meta">
                <span class="tour-price font-sans">PKR 85,000</span>
                <span class="tour-badge font-mono">LIVE TRACKING</span>
              </div>
            </div>
            <div class="raahee-bar font-mono">
              <span>Next.js · Supabase · Resend API</span>
            </div>
          </div>
        </div>

        <!-- Card 3: Enteract Engage (ibex 5,000+ Agents Enterprise Workspace) -->
        <div class="stage-card card-ibex" :style="ibexTransform">
          <div class="card-glass-header">
            <div class="header-left">
              <span class="card-tag font-mono">ENTERACT ENGAGE // ibex</span>
            </div>
            <span class="agent-count font-mono">5,000+ AGENTS</span>
          </div>

          <div class="ibex-content font-mono">
            <div class="ibex-queue-item">
              <span class="q-icon">📞</span>
              <span class="q-title">Voice Telephony Dispatch</span>
              <span class="q-status">SignalR Connected</span>
            </div>
            <div class="ibex-queue-item">
              <span class="q-icon">💬</span>
              <span class="q-title">Omnichannel Support Stream</span>
              <span class="q-status">RxJS Reactive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const stageRef = ref(null);
const tiltX = ref(0);
const tiltY = ref(0);

// Pre-computed waveform heights
const waveBars = [
  { height: 35, delay: 0.1 },
  { height: 60, delay: 0.25 },
  { height: 85, delay: 0.15 },
  { height: 45, delay: 0.3 },
  { height: 95, delay: 0.05 },
  { height: 70, delay: 0.2 },
  { height: 40, delay: 0.35 },
  { height: 80, delay: 0.1 },
  { height: 50, delay: 0.25 },
  { height: 90, delay: 0.15 },
  { height: 65, delay: 0.3 },
  { height: 30, delay: 0.4 },
  { height: 75, delay: 0.08 },
  { height: 55, delay: 0.22 },
  { height: 85, delay: 0.12 },
  { height: 40, delay: 0.28 },
  { height: 60, delay: 0.18 },
  { height: 35, delay: 0.32 }
];

const handleMouseMove = (e) => {
  if (!stageRef.value) return;
  const rect = stageRef.value.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;

  tiltX.value = x * 12;
  tiltY.value = -y * 12;
};

const handleMouseLeave = () => {
  tiltX.value = 0;
  tiltY.value = 0;
};

// Computed parallax transforms
const pulseTransform = ref({
  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
});
const raaheeTransform = ref({
  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)'
});
const ibexTransform = ref({
  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)'
});
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  padding-top: calc(var(--nav-height) + 3rem);
  padding-bottom: 6rem;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.ambient-glow {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 70vw;
  height: 450px;
  background: radial-gradient(circle, rgba(241, 100, 69, 0.07) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.hero-container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 2.75rem;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  color: var(--accent-vermilion);
}

.hero-headline-wrap {
  max-width: 1100px;
}

.hero-headline {
  font-size: clamp(2.75rem, 6.2vw, 5.5rem);
  color: var(--text-light);
  line-height: 1.08;
  letter-spacing: -0.02em;
}

.italic-serif {
  font-style: italic;
  font-weight: 400;
  color: var(--accent-vermilion);
}

.hero-middle-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 3rem;
  flex-wrap: wrap;
}

.hero-bio {
  max-width: 620px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.hero-subline {
  font-size: clamp(1.05rem, 1.8vw, 1.25rem);
  color: var(--text-light-secondary);
  line-height: 1.6;
}

.hero-meta-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.75rem;
  color: var(--text-light-muted);
}

.meta-separator {
  color: var(--accent-vermilion);
}

.hero-ctas {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-arrow {
  font-size: 1.1rem;
  transition: transform 0.25s ease;
}

.btn-vermilion:hover .cta-arrow {
  transform: translate(2px, 2px);
}

.btn-outline-light:hover .cta-arrow {
  transform: translate(2px, -2px);
}

/* INTERACTIVE LAYERED PRODUCT COMPOSITION */
.product-stage {
  position: relative;
  width: 100%;
  min-height: 480px;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1200px;
}

.stage-card {
  border-radius: var(--radius-lg);
  background: rgba(24, 24, 24, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-on-dark-medium);
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.7);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.4s ease,
              border-color 0.4s ease;
}

.stage-card:hover {
  border-color: rgba(241, 100, 69, 0.4);
  box-shadow: 0 35px 70px -15px rgba(0, 0, 0, 0.85),
              0 0 30px var(--accent-vermilion-glow);
}

/* Foreground Center Card: Intevo Pulse */
.card-pulse {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 680px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.card-glass-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-on-dark);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.live-dot {
  width: 7px;
  height: 7px;
  background: var(--accent-vermilion);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent-vermilion);
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.3); }
}

.header-status {
  font-size: 0.72rem;
  color: var(--text-light-secondary);
}

.product-badge {
  font-size: 0.72rem;
  color: var(--accent-vermilion);
  font-weight: 700;
  letter-spacing: 0.05em;
}

.waveform-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  height: 48px;
  padding: 0.5rem 0.75rem;
  background: rgba(0, 0, 0, 0.35);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-on-dark);
}

.wave-bar {
  flex: 1;
  background: var(--accent-vermilion);
  border-radius: 2px;
  animation: wave-bounce 1.4s ease-in-out infinite alternate;
}

@keyframes wave-bounce {
  0% { transform: scaleY(0.3); opacity: 0.4; }
  100% { transform: scaleY(1); opacity: 1; }
}

.dialogue-box {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dialogue-row {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-on-dark);
}

.ai-row {
  background: rgba(241, 100, 69, 0.06);
  border-color: rgba(241, 100, 69, 0.2);
}

.dialogue-who {
  font-size: 0.65rem;
  color: var(--text-light-muted);
  letter-spacing: 0.06em;
}

.ai-who {
  color: var(--accent-vermilion);
}

.dialogue-text {
  font-size: 0.88rem;
  color: var(--text-light);
  line-height: 1.4;
}

.telemetry-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-on-dark);
  font-size: 0.7rem;
}

.tel-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.tel-label {
  color: var(--text-light-muted);
}

.tel-val {
  color: var(--text-light);
  font-weight: 600;
}

.text-vermilion {
  color: var(--accent-vermilion);
}

/* Background Left Card: Raahee.pk */
.card-raahee {
  position: absolute;
  top: 15px;
  left: 2%;
  width: 320px;
  padding: 1.25rem;
  z-index: 1;
  opacity: 0.88;
  transform: rotate(-4deg);
}

.card-tag {
  font-size: 0.75rem;
  color: var(--text-light);
  font-weight: 700;
}

.status-verified {
  font-size: 0.68rem;
  color: #10b981;
}

.raahee-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.tour-dest {
  font-size: 0.72rem;
  color: var(--text-light-muted);
}

.tour-meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.tour-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-light);
}

.tour-badge {
  font-size: 0.65rem;
  padding: 0.2rem 0.5rem;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border-radius: var(--radius-xs);
}

.raahee-bar {
  font-size: 0.68rem;
  color: var(--text-light-muted);
  border-top: 1px solid var(--border-on-dark);
  padding-top: 0.5rem;
}

/* Background Right Card: ibex Enteract */
.card-ibex {
  position: absolute;
  bottom: 20px;
  right: 2%;
  width: 330px;
  padding: 1.25rem;
  z-index: 2;
  opacity: 0.92;
  transform: rotate(3deg);
}

.agent-count {
  font-size: 0.68rem;
  color: var(--accent-vermilion);
  font-weight: 600;
}

.ibex-content {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 0.75rem;
}

.ibex-queue-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-xs);
  font-size: 0.72rem;
}

.q-title {
  color: var(--text-light);
  flex: 1;
}

.q-status {
  color: var(--accent-vermilion);
  font-size: 0.65rem;
}

@media (max-width: 1024px) {
  .product-stage {
    min-height: auto;
  }
  .card-raahee,
  .card-ibex {
    display: none;
  }
  .card-pulse {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .hero-headline {
    font-size: 2.5rem;
  }
  .hero-ctas {
    width: 100%;
    flex-direction: column;
  }
  .hero-ctas .btn {
    width: 100%;
  }
  .telemetry-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
