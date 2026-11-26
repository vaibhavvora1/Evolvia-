import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import Card from '../components/UI/Card';
import Img from '../components/UI/Img';
import TestimonialCard from '../components/UI/TestimonialCard';
import TechMarquee from '../components/Technology/TechMarquee';
import DarkBand from '../components/UI/DarkBand';
import usePageMeta from '../hooks/usePageMeta';
import useGsapReveal from '../hooks/useGsapReveal';
import useSectionReveal from '../hooks/useSectionReveal';
import { services } from '../data/services';
import { projects } from '../data/projects';
import testimonials from '../data/testimonials';
import technologies from '../data/technologies';
import { team } from '../data/team';
import { blog } from '../data/blog';
import { prefetchChunk } from '../utils/prefetch';
import {
  buildCanonicalUrl,
  buildImageUrl,
  buildOrganizationSchema,
  buildProfessionalServiceSchema,
  buildWebPageSchema,
  buildWebSiteSchema,
} from '../config/seo';
import './Home.css';

const HOME_FAQS = [
  {
    q: 'What services does Evolvia Tech offer?',
    a: 'Evolvia Tech provides custom software development, full-stack web application development (React, Next.js, Node.js), mobile app development (React Native, Flutter), applied AI and RAG systems, UI/UX design systems, and cloud/DevOps engineering.',
  },
  {
    q: 'Is Evolvia an IT company in Ahmedabad?',
    a: 'Yes. Evolvia Tech (registered as Evolvia Infotech) operates from Maninagar, Ahmedabad, Gujarat, India, partnering with startups, SMEs, and enterprises across Ahmedabad, India, and globally.',
  },
  {
    q: 'Does Evolvia provide AI development services?',
    a: 'Yes. We engineer production AI solutions including Retrieval-Augmented Generation (RAG) document Q&A, custom AI chatbots and agents, LLM workflow automation, and AI integration for business software.',
  },
  {
    q: 'What technologies does Evolvia use?',
    a: 'Our core stack includes React, Next.js, TypeScript, Node.js, Python, FastAPI, Go, PostgreSQL, MongoDB, Redis, React Native, Flutter, Docker, Kubernetes, AWS, and Google Cloud.',
  },
  {
    q: 'Does Evolvia build custom software for startups?',
    a: 'Yes. We work directly with founders and product teams to scope MVPs, design scalable SaaS architectures, and build production web and mobile applications with full source-code ownership.',
  },
  {
    q: 'How can a business work with Evolvia Tech?',
    a: 'You can reach out through our contact page or email vrvora11@gmail.com to schedule a technical discovery call, review system requirements, and receive a milestone-based delivery plan.',
  },
];

export default function Home() {
  const homePageRef = useRef(null);

  const pageTitle = 'Evolvia Tech — AI & Software Development Company in Ahmedabad';
  const pageDescription =
    'Evolvia Tech (Evolvia Infotech) is an AI-focused IT and software development company in Ahmedabad, Gujarat, India. We build custom web apps, mobile apps, AI automation, and cloud platforms.';

  usePageMeta(pageTitle, pageDescription, {
    canonicalUrl: buildCanonicalUrl('/'),
    ogImage: buildImageUrl('/hero-poster.webp'),
    structuredData: [
      buildOrganizationSchema(),
      buildProfessionalServiceSchema(),
      buildWebSiteSchema(),
      buildWebPageSchema({
        title: pageTitle,
        description: pageDescription,
        path: '/',
      }),
    ],
  });

  // Data slices
  const servicesPreview = services.slice(0, 4);
  const worksPreview = projects.slice(0, 3);
  const testimonialsPreview = testimonials.slice(0, 3);
  const teamPreview = team.slice(0, 4);
  const blogPreview = blog.slice(0, 3);

  // Section heading reveal refs
  const aboutHeadRef = useSectionReveal();
  const servicesHeadRef = useSectionReveal();
  const worksHeadRef = useSectionReveal();
  const testimonialsHeadRef = useSectionReveal();
  const teamHeadRef = useSectionReveal();
  const blogHeadRef = useSectionReveal();
  const careersRef = useSectionReveal();
  const ctaRef = useSectionReveal();

  // Card grid stagger reveal refs
  const servicesGridRef = useGsapReveal();
  const worksGridRef = useGsapReveal();
  const testimonialsGridRef = useGsapReveal();
  const teamGridRef = useGsapReveal();
  const blogGridRef = useGsapReveal();

  // Refresh ScrollTrigger after the poster and first Home images load.
  useEffect(() => {
    const homePage = homePageRef.current;
    if (!homePage) return undefined;

    let animationFrame = null;
    let cancelled = false;
    const refreshScrollTrigger = () => {
      import('../lib/gsap.js').then(({ ScrollTrigger }) => {
        if (cancelled || animationFrame !== null) return;
        animationFrame = window.requestAnimationFrame(() => {
          animationFrame = null;
          ScrollTrigger.refresh();
        });
      }).catch(() => {
        // Silently continue if GSAP is unavailable
      });
    };

    const firstImages = Array.from(homePage.querySelectorAll('img')).slice(0, 2);
    firstImages.forEach((image) => {
      if (image.complete) {
        refreshScrollTrigger();
      } else {
        image.addEventListener('load', refreshScrollTrigger, { once: true });
      }
    });

    refreshScrollTrigger();

    return () => {
      cancelled = true;
      firstImages.forEach((image) => {
        image.removeEventListener('load', refreshScrollTrigger);
      });
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div ref={homePageRef} className="home-page">
      {/* ── 1. Hero ────────────────────────────────────────────── */}
      <Hero />

      <div className="home-content">
        {/* ── Technology Marquee (Below hero, inside sliding container) ── */}
        <TechMarquee technologies={technologies} />

        {/* ── 2. About Preview ───────────────────────────────────── */}
        <section className="section section-alt about-preview-section" aria-label="About Preview">
          <div className="container">
            <div className="section-header">
              <div ref={aboutHeadRef} className="section-header-left">
                <span className="section-tag">WHO WE ARE</span>
                <h2 className="section-title">Engineering with Purpose &amp; Precision</h2>
                <p className="section-subtitle">
                  We bridge ambitious product visions with production-grade engineering discipline.
                </p>
              </div>
              <Link
                to="/about"
                className="section-link"
                onMouseEnter={() => prefetchChunk('/about')}
              >
                Learn more &rarr;
              </Link>
            </div>

            <div className="about-preview-grid">
              <div className="about-preview-copy">
                <p className="lead">
                  Evolvia Tech (Evolvia Infotech) is an AI-focused software development and IT company in
                  Maninagar, Ahmedabad, Gujarat. We design and build custom web applications, mobile apps,
                  applied AI systems, and resilient cloud platforms.
                </p>
                <p>
                  We serve startups, growing businesses, and product teams across Ahmedabad, India, and
                  globally—combining clean domain modeling, direct senior engineer collaboration, and
                  scalable architecture without bloated complexity.
                </p>
                <div className="about-preview-actions">
                  <Link
                    to="/about"
                    className="btn btn-outline"
                    onMouseEnter={() => prefetchChunk('/about')}
                  >
                    Our Philosophy &amp; Story &rarr;
                  </Link>
                </div>
              </div>
              <div className="about-preview-visual">
                <Img
                  src="/about.webp"
                  alt="Evolvia Tech engineering team"
                  ratio="16/10"
                  className="about-preview-image-frame"
                  width="560"
                  height="400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Services Preview ────────────────────────────────── */}
        <section className="section services-preview-section" aria-label="Services Preview">
          <div className="container">
            <div className="section-header">
              <div ref={servicesHeadRef} className="section-header-left">
                <span className="section-tag">CAPABILITIES</span>
                <h2 className="section-title">Core Engineering Capabilities</h2>
                <p className="section-subtitle">
                  Architectural clarity across frontend product engineering, distributed systems, and AI workflows.
                </p>
              </div>
              <Link
                to="/services"
                className="section-link"
                onMouseEnter={() => prefetchChunk('/services')}
              >
                View all capabilities &rarr;
              </Link>
            </div>

            <div ref={servicesGridRef} className="grid-cards">
              {servicesPreview.map((service) => (
                <Card
                  key={service.id}
                  to={`/services/${service.id}`}
                  image={service.image}
                  imageAlt={service.title}
                  tag={service.badge}
                  title={service.title}
                  description={service.shortDescription}
                  actionText="View details →"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Works Preview ───────────────────────────────────── */}
        <section className="section section-alt works-preview-section" aria-label="Selected Works">
          <div className="container">
            <div className="section-header">
              <div ref={worksHeadRef} className="section-header-left">
                <span className="section-tag">SELECTED WORKS</span>
                <h2 className="section-title">Production Systems We Have Shipped</h2>
                <p className="section-subtitle">
                  Real client outcomes across SaaS platforms, mobile backends, and enterprise analytics tooling.
                </p>
              </div>
              <Link
                to="/works"
                className="section-link"
                onMouseEnter={() => prefetchChunk('/works')}
              >
                View all works &rarr;
              </Link>
            </div>

            <div ref={worksGridRef} className="grid-cards">
              {worksPreview.map((project) => (
                <Card
                  key={project.id}
                  to={`/works/${project.id}`}
                  image={project.image}
                  imageAlt={project.title}
                  tag={project.category}
                  meta={project.year}
                  title={project.title}
                  description={project.shortDescription}
                  actionText="View details →"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. What Our Clients Say (DEMO DATA - TODO: replace with real client feedback before launch) ── */}
        <section className="section testimonials-preview-section" aria-label="Client Testimonials">
          <div className="container">
            <div className="section-header">
              <div ref={testimonialsHeadRef} className="section-header-left">
                <span className="section-tag">TESTIMONIALS</span>
                <h2 className="section-title">What Our Clients Say</h2>
                <p className="section-subtitle">
                  Direct perspectives from founders and engineering leaders who build production systems with Evolvia.
                </p>
              </div>
              <Link
                to="/works"
                className="section-link"
                onMouseEnter={() => prefetchChunk('/works')}
              >
                See all &rarr;
              </Link>
            </div>

            <div ref={testimonialsGridRef} className="grid-cards">
              {testimonialsPreview.map((item) => (
                <TestimonialCard key={item.id} testimonial={item} />
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. Team Preview ────────────────────────────────────── */}
        <section className="section section-alt team-preview-section" aria-label="Team Preview">
          <div className="container">
            <div className="section-header">
              <div ref={teamHeadRef} className="section-header-left">
                <span className="section-tag">OUR TEAM</span>
                <h2 className="section-title">Leadership &amp; Engineering</h2>
                <p className="section-subtitle">
                  Direct access to seasoned engineers and designers with deep technical taste.
                </p>
              </div>
              <Link
                to="/team"
                className="section-link"
                onMouseEnter={() => prefetchChunk('/team')}
              >
                Meet the team &rarr;
              </Link>
            </div>

            <div ref={teamGridRef} className="grid-cards team-preview-grid">
              {teamPreview.map((member) => (
                <Card
                  key={member.id}
                  to={`/team/${member.id}`}
                  image={member.image}
                  imageAlt={member.name}
                  tag={member.role}
                  title={member.name}
                  description={member.bio || member.tagline}
                  actionText="View details →"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. Blog Preview ────────────────────────────────────── */}
        <section className="section blog-preview-section" aria-label="Blog Preview">
          <div className="container">
            <div className="section-header">
              <div ref={blogHeadRef} className="section-header-left">
                <span className="section-tag">INSIGHTS</span>
                <h2 className="section-title">Engineering Perspectives</h2>
                <p className="section-subtitle">
                  Architecture notes, operational constraints, and technical essays from our development lab.
                </p>
              </div>
              <Link
                to="/blog"
                className="section-link"
                onMouseEnter={() => prefetchChunk('/blog')}
              >
                Read more &rarr;
              </Link>
            </div>

            <div ref={blogGridRef} className="grid-cards">
              {blogPreview.map((post) => (
                <Card
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  image={post.image}
                  imageAlt={post.title}
                  tag={post.category}
                  meta={post.date}
                  title={post.title}
                  description={post.summary}
                  actionText="View details →"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. Frequently Asked Questions (AEO) ────────────────── */}
        <section className="section section-alt home-faq-section" aria-label="Frequently Asked Questions">
          <div className="container">
            <div className="section-header">
              <div className="section-header-left">
                <span className="section-tag">ANSWERS &amp; CLARITY</span>
                <h2 className="section-title">Frequently Asked Questions</h2>
                <p className="section-subtitle">
                  Clear answers about Evolvia Tech’s software engineering, AI development, and operations in Ahmedabad.
                </p>
              </div>
              <Link
                to="/contact"
                className="section-link"
                onMouseEnter={() => prefetchChunk('/contact')}
              >
                Ask a question &rarr;
              </Link>
            </div>

            <div className="grid-cards">
              {HOME_FAQS.map((item) => (
                <article
                  key={item.q}
                  style={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'clamp(22px, 3vw, 28px)',
                  }}
                >
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', lineHeight: '1.35' }}>{item.q}</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.975rem', lineHeight: '1.65' }}>
                    {item.a}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. Careers Strip ───────────────────────────────────── */}
        <section ref={careersRef} className="careers-strip-section" aria-label="Careers Strip">
          <div className="container careers-strip-container">
            <div className="careers-strip-content">
              <span className="section-tag">CAREERS</span>
              <h2 className="careers-strip-title">Join our remote-first engineering team.</h2>
              <p className="careers-strip-subtext">
                We offer sustainable working hours, high ownership, and direct influence over modern system architecture.
              </p>
            </div>
            <Link
              to="/careers"
              className="btn btn-secondary careers-strip-btn"
              onMouseEnter={() => prefetchChunk('/careers')}
            >
              See openings &rarr;
            </Link>
          </div>
        </section>

        {/* ── 9. Final Dark CTA Band ─────────────────────────────── */}
        <div ref={ctaRef}>
          <DarkBand
            tag="START A PROJECT"
            title="Ready to Evolve Your Ideas into Impact?"
            description="Talk directly with our technical leadership. Transparent scope, fast turnaround, and fixed milestones."
            primaryActionText="Build with Us"
            primaryActionTo="/contact"
            showContact={true}
          />
        </div>
      </div>
    </div>
  );
}