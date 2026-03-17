import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const artDir = './public/assets/art/images/';

/**
 * Image Optimization Script for Abby Segal Magic
 * 
 * Converts JPG/PNG images to optimized WebP format with thumbnails
 * Usage: node scripts/optimize-images.js [filename1] [filename2] ...
 * Or: node scripts/optimize-images.js --all  (processes all JPG/PNG files)
 */

async function optimizeImage(filename, inputDir = artDir, options = {}) {
  const inputPath = path.join(inputDir, filename);
  const baseName = path.parse(filename).name.toLowerCase();
  const ext = path.parse(filename).ext.toLowerCase();
  
  const outputPath = path.join(inputDir, `${baseName}.webp`);
  const thumbPath = path.join(inputDir, `${baseName}-thumb.webp`);
  
  console.log(`🎨 Processing ${filename}...`);
  
  try {
    // Check if file exists
    if (!fs.existsSync(inputPath)) {
      console.log(`❌ File not found: ${inputPath}`);
      return false;
    }
    
    // Skip if WebP already exists (unless force option)
    if (fs.existsSync(outputPath) && !options.force) {
      console.log(`⏭️  WebP already exists: ${baseName}.webp (use --force to overwrite)`);
      return false;
    }
    
    // Create full-size WebP version
    await sharp(inputPath)
      .webp({ 
        quality: options.quality || 85,
        effort: 6 
      })
      .toFile(outputPath);
    
    // Create thumbnail version  
    await sharp(inputPath)
      .resize(400, 400, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ 
        quality: options.thumbQuality || 75,
        effort: 6 
      })
      .toFile(thumbPath);
    
    // Get file sizes for comparison
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(outputPath).size;
    const thumbSize = fs.statSync(thumbPath).size;
    
    const savings = Math.round((1 - webpSize/originalSize) * 100);
    
    console.log(`  ✅ ${filename} optimized:`);
    console.log(`     Original: ${(originalSize / 1024 / 1024).toFixed(1)}MB`);
    console.log(`     WebP: ${(webpSize / 1024 / 1024).toFixed(1)}MB (${savings}% smaller)`);
    console.log(`     Thumbnail: ${(thumbSize / 1024).toFixed(0)}KB`);
    
    return { originalSize, webpSize, thumbSize, savings };
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
    return false;
  }
}

async function optimizeDirectory(directory, options = {}) {
  console.log(`🔍 Scanning ${directory} for images...`);
  
  const files = fs.readdirSync(directory);
  const imageFiles = files.filter(f => 
    /\.(jpg|jpeg|png)$/i.test(f) && 
    !f.includes('-thumb') // Skip existing thumbnails
  );
  
  if (imageFiles.length === 0) {
    console.log('📭 No images found to optimize.');
    return;
  }
  
  console.log(`📸 Found ${imageFiles.length} images to optimize\n`);
  
  const results = [];
  
  for (const filename of imageFiles) {
    const result = await optimizeImage(filename, directory, options);
    if (result) {
      results.push(result);
    }
    console.log(''); // Empty line for readability
  }
  
  // Summary
  if (results.length > 0) {
    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalWebP = results.reduce((sum, r) => sum + r.webpSize, 0);
    const totalThumb = results.reduce((sum, r) => sum + r.thumbSize, 0);
    const avgSavings = Math.round(results.reduce((sum, r) => sum + r.savings, 0) / results.length);
    
    console.log('📊 OPTIMIZATION SUMMARY');
    console.log('═'.repeat(50));
    console.log(`Files processed: ${results.length}`);
    console.log(`Total original size: ${(totalOriginal / 1024 / 1024).toFixed(1)}MB`);
    console.log(`Total WebP size: ${(totalWebP / 1024 / 1024).toFixed(1)}MB`);
    console.log(`Total thumbnail size: ${(totalThumb / 1024).toFixed(0)}KB`);
    console.log(`Average savings: ${avgSavings}%`);
    console.log(`Total space saved: ${((totalOriginal - totalWebP) / 1024 / 1024).toFixed(1)}MB`);
  }
}

// Command line interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🎨 Image Optimization Script for Abby Segal Magic

Usage:
  node scripts/optimize-images.js filename1.jpg filename2.png    # Specific files
  node scripts/optimize-images.js --all                         # All JPG/PNG files
  node scripts/optimize-images.js --all --force                 # Overwrite existing WebP
  
Options:
  --all          Process all JPG/PNG files in art directory
  --force        Overwrite existing WebP files
  --quality=85   Set WebP quality (default: 85)
  --thumb=75     Set thumbnail quality (default: 75)
  --dir=path     Use custom directory (default: ./public/assets/art/images/)

Examples:
  node scripts/optimize-images.js new-artwork.jpg
  node scripts/optimize-images.js --all --quality=90
  node scripts/optimize-images.js --dir=./public/assets/portraits/images/ --all
`);
    return;
  }
  
  // Parse options
  const options = {
    force: args.includes('--force'),
    quality: parseInt(args.find(a => a.startsWith('--quality='))?.split('=')[1]) || 85,
    thumbQuality: parseInt(args.find(a => a.startsWith('--thumb='))?.split('=')[1]) || 75
  };
  
  const customDir = args.find(a => a.startsWith('--dir='))?.split('=')[1];
  const directory = customDir || artDir;
  
  const fileArgs = args.filter(a => !a.startsWith('--'));
  
  console.log('🚀 Starting image optimization...\n');
  
  if (args.includes('--all')) {
    // Process all images in directory
    await optimizeDirectory(directory, options);
  } else {
    // Process specific files
    const results = [];
    
    for (const filename of fileArgs) {
      const result = await optimizeImage(filename, directory, options);
      if (result) results.push(result);
      console.log(''); // Empty line
    }
    
    if (results.length > 0) {
      const totalSaved = results.reduce((sum, r) => sum + (r.originalSize - r.webpSize), 0);
      console.log(`✨ Optimized ${results.length} files, saved ${(totalSaved / 1024 / 1024).toFixed(1)}MB`);
    }
  }
  
  console.log('\n📝 Next steps:');
  console.log('  1. Update your Vue files to use the new WebP versions');
  console.log('  2. Test the website with optimized images');
  console.log('  3. Remove original files if desired');
  console.log('  4. Commit and push the optimized images');
}

// Handle process errors
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled error:', error.message);
  process.exit(1);
});

// Run the script
main().catch(console.error);