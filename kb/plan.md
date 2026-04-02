---
id: plan
domain: planning
last-updated: 2026-04-01
related: [prd, arch-overview, by-task]
---
# Implementation Plan

## One-liner
3 vertical slices to a working multilingual blog.

## Step 1: Running blog with one article

**Goal**: A live Hugo blog at yann.regis-gianas.org with one English article, the about page, and GitHub Pages deployment.

**Modules**:
- `hugo.toml` — site config with all 7 languages declared
- `content/en/_index.md` — homepage
- `content/en/about/_index.md` — about page (extracted from current homepage)
- `content/en/posts/hello-world/index.md` — sample article with all front matter fields
- `content/en/talks/_index.md` — talks page (placeholder)
- `content/en/elsewhere/_index.md` — elsewhere page (placeholder)
- `static/CNAME` — custom domain
- `themes/PaperMod` — git submodule
- `.github/workflows/deploy.yml` — build + deploy
- `Makefile` — `serve`, `build`, `clean` targets

**Properties validated**: P2 (drafts excluded), P5 (required front matter), NF5 (build time).

**Acceptance criteria**:
- `make serve` works locally, article renders, language list shows all 7 languages.
- GitHub Actions builds and deploys successfully.
- Site reachable at yann.regis-gianas.org with HTTPS.

## Step 2: Comments + SEO + polish

**Goal**: Reader-facing features — giscus comments, Open Graph/Twitter Cards, RSS, article history links.

**Modules**:
- `layouts/partials/comments.html` — giscus widget
- `layouts/partials/extend_head.html` — additional meta tags if needed
- Hugo config additions for SEO (already mostly covered by PaperMod)
- `Makefile` additions: `lint` target for front matter validation

**Properties validated**: NF2 (SEO), NF3 (accessibility), P1 (translation key consistency check).

**Acceptance criteria**:
- giscus comments appear on articles, moderable via GitHub Discussions.
- Sharing an article URL on X/LinkedIn shows rich preview.
- RSS feed works in a reader.
- `make lint` catches missing front matter fields.

## Step 3: Translation workflow

**Goal**: `make translate` generates translations to all target languages using Claude headless.

**Modules**:
- `scripts/translate.sh` — translation script
- `Makefile` additions: `translate` target
- Translation prompt template
- French content tree as validation (`content/fr/`)

**Properties validated**: P1 (translationKey consistency), T5 (stale translation detection), T8 (CJK rendering).

**Acceptance criteria**:
- `make translate` finds untranslated articles and generates translations.
- Language switcher works end-to-end.
- CJK content renders with correct fonts.
- Stale translations detected (English newer than translation).

## Agent notes
> Step 1 is the big one — it produces a live, working blog. Steps 2 and 3 add depth. Each step ends with a commit and a working site.

## Related files
- `kb/indexes/by-task.md#implement` — files to read before implementing
- `kb/domain/prd.md` — user stories this plan covers
