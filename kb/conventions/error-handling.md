---
id: error-handling
domain: conventions
last-updated: 2026-04-01
related: [error-taxonomy]
---
# Error Handling

## One-liner
How errors are surfaced and resolved.

## Build errors
Hugo prints errors to stderr with file and line number. Fix locally, re-run.

## CI failures
GitHub Actions shows full Hugo output in the log. Fix and push again.

## Translation errors
The `translate.sh` script should exit non-zero on failure and print which article/language failed. Author fixes and re-runs.

## Agent notes
> All errors are author-facing (no end-user error handling needed — it's a static site). Keep error messages clear and actionable.

## Related files
- `kb/spec/error-taxonomy.md` — complete error catalog
