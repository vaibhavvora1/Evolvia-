import React from 'react';

export default function PageHero({
  tag,
  title,
  subtitle,
  image,
  imageAlt = '',
  imageWidth = 1376,
  imageHeight = 768,
  actions,
}) {
  return (
    <header className="page-hero">
      <div className="container page-hero-container">
        <div className="page-hero-content">
          {tag && <span className="section-tag">{tag}</span>}
          <h1 className="page-hero-title">{title}</h1>
          {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
          {actions && <div className="page-hero-actions">{actions}</div>}
        </div>

        {image && (
          <div className="page-hero-media">
            <img
              src={image}
              alt={imageAlt || title}
              className="page-hero-image"
              width={imageWidth}
              height={imageHeight}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
      </div>
    </header>
  );
}
