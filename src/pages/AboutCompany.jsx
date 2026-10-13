import React from 'react';
import { useNavigate } from 'react-router-dom';
import Reveal from '../components/UI/Reveal';
import SpecularButton from '../components/UI/SpecularButton';
import './AboutCompany.css';

const COMPANY_VALUES = [
  {
    title: 'Clarity before complexity',
    description: 'We begin with the goal, constraints, and people involved, then choose an approach that fits.',
  },
  {
    title: 'Useful intelligence',
    description: 'We apply AI and automation to practical problems, with attention to how the solution will be used.',
  },
  {
    title: 'Reliability by design',
    description: 'We value maintainable software, considered architecture, and dependable delivery practices.',
  },
];

export default function AboutCompany() {
  const navigate = useNavigate();

  return (
    <div className="about-company-page">
      <header className="about-company-hero">
        <div className="container">
          <span className="section-tag">ABOUT EVOLVIA</span>
          <Reveal tag="h1" className="about-company-title">
            Technology should make complex things feel simple.
          </Reveal>
          <p className="about-company-lead">
            Evolvia brings ambitious product ideas and disciplined engineering together
            across software, AI, and cloud.
          </p>
          <SpecularButton
            type="button"
            variant="primary"
            size="lg"
            className="about-company-cta"
            onClick={() => navigate('/#contact')}
          >
            Start a conversation <span aria-hidden="true">→</span>
          </SpecularButton>
        </div>
      </header>

      <section className="container about-company-section" aria-labelledby="about-mission-title">
        <div className="about-company-copy">
          <span className="section-tag">OUR MISSION</span>
          <Reveal tag="h2" className="about-company-heading" id="about-mission-title">
            Turn thoughtful ideas into dependable digital products.
          </Reveal>
          <p>
            We bridge vision and execution by engineering digital platforms,
            intelligent systems, and scalable cloud architectures. Our aim is to make
            useful technology clear to operate, ready to evolve, and grounded in the
            needs of the people who use it.
          </p>
        </div>
      </section>

      <section className="about-company-services" aria-labelledby="about-work-title">
        <div className="container">
          <span className="section-tag">WHAT WE DO</span>
          <Reveal tag="h2" className="about-company-heading" id="about-work-title">
            Engineering across the product lifecycle.
          </Reveal>
          <div className="about-company-grid">
            <article className="about-company-card">
              <span className="about-company-number">01</span>
              <h3>Software &amp; digital products</h3>
              <p>Web and mobile experiences, product platforms, and custom software shaped around real requirements.</p>
            </article>
            <article className="about-company-card">
              <span className="about-company-number">02</span>
              <h3>AI &amp; automation</h3>
              <p>Applied AI, intelligent workflows, and automation designed to support practical business processes.</p>
            </article>
            <article className="about-company-card">
              <span className="about-company-number">03</span>
              <h3>Cloud &amp; DevOps</h3>
              <p>Cloud architecture, delivery pipelines, and infrastructure practices that support dependable software.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="container about-company-section" aria-labelledby="about-approach-title">
        <div className="about-company-copy">
          <span className="section-tag">OUR APPROACH</span>
          <Reveal tag="h2" className="about-company-heading" id="about-approach-title">
            Understand the problem. Build with intent. Keep improving.
          </Reveal>
          <p>
            We start by understanding the context and constraints behind a product
            challenge. From there, we shape an appropriate technical direction, build
            in considered increments, and make room for feedback as the product evolves.
            The result should be clear to use and practical to maintain.
          </p>
        </div>
        <div className="about-company-values">
          {COMPANY_VALUES.map((value) => (
            <article className="about-company-value" key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-company-bottom" aria-label="Contact Evolvia">
        <div className="container about-company-bottom-inner">
          <div>
            <span className="section-tag">LET&apos;S BUILD WITH INTENT</span>
            <h2>Have a challenge worth solving?</h2>
          </div>
          <SpecularButton
            type="button"
            variant="primary"
            size="lg"
            onClick={() => navigate('/#contact')}
          >
            Talk to our team <span aria-hidden="true">→</span>
          </SpecularButton>
        </div>
      </section>
    </div>
  );
}
