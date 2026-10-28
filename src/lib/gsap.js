/**
 * src/lib/gsap.js
 * ───────────────
 * Single registration point for GSAP + ScrollTrigger.
 * Import { gsap, ScrollTrigger } from here.
 *
 * Rules:
 * • Only gsap core + ScrollTrigger are imported — no other plugins.
 * • Plugin is registered once here; never re-register in component files.
 * • Dynamic-imported by hooks/components so it stays out of the initial bundle.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
