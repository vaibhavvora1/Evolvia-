import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HoverCard from '../components/UI/HoverCard';
import { IconArrowRight } from '../components/UI/Icons';
import usePageMeta from '../hooks/usePageMeta';
import useReveal from '../hooks/useReveal';
import { prefetchChunk } from '../utils/prefetch';

// TODO: replace with real clients
const DEMO_COMPANIES = [
  { id: 'dc1', name: 'Demo Co 1', mark: 'D1' },
  { id: 'dc2', name: 'Demo Co 2', mark: 'D2' },
  { id: 'dc3', name: 'Demo Co 3', mark: 'D3' },
  { id: 'dc4', name: 'Demo Co 4', mark: 'D4' },
  { id: 'dc5', name: 'Demo Co 5', mark: 'D5' },
  { id: 'dc6', name: 'Demo Co 6', mark: 'D6' },
  { id: 'dc7', name: 'Demo Co 7', mark: 'D7' },
  { id: 'dc8', name: 'Demo Co 8', mark: 'D8' },
];

// One small card per other nav page with "View details →"
const NAV_PAGE_REFERENCES = [
  {
    title: 'About Us',
    image: '/about.webp',
    imageAlt: 'About Evolvia Tech Team',
    tag: 'WHO WE ARE',
    description: 'Disciplined engineering, mission-driven leadership, and pragmatic architecture.',
    link: '/about',
  },
  {
    title: 'Our Services',
    image: '/asset-07.webp',
    imageAlt: 'Software Engineering Services',
    tag: 'CAPABILITIES',
    description: 'Full-stack web, mobile platforms, enterprise cloud systems, and applied AI.',
    link: '/services',
  },
  {
    title: 'AI Solutions',
    image: '/asset-17.webp',
    imageAlt: 'Enterprise AI & Automation',
    tag: 'APPLIED AI',
    description: 'Ground language models in enterprise data with zero hallucinations and secure agents.',
    link: '/ai',
  },
  {
    title: 'Portfolio',
    image: '/asset-22.webp',
    imageAlt: 'Portfolio Projects & Solutions',
    tag: 'CASE STUDIES',
    description: 'Proven digital platforms, FinTech workflows, and resilient cloud systems.',
    link: '/portfolio',
  },
  {
    title: 'Technologies',
    image: '/asset-21.webp',
    imageAlt: 'Core Technology Stack',
    tag: 'TECH STACK',
    description: 'Modern battle-tested stack including React, Python, Go, AWS, and PyTorch.',
    link: '/technologies',
  },
  {
    title: 'Careers',
    image: '/asset-04.webp',
    imageAlt: 'Engineering Careers at Evolvia',
    tag: 'CULTURE & TEAM',
    description: 'Remote-first engineering roles with high ownership and sustainable hours.',
    link: '/careers',
  },
];

