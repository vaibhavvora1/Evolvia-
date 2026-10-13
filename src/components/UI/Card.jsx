import React, { useEffect, useMemo, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import './Card.css';

const EASE = [0.22, 1, 0.36, 1];

export default function Card({
  as = 'div',
  children,
  className = '',
  index = 0,
  variant = 'default',
  featured = false,
  scrollDriven = false,
  stagger = 0.08,
  initialX = 0,
}) {
  const Element = motion[as] || motion.div;
  const reduceMotion = useReducedMotion();
  const elementRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const boundsRef = useRef(null);
  const frameRef = useRef(0);
  const style = { '--card-tilt-x': '0deg', '--card-tilt-y': '0deg' };

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    pointerRef.current = { x: event.clientX, y: event.clientY };
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0;
      const element = elementRef.current;
      const bounds = boundsRef.current;
      if (!element || !bounds) return;

      const localX = pointerRef.current.x - bounds.left;
      const localY = pointerRef.current.y - bounds.top;
      const nx = localX / bounds.width - 0.5;
      const ny = localY / bounds.height - 0.5;

      /* Spotlight cursor position */
      element.style.setProperty('--spotlight-x', `${localX}px`);
      element.style.setProperty('--spotlight-y', `${localY}px`);

      /* 3-D tilt only on project cards */
      if (variant === 'project') {
        element.style.setProperty('--card-tilt-x', `${-ny * 6}deg`);
        element.style.setProperty('--card-tilt-y', `${nx * 6}deg`);
      }
    });
  };

  const resetPointer = (event) => {
    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    boundsRef.current = null;
    event.currentTarget.style.setProperty('--card-tilt-x', '0deg');
    event.currentTarget.style.setProperty('--card-tilt-y', '0deg');
  };

  return (
    <Element
      className={`motion-card motion-card--${variant}${featured ? ' motion-card--featured' : ''} ${className}`}
      ref={elementRef}
      style={style}
      /* Fade up 40px, staggered by index, once in view */
      initial={reduceMotion || scrollDriven ? false : { opacity: 0, y: 40, x: initialX }}
      whileInView={reduceMotion || scrollDriven ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={scrollDriven ? undefined : { once: true, amount: 0.1, margin: '-80px 0px' }}
      onViewportEnter={(entry) => entry.target.classList.add('in-view')}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={scrollDriven ? { duration: 0.25, ease: EASE } : { duration: 0.7, delay: Math.min(index * stagger, 0.48), ease: EASE }}
      onPointerEnter={(event) => { boundsRef.current = event.currentTarget.getBoundingClientRect(); }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      onBlur={resetPointer}
    >
      {children}
    </Element>
  );
}

export function PointsList({ items = [], className = 'point-list' }) {
  if (!items.length) return null;

  return (
    <ul className={className}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export function AnimatedMetric({ value }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.7 });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const match = useMemo(() => value.match(/(\d+(?:\.\d+)?)/), [value]);
  const target = match ? Number(match[1]) : 0;
  const decimalPlaces = match?.[1].includes('.') ? match[1].split('.')[1].length : 0;
  const display = useTransform(count, (number) => (
    match
      ? value.replace(match[1], number.toFixed(decimalPlaces).padStart(match[1].length, '0'))
      : value
  ));

  useEffect(() => {
    if (!match) return undefined;
    if (reduceMotion) { count.set(target); return undefined; }
    if (!visible) { count.set(0); return undefined; }
    const animation = animate(count, target, { duration: 0.72, ease: EASE });
    return () => animation.stop();
  }, [count, match, reduceMotion, target, visible]);

  return (
    <motion.span
      ref={ref}
      aria-label={value}
      style={{ minWidth: `${value.length}ch`, display: 'inline-block', fontVariantNumeric: 'tabular-nums' }}
    >
      {display}
    </motion.span>
  );
}
