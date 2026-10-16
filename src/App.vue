<template>
 <div class="experience" :class="{'reading-mode':reading,'pearl':active===5&&!reading}" :style="{'--accent':chapters[active].color}">
  <a class="skip-link" href="#contact" @click.prevent="go(5)">Skip to contact</a>
  <header class="masthead"><a href="#introduction" class="wordmark" @click.prevent="go(0)">ALI HAIDER<span class="brand-dot">®</span></a><button class="menu-button" @click="openMenu" aria-haspopup="dialog">Menu <span>+</span></button></header>
  <WorldCanvas v-if="!reading" :progress="progress" :paused="panelOpen||menuOpen" @select="inspect" @failed="fallback" @ready="ready=true" />
  <div v-if="!reading" class="atmosphere" aria-hidden="true"></div>
  <main id="exhibition" ref="track" :class="{'cinematic-track':!reading}">
   <section v-for="(chapter,i) in chapters" :id="chapter.id" :key="chapter.id" class="chapter" :class="[`chapter-${i}`,{'is-active':active===i}]" :aria-hidden="!reading&&active!==i" :inert="!reading&&active!==i" :style="reading?{}:{opacity:chapterOpacity(i)}">
    <div class="chapter-copy">
     <div class="eyebrow"><span class="tiny-line"></span>{{chapter.label}}</div>
     <p v-if="i===1||i===2" class="project-name">{{i===1?'INTEVO PULSE':'RAAHEE'}}</p>
     <h1 v-if="i===0">{{chapter.title}}<br><em>{{chapter.italic}}</em></h1>
     <h2 v-else>{{chapter.title}}<br><em>{{chapter.italic}}</em></h2>
     <p class="chapter-description">{{chapter.description}}</p>
     <div class="chapter-actions">
      <button v-if="i===0" class="text-link" @click="go(1)">Enter the exhibition <span>↗</span></button>
      <button v-if="chapter.project" class="text-link" @click="inspect(chapter.project)">Explore {{i===3?'the engineering':i===4?'Intevo':'the project'}} <span>↗</span></button>
      <button v-if="i===4" class="text-link secondary" @click="inspect('thexperto')">TheXperto ↗</button>
      <a v-if="i===5" class="contact-cta" :href="`mailto:${contact.email}`">Start a conversation <span>↗</span></a>
     </div>
     <button v-if="i===4" class="about-link" @click="about">Meet the builder →</button>
     <div v-if="i===5" class="contact-links"><a :href="contact.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a :href="contact.github" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a :href="contact.resumeUrl" target="_blank">Résumé ↗</a></div>
     <p v-if="i===5" class="email-label">{{contact.email}}</p>
    </div>
    <div v-if="i===0&&!reading" class="art-caption"><span class="caption-rule"></span><span>THE SIGNAL<br><small>Ideas. Code. Possibility.</small></span></div>
    <figure v-if="reading&&chapter.project" class="reading-art"><img v-if="exhibits.find(p=>p.id===chapter.project)?.image" :src="exhibits.find(p=>p.id===chapter.project).image" :alt="`${chapter.name} public website`" loading="lazy"><div v-else class="system-diagram"><span>Events</span> → <span>State</span> → <span>Interface</span></div></figure>
   </section>
  </main>
  <div v-if="!reading" class="journey-footer"><div class="chapter-status"><span class="status-dot"></span>{{chapters[active].name}}</div><span class="scroll-instruction">{{active===5?'THE NEXT CHAPTER IS YOURS':'SCROLL TO EXPLORE'}} <span v-if="active!==5">↓</span></span><button @click="reading=true">Reading mode ↗</button><div class="journey-progress" :style="{transform:`scaleX(${progress})`}"></div></div>
  <div v-else class="reading-toolbar"><span>{{failed?'Lightweight exhibition':'Reading mode'}}</span><button v-if="!failed" @click="reading=false">Enter 3D experience ↗</button></div>
  <dialog ref="menu" class="menu-dialog" @close="menuOpen=false">
   <div class="menu-heading"><span class="eyebrow">CHOOSE YOUR WORLD</span><button class="close-button" autofocus @click="menu.close()">Close ×</button></div>
   <nav aria-label="Exhibition"><a v-for="(chapter,i) in chapters" :key="chapter.id" :href="`#${chapter.id}`" @click.prevent="go(i);menu.close()">{{chapter.name}}<span>↗</span></a><button @click="menu.close();about()">About Ali <span>↗</span></button></nav>
   <div class="menu-bottom"><a :href="`mailto:${contact.email}`">{{contact.email}}</a><button @click="reading=!reading;menu.close()">{{reading?'Enter 3D experience':'Switch to reading mode'}}</button></div>
  </dialog>
  <ProjectModal v-if="panelOpen" :project="selectedProject" @close="panelOpen=false" />
 </div>
