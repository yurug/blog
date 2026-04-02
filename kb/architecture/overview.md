---
id: arch-overview
domain: architecture
last-updated: 2026-04-01
related: [prd, config-and-formats, hugo-external]
---
# Architecture Overview

## One-liner
Module structure and dependency graph for the blog.

## Scope
How the pieces fit together: content, build, deploy, translate, comment.

## Components

```
┌─────────────────────────────────────────────┐
│  Author (Yann)                              │
│  writes markdown → content/<lang>/posts/    │
│  runs `make translate` locally              │
└─────────────┬───────────────────┬───────────┘
              │ git push          │ local
              ▼                   ▼
┌─────────────────────┐  ┌──────────────────┐
│  GitHub Actions      │  │ Claude CLI       │
│  hugo --minify       │  │ (headless)       │
│  deploy to Pages     │  │ translate EN→*   │
└─────────┬───────────┘  └──────────────────┘
          ▼
┌─────────────────────┐
│  GitHub Pages        │
│  yann.regis-gianas   │
│  .org                │
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│  Reader              │
│  reads articles      │
│  comments via giscus │
│  → GitHub Discussions│
└─────────────────────┘
```

## Directory layout (Hugo project)

```
blog/
├── hugo.toml                 # Site configuration
├── Makefile                  # translate, serve, build targets
├── content/
│   ├── en/                   # English (primary)
│   │   ├── _index.md         # Homepage
│   │   ├── posts/            # Articles (page bundles)
│   │   ├── talks/            # Talks listing
│   │   ├── elsewhere/        # External links
│   │   └── about/            # About page
│   ├── fr/                   # French
│   ├── es/                   # Spanish
│   ├── zh/                   # Chinese
│   ├── de/                   # German
│   ├── ja/                   # Japanese
│   └── pt/                   # Portuguese
├── static/
│   ├── CNAME                 # Custom domain
│   └── images/               # Global assets (profile photo)
├── layouts/                  # Template overrides (giscus partial)
├── themes/PaperMod/          # Git submodule
├── .github/workflows/
│   └── deploy.yml            # Build + deploy
├── scripts/
│   └── translate.sh          # Translation via Claude headless
└── kb/                       # Knowledge base (this)
```

## Dependency graph

- **Hugo** (build tool) → reads `content/`, `hugo.toml`, `themes/`
- **PaperMod** (theme) → git submodule under `themes/`
- **GitHub Actions** → runs Hugo, deploys to Pages
- **GitHub Pages** → serves static files, HTTPS via Let's Encrypt
- **giscus** → JS widget, connects to GitHub Discussions API
- **Claude CLI** → local tool for translations
- **OVH DNS** → CNAME → `yurug.github.io`

## Error hierarchy
Build failures are caught in CI. Translation errors are caught locally by author review. Comment moderation is async via GitHub.

## Agent notes
> The blog is a standard Hugo project. The only custom pieces are the Makefile (translation), the giscus integration (layout partial), and the GitHub Actions workflow.

## Related files
- `kb/spec/config-and-formats.md` — Hugo config details
- `kb/spec/algorithms.md` — translation and deploy workflows
- `kb/architecture/decisions/` — ADRs for key choices
