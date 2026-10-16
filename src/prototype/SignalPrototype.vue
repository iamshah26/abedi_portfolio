<template>
 <div class="signal-prototype">
  <header class="prototype-header"><a href="#arrival" @click.prevent="jump(0)">ALI HAIDER</a><button @click="openMenu" aria-haspopup="dialog">MENU <span>+</span></button></header>
  <div ref="stage" class="signal-stage"><canvas ref="canvas" @pointermove="pointerMove" @click="select" aria-label="An interactive sculptural journey through Ali Haider’s portfolio"></canvas></div>
  <div class="signal-grain" aria-hidden="true"></div>
  <main ref="track" class="signal-track" :class="{'still-track':reduced||failed}" aria-label="Ali Haider — personal portfolio introduction">
   <h1 class="prototype-sr">Ali Haider — Creative Software Engineer — Selected Work</h1>
   <div class="signal-caption" :style="{opacity:captionOpacity}" aria-live="polite"><span>{{caption.label}}</span><p class="arrival-title" v-if="caption.title">{{caption.title}}</p><p>{{caption.subtitle}}</p></div>
   <div class="identity-reveal" :style="{opacity:nameOpacity,transform:`translateY(${(1-nameOpacity)*18}px)`}" :aria-hidden="nameOpacity<.2"><span>CREATIVE SOFTWARE ENGINEER</span><strong>ALI HAIDER</strong></div>
   <nav v-if="progress>.93&&!failed" class="artwork-selection" aria-label="Select a sculptural artwork"><button v-for="(name,i) in artworkNames" :key="name" @click="chooseArtwork(i)" :aria-pressed="selection===i">{{name}} <span>↗</span></button></nav>
   <div v-if="failed" class="signal-fallback"><h2>Ali Haider</h2><p>Creative software engineer. Creating digital worlds through code.</p><p>Form. Structure. Possibility.</p><a href="mailto:haiderabedi26@gmail.com">Start a conversation ↗</a></div>
  </main>
  <footer class="prototype-footer"><span>{{phase}}</span><span v-if="!reduced&&!failed">{{progress>.98?'SCROLL BACK TO REVISIT':'SCROLL TO DISCOVER'}} <b>↓</b></span><button @click="toggleMotion">{{reduced?'Enable cinematic motion':'Still-frame mode'}}</button><i :style="{transform:`scaleX(${progress})`}"></i></footer>
  <div v-if="reduced&&!failed" class="frame-selector" aria-label="Still frame selection"><p>Reduced motion · explore at your own pace</p><button v-for="(value,i) in [0,.25,.4,.6,.8,1]" :key="i" @click="jump(value)" :aria-pressed="Math.abs(progress-value)<.01">{{'ABCDEF'[i]}}</button></div>
  <dialog ref="dialog" class="intro-menu" @close="resume" aria-labelledby="menu-title"><div class="intro-menu-top"><h2 id="menu-title">Explore the introduction</h2><button autofocus @click="dialog.close()">Close ×</button></div><nav aria-label="Introduction chapters"><button v-for="(item,i) in phases" :key="item[1]" @click="dialog.close();jump([0,.25,.4,.6,.8,1][i])">{{item[1].slice(4)}} <span>↗</span></button></nav><button class="menu-motion" @click="dialog.close();toggleMotion()">{{reduced?'Enable cinematic motion':'Still-frame mode'}}</button></dialog>
 </div>
</template>
<script setup>
import {ref,computed,onMounted,onBeforeUnmount,watch} from 'vue';
import * as THREE from 'three';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {createChamber,createPaths,phaseAt,smooth,phases,artworkNames} from './scene';
import './prototype.css';

