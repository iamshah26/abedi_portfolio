<template>
  <section class="section-padding section-dark inside-build-section" id="build">
    <div class="container">
      <div class="editorial-tag font-mono">
        <span>ENGINEERING ARCHITECTURE</span>
      </div>

      <div class="build-header">
        <h2 class="editorial-headline build-title font-serif">
          Inside the Build.
        </h2>
        <p class="build-subtitle font-sans">
          Proving engineering depth through interactive visual systems. Real-time event streams, state reactivity, and autonomous voice pipelines.
        </p>
      </div>

      <!-- Demo Selector Tabs -->
      <div class="demo-tabs font-mono">
        <button
          class="demo-tab-btn"
          :class="{ 'is-active': activeTab === 'realtime' }"
          @click="activeTab = 'realtime'"
        >
          <span>DEMO 01 // REACTIVE EVENT STREAM</span>
        </button>
        <button
          class="demo-tab-btn"
          :class="{ 'is-active': activeTab === 'voice' }"
          @click="activeTab = 'voice'"
        >
          <span>DEMO 02 // AI VOICE CALL LIFECYCLE</span>
        </button>
      </div>

      <!-- WORKBENCH DEMO 01: REACTIVE REAL-TIME EVENT STREAM -->
      <div v-if="activeTab === 'realtime'" class="demo-workbench">
        <div class="workbench-card">
          <div class="workbench-bar font-mono">
            <span>INTERACTIVE SIMULATOR // ENTERACT ENGAGE OMNICHANNEL DISPATCH</span>
            <span class="text-vermilion">STATUS: RUNNING</span>
          </div>

          <div class="workbench-content">
            <div class="workbench-left">
              <h3 class="demo-h3 font-sans">Trigger An Inbound Customer Event</h3>
              <p class="demo-p font-sans">
                In high-velocity enterprise support (5,000+ agents at ibex), incoming chats and voice events must populate agent workspaces in under 50ms without race conditions or page reloads.
              </p>

              <div class="event-triggers font-mono">
                <button
                  class="btn-trigger"
                  @click="triggerEvent('VOICE_CALL', 'Incoming Telephony: Corporate VIP Caller')"
                >
                  <span>📞 Trigger Voice Call</span>
                </button>
                <button
                  class="btn-trigger"
                  @click="triggerEvent('WHATSAPP', 'WhatsApp Message: Urgent Booking Inquiry')"
                >
                  <span>💬 Trigger WhatsApp Chat</span>
                </button>
                <button
                  class="btn-trigger"
                  @click="triggerEvent('OUTAGE_ALERT', 'KE Listening: Grid Status Update')"
                >
                  <span>⚡ Trigger Analytics Alert</span>
                </button>
              </div>
            </div>

            <div class="workbench-right">
              <!-- Visual Pipeline Flow -->
              <div class="stream-pipeline font-mono">
                <div class="stream-node" :class="{ 'node-active': pipelineStep >= 1 }">
                  <span class="node-id">01</span>
                  <span class="node-label">SignalR WebSocket Gateway</span>
                  <span class="node-metric">Duplex Stream</span>
                </div>
                <div class="stream-connector">↓</div>
                <div class="stream-node" :class="{ 'node-active': pipelineStep >= 2 }">
                  <span class="node-id">02</span>
                  <span class="node-label">RxJS switchMap &amp; distinctUntilChanged</span>
                  <span class="node-metric">Zero Race Conditions</span>
                </div>
                <div class="stream-connector">↓</div>
                <div class="stream-node node-final" :class="{ 'node-active': pipelineStep >= 3 }">
                  <span class="node-id">03</span>
                  <span class="node-label">Angular Signals Reactive Store</span>
                  <span class="node-metric text-vermilion">&lt; 2ms DOM Paint</span>
                </div>
              </div>

              <!-- Live Reactive Dashboard Preview -->
              <div class="reactive-preview font-mono">
                <div class="prev-row">
                  <span>AGENT QUEUE COUNT:</span>
                  <span class="prev-val font-sans text-vermilion">{{ queueCount }}</span>
                </div>
                <div class="prev-row">
                  <span>LATEST RECEIVED PAYLOAD:</span>
                  <span class="prev-val text-light">{{ lastPayload || 'Waiting for trigger event...' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- WORKBENCH DEMO 02: INTEVO PULSE AI AGENT LIFECYCLE -->
      <div v-else class="demo-workbench">
        <div class="workbench-card">
          <div class="workbench-bar font-mono">
            <span>INTEVO PULSE // AUTONOMOUS AI CALL WORKFLOW</span>
            <span class="text-emerald">PIPELINE: SYNCHRONOUS</span>
          </div>

          <div class="lifecycle-stepper font-mono">
            <div
              v-for="(step, idx) in lifecycleSteps"
              :key="idx"
              class="lifecycle-step"
              :class="{ 'step-active': currentStepIndex === idx }"
              @click="currentStepIndex = idx"
            >
              <div class="step-badge">0{{ idx + 1 }}</div>
              <h4 class="step-title font-sans">{{ step.title }}</h4>
              <p class="step-desc font-sans">{{ step.shortDesc }}</p>
              <span class="step-latency">{{ step.latency }}</span>
            </div>
          </div>

          <!-- Active Step Inspector -->
          <div class="step-inspector font-sans">
            <div class="insp-header font-mono">
              <span class="text-vermilion">ACTIVE PHASE: {{ lifecycleSteps[currentStepIndex].title }}</span>
              <span>ESTIMATED LATENCY: {{ lifecycleSteps[currentStepIndex].latency }}</span>
            </div>
            <p class="insp-body">
              {{ lifecycleSteps[currentStepIndex].deepDive }}
            </p>
            <div class="insp-controls">
              <button class="btn btn-sm btn-outline-light font-mono" @click="advanceStep">
                <span>Next Lifecycle Phase →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('realtime');

// Demo 1 State
const queueCount = ref(5);
const lastPayload = ref('VoiceCall: Inbound Telephony Stream');
const pipelineStep = ref(0);

const triggerEvent = (type, label) => {
  lastPayload.value = `${type} // ${label}`;
  pipelineStep.value = 1;

  setTimeout(() => {
    pipelineStep.value = 2;
  }, 200);

  setTimeout(() => {
    pipelineStep.value = 3;
    queueCount.value += 1;
  }, 400);

  setTimeout(() => {
    pipelineStep.value = 0;
  }, 1800);
};

// Demo 2 State
const currentStepIndex = ref(0);

const lifecycleSteps = [
  {
    title: 'SIP Inbound Handshake',
    shortDesc: 'Carrier gateway triggers Webhook into Intevo Pulse cluster.',
    latency: '< 50ms',
    deepDive: 'Inbound telephony session initiates via ViciDial/SIP trunks. Intevo Pulse establishes WebSocket audio stream and binds caller callerID metadata.'
  },
  {
    title: 'Streaming Speech-to-Text',
    shortDesc: 'Multilingual speech chunking with sub-200ms turnaround.',
    latency: '~160ms',
    deepDive: 'Real-time audio buffer streams into acoustic transcription models, generating live word-level timestamps and linguistic confidence scoring.'
  },
  {
    title: 'LLM Intent & Tool Calling',
    shortDesc: 'Autonomous reasoning, calendar lookup, and CRM actions.',
    latency: '~180ms',
    deepDive: 'Contextual prompt evaluates user inquiry, triggers verified API webhooks (e.g., flight reschedule, appointment booking), and drafts response.'
  },
  {
    title: 'Neural Voice Synthesis',
    shortDesc: 'Low-latency conversational neural audio playback.',
    latency: '~120ms',
    deepDive: 'Natural conversational audio output streams back to the caller with human inflections, allowing natural turn-taking and graceful interruption handling.'
  },
  {
    title: 'Human Supervisor Handoff',
    shortDesc: 'Escalation trigger with complete conversation transcript.',
    latency: 'Instant',
    deepDive: 'If sentiment drops or complex exceptions occur, the session transfers seamlessly to a human agent console with full live transcript context.'
  }
];

const advanceStep = () => {
  currentStepIndex.value = (currentStepIndex.value + 1) % lifecycleSteps.length;
};
</script>

<style scoped>
.inside-build-section {
  background: var(--bg-graphite);
  border-bottom: 1px solid var(--border-on-dark);
}

.build-header {
  margin-bottom: 3.5rem;
}

.build-title {
  font-size: clamp(3rem, 6.5vw, 5.5rem);
  color: var(--text-light);
  margin-bottom: 1rem;
}

.build-subtitle {
  font-size: 1.15rem;
  color: var(--text-light-secondary);
  max-width: 720px;
  line-height: 1.6;
}

.demo-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.demo-tab-btn {
  padding: 0.65rem 1.25rem;
  background: var(--bg-graphite-elevated);
  border: 1px solid var(--border-on-dark);
  color: var(--text-light-secondary);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.25s ease;
}

.demo-tab-btn:hover {
  color: var(--text-light);
  border-color: var(--border-on-dark-medium);
}

.demo-tab-btn.is-active {
  background: rgba(241, 100, 69, 0.12);
  border-color: var(--accent-vermilion);
  color: var(--accent-vermilion);
}

.workbench-card {
  border-radius: var(--radius-lg);
  background: #0d0d0d;
  border: 1px solid var(--border-on-dark-medium);
  overflow: hidden;
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8);
}

.workbench-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1.75rem;
  background: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid var(--border-on-dark);
  font-size: 0.72rem;
}

