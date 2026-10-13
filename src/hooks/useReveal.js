/**
 * useReveal — IntersectionObserver scroll-reveal hook
 * Animates only `transform` and `opacity` (GPU-only).
 * Respects `prefers-reduced-motion`.
 *
 * Usage:
 *   const ref = useReveal();
 *   <div ref={ref} className="reveal-element">…</div>
 *
 * CSS required (add to the component's stylesheet):
 *   .reveal-element { opacity: 0; transform: translateY(28px); transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out); }
 *   .reveal-element.is-revealed { opacity: 1; transform: translateY(0); }
 *   @media (prefers-reduced-motion: reduce) { .reveal-element { transition: none; } }
 */
import { useEffect, useRef } from 'react';

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

/**
 * @param {IntersectionObserverInit} [options]
 * @returns {React.RefObject<Element>}
 */
export default function useReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) {
      // Skip animation if reduced-motion is set — mark as revealed immediately
      if (el) el.classList.add('is-revealed');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.1, ...options },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}

/**
 * useRevealGroup — observes multiple children inside a container.
 * Adds `is-revealed` to each child with a staggered CSS delay.
 *
 * @param {string} [childSelector='.reveal-item']
 * @param {number} [staggerMs=60]
 * @returns {React.RefObject<Element>}
 */
export function useRevealGroup(childSelector = '.reveal-item', staggerMs = 60) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) {
      if (container) {
        container.querySelectorAll(childSelector).forEach((el) => el.classList.add('is-revealed'));
      }
      return undefined;
    }

    const items = Array.from(container.querySelectorAll(childSelector));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((el, i) => {
            el.style.transitionDelay = `${i * staggerMs}ms`;
            el.classList.add('is-revealed');
          });
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.05 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [childSelector, staggerMs]);

  return containerRef;
}
