# yann.regis-gianas.org

Personal blog on software engineering in the agent era.

Built with [Hugo](https://gohugo.io/) + [PaperMod](https://github.com/adityatelange/hugo-PaperMod), deployed on [GitHub Pages](https://pages.github.com/).

## Quick start

```bash
# Clone with theme submodule
git clone --recurse-submodules git@github.com:yurug/blog.git
cd blog

# Local preview (includes drafts)
make serve

# Build for production
make build
```

## Writing an article

1. Create a folder: `content/en/posts/my-article/`
2. Write `index.md` with front matter:

```yaml
---
title: "My Article"
date: 2026-04-02
summary: "One-line description."
tags: ["topic"]
translationKey: "my-article"
author: "Yann Régis-Gianas"
---
```

3. Add images in the same folder (reference with `![](image.png)`).
4. Preview: `make serve`
5. Translate: `make translate`
6. Lint: `make lint`
7. Push to `main` — auto-deploys.

## Translations

Articles are translated to 7 languages (EN, FR, ES, ZH, DE, JA, PT) using Claude Code:

```bash
# Translate all untranslated/stale articles
make translate

# Translate a specific article
./scripts/translate.sh my-article
```

Review translations with `git diff` before committing.

## Commands

| Command | Description |
|---------|-------------|
| `make serve` | Local dev server with drafts |
| `make build` | Production build |
| `make translate` | Generate missing translations |
| `make lint` | Validate front matter |
| `make clean` | Remove build artifacts |

## License

Content: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
Code: [MIT](https://opensource.org/licenses/MIT).
