import React from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import './ScrollSectionEffects.css';

const SPRING = { stiffness: 120, damping: 22 };

export function ScrollHeading({ as = 'div', className = '', children, ...props }) {
  const ref = React.useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useSpring(useTransform(scrollYProgress, [0, 0.3, 1], [26, 0, -12]), SPRING);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.25, 1], [0, 1, 0.45]), SPRING);
  const Element = motion[as] || motion.div;

  return (
    <Element ref={ref} className={className} style={reduceMotion ? undefined : { y, opacity }} {...props}>
      {children}
    </Element>
  );
}

export function ScrollSectionBlobs({ targetRef }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start end', 'end start'] });
  const firstY = useSpring(useTransform(scrollYProgress, [0, 1], [-54, 54]), SPRING);
  const secondY = useSpring(useTransform(scrollYProgress, [0, 1], [42, -42]), SPRING);

  return (
    <div className="scroll-section-blobs" aria-hidden="true">
      <motion.span className="scroll-section-blob scroll-section-blob--1" style={reduceMotion ? undefined : { y: firstY }} />
      <motion.span className="scroll-section-blob scroll-section-blob--2" style={reduceMotion ? undefined : { y: secondY }} />
    </div>
  );
}