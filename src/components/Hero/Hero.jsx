import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import SpecularButton from '../UI/SpecularButton';
import './Hero.css';

const TECH_KEYWORDS = [
  'AI & MACHINE LEARNING',
  'CLOUD INFRASTRUCTURE',
  'ENTERPRISE WEB APPS',
  'HIGH-SCALE APIS',
  'AUTONOMOUS WORKFLOWS',
  'INTELLIGENT DATA PLATFORMS',
  'CROSS-PLATFORM MOBILE',
];

/* ── Edit company info here ── */
const COMPANY = {
  name: 'EVOLVIA TECH',
  tagline: 'Evolving Ideas into Impact',
  address: 'Maninagar, Ahmedabad',
  email: 'vrvora11@gmail.com',
};

const HEADLINE_LINES = [
  { words: ['WE', 'ARCHITECT'], gradient: false },
  { words: ["WHAT'S", 'NEXT.'], gradient: true },
];

/* ── Right-side floating cards ── */
const VISUAL_CARDS = [
  {
    title: 'AI & Machine Learning',
    icon: (
      <>
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
      </>
    ),
  },
  {
    title: 'Cloud Infrastructure',
    icon: <path d="M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9.5 4.25 4.25 0 0 1 17.5 18H7z" />,
  },
  {
    title: 'Enterprise Web Apps',
    icon: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18M8 21h8" />
      </>
    ),
  },
  {
    title: 'Autonomous Workflows',
    icon: (
      <>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <path d="M8.5 6H14a3 3 0 0 1 3 3v6.5" />
      </>
    ),
  },
];

const EASE = [0.22, 1, 0.36, 1];

const headlineVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const wordVariants = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.75, ease: EASE } },
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

