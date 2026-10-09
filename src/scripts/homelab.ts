// Homelab map island: block details on hover, focus or click; animated paths; layer highlights.
// Without this script the blocks are links to the text version further down the page.

type Data = {
  blocks: Record<string, { label: string; zone: string; tech: string[]; text: string }>;
  paths: Record<string, { title: string; steps: { from: string; to: string; text: string }[] }>;
};

const STEP_MS = 1100;

export function homelab(root: HTMLElement): void {
  const data: Data = JSON.parse(document.querySelector("[data-homelab-data]")!.textContent!);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const svg = root.querySelector<SVGSVGElement>("[data-map]")!;
  const dot = svg.querySelector<SVGCircleElement>("[data-dot]")!;
  const nodes = new Map([...svg.querySelectorAll<SVGAElement>("[data-node]")].map((n) => [n.dataset.node!, n]));
  const segs = [...svg.querySelectorAll<SVGPathElement>("[data-seg]")];
  const q = <T extends Element>(s: string) => root.querySelector<T>(s)!;
  const panel = {
    def: q<HTMLElement>("[data-panel-default]"),
    block: q<HTMLElement>("[data-panel-block]"),
    path: q<HTMLElement>("[data-panel-path]"),
    zone: q<HTMLElement>("[data-panel-zone]"),
    title: q<HTMLElement>("[data-panel-title]"),
    text: q<HTMLElement>("[data-panel-text]"),
    tech: q<HTMLElement>("[data-panel-tech]"),
    pathTitle: q<HTMLElement>("[data-panel-path-title]"),
    steps: q<HTMLElement>("[data-panel-steps]"),
  };
  const pathBtns = [...root.querySelectorAll<HTMLButtonElement>("[data-path-btn]")];

  let pinned: string | null = null;
  let activePath: string | null = null;
  let run = 0; // bumps on every new animation, so stale ones stop

  function view(which: "def" | "block" | "path") {
    panel.def.hidden = which !== "def";
    panel.block.hidden = which !== "block";
    panel.path.hidden = which !== "path";
  }

  function showBlock(id: string | null) {
    nodes.forEach((n, k) => n.classList.toggle("is-selected", k === id));
    if (!id) {
      view(activePath ? "path" : "def");
      return;
    }
    const b = data.blocks[id];
    panel.zone.textContent = b.zone;
    panel.title.textContent = b.label;
    panel.text.textContent = b.text;
    panel.tech.replaceChildren(...b.tech.map((x) => Object.assign(document.createElement("li"), { className: "chip", textContent: x })));
    view("block");
  }

  function focusSet(ids: Set<string> | null) {
    svg.classList.toggle("is-focused", !!ids);
    nodes.forEach((n, k) => n.classList.toggle("is-on", !!ids?.has(k)));
  }

  function clearPath() {
    run++;
    activePath = null;
    segs.forEach((s) => s.classList.remove("is-on", "is-done"));
    pathBtns.forEach((b) => b.setAttribute("aria-pressed", "false"));
    dot.classList.remove("is-on");
    focusSet(null);
  }

  function animateDot(seg: SVGPathElement, my: number): Promise<void> {
    return new Promise((resolve) => {
      const len = seg.getTotalLength();
      const t0 = performance.now();
      dot.classList.add("is-on");
      const tick = (now: number) => {
        if (my !== run) return resolve();
        const k = Math.min(1, (now - t0) / (STEP_MS * 0.7));
        const p = seg.getPointAtLength(len * (1 - Math.pow(1 - k, 2)));
        dot.setAttribute("cx", String(p.x));
        dot.setAttribute("cy", String(p.y));
        if (k < 1) requestAnimationFrame(tick);
        else setTimeout(resolve, STEP_MS * 0.3);
      };
      requestAnimationFrame(tick);
    });
  }

  async function playPath(id: string) {
    clearPath();
    pinned = null;
    showBlock(null);
    activePath = id;
    const my = run;
    const p = data.paths[id];
    pathBtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.pathBtn === id)));
    panel.pathTitle.textContent = p.title;
    panel.steps.replaceChildren(...p.steps.map((s) => Object.assign(document.createElement("li"), { textContent: s.text })));
    const items = [...panel.steps.children] as HTMLElement[];
    view("path");

    const on = new Set<string>();
    const mine = segs.filter((s) => s.dataset.seg!.startsWith(`${id}:`));
    if (reduced) {
      p.steps.forEach((s) => on.add(s.from).add(s.to));
      focusSet(on);
      mine.forEach((s) => s.classList.add("is-on"));
      items.forEach((li) => li.classList.add("is-on"));
      return;
    }
    items.forEach((li) => li.classList.add("is-pending"));
    for (const [i, s] of p.steps.entries()) {
      if (my !== run) return;
      on.add(s.from).add(s.to);
      focusSet(on);
      mine[i].classList.add("is-on");
      items[i].classList.remove("is-pending");
      items[i].classList.add("is-on");
      await animateDot(mine[i], my);
      mine[i].classList.replace("is-on", "is-done");
      items[i].classList.remove("is-on");
    }
    if (my === run) {
      dot.classList.remove("is-on");
      mine.forEach((s) => s.classList.replace("is-done", "is-on"));
    }
  }

  /* ---------- blocks ---------- */
  nodes.forEach((n, id) => {
    n.addEventListener("click", (e) => {
      e.preventDefault();
      pinned = pinned === id ? null : id;
      showBlock(pinned);
    });
    n.addEventListener("mouseenter", () => showBlock(id));
    n.addEventListener("mouseleave", () => showBlock(pinned));
    n.addEventListener("focus", () => showBlock(id));
    n.addEventListener("blur", () => showBlock(pinned));
  });
  root.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    pinned = null;
    clearPath();
    showBlock(null);
  });

  /* ---------- paths ---------- */
  pathBtns.forEach((b) => b.addEventListener("click", () => playPath(b.dataset.pathBtn!)));
  q<HTMLButtonElement>("[data-replay]").addEventListener("click", () => activePath && playPath(activePath));
  q<HTMLButtonElement>("[data-clear]").addEventListener("click", () => {
    pinned = null;
    clearPath();
    showBlock(null);
  });

  /* ---------- layers (buttons live outside the map section) ---------- */
  document.querySelectorAll<HTMLButtonElement>("[data-layer]").forEach((b) =>
    b.addEventListener("click", () => {
      clearPath();
      pinned = null;
      showBlock(null);
      focusSet(new Set(b.dataset.layer!.split(" ")));
      svg.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    }),
  );
}
