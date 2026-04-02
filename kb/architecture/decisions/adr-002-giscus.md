---
id: adr-002
domain: architecture
last-updated: 2026-04-01
related: [arch-overview, prd]
---
# ADR-002: Use giscus for reader feedback

## Context
The blog needs reader feedback that is moderated by the author, transparent, and requires no backend.

## Decision
Use giscus (GitHub Discussions-backed comment widget).

## Rationale
- No backend or database needed — comments stored in GitHub Discussions.
- Author moderates via GitHub (lock, delete, pin).
- Transparent: discussions are public and linkable.
- Spam prevention: readers must authenticate via GitHub.
- Open source widget, embedded via `<script>` tag.
- Supports reactions, threaded replies, and multiple languages.

## Alternatives rejected
- **utterances**: uses GitHub Issues instead of Discussions — less structured, clutters issue tracker.
- **Disqus**: proprietary, ads, privacy concerns.
- **Self-hosted Commento**: requires a VPS — against the no-cost constraint.

## Consequences
- Readers need a GitHub account to comment (acceptable for a tech blog audience).
- Need to enable GitHub Discussions on the repo.
- A `layouts/partials/comments.html` override loads the giscus script.

## What this means for implementers
Add a single partial template. Configure giscus via https://giscus.app with the repo details. No backend code needed.
