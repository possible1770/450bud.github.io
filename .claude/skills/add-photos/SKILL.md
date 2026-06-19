---
name: add-photos
description: Replace the green gradient placeholders on the 450·BUD site with real project photos. Use when the user provides photos or asks to add/replace images on the 450·BUD site.
---

# Add real photos to 450·BUD

Every image slot is a `<div class="media">…</div>` showing a green gradient + a house
line-art placeholder. To use a real photo, put an `<img>` inside that div. The placeholder
graphics auto-hide via `.media:has(img)` and the photo gets `object-fit: cover` automatically.

## How to replace

Find a placeholder, e.g. in `index.html`:
```html
<div class="media media--hero" role="img" aria-label="Заміський будинок, збудований 450·BUD"></div>
```
Replace with:
```html
<div class="media media--hero">
  <img src="img/hero-house.jpg" alt="Заміський будинок, збудований 450·BUD" />
</div>
```
(Drop the now-redundant `role`/`aria-label` from the div — the `<img alt>` carries it.)

## Image slots
- **Hero** (`index.html`): `.media--hero` — aspect 4:5 desktop, big. Use the strongest photo.
- **Featured service card** (`index.html`, "Будівництво під ключ"): `.card--feature .media`.
- **Project tiles** (`index.html`, section Роботи): 4 × `.tile .media` (4:3). The 4th is the Instagram tile (`.tile--ig`).
- Service subpages currently have no media slots — add `<div class="media">…</div>` blocks if photos are wanted there.

## Files & workflow
1. Put images in a new `img/` folder at the repo root: `/Users/impossible/450bud/img/`.
   From a subpage use `../img/...`.
2. **Optimize before committing** — these are large hero photos on a static site:
   - Resize to ~1600px on the long edge (hero) / ~1000px (tiles).
   - Prefer `.webp` or well-compressed `.jpg` (target < 300 KB each).
   - Example (if `cwebp`/`sips` available): `sips -Z 1600 photo.jpg --out img/hero-house.jpg`.
3. Keep meaningful Ukrainian `alt` text (it's also SEO).
4. `/preview` to check framing, then `/deploy`.

## Source of photos
Real objects from Instagram **@4.5.0.bud** (https://www.instagram.com/4.5.0.bud/) are the
intended source — always stronger than stock. Download, optimize, drop into `img/`.
