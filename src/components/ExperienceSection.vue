<template>
  <section id="experience" class="experience-section">
    <div class="container">
      <h2 class="section-title" :class="{ 'animate-in': titleVisible }">
        <span class="title-number">05.</span> Where I've Worked
      </h2>
      <p class="section-subtitle" :class="{ 'animate-in': subtitleVisible }">
        My journey through tech and innovation
      </p>
      
      <div class="experience-timeline">
        <ExperienceItem
          v-for="(exp, index) in experiences"
          :key="index"
          :experience="exp"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ExperienceItem from './ExperienceItem.vue'

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

const experiences = ref([
  {
    company: 'ibex',
    role: 'Analyst Software Engineer',
    duration: 'May 2023 – Present',
    achievements: [
      'Developed and optimized enterprise software solutions, improving system performance by 40%',
      'Collaborated with cross-functional teams to deliver 15+ projects on time and within budget',
      'Implemented scalable architectures supporting 1000+ concurrent users',
      'Reduced deployment time by 50% through CI/CD pipeline optimization',
      'Led code reviews and mentored junior developers, improving team productivity by 25%'
    ]
  },
  {
    company: 'VWX Agency',
    role: 'Analyst Software Engineer',
    duration: 'May 2023 – Present',
    achievements: [
      'Architected and developed client-facing web applications serving 50+ active clients',
      'Increased user engagement by 60% through UI/UX improvements and performance optimization',
      'Implemented data-driven marketing automation, generating 3x ROI on ad spend',
      'Built and maintained scalable SaaS infrastructure handling 10M+ API requests monthly',
      'Delivered custom CRM solutions reducing client operational overhead by 35%'
    ]
  },
  {
    company: 'VOLTRO by Falkenherz',
    role: 'Software Engineer Intern',
    duration: 'Oct 2022 – May 2023',
    achievements: [
      'Contributed to full-stack development of client projects using modern web technologies',
      'Assisted in building responsive web applications with React and Node.js',
      'Participated in agile development processes and sprint planning',
      'Gained hands-on experience in database design and API development',
      'Delivered 5+ feature-complete modules within internship period'
    ]
  },
  {
    company: 'Pixarsart Studios',
    role: 'Assistant Project Coordinator',
    duration: 'Aug 2022 – Oct 2022',
    achievements: [
      'Coordinated project activities ensuring timely delivery of 10+ client projects',
      'Facilitated communication between development teams and stakeholders',
      'Managed project timelines and resource allocation',
      'Improved project delivery efficiency by 20% through better coordination',
      'Created project documentation and status reports for stakeholders'
    ]
  }
])
</script>

<style scoped>
.experience-section {
  padding: 6rem 2rem 4rem;
  background: linear-gradient(to bottom, #ffffff 0%, #f8f9ff 100%);
  position: relative;
}

.container {
  max-width: 1000px;
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

.experience-timeline {
  position: relative;
}

.experience-timeline::before {
  content: '';
  position: absolute;
  left: 30px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  opacity: 0.3;
}

@media (max-width: 768px) {
  .experience-section {
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
  
  .experience-timeline::before {
    display: none;
  }
}
</style>