export default function Home() {
  usePageMeta(
    'Evolvia Tech — Software, AI & Cloud Engineering',
    'Evolvia Tech engineers robust digital products, AI systems, and cloud platforms for ambitious businesses. Based in Ahmedabad, India.',
    {
      canonicalUrl: 'https://evolvia.tech/',
      ogImage: 'https://evolvia.tech/hero-poster.webp',
    }
  );

  const referenceGridRef = useReveal();
  const ctaRef = useReveal();
  const heroRef = useRef(null);
  const heroMediaRef = useRef(null);
  const heroContentRef = useRef(null);
  const videoRef = useRef(null);
  const rafIdRef = useRef(null);
  const [loadVideo, setLoadVideo] = useState(false);

  // Background video deferment & skip logic for optimal LCP and data-saving
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = Boolean(navigator.connection && navigator.connection.saveData);
    const isMobile = window.innerWidth < 768;

    if (prefersReduced || saveData || isMobile) {
      return;
    }

    const timer = setTimeout(() => {
      setLoadVideo(true);
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  // Performance control: pause video when hero is scrolled out of view or tab is hidden
  useEffect(() => {
    if (!loadVideo) return;
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(hero);

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        const rect = hero.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          video.play().catch(() => {});
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [loadVideo]);

  // Content slides over hero: slight fade & scale-down of hero text & video on scroll
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      if (rafIdRef.current) return;
      rafIdRef.current = window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const progress = Math.min(1, Math.max(0, scrollY / (vh * 0.85)));

        if (heroContentRef.current) {
          heroContentRef.current.style.opacity = (1 - progress * 0.85).toFixed(3);
          heroContentRef.current.style.transform = `translateY(${progress * 36}px) scale(${(1 - progress * 0.05).toFixed(3)})`;
        }
        if (heroMediaRef.current) {
          heroMediaRef.current.style.opacity = (1 - progress * 0.45).toFixed(3);
          heroMediaRef.current.style.transform = `scale(${(1 - progress * 0.04).toFixed(3)})`;
        }
        rafIdRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div className="home-page">
      {/* ── 1. Hero Section with Sticky Background Video (Stays in place behind content) ── */}
      <section className="home-hero-section" ref={heroRef} aria-label="Hero">
        {/* Background Video Media Layer */}
        <div className="home-hero-bg-media" ref={heroMediaRef} aria-hidden="true">
          {/* Instant poster image for LCP optimization */}
          <img
            src="/hero-poster.webp"
            alt=""
            className={`home-hero-poster ${loadVideo ? 'is-video-loaded' : ''}`}
            width="1920"
            height="1080"
            fetchpriority="high"
            loading="eager"
            decoding="async"
          />

          {/* Deferred background video (plays muted, loop, playsInline) */}
          {loadVideo && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/hero-poster.webp"
              className="home-hero-video"
              width="1920"
              height="1080"
              onCanPlay={() => {
                if (videoRef.current) {
                  videoRef.current.play().catch(() => {});
                }
              }}
            >
              <source src="/hero.webm" type="video/webm" />
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          )}

          {/* Dark overlay for contrast */}
          <div className="home-hero-overlay" />
        </div>

        {/* Hero Foreground Content */}
        <div className="container home-hero-container">
          <div className="home-hero-content" ref={heroContentRef}>
            <span className="hero-eyebrow hero-fade-item" style={{ animationDelay: '0.1s' }}>
              SOFTWARE &bull; AI &bull; CLOUD PLATFORMS
            </span>
            <h1 className="home-hero-headline hero-fade-item" style={{ animationDelay: '0.2s' }}>
              Engineering Resilient Software, AI Systems &amp; Scalable Cloud.
            </h1>
            <p className="home-hero-subtext hero-fade-item" style={{ animationDelay: '0.3s' }}>
              Evolvia Tech delivers mission-critical digital products and intelligent automation for forward-thinking enterprises.
            </p>
            <div className="home-hero-actions hero-fade-item" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/services"
                className="btn btn-primary"
                onMouseEnter={() => prefetchChunk('/services')}
              >
                Explore Services <IconArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="btn btn-outline-light"
                onMouseEnter={() => prefetchChunk('/contact')}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Content Curtain Wrapper: Slides UP and covers the video on scroll ── */}
      <div className="home-curtain-wrapper">
        {/* Demo Companies Marquee */}
        <section className="home-marquee-section" aria-label="Demo Companies Marquee">
          <div className="marquee-label-wrap">
            <span className="marquee-subtle-label">TECHNOLOGY &amp; PARTNER ECOSYSTEM (DEMO)</span>
          </div>
          <div className="marquee-container">
            <div className="marquee-track">
              {DEMO_COMPANIES.map((company) => (
                <div key={company.id} className="marquee-item">
                  <span className="marquee-badge">{company.mark}</span>
                  <span className="marquee-company-name">{company.name}</span>
                </div>
              ))}
              {DEMO_COMPANIES.map((company) => (
                <div key={`dup-${company.id}`} className="marquee-item" aria-hidden="true">
                  <span className="marquee-badge">{company.mark}</span>
                  <span className="marquee-company-name">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* One Compact Reference Grid Linking to Core Sections */}
        <section
          className="home-reference-section reveal-item"
          ref={referenceGridRef}
          aria-labelledby="home-explore-title"
        >
          <div className="container">
            <div className="section-header-compact">
              <span className="section-tag">EXPLORE EVOLVIA</span>
              <h2 id="home-explore-title" className="section-title-compact">
                Explore Our Capabilities &amp; Company
              </h2>
              <p className="section-lead-compact">
                Click any card below to navigate directly to the detailed section.
              </p>
            </div>

            <div className="compact-cards-grid">
              {NAV_PAGE_REFERENCES.map((item) => (
                <HoverCard
                  key={item.link}
                  title={item.title}
                  image={item.image}
                  imageAlt={item.imageAlt}
                  tag={item.tag}
                  description={item.description}
                  link={item.link}
                  actionText="View details →"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Short CTA Strip Linking to Contact */}
        <section
          className="home-cta-strip-section reveal-item"
          ref={ctaRef}
          aria-label="Call to action"
        >
          <div className="container home-cta-strip-box">
            <div className="home-cta-strip-text">
              <h3>Have an engineering challenge or product idea?</h3>
              <p>Speak directly with our technical leads and plan your roadmap.</p>
            </div>
            <Link
              to="/contact"
              className="btn btn-primary"
              onMouseEnter={() => prefetchChunk('/contact')}
            >
              Get in Touch <IconArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
