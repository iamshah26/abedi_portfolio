import * as THREE from 'three';

export const phases = [[0,'A · Arrival'],[.15,'B · Identity'],[.3,'C · Transformation'],[.5,'D · Immersion'],[.7,'E · Discovery'],[.9,'F · Selected Work']];
export const phaseAt = p => [...phases].reverse().find(([at]) => p >= at)[1];
export const smooth = (a,b,p) => THREE.MathUtils.smoothstep(p,a,b);
const vector = points => points.map(p => new THREE.Vector3(...p));
const desktop = [[7,3,24],[6,2.8,19],[2.5,1.3,10],[.4,.6,2],[-1.3,1,-7],[-2.5,1.6,-18],[1.8,2,-27],[2,1.8,-32],[0,1.6,-33]];
const mobile = [[2.6,2,34],[2,2,27],[.8,1.2,16],[0,.7,3],[-.5,.8,-7],[-.8,1.2,-17],[.4,1.7,-24],[.5,1.8,-29],[0,1.9,-29]];
const targets = [[0,.5,-5],[0,.8,-6],[0,1,-8],[-.4,1.2,-12],[-2,1.2,-21],[0,1.7,-32],[0,1.8,-44],[0,1.8,-48],[0,1.8,-48]];
export function createPaths(){return {desktop:new THREE.CatmullRomCurve3(vector(desktop),false,'catmullrom',.35),mobile:new THREE.CatmullRomCurve3(vector(mobile),false,'catmullrom',.35),target:new THREE.CatmullRomCurve3(vector(targets),false,'catmullrom',.3)};}

