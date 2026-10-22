/**
 * src/lib/gsap.js
 * ───────────────
 * Single registration point for GSAP + ScrollTrigger.
 * Import { gsap, ScrollTrigger, mm, prefersReducedMotion } from here.
 *
 * Rules:
 * • Only gsap core + ScrollTrigger are imported — no other plugins.
 * • Plugin is registered once here; never re-register in component files.
 * • Dynamic-imported by hooks/components so it stays out of the initial bundle.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * True when the OS/browser prefers reduced motion.
 * Checked once at module load — stable for the session.
 */
export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Convenience alias for gsap.matchMedia() */
export const mm = gsap.matchMedia();

export { gsap, ScrollTrigger };
