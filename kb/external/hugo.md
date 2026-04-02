---
id: hugo-external
domain: external
last-updated: 2026-04-01
related: [arch-overview, config-and-formats, data-model]
---
# Hugo — External Dependency

## One-liner
Static site generator runtime behavior relevant to this project.

## Version
Hugo extended (latest via GitHub Actions; locally via apt or binary).

## Multilingual behavior
- Each language has its own content tree: `content/<lang>/`.
- `defaultContentLanguage = "en"` means English pages are served at `/` (no `/en/` prefix).
- Other languages are at `/<lang>/` (e.g., `/fr/`, `/es/`).
- Translations linked via `translationKey` front matter field.
- Hugo auto-generates language switcher data accessible in templates via `.Translations`.

## Page bundles
- A folder under `content/` with an `index.md` is a "leaf bundle."
- All files in the folder are resources of that page (images, PDFs, etc.).
- Relative paths in markdown (`![](image.png)`) resolve within the bundle.

## Build behavior
- `hugo` builds all non-draft content.
- `hugo server` serves locally with live reload, includes drafts by default.
- `hugo --minify` minifies HTML/CSS/JS for production.
- `--buildDrafts` explicitly includes draft content (dev only).

## Taxonomy
- Tags: `[taxonomies] tag = "tags"` — generates `/tags/<tag>/` pages.
- Series: `[taxonomies] series = "series"` — generates `/series/<name>/` pages.

## Theme integration
- Theme installed as git submodule in `themes/<name>/`.
- Override any theme template by placing a file at the same path in `layouts/`.
- PaperMod supports: dark/light mode, search, share buttons, reading time, breadcrumbs.

## RSS
- Hugo auto-generates RSS at `/index.xml` and per-section.
- PaperMod includes RSS link in the footer.

## Gotchas
- `hugo.toml` vs `config.toml`: both work, `hugo.toml` is the modern convention.
- Extended version needed for SCSS processing (PaperMod may need it).
- Submodule must be initialized: `git submodule update --init --recursive`.

## Agent notes
> Always use `hugo extended`. Always init submodules before building. The `defaultContentLanguageInSubdir = false` setting means EN content lives at root, not `/en/`.

## Related files
- `kb/spec/config-and-formats.md` — actual Hugo config
- `kb/spec/data-model.md` — front matter fields Hugo processes
