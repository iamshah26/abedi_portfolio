<template>
  <section class="section-padding section-dark expertise-section" id="expertise">
    <div class="container">
      <div class="editorial-tag font-mono">
        <span>TECHNICAL RIGOR</span>
      </div>

      <div class="expertise-header">
        <h2 class="editorial-headline exp-title font-serif">
          Focused Expertise.
        </h2>
        <p class="exp-lead font-sans">
          I do not claim equal mastery of every framework under the sun. My deepest specialization is <strong>Angular, TypeScript, and enterprise frontend architecture</strong>, backed by hands-on experience shipping production products in modern web ecosystems.
        </p>
      </div>

      <div class="expertise-grid">
        <!-- Pillar 1: Primary Enterprise Specialization -->
        <div class="expertise-column primary-pillar">
          <div class="col-head font-mono">
            <span class="col-tag text-vermilion">CORE SPECIALIZATION</span>
            <span class="col-depth">4 YEARS PRODUCTION</span>
          </div>
          <h3 class="col-title font-sans">Angular &amp; Enterprise Architecture</h3>
          <p class="col-desc font-sans">
            Architecting mission-critical frontend systems capable of handling thousands of simultaneous operations without layout thrashing, memory leaks, or unhandled exceptions.
          </p>

          <ul class="skill-bullets font-mono">
            <li>
              <span class="bullet-dot"></span>
              <strong>Angular (v2 through v17+)</strong> — Standalone components, signals, route guards
            </li>
            <li>
              <span class="bullet-dot"></span>
              <strong>TypeScript</strong> — Strict type contracts, interfaces, zero-defect compilation
            </li>
            <li>
              <span class="bullet-dot"></span>
              <strong>RxJS &amp; Angular Signals</strong> — Declarative streams, state mutations, switchMap
            </li>
            <li>
              <span class="bullet-dot"></span>
              <strong>SignalR &amp; WebSockets</strong> — Real-time telemetry, live call &amp; chat streams
            </li>
            <li>
              <span class="bullet-dot"></span>
              <strong>Enterprise Security</strong> — JWT HTTP interceptors, token refresh cycles
            </li>
          </ul>
        </div>

        <!-- Pillar 2: Modern Frontend Ecosystem & Product Engineering -->
        <div class="expertise-column">
          <div class="col-head font-mono">
            <span class="col-tag">PRODUCT TOOLCHAINS</span>
            <span class="col-depth">SHIPPED STARTUPS</span>
          </div>
          <h3 class="col-title font-sans">Modern Web &amp; Product Delivery</h3>
          <p class="col-desc font-sans">
            Selecting the optimal toolchain to move from concept to commercial product with rapid iteration and sub-second performance.
          </p>

          <ul class="skill-bullets font-mono">
            <li>
              <span class="bullet-dot"></span>
              <strong>Next.js &amp; React</strong> — Server components, SEO, high-conversion funnels
            </li>
            <li>
              <span class="bullet-dot"></span>
              <strong>Vue.js 3 &amp; Nuxt</strong> — Composition API, Vuex/Pinia, lightweight reactivity
            </li>
            <li>
              <span class="bullet-dot"></span>
              <strong>Tailwind CSS</strong> — Modular design systems, responsive typography
            </li>
            <li>
              <span class="bullet-dot"></span>
              <strong>Supabase &amp; PostgreSQL</strong> — Row Level Security, transactional BaaS
            </li>
            <li>
              <span class="bullet-dot"></span>
              <strong>REST APIs &amp; Integrations</strong> — Payment gateways, Resend, AI endpoints
            </li>
          </ul>
        </div>

        <!-- Pillar 3: Quality Gates & Testing Standards -->
        <div class="expertise-column">
          <div class="col-head font-mono">
            <span class="col-tag">QUALITY ASSURANCE</span>
            <span class="col-depth">SCRUM RIGOR</span>
          </div>
          <h3 class="col-title font-sans">Testing, CI/CD &amp; Code Quality</h3>
          <p class="col-desc font-sans">
            Maintaining pristine software reliability through automated pipelines, test-driven validation, and rigorous code reviews.
          </p>

          <ul class="skill-bullets font-mono">
            <li>
              <span class="bullet-dot"></span>
              <strong>Jasmine &amp; Karma</strong> — Headless browser unit test suites
            </li>
            <li>
              <span class="bullet-dot"></span>
              <strong>GitLab CI/CD</strong> — Automated test gates and continuous deployment
            </li>
            <li>
              <span class="bullet-dot"></span>
              <strong>SonarQube</strong> — Zero code smell, security hotspot resolution
            </li>
            <li>
              <span class="bullet-dot"></span>
              <strong>Git &amp; Code Review</strong> — Branching strategies, paired programming
            </li>
            <li>
              <span class="bullet-dot"></span>
              <strong>Figma to Pixel Precision</strong> — Translating complex UI designs into code
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.expertise-section {
  background: #101010;
  border-bottom: 1px solid var(--border-on-dark);
}

.expertise-header {
  margin-bottom: 4rem;
}

.exp-title {
  font-size: clamp(3rem, 6.5vw, 5.5rem);
  color: var(--text-light);
  margin-bottom: 1rem;
}

.exp-lead {
  font-size: 1.15rem;
  color: var(--text-light-secondary);
  max-width: 780px;
  line-height: 1.65;
}

.exp-lead strong {
  color: var(--text-light);
}

.expertise-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
}

.expertise-column {
  padding: 2.5rem;
  background: var(--bg-graphite);
  border: 1px solid var(--border-on-dark);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.primary-pillar {
  border-color: rgba(241, 100, 69, 0.3);
  background: rgba(241, 100, 69, 0.03);
}

.col-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.72rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-on-dark);
}

.col-tag {
  letter-spacing: 0.06em;
  font-weight: 700;
}

.text-vermilion {
  color: var(--accent-vermilion);
}

.col-depth {
  color: var(--text-light-muted);
}

.col-title {
  font-size: 1.45rem;
  color: var(--text-light);
  letter-spacing: -0.01em;
}

.col-desc {
  font-size: 0.95rem;
  color: var(--text-light-secondary);
  line-height: 1.55;
}

.skill-bullets {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-top: 0.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-on-dark);
}

.skill-bullets li {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.82rem;
  color: var(--text-light-secondary);
  line-height: 1.45;
}

.skill-bullets strong {
  color: var(--text-light);
}

.bullet-dot {
  width: 5px;
  height: 5px;
  background: var(--accent-vermilion);
  border-radius: 50%;
  margin-top: 0.45rem;
  flex-shrink: 0;
}

@media (max-width: 1024px) {
  .expertise-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
