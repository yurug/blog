---
id: kb-index
domain: index
last-updated: 2026-04-01
related: []
---
# Blog Knowledge Base

A personal blog on software engineering in the agent era, built with Hugo and deployed on GitHub Pages. Replaces yann.regis-gianas.org.

## How to use this KB

Start with `indexes/by-task.md` — it tells you exactly which files to read for your current task. Don't browse; route.

## Quick-load bundles

| Goal | Files (in order) |
|------|-----------------|
| **Implement the blog** | `domain/prd.md` → `architecture/overview.md` → `spec/config-and-formats.md` → `spec/data-model.md` → `external/hugo.md` → `properties/functional.md` |
| **Implement translations** | `spec/algorithms.md` → `external/claude-cli.md` → `spec/data-model.md` → `properties/edge-cases.md` |
| **Implement comments** | `architecture/decisions/adr-002-giscus.md` → `external/giscus.md` → `spec/config-and-formats.md` |
| **Run an audit** | `runbooks/audit-checklist.md` → `properties/functional.md` → `properties/non-functional.md` → `properties/edge-cases.md` |
| **Debug a problem** | `spec/error-taxonomy.md` → `conventions/error-handling.md` → `external/hugo.md` |

## File inventory (22 files)

```
kb/
├── INDEX.md                              # This file
├── GLOSSARY.md                           # Canonical terms
├── questions-round1.md                   # Ambiguity resolution round 1
├── questions-round2.md                   # Ambiguity resolution round 2
├── indexes/
│   └── by-task.md                        # Task → file routing
├── domain/
│   └── prd.md                            # Product requirements
├── spec/
│   ├── INDEX.md                          # Spec routing
│   ├── data-model.md                     # Article schema
│   ├── algorithms.md                     # Translation & deploy workflows
│   ├── config-and-formats.md             # Hugo config
│   └── error-taxonomy.md                 # Error catalog
├── properties/
│   ├── INDEX.md                          # Properties routing
│   ├── functional.md                     # P1-P5 invariants
│   ├── non-functional.md                 # NF1-NF5 quality targets
│   └── edge-cases.md                     # T1-T8 boundary conditions
├── architecture/
│   ├── overview.md                       # Component diagram + layout
│   └── decisions/
│       ├── adr-001-hugo.md               # Why Hugo
│       └── adr-002-giscus.md             # Why giscus
├── external/
│   ├── hugo.md                           # Hugo runtime behavior
│   ├── claude-cli.md                     # Claude headless for translation
│   └── giscus.md                         # Comment widget integration
├── conventions/
│   ├── code-style.md                     # Style rules
│   ├── error-handling.md                 # Error surfacing
│   └── testing-strategy.md              # Validation approach
├── runbooks/
│   └── audit-checklist.md               # Quality audit procedure
└── reports/                              # (populated during audits)
```

## Agent notes
> Always start from `indexes/by-task.md`. Never browse the KB linearly. Load only what your current task needs.
