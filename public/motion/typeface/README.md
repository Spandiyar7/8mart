# Typeface Animator assets

Place Typeface Animator exports here if needed. The current website recreates premium typography motion in code.

## How it is used

Kinetic typography is implemented in `src/components/motion/KineticTitle.tsx`
and `src/components/motion/AnimatedWords.tsx` using Framer Motion — word and
letter reveals, blur-to-clear transitions and soft perspective movement.

If you export a Lottie text animation from Typeface Animator, drop the JSON
here and render it through `LottieSlot`.
