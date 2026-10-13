import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

export default function LegalPageLayout({ title, subtitle, sections, pageClassName = '' }) {
  return (
    <div className={`legal-document-page ${pageClassName}`}>
      <header className="legal-document-header">
        <div className="container legal-document-container">
          <span className="section-tag">LEGAL</span>
          <h1>{title}</h1>
          <p className="legal-document-subtitle">{subtitle}</p>
          <p className="legal-updated">Last updated: October 6, 2026</p>
          <p className="legal-template-note">This general information is a template, not legal advice.</p>
        </div>
      </header>

      <div className="container legal-document-container legal-document-content">
        <nav className="legal-toc" aria-label="Table of contents">
          <h2>On this page</h2>
          <ol>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="legal-document-article">
          {sections.map((section) => (
            <section className="legal-document-section" id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.content}
            </section>
          ))}
        </article>

        <Link to="/" className="legal-home-link">← Back to home</Link>
      </div>
    </div>
  );
}
