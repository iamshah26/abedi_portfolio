<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <h2 class="section-title" :class="{ 'animate-in': titleVisible }">
        Let's Work Together
      </h2>
      <p class="section-subtitle" :class="{ 'animate-in': subtitleVisible }">
        Have a project in mind? I'd love to hear about it. Let's create
        something amazing together!
      </p>

      <div class="contact-content">
        <div class="contact-info">
          <a href="mailto:haiderabedi26@gmail.com" class="contact-link">
            <div class="contact-icon">📧</div>
            <div class="contact-text">
              <span class="contact-label">Email</span>
              <span class="contact-value">haiderabedi26@gmail.com</span>
            </div>
          </a>

          <a
            href="tel:+923367048278"
            @click.prevent="handlePhoneClick"
            class="contact-link"
          >
            <div class="contact-icon">📱</div>
            <div class="contact-text">
              <span class="contact-label">Phone</span>
              <span class="contact-value">+92 336 7048278</span>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/syed-ali-haider-abedi-09a743233/"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-link"
          >
            <div class="contact-icon">💼</div>
            <div class="contact-text">
              <span class="contact-label">LinkedIn</span>
              <span class="contact-value">Connect with me</span>
            </div>
          </a>

          <a
            href="https://github.com/iamshah26"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-link"
          >
            <div class="contact-icon">💻</div>
            <div class="contact-text">
              <span class="contact-label">GitHub</span>
              <span class="contact-value">View my work</span>
            </div>
          </a>
        </div>

        <div class="contact-cta">
          <h3>Schedule a Discovery Call</h3>
          <p>
            Fill out the form below and I'll contact you on WhatsApp to schedule
            a free 30-minute discovery call.
          </p>
          <form @submit.prevent="handleCallRequest" class="call-form">
            <div class="form-row">
              <div class="form-group">
                <input
                  type="text"
                  v-model="callForm.name"
                  placeholder="Your Name"
                  required
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <input
                  type="email"
                  v-model="callForm.email"
                  placeholder="Your Email"
                  required
                  class="form-input"
                />
              </div>
            </div>
            <div class="form-group">
              <input
                type="tel"
                v-model="callForm.phone"
                placeholder="Phone Number (with country code)"
                required
                class="form-input"
              />
            </div>
            <div class="form-group">
              <textarea
                v-model="callForm.message"
                placeholder="Tell me about your project or what you'd like to discuss..."
                rows="4"
                class="form-input"
              ></textarea>
            </div>
            <div class="cta-buttons">
              <button type="submit" class="btn btn-primary">
                <span class="whatsapp-icon">💬</span>
                Send via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { trackPhoneClick, trackFormSubmit, trackLeadFormSubmit } from "../utils/tracking.js";

const titleVisible = ref(false);
const subtitleVisible = ref(false);

const callForm = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const handlePhoneClick = (event) => {
  event.preventDefault();
  trackPhoneClick("tel:+923367048278");
  // Allow default behavior after tracking (opens phone dialer)
  window.location.href = "tel:+923367048278";
};

const handleCallRequest = () => {
  const whatsappNumber = "923367048278"; // Your WhatsApp number without +
  const message = encodeURIComponent(
    `👋 Hello! I'm interested in scheduling a discovery call.\n\n` +
      `📋 Details:\n` +
      `Name: ${callForm.value.name}\n` +
      `Email: ${callForm.value.email}\n` +
      `Phone: ${callForm.value.phone}\n\n` +
      `💬 Message:\n${
        callForm.value.message ||
        "I would like to discuss my project requirements."
      }`
  );

  // Track lead form conversion (for lead generation)
  trackLeadFormSubmit();
  
  // Also track regular form submission conversion
  trackFormSubmit();

  // Open WhatsApp with pre-filled message
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
  window.open(whatsappUrl, "_blank");

  // Reset form after a short delay
  setTimeout(() => {
    callForm.value = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };
  }, 500);
};

onMounted(() => {
  setTimeout(() => {
    titleVisible.value = true;
  }, 200);
  setTimeout(() => {
    subtitleVisible.value = true;
  }, 400);
});
</script>

<style scoped>
.contact-section {
  padding: 6rem 2rem 4rem;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.contact-section::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.3), transparent);
  border-radius: 50%;
  animation: pulse 8s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s ease;
}

.section-title.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.title-number {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.6em;
  font-weight: 600;
  font-family: "Courier New", monospace;
}

.section-subtitle {
  text-align: center;
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s ease;
}

.section-subtitle.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 3rem;
  opacity: 1;
  transform: translateY(0);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
  text-decoration: none;
}

.contact-link:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateX(5px);
}

.contact-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  flex-shrink: 0;
}

.contact-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-value {
  font-size: 0.95rem;
  color: white;
  font-weight: 500;
}

.contact-cta {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.call-form {
  margin-top: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-input {
  width: 100%;
  padding: 0.9rem 1.2rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.form-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

.form-input textarea {
  resize: vertical;
  min-height: 100px;
}

.whatsapp-icon {
  margin-right: 0.5rem;
  font-size: 1.1rem;
}

.contact-cta h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
}

.contact-cta p {
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #25d366;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary:hover {
  background: #20ba5a;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #667eea;
}

@media (max-width: 968px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 968px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .contact-section {
    padding: 4rem 1.5rem;
  }

  .section-title {
    font-size: 1.75rem;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .section-subtitle {
    font-size: 0.95rem;
    margin-bottom: 2.5rem;
    padding: 0 1rem;
  }

  .contact-info {
    gap: 0.85rem;
    margin-bottom: 2rem;
  }

  .contact-link {
    padding: 0.9rem 1rem;
    gap: 0.85rem;
  }

  .contact-icon {
    font-size: 1.3rem;
    width: 36px;
    height: 36px;
  }

  .contact-label {
    font-size: 0.7rem;
  }

  .contact-value {
    font-size: 0.85rem;
  }

  .contact-cta {
    padding: 1.75rem;
  }

  .contact-cta h3 {
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
  }

  .contact-cta p {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-input {
    padding: 0.85rem 1rem;
    font-size: 0.9rem;
  }

  .form-input textarea {
    min-height: 90px;
  }

  .btn {
    width: 100%;
    padding: 0.9rem 1.5rem;
    font-size: 0.95rem;
  }

  .whatsapp-icon {
    font-size: 1rem;
  }
}
</style>
