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
