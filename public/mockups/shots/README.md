# Shots.so mockup assets

Place Shots.so exported mockups/images/videos here. The current website includes code-based mockup fallbacks.

## How it is used

`src/components/mockups/PhoneMockup.tsx` and
`src/components/mockups/OrderFlowMockup.tsx` render a polished, animated phone
mockup entirely in code (CSS + Framer Motion).

To use a Shots.so export, drop the image/video here and pass its path to the
mockup component's `image` prop.
