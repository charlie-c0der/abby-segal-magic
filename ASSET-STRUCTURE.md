# 🏗️ Comprehensive Asset Structure Guide

**Date**: March 9, 2026  
**Repository**: Abby Segal Magic Website  

---

## 📁 **New Asset Organization - COMPLETE**

### **🚀 SCALABLE CATEGORY-BASED STRUCTURE:**

```
public/assets/
├── 📂 art/                     # Artwork & Art-Related Content
│   ├── 📂 images/              # Gallery images (36 files)
│   │   ├── art-collage-1.jpg/.webp/.thumb.webp
│   │   ├── art-eyes.jpg/.webp/.thumb.webp
│   │   ├── art-girls.jpg/.webp/.thumb.webp
│   │   ├── art-lipstick.jpg/.webp/.thumb.webp
│   │   ├── art-mogul.jpg/.webp/.thumb.webp
│   │   ├── art-poetry.jpg/.webp/.thumb.webp
│   │   ├── art-prague.jpg/.webp/.thumb.webp
│   │   ├── art-shapes.jpg/.webp/.thumb.webp
│   │   ├── art-smoking.jpg/.webp/.thumb.webp
│   │   ├── art-stretched.jpg/.webp/.thumb.webp
│   │   ├── art-tannes.jpg/.webp/.thumb.webp
│   │   └── art-thinking.jpg/.webp/.thumb.webp
│   └── 📂 videos/              # Art process videos [READY FOR CONTENT]
│       ├── art-process-timelapse.mp4
│       ├── gallery-walkthrough.mp4
│       └── creation-behind-scenes.mp4
├── 📂 press/                   # Media & Press Content
│   ├── 📂 images/              # Press photos (8 files)
│   │   ├── press-1.jpg/.webp
│   │   ├── press-2.jpg/.webp  
│   │   ├── press-prague.jpg/.webp
│   │   └── press-show.jpg/.webp
│   └── 📂 videos/              # Interview & media videos [READY FOR CONTENT]
│       ├── penn-teller-fool-us.mp4
│       ├── interview-clips.mp4
│       └── media-coverage.mp4
├── 📂 portraits/               # Professional Photography
│   ├── 📂 images/              # Portrait photos (4 files)
│   │   ├── abby-2024.jpg/.webp
│   │   └── portrait.jpg/.webp
│   └── 📂 videos/              # Portrait video content [READY FOR CONTENT]
│       ├── professional-intro.mp4
│       └── headshot-session.mp4
└── 📂 general/                 # Performance & General Content
    ├── 📂 images/              # Performance images (2 files)
    │   └── performance.jpg/.webp
    └── 📂 videos/              # Performance videos [READY FOR CONTENT]
        ├── performance-highlights.mp4
        ├── magic-demonstrations.mp4
        └── event-testimonials.mp4
```

---

## 🎯 **Usage Examples - Adding New Assets**

### **📹 Adding Videos by Category:**

#### **1. Art Videos** (`public/assets/art/videos/`)
```javascript
// Example: Art process timelapse video
const artVideoUrl = '/assets/art/videos/painting-process-timelapse.mp4'

// Use in Vue component:
<video controls>
  <source src="/assets/art/videos/creation-behind-scenes.mp4" type="video/mp4">
</video>
```

#### **2. Press Videos** (`public/assets/press/videos/`)  
```javascript
// Example: Penn & Teller appearance
const pressVideoUrl = '/assets/press/videos/penn-teller-fool-us-full.mp4'

// Use in Press.vue:
<video poster="/assets/press/images/parlour-magician-chicago-magic-lounge.webp" controls>
  <source src="/assets/press/videos/interview-highlights.mp4" type="video/mp4">
</video>
```

#### **3. Portrait Videos** (`public/assets/portraits/videos/`)
```javascript
// Example: Professional introduction video  
const introVideoUrl = '/assets/portraits/videos/professional-intro.mp4'

// Use in About.vue:
<video autoplay muted loop>
  <source src="/assets/portraits/videos/headshot-session-bts.mp4" type="video/mp4">
</video>
```

#### **4. General Performance Videos** (`public/assets/general/videos/`)
```javascript
// Example: Performance highlights reel
const performanceVideoUrl = '/assets/general/videos/performance-reel.mp4'

// Use in Home.vue:
<video controls poster="/assets/general/images/close-up-magician-chicago-performing.webp">
  <source src="/assets/general/videos/magic-demo-compilation.mp4" type="video/mp4">
</video>
```

---

## 📊 **File Naming Conventions**

### **🖼️ Images:**
```
Category Prefix + Descriptive Name + Format
Examples:
- art-collage-1.webp           (artwork)
- art-collage-1-thumb.webp     (thumbnail) 
- parlour-magician-chicago-magic-lounge.webp              (press photo)
- portrait.webp                (professional photo)
- close-up-magician-chicago-performing.webp             (general performance)
```

### **📹 Videos:**
```
Category Context + Content Type + Format
Examples:
- art-process-timelapse.mp4           (art creation)
- press-interview-highlights.mp4      (media coverage)
- portraits-professional-intro.mp4    (introduction video)
- general-performance-reel.mp4        (performance highlights)
```

---

## 🔄 **Adding New Content - Step by Step**

### **📹 Adding a New Video:**

#### **Step 1: Choose Category**
- **Art**: Creative process, gallery content, artistic journey
- **Press**: Media appearances, interviews, news coverage  
- **Portraits**: Professional content, introductions, headshots
- **General**: Performance footage, testimonials, demonstrations

