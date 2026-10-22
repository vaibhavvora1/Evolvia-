/**
 * src/hooks/useGsapReveal.js
 * ──────────────────────────
 * Reusable hook that animates a container's direct children into view
 * using GSAP ScrollTrigger.batch for staggered row-by-row reveals.
 *
 * Usage:
 *   const gridRef = useGsapReveal();
 *   <div ref={gridRef} className="grid-cards">…</div>
 *
 * Options:
 *   childSelector  – CSS selector for children to animate (default: '*')
 *   y              – initial y offset in px (default: 40)
 *   stagger        – stagger between children in seconds (default: 0.1)
 *   start          – ScrollTrigger start (default: 'top 85%')
 *
 * Behaviour:
 * • Skips all animation when prefers-reduced-motion is on (shows content immediately)
 * • Uses lighter animation on small screens (y:20, shorter duration)
 * • Sets will-change only during animation, then clears it
 * • Calls ScrollTrigger.refresh() once after the initial batch is created,
 *   so newly-mounted lazy route content gets accurate scroll positions
 * • Kills all triggers on cleanup — no orphan ScrollTriggers on route change
 * • Defers GSAP import by one rAF so it does not compete with initial paint
 */
import { useEffect, useRef } from 'react';

export default function useGsapReveal({
  childSelector = '*',
  y = 40,
  stagger = 0.1,
  start = 'top 85%',
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Bail out for reduced-motion: show everything immediately
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    let ctx = null;
    let batchTriggers = null;
    let rafId = null;
    let cancelled = false;

    // Defer by one rAF so this import does not compete with initial page paint.
    rafId = window.requestAnimationFrame(() => {
      rafId = null;
      if (cancelled) return;

      // Lazy-load GSAP so it doesn't block first paint
      import('../lib/gsap.js').then(({ gsap, ScrollTrigger }) => {
        if (cancelled || !ref.current) return; // unmounted between import and resolution

        const items = Array.from(container.querySelectorAll(childSelector));
        if (!items.length) return;

        const isSmall = window.innerWidth < 768;
        const animY = isSmall ? 20 : y;
        const animDuration = isSmall ? 0.5 : 0.7;

        ctx = gsap.context(() => {
          // Set initial hidden state inside the context so revert() restores it
          gsap.set(items, { opacity: 0, y: animY });

          batchTriggers = ScrollTrigger.batch(items, {
            start,
            onEnter: (els) => {
              gsap.to(els, {
                opacity: 1,
                y: 0,
                duration: animDuration,
                ease: 'power2.out',
                stagger,
                onStart() {
                  els.forEach((el) => { el.style.willChange = 'transform, opacity'; });
                },
                onComplete() {
                  gsap.set(els, { clearProps: 'transform,opacity,will-change' });
                },
              });
            },
            once: true,
          });

          // Refresh so Lenis / new route content gets correct scroll positions
          ScrollTrigger.refresh();
        }, container);
      }).catch(() => {
        // Silently show content on any import failure
        const els = container
          ? Array.from(container.querySelectorAll(childSelector))
          : [];
        els.forEach((el) => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      });
    });

    return () => {
      cancelled = true;
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      if (ctx) ctx.revert();
      if (batchTriggers) {
        const triggers = Array.isArray(batchTriggers) ? batchTriggers : [batchTriggers];
        triggers.forEach((t) => t && t.kill && t.kill());
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
