/**
 * Research charts — Chart.js with theme-aware colors
 * Placeholder data; replace with API fetch later
 */
const ResearchCharts = (() => {
  let chartInstances = [];

  function getThemeColors() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    return {
      text: isDark ? "#a8c4c4" : "#3d4f66",
      grid: isDark ? "rgba(0, 212, 207, 0.1)" : "rgba(0, 184, 179, 0.12)",
      cyan: "rgba(0, 212, 207, 0.85)",
      cyanLight: "rgba(0, 212, 207, 0.35)",
      cyanFill: "rgba(0, 212, 207, 0.15)",
    };
  }

  function defaultOptions(colors) {
    return {
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 1200, easing: "easeOutQuart" },
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          labels: { color: colors.text, font: { family: "Inter" } },
        },
        tooltip: {
          backgroundColor: "rgba(10, 22, 40, 0.9)",
          titleColor: "#00d4cf",
          bodyColor: "#f0fafa",
          borderColor: "rgba(0, 212, 207, 0.3)",
          borderWidth: 1,
          padding: 12,
        },
      },
      scales: {
        x: {
          ticks: { color: colors.text },
          grid: { color: colors.grid },
        },
        y: {
          ticks: { color: colors.text },
          grid: { color: colors.grid },
        },
      },
    };
  }

  function destroyAll() {
    chartInstances.forEach((c) => c.destroy());
    chartInstances = [];
  }

  function init() {
    if (typeof Chart === "undefined") return;

    const colors = getThemeColors();
    const base = defaultOptions(colors);

    const configs = [
      {
        id: "chart-consistency",
        type: "line",
        data: {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
          datasets: [
            {
              label: "Sessions / Week",
              data: [3, 4, 5, 6, 7, 8],
              borderColor: colors.cyan,
              backgroundColor: colors.cyanFill,
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 7,
            },
          ],
        },
        options: {
          ...base,
          plugins: { ...base.plugins, title: { display: false } },
        },
      },
      {
        id: "chart-stress",
        type: "bar",
        data: {
          labels: ["Baseline", "Week 2", "Week 4", "Week 6", "Week 8"],
          datasets: [
            {
              label: "Stress Index (%)",
              data: [100, 82, 68, 55, 42],
              backgroundColor: colors.cyanLight,
              hoverBackgroundColor: colors.cyan,
              borderRadius: 8,
            },
          ],
        },
        options: base,
      },
      {
        id: "chart-sleep",
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Sleep Quality Score",
              data: [62, 65, 70, 72, 78, 80, 85],
              borderColor: colors.cyan,
              backgroundColor: colors.cyanFill,
              fill: true,
              tension: 0.35,
            },
          ],
        },
        options: base,
      },
      {
        id: "chart-focus",
        type: "radar",
        data: {
          labels: ["Attention", "Clarity", "Calm", "Energy", "Recovery", "Flow"],
          datasets: [
            {
              label: "Focus Enhancement",
              data: [65, 72, 80, 68, 75, 82],
              borderColor: colors.cyan,
              backgroundColor: colors.cyanFill,
              pointBackgroundColor: colors.cyan,
            },
          ],
        },
        options: {
          ...base,
          scales: {
            r: {
              ticks: { color: colors.text, backdropColor: "transparent" },
              grid: { color: colors.grid },
              pointLabels: { color: colors.text },
            },
          },
        },
      },
    ];

    destroyAll();

    configs.forEach((cfg) => {
      const canvas = document.getElementById(cfg.id);
      if (!canvas) return;
      const chart = new Chart(canvas, {
        type: cfg.type,
        data: cfg.data,
        options: cfg.options,
      });
      chartInstances.push(chart);
    });
  }

  function refreshOnThemeChange() {
    document.querySelector(".theme-toggle")?.addEventListener("click", () => {
      setTimeout(init, 550);
    });
  }

  function setup() {
    init();
    refreshOnThemeChange();
  }

  return { init: setup, destroyAll };
})();

if (typeof window !== "undefined") {
  window.ResearchCharts = ResearchCharts;
}
