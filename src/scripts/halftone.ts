// One-ink halftone "photos": draw a picture in greys offscreen, then re-print it as
// dots on a 45° screen, in ink on the canvas's paper colour.

type Ctx = CanvasRenderingContext2D;
type Pt = [number, number];

function poly(o: Ctx, W: number, H: number, pts: Pt[], fill: string | CanvasGradient) {
  o.beginPath();
  pts.forEach(([px, py], i) => (i ? o.lineTo(px * W, py * H) : o.moveTo(px * W, py * H)));
  o.closePath();
  o.fillStyle = fill;
  o.fill();
}
function glow(o: Ctx, W: number, H: number, edge: string) {
  const g = o.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.7);
  g.addColorStop(0, "#fff");
  g.addColorStop(1, edge);
  o.fillStyle = g;
  o.fillRect(0, 0, W, H);
}
function lines(o: Ctx, W: number, H: number, x0: number, y0: number, n: number, step: number) {
  for (let i = 0; i < n; i++) {
    const w = (0.1 + ((i * 53) % 7) * 0.045) * W;
    const indent = ((i * 3) % 4) * W * 0.025;
    o.fillRect(x0 + indent, y0 + i * H * step, w, H * 0.018);
  }
}

const art: Record<string, (o: Ctx, W: number, H: number) => void> = {
  nuc(o, W, H) {
    glow(o, W, H, "#bdbdbd");
    const sh = o.createRadialGradient(W * 0.52, H * 0.7, 0, W * 0.52, H * 0.7, W * 0.4);
    sh.addColorStop(0, "rgba(0,0,0,.6)");
    sh.addColorStop(1, "rgba(0,0,0,0)");
    o.fillStyle = sh;
    o.fillRect(0, 0, W, H);
    const top = o.createLinearGradient(0, H * 0.26, 0, H * 0.5);
    top.addColorStop(0, "#c8c8c8");
    top.addColorStop(1, "#8a8a8a");
    poly(o, W, H, [[0.14, 0.4], [0.6, 0.26], [0.88, 0.37], [0.42, 0.52]], top);
    poly(o, W, H, [[0.14, 0.4], [0.42, 0.52], [0.42, 0.7], [0.14, 0.57]], "#3a3a3a");
    poly(o, W, H, [[0.42, 0.52], [0.88, 0.37], [0.88, 0.54], [0.42, 0.7]], "#666");
    for (const [a, b] of [[0.5, 0.56], [0.61, 0.52], [0.72, 0.48]]) {
      poly(o, W, H, [[a, b], [a + 0.07, b - 0.025], [a + 0.07, b + 0.015], [a, b + 0.04]], "#111");
    }
    o.strokeStyle = "#111";
    o.lineWidth = Math.max(3, W * 0.012);
    o.lineJoin = "round";
    o.beginPath();
    for (const [i, [px, py]] of ([[0.14, 0.4], [0.6, 0.26], [0.88, 0.37], [0.88, 0.54], [0.42, 0.7], [0.14, 0.57]] as Pt[]).entries()) {
      i ? o.lineTo(px * W, py * H) : o.moveTo(px * W, py * H);
    }
    o.closePath();
    o.moveTo(W * 0.14, H * 0.4);
    o.lineTo(W * 0.42, H * 0.52);
    o.lineTo(W * 0.88, H * 0.37);
    o.moveTo(W * 0.42, H * 0.52);
    o.lineTo(W * 0.42, H * 0.7);
    o.stroke();
    o.beginPath();
    o.arc(W * 0.22, H * 0.5, W * 0.012, 0, 6.283);
    o.fillStyle = "#fff";
    o.fill();
  },
  laptop(o, W, H) {
    glow(o, W, H, "#c0c0c0");
    poly(o, W, H, [[0.2, 0.14], [0.78, 0.1], [0.8, 0.62], [0.18, 0.64]], "#1a1a1a");
    poly(o, W, H, [[0.23, 0.18], [0.75, 0.145], [0.77, 0.58], [0.21, 0.6]], "#2c2c2c");
    for (let i = 0; i < 9; i++) {
      const y = 0.22 + i * 0.04;
      const w = 0.2 + ((i * 37) % 5) * 0.06;
      poly(o, W, H, [[0.26, y], [0.26 + w, y - 0.006], [0.26 + w, y + 0.012], [0.26, y + 0.018]], i % 3 ? "#9a9a9a" : "#e0e0e0");
    }
    const base = o.createLinearGradient(0, H * 0.64, 0, H * 0.9);
    base.addColorStop(0, "#3a3a3a");
    base.addColorStop(1, "#111");
    poly(o, W, H, [[0.18, 0.64], [0.8, 0.62], [0.96, 0.86], [0.04, 0.9]], base);
    o.beginPath();
    o.arc(W * 0.5, H * 0.76, W * 0.012, 0, 6.283);
    o.fillStyle = "#fff";
    o.fill();
  },
  key(o, W, H) {
    glow(o, W, H, "#c2c2c2");
    o.save();
    o.translate(W * 0.5, H * 0.52);
    o.rotate(-0.35);
    const g = o.createLinearGradient(0, -H * 0.14, 0, H * 0.14);
    g.addColorStop(0, "#555");
    g.addColorStop(1, "#111");
    o.fillStyle = g;
    o.fillRect(-W * 0.34, -H * 0.13, W * 0.6, H * 0.26);
    o.fillStyle = "#d8d8d8";
    o.fillRect(W * 0.26, -H * 0.08, W * 0.12, H * 0.16);
    o.beginPath();
    o.arc(-W * 0.26, 0, H * 0.045, 0, 6.283);
    o.fillStyle = "#fff";
    o.fill();
    o.restore();
  },
  flake(o, W, H) {
    glow(o, W, H, "#bfbfbf");
    o.save();
    o.translate(W * 0.5, H * 0.5);
    o.rotate(0.08);
    o.fillStyle = "#fafafa";
    o.fillRect(-W * 0.28, -H * 0.42, W * 0.56, H * 0.84);
    o.fillStyle = "#222";
    lines(o, W, H, -W * 0.22, -H * 0.33, 12, 0.055);
    o.translate(W * 0.1, H * 0.22);
    o.strokeStyle = "#444";
    o.lineWidth = W * 0.02;
    for (let k = 0; k < 6; k++) {
      o.rotate(Math.PI / 3);
      o.beginPath();
      o.moveTo(0, 0);
      o.lineTo(0, -H * 0.12);
      o.stroke();
    }
    o.restore();
  },
  // A printed CV page: name block, rule, columns of text.
  page(o, W, H) {
    glow(o, W, H, "#bcbcbc");
    o.save();
    o.translate(W * 0.5, H * 0.5);
    o.rotate(-0.06);
    o.fillStyle = "#fafafa";
    o.fillRect(-W * 0.26, -H * 0.44, W * 0.52, H * 0.88);
    o.fillStyle = "#111";
    o.fillRect(-W * 0.21, -H * 0.37, W * 0.24, H * 0.05);
    o.fillStyle = "#555";
    o.fillRect(-W * 0.21, -H * 0.29, W * 0.42, H * 0.008);
    o.fillStyle = "#333";
    lines(o, W, H, -W * 0.21, -H * 0.24, 6, 0.045);
    lines(o, W, H, -W * 0.21, H * 0.06, 6, 0.045);
    o.restore();
  },
  bust(o, W, H) {
    glow(o, W, H, "#b8b8b8");
    const s = o.createLinearGradient(0, H * 0.6, 0, H);
    s.addColorStop(0, "#3a3a3a");
    s.addColorStop(1, "#0e0e0e");
    o.fillStyle = s;
    o.beginPath();
    o.ellipse(W * 0.5, H * 1.02, W * 0.46, H * 0.36, 0, 0, 6.283);
    o.fill();
    o.fillStyle = "#7a7a7a";
    o.fillRect(W * 0.43, H * 0.48, W * 0.14, H * 0.2);
    const h = o.createRadialGradient(W * 0.44, H * 0.3, W * 0.02, W * 0.5, H * 0.34, W * 0.26);
    h.addColorStop(0, "#e8e8e8");
    h.addColorStop(1, "#5a5a5a");
    o.fillStyle = h;
    o.beginPath();
    o.ellipse(W * 0.5, H * 0.34, W * 0.2, H * 0.2, 0, 0, 6.283);
    o.fill();
    o.fillStyle = "#1c1c1c";
    o.beginPath();
    o.ellipse(W * 0.5, H * 0.2, W * 0.21, H * 0.1, 0, Math.PI, 0);
    o.fill();
  },
};

