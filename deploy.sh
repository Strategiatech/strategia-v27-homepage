#!/bin/bash
set -e
cd /opt/strategia

if [ -z "$DEPLOY_OLD_HASH" ]; then
  OLD_HASH=$(git rev-parse HEAD)
  echo "==> Pulling latest from main..."
  git fetch origin main
  git reset --hard origin/main
  NEW_HASH=$(git rev-parse HEAD)

  # If deploy.sh itself was rewritten by the reset above, re-exec so the
  # rest of the deploy runs the new version, not the old one we're still
  # executing in memory. Pass the hashes through so the re-exec can still
  # diff for Caddyfile changes without re-fetching.
  if [ "$OLD_HASH" != "$NEW_HASH" ] && git diff --name-only "$OLD_HASH" "$NEW_HASH" | grep -qx 'deploy.sh'; then
    echo "==> deploy.sh changed; re-executing new version..."
    export DEPLOY_OLD_HASH="$OLD_HASH"
    export DEPLOY_NEW_HASH="$NEW_HASH"
    exec /opt/strategia/deploy.sh
  fi
else
  OLD_HASH="$DEPLOY_OLD_HASH"
  NEW_HASH="$DEPLOY_NEW_HASH"
  echo "==> Re-entered with new deploy.sh; skipping git fetch."
fi

echo "==> Building and starting containers..."
docker compose up -d --build

# Restart caddy when the Caddyfile changes. `docker compose up` doesn't
# recreate caddy (image is pinned and unchanged), and `git reset --hard`
# rewrites the file's inode so the bind-mounted file inside the running
# container goes stale until the container restarts.
if [ "$OLD_HASH" != "$NEW_HASH" ] && git diff --name-only "$OLD_HASH" "$NEW_HASH" | grep -qx 'Caddyfile'; then
  echo "==> Caddyfile changed; restarting caddy..."
  docker compose restart caddy
fi

echo "==> Cleaning up old images..."
docker image prune -f
echo "==> Status:"
docker compose ps
