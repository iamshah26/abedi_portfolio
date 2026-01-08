<template>
  <section class="hero-section">
    <div class="hero-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>
    <div class="hero-content" :class="{ 'animate-in': isVisible }">
      <div class="hero-greeting">👋 Hey, I'm</div>
      <h1 class="hero-headline">
        <span class="name-highlight">Syed Ali Haider Abedi</span>
      </h1>
      <div class="hero-tagline">
        <span class="typing-text">{{ displayText }}</span>
        <span class="cursor">|</span>
      </div>
      <p class="hero-subheadline">
        I build digital products that scale businesses. Full-stack developer, AI enthusiast, 
        and digital strategist crafting innovative solutions.
      </p>
      <div class="hero-cta">
        <a href="#projects" class="btn btn-primary">
          <span>View My Work</span>
          <span class="btn-arrow">→</span>
        </a>
        <a href="#contact" class="btn btn-secondary">
          <span>Let's Connect</span>
        </a>
      </div>
      <div class="hero-scroll">
        <div class="scroll-indicator"></div>
        <span>Scroll to explore</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const displayText = ref('')
const texts = [
  'Full-Stack Developer',
  'AI Solutions Builder',
  'Digital Product Creator',
  'Business Automation Expert'
]
let currentIndex = 0
let charIndex = 0
let isDeleting = false

onMounted(() => {
  isVisible.value = true
  typeText()
})

const typeText = () => {
  const current = texts[currentIndex]
  
  if (isDeleting) {
    displayText.value = current.substring(0, charIndex - 1)
    charIndex--
  } else {
    displayText.value = current.substring(0, charIndex + 1)
    charIndex++
  }
  
  let typeSpeed = isDeleting ? 50 : 100
  
  if (!isDeleting && charIndex === current.length) {
    typeSpeed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    currentIndex = (currentIndex + 1) % texts.length
    typeSpeed = 500
  }
  
  setTimeout(typeText, typeSpeed)
}
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: float 20s infinite ease-in-out;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #667eea, transparent);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #764ba2, transparent);
  bottom: -150px;
  right: -150px;
  animation-delay: -7s;
}

.orb-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, #f093fb, transparent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -14s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s ease;
}

.hero-content.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.hero-greeting {
  font-size: clamp(1rem, 2vw, 1.2rem);
  margin-bottom: 1rem;
  opacity: 0.9;
  animation: fadeInUp 0.8s ease 0.2s both;
}

.hero-headline {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.1;
  animation: fadeInUp 0.8s ease 0.4s both;
}

.name-highlight {
  background: linear-gradient(135deg, #667eea 0%, #f093fb 50%, #4facfe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease infinite;
  background-size: 200% 200%;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.hero-tagline {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 600;
  margin-bottom: 1.5rem;
  min-height: 60px;
  animation: fadeInUp 0.8s ease 0.6s both;
}

.typing-text {
  color: #fff;
}

.cursor {
  animation: blink 1s infinite;
  color: #667eea;
  font-weight: 300;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.hero-subheadline {
  font-size: clamp(1rem, 2vw, 1.3rem);
  margin-bottom: 3rem;
  opacity: 0.85;
  line-height: 1.8;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeInUp 0.8s ease 0.8s both;
}

.hero-cta {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
  animation: fadeInUp 0.8s ease 1s both;
}

.btn {
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn:hover::before {
  width: 300px;
  height: 300px;
}

.btn span {
  position: relative;
  z-index: 1;
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.btn:hover .btn-arrow {
  transform: translateX(5px);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px);
}

.hero-scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: fadeIn 1s ease 1.2s both;
}

.scroll-indicator {
  width: 2px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.5));
  animation: scrollDown 2s infinite;
}

@keyframes scrollDown {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(20px);
    opacity: 0;
  }
}

.hero-scroll span {
  font-size: 0.9rem;
  opacity: 0.7;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  .hero-section {
    min-height: 100vh;
    padding: 6rem 1.5rem 4rem;
  }
  
  .hero-greeting {
    font-size: 0.95rem;
  }
  
  .hero-headline {
    font-size: clamp(2rem, 8vw, 3rem);
    margin-bottom: 1rem;
  }
  
  .hero-tagline {
    min-height: 50px;
    font-size: clamp(1.2rem, 4vw, 1.8rem);
    margin-bottom: 1rem;
  }
  
  .hero-subheadline {
    font-size: 1rem;
    margin-bottom: 2rem;
    padding: 0 1rem;
  }
  
  .hero-cta {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3rem;
  }
  
  .btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
    padding: 0.9rem 2rem;
    font-size: 0.95rem;
  }
  
  .hero-scroll {
    margin-top: 2rem;
  }
  
  .orb-1, .orb-2, .orb-3 {
    display: none;
  }
}
</style>
