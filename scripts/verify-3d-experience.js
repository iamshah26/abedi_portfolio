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

async function verify3DExperience() {
  console.log('Launching browser for 3D verification:', executablePath);
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
      '--use-gl=angle',
      '--use-angle=d3d11'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  // Monitor console errors
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

  console.log('Navigating to http://localhost:4173/ ...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // 1. Capture Chapter 01: The Entrance
  await page.screenshot({ path: path.join(outputDir, '3d-01-entrance.png') });
  console.log('Captured 3d-01-entrance.png');

  // 2. Scroll to Chapter 02: Intevo Pulse (progress ~0.25)
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll * 0.25, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '3d-02-intevo-pulse.png') });
  console.log('Captured 3d-02-intevo-pulse.png');

  // 3. Scroll to Chapter 03: Raahee (progress ~0.46)
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll * 0.46, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '3d-03-raahee.png') });
  console.log('Captured 3d-03-raahee.png');

  // 4. Scroll to Chapter 04: Enteract Engage (progress ~0.66)
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll * 0.66, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '3d-04-enteract-engage.png') });
  console.log('Captured 3d-04-enteract-engage.png');

  // 5. Scroll to Chapter 05: Studio & Journey (progress ~0.83)
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll * 0.83, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '3d-05-studio-journey.png') });
  console.log('Captured 3d-05-studio-journey.png');

  // 6. Scroll to Chapter 06: Final Connection / Contact (progress 1.00)
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '3d-06-final-connection.png') });
  console.log('Captured 3d-06-final-connection.png');

  // 7. Test Reversible Scrolling: Scroll back up to Chapter 02
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll * 0.25, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '3d-07-reversed-to-pulse.png') });
  console.log('Captured 3d-07-reversed-to-pulse.png');

  // 8. Test MENU Scene Selector Drawer
  const menuBtn = await page.$('.hud-menu-btn');
  if (menuBtn) {
    await menuBtn.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, '3d-08-scene-selector-drawer.png') });
    console.log('Captured 3d-08-scene-selector-drawer.png');
  }

  // 9. Test Case Study Modal: Click "Inspect Full Case Study"
  // First close drawer if open
  const closeBtn = await page.$('.drawer-close');
  if (closeBtn) {
    await closeBtn.click();
    await new Promise(r => setTimeout(r, 400));
  }
  const inspectBtn = await page.$('.chapter-pulse .btn-primary');
  if (inspectBtn) {
    await inspectBtn.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, '3d-09-case-study-modal.png') });
    console.log('Captured 3d-09-case-study-modal.png');
  }

  await browser.close();
  console.log('Verification completed successfully!');
}

verify3DExperience().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});

