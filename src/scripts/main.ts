// Everything here is an enhancement: without it the pages are complete (static grounds,
// flat coloured "photos", no sound).
import { acid } from "./acid";
import { grounds } from "./grounds";
import { halftones } from "./halftone";
import { save, state } from "./state";

document.querySelectorAll<HTMLElement>("[data-js-only]").forEach((el) => (el.hidden = false));

const tripEl = document.querySelector<HTMLInputElement>("#trip");
const motionBtn = document.querySelector<HTMLButtonElement>("#motion");
const warpD = document.querySelector("#warpD");
const warpT = document.querySelector("#warpT");

function applyTrip() {
  warpD?.setAttribute("scale", (4 + state.trip * 40).toFixed(1));
}
function applyRunning() {
  document.documentElement.classList.toggle("calm", !state.running);
  if (motionBtn) {
    motionBtn.textContent = state.running ? motionBtn.dataset.labelPause! : motionBtn.dataset.labelPlay!;
    motionBtn.setAttribute("aria-pressed", String(state.running));
  }
}
if (tripEl) {
  tripEl.value = String(state.trip);
  tripEl.addEventListener("input", () => {
    state.trip = Number(tripEl.value);
    save("trip", String(state.trip));
    applyTrip();
  });
}
motionBtn?.addEventListener("click", () => {
  state.running = !state.running;
  save("running", state.running ? "1" : "0");
  applyRunning();
});
applyTrip();
applyRunning();

halftones();
const scenes = grounds();
const player = acid();

// One loop at ~30 fps; idle when the tab is hidden, when paused, or when nothing is on screen.
let last = performance.now();
let acc = 0;
function loop(now: number) {
  requestAnimationFrame(loop);
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  acc += dt;
  if (acc < 1 / 30 || document.hidden) return;
  const stepDt = acc;
  acc = 0;
  if (!state.running && !player?.playing()) return;
  for (const s of scenes) if (s.visible) s.draw(stepDt);
  if (player?.visible) player.draw(stepDt);
  if (state.running && warpT) {
    const k = (now / 1000) * (0.5 + state.trip);
    warpT.setAttribute("baseFrequency", `${(0.006 + 0.003 * Math.sin(k * 0.35)).toFixed(4)} ${(0.022 + 0.008 * Math.sin(k * 0.27)).toFixed(4)}`);
  }
}
requestAnimationFrame(loop);
