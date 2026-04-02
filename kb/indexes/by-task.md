---
id: by-task
domain: index
last-updated: 2026-04-01
related: [kb-index]
---
# Task Routing Table

## implement

Read in this order when implementing any part of the blog:

1. `kb/domain/prd.md` — what we're building and why
2. `kb/architecture/overview.md` — how pieces fit together
3. `kb/spec/config-and-formats.md` — Hugo config details
4. `kb/spec/data-model.md` — article schema
5. `kb/external/hugo.md` — Hugo runtime behavior
6. `kb/properties/functional.md` — invariants to maintain
7. `kb/conventions/code-style.md` — style rules

**Key questions answered**: What to build, how it's structured, what config to use, what invariants to maintain.

## implement-translation

Read when implementing the translation workflow:

1. `kb/spec/algorithms.md` — translation workflow steps
2. `kb/external/claude-cli.md` — Claude headless behavior
3. `kb/spec/data-model.md` — front matter the translator must produce
4. `kb/properties/edge-cases.md` — T5 (stale translations), T8 (CJK)

## implement-comments

Read when integrating giscus:

1. `kb/architecture/decisions/adr-002-giscus.md` — why giscus
2. `kb/external/giscus.md` — integration details
3. `kb/spec/config-and-formats.md` — where the partial goes

## audit

Read when running a quality audit:

1. `kb/runbooks/audit-checklist.md` — the checklist
2. `kb/properties/functional.md` — property definitions
3. `kb/properties/non-functional.md` — quality targets
4. `kb/properties/edge-cases.md` — boundary conditions
5. `kb/conventions/testing-strategy.md` — how to validate

## debug

Read when something is broken:

1. `kb/spec/error-taxonomy.md` — what can go wrong
2. `kb/conventions/error-handling.md` — how errors surface
3. `kb/external/hugo.md` — Hugo gotchas
4. `kb/spec/config-and-formats.md` — config to check
