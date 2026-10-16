<template>
  <footer class="site-footer section-dark">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand font-sans">
          <span class="brand-text">ALI HAIDER<span class="text-vermilion">.</span></span>
          <span class="brand-sub font-mono">SENIOR FRONTEND ENGINEER &amp; PRODUCT BUILDER</span>
        </div>
        <button class="back-to-top font-mono" @click="scrollToTop">
          <span>BACK TO TOP</span>
          <span class="top-arrow">↑</span>
        </button>
      </div>

      <div class="footer-middle font-sans">
        <div class="footer-col">
          <span class="col-title font-mono">LOCATION &amp; BASE</span>
          <p class="col-detail">Lahore, Pakistan<br />Open for Worldwide Remote Engineering</p>
        </div>
        <div class="footer-col">
          <span class="col-title font-mono">CORE DISCIPLINES</span>
          <p class="col-detail">Angular · TypeScript · RxJS · AI Voice SaaS · Product Design</p>
        </div>
        <div class="footer-col">
          <span class="col-title font-mono">VENTURES</span>
          <p class="col-detail">Co-Founder @ Intevo Solutions<br />Creator of Raahee.pk</p>
        </div>
        <div class="footer-col">
          <span class="col-title font-mono">RESOURCES</span>
          <div class="footer-links font-mono">
            <a href="/Syed_Ali_Haider_Abedi_Resume.pdf" target="_blank" download="Syed_Ali_Haider_Abedi_Resume.pdf" class="footer-link">Resume (PDF) ↓</a>
            <a href="https://github.com/iamshah26" target="_blank" rel="noopener noreferrer" class="footer-link">GitHub ↗</a>
            <a :href="personalInfo.whatsappUrl" target="_blank" rel="noopener noreferrer" class="footer-link">WhatsApp ↗</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom font-mono">
        <span>© 2026 SYED ALI HAIDER ABEDI. ALL RIGHTS RESERVED.</span>
        <span>BUILT TO PERFORM. DESIGNED TO MATTER.</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { personalInfo } from '../data/portfolio.js';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style scoped>
.site-footer {
  background: #080808;
  padding: 5rem 0 3rem;
  border-top: 1px solid var(--border-on-dark);
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--border-on-dark);
  margin-bottom: 3rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.brand-text {
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.brand-sub {
  font-size: 0.72rem;
  color: var(--text-light-muted);
  letter-spacing: 0.08em;
}

.text-vermilion {
  color: var(--accent-vermilion);
}

.back-to-top {
  background: transparent;
  border: 1px solid var(--border-on-dark-medium);
  color: var(--text-light-secondary);
  padding: 0.45rem 1rem;
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.25s ease;
}

.back-to-top:hover {
  color: var(--text-light);
  border-color: var(--accent-vermilion);
}

.top-arrow {
  color: var(--accent-vermilion);
  font-weight: bold;
}

.footer-middle {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;
  padding-bottom: 3.5rem;
  border-bottom: 1px solid var(--border-on-dark);
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.col-title {
  font-size: 0.72rem;
  color: var(--text-light-muted);
  letter-spacing: 0.08em;
}

.col-detail {
  font-size: 0.92rem;
  color: var(--text-light-secondary);
  line-height: 1.5;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.footer-link {
  color: var(--text-light);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--accent-vermilion);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  font-size: 0.72rem;
  color: var(--text-light-muted);
}

@media (max-width: 900px) {
  .footer-middle {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .footer-middle {
    grid-template-columns: 1fr;
  }
  .footer-top,
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }
}
</style>
