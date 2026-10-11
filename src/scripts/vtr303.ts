// VTR-303 front panel: knobs, 16-step sequencer, drums, presets, shareable patterns.
// The voice itself runs in public/audio/vtr303-worklet.js.
import { fit } from "./state";

type Step = { note: number; oct: -1 | 0 | 1; accent: boolean; slide: boolean; rest: boolean };
type Pattern = { bpm: number; length: number; steps: Step[] };

const ROOT = 36; // C2
const NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B", "C"];

const blank = (): Step => ({ note: 0, oct: 0, accent: false, slide: false, rest: false });

// Presets are written as "note[,]flags": note 0–12, flags among  v (oct down) ^ (oct up) a (accent) s (slide) - (rest).
function parse(src: string, bpm: number): Pattern {
  const steps = src.trim().split(/\s+/).map((tok): Step => {
    const m = /^(\d+)?([v^as-]*)$/.exec(tok)!;
    const f = m[2];
    return { note: Number(m[1] ?? 0), oct: f.includes("v") ? -1 : f.includes("^") ? 1 : 0, accent: f.includes("a"), slide: f.includes("s"), rest: f.includes("-") };
  });
  while (steps.length < 16) steps.push(blank());
  return { bpm, length: 16, steps };
}

export const PRESETS: Record<string, Pattern> = {
  squelch: parse("0a 0 12^as 0 3 0a 10s 0 0a 3^ 0 7a 0 12^s 3s 5", 138),
  rolling: parse("0 0^ 0 0a 0 0^s 3 0 0 0^ 0a 7s 5 0^ 3a 0", 132),
  minor: parse("0a 3 7s 10 0^a 10 7 3s 0a 3 7 10s 12^a 10s 7 3", 126),
  stabs: parse("0a - 0a - 7as 5 - 0a 3a - 0a - 10as 12^ - 0", 140),
  hypnotic: parse("0 0 0s 1 0 0 0s 1a 0 0 0s 1 0 0^a 0s 1", 135),
};

const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";

function encode(p: Pattern): string {
  const body = p.steps
    .map((s) => ALPHABET[s.note * 3 + s.oct + 1] + ALPHABET[(s.accent ? 1 : 0) | (s.slide ? 2 : 0) | (s.rest ? 4 : 0)])
    .join("");
  return `${p.bpm}.${p.length}.${body}`;
}
function decode(str: string): Pattern | null {
  const m = /^(\d{2,3})\.(\d{1,2})\.([0-9a-zA-Z_-]{32})$/.exec(str);
  if (!m) return null;
  const steps: Step[] = [];
  for (let i = 0; i < 16; i++) {
    const a = ALPHABET.indexOf(m[3][i * 2]);
    const f = ALPHABET.indexOf(m[3][i * 2 + 1]);
    if (a < 0 || a > 38 || f < 0 || f > 7) return null;
    steps.push({ note: Math.floor(a / 3), oct: ((a % 3) - 1) as Step["oct"], accent: !!(f & 1), slide: !!(f & 2), rest: !!(f & 4) });
  }
  return { bpm: clamp(Number(m[1]), 60, 200), length: clamp(Number(m[2]), 1, 16), steps };
}

function randomPattern(bpm: number): Pattern {
  const scale = [0, 0, 0, 3, 5, 7, 10, 12];
  const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];
  const steps = Array.from({ length: 16 }, (): Step => ({
    note: pick(scale),
    oct: Math.random() < 0.18 ? (Math.random() < 0.6 ? 1 : -1) : 0,
    accent: Math.random() < 0.3,
    slide: Math.random() < 0.22,
    rest: Math.random() < 0.12,
  }));
  return { bpm, length: 16, steps };
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const clone = (p: Pattern): Pattern => ({ ...p, steps: p.steps.map((s) => ({ ...s })) });

function storeGet(): string | null {
  try {
    return localStorage.getItem("vitrine.vtr303");
  } catch {
    return null;
  }
}
function storeSet(v: string) {
  try {
    localStorage.setItem("vitrine.vtr303", v);
  } catch {
    /* ignore */
  }
}

