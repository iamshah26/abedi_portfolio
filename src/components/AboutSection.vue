<template>
  <section id="about" class="about-section">
    <div class="container">
      <h2 class="section-title" :class="{ 'animate-in': titleVisible }">
        About Me
      </h2>
      <div class="about-content" :class="{ 'animate-in': contentVisible }">
        <div class="about-text">
          <p class="lead">
            Hey there! I'm
            <strong class="highlight">Syed Ali Haider Abedi</strong>, a
            passionate full-stack developer and tech entrepreneur who loves
            building digital products that make a difference. I'm the owner and
            founder of <strong class="highlight">Intevo Solutions</strong>, and
            I specialize in creating web applications, mobile apps, AI-powered
            solutions, and automation systems.
          </p>
          <p>
            When I'm not coding, I'm exploring the latest in AI, experimenting
            with new frameworks, or helping businesses transform their digital
            presence. I believe in writing clean code, creating exceptional user
            experiences, and delivering solutions that drive real business
            value.
          </p>
          <p>
            My journey has taken me from building simple websites to
            architecting complex SaaS platforms. Through Intevo Solutions, I've
            built and launched multiple successful digital products including
            Intevo Pulse Platform, mobile applications, and operations
            dashboards. Each project teaches me something new, and I love the
            challenge of turning ideas into reality - both for my own ventures
            and for clients.
          </p>
          <div class="about-stats">
            <div class="stat" v-for="(stat, index) in stats" :key="index">
              <div class="stat-number" :data-target="stat.value">
                {{ animatedStats[index] }}
              </div>
              <p class="stat-label">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Video Section -->
      <div class="about-video-section" :class="{ 'animate-in': videoVisible }">
        <div class="video-wrapper">
          <video
            ref="aboutVideo"
            autoplay
            loop
            playsinline
            class="about-video"
            @loadeddata="onVideoLoaded"
            @error="onVideoError"
            @play="handlePlay"
            @pause="handlePause"
          >
            <source src="/Developer Portfolio Showcase.mp4" type="video/mp4" />
          </video>
          <!-- Video Controls -->
          <div class="video-controls-overlay">
            <!-- Play/Pause Button -->
            <button
              v-if="isPlaying"
              @click="togglePlay"
              class="video-control-btn"
              aria-label="Pause video"
            >
              ⏸️
            </button>
            <button
              v-else
              @click="togglePlay"
              class="video-control-btn"
              aria-label="Play video"
            >
              ▶️
            </button>

            <!-- Mute/Unmute Button -->
            <button
              v-if="!isMuted"
              @click="toggleMute"
              class="video-control-btn"
              aria-label="Mute video"
            >
              🔊
            </button>
            <button
              v-else
              @click="toggleMute"
              class="video-control-btn"
              aria-label="Unmute video"
            >
              🔇
            </button>

            <!-- Speed Control -->
            <div class="speed-control">
              <button
                @click="showSpeedMenu = !showSpeedMenu"
                class="video-control-btn speed-btn"
                aria-label="Video speed"
              >
                ⚡ {{ playbackSpeed }}x
              </button>
              <div v-if="showSpeedMenu" class="speed-menu">
                <button
                  v-for="speed in speedOptions"
                  :key="speed"
                  @click="setPlaybackSpeed(speed)"
                  class="speed-option"
                  :class="{ active: playbackSpeed === speed }"
                >
                  {{ speed }}x
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const titleVisible = ref(false);
const contentVisible = ref(false);
const videoVisible = ref(false);
const animatedStats = ref([0, 0, 0]);
const aboutVideo = ref(null);
const isMuted = ref(false);
const isPlaying = ref(true);
const playbackSpeed = ref(1);
const showSpeedMenu = ref(false);
const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const stats = [
  { value: 50, label: "Projects Delivered" },
  { value: 30, label: "Happy Clients" },
  { value: 5, label: "Years Experience" },
];

const animateNumber = (target, index, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      animatedStats.value[index] = target;
      clearInterval(timer);
    } else {
      animatedStats.value[index] = Math.floor(current);
    }
  }, 16);
};

let observer;

// Close speed menu when clicking outside
const handleClickOutside = (event) => {
  if (showSpeedMenu.value && !event.target.closest(".speed-control")) {
    showSpeedMenu.value = false;
  }
};

