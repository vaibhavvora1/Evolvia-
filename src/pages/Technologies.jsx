import React, { useState, useMemo } from 'react';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import TechLogo from '../components/Technology/TechLogo';
import TechMarquee from '../components/Technology/TechMarquee';
import usePageMeta from '../hooks/usePageMeta';
import technologies from '../data/technologies';

const CATEGORIES = [
  'All',
  'Frontend',
  'Backend',
  'Databases',
  'DevOps and Cloud',
  'Tools',
  'AI',
];

export default function Technologies() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  usePageMeta(
    'Core Technology Stack — Evolvia Tech',
    'Explore the battle-tested technologies, frameworks, and cloud platforms powering Evolvia Tech engineering solutions.',
    {
      canonicalUrl: 'https://evolvia.tech/technology',
      ogImage: 'https://evolvia.tech/asset-21.webp',
    }
  );

  const filteredTechnologies = useMemo(() => {
    return (technologies || []).filter((tech) => {
      const matchesCategory =
        activeCategory === 'All' || tech.category === activeCategory;

      const matchesSearch =
        !searchQuery ||
        tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="technologies-page">
      {/* ── Dark PageHeader Band ── */}
      <PageHeader
        tag="TECHNOLOGY DIRECTORY"
        title="Battle-Tested Technologies Engineered for Production."
        subtitle="We select tools for system reliability, typing rigor, and operational longevity. Explore each technology in our stack and how we use it to build robust platforms."
      />

      {/* ── Technology Marquee Strip ── */}
      <section style={{ padding: '24px 0', backgroundColor: 'var(--bg-alt)' }}>
        <TechMarquee technologies={technologies} />
      </section>

      {/* ── Filter Bar & Controls ── */}
      <section className="section section-alt" style={{ padding: '36px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
              }}
              role="group"
              aria-label="Category filters"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--border)',
                    backgroundColor: activeCategory === cat ? 'var(--black)' : 'var(--card)',
                    color: activeCategory === cat ? 'var(--green)' : 'var(--black)',
                    fontWeight: activeCategory === cat ? 700 : 500,
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    transition: 'background-color 0.25s ease, color 0.25s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ width: '100%', maxWidth: '360px' }}>
              <input
                type="text"
                placeholder="Search technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                aria-label="Filter technologies"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Technologies Grid ── */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '20px',
            }}
          >
            {filteredTechnologies.map((tech) => (
              <TechLogo key={tech.slug} technology={tech} />
            ))}
          </div>

          {filteredTechnologies.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
              <p>No technologies matched your filter criteria.</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                style={{ marginTop: '12px' }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Single Dark Accent Section: DarkBand CTA ── */}
      <DarkBand
        tag="ARCHITECT YOUR STACK"
        title="Need Guidance Choosing the Right Stack?"
        description="We help teams evaluate trade-offs and select frameworks that optimize developer ergonomics, scalability, and uptime."
        primaryActionText="Build with Us"
        primaryActionTo="/contact"
        showContact={true}
      />
    </div>
  );
}
