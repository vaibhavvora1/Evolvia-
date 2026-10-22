import React from 'react';
import { Link } from 'react-router-dom';
import './PageHeader.css';

/**
 * PageHeader
 * ──────────
 * Uniform dark header band for all inner pages:
 * • Solid --black background with light text
 * • Display font heading with a thin --green accent line beneath
 * • Small --green label or breadcrumbs
 * • Compact (220-300px tall), optionally with a dimmed hero/banner image behind
 */
export default function PageHeader({
  tag,
  breadcrumb,
  title,
  subtitle,
  breadcrumbs,
  bannerImage,
  bannerAlt = '',
  actions,
  children,
}) {
  const displayTag = tag ?? breadcrumb;

  return (
    <header className="page-header-band" aria-label={title}>
      {bannerImage && (
        <div className="page-header-backdrop" aria-hidden="true">
          <img
            src={bannerImage}
            alt={bannerAlt}
            className="page-header-backdrop-img"
            loading="eager"
            decoding="async"
            width="1440"
            height="400"
          />
          <div className="page-header-overlay" />
        </div>
      )}

      <div className="container page-header-container">
        <div className="page-header-content">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <nav className="page-header-breadcrumbs" aria-label="Breadcrumbs">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.path || crumb.label}>
                  {idx > 0 && <span className="page-header-breadcrumb-sep">/</span>}
                  {crumb.path ? (
                    <Link to={crumb.path} className="page-header-breadcrumb-link">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="page-header-breadcrumb-current">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          ) : displayTag ? (
            <span className="page-header-tag">{displayTag}</span>
          ) : null}

          <h1 className="page-header-title">{title}</h1>
          <div className="page-header-rule" aria-hidden="true" />

          {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
          {actions && <div className="page-header-actions">{actions}</div>}
          {children}
        </div>
      </div>
    </header>
  );
}
