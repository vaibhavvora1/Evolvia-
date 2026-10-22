import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, ADDRESS } from '../../config/contact';
import { prefetchChunk } from '../../utils/prefetch';
import './DarkBand.css';

/**
 * DarkBand
 * ────────
 * Restrained dark accent section reusable across every page:
 * • Background: --black with light text (--text-light)
 * • Highlights: --green
 * • Smooth edges: border-radius 24px or soft 1px --green line
 * • Reusable for CTA, quote, or highlight strips
 */
export default function DarkBand({
  tag,
  badge,
  title = 'Ready to Engineer Your Next Platform?',
  description,
  subtitle,
  primaryActionText,
  ctaText,
  primaryActionTo,
  ctaLink,
  secondaryActionText,
  secondaryActionTo,
  showContact = true,
  className = '',
  children,
}) {
  const displayTag = badge ?? tag ?? 'BUILD WITH US';
  const displayDesc = subtitle ?? description ?? 'Let’s discuss your system architecture, AI implementation, or cloud scaling roadmap.';
  const displayPrimaryText = ctaText ?? primaryActionText ?? 'Build with Us';
  const displayPrimaryTo = ctaLink ?? primaryActionTo ?? '/contact';

  return (
    <section className={`dark-band-section ${className}`.trim()}>
      <div className="container">
        <div className="dark-band-card">
          <div className="dark-band-content">
            {displayTag && <span className="dark-band-tag">{displayTag}</span>}
            <h2 className="dark-band-title">{title}</h2>
            {displayDesc && <p className="dark-band-desc">{displayDesc}</p>}

            {children}

            {(displayPrimaryTo || secondaryActionTo) && (
              <div className="dark-band-actions">
                {displayPrimaryTo && (
                  <Link
                    to={displayPrimaryTo}
                    className="btn btn-primary dark-band-btn"
                    onMouseEnter={() => prefetchChunk(displayPrimaryTo)}
                    onFocus={() => prefetchChunk(displayPrimaryTo)}
                  >
                    {displayPrimaryText} &rarr;
                  </Link>
                )}
                {secondaryActionTo && (
                  <Link
                    to={secondaryActionTo}
                    className="btn btn-outline-light dark-band-btn"
                    onMouseEnter={() => prefetchChunk(secondaryActionTo)}
                    onFocus={() => prefetchChunk(secondaryActionTo)}
                  >
                    {secondaryActionText}
                  </Link>
                )}
              </div>
            )}

            {showContact && (
              <div className="dark-band-contact-row">
                <a href={`mailto:${CONTACT_EMAIL}`} className="dark-band-contact-item">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>{CONTACT_EMAIL}</span>
                </a>
                <div className="dark-band-contact-item">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{ADDRESS}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
