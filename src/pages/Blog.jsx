import React from 'react';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import Card from '../components/UI/Card';
import usePageMeta from '../hooks/usePageMeta';
import { blog } from '../data/blog';

export default function Blog() {
  usePageMeta(
    'Engineering Perspectives & Lab Notes — Evolvia Tech',
    'Technical essays, architecture decisions, and software design insights from the engineering team at Evolvia Tech.',
    {
      canonicalUrl: 'https://evolvia.tech/blog',
      ogImage: 'https://evolvia.tech/asset-10.webp',
    }
  );

  return (
    <div className="blog-page">
      {/* ── Dark PageHeader Band ── */}
      <PageHeader
        tag="ENGINEERING DISPATCHES"
        title="Architecture Notes, Technical Trade-Offs & Real Constraints."
        subtitle="We document what we learn building distributed systems, applying language models, and scaling cloud platforms under actual operating conditions."
      />

      {/* ── Articles Grid ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-header-left">
              <span className="section-tag">RECENT PUBLICATIONS</span>
              <h2 className="section-title">Published Essays &amp; Notes</h2>
              <p className="section-subtitle">
                Click on any card to read our thesis, architectural takeaways, and practical lessons.
              </p>
            </div>
          </div>

          <div className="grid-cards">
            {blog.map((post) => (
              <Card
                key={post.id}
                to={`/blog/${post.slug}`}
                image={post.image}
                imageAlt={post.title}
                tag={post.category}
                meta={post.date}
                title={post.title}
                description={post.summary}
                actionText="Read essay &rarr;"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Single Dark Accent Section: DarkBand CTA ── */}
      <DarkBand
        tag="ENGAGE"
        title="Discuss an Architectural Decision?"
        description="We love discussing systems engineering, RAG pipelines, and cloud optimizations with engineering leaders."
        primaryActionText="Start a Conversation"
        primaryActionTo="/contact"
        showContact={true}
      />
    </div>
  );
}
