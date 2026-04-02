---
id: non-functional-props
domain: properties
last-updated: 2026-04-01
related: [prd, config-and-formats]
---
# Non-Functional Properties

## One-liner
Measurable quality criteria.

## Properties

### NF1: Page load time
Homepage loads in < 2s on 3G connection.
- **Measure**: Lighthouse performance score ≥ 90.
- **Why**: Static site with minimal JS should be fast by default.

### NF2: SEO completeness
Every page has: Open Graph tags, Twitter Card tags, canonical URL, sitemap entry.
- **Measure**: Validate with opengraph.xyz or similar tool.
- **Why**: Articles must render rich previews when shared on X/LinkedIn.

### NF3: Accessibility
Semantic HTML, alt text on all images, keyboard-navigable, sufficient color contrast.
- **Measure**: Lighthouse accessibility score ≥ 90.
- **Why**: Inclusive design, also helps SEO.

### NF4: Zero cost
Hosting on GitHub Pages free tier. No paid services required for core functionality.
- **Measure**: Monthly bill = $0.
- **Why**: Personal blog should not have ongoing costs.

### NF5: Build time
Full site build in < 30s even with 100+ articles × 7 languages.
- **Measure**: `time hugo --minify` in CI.
- **Why**: Hugo is designed for this; if builds slow down, something is wrong.

## Agent notes
> NF1-NF3 are automatically validated by running Lighthouse. Add a CI step for this once there's content.

## Related files
- `kb/domain/prd.md` — non-functional expectations
- `kb/spec/config-and-formats.md` — config enabling SEO