export default function Hero({ onNavigate }) {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [videoAllowed, setVideoAllowed] = useState(false);
  const [keywordIndex, setKeywordIndex] = useState(0);

  /* ── Framer Motion scroll tracking scoped to the hero container ── */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0px', '0px'] : ['0px', '-80px'],
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    shouldReduceMotion ? [1, 1] : [1, 0],
  );
  const videoScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 1.1],
  );
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0.35, 0.35] : [0.2, 0.6],
  );

  /* Rotating keyword text */
  useEffect(() => {
    if (shouldReduceMotion) return undefined;
    const id = setInterval(() => {
      setKeywordIndex((i) => (i + 1) % TECH_KEYWORDS.length);
    }, 2600);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePlaybackPreference = () => {
      setVideoAllowed(!mobile.matches && !motionPreference.matches);
    };

    updatePlaybackPreference();
    mobile.addEventListener('change', updatePlaybackPreference);
    motionPreference.addEventListener('change', updatePlaybackPreference);
    return () => {
      mobile.removeEventListener('change', updatePlaybackPreference);
      motionPreference.removeEventListener('change', updatePlaybackPreference);
    };
  }, []);

  useEffect(() => {
    if (!videoAllowed || !heroRef.current || !videoRef.current) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        videoRef.current?.play().catch(() => {});
      } else {
        videoRef.current?.pause();
      }
    });

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [videoAllowed]);

  const handleAction = (e, path) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      const targetId = path.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const anim = (delay) => (shouldReduceMotion ? {} : fadeUp(delay));

  return (
    <section
      id="home"
      ref={heroRef}
      className="hero-section"
      aria-label="Hero Section"
    >
      {/* ── Background video (scales on scroll) ── */}
      <motion.div className="hero-video-wrapper" style={{ scale: videoScale }}>
        <img
          className="hero-poster"
          src="/hero-poster.webp"
          alt=""
          width="1280"
          height="720"
          fetchPriority="high"
          decoding="async"
        />
        {videoAllowed && (
          <video
            ref={videoRef}
            className="hero-video-bg"
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-poster.webp"
            aria-hidden="true"
          >
            <source src="/hero.webm" type="video/webm" />
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        )}

        <motion.div
          className="hero-video-overlay"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
        <div className="hero-video-vignette" aria-hidden="true" />
      </motion.div>

      {/* ── Main content: left text + right visual ── */}
      <div className="container hero-container">
        {/* LEFT: text */}
        <motion.div
          className="hero-content"
          style={{ y: textY, opacity: textOpacity }}
        >

          {/* Headline: word-by-word mask reveal */}
          <motion.h1
            className="hero-headline"
            aria-label="We architect what's next."
            variants={headlineVariants}
            initial={shouldReduceMotion ? 'show' : 'hidden'}
            animate="show"
          >
            {HEADLINE_LINES.map((line) => (
              <span className="hero-headline-line" key={line.words.join('-')} aria-hidden="true">
                {line.words.map((word) => (
                  <span className="hero-word-mask" key={word}>
                    <motion.span
                      className={`hero-word ${line.gradient ? 'gradient-text' : ''}`}
                      variants={wordVariants}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Rotating keyword line */}
          <motion.div className="hero-rotator" {...anim(0.7)}>
            <span className="hero-rotator-label">WE BUILD</span>
            <span className="hero-rotator-arrow" aria-hidden="true">→</span>
            <span className="hero-rotator-window" aria-live="off">
              <AnimatePresence mode="wait">
                <motion.span
                  key={keywordIndex}
                  className="hero-rotator-word"
                  initial={shouldReduceMotion ? false : { y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {TECH_KEYWORDS[keywordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          {/* Sub-copy */}
          <motion.p className="hero-desc" {...anim(0.85)}>
            We build digital products, intelligent systems, and scalable technology
            experiences that help forward-thinking businesses evolve and thrive.
          </motion.p>

          {/* CTA buttons */}
          <motion.div className="hero-buttons-row" {...anim(1)}>
            <SpecularButton
              variant="primary"
              size="lg"
              onClick={(e) => handleAction(e, '#contact')}
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              }
            >
              BUILD WITH US
            </SpecularButton>

            <SpecularButton
              variant="outline-white"
              size="lg"
              onClick={(e) => handleAction(e, '#works')}
            >
              EXPLORE OUR WORK
            </SpecularButton>
          </motion.div>

          {/* Company info */}
          <motion.div className="hero-info" {...anim(1.15)}>
            <div className="hero-info-item">
              <span className="hero-info-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <span>
                <span className="hero-info-label">Address</span>
                <span className="hero-info-value">{COMPANY.address}</span>
              </span>
            </div>

            <div className="hero-info-item">
              <span className="hero-info-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <span>
                <span className="hero-info-label">Email</span>
                <a className="hero-info-value hero-info-link" href={`mailto:${COMPANY.email}`}>
                  {COMPANY.email}
                </a>
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT: orbit visual with floating cards */}
        <motion.div
          className="hero-visual"
          style={{ y: textY, opacity: textOpacity }}
          aria-hidden="true"
        >
          <div className="hero-orbit hero-orbit-outer" />
          <div className="hero-orbit hero-orbit-inner" />

          <motion.div
            className="hero-core"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          >
            <span className="hero-core-glow" />
            <span className="hero-core-letter">E</span>
          </motion.div>

          {VISUAL_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className={`hero-float-card hero-float-card-${i + 1}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 + i * 0.15, ease: EASE }}
            >
              <div className="hero-float-inner" style={{ '--float-delay': `${i * 0.8}s` }}>
                <span className="hero-float-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {card.icon}
                  </svg>
                </span>
                <span className="hero-float-title">{card.title}</span>
                <span className="hero-float-dot" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Technology ticker ── */}
      <div className="hero-ticker-container" aria-hidden="true">
        <div className="hero-ticker-track hero-ticker-animate">
          {[...TECH_KEYWORDS, ...TECH_KEYWORDS, ...TECH_KEYWORDS].map(
            (tech, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={idx} className="hero-ticker-item">
                <span className="hero-ticker-dot">&bull;</span>
                {tech}
              </span>
            ),
          )}
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="scroll-hint-mouse">
          <span className="scroll-hint-wheel" />
        </span>
        <span className="scroll-hint-label">SCROLL</span>
      </div>
    </section>
  );
}