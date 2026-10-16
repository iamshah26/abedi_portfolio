<template>
  <div class="projects-chapters" id="work">
    <!-- CHAPTER 01: INTEVO PULSE (FLAGSHIP AI VOICE PRODUCT) -->
    <section class="project-chapter chapter-pulse section-dark">
      <div class="container">
        <!-- Chapter Header -->
        <div class="chapter-top">
          <div class="chapter-badge font-mono">
            <span class="chapter-num">CHAPTER 01</span>
            <span class="chapter-divider">/</span>
            <span class="badge-accent">FLAGSHIP AI PRODUCT</span>
          </div>
          <div class="chapter-links">
            <a
              href="https://intevopulse.ai"
              target="_blank"
              rel="noopener noreferrer"
              class="chapter-link font-sans"
            >
              <span>Visit intevopulse.ai</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        <div class="chapter-hero">
          <h2 class="chapter-title font-serif">
            Intevo Pulse.
          </h2>
          <p class="chapter-tagline font-sans">
            Realtime AI voice infrastructure built for autonomous enterprise telephony, agent orchestration, and operational workflows.
          </p>
        </div>

        <!-- Realistic Product Showcase UI (Console & Telemetry) -->
        <div class="pulse-showcase-grid">
          <!-- Left: Live Call Console Mockup -->
          <div class="pulse-console-window">
            <div class="console-head">
              <div class="head-left font-mono">
                <span class="live-blink"></span>
                <span>TELEPHONY_AGENT // ACTIVE_CALL_0942</span>
              </div>
              <span class="agent-mode font-mono">AUTONOMOUS VOICE PIPELINE</span>
            </div>

            <!-- Waveform Active Stream -->
            <div class="console-waveform">
              <div
                v-for="(bar, i) in 24"
                :key="i"
                class="eq-bar"
                :style="{
                  animationDelay: `${(i % 6) * 0.15}s`,
                  height: `${30 + ((i * 7) % 65)}%`
                }"
              ></div>
            </div>

            <!-- Real-time Dialogue Log -->
            <div class="console-chat font-sans">
              <div class="chat-bubble user-bubble">
                <span class="bubble-speaker font-mono">CUSTOMER (INBOUND)</span>
                <p>“Hi, I'm calling to check if my commercial flight booking can be rescheduled to next Tuesday.”</p>
              </div>
              <div class="chat-bubble ai-bubble">
                <span class="bubble-speaker font-mono ai-label">INTEVO VOICE AGENT</span>
                <p>“Certainly. I've pulled up your reservation. Tuesday has two flight slots available: 09:15 AM and 04:30 PM. Which one suits your schedule?”</p>
              </div>
            </div>

            <!-- Real-time Telemetry Bar -->
            <div class="console-telemetry font-mono">
              <div class="telemetry-node">
                <span class="tel-k">VOICE LATENCY</span>
                <span class="tel-v">~380ms (Ultra-Low)</span>
              </div>
              <div class="telemetry-node">
                <span class="tel-k">SENTIMENT SCORE</span>
                <span class="tel-v text-emerald">Positive (0.94)</span>
              </div>
              <div class="telemetry-node">
                <span class="tel-k">SUPERVISOR HANDOFF</span>
                <span class="tel-v text-vermilion">Available On-Demand</span>
              </div>
            </div>
          </div>

          <!-- Right: Product Breakdown & Engineering Role -->
          <div class="pulse-details">
            <div class="detail-block">
              <h3 class="detail-title font-sans">The Core Product</h3>
              <p class="detail-desc">
                Intevo Pulse is a proprietary AI voice automation platform developed within Intevo. It replaces legacy IVR bottlenecks with human-grade, multilingual conversational agents capable of answering inbound inquiries, initiating outbound campaigns, and integrating directly into enterprise CRMs.
              </p>
            </div>

            <div class="capabilities-trio font-mono">
              <div class="cap-box">
                <span class="cap-num">01</span>
                <h4 class="cap-name font-sans">Autonomous Calling</h4>
                <p class="cap-info">Low-latency inbound and outbound conversation execution.</p>
              </div>
              <div class="cap-box">
                <span class="cap-num">02</span>
                <h4 class="cap-name font-sans">Live Supervision</h4>
                <p class="cap-info">Real-time transcripts, sentiment scoring, and seamless human agent handoff.</p>
              </div>
              <div class="cap-box">
                <span class="cap-num">03</span>
                <h4 class="cap-name font-sans">Operations Console</h4>
                <p class="cap-info">Integrated call center campaign metrics and agent performance dashboards.</p>
              </div>
            </div>

            <div class="my-role-card font-mono">
              <span class="role-tag">MY ROLE // CO-FOUNDER &amp; FRONTEND LEAD</span>
              <p class="role-body font-sans">
                Spearheaded the design and frontend engineering of the client application (<a href="https://app.intevopulse.ai" target="_blank" class="text-vermilion">app.intevopulse.ai</a>) and operations monitoring suite (<a href="https://ops.intevopulse.ai" target="_blank" class="text-vermilion">ops.intevopulse.ai</a>), handling real-time WebSocket state, audio visualizers, and complex campaign configurations.
              </p>
            </div>

            <div class="chapter-cta-row">
              <button
                class="btn btn-vermilion font-sans"
                @click="openCaseStudy('intevo-pulse')"
              >
                <span>Read Full Case Study</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CHAPTER 02: INTEVO (THE PARENT COMPANY & STUDIO) -->
    <section class="project-chapter chapter-intevo section-ivory">
      <div class="container">
        <div class="chapter-top">
          <div class="chapter-badge font-mono">
            <span class="chapter-num">CHAPTER 02</span>
            <span class="chapter-divider">/</span>
            <span class="badge-dark">CO-FOUNDER VENTURE</span>
          </div>
          <div class="chapter-links">
            <a
              href="https://theintevo.com"
              target="_blank"
              rel="noopener noreferrer"
              class="chapter-link text-dark font-sans"
            >
              <span>Visit theintevo.com</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        <div class="chapter-hero">
          <h2 class="chapter-title font-serif text-dark">
            Intevo.
          </h2>
          <p class="chapter-tagline font-sans text-dark-secondary">
            A technology and product engineering company registered in Dubai, building proprietary AI software and enterprise digital solutions.
          </p>
        </div>

        <div class="intevo-studio-grid">
          <!-- Left: Entrepreneurial Story -->
          <div class="studio-narrative">
            <div class="narrative-pill font-mono">
              <span>COMPANY // INTEVO SOLUTIONS (DUBAI, UAE)</span>
            </div>
            <h3 class="studio-heading font-sans">
              "We design the experience and the system together."
            </h3>
            <p class="studio-paragraph">
              Intevo is the parent technology company behind products like Intevo Pulse. As a co-founder, my focus bridges product strategy, user experience design, and scalable frontend architecture.
            </p>
            <p class="studio-paragraph">
              Operating our own digital products forces an uncompromising engineering discipline: we don't just write code for a handoff—we build software that survives in production, scales gracefully, and drives genuine commercial outcomes.
            </p>

            <div class="studio-values-grid font-sans">
              <div class="val-item">
                <span class="val-dot"></span>
                <div>
                  <h4 class="val-title">Product Mindset</h4>
                  <p class="val-desc">We operate platforms ourselves, so we think far beyond the initial launch.</p>
                </div>
              </div>
              <div class="val-item">
                <span class="val-dot"></span>
                <div>
                  <h4 class="val-title">Engineering Depth</h4>
                  <p class="val-desc">Performance, maintainability, and clean architecture are foundational product decisions.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Corporate Identity & Photo Mockup -->
          <div class="studio-visual-card">
            <div class="photo-frame">
              <img
                src="/images/intevo-company-photo.webp"
                alt="Intevo Solutions Office & Team"
                class="company-img"
              />
              <div class="photo-caption font-mono">
                <span>DUBAI DIGITAL PARK // BUILDING A1</span>
                <span>INTEVO AI SOLUTION</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CHAPTER 03: RAAHEE (PAKISTAN'S TOURISM OPERATING SYSTEM) -->
    <section class="project-chapter chapter-raahee section-dark">
      <div class="container">
        <div class="chapter-top">
          <div class="chapter-badge font-mono">
            <span class="chapter-num">CHAPTER 03</span>
            <span class="chapter-divider">/</span>
            <span class="badge-emerald">INDEPENDENT PRODUCT</span>
          </div>
          <div class="chapter-links">
            <a
              href="https://raahee.pk"
              target="_blank"
              rel="noopener noreferrer"
              class="chapter-link font-sans"
            >
              <span>Visit raahee.pk</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        <div class="chapter-hero">
          <h2 class="chapter-title font-serif">
            Raahee.
          </h2>
          <p class="chapter-tagline font-sans">
            Pakistan's domestic tourism operating system and group-tour booking marketplace, uniting travelers with verified local tour operators.
          </p>
        </div>

        <div class="raahee-showcase-grid">
          <!-- Left: Travel Marketplace Mockup -->
          <div class="travel-card-mockup">
            <div class="travel-card-header font-mono">
              <span class="travel-badge">VERIFIED ITINERARY</span>
              <span class="travel-loc">NORTHERN PAKISTAN // 7 DAYS</span>
            </div>

            <div class="travel-body font-sans">
              <div class="travel-trip-title font-serif">
                Hunza Valley &amp; Attabad Lake Expedition
              </div>
              <p class="travel-trip-summary">
                Curated group itinerary featuring live trip tracking, mountain transport logistics, verified local guides, and transparent pricing without hidden agent markups.
              </p>

              <div class="travel-specs-row font-mono">
                <div class="spec-cell">
                  <span class="spec-k">OPERATOR STATUS</span>
                  <span class="spec-v text-emerald">Verified Operator Badge</span>
                </div>
                <div class="spec-cell">
                  <span class="spec-k">BOOKING PIPELINE</span>
                  <span class="spec-v">Next.js + Supabase + Resend</span>
                </div>
                <div class="spec-cell">
                  <span class="spec-k">TRANSPARENT PRICING</span>
                  <span class="spec-v text-vermilion">PKR 85,000 / traveler</span>
                </div>
              </div>
            </div>

            <div class="travel-footer font-mono">
              <span>LIVE ON RAAHEE.PK // ZERO MANUAL BANK CONFIRMATION DELAYS</span>
            </div>
          </div>

          <!-- Right: Product Narrative -->
          <div class="raahee-narrative">
            <h3 class="narrative-heading font-sans">
              From Fragmented Tourism to an Operating System
            </h3>
            <p class="narrative-text">
              Domestic travel across Pakistan was burdened by opaque pricing, unverified social media operators, and clumsy manual bank wire transfers.
            </p>
            <p class="narrative-text">
              I independently designed, architected, and launched Raahee from zero to one. Built with Next.js, TypeScript, and Supabase (PostgreSQL with Row Level Security), the platform provides automated booking confirmations via Resend, live trip status tracking, and structured tour operator onboarding.
            </p>

            <div class="narrative-highlights font-mono">
              <div class="highlight-item">
                <span class="highlight-bullet">✓</span>
                <span>Full marketplace UX: Tour search, date filtering, and checkout flow</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-bullet">✓</span>
                <span>30 verified tour operators onboarded across northern Pakistan</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-bullet">✓</span>
                <span>Automated transactional dispatch emails &amp; live traveler tracking</span>
              </div>
            </div>

            <div class="chapter-cta-row">
              <button
                class="btn btn-vermilion font-sans"
                @click="openCaseStudy('raahee-pk')"
              >
                <span>Explore Raahee Case Study</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CHAPTER 04: ENTERACT ENGAGE / IBEX (ENTERPRISE FRONTEND) -->
    <section class="project-chapter chapter-ibex section-ivory">
      <div class="container">
        <div class="chapter-top">
          <div class="chapter-badge font-mono">
            <span class="chapter-num">CHAPTER 04</span>
            <span class="chapter-divider">/</span>
            <span class="badge-dark">ENTERPRISE SOFTWARE</span>
          </div>
          <div class="chapter-links">
            <span class="chapter-tag-enterprise font-mono">
              ibex // 5,000+ ACTIVE SUPPORT AGENTS
            </span>
          </div>
        </div>

        <div class="chapter-hero">
          <h2 class="chapter-title font-serif text-dark">
            Enteract Engage.
          </h2>
          <p class="chapter-tagline font-sans text-dark-secondary">
            High-throughput enterprise omnichannel customer-engagement platform engineered to manage live voice calls, social feeds, and chat at scale.
          </p>
        </div>

        <div class="enterprise-showcase-grid">
          <!-- Left: Enterprise UI Mockup -->
          <div class="enterprise-console">
            <div class="ent-head font-mono">
              <span>OMNICHANNEL AGENT WORKSPACE // ENTERACT ENGAGE</span>
              <span class="ent-badge">ANGULAR 16+</span>
            </div>

            <div class="ent-queues font-mono">
              <div class="queue-card">
                <div class="q-top">
                  <span class="q-icon">📞</span>
                  <span class="q-label">LIVE VOICE TELEPHONY</span>
                </div>
                <span class="q-metric">SignalR Connected · Inbound Call Live</span>
              </div>
              <div class="queue-card">
                <div class="q-top">
                  <span class="q-icon">💬</span>
                  <span class="q-label">WHATSAPP &amp; INSTAGRAM</span>
                </div>
                <span class="q-metric">RxJS SwitchMap Stream Active</span>
              </div>
              <div class="queue-card">
                <div class="q-top">
                  <span class="q-icon">📊</span>
                  <span class="q-label">KE LISTENING ANALYTICS</span>
                </div>
                <span class="q-metric">Consolidated Consumer Telemetry</span>
              </div>
            </div>

            <div class="ent-arch-bar font-mono">
              <span class="arch-token">JWT Route Guards</span>
              <span class="arch-token">HTTP Interceptors</span>
              <span class="arch-token">Angular Signals</span>
              <span class="arch-token">Jasmine / Karma</span>
              <span class="arch-token">SonarQube Gate PASS</span>
            </div>
          </div>

          <!-- Right: Engineering Contributions -->
          <div class="enterprise-narrative">
            <h3 class="narrative-heading font-sans text-dark">
              Architecting for 5,000+ Simultaneous Enterprise Agents
            </h3>
            <p class="narrative-text text-dark-secondary">
              At ibex, I served as a Senior Frontend Engineer (Analyst Software Engineer), responsible for developing and maintaining the Angular frontend of Enteract Engage.
            </p>
            <p class="narrative-text text-dark-secondary">
              Support agents manage high-velocity customer conversations across Facebook, Instagram, WhatsApp, and live voice interactions from one screen. Using RxJS observables and Angular Signals, we eliminated layout thrashing and ensured new chats and incoming telecommunication events reach agents instantly via SignalR without manual page refreshes.
            </p>

            <div class="enterprise-deliverables font-mono">
              <div class="del-row">
                <span class="del-num">01</span>
                <span class="del-text">Engineered KE Listening analytics dashboards consolidating customer stats across millions of utility records.</span>
              </div>
              <div class="del-row">
                <span class="del-num">02</span>
                <span class="del-text">Secured enterprise interfaces with JWT-based route guards and silent token refresh HTTP interceptors.</span>
              </div>
              <div class="del-row">
                <span class="del-num">03</span>
                <span class="del-text">Maintained strict test suites with Jasmine and Karma running in GitLab CI/CD with zero SonarQube quality gate failures.</span>
              </div>
            </div>

            <div class="chapter-cta-row">
              <button
                class="btn btn-outline-dark font-sans"
                @click="openCaseStudy('enteract-engage')"
              >
                <span>Inspect Enterprise Architecture</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CHAPTER 05: THEXPERTO (ON-DEMAND SERVICES) -->
    <section class="project-chapter chapter-xperto section-dark">
      <div class="container">
        <div class="chapter-top">
          <div class="chapter-badge font-mono">
            <span class="chapter-num">CHAPTER 05</span>
            <span class="chapter-divider">/</span>
            <span class="badge-amber">ON-DEMAND PLATFORM</span>
          </div>
          <div class="chapter-links">
            <a
              href="https://thexperto.com"
              target="_blank"
              rel="noopener noreferrer"
              class="chapter-link font-sans"
            >
              <span>Visit thexperto.com</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        <div class="chapter-hero">
          <h2 class="chapter-title font-serif">
            TheXperto.
          </h2>
          <p class="chapter-tagline font-sans">
            On-demand residential home-services platform built to streamline technician booking, service pricing, and dispatch fulfillment.
          </p>
        </div>

        <div class="xperto-grid">
          <div class="xperto-card font-mono">
            <div class="xperto-header">
              <span>SERVICE DISPATCH ENGINE</span>
              <span class="text-amber">20+ FULFILLED ORDERS</span>
            </div>
            <p class="xperto-desc font-sans">
              Built end-to-end user booking flows, technician assignment notifications, and automated status emails. Proved capability to rapidly construct frictionless service funnels that convert residential users on mobile.
            </p>
            <div class="xperto-tags">
              <span class="pill-badge">Next.js</span>
              <span class="pill-badge">TypeScript</span>
              <span class="pill-badge">Tailwind CSS</span>
              <span class="pill-badge">Booking Engine</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Case Study Modal Drawer -->
    <ProjectModal
      v-if="activeModalProject"
      :project="activeModalProject"
      @close="activeModalProject = null"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProjectModal from './ProjectModal.vue';
import { projects } from '../data/portfolio.js';

const activeModalProject = ref(null);

const openCaseStudy = (projectId) => {
  const p = projects.find(item => item.id === projectId);
  if (p) {
    activeModalProject.value = p;
  }
};
</script>

<style scoped>
.projects-chapters {
  position: relative;
  width: 100%;
}

.project-chapter {
  padding: 8rem 0;
  border-bottom: 1px solid var(--border-on-dark);
  position: relative;
}

.chapter-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid currentColor;
  opacity: 0.85;
}

