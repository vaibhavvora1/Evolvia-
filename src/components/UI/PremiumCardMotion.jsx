import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import './PremiumCardMotion.css';

const SPRING = { stiffness: 120, damping: 22 };

const GRADIENTS = [
  ['var(--accent)', 'var(--accent-deep)'],
  ['var(--accent-deep)', 'var(--accent)'],
  ['var(--accent)', 'var(--accent-deep)'],
  ['var(--accent)', 'var(--accent)'],
  ['var(--accent)', 'var(--accent)'],
  ['var(--accent-deep)', 'var(--accent)'],
];

export default function PremiumCardMotion({
  index = 0,
  columns = 3,
  tabletColumns = Math.min(columns, 2),
  mobileColumns = 1,
  mobileBreakpoint = 575,
  className = '',
  children,
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [compactMotion, setCompactMotion] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px), (pointer: coarse)').matches
  ));
  const [responsiveColumns, setResponsiveColumns] = useState(() => {
    if (typeof window === 'undefined') return columns;
    if (window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches) return mobileColumns;
    if (window.matchMedia('(max-width: 991px)').matches) return tabletColumns;
    return columns;
  });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const columnOffset = (index % responsiveColumns) * 5;
  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.25, 1], [compactMotion ? 24 + columnOffset : 60 + columnOffset, 0, compactMotion ? -10 : -30]),
    SPRING,
  );
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.25, 1], [0, 1, 0.4]), SPRING);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.25, 1], [0.92, 1, 0.97]), SPRING);
  const scrollRotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.4, 1], [compactMotion ? 0 : 8, 0, 0]),
    SPRING,
  );
  const pointerRotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), SPRING);
  const pointerRotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), SPRING);
  const rotateX = useSpring(
    useTransform([scrollRotateX, pointerRotateX], ([scrollValue, pointerValue]) => scrollValue + pointerValue),
    SPRING,
  );
  const rotateY = pointerRotateY;
  const borderAngle = useSpring(useTransform(scrollYProgress, [0, 1], ['0deg', '360deg']), SPRING);
  const imageParallax = useTransform(scrollYProgress, [0, 1], [`${compactMotion ? 8 : 20}px`, `${compactMotion ? -8 : -20}px`]);
  const iconParallax = useTransform(scrollYProgress, [0, 1], [`${compactMotion ? -3 : -7}px`, `${compactMotion ? 3 : 7}px`]);
  const progress = useTransform(scrollYProgress, [0, 0.45], [0, 1], { clamp: true });
  const gradient = GRADIENTS[index % GRADIENTS.length];

  useEffect(() => {
    const compactQuery = window.matchMedia('(max-width: 767px), (pointer: coarse)');
    const tabletQuery = window.matchMedia('(max-width: 991px)');
    const mobileQuery = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`);
    const update = () => {
      setCompactMotion(compactQuery.matches);
      setResponsiveColumns(mobileQuery.matches ? mobileColumns : tabletQuery.matches ? tabletColumns : columns);
    };
    update();
    compactQuery.addEventListener('change', update);
    tabletQuery.addEventListener('change', update);
    mobileQuery.addEventListener('change', update);
    return () => {
      compactQuery.removeEventListener('change', update);
      tabletQuery.removeEventListener('change', update);
      mobileQuery.removeEventListener('change', update);
    };
  }, [columns, mobileBreakpoint, mobileColumns, tabletColumns]);

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType !== 'mouse' || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    pointerX.set(x / bounds.width - 0.5);
    pointerY.set(y / bounds.height - 0.5);
    ref.current.style.setProperty('--mx', `${x}px`);
    ref.current.style.setProperty('--my', `${y}px`);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`premium-card-motion ${className}`.trim()}
      style={{
        '--g1': gradient[0],
        '--g2': gradient[1],
        ...(reduceMotion ? {} : {
          y,
          opacity,
          scale,
          rotateX: compactMotion ? 0 : rotateX,
          rotateY,
          transformPerspective: 1000,
          '--premium-border-angle': borderAngle,
          '--card-image-y': imageParallax,
          '--card-icon-y': iconParallax,
          '--card-progress': progress,
        }),
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
      <motion.span className="premium-card-progress" style={reduceMotion ? undefined : { scaleX: progress }} aria-hidden="true" />
      <span className="premium-card-glow" aria-hidden="true" />
      <span className="premium-card-spotlight" aria-hidden="true" />
      <span className="premium-card-shine" aria-hidden="true" />
      <span className="premium-card-ring" aria-hidden="true" />
      <span className="premium-card-bar" aria-hidden="true" />
    </motion.div>
  );
}