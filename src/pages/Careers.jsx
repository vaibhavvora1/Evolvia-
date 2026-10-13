import PageHero from '../components/UI/PageHero';
import HoverCard from '../components/UI/HoverCard';
import { IconArrowRight } from '../components/UI/Icons';
import usePageMeta from '../hooks/usePageMeta';
import useReveal from '../hooks/useReveal';
import { jobs, benefits } from '../data/demoData';
import { CONTACT_EMAIL } from '../config/contact';

export default function Careers() {
  usePageMeta(
    'Careers — Evolvia Tech',
    'Join the engineering and product team at Evolvia Tech. Remote-first culture, high ownership, and continuous learning.',
    {
      canonicalUrl: 'https://evolvia.tech/careers',
      ogImage: 'https://evolvia.tech/asset-04.webp',
    }
  );

  const jobsRef = useReveal();
  const benefitsRef = useReveal();

  return (
    <div className="careers-page">
      <PageHero
        tag="JOIN EVOLVIA TECH"
        title="Work on High-Impact Distributed Systems &amp; Applied AI."
        subtitle="We are a multidisciplinary group of software engineers, systems thinkers, and product designers. We value deliberate craftsmanship, autonomy, and sustainable engineering hours."
        image="/asset-04.webp"
        imageAlt="Evolvia Tech Careers & Culture"
        actions={
          <a href={`mailto:${CONTACT_EMAIL}?subject=Job Application Inquiry`} className="btn btn-primary">
            Apply Directly <IconArrowRight size={16} />
          </a>
        }
      />

      {/* ── Open Positions Grid ── */}
      <section className="page-section reveal-item" ref={jobsRef}>
        <div className="container">
          <div className="section-header-compact">
            <span className="section-tag">OPEN ROLES</span>
            <h2 className="section-title-compact">Engineering Openings</h2>
            <p className="section-lead-compact">
              Explore our current vacancies across web engineering, distributed backends, AI, and platform ops.
            </p>
          </div>

          <div className="compact-cards-grid">
            {jobs.map((job) => (
              <HoverCard
                key={job.id}
                title={job.title}
                tag={`${job.department} &bull; ${job.experience}`}
                image={job.image}
                imageAlt={job.title}
                description={`${job.location}. Skills: ${job.skills.slice(0, 3).join(', ')}. Requirements: ${job.requirements[0]}.`}
                actionText="Apply via email"
                onClick={() => {
                  window.location.href = `mailto:${CONTACT_EMAIL}?subject=Application for ${encodeURIComponent(job.title)}`;
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits & Culture ── */}
      <section className="page-section bg-alt reveal-item" ref={benefitsRef}>
        <div className="container">
          <div className="section-header-compact">
            <span className="section-tag">OUR CULTURE</span>
            <h2 className="section-title-compact">How We Support Our Team</h2>
            <p className="section-lead-compact">
              We create an environment where engineers can do deep, focused work without artificial friction.
            </p>
          </div>

          <div className="compact-cards-grid">
            {benefits.map((b) => (
              <HoverCard
                key={b.title}
                title={b.title}
                tag="PERK & BENEFIT"
                description={b.points.join('. ')}
                actionText="Explore culture"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Instructions ── */}
      <section className="page-section">
        <div className="container cta-banner-card">
          <h2>Don't see an exact match?</h2>
          <p>We are always eager to meet thoughtful engineers, designers, and researchers. Send your GitHub, portfolio, or resume directly to {CONTACT_EMAIL}.</p>
          <a href={`mailto:${CONTACT_EMAIL}?subject=General Engineering Application`} className="btn btn-primary">
            Send Open Application <IconArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
