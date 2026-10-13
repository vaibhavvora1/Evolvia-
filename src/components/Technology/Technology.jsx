import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Reveal from '../UI/Reveal';
import Orbit from '../UI/Orbit';
import Card from '../UI/Card';
import './Technology.css';

const ARCH_PILLARS = [
  {
    title: 'Cloud-Native & Distributed',
    desc: 'Microservices containerized with Docker & Kubernetes for zero single-point-of-failure deployment.',
  },
  {
    title: 'Low Latency State Engines',
    desc: 'Distributed in-memory caching and vector indexes delivering sub-millisecond query response.',
  },
  {
    title: 'Autonomous AI Integration',
    desc: 'Model-agnostic pipelines with fine-tuned embeddings, retrieval-augmented reasoning, and guardrails.',
  },
];

const EASE = [0.22, 1, 0.36, 1];

export default function Technology() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="technology" className="technology-section" aria-label="Technology Stack">
      {/* Floating background blobs */}
      <span className="technology-blob technology-blob--1" aria-hidden="true" />
      <span className="technology-blob technology-blob--2" aria-hidden="true" />

      <div className="container">

        {/* Section Header */}
        <div className="text-center max-w-720 mx-auto mb-5 pb-lg-3">
          <span className="section-tag">ENGINEERING FOUNDATION</span>
          <Reveal tag="h2" className="section-title">
            POWERED BY MODERN TECHNOLOGY.
          </Reveal>
          <p className="section-subtitle mx-auto">
            We leverage a resilient, future-ready technology ecosystem engineered to maximize
            execution speed, computational reliability, and system maintainability.
          </p>
        </div>

        {/* Orbit Component Showcase: scales in on scroll */}
        <motion.div
          className="technology-orbit-wrapper mb-5 pb-lg-4"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <Orbit />
        </motion.div>

        {/* 3 Architectural Pillars */}
        <div className="row g-4 mb-5 pt-3">
          {ARCH_PILLARS.map((pillar, idx) => (
            <div key={pillar.title} className="col-12 col-md-4">
              <Card className="tech-pillar-card" index={idx}>
                <span className="pillar-num">0{idx + 1}</span>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.desc}</p>
              </Card>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}