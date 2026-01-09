<template>
  <section class="hero-section" id="hero">
    <!-- Floating Particles Background -->
    <div class="particles-container">
      <div
        v-for="i in 50"
        :key="i"
        class="particle"
        :style="getParticleStyle(i)"
      ></div>
    </div>

    <!-- Main Content with Split Layout -->
    <div class="hero-wrapper">
      <!-- Left Side - Text Content -->
      <div class="hero-content-left" :class="{ 'animate-in': isVisible }">
        <div class="hero-greeting">
          <span class="greeting-icon">👋</span>
          <span>Hi, I'm</span>
        </div>
        <h1 class="hero-headline">
          <span class="name-line name-line-1">Syed Ali Haider</span>
          <span class="name-line name-line-2">
            <span class="name-highlight">Abedi</span>
          </span>
        </h1>
        <div class="hero-tagline">
          <span class="tagline-prefix">I'm a</span>
          <span class="typing-text">{{ displayText }}</span>
          <span class="cursor">|</span>
        </div>
        <p class="hero-subheadline">
          Building digital products that scale businesses. Full-stack developer,
          AI enthusiast, and digital strategist crafting innovative solutions.
        </p>
        <div class="hero-cta">
          <a href="#projects" class="btn btn-primary">
            <span>Explore My Work</span>
            <span class="btn-arrow">→</span>
          </a>
          <a href="#contact" class="btn btn-secondary">
            <span>Get In Touch</span>
          </a>
        </div>
      </div>

      <!-- Right Side - Profile Card with 3D Effect -->
      <div class="hero-content-right" :class="{ 'animate-in': isVisible }">
        <div
          class="profile-card-3d"
          @mousemove="handleMouseMove"
          @mouseleave="handleMouseLeave"
          ref="profileCard"
        >
          <div class="profile-image-wrapper">
            <img
              src="/profile.jpeg"
              alt="Syed Ali Haider Abedi"
              class="profile-image"
            />
            <div class="profile-glow"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="hero-scroll">
      <div class="scroll-indicator">
        <span>Scroll</span>
        <div class="scroll-line"></div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="decorative-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isVisible = ref(false);
const displayText = ref("");
const profileCard = ref(null);
const texts = [
  "Full-Stack Developer",
  "AI Solutions Builder",
  "Digital Product Creator",
  "Business Automation Expert",
];
let currentIndex = 0;
let charIndex = 0;
let isDeleting = false;

const handleMouseMove = (e) => {
  if (!profileCard.value) return;
  const card = profileCard.value;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
};

const handleMouseLeave = () => {
  if (profileCard.value) {
    profileCard.value.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  }
};

const getParticleStyle = (index) => {
  const size = Math.random() * 4 + 2;
  const left = Math.random() * 100;
  const animationDuration = Math.random() * 20 + 10;
  const animationDelay = Math.random() * 5;
  const opacity = Math.random() * 0.5 + 0.2;

  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDuration: `${animationDuration}s`,
    animationDelay: `${animationDelay}s`,
    opacity: opacity,
  };
};

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 300);
  typeText();
});

const typeText = () => {
  const current = texts[currentIndex];

  if (isDeleting) {
    displayText.value = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    displayText.value = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === current.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    currentIndex = (currentIndex + 1) % texts.length;
    typeSpeed = 500;
  }

  setTimeout(typeText, typeSpeed);
};
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #24243e 100%);
  color: white;
  padding: 0;
}

/* Floating Particles */
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.particle {
  position: absolute;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  animation: float-particle infinite ease-in-out;
  pointer-events: none;
}

@keyframes float-particle {
  0%,
  100% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0.2;
  }
  25% {
    transform: translateY(-20px) translateX(10px) scale(1.2);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-40px) translateX(-10px) scale(0.8);
    opacity: 0.3;
  }
  75% {
    transform: translateY(-20px) translateX(5px) scale(1.1);
    opacity: 0.4;
  }
}

/* Main Wrapper - Split Layout */
.hero-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
  min-height: 100vh;
}

