# iTELL Knowledge Base — Open Decisions

Decisions that need to be made before building the production KB. Each section states the question, the options, and a recommended path.

---

## 1. Audience segmentation: how many "KBs" do we need?

**The question:** Students, instructors, and content authors have fundamentally different needs. Do they share one KB with role-based filtering, or do we split them?

**Options:**

| Approach | Pros | Cons |
|----------|------|------|
| A. Single KB, audience tabs (v2 mockup) | One URL, shared search, simple deployment | Sidebar gets complex; authors see student noise |
| B. Single KB for students + instructors; separate docs site for content authors | Authors get a proper docs experience (Storybook, Docusaurus, or similar); students never see authoring jargon | Two systems to maintain |
| C. Three fully separate sites | Each audience gets a clean, focused experience | Triples maintenance; shared content (login, AI) is duplicated |

**Recommendation:** **Option B.** Content authoring docs are technical reference (Payload schemas, block types, MDX conventions) — they fit better in a developer-docs format than a help-center format. Students and instructors share enough overlap (same platform, same login, same features) to coexist in one KB with a role toggle. Link to the authoring docs from the KB sidebar under a "For Content Authors" section rather than embedding them.

**Decision needed:** Agree/disagree with B. If B, where do authoring docs live? (Storybook, Docusaurus, a `/docs` route in the app, or a Payload-managed collection?)

---

## 2. Textbook-specific content: automatic vs. manual filtering

**The question:** Different textbooks have different feature sets (summaries vs. cloze vs. quizzes). How does the KB know what to show?

**Options:**

| Approach | Pros | Cons |
|----------|------|------|
| A. Automatic — derive from user's account (class → textbook → features) | Zero friction; user sees only relevant content | Requires auth integration; anonymous/logged-out users see nothing or everything |
| B. Manual selector (v2 mockup dropdown) | Works without auth; easy to prototype | Extra step; users may not know their textbook name |
| C. Hybrid — auto-detect if logged in, show selector if not | Best of both worlds | More implementation complexity |

**Recommendation:** **Option C**, but start with B. Ship the manual selector first (it works today with zero backend). Add auto-detection later when the KB is integrated into the app shell and can read the user's session.

**Decision needed:** Confirm starting with manual. Determine where in the app the KB will live (standalone route? embedded in the app shell? separate subdomain?) — this affects whether auto-detection is easy or hard.

---

## 3. Conditional content: article-level vs. block-level

**The question:** When a feature only exists in some textbooks (e.g., cloze tests), do we hide the entire article or show the article with conditional sections inside?

**Options:**

| Approach | Pros | Cons |
|----------|------|------|
| A. Article-level — tag whole articles with `volumes: [demo, chevron]`; hide if no match | Simple; clean nav | Duplicates shared content across articles; "Summaries" article for Mars can't mention quizzes |
| B. Block-level — articles are universal; conditional blocks inside show/hide per textbook | One article covers the topic holistically; less duplication | Articles can feel patchy if many sections are hidden; harder to author |
| C. Both — article-level tags for wholly-irrelevant pages, block-level for mixed content | Best coverage | Two systems to explain to authors |

**Recommendation:** **Option C.** Use article-level tags for pages that are entirely irrelevant (e.g., "Cloze Tests" article hidden for Mars). Use block-level conditional content within shared articles (e.g., "Summaries" article has a "What else happens at end-of-page?" section that differs per textbook). The v2 mockup already demonstrates both.

**Decision needed:** Confirm. Also decide the Payload field design: multi-select relationship to Volumes collection, or a simple enum array?

---

## 4. Search implementation

**The question:** What powers KB search?

**Options:**

| Approach | Effort | Quality | Scales? |
|----------|--------|---------|---------|
| A. Payload search plugin | Low — built-in, just enable it | Basic full-text; no typo tolerance or ranking | OK for <50 articles |
| B. Meilisearch / Algolia | Medium — external service, sync pipeline | Excellent: typo tolerance, facets, instant results | Yes |
| C. Client-side (Fuse.js) | Low — no backend | Decent for small sets; no server round-trip | No — breaks past ~100 articles |

**Recommendation:** **Start with A** (Payload search plugin). It's zero additional infrastructure and good enough for the initial article count (~20–30). Migrate to **B (Meilisearch)** when: (a) article count exceeds ~50, or (b) user feedback indicates search quality is a problem. Skip C — it's a dead end that you'd replace anyway.

**Payload search plugin — implementation notes:**

The plugin creates a dedicated `search` collection with static, pre-indexed copies of your documents. Key things to know:

- **What it indexes:** Title only by default. Use `beforeSync` hook to flatten Lexical rich text into a searchable plain-text field (e.g., `description`, `bodyText`). Without this, search only matches titles.
- **Querying from frontend:** Use the standard Payload REST/GraphQL APIs against the `search` collection. Typical call: `GET /api/search?where[title][like]=your+query&sort=priority`.
- **Prioritization:** Each search record gets a `priority` field. Use it to rank KB articles above FAQs, or pin important articles to the top. Pass `?sort=priority` in queries.
- **Volume/role filtering — the auth gap:** iTELL end users don't have Payload accounts. The app uses a single admin/service account to query Payload. This means Payload's built-in access control on the search collection won't know who the end user is. The filtering must happen in the app layer:
  1. Store access metadata in search records via `beforeSync` (copy `volumes`, `audiences` fields from the original KBArticle into the search record).
  2. Create a thin Next.js API route (`/api/kb-search`) that accepts the query, reads the logged-in user's session (textbook, role), adds the appropriate `where` filters (e.g., `where[volumes][contains]=chevron`), queries Payload's search collection server-side, and returns filtered results.
  3. The browser never hits Payload directly — always goes through the app's API route. This keeps the admin credentials server-side and enforces per-user filtering.
