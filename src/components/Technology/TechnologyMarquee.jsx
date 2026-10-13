import React, { useEffect, useRef } from 'react';
import { motion, useAnimationControls, useInView, useReducedMotion } from 'framer-motion';
import TechnologyItem from './TechnologyItem';
import './TechnologyComponents.css';

export default function TechnologyMarquee({
  technologies = [],
  direction = 'left',
  speed = 36,
  className = '',
}) {
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();
  const marqueeRef = useRef(null);
  const inView = useInView(marqueeRef, { margin: '100px' });
  const offset = direction === 'left' ? '-50%' : '0%';

  const start = () =>
    controls.start({
      x: offset,
      transition: { duration: speed, repeat: Infinity, ease: 'linear' },
    });

  useEffect(() => {
    if (technologies.length < 2 || reduceMotion || !inView) {
      controls.stop();
      return undefined;
    }

    start();
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls, inView, offset, reduceMotion, speed, technologies.length]);

  const pause = () => controls.stop();
  const resume = () => {
    if (!reduceMotion && inView && technologies.length > 1) start();
  };

  return (
    <motion.div
      className={`technology-marquee ${className}`}
      ref={marqueeRef}
      aria-label="Explore our technology ecosystem"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) resume();
      }}
    >
      <motion.div
        className="technology-marquee__track"
        animate={controls}
        initial={{ x: direction === 'left' ? '0%' : '-50%' }}
      >
        {[0, 1].map((copy) => (
          <div
            className="technology-marquee__group"
            aria-hidden={copy === 1 ? 'true' : undefined}
            key={copy}
          >
            {technologies.map((technology) => (
              <TechnologyItem
                key={`${copy}-${technology.slug}`}
                technology={technology}
                variant="marquee"
                showCategory={false}
                tabIndex={copy === 1 ? -1 : undefined}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}