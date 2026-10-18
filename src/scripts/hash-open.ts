// Opens the fiche named by the URL hash. Without this script the fiches still open and
// close by themselves: this only handles deep links.
function openFromHash(): void {
  let id = location.hash.slice(1);
  try {
    id = decodeURIComponent(id);
  } catch {
    // malformed escape: use the raw hash, it matches nothing
  }
  const el = id ? document.getElementById(id) : null;
  if (!(el instanceof HTMLDetailsElement) || !el.classList.contains("work")) return;
  el.open = true;
  el.scrollIntoView();
}

openFromHash();
addEventListener("hashchange", openFromHash);

// Hover reveal. One blob, shared by all rows, drags after the mouse on a leash: it is anchored a
// little left of the middle of the screen and follows less and less the further the mouse goes,
// much more so to the right. Its outline is redrawn every frame from a few waves and stretches with
// its speed. The picture inside is pulled towards the mouse. When the row changes, the new
// picture is wiped in along a wavy line, from below or above by row order.
// Only custom properties, classes and CSSOM values change, so the CSP stays strict.
const reveal = document.querySelector<HTMLElement>(".reveal");
const pane = reveal?.querySelector<HTMLElement>(".reveal-pane");
const pics = reveal ? [...reveal.querySelectorAll<HTMLElement>("img")] : [];
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
const DRAG = 0.07; // share of the distance to its target that the blob covers each frame
const ANCHOR = 0.42; // where the leash is tied, as a share of the window's width
const LEASH_LEFT = 0.3; // how far the blob can go left of the anchor, as a share of the window
const LEASH_RIGHT = 0.2; // ... and right of it: much shorter, the blob struggles more there
const PULL = 0.3; // share of the distance to the mouse that the picture is shifted by
const MAX = 90; // px, the most the picture is shifted by
const pos = { x: 0, y: 0, tx: 0, ty: 0, mx: 0, my: 0, ix: 0, iy: 0, vx: 0, vy: 0 };
let showing = false;
let running = false;

const clamp = (v: number) => Math.max(-MAX, Math.min(MAX, v));

// The blob's target: the mouse, reeled in by a leash that gives less the more it is pulled.
function target(): void {
  const ax = innerWidth * ANCHOR;
  const ay = innerHeight / 2;
  const lx = innerWidth * (pos.mx < ax ? LEASH_LEFT : LEASH_RIGHT);
  const ly = innerHeight * 0.3;
  pos.tx = ax + lx * Math.tanh((pos.mx - ax) / lx);
  pos.ty = ay + ly * Math.tanh((pos.my - ay) / ly);
}

// A closed, smooth outline through points on a wobbling ellipse (Catmull-Rom as cubic Béziers).
function outline(w: number, h: number, t: number): string {
  const n = 9;
  const speed = Math.min(Math.hypot(pos.vx, pos.vy) / 40, 0.22);
  const dir = Math.atan2(pos.vy, pos.vx);
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const r =
      1 +
      0.11 * Math.sin(3 * a + t * 1.7) +
      0.07 * Math.sin(5 * a - t * 2.3 + 1.3) +
      0.05 * Math.sin(2 * a + t * 1.1 + 2.1) +
      speed * (Math.cos(a - dir) ** 2 - 0.5);
    pts.push([w / 2 + (w / 2.9) * r * Math.cos(a), h / 2 + (h / 2.9) * r * Math.sin(a)]);
  }
  const p = (i: number) => pts[(i + n) % n];
  let d = `M${p(0)[0].toFixed(1)},${p(0)[1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const [p0, p1, p2, p3] = [p(i - 1), p(i), p(i + 1), p(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return `path("${d}Z")`;
}

const WIPE_MS = 520;
let wipe: { pic: HTMLElement; from: 1 | -1; t0: number } | null = null;

// The wiped-in region of a picture: everything past a wavy edge that travels across it.
function wiped(pic: HTMLElement, from: 1 | -1, p: number, t: number): string {
  const w = pic.offsetWidth;
  const h = pic.offsetHeight;
  const amp = h * 0.07;
  const e = p * p * (3 - 2 * p); // ease
  const base = from === 1 ? (h + amp * 2) * (1 - e) - amp : (h + amp * 2) * e - amp;
  let d = "";
  for (let i = 0; i <= 40; i++) {
    const x = (w * i) / 40;
    const y = base + amp * (Math.sin(i * 0.55 + t * 5) + 0.6 * Math.sin(i * 1.3 - t * 7));
    d += `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
  }
  d += from === 1 ? `L${w},${h + amp * 3}L0,${h + amp * 3}Z` : `L${w},${-amp * 3}L0,${-amp * 3}Z`;
  return `path("${d}")`;
}

