import * as THREE from 'three';

// A ruled, twisted ribbon surface: deliberately open, folded architecture.
export function ribbonGeometry(phase = 0, width = .6, segments = 240) {
 const positions=[],uvs=[],indices=[];
 for(let i=0;i<=segments;i++){
  const t=i/segments, a=t*Math.PI*2.15 + phase;
  const r=2.65 + .38*Math.sin(a*2.1);
  const center=new THREE.Vector3(Math.cos(a)*r,Math.sin(a)*2.8,Math.sin(a*1.8)*1.6);
  const side=new THREE.Vector3(Math.cos(a)*Math.cos(a*.7),Math.sin(a)*Math.cos(a*.7),Math.sin(a*.7)).normalize();
  for(let j=0;j<2;j++){const p=center.clone().addScaledVector(side,(j-.5)*width*(.12+.88*Math.sin(Math.PI*t)**.4));positions.push(...p);uvs.push(t,j);}
  if(i<segments){const k=i*2;indices.push(k,k+1,k+2,k+1,k+3,k+2);}
 }
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();return g;
}
export function signalMaterial(color){
 return new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{time:{value:0},color:{value:new THREE.Color(color)}},vertexShader:`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec2 vUv; uniform float time; uniform vec3 color; void main(){float head=pow(.5+.5*sin(vUv.x*60.-time*1.4),12.); gl_FragColor=vec4(color*(.7+head*1.1),.48+head*.5);}`});
}
export function curveLine(points,color,radius=.025){
 const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));
 return new THREE.Mesh(new THREE.TubeGeometry(curve,120,radius,6,false),signalMaterial(color));
}
export function plate(group,w,h,x,y,z,color='#222231'){
 const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,.12),new THREE.MeshStandardMaterial({color,metalness:.45,roughness:.35}));mesh.position.set(x,y,z);group.add(mesh);return mesh;
}
// Public page captures are texture assets, never regenerated dashboards.
export function screen(group,url,x,y,z,width=5.8,project,onReady){
 const mesh=plate(group,width,width*2/3,x,y,z,'#292238');
 const loader=new THREE.TextureLoader();loader.load(url,texture=>{texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;const plane=new THREE.Mesh(new THREE.PlaneGeometry(width-.12,width*2/3-.12),new THREE.MeshBasicMaterial({map:texture}));plane.position.z=.075;mesh.add(plane);onReady?.();},undefined,()=>{});
 mesh.userData.project=project;return mesh;
}
export function caption(group,title,subtitle,x,y,z,width=5){
 const c=document.createElement('canvas');c.width=1024;c.height=256;const ctx=c.getContext('2d');ctx.clearRect(0,0,1024,256);ctx.fillStyle='#f6f1e9';ctx.font='500 55px sans-serif';ctx.fillText(title,28,94);ctx.fillStyle='#a7a5b4';ctx.font='24px monospace';ctx.fillText(subtitle,30,160);const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;const mesh=new THREE.Mesh(new THREE.PlaneGeometry(width,width/4),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}));mesh.position.set(x,y,z);group.add(mesh);return mesh;
}
export function buildWorld(index,onReady){
 const group=new THREE.Group();group.position.z=-index*32;const interactive=[],animated=[];
 const metal=new THREE.MeshPhysicalMaterial({color:'#b6a0db',metalness:.92,roughness:.2,clearcoat:1,iridescence:.35,side:THREE.DoubleSide});
 if(index===0 || index===5){
  const sculpture=new THREE.Group();sculpture.position.set(index===0?3:3.6,.35,0);sculpture.rotation.set(.16,-.5,-.24);
  for(let i=0;i<4;i++){const mat=metal.clone();mat.color.set(index===5?'#bca17d':i%3===0?'#e5c9d9':'#9c7ed4');const mesh=new THREE.Mesh(ribbonGeometry(0,.65,260),mat);mesh.scale.setScalar(1+i*.14);sculpture.add(mesh);}
  group.add(sculpture);animated.push({type:'sculpture',object:sculpture});
 } else if(index===1){
  const s=screen(group,'/images/products/pulse.webp',3,1.1,0,6.8,'intevo-pulse',onReady);s.rotation.y=-.18;interactive.push(s);
  for(let i=0;i<60;i++){const h=.2+Math.pow(Math.sin(i*.43),2)*1.5;const bar=plate(group,.055,h,0+(i/60)*7,-2.2,.8,i%4?'#b28dff':'#70d9ca');animated.push({type:'wave',object:bar,phase:i*.35});}
  caption(group,'INTEVO PULSE','VOICE AUTOMATION / A PRODUCT BY INTEVO',3,3.8,0,6);
  group.add(curveLine([[-4,-1,4],[0,-3,1],[5,-3,-2],[8,0,-8]],'#70d9ca'));
 } else if(index===2){
  for(let layer=0;layer<5;layer++){
   const shape=new THREE.Shape();shape.moveTo(-14,-5);for(let x=-14;x<=14;x+=.35){const y=-2+Math.sin(x*.55+layer)*1.15+Math.sin(x*1.3+layer*.7)*.5;shape.lineTo(x,y);}shape.lineTo(14,-7);shape.closePath();
   const mesh=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:.65,bevelEnabled:false}),new THREE.MeshStandardMaterial({color:['#a16a6c','#805164','#613e59','#442e4b','#30233d'][layer],roughness:.95}));mesh.position.set(1,layer*.65,-layer*2);group.add(mesh);
  }
  const route=curveLine([[-7,-1,2],[-3,-1.4,1],[0,-.3,0],[3,-.65,-2],[6,1,-5],[10,1.4,-8]],'#e8c99b',.035);group.add(route);
  const s=screen(group,'/images/products/raahee.webp',3.3,1.5,1,6,'raahee-pk',onReady);s.rotation.y=-.17;interactive.push(s);caption(group,'RAAHEE','DISCOVERY → ITINERARY → BOOKING',3.3,4,0,5.5);
 } else if(index===3){
  const labels=['CHANNELS','REACTIVE STATE','AGENT WORKSPACE','LIVE EVENTS','API LAYER'];
  const coords=[[0,2,-2],[3.4,1,1],[6.7,2,-2],[1,-1.8,0],[5.7,-1.8,0]];
  coords.forEach(([x,y,z],i)=>{const p=plate(group,2.6,1.55,x,y,z,'#202b31');p.userData.project='enteract-engage';interactive.push(p);const c=document.createElement('canvas');c.width=768;c.height=448;const ctx=c.getContext('2d');ctx.fillStyle='#152329';ctx.fillRect(0,0,768,448);ctx.strokeStyle='#35534f';ctx.strokeRect(3,3,762,442);ctx.fillStyle='#cfebe5';ctx.font='26px sans-serif';ctx.fillText(labels[i],36,60);ctx.fillStyle='#70d9ca';ctx.font='15px monospace';ctx.fillText('SCHEMATIC / '+['INPUT','STORE','VIEW','STREAM','INTEGRATION'][i],36,96);for(let row=0;row<4;row++){ctx.fillStyle=row===i%4?'#254741':'#1c3036';ctx.fillRect(35,125+row*67,696,50);ctx.fillStyle='#6a8c88';ctx.fillRect(55,142+row*67,110+row*40,6);ctx.fillStyle='#70d9ca';ctx.fillRect(650,139+row*67,40,12);}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const ui=new THREE.Mesh(new THREE.PlaneGeometry(2.56,1.49),new THREE.MeshBasicMaterial({map:t}));ui.position.z=.075;p.add(ui);group.add(curveLine([[3.4,1,1],[x,1,z],[x,y,z]],'#70d9ca',.018));});
  caption(group,'ENTERACT ENGAGE','ANGULAR / TYPESCRIPT / RXJS / SIGNALR',3.4,4,0,6.3);
 } else if(index===4){
  const a=screen(group,'/images/products/intevo.webp',1.2,1,-1,4.5,'intevo',onReady);a.rotation.y=.18;
  const b=screen(group,'/images/products/thexperto.webp',6,.3,1,4.5,'thexperto',onReady);b.rotation.y=-.22;interactive.push(a,b);
  caption(group,'INTEVO','THE COMPANY',1.2,3.3,-1,3.7);caption(group,'THEXPERTO','THE SERVICES PLATFORM',6,2.7,1,3.7);
  group.add(curveLine([[-3,-2,3],[1,-2.5,0],[6,-2,-1],[10,-1,-5]],'#e8c99b'));
 }
 // Architectural plinth anchors each world; quiet depth rather than random particles.
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(70,30),new THREE.MeshBasicMaterial({color:index===5?'#e9dfd3':'#0b0a12'}));floor.rotation.x=-Math.PI/2;floor.position.set(0,-4,-4);group.add(floor);
 return {group,interactive,animated};
}
