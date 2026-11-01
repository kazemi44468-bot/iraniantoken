(()=> {
  "use strict";

  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  // Keep Persian typography local and correct legacy in-page destinations.
  document.querySelectorAll('link[href*="fonts.googleapis.com"], link[rel="preconnect"][href*="fonts.googleapis.com"]').forEach(node => node.remove());
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute("href") || "";
    if (href.includes("dashboard.html#documents")) link.setAttribute("href", href.replace("#documents", "#access"));
    if (href.includes("users.html#roles")) link.setAttribute("href", href.replace("#roles", "#panel-roles"));
  });
  if (file === "dashboard.html" && !document.getElementById("top")) document.body.id = "top";

  const activateHashPanel = () => {
    let id = decodeURIComponent(location.hash.slice(1));
    if (file === "users.html" && id === "roles") id = "panel-roles";
    if (!id.startsWith("panel-")) return;
    const key = id.slice(6);
    const tab = document.querySelector('.tab-btn[data-tab="' + key + '"]');
    if (tab && !tab.classList.contains("active")) tab.click();
  };
  if (location.hash) requestAnimationFrame(activateHashPanel);
  const internalPages = new Set([
    "dashboard.html", "settings.html", "reports.html", "validation.html",
    "users.html", "profile.html", "notifications.html", "help.html",
    "new-project.html", "project-detail.html", "housing-token.html",
    "car-token.html", "honey-token.html", "solar-token.html"
  ]);

  const nav = document.querySelector(".sidebar-nav");
  if (nav) {
    const links = [...nav.querySelectorAll('a[href]')];
    const isCurrent = (href) => {
      if (!href || href.startsWith("#") || /^(?:mailto:|tel:|javascript:)/i.test(href)) return false;
      try {
        const target = new URL(href, location.href);
        return target.origin === location.origin &&
          (target.pathname.split("/").pop() || "index.html").toLowerCase() === file;
      } catch (_) { return false; }
    };

    links.forEach(link => {
      link.classList.remove("active");
      if (isCurrent(link.getAttribute("href"))) link.classList.add("active");
    });

    nav.querySelectorAll(".nav-group").forEach(group => {
      const childIsCurrent = !!group.querySelector("a.active");
      if (childIsCurrent) {
        group.classList.add("open");
        const parent = group.querySelector(":scope > .nav-parent-row .nav-item");
        if (parent) parent.classList.add("active");
      }
    });

    nav.querySelectorAll(".nav-expand").forEach(button => {
      const group = button.closest(".nav-group");
      if (!group) return;
      button.setAttribute("aria-expanded", String(group.classList.contains("open")));
      button.addEventListener("click", () => {
        const open = group.classList.toggle("open");
        button.setAttribute("aria-expanded", String(open));
      });
    });
  }

  // Load the shared workspace layer after page-specific styles so the mobile
  // navigation and member sidebar stay visually consistent across pages.
  if (!document.querySelector('link[data-it-workspace]')) {
    const workspaceStyle = document.createElement("link");
    workspaceStyle.rel = "stylesheet";
    workspaceStyle.href = "workspace.css";
    workspaceStyle.dataset.itWorkspace = "true";
    document.head.appendChild(workspaceStyle);
  }

  const projectPages = [
    "projects.html", "new-project.html", "project-detail.html",
    "housing-token.html", "car-token.html", "honey-token.html", "solar-token.html"
  ];
  const dashboardPages = [
    "dashboard.html", "reports.html", "validation.html", "users.html",
    "profile.html", "notifications.html", "help.html"
  ];
  document.body.dataset.itPage = file;
  if (dashboardPages.includes(file) || file === "settings.html") {
    document.body.dataset.itDashboard = "true";
  }
  const activeKey =
    file === "index.html" ? "home" :
    projectPages.includes(file) ? "projects" :
    dashboardPages.includes(file) ? "dashboard" :
    file === "settings.html" ? "settings" :
    file === "auth.html" ? "auth" :
    null;

  const items = [
    ["dashboard", "dashboard.html", "داشبورد", '<svg viewBox="0 0 24 24"><path d="M4 13h6V4H4v9Zm10 7h6v-9h-6v9ZM4 20h6v-3H4v3Zm10-10h6V4h-6v6Z"/></svg>'],
    ["projects", "projects.html", "پروژه‌ها", '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>'],
    ["home", "index.html", "معرفی", '<svg viewBox="0 0 24 24"><path d="M4 11.5 12 5l8 6.5M6.5 10v9h11v-9M10 19v-5h4v5"/></svg>'],
    ["auth", "auth.html", "ورود", '<svg viewBox="0 0 24 24"><path d="M13 5h6v14h-6M19 12H5m5-4-4 4 4 4"/></svg>'],
    ["settings", "settings.html", "تنظیمات", '<svg viewBox="0 0 24 24"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/></svg>']
  ];

  const bottomNav = document.createElement("nav");
  bottomNav.className = "it-bottom-nav";
  bottomNav.setAttribute("aria-label", "دسترسی سریع");
  bottomNav.innerHTML = items.map(([key, href, label, icon]) =>
    '<a' + (activeKey === key ? ' class="active"' : '') +
    ' href="' + href + '"' + (activeKey === key ? ' aria-current="page"' : '') +
    '><span class="it-nav-icon">' + icon + '</span><span>' + label + '</span></a>'
  ).join("");
  document.body.appendChild(bottomNav);
})();