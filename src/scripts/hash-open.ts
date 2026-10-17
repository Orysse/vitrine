// Opens the fiche named by the URL hash. Without this script the fiches still open and
// close by themselves: this only handles deep links.
function openFromHash(): void {
  let id = location.hash.slice(1);
  try {
    id = decodeURIComponent(id);
  } catch {
    // malformed escape: use the raw hash, it matches nothing
  }
  const el = id ? document.getElementById(id) : null;
  if (!(el instanceof HTMLDetailsElement) || !el.classList.contains("work")) return;
  el.open = true;
  el.scrollIntoView();
}

openFromHash();
addEventListener("hashchange", openFromHash);

// Print: open every fiche, then put things back. The shared `name` makes the browser close the
// others whenever one opens, so it is taken off while printing.
let before: { id: string; open: boolean }[] | null = null;
const works = () => [...document.querySelectorAll<HTMLDetailsElement>("details.work")];

addEventListener("beforeprint", () => {
  before = works().map((el) => ({ id: el.id, open: el.open }));
  for (const el of works()) {
    el.removeAttribute("name");
    el.open = true;
  }
});
addEventListener("afterprint", () => {
  if (!before) return;
  for (const el of works()) {
    el.open = false;
    el.setAttribute("name", "works");
  }
  for (const s of before) if (s.open) (document.getElementById(s.id) as HTMLDetailsElement).open = true;
  before = null;
});
