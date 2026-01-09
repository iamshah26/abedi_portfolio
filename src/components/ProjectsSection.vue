<template>
  <section id="projects" class="projects-section">
    <div class="container">
      <h2 class="section-title" :class="{ 'animate-in': titleVisible }">
Featured Projects
      </h2>
      <p class="section-subtitle" :class="{ 'animate-in': subtitleVisible }">
        Some of my recent work that I'm proud of
      </p>
      
      <div class="projects-grid">
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.id"
          :project="project"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProjectCard from './ProjectCard.vue'

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

const projects = ref([
  {
    id: 1,
    title: 'The Intevo',
    category: 'Web Development',
    solution: 'A modern, responsive corporate website with SEO optimization and modern UI/UX design.',
    techStack: ['React', 'Next.js', 'Node.js', 'AWS', 'Tailwind CSS'],
    impact: '60% increase in traffic, 40% improvement in lead generation',
    link: 'https://theintevo.com',
    linkText: 'View Site'
  },
  {
    id: 2,
    title: 'Intevo Pulse Platform',
    category: 'SaaS Platform | AI',
    solution: 'Comprehensive SaaS platform with multi-tenant architecture, subscription management, and AI integrations.',
    techStack: ['Vue.js', 'Node.js', 'PostgreSQL', 'OpenAI API', 'AWS'],
    impact: '50+ active users, 35% cost reduction, 70% reduction in manual work',
    link: 'https://intevopulse.ai',
    linkText: 'Visit Platform'
  },
  {
    id: 3,
    title: 'Intevo Pulse Mobile App',
    category: 'Web App | Mobile Responsive',
    solution: 'Responsive web application optimized for mobile devices with real-time analytics and intuitive controls.',
    techStack: ['Angular', '.NET', 'REST API', 'SQL Server'],
    impact: '3x increase in engagement, 45% improvement in mobile management',
    link: 'https://app.intevopulse.ai',
    linkText: 'View App'
  },
  {
    id: 4,
    title: 'ViciDial Operations Dashboard',
    category: 'CRM Dashboard',
    solution: 'Custom operations dashboard with real-time call monitoring, agent metrics, and automated reporting.',
    techStack: ['Angular', '.NET', 'SQL Server', 'ViciDial API', 'WebSocket'],
    impact: '30% efficiency improvement, 25% reduction in call handling time',
    link: 'https://ops.intevopulse.ai',
    linkText: 'View Dashboard'
  },
  {
    id: 5,
    title: 'Land Providers Official',
    category: 'WordPress Website',
    solution: 'Professional WordPress website for land providers with property listings and modern design.',
    techStack: ['WordPress', 'PHP', 'CSS', 'JavaScript'],
    impact: 'Professional online presence with easy content management',
    link: 'https://landprovidersofficial.com',
    linkText: 'View Website'
  },
  {
    id: 6,
    title: 'Dr. Hamnah Portfolio',
    category: 'BDS Doctor Portfolio',
    solution: 'Professional portfolio website for a BDS (Bachelor of Dental Surgery) doctor with modern design, service showcase, and contact integration.',
    techStack: ['Vue.js', 'Vite', 'CSS3', 'Responsive Design'],
    impact: 'Professional online presence for healthcare services with improved patient engagement',
    link: 'https://dr-hamnah.vercel.app/',
    linkText: 'View Portfolio'
  }
])
</script>

<style scoped>
.projects-section {
  padding: 8rem 2rem;
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .projects-section {
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
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
