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
        <div
          class="video-wrapper"
          @mouseenter="showControls = true"
          @mouseleave="showControls = false"
          @mousemove="resetControlsTimer"
        >
          <video
            ref="aboutVideo"
            autoplay
            loop
            playsinline
            preload="metadata"
            class="about-video"
            @loadedmetadata="onVideoMetadataLoaded"
            @loadeddata="onVideoLoaded"
            @error="onVideoError"
            @play="handlePlay"
            @pause="handlePause"
            @timeupdate="updateProgress"
            @ended="handleVideoEnded"
            @click="togglePlay"
          >
            <source src="/Developer Portfolio Showcase.mp4" type="video/mp4" />
          </video>

          <!-- Center Controls (YouTube Style) -->
          <div
            class="video-center-controls"
            :class="{ show: showControls || !isPlaying }"
          >
            <button
              @click.stop="skipBackward"
              class="center-control-btn skip-btn"
              aria-label="Skip backward 10 seconds"
            >
              <svg viewBox="0 0 24 24" fill="white" width="32" height="32">
                <path
                  d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"
                />
                <path d="M10.5 12l4.5 3v-6l-4.5 3z" />
              </svg>
              <span class="skip-label">10</span>
            </button>

            <button
              @click.stop="togglePlay"
              class="center-control-btn play-pause-btn"
              aria-label="Play/Pause"
            >
              <svg
                v-if="isPlaying"
                viewBox="0 0 24 24"
                fill="white"
                width="64"
                height="64"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                fill="white"
                width="64"
                height="64"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <button
              @click.stop="skipForward"
              class="center-control-btn skip-btn"
              aria-label="Skip forward 10 seconds"
            >
              <svg viewBox="0 0 24 24" fill="white" width="32" height="32">
                <path
                  d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"
                />
                <path d="M13.5 12l-4.5-3v6l4.5-3z" />
              </svg>
              <span class="skip-label">10</span>
            </button>
          </div>

          <!-- Bottom Controls Bar (YouTube Style) -->
          <div
            class="video-bottom-controls"
            :class="{ show: showControls || !isPlaying }"
          >
            <!-- Progress Bar -->
            <div class="progress-container" @click="seekTo">
              <div class="progress-bar">
                <div
                  class="progress-filled"
                  :style="{ width: progressPercent + '%' }"
                ></div>
                <div
                  class="progress-handle"
                  :style="{ left: progressPercent + '%' }"
                ></div>
              </div>
            </div>

            <!-- Control Buttons -->
            <div class="bottom-controls-row">
              <div class="controls-left">
                <button
                  @click.stop="togglePlay"
                  class="control-btn"
                  aria-label="Play/Pause"
                >
                  <svg
                    v-if="isPlaying"
                    viewBox="0 0 24 24"
                    fill="white"
                    width="20"
                    height="20"
                  >
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                  <svg
                    v-else
                    viewBox="0 0 24 24"
                    fill="white"
                    width="20"
                    height="20"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>

                <button
                  @click.stop="toggleMute"
                  class="control-btn"
                  aria-label="Mute/Unmute"
                >
                  <svg
                    v-if="!isMuted"
                    viewBox="0 0 24 24"
                    fill="white"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                    />
                  </svg>
                  <svg
                    v-else
                    viewBox="0 0 24 24"
                    fill="white"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
                    />
                  </svg>
                </button>

                <div class="volume-control" @click.stop>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    :value="volume"
                    @input="setVolume"
                    class="volume-slider"
                  />
                </div>

                <div class="time-display">
                  {{ formatTime(currentTime) }}
                </div>
              </div>

              <div class="controls-right">
                <div class="speed-control">
                  <button
                    @click.stop="showSpeedMenu = !showSpeedMenu"
                    class="control-btn speed-btn"
                    aria-label="Video speed"
                  >
                    {{ playbackSpeed }}x
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
const showControls = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const progressPercent = ref(0);
const volume = ref(100);
let controlsTimer = null;
let durationCheckInterval = null;

// Actual video duration: 2:01 (121 seconds)
const ACTUAL_VIDEO_DURATION = 125;

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

  // Monitor video to enforce actual duration limit (2:01)
  durationCheckInterval = setInterval(() => {
    if (
      aboutVideo.value &&
      aboutVideo.value.currentTime >= ACTUAL_VIDEO_DURATION
    ) {
      aboutVideo.value.currentTime = 0;
      currentTime.value = 0;
      progressPercent.value = 0;
    }
  }, 100); // Check every 100ms
});

