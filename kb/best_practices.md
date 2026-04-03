  ---
  Best Practices Used in This Mockup

  1. Atomic articles over monolithic docs — The single user guide was broken into 9 standalone articles, each covering one topic. A user searching "how do I write a summary" lands directly on the relevant page instead of scrolling through a
  giant doc.

  2. Multiple discovery paths — Users can find content via:
  - Search bar (hero placement on home page)
  - Category cards (visual browsing)
  - Sidebar nav (persistent, always visible)
  - Quick link pills (common tasks)
  - Popular articles list (data-driven shortcuts)
  - Related articles (cross-links at bottom of every article)

  3. In-article table of contents — Every article has anchor-linked TOC so users can jump to the specific section they need.

  4. Consistent content patterns — Procedural content uses numbered step lists (.kb-steps), conceptual content uses prose, warnings use callout boxes. This consistency helps users scan.

  5. Callout box hierarchy — Info (blue), warning (yellow), success (green), tip (purple) — each with a distinct visual treatment so users can quickly identify the type of information.

  6. "Was this helpful?" feedback widget — On every article. Critical for identifying gaps and stale content.

  7. Breadcrumb navigation — Shows where you are in the hierarchy and lets you navigate up.

  8. Article metadata — Read time, last updated date, and badges (New/Updated/Popular) build trust and signal freshness.

  9. Shared design system — Same pattern as the dashboard mockups: shared CSS + shared layout JS, standalone HTML files per page. Easy to version and iterate.

  ---
  What's Missing / Needs to Be Added

  Here's where I agree with the Opus analysis you shared, plus additional observations:

  Content Gaps

  1. No audience segmentation — This KB only serves students/learners. It needs separate sections for:
    - Instructors/Admins — Class setup, student roster management, progress monitoring, configuring which pages require summaries vs. cloze
    - Researchers — Accessing usage data, configuring studies, data export
    - Content authors — How to structure content for iTELL (especially relevant with Payload migration)
  2. No troubleshooting section — The FAQ scratches the surface, but a proper troubleshooting guide needs:
    - "Page won't unblur" flowchart
    - "Summary keeps failing" diagnostic steps
    - Browser-specific known issues
    - Network/connectivity issues
  3. No glossary — Terms like "chunk," "Constructed Response Item," "cloze test," "streak," "module" are iTELL-specific. A dedicated glossary page (or tooltips) would help new users enormously.
  4. No changelog / version history — Users need to know when features change, especially if screenshots become stale.
  5. Account management is thin — Missing: password resets, switching accounts, leaving/joining a class mid-semester, what happens to data if you switch accounts.
  6. No search implementation — The search bar is cosmetic. For production, this needs actual search indexing (Payload + Algolia/Meilisearch, or even simple client-side search like Fuse.js).

  Structural / Architecture Gaps

  7. No real screenshots — The user guide markdown references many screenshots (itell_layout.png, summ.png, etc.). These should be embedded in the KB articles with proper alt text, captions, and version annotations.
  8. No mobile/responsive design — The current CSS assumes desktop. A KB needs to work on phones/tablets since students often access help from mobile.
  9. No print/export — Some users may want to print an article or save it as PDF for offline reference.
  10. No article versioning per textbook — Different textbooks (demo, chevron, mars) may have slightly different feature sets. The KB should accommodate conditional content or audience tags.

  Payload CMS Considerations

  11. Collection design — As the Opus output mentioned, for Payload you'd want:
    - Articles collection (title, slug, body as Lexical rich text, category ref, audience tag, related articles, search weight)
    - Categories collection (hierarchical taxonomy)
    - FAQ Items collection (lightweight Q&A pairs, tagged by category)
    - Media collection (screenshots with alt text, version metadata, review cadence dates)
  12. Reusable Payload blocks — Define block types early: step-list, callout/tip, screenshot-with-caption, FAQ accordion, related-articles. This keeps authors consistent and makes the content structured rather than freeform.
  13. "Last reviewed" metadata — Separate from "last updated." An article can be reviewed and confirmed still-current without being modified. This is important for screenshot-heavy content.

  UX Improvements for Future Versions

  14. Search suggestions / autocomplete — As users type, show matching articles.
  15. Reading time estimates — Already in the mockup, but should be auto-calculated from word count.
  16. Article rating data — The "Was this helpful?" buttons need a backend to collect and surface which articles need attention.
  17. Contextual help — Deep links from within the iTELL app itself (e.g., a "?" icon next to the summary box that links directly to the summaries KB article).
  18. Multi-language support — If iTELL serves non-English-speaking institutions eventually.

  ---
  Suggested Order of Work

  Prioritized by impact vs. effort, and sequenced so each phase builds on the previous one.

  Phase 1 — Foundation (Do First)
  These unblock everything else. Without them, you're building on sand.

  1. Payload collection schemas (#11)
     Define the KB Article, Category, FAQ Item, and Media collections in Payload.
     Everything downstream (search, authoring, versioning) depends on having
     the right data model. Do this before writing any real content.

  2. Reusable Payload blocks (#12)
     Define block types (step-list, callout, screenshot-with-caption, FAQ accordion)
     at the same time as the collections. If you write 30 articles first and then
     add blocks, you'll rewrite all of them.

  3. Real screenshots with version metadata (#7)
     Capture current UI screenshots and store them in the Media collection with
     alt text and a "captured on" date. Articles without visuals are half-finished.
     Do this while the UI is stable — screenshots go stale fast.

  Phase 2 — Core Content (High Impact, Moderate Effort)
  Fill the biggest content gaps that real users hit.

  4. Troubleshooting section (#2)
     This is the #1 reason users visit a KB. Write the "page won't unblur,"
     "summary keeps failing," and "stuck / can't progress" guides. These
     directly reduce support email volume.

  5. Glossary (#3)
     Quick win. A single page defining chunk, CRI, cloze, streak, module, etc.
     Link to it from every article that uses these terms. Low effort, high
     value for first-time users.

  6. Account management (#5)
     Flesh out: joining a class, switching accounts, what happens to data,
     signing out. Users hit these issues in the first week.

  Phase 3 — Audience Expansion (Medium Impact, Higher Effort)
  Extend the KB beyond students.

  7. Instructor/Admin section (#1a)
     Class setup, roster management, progress monitoring, configuring activity
     types per page. This is a separate audience with separate needs — don't
     shoehorn it into the student articles. Create a new top-level category.

  8. Content author guide (#1c)
     How to structure content for iTELL in Payload. Especially important now
     during the Strapi → Payload migration. Document the chunk model,
     activity types, and how content blocks map to the rendering pipeline.

  9. Article versioning / audience tags (#10)
     Add conditional content or audience tags so the same KB can serve different
     textbook deployments (demo, chevron, mars) without duplicating articles.
     This becomes important once you have instructor content that varies by volume.

  Phase 4 — Search & Discovery (Medium Impact, Medium Effort)
  Now that content exists, make it findable.

  10. Search implementation (#6, #14)
      Start with Payload's search plugin to get basic search working. Add
      autocomplete/suggestions later. This is blocked until you have enough
      real content in Payload to make search useful (aim for 15+ articles).

  11. Contextual help deep links (#17)
      Add "?" icons in the iTELL app that link directly to relevant KB articles
      (e.g., next to the summary textbox → summaries article). High-value
      because it surfaces help exactly when users need it, but requires
      coordination with the main app codebase.

  Phase 5 — Polish & Scale (Lower Priority)
  Nice-to-haves that improve the experience once the core is solid.

  12. Mobile / responsive CSS (#8)
      Audit and fix the KB layout for phone/tablet. Important but not blocking
      since most learners use laptops during study sessions.

  13. "Was this helpful?" backend (#16)
      Wire up the feedback buttons to actually store responses. Use the data
      to identify which articles need rewriting.

  14. Changelog / version history (#4)
      Start a changelog page. Low effort to maintain if you add an entry each
      time you ship a user-facing change. Becomes more valuable over time.

  15. "Last reviewed" metadata (#13)
      Add a review-date field to the Article collection. Set up a quarterly
      review cadence for screenshot-heavy articles.

  16. Researcher section (#1b)
      Data export docs, study configuration, IRB-related data use info.
      Lower priority because the audience is smaller and typically has
      direct access to the team.

  17. Print/export (#9) and multi-language (#18)
      Defer until there's demonstrated demand.