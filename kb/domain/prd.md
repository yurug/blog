---
id: prd
domain: product
last-updated: 2026-04-01
related: [glossary, data-model, algorithms]
---
# Product Requirements Document

## One-liner
What the blog does, for whom, and why.

## Scope
Personal blog for Yann Régis-Gianas replacing yann.regis-gianas.org and the GitHub page @yurug. Focused on software engineering in the agent era.

## User stories

### Author (Yann)
- **US-1**: I create an article by making a folder in `content/en/posts/`, writing markdown, adding images, and pushing.
- **US-2**: I trigger translations to all target languages via `make translate` and review locally.
- **US-3**: I moderate reader feedback via GitHub Discussions.
- **US-4**: I can mark articles as drafts to work on them without publishing.
- **US-5**: I can group articles into series.
- **US-6**: I push to main and the blog auto-deploys.

### Reader
- **US-7**: I browse articles on the homepage, sorted by date.
- **US-8**: I switch between languages using a language switcher.
- **US-9**: I leave feedback on an article via giscus (GitHub auth required).
- **US-10**: I subscribe to the blog via RSS.
- **US-11**: I share articles on X/LinkedIn — they render with rich previews.

## Non-functional expectations
- **NF-1**: Site loads in < 2s on a 3G connection (static site, so easy).
- **NF-2**: SEO-friendly: Open Graph, Twitter Cards, JSON-LD, sitemap.
- **NF-3**: Accessible: semantic HTML, alt text on images, keyboard-navigable.
- **NF-4**: Transparent: public repo, article history visible.
- **NF-5**: Zero ongoing cost (GitHub Pages free tier).

## Out of scope
- CMS / admin dashboard — authoring is via git.
- Auto-posting to social media — manual for now.
- User accounts beyond GitHub auth for comments.
- Analytics (can be added later via privacy-friendly tools).
- Newsletter / email subscriptions.

## Sections
1. **Homepage**: brief about + article listing with summaries.
2. **Posts**: individual articles with comments.
3. **Talks**: links to slides/videos of presentations.
4. **Elsewhere**: links to X posts and external publications.
5. **About**: narrative bio + structured highlights.

## Agent notes
> The authoring workflow must stay dead simple: folder + markdown + push. Any complexity belongs in the build/deploy pipeline, not in the author's workflow.

## Related files
- `kb/GLOSSARY.md` — canonical terms
- `kb/spec/data-model.md` — article schema
- `kb/spec/algorithms.md` — translation workflow