.chapter-badge {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.78rem;
  letter-spacing: 0.1em;
}

.chapter-divider {
  opacity: 0.4;
}

.badge-accent {
  color: var(--accent-vermilion);
  font-weight: 700;
}

.badge-dark {
  color: var(--text-dark);
  font-weight: 700;
}

.badge-emerald {
  color: #10b981;
  font-weight: 700;
}

.badge-amber {
  color: #f59e0b;
  font-weight: 700;
}

.chapter-link {
  color: var(--text-light);
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: color 0.2s ease;
}

.chapter-link:hover {
  color: var(--accent-vermilion);
}

.chapter-hero {
  margin-bottom: 4rem;
}

.chapter-title {
  font-size: clamp(3.5rem, 8vw, 7rem);
  line-height: 1;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

.chapter-tagline {
  font-size: clamp(1.15rem, 2vw, 1.4rem);
  max-width: 820px;
  color: var(--text-light-secondary);
  line-height: 1.55;
}

/* CHAPTER 01: INTEVO PULSE SHOWCASE */
.pulse-showcase-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 3.5rem;
  align-items: start;
}

.pulse-console-window {
  border-radius: var(--radius-lg);
  background: #0d0d0d;
  border: 1px solid var(--border-on-dark-medium);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9);
}

.console-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.72rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-on-dark);
}

