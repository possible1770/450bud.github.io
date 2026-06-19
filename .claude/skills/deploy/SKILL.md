---
name: deploy
description: Publish the 450·BUD site to the live GitHub Pages site. Use when asked to deploy, publish, push live, or "опублікувати/задеплоїти/запушити" changes to the 450·BUD landing site.
---

# Deploy 450·BUD to the live site

Publishes the current working tree to **https://possible1770.github.io/450bud.github.io/**
by pushing to the `pages` remote. GitHub Pages rebuilds automatically from branch `main`.

## Steps

1. **Sanity check** — make sure there are real changes and nothing is broken:
   ```
   git -C /Users/impossible/450bud status --short
   ```
   If a visual change was made, render it first (see the `/preview` skill) before deploying.

2. **Commit** (skip if the user already committed):
   ```
   git -C /Users/impossible/450bud add -A
   git -C /Users/impossible/450bud commit -m "<short imperative summary>

   Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
   ```

3. **Push to production** (`pages` = the live `.github.io` repo):
   ```
   git -C /Users/impossible/450bud push pages main
   ```
   - The SSH key is already wired via the repo's `core.sshCommand` — plain push works.
   - Do **not** rely on `origin` (`450bud.git`); that repo may not exist and its push fails. Ignore that failure.

4. **Verify the live deploy** — Pages takes ~30–90 s to rebuild. Poll until the new
   content appears (adjust the grep marker to something unique to this change):
   ```
   for i in $(seq 1 8); do
     if curl -s "https://possible1770.github.io/450bud.github.io/styles.css?$(date +%s)" | grep -q "Bricolage"; then
       echo "LIVE"; break; fi
     echo "rebuilding... ($i)"; sleep 15
   done
   ```
   Or confirm the deployed commit matches:
   ```
   git -C /Users/impossible/450bud ls-remote pages -h refs/heads/main
   ```

5. Report the live URL and tell the user to hard-refresh (Cmd+Shift+R) if they still see the old version (browser CSS cache).

## Notes
- Auth: SSH key `~/.ssh/id_ed25519_possible1770` only. No `gh` login, no tokens.
- If push is ever rejected for auth, re-set: `git -C /Users/impossible/450bud config core.sshCommand "ssh -i ~/.ssh/id_ed25519_possible1770 -o IdentitiesOnly=yes"`.
- If GitHub Pages was disabled, re-enable at https://github.com/possible1770/450bud.github.io/settings/pages (Source: Deploy from a branch → `main` / root).
