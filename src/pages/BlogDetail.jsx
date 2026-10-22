import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blog } from '../data/blog';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import Card from '../components/UI/Card';
import Img from '../components/UI/Img';
import NotFound from './NotFound';
import usePageMeta from '../hooks/usePageMeta';
import './DetailPages.css';

export default function BlogDetail() {
  const { slug } = useParams();
  const post = blog.find((b) => b.slug === slug || b.id === slug);

  usePageMeta(
    post ? `${post.title} — Evolvia Tech Blog` : 'Engineering Perspectives — Evolvia Tech',
    post ? (post.summary || post.paragraphs?.[0]) : 'Technical Essay',
    {
      canonicalUrl: `https://evolvia.tech/blog/${slug}`,
      ogImage: post?.image ? `https://evolvia.tech${post.image}` : 'https://evolvia.tech/hero-poster.webp',
    }
  );

  if (!post) {
    return <NotFound />;
  }

  // 3 related blog posts
  const relatedPosts = blog
    .filter((b) => b.id !== post.id)
    .slice(0, 3);

  return (
    <div className="detail-page blog-detail-page">
      {/* ── Dark PageHeader Band with Breadcrumbs ── */}
      <PageHeader
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Blog', path: '/blog' },
          { label: post.title },
        ]}
        tag={`${post.category} • ${post.date} • ${post.readTime}`}
        title={post.title}
        subtitle={post.summary}
        bannerImage={post.image}
        bannerAlt={post.title}
      />

      {/* ── Main Content Grid with Sticky Sidebar ────────────────── */}
      <section className="detail-content-section">
        <div className="container detail-layout-grid">
          {/* Main Column */}
          <div className="detail-main-column">
            {/* Featured Image */}
            {post.image && (
              <div className="detail-block">
                <Img
                  src={post.image}
                  alt={post.title}
                  ratio="banner"
                  width="860"
                  height="420"
                />
              </div>
            )}

            {/* Article Paragraphs */}
            <div className="detail-block">
              <div className="detail-paragraphs">
                {post.paragraphs && post.paragraphs.length > 0 ? (
                  post.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))
                ) : (
                  <p>{post.summary}</p>
                )}
              </div>
            </div>

            {/* Key Takeaways */}
            {post.takeaways && post.takeaways.length > 0 && (
              <div className="detail-block">
                <h2 className="detail-block-title">Key Architectural Takeaways</h2>
                <ul className="detail-checklist">
                  {post.takeaways.map((item) => (
                    <li key={item} className="detail-checklist-item">
                      <span className="checklist-bullet" aria-hidden="true">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <aside className="detail-sidebar-column">
            <div className="sidebar-box">
              <h3 className="sidebar-box-title">Article Info</h3>
              <ul className="sidebar-meta-list">
                <li>
                  <span className="sidebar-meta-label">Category</span>
                  <span className="sidebar-meta-value">{post.category}</span>
                </li>
                <li>
                  <span className="sidebar-meta-label">Published</span>
                  <span className="sidebar-meta-value">{post.date}</span>
                </li>
                <li>
                  <span className="sidebar-meta-label">Reading Time</span>
                  <span className="sidebar-meta-value">{post.readTime}</span>
                </li>
                <li>
                  <span className="sidebar-meta-label">Author</span>
                  <span className="sidebar-meta-value">{post.author || 'Evolvia Core Team'}</span>
                </li>
              </ul>
            </div>

            <div className="sidebar-box">
              <h3 className="sidebar-box-title">Apply in Production</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Need help implementing these architecture patterns in your systems?
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                Talk with Engineers
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ── 3 Related Cards ─────────────────────────────────────── */}
      <section className="related-section section-lazy">
        <div className="container">
          <div className="related-section-header">
            <span className="section-tag">ENGINEERING NOTES</span>
            <h2>Related Articles</h2>
          </div>

          <div className="grid-cards">
            {relatedPosts.map((rel) => (
              <Card
                key={rel.id}
                to={`/blog/${rel.slug}`}
                image={rel.image}
                imageAlt={rel.title}
                tag={rel.category}
                meta={rel.date}
                title={rel.title}
                description={rel.summary}
                actionText="Read essay &rarr;"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Single Dark Accent Section: DarkBand CTA ── */}
      <DarkBand
        tag="BUILD WITH US"
        title="Turn Architectural Theory into Production Code"
        description="Partner with engineers who write dependable software for mission-critical workloads."
        primaryActionText="Build with Us"
        primaryActionTo="/contact"
        showContact={true}
      />
    </div>
  );
}
