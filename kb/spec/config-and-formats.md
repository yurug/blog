---
id: config-and-formats
domain: spec
last-updated: 2026-04-02
related: [data-model, algorithms, hugo-external]
---
# Configuration & Formats

## One-liner
Hugo configuration schema and key settings.

## Scope
The `hugo.toml` config file structure and important settings.

## Hugo config (`hugo.toml`)

The authoritative config is in `hugo.toml` at the repo root. Key aspects:

### Site basics
- `baseURL`: `https://yann.regis-gianas.org/`
- `theme`: PaperMod (git submodule)
- `defaultContentLanguage`: `en` (not in subdirectory)
- `paginate`: 10
- `enableRobotsTXT`: true

### Languages (7)
EN (primary), FR, ES, ZH, DE, JA, PT. Each has a `languageName` and translated `subtitle`.

### PaperMod params
- `comments = true` — enables giscus via `layouts/partials/comments.html`
- `displayFullLangName = true` — shows full language names in translation list
- `defaultTheme = "auto"` — dark/light follows system
- `ShowReadingTime`, `ShowShareButtons`, `ShowPostNavLinks`, `ShowBreadCrumbs`, `ShowCodeCopyButtons` — all true
- `homeInfoParams` — title + bio content with markdown link
- `socialIcons` — GitHub, X, RSS

### Navigation menu
6 items: Posts, Talks, Elsewhere, About, Tags, Search (weighted in that order).

### Outputs
`home = ["HTML", "RSS", "JSON"]` — enables RSS feed and PaperMod search.

### Taxonomies
`tag` and `series`.

### Markup
Monokai syntax highlighting. Goldmark with `unsafe = true` (needed for embedded widgets).

## GitHub Actions deploy workflow (`.github/workflows/deploy.yml`)

Key steps:
1. Checkout repo with submodules (for theme).
2. Install Hugo extended v0.159.2.
3. `hugo --gc --minify` (uses baseURL from `hugo.toml`, not from Pages output).
4. Upload artifact and deploy to GitHub Pages.

Note: the workflow does NOT override `--baseURL` — this was causing broken links when it used the `configure-pages` output.

## Custom domain

- File: `static/CNAME` containing `yann.regis-gianas.org`
- DNS at OVH: CNAME record `yann` → `yurug.github.io`
- HTTPS enforced, cert auto-renewed by GitHub.

## Layout overrides

- `layouts/partials/comments.html` — giscus widget (conditionally rendered)
- `layouts/partials/translation_list.html` — workaround for Hugo 0.159 bug where `.Lang` on `.Translations` items returns the current page's language. Extracts language code from `RelPermalink` and maps to display names via a `dict`.

## Agent notes
> Always read the actual `hugo.toml` for the full config — this KB file describes the structure and rationale, not the exact values. The translation_list.html override is a workaround that should be removed when Hugo fixes the `.Lang` bug.

## Related files
- `kb/spec/data-model.md` — front matter fields this config enables
- `kb/external/hugo.md` — Hugo runtime behavior
