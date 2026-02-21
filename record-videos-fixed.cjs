const puppeteer = require('puppeteer');
const ffmpegStatic = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

// Create videos directory
const videosDir = path.join(__dirname, 'videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir);
}

const pages = [
  { name: 'home', url: 'http://localhost:5173/', title: 'Homepage - Complete Experience' },
  { name: 'about', url: 'http://localhost:5173/about', title: 'About - Biography & Timeline' },
  { name: 'shows', url: 'http://localhost:5173/shows', title: 'Shows - Formats & FAQ' },
  { name: 'art', url: 'http://localhost:5173/art', title: 'Art Gallery - Complete Masonry' },
  { name: 'press', url: 'http://localhost:5173/press', title: 'Press - All Media Coverage' },
  { name: 'contact', url: 'http://localhost:5173/contact', title: 'Contact - Complete Form' }
];

async function recordPageScrollFixed(page, pageInfo) {
  console.log(`🎬 Recording ${pageInfo.title} (FIXED VERSION)...`);
  
  try {
    // Navigate to page
    await page.goto(pageInfo.url, { waitUntil: 'networkidle0', timeout: 30000 });
    console.log(`  ✅ Page loaded: ${pageInfo.url}`);
    
    // CRITICAL FIX: Disable GSAP ScrollTrigger and smooth scrolling
    await page.evaluate(() => {
      // Disable ScrollTrigger if it exists
      if (window.ScrollTrigger) {
        console.log('Disabling ScrollTrigger for recording...');
        window.ScrollTrigger.disable();
      }
      
      // Disable smooth scrolling
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.scrollBehavior = 'auto';
      
      // Disable any custom scroll listeners temporarily
      if (window.gsap) {
        window.gsap.set('body', { overflow: 'visible' });
      }
    });
    
    // Wait for page setup and let animations settle
    await page.waitForTimeout(3000);
    
    // Get actual page dimensions
    const pageMetrics = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      
      const scrollHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      
      const viewportHeight = window.innerHeight;
      
      console.log(`Page scroll height: ${scrollHeight}px, viewport: ${viewportHeight}px`);
      
      return {
        scrollHeight,
        viewportHeight,
        maxScroll: Math.max(0, scrollHeight - viewportHeight)
      };
    });
    
    console.log(`  📐 Page: ${pageMetrics.scrollHeight}px, Viewport: ${pageMetrics.viewportHeight}px, Max scroll: ${pageMetrics.maxScroll}px`);
    
    if (pageMetrics.maxScroll <= 100) {
      console.log(`  ⚠️  Page too short for meaningful scrolling, recording static view`);
    }
    
    // Start screen recording
    const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
    const recorder = new PuppeteerScreenRecorder(page);
    const videoPath = path.join(videosDir, `${pageInfo.name}-scroll-FIXED.mp4`);
    
    await recorder.start(videoPath);
    console.log(`  🎥 Recording started: ${videoPath}`);
    
    // FIXED SCROLLING: Use incremental scroll with pauses
    console.log(`  📜 Starting improved scrolling...`);
    
    // Show top of page for 2 seconds
    await page.waitForTimeout(2000);
    
    if (pageMetrics.maxScroll > 100) {
      // Calculate scroll steps (aim for smooth but visible progress)
      const scrollSteps = Math.min(15, Math.ceil(pageMetrics.maxScroll / 200)); // Max 15 steps, or every 200px
      const scrollAmount = pageMetrics.maxScroll / scrollSteps;
      const pauseBetweenScrolls = 800; // Pause to let animations/content show
      
      console.log(`  📊 Scrolling in ${scrollSteps} steps of ${Math.round(scrollAmount)}px each`);
      
      for (let step = 1; step <= scrollSteps; step++) {
        const targetScroll = Math.min(step * scrollAmount, pageMetrics.maxScroll);
        
        // Scroll to position
        await page.evaluate((scrollTo) => {
          window.scrollTo({
            top: scrollTo,
            behavior: 'auto' // Force immediate scrolling
          });
          
          // Force scroll if it didn't work
          if (Math.abs(window.scrollY - scrollTo) > 10) {
            document.documentElement.scrollTop = scrollTo;
            document.body.scrollTop = scrollTo;
          }
          
          console.log(`Scrolled to: ${window.scrollY}px (target: ${scrollTo}px)`);
        }, targetScroll);
        
        // Wait for content to be visible and animations to settle
        await page.waitForTimeout(pauseBetweenScrolls);
        
        console.log(`  📍 Step ${step}/${scrollSteps}: scrolled to ${Math.round(targetScroll)}px`);
      }
      
      // Hold at bottom for 1.5 seconds
      await page.waitForTimeout(1500);
      
      // Quick scroll back to top to show the complete experience
      await page.evaluate(() => {
        window.scrollTo({
          top: 0,
          behavior: 'auto'
        });
      });
      await page.waitForTimeout(2000);
      
    } else {
      // For short pages, just hold the view
      await page.waitForTimeout(5000);
    }
    
    // Stop recording
    await recorder.stop();
    console.log(`  ✅ Recording saved: ${videoPath}`);
    
    // Re-enable ScrollTrigger
    await page.evaluate(() => {
      if (window.ScrollTrigger) {
        console.log('Re-enabling ScrollTrigger...');
        window.ScrollTrigger.enable();
      }
    });
    
  } catch (error) {
    console.error(`  ❌ Error recording ${pageInfo.name}:`, error.message);
  }
}

async function main() {
  console.log('🎬 Starting FIXED video recording of all pages...\n');
  console.log('🔧 This version fixes GSAP ScrollTrigger conflicts and scroll detection\n');
  
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
      '--no-default-browser-check',
      '--disable-web-security', // Help with any CORS issues
      '--disable-features=VizDisplayCompositor' // Improve recording stability
    ]
  });
  
  const page = await browser.newPage();
  
  // Set realistic user agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  for (const pageInfo of pages) {
    await recordPageScrollFixed(page, pageInfo);
    // Small break between recordings
    await page.waitForTimeout(2000);
  }
  
  await browser.close();
  
  console.log('\n🎉 All FIXED page recordings complete!');
  console.log('📁 Check the videos/ directory for *-FIXED.mp4 files');
  
  // List created files
  const files = fs.readdirSync(videosDir).filter(f => f.includes('FIXED') && f.endsWith('.mp4'));
  console.log(`\n📊 Generated ${files.length} fixed videos:`);
  files.forEach(file => {
    const filePath = path.join(videosDir, file);
    try {
      const stats = fs.statSync(filePath);
      console.log(`  - ${file} (${(stats.size / 1024 / 1024).toFixed(1)}MB)`);
    } catch (e) {
      console.log(`  - ${file} (checking...)`);
    }
  });
}

main().catch(error => {
  console.error('❌ Recording failed:', error);
  process.exit(1);
});