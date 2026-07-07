/**
 * Theme toggle — default LIGHT; dark mode opt-in only
 * Persists preference in localStorage when user toggles
 */
const ThemeManager = (() => {
  const STORAGE_KEY = "godaura-theme";
  const root = document.documentElement;

  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "dark" ? "dark" : "light";
  }

  function apply(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    const btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    const isDark = theme === "dark";
    btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    btn.innerHTML = isDark
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }

  function toggle() {
    document.body.classList.add("theme-transitioning");
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    setTimeout(() => document.body.classList.remove("theme-transitioning"), 500);
  }

  function init() {
    apply(getPreferred());
    document.querySelector(".theme-toggle")?.addEventListener("click", toggle);
  }

  return { init, apply, toggle, getPreferred };
})();

if (typeof window !== "undefined") {
  window.ThemeManager = ThemeManager;
}
