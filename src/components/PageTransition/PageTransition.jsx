import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

const TRANSITION_DURATION = 0.55;
const HOME_SECTION_ROUTES = new Set([
  '/about',
  '/services',
  '/works',
  '/technology',
  '/blog',
  '/careers',
  '/team',
  '/contact',
]);

const variants = {
  initial: { opacity: 0 },
  enter:   { opacity: 1, transition: { duration: TRANSITION_DURATION, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, transition: { duration: TRANSITION_DURATION * 0.6, ease: [0.4, 0, 1, 1] } },
};

export default function PageTransition({ children }) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const transitionKey = HOME_SECTION_ROUTES.has(location.pathname) ? '/' : location.pathname;
  const pageVariants = reduceMotion
    ? { initial: { opacity: 1 }, enter: { opacity: 1 }, exit: { opacity: 1 } }
    : variants;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={transitionKey}
        className="page-transition-wrapper"
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
