---
id: giscus-external
domain: external
last-updated: 2026-04-01
related: [adr-002, arch-overview]
---
# giscus — External Dependency

## One-liner
GitHub Discussions-backed comment widget.

## Integration
A `<script>` tag in the article template loads the giscus widget:

```html
<script src="https://giscus.app/client.js"
  data-repo="yurug/blog"
  data-repo-id="<REPO_ID>"
  data-category="Article Comments"
  data-category-id="<CATEGORY_ID>"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="top"
  data-theme="preferred_color_scheme"
  data-lang="en"
  data-loading="lazy"
  crossorigin="anonymous"
  async>
</script>
```

## Setup steps
1. Enable GitHub Discussions on the `yurug/blog` repo.
2. Create a "Article Comments" discussion category.
3. Install the giscus GitHub App on the repo.
4. Get repo ID and category ID from https://giscus.app.
5. Add the script to `layouts/partials/comments.html`.

## Behavior
- Maps discussions to pages via `pathname` (article URL path).
- Lazy-loaded: no performance impact until user scrolls to comments.
- Theme follows the page's color scheme.
- Supports multilingual via `data-lang` attribute.

## Gotchas
- Repo must be public for giscus to work.
- `data-repo-id` and `data-category-id` are obtained from the giscus configurator, not the GitHub API directly.
- If the repo is renamed, giscus mappings break.

## Agent notes
> Configure giscus AFTER the repo is created and Discussions are enabled. The IDs come from giscus.app, not from guessing.

## Related files
- `kb/architecture/decisions/adr-002-giscus.md` — why giscus
