/**
 * Custom cursor glow — desktop only
 */
const CursorGlow = (() => {
  function init() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const glow = document.querySelector(".cursor-glow");
    if (!glow) return;

    document.body.classList.add("has-cursor-glow");

    let x = 0;
    let y = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
    });

    function animate() {
      currentX += (x - currentX) * 0.12;
      currentY += (y - currentY) * 0.12;
      glow.style.left = `${currentX}px`;
      glow.style.top = `${currentY}px`;
      requestAnimationFrame(animate);
    }
    animate();
  }

  return { init };
})();

if (typeof window !== "undefined") {
  window.CursorGlow = CursorGlow;
}
