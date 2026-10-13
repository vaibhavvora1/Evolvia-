import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * useLenis — initialises a single Lenis smooth-scroll instance and keeps
 * Its own animation frame loop keeps smooth scrolling independent of UI motion.
 *
 * Returns a ref whose `.current` is the Lenis instance (or null before mount /
 * after unmount).  Pass `lerp` to control the smoothing strength (default 0.08).
 */
export default function useLenis({ lerp = 0.08 } = {}) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : lerp,
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    let frameId = 0;
    const tick = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(tick);
    };
    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [lerp]);

  return lenisRef;
}
