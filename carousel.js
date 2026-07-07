/**
 * Image carousel — community / meditation gallery
 * Add images to GodAuraConfig.gallery when ready
 */
const Carousel = (() => {
  function buildSlides(container, images) {
    const track = container.querySelector(".carousel__track");
    const dots = container.querySelector(".carousel__dots");
    if (!track) return;

    track.innerHTML = "";
    dots.innerHTML = "";

    images.forEach((img, index) => {
      const slide = document.createElement("div");
      slide.className = "carousel__slide";
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-label", `Slide ${index + 1} of ${images.length}`);

      if (img.src) {
        slide.innerHTML = `<img src="${img.src}" alt="${img.alt || "Meditating with GodAura device"}" loading="lazy">`;
      } else {
        slide.innerHTML = `
          <div class="carousel__placeholder">
            <span class="carousel__placeholder-icon">◎</span>
            <p>${img.placeholderText || "Community photo coming soon"}</p>
          </div>`;
      }

      track.appendChild(slide);

      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel__dot";
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.addEventListener("click", () => goTo(container, index));
      dots.appendChild(dot);
    });
  }

  function getSlideWidth(container) {
    const slide = container.querySelector(".carousel__slide");
    return slide ? slide.offsetWidth : 0;
  }

  function goTo(container, index) {
    const track = container.querySelector(".carousel__track");
    const slides = container.querySelectorAll(".carousel__slide");
    const dots = container.querySelectorAll(".carousel__dot");
    if (!track || !slides.length) return;

    const total = slides.length;
    const next = ((index % total) + total) % total;
    container.dataset.current = String(next);

    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${next * (slideWidth + gap)}px)`;

    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === next));
    slides.forEach((slide, i) => slide.setAttribute("aria-hidden", i !== next));
  }

  function initContainer(container) {
    const images =
      (typeof GodAuraConfig !== "undefined" && GodAuraConfig.gallery?.length
        ? GodAuraConfig.gallery
        : null) || getDefaultPlaceholders();

    buildSlides(container, images);

    const prev = container.querySelector(".carousel__btn--prev");
    const next = container.querySelector(".carousel__btn--next");

    prev?.addEventListener("click", () => {
      const current = Number(container.dataset.current || 0);
      goTo(container, current - 1);
    });

    next?.addEventListener("click", () => {
      const current = Number(container.dataset.current || 0);
      goTo(container, current + 1);
    });

    container.dataset.current = "0";
    goTo(container, 0);

    let touchStartX = 0;
    const viewport = container.querySelector(".carousel__viewport");
    viewport?.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );
    viewport?.addEventListener(
      "touchend",
      (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) < 40) return;
        const current = Number(container.dataset.current || 0);
        goTo(container, diff > 0 ? current + 1 : current - 1);
      },
      { passive: true }
    );

    window.addEventListener("resize", () => {
      goTo(container, Number(container.dataset.current || 0));
    });
  }

  function getDefaultPlaceholders() {
    return [
      { placeholderText: "Community meditation photo — coming soon" },
      { placeholderText: "Community meditation photo — coming soon" },
      { placeholderText: "Community meditation photo — coming soon" },
    ];
  }

  function init() {
    document.querySelectorAll("[data-carousel]").forEach(initContainer);
  }

  return { init, goTo };
})();

if (typeof window !== "undefined") {
  window.Carousel = Carousel;
}
