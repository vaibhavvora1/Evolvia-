import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop
 * ───────────
 * On route change:
 *  1. Kill all stale ScrollTriggers from the previous route (lazy, non-blocking)
 *  2. If Lenis is ready → lenis.scrollTo(0, { immediate: true })
 *  3. Fallback → window.scrollTo({ top:0, behavior:'instant' })
 *
 * Also handles hash links: if the new URL has a hash, Lenis scrolls to
 * that element (with an 80px header offset); otherwise resets to top.
 */
export default function ScrollToTop({ lenisRef }) {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const isRouteChange = prevPathname.current !== pathname;
    prevPathname.current = pathname;

    // Kill stale ScrollTriggers on route change (lazy import — non-blocking)
    if (isRouteChange) {
      import('../../lib/gsap.js')
        .then(({ ScrollTrigger }) => {
          ScrollTrigger.getAll().forEach((t) => t.kill());
        })
        .catch(() => {});
    }

    if (hash) {
      // Let the DOM settle, then scroll to the hash target
      const id = setTimeout(() => {
        const target = document.querySelector(hash);
        if (!target) return;
        if (lenisRef?.current) {
          lenisRef.current.scrollTo(target, { offset: -80 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
      return () => clearTimeout(id);
    }

    // Scroll to top on route change (no hash)
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash, lenisRef]);

  return null;
}