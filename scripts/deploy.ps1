# ---------------------------------------------------------------------------
# deploy.ps1 — PowerShell version of scripts/deploy.sh
# Pushes the current branch to GitHub dev + main as the Vercel project owner,
# so the Hobby-plan deployment is not blocked by a non-contributor commit author.
#
# Usage (from repo root, in PowerShell):
#   .\scripts\deploy.ps1
#   .\scripts\deploy.ps1 "optional commit message"
#
# Auth: relies on your configured git credentials (gh auth login OR a stored
# PAT in the Windows credential manager). It does NOT embed any token.
# ---------------------------------------------------------------------------
param([string]$Message = "chore: trigger Vercel deploy as project owner")

$ErrorActionPreference = "Stop"
$OwnerName  = "DeepankarSharma1999"
$OwnerEmail = "DeepankarSharma1999@users.noreply.github.com"

Set-Location (Join-Path $PSScriptRoot "..")

# 1. Refuse to run with uncommitted changes.
$dirty = git status --porcelain
if ($dirty) {
  Write-Host "X You have uncommitted changes. Commit or stash them first." -ForegroundColor Red
  git status --short
  exit 1
}

$branch = git rev-parse --abbrev-ref HEAD
Write-Host "-> Current branch: $branch"

# 2. Add an owner commit only if the latest commit isn't already owned.
$lastEmail = git log -1 --format='%ae'
if ($lastEmail -ne $OwnerEmail) {
  Write-Host "-> Latest commit authored by '$lastEmail' - adding owner commit."
  git -c user.name="$OwnerName" -c user.email="$OwnerEmail" commit --allow-empty -m "$Message"
} else {
  Write-Host "-> Latest commit already authored by the owner. No extra commit needed."
}

# 3. Push current branch to dev, then sync main.
Write-Host "-> Pushing $branch -> origin/dev"
git push origin "$branch`:dev"

Write-Host "-> Syncing origin/main to match"
git push origin "$branch`:main"

$short = git rev-parse --short HEAD
Write-Host ""
Write-Host "OK Done. Vercel will auto-deploy commit $short from main." -ForegroundColor Green
Write-Host "   Watch: https://vercel.com/deepankarsharmads99-4139s-projects/course_ecom/deployments"
