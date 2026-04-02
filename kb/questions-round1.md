# Ambiguity Resolution — Round 1

Based on IDEAS.md, here are the open questions grouped by topic.
For each question, a default answer is proposed. Please edit or approve.

## Features & Scope

**1. What is the primary language for authoring articles?**
Default: English, with LLM-generated French translations.

**2. Which languages should the blog support?**
English, French, Spanish, Chinese, German, ...

The topmost languages to cover the native language of 80% of software engineers and tech deciders.

**3. Should the blog include non-article content (talks, presentations, links to X posts)?**
Default: Yes — a "talks" section linking to slides/videos, and an "elsewhere" section linking to X posts.

**4. Should the blog support draft/unpublished articles?**
Default: Yes — articles with `draft: true` in front matter are hidden from production.

## Data Model

**5. What metadata should each article carry?**
Default: title, date, author, tags, summary, language, translation links, draft status.

**6. Should articles support series/sequences (part 1, part 2…)?**
Default: Yes, via a `series` front matter field.

## Tech Stack

**7. Which static site generator?**
Default: Hugo — single binary, native multilingual support, fast builds, great markdown workflow.

**8. Which Hugo theme?**
Default: PaperMod — clean, minimal, reading-focused, multilingual support, dark/light mode, good SEO.

## Hosting & Deployment

**9. Hosting platform?**
Default: GitHub Pages with GitHub Actions for CI/CD. No VPS needed.

**10. Custom domain: where is `yann.regis-gianas.org` DNS managed?**
Default: Need your answer — this determines how we point it to GitHub Pages.

It is hosted on OVH.

**11. GitHub repo name and visibility?**
Default: `github.com/yurug/blog`, public (transparency goal).

## Feedback & Reviews

**12. Comment system for reader feedback?**
Default: giscus (GitHub Discussions-backed). You moderate, readers auth via GitHub, fully transparent.

**13. Should feedback be per-article or also global (e.g., a general feedback page)?**
Default: Per-article only.

## Transparency

**14. How to surface the changelog?**
Default: Public git repo is the changelog. Each article shows "last updated" date + link to its git history.

## Social Media & Marketing

**15. Which social platforms to optimize for?**
Default: X (Twitter Cards) and LinkedIn (Open Graph). RSS feed for aggregators.

**16. Should the blog auto-post to social media, or just have sharing-friendly metadata?**
Default: Metadata only (Open Graph, Twitter Cards). Manual sharing for now.

## Translation Workflow

**17. How should translations be triggered?**
Default: A GitHub Action that takes an article, calls Claude API to translate, and opens a PR for review.

I'd prefer running the claude code in headless mode on my machine to generate the translations. I'll review locally.

**18. Should translated articles link back to the original?**
Default: Yes — a language switcher per article + explicit "This is a translation of…" note.

Yes

## About Page & Existing Content

**19. What should the homepage/about section convey?**
Default: Brief bio (professor background, head of engineering at Nomadic Labs, Tezos ecosystem, research interests), photo, links to GitHub/X/LinkedIn. Then article listing below.

Extract contents from my current homepage: yann.regis-gianas.org 

We will see how to reintegrate it.

**20. Are the existing X articles available for import?**
Default: Need your answer — URLs or text so I can seed the blog with them.

I'll add them manually.