- **Architecture:** `Browser → /api/kb-search → Payload search collection → filtered results back`. Not `Browser → Payload directly`.

**Decision needed:** Confirm A-then-B. If B, self-hosted Meilisearch or Algolia (managed)?

---

## 5. KB location and routing

**The question:** Where does the KB live relative to the main iTELL app?

**Options:**

| Approach | Pros | Cons |
|----------|------|------|
| A. `/help` route inside the Next.js app | Shares layout, auth, session; deep links from app are trivial | KB deploys are coupled to app deploys; may bloat the app |
| B. Separate subdomain (`help.itell.ai`) | Independent deploy cycle; can use a lighter framework | No shared auth without extra work; separate build pipeline |
| C. Payload admin as the KB CMS, rendered via the app's existing content pipeline | Reuses existing content infrastructure | KB articles would need to fit the textbook content model, which may not be ideal |

**Recommendation:** **Option A** (`/help` route). The KB needs access to the user's session (for auto-detecting textbook) and the app already has the layout shell, auth, and Payload client. A few dozen KB pages won't meaningfully bloat the app. Use Payload collections for KB content, but render them through a dedicated `/help` layout, not the textbook content pipeline.

**Decision needed:** Confirm. If A, does the KB get its own layout (sidebar + content) or reuse the app's existing layout?

---

## 6. Payload collection design for KB

**The question:** What collections do we need?

**Recommended schema:**

```
KBArticle
  - title: text
  - slug: text (unique)
  - body: Lexical rich text (with custom blocks)
  - category: relationship → KBCategory
  - audiences: select[] (student, instructor)
  - volumes: relationship[] → Volume (or select[] enum)
  - relatedArticles: relationship[] → KBArticle
  - readTime: number (auto-calc from word count)
  - lastReviewedAt: date
  - status: draft | published

KBCategory
  - name: text
  - slug: text
  - order: number
  - icon: text (icon identifier)

KBMedia
  - image: upload
  - altText: text
  - capturedAt: date
  - volumeVersion: text (e.g., "v2.3")
```

**Decision needed:** Review and adjust fields. Key sub-decisions:
- `volumes` field: relationship to existing Volume collection, or a standalone enum? (Relationship is more flexible but adds coupling.)
- Do we need a separate `KBFAQItem` collection, or are FAQs just KBArticles with a `type: faq` field?
- Lexical block types to define: step-list, callout, screenshot-with-caption, conditional-content, faq-accordion, related-articles.

---

## 7. Contextual help (deep links from the app)

**The question:** Should the app link directly into KB articles from relevant UI locations?

**Example:** A `?` icon next to the summary text box links to `/help/summaries-evaluation#how-to-write`.

**Recommendation:** Yes, but defer until the KB has real content. Implementation is trivial (just anchor links), but the value depends on having good destination articles. Add this in Phase 4 after core content is written.

**Decision needed:** None — just sequence it after content exists.

---

## 8. Screenshot management

**The question:** How do we keep screenshots current as the UI evolves?

**Recommendation:** Use the `KBMedia` collection with a `capturedAt` date. Set a review cadence (quarterly). During each review, filter KBMedia by `capturedAt < 3 months ago` and verify each screenshot still matches the UI. Annotate screenshots with version info so staleness is visible.

**Decision needed:** Who owns the review cadence? Is it automated (a reminder) or part of a release checklist?

---

## 9. Content authoring docs format (if split per Decision 1)

**Options:**

| Format | Pros | Cons |
|--------|------|------|
| Docusaurus | Purpose-built for docs; versioning, search, sidebar built-in | Separate React app; another thing to deploy |
| Storybook | Great for component docs; interactive block previews | Not ideal for prose-heavy guides |
| `/docs` route in the app | Same deploy; same stack | Less feature-rich than Docusaurus |
| Payload-managed (same as KB) | One CMS for everything | Conflates two audiences |

**Recommendation:** If the content author audience is small (< 5 people), start with markdown files in the repo (`/docs` folder) and render nothing — they read the markdown directly. If the audience grows or onboarding becomes a bottleneck, stand up Docusaurus.

**Decision needed:** How many content authors are there now and expected? This determines the investment level.

---

## Summary of recommended starting point

1. **One KB for students + instructors** with role toggle; authoring docs stay as repo markdown for now.
2. **Manual textbook selector** in the sidebar; auto-detection added later.
3. **Article-level + block-level** conditional content (both).
4. **Payload search plugin** now; Meilisearch when we outgrow it.
5. **`/help` route** inside the Next.js app.
6. **Three Payload collections**: KBArticle, KBCategory, KBMedia.
7. **Contextual deep links** deferred to Phase 4.
8. **Screenshot review** on a quarterly cadence with `capturedAt` metadata.
9. **Authoring docs** as repo markdown until audience size justifies more.