.head-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light-secondary);
}

.live-blink {
  width: 7px;
  height: 7px;
  background: var(--accent-vermilion);
  border-radius: 50%;
  animation: pulse-dot 1.5s infinite;
}

.agent-mode {
  color: var(--accent-vermilion);
  font-weight: 600;
}

.console-waveform {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3px;
  height: 64px;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-on-dark);
}

.eq-bar {
  flex: 1;
  background: var(--accent-vermilion);
  border-radius: 2px;
  animation: eq-anim 1.2s ease-in-out infinite alternate;
}

@keyframes eq-anim {
  0% { transform: scaleY(0.2); opacity: 0.35; }
  100% { transform: scaleY(1); opacity: 1; }
}

.console-chat {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chat-bubble {
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.92rem;
  line-height: 1.45;
}

.user-bubble {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-on-dark);
}

.ai-bubble {
  background: rgba(241, 100, 69, 0.08);
  border: 1px solid rgba(241, 100, 69, 0.25);
}

.bubble-speaker {
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  color: var(--text-light-muted);
}

.ai-label {
  color: var(--accent-vermilion);
}

.console-telemetry {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-on-dark);
  font-size: 0.7rem;
}

.telemetry-node {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.tel-k {
  color: var(--text-light-muted);
}

.tel-v {
  color: var(--text-light);
  font-weight: 600;
}

.text-emerald {
  color: #10b981;
}

.pulse-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.detail-title {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}

.detail-desc {
  font-size: 1rem;
  color: var(--text-light-secondary);
  line-height: 1.65;
}

.capabilities-trio {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.cap-box {
  padding: 1rem;
  background: var(--bg-graphite-elevated);
  border: 1px solid var(--border-on-dark);
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.cap-num {
  color: var(--accent-vermilion);
  font-size: 0.72rem;
}

.cap-name {
  font-size: 0.95rem;
  color: var(--text-light);
}

.cap-info {
  font-size: 0.75rem;
  color: var(--text-light-secondary);
  line-height: 1.4;
}

.my-role-card {
  padding: 1.25rem 1.5rem;
  background: rgba(241, 100, 69, 0.05);
  border-left: 3px solid var(--accent-vermilion);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.role-tag {
  font-size: 0.72rem;
  color: var(--accent-vermilion);
  letter-spacing: 0.06em;
}

.role-body {
  font-size: 0.92rem;
  color: var(--text-light);
  line-height: 1.55;
}

.role-body a {
  text-decoration: underline;
}

.chapter-cta-row {
  margin-top: 0.5rem;
}

/* CHAPTER 02: INTEVO STUDIO */
.intevo-studio-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 4rem;
  align-items: center;
}

.studio-narrative {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.narrative-pill {
  font-size: 0.75rem;
  color: var(--text-dark-muted);
}

.studio-heading {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  color: var(--text-dark);
  line-height: 1.2;
}

.studio-paragraph {
  font-size: 1.05rem;
  color: var(--text-dark-secondary);
  line-height: 1.65;
}

.studio-values-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
}

.val-item {
  display: flex;
  gap: 0.75rem;
}

.val-dot {
  width: 6px;
  height: 6px;
  background: var(--accent-vermilion);
  border-radius: 50%;
  margin-top: 0.45rem;
  flex-shrink: 0;
}

.val-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
}

.val-desc {
  font-size: 0.85rem;
  color: var(--text-dark-secondary);
  line-height: 1.45;
}

.studio-visual-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border-on-ivory);
}

