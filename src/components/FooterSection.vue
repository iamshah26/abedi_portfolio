<template>
  <footer class="footer-section">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section-col">
          <h3>Syed Ali Haider Abedi</h3>
          <p>Digital Solutions Provider</p>
          <p class="tagline">Building Digital Products That Scale Businesses</p>
        </div>
        
        <div class="footer-section-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        
        <div class="footer-section-col">
          <h4>Services</h4>
          <ul>
            <li><a href="#services">Web Development</a></li>
            <li><a href="#services">Mobile Apps</a></li>
            <li><a href="#services">Digital Marketing</a></li>
            <li><a href="#services">AI & Automation</a></li>
            <li><a href="#services">SaaS Platforms</a></li>
          </ul>
        </div>
        
        <div class="footer-section-col">
          <h4>Connect</h4>
          <ul>
            <li>
              <a href="mailto:haiderabedi26@gmail.com">📧 haiderabedi26@gmail.com</a>
            </li>
            <li>
              <a href="tel:+923367048278" @click.prevent="handlePhoneClick">📱 +92 336 7048278</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/syed-ali-haider-abedi-09a743233/" target="_blank" rel="noopener noreferrer">
                💼 LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/iamshah26" target="_blank" rel="noopener noreferrer">
                💻 GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Syed Ali Haider Abedi. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { trackPhoneClick } from '../utils/tracking.js'

const currentYear = computed(() => new Date().getFullYear())

const handlePhoneClick = (event) => {
  event.preventDefault()
  trackPhoneClick('tel:+923367048278')
  // Allow default behavior after tracking (opens phone dialer)
  window.location.href = 'tel:+923367048278'
}
</script>

<style scoped>
.footer-section {
  background: #1a1a1a;
  color: white;
  padding: 3rem 2rem 1.5rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section-col h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #667eea;
}

.footer-section-col h4 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: white;
}

.footer-section-col p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.tagline {
  color: rgba(255, 255, 255, 0.9) !important;
  font-weight: 500;
}

.footer-section-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section-col ul li {
  margin-bottom: 0.75rem;
}

.footer-section-col ul li a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.footer-section-col ul li a:hover {
  color: #667eea;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-section {
    padding: 2.5rem 1.5rem 1rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .footer-section-col h3 {
    font-size: 1.3rem;
  }
  
  .footer-section-col h4 {
    font-size: 1rem;
  }
  
  .footer-section-col ul li {
    margin-bottom: 0.6rem;
  }
  
  .footer-section-col ul li a {
    font-size: 0.9rem;
  }
  
  .footer-bottom {
    padding-top: 1.5rem;
    font-size: 0.85rem;
  }
}
</style>