// A rounded solid section swept along an authored architectural curve.
function blade(points,material,width=.14,thickness=.28){
 const path=new THREE.CatmullRomCurve3(vector(points));
 const shape=new THREE.Shape(),w=width/2,h=thickness/2,r=Math.min(w,h)*.4;
 shape.moveTo(-w+r,-h);shape.lineTo(w-r,-h);shape.quadraticCurveTo(w,-h,w,-h+r);
 shape.lineTo(w,h-r);shape.quadraticCurveTo(w,h,w-r,h);shape.lineTo(-w+r,h);
 shape.quadraticCurveTo(-w,h,-w,h-r);shape.lineTo(-w,-h+r);shape.quadraticCurveTo(-w,-h,-w+r,-h);
 return new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{steps:48,bevelEnabled:false,extrudePath:path,curveSegments:3}),material);
}
function lightMaterial(color){return new THREE.ShaderMaterial({
 uniforms:{time:{value:0},color:{value:new THREE.Color(color)},reveal:{value:1}},
 vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:'uniform float time;uniform vec3 color;uniform float reveal;varying vec2 vUv;void main(){float pulse=pow(.5+.5*sin(vUv.x*28.-time*.7),10.);gl_FragColor=vec4(color*(.7+pulse*1.3),reveal);}',
 transparent:true,depthWrite:false
});}
function lightSeam(points,color,radius=.018){return new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(vector(points)),120,radius,6,false),lightMaterial(color));}
function spatialType(text,width=7,size=112){
 const canvas=document.createElement('canvas');canvas.width=1536;canvas.height=256;
 const ctx=canvas.getContext('2d');ctx.fillStyle='#f4f0e9';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`400 ${size}px Arial`;ctx.fillText(text,768,128);
 const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;
 return new THREE.Mesh(new THREE.PlaneGeometry(width,width/6),new THREE.MeshBasicMaterial({map,transparent:true,depthWrite:false,side:THREE.DoubleSide}));
}
// An open, double-curved pleat; neither a closed primitive nor a flat plane.
function foldedSurface(seed=0){
 const positions=[],uvs=[],indices=[],segments=90;
 for(let i=0;i<=segments;i++){
  const t=i/segments,a=t*Math.PI*1.8;
  const center=new THREE.Vector3((t-.5)*4.6,Math.sin(a+seed)*1.25,Math.cos(a*.7)*.8);
  const side=new THREE.Vector3(Math.sin(a*.7)*.35,Math.cos(a*.85),Math.sin(a*.85)).normalize();
  const width=.25+1.05*Math.sin(Math.PI*t);
  for(let j=0;j<=8;j++){const v=j/8-.5;const p=center.clone().addScaledVector(side,v*width);p.z+=Math.sin(v*Math.PI)*.18;positions.push(...p);uvs.push(t,j/8);if(i<segments&&j<8){const k=i*9+j;indices.push(k,k+1,k+9,k+1,k+10,k+9);}}
 }
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}
export const artworkNames=['Form','Structure','Possibility'];
export function createChamber(scene,mobile){
 const fins=[],seams=[],artworks=[];
 const silver=new THREE.MeshPhysicalMaterial({color:'#b8aacb',metalness:.88,roughness:.32,clearcoat:.7,envMapIntensity:.5,side:THREE.DoubleSide,forceSinglePass:true});
 const orchid=silver.clone();orchid.color.set('#8269a3');const aqua=silver.clone();aqua.color.set('#548c8d');
 const shell=new THREE.Group();scene.add(shell);
 const count=mobile?22:32;
 for(let i=0;i<count;i++){
  const t=i/(count-1),z=3-t*17;
  for(const side of [-1,1]){
   const crest=5.2+Math.sin(t*Math.PI)*1.5;
   const points=[[side*5.8,-4.5,z],[side*6.1,-1,z-.4],[side*5.3,2.7,z-.7],[side*3.2,crest,z-1.1],[side*.6,crest-.6,z-1.5]];
   const mesh=blade(points,i%5===0?(side<0?orchid:aqua):silver);shell.add(mesh);fins.push({mesh,side,t});
  }
 }
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(80,140),new THREE.MeshBasicMaterial({color:'#0c0a14'}));floor.rotation.x=-Math.PI/2;floor.position.set(0,-4.6,-25);scene.add(floor);
 for(const x of [-7,7]){
  const seam=lightSeam([[x,-4.52,14],[x,-4.52,-8],[x*.65,-4.52,-30],[x*.9,-4.52,-58]],'#716087');scene.add(seam);seams.push(seam.material);
 }
 // The original lamella motif resolves into a curved passage of broad metallic folds.
 const passage=new THREE.Group();scene.add(passage);
 const passageMaterials=[silver,orchid,aqua].map(m=>{const clone=m.clone();clone.transparent=true;return clone;});
 for(let i=0;i<(mobile?14:22);i++){
  const t=i/(mobile?13:21),z=-13-t*25;
  for(const side of [-1,1]){
   const x=side*(7+Math.sin(t*Math.PI)*1.2);
   const fold=blade([[x,-4.6,z],[x+side*.6,-1,z-.8],[x-side*1.1,3.8,z-1.6],[side*2.6,5.6,z-3.7]],i%4===0?passageMaterials[2]:(i%3===0?passageMaterials[1]:passageMaterials[0]),.22,.4);
   passage.add(fold);
  }
 }
 const vaultedLight=lightSeam([[-7,3,-14],[-3,6.5,-21],[3,6.5,-29],[7,3,-37]],'#a78bfa',.026);passage.add(vaultedLight);seams.push(vaultedLight.material);
 // Floating compositions express the practice of making: form, structure, possibility.
 const gallery=new THREE.Group();scene.add(gallery);
 const bases=[[-5.8,.5,-48],[0,.3,-50],[5.8,.6,-48]];
 for(let n=0;n<3;n++){
  const group=new THREE.Group();group.position.set(...bases[n]);const material=(n===0?orchid:n===1?silver:aqua).clone();material.transparent=true;
  for(let i=0;i<7;i++){
   const mesh=new THREE.Mesh(foldedSurface(n*.35),material);mesh.position.y=(i-3)*.17;mesh.rotation.x=(i-3)*.035;mesh.userData.artwork=n;group.add(mesh);
  }
  group.rotation.set(.35,n===0?.35:n===1?-.3:-.35,n===0?.65:n===1?-.65:.5);
  gallery.add(group);const label=spatialType(artworkNames[n].toUpperCase(),2.8,70);label.position.set(bases[n][0],-2.5,bases[n][2]);gallery.add(label);
  artworks.push({group,material,label,base:group.position.clone(),rotation:group.rotation.clone()});
 }
 const selected=spatialType('SELECTED',8,155),work=spatialType('WORK',8,155);gallery.add(selected,work);
 const signature=spatialType('ALI HAIDER — CREATIVE SOFTWARE ENGINEER',9,45);signature.position.set(0,6.8,-50);gallery.add(signature);
 return {
  artworks,
  update(p,time,selection=-1,interaction=0,isMobile=mobile){
   const opening=smooth(.27,.52,p);shell.visible=p<.67;
   for(const {mesh,side,t} of fins){mesh.position.set(side*opening*(2.8+t*2),opening*t*1.2,-smooth(.4,.68,p)*t*5);mesh.rotation.z=-side*opening*.22;mesh.rotation.y=side*smooth(.32,.55,p)*.13;}
   passage.visible=p>.25&&p<.97;passageMaterials.forEach(m=>m.opacity=smooth(.25,.43,p)*(1-smooth(.88,.97,p)));passage.rotation.y=Math.sin(smooth(.35,.7,p)*Math.PI)*.035;
   gallery.visible=p>.62;const assemble=smooth(.68,.94,p),titleReveal=smooth(.88,.99,p);
   for(let n=0;n<artworks.length;n++){
    const {group,base,rotation,material,label}=artworks[n];group.position.copy(base);
    // Narrow framing stacks side studies behind the central piece instead of cropping them.
    if(isMobile){group.position.x=n===1?0:(n===0?-2.1:2.1);group.position.y=n===1?.3:1;group.position.z=n===1?-48:-54;label.position.set(group.position.x,-2.5,group.position.z);group.scale.setScalar(n===1?1.2:.75);}else{label.position.set(base.x,-2.5,base.z);group.scale.setScalar(1);}
    material.opacity=smooth(.62,.73,p);label.material.opacity=smooth(.65,.76,p);
    group.position.y+=(1-assemble)*(n===1?-5:5);group.rotation.copy(rotation);group.rotation.y+=(1-assemble)*(n-1)*.7;
    if(n===selection){group.rotation.y+=interaction*.65;group.rotation.z+=interaction*.12;group.scale.multiplyScalar(1+interaction*.12);material.emissive.set('#38214e');material.emissiveIntensity=interaction*.25;}else material.emissiveIntensity=0;
   }
   selected.position.set(isMobile?0:-1.4-(1-titleReveal)*5,isMobile?5.4:4.8,-49+(1-titleReveal)*2);
   work.position.set(isMobile?0:2.5+(1-titleReveal)*5,isMobile?4.1:4.8,-49+(1-titleReveal)*3);
   selected.scale.setScalar(1);work.scale.setScalar(isMobile?.8:1);
   selected.material.opacity=titleReveal;work.material.opacity=titleReveal;signature.material.opacity=titleReveal*.65;
   signature.visible=!isMobile;
   seams.forEach(m=>{m.uniforms.time.value=time;m.uniforms.reveal.value=1-smooth(.85,1,p)*.8;});
  }
 };
}
