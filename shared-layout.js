/**
 * Shared sidebar + layout injector for iTELL mockups.
 * Each page just needs a <div class="main"> — this script prepends the sidebar.
 *
 * Usage: <script src="../shared-layout.js"></script> at bottom of <body>
 */

(function () {
  const sidebar = document.createElement("aside");
  sidebar.className = "sidebar";
  sidebar.innerHTML = `
    <div class="sidebar-header">
      <div class="sidebar-logo">A</div>
      <div class="sidebar-org">
        Training Admin
        <small>/acme-corp</small>
      </div>
    </div>
    <nav class="sidebar-nav">
      <a class="sidebar-link${location.pathname.endsWith('index.html') || location.pathname.endsWith('/') ? ' active' : ''}" href="index.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Home
      </a>
      <div class="sidebar-section">Volumes</div>
      <div class="sidebar-volume active">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
        Workplace Safety Manual
      </div>
      <div class="sidebar-volume">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
        Equipment Operations Guide
      </div>
    </nav>
  `;

  document.body.prepend(sidebar);
})();