gsap.registerPlugin(ScrollTrigger);
const canvas=ref(),stage=ref(),track=ref(),dialog=ref();
const progress=ref(0),failed=ref(false),reduced=ref(matchMedia('(prefers-reduced-motion: reduce)').matches);
const selection=ref(-1),interaction={value:0};let selectionTween;
const phase=computed(()=>phaseAt(progress.value));
const nameOpacity=computed(()=>smooth(.12,.2,progress.value)*(1-smooth(.29,.37,progress.value)));
const caption=computed(()=>progress.value<.15?{label:'THE WORLD OF ALI HAIDER',title:'An idea takes shape.',subtitle:'Creating digital worlds through code.'}:progress.value<.5?{label:'FORM BECOMES POSSIBILITY',title:'',subtitle:'A different way of seeing.'}:progress.value<.7?{label:'INSIDE THE IMAGINATION',title:'',subtitle:'Complexity, shaped with intent.'}:progress.value<.9?{label:'A PRACTICE OF MAKING',title:'',subtitle:'Form. Structure. Possibility.'}:{label:selection.value>=0?artworkNames[selection.value].toUpperCase():'SELECTED WORK',title:'',subtitle:selection.value>=0?['The shape of an idea.','Clarity within complexity.','A world waiting to be built.'][selection.value]:'Ideas, shaped into experiences.'});
const captionOpacity=computed(()=>progress.value<.15?1:progress.value<.39?.7:progress.value>.9?smooth(.9,.96,progress.value):.8);
let renderer,scene,camera,composer,bloom,environment,chamber,timeline,frame=0,lastTime=0,elapsed=0,paused=false,disposed=false,idle=0,slow=0;
let effectsEnabled=true,lowFpsWindows=0;
let width=0,height=0,mobile=false,dpr=1,frames=0,sampleStart=0,fps=0,drawCalls=0,triangles=0;
const paths=createPaths(),look=new THREE.Vector3(),mouse=new THREE.Vector2(),ray=new THREE.Raycaster();
let previousFocus,motionQuery;
function setupScroll(){timeline?.scrollTrigger?.kill();timeline?.kill();if(reduced.value||failed.value)return;const state={p:0};timeline=gsap.to(state,{p:1,ease:'none',scrollTrigger:{trigger:track.value,start:'top top',end:'bottom bottom',scrub:.7,invalidateOnRefresh:true},onUpdate(){progress.value=state.p;wake();}});ScrollTrigger.refresh();}
function jump(value){if(reduced.value){progress.value=value;wake();}else window.scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*value,behavior:'smooth'});}
function toggleMotion(){reduced.value=!reduced.value;}
function fail(){failed.value=true;cancelAnimationFrame(frame);frame=0;timeline?.scrollTrigger?.kill();}
function resize(){if(!renderer)return;width=innerWidth;height=innerHeight;mobile=width<760;dpr=Math.min(devicePixelRatio,mobile?1.25:1.5);renderer.setSize(width,height);renderer.setPixelRatio(dpr);camera.aspect=width/height;camera.fov=mobile?60:49;camera.updateProjectionMatrix();if(composer){composer.setPixelRatio(dpr);composer.setSize(width,height);}wake();}
function wake(){idle=performance.now();if(!frame&&!paused&&!document.hidden&&!disposed&&!failed.value)frame=requestAnimationFrame(render);}
function render(now){frame=0;if(paused||disposed||document.hidden||failed.value)return;
 const delta=lastTime?now-lastTime:16.7;lastTime=now;elapsed+=Math.min(delta,50)/1000;
 const p=progress.value;camera.position.copy((mobile?paths.mobile:paths.desktop).getPoint(p));look.copy(paths.target.getPoint(p));camera.lookAt(look);
 chamber.update(p,reduced.value?0:elapsed,selection.value,interaction.value,mobile);
 scene.background.set('#090912').lerp(new THREE.Color('#1a1029'),smooth(.35,.65,p)*.45);scene.fog.color.copy(scene.background);
 renderer.info.reset();if(composer&&!mobile&&effectsEnabled)composer.render();else renderer.render(scene,camera);
 drawCalls=renderer.info.render.calls;triangles=renderer.info.render.triangles;
 if(!sampleStart)sampleStart=now;
 frames++;if(now-sampleStart>700){fps=Math.round(frames*1000/(now-sampleStart));frames=0;sampleStart=now;if(!mobile&&fps<40)lowFpsWindows++;else lowFpsWindows=Math.max(0,lowFpsWindows-1);if(lowFpsWindows>=2){effectsEnabled=false;if(fps<35&&dpr>.75){dpr=Math.max(.75,dpr*.85);renderer.setPixelRatio(dpr);composer?.setPixelRatio(dpr);}}}
 if(delta>33&&delta<150)slow++;else slow=Math.max(0,slow-1);if(slow>70&&dpr>.75){dpr=Math.max(.75,dpr*.85);renderer.setPixelRatio(dpr);composer?.setPixelRatio(dpr);slow=0;}
 if(import.meta.env.DEV)window.__signalPrototype={progress:p,phase:phaseAt(p),camera:camera.position.toArray(),target:look.toArray(),quaternion:camera.quaternion.toArray(),viewport:{width,height},webgl:!renderer.getContext().isContextLost(),fps,drawCalls,triangles,pixelRatio:dpr,mobile,postProcessing:!mobile&&effectsEnabled,reducedMotion:reduced.value,selectedArtwork:selection.value,interaction:interaction.value,artworkTargets:chamber.artworks.map(a=>{const v=a.group.position.clone().project(camera);return {x:(v.x+1)*width/2,y:(1-v.y)*height/2};})};
 if(!reduced.value&&now-idle<8000)frame=requestAnimationFrame(render);
}
function hitArtwork(e){if(!renderer||!chamber)return -1;mouse.set(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2);ray.setFromCamera(mouse,camera);const hits=ray.intersectObjects(chamber.artworks.map(a=>a.group),true);return hits.length?hits[0].object.userData.artwork:-1;}
function pointerMove(e){canvas.value.style.cursor=progress.value>.8&&hitArtwork(e)>=0?'pointer':'';}
function select(e){const index=hitArtwork(e);if(progress.value>.8&&index>=0)chooseArtwork(index);}
function chooseArtwork(index){selection.value=index;selectionTween?.kill();interaction.value=0;selectionTween=gsap.to(interaction,{value:1,duration:reduced.value?0:1.2,ease:'power3.out',onUpdate:wake});wake();}
function openMenu(){previousFocus=document.activeElement;paused=true;cancelAnimationFrame(frame);frame=0;document.body.style.overflow='hidden';dialog.value.showModal();}
function resume(){document.body.style.overflow='';paused=false;previousFocus?.focus();wake();}
function visibility(){if(document.hidden){cancelAnimationFrame(frame);frame=0;}else{lastTime=0;wake();}}
function contextLost(e){e.preventDefault();fail();}
function motionChanged(e){reduced.value=e.matches;}
watch(reduced,()=>{requestAnimationFrame(()=>{setupScroll();wake();});});
onMounted(async()=>{
 try {
  renderer=new THREE.WebGLRenderer({canvas:canvas.value,antialias:true,powerPreference:'high-performance'});renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.85;renderer.info.autoReset=false;
  scene=new THREE.Scene();scene.background=new THREE.Color('#090912');scene.fog=new THREE.FogExp2('#090912',.018);camera=new THREE.PerspectiveCamera(49,1,.1,120);
  const room=new RoomEnvironment(),pmrem=new THREE.PMREMGenerator(renderer);environment=pmrem.fromScene(room,.035);scene.environment=environment.texture;room.dispose();pmrem.dispose();
  scene.add(new THREE.HemisphereLight('#d8c7f0','#090912',.5));
  for(const [color,intensity,pos] of [['#f4e9ff',1.8,[2,12,10]],['#a78bfa',1.4,[-10,3,3]],['#61d8ce',1.5,[8,2,-8]]]){const light=new THREE.DirectionalLight(color,intensity);light.position.set(...pos);scene.add(light);}
  for(const z of [-5,-20,-40]){const light=new THREE.PointLight(z===-5?'#a78bfa':'#61d8ce',45,22,2);light.position.set(0,3,z);scene.add(light);}
  chamber=createChamber(scene,innerWidth<760);
  composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),.1,.3,8);composer.addPass(bloom);composer.addPass(new OutputPass());
  resize();setupScroll();motionQuery=matchMedia('(prefers-reduced-motion: reduce)');motionQuery.addEventListener('change',motionChanged);window.addEventListener('resize',resize);document.addEventListener('visibilitychange',visibility);canvas.value.addEventListener('webglcontextlost',contextLost);
  await renderer.compileAsync(scene,camera);if(!disposed)wake();
 }catch(e){console.warn('Signal prototype fallback:',e.message);fail();}
});
onBeforeUnmount(()=>{disposed=true;selectionTween?.kill();cancelAnimationFrame(frame);timeline?.scrollTrigger?.kill();timeline?.kill();window.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',visibility);motionQuery?.removeEventListener('change',motionChanged);canvas.value?.removeEventListener('webglcontextlost',contextLost);scene?.traverse(o=>{o.geometry?.dispose();for(const m of o.material?(Array.isArray(o.material)?o.material:[o.material]):[]){m.map?.dispose();m.dispose();}});composer?.passes.forEach(p=>p.dispose?.());composer?.dispose();environment?.dispose();renderer?.dispose();document.body.style.overflow='';if(import.meta.env.DEV)delete window.__signalPrototype;});
</script>
