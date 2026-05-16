/**
 * Global scroll signal — a tiny module store updated once per frame by
 * `ScrollSceneController`. The WebGL hero reads it (outside React) to
 * drive scroll-linked motion without prop drilling or re-renders.
 */
export interface ScrollSignal {
  /** Raw scroll offset in pixels. */
  y: number;
  /** Hero progress: 0 at top, 1 when the hero is fully scrolled past. */
  hero: number;
}

export const scrollSignal: ScrollSignal = { y: 0, hero: 0 };
