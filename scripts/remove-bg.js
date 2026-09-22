const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

function dist(r, g, b, br, bg, bb) {
  const dr = r - br;
  const dg = g - bg;
  const db = b - bb;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function sampleCorners(data, width, height) {
  const samples = [];
  const s = Math.max(10, Math.round(Math.min(width, height) * 0.05));
  const regions = [
    [2, 2],
    [width - s - 2, 2],
    [2, height - s - 2],
    [width - s - 2, height - s - 2],
  ];
  for (const [sx, sy] of regions) {
    for (let y = sy; y < sy + s; y += 2) {
      for (let x = sx; x < sx + s; x += 2) {
        const i = (y * width + x) * 4;
        samples.push([data[i], data[i + 1], data[i + 2]]);
      }
    }
  }
  return [median(samples.map((c) => c[0])), median(samples.map((c) => c[1])), median(samples.map((c) => c[2]))];
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

function keyPixel(r, g, b, bg, mode) {
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  const goldness = (r + g) / 2 - b;
  const sat = Math.max(r, g, b) - Math.min(r, g, b);
  const d = dist(r, g, b, bg[0], bg[1], bg[2]);

  if (mode === "cream") {
    if (goldness > 18 && sat > 22 && luma < 228) return 1;
    if (luma > 170 && goldness < 26) return 0;
    if (sat < 18) return 0;
    return Math.min(1, sat / 30);
  }

  if (mode === "map") {
    if (goldness > 18 || luma > 92) return 1;
    if (luma < 58 && goldness < 16) return 0;
    return Math.max(0, Math.min(1, (luma - 58) / 34));
  }

  if (mode === "photo") {
    const greenSurface = g > r + 4 && g >= b - 8 && goldness < 36;
    if (greenSurface && luma < 125) return 0;
    if (goldness > 38 && luma > 55) return 1;
    if (r > 118 && luma > 112 && !greenSurface) return 1;
    return 0;
  }

  if (goldness > 30 && luma > 48) return 1;
  if (luma > 125 && sat > 20) return 1;
  if (d < 26) return 0;
  if (luma < 88 && goldness < 24) {
    return Math.max(0, Math.min(1, (d - 26) / 50, (luma - 42) / 50));
  }
  return Math.max(0, Math.min(1, (d - 26) / 48));
}

function despeckle(alpha, width, height) {
  const next = new Float32Array(alpha);
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
      if (alpha[p] > 0.7 && avg < 0.28) next[p] = 0;
      if (alpha[p] < 0.25 && avg > 0.72) next[p] = 1;
    }
  }
  return next;
}

const files = [
  { src: "scripts/image-backup/hero-molecular.png", dest: "public/images/hero/hero-molecular-nobg.png", mode: "gold" },
  { src: "scripts/image-backup/about-dna-tree.png", dest: "public/images/hero/about-dna-tree-nobg.png", mode: "gold" },
  { src: "scripts/image-backup/focus-molecular.png", dest: "public/images/hero/focus-molecular-nobg.png", mode: "cream" },
  { src: "scripts/image-backup/capsules.png", dest: "public/images/products/capsules-nobg.png", mode: "photo" },
  { src: "scripts/image-backup/handshake.png", dest: "public/images/partnership/handshake-nobg.png", mode: "gold" },
  { src: "scripts/image-backup/dna-helix.png", dest: "public/images/partnership/dna-helix-nobg.png", mode: "gold" },
  { src: "scripts/image-backup/shield.png", dest: "public/images/quality/shield-nobg.png", mode: "gold" },
  { src: "scripts/image-backup/world-map.png", dest: "public/images/global/world-map-nobg.png", mode: "map" },
  { src: "scripts/image-backup/og-cover.png", dest: "public/images/og-cover-nobg.png", mode: "gold" },
];

async function run() {
  for (const item of files) {
    const input = path.resolve(item.src);
    if (!fs.existsSync(input)) {
      throw new Error(`Missing backup ${item.src}`);
    }
    const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const pixels = new Uint8Array(data);
    const bg = sampleCorners(pixels, info.width, info.height);
    const alpha = new Float32Array(info.width * info.height);

    if (item.mode === "photo" || item.mode === "cream") {
      const visited = floodBackground(pixels, info.width, info.height, (r, g, b) => {
        const luma = 0.299 * r + 0.587 * g + 0.114 * b;
        const goldness = (r + g) / 2 - b;
        if (item.mode === "cream") {
          const sat = Math.max(r, g, b) - Math.min(r, g, b);
          return luma > 158 && sat < 52 && goldness < 45;
        }
        const greenSurface = g > r + 3 && g >= b - 10 && goldness < 40 && luma < 140;
        return greenSurface || (dist(r, g, b, bg[0], bg[1], bg[2]) < 55 && luma < 110 && goldness < 30);
      });
      for (let p = 0; p < visited.length; p += 1) {
        alpha[p] = visited[p] ? 0 : 1;
      }
    } else {
      for (let p = 0; p < info.width * info.height; p += 1) {
        const i = p * 4;
        alpha[p] = keyPixel(pixels[i], pixels[i + 1], pixels[i + 2], bg, item.mode);
      }
    }

    const cleaned = despeckle(alpha, info.width, info.height);
    let transparent = 0;
    for (let p = 0; p < cleaned.length; p += 1) {
      const i = p * 4;
      const a = Math.max(0, Math.min(1, cleaned[p]));
      if (a < 0.12) {
        pixels[i] = 0;
        pixels[i + 1] = 0;
        pixels[i + 2] = 0;
        pixels[i + 3] = 0;
        transparent += 1;
      } else {
        pixels[i + 3] = Math.round(a * 255);
      }
    }

    const dest = path.resolve(item.dest);
    await sharp(Buffer.from(pixels), {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .png({ compressionLevel: 9 })
      .toFile(dest);

    const pct = ((transparent / cleaned.length) * 100).toFixed(1);
    console.log(`${path.basename(dest)}  bg~${bg.join(",")}  transparent ${pct}%`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
