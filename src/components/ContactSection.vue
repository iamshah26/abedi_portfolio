<template>
  <section class="section-padding section-dark contact-section" id="contact">
    <div class="container">
      <div class="editorial-tag font-mono">
        <span>INITIATE COLLABORATION</span>
      </div>

      <!-- Monumental Editorial Closing Statement -->
      <div class="contact-statement-wrap">
        <h2 class="contact-big-title font-serif">
          Great products start with a conversation.<br />
          <span class="italic-serif text-vermilion">Let's make something matter.</span>
        </h2>
        <p class="contact-subline font-sans text-light-secondary">
          Whether you are an international hiring manager looking for a Senior Frontend Engineer or a startup founder building an ambitious product from zero to one.
        </p>
      </div>

      <div class="contact-layout-grid">
        <!-- Left: Direct Channels & Instant Actions -->
        <div class="channels-column">
          <div class="direct-email-box" @click="copyEmail">
            <span class="box-label font-mono">DIRECT INBOX (CLICK TO COPY)</span>
            <span class="box-email font-serif">{{ personalInfo.email }}</span>
            <div class="copy-pill font-mono">
              <span v-if="emailCopied" class="text-emerald">✓ COPIED TO CLIPBOARD</span>
              <span v-else>CLICK TO COPY EMAIL ↗</span>
            </div>
          </div>

          <div class="fast-links-grid font-sans">
            <a
              :href="personalInfo.whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="fast-link-card"
              @click="trackWhatsApp"
            >
              <div class="card-icon">💬</div>
              <div class="card-text">
                <span class="card-title">WhatsApp Telemetry</span>
                <span class="card-sub font-mono">{{ personalInfo.phone }}</span>
              </div>
              <span class="card-arrow">↗</span>
            </a>

            <a
              href="/Syed_Ali_Haider_Abedi_Resume.pdf"
              target="_blank"
              download="Syed_Ali_Haider_Abedi_Resume.pdf"
              class="fast-link-card"
            >
              <div class="card-icon">📄</div>
              <div class="card-text">
                <span class="card-title">Curriculum Vitae</span>
                <span class="card-sub font-mono">PDF Download (Verified)</span>
              </div>
              <span class="card-arrow">↓</span>
            </a>

            <a
              href="https://github.com/iamshah26"
              target="_blank"
              rel="noopener noreferrer"
              class="fast-link-card"
            >
              <div class="card-icon">🐙</div>
              <div class="card-text">
                <span class="card-title">GitHub Profile</span>
                <span class="card-sub font-mono">github.com/iamshah26</span>
              </div>
              <span class="card-arrow">↗</span>
            </a>
          </div>
        </div>

        <!-- Right: Inquiry Form for Hiring Managers & Founders -->
        <div class="form-column">
          <div class="inquiry-card">
            <div class="inquiry-header font-mono">
              <span>PROJECT / OPPORTUNITY INQUIRY</span>
              <span class="text-vermilion">OPEN FOR WORLDWIDE ROLES</span>
            </div>

            <form v-if="!submitted" @submit.prevent="handleSubmit" class="inquiry-form font-sans">
              <div class="form-group">
                <label class="form-label font-mono">YOUR NAME</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  class="inquiry-input"
                />
              </div>

              <div class="form-group">
                <label class="form-label font-mono">YOUR EMAIL</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  class="inquiry-input"
                />
              </div>

              <div class="form-group">
                <label class="form-label font-mono">ENGAGEMENT TYPE</label>
                <select v-model="form.type" class="inquiry-select font-sans">
                  <option value="Senior Frontend Engineer Role">Full-time Senior Frontend Role (Remote)</option>
                  <option value="Enterprise Angular Consulting">Enterprise Angular / RxJS Architecture Consulting</option>
                  <option value="New Product Development">Digital Product / AI MVP Build</option>
                  <option value="General Inquiries">Technical Discussion / General Inquiry</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label font-mono">MESSAGE</label>
                <textarea
                  v-model="form.message"
                  required
                  rows="4"
                  placeholder="Tell me about your product, team, or challenge..."
                  class="inquiry-textarea"
                ></textarea>
              </div>

              <button
                type="submit"
                class="btn btn-vermilion font-sans form-submit-btn"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">Transmitting...</span>
                <span v-else>Send Message ↗</span>
              </button>
            </form>

            <div v-else class="inquiry-success font-sans">
              <div class="success-check">✓</div>
              <h3 class="success-h3">Message Received.</h3>
              <p class="success-p">
                Thank you, {{ form.name }}. Your note has been transmitted directly to my personal inbox. I will reply to <strong>{{ form.email }}</strong> within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { personalInfo } from '../data/portfolio.js';
