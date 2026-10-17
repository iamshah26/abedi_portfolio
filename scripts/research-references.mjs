import puppeteer from 'puppeteer-core';
const out=process.argv[2];import fs from "node:fs";
const b=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--use-gl=angle','--use-angle=d3d11','--ignore-gpu-blocklist']});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
for(const [name,url,steps] of [['drop','https://drop.peachworlds.com/',8],['itom','https://itomdev.com/',4]]){
 try{const p=await b.newPage();await p.setViewport({width:1280,height:800});
 await p.goto(url,{waitUntil:'networkidle2',timeout:60000});await wait(6000);
 const info=await p.evaluate(()=>({h:document.documentElement.scrollHeight,canv:document.querySelectorAll('canvas').length,text:document.body.innerText.slice(0,600)}));console.log(name,JSON.stringify(info));
 for(let i=0;i<steps;i++){await p.screenshot({path:`${out}/${name}-${i}.png`});for(let k=0;k<8;k++){await p.mouse.move(640,400);await p.mouse.wheel({deltaY:180});await wait(120);}await wait(1800);}
 await p.close();}catch(e){console.log(name,'ERR',e.message)}
}
await b.close();
// Article text extraction (Codrops blocks plain fetchers)
const b2=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
for(const [n,u] of [['aurel','https://tympanus.net/codrops/2025/05/20/behind-the-curtain-building-aurels-grand-theater-from-design-to-code/'],['campath','https://tympanus.net/codrops/2026/07/07/building-a-scroll-driven-3d-gallery-using-a-blender-camera-path-with-three-js-and-gsap/'],['cinematic','https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/'],['world','https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world-with-something-to-say/']]){
 try{const p=await b2.newPage();await p.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36');await p.goto(u,{waitUntil:'domcontentloaded',timeout:60000});await wait(2500);
 const t=await p.evaluate(()=>(document.querySelector('article')||document.body).innerText);fs.writeFileSync(`${out}/${n}.txt`,t);console.log(n,t.length);await p.close();}catch(e){console.log(n,'ERR',e.message)}
}
await b2.close();
