<template>
  <section class="section-padding section-ivory about-section" id="about">
    <div class="container">
      <div class="editorial-tag font-mono">
        <span>ABOUT &amp; NARRATIVE</span>
      </div>

      <div class="about-grid">
        <!-- Left: Editorial Story & Photography -->
        <div class="about-story-col">
          <h2 class="editorial-headline about-title font-serif text-dark">
            Behind the Products.
          </h2>

          <div class="about-paragraphs font-sans text-dark-secondary">
            <p class="about-lead text-dark">
              I am <strong>Syed Ali Haider Abedi</strong>, branding professionally as <strong>Ali Haider</strong>. I am a Lahore-based software engineer with approximately four years of professional experience specializing in <strong>Angular, TypeScript, and production product engineering</strong>.
            </p>
            <p>
              My journey began with deep foundational computer science and software engineering at COMSATS University Islamabad. Over the last four years, I've divided my career between two high-stakes disciplines: architecting complex enterprise applications that support thousands of concurrent users (such as <strong>Enteract Engage at ibex</strong>), and co-founding startups where I design, engineer, and deploy commercial products from zero to one.
            </p>
            <p>
              I believe great frontend engineering is never just about rendering mockups. It is about understanding the commercial reality behind the software: reducing customer friction, managing real-time data streams without dropped packets, and ensuring interfaces feel responsive and intuitive on every device.
            </p>
          </div>

          <div class="about-author-strip">
            <div class="author-avatar-frame">
              <img
                src="/profile.png"
                alt="Syed Ali Haider Abedi (Ali Haider)"
                class="author-avatar-img"
              />
            </div>
            <div class="author-info font-sans">
              <span class="author-name text-dark">Syed Ali Haider Abedi</span>
              <span class="author-role font-mono text-dark-muted">Lahore, Pakistan · Open to Worldwide Remote Roles</span>
            </div>
          </div>

          <div class="about-cta-row">
            <a
              href="/Syed_Ali_Haider_Abedi_Resume.pdf"
              target="_blank"
              download="Syed_Ali_Haider_Abedi_Resume.pdf"
              class="btn btn-vermilion font-sans"
            >
              <span>Download Official Resume (PDF)</span>
              <span>↓</span>
            </a>
            <a
              href="https://github.com/iamshah26"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline-dark font-sans"
            >
              <span>GitHub // iamshah26</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        <!-- Right: Intentional, User-Initiated Video Showcase Card -->
        <div class="about-video-col">
          <div class="video-editorial-card" ref="videoContainerRef">
            <div class="video-card-top font-mono">
              <span class="video-card-tag">DEVELOPER WALKTHROUGH</span>
              <span class="video-card-duration">DURATION: 02:01</span>
            </div>

            <div class="video-viewport">
              <video
                ref="videoRef"
                class="editorial-video"
                playsinline
                preload="metadata"
                @ended="onVideoEnded"
                @timeupdate="onTimeUpdate"
                @click="togglePlay"
              >
                <source src="/Developer Portfolio Showcase.mp4" type="video/mp4" />
              </video>

              <!-- Poster Overlay (User Initiated Play) -->
              <div
                v-if="!hasStarted"
                class="video-poster-overlay"
                @click="startVideo"
              >
                <div class="poster-badge font-mono">PORTFOLIO WALKTHROUGH</div>
                <button class="poster-play-btn" aria-label="Play Walkthrough">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="#FFFFFF">
                    <polygon points="6 3 20 12 6 21 6 3"></polygon>
                  </svg>
                </button>
                <span class="poster-hint font-sans">Click to Watch Developer Showcase</span>
              </div>

              <!-- Replay Overlay when video ends cleanly -->
              <div
                v-if="hasEnded"
                class="video-poster-overlay replay-overlay"
                @click="replayVideo"
              >
                <button class="poster-play-btn replay-btn" aria-label="Replay Walkthrough">
                  <span class="replay-icon">↺</span>
                </button>
                <span class="poster-hint font-sans">Replay Walkthrough</span>
              </div>

              <!-- Video Controls HUD (Visible only while playing or paused) -->
              <div
                v-if="hasStarted && !hasEnded"
                class="video-hud font-mono"
              >
                <div class="hud-scrubber" @click="seek">
                  <div class="scrub-progress" :style="{ width: `${progressPercent}%` }"></div>
                </div>

                <div class="hud-controls">
                  <div class="hud-left">
                    <button class="hud-btn" @click="togglePlay">
                      <span v-if="isPlaying">⏸ Pause</span>
                      <span v-else>▶ Play</span>
                    </button>
                    <span class="hud-time">{{ formatTime(currentTime) }} / 02:01</span>
                  </div>

                  <div class="hud-right">
                    <button class="hud-btn" @click="toggleMute">
                      <span v-if="isMuted">Unmute 🔇</span>
                      <span v-else>Mute 🔊</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="video-card-footer font-sans text-dark-secondary">
              <p>
                An overview of my engineering approach, independent product execution, and interface standards. Plays once and will not endlessly loop.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const videoRef = ref(null);
