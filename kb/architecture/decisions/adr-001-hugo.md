---
id: adr-001
domain: architecture
last-updated: 2026-04-01
related: [arch-overview, hugo-external]
---
# ADR-001: Use Hugo as static site generator

## Context
Need a static site generator that supports multilingual content, markdown authoring with page bundles, and deploys to GitHub Pages. Author uses Debian Linux.

## Decision
Use Hugo.

## Rationale
- Single binary, no runtime dependencies (no Node, Ruby, Python).
- Native multilingual support with per-language content trees.
- Page bundles: articles as folders with colocated assets.
- Sub-second builds even at scale.
- Large theme ecosystem (PaperMod has everything we need).
- First-class GitHub Pages deployment via Actions.

## Alternatives rejected
- **Zola** (Rust): good but smaller theme ecosystem, less multilingual maturity.
- **Astro/Next.js**: requires Node runtime, overkill for a static blog.
- **Jekyll**: Ruby dependency, slower builds, GitHub Pages default but less flexible.

## Consequences
- Hugo must be installed locally (`apt install hugo` or download binary).
- Theme managed as git submodule.
- Configuration in TOML (Hugo's default).

## What this means for implementers
Use Hugo conventions: `content/` for pages, `static/` for assets, `layouts/` for overrides. Don't fight the framework.