function screen(cv: HTMLCanvasElement, source: (o: Ctx, W: number, H: number) => void) {
  const { width: W, height: H } = cv;
  const off = document.createElement("canvas");
  off.width = W;
  off.height = H;
  const o = off.getContext("2d", { willReadFrequently: true })!;
  o.fillStyle = "#fff";
  o.fillRect(0, 0, W, H);
  source(o, W, H);
  const data = o.getImageData(0, 0, W, H).data;
  const x = cv.getContext("2d")!;
  x.fillStyle = getComputedStyle(cv).backgroundColor;
  x.fillRect(0, 0, W, H);
  x.fillStyle = "#1d1813";
  const cell = Math.max(5, Math.round(W / 70));
  const ca = Math.cos(Math.PI / 4);
  const sa = Math.sin(Math.PI / 4);
  const D = Math.hypot(W, H);
  for (let u = -D; u < D; u += cell) {
    for (let v = -D; v < D; v += cell) {
      const px = W / 2 + u * ca - v * sa;
      const py = H / 2 + u * sa + v * ca;
      if (px < 0 || py < 0 || px >= W || py >= H) continue;
      const i = ((py | 0) * W + (px | 0)) * 4;
      const lum = (data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11) / 255;
      const r = Math.pow(1 - lum, 0.9) * cell * 0.66;
      if (r > 0.35) {
        x.beginPath();
        x.arc(px, py, r, 0, 6.283);
        x.fill();
      }
    }
  }
}

export function halftones(): void {
  document.querySelectorAll<HTMLCanvasElement>("canvas[data-ht]").forEach((cv) => {
    const { src, ht } = cv.dataset;
    if (src) {
      const img = new Image();
      img.onload = () =>
        screen(cv, (o, W, H) => {
          const k = Math.max(W / img.width, H / img.height);
          o.drawImage(img, (W - img.width * k) / 2, (H - img.height * k) / 2, img.width * k, img.height * k);
        });
      img.src = src;
    } else if (ht && art[ht]) {
      screen(cv, art[ht]);
    }
  });
}
