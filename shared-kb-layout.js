/**
 * Shared sidebar + layout injector for iTELL Knowledge Base mockups.
 * Each page just needs a <div class="kb-main"> — this script prepends the sidebar.
 *
 * Usage: <script src="../shared-kb-layout.js"></script> at bottom of <body>
 */

(function () {
  const path = location.pathname;
  const isActive = (page) => path.includes(page) ? ' active' : '';

  const sidebar = document.createElement("aside");
  sidebar.className = "kb-sidebar";
  sidebar.innerHTML = `
    <div class="kb-sidebar-header">
      <div class="kb-sidebar-logo">iT</div>
      <div class="kb-sidebar-brand">
        iTELL Help Center
        <small>Knowledge Base</small>
      </div>
    </div>
    <nav class="kb-sidebar-nav">
      <a class="kb-sidebar-link${isActive('index.html') || path.endsWith('/v1/') ? ' active' : ''}" href="index.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Home
      </a>

      <div class="kb-sidebar-section">Getting Started</div>
      <a class="kb-sidebar-link${isActive('getting-started')}" href="getting-started.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        Account & Sign In
      </a>
      <a class="kb-sidebar-link${isActive('reading-progress')}" href="reading-progress.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
        Reading & Progress
      </a>

      <div class="kb-sidebar-section">Learning Activities</div>
      <a class="kb-sidebar-link${isActive('summaries')}" href="summaries-evaluation.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        Summaries & Evaluation
      </a>
      <a class="kb-sidebar-link${isActive('questions-cloze')}" href="questions-cloze.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        Questions & Cloze
      </a>
      <a class="kb-sidebar-link${isActive('itell-ai')}" href="itell-ai.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        iTELL AI Assistant
      </a>

      <div class="kb-sidebar-section">Tools & Features</div>
      <a class="kb-sidebar-link${isActive('dashboard')}" href="dashboard.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        Dashboard & Stats
      </a>
      <a class="kb-sidebar-link${isActive('notes-highlights')}" href="notes-highlights.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        Notes & Highlights
      </a>

      <div class="kb-sidebar-section">Help</div>
      <a class="kb-sidebar-link${isActive('faq')}" href="faq.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        FAQ
      </a>
      <a class="kb-sidebar-link${isActive('data-privacy')}" href="data-privacy.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        Data & Privacy
      </a>
    </nav>
    <div class="kb-sidebar-footer">
      Need more help?<br>
      <a href="mailto:lear.lab.vu@gmail.com">Contact Support</a>
    </div>
  `;

  document.body.prepend(sidebar);

  /* FAQ accordion toggle */
  document.querySelectorAll('.kb-faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.classList.toggle('open');
    });
  });
})();
