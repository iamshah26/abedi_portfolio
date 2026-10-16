<template>
  <div class="world-canvas" aria-hidden="true"><canvas ref="canvas" @pointermove="pointerMove" @pointerleave="pointerLeave" @click="select" /></div>
</template>
<script setup>
import {ref,onMounted,onBeforeUnmount,watch} from 'vue';
import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {buildWorld,curveLine} from '../experience/worlds';
const props=defineProps({progress:Number,paused:Boolean});const emit=defineEmits(['select','failed','ready']);const canvas=ref();
let renderer,scene,camera,environment,frame=0,previous=0,time=0,idleSince=0,lastProgress=-1,disposed=false,mobile=false,pixelRatio=1,slowFrames=0;
const worlds=new Map(),pointer=new THREE.Vector2(-20,-20),raycaster=new THREE.Raycaster(),position=new THREE.Vector3(),target=new THREE.Vector3();
const colors=['#080a12','#171125','#2a1827','#0c171e','#171125','#f6f1e9'];
let keyLight,fillLight;
function ensureWorld(i){if(i<0||i>5||worlds.has(i))return;const w=buildWorld(i,()=>{if(disposed){disposeWorld(w);return;}wake();});worlds.set(i,w);scene.add(w.group);}
function disposeWorld(w){w.group.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material]){m.map?.dispose();m.dispose();}}});}
function resize(){if(!renderer)return;mobile=innerWidth<800;renderer.setSize(innerWidth,innerHeight);pixelRatio=Math.min(devicePixelRatio,mobile?1.25:1.6);renderer.setPixelRatio(pixelRatio);camera.aspect=innerWidth/innerHeight;camera.fov=mobile?52:43;camera.updateProjectionMatrix();wake();}
function pointerMove(e){pointer.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);if(camera){raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects([...worlds.values()].flatMap(w=>w.group.visible?w.interactive:[]),true);canvas.value.style.cursor=hit.length?'pointer':'';}wake();}
function pointerLeave(){pointer.set(-20,-20);canvas.value.style.cursor='';}
function select(e){if(!renderer)return;pointer.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects([...worlds.values()].flatMap(w=>w.group.visible?w.interactive:[]),true);if(hits.length){let o=hits[0].object;while(o&&!o.userData.project)o=o.parent;if(o)emit('select',o.userData.project);}}
function wake(){idleSince=performance.now();if(!frame&&!document.hidden&&!props.paused&&!disposed)frame=requestAnimationFrame(render);}
function render(now){frame=0;if(disposed||document.hidden||props.paused)return;const delta=previous?now-previous:16;previous=now;time+=Math.min(delta,40)/1000;
 const p=props.progress*5,i=Math.min(4,Math.floor(p)),fraction=p-i,smooth=fraction*fraction*(3-2*fraction);
 ensureWorld(Math.round(p));ensureWorld(Math.round(p)+1);
 for(const [n,w] of worlds){w.group.visible=Math.abs(n-p)<.95;if(w.group.visible){for(const a of w.animated){if(a.type==='wave')a.object.scale.y=.65+.35*Math.sin(time*1.4+a.phase)**2;else {a.object.rotation.y=-.5+Math.sin(time*.18)*.06+(p-n)*.25;a.object.rotation.z=-.24+Math.sin(time*.13)*.035;}}}}
 // Each interval is an approach, a pass through the exhibit, then the next reveal.
 // Anchors share a single timeline with the DOM captions, avoiding mismatched chapters.
 const z=-32*p;const sway=Math.sin(fraction*Math.PI)*1.1;
 position.set(mobile?3.1:Math.sin(p*Math.PI)*.7+Math.sin(fraction*Math.PI)*2.3,mobile?-1.1:.65,z+(mobile?22:15)+sway);
 target.set(mobile?3.1:0,mobile?-2.9:.2,z-1);
 camera.position.copy(position);camera.lookAt(target);
 const c=new THREE.Color(colors[i]).lerp(new THREE.Color(colors[i+1]),smooth);scene.background.copy(c);scene.fog.color.copy(c);
 keyLight.color.set(p>4?'#fff1db':'#e7d9ff');fillLight.color.set(p>1.5&&p<2.8?'#ff826a':'#b28dff');
 scene.traverse(o=>{if(o.material?.uniforms?.time)o.material.uniforms.time.value=time;});
 renderer.render(scene,camera);
 // Read-only QA telemetry: the actual camera and draw workload, never a synthetic FPS claim.
 if(import.meta.env.DEV)window.__worlds={progress:props.progress,camera:camera.position.toArray(),target:target.toArray(),calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,pixelRatio,worlds:worlds.size};
 if(delta>32&&delta<200)slowFrames++;else slowFrames=Math.max(0,slowFrames-1);if(slowFrames>80&&pixelRatio>1){pixelRatio=1;renderer.setPixelRatio(1);slowFrames=0;}
 if(props.progress!==lastProgress){idleSince=now;lastProgress=props.progress;}
 // Settle the living sculpture after a short idle period, and stop all hidden rendering.
 if(now-idleSince<6500)frame=requestAnimationFrame(render);
}
function contextLost(e){e.preventDefault();emit('failed');}
function visibility(){previous=0;if(document.hidden){cancelAnimationFrame(frame);frame=0;}else wake();}
watch(()=>props.progress,wake);watch(()=>props.paused,paused=>{if(paused){cancelAnimationFrame(frame);frame=0;}else wake();});
onMounted(()=>{try{
 renderer=new THREE.WebGLRenderer({canvas:canvas.value,antialias:innerWidth>800,powerPreference:'default'});renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
 scene=new THREE.Scene();scene.background=new THREE.Color(colors[0]);scene.fog=new THREE.Fog(colors[0],18,36);camera=new THREE.PerspectiveCamera(43,1,.1,90);
 const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;room.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight('#e6dbff','#292039',.6));keyLight=new THREE.DirectionalLight('#e7d9ff',2);keyLight.position.set(3,8,5);scene.add(keyLight);fillLight=new THREE.DirectionalLight('#b28dff',1.4);fillLight.position.set(-8,2,-3);scene.add(fillLight);
 const signal=curveLine([[2,-3,5],[7,-2,-15],[1,-2,-32],[6,-3,-48],[3,-1,-64],[8,-2,-80],[3,-2,-96],[7,-2,-115],[3,-2,-128],[6,-2,-145],[3,0,-160]],'#b28dff',.025);scene.add(signal);
 ensureWorld(0);ensureWorld(1);resize();window.addEventListener('resize',resize);document.addEventListener('visibilitychange',visibility);canvas.value.addEventListener('webglcontextlost',contextLost);emit('ready');wake();
 }catch(error){console.warn('3D unavailable; accessible exhibition enabled.',error.message);emit('failed');}});
onBeforeUnmount(()=>{disposed=true;cancelAnimationFrame(frame);window.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',visibility);canvas.value?.removeEventListener('webglcontextlost',contextLost);if(scene)disposeWorld({group:scene});environment?.dispose();renderer?.dispose();if(import.meta.env.DEV)delete window.__worlds;});
</script>