/* Left Content */
.hero-content-left {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-content-left.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.hero-greeting {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  letter-spacing: 0.5px;
}

.greeting-icon {
  font-size: 1.3rem;
  animation: wave 2s ease-in-out infinite;
}

@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(-20deg);
  }
}

.hero-headline {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-align: left;
}

.name-line {
  display: block;
  color: white;
}

.name-line-1 {
  margin-bottom: 0.3rem;
}

.name-line-2 .name-highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.hero-tagline {
  font-size: clamp(1.3rem, 2.5vw, 2rem);
  font-weight: 600;
  margin-bottom: 1.5rem;
  min-height: 60px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tagline-prefix {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.typing-text {
  color: #667eea;
  font-weight: 700;
}

.cursor {
  animation: blink 1s infinite;
  color: #667eea;
  font-weight: 300;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

.hero-subheadline {
  font-size: clamp(1rem, 1.3vw, 1.15rem);
  margin-bottom: 2.5rem;
  opacity: 0.85;
  line-height: 1.8;
  text-align: left;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
}

.hero-cta {
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

/* Right Content - 3D Profile Card */
.hero-content-right {
  opacity: 0;
  transform: translateX(50px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-content-right.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.profile-card-3d {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
  cursor: pointer;
}

.profile-image-wrapper {
  position: relative;
  width: 320px;
  height: 400px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 0 60px rgba(102, 126, 234, 0.2);
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.2),
    rgba(118, 75, 162, 0.2)
  );
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  border-radius: 16px;
}

.profile-card-3d:hover .profile-image {
  transform: scale(1.05);
}

.profile-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(102, 126, 234, 0.3),
    transparent 70%
  );
  animation: rotate-glow 8s linear infinite;
  pointer-events: none;
}

@keyframes rotate-glow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Buttons */
.btn {
  padding: 1rem 2.2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  font-size: 1rem;
}

.btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
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
  border: none;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px);
}

/* Scroll Indicator */
.hero-scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}

.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  animation: fadeIn 1s ease 1.5s both;
}

.scroll-line {
  width: 2px;
  height: 40px;
  background: linear-gradient(to bottom, #667eea, transparent);
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

/* Decorative Shapes */
.decorative-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #667eea, transparent);
  top: 10%;
  right: 10%;
  animation: float-shape 15s ease-in-out infinite;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #764ba2, transparent);
  bottom: 15%;
  left: 15%;
  animation: float-shape 20s ease-in-out infinite reverse;
}

.shape-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, #f093fb, transparent);
  top: 50%;
  right: 5%;
  animation: float-shape 18s ease-in-out infinite;
}

@keyframes float-shape {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
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

/* Mobile Responsive */
@media (max-width: 968px) {
  .hero-wrapper {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 6rem 1.5rem 4rem;
    text-align: center;
  }

  .hero-content-left {
    text-align: center;
  }

  .hero-headline,
  .hero-tagline,
  .hero-subheadline {
    text-align: center;
  }

  .profile-image-wrapper {
    width: 280px;
    height: 350px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .hero-wrapper {
    padding: 5rem 1rem 3rem;
    gap: 2rem;
  }

  .hero-greeting {
    font-size: 0.95rem;
    justify-content: center;
  }

  .hero-headline {
    font-size: clamp(2rem, 7vw, 2.5rem);
    margin-bottom: 1rem;
  }

  .hero-tagline {
    min-height: 50px;
    font-size: clamp(1.1rem, 4vw, 1.5rem);
    justify-content: center;
    margin-bottom: 1rem;
  }

  .hero-subheadline {
    font-size: 0.95rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .hero-cta {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .btn {
    width: 100%;
    max-width: 100%;
    justify-content: center;
    padding: 0.9rem 1.8rem;
  }

  .profile-image-wrapper {
    width: 240px;
    height: 300px;
  }

  .shape-1,
  .shape-2,
  .shape-3 {
    display: none;
  }

  .particles-container {
    opacity: 0.5;
  }
}
</style>
