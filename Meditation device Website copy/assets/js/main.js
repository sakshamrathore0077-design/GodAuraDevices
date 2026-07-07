/**
 * GodAura Devices — Main entry point
 */
document.addEventListener("DOMContentLoaded", () => {
  ThemeManager.init();
  Navbar.init();
  ScrollNav.init();
  Particles.init();
  ModalManager.init();
  Animations.init();
  CursorGlow.init();

  if (document.getElementById("chart-consistency")) {
    ResearchCharts.init();
  }

  if (document.querySelector("[data-carousel]")) {
    Carousel.init();
  }
});
