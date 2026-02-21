const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegStatic);

const videosDir = path.join(__dirname, 'videos');
const framesDir = path.join(__dirname, 'video-frames-fixed');

// Create frames directory
if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir);
}

const fixedVideoFiles = [
  'home-scroll-FIXED.mp4',
  'about-scroll-FIXED.mp4', 
  'shows-scroll-FIXED.mp4',
  'art-scroll-FIXED.mp4',
  'press-scroll-FIXED.mp4',
  'contact-scroll-FIXED.mp4'
];

async function extractKeyFramesFixed(videoFile) {
  const videoName = path.basename(videoFile, '.mp4');
  const videoPath = path.join(videosDir, videoFile);
  const outputDir = path.join(framesDir, videoName);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  
  console.log(`🔍 Extracting frames from FIXED ${videoName}...`);
  
  // Extract more frames to see the complete scrolling experience
  const timePoints = [1, 3, 6, 9, 12, 15, 18, 21, 24]; // Every 3 seconds up to 24s
  
  for (let i = 0; i < timePoints.length; i++) {
    const timeSeconds = timePoints[i];
    const outputPath = path.join(outputDir, `frame-${String(i + 1).padStart(2, '0')}-${timeSeconds}s.png`);
    
    await new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .seekInput(timeSeconds)
        .outputOptions(['-frames:v 1', '-q:v 2'])
        .output(outputPath)
        .on('end', () => {
          console.log(`  ✅ Frame at ${timeSeconds}s`);
          resolve();
        })
        .on('error', (err) => {
          console.log(`  ⚠️  Frame at ${timeSeconds}s not available (video ended)`);
          resolve(); // Don't fail
        })
        .run();
    });
  }
}

async function main() {
  console.log('🔍 Analyzing FIXED video recordings...\n');
  
  try {
    for (const videoFile of fixedVideoFiles) {
      const videoPath = path.join(videosDir, videoFile);
      
      if (!fs.existsSync(videoPath)) {
        console.log(`⚠️  Video not found: ${videoFile}`);
        continue;
      }
      
      await extractKeyFramesFixed(videoFile);
      console.log('');
    }
    
    console.log('🎉 Fixed video frame extraction complete!');
    console.log('📁 Frames saved to: video-frames-fixed/');
    
    // Count extracted frames
    const totalFrames = fs.readdirSync(framesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => {
        const frameFiles = fs.readdirSync(path.join(framesDir, dirent.name))
          .filter(f => f.endsWith('.png'));
        console.log(`  📊 ${dirent.name}: ${frameFiles.length} frames`);
        return frameFiles.length;
      })
      .reduce((a, b) => a + b, 0);
    
    console.log(`\n📈 Total frames extracted: ${totalFrames}`);
    console.log('🔍 Ready for bug analysis of FIXED videos!');
    
  } catch (error) {
    console.error('❌ Frame extraction failed:', error);
  }
}

main();