const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SVG_PATH = path.join(__dirname, '..', 'public', 'favicon.svg');
const OUTPUT_DIR = path.join(__dirname, '..', 'public');

const sizes = [
  { name: 'icon-48.png', size: 48 },
  { name: 'icon-72.png', size: 72 },
  { name: 'icon-96.png', size: 96 },
  { name: 'icon-128.png', size: 128 },
  { name: 'icon-144.png', size: 144 },
  { name: 'icon-152.png', size: 152 },
  { name: 'icon-180.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-384.png', size: 384 },
  { name: 'icon-512.png', size: 512 },
  { name: 'splash-logo.png', size: 512 },
  { name: 'opengraph.jpg', size: 1200, height: 630, format: 'jpeg' },
  { name: 'official_logo.png', size: 512 },
];

async function generateIcons() {
  const svgBuffer = fs.readFileSync(SVG_PATH);
  
  for (const icon of sizes) {
    const width = icon.size;
    const height = icon.height || icon.size;
    const format = icon.format || 'png';
    const ext = format === 'jpeg' ? 'jpg' : 'png';
    const outputPath = path.join(OUTPUT_DIR, `${icon.name}`);
    
    try {
      await sharp(svgBuffer)
        .resize(width, height, { fit: 'contain', background: { r: 11, g: 29, b: 11, alpha: 1 } })
        .toFormat(format, { quality: 95 })
        .toFile(outputPath);
      
      console.log(`✅ Generated: ${icon.name} (${width}x${height})`);
    } catch (err) {
      console.error(`❌ Failed: ${icon.name} - ${err.message}`);
    }
  }
  
  // Also generate maskable icon (with padding)
  try {
    await sharp(svgBuffer)
      .resize(512, 512, { fit: 'contain', background: { r: 11, g: 29, b: 11, alpha: 1 } })
      .toFile(path.join(OUTPUT_DIR, 'icon-512-maskable.png'));
    console.log('✅ Generated: icon-512-maskable.png');
  } catch (err) {
    console.error(`❌ Failed: icon-512-maskable.png - ${err.message}`);
  }

  // Generate simple ICO (using the 192px PNG)
  try {
    const icoBuffer = await sharp(svgBuffer)
      .resize(192, 192, { fit: 'contain', background: { r: 11, g: 29, b: 11, alpha: 1 } })
      .png()
      .toBuffer();
    
    // Create a minimal ICO file
    const icoHeader = Buffer.alloc(6);
    icoHeader.writeUInt16LE(0, 0); // Reserved
    icoHeader.writeUInt16LE(1, 2); // Type: ICO
    icoHeader.writeUInt16LE(1, 4); // Count: 1 image
    
    const icoDir = Buffer.alloc(16);
    icoDir.writeUInt8(0, 0); // Width (0 = 256)
    icoDir.writeUInt8(0, 1); // Height (0 = 256)
    icoDir.writeUInt8(0, 2); // Color palette
    icoDir.writeUInt8(0, 3); // Reserved
    icoDir.writeUInt16LE(1, 4); // Color planes
    icoDir.writeUInt16LE(32, 6); // Bits per pixel
    icoDir.writeUInt32LE(icoBuffer.length, 8); // Size of image data
    icoDir.writeUInt32LE(22, 12); // Offset to image data
    
    const icoFile = Buffer.concat([icoHeader, icoDir, icoBuffer]);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'favicon.ico'), icoFile);
    console.log('✅ Generated: favicon.ico');
  } catch (err) {
    console.error(`❌ Failed: favicon.ico - ${err.message}`);
  }
  
  console.log('\n🎉 All icons generated successfully!');
}

generateIcons().catch(console.error);
