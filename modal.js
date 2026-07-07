/**
 * Modal system — auth sign-in & product detail popups
 * Ready for backend auth hooks via GodAuraConfig.api
 */
const ModalManager = (() => {
  const overlays = new Map();

  function open(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    overlays.set(id, overlay);

    const focusable = overlay.querySelector("input, button, [tabindex]");
    focusable?.focus();
  }

  function close(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    overlays.delete(id);
    if (overlays.size === 0) document.body.style.overflow = "";
  }

  function closeAll() {
    overlays.forEach((_, id) => close(id));
  }

  function bindTriggers() {
    document.querySelectorAll("[data-modal-open]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        open(el.getAttribute("data-modal-open"));
      });
    });

    document.querySelectorAll("[data-modal-close]").forEach((el) => {
      el.addEventListener("click", () => {
        const overlay = el.closest(".modal-overlay");
        if (overlay) close(overlay.id);
      });
    });

    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close(overlay.id);
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAll();
    });
  }

  /** Auth form — placeholder for API integration */
  function initAuthForm() {
    const form = document.getElementById("auth-form");
    const codeBtn = document.getElementById("send-code-btn");
    const codeGroup = document.getElementById("confirmation-code-group");

    codeBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      codeGroup?.classList.remove("hidden");
      codeGroup?.querySelector("input")?.focus();
      // Future: POST to GodAuraConfig.api.auth.confirmCode
      console.info("[GodAura] Send confirmation code — connect to API");
    });

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      // Future: POST to GodAuraConfig.api.auth.login
      console.info("[GodAura] Login submit — connect to API");
    });

    document.querySelector(".btn-google")?.addEventListener("click", () => {
      console.info("[GodAura] Google OAuth — connect to API");
    });
  }

  /** Product modal — populate from config */
  function openProductModal(productId) {
    const product = GodAuraConfig.products.find((p) => p.id === productId);
    if (!product) return;

    const modal = document.getElementById("product-modal");
    if (!modal) return;

    modal.querySelector("[data-product-name]").textContent = product.name;
    modal.querySelector("[data-product-price]").textContent = product.price;
    modal.querySelector("[data-product-desc]").textContent = product.shortDesc;

    const imgEl = modal.querySelector("[data-product-image]");
    if (imgEl) {
      imgEl.innerHTML = `<img src="${product.image}" alt="${product.name}" width="160" height="160">`;
    }

    const featuresEl = modal.querySelector("[data-product-features]");
    if (featuresEl) {
      featuresEl.innerHTML = product.features
        .map((f) => `<li>${f}</li>`)
        .join("");
    }

    const specsEl = modal.querySelector("[data-product-specs]");
    if (specsEl) {
      specsEl.innerHTML = Object.entries(product.specs)
        .map(([k, v]) => `<li><span>${k}</span><span>${v}</span></li>`)
        .join("");
    }

    open("product-modal-overlay");
  }

  function initProductButtons() {
    document.querySelectorAll("[data-product-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        openProductModal(btn.getAttribute("data-product-id"));
      });
    });
  }

  function init() {
    bindTriggers();
    initAuthForm();
    initProductButtons();
  }

  return { init, open, close, openProductModal };
})();

if (typeof window !== "undefined") {
  window.ModalManager = ModalManager;
}
