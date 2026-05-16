# Product photos

Real bouquet photos go here. Until they are added, the site shows a
premium generated bloom inside every frame — no broken images, no grey
boxes — and the layout is already built for the real photos.

## How to switch on real photos

1. Add the `.jpg` (or `.webp`) files listed below to this folder.
2. Open `src/config/media.ts` and set `productPhotosAvailable = true`.

That is it — the photo frames switch to `next/image` automatically. If a
single file is still missing, only that card falls back to the bloom.

## Naming convention

Every product expects **three** images:

```
<name>.jpg          main photo (shown on cards + gallery)
<name>-detail.jpg   close-up of the flowers
<name>-wrap.jpg     packaging / wrapping shot
```

## File list (16 products × 3 = 48 files)

| Product               | Base name      |
| --------------------- | -------------- |
| 25 красных роз        | `rose-25`      |
| 51 роза               | `rose-51`      |
| Нежный сборный букет  | `mixed-soft`   |
| Букет с гортензией    | `hydrangea`    |
| Розовые кустовые розы | `spray-roses`  |
| Белые розы            | `white-roses`  |
| Корзина цветов        | `basket`       |
| Цветы в коробке       | `box`          |
| Букет «Маме»          | `mom`          |
| Букет «Свидание»      | `date`         |
| Букет «Премиум»       | `premium`      |
| Сезонные тюльпаны     | `tulips`       |
| Монобукет хризантем   | `chrysanthemum`|
| Букет с эустомой      | `eustoma`      |
| Букет «Нежность»      | `tenderness`   |
| Букет «Яркий день»    | `bright-day`   |

Example for the first product: `rose-25.jpg`, `rose-25-detail.jpg`,
`rose-25-wrap.jpg`.

## Recommended specs

- **Aspect ratio:** 4:5 portrait (cards and gallery are built for it).
- **Size:** ~1200 × 1500 px.
- **Format:** JPG or WebP, optimised to under ~300 KB.
- **Look:** soft, bright, premium — a clean background works best.

Paths are wired in `src/data/products.ts` (the `image` / `images`
fields) — rename there if you prefer different filenames.
