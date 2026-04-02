---
id: claude-cli-external
domain: external
last-updated: 2026-04-02
related: [algorithms]
---
# Claude CLI — External Dependency

## One-liner
Claude Code print mode (`-p`) for automated translations.

## Usage for translation
```bash
claude -p "Translate this article to French...

$(cat content/en/posts/my-article/index.md)" > content/fr/posts/my-article/index.md
```

## Key behavior
- `-p` (print mode) runs non-interactively: takes a prompt string, writes response to stdout.
- No `--headless` flag needed — `-p` is sufficient for single-shot tasks.
- Model selection via `--model` flag or environment variable.
- Output is plain text (the translated markdown).
- May wrap output in ` ```markdown ` code fences — the translate script strips these.

## Request budget
- 1 API call per article per language.
- 7 languages × N articles = 7N calls per full translation run.
- For 10 articles: 70 calls. Well within reasonable limits.

## Gotchas
- Long articles may need higher max token settings.
- The prompt must explicitly say to preserve markdown structure and front matter.
- Claude may "improve" the article instead of just translating — prompt must be strict.
- Claude may wrap output in code fences despite being told not to — translate.sh strips first/last fence lines as a safety net.

## Agent notes
> The translation prompt is critical. It must instruct: translate only, preserve all markdown formatting, preserve front matter structure (translate title and summary only), keep code blocks and technical terms untranslated. The `-p` flag is the correct way to run Claude Code non-interactively for single-shot tasks.

## Related files
- `kb/spec/algorithms.md` — translation workflow using this tool
