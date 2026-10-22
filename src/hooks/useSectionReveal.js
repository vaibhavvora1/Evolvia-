/**
 * src/hooks/useSectionReveal.js
 * ─────────────────────────────
 * Fade-up reveal for individual elements (section headings, detail heroes,
 * CTA blocks, etc.). Returns a ref to attach to any DOM element.
 *
 * Usage:
 *   const ref = useSectionReveal();
 *   <h2 ref={ref}>…</h2>
 *
 * Options:
 *   y     – initial y offset in px (default: 32)
 *   start – ScrollTrigger start (default: 'top 85%')
 *
 * Behaviour:
 * • Skips animation when prefers-reduced-motion is on
 * • Sets initial hidden state with gsap.set inside the context (no CSS hiding)
 * • clearProps after animation so CSS hover & layout remain intact
 * • ctx.revert() on unmount — no orphan ScrollTriggers
 * • Defers GSAP import by one rAF so it does not compete with initial paint
 */
import { useEffect, useRef } from 'react';

export default function useSectionReveal({ y = 32, start = 'top 85%' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    let ctx = null;
    let rafId = null;
    let cancelled = false;

    // Defer by one rAF so this import does not compete with initial page paint.
    rafId = window.requestAnimationFrame(() => {
      rafId = null;
      if (cancelled) return;

      import('../lib/gsap.js').then(({ gsap, ScrollTrigger }) => {
        if (cancelled || !ref.current) return; // unmounted before import resolved

        ctx = gsap.context(() => {
          gsap.set(el, { opacity: 0, y });

          ScrollTrigger.create({
            trigger: el,
            start,
            once: true,
            onEnter: () => {
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power2.out',
                onComplete: () => {
                  gsap.set(el, { clearProps: 'transform,opacity' });
                },
              });
            },
          });
        }, el);
      }).catch(() => {});
    });

    return () => {
      cancelled = true;
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      if (ctx) ctx.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
