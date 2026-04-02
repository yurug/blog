---
id: code-style
domain: conventions
last-updated: 2026-04-01
related: [arch-overview]
---
# Code Style

## One-liner
Conventions for configuration, templates, and scripts.

## Hugo templates
- Use Hugo's template syntax (`{{ }}`) consistently.
- Partials for reusable components (comments, SEO, language switcher).
- No inline styles — use the theme's CSS.

## Shell scripts
- Bash, POSIX-compatible where possible.
- `set -euo pipefail` at the top.
- Descriptive variable names.

## Makefile
- Targets: `serve`, `build`, `translate`, `clean`.
- Use `.PHONY` for non-file targets.

## Markdown
- ATX-style headers (`#`).
- One sentence per line (for clean diffs).
- Front matter in YAML.
- Images: relative paths within the page bundle.

## Agent notes
> This is a content project, not a software project. Keep "code" minimal: config, a few templates, one script, one Makefile.

## Related files
- `kb/conventions/testing-strategy.md` — how to validate
