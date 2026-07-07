/**
 * Ambient floating particles — calming background effect
 */
const Particles = (() => {
  let canvas;
  let ctx;
  let particles = [];
  let animationId;
  let width;
  let height;

  const config = {
    count: 60,
    maxSize: 3,
    speed: 0.3,
    color: "rgba(0, 212, 207, 0.4)",
  };

  function resize() {
    if (!canvas) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * config.maxSize + 0.5,
      speedX: (Math.random() - 0.5) * config.speed,
      speedY: (Math.random() - 0.5) * config.speed - 0.1,
      opacity: Math.random() * 0.5 + 0.2,
    };
  }

  function initParticles() {
    particles = [];
    const count = window.innerWidth < 768 ? 30 : config.count;
    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const particleColor = isDark ? "rgba(0, 212, 207, 0.5)" : "rgba(0, 184, 179, 0.35)";

    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    animationId = requestAnimationFrame(draw);
  }

  function init() {
    canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    ctx = canvas.getContext("2d");
    resize();
    initParticles();
    draw();

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });
  }

  function destroy() {
    if (animationId) cancelAnimationFrame(animationId);
  }

  return { init, destroy };
})();

if (typeof window !== "undefined") {
  window.Particles = Particles;
}
