---
name: preview
description: Render the 450·BUD site to screenshots locally (desktop + mobile) to verify visual changes before deploying. Use when asked to preview, screenshot, check how the 450·BUD site looks, or after making CSS/HTML edits.
---

# Preview 450·BUD locally

Renders the static site with headless Chrome and saves screenshots, then view them
with the Read tool. No server needed — the site is plain files opened via `file://`.

## Commands

Set up paths (scratchpad dir is session-specific — use the one from the system prompt):
```
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="<your scratchpad dir>"   # e.g. /private/tmp/.../scratchpad
SITE="file:///Users/impossible/450bud"
```

**Desktop (full page):**
```
"$CHROME" --headless --disable-gpu --hide-scrollbars --window-size=1440,5400 \
  --screenshot="$OUT/desktop.png" "$SITE/index.html"
```

**Mobile:**
```
"$CHROME" --headless --disable-gpu --hide-scrollbars --window-size=390,2600 \
  --screenshot="$OUT/mobile.png" "$SITE/index.html"
```

**A service subpage:**
```
"$CHROME" --headless --disable-gpu --hide-scrollbars --window-size=1440,1600 \
  --screenshot="$OUT/sub.png" "$SITE/services/budivnytstvo.html"
```

Then **Read** the PNG files to view them.

## Notes
- `--window-size` height must exceed page height or the bottom is clipped; bump it if the footer is cut off.
- Full page list to check: `index.html` + the 4 files in `services/`.
- Always preview before `/deploy` when a change is visual.
- If Chrome isn't at the path above, find it: `ls "/Applications/Google Chrome.app/Contents/MacOS/"` or use `Chromium`/`Brave` equivalently.
