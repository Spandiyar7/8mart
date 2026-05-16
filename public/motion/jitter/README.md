# Jitter motion assets

Place Jitter-exported Lottie JSON files here. If no file is provided, the site uses Framer Motion fallback animations.

## How it is used

`src/components/motion/LottieSlot.tsx` loads a JSON file from this folder by
name. When the file is missing, the slot renders a code-based Framer Motion
fallback so the layout never breaks.

```tsx
<LottieSlot src="/motion/jitter/badge.json" fallback={<AnimatedBadge />} />
```
