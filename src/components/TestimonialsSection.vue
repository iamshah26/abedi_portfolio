<template>
  <section id="testimonials" class="testimonials-section">
    <div class="container">
      <h2 class="section-title" :class="{ 'animate-in': titleVisible }">
        <span class="title-number">07.</span> What People Say
      </h2>
      <p class="section-subtitle" :class="{ 'animate-in': subtitleVisible }">
        Kind words from clients I've had the pleasure to work with
      </p>
      
      <div class="testimonials-grid">
        <TestimonialCard
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.id"
          :testimonial="testimonial"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TestimonialCard from './TestimonialCard.vue'

const titleVisible = ref(false)
const subtitleVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    titleVisible.value = true
  }, 200)
  setTimeout(() => {
    subtitleVisible.value = true
  }, 400)
})

const testimonials = ref([
  {
    id: 1,
    quote: "Working with Syed transformed our startup's digital presence. His expertise in SaaS development and AI integration helped us launch a platform that exceeded our expectations. The technical depth combined with strategic business insight made all the difference. We've seen 3x growth in user acquisition since launch.",
    author: "Sarah Ahmed",
    role: "Founder & CEO",
    company: "TechStart Solutions",
    type: "Startup Founder"
  },
  {
    id: 2,
    quote: "Syed delivered an enterprise-grade CRM dashboard that revolutionized our call center operations. The real-time analytics and automation features reduced our operational costs by 30% and improved agent productivity significantly. His attention to detail and commitment to quality is unmatched.",
    author: "Ahmed Khan",
    role: "Operations Manager",
    company: "Global Contact Solutions",
    type: "Enterprise Client"
  },
  {
    id: 3,
    quote: "The digital marketing campaigns Syed designed and managed for our business resulted in a 250% ROI increase. His data-driven approach and deep understanding of both technical and marketing aspects helped us scale from startup to profitable growth stage. Highly recommended for businesses serious about growth.",
    author: "Fatima Ali",
    role: "Marketing Director",
    company: "Growth Ventures",
    type: "Marketing Client"
  }
])
</script>

<style scoped>
.testimonials-section {
  padding: 6rem 2rem 4rem;
  background: linear-gradient(to bottom, #ffffff 0%, #f8f9ff 100%);
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a2e;
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
  color: #667eea;
  font-size: 0.6em;
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

.section-subtitle {
  text-align: center;
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: #64748b;
  margin-bottom: 4rem;
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s ease;
}

.section-subtitle.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}
</style>
