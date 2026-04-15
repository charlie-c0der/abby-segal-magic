# 🚀 Quick Asset Reference

**Super fast reference for adding images and videos to the Abby Segal Magic website.**

---

## 📁 **Folder Structure At-a-Glance:**

```
public/assets/
├── art/        {images/, videos/}     # Artwork & creative content
├── press/      {images/, videos/}     # Media & press coverage  
├── portraits/  {images/, videos/}     # Professional photography
└── general/    {images/, videos/}     # Performance content
```

---

## 🖼️ **Adding Images - Copy & Paste Examples:**

### **Art Gallery Image:**
```vue
<img src="/assets/art/images/art-new-piece.webp" alt="New artwork title" loading="lazy" />
```

### **Press Photo:**
```vue
<img src="/assets/press/images/press-new-interview.webp" alt="Interview at venue" loading="lazy" />
```

### **Portrait Photo:**
```vue
<img src="/assets/portraits/images/new-headshot.webp" alt="Professional headshot" loading="lazy" />
```

### **Performance Photo:**
```vue
<img src="/assets/general/images/new-close-up-magician-chicago-performing.webp" alt="Performance description" loading="lazy" />
```

---

## 📹 **Adding Videos - Copy & Paste Examples:**

### **Art Process Video:**
```vue
<video controls poster="/assets/art/images/art-thumbnail.webp">
  <source src="/assets/art/videos/creation-process.mp4" type="video/mp4">
</video>
```

### **Press Interview Video:**
```vue
<video controls poster="/assets/press/images/interview-still.webp">
  <source src="/assets/press/videos/tv-interview.mp4" type="video/mp4">
</video>
```

### **Professional Intro Video:**
```vue
<video controls poster="/assets/portraits/images/intro-thumbnail.webp">
  <source src="/assets/portraits/videos/professional-intro.mp4" type="video/mp4">
</video>
```

### **Performance Demo Video:**
```vue
<video controls poster="/assets/general/images/close-up-magician-chicago-performing.webp">
  <source src="/assets/general/videos/magic-demo.mp4" type="video/mp4">
</video>
```

---

## 🎯 **Quick Decision Guide:**

| Content Type | Goes In | Example |
|--------------|---------|---------|
| **Artwork photos** | `art/images/` | Gallery pieces, sketches |
| **Art process videos** | `art/videos/` | Timelapse, creation process |
| **Press photos** | `press/images/` | Event photos, media shots |
| **Interview videos** | `press/videos/` | TV appearances, podcasts |
| **Professional photos** | `portraits/images/` | Headshots, professional |
| **Introduction videos** | `portraits/videos/` | About videos, intros |
| **Performance photos** | `general/images/` | Show photos, audience |
| **Performance videos** | `general/videos/` | Magic demos, highlights |

---

## 🔧 **File Naming Quick Rules:**

- **Images**: `category-description.webp` (e.g., `art-new-painting.webp`)
- **Videos**: `category-description.mp4` (e.g., `performance-highlights.mp4`)
- **Thumbnails**: Add `-thumb` (e.g., `art-piece-thumb.webp`)

---

## ✅ **Quick Test:**

1. Add your file to the right folder
2. Update your Vue component with the new path
3. Run: `npm run build`
4. ✅ If build succeeds, you're good to go!

**Need help? Check `ASSET-STRUCTURE.md` for complete details! 🎨**