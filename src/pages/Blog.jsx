import React, { useMemo, useState } from 'react';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import Card from '../components/UI/Card';
import usePageMeta from '../hooks/usePageMeta';
import { blog } from '../data/blog';
import {
  buildBreadcrumbSchema,
  buildCanonicalUrl,
  buildImageUrl,
  buildWebPageSchema,
} from '../config/seo';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const pageTitle = 'Engineering & AI Blog — Evolvia Tech Ahmedabad';
  const pageDescription =
    'Practical guides on AI development, custom software architecture, React vs Next.js, cloud scaling, and technology adoption in Ahmedabad from Evolvia Tech.';

  usePageMeta(pageTitle, pageDescription, {
    canonicalUrl: buildCanonicalUrl('/blog'),
    ogImage: buildImageUrl('/asset-10.webp'),
    structuredData: [
      buildWebPageSchema({
        title: pageTitle,
        description: pageDescription,
        path: '/blog',
        type: 'CollectionPage',
      }),
      buildBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Blog' },
      ]),
    ],
  });

  const categories = useMemo(() => {
    const unique = Array.from(new Set(blog.map((post) => post.category).filter(Boolean)));
    return ['All', ...unique];
  }, []);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return blog.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        (post.tags || []).some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="blog-page">
      {/* ── Dark PageHeader Band ── */}
      <PageHeader
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Blog' },
        ]}
        tag="ENGINEERING & AI INSIGHTS"
        title="Practical Guides on AI, Software Architecture & Scaling."
        subtitle="Original technical essays, build-vs-buy comparisons, and local business guides from our engineering team in Ahmedabad."
      />

      {/* ── Category Filters & Search ── */}
      <section className="section section-alt" style={{ padding: '32px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
              role="group"
              aria-label="Blog category filters"
            >
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    style={{
                      padding: '9px 18px',
                      borderRadius: 'var(--radius-pill)',
                      border: '1px solid var(--border)',
                      backgroundColor: isActive ? 'var(--black)' : 'var(--card)',
                      color: isActive ? 'var(--green)' : 'var(--black)',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      fontSize: '0.925rem',
                      transition: 'background-color 0.25s ease, color 0.25s ease',
                    }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div style={{ width: '100%', maxWidth: '380px' }}>
                <label htmlFor="blog-search-input" className="sr-only">
                  Search blog articles
                </label>
                <input
                  id="blog-search-input"
                  type="search"
                  placeholder="Search articles by topic, stack, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--card)',
                    color: 'var(--text)',
                    fontSize: '0.95rem',
                  }}
                />
              </div>
              <p style={{ margin: 0, fontSize: '0.925rem', color: 'var(--text-muted)' }}>
                Showing {filteredPosts.length} of {blog.length} articles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Articles Grid ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-header-left">
              <span className="section-tag">PUBLICATIONS</span>
              <h2 className="section-title">Published Guides &amp; Technical Notes</h2>
              <p className="section-subtitle">
                Explore real-world engineering trade-offs, AI adoption guides, and cloud architecture patterns.
              </p>
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid-cards">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  image={post.image}
                  imageAlt={post.imageAlt || post.title}
                  tag={post.category}
                  meta={`${post.date} • ${post.readTime}`}
                  title={post.title}
                  description={post.summary}
                  actionText="Read article →"
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                padding: '40px 24px',
                textAlign: 'center',
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
                No articles matched your current filter.
              </p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Single Dark Accent Section: DarkBand CTA ── */}
      <DarkBand
        tag="ENGAGE"
        title="Discuss an Architectural or AI Decision?"
        description="Talk directly with our engineers in Ahmedabad about custom software, RAG pipelines, or cloud scaling."
        primaryActionText="Start a Conversation"
        primaryActionTo="/contact"
        showContact={true}
      />
    </div>
  );
}
