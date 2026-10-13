// Runs before first paint (external, same-origin, so the strict CSP allows it).
// It applies the stored polarity, falling back to the OS preference, so the page
// never flashes the wrong theme. Without JavaScript the concrete-light default applies.
(function () {
  var root = document.documentElement;
  try {
    var polarity = localStorage.getItem("vitrine-polarity");
    if (polarity !== "light" && polarity !== "dark") {
      polarity =
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    }
    root.setAttribute("data-theme", polarity);
  } catch (error) {
    root.setAttribute("data-theme", "light");
  }
})();
