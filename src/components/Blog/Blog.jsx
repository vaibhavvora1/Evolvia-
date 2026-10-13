import React, { useRef } from 'react';
import { BrainCircuit, Cloud, Database, Layers3, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../UI/Reveal';
import Card from '../UI/Card';
import ActionLink from '../UI/ActionLink';
import PremiumCardMotion from '../UI/PremiumCardMotion';
import { ScrollHeading, ScrollSectionBlobs } from '../UI/ScrollSectionEffects';
import { blog } from '../../data/demoData';
import './Blog.css';

const BLOG_ART = {
  ai:      BrainCircuit,
  systems: Layers3,
  cloud:   Cloud,
  design:  Palette,
  rag:     Database,
};

export default function Blog() {
  const sectionRef = useRef(null);
  return (
    <section ref={sectionRef} id="blog" className="blog-section" aria-label="Engineering Blog & Insights">
      <ScrollSectionBlobs targetRef={sectionRef} />
      <div className="container">
        {/* Header */}
        <ScrollHeading className="row align-items-end justify-content-between mb-5">
          <div className="col-12 col-lg-8">
            <span className="section-tag">ENGINEERING DISPATCHES</span>
            <Reveal tag="h2" className="section-title">
              Insights, technical notes &amp; architectural perspectives.
            </Reveal>
            <p className="section-subtitle">
              Notes from our engineering practice across AI, infrastructure,
              product architecture, and interface design.
            </p>
          </div>
          <div className="col-12 col-lg-4 text-lg-end mt-3 mt-lg-0">
            <span className="blog-meta-badge">UPDATED WEEKLY &bull; LAB ARCHIVES</span>
          </div>
        </ScrollHeading>

        {/* Cards */}
        <div className="row g-4">
          {blog.slice(0, 3).map((post, index) => {
            const ArtIcon = BLOG_ART[post.artwork] || BrainCircuit;
            return (
              <div key={post.id} className="col-12 col-md-4">
                <PremiumCardMotion index={index} columns={3} tabletColumns={3} mobileBreakpoint={767}>
                <Card as="article" className="blog-card" variant="blog" index={0} stagger={0} scrollDriven>
                  {/* Media */}
                  <div className="blog-card-media">
                    {post.image ? (
                      <img
                        className="blog-card-image"
                        src={post.image}
                        alt={`${post.title} cover`}
                        width={post.imageWidth || 1376}
                        height={post.imageHeight || 768}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="blog-media-icon" aria-hidden="true">
                        <ArtIcon size={25} strokeWidth={1.6} />
                      </span>
                    )}
                    <span className="blog-category-pill">{post.category}</span>
                    <span className="blog-media-index">0{index + 1}</span>
                  </div>

                  {/* Body */}
                  <div className="blog-card-body">
                    {/* Meta row */}
                    <div className="blog-meta">
                      <span className="blog-date">{post.date}</span>
                      <span className="blog-meta-dot">&bull;</span>
                      <span className="blog-read-time">{post.readTime} read</span>
                    </div>

                    {/* Title — reset link color */}
                    <h3 className="blog-title">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    {/* Short excerpt only (first bullet as fallback) */}
                    <p className="blog-summary">
                      {post.summary || post.points[0]}
                    </p>

                    {/* Tags as separate pills */}
                    {post.tags?.length > 0 && (
                      <div className="blog-tags" aria-label="Topics">
                        {post.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="blog-tag-pill">{tag}</span>
                        ))}
                      </div>
                    )}

                    {/* Footer: pinned to bottom */}
                    <ActionLink to={`/blog/${post.slug}`} className="blog-footer" variant="outline">
                      Read Article
                    </ActionLink>
                  </div>
                </Card>
                </PremiumCardMotion>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
