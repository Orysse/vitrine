import { fit, state, watch, type Drawable } from "./state";

// Funky grounds painted on a canvas behind a section: an oil "light show" or op-art bands.

const bandPalettes = {
  riley: ["#ffcf5a", "#e2135f", "#ffcf5a", "#7b2ff7", "#ffcf5a", "#18b39b"],
  waves: ["#ff7a1a", "#1d1813", "#ff4fb0", "#1d1813", "#ffe23a", "#1d1813", "#18b3e0", "#1d1813"],
};

function liquid(root: HTMLElement, cv: HTMLCanvasElement): (dt: number) => void {
  const x = cv.getContext("2d")!;
  let ph = Math.random() * 10;
  let push = { x: 0.5, y: 0.5, k: 0 };
  const blobs = ["#e2135f", "#ff7a1a", "#ffcf5a", "#18b39b", "#7b2ff7", "#ff4fb0"].map((c) => ({
    c,
    fx: 0.3 + Math.random() * 0.6,
    fy: 0.3 + Math.random() * 0.6,
    px: Math.random() * 6.28,
    py: Math.random() * 6.28,
    r: 0.26 + Math.random() * 0.18,
  }));
  root.addEventListener("pointermove", (e) => {
    const r = root.getBoundingClientRect();
    push = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, k: 1 };
  });
  return (dt) => {
    const [W, H] = fit(cv, 0.6);
    if (state.running) ph += dt * (0.08 + state.trip * 0.35);
    push.k *= 0.97;
    x.filter = "none";
    x.globalAlpha = 1;
    x.fillStyle = "#1a0b2e";
    x.fillRect(0, 0, W, H);
    x.filter = `blur(${Math.round(Math.min(W, H) * 0.06)}px)`;
    blobs.forEach((b, i) => {
      let cx = 0.5 + 0.4 * Math.sin(ph * b.fx + b.px);
      let cy = 0.5 + 0.38 * Math.cos(ph * b.fy + b.py);
      cx += (cx - push.x) * 0.3 * push.k;
      cy += (cy - push.y) * 0.3 * push.k;
      x.fillStyle = b.c;
      x.globalAlpha = 0.9;
      x.beginPath();
      x.ellipse(cx * W, cy * H, b.r * W * (1 + 0.2 * Math.sin(ph * 2 + i)), b.r * H * (1 + 0.2 * Math.cos(ph * 1.7 + i)), ph * 0.3 + i, 0, 6.283);
      x.fill();
    });
    x.filter = "none";
    x.globalAlpha = 1;
  };
}

function bands(kind: keyof typeof bandPalettes, cv: HTMLCanvasElement): (dt: number) => void {
  const x = cv.getContext("2d")!;
  const pal = bandPalettes[kind];
  let ph = Math.random() * 10;
  return (dt) => {
    const [W, H] = fit(cv, 0.7);
    if (state.running) ph += dt * (0.25 + state.trip * 1.2);
    // Fixed band height in px so tall sections get more bands, not fatter ones.
    const band = (kind === "riley" ? 34 : 18) * Math.min(window.devicePixelRatio || 1, 2) * 0.7;
    const n = Math.ceil(H / band);
    const amp = band * (0.6 + state.trip * 2.2);
    const fq = ((kind === "riley" ? 3 : 2.2) * Math.PI) / Math.max(W, 600);
    const y = (X: number, i: number) => i * band + amp * Math.sin(X * fq + ph + i * 0.35) + amp * 0.5 * Math.sin(X * fq * 0.37 - ph * 0.6);
    for (let i = -4; i < n + 4; i++) {
      x.beginPath();
      for (let X = 0; X <= W; X += 8) X === 0 ? x.moveTo(X, y(X, i)) : x.lineTo(X, y(X, i));
      for (let X = W; X >= 0; X -= 8) x.lineTo(X, y(X, i + 1) + 1);
      x.closePath();
      x.fillStyle = pal[(i + 400) % pal.length];
      x.fill();
    }
  };
}

export function grounds(): Drawable[] {
  return [...document.querySelectorAll<HTMLElement>("[data-ground]")].flatMap((root) => {
    const cv = root.querySelector<HTMLCanvasElement>(":scope > .ground-canvas");
    if (!cv) return [];
    const kind = root.dataset.ground;
    const draw = kind === "liquid" ? liquid(root, cv) : bands(kind === "riley" ? "riley" : "waves", cv);
    draw(0);
    const seen = watch(root);
    return [{ draw, get visible() { return seen.visible; } }];
  });
}
