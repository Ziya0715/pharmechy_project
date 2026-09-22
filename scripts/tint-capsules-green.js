const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

function dist(r, g, b, br, bg, bb) {
  const dr = r - br;
  const dg = g - bg;
  const db = b - bb;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

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

function hslToRgb(h, s, l) {
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  let r;
  let g;
  let b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function floodBackground(data, width, height, isBg) {
  const visited = new Uint8Array(width * height);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (visited[p]) return;
    const i = p * 4;
    if (!isBg(data[i], data[i + 1], data[i + 2])) return;
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
  return visited;
}

async function run() {
  const src = path.resolve("public/images/products/capsules.png");
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = new Uint8Array(data);
  const { width, height } = info;

  const bg = [0, 0, 0];
  let n = 0;
  for (const [x, y] of [
    [8, 8],
    [width - 9, 8],
    [8, height - 9],
    [width - 9, height - 9],
  ]) {
    const i = (y * width + x) * 4;
    bg[0] += pixels[i];
    bg[1] += pixels[i + 1];
    bg[2] += pixels[i + 2];
    n += 1;
  }
  bg[0] /= n;
  bg[1] /= n;
  bg[2] /= n;

  const visited = floodBackground(pixels, width, height, (r, g, b) => {
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    const goldness = (r + g) / 2 - b;
    const greenSurface = g > r + 3 && g >= b - 10 && goldness < 40 && luma < 140;
    return greenSurface || (dist(r, g, b, bg[0], bg[1], bg[2]) < 55 && luma < 110 && goldness < 30);
  });

  for (let p = 0; p < width * height; p += 1) {
    const i = p * 4;
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    const goldness = (r + g) / 2 - b;

    if (visited[p]) {
      pixels[i] = 0;
      pixels[i + 1] = 0;
      pixels[i + 2] = 0;
      pixels[i + 3] = 0;
      continue;
    }

    const [h, s, l] = rgbToHsl(r, g, b);
    let nr;
    let ng;
    let nb;

    if (goldness > 36 && luma > 50) {
      const [tr, tg, tb] = hslToRgb(0.32, Math.min(0.55, s * 0.85 + 0.12), Math.min(0.72, l + 0.04));
      const t = 0.78;
      nr = Math.round(r * (1 - t) + tr * t);
      ng = Math.round(g * (1 - t) + tg * t);
      nb = Math.round(b * (1 - t) + tb * t);
    } else {
      const [tr, tg, tb] = hslToRgb(0.38, Math.min(0.34, 0.16 + s * 0.45), Math.min(0.86, l + 0.03));
      const t = Math.min(0.88, 0.45 + (l - 0.25) * 0.9);
      nr = Math.round(r * (1 - t) + tr * t);
      ng = Math.round(g * (1 - t) + tg * t);
      nb = Math.round(b * (1 - t) + tb * t);
    }

    pixels[i] = Math.max(0, Math.min(255, nr));
    pixels[i + 1] = Math.max(0, Math.min(255, ng));
    pixels[i + 2] = Math.max(0, Math.min(255, nb));
  }

  const destNobg = path.resolve("public/images/products/capsules-green-nobg.png");
  await sharp(Buffer.from(pixels), { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(destNobg);

  const destFlat = path.resolve("public/images/products/capsules-green.png");
  await sharp(Buffer.from(pixels), { raw: { width, height, channels: 4 } })
    .flatten({ background: { r: 11, g: 59, b: 46 } })
    .png({ compressionLevel: 9 })
    .toFile(destFlat);

  console.log("Wrote light-green capsules");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
