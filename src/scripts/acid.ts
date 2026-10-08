import { fit, state, watch, type Drawable } from "./state";

// VTR-303: a one-bar acid line, synthesised live (sawtooth → resonant low-pass → soft clip),
// with a four-on-the-floor kick. Never starts on its own.

const N = 16;
const BPM = 138;
const notes = [36, 36, 48, 36, 39, 36, 46, 36, 36, 51, 36, 43, 36, 48, 39, 41];
const accent = [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0];
const slide = [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0];
const gate = [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1];

const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
function softClip(amount: number): Float32Array<ArrayBuffer> {
  const c = new Float32Array(1024);
  const k = 1 + amount * 60;
  for (let i = 0; i < c.length; i++) {
    const v = (i * 2) / c.length - 1;
    c[i] = Math.tanh(k * v) / Math.tanh(k);
  }
  return c;
}

export function acid(): (Drawable & { playing: () => boolean }) | null {
  const root = document.querySelector<HTMLElement>("[data-acid]");
  if (!root) return null;
  const btn = root.querySelector<HTMLButtonElement>("[data-play]")!;
  const scope = root.querySelector<HTMLCanvasElement>("[data-scope]")!;
  const cut = root.querySelector<HTMLInputElement>("[data-cut]")!;
  const res = root.querySelector<HTMLInputElement>("[data-res]")!;
  const sx = scope.getContext("2d")!;
  const K = { cut: Number(cut.value), res: Number(res.value) };

  let ac: AudioContext | null = null;
  let osc!: OscillatorNode, filt!: BiquadFilterNode, vca!: GainNode, master!: GainNode, an!: AnalyserNode;
  let playing = false;
  let step = 0;
  let nextT = 0;
  let timer = 0;
  let ph = 0;
  const buf = new Uint8Array(2048);

  cut.addEventListener("input", () => (K.cut = Number(cut.value)));
  res.addEventListener("input", () => {
    K.res = Number(res.value);
    if (ac) filt.Q.value = 1 + K.res * 24;
  });

  function init(): boolean {
    if (!("AudioContext" in window)) return false;
    ac = new AudioContext();
    osc = ac.createOscillator();
    osc.type = "sawtooth";
    filt = ac.createBiquadFilter();
    filt.type = "lowpass";
    filt.Q.value = 1 + K.res * 24;
    const shaper = ac.createWaveShaper();
    shaper.curve = softClip(0.4);
    vca = ac.createGain();
    vca.gain.value = 0;
    master = ac.createGain();
    master.gain.value = 0.22;
    an = ac.createAnalyser();
    an.fftSize = 2048;
    osc.connect(filt).connect(shaper).connect(vca).connect(master).connect(an).connect(ac.destination);
    osc.start();
    return true;
  }

  function kick(t: number) {
    const o = ac!.createOscillator();
    const g = ac!.createGain();
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    g.gain.setValueAtTime(1.1, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 0.35);
  }

  function schedule() {
    const sd = 60 / BPM / 4;
    while (nextT < ac!.currentTime + 0.12) {
      const i = step % N;
      const t = nextT;
      const base = 80 + K.cut ** 2 * 2600;
      const peak = base + 0.6 * (accent[i] ? 5200 : 3200);
      if (i % 4 === 0) kick(t);
      if (gate[i]) {
        const f = mtof(notes[i]);
        if (slide[(i + N - 1) % N]) osc.frequency.exponentialRampToValueAtTime(f, t + sd * 0.6);
        else osc.frequency.setValueAtTime(f, t);
        vca.gain.cancelScheduledValues(t);
        vca.gain.setValueAtTime(accent[i] ? 0.95 : 0.6, t);
        if (!slide[i]) vca.gain.setTargetAtTime(0, t + sd * 0.55, 0.02);
        filt.frequency.cancelScheduledValues(t);
        filt.frequency.setValueAtTime(Math.min(peak, 12000), t);
        filt.frequency.setTargetAtTime(base, t + 0.005, accent[i] ? 0.06 : 0.11);
      } else {
        vca.gain.setTargetAtTime(0, t, 0.01);
      }
      nextT += sd;
      step++;
    }
  }

  btn.addEventListener("click", () => {
    if (!ac && !init()) {
      btn.disabled = true;
      return;
    }
    if (!playing) {
      void ac!.resume();
      playing = true;
      step = 0;
      nextT = ac!.currentTime + 0.05;
      timer = window.setInterval(schedule, 25);
    } else {
      playing = false;
      clearInterval(timer);
      vca.gain.cancelScheduledValues(ac!.currentTime);
      vca.gain.setTargetAtTime(0, ac!.currentTime, 0.01);
    }
    btn.textContent = playing ? btn.dataset.labelStop! : btn.dataset.labelPlay!;
    btn.setAttribute("aria-pressed", String(playing));
  });

  function draw(dt: number) {
    const [W, H] = fit(scope);
    sx.fillStyle = "rgba(11,20,8,.6)";
    sx.fillRect(0, 0, W, H);
    sx.lineWidth = 2;
    sx.strokeStyle = `hsl(${90 - K.cut * 90},100%,${55 + K.res * 10}%)`;
    sx.beginPath();
    if (playing) {
      an.getByteTimeDomainData(buf);
      let start = 0;
      for (let i = 1; i < buf.length / 2; i++) {
        if (buf[i - 1] < 128 && buf[i] >= 128) {
          start = i;
          break;
        }
      }
      for (let i = 0; i < W; i++) {
        const v = buf[start + Math.floor((i * 900) / W)] ?? 128;
        const y = H / 2 + ((v - 128) / 128) * H * 0.45;
        i ? sx.lineTo(i, y) : sx.moveTo(i, y);
      }
    } else {
      if (state.running) ph += dt * 2;
      const harm = 3 + Math.round(K.cut * 14);
      for (let i = 0; i < W; i++) {
        const xx = (i / W) * 4 * Math.PI + ph;
        let y = 0;
        for (let k = 1; k <= harm; k++) y += (Math.sin(k * xx) / k) * (1 + K.res * (k === harm ? 3 : 0));
        y = H / 2 - y * H * 0.16;
        i ? sx.lineTo(i, y) : sx.moveTo(i, y);
      }
    }
    sx.stroke();
  }

  draw(0);
  const seen = watch(root);
  return { draw, playing: () => playing, get visible() { return seen.visible; } };
}
