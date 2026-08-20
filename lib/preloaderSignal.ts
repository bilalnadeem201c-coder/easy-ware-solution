// lib/preloaderSignal.ts
// Single source of truth for "has the preloader finished?"
// Replaces independent setTimeout guesses in HeroSection / particle-cube.html
// with one real, fired-once signal that any client component can listen for.

const EVENT_NAME = "easyware-preloader-done";

declare global {
  interface Window {
    __easywarePreloaderDone?: boolean;
  }
}

/** Call this exactly when the preloader is actually done (or skipped). */
export function markPreloaderDone() {
  if (typeof window === "undefined") return;
  if (window.__easywarePreloaderDone) return; // only ever fires once
  window.__easywarePreloaderDone = true;
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function isPreloaderDone(): boolean {
  if (typeof window === "undefined") return false;
  return !!window.__easywarePreloaderDone;
}

/**
 * Subscribe to the "preloader is done" signal.
 * If it already fired before you called this, the callback runs immediately.
 * Returns an unsubscribe function for cleanup.
 */
export function onPreloaderDone(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  if (window.__easywarePreloaderDone) {
    callback();
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
