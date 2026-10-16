<template>
  <section class="section-padding section-ivory experience-section" id="experience">
    <div class="container">
      <div class="editorial-tag font-mono">
        <span>CAREER TIMELINE</span>
      </div>

      <div class="exp-header">
        <h2 class="editorial-headline exp-title font-serif text-dark">
          Experience &amp; Track Record.
        </h2>
        <p class="exp-subtitle font-sans text-dark-secondary">
          Four years of verified production engineering across enterprise scale, AI SaaS, and independent commercial products.
        </p>
      </div>

      <!-- Asymmetrical Editorial Timeline -->
      <div class="editorial-timeline">
        <!-- Entry 1: Intevo (Active Venture) -->
        <article class="timeline-row">
          <div class="row-period font-mono">
            <span class="period-dates">2024 — PRESENT</span>
            <span class="badge-venture font-mono">ACTIVE VENTURE</span>
          </div>
          <div class="row-content">
            <div class="role-company-line">
              <h3 class="exp-role font-sans text-dark">Co-Founder &amp; Frontend Lead</h3>
              <span class="exp-company-name font-serif text-dark">Intevo Solutions</span>
            </div>
            <p class="exp-summary font-sans text-dark-secondary">
              Co-founded a UAE-registered technology company building AI SaaS products and custom digital solutions. Spearheaded frontend architecture and UI execution for <strong>Intevo Pulse</strong> (AI voice automation platform, client app, and call center operations console).
            </p>
            <div class="exp-tech-tags font-mono">
              <span>Vue.js 3</span>
              <span>TypeScript</span>
              <span>WebSockets</span>
              <span>Audio APIs</span>
              <span>Tailwind CSS</span>
            </div>
          </div>
        </article>

        <!-- Entry 2: ibex (Former Role) -->
        <article class="timeline-row">
          <div class="row-period font-mono">
            <span class="period-dates">MAY 2023 — JAN 2026</span>
            <span class="badge-former font-mono">FORMER ROLE</span>
          </div>
          <div class="row-content">
            <div class="role-company-line">
              <h3 class="exp-role font-sans text-dark">Senior Software Engineer (Analyst)</h3>
              <span class="exp-company-name font-serif text-dark">ibex</span>
            </div>
            <p class="exp-summary font-sans text-dark-secondary">
              Architected and maintained the Angular frontend of <strong>Enteract Engage</strong>, an omnichannel workspace used by <strong>5,000+ support agents</strong> to manage Facebook, Instagram, WhatsApp, and live voice interactions from one screen. Integrated SignalR for instant telephony arrival and KE Listening analytics across utility customer records.
            </p>
            <div class="exp-tech-tags font-mono">
              <span>Angular 16+</span>
              <span>TypeScript</span>
              <span>RxJS</span>
              <span>Angular Signals</span>
              <span>SignalR</span>
              <span>JWT Guards</span>
              <span>Jasmine / Karma</span>
              <span>SonarQube</span>
            </div>
          </div>
        </article>

        <!-- Entry 3: Independent Products (Raahee & TheXperto) -->
        <article class="timeline-row">
          <div class="row-period font-mono">
            <span class="period-dates">2025 — 2026</span>
            <span class="badge-independent font-mono">INDEPENDENT PRODUCTS</span>
          </div>
          <div class="row-content">
            <div class="role-company-line">
              <h3 class="exp-role font-sans text-dark">Product Builder &amp; Full-Stack Engineer</h3>
              <span class="exp-company-name font-serif text-dark">Raahee.pk &amp; TheXperto</span>
            </div>
            <p class="exp-summary font-sans text-dark-secondary">
              Independently conceived, designed, built, and launched <strong>Raahee.pk</strong> (group-tour booking platform with 30 verified tour operators, transparent pricing, and live trip tracking) and <strong>TheXperto.com</strong> (on-demand home services platform fulfilling 20+ customer orders).
            </p>
            <div class="exp-tech-tags font-mono">
              <span>Next.js</span>
              <span>TypeScript</span>
              <span>Supabase</span>
              <span>Resend API</span>
              <span>Product UX</span>
            </div>
          </div>
        </article>

        <!-- Entry 4: Voltro by Falkenherz (Internship) -->
        <article class="timeline-row">
          <div class="row-period font-mono">
            <span class="period-dates">OCT 2022 — APR 2023</span>
            <span class="badge-former font-mono">INTERNSHIP</span>
          </div>
          <div class="row-content">
            <div class="role-company-line">
              <h3 class="exp-role font-sans text-dark">Software Engineer Intern</h3>
              <span class="exp-company-name font-serif text-dark">Voltro by Falkenherz</span>
            </div>
            <p class="exp-summary font-sans text-dark-secondary">
              Delivered user-facing group booking flows for <strong>MICELOC</strong> (hotel booking platform using Vue 2, Vuex, Vuetify), built automated Jira exception reporting tooling, and engineered the <strong>JetClass</strong> private aviation landing page.
            </p>
            <div class="exp-tech-tags font-mono">
              <span>Vue.js 2</span>
              <span>Vuex</span>
              <span>Vuetify</span>
              <span>Laravel</span>
              <span>Jira API</span>
            </div>
          </div>
        </article>
      </div>

      <!-- Education & Credentials Bar -->
      <div class="credentials-bar">
        <div class="cred-item font-sans">
          <span class="cred-deg">BS Software Engineering</span>
          <span class="cred-school font-mono">COMSATS University Islamabad (Aug 2022)</span>
        </div>
        <div class="cred-item font-sans">
          <span class="cred-deg">Angular Certification</span>
          <span class="cred-school font-mono">TestDome (Verified 2023)</span>
        </div>
        <div class="cred-item font-sans">
          <span class="cred-deg">JavaScript Algorithms</span>
          <span class="cred-school font-mono">freeCodeCamp (2023)</span>
        </div>
        <div class="cred-item font-sans">
          <span class="cred-deg">Product Management</span>
          <span class="cred-school font-mono">Great Learning (2023)</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-section {
  border-bottom: 1px solid var(--border-on-ivory);
}

