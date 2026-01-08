<template>
  <section id="services" class="services-section">
    <div class="container">
      <h2 class="section-title" :class="{ 'animate-in': titleVisible }">
What I Do
      </h2>
      <p class="section-subtitle" :class="{ 'animate-in': subtitleVisible }">
        I bring ideas to life through code, creativity, and cutting-edge technology
      </p>
      
      <div class="services-grid">
        <ServiceCard
          v-for="(service, index) in services"
          :key="service.id"
          :service="service"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ServiceCard from './ServiceCard.vue'

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

const services = ref([
  {
    id: 1,
    title: 'Web Development',
    icon: '🌐',
    description: 'Building responsive websites, SaaS platforms, and web applications',
    whatItSolves: 'Modern web presence that converts visitors into customers',
    whoItsFor: 'Businesses ready to establish or upgrade their online presence',
    keyBenefits: ['Lightning Fast', 'Mobile-First', 'SEO Optimized', 'Scalable'],
    tools: ['React', 'Vue.js', 'Node.js', 'Python', 'AWS']
  },
  {
    id: 2,
    title: 'Mobile App Development',
    icon: '📱',
    description: 'Creating beautiful native and cross-platform mobile experiences',
    whatItSolves: 'Mobile access to your services, anytime, anywhere',
    whoItsFor: 'Companies looking to engage customers on-the-go',
    keyBenefits: ['Cross-platform', 'Native Feel', 'Offline Ready', 'Store Ready'],
    tools: ['Flutter', 'React Native', 'Swift', 'Kotlin']
  },
  {
    id: 3,
    title: 'Digital Marketing',
    icon: '📈',
    description: 'Data-driven campaigns that grow your business',
    whatItSolves: 'Increased visibility, more leads, and higher conversions',
    whoItsFor: 'Businesses wanting to grow their digital footprint',
    keyBenefits: ['Targeted Ads', 'Better ROI', 'Data-Driven', 'Multi-channel'],
    tools: ['Meta Ads', 'Google Ads', 'SEO', 'Analytics']
  },
  {
    id: 4,
    title: 'AI & Automation',
    icon: '🤖',
    description: 'Intelligent systems that work 24/7 to grow your business',
    whatItSolves: 'Automate repetitive tasks and enhance customer experience',
    whoItsFor: 'Organizations ready to leverage AI and automation',
    keyBenefits: ['Always On', 'Cost Efficient', 'Smart Solutions', 'Workflow Automation'],
    tools: ['OpenAI GPT-4', 'Custom ML', 'Automation', 'APIs']
  },
  {
    id: 5,
    title: 'SaaS & Platforms',
    icon: '☁️',
    description: 'Scalable SaaS solutions that grow with your business',
    whatItSolves: 'Subscription-based platforms that generate recurring revenue',
    whoItsFor: 'Entrepreneurs and businesses building SaaS products',
    keyBenefits: ['Multi-tenant', 'Subscription Ready', 'Secure', 'Scalable'],
    tools: ['Django', 'FastAPI', 'PostgreSQL', 'Stripe', 'AWS']
  }
])
</script>

<style scoped>
.services-section {
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

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .services-section {
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
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