const onVideoMetadataLoaded = () => {
  // Set actual video duration (2:01 = 121 seconds)
  // Video metadata may report incorrect duration, so we use the known actual duration
  duration.value = ACTUAL_VIDEO_DURATION;
  // Ensure progress starts at 0
  progressPercent.value = 0;
  currentTime.value = 0;
};

const onVideoLoaded = () => {
  // Auto-unmute after video loads
  if (aboutVideo.value) {
    setTimeout(() => {
      aboutVideo.value.muted = false;
      isMuted.value = false;
    }, 1000);

    // Set initial playback speed
    aboutVideo.value.playbackRate = playbackSpeed.value;

    // Set initial volume
    aboutVideo.value.volume = volume.value / 100;
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

const handleVideoEnded = () => {
  // When video reaches actual end (2:01), reset for looping
  if (aboutVideo.value) {
    progressPercent.value = 0;
    currentTime.value = 0;
    aboutVideo.value.currentTime = 0;
  }
};

// Monitor video time to enforce actual duration limit
const enforceVideoDuration = () => {
  if (
    aboutVideo.value &&
    aboutVideo.value.currentTime >= ACTUAL_VIDEO_DURATION
  ) {
    aboutVideo.value.currentTime = 0;
    currentTime.value = 0;
    progressPercent.value = 0;
  }
};

const updateProgress = () => {
  if (aboutVideo.value) {
    // Get current time and clamp it to actual video duration
    let videoCurrentTime = aboutVideo.value.currentTime;

    // If video time exceeds actual duration, reset it (for looping)
    if (videoCurrentTime >= ACTUAL_VIDEO_DURATION) {
      videoCurrentTime = videoCurrentTime % ACTUAL_VIDEO_DURATION;
      aboutVideo.value.currentTime = videoCurrentTime;
    }

    currentTime.value = Math.min(videoCurrentTime, ACTUAL_VIDEO_DURATION);

    // Calculate progress using actual video duration
    if (ACTUAL_VIDEO_DURATION > 0) {
      progressPercent.value = Math.min(
        (currentTime.value / ACTUAL_VIDEO_DURATION) * 100,
        100
      );

      // Reset progress when video reaches actual end
      if (currentTime.value >= ACTUAL_VIDEO_DURATION - 0.1) {
        progressPercent.value = 100;
      }
    }
  }
};

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds) || !isFinite(seconds) || seconds < 0)
    return "0:00";
  const totalSeconds = Math.floor(seconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const skipForward = () => {
  if (aboutVideo.value) {
    const newTime = aboutVideo.value.currentTime + 10;
    // Clamp to actual video duration, never exceed it
    const clampedTime = Math.min(newTime, ACTUAL_VIDEO_DURATION);
    aboutVideo.value.currentTime = clampedTime;
    // If at end, loop back to start
    if (clampedTime >= ACTUAL_VIDEO_DURATION) {
      aboutVideo.value.currentTime = 0;
    }
  }
};

const skipBackward = () => {
  if (aboutVideo.value) {
    aboutVideo.value.currentTime = Math.max(
      aboutVideo.value.currentTime - 10,
      0
    );
  }
};

const seekTo = (e) => {
  if (aboutVideo.value && e.target.closest(".progress-container")) {
    const progressBar = e.currentTarget.querySelector(".progress-bar");
    const rect = progressBar.getBoundingClientRect();
    const percent = Math.min(
      Math.max((e.clientX - rect.left) / rect.width, 0),
      1
    );
    const seekTime = percent * ACTUAL_VIDEO_DURATION;
    // Clamp seek time to valid duration range (0 to 2:01)
    aboutVideo.value.currentTime = Math.min(
      Math.max(seekTime, 0),
      ACTUAL_VIDEO_DURATION
    );
  }
};

const setVolume = (e) => {
  volume.value = e.target.value;
  if (aboutVideo.value) {
    aboutVideo.value.volume = volume.value / 100;
    if (volume.value > 0) {
      aboutVideo.value.muted = false;
      isMuted.value = false;
    } else {
      aboutVideo.value.muted = true;
      isMuted.value = true;
    }
  }
};

const resetControlsTimer = () => {
  showControls.value = true;
  clearTimeout(controlsTimer);
  controlsTimer = setTimeout(() => {
    if (isPlaying.value) {
      showControls.value = false;
    }
  }, 3000);
};

onUnmounted(() => {
  if (observer) observer.disconnect();
  document.removeEventListener("click", handleClickOutside);
  clearTimeout(controlsTimer);
  if (durationCheckInterval) {
    clearInterval(durationCheckInterval);
  }
});
</script>

<style scoped>
.about-section {
  padding: 8rem 2rem;
  background: linear-gradient(to bottom, #ffffff 0%, #f8f9ff 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: block;
  visibility: visible;
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
  animation: fadeInTitle 1s ease 0.5s forwards;
}

@keyframes fadeInTitle {
  to {
    opacity: 1;
    transform: translateX(0);
  }
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
  animation: fadeInContent 1s ease 0.7s forwards;
}

@keyframes fadeInContent {
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  animation: fadeInVideo 1s ease 1s forwards;
}

@keyframes fadeInVideo {
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

/* Center Controls (YouTube Style) */
.video-center-controls {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.video-center-controls.show {
  opacity: 1;
  pointer-events: all;
}

.center-control-btn {
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
}

.play-pause-btn {
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.7);
}

.play-pause-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.skip-btn {
  width: 60px;
  height: 60px;
  flex-direction: column;
  gap: 0.25rem;
}

.skip-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.skip-label {
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  margin-top: -0.5rem;
}

/* Bottom Controls Bar (YouTube Style) */
.video-bottom-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 1rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.video-bottom-controls.show {
  opacity: 1;
  pointer-events: all;
}

.progress-container {
  width: 100%;
  margin-bottom: 0.75rem;
  cursor: pointer;
  padding: 0.5rem 0;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  position: relative;
  cursor: pointer;
}

.progress-filled {
  height: 100%;
  background: #667eea;
  border-radius: 2px;
  transition: width 0.1s linear;
}

.progress-handle {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: #667eea;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.progress-container:hover .progress-handle {
  opacity: 1;
}

.progress-container:hover .progress-filled {
  background: #ff0000;
}

.progress-container:hover .progress-handle {
  background: #ff0000;
}

.bottom-controls-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.controls-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.controls-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.control-btn {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  width: 36px;
  height: 36px;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.volume-control {
  display: flex;
  align-items: center;
  width: 100px;
}

.volume-slider {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.time-display {
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  font-family: "Roboto", sans-serif;
}

.speed-control {
  position: relative;
}

.speed-btn {
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  min-width: 40px;
}

.speed-menu {
  position: absolute;
  bottom: 45px;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 80px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.speed-option {
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  text-align: center;
}

.speed-option:hover {
  background: rgba(255, 255, 255, 0.1);
}

.speed-option.active {
  background: rgba(102, 126, 234, 0.5);
  font-weight: 600;
}

@media (max-width: 768px) {
  .about-video-section {
    margin-top: 3rem;
  }

  .video-wrapper {
    border-radius: 16px;
  }

  .video-center-controls {
    gap: 1rem;
  }

  .play-pause-btn {
    width: 60px;
    height: 60px;
  }

  .play-pause-btn svg {
    width: 48px;
    height: 48px;
  }

  .skip-btn {
    width: 50px;
    height: 50px;
  }

  .skip-btn svg {
    width: 24px;
    height: 24px;
  }

  .video-bottom-controls {
    padding: 0.75rem;
  }

  .bottom-controls-row {
    gap: 0.5rem;
  }

  .controls-left {
    gap: 0.5rem;
  }

  .control-btn {
    width: 32px;
    height: 32px;
    padding: 0.4rem;
  }

  .control-btn svg {
    width: 18px;
    height: 18px;
  }

  .volume-control {
    width: 60px;
  }

  .time-display {
    font-size: 0.75rem;
  }

  .speed-btn {
    font-size: 0.75rem;
    min-width: 35px;
  }

  .speed-menu {
    bottom: 40px;
    min-width: 70px;
    padding: 0.4rem;
  }

  .speed-option {
    padding: 0.4rem 0.75rem;
    font-size: 0.75rem;
  }
}
</style>
