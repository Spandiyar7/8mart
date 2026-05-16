"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Visual-QA "still mode" — when the URL carries `?motion=off`, `?qa=1`
 * or `?scene=freeze`, every motion component freezes so the laid-out
 * site can be screenshotted.
 */
function isStillModeUrl(): boolean {
  if (typeof window === "undefined") return false;
  return /[?&](motion=off|qa=1|scene=freeze)/.test(window.location.search);
}

function subscribe(callback: () => void): () => void {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

const getSnapshot = () =>
  window.matchMedia(QUERY).matches || isStillModeUrl();
const getServerSnapshot = () => false;

/**
 * Returns `true` when motion should be suppressed — either the OS
 * `prefers-reduced-motion` setting is on, or the page is in visual-QA
 * still mode. SSR-safe via `useSyncExternalStore`.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
