/**
 * Shared sidebar + layout injector for iTELL Knowledge Base v2.
 * Adds: volume-aware content filtering, audience switcher (Student / Instructor / Author).
 *
 * Usage: <script src="../shared-kb-layout-v2.js"></script> at bottom of <body>
 *
 * Volume filtering:
 *   - Any element with data-volumes="chevron mars" is shown only when volume matches.
 *   - data-volumes="all" (or absent) means always visible.
 *
 * Audience filtering:
 *   - Sidebar nav groups have data-audience="student|instructor|author|all".
 *   - Audience selector in sidebar switches which groups are visible.
 */

(function () {
  const path = location.pathname;
  const isActive = (page) => path.includes(page) ? ' active' : '';

  /* ── Sidebar ── */
  const sidebar = document.createElement("aside");
  sidebar.className = "kb-sidebar";
  sidebar.innerHTML = `
    <div class="kb-sidebar-header">
      <div class="kb-sidebar-logo">iT</div>
      <div class="kb-sidebar-brand">
        iTELL Help Center
        <small>Knowledge Base v2</small>
      </div>
    </div>

    <!-- Context Panel: role + textbook -->
    <div class="kb-context-panel">
      <div class="kb-context-group">
        <label class="kb-context-label">I am a:</label>
        <div class="kb-audience-tabs">
          <button class="kb-audience-tab active" data-audience="student">Student</button>
          <button class="kb-audience-tab" data-audience="instructor">Instructor</button>
          <button class="kb-audience-tab" data-audience="author">Content Author</button>
        </div>
      </div>
      <div class="kb-context-group">
        <label class="kb-context-label">My textbook:</label>
        <select id="kb-volume-select" class="kb-volume-select">
          <option value="all">All Textbooks</option>
          <option value="demo">Demo (Intro to NLP)</option>
          <option value="chevron">Chevron (Thinking Like a Scientist)</option>
          <option value="mars">Mars (Intro to CJ)</option>
        </select>
      </div>
    </div>

    <nav class="kb-sidebar-nav">
      <!-- Student nav -->
      <div data-audience="student all">
        <a class="kb-sidebar-link${isActive('index.html') || path.endsWith('/v2/') ? ' active' : ''}" href="index.html">
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
        <a class="kb-sidebar-link${isActive('summaries')}" href="summaries-evaluation.html" data-volumes="all">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          Summaries & Evaluation
        </a>
        <a class="kb-sidebar-link${isActive('questions-cloze')}" href="questions-cloze.html" data-volumes="demo chevron">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          Questions & Cloze
        </a>
        <a class="kb-sidebar-link${isActive('quizzes')}" href="quizzes.html" data-volumes="mars">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
          Quizzes
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
      </div>

      <!-- Instructor nav -->
      <div data-audience="instructor" style="display:none;">
        <div class="kb-sidebar-section">Instructor Guide</div>
        <a class="kb-sidebar-link${isActive('instructor-overview')}" href="instructor-overview.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
          Overview
        </a>
        <a class="kb-sidebar-link${isActive('class-setup')}" href="class-setup.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
          Class Setup
        </a>
        <a class="kb-sidebar-link${isActive('student-progress')}" href="student-progress.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          Monitoring Progress
        </a>
        <a class="kb-sidebar-link${isActive('instructor-faq')}" href="instructor-faq.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          Instructor FAQ
        </a>
      </div>

      <!-- Content Author nav -->
      <div data-audience="author" style="display:none;">
        <div class="kb-sidebar-section">Content Authoring</div>
        <a class="kb-sidebar-link${isActive('authoring-overview')}" href="authoring-overview.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Authoring Overview
        </a>
        <a class="kb-sidebar-link${isActive('content-structure')}" href="content-structure.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          Content Structure
        </a>
        <a class="kb-sidebar-link${isActive('payload-blocks')}" href="payload-blocks.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
          Payload Blocks
        </a>
        <a class="kb-sidebar-link${isActive('author-faq')}" href="author-faq.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          Author FAQ
        </a>
      </div>
    </nav>

    <div class="kb-sidebar-footer">
      Need more help?<br>
      <a href="mailto:lear.lab.vu@gmail.com">Contact Support</a>
    </div>
  `;

  document.body.prepend(sidebar);

  /* ── Volume filtering logic ── */
  const volumeSelect = document.getElementById('kb-volume-select');
  if (volumeSelect) {
    // Restore from sessionStorage
    const saved = sessionStorage.getItem('kb-volume');
    if (saved) volumeSelect.value = saved;

    function applyVolumeFilter() {
      const vol = volumeSelect.value;
      sessionStorage.setItem('kb-volume', vol);

      document.querySelectorAll('[data-volumes]').forEach(el => {
        const volumes = el.getAttribute('data-volumes');
        if (volumes === 'all' || vol === 'all' || volumes.split(' ').includes(vol)) {
          el.style.display = '';
          el.classList.remove('kb-hidden');
        } else {
          el.style.display = 'none';
          el.classList.add('kb-hidden');
        }
      });

      // Update volume indicator badge if present
      document.querySelectorAll('.kb-volume-indicator').forEach(badge => {
        badge.textContent = vol === 'all' ? 'All textbooks' : volumeSelect.options[volumeSelect.selectedIndex].text;
      });
    }

    volumeSelect.addEventListener('change', applyVolumeFilter);
    applyVolumeFilter();
  }

  /* ── Audience switcher logic ── */
  document.querySelectorAll('.kb-audience-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const audience = tab.dataset.audience;

      // Update active tab
      document.querySelectorAll('.kb-audience-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show/hide sidebar nav groups
      document.querySelectorAll('.kb-sidebar-nav > [data-audience]').forEach(group => {
        const groupAudience = group.dataset.audience;
        if (groupAudience === audience || groupAudience === 'all' || groupAudience.includes(audience)) {
          group.style.display = '';
        } else {
          group.style.display = 'none';
        }
      });

      // Show/hide main content audience sections
      document.querySelectorAll('.kb-content [data-audience]').forEach(section => {
        const sectionAudience = section.dataset.audience;
        if (sectionAudience === audience || sectionAudience === 'all' || sectionAudience.includes(audience)) {
          section.style.display = '';
        } else {
          section.style.display = 'none';
        }
      });

      sessionStorage.setItem('kb-audience', audience);
    });

    // Restore from sessionStorage
    const savedAudience = sessionStorage.getItem('kb-audience');
    if (savedAudience && tab.dataset.audience === savedAudience) {
      tab.click();
    }
  });

  /* ── FAQ accordion toggle ── */
  document.querySelectorAll('.kb-faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.classList.toggle('open');
    });
  });
})();
