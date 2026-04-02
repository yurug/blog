# Ambiguity Resolution — Round 2

Follow-up questions based on your Round 1 answers.

## Languages (follow-up to #2)

**21. Specific target languages?**
Default: English (primary), French, Spanish, Mandarin Chinese, German, Japanese, Portuguese.
These 7 cover ~85% of software engineers by native language. Hindi and Korean are next.

**22. Should all articles be translated to all languages, or should you pick per article?**
Default: All articles translated to all languages by default. You can exclude specific languages per article via front matter.

## Translation Workflow (follow-up to #17)

**23. Translation via local Claude Code headless — should there be a script/Makefile target to trigger this?**
Default: Yes — a `make translate` (or similar) that finds untranslated articles and generates translations. You review the diffs and commit.

## Homepage / About (follow-up to #19)

**24. Your current homepage says "Software Engineer at Nomadic Labs" but your CLAUDE.md says "Head of Engineering". Which title for the blog?**
Default: Head of Engineering at Nomadic Labs.

**25. The current homepage is academic-style (lists of interests, teaching, committees). Should the blog about page be more narrative/conversational, or keep the structured list style?**
Default: Short narrative paragraph (2-3 sentences) + structured highlights below (interests, projects, links).

**26. Current homepage redirects to yrg.gitlab.io/homepage/. Once the blog replaces it, should we shut down the GitLab Pages site?**
Default: Yes — redirect it to the new blog, or just remove it after DNS is moved.

## Remaining defaults accepted

The following defaults from Round 1 were not edited, confirming them:
- #1: English primary authoring ✓
- #3: Talks + elsewhere sections ✓
- #4: Draft support via front matter ✓
- #5: Standard article metadata ✓
- #6: Series support ✓
- #7: Hugo ✓
- #8: PaperMod theme ✓
- #9: GitHub Pages + Actions ✓
- #11: github.com/yurug/blog, public ✓
- #12: giscus for comments ✓
- #13: Per-article feedback only ✓
- #14: Git repo as changelog ✓
- #15: X + LinkedIn + RSS ✓
- #16: Metadata only, manual sharing ✓
