const sharp = require("sharp");
const path = require("path");

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h / 6, s, l];
}

function magentaScore(r, g, b) {
  const [h, s, l] = rgbToHsl(r, g, b);
  const pinkHue = h > 0.78 || h < 0.06;
  if (!pinkHue) return 0;
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  if (luma > 210 && s < 0.18) return 0;
  if (g + 12 >= r && g + 12 >= b && s < 0.35) return 0;
  if (g > r + 8 && g > b) return 0;
  const chroma = (r + b) / 2 - g;
  if (chroma < 18 || s < 0.18) return 0;
  return Math.min(1, (chroma - 18) / 70 + (s - 0.18));
}

async function run() {
  const src = path.resolve(
    "C:/Users/unais/.cursor/projects/c-Users-unais-OneDrive-Desktop-Metta-Global-Lifescience/assets/capsules-stacked-magenta.png"
  );
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = new Uint8Array(data);
  const { width, height } = info;
  const score = new Float32Array(width * height);

  for (let p = 0; p < width * height; p += 1) {
    const i = p * 4;
    score[p] = magentaScore(pixels[i], pixels[i + 1], pixels[i + 2]);
  }

  const visited = new Uint8Array(width * height);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (visited[p] || score[p] < 0.28) return;
    visited[p] = 1;
    stack.push(p);
  };
  for (let x = 0; x < width; x += 1) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    push(0, y);
    push(width - 1, y);
  }
  while (stack.length) {
    const p = stack.pop();
    const x = p % width;
    const y = (p / width) | 0;
    push(x - 1, y);
    push(x + 1, y);
    push(x, y - 1);
    push(x, y + 1);
  }

  const alpha = new Float32Array(width * height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const p = y * width + x;
      const i = p * 4;
      let a = visited[p] ? 1 - score[p] : 1 - Math.min(0.35, score[p] * 0.4);
      if (score[p] > 0.72 && visited[p]) a = 0;
      if (a < 0.08) a = 0;
      if (a > 0.92) a = 1;
      alpha[p] = a;

      if (a > 0 && score[p] > 0.12) {
        const spill = score[p];
        pixels[i] = Math.round(pixels[i] * (1 - spill * 0.55) + pixels[i + 1] * spill * 0.55);
        pixels[i + 2] = Math.round(pixels[i + 2] * (1 - spill * 0.55) + pixels[i + 1] * spill * 0.55);
      }
    }
  }

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const p = y * width + x;
      let sum = 0;
      for (let oy = -1; oy <= 1; oy += 1) {
        for (let ox = -1; ox <= 1; ox += 1) {
          sum += alpha[(y + oy) * width + (x + ox)];
        }
      }
      const avg = sum / 9;
      if (alpha[p] > 0.8 && avg < 0.22) alpha[p] = 0;
      if (alpha[p] < 0.2 && avg > 0.72) alpha[p] = avg;
    }
  }

  let transparent = 0;
  for (let p = 0; p < width * height; p += 1) {
    const i = p * 4;
    const a = Math.max(0, Math.min(1, alpha[p]));
    if (a < 0.1) {
      pixels[i] = 0;
      pixels[i + 1] = 0;
      pixels[i + 2] = 0;
      pixels[i + 3] = 0;
      transparent += 1;
    } else {
      pixels[i + 3] = Math.round(a * 255);
    }
  }

  const dest = path.resolve("public/images/products/capsules-stacked-nobg.png");
  await sharp(Buffer.from(pixels), { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(dest);

  await sharp(dest)
    .flatten({ background: "#ff00ff" })
    .jpeg({ quality: 85 })
    .toFile("scripts/preview-capsules-stacked-nobg.jpg");

  await sharp(dest)
    .flatten({ background: "#0B3B2E" })
    .jpeg({ quality: 85 })
    .toFile("scripts/preview-capsules-stacked-green.jpg");

  console.log(`transparent ${((transparent / (width * height)) * 100).toFixed(1)}%`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
