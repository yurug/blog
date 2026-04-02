---
id: edge-cases
domain: properties
last-updated: 2026-04-01
related: [functional-props, algorithms, data-model]
---
# Edge Cases

## One-liner
Boundary conditions and their expected behavior.

## Cases

### T1: Article with no translations
An article exists only in English. Language switcher should show it in EN only, not show broken links for other languages.

### T2: Empty tags list
An article with `tags: []`. Should build without error but not appear in any tag listing.

### T3: Unicode in slugs
Article folder named with accented characters (e.g., `évaluation`). Hugo handles this but test it.

### T4: Very long article
Article with 10,000+ words. Should render correctly, reading time should be accurate.

### T5: Article updated after translation
English article modified but translations are stale. `make translate` should detect this via `lastmod` comparison and offer re-translation.

### T6: Concurrent series
Two different series with overlapping tags. Series navigation should only show articles in the same series.

### T7: No articles yet
Fresh site with zero posts. Homepage should render gracefully with an empty state message.

### T8: CJK content
Chinese and Japanese translations must render correctly: proper fonts, line breaking, no mojibake.

## Agent notes
> T1, T5, and T8 are the most likely to cause real issues. Test these early.

## Related files
- `kb/properties/functional.md` — invariants these cases test
- `kb/spec/data-model.md` — schema constraints
