---
id: config-and-formats
domain: spec
last-updated: 2026-04-01
related: [data-model, algorithms, hugo-external]
---
# Configuration & Formats

## One-liner
Hugo configuration schema and key settings.

## Scope
The `hugo.toml` config file structure and important settings.

## Hugo config (`hugo.toml`)

```toml
baseURL = "https://yann.regis-gianas.org/"
title = "Yann Régis-Gianas"
theme = "PaperMod"
defaultContentLanguage = "en"
defaultContentLanguageInSubdir = false

# Multilingual
[languages]
  [languages.en]
    languageName = "English"
    weight = 1
    [languages.en.params]
      subtitle = "Software Engineering in the Agent Era"
  [languages.fr]
    languageName = "Français"
    weight = 2
    [languages.fr.params]
      subtitle = "Génie logiciel à l'ère des agents"
  [languages.es]
    languageName = "Español"
    weight = 3
  [languages.zh]
    languageName = "中文"
    weight = 4
  [languages.de]
    languageName = "Deutsch"
    weight = 5
  [languages.ja]
    languageName = "日本語"
    weight = 6
  [languages.pt]
    languageName = "Português"
    weight = 7

# PaperMod params
[params]
  author = "Yann Régis-Gianas"
  description = "Personal blog on software engineering in the agent era"
  ShowReadingTime = true
  ShowShareButtons = true
  ShowPostNavLinks = true
  ShowBreadCrumbs = true
  ShowCodeCopyButtons = true
  defaultTheme = "auto"  # dark/light follows system
  [params.homeInfoParams]
    Title = "Yann Régis-Gianas"
    Content = "Head of Engineering at Nomadic Labs. Writing about software engineering in the agent era."
  [[params.socialIcons]]
    name = "github"
    url = "https://github.com/yurug"
  [[params.socialIcons]]
    name = "x"
    url = "https://x.com/YannRG"

# SEO
[outputs]
  home = ["HTML", "RSS", "JSON"]

# Taxonomies
[taxonomies]
  tag = "tags"
  series = "series"

# Markdown rendering
[markup]
  [markup.highlight]
    style = "monokai"
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true  # allow raw HTML in markdown
```

## GitHub Actions deploy workflow (`.github/workflows/deploy.yml`)

Key steps:
1. Checkout repo with submodules (for theme).
2. Setup Hugo (latest extended version).
3. `hugo --minify`.
4. Deploy `public/` to GitHub Pages.

## Custom domain

- File: `static/CNAME` containing `yann.regis-gianas.org`
- DNS at OVH: CNAME record pointing to `yurug.github.io`
- GitHub repo settings: custom domain configured.

## Agent notes
> The config above is a starting point. PaperMod has many more params — only add what's needed. The `unsafe = true` in goldmark is needed for embedded widgets like giscus.

## Related files
- `kb/spec/data-model.md` — front matter fields this config enables
- `kb/external/hugo.md` — Hugo runtime behavior
