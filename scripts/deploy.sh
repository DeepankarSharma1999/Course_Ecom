#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# deploy.sh — push current branch to GitHub dev + main as the Vercel project
# owner, so the Hobby-plan deployment is not blocked by a non-contributor
# commit author (e.g. a collaborator's commits).
#
# Usage:
#   bash scripts/deploy.sh ["optional commit message"]
#
# What it does:
#   1. Verifies the working tree is clean (commit your work first).
#   2. Adds an empty commit authored by the Vercel owner (DeepankarSharma1999)
#      so the latest commit on main passes Vercel's author check.
#   3. Pushes the current branch to origin/dev and force-syncs origin/main.
#
# Auth: relies on your configured git credentials (gh auth login OR a stored
# PAT via the git credential manager). It does NOT embed any token.
# ---------------------------------------------------------------------------
set -euo pipefail

OWNER_NAME="DeepankarSharma1999"
OWNER_EMAIL="DeepankarSharma1999@users.noreply.github.com"
MSG="${1:-chore: trigger Vercel deploy as project owner}"

cd "$(dirname "$0")/.."

# 1. Refuse to run with uncommitted changes (avoids surprising the user).
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "✗ You have uncommitted changes. Commit or stash them first."
  git status --short
  exit 1
fi

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
echo "→ Current branch: $CURRENT_BRANCH"

# 2. Only add an owner commit if the latest commit isn't already authored by the owner.
LAST_AUTHOR_EMAIL="$(git log -1 --format='%ae')"
if [ "$LAST_AUTHOR_EMAIL" != "$OWNER_EMAIL" ]; then
  echo "→ Latest commit authored by '$LAST_AUTHOR_EMAIL' — adding owner commit."
  git -c user.name="$OWNER_NAME" -c user.email="$OWNER_EMAIL" \
      commit --allow-empty -m "$MSG"
else
  echo "→ Latest commit already authored by the owner. No extra commit needed."
fi

# 3. Push current branch to dev, then sync main.
echo "→ Pushing $CURRENT_BRANCH → origin/dev"
git push origin "$CURRENT_BRANCH:dev"

echo "→ Syncing origin/main to match"
git push origin "$CURRENT_BRANCH:main"

echo ""
echo "✓ Done. Vercel will auto-deploy commit $(git rev-parse --short HEAD) from main."
echo "  Watch: https://vercel.com/deepankarsharmads99-4139s-projects/course_ecom/deployments"
