// Polarity (INV) and the print button. External module, same-origin, CSP-safe.

const root = document.documentElement;

const write = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage disabled: the choice lasts this session only */
  }
};

const polarityToggle = document.querySelector<HTMLButtonElement>("[data-polarity-toggle]");
const applyPolarity = (theme: "light" | "dark"): void => {
  root.setAttribute("data-theme", theme);
  polarityToggle?.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
};
polarityToggle?.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  write("vitrine-polarity", next);
  applyPolarity(next);
});
applyPolarity(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

document.querySelectorAll<HTMLElement>("[data-print]").forEach((el) => {
  el.addEventListener("click", () => window.print());
});

// i and p switch polarity; Esc is a no-op kept out of the way.
window.addEventListener("keydown", (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  const el = event.target as HTMLElement | null;
  if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable)) return;
  if (event.key === "i") polarityToggle?.click();
});
