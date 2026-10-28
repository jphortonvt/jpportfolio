#!/usr/bin/env bash
# Copy Ruled from the sibling design-system folder into vendor/ruled, so the
# repo builds on its own (Cloudflare, CI, a fresh clone). Run this after
# changing the design system, then commit vendor/ruled.
set -euo pipefail
cd "$(dirname "$0")/.."
SRC="../design-system"
[ -d "$SRC/src" ] || { echo "No design system at $SRC"; exit 1; }

rm -rf vendor/ruled
mkdir -p vendor/ruled
cp "$SRC/package.json" vendor/ruled/
cp -R "$SRC/src" "$SRC/tokens" vendor/ruled/
REV=$(git -C "$SRC" rev-parse --short HEAD 2>/dev/null || echo unknown)
echo "Vendored from design-system@${REV}. Edit there, then run npm run sync-ruled." > vendor/ruled/VENDORED.txt
echo "Synced Ruled (design-system@${REV}) into vendor/ruled."
