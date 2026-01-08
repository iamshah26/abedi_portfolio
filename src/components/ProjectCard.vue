<template>
  <div 
    ref="cardRef"
    class="project-card" 
    :class="{ 'animate-in': isVisible }"
    :style="{ 'animation-delay': `${props.index * 0.15}s` }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="project-header">
      <span class="project-category">{{ project.category }}</span>
      <h3 class="project-title">{{ project.title }}</h3>
    </div>
    
    <div class="project-body">
      <p class="project-description">{{ project.solution }}</p>
      
      <div class="project-detail">
        <strong>🛠️ Tech Stack:</strong>
        <div class="tech-tags">
          <span v-for="tech in project.techStack" :key="tech" class="tech-tag">{{ tech }}</span>
        </div>
      </div>
      
      <div class="project-impact">
        <strong>📈 Impact:</strong>
        <p>{{ project.impact }}</p>
      </div>
    </div>
    
    <div class="project-footer">
      <a 
        :href="project.link" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="project-link"
        :class="{ 'hovered': isHovered }"
      >
        <span>{{ project.linkText }}</span>
        <span class="arrow">→</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

const isVisible = ref(true) // Start visible
const isHovered = ref(false)
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
.project-card {
  background: white;
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(102, 126, 234, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  opacity: 1;
  transform: translateY(0);
  height: 100%;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.project-card:hover::before {
  opacity: 1;
}

.project-card.animate-in {
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

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
}

.project-header {
  margin-bottom: 1.25rem;
  position: relative;
  z-index: 1;
}

.project-category {
  display: inline-block;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
  padding: 0.4rem 0.85rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.project-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
  line-height: 1.3;
}

.project-body {
  flex-grow: 1;
  position: relative;
  z-index: 1;
}

.project-description {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.project-detail {
  margin-bottom: 1.25rem;
}

.project-detail strong {
  display: block;
  color: #1a1a2e;
  margin-bottom: 0.6rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.project-detail p {
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.8;
  margin: 0;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tech-tag {
  background: rgba(102, 126, 234, 0.08);
  color: #667eea;
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(102, 126, 234, 0.15);
  transition: all 0.3s ease;
  cursor: default;
}

.tech-tag:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.project-impact {
  background: rgba(102, 126, 234, 0.05);
  padding: 1rem;
  border-radius: 12px;
  margin-top: auto;
  border-left: 3px solid #667eea;
  position: relative;
  overflow: hidden;
}

.project-impact::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  animation: slideDown 2s ease infinite;
}

@keyframes slideDown {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

.project-impact strong {
  display: block;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.project-impact p {
  color: #4a5568;
  font-size: 0.85rem;
  margin: 0;
  font-weight: 500;
  line-height: 1.5;
}

.project-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(102, 126, 234, 0.1);
  position: relative;
  z-index: 1;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  padding: 0.5rem 0;
}

.project-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.4s ease;
}

.project-link.hovered::after,
.project-link:hover::after {
  width: 100%;
}

.arrow {
  transition: transform 0.3s ease;
  font-size: 1.2rem;
}

.project-link:hover .arrow,
.project-link.hovered .arrow {
  transform: translateX(8px);
}

.project-link:hover,
.project-link.hovered {
  color: #764ba2;
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .project-card {
    padding: 1.5rem;
  }
  
  .project-header {
    margin-bottom: 1rem;
  }
  
  .project-category {
    font-size: 0.7rem;
    padding: 0.35rem 0.75rem;
    margin-bottom: 0.5rem;
  }
  
  .project-title {
    font-size: 1.25rem;
  }
  
  .project-description {
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }
  
  .project-detail {
    margin-bottom: 1rem;
  }
  
  .project-detail strong {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }
  
  .tech-tag {
    padding: 0.3rem 0.65rem;
    font-size: 0.75rem;
  }
  
  .project-impact {
    padding: 0.85rem;
    margin-top: 1rem;
  }
  
  .project-impact strong {
    font-size: 0.75rem;
    margin-bottom: 0.4rem;
  }
  
  .project-impact p {
    font-size: 0.8rem;
  }
  
  .project-footer {
    margin-top: 1rem;
    padding-top: 0.75rem;
  }
  
  .project-link {
    font-size: 0.9rem;
  }
}
</style>
