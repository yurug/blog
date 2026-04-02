---
id: claude-cli-external
domain: external
last-updated: 2026-04-01
related: [algorithms]
---
# Claude CLI — External Dependency

## One-liner
Claude Code headless mode for automated translations.

## Usage for translation
```bash
claude --headless --prompt "Translate this article to French..." < article.md > translated.md
```

## Key behavior
- `--headless` runs without interactive UI, reads from stdin/prompt, writes to stdout.
- Model selection via `--model` flag or environment variable.
- Respects `ANTHROPIC_API_KEY` from environment.
- Output is plain text (the translated markdown).

## Request budget
- 1 API call per article per language.
- 7 languages × N articles = 7N calls per full translation run.
- For 10 articles: 70 calls. Well within reasonable limits.

## Gotchas
- Long articles may need higher max token settings.
- The prompt must explicitly say to preserve markdown structure and front matter.
- Claude may "improve" the article instead of just translating — prompt must be strict.

## Agent notes
> The translation prompt is critical. It must instruct: translate only, preserve all markdown formatting, preserve front matter structure (translate title and summary only), keep code blocks and technical terms untranslated.

## Related files
- `kb/spec/algorithms.md` — translation workflow using this tool
