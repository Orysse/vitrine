// VTR-303 voice: a TB-303 style monosynth running in an AudioWorklet.
//
//   oscillator (polyBLEP saw / square)
//     → 4-pole resonant low-pass with tanh feedback (2× oversampled)
//     → VCA (fast attack, short release, accent boost)
//     → drive (tanh) → DC blocker → out
//
// The main thread schedules notes with sample-accurate times through the port:
//   { type: "note", time, note, accent, slide }   slide = glide from the previous note (legato)
//   { type: "off", time }                         gate off
//   { type: "panic" }                             drop queued events and silence
// Knobs are k-rate AudioParams, all in 0..1 except tune (semitones).

const TAU = Math.PI * 2;

function polyBlep(t, dt) {
  if (t < dt) {
    t /= dt;
    return t + t - t * t - 1;
  }
  if (t > 1 - dt) {
    t = (t - 1) / dt;
    return t * t + t + t + 1;
  }
  return 0;
}

class Vtr303 extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    const k = (name, defaultValue, minValue = 0, maxValue = 1) => ({ name, defaultValue, minValue, maxValue, automationRate: "k-rate" });
    return [
      k("tune", 0, -12, 12),
      k("wave", 0),
      k("cutoff", 0.35),
      k("resonance", 0.7),
      k("envMod", 0.6),
      k("decay", 0.4),
      k("accent", 0.6),
      k("drive", 0.3),
      k("volume", 0.7),
    ];
  }

  constructor() {
    super();
    this.events = [];
    this.port.onmessage = ({ data }) => {
      if (data.type === "panic") {
        this.events.length = 0;
        this.gate = false;
        return;
      }
      this.events.push(data);
      this.events.sort((a, b) => a.time - b.time);
    };
    this.phase = 0;
    this.logFreq = Math.log(110);
    this.logTarget = this.logFreq;
    this.note = 45;
    this.sliding = false;
    this.gate = false;
    this.accented = false;
    this.vca = 0;
    this.fenv = 0; // filter envelope (MEG)
    this.aenv = 0; // accent envelope, builds up on consecutive accents
    this.s0 = this.s1 = this.s2 = this.s3 = 0;
    this.dcX = this.dcY = 0;
  }

  handle(ev) {
    if (ev.type === "off") {
      this.gate = false;
      return;
    }
    this.note = ev.note;
    this.logTarget = Math.log(440) + ((ev.note - 69) / 12) * Math.LN2;
    if (ev.slide && this.gate) {
      // Legato: glide to the new pitch, no envelope retrigger.
      this.sliding = true;
    } else {
      this.sliding = false;
      this.logFreq = this.logTarget;
      this.fenv = 1;
    }
    this.gate = true;
    this.accented = !!ev.accent;
    if (ev.accent) this.aenv = Math.min(1.6, this.aenv + 1);
  }

  process(_inputs, outputs, p) {
    const out = outputs[0];
    const n = out[0].length;
    const fs = sampleRate;
    const fs2 = fs * 2;

    const tune = p.tune[0];
    const wave = p.wave[0];
    const cutoff = p.cutoff[0];
    const reso = p.resonance[0];
    const envMod = p.envMod[0];
    const decay = p.decay[0];
    const accent = p.accent[0];
    const drive = p.drive[0];
    const volume = p.volume[0];

    // Envelope and glide coefficients (per sample).
    const decayTime = this.accented ? 0.2 : 0.2 + decay * 1.8; // seconds, like the 303's 200 ms – 2 s
    const fenvK = Math.exp(-4.6 / (decayTime * fs)); // ~1 % left after decayTime
    const aenvK = Math.exp(-1 / (0.18 * fs));
    const glideK = 1 - Math.exp(-1 / (0.035 * fs)); // ~60 ms slide
    const attackK = 1 - Math.exp(-1 / (0.003 * fs));
    const releaseK = 1 - Math.exp(-1 / (0.008 * fs));
    const k = reso * 4.15; // ~4 = self-oscillation
    const driveGain = 1 + drive * 7;
    const driveNorm = 1 / Math.tanh(driveGain);
    const tuneShift = (tune / 12) * Math.LN2;

    for (let i = 0; i < n; i++) {
      const t = currentTime + i / fs;
      while (this.events.length && this.events[0].time <= t) this.handle(this.events.shift());

      if (this.sliding) this.logFreq += (this.logTarget - this.logFreq) * glideK;
      const freq = Math.exp(this.logFreq + tuneShift);
      const dt = Math.min(freq / fs, 0.45);

      // Oscillator.
      this.phase += dt;
      if (this.phase >= 1) this.phase -= 1;
      const saw = 2 * this.phase - 1 - polyBlep(this.phase, dt);
      let sq = this.phase < 0.5 ? 1 : -1;
      sq += polyBlep(this.phase, dt);
      sq -= polyBlep((this.phase + 0.5) % 1, dt);
      const osc = saw + (sq * 0.8 - saw) * wave;

      // Envelopes.
      this.fenv *= fenvK;
      this.aenv *= aenvK;
      this.vca += ((this.gate ? 1 : 0) - this.vca) * (this.gate ? attackK : releaseK);

      // Cutoff: knob sets the base (≈40 Hz – 6 kHz), the envelope and accent open it in octaves.
      const base = 40 * Math.pow(2, cutoff * 7.2);
      const oct = envMod * 4.5 * this.fenv + (this.accented ? accent * this.aenv * 2.2 : 0);
      const fc = Math.min(base * Math.pow(2, oct), 18000);
      const g = 1 - Math.exp((-TAU * fc) / fs2);

      // 4-pole ladder, two passes per sample.
      for (let o = 0; o < 2; o++) {
        const u = Math.tanh(osc - k * this.s3);
        this.s0 += g * (u - this.s0);
        this.s1 += g * (this.s0 - this.s1);
        this.s2 += g * (this.s1 - this.s2);
        this.s3 += g * (this.s2 - this.s3);
      }
      const filtered = this.s3 * (1 + k * 0.45);

      const amp = this.vca * (1 + (this.accented ? accent * 0.9 : 0));
      let y = Math.tanh(filtered * amp * driveGain) * driveNorm;

      // DC blocker.
      const dc = y - this.dcX + 0.995 * this.dcY;
      this.dcX = y;
      this.dcY = dc;
      y = dc * volume * 0.5;

      for (let c = 0; c < out.length; c++) out[c][i] = y;
    }
    return true;
  }
}

registerProcessor("vtr303", Vtr303);
