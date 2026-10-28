#!/usr/bin/env bash
# Build the site for GitHub Pages and push it to the gh-pages branch.
set -euo pipefail
cd "$(dirname "$0")/.."

REPO_URL=$(git remote get-url origin)
REPO_NAME=$(basename -s .git "$REPO_URL")
SOURCE_REV=$(git rev-parse --short HEAD)

npx tsc --noEmit
# Project pages live under /<repo>/, so asset URLs need that prefix
npx vite build --base="/${REPO_NAME}/"
touch dist/.nojekyll   # serve files as-is, no Jekyll processing

cd dist
rm -rf .git
git init -q -b gh-pages
git add -A
git commit -q -m "Deploy ${SOURCE_REV}"
git push -q -f "$REPO_URL" gh-pages
rm -rf .git
echo "Deployed ${SOURCE_REV} to the gh-pages branch."