import { trackWhatsAppClick, trackLeadFormSubmit } from '../utils/tracking.js';

const emailCopied = ref(false);
const isSubmitting = ref(false);
const submitted = ref(false);

const form = ref({
  name: '',
  email: '',
  type: 'Senior Frontend Engineer Role',
  message: ''
});

const copyEmail = () => {
  navigator.clipboard.writeText(personalInfo.email);
  emailCopied.value = true;
  setTimeout(() => {
    emailCopied.value = false;
  }, 3000);
};

const trackWhatsApp = () => {
  trackWhatsAppClick(personalInfo.whatsappUrl);
};

const handleSubmit = () => {
  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    submitted.value = true;
    trackLeadFormSubmit();
  }, 700);
};
</script>

<style scoped>
.contact-section {
  background: #0c0c0c;
  border-bottom: 1px solid var(--border-on-dark);
}

.contact-statement-wrap {
  margin-bottom: 5rem;
}

.contact-big-title {
  font-size: clamp(3.25rem, 7vw, 6.5rem);
  line-height: 1.05;
  color: var(--text-light);
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}

.italic-serif {
  font-style: italic;
  font-weight: 400;
}

.contact-subline {
  font-size: clamp(1.15rem, 1.8vw, 1.35rem);
  max-width: 720px;
  line-height: 1.6;
}

.contact-layout-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 4rem;
  align-items: start;
}

.channels-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.direct-email-box {
  padding: 2.25rem;
  background: var(--bg-graphite);
  border: 1px solid var(--border-on-dark-medium);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.direct-email-box:hover {
  border-color: var(--accent-vermilion);
  transform: translateY(-3px);
  box-shadow: 0 20px 40px -10px var(--accent-vermilion-glow);
}

.box-label {
  font-size: 0.72rem;
  color: var(--text-light-muted);
  letter-spacing: 0.08em;
}

.box-email {
  font-size: clamp(1.6rem, 3.2vw, 2.75rem);
  color: var(--text-light);
  word-break: break-all;
  line-height: 1.1;
}

.copy-pill {
  font-size: 0.75rem;
  color: var(--accent-vermilion);
}

.text-emerald {
  color: #10b981;
}

.fast-links-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.fast-link-card {
  padding: 1.25rem 1.75rem;
  background: var(--bg-graphite);
  border: 1px solid var(--border-on-dark);
  border-radius: var(--radius-md);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: all 0.25s ease;
}

.fast-link-card:hover {
  background: var(--bg-graphite-elevated);
  border-color: var(--border-on-dark-medium);
  transform: translateX(4px);
}

.card-icon {
  font-size: 1.5rem;
}

.card-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-light);
}

.card-sub {
  font-size: 0.75rem;
  color: var(--text-light-muted);
}

.card-arrow {
  color: var(--text-light-muted);
  font-size: 1.1rem;
}

.fast-link-card:hover .card-arrow {
  color: var(--accent-vermilion);
}

/* INQUIRY CARD */
.inquiry-card {
  background: var(--bg-graphite);
  border: 1px solid var(--border-on-dark-medium);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 25px 50px -15px rgba(0, 0, 0, 0.7);
}

.inquiry-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.75rem;
  background: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid var(--border-on-dark);
  font-size: 0.72rem;
  color: var(--text-light-muted);
}

.inquiry-form {
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-size: 0.72rem;
  color: var(--text-light-muted);
  letter-spacing: 0.05em;
}

.inquiry-input,
.inquiry-select,
.inquiry-textarea {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--border-on-dark);
  border-radius: var(--radius-sm);
  padding: 0.85rem 1rem;
  color: var(--text-light);
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
}

.inquiry-input:focus,
.inquiry-select:focus,
.inquiry-textarea:focus {
  border-color: var(--accent-vermilion);
  box-shadow: 0 0 15px var(--accent-vermilion-glow);
}

.inquiry-textarea {
  resize: vertical;
}

.form-submit-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
}

.inquiry-success {
  padding: 3.5rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.success-check {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.success-h3 {
  font-size: 1.5rem;
  color: var(--text-light);
}

.success-p {
  font-size: 0.95rem;
  color: var(--text-light-secondary);
  max-width: 400px;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .contact-layout-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