.workbench-content {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 3.5rem;
  padding: 2.5rem;
}

.demo-h3 {
  font-size: 1.5rem;
  color: var(--text-light);
  margin-bottom: 0.75rem;
}

.demo-p {
  font-size: 0.95rem;
  color: var(--text-light-secondary);
  line-height: 1.65;
  margin-bottom: 1.75rem;
}

.event-triggers {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn-trigger {
  padding: 0.85rem 1.25rem;
  background: var(--bg-graphite-elevated);
  border: 1px solid var(--border-on-dark);
  color: var(--text-light);
  border-radius: var(--radius-sm);
  cursor: pointer;
  text-align: left;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.btn-trigger:hover {
  background: rgba(241, 100, 69, 0.1);
  border-color: var(--accent-vermilion);
  transform: translateX(4px);
}

.stream-pipeline {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stream-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: var(--bg-graphite-elevated);
  border: 1px solid var(--border-on-dark);
  border-radius: var(--radius-sm);
  font-size: 0.78rem;
  transition: all 0.3s ease;
}

.stream-node.node-active {
  border-color: var(--accent-vermilion);
  background: rgba(241, 100, 69, 0.1);
  box-shadow: 0 0 20px var(--accent-vermilion-glow);
}

.node-id {
  color: var(--text-light-muted);
  font-weight: 700;
}

.node-metric {
  color: var(--text-light-secondary);
}

.stream-connector {
  text-align: center;
  color: var(--text-light-muted);
  font-size: 0.9rem;
}

.reactive-preview {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-on-dark);
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  font-size: 0.75rem;
}

.prev-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.prev-val {
  font-size: 0.9rem;
  font-weight: 700;
}

/* LIFECYCLE STEPPER */
.lifecycle-stepper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding: 2rem;
  border-bottom: 1px solid var(--border-on-dark);
}

.lifecycle-step {
  padding: 1.25rem;
  background: var(--bg-graphite-elevated);
  border: 1px solid var(--border-on-dark);
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  transition: all 0.25s ease;
}

.lifecycle-step:hover,
.lifecycle-step.step-active {
  border-color: var(--accent-vermilion);
  background: rgba(241, 100, 69, 0.08);
}

.step-badge {
  color: var(--accent-vermilion);
  font-size: 0.72rem;
  font-weight: 700;
}

.step-title {
  font-size: 0.95rem;
  color: var(--text-light);
}

.step-desc {
  font-size: 0.72rem;
  color: var(--text-light-secondary);
  line-height: 1.4;
}

.step-latency {
  font-size: 0.65rem;
  color: var(--text-light-muted);
  margin-top: 0.25rem;
}

.step-inspector {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.insp-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
}

.insp-body {
  font-size: 1.05rem;
  color: var(--text-light-secondary);
  line-height: 1.65;
  max-width: 860px;
}

@media (max-width: 1024px) {
  .workbench-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .lifecycle-stepper {
    grid-template-columns: 1fr;
  }
}
</style>

