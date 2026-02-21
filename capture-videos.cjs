const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

const pages = [
  { name: 'home', url: 'http://localhost:5173/', title: 'Homepage with Hero & Animations' },
  { name: 'about', url: 'http://localhost:5173/about', title: 'About Page with Timeline' },
  { name: 'shows', url: 'http://localhost:5173/shows', title: 'Shows Page with Details' },
  { name: 'art', url: 'http://localhost:5173/art', title: 'Art Gallery with Masonry' },
  { name: 'press', url: 'http://localhost:5173/press', title: 'Press Page with Media' },
  { name: 'contact', url: 'http://localhost:5173/contact', title: 'Contact Form' }
];

async function capturePageVideo(page, pageInfo) {
  console.log(`Capturing ${pageInfo.name} page...`);
  
  try {
    // Navigate to page
    await page.goto(pageInfo.url, { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Wait for initial load and animations
    await page.waitForTimeout(3000);
    
    // Get full page height
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log(`  Page height: ${bodyHeight}px`);
    
    // Take initial screenshot
    await page.screenshot({ 
      path: path.join(screenshotsDir, `${pageInfo.name}-01-top.png`),
      fullPage: false 
    });
    
    // Scroll through page slowly to trigger all animations
    const scrollSteps = Math.ceil(bodyHeight / 500); // 500px per step
    
    for (let i = 1; i <= scrollSteps; i++) {
      const scrollTo = (i * 500);
      await page.evaluate((scrollTop) => {
        window.scrollTo({ top: scrollTop, behavior: 'smooth' });
      }, scrollTo);
      
      // Wait for scroll animations to complete
      await page.waitForTimeout(1500);
      
      // Take screenshot at each scroll position
      if (i % 2 === 0 || i === scrollSteps) { // Every 2nd step + final
        await page.screenshot({ 
          path: path.join(screenshotsDir, `${pageInfo.name}-${String(i + 1).padStart(2, '0')}-scroll.png`),
          fullPage: false 
        });
      }
    }
    
    // Scroll back to top
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(2000);
    
    // Take final full page screenshot
    await page.screenshot({ 
      path: path.join(screenshotsDir, `${pageInfo.name}-full.png`),
      fullPage: true 
    });
    
    console.log(`  ✅ ${pageInfo.name} complete`);
    
  } catch (error) {
    console.error(`  ❌ Error capturing ${pageInfo.name}:`, error.message);
  }
}

async function main() {
  console.log('🎥 Starting video-like page capture...\n');
  
  const browser = await puppeteer.launch({ 
    headless: true,
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set user agent and other options
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
  
  for (const pageInfo of pages) {
    await capturePageVideo(page, pageInfo);
  }
  
  await browser.close();
  
  console.log('\n🎉 All pages captured!');
  console.log('📁 Check the screenshots/ directory for all captures');
  
  // Generate summary
  const files = fs.readdirSync(screenshotsDir).filter(f => f.endsWith('.png'));
  console.log(`\n📊 Generated ${files.length} screenshots total`);
}

main().catch(console.error);