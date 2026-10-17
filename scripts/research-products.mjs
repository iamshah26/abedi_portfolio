// Pulls rendered public text from live product sites to verify portfolio claims.
import puppeteer from 'puppeteer-core';import fs from 'node:fs';
const out=process.argv[2];const wait=ms=>new Promise(r=>setTimeout(r,ms));
const b=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
for(const [n,u] of [['pulse','https://intevopulse.ai'],['raahee','https://raahee.pk'],['thexperto','https://thexperto.com'],['intevo','https://theintevo.com']]){
 try{const p=await b.newPage();await p.setViewport({width:1440,height:900});await p.goto(u,{waitUntil:'networkidle2',timeout:60000});await wait(3000);
 for(let y=0;y<12;y++){await p.evaluate(()=>scrollBy(0,900));await wait(300);}
 const t=await p.evaluate(()=>document.body.innerText);fs.writeFileSync(`${out}/${n}-site.txt`,t);console.log(n,t.length);await p.close();}catch(e){console.log(n,'ERR',e.message)}
}
await b.close();
