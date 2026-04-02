---
id: data-model
domain: spec
last-updated: 2026-04-01
related: [prd, glossary, config-and-formats]
---
# Data Model

## One-liner
Schema for articles and site content.

## Scope
Defines the front matter fields, content structure, and relationships between articles.

## Article front matter

```yaml
---
title: "Article Title"              # Required
date: 2026-04-01                    # Required, ISO 8601
lastmod: 2026-04-01                 # Optional, auto-set by Hugo
draft: false                        # Optional, default false
author: "Yann Régis-Gianas"         # Optional, default from site config
summary: "One-line description"     # Required, used in listings + Open Graph
tags: ["agents", "methodology"]     # Required, at least one
series: "agentic-development"       # Optional, groups articles
series_order: 1                     # Optional, position in series
translationKey: "my-article"        # Required, links translations across languages
cover:
  image: "cover.png"               # Optional, relative to article folder
  alt: "Description"               # Required if image is set
---
```

## Content structure

Each article is a Hugo page bundle:

```
content/en/posts/my-article/
  index.md          # Article content
  cover.png         # Cover image (optional)
  diagram.svg       # Any other assets
```

## Language variants

Hugo's multilingual mode links translations via `translationKey`:

```
content/en/posts/my-article/index.md   # translationKey: "my-article"
content/fr/posts/my-article/index.md   # translationKey: "my-article"
content/es/posts/my-article/index.md   # translationKey: "my-article"
...
```

## Supported languages

| Code | Language | Endonym |
|------|----------|---------|
| en | English | English |
| fr | French | Français |
| es | Spanish | Español |
| zh | Chinese (Simplified) | 中文 |
| de | German | Deutsch |
| ja | Japanese | 日本語 |
| pt | Portuguese | Português |

## Non-article content

### Talks page (`content/<lang>/talks/_index.md`)
Simple markdown list with links to slides/videos. No special front matter beyond title/date.

### Elsewhere page (`content/<lang>/elsewhere/_index.md`)
Curated links to X posts, external publications. Same as talks.

### About page (`content/<lang>/about/_index.md`)
Narrative bio + structured highlights. Content extracted from current homepage at yann.regis-gianas.org.

## Agent notes
> `translationKey` is the critical field for multilingual linking. Every article MUST have one, and it must be identical across all language variants.

## Related files
- `kb/spec/config-and-formats.md` — Hugo config schema
- `kb/GLOSSARY.md` — term definitions
- `kb/domain/prd.md` — user stories driving this model
