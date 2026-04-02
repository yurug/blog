---
id: algorithms
domain: spec
last-updated: 2026-04-02
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
2. For each article, check which target languages need translation (missing file, or English source is newer than existing translation).
3. For each needed translation:
   a. Read the English source markdown.
   b. Call `claude -p` with a prompt: translate the article to `<language>`, preserving markdown structure, front matter (translating title/summary only), and technical terms.
   c. Pipe output through `sed` to strip any wrapping code fences (Claude sometimes adds these despite instructions).
   d. Write the output to `content/<lang>/posts/<slug>/index.md`.
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
- Article updated after translation: `make translate` detects if the English source file is newer (by mtime) than the translation and re-translates.
- Author writes directly in FR: reverse translation (FR→EN) not yet implemented.

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
> The translation script is the most complex piece. Keep it simple: a Makefile target wrapping a shell script that calls `claude -p`. The sed post-processing strips code fences only from the first/last lines to avoid breaking legitimate code blocks in articles.

## Related files
- `kb/spec/data-model.md` — article schema the translator must produce
- `kb/external/hugo.md` — Hugo multilingual behavior
- `kb/external/claude-cli.md` — Claude Code headless mode
