const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const fs = require('fs');
const path = require('path');

// Create videos directory if it doesn't exist
const videosDir = path.join(__dirname, 'videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir);
}

const pages = [
  { name: 'home', url: 'http://localhost:5173/', title: 'Homepage - Full Experience' },
  { name: 'about', url: 'http://localhost:5173/about', title: 'About - Biography & Timeline' },
  { name: 'shows', url: 'http://localhost:5173/shows', title: 'Shows - Formats & Pricing' },
  { name: 'art', url: 'http://localhost:5173/art', title: 'Art Gallery - Masonry & Etsy' },
  { name: 'press', url: 'http://localhost:5173/press', title: 'Press - Media Coverage' },
  { name: 'contact', url: 'http://localhost:5173/contact', title: 'Contact - Booking Form' }
];

async function recordPageScroll(page, pageInfo, browser) {
  console.log(`🎬 Recording ${pageInfo.title}...`);
  
  try {
    // Navigate to page
    await page.goto(pageInfo.url, { waitUntil: 'networkidle0', timeout: 30000 });
    console.log(`  ✅ Page loaded: ${pageInfo.url}`);
    
    // Wait for initial animations and page setup
    await page.waitForTimeout(3000);
    
    // Get page dimensions
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    console.log(`  📐 Page: ${bodyHeight}px, Viewport: ${viewportHeight}px`);
    
    // Start screen recording
    const recorder = new PuppeteerScreenRecorder(page);
    const videoPath = path.join(videosDir, `${pageInfo.name}-scroll-demo.mp4`);
    
    await recorder.start(videoPath);
    
    console.log(`  🎥 Recording started: ${videoPath}`);
    
    // Record the scrolling experience
    
    // 1. Show top of page for 2 seconds
    await page.waitForTimeout(2000);
    
    // 2. Smooth scroll through entire page
    const scrollSteps = Math.ceil(bodyHeight / viewportHeight);
    const scrollDuration = Math.max(10000, scrollSteps * 2000); // At least 10s, or 2s per viewport
    
    console.log(`  📜 Scrolling through ${scrollSteps} sections over ${scrollDuration/1000}s`);
    
    // Smooth continuous scroll
    await page.evaluate((duration, targetHeight) => {
      return new Promise(resolve => {
        const startTime = Date.now();
        const startPosition = window.scrollY;
        
        function scrollFrame() {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Smooth easing function
          const easeInOutQuad = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
          
          const currentPosition = startPosition + (targetHeight - startPosition) * easeInOutQuad;
          window.scrollTo(0, currentPosition);
          
          if (progress < 1) {
            requestAnimationFrame(scrollFrame);
          } else {
            resolve();
          }
        }
        
        requestAnimationFrame(scrollFrame);
      });
    }, scrollDuration, bodyHeight - viewportHeight);
    
    // 3. Pause at bottom for 2 seconds
    await page.waitForTimeout(2000);
    
    // 4. Quick scroll back to top
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    await page.waitForTimeout(3000);
    
    // Stop recording
    await recorder.stop();
    console.log(`  ✅ Recording saved: ${videoPath}`);
    
  } catch (error) {
    console.error(`  ❌ Error recording ${pageInfo.name}:`, error.message);
  }
}

async function main() {
  console.log('🎬 Starting video recording of all pages...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false, // Show browser for debugging
    defaultViewport: { width: 1920, height: 1080 },
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-extensions',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check'
    ]
  });
  
  const page = await browser.newPage();
  
  // Set realistic user agent and disable images for faster loading
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
  
  for (const pageInfo of pages) {
    await recordPageScroll(page, pageInfo, browser);
    // Small break between recordings
    await page.waitForTimeout(1000);
  }
  
  await browser.close();
  
  console.log('\n🎉 All page recordings complete!');
  console.log('📁 Check the videos/ directory for MP4 files');
  
  // List created files
  const files = fs.readdirSync(videosDir).filter(f => f.endsWith('.mp4'));
  console.log(`\n📊 Generated ${files.length} videos:`);
  files.forEach(file => {
    const filePath = path.join(videosDir, file);
    const stats = fs.statSync(filePath);
    console.log(`  - ${file} (${(stats.size / 1024 / 1024).toFixed(1)}MB)`);
  });
}

main().catch(error => {
  console.error('❌ Recording failed:', error);
  process.exit(1);
});