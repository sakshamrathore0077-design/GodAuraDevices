/**
 * Navbar — sticky blur, hamburger menu
 * Active states on index: handled by ScrollNav (scroll spy)
 */
const Navbar = (() => {
  let navEl;
  let menuEl;
  let toggleBtn;

  function handleScroll() {
    if (!navEl) return;
    navEl.classList.toggle("is-scrolled", window.scrollY > 40);
  }

  function toggleMenu() {
    const isOpen = menuEl.classList.toggle("is-open");
    toggleBtn.classList.toggle("is-open", isOpen);
    toggleBtn.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  function closeMenu() {
    menuEl?.classList.remove("is-open");
    toggleBtn?.classList.remove("is-open");
    toggleBtn?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function init() {
    navEl = document.querySelector(".navbar");
    menuEl = document.querySelector(".navbar__nav");
    toggleBtn = document.querySelector(".navbar__toggle");

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    toggleBtn?.addEventListener("click", toggleMenu);

    menuEl?.querySelectorAll(".navbar__link").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  return { init, closeMenu };
})();

if (typeof window !== "undefined") {
  window.Navbar = Navbar;
}