</template>
<script setup>
import {ref,computed,onMounted,onBeforeUnmount,watch,defineAsyncComponent,nextTick} from 'vue';
import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';
import ProjectModal from './components/ProjectModal.vue';import {chapters,exhibits,contact} from './data/exhibition';
const WorldCanvas=defineAsyncComponent(()=>import('./components/WorldCanvas.vue'));gsap.registerPlugin(ScrollTrigger);
const track=ref(),menu=ref(),progress=ref(0),ready=ref(false),failed=ref(false),reading=ref(matchMedia('(prefers-reduced-motion: reduce)').matches),menuOpen=ref(false),panelOpen=ref(false),selectedProject=ref(null);
const active=computed(()=>Math.min(5,Math.round(progress.value*5)));let timeline,motionQuery,entry;
function chapterOpacity(i){const distance=Math.abs(progress.value*5-i);return Math.max(0,Math.min(1,(.5-distance)*5));}
function inspect(id){selectedProject.value=exhibits.find(p=>p.id===id);if(selectedProject.value)panelOpen.value=true;}
function about(){selectedProject.value=null;panelOpen.value=true;}
function fallback(){failed.value=true;reading.value=true;}
function openMenu(){menuOpen.value=true;menu.value.showModal();}
function go(i,instant=false){const id=chapters[i]?.id;if(!id)return;history.replaceState(null,'',`#${id}`);if(reading.value){document.getElementById(id)?.scrollIntoView({behavior:'auto'});progress.value=i/5;}else{const top=(document.documentElement.scrollHeight-innerHeight)*i/5;window.scrollTo({top,behavior:instant||motionQuery?.matches?'instant':'smooth'});}}
function setup(){timeline?.kill();ScrollTrigger.getById('world-journey')?.kill();if(reading.value)return;const state={p:0};timeline=gsap.timeline({scrollTrigger:{id:'world-journey',trigger:track.value,start:'top top',end:'bottom bottom',scrub:.65,invalidateOnRefresh:true},onUpdate:()=>progress.value=state.p});timeline.to(state,{p:1,duration:5,ease:'none'});ScrollTrigger.refresh();}
function hash(){const i=chapters.findIndex(c=>`#${c.id}`===location.hash);if(i>=0)go(i,true);}
function motionChanged(e){reading.value=e.matches;}
watch(reading,async()=>{await nextTick();setup();go(active.value,true);});
watch([panelOpen,menuOpen],([panel,open])=>{document.documentElement.style.overflow=panel||open?'hidden':'';});
onMounted(()=>{motionQuery=matchMedia('(prefers-reduced-motion: reduce)');motionQuery.addEventListener('change',motionChanged);setup();hash();window.addEventListener('hashchange',hash);if(!motionQuery.matches)entry=gsap.from('.chapter-0 .chapter-copy > *',{y:22,opacity:0,stagger:.1,duration:1.1,ease:'power3.out',clearProps:'all'});});
onBeforeUnmount(()=>{timeline?.scrollTrigger?.kill();timeline?.kill();entry?.kill();motionQuery?.removeEventListener('change',motionChanged);window.removeEventListener('hashchange',hash);document.documentElement.style.overflow='';});
</script>
