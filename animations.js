/**
 * Scroll animations, progress bar, splash screen, reveal on scroll
 */
const Animations = (() => {
  function initScrollProgress() {
    const bar = document.querySelector(".scroll-progress");
    if (!bar) return;

    window.addEventListener(
      "scroll",
      () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
      },
      { passive: true }
    );
  }

  function initReveal() {
    const reveals = document.querySelectorAll(".reveal, .stagger-children");
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  function initSplash() {
    const splash = document.getElementById("splash-screen");
    if (!splash) return;

    const hide = () => {
      splash.classList.add("is-hidden");
      setTimeout(() => splash.remove(), 700);
    };

    if (document.readyState === "complete") {
      setTimeout(hide, 1200);
    } else {
      window.addEventListener("load", () => setTimeout(hide, 1200));
    }

    setTimeout(hide, 3000);
  }

  function init() {
    initScrollProgress();
    initReveal();
    initSplash();
  }

  return { init };
})();

if (typeof window !== "undefined") {
  window.Animations = Animations;
}