.photo-frame {
  position: relative;
  width: 100%;
}

.company-img {
  width: 100%;
  height: 380px;
  object-fit: cover;
  display: block;
}

.photo-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
}

/* CHAPTER 03: RAAHEE SHOWCASE */
.raahee-showcase-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 4rem;
  align-items: center;
}

.travel-card-mockup {
  border-radius: var(--radius-lg);
  background: #0f1115;
  border: 1px solid var(--border-on-dark-medium);
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8);
}

.travel-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.72rem;
}

.travel-badge {
  color: #10b981;
}

.travel-loc {
  color: var(--text-light-muted);
}

.travel-trip-title {
  font-size: 2rem;
  color: var(--text-light);
  line-height: 1.15;
  margin-bottom: 0.75rem;
}

.travel-trip-summary {
  font-size: 0.95rem;
  color: var(--text-light-secondary);
  line-height: 1.6;
}

.travel-specs-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.65rem;
  margin-top: 1.25rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.35);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
}

.spec-cell {
  display: flex;
  justify-content: space-between;
}

.spec-k {
  color: var(--text-light-muted);
}

.spec-v {
  color: var(--text-light);
  font-weight: 600;
}

.travel-footer {
  font-size: 0.68rem;
  color: var(--text-light-muted);
  border-top: 1px solid var(--border-on-dark);
  padding-top: 0.75rem;
}

