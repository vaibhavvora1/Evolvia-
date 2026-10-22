/**
 * src/hooks/useLenis.js
 * ─────────────────────
 * Creates ONE Lenis smooth-scroll instance, driven by the GSAP ticker so that
 * ScrollTrigger stays in sync. Mount ONCE in <Layout>.
 *
 * Returns a ref whose .current is the Lenis instance (null before/after mount).
 *
 * Features
 * ─────────
 * • duration ~1.1, easing cubic ease-out, smoothWheel on, syncTouch off (native touch)
 * • autoRaf off — GSAP ticker drives raf instead
 * • ScrollTrigger.update() called on every Lenis "scroll" event
 * • gsap.ticker.lagSmoothing(0) so GSAP doesn't skip frames
 * • Full cleanup on unmount: ticker removed, Lenis destroyed (React StrictMode safe)
 * • Disabled entirely when prefers-reduced-motion is on
 * • lenis/dist/lenis.css dynamically imported alongside the JS
 * • Deferred initialization: uses requestIdleCallback (or setTimeout fallback)
 *   so Lenis+GSAP chunk download does NOT compete with the initial page render,
 *   improving FCP and LCP on all routes.
 */

import { useEffect, useRef } from 'react';

export default function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Bail out for reduced-motion users — native scroll only
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    let gsapMod = null;
    let lenisInstance = null;
    let tickerCb = null;
    let cancelled = false;
    let idleHandle = null;

    const initLenis = () => {
      if (cancelled) return;

      /**
       * Dynamic import keeps Lenis + GSAP out of the initial bundle.
       * Deferred via requestIdleCallback so it doesn't compete with FCP/LCP.
       */
      Promise.all([
        import('lenis'),
        import('lenis/dist/lenis.css').catch(() => null), // CSS side-effect; silently skip if missing
        import('../lib/gsap.js'),
      ]).then(([LenisModule, , gsapLib]) => {
        if (cancelled) return; // unmounted before imports finished — skip setup

        const Lenis = LenisModule.default ?? LenisModule.Lenis ?? LenisModule;
        const { gsap, ScrollTrigger } = gsapLib;

        gsapMod = gsap;

        // Prevent GSAP from skipping frames when the tab loses focus
        gsap.ticker.lagSmoothing(0);

        lenisInstance = new Lenis({
          duration: 1.1,
          easing: (t) => 1 - Math.pow(1 - t, 3), // cubic ease-out
          smoothWheel: true,
          syncTouch: false,   // native momentum on mobile/touch
          autoRaf: false,     // GSAP ticker drives the raf loop
        });

        // Keep ScrollTrigger in sync on every Lenis scroll event
        lenisInstance.on('scroll', ScrollTrigger.update);

        // Drive Lenis from the GSAP ticker (time is in seconds, Lenis expects ms)
        tickerCb = (time) => lenisInstance.raf(time * 1000);
        gsap.ticker.add(tickerCb);

        lenisRef.current = lenisInstance;

        // Refresh ScrollTrigger after Lenis is up so any triggers already
        // created by page components get accurate scroll positions.
        ScrollTrigger.refresh();
      }).catch(() => {
        // Silently fall back to native scroll on any import failure
      });
    };

    // Defer initialization until the browser is idle so the motion chunk
    // download does not compete with FCP paint on any route.
    if (typeof window.requestIdleCallback === 'function') {
      idleHandle = window.requestIdleCallback(initLenis, { timeout: 2000 });
    } else {
      // Safari / older browsers: short setTimeout as fallback
      idleHandle = window.setTimeout(initLenis, 200);
    }

    return () => {
      cancelled = true;

      // Cancel the idle callback if it hasn't fired yet
      if (idleHandle !== null) {
        if (typeof window.cancelIdleCallback === 'function') {
          window.cancelIdleCallback(idleHandle);
        } else {
          window.clearTimeout(idleHandle);
        }
      }

      // Remove the GSAP ticker callback first so no more raf calls occur
      if (tickerCb && gsapMod) {
        gsapMod.ticker.remove(tickerCb);
      }

      // Destroy the Lenis instance (removes its event listeners too)
      if (lenisInstance) {
        lenisInstance.destroy();
      }

      lenisRef.current = null;
    };
  }, []); // runs once — Lenis is a singleton at Layout level

  return lenisRef;
}
