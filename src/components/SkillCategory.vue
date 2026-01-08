<template>
  <div 
    ref="categoryRef"
    class="skill-category" 
    :class="{ 'animate-in': isVisible }"
    :style="{ 'animation-delay': `${props.index * 0.1}s` }"
  >
    <div class="category-header">
      <span class="category-icon">{{ category.icon }}</span>
      <h3 class="category-name">{{ category.name }}</h3>
    </div>
    <div class="skills-list">
      <span 
        v-for="(skill, idx) in category.skills" 
        :key="skill" 
        class="skill-item"
        :style="{ 'animation-delay': `${idx * 0.05}s` }"
      >
        {{ skill }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

const isVisible = ref(true) // Start visible
const categoryRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true
      }
    })
  }, { threshold: 0.1, rootMargin: '50px' })
  
  setTimeout(() => {
    if (categoryRef.value) {
      observer.observe(categoryRef.value)
    }
  }, 100)
})
</script>

<style scoped>
.skill-category {
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

.skill-category::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.05), transparent);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.skill-category:hover::before {
  opacity: 1;
}

.skill-category.animate-in {
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

.skill-category:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 50px rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.3);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.category-icon {
  font-size: 2.5rem;
  filter: grayscale(0.3);
  transition: all 0.5s ease;
}

.skill-category:hover .category-icon {
  filter: grayscale(0);
  transform: scale(1.1) rotate(5deg);
}

.category-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
  background: linear-gradient(135deg, #1a1a2e 0%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
}

.skill-item {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(102, 126, 234, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: default;
  opacity: 1;
  transform: scale(1);
}

@keyframes popIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.skill-item:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

@media (max-width: 768px) {
  .skill-category {
    padding: 1.75rem;
  }
  
  .category-header {
    margin-bottom: 1.5rem;
  }
  
  .category-icon {
    font-size: 2rem;
  }
  
  .category-name {
    font-size: 1.2rem;
  }
  
  .skill-item {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}
</style>
