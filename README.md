# ehnruiz.github.io

Essays by Emmanuel Ruiz, published with GitHub Pages.

Writing a post: add a Markdown file to `_posts/` named `YYYY-MM-DD-slug.md` with this front matter and push.
GitHub Pages builds the site; nothing else to run.

```yaml
---
title: One Month at the Frontier
subtitle: What thirty days of building X-Ray taught me
kind: essay        # essay (long, with a contents sidebar) or short
---
```

Each essay has its own link-preview card. Make one with the title, then name it in the front matter as
`image: /assets/cards/<slug>.png`. LinkedIn caches a card by its URL for about a week, so a redesigned card
needs a new file name to show up (needs Playwright; see the note in `scripts/make-card.mjs`):

```bash
node scripts/make-card.mjs assets/cards/<slug>.png "Essay title"
```

Crawler-facing files: `robots.txt` (explicit allow, AI crawlers named), `llms.txt` and `llms-full.txt`
(built by Jekyll from the posts; the full text includes each post's Markdown through `include_relative`),
`sitemap.xml` and `feed.xml` from the Jekyll plugins, and JSON-LD on every page from `_includes/jsonld.html`.
The `scripts/` and `audits/` folders are excluded from the build. Traffic and Core Web Vitals come from
Cloudflare Web Analytics (cookieless beacon in the layout; dashboard under the Cloudflare account). The 32-character `.txt` file at the root is the
IndexNow key; `.github/workflows/indexnow.yml` submits every sitemap URL to the IndexNow engines after each Pages deploy.

Preview locally (optional):

```bash
bundle install
bundle exec jekyll serve
```
