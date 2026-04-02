#!/bin/bash
# Lint front matter of all published articles.
# Checks: title, date, summary, tags, translationKey (P5).
# Checks: translationKey consistency across languages (P1).
set -euo pipefail

CONTENT_DIR="${1:-content}"
errors=0

# P5: Required front matter fields
for f in $(find "$CONTENT_DIR" -path "*/posts/*/index.md"); do
  for field in title date summary tags translationKey; do
    if ! grep -q "^${field}:" "$f" && ! grep -q "^${field} :" "$f"; then
      echo "MISSING $field in $f"
      errors=$((errors + 1))
    fi
  done
done

# P1: translationKey consistency — every key used in EN must match across languages
for en_file in $(find "$CONTENT_DIR/en/posts" -name "index.md" 2>/dev/null); do
  key=$(grep "^translationKey:" "$en_file" | sed 's/translationKey: *"\?\([^"]*\)"\?/\1/' | tr -d '[:space:]')
  if [ -z "$key" ]; then
    continue
  fi
  for lang_dir in "$CONTENT_DIR"/*/posts; do
    lang=$(basename "$(dirname "$lang_dir")")
    if [ "$lang" = "en" ]; then continue; fi
    matching=$(find "$lang_dir" -name "index.md" -exec grep -l "translationKey:.*${key}" {} \; 2>/dev/null || true)
    # Not an error if translation doesn't exist yet — just info
    if [ -z "$matching" ]; then
      echo "INFO: no $lang translation for key '$key' ($en_file)"
    fi
  done
done

if [ "$errors" -gt 0 ]; then
  echo ""
  echo "FAILED: $errors front matter error(s) found."
  exit 1
else
  echo "OK: all front matter checks passed."
fi
