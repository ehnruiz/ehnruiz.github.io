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
`image: /assets/cards/<slug>.png` (needs Playwright; see the note in `scripts/make-card.mjs`):

```bash
node scripts/make-card.mjs assets/cards/<slug>.png "Essay title"
```

Preview locally (optional):

```bash
bundle install
bundle exec jekyll serve
```
