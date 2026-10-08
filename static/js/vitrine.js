// Vitrine: everything here is an enhancement. Without this script the pages are
// complete: static grounds, flat coloured "photos", no sound.
(function () {
  "use strict";

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem("vitrine." + k); return v === null ? d : v; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("vitrine." + k, v); } catch (e) {} }
  };
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var state = {
    running: store.get("running", reduce ? "0" : "1") === "1",
    trip: parseFloat(store.get("trip", "0.6"))
  };

  document.querySelectorAll("[data-js-only]").forEach(function (el) { el.hidden = false; });

  /* ---------- controls ---------- */
  var tripEl = document.getElementById("trip");
  var motionBtn = document.getElementById("motion");
  var warpD = document.getElementById("warpD");
  var warpT = document.getElementById("warpT");

  function applyTrip() {
    if (warpD) warpD.setAttribute("scale", (4 + state.trip * 40).toFixed(1));
  }
  function applyRunning() {
    document.documentElement.classList.toggle("calm", !state.running);
    if (motionBtn) {
      motionBtn.textContent = state.running ? motionBtn.dataset.labelPause : motionBtn.dataset.labelPlay;
      motionBtn.setAttribute("aria-pressed", state.running ? "true" : "false");
    }
  }
  if (tripEl) {
    tripEl.value = state.trip;
    tripEl.addEventListener("input", function () { state.trip = parseFloat(tripEl.value); store.set("trip", state.trip); applyTrip(); });
  }
  if (motionBtn) motionBtn.addEventListener("click", function () { state.running = !state.running; store.set("running", state.running ? "1" : "0"); applyRunning(); });
  applyTrip();
  applyRunning();

  function fit(cv, scale) {
    var r = cv.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2) * (scale || 1);
    var w = Math.max(1, Math.round(r.width * d)), h = Math.max(1, Math.round(r.height * d));
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    return [w, h];
  }
  function watch(el, obj) {
    obj.visible = true;
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { obj.visible = es[0].isIntersecting; }).observe(el);
  }

  /* ---------- funky grounds ---------- */
  var grounds = [];
  var palettes = {
    riley: ["#ffcf5a", "#e2135f", "#ffcf5a", "#7b2ff7", "#ffcf5a", "#18b39b"],
    waves: ["#ff7a1a", "#1d1813", "#ff4fb0", "#1d1813", "#ffe23a", "#1d1813", "#18b3e0", "#1d1813"]
  };

  function liquid(root, cv) {
    var x = cv.getContext("2d"), ph = Math.random() * 10, push = { x: .5, y: .5, k: 0 };
    var blobs = ["#e2135f", "#ff7a1a", "#ffcf5a", "#18b39b", "#7b2ff7", "#ff4fb0"].map(function (c) {
      return { c: c, fx: .3 + Math.random() * .6, fy: .3 + Math.random() * .6, px: Math.random() * 6.28, py: Math.random() * 6.28, r: .26 + Math.random() * .18 };
    });
    root.addEventListener("pointermove", function (e) {
      var r = root.getBoundingClientRect(); push = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, k: 1 };
    });
    return function (dt) {
      var s = fit(cv, .6), W = s[0], H = s[1];
      if (state.running) ph += dt * (.08 + state.trip * .35);
      push.k *= .97;
      x.globalAlpha = 1; x.filter = "none"; x.fillStyle = "#1a0b2e"; x.fillRect(0, 0, W, H);
      x.filter = "blur(" + Math.round(Math.min(W, H) * .06) + "px)";
      for (var i = 0; i < blobs.length; i++) {
        var b = blobs[i], cx = .5 + .4 * Math.sin(ph * b.fx + b.px), cy = .5 + .38 * Math.cos(ph * b.fy + b.py);
        cx += (cx - push.x) * .3 * push.k; cy += (cy - push.y) * .3 * push.k;
        x.fillStyle = b.c; x.globalAlpha = .9; x.beginPath();
        x.ellipse(cx * W, cy * H, b.r * W * (1 + .2 * Math.sin(ph * 2 + i)), b.r * H * (1 + .2 * Math.cos(ph * 1.7 + i)), ph * .3 + i, 0, 6.283);
        x.fill();
      }
      x.filter = "none"; x.globalAlpha = 1;
    };
  }

  function bands(kind, cv) {
    var x = cv.getContext("2d"), ph = Math.random() * 10, pal = palettes[kind];
    return function (dt) {
      var s = fit(cv, .7), W = s[0], H = s[1];
      if (state.running) ph += dt * (.25 + state.trip * 1.2);
      var n = kind === "riley" ? 28 : 46, band = H / n, amp = H * (.015 + state.trip * .06), fq = (kind === "riley" ? 3 : 2.2) * Math.PI / Math.max(W, 600);
      function y(X, i) { return i * band + amp * Math.sin(X * fq + ph + i * .35) + amp * .5 * Math.sin(X * fq * .37 - ph * .6); }
      for (var i = -3; i < n + 3; i++) {
        x.beginPath();
        for (var X = 0; X <= W; X += 8) { if (X === 0) x.moveTo(X, y(X, i)); else x.lineTo(X, y(X, i)); }
        for (X = W; X >= 0; X -= 8) x.lineTo(X, y(X, i + 1) + 1);
        x.closePath(); x.fillStyle = pal[(i + 300) % pal.length]; x.fill();
      }
    };
  }

  document.querySelectorAll("[data-ground]").forEach(function (root) {
    var cv = root.querySelector(":scope > .ground-canvas");
    if (!cv || !cv.getContext) return;
    var kind = root.dataset.ground, g = {};
    g.draw = kind === "liquid" ? liquid(root, cv) : bands(kind, cv);
    watch(root, g);
    g.draw(0);
    grounds.push(g);
  });

  /* ---------- halftone "photos" ---------- */
  function poly(o, W, H, pts, fill) {
    o.beginPath();
    pts.forEach(function (p, i) { if (i) o.lineTo(p[0] * W, p[1] * H); else o.moveTo(p[0] * W, p[1] * H); });
    o.closePath(); o.fillStyle = fill; o.fill();
  }
  function glow(o, W, H, edge) {
    var g = o.createRadialGradient(W * .5, H * .45, 0, W * .5, H * .5, Math.max(W, H) * .7);
    g.addColorStop(0, "#fff"); g.addColorStop(1, edge); o.fillStyle = g; o.fillRect(0, 0, W, H);
  }
  var art = {
    nuc: function (o, W, H) {
      glow(o, W, H, "#bdbdbd");
      var sh = o.createRadialGradient(W * .52, H * .7, 0, W * .52, H * .7, W * .4);
      sh.addColorStop(0, "rgba(0,0,0,.6)"); sh.addColorStop(1, "rgba(0,0,0,0)"); o.fillStyle = sh; o.fillRect(0, 0, W, H);
      var top = o.createLinearGradient(0, H * .26, 0, H * .5); top.addColorStop(0, "#c8c8c8"); top.addColorStop(1, "#8a8a8a");
      poly(o, W, H, [[.14, .40], [.60, .26], [.88, .37], [.42, .52]], top);
      poly(o, W, H, [[.14, .40], [.42, .52], [.42, .70], [.14, .57]], "#3a3a3a");
      poly(o, W, H, [[.42, .52], [.88, .37], [.88, .54], [.42, .70]], "#666");
      poly(o, W, H, [[.50, .56], [.58, .53], [.58, .57], [.50, .60]], "#111");
      poly(o, W, H, [[.61, .52], [.69, .49], [.69, .53], [.61, .56]], "#111");
      poly(o, W, H, [[.72, .48], [.78, .46], [.78, .50], [.72, .52]], "#111");
      o.strokeStyle = "#111"; o.lineWidth = Math.max(3, W * .012); o.lineJoin = "round";
      o.beginPath(); o.moveTo(W * .14, H * .40); o.lineTo(W * .60, H * .26); o.lineTo(W * .88, H * .37); o.lineTo(W * .88, H * .54); o.lineTo(W * .42, H * .70); o.lineTo(W * .14, H * .57); o.closePath(); o.stroke();
      o.beginPath(); o.moveTo(W * .14, H * .40); o.lineTo(W * .42, H * .52); o.lineTo(W * .88, H * .37); o.moveTo(W * .42, H * .52); o.lineTo(W * .42, H * .70); o.stroke();
      o.beginPath(); o.arc(W * .22, H * .50, W * .012, 0, 6.283); o.fillStyle = "#fff"; o.fill();
      poly(o, W, H, [[.30, .33], [.62, .24], [.66, .255], [.34, .345]], "rgba(255,255,255,.7)");
    },
    key: function (o, W, H) {
      glow(o, W, H, "#c2c2c2");
      o.save(); o.translate(W * .5, H * .52); o.rotate(-.35);
      var g = o.createLinearGradient(0, -H * .14, 0, H * .14); g.addColorStop(0, "#555"); g.addColorStop(1, "#111");
      o.fillStyle = g; o.fillRect(-W * .34, -H * .13, W * .6, H * .26);
      o.fillStyle = "#d8d8d8"; o.fillRect(W * .26, -H * .08, W * .12, H * .16);
      o.fillStyle = "#777"; for (var i = 0; i < 4; i++) o.fillRect(W * .28, -H * .06 + i * H * .035, W * .08, H * .018);
      o.beginPath(); o.arc(-W * .26, 0, H * .045, 0, 6.283); o.fillStyle = "#fff"; o.fill();
      var d = o.createRadialGradient(-W * .04, -H * .02, 0, -W * .04, 0, H * .08); d.addColorStop(0, "#fff"); d.addColorStop(1, "#8a8a8a");
      o.beginPath(); o.arc(-W * .04, 0, H * .075, 0, 6.283); o.fillStyle = d; o.fill();
      o.restore();
    },
    laptop: function (o, W, H) {
      glow(o, W, H, "#c0c0c0");
      poly(o, W, H, [[.20, .14], [.78, .10], [.80, .62], [.18, .64]], "#1a1a1a");
      poly(o, W, H, [[.23, .18], [.75, .145], [.77, .58], [.21, .60]], "#2c2c2c");
      for (var i = 0; i < 9; i++) {
        var y = .22 + i * .04, w = .2 + ((i * 37) % 5) * .06;
        poly(o, W, H, [[.26, y], [.26 + w, y - .006], [.26 + w, y + .012], [.26, y + .018]], i % 3 ? "#9a9a9a" : "#e0e0e0");
      }
      var b = o.createLinearGradient(0, H * .64, 0, H * .9); b.addColorStop(0, "#3a3a3a"); b.addColorStop(1, "#111");
      poly(o, W, H, [[.18, .64], [.80, .62], [.96, .86], [.04, .90]], b);
      o.beginPath(); o.arc(W * .5, H * .76, W * .012, 0, 6.283); o.fillStyle = "#fff"; o.fill();
    },
    flake: function (o, W, H) {
      glow(o, W, H, "#bfbfbf");
      o.save(); o.translate(W * .5, H * .5); o.rotate(.08);
      o.fillStyle = "#fafafa"; o.fillRect(-W * .28, -H * .42, W * .56, H * .84);
      o.fillStyle = "#ccc"; o.beginPath(); o.moveTo(W * .18, -H * .42); o.lineTo(W * .28, -H * .30); o.lineTo(W * .18, -H * .30); o.fill();
      o.fillStyle = "#222";
      for (var i = 0; i < 12; i++) { var ww = (.1 + ((i * 53) % 7) * .045) * W, ind = ((i * 3) % 4) * W * .025; o.fillRect(-W * .22 + ind, -H * .33 + i * H * .055, ww, H * .018); }
      o.translate(W * .1, H * .22); o.strokeStyle = "#444"; o.lineWidth = W * .02;
      for (var k = 0; k < 6; k++) { o.rotate(Math.PI / 3); o.beginPath(); o.moveTo(0, 0); o.lineTo(0, -H * .12); o.stroke(); }
      o.restore();
    },
    bust: function (o, W, H) {
      glow(o, W, H, "#b8b8b8");
      var s = o.createLinearGradient(0, H * .6, 0, H); s.addColorStop(0, "#3a3a3a"); s.addColorStop(1, "#0e0e0e");
      o.fillStyle = s; o.beginPath(); o.ellipse(W * .5, H * 1.02, W * .46, H * .36, 0, 0, 6.283); o.fill();
      o.fillStyle = "#7a7a7a"; o.fillRect(W * .43, H * .48, W * .14, H * .2);
      var h = o.createRadialGradient(W * .44, H * .3, W * .02, W * .5, H * .34, W * .26); h.addColorStop(0, "#e8e8e8"); h.addColorStop(1, "#5a5a5a");
      o.fillStyle = h; o.beginPath(); o.ellipse(W * .5, H * .34, W * .2, H * .2, 0, 0, 6.283); o.fill();
      o.fillStyle = "#1c1c1c"; o.beginPath(); o.ellipse(W * .5, H * .2, W * .21, H * .1, 0, Math.PI, 0); o.fill();
      poly(o, W, H, [[.40, .66], [.50, .80], [.60, .66], [.56, .64], [.50, .72], [.44, .64]], "#cfcfcf");
    }
  };

  function screen(cv, source) {
    var W = cv.width, H = cv.height, off = document.createElement("canvas");
    off.width = W; off.height = H;
    var o = off.getContext("2d");
    o.fillStyle = "#fff"; o.fillRect(0, 0, W, H);
    source(o, W, H);
    var data = o.getImageData(0, 0, W, H).data, x = cv.getContext("2d");
    var paper = getComputedStyle(cv).backgroundColor;
    x.fillStyle = paper; x.fillRect(0, 0, W, H);
    x.fillStyle = "#1d1813";
    var cell = Math.max(5, Math.round(W / 70)), a = Math.PI / 4, ca = Math.cos(a), sa = Math.sin(a), D = Math.hypot(W, H);
    for (var u = -D; u < D; u += cell) for (var v = -D; v < D; v += cell) {
      var px = W / 2 + u * ca - v * sa, py = H / 2 + u * sa + v * ca;
      if (px < 0 || py < 0 || px >= W || py >= H) continue;
      var i = ((py | 0) * W + (px | 0)) * 4, lum = (data[i] * .3 + data[i + 1] * .59 + data[i + 2] * .11) / 255;
      var r = Math.pow(1 - lum, .9) * cell * .66;
      if (r > .35) { x.beginPath(); x.arc(px, py, r, 0, 6.283); x.fill(); }
    }
  }
  document.querySelectorAll("canvas.ht").forEach(function (cv) {
    var src = cv.dataset.src, kind = cv.dataset.ht;
    if (src) {
      var img = new Image();
      img.onload = function () {
        screen(cv, function (o, W, H) {
          var k = Math.max(W / img.width, H / img.height), w = img.width * k, h = img.height * k;
          o.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
        });
      };
      img.src = src;
    } else if (art[kind]) {
      screen(cv, art[kind]);
    }
  });

  /* ---------- hue drift on printed grounds ---------- */
  var hues = document.querySelectorAll(".hue"), hueT = 0;

  /* ---------- VTR-303 ---------- */
  var player = document.querySelector(".player");
  var acid = null;
  if (player) acid = makeAcid(player);

  function makeAcid(root) {
    var btn = root.querySelector(".acid-play"), scope = root.querySelector(".scope"), sx = scope.getContext("2d");
    var cut = root.querySelector(".k-cut"), res = root.querySelector(".k-res");
    var K = { cut: parseFloat(cut.value), res: parseFloat(res.value) };
    var N = 16, BPM = 138;
    var notes = [36, 36, 48, 36, 39, 36, 46, 36, 36, 51, 36, 43, 36, 48, 39, 41];
    var accent = [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0];
    var slide = [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0];
    var gate = [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1];
    var ac = null, osc, filt, vca, master, an, playing = false, cur = 0, nextT = 0, timer = null, buf = new Uint8Array(2048), ph = 0;

    cut.addEventListener("input", function () { K.cut = parseFloat(cut.value); });
    res.addEventListener("input", function () { K.res = parseFloat(res.value); if (filt) filt.Q.value = 1 + K.res * 24; });

    function mtof(m) { return 440 * Math.pow(2, (m - 69) / 12); }
    function curve(a) { var n = 1024, c = new Float32Array(n), k = 1 + a * 60; for (var i = 0; i < n; i++) { var v = i * 2 / n - 1; c[i] = Math.tanh(k * v) / Math.tanh(k); } return c; }
    function init() {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) return false;
      ac = new C();
      osc = ac.createOscillator(); osc.type = "sawtooth";
      filt = ac.createBiquadFilter(); filt.type = "lowpass"; filt.Q.value = 1 + K.res * 24;
      var shaper = ac.createWaveShaper(); shaper.curve = curve(.4);
      vca = ac.createGain(); vca.gain.value = 0;
      master = ac.createGain(); master.gain.value = .22;
      an = ac.createAnalyser(); an.fftSize = 2048;
      osc.connect(filt); filt.connect(shaper); shaper.connect(vca); vca.connect(master); master.connect(an); an.connect(ac.destination);
      osc.start();
      return true;
    }
    function kick(t) {
      var o = ac.createOscillator(), g = ac.createGain();
      o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + .12);
      g.gain.setValueAtTime(1.1, t); g.gain.exponentialRampToValueAtTime(.001, t + .32);
      o.connect(g); g.connect(master); o.start(t); o.stop(t + .35);
    }
    function schedule() {
      var sd = 60 / BPM / 4;
      while (nextT < ac.currentTime + .12) {
        var i = cur % N, t = nextT, base = 80 + Math.pow(K.cut, 2) * 2600, peak = base + .6 * (accent[i] ? 5200 : 3200);
        if (i % 4 === 0) kick(t);
        if (gate[i]) {
          var f = mtof(notes[i]);
          if (slide[(i + N - 1) % N]) osc.frequency.exponentialRampToValueAtTime(f, t + sd * .6); else osc.frequency.setValueAtTime(f, t);
          vca.gain.cancelScheduledValues(t); vca.gain.setValueAtTime(accent[i] ? .95 : .6, t);
          if (!slide[i]) vca.gain.setTargetAtTime(0, t + sd * .55, .02);
          filt.frequency.cancelScheduledValues(t); filt.frequency.setValueAtTime(Math.min(peak, 12000), t);
          filt.frequency.setTargetAtTime(base, t + .005, accent[i] ? .06 : .11);
        } else {
          vca.gain.setTargetAtTime(0, t, .01);
        }
        nextT += sd; cur++;
      }
    }
    function label() {
      btn.textContent = playing ? btn.dataset.labelStop : btn.dataset.labelPlay;
      btn.setAttribute("aria-pressed", playing ? "true" : "false");
    }
    btn.addEventListener("click", function () {
      if (!ac && !init()) { btn.disabled = true; return; }
      if (!playing) {
        ac.resume(); playing = true; cur = 0; nextT = ac.currentTime + .05; timer = setInterval(schedule, 25);
      } else {
        playing = false; clearInterval(timer);
        vca.gain.cancelScheduledValues(ac.currentTime); vca.gain.setTargetAtTime(0, ac.currentTime, .01);
      }
      label();
    });

    var obj = { K: K };
    obj.isPlaying = function () { return playing; };
    obj.draw = function (dt) {
      var s = fit(scope), W = s[0], H = s[1];
      sx.fillStyle = "rgba(11,20,8,.6)"; sx.fillRect(0, 0, W, H);
      sx.lineWidth = 2; sx.strokeStyle = "hsl(" + (90 - K.cut * 90) + ",100%," + (55 + K.res * 10) + "%)";
      sx.beginPath();
      if (playing && an) {
        an.getByteTimeDomainData(buf);
        var st = 0;
        for (var i = 1; i < buf.length / 2; i++) if (buf[i - 1] < 128 && buf[i] >= 128) { st = i; break; }
        for (i = 0; i < W; i++) { var v = buf[st + Math.floor(i * 900 / W)] || 128, y = H / 2 + (v - 128) / 128 * H * .45; if (i === 0) sx.moveTo(i, y); else sx.lineTo(i, y); }
      } else {
        if (state.running) ph += dt * 2;
        var harm = 3 + Math.round(K.cut * 14);
        for (i = 0; i < W; i++) {
          var xx = i / W * 4 * Math.PI + ph, yy = 0;
          for (var k = 1; k <= harm; k++) yy += Math.sin(k * xx) / k * (1 + K.res * (k === harm ? 3 : 0));
          yy = H / 2 - yy * H * .16; if (i === 0) sx.moveTo(i, yy); else sx.lineTo(i, yy);
        }
      }
      sx.stroke();
    };
    watch(root, obj);
    obj.draw(0);
    return obj;
  }

  /* ---------- one loop, ~30 fps, idle when hidden ---------- */
  var last = performance.now(), acc = 0;
  function loop(now) {
    requestAnimationFrame(loop);
    var dt = Math.min(.1, (now - last) / 1000); last = now; acc += dt;
    if (acc < 1 / 30 || document.hidden) return;
    var step = acc; acc = 0;
    if (!state.running && !(acid && acid.isPlaying())) return;
    for (var i = 0; i < grounds.length; i++) if (grounds[i].visible) grounds[i].draw(step);
    if (acid && acid.visible) acid.draw(step);
    if (state.running) {
      var k = now / 1000 * (.5 + state.trip);
      if (warpT) warpT.setAttribute("baseFrequency", (0.006 + 0.003 * Math.sin(k * .35)).toFixed(4) + " " + (0.022 + 0.008 * Math.sin(k * .27)).toFixed(4));
      hueT += step * state.trip * 20;
      var deg = (Math.sin(hueT / 40) * state.trip * 70).toFixed(1);
      hues.forEach(function (h) { h.style.filter = "hue-rotate(" + deg + "deg)"; });
    }
  }
  requestAnimationFrame(loop);
})();
