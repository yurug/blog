---
id: giscus-external
domain: external
last-updated: 2026-04-02
related: [adr-002, arch-overview]
---
# giscus — External Dependency

## One-liner
GitHub Discussions-backed comment widget.

## Integration
A `<script>` tag in `layouts/partials/comments.html`, conditionally rendered:

```html
{{- if (not .Params.disableComments) }}
<script src="https://giscus.app/client.js"
  data-repo="yurug/blog"
  data-repo-id="R_kgDOR3nZIQ"
  data-category="General"
  data-category-id="DIC_kwDOR3nZIc4C53XN"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="top"
  data-theme="preferred_color_scheme"
  data-lang="{{ .Lang }}"
  data-loading="lazy"
  crossorigin="anonymous"
  async>
</script>
{{- end }}
```

## Setup steps (already done)
1. GitHub Discussions enabled on `yurug/blog`.
2. Using the "General" discussion category (default, can be renamed).
3. giscus GitHub App must be installed on the repo by the owner.
4. Repo ID: `R_kgDOR3nZIQ`, Category ID: `DIC_kwDOR3nZIc4C53XN`.
5. Script lives in `layouts/partials/comments.html`.

## Per-article opt-out
Set `disableComments: true` in an article's front matter to hide comments on that page.

## Behavior
- Maps discussions to pages via `pathname` (article URL path).
- Lazy-loaded: no performance impact until user scrolls to comments.
- Theme follows the page's color scheme.
- Language set per page via `{{ .Lang }}`.

## Gotchas
- Repo must be public for giscus to work.
- giscus GitHub App must be installed — comments won't render without it.
- If the repo is renamed, giscus mappings break.

## Agent notes
> The giscus GitHub App installation is a manual step by the repo owner. The `data-lang` uses Hugo's `.Lang` which has a known bug in Hugo 0.159 (returns current page's lang), but for giscus this is acceptable since the comment widget language is not critical.

## Related files
- `kb/architecture/decisions/adr-002-giscus.md` — why giscus
