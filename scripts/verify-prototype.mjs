import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--use-gl=angle','--use-angle=d3d11','--ignore-gpu-blocklist']});
const report={desktop:[],mobile:[],errors:[],failedResources:[],productRequests:[]};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
try {
 for(const [name,width,height] of [['desktop',1440,900],['mobile',390,844]]){
  const page=await browser.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:5173')&&r.status()>=400)report.failedResources.push(r.url());});
  page.on('request',r=>{if(/images\/products|intevopulse/i.test(r.url()))report.productRequests.push(r.url());});
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}]);
  await page.setViewport({width,height,isMobile:width<500,hasTouch:width<500});
  await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle2'});
  await page.waitForFunction(()=>window.__signalPrototype?.webgl);await wait(1500);
  for(const p of [0,.25,.5,.75,1]){
   await page.evaluate(p=>scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*p,behavior:'instant'}),p);await wait(1500);
   const state=await page.evaluate(()=>window.__signalPrototype);report[name].push(state);
   assert(state.webgl&&state.triangles>1000);assert(Math.abs(state.progress-p)<.01);
   assert(!await page.evaluate(()=>/intevo|pulse|dashboard|voice agent/i.test(document.body.innerText)));
   await page.screenshot({path:`artifacts/prototype/${name}-${p*100}.png`});console.log(name,p,state.phase);
  }
  const start=report[name][0],middle=report[name][2],end=report[name][4];
  assert(Math.hypot(...middle.camera.map((v,i)=>v-start.camera[i]))>25);
  assert.notDeepEqual(start.quaternion,middle.quaternion);assert.equal(end.phase,'F · Selected Work');
  const target=end.artworkTargets[1];
  for(const [dx,dy] of [[0,0],[0,25],[20,0],[-20,0],[0,-25]]){
   if(width<500)await page.touchscreen.tap(target.x+dx,target.y+dy);else await page.mouse.click(target.x+dx,target.y+dy);
   await wait(200);if(await page.evaluate(()=>window.__signalPrototype.selectedArtwork>=0))break;
  }
  assert((await page.evaluate(()=>window.__signalPrototype.selectedArtwork))>=0);report[name+'Raycast']='Canvas artwork selection passed';
  await page.click('.artwork-selection button:first-child');await wait(1300);assert.equal(await page.evaluate(()=>window.__signalPrototype.selectedArtwork),0);await page.screenshot({path:`artifacts/prototype/${name}-interaction.png`});
  await page.click('.prototype-header button');await page.waitForSelector('.intro-menu[open]');await page.keyboard.press('Tab');assert(await page.evaluate(()=>document.querySelector('.intro-menu').contains(document.activeElement)));await page.keyboard.press('Escape');
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await wait(1500);
  const returned=await page.evaluate(()=>window.__signalPrototype.camera);assert(returned.every((v,i)=>Math.abs(v-start.camera[i])<.01));report[name+'Reversal']='Camera returns to original position';
  if(width<500){const cdp=await page.createCDPSession();await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:190,y:650}]});for(let y=630;y>=250;y-=20){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:190,y}]});await wait(20);}await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await cdp.detach();}else await page.mouse.wheel({deltaY:800});
  await wait(1200);assert((await page.evaluate(()=>window.__signalPrototype.progress))>.01);report[name+'NativeInput']='Native '+(width<500?'touch swipe':'wheel')+' advances the camera';
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await wait(500);await page.waitForSelector('.frame-selector');await page.click('.frame-selector button:last-child');await wait(400);assert.equal(await page.evaluate(()=>window.__signalPrototype.progress),1);await page.screenshot({path:`artifacts/prototype/${name}-reduced-motion.png`});report[name+'ReducedMotion']='Manual frame selection passed';
  await page.evaluate(()=>document.querySelector('.signal-stage canvas').getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());await page.waitForSelector('.signal-fallback');report[name+'ContextLoss']='Accessible personal fallback appears';await page.close();
 }
 assert.equal(report.errors.length,0);assert.equal(report.failedResources.length,0);assert.equal(report.productRequests.length,0);
 fs.writeFileSync('artifacts/prototype/verification.json',JSON.stringify(report,null,2));console.log('All personal-prototype checks passed');
} finally {await browser.close();}
