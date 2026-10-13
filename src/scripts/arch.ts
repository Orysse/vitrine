// Architecture diagrams: hovering, focusing or tapping a part shows its card in the panel.
// Without this script every card is listed and each part links to its card.
export function arch(root: HTMLElement): void {
  const parts = [...root.querySelectorAll<HTMLAnchorElement>("[data-part]")];
  const cards = new Map([...root.querySelectorAll<HTMLElement>("[data-card]")].map((c) => [c.dataset.card!, c]));
  if (!parts.length) return;
  root.classList.add("is-live");

  const show = (id: string) => {
    if (!cards.has(id)) return;
    for (const p of parts) p.toggleAttribute("aria-current", p.dataset.part === id);
    for (const [key, card] of cards) card.classList.toggle("on", key === id);
  };

  for (const p of parts) {
    const id = p.dataset.part!;
    p.addEventListener("pointerenter", (e) => e.pointerType === "mouse" && show(id));
    p.addEventListener("focus", () => show(id));
    p.addEventListener("click", (e) => {
      e.preventDefault();
      show(id);
      history.replaceState(null, "", `#${id}`);
      const panel = root.querySelector(".arch-panel");
      if (panel && panel.getBoundingClientRect().top > window.innerHeight) panel.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
    });
  }

  const fromHash = decodeURIComponent(location.hash.slice(1));
  show(cards.has(fromHash) ? fromHash : parts[0].dataset.part!);
}
