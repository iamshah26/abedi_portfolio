<template>
  <div 
    ref="cardRef"
    class="service-card" 
    :class="{ 'animate-in': isVisible }"
    :style="{ 'animation-delay': `${props.index * 0.1}s` }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="service-icon" :class="{ 'animate': isHovered }">
      {{ service.icon }}
    </div>
    <h3 class="service-title">{{ service.title }}</h3>
    <p class="service-description">{{ service.description }}</p>
    
    <div class="service-details">
      <div class="detail-item">
        <strong>✨ What I build:</strong>
        <p>{{ service.whatItSolves }}</p>
      </div>
      
      <div class="detail-item">
        <strong>🎯 Perfect for:</strong>
        <p>{{ service.whoItsFor }}</p>
      </div>
      
      <div class="detail-item">
        <strong>💡 Key Benefits:</strong>
        <ul>
          <li v-for="benefit in service.keyBenefits" :key="benefit">{{ benefit }}</li>
        </ul>
      </div>
      
      <div class="detail-item">
        <strong>🛠️ Tech Stack:</strong>
        <div class="tools-tags">
          <span v-for="tool in service.tools" :key="tool" class="tool-tag">{{ tool }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  service: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

const isVisible = ref(true) // Start visible so content shows immediately
const isHovered = ref(false)
const cardRef = ref(null)

onMounted(() => {
  // Set up observer for animation when scrolling
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
.service-card {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid transparent;
  position: relative;
  overflow: visible;
  opacity: 1;
  transform: translateY(0);
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-card.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
  animation: slideUpFade 0.6s ease forwards;
}

@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.service-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.25);
  border-color: rgba(102, 126, 234, 0.3);
}

.service-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: grayscale(0.3);
}

.service-icon.animate {
  animation: bounce 0.6s ease;
  filter: grayscale(0);
  transform: scale(1.1);
}

@keyframes bounce {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-10px) scale(1.1); }
}

.service-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.service-description {
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.8;
  font-size: 1.05rem;
}

.service-details {
  margin-top: 2rem;
}

.detail-item {
  margin-bottom: 1.8rem;
  animation: fadeIn 0.5s ease forwards;
}

.detail-item strong {
  display: block;
  color: #1a1a2e;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  font-weight: 600;
}

.detail-item p {
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.8;
  margin: 0;
}

.detail-item ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-item ul li {
  color: #4a5568;
  font-size: 0.95rem;
  padding: 0.5rem 0;
  padding-left: 1.8rem;
  position: relative;
  transition: all 0.3s ease;
}

.detail-item ul li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
  font-size: 1.1rem;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 50%;
}

.detail-item ul li:hover {
  color: #667eea;
  transform: translateX(5px);
}

.tools-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.tool-tag {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
  cursor: default;
}

.tool-tag:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .service-card {
    padding: 1.5rem;
  }
  
  .service-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .service-title {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  .service-description {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }
  
  .detail-item {
    margin-bottom: 1.25rem;
  }
  
  .detail-item strong {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  .detail-item p {
    font-size: 0.85rem;
  }
  
  .tool-tag {
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
  }
}
</style>
