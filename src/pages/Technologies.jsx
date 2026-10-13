import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/UI/PageHero';
import HoverCard from '../components/UI/HoverCard';
import { IconArrowRight } from '../components/UI/Icons';
import usePageMeta from '../hooks/usePageMeta';
import useReveal from '../hooks/useReveal';
import technologies from '../data/technologies';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'AI', 'Mobile'];

export default function Technologies() {
  usePageMeta(
    'Technologies & Engineering Stack — Evolvia Tech',
    'Explore the modern, resilient programming languages, frameworks, cloud tooling, and AI libraries powering Evolvia Tech solutions.',
    {
      canonicalUrl: 'https://evolvia.tech/technologies',
      ogImage: 'https://evolvia.tech/asset-21.webp',
    }
  );

  const [activeCategory, setActiveCategory] = useState('All');
  const gridRef = useReveal();

  const filteredTech = activeCategory === 'All'
    ? technologies
    : technologies.filter((t) => t.category === activeCategory || t.groups?.includes(activeCategory));

  return (
    <div className="technologies-page">
      <PageHero
        tag="ENGINEERING STACK"
        title="Modern, Battle-Tested Engineering Tools &amp; Runtimes."
        subtitle="We build with dependable, type-safe, and high-throughput foundations. From compiled systems and cloud orchestration to reactive web frontends and multimodal inference."
        image="/asset-21.webp"
        imageAlt="Evolvia Tech Technologies Stack"
        actions={
          <Link to="/contact" className="btn btn-primary">
            Inquire About Your Stack <IconArrowRight size={16} />
          </Link>
        }
      />

      {/* ── Filter Pills & Cards Grid ── */}
      <section className="page-section reveal-item" ref={gridRef}>
        <div className="container">
          <div className="section-header-compact">
            <span className="section-tag">TECHNOLOGY ECOSYSTEM</span>
            <h2 className="section-title-compact">Explore by Domain &amp; Layer</h2>
            <p className="section-lead-compact">
              Each technology is chosen for developer ergonomics, fault isolation, and long-term community stewardship.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="filter-pills-row" role="tablist" aria-label="Filter technologies by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-pill ${activeCategory === cat ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                role="tab"
                aria-selected={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Compact Hover Cards */}
          <div className="compact-cards-grid">
            {filteredTech.map((tech) => (
              <HoverCard
                key={tech.slug}
                title={tech.name}
                tag={`${tech.category} &bull; ${tech.level}`}
                description={tech.description}
                actionText="Tech specifications"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture Best Practices ── */}
      <section className="page-section bg-alt">
        <div className="container quality-callout-grid">
          <div className="quality-item">
            <h3>Type Safety &amp; Clean Contracts</h3>
            <p>Strict schema validations, OpenAPI contracts, and typed clients ensure reliable data handoffs between services.</p>
          </div>
          <div className="quality-item">
            <h3>Observability &amp; Telemetry</h3>
            <p>Every service includes health checks, structured JSON logs, and Prometheus metrics out of the box.</p>
          </div>
          <div className="quality-item">
            <h3>Containerized Portability</h3>
            <p>Uniform Docker and Kubernetes container specifications eliminate environment divergence from local dev to cloud production.</p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="page-section">
        <div className="container cta-banner-card">
          <h2>Have custom framework or migration requirements?</h2>
          <p>Our team assesses legacy systems and designs incremental modernization paths without service downtime.</p>
          <Link to="/contact" className="btn btn-primary">
            Discuss Your Migration <IconArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
