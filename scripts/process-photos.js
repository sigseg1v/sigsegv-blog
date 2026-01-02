#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');

const CONFIG = {
  sourceDir: path.join(__dirname, '../static/photography'),
  outputDir: path.join(__dirname, '../static/photography/dist'),
  thumbnailDir: path.join(__dirname, '../static/photography/dist/thumbnails'),
  mediumDir: path.join(__dirname, '../static/photography/dist/medium'),

  // Size targets based on requirements
  thumbnail: {
    maxDimension: 600,     // 600x600px max (matches 700px display max)
    targetSizeKB: 150,     // ~150KB target (reduced from 200KB)
    quality: 85,           // Starting quality
    minQuality: 70         // Don't go below this
  },

  medium: {
    maxDimension: 2000,    // 2000x2000px max
    targetSizeKB: 750,     // ~500KB-1MB target (aim for middle)
    quality: 90,           // Starting quality
    minQuality: 80         // Don't go below this
  }
};

// Hash tracking for idempotent processing
const HASH_FILE = path.join(CONFIG.outputDir, '.processed-hashes.json');

/**
 * Calculate MD5 hash of file for change detection
 */
function getFileHash(filepath) {
  const buffer = fs.readFileSync(filepath);
  return crypto.createHash('md5').update(buffer).digest('hex');
}

/**
 * Load previously processed file hashes
 */
function loadProcessedHashes() {
  if (!fs.existsSync(HASH_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(HASH_FILE, 'utf8'));
  } catch (e) {
    console.warn('⚠️  Could not load hash file, will reprocess all images');
    return {};
  }
}

/**
 * Save processed file hashes
 */
function saveProcessedHashes(hashes) {
  fs.writeFileSync(HASH_FILE, JSON.stringify(hashes, null, 2));
}

/**
 * Check if image needs processing
 */
function needsProcessing(filename, currentHash, processedHashes) {
  return !processedHashes[filename] || processedHashes[filename] !== currentHash;
}

/**
 * Process image to target size with quality adjustment
 */
async function processImage(inputPath, outputPath, config) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  // Resize maintaining aspect ratio
  let resized = image.resize(config.maxDimension, config.maxDimension, {
    fit: 'inside',
    withoutEnlargement: true
  });

  // Strip all metadata including EXIF (rotate first to preserve orientation)
  resized = resized.rotate();

  let quality = config.quality;
  let outputBuffer;

  // Iteratively reduce quality to hit target size
  while (quality >= config.minQuality) {
    outputBuffer = await resized
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();

    const sizeKB = outputBuffer.length / 1024;

    if (sizeKB <= config.targetSizeKB) {
      break;
    }

    // If still too large, reduce quality by 5
    quality -= 5;
  }

  // Write final output
  await fs.promises.writeFile(outputPath, outputBuffer);

  const finalSizeKB = outputBuffer.length / 1024;
  return {
    originalSize: metadata.width + 'x' + metadata.height,
    outputSize: finalSizeKB.toFixed(1) + 'KB',
    quality
  };
}

/**
 * Main processing function
 */
async function processPhotos() {
  console.log('📸 Starting photo processing...\n');

  // Ensure directories exist
  [CONFIG.outputDir, CONFIG.thumbnailDir, CONFIG.mediumDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Load existing hashes
  const processedHashes = loadProcessedHashes();
  const newHashes = {};

  // Get all JPG files from source directory
  const files = fs.readdirSync(CONFIG.sourceDir)
    .filter(f => /\.(jpg|jpeg)$/i.test(f))
    .sort();

  if (files.length === 0) {
    console.log('⚠️  No JPG files found in', CONFIG.sourceDir);
    return;
  }

  console.log(`Found ${files.length} images to process\n`);

  let processedCount = 0;
  let skippedCount = 0;

  for (const filename of files) {
    const sourcePath = path.join(CONFIG.sourceDir, filename);
    const baseName = path.parse(filename).name;
    const currentHash = getFileHash(sourcePath);

    newHashes[filename] = currentHash;

    // Skip if already processed and unchanged
    if (!needsProcessing(filename, currentHash, processedHashes)) {
      console.log(`⏭️  Skipping ${filename} (unchanged)`);
      skippedCount++;
      continue;
    }

    console.log(`📸 Processing ${filename}...`);

    try {
      // Generate thumbnail
      const thumbPath = path.join(CONFIG.thumbnailDir, baseName + '.jpg');
      const thumbResult = await processImage(sourcePath, thumbPath, CONFIG.thumbnail);
      console.log(`   ✓ Thumbnail: ${thumbResult.outputSize} (quality ${thumbResult.quality})`);

      // Generate medium size
      const mediumPath = path.join(CONFIG.mediumDir, baseName + '.jpg');
      const mediumResult = await processImage(sourcePath, mediumPath, CONFIG.medium);
      console.log(`   ✓ Medium: ${mediumResult.outputSize} (quality ${mediumResult.quality})`);

      processedCount++;
    } catch (error) {
      console.error(`   ✗ Error processing ${filename}:`, error.message);
    }

    console.log('');
  }

  // Save updated hashes
  saveProcessedHashes(newHashes);

  console.log('✅ Processing complete!');
  console.log(`   Processed: ${processedCount}`);
  console.log(`   Skipped: ${skippedCount}`);
  console.log(`   Total: ${files.length}\n`);
}

// Run the script
processPhotos().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
