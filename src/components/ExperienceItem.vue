<template>
  <div 
    ref="itemRef"
    class="experience-item" 
    :class="{ 'animate-in': isVisible }"
    :style="{ 'animation-delay': `${props.index * 0.2}s` }"
  >
    <div class="timeline-dot"></div>
    <div class="experience-header">
      <h3 class="company-name">{{ experience.company }}</h3>
      <div class="experience-meta">
        <span class="role">{{ experience.role }}</span>
        <span class="duration">{{ experience.duration }}</span>
      </div>
    </div>
    <ul class="achievements-list">
      <li 
        v-for="(achievement, idx) in experience.achievements" 
        :key="idx" 
        class="achievement"
        :style="{ 'animation-delay': `${idx * 0.1}s` }"
      >
        {{ achievement }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  experience: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

const isVisible = ref(true) // Start visible
const itemRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true
      }
    })
  }, { threshold: 0.2, rootMargin: '50px' })
  
  setTimeout(() => {
    if (itemRef.value) {
      observer.observe(itemRef.value)
    }
  }, 100)
})
</script>

<style scoped>
.experience-item {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  margin-left: 4rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border-left: 4px solid transparent;
  border-image: linear-gradient(180deg, #667eea 0%, #764ba2 100%) 1;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  opacity: 1;
  transform: translateX(0);
}

.experience-item::before {
  content: '';
  position: absolute;
  left: -4rem;
  top: 2.5rem;
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  box-shadow: 0 0 0 4px white, 0 0 0 8px rgba(102, 126, 234, 0.2);
}

.experience-item.animate-in {
  opacity: 1;
  transform: translateX(0);
  animation: slideInLeft 0.6s ease forwards;
}

@keyframes slideInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.experience-item:hover {
  transform: translateX(10px) scale(1.02);
  box-shadow: 0 20px 50px rgba(102, 126, 234, 0.25);
}

.experience-header {
  margin-bottom: 1.8rem;
}

.company-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.experience-meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.role {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.duration {
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 500;
}

.achievements-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.achievement {
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.9;
  padding: 0.75rem 0;
  padding-left: 2rem;
  position: relative;
  opacity: 1;
  transform: translateX(0);
}

@keyframes fadeInSlide {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.achievement::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
  font-size: 1.2rem;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.achievement:hover::before {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: scale(1.2) rotate(90deg);
}

.achievement:hover {
  color: #667eea;
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .experience-item {
    margin-left: 0;
    padding: 1.5rem;
    margin-bottom: 1.75rem;
  }
  
  .experience-item::before {
    display: none;
  }
  
  .company-name {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
  
  .experience-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .role {
    font-size: 0.9rem;
    padding: 0.35rem 0.85rem;
  }
  
  .duration {
    font-size: 0.9rem;
  }
  
  .achievement {
    font-size: 0.85rem;
    padding: 0.6rem 0;
    padding-left: 1.75rem;
    line-height: 1.7;
  }
  
  .achievement::before {
    width: 20px;
    height: 20px;
    font-size: 1rem;
  }
}
</style>
