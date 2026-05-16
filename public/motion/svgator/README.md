# SVGator assets

Place SVGator exported SVG animations here. The current website includes code-based SVG animation fallbacks.

## How it is used

Animated SVGs live in `src/components/svg/` — `AnimatedLogoMark`,
`AnimatedPetalLine`, `FloralOrnament` and `DeliveryRouteLine`. They are
animated with SMIL / CSS / Framer Motion and need no external files.

To use an SVGator export instead, place the exported `.svg` here and embed it,
or replace the matching component.
