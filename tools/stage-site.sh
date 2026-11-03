#!/usr/bin/env bash
# Assemble the public site in _public/ from the pre-rendered React build
# (app/dist) plus images/. Used by deploy.yml and pr-checks.yml, so a missing
# page fails the PR check before it can fail a deploy.
# Run from the repo root after `npm run build` in app/.
set -euo pipefail

rm -rf _public
mkdir -p _public
cp -R images _public/

# Static pages not yet moved to React. React output copied below replaces them.
for legacy in index.html build-log.html lab lab-notes build-log; do
  if [ -e "$legacy" ]; then cp -R "$legacy" _public/; fi
done

cp -R app/dist/. _public/
rm -rf _public/.vite

# Every pre-rendered page must be in place and carry its rendered content.
pages=$(cd app/dist && find . -name '*.html' | sed 's|^\./||' | sort)
test -n "$pages"
for page in $pages; do
  test -s "_public/$page"
  grep -q '<div id="root" data-page="' "_public/$page" || { echo "Not pre-rendered: $page"; exit 1; }
  grep -q '<title>' "_public/$page" || { echo "No <title>: $page"; exit 1; }
done
test -s _public/products.html
ls _public/assets/*.js _public/assets/*.css > /dev/null
echo "Staged $(echo "$pages" | wc -l | tr -d ' ') pre-rendered page(s) in _public/"
