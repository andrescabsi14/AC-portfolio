# Walkthrough: Viewport-Triggered Typewriter

## Changes Made
- Updated `components/ui/Typewriter.tsx` to include a `triggerInView` prop (default `true`).
- Integrated `framer-motion`'s `useInView` hook to detect when the component is fully visible in the viewport.
- Added internal state `hasStarted` to ensure the typing animation only begins once the visibility condition is met.
- Wrapped the rendered output in a `ref` container for the intersection observer.
- Preserved existing functionality (markdown, HTML, speed, startDelay, etc.).

## Verification Steps
1. **Run the development server** (`npm run dev`).
2. Navigate to a page that uses the `Typewriter` component (e.g., the `ProblemsSection`).
3. Scroll the page so the `Typewriter` component is off‑screen. Verify that no typing occurs.
4. Scroll until the component is fully visible. Verify that the typing animation now starts.
5. Ensure components that do not pass `triggerInView` (default) still animate on load.

## Manual Confirmation
The visual behavior matches the intended design: the typewriter effect only initiates when the component enters the viewport, preventing premature animation on page load.

---
*If any issues are observed, please let me know so we can adjust the implementation.*
