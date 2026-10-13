import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/UI/PageHero';
import { IconArrowRight } from '../components/UI/Icons';
import usePageMeta from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta(
    'Page Not Found (404) — Evolvia Tech',
    'The requested page could not be found. Return to the Evolvia Tech home page.',
    { robots: 'noindex, nofollow' }
  );

  return (
    <div className="notfound-page">
      <PageHero
        tag="ERROR 404"
        title="Page Not Found"
        subtitle="The page you are looking for does not exist or has been moved."
        actions={
          <Link to="/" className="btn btn-primary">
            Return to Home <IconArrowRight size={16} />
          </Link>
        }
      />
    </div>
  );
}
