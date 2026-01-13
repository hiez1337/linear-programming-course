const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '..', 'assets');
const outputDir = path.join(__dirname, '..', 'src', 'assets', 'images');

// Создаем выходную директорию если не существует
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  const files = fs.readdirSync(inputDir);
  
  for (const file of files) {
    if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const inputPath = path.join(inputDir, file);
      const outputName = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      const outputPath = path.join(outputDir, outputName);
      
      try {
        await sharp(inputPath)
          .webp({ quality: 85 })
          .toFile(outputPath);
        
        console.log(`✓ Converted: ${file} → ${outputName}`);
        
        // Также копируем оригинал как fallback
        const fallbackPath = path.join(outputDir, file);
        await sharp(inputPath)
          .resize(1200, null, { withoutEnlargement: true })
          .toFile(fallbackPath);
        
        console.log(`✓ Optimized original: ${file}`);
      } catch (error) {
        console.error(`✗ Error processing ${file}:`, error.message);
      }
    }
  }
  
  console.log('\n✓ Image optimization complete!');
}

optimizeImages().catch(console.error);