const videoContainerRef = ref(null);
const isPlaying = ref(false);
const isMuted = ref(false);
const hasStarted = ref(false);
const hasEnded = ref(false);
const currentTime = ref(0);
const progressPercent = ref(0);
const ACTUAL_DURATION = 121; // 2:01

let observer = null;

const startVideo = () => {
  if (!videoRef.value) return;
  hasStarted.value = true;
  hasEnded.value = false;
  videoRef.value.currentTime = 0;
  videoRef.value.play();
  isPlaying.value = true;
};

const togglePlay = () => {
  if (!videoRef.value) return;
  if (videoRef.value.paused) {
    videoRef.value.play();
    isPlaying.value = true;
  } else {
    videoRef.value.pause();
    isPlaying.value = false;
  }
};

const toggleMute = () => {
  if (!videoRef.value) return;
  videoRef.value.muted = !videoRef.value.muted;
  isMuted.value = videoRef.value.muted;
};

const replayVideo = () => {
  hasEnded.value = false;
  startVideo();
};

const onVideoEnded = () => {
  isPlaying.value = false;
  hasEnded.value = true;
  if (videoRef.value) {
    videoRef.value.pause();
  }
};

const onTimeUpdate = () => {
  if (!videoRef.value) return;
  const time = videoRef.value.currentTime;

  if (time >= ACTUAL_DURATION) {
    onVideoEnded();
    return;
  }

  currentTime.value = time;
  progressPercent.value = (time / ACTUAL_DURATION) * 100;
};

const seek = (e) => {
  if (!videoRef.value) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  videoRef.value.currentTime = pos * ACTUAL_DURATION;
};

const formatTime = (secs) => {
  if (!secs || isNaN(secs) || secs < 0) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

onMounted(() => {
  // Pause video if scrolled out of viewport
  if (videoContainerRef.value && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && videoRef.value && !videoRef.value.paused) {
          videoRef.value.pause();
          isPlaying.value = false;
        }
      });
    }, { threshold: 0.2 });

    observer.observe(videoContainerRef.value);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.about-section {
  border-bottom: 1px solid var(--border-on-ivory);
}

.about-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 4.5rem;
  align-items: start;
}

.about-story-col {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about-title {
  font-size: clamp(3rem, 6.5vw, 5.5rem);
  color: var(--text-dark);
}

.about-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  font-size: 1.05rem;
  line-height: 1.7;
}

.about-lead {
  font-size: 1.15rem;
  line-height: 1.6;
}

.about-author-strip {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  background: var(--bg-ivory-elevated);
  border: 1px solid var(--border-on-ivory);
  border-radius: var(--radius-md);
}

.author-avatar-frame {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--accent-vermilion);
  flex-shrink: 0;
}

.author-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.author-name {
  font-size: 1.05rem;
  font-weight: 700;
}

.author-role {
  font-size: 0.75rem;
}

.about-cta-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* VIDEO EDITORIAL CARD */
.video-editorial-card {
  border-radius: var(--radius-lg);
  background: #FFFFFF;
  border: 1px solid var(--border-on-ivory-medium);
  overflow: hidden;
  box-shadow: 0 25px 60px -20px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
}

.video-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  font-size: 0.72rem;
  border-bottom: 1px solid var(--border-on-ivory);
  color: var(--text-dark-muted);
}

.video-card-tag {
  color: var(--accent-vermilion);
  font-weight: 700;
}

.video-viewport {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000000;
}

.editorial-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-poster-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(20, 20, 20, 0.75);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.video-poster-overlay:hover {
  background: rgba(20, 20, 20, 0.65);
}

.poster-badge {
  font-size: 0.72rem;
  color: var(--accent-vermilion);
  letter-spacing: 0.08em;
}

.poster-play-btn {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: var(--accent-vermilion);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 25px var(--accent-vermilion-glow);
  transition: transform 0.25s ease;
  padding-left: 3px;
}

.poster-play-btn:hover {
  transform: scale(1.08);
}

.poster-hint {
  font-size: 0.9rem;
  color: #FFFFFF;
}

.replay-btn {
  padding-left: 0;
}

.replay-icon {
  font-size: 1.75rem;
  color: #FFFFFF;
  line-height: 1;
}

.video-hud {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%);
  padding: 1rem 1.25rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hud-scrubber {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  cursor: pointer;
}

.scrub-progress {
  height: 100%;
  background: var(--accent-vermilion);
  border-radius: 2px;
}

.hud-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #FFFFFF;
}

.hud-left,
.hud-right {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.hud-btn {
  background: transparent;
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
}

.hud-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.video-card-footer {
  padding: 1.25rem 1.5rem;
  font-size: 0.88rem;
  line-height: 1.5;
  background: #FFFFFF;
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
