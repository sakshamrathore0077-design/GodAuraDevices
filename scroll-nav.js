/**
 * In-page scroll navigation — smooth scroll + active section highlighting
 * Used on index.html for Home, About, Research, Products sections
 */
const ScrollNav = (() => {
  const SECTION_IDS = ["home", "about", "research", "products"];
  const NAV_OFFSET = 80;

  function isHomePage() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    return path === "" || path === "index.html";
  }

  function scrollToSection(id, behavior = "smooth") {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior });
  }

  function setActiveNavLink(id) {
    document.querySelectorAll('.navbar__link[data-section]').forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("data-section") === id);
    });
  }

  function getCurrentSection() {
    const scrollPos = window.scrollY + NAV_OFFSET + 120;
    let current = SECTION_IDS[0];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) current = id;
    });

    return current;
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const hash = anchor.getAttribute("href");
        if (!hash || hash === "#") return;
        const id = hash.slice(1);
        const target = document.getElementById(id);
        if (!target) return;

        e.preventDefault();
        scrollToSection(id);
        history.pushState(null, "", hash);
        Navbar?.closeMenu?.();
      });
    });
  }

  function initScrollSpy() {
    if (!isHomePage()) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setActiveNavLink(getCurrentSection());
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function handleInitialHash() {
    if (!isHomePage()) return;
    const hash = window.location.hash.slice(1);
    if (hash && SECTION_IDS.includes(hash)) {
      setTimeout(() => scrollToSection(hash, "auto"), 100);
      setActiveNavLink(hash);
    } else {
      setActiveNavLink("home");
    }
  }

  function init() {
    if (!isHomePage()) return;
    initSmoothScroll();
    initScrollSpy();
    handleInitialHash();
  }

  return { init, scrollToSection, isHomePage };
})();

if (typeof window !== "undefined") {
  window.ScrollNav = ScrollNav;
}
