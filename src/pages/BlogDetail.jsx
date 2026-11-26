import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blog } from '../data/blog';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import Card from '../components/UI/Card';
import Img from '../components/UI/Img';
import NotFound from './NotFound';
import usePageMeta from '../hooks/usePageMeta';
import {
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  buildCanonicalUrl,
  buildImageUrl,
} from '../config/seo';
import './DetailPages.css';

export default function BlogDetail() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);
  const post = blog.find((b) => b.slug === slug || b.id === slug);

  const canonicalUrl = post ? buildCanonicalUrl(`/blog/${post.slug}`) : undefined;

  usePageMeta(
    post ? (post.metaTitle || `${post.title} — Evolvia Tech Blog`) : 'Page Not Found — Evolvia Tech',
    post ? (post.metaDescription || post.summary || post.paragraphs?.[0]) : 'The requested article could not be found.',
    {
      canonicalUrl,
      ogImage: post?.image ? buildImageUrl(post.image) : undefined,
      ogType: post ? 'article' : 'website',
      robots: post ? 'index, follow' : 'noindex, nofollow',
      structuredData: post
        ? [
            buildBlogPostingSchema(post),
            buildBreadcrumbSchema([
              { label: 'Home', path: '/' },
              { label: 'Blog', path: '/blog' },
              { label: post.title },
            ]),
          ]
        : null,
    }
  );

  if (!post) {
    return <NotFound />;
  }

  const takeaways = post.takeaways || post.points || [];

  // Resolve 3 related blog posts via relatedIds, fallback to other posts
  const relatedPosts = (post.relatedIds || [])
    .map((id) => blog.find((b) => b.id === id || b.slug === id))
    .filter((b) => b && b.id !== post.id);
  const fallbackRelated = blog.filter(
    (b) => b.id !== post.id && !relatedPosts.some((r) => r.id === b.id)
  );
  const finalRelatedPosts = [...relatedPosts, ...fallbackRelated].slice(0, 3);

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && canonicalUrl) {
      navigator.clipboard.writeText(canonicalUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  };

  const encodedUrl = encodeURIComponent(canonicalUrl || '');
  const encodedTitle = encodeURIComponent(post.title);

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
        bannerAlt={post.imageAlt || post.title}
      />

      {/* ── Main Content Grid with Sticky Sidebar ────────────────── */}
      <section className="detail-content-section">
        <div className="container detail-layout-grid">
          {/* Main Article Column */}
          <article className="detail-main-column">
            {/* Featured Image */}
            {post.image && (
              <div className="detail-block">
                <Img
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  ratio="banner"
                  width="860"
                  height="420"
                />
              </div>
            )}

            {/* Structured H2/H3 Sections or Fallback Paragraphs */}
            {post.sections && post.sections.length > 0 ? (
              post.sections.map((section) => (
                <div key={section.heading} className="detail-block">
                  {section.level === 'h3' ? (
                    <h3 className="detail-block-title">{section.heading}</h3>
                  ) : (
                    <h2 className="detail-block-title">{section.heading}</h2>
                  )}
                  <div className="detail-paragraphs">
                    {section.paragraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="detail-block">
                <div className="detail-paragraphs">
                  {post.paragraphs && post.paragraphs.length > 0 ? (
                    post.paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
                  ) : (
                    <p>{post.summary}</p>
                  )}
                </div>
              </div>
            )}

            {/* Key Takeaways */}
            {takeaways.length > 0 && (
              <div className="detail-block">
                <h2 className="detail-block-title">Key Takeaways</h2>
                <ul className="detail-checklist">
                  {takeaways.map((item) => (
                    <li key={item} className="detail-checklist-item">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Internal & External References */}
            {((post.internalLinks && post.internalLinks.length > 0) ||
              (post.externalReferences && post.externalReferences.length > 0)) && (
              <div className="detail-block">
                <h2 className="detail-block-title">Related Resources &amp; References</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px' }}>
                  {(post.internalLinks || []).map((link) => (
                    <Link key={link.path} to={link.path} className="btn btn-outline">
                      {link.label} &rarr;
                    </Link>
                  ))}
                </div>
                {post.externalReferences && post.externalReferences.length > 0 && (
                  <ul className="detail-checklist" style={{ marginTop: '20px' }}>
                    {post.externalReferences.map((ref) => (
                      <li key={ref.url} className="detail-checklist-item">
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'inherit', textDecoration: 'underline' }}
                        >
                          {ref.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </article>

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
                  <span className="sidebar-meta-value">
                    <time dateTime={post.publishedIso || undefined}>{post.date}</time>
                  </span>
                </li>
                {post.updatedDate && (
                  <li>
                    <span className="sidebar-meta-label">Updated</span>
                    <span className="sidebar-meta-value">
                      <time dateTime={post.updatedIso || undefined}>{post.updatedDate}</time>
                    </span>
                  </li>
                )}
                <li>
                  <span className="sidebar-meta-label">Reading Time</span>
                  <span className="sidebar-meta-value">{post.readTime}</span>
                </li>
                <li>
                  <span className="sidebar-meta-label">Author</span>
                  <span className="sidebar-meta-value">
                    {post.authorUrl ? (
                      <Link to={post.authorUrl} style={{ color: 'inherit', textDecoration: 'underline' }}>
                        {post.author || 'Evolvia Engineering Team'}
                      </Link>
                    ) : (
                      post.author || 'Evolvia Engineering Team'
                    )}
                  </span>
                </li>
              </ul>
            </div>

            <div className="sidebar-box">
              <h3 className="sidebar-box-title">Share Article</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ fontSize: '0.85rem', padding: '8px 14px' }}
                >
                  LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ fontSize: '0.85rem', padding: '8px 14px' }}
                >
                  X / Twitter
                </a>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="btn btn-outline"
                  style={{ fontSize: '0.85rem', padding: '8px 14px' }}
                >
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>

            <div className="sidebar-box">
              <h3 className="sidebar-box-title">Apply in Production</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Need help implementing these architecture or AI patterns in your business?
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
            <span className="section-tag">KEEP READING</span>
            <h2>Related Articles</h2>
          </div>

          <div className="grid-cards">
            {finalRelatedPosts.map((rel) => (
              <Card
                key={rel.id}
                to={`/blog/${rel.slug}`}
                image={rel.image}
                imageAlt={rel.imageAlt || rel.title}
                tag={rel.category}
                meta={`${rel.date} • ${rel.readTime}`}
                title={rel.title}
                description={rel.summary}
                actionText="Read article →"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Single Dark Accent Section: DarkBand CTA ── */}
      <DarkBand
        tag="BUILD WITH US"
        title="Turn Architectural Theory into Production Code"
        description="Partner with our engineers in Ahmedabad to build dependable software and AI systems."
        primaryActionText="Build with Us"
        primaryActionTo="/contact"
        showContact={true}
      />
    </div>
  );
}
