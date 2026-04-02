#!/bin/bash
# Translate blog articles using Claude Code in headless mode.
# Usage: ./scripts/translate.sh [article-slug]
#   No argument: translate all untranslated or stale articles.
#   With argument: translate only that article.
set -euo pipefail

CONTENT_DIR="content"
SOURCE_LANG="en"
TARGET_LANGS=(fr es zh de ja pt)
LANG_NAMES=(French Spanish "Simplified Chinese" German Japanese Portuguese)

translate_article() {
  local src_file="$1"
  local target_lang="$2"
  local lang_name="$3"
  local slug
  slug=$(basename "$(dirname "$src_file")")
  local target_dir="$CONTENT_DIR/$target_lang/posts/$slug"
  local target_file="$target_dir/index.md"

  mkdir -p "$target_dir"

  echo "  Translating '$slug' to $lang_name ($target_lang)..."

  claude -p "You are a professional translator. Translate the following Hugo blog article from English to $lang_name.

Rules:
- Translate the article content, title, and summary fields in the front matter.
- Do NOT translate: translationKey, tags, author, date, series, series_order, or any other front matter field.
- Preserve all markdown formatting exactly (headers, links, code blocks, lists, bold, italic).
- Preserve all URLs unchanged.
- Keep technical terms in English when they are commonly used untranslated in $lang_name (e.g., 'Hugo', 'GitHub', 'RSS', 'API', 'CI/CD').
- Output ONLY the translated markdown, nothing else. No explanations, no wrapping, no code fences.
- Do NOT wrap the output in \`\`\`markdown or any other code block. Start directly with the --- front matter delimiter.

$(cat "$src_file")" | sed '1{ /^$/d }; 1{ /^```markdown$/d }; 1{ /^$/d }; ${ /^```$/d }' > "$target_file"

  echo "    -> $target_file"
}

needs_translation() {
  local src_file="$1"
  local target_lang="$2"
  local slug
  slug=$(basename "$(dirname "$src_file")")
  local target_file="$CONTENT_DIR/$target_lang/posts/$slug/index.md"

  # No translation yet
  if [ ! -f "$target_file" ]; then
    return 0
  fi

  # Source is newer than translation
  if [ "$src_file" -nt "$target_file" ]; then
    return 0
  fi

  return 1
}

# Find articles to translate
if [ "${1:-}" ]; then
  src_files=("$CONTENT_DIR/$SOURCE_LANG/posts/$1/index.md")
  if [ ! -f "${src_files[0]}" ]; then
    echo "Article not found: ${src_files[0]}"
    exit 1
  fi
else
  mapfile -t src_files < <(find "$CONTENT_DIR/$SOURCE_LANG/posts" -name "index.md" -not -path "*/draft-*" | sort)
fi

if [ ${#src_files[@]} -eq 0 ]; then
  echo "No articles found."
  exit 0
fi

total=0
translated=0

for src_file in "${src_files[@]}"; do
  slug=$(basename "$(dirname "$src_file")")

  # Skip drafts
  if grep -q "^draft: true" "$src_file"; then
    echo "Skipping draft: $slug"
    continue
  fi

  echo "Article: $slug"

  for i in "${!TARGET_LANGS[@]}"; do
    lang="${TARGET_LANGS[$i]}"
    name="${LANG_NAMES[$i]}"
    total=$((total + 1))

    if needs_translation "$src_file" "$lang"; then
      translate_article "$src_file" "$lang" "$name"
      translated=$((translated + 1))
    else
      echo "  $lang: up to date"
    fi
  done
  echo ""
done

echo "Done. $translated/$total translations generated."
echo "Review with: git diff"
