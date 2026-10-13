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
