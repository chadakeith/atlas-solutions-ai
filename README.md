# Atlas AI Site

The Atlas AI website ([ai.atlastechnology.solutions](https://ai.atlastechnology.solutions/)), hosted on **GitHub Pages** with push-to-publish deploys. Target audience: **small businesses** (typically 10–150 employees) seeking AI consulting, training, and integrations.

## How hosting works (push to publish)

GitHub Pages deploys automatically on every push to the published branch.

1. Edit files in this repo.
2. Commit and push.
3. GitHub's **pages build and deployment** action runs (~30–60 s). Check the repo **Actions** tab.

`index.html` at the repo root is the homepage. Other `.html` files are served at their paths. The blog uses Jekyll (built into GitHub Pages).

## Repo layout

| Path | Purpose |
|------|---------|
| `index.html` | Homepage — story, offerings, services, testimonials, funnel CTAs |
| `ai-*.html`, `agentic-workflows.html` | Service deep-dive pages |
| `about.html`, `faq.html`, `contact.html`, `privacy.html` | Company and funnel pages |
| `blog/`, `_posts/`, `_layouts/` | Jekyll blog |
| `assets/style.css`, `assets/site.js` | Shared design and behavior |
| `assets/site-config.js` | **Analytics IDs** — edit here |
| `sitemap.xml`, `robots.txt`, `llms.txt` | SEO / discovery |
| `CNAME` | Custom domain for GitHub Pages |

Brand colors in CSS: blue `#0a84ff`, violet `#bf5af2`, on black/white Apple-style surfaces.

## Analytics and funnel tracking

Edit `assets/site-config.js`:

```javascript
window.ATLAS_SITE = {
  gaMeasurementId: 'G-XXXXXXXXXX',   // Google Analytics 4
  clarityProjectId: 'xxxxxxxxxx',    // Microsoft Clarity (optional, free)
};
```

**Google Analytics 4** — create a property at [analytics.google.com](https://analytics.google.com), add a Web data stream for `ai.atlastechnology.solutions`, paste the Measurement ID.

**Microsoft Clarity** — optional free session replay and heatmaps at [clarity.microsoft.com](https://clarity.microsoft.com).

Tracked funnel events (via `data-track` attributes and form handlers):

| Event | When |
|-------|------|
| `nav_cta`, `hero_cta`, `footer_cta` | CTA clicks |
| `offering_readiness`, `offering_training`, etc. | Offering card clicks |
| `form_submit_start` / `form_submit_success` | Contact and blog subscribe forms |

Funnel path: **Home → Offerings / Services → Contact (readiness call)**.

## Testimonials

Homepage testimonials in `index.html` (`#testimonials`) are **representative placeholders**. Replace with approved client quotes (name, role, company only with permission). Ask clients via the contact form or reference calls.

## Writing a blog post

1. Create `_posts/YYYY-MM-DD-short-slug.md`
2. Front matter:

   ```yaml
   ---
   layout: post
   title: "Your post title"
   description: "One-sentence summary for index and search."
   author: "Atlas AI"
   image: "/assets/img/your-header.jpg"
   image_alt: "Descriptive alt text"
   reading_time: "5 min read"
   ---
   ```

3. Commit and push — post appears at `/blog/YYYY/short-slug/` and on the blog index.
4. Add the URL to `sitemap.xml`.

Posts dated in the future won't publish until that date.

## Blog automation (Grok / scheduled agents)

To publish several times a week without manual copy-paste:

1. **Source material** — your existing content (podcast notes, client FAQs, service pages), not trending X posts. Point agents at `llms.txt`, service pages, and prior `_posts/` for tone and facts.
2. **RSS** — `https://ai.atlastechnology.solutions/feed.xml` for syndication; agents can also read `_posts/` in the repo directly.
3. **Workflow** — agent drafts Markdown in `_posts/` with correct front matter, human reviews, then commit/push.
4. **Images** — reuse `assets/img/` style or add new headers; always set `image` and `image_alt` in front matter.
5. **Subscribe funnel** — blog footer includes an email subscribe form (FormSubmit → `consulting@atlascarolina.com`).

Avoid publishing thin or duplicate posts; 2–3 substantive posts per week beats daily fluff for SEO.

## Google Sites (optional wrapper)

If you still want a Google Sites shell, use **Insert → Embed → By URL** with the live site URL so pushes here update automatically. The old `embeds/` workflow is deprecated — this repo is the full site.

## Contact forms

- **Contact** — FormSubmit to `consulting@atlascarolina.com`. First submission requires FormSubmit email verification.
- **Blog subscribe** — same inbox, subject "Atlas AI blog subscriber".
- Query param `?interest=readiness-call` pre-fills the contact form for funnel tracking.

## Privacy

`privacy.html` describes form data and analytics. Link appears in footers and the contact form.
