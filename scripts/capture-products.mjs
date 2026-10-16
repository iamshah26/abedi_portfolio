import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
fs.mkdirSync('public/images/products',{recursive:true});
const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
for(const [name,url] of [['pulse','https://intevopulse.ai'],['raahee','https://raahee.pk'],['intevo','https://theintevo.com'],['thexperto','https://thexperto.com']]) {
 const page=await browser.newPage();await page.setViewport({width:1440,height:960,deviceScaleFactor:1});
 try { const response=await page.goto(url,{waitUntil:'networkidle2',timeout:25000}); await new Promise(r=>setTimeout(r,1800)); console.log(name,response.status(),(await page.title())); await page.screenshot({path:`public/images/products/${name}.webp`,type:'webp',quality:85}); }catch(e){console.log(name,e.message)}await page.close();
}
await browser.close();