export function vtr303(root: HTMLElement): void {
  const $ = <T extends Element>(sel: string) => root.querySelector<T>(sel)!;
  const $$ = <T extends Element>(sel: string) => [...root.querySelectorAll<T>(sel)];

  const playBtn = $<HTMLButtonElement>("[data-transport]");
  const status = $<HTMLElement>("[data-status]");
  const scope = $<HTMLCanvasElement>("[data-scope]");
  const sx = scope.getContext("2d")!;
  const stepEls = $$<HTMLElement>("[data-step]");
  const keyEls = $$<HTMLButtonElement>("[data-key]");
  const fnEls = $$<HTMLButtonElement>("[data-fn]");
  const presetSel = $<HTMLSelectElement>("[data-preset]");
  const waveBtn = $<HTMLButtonElement>("[data-wave]");
  const kickBtn = $<HTMLButtonElement>("[data-drum='kick']");
  const hatBtn = $<HTMLButtonElement>("[data-drum='hat']");

  let pattern: Pattern = decode(location.hash.replace(/^#p=/, "")) ?? decode(storeGet() ?? "") ?? clone(PRESETS.squelch);
  let selected = 0;
  let ready = false;
  const drums = { kick: true, hat: false };

  /* ---------- knobs ---------- */
  const values: Record<string, number> = {};
  type Knob = { el: HTMLElement; out: HTMLOutputElement | null; min: number; max: number; step: number; set: (v: number) => void };
  const knobs: Record<string, Knob> = {};

  function fmt(param: string, v: number): string {
    if (param === "bpm") return `${Math.round(v)} BPM`;
    if (param === "length") return `${Math.round(v)}`;
    if (param === "tune") return `${v > 0 ? "+" : ""}${v.toFixed(1)} st`;
    return `${Math.round(v * 100)}`;
  }

  $$<HTMLElement>("[data-knob]").forEach((el) => {
    const param = el.dataset.knob!;
    const min = Number(el.dataset.min);
    const max = Number(el.dataset.max);
    const step = Number(el.dataset.inc);
    const out = root.querySelector<HTMLOutputElement>(`output[data-for="${param}"]`);
    const set = (raw: number) => {
      const v = clamp(Math.round(raw / step) * step, min, max);
      values[param] = v;
      const r = -135 + ((v - min) / (max - min)) * 270;
      el.style.setProperty("--r", `${r}deg`);
      el.setAttribute("aria-valuenow", String(v));
      el.setAttribute("aria-valuetext", fmt(param, v));
      if (out) out.value = fmt(param, v);
      onKnob(param, v);
    };
    knobs[param] = { el, out, min, max, step, set };

    let startY = 0;
    let startV = 0;
    el.addEventListener("pointerdown", (e) => {
      el.setPointerCapture(e.pointerId);
      startY = e.clientY;
      startV = values[param];
      el.focus();
    });
    el.addEventListener("pointermove", (e) => {
      if (!el.hasPointerCapture(e.pointerId)) return;
      set(startV + ((startY - e.clientY) / 180) * (max - min) * (e.shiftKey ? 0.2 : 1));
    });
    el.addEventListener("wheel", (e) => {
      e.preventDefault();
      set(values[param] - Math.sign(e.deltaY) * (max - min) * 0.02);
    }, { passive: false });
    el.addEventListener("dblclick", () => set(Number(el.dataset.default)));
    el.addEventListener("keydown", (e) => {
      const fine = (max - min) / 100;
      const big = (max - min) / 10;
      const map: Record<string, number> = { ArrowUp: fine, ArrowRight: fine, ArrowDown: -fine, ArrowLeft: -fine, PageUp: big, PageDown: -big };
      if (e.key in map) set(values[param] + Math.max(map[e.key], step * Math.sign(map[e.key])));
      else if (e.key === "Home") set(min);
      else if (e.key === "End") set(max);
      else return;
      e.preventDefault();
      e.stopPropagation();
    });
  });

  /* ---------- audio ---------- */
  let ac: AudioContext | null = null;
  let voice: AudioWorkletNode | null = null;
  let master: GainNode | null = null;
  let analyser: AnalyserNode | null = null;
  let noise: AudioBuffer | null = null;
  const buf = new Uint8Array(2048);

  function onKnob(param: string, v: number) {
    if (param === "bpm") pattern.bpm = v;
    else if (param === "length") {
      pattern.length = v;
      renderSteps();
    } else if (voice) {
      voice.parameters.get(param)?.setTargetAtTime(v, ac!.currentTime, 0.01);
    }
    if (ready && (param === "bpm" || param === "length")) save();
  }

  // One shared start-up: a second click during the worklet load waits for the same promise.
  let starting: Promise<boolean> | null = null;
  function init(): Promise<boolean> {
    starting ??= start().catch((err) => {
      starting = null;
      throw err;
    });
    return starting;
  }
  async function start(): Promise<boolean> {
    if (!("AudioWorkletNode" in window)) return false;
    ac = new AudioContext();
    await ac.audioWorklet.addModule("/audio/vtr303-worklet.js");
    voice = new AudioWorkletNode(ac, "vtr303", { numberOfInputs: 0, outputChannelCount: [2] });
    for (const name of ["tune", "wave", "cutoff", "resonance", "envMod", "decay", "accent", "drive", "volume"]) {
      const v = name === "wave" ? (waveBtn.getAttribute("aria-pressed") === "true" ? 1 : 0) : values[name];
      voice.parameters.get(name)!.value = v;
    }
    master = ac.createGain();
    master.gain.value = 0.9;
    analyser = ac.createAnalyser();
    analyser.fftSize = 2048;
    voice.connect(master);
    master.connect(analyser).connect(ac.destination);
    noise = ac.createBuffer(1, ac.sampleRate * 0.2, ac.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return true;
  }

  function kick(t: number) {
    const o = ac!.createOscillator();
    const g = ac!.createGain();
    o.frequency.setValueAtTime(160, t);
    o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    g.gain.setValueAtTime(1, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    o.connect(g).connect(master!);
    o.start(t);
    o.stop(t + 0.4);
  }
  function hat(t: number) {
    const s = ac!.createBufferSource();
    s.buffer = noise;
    const hp = ac!.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 7000;
    const g = ac!.createGain();
    g.gain.setValueAtTime(0.25, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    s.connect(hp).connect(g).connect(master!);
    s.start(t);
    s.stop(t + 0.08);
  }

  const midi = (s: Step) => ROOT + s.note + s.oct * 12;

  /* ---------- sequencer ---------- */
  let playing = false;
  let cur = 0;
  let nextT = 0;
  let timer = 0;
  const shown: { i: number; t: number }[] = [];
  let playhead = -1;

  function schedule() {
    const sd = 60 / pattern.bpm / 4;
    while (nextT < ac!.currentTime + 0.12) {
      const i = cur % pattern.length;
      const s = pattern.steps[i];
      const prev = pattern.steps[(i + pattern.length - 1) % pattern.length];
      const t = nextT;
      if (drums.kick && i % 4 === 0) kick(t);
      if (drums.hat && i % 4 === 2) hat(t);
      if (s.rest) {
        voice!.port.postMessage({ type: "off", time: t });
      } else {
        voice!.port.postMessage({ type: "note", time: t, note: midi(s), accent: s.accent, slide: prev.slide && !prev.rest });
        // A slide step holds its note into the next one.
        if (!s.slide) voice!.port.postMessage({ type: "off", time: t + sd * 0.5 });
      }
      shown.push({ i, t });
      nextT += sd;
      cur++;
    }
  }

  async function toggle() {
    if (!playing) {
      try {
        if (!(await init())) throw new Error();
      } catch {
        status.hidden = false;
        playBtn.disabled = true;
        return;
      }
      await ac!.resume();
      playing = true;
      cur = 0;
      nextT = ac!.currentTime + 0.06;
      schedule();
      timer = window.setInterval(schedule, 25);
    } else {
      playing = false;
      clearInterval(timer);
      voice!.port.postMessage({ type: "panic" });
      voice!.port.postMessage({ type: "off", time: 0 });
      shown.length = 0;
      setPlayhead(-1);
    }
    playBtn.setAttribute("aria-pressed", String(playing));
  }

  async function preview(s: Step) {
    if (playing || s.rest) return;
    if (!(await init().catch(() => false))) return;
    await ac!.resume();
    const t = ac!.currentTime + 0.01;
    voice!.port.postMessage({ type: "note", time: t, note: midi(s), accent: s.accent, slide: false });
    voice!.port.postMessage({ type: "off", time: t + 0.18 });
  }

  /* ---------- rendering ---------- */
  function setPlayhead(i: number) {
    if (i === playhead) return;
    playhead = i;
    stepEls.forEach((el, n) => el.classList.toggle("is-playing", n === i));
  }

  const flagOn = (s: Step, f: string): boolean =>
    f === "down" ? s.oct === -1 : f === "up" ? s.oct === 1 : s[f as "accent" | "slide" | "rest"];

  function renderSteps() {
    stepEls.forEach((el, i) => {
      const s = pattern.steps[i];
      el.classList.toggle("is-selected", i === selected);
      el.classList.toggle("is-off", i >= pattern.length);
      el.querySelector<HTMLElement>("[data-name]")!.textContent = s.rest ? "∅" : `${NAMES[s.note]}${s.oct > 0 ? "↑" : s.oct < 0 ? "↓" : ""}`;
      el.querySelectorAll<HTMLElement>("[data-ind]").forEach((ind) => ind.classList.toggle("on", flagOn(s, ind.dataset.ind!)));
    });
    const s = pattern.steps[selected];
    keyEls.forEach((k) => k.setAttribute("aria-pressed", String(!s.rest && Number(k.dataset.key) === s.note)));
    fnEls.forEach((b) => b.setAttribute("aria-pressed", String(flagOn(s, b.dataset.fn!))));
  }

  function save() {
    const code = encode(pattern);
    storeSet(code);
    history.replaceState(null, "", `#p=${code}`);
  }

  function load(p: Pattern) {
    pattern = clone(p);
    knobs.bpm.set(pattern.bpm);
    knobs.length.set(pattern.length);
    selected = 0;
    renderSteps();
    save();
  }

  /* ---------- events ---------- */
  stepEls.forEach((el, i) => {
    el.querySelector("[data-select]")!.addEventListener("click", () => {
      selected = i;
      renderSteps();
      preview(pattern.steps[i]);
    });
  });
  fnEls.forEach((b) =>
    b.addEventListener("click", () => {
      const s = pattern.steps[selected];
      const f = b.dataset.fn!;
      if (f === "down") s.oct = s.oct === -1 ? 0 : -1;
      else if (f === "up") s.oct = s.oct === 1 ? 0 : 1;
      else s[f as "accent" | "slide" | "rest"] = !s[f as "accent" | "slide" | "rest"];
      renderSteps();
      save();
    }),
  );

  function setNote(note: number) {
    const s = pattern.steps[selected];
    s.note = note;
    s.rest = false;
    preview(s);
    selected = (selected + 1) % pattern.length;
    renderSteps();
    save();
  }
  keyEls.forEach((k) => k.addEventListener("click", () => setNote(Number(k.dataset.key))));

  playBtn.addEventListener("click", toggle);
  waveBtn.addEventListener("click", () => {
    const sq = waveBtn.getAttribute("aria-pressed") !== "true";
    waveBtn.setAttribute("aria-pressed", String(sq));
    voice?.parameters.get("wave")?.setTargetAtTime(sq ? 1 : 0, ac!.currentTime, 0.005);
  });
  for (const [name, btn] of [["kick", kickBtn], ["hat", hatBtn]] as const) {
    btn.setAttribute("aria-pressed", String(drums[name]));
    btn.addEventListener("click", () => {
      drums[name] = !drums[name];
      btn.setAttribute("aria-pressed", String(drums[name]));
    });
  }
  presetSel.addEventListener("change", () => {
    if (PRESETS[presetSel.value]) load(PRESETS[presetSel.value]);
  });
  $("[data-random]").addEventListener("click", () => load(randomPattern(pattern.bpm)));
  $("[data-clear]").addEventListener("click", () => load({ bpm: pattern.bpm, length: 16, steps: Array.from({ length: 16 }, () => ({ ...blank(), rest: true })) }));
  $("[data-share]").addEventListener("click", async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    try {
      await navigator.clipboard.writeText(location.href);
      btn.textContent = btn.dataset.labelDone!;
    } catch {
      btn.textContent = location.href;
    }
  });

  // Tracker-style keys: a w s e d f t g y h u j k = one octave; ←/→ move; space = play/stop.
  const KEYMAP = "awsedftgyhujk";
  document.addEventListener("keydown", (e) => {
    const tag = (e.target as HTMLElement).tagName;
    if (e.ctrlKey || e.metaKey || e.altKey || tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
    if ((e.target as HTMLElement).closest("[data-knob]")) return;
    if (e.key === " " && tag !== "BUTTON") {
      e.preventDefault();
      toggle();
    } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      if (tag === "BUTTON" && !(e.target as HTMLElement).closest("[data-step]")) return;
      e.preventDefault();
      selected = (selected + (e.key === "ArrowRight" ? 1 : pattern.length - 1)) % pattern.length;
      renderSteps();
    } else if (KEYMAP.includes(e.key.toLowerCase()) && e.key.length === 1) {
      setNote(KEYMAP.indexOf(e.key.toLowerCase()));
    } else if (e.key === "-" || e.key === "0") {
      pattern.steps[selected].rest = !pattern.steps[selected].rest;
      renderSteps();
      save();
    }
  });

  /* ---------- scope + playhead ---------- */
  function frame() {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    if (playing && ac) {
      while (shown.length > 1 && shown[1].t <= ac.currentTime) shown.shift();
      if (shown.length && shown[0].t <= ac.currentTime) setPlayhead(shown[0].i);
    }
    const [W, H] = fit(scope);
    sx.fillStyle = "rgba(11,20,8,.55)";
    sx.fillRect(0, 0, W, H);
    sx.strokeStyle = "rgba(60,120,40,.35)";
    sx.lineWidth = 1;
    sx.beginPath();
    for (let gx = 0; gx <= W; gx += W / 10) {
      sx.moveTo(gx, 0);
      sx.lineTo(gx, H);
    }
    sx.moveTo(0, H / 2);
    sx.lineTo(W, H / 2);
    sx.stroke();
    sx.lineWidth = 2;
    sx.strokeStyle = `hsl(${90 - values.cutoff * 90},100%,${55 + values.resonance * 10}%)`;
    sx.beginPath();
    if (analyser) {
      analyser.getByteTimeDomainData(buf);
      let start = 0;
      for (let i = 1; i < buf.length / 2; i++) {
        if (buf[i - 1] < 128 && buf[i] >= 128) {
          start = i;
          break;
        }
      }
      for (let i = 0; i < W; i++) {
        const v = buf[start + Math.floor((i * 1000) / W)] ?? 128;
        const y = H / 2 + ((v - 128) / 128) * H * 0.45;
        i ? sx.lineTo(i, y) : sx.moveTo(i, y);
      }
    } else {
      sx.moveTo(0, H / 2);
      sx.lineTo(W, H / 2);
    }
    sx.stroke();
  }

  // Initial state: knob defaults, then the loaded pattern's tempo and length.
  const { bpm, length } = pattern;
  for (const k of Object.values(knobs)) k.set(Number(k.el.dataset.default));
  knobs.bpm.set(bpm);
  knobs.length.set(length);
  renderSteps();
  ready = true;
  requestAnimationFrame(frame);
}
