#!/usr/bin/env bash
# Scrapes the small round certification seals from simpliaxis's mega-menu (the
# /ajaxGetMenuCourses endpoint — same 40x40 badges shown beside each course).
# Maps to our courses by slug; writes public/images/courses/badges/<slug>.<ext>
# and lib/badge-manifest.json. Re-run to refresh. Unmatched -> "UL" default at render.
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/images/courses/badges"
MANIFEST="$ROOT/lib/badge-manifest.json"
UA="Mozilla/5.0"
mkdir -p "$OUT"

# Pull our slugs (one per line) so we only keep badges for courses we actually have.
have=" $(tr '\n' ' ' < /tmp/slugs.txt) "

# Fetch the menu, extract (slug, badgeUrl) pairs via node, download, build manifest.
# Repo-local temp so Git Bash and node (which resolve /tmp differently on Windows) agree.
TMP="$ROOT/.badge-tmp"; mkdir -p "$TMP"
curl -s -A "$UA" -H "X-Requested-With: XMLHttpRequest" \
  "https://www.simpliaxis.com/ajaxGetMenuCourses?country_slug=in&v=3" -o "$TMP/menu.json"

# Node reads/writes via argv paths (single-quoted heredoc body — no shell expansion inside).
node "$ROOT/scripts/parse-menu-badges.js" "$TMP/menu.json" "$TMP/pairs.txt"

echo "{" > "$MANIFEST"; first=1
while IFS=$'\t' read -r slug url; do
  [ -z "$slug" ] && continue
  case "$have" in *" $slug "*) ;; *) continue;; esac   # only our courses
  ext="${url##*.}"; ext="${ext%%\?*}"
  curl -s -A "$UA" "$url" -o "$OUT/$slug.$ext"
  if [ -s "$OUT/$slug.$ext" ]; then
    [ $first -eq 0 ] && echo "," >> "$MANIFEST"
    printf '  "%s": "/images/courses/badges/%s.%s"' "$slug" "$slug" "$ext" >> "$MANIFEST"
    first=0; echo "OK   $slug"
  else rm -f "$OUT/$slug.$ext"; echo "EMPTY $slug"; fi
done < "$ROOT/.badge-tmp/pairs.txt"
echo "" >> "$MANIFEST"; echo "}" >> "$MANIFEST"
echo "--- matched: $(grep -c '/images/courses/badges/' "$MANIFEST") ---"

# Per-category "Credential Issuing Bodies" (logo + name) -> lib/issuer-manifest.json
node "$ROOT/scripts/parse-issuers.js" "$TMP/menu.json" "$TMP/issuers.tsv"
node "$ROOT/scripts/build-issuers.js" "$TMP/issuers.tsv"
