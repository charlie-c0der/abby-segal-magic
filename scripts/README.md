# Scripts Directory

Utility scripts for maintaining the Abby Segal Magic website.

## optimize-images.js

Converts JPG/PNG images to optimized WebP format with thumbnails for better web performance.

### Requirements
```bash
npm install --save-dev sharp
```

### Usage

**Optimize specific images:**
```bash
node scripts/optimize-images.js new-artwork.jpg another-image.png
```

**Optimize all images in art directory:**
```bash
node scripts/optimize-images.js --all
```

**Force overwrite existing WebP files:**
```bash
node scripts/optimize-images.js --all --force
```

**Custom quality settings:**
```bash
node scripts/optimize-images.js --all --quality=90 --thumb=80
```

**Use different directory:**
```bash
node scripts/optimize-images.js --dir=./public/assets/portraits/images/ --all
```

### What it does

1. **Converts images to WebP format** with configurable quality (default: 85%)
2. **Creates thumbnails** at 400px max with lower quality (default: 75%)
3. **Shows file size savings** and compression statistics
4. **Skips existing WebP files** unless `--force` is used
5. **Provides detailed summary** of optimization results

### Output Example
```
🎨 Processing new-artwork.jpg...
  ✅ new-artwork.jpg optimized:
     Original: 4.2MB
     WebP: 1.7MB (59% smaller)
     Thumbnail: 30KB

📊 OPTIMIZATION SUMMARY
══════════════════════════════════════════════════
Files processed: 1
Total original size: 4.2MB
Total WebP size: 1.7MB
Total thumbnail size: 30KB
Average savings: 59%
Total space saved: 2.5MB
```

### After Optimization

Remember to:
1. **Update Vue files** to reference the new `.webp` files and `-thumb.webp` thumbnails
2. **Test the website** to ensure images load correctly
3. **Remove original files** if no longer needed
4. **Commit and push** the optimized images

### Typical Workflow

When adding new art images:

```bash
# 1. Add new JPG/PNG files to public/assets/art/images/
# 2. Run optimization
node scripts/optimize-images.js --all

# 3. Update Art.vue to include new artworks with WebP paths
# 4. Test locally
npm run dev

# 5. Commit changes
git add public/assets/art/images/ src/views/Art.vue
git commit -m "Add new optimized artworks"
git push origin master
```