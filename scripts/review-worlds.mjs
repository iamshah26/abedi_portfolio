import puppeteer from 'puppeteer-core';import fs from 'node:fs';
const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist','--use-gl=angle','--use-angle=d3d11']});
const page=await browser.newPage();const errors=[];page.on('console',m=>console.log(m.type(),m.text()));page.on('pageerror',e=>errors.push(e.message));await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}]);await page.setViewport({width:1440,height:900});await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle2'});await new Promise(r=>setTimeout(r,2200));fs.mkdirSync('artifacts/worlds',{recursive:true});
for(let i=0;i<6;i++){await page.evaluate(i=>window.scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*i/5,behavior:'instant'}),i);await new Promise(r=>setTimeout(r,1500));await page.screenshot({path:`artifacts/worlds/desktop-${i}.png`});console.log(i,await page.evaluate(()=>window.__worlds));}
await page.setViewport({width:390,height:844,isMobile:true,hasTouch:true});await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await new Promise(r=>setTimeout(r,1800));await page.screenshot({path:'artifacts/worlds/mobile-0.png'});console.log('errors',errors);await browser.close();


