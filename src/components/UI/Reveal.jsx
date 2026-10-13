import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './Reveal.css';

export default function Reveal({
  children,
  tag: Tag = 'h2',
  className = '',
  delay = 0,
  duration = 0.72,
  yOffset = 40,
  style = {},
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[Tag] || motion.h2;

  return (
    <MotionTag
      className={`reveal ${className}`}
      style={style}
      {...props}
      initial={reduceMotion ? false : { opacity: 0, y: yOffset }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '-80px 0px' }}
      transition={{ duration: Math.min(duration, 0.8), delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