function frame(now: number): void {
  if (!reveal || !pane) return;
  const k = still ? 1 : DRAG;
  pos.vx = (pos.tx - pos.x) * k;
  pos.vy = (pos.ty - pos.y) * k;
  pos.x += pos.vx;
  pos.y += pos.vy;
  const jx = still ? 0 : clamp((pos.mx - pos.x) * PULL);
  const jy = still ? 0 : clamp((pos.my - pos.y) * PULL);
  pos.ix += (jx - pos.ix) * 0.1;
  pos.iy += (jy - pos.iy) * 0.1;
  reveal.style.setProperty("--x", `${pos.x}px`);
  reveal.style.setProperty("--y", `${pos.y}px`);
  reveal.style.setProperty("--ix", `${pos.ix}px`);
  reveal.style.setProperty("--iy", `${pos.iy}px`);
  pane.style.setProperty("--blob", outline(pane.offsetWidth, pane.offsetHeight, still ? 0 : now / 1000));
  if (wipe) {
    const p = Math.min((now - wipe.t0) / WIPE_MS, 1);
    wipe.pic.style.setProperty("clip-path", p < 1 ? wiped(wipe.pic, wipe.from, p, now / 1000) : "none");
    if (p === 1) {
      for (const pic of pics) pic.classList.remove("leaving");
      wipe = null;
    }
  }
  const settled = !wipe && Math.hypot(pos.tx - pos.x, pos.ty - pos.y, jx - pos.ix, jy - pos.iy) < 0.1;
  running = showing || !settled;
  if (running) requestAnimationFrame(frame);
}

function show(id?: string): void {
  if (!reveal) return;
  const was = showing;
  showing = !!id;
  reveal.classList.toggle("show", showing);
  if (!id) return;
  const next = pics.find((p) => p.dataset.work === id);
  const prev = pics.find((p) => p.classList.contains("on"));
  if (!next || next === prev) return;
  for (const pic of pics) pic.classList.remove("leaving", "on");
  next.classList.add("on");
  next.style.setProperty("clip-path", "none");
  if (prev && was && !still) {
    prev.classList.add("leaving");
    wipe = { pic: next, from: pics.indexOf(next) > pics.indexOf(prev) ? 1 : -1, t0: performance.now() };
    next.style.setProperty("clip-path", wiped(next, wipe.from, 0, 0));
  } else wipe = null;
}

addEventListener("pointermove", (e) => {
  if (!reveal || e.pointerType !== "mouse") return;
  const work = e.target instanceof Element ? e.target.closest<HTMLDetailsElement>("details.work") : null;
  const id = work && !work.open && pics.some((p) => p.dataset.work === work.id) ? work.id : undefined;
  if (!id) return show();
  pos.mx = e.clientX;
  pos.my = e.clientY;
  target();
  if (!showing) Object.assign(pos, { x: pos.tx, y: pos.ty, ix: 0, iy: 0, vx: 0, vy: 0 });
  show(id);
  if (!running) {
    running = true;
    requestAnimationFrame(frame);
  }
});
document.documentElement.addEventListener("mouseleave", () => show());
addEventListener("scroll", () => show(), { passive: true });

// The name ticker runs while the row is hovered. On leaving it is not cut: it stops at the end
// of the lap in progress.
addEventListener("pointerover", (e) => {
  if (e.pointerType !== "mouse" || !(e.target instanceof Element)) return;
  e.target.closest("details.work > summary")?.querySelector(".work-track")?.classList.add("run");
});
addEventListener("animationiteration", (e) => {
  if (!(e.target instanceof Element) || !e.target.classList.contains("work-track")) return;
  if (!e.target.closest("summary")?.matches(":hover")) e.target.classList.remove("run");
});

// Print: open every fiche, then put things back. The shared `name` makes the browser close the
// others whenever one opens, so it is taken off while printing.
let before: { id: string; open: boolean }[] | null = null;
const works = () => [...document.querySelectorAll<HTMLDetailsElement>("details.work")];

addEventListener("beforeprint", () => {
  before = works().map((el) => ({ id: el.id, open: el.open }));
  for (const el of works()) {
    el.removeAttribute("name");
    el.open = true;
  }
});
addEventListener("afterprint", () => {
  if (!before) return;
  for (const el of works()) {
    el.open = false;
    el.setAttribute("name", "works");
  }
  for (const s of before) if (s.open) (document.getElementById(s.id) as HTMLDetailsElement).open = true;
  before = null;
});
