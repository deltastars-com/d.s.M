const { createCanvas } = require('canvas');
const fs = require('fs');

const sizes = [48, 72, 96, 128, 144, 152, 180, 192, 384, 512];

function drawLogo(ctx, size, padding) {
  const w = size;
  const h = size;
  const p = padding || 0;
  const drawW = w - p * 2;
  const drawH = h - p * 2;
  const cx = w / 2;
  const cy = h / 2;

  // White rounded background
  const r = drawW * 0.19;
  ctx.beginPath();
  ctx.moveTo(p + r, p);
  ctx.lineTo(p + drawW - r, p);
  ctx.quadraticCurveTo(p + drawW, p, p + drawW, p + r);
  ctx.lineTo(p + drawW, p + drawH - r);
  ctx.quadraticCurveTo(p + drawW, p + drawH, p + drawW - r, p + drawH);
  ctx.lineTo(p + r, p + drawH);
  ctx.quadraticCurveTo(p, p + drawH, p, p + drawH - r);
  ctx.lineTo(p, p + r);
  ctx.quadraticCurveTo(p, p, p + r, p);
  ctx.closePath();
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  // Green DS text
  const fontSize = Math.round(drawW * 0.39);
  ctx.font = 'bold italic ' + fontSize + 'px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const gradient = ctx.createLinearGradient(p + drawW * 0.2, p, p + drawW * 0.8, p + drawH);
  gradient.addColorStop(0, '#1a8c2e');
  gradient.addColorStop(0.5, '#2db846');
  gradient.addColorStop(1, '#1a8c2e');
  ctx.fillStyle = gradient;
  ctx.fillText('DS', cx, cy * 1.04);

  // DELTA STARS text
  const titleSize = Math.round(drawW * 0.1);
  ctx.font = '800 ' + titleSize + 'px Arial, sans-serif';
  ctx.fillStyle = '#1a1a1a';
  ctx.fillText('DELTA STARS', cx, cy * 1.52);

  // Tagline
  const tagSize = Math.round(drawW * 0.04);
  ctx.font = '400 ' + tagSize + 'px Arial, sans-serif';
  ctx.fillStyle = '#6b7b6b';
  ctx.fillText('PREMIUM QUALITY • FRESH & NATURAL', cx, cy * 1.74);
}

// Generate all icon sizes
sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  drawLogo(ctx, size, 0);
  fs.writeFileSync('public/icon-' + size + '.png', canvas.toBuffer('image/png'));
  console.log('Generated icon-' + size + '.png');
});

// Maskable icon (full bleed - no rounded corners)
const canvas512 = createCanvas(512, 512);
const ctx512 = canvas512.getContext('2d');
ctx512.fillStyle = '#ffffff';
ctx512.fillRect(0, 0, 512, 512);
const g = ctx512.createLinearGradient(100, 0, 412, 512);
g.addColorStop(0, '#1a8c2e');
g.addColorStop(0.5, '#2db846');
g.addColorStop(1, '#1a8c2e');
ctx512.font = 'bold italic 200px Georgia, serif';
ctx512.textAlign = 'center';
ctx512.textBaseline = 'middle';
ctx512.fillStyle = g;
ctx512.fillText('DS', 256, 265);
ctx512.font = '800 52px Arial, sans-serif';
ctx512.fillStyle = '#1a1a1a';
ctx512.fillText('DELTA STARS', 256, 390);
ctx512.font = '400 22px Arial, sans-serif';
ctx512.fillStyle = '#6b7b6b';
ctx512.fillText('PREMIUM QUALITY • FRESH & NATURAL', 256, 430);
fs.writeFileSync('public/icon-512-maskable.png', canvas512.toBuffer('image/png'));
console.log('Generated icon-512-maskable.png');

// Splash logo
const splash = createCanvas(512, 512);
const splashCtx = splash.getContext('2d');
drawLogo(splashCtx, 512, 0);
fs.writeFileSync('public/splash-logo.png', splash.toBuffer('image/png'));
console.log('Generated splash-logo.png');

// OpenGraph image (1200x630)
const og = createCanvas(1200, 630);
const ogCtx = og.getContext('2d');
ogCtx.fillStyle = '#ffffff';
ogCtx.fillRect(0, 0, 1200, 630);
// Green header bar
ogCtx.fillStyle = '#0d5c1a';
ogCtx.fillRect(0, 0, 1200, 20);
// DS logo in center
ogCtx.font = 'bold italic 220px Georgia, serif';
ogCtx.textAlign = 'center';
ogCtx.textBaseline = 'middle';
const ogGrad = ogCtx.createLinearGradient(300, 100, 900, 500);
ogGrad.addColorStop(0, '#1a8c2e');
ogGrad.addColorStop(0.5, '#2db846');
ogGrad.addColorStop(1, '#1a8c2e');
ogCtx.fillStyle = ogGrad;
ogCtx.fillText('DS', 600, 280);
ogCtx.font = '800 64px Arial, sans-serif';
ogCtx.fillStyle = '#1a1a1a';
ogCtx.fillText('DELTA STARS', 600, 430);
ogCtx.font = '400 28px Arial, sans-serif';
ogCtx.fillStyle = '#6b7b6b';
ogCtx.fillText('PREMIUM QUALITY • FRESH & NATURAL', 600, 490);
fs.writeFileSync('public/opengraph.jpg', og.toBuffer('image/jpeg', { quality: 0.92 }));
console.log('Generated opengraph.jpg');

// Copy official_logo.png (same as icon-512)
fs.copyFileSync('public/icon-512.png', 'public/official_logo.png');
console.log('Generated official_logo.png');

console.log('\n✅ All icons generated successfully!');
