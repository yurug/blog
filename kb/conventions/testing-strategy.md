---
id: testing-strategy
domain: conventions
last-updated: 2026-04-01
related: [functional-props, non-functional-props, edge-cases]
---
# Testing Strategy

## One-liner
How to validate the blog works correctly.

## Test levels

### Build validation
- `hugo --minify` succeeds with zero errors/warnings.
- Run on every push via GitHub Actions.

### Front matter lint
- Script that checks every article has required fields (P5).
- Checks `translationKey` consistency across languages (P1).
- Run as a `make lint` target.

### Visual verification
- `hugo server` for local preview.
- Check each language variant renders correctly.
- Verify CJK fonts load (T8).

### SEO validation
- Run Lighthouse on deployed site (NF1, NF2, NF3).
- Verify Open Graph tags with a validator.

### Link checking
- Use a link checker (e.g., `htmltest` or `muffet`) on the built site.
- Catches broken internal links and missing assets (P3).

## When to test
- **Before push**: `make lint && make build` locally.
- **CI**: build + deploy (catches build errors).
- **After deploy**: manual Lighthouse check (initially; automate later).

## Agent notes
> No unit tests needed — this is a content site. Validation = build succeeds + lint passes + visual check.

## Related files
- `kb/properties/functional.md` — invariants to validate
- `kb/runbooks/audit-checklist.md` — full audit procedure
