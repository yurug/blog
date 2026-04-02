---
id: error-taxonomy
domain: spec
last-updated: 2026-04-01
related: [algorithms, config-and-formats]
---
# Error Taxonomy

## One-liner
What can go wrong and how to handle it.

## Scope
Errors in the build, deploy, and translation workflows.

## Build errors

| Error | Cause | Resolution |
|-------|-------|------------|
| Missing `translationKey` | Article lacks the field | Hugo warns; add the field |
| Broken image reference | Image path wrong or file missing | Fix path or add the image |
| Invalid front matter | YAML syntax error | Fix the YAML |
| Theme not found | Submodule not initialized | `git submodule update --init` |

## Deploy errors

| Error | Cause | Resolution |
|-------|-------|------------|
| GitHub Actions build failure | Hugo error or config issue | Check Actions log, fix locally |
| DNS not resolving | OVH CNAME not set or propagating | Verify OVH config, wait for propagation |
| HTTPS cert error | GitHub Pages cert not issued yet | Wait or re-trigger in repo settings |

## Translation errors

| Error | Cause | Resolution |
|-------|-------|------------|
| Claude headless not available | CLI not installed or not in PATH | Install/configure Claude Code |
| Partial translation | LLM truncated output | Re-run for that article |
| Garbled markdown | LLM broke markdown structure | Manual fix or re-run with stricter prompt |
| Wrong language | LLM translated to wrong language | Re-run with explicit language instruction |

## Agent notes
> Most errors are caught at build time by Hugo. The translation workflow is the main source of runtime issues — always review diffs before committing.

## Related files
- `kb/spec/algorithms.md` — workflows where these errors occur
- `kb/spec/config-and-formats.md` — config that prevents some errors
