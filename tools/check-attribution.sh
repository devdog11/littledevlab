#!/usr/bin/env bash
# Fail if any commit in a range credits an AI tool as author or co-author.
# Usage: tools/check-attribution.sh <base>..<head>
# Example: tools/check-attribution.sh origin/main..HEAD
set -euo pipefail

range="${1:?usage: check-attribution.sh <base>..<head>}"

authors=$(git log -i -E --author='claude|anthropic|codex|openai|chatgpt' --format='%h %an <%ae> %s' "$range")
trailers=$(git log -i -E \
  --grep='co-authored-by:.*(claude|anthropic|codex|openai|chatgpt)' \
  --grep='generated with.*claude' \
  --grep='^claude-session:' \
  --format='%h %s' "$range")

if [ -n "$authors" ] || [ -n "$trailers" ]; then
  [ -n "$authors" ] && printf 'Commits authored by an AI tool:\n%s\n\n' "$authors"
  [ -n "$trailers" ] && printf 'Commits with AI attribution lines:\n%s\n\n' "$trailers"
  echo "Commits should credit Tyson only. Amend or rewrite these commits before merging."
  exit 1
fi

echo "Attribution check passed for $range"
