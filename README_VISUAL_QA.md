# Visual QA mode

The 8MART site is motion-heavy. To review layout or take clean
screenshots, switch on **still mode** — it freezes every animation while
keeping the full layout and the 3D scene visible.

## Query parameters

Append any of these to any URL:

| Parameter       | Effect                                        |
| --------------- | --------------------------------------------- |
| `?motion=off`   | Freeze all motion (recommended for review)    |
| `?qa=1`         | Same as `?motion=off`                         |
| `?scene=freeze` | Same as `?motion=off`                         |

Examples:

```
http://localhost:3000/?motion=off
http://localhost:3000/catalog?motion=off
http://localhost:3000/product/25-krasnyh-roz?motion=off
http://localhost:3000/visual-qa?motion=off
```

## What still mode does

- Stops floating petals, the marquee, the glow drift and idle loops.
- Freezes the WebGL hero: the floral sculpture renders **once**, fully
  bloomed, then the render loop stops (`frameloop="demand"`).
- Disables Lenis smooth scrolling and all entrance reveals (content
  renders in its final, laid-out state).
- Adds `class="motion-off"` to `<html>`, which halts every CSS animation.

It uses the same code path as the OS `prefers-reduced-motion` setting, so
the site is fully usable and screenshot-friendly in this mode.

## The `/visual-qa` page

Open **`/visual-qa`** for a single-page showcase of the key building
blocks — photo frames, the catalog card, the product gallery, the phone
mockup, animated SVGs, the rotating flower orb and the depth card.

Open `/visual-qa?motion=off` to freeze it for screenshots. The page is
marked `noindex`.

## How to screenshot

1. `npm run dev`
2. Open the page with `?motion=off`.
3. Resize the browser (≥1024px for desktop, ~375px for mobile) and
   capture. With motion frozen the page reaches a stable state.
