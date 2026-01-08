<template>
  <section id="skills" class="skills-section">
    <div class="container">
      <h2 class="section-title" :class="{ 'animate-in': titleVisible }">
        <span class="title-number">04.</span> My Skills
      </h2>
      <p class="section-subtitle" :class="{ 'animate-in': subtitleVisible }">
        Technologies and tools I love working with
      </p>
      
      <div class="skills-grid">
        <SkillCategory
          v-for="(category, index) in skillCategories"
          :key="category.name"
          :category="category"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SkillCategory from './SkillCategory.vue'

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

const skillCategories = ref([
  {
    name: 'Frontend Development',
    icon: '🎨',
    skills: ['React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Design', 'PWA']
  },
  {
    name: 'Backend Development',
    icon: '⚙️',
    skills: ['Node.js', 'Express', 'Python', 'Django', 'FastAPI', 'PHP', 'Laravel', 'RESTful APIs', 'GraphQL', 'Microservices']
  },
  {
    name: 'Mobile Development',
    icon: '📱',
    skills: ['Flutter', 'React Native', 'Dart', 'Swift', 'Kotlin', 'Cross-platform', 'iOS', 'Android']
  },
  {
    name: 'Marketing Tools',
    icon: '📈',
    skills: ['Meta Ads', 'Google Ads', 'SEO', 'Google Analytics', 'Funnel Building', 'Email Marketing', 'SEMrush']
  },
  {
    name: 'AI / Automation',
    icon: '🤖',
    skills: ['OpenAI GPT-4', 'AI Chatbots', 'Call Bots', 'Workflow Automation', 'Machine Learning', 'NLP', 'Python']
  },
  {
    name: 'DevOps / Cloud',
    icon: '☁️',
    skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Serverless', 'CloudWatch']
  },
  {
    name: 'Management / Strategy',
    icon: '💼',
    skills: ['Project Management', 'Agile', 'Scrum', 'Business Analysis', 'Product Strategy', 'Team Leadership']
  }
])
</script>

<style scoped>
.skills-section {
  padding: 8rem 2rem;
  background: linear-gradient(to bottom, #f8f9ff 0%, #ffffff 100%);
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
  gap: 1rem;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.8s ease;
}

.section-title.animate-in {
  opacity: 1;
  transform: translateX(0);
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
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease;
}

.section-subtitle.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .skills-section {
    padding: 4rem 1.5rem;
  }
  
  .section-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
    margin-bottom: 2.5rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