.exp-header {
  margin-bottom: 4rem;
}

.exp-title {
  font-size: clamp(3rem, 6.5vw, 5.5rem);
  margin-bottom: 1rem;
}

.exp-subtitle {
  font-size: 1.15rem;
  max-width: 680px;
  line-height: 1.6;
}

.editorial-timeline {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border-on-ivory-medium);
}

.timeline-row {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 3.5rem;
  padding: 3rem 0;
  border-bottom: 1px solid var(--border-on-ivory);
  align-items: start;
}

.row-period {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--text-dark-muted);
}

.badge-venture {
  color: var(--accent-vermilion);
  font-weight: 700;
  font-size: 0.72rem;
}

.badge-former {
  color: var(--text-dark-muted);
  font-size: 0.72rem;
}

.badge-independent {
  color: #10b981;
  font-weight: 700;
  font-size: 0.72rem;
}

.row-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.role-company-line {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}

.exp-role {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.exp-company-name {
  font-size: 1.6rem;
  font-style: italic;
  color: var(--accent-vermilion);
}

.exp-summary {
  font-size: 1.05rem;
  line-height: 1.65;
  max-width: 820px;
}

.exp-tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.exp-tech-tags span {
  font-size: 0.75rem;
  padding: 0.25rem 0.65rem;
  background: var(--bg-ivory-elevated);
  border: 1px solid var(--border-on-ivory-medium);
  border-radius: var(--radius-xs);
  color: var(--text-dark-secondary);
}

.credentials-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 5rem;
  padding-top: 3rem;
  border-top: 1px solid var(--border-on-ivory-medium);
}

.cred-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cred-deg {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-dark);
}

.cred-school {
  font-size: 0.78rem;
  color: var(--text-dark-muted);
}

@media (max-width: 900px) {
  .timeline-row {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  .credentials-bar {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .credentials-bar {
    grid-template-columns: 1fr;
  }
}
</style>