.raahee-narrative {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.narrative-heading {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  line-height: 1.2;
}

.narrative-text {
  font-size: 1.05rem;
  color: var(--text-light-secondary);
  line-height: 1.65;
}

.narrative-highlights {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: var(--text-light);
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
}

.highlight-bullet {
  color: #10b981;
  font-weight: bold;
}

/* CHAPTER 04: ENTERACT ENGAGE / IBEX */
.enterprise-showcase-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 4rem;
  align-items: start;
}

.chapter-tag-enterprise {
  font-size: 0.78rem;
  color: var(--accent-vermilion);
  font-weight: 700;
}

.enterprise-console {
  border-radius: var(--radius-lg);
  background: #FFFFFF;
  border: 1px solid var(--border-on-ivory-medium);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.08);
}

.ent-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.72rem;
  color: var(--text-dark-muted);
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-on-ivory);
}

.ent-badge {
  color: var(--accent-vermilion);
  font-weight: 700;
}

.ent-queues {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.queue-card {
  padding: 1rem 1.25rem;
  background: var(--bg-ivory);
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.q-top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-dark);
}

.q-metric {
  font-size: 0.72rem;
  color: var(--text-dark-secondary);
}

.ent-arch-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-on-ivory);
}

.arch-token {
  font-size: 0.68rem;
  padding: 0.25rem 0.5rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: var(--radius-xs);
  color: var(--text-dark);
}

.enterprise-narrative {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.enterprise-deliverables {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  font-size: 0.82rem;
  color: var(--text-dark-secondary);
}

.del-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.del-num {
  color: var(--accent-vermilion);
  font-weight: 700;
}

/* CHAPTER 05: THEXPERTO */
.xperto-grid {
  display: grid;
  grid-template-columns: 1fr;
  max-width: 800px;
}

.xperto-card {
  border-radius: var(--radius-lg);
  background: #191919;
  border: 1px solid var(--border-on-dark-medium);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.xperto-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
}

.text-amber {
  color: #f59e0b;
  font-weight: 700;
}

.xperto-desc {
  font-size: 1.05rem;
  color: var(--text-light-secondary);
  line-height: 1.6;
}

.xperto-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media (max-width: 1024px) {
  .pulse-showcase-grid,
  .intevo-studio-grid,
  .raahee-showcase-grid,
  .enterprise-showcase-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 640px) {
  .chapter-title {
    font-size: 3rem;
  }
  .capabilities-trio {
    grid-template-columns: 1fr;
  }
  .studio-values-grid {
    grid-template-columns: 1fr;
  }
  .console-telemetry {
    grid-template-columns: 1fr;
  }
}
</style>
