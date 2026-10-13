import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Reveal from '../UI/Reveal';
import Card, { AnimatedMetric } from '../UI/Card';
import './About.css';

const STATS_DATA = [
  { target: 25, suffix: '+', label: 'Delivered Projects', sub: 'High-impact solutions' },
  { target: 15, suffix: '+', label: 'Core Technologies', sub: 'Modern cloud & AI stack' },
  { target: 20, suffix: '+', label: 'Global Clients', sub: 'Enterprise & venture scale' },
  { target: 99, suffix: '%', label: 'Commitment Rate', sub: 'On-time milestone delivery' },
];

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="about-section" aria-label="About Evolvia">
      <div className="container">
        
        {/* Section Header */}
        <div className="about-intro-layout row align-items-center g-5 mb-5 pb-lg-3">
          <div className="col-12 col-lg-5">
            <motion.figure
              className="about-image-frame"
              initial={reduceMotion ? false : { opacity: 0, x: -36 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="/about.webp"
                alt="About Evolvia"
                width="910"
                height="865"
                loading="lazy"
                decoding="async"
              />
            </motion.figure>
          </div>
          <div className="col-12 col-lg-7">
            <div className="about-intro-copy">
              <span className="section-tag">ABOUT EVOLVIA</span>
              <Reveal tag="h2" className="section-title">
                Technology should make complex things feel simple.
              </Reveal>
              <p className="lead-editorial">
                At Evolvia, we bridge ambitious vision and disciplined execution. We engineer
                digital platforms, intelligent systems, and scalable cloud architectures that
                empower market leaders to operate faster, smarter, and with complete confidence.
              </p>
              <p className="sub-editorial">
                Founded on the belief that software should be robust, elegant, and future-proof,
                our multidisciplinary engineering team combines computational precision with
                world-class user experience.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="row g-4 mb-5 pb-lg-4">
          <div className="col-12 col-md-4">
            <Card className="about-card" index={0}>
              <div className="about-card-icon" data-card-icon aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="about-card-title">Disciplined Architecture</h3>
              <p className="about-card-desc">
                We design fault-tolerant, modular architectures built to sustain heavy computational loads and scale seamlessly.
              </p>
            </Card>
          </div>

          <div className="col-12 col-md-4">
            <Card className="about-card about-card--featured" index={1}>
              <div className="about-card-icon" data-card-icon aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.93 4.93 4.24 4.24M14.83 9.17l4.24-4.24M14.83 14.83l4.24 4.24M9.17 14.83l-4.24 4.24" />
                </svg>
              </div>
              <h3 className="about-card-title">Applied Intelligence</h3>
              <p className="about-card-desc">
                Translating advanced machine learning and automation into practical levers that generate measurable commercial return.
              </p>
            </Card>
          </div>

          <div className="col-12 col-md-4">
            <Card className="about-card" index={2}>
              <div className="about-card-icon" data-card-icon aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="about-card-title">Reliability by Design</h3>
              <p className="about-card-desc">
                From automated CI/CD pipelines to stringent security audits, every release is hardened against vulnerability and downtime.
              </p>
            </Card>
          </div>
        </div>

        <div className="about-stats-panel">
          <div className="row g-4 text-center">
            {STATS_DATA.map((item, idx) => (
              <div key={idx} className="col-6 col-lg-3">
                <div className="stat-item">
                  <div className="stat-value-wrap">
                    <span className="stat-number"><AnimatedMetric value={String(item.target)} /></span>
                    <span className="stat-suffix">{item.suffix}</span>
                  </div>
                  <h4 className="stat-label">{item.label}</h4>
                  <p className="stat-sub">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
