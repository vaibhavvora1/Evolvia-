import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/UI/PageHero';
import HoverCard from '../components/UI/HoverCard';
import { IconArrowRight } from '../components/UI/Icons';
import usePageMeta from '../hooks/usePageMeta';
import useReveal from '../hooks/useReveal';
import { projects } from '../data/demoData';

const CATEGORIES = ['All', 'AI Platform', 'FinTech', 'E-Commerce', 'Cloud Platform'];

export default function Portfolio() {
  usePageMeta(
    'Portfolio & Case Studies — Evolvia Tech',
    'Explore featured engineering case studies, systems architecture, and production solutions developed by Evolvia Tech.',
    {
      canonicalUrl: 'https://evolvia.tech/portfolio',
      ogImage: 'https://evolvia.tech/asset-22.webp',
    }
  );

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const gridRef = useReveal();

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="portfolio-page">
      <PageHero
        tag="PROVEN ARCHITECTURES"
        title="Engineered Case Studies &amp; Delivered Platforms."
        subtitle="Review illustrative system architectures, data models, and product implementations engineered for scalability, latency budgets, and rigorous enterprise compliance."
        image="/asset-22.webp"
        imageAlt="Evolvia Tech Engineering Case Studies"
        actions={
          <Link to="/contact" className="btn btn-primary">
            Discuss Your System <IconArrowRight size={16} />
          </Link>
        }
      />

      {/* ── Filter Pills & Grid ── */}
      <section className="page-section reveal-item" ref={gridRef}>
        <div className="container">
          <div className="section-header-compact">
            <span className="section-tag">CASE ARCHIVE</span>
            <h2 className="section-title-compact">Selected Technical Implementations</h2>
            <p className="section-lead-compact">
              Click a project card to view its complete architecture, technical stack, and outcomes.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="filter-pills-row" role="tablist" aria-label="Filter projects by category">
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
            {filteredProjects.map((proj) => (
              <HoverCard
                key={proj.id}
                title={proj.title}
                tag={proj.category}
                image={proj.image}
                imageAlt={proj.title}
                description={`${proj.shortDescription} Stack: ${proj.technologies.slice(0, 3).join(', ')}.`}
                actionText="View case study"
                onClick={() => setSelectedProject(proj)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Selected Project Architecture Spotlight ── */}
      {selectedProject && (
        <section className="page-section bg-alt" aria-labelledby="spotlight-title">
          <div className="container project-spotlight-card">
            <div className="spotlight-header">
              <div>
                <span className="section-tag">{selectedProject.category} &bull; {selectedProject.year}</span>
                <h2 id="spotlight-title" className="spotlight-title">{selectedProject.title}</h2>
              </div>
              <span className="spotlight-metric-badge">{selectedProject.metric}</span>
            </div>

            <p className="spotlight-solution">{selectedProject.solution}</p>

            <div className="spotlight-details-grid">
              <div className="spotlight-box">
                <h4>Core Challenges &amp; Focus</h4>
                <p>{selectedProject.challenge}</p>
                <ul className="spotlight-list">
                  {selectedProject.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>

              <div className="spotlight-box">
                <h4>Architecture &amp; Components</h4>
                <ul className="spotlight-list">
                  {selectedProject.architecture.map((arch, i) => (
                    <li key={i}>{arch}</li>
                  ))}
                </ul>
              </div>

              <div className="spotlight-box">
                <h4>Technologies Used</h4>
                <div className="tags-flex-wrap">
                  {selectedProject.technologies.map((t) => (
                    <span key={t} className="tech-badge-item">{t}</span>
                  ))}
                </div>
                <h4 style={{ marginTop: '16px' }}>Outcome</h4>
                <p>{selectedProject.result}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ── */}
      <section className="page-section">
        <div className="container cta-banner-card">
          <h2>Ready to architect your product?</h2>
          <p>We work with fixed milestones, transparent communication, and clean versioned deliverables.</p>
          <Link to="/contact" className="btn btn-primary">
            Start Your Project <IconArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
