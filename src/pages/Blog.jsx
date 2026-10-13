import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/UI/PageHero';
import HoverCard from '../components/UI/HoverCard';
import { IconArrowRight } from '../components/UI/Icons';
import usePageMeta from '../hooks/usePageMeta';
import useReveal from '../hooks/useReveal';
import { blog } from '../data/demoData';

export default function Blog() {
  usePageMeta(
    'Engineering Insights & Perspectives — Evolvia Tech',
    'Technical essays, architecture notes, and software design insights from the engineering team at Evolvia Tech.',
    {
      canonicalUrl: 'https://evolvia.tech/blog',
      ogImage: 'https://evolvia.tech/asset-10.webp',
    }
  );

  const [activeArticle, setActiveArticle] = useState(blog[0]);
  const blogGridRef = useReveal();

  return (
    <div className="blog-page">
      <PageHero
        tag="PERSPECTIVES & ESSAYS"
        title="Engineering Notes, Architectural Decisions &amp; Real Constraints."
        subtitle="We document what we learn building distributed systems, applying language models, and scaling cloud platforms under actual operating conditions."
        image="/asset-10.webp"
        imageAlt="Evolvia Tech Engineering Insights"
        actions={
          <Link to="/contact" className="btn btn-primary">
            Discuss an Essay <IconArrowRight size={16} />
          </Link>
        }
      />

      {/* ── Articles Grid (Hover Cards) ── */}
      <section className="page-section reveal-item" ref={blogGridRef}>
        <div className="container">
          <div className="section-header-compact">
            <span className="section-tag">PUBLICATIONS</span>
            <h2 className="section-title-compact">Recent Engineering Articles</h2>
            <p className="section-lead-compact">
              Click an article card to view its thesis, key takeaways, and discussion summary.
            </p>
          </div>

          <div className="compact-cards-grid">
            {blog.map((post) => (
              <HoverCard
                key={post.id}
                title={post.title}
                tag={`${post.category} &bull; ${post.readTime}`}
                image={post.image}
                imageAlt={post.title}
                description={`${post.date}. Points: ${post.points.join('. ')}.`}
                actionText="Read essay"
                onClick={() => setActiveArticle(post)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Active Article Reader Summary ── */}
      {activeArticle && (
        <section className="page-section bg-alt" aria-labelledby="active-article-title">
          <div className="container article-spotlight-box">
            <span className="section-tag">{activeArticle.category} &bull; {activeArticle.date} &bull; {activeArticle.readTime} read</span>
            <h2 id="active-article-title" className="article-spotlight-title">{activeArticle.title}</h2>
            
            <div className="article-points-card">
              <h4>Key Architectural Takeaways</h4>
              <ul className="spotlight-list">
                {activeArticle.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>

            <div className="article-tags-wrap">
              {activeArticle.tags.map((t) => (
                <span key={t} className="tech-badge-item">#{t}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ── */}
      <section className="page-section">
        <div className="container cta-banner-card">
          <h2>Have thoughts or questions on our writing?</h2>
          <p>We welcome technical debate and dialogue with fellow engineers and system architects.</p>
          <Link to="/contact" className="btn btn-primary">
            Connect With Our Writers <IconArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
