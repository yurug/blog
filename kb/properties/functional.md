---
id: functional-props
domain: properties
last-updated: 2026-04-01
related: [data-model, algorithms, prd]
---
# Functional Properties

## One-liner
Invariants the blog must maintain.

## Properties

### P1: Translation consistency
Every translation of an article has the same `translationKey` as the English original.
- **Violation**: Language switcher links to wrong article or 404s.
- **Why**: Hugo uses `translationKey` to bind language variants.
- **Test strategy**: Build-time check that all articles with the same `translationKey` exist in expected languages.

### P2: Draft isolation
Articles with `draft: true` never appear in production builds.
- **Violation**: Unfinished article visible to readers.
- **Why**: Hugo's `--buildDrafts` is only used in dev server, not in CI.
- **Test strategy**: Build with production flags, verify draft articles absent from output.

### P3: Asset colocation
Every image/asset referenced in an article exists in the same page bundle folder.
- **Violation**: Broken image on the live site.
- **Why**: Hugo page bundles resolve relative paths within the bundle.
- **Test strategy**: Script that parses markdown image refs and checks file existence.

### P4: Series ordering
Articles in a series are ordered by `series_order` and all have consecutive values.
- **Violation**: Series navigation shows articles in wrong order or has gaps.
- **Why**: PaperMod series template relies on correct ordering.
- **Test strategy**: Script that groups by `series` and validates `series_order` continuity.

### P5: Required front matter
Every published article has: title, date, summary, tags (≥1), translationKey.
- **Violation**: Missing metadata → broken listings, missing Open Graph, broken translations.
- **Why**: These fields drive the homepage listing, SEO, and multilingual linking.
- **Test strategy**: Build-time lint script checking front matter completeness.

## Agent notes
> P1 and P5 are the most critical — they affect every page. Validate these first in any audit.

## Related files
- `kb/spec/data-model.md` — schema these properties validate
- `kb/properties/edge-cases.md` — boundary conditions
