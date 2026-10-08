// Reader settings shared by every effect: is motion on, and how strong is the "trip".
const key = (k: string) => `vitrine.${k}`;
const read = (k: string, fallback: string): string => {
  try {
    return localStorage.getItem(key(k)) ?? fallback;
  } catch {
    return fallback;
  }
};
export const save = (k: string, v: string): void => {
  try {
    localStorage.setItem(key(k), v);
  } catch {
    /* private mode or blocked storage: settings just don't persist */
  }
};

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const state = {
  running: read("running", reduced ? "0" : "1") === "1",
  trip: Number.parseFloat(read("trip", "0.6")),
};

/** Size a canvas's backing store to its CSS box (times `scale`) and return it. */
export function fit(cv: HTMLCanvasElement, scale = 1): [number, number] {
  const r = cv.getBoundingClientRect();
  const d = Math.min(window.devicePixelRatio || 1, 2) * scale;
  const w = Math.max(1, Math.round(r.width * d));
  const h = Math.max(1, Math.round(r.height * d));
  if (cv.width !== w || cv.height !== h) {
    cv.width = w;
    cv.height = h;
  }
  return [w, h];
}

/** Track whether an element is on screen, so off-screen effects skip their frames. */
export function watch(el: Element): { visible: boolean } {
  const v = { visible: true };
  new IntersectionObserver(([e]) => (v.visible = e.isIntersecting)).observe(el);
  return v;
}

export type Drawable = { draw: (dt: number) => void; visible: boolean };
