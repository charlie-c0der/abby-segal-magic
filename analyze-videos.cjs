const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegStatic);
ffmpeg.setFfprobePath(ffmpegStatic);

const videosDir = path.join(__dirname, 'videos');
const framesDir = path.join(__dirname, 'video-frames');

// Create frames directory
if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir);
}

const videoFiles = [
  'home-scroll-demo.mp4',
  'about-scroll-demo.mp4', 
  'shows-scroll-demo.mp4',
  'art-scroll-demo.mp4',
  'press-scroll-demo.mp4',
  'contact-scroll-demo.mp4'
];

async function extractFrames(videoFile) {
  const videoName = path.basename(videoFile, '.mp4');
  const videoPath = path.join(videosDir, videoFile);
  const outputDir = path.join(framesDir, videoName);
  
  // Create directory for this video's frames
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  
  console.log(`🎬 Extracting frames from ${videoName}...`);
  
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .outputOptions([
        '-vf fps=1/2', // Extract 1 frame every 2 seconds
        '-q:v 2'       // High quality
      ])
      .output(path.join(outputDir, 'frame-%03d.png'))
      .on('start', (commandLine) => {
        console.log(`  ✅ Started: ${commandLine}`);
      })
      .on('progress', (progress) => {
        if (progress.percent) {
          console.log(`  📊 Progress: ${Math.round(progress.percent)}%`);
        }
      })
      .on('end', () => {
        const frames = fs.readdirSync(outputDir).filter(f => f.endsWith('.png'));
        console.log(`  ✅ Extracted ${frames.length} frames from ${videoName}`);
        resolve(frames.length);
      })
      .on('error', (err) => {
        console.error(`  ❌ Error extracting frames from ${videoName}:`, err.message);
        reject(err);
      })
      .run();
  });
}

async function extractKeyMoments(videoFile) {
  const videoName = path.basename(videoFile, '.mp4');
  const videoPath = path.join(videosDir, videoFile);
  const outputDir = path.join(framesDir, `${videoName}-key`);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  
  console.log(`🔑 Extracting key moments from ${videoName}...`);
  
  // Extract frames at fixed time points (works for most video lengths)
  const timePoints = [1, 3, 6, 9, 12, 15]; // Every few seconds
  
  for (let i = 0; i < timePoints.length; i++) {
    const timeSeconds = timePoints[i];
    const outputPath = path.join(outputDir, `key-${i+1}-${timeSeconds}s.png`);
    
    await new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .seekInput(timeSeconds)
        .outputOptions(['-frames:v 1', '-q:v 2'])
        .output(outputPath)
        .on('end', () => {
          console.log(`  ✅ Extracted key frame at ${timeSeconds}s`);
          resolve();
        })
        .on('error', (err) => {
          console.log(`  ⚠️  Frame at ${timeSeconds}s not available (video too short)`);
          resolve(); // Don't fail, just skip
        })
        .run();
    });
  }
}

async function main() {
  console.log('🎥 Starting video frame extraction for bug analysis...\n');
  
  try {
    for (const videoFile of videoFiles) {
      const videoPath = path.join(videosDir, videoFile);
      
      if (!fs.existsSync(videoPath)) {
        console.log(`⚠️  Video not found: ${videoFile}`);
        continue;
      }
      
      // Extract key moments for quick analysis
      await extractKeyMoments(videoFile);
      
      // Extract regular frames for detailed analysis
      await extractFrames(videoFile);
      
      console.log('');
    }
    
    console.log('🎉 Frame extraction complete!');
    console.log('📁 Frames saved to: video-frames/');
    
    // List all extracted frames
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
    console.log('🔍 Ready for visual bug analysis!');
    
  } catch (error) {
    console.error('❌ Frame extraction failed:', error);
  }
}

main();