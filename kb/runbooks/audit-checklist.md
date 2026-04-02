---
id: audit-checklist
domain: runbooks
last-updated: 2026-04-01
related: [functional-props, non-functional-props, testing-strategy]
---
# Audit Checklist

## One-liner
Multi-axis quality checklist for blog audits.

## Content quality
- [ ] Every article has complete front matter (P5)
- [ ] Translation keys are consistent (P1)
- [ ] No broken image references (P3)
- [ ] Series ordering is correct (P4)
- [ ] No draft articles in production (P2)

## SEO
- [ ] Open Graph tags present on every page
- [ ] Twitter Card tags present
- [ ] Sitemap generated and valid
- [ ] RSS feed works
- [ ] JSON-LD structured data present

## Accessibility
- [ ] All images have alt text
- [ ] Color contrast sufficient (dark + light mode)
- [ ] Keyboard navigation works
- [ ] Lighthouse accessibility ≥ 90

## Performance
- [ ] Lighthouse performance ≥ 90
- [ ] No unoptimized images (use WebP where possible)
- [ ] giscus lazy-loaded

## Multilingual
- [ ] Language switcher works on every page
- [ ] CJK content renders correctly (T8)
- [ ] RTL not needed (no Arabic/Hebrew in target languages)

## Infrastructure
- [ ] GitHub Actions deploys successfully
- [ ] Custom domain resolves with HTTPS
- [ ] GitHub Discussions enabled, giscus working

## Agent notes
> Run this checklist after each major change. Focus on content quality and multilingual sections first — those are where bugs hide.

## Related files
- `kb/properties/functional.md` — property references (P1-P5)
- `kb/properties/non-functional.md` — NF references
- `kb/properties/edge-cases.md` — T references
