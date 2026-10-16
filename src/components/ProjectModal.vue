<template>
 <dialog ref="dialog" class="exhibit-dialog" @click="backdrop" @close="$emit('close')">
  <div class="dialog-inner">
   <button class="close-button" autofocus @click="dialog.close()" aria-label="Close panel">Close <span>×</span></button>
   <template v-if="project">
    <span class="eyebrow" :style="{color:project.color}">{{ project.eyebrow }}</span>
    <h2>{{ project.title }}</h2><p class="dialog-lead">{{ project.summary }}</p>
    <img v-if="project.image" class="case-image" :src="project.image" :alt="`${project.title} public website capture`" @error="imageError" />
    <div v-else class="system-diagram" aria-label="Illustrative flow: channels to reactive state to agent workspace"><span>Channels</span><b>→</b><span>Reactive state</span><b>→</b><span>Agent workspace</span></div>
    <p class="media-note">{{project.note}}</p>
    <div class="case-meta"><div><span>Organization</span>{{project.company}}</div><div><span>My contribution</span>{{project.role}}</div></div>
    <h3>The challenge</h3><p>{{project.challenge}}</p>
    <h3>Inside the build</h3><ol><li v-for="item in project.contributions" :key="item">{{item}}</li></ol>
    <div class="stack"><span v-for="tech in project.stack" :key="tech">{{tech}}</span></div>
    <h3>The product outcome</h3><p>{{project.result}}</p>
    <div class="dialog-links"><a v-if="project.url" :href="project.url" target="_blank" rel="noopener noreferrer">Visit {{project.title}} ↗</a><a v-for="link in project.links" :key="link[0]" :href="link[1]" target="_blank" rel="noopener noreferrer">{{link[0]}} ↗</a><a :href="`mailto:${contact.email}`">Discuss this project ↗</a></div>
   </template>
   <template v-else>
    <span class="eyebrow">THE PERSON BEHIND THE WORLDS</span><h2>Ali Haider</h2><p class="dialog-lead">Senior Frontend Engineer, Product Builder and Intevo Co-Founder.</p>
    <p>I build the interfaces between complex systems and the people who use them. My work spans enterprise applications, AI-related SaaS products and independent platforms.</p>
    <div class="career-line"><article><small>ENTERPRISE</small><h3>ibex</h3><p>Frontend engineering · Enteract Engage<br>Angular, TypeScript, RxJS and real-time interfaces.</p></article><article><small>PRODUCT BUILDING</small><h3>Intevo</h3><p>Co-Founder · Product development and frontend engineering, including Intevo Pulse.</p></article><article><small>FOUNDATIONS</small><h3>Voltro by Falkenherz</h3><p>Vue-based interfaces and booking experiences.</p></article></div>
    <div class="stack"><span v-for="skill in ['Angular','TypeScript','JavaScript','RxJS','Vue','Nuxt','State management','API integrations']" :key="skill">{{skill}}</span></div>
    <div class="dialog-links"><a :href="contact.resumeUrl" target="_blank">Read full résumé ↗</a><a :href="contact.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
   </template>
  </div>
 </dialog>
</template>
<script setup>
import {ref,onMounted,onBeforeUnmount} from 'vue';import {contact} from '../data/exhibition';
defineProps({project:Object});defineEmits(['close']);const dialog=ref();let previousFocus,previousOverflow;
function backdrop(e){if(e.target===dialog.value){const r=dialog.value.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.value.close();}}
function imageError(e){e.target.hidden=true;}
onMounted(()=>{previousFocus=document.activeElement;previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.value.showModal();});
onBeforeUnmount(()=>{document.body.style.overflow=previousOverflow;previousFocus?.focus();});
</script>
