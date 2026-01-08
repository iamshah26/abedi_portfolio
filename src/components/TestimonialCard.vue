<template>
  <div 
    ref="cardRef"
    class="testimonial-card" 
    :class="{ 'animate-in': isVisible }"
    :style="{ 'animation-delay': `${props.index * 0.15}s` }"
  >
    <div class="quote-icon">"</div>
    <p class="testimonial-quote">{{ testimonial.quote }}</p>
    <div class="testimonial-author">
      <div class="author-info">
        <strong class="author-name">{{ testimonial.author }}</strong>
        <span class="author-role">{{ testimonial.role }}</span>
        <span class="author-company">{{ testimonial.company }}</span>
      </div>
      <span class="client-type">{{ testimonial.type }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  testimonial: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

const isVisible = ref(true) // Start visible
const cardRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true
      }
    })
  }, { threshold: 0.1, rootMargin: '50px' })
  
  setTimeout(() => {
    if (cardRef.value) {
      observer.observe(cardRef.value)
    }
  }, 100)
})
</script>

<style scoped>
.testimonial-card {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  border: 2px solid transparent;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  opacity: 1;
  transform: translateY(0);
}

.testimonial-card.animate-in {
  opacity: 1;
  transform: translateY(0);
  animation: slideUpFade 0.6s ease forwards;
}

@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.testimonial-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
}

.testimonial-card:hover::before {
  transform: scaleX(1);
}

.testimonial-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.25);
  border-color: rgba(102, 126, 234, 0.3);
}

.quote-icon {
  font-size: 4rem;
  color: #667eea;
  opacity: 0.2;
  line-height: 1;
  margin-bottom: 1rem;
  font-family: serif;
}

.testimonial-quote {
  color: #555;
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.author-name {
  color: #333;
  font-size: 1rem;
}

.author-role {
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 500;
}

.author-company {
  color: #666;
  font-size: 0.85rem;
}

.client-type {
  background: #667eea;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .testimonial-author {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
