#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts images to WebP format and optimizes them for web performance
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if ImageMagick is installed
function checkImageMagick() {
  try {
    execSync('magick --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.log('ImageMagick not found. Please install ImageMagick to convert images to WebP.');
    console.log('Installation: https://imagemagick.org/script/download.php');
    return false;
  }
}

// Convert image to WebP
function convertToWebP(inputPath, outputPath, quality = 80) {
  try {
    const command = `magick "${inputPath}" -quality ${quality} "${outputPath}"`;
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ Converted: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Failed to convert ${inputPath}:`, error.message);
  }
}

// Optimize existing WebP images
function optimizeWebP(inputPath, quality = 80) {
  try {
    const tempPath = inputPath.replace('.webp', '_temp.webp');
    const command = `magick "${inputPath}" -quality ${quality} "${tempPath}" && mv "${tempPath}" "${inputPath}"`;
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ Optimized: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`❌ Failed to optimize ${inputPath}:`, error.message);
  }
}

// Process all images in a directory
function processImages(directory) {
  const imageExtensions = ['.jpg', '.jpeg', '.png'];
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const ext = path.extname(file).toLowerCase();
    
    if (imageExtensions.includes(ext)) {
      const webpPath = filePath.replace(ext, '.webp');
      convertToWebP(filePath, webpPath);
    } else if (ext === '.webp') {
      optimizeWebP(filePath);
    }
  });
}

// Main execution
function main() {
  if (!checkImageMagick()) {
    return;
  }
  
  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  
  if (!fs.existsSync(imagesDir)) {
    console.log('Creating images directory...');
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  console.log('🖼️  Starting image optimization...');
  processImages(imagesDir);
  console.log('✨ Image optimization complete!');
}

if (require.main === module) {
  main();
}

module.exports = { convertToWebP, optimizeWebP, processImages };
