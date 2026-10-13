import React, { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import technologies, { findTechnology, TECHNOLOGY_ORBIT_SLUGS } from '../../data/technologies';
import TechnologyItem from '../Technology/TechnologyItem';
import './Orbit.css';

const TECH_NODES = TECHNOLOGY_ORBIT_SLUGS
  .map((slug) => technologies.find((technology) => technology.slug === slug) || findTechnology(slug))
  .filter(Boolean);

export default function Orbit() {
  const orbitRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(orbitRef, { margin: '100px' });
  const revealed = useInView(orbitRef, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);
  const orbitDuration = hovered ? 160 : 38;

  const total = TECH_NODES.length;
  const paused = reduceMotion || !inView;

  return (
    <div
      ref={orbitRef}
      className={`orbit-container ${paused ? 'is-paused' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHovered(false);
      }}
      aria-label="Technology orbit"
    >
      {/* Decorative concentric background rings */}
      <div className="orbit-bg-ring orbit-bg-ring--outer" aria-hidden="true" />
      <div className="orbit-bg-ring orbit-bg-ring--inner" aria-hidden="true" />

      {/* Orbiting Ring carrying the nodes */}
      <motion.div
        className="orbit-ring"
        animate={paused ? undefined : { rotate: 360 }}
        transition={paused ? undefined : { duration: orbitDuration, repeat: Infinity, ease: 'linear' }}
      >
        {TECH_NODES.map((node, i) => {
          const angle = (i / total) * 360;
          return (
            <div
              key={node.slug || node.name}
              className="orbit-node-wrapper"
              style={{
                transform: `rotate(${angle}deg) translate(var(--orbit-radius))`,
              }}
            >
              {/* Centers the pill on the ring point */}
              <div className="orbit-node-center">
                {/* Pop-in entrance */}
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.3 }}
                  animate={revealed || reduceMotion ? { opacity: 1, scale: 1 } : undefined}
                  transition={{
                    type: 'spring',
                    stiffness: 180,
                    damping: 14,
                    delay: reduceMotion ? 0 : 0.15 + i * 0.09,
                  }}
                >
                  {/* Counter-rotation keeps the pill upright */}
                  <motion.div
                    className="orbit-node"
                    style={{ rotate: -angle }}
                    animate={paused ? undefined : { rotate: -angle - 360 }}
                    transition={paused ? undefined : { duration: orbitDuration, repeat: Infinity, ease: 'linear' }}
                  >
                    <TechnologyItem technology={node} variant="orbit" showCategory={false} />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Center Core */}
      <div className="orbit-center">
        <span className="orbit-ripple orbit-ripple--1" aria-hidden="true" />
        <span className="orbit-ripple orbit-ripple--2" aria-hidden="true" />
        <span className="orbit-ripple orbit-ripple--3" aria-hidden="true" />
        <span className="orbit-center-spin" aria-hidden="true" />
        <div className="orbit-center-glow" aria-hidden="true" />
        <div className="orbit-center-text">
          <span className="orbit-center-sub">DIGITAL</span>
          <span className="orbit-center-main">ENGINEERING</span>
        </div>
      </div>
    </div>
  );
}