import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const executablePath = fs.existsSync(CHROME_PATH) ? CHROME_PATH : EDGE_PATH;

const outputDir = path.resolve('public', 'review-screenshots');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function runReview() {
  console.log('Launching browser with:', executablePath);
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // 1. Desktop 1440px Viewport Screenshot (Hero Viewport)
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '01-desktop-hero-1440.png') });
  console.log('Captured 01-desktop-hero-1440.png');

  // 2. Desktop Full Page
  await page.screenshot({ path: path.join(outputDir, '02-desktop-fullpage.png'), fullPage: true });
  console.log('Captured 02-desktop-fullpage.png');

  // 3. Tablet 768px Viewport
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '03-tablet-768.png'), fullPage: true });
  console.log('Captured 03-tablet-768.png');

  // 4. Mobile 390px (iPhone 14) Viewport
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '04-mobile-390.png'), fullPage: true });
  console.log('Captured 04-mobile-390.png');

  // 5. Test Interactive Inside the Build Simulator
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4173/#build', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  
  // Click Trigger Event button
  const triggerBtn = await page.$('.btn-trigger');
  if (triggerBtn) {
    await triggerBtn.click();
    await new Promise(r => setTimeout(r, 500));
  }
  const buildSection = await page.$('#build');
  if (buildSection) {
    await buildSection.screenshot({ path: path.join(outputDir, '05-section-inside-build.png') });
    console.log('Captured 05-section-inside-build.png');
  }

  // 6. Test Chapter 01 (Intevo Pulse)
  const pulseSection = await page.$('.chapter-pulse');
  if (pulseSection) {
    await pulseSection.screenshot({ path: path.join(outputDir, '06-section-intevo-pulse.png') });
    console.log('Captured 06-section-intevo-pulse.png');
  }

  // 7. Test Chapter 02 (Intevo Company)
  const intevoSection = await page.$('.chapter-intevo');
  if (intevoSection) {
    await intevoSection.screenshot({ path: path.join(outputDir, '07-section-intevo-company.png') });
    console.log('Captured 07-section-intevo-company.png');
  }

  // 8. Test Contact Section
  const contactSection = await page.$('#contact');
  if (contactSection) {
    await contactSection.screenshot({ path: path.join(outputDir, '08-section-contact.png') });
    console.log('Captured 08-section-contact.png');
  }

  await browser.close();
  console.log('Browser review complete! All screenshots saved in public/review-screenshots');
}

runReview().catch(err => {
  console.error('Error during review:', err);
  process.exit(1);
});

