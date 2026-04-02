---
id: algorithms
domain: spec
last-updated: 2026-04-01
related: [prd, data-model, config-and-formats]
---
# Algorithms

## One-liner
Key workflows and their step-by-step logic.

## Scope
Translation workflow, build pipeline, deployment flow.

## Translation workflow

**Trigger**: Author runs `make translate` locally.

**Steps**:
1. Scan `content/en/posts/` for all articles.
2. For each article, check which target languages are missing (no matching `translationKey` in `content/<lang>/posts/`).
3. For each missing translation:
   a. Read the English source markdown.
   b. Call Claude Code headless with a prompt: translate the article to `<language>`, preserving markdown structure, front matter (translating title/summary only), and technical terms.
   c. Write the output to `content/<lang>/posts/<slug>/index.md`.
   d. Set `translationKey` to match the English original.
4. Author reviews diffs with `git diff`, edits as needed, commits.

**State machine**:
```
[English article exists]
  → [Check missing translations]
    → [Generate missing]
      → [Author reviews]
        → [Commit]
```

**Edge cases**:
- Article updated after translation: `make translate` should detect if the English `lastmod` is newer than the translation's `lastmod` and offer to re-translate.
- Author writes directly in FR: reverse translation (FR→EN) uses the same mechanism.

## Build pipeline

**Trigger**: Push to `main` branch.

**Steps**:
1. GitHub Actions checks out the repo.
2. Runs `hugo --minify`.
3. Deploys `public/` to GitHub Pages.
4. GitHub Pages serves via custom domain with HTTPS.

## Article authoring workflow

1. `mkdir content/en/posts/my-article/`
2. Write `index.md` with front matter + content.
3. Add images to the same folder.
4. `hugo server` for local preview.
5. `make translate` for translations.
6. Review, commit, push. Auto-deploys.

## Agent notes
> The translation script is the most complex piece. Keep it simple: a Makefile target wrapping a shell script that calls `claude --headless`. No need for a full framework.

## Related files
- `kb/spec/data-model.md` — article schema the translator must produce
- `kb/external/hugo.md` — Hugo multilingual behavior
- `kb/external/claude-cli.md` — Claude Code headless mode