onMounted(() => {
  setTimeout(() => {
    titleVisible.value = true;
  }, 100);

  setTimeout(() => {
    contentVisible.value = true;
  }, 300);

  setTimeout(() => {
    videoVisible.value = true;
  }, 600);

  // Add click outside listener
  document.addEventListener("click", handleClickOutside);

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.target.classList.contains("about-stats")
        ) {
          stats.forEach((stat, index) => {
            setTimeout(() => {
              animateNumber(stat.value, index);
            }, index * 200);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  setTimeout(() => {
    const statsEl = document.querySelector(".about-stats");
    if (statsEl) observer.observe(statsEl);
  }, 500);
});

const onVideoLoaded = () => {
  // Auto-unmute after video loads
  if (aboutVideo.value) {
    setTimeout(() => {
      aboutVideo.value.muted = false;
      isMuted.value = false;
    }, 1000);
    // Set initial playback speed
    aboutVideo.value.playbackRate = playbackSpeed.value;
  }
};

const onVideoError = () => {
  console.warn("About video failed to load");
};

const togglePlay = () => {
  if (aboutVideo.value) {
    if (aboutVideo.value.paused) {
      aboutVideo.value.play();
      isPlaying.value = true;
    } else {
      aboutVideo.value.pause();
      isPlaying.value = false;
    }
  }
};

const toggleMute = () => {
  if (aboutVideo.value) {
    aboutVideo.value.muted = !aboutVideo.value.muted;
    isMuted.value = aboutVideo.value.muted;
  }
};

const setPlaybackSpeed = (speed) => {
  if (aboutVideo.value) {
    aboutVideo.value.playbackRate = speed;
    playbackSpeed.value = speed;
    showSpeedMenu.value = false;
  }
};

// Listen for video play/pause events
const handlePlay = () => {
  isPlaying.value = true;
};

const handlePause = () => {
  isPlaying.value = false;
};

onUnmounted(() => {
  if (observer) observer.disconnect();
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.about-section {
  padding: 8rem 2rem;
  background: linear-gradient(to bottom, #ffffff 0%, #f8f9ff 100%);
  position: relative;
  overflow: hidden;
}

.about-section::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.1), transparent);
  border-radius: 50%;
  animation: pulse 8s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 4rem;
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
  font-family: "Courier New", monospace;
}

.about-content {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.about-content.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.about-text p {
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  line-height: 2;
  color: #4a5568;
  margin-bottom: 1.8rem;
  animation: fadeInUp 0.6s ease forwards;
}

.about-text p:nth-child(1) {
  animation-delay: 0.1s;
  opacity: 0;
}

.about-text p:nth-child(2) {
  animation-delay: 0.3s;
  opacity: 0;
}

.about-text p:nth-child(3) {
  animation-delay: 0.5s;
  opacity: 0;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}

.lead {
  font-size: clamp(1.2rem, 2vw, 1.5rem) !important;
  color: #1a1a2e !important;
  font-weight: 600;
  line-height: 1.6;
}

.highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 2px solid rgba(102, 126, 234, 0.2);
}

.stat {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}

.stat::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(102, 126, 234, 0.1),
    transparent
  );
  transition: left 0.5s;
}

.stat:hover::before {
  left: 100%;
}

.stat:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
}

.stat-number {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  display: block;
}

.stat-label {
  color: #64748b;
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .about-section {
    padding: 4rem 1.5rem;
  }

  .section-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }

  .about-text p {
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .lead {
    font-size: 1.1rem !important;
  }

  .about-stats {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    margin-top: 2.5rem;
    padding-top: 2rem;
  }

  .stat {
    padding: 1.5rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .stat-label {
    font-size: 0.85rem;
  }
}

/* Video Section */
.about-video-section {
  margin-top: 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.about-video-section.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.video-wrapper {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
  background: #000;
  aspect-ratio: 16/9;
}

.about-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-controls-overlay {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 2;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.video-control-btn {
  width: 50px;
  height: 50px;
  background: rgba(102, 126, 234, 0.9);
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  color: white;
  font-weight: 600;
}

.video-control-btn:hover {
  background: rgba(118, 75, 162, 0.9);
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.speed-control {
  position: relative;
}

.speed-btn {
  font-size: 1rem;
  padding: 0.5rem;
}

.speed-menu {
  position: absolute;
  bottom: 60px;
  right: 0;
  background: rgba(102, 126, 234, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 80px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.speed-option {
  padding: 0.6rem 1rem;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s ease;
  text-align: center;
}

.speed-option:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-2px);
}

.speed-option.active {
  background: rgba(255, 255, 255, 0.3);
  font-weight: 700;
}

/* Close speed menu when clicking outside */
.video-wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

@media (max-width: 768px) {
  .about-video-section {
    margin-top: 3rem;
  }

  .video-wrapper {
    border-radius: 16px;
  }

  .video-control-btn {
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
  }

  .speed-btn {
    font-size: 0.85rem;
  }

  .video-controls-overlay {
    bottom: 1rem;
    right: 1rem;
    gap: 0.5rem;
  }

  .speed-menu {
    bottom: 55px;
    min-width: 70px;
    padding: 0.4rem;
  }

  .speed-option {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }
}
</style>