#### **Step 2: Place in Correct Folder**
```bash
# Example: Adding Penn & Teller full episode
mv penn-teller-full-episode.mp4 public/assets/press/videos/

# Example: Adding art creation timelapse  
mv painting-creation.mp4 public/assets/art/videos/art-process-watercolor.mp4
```

#### **Step 3: Reference in Code**
```vue
<!-- In Art.vue for art process video -->
<video controls class="art-video">
  <source src="/assets/art/videos/art-process-watercolor.mp4" type="video/mp4">
  Your browser doesn't support video playback.
</video>

<!-- In Press.vue for media content -->
<video controls poster="/assets/press/images/parlour-magician-chicago-magic-lounge.webp">
  <source src="/assets/press/videos/penn-teller-full-episode.mp4" type="video/mp4">
</video>
```

#### **Step 4: Optimize Video (Optional)**
```bash
# Compress for web delivery (example using ffmpeg)
ffmpeg -i source.mp4 -crf 23 -preset medium optimized.mp4

# Create poster frame
ffmpeg -i video.mp4 -ss 00:00:05 -frames:v 1 poster.webp
```

---

## 🎨 **Content Strategy by Category**

### **🎭 Art Category** (`/assets/art/`)
**Purpose**: Showcase artistic talent and creative process  
**Image Types**: Finished artwork, work-in-progress, gallery installations  
**Video Types**: Timelapse creation, gallery walkthroughs, artistic philosophy  
**Target Use**: Art gallery page, commission inquiries, creative credibility  

### **📰 Press Category** (`/assets/press/`)  
**Purpose**: Media credibility and professional recognition  
**Image Types**: Press photos, event coverage, media appearances  
**Video Types**: TV appearances, interviews, news segments  
**Target Use**: Press page, media kit, booking credibility  

### **🎭 Portraits Category** (`/assets/portraits/`)
**Purpose**: Professional branding and personal connection  
**Image Types**: Professional headshots, lifestyle photos, behind-scenes  
**Video Types**: Introduction videos, professional messages, personality content  
**Target Use**: About page, contact page, social media, speaker bureau  

### **🎪 General Category** (`/assets/general/`)
**Purpose**: Performance demonstration and audience engagement  
**Image Types**: Performance photos, audience reactions, venue shots  
**Video Types**: Magic demonstrations, performance highlights, testimonials  
**Target Use**: Homepage, shows page, marketing materials, social proof  

---

## ⚡ **Performance Optimization**

### **🖼️ Image Best Practices:**
- **WebP format** for modern browsers (smaller file size)
- **JPG fallback** for compatibility  
- **Thumbnail versions** for gallery previews (-thumb.webp)
- **Lazy loading** implemented in components
- **Optimized dimensions** for web delivery

### **📹 Video Best Practices:**
```html
<!-- Recommended video implementation -->
<video 
  controls 
  preload="metadata"
  poster="/assets/category/images/poster.webp"
  width="100%" 
  height="auto"
>
  <source src="/assets/category/videos/video.mp4" type="video/mp4">
  <track kind="subtitles" src="/assets/category/videos/video.vtt" srclang="en" label="English">
</video>
```

### **📊 Optimization Guidelines:**
- **Max video size**: 50MB per file
- **Recommended resolution**: 1920x1080 (1080p)  
- **Frame rate**: 30fps or 24fps
- **Compression**: H.264 codec, CRF 23
- **Poster images**: Always provide for better UX

---

## 🔧 **Development Workflow**

### **📁 Adding Assets to Existing Categories:**
1. Place files in appropriate `images/` or `videos/` subfolder
2. Follow naming conventions  
3. Update component references
4. Test build: `npm run build`
5. Verify asset loading in development

### **🆕 Adding New Categories (if needed):**
1. Create folder structure: `public/assets/new-category/{images,videos}/`
2. Add assets following naming conventions
3. Update components to reference new paths
4. Document new category in this guide

### **🧪 Testing Asset Loading:**
```bash
# Development server
npm run dev

# Production build test  
npm run build
npm run preview

# Check specific asset URLs
curl -I https://yoursite.com/assets/category/images/filename.webp
```

---

## ✅ **Migration Status - COMPLETE**

### **✅ Successfully Migrated:**
- [x] **Art images** (36 files) → `/assets/art/images/`
- [x] **Press images** (8 files) → `/assets/press/images/`  
- [x] **Portrait images** (4 files) → `/assets/portraits/images/`
- [x] **General images** (2 files) → `/assets/general/images/`
- [x] **Video folder structure** → Ready for content in all categories
- [x] **All code references** → Updated to new paths
- [x] **Build verification** → ✅ Successful
- [x] **SEO meta tags** → Updated with new image paths

### **📊 Final Count:**
- **Total assets**: 50 files perfectly organized
- **Video folders**: 4 categories ready for video content
- **Code references**: 100% updated and functional  
- **Build status**: ✅ All systems operational

---

## 🎯 **Next Steps - Ready for Video Content!**

The asset structure is now **completely prepared** for video content in all categories:

1. **🎨 Art Videos**: Ready for creation timelapses, gallery tours  
2. **📺 Press Videos**: Ready for Penn & Teller clips, interviews
3. **👤 Portrait Videos**: Ready for professional introductions
4. **🎪 Performance Videos**: Ready for magic demonstrations, reels

Simply add video files to the appropriate `videos/` folder and reference them in your Vue components using the new structured paths! 🚀