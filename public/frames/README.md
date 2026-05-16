# Frame textures (optional)

The photo frames (`src/components/frames/`) are drawn entirely in code —
glass borders, shadows, highlights and decorative corners — so this
folder is **optional**.

Use it only if you want to layer a custom decorative frame texture or
border on top of a photo (e.g. a gilded corner PNG, a paper texture).

## Suggested files (optional)

```
corner-floral.png   transparent PNG, decorative corner overlay
border-gold.png     transparent PNG, thin ornamental border
paper-texture.jpg   subtle paper grain for editorial frames
```

To use one, import it inside a frame component in
`src/components/frames/` and position it as an absolute overlay.
