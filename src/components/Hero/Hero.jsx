import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, ADDRESS, TAGLINE, COMPANY_NAME } from '../../config/contact';
import { prefetchChunk } from '../../utils/prefetch';
import './Hero.css';

// Demo client testimonials for the animated right-side widget
const HERO_TESTIMONIALS = [
  {
    quote: "Evolvia Tech overhauled our cloud infrastructure and scaled our SaaS platform flawlessly.",
    client: "CTO, Nova Retail",
    metric: "99.99% Uptime",
  },
  {
    quote: "Their RAG and AI implementation reduced our system hallucinations to near zero.",
    client: "Head of AI, Orbit Health",
    metric: "4x Faster Queries",
  },
  {
    quote: "Exceptional MERN engineering and architectural precision. Delivered ahead of schedule.",
    client: "Product Director, Pixel Foods",
    metric: "Zero Downtime Deploy",
  },
];

export default function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // ── Cycle testimonials every 4.5 seconds only when visible & desktop ──
  useEffect(() => {
    const isSmall = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
    if (isSmall) return undefined;

    let timer = null;
    const hero = heroRef.current;
    if (!hero) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!timer) {
            timer = setInterval(() => {
              setActiveTestimonial((prev) => (prev + 1) % HERO_TESTIMONIALS.length);
            }, 4500);
          }
        } else if (timer) {
          clearInterval(timer);
          timer = null;
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  // ── Video loading ──
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = Boolean(navigator.connection && navigator.connection.saveData);
    const isSmallMobile = window.matchMedia('(max-width: 640px)').matches;

    if (prefersReducedMotion || saveData || isSmallMobile) {
      setCanPlayVideo(false);
      return undefined;
    }

    const animId = window.requestAnimationFrame(() => {
      setCanPlayVideo(true);
    });

    return () => window.cancelAnimationFrame(animId);
  }, []);

  // ── Pause video when hero is out of view ──
  useEffect(() => {
    if (!canPlayVideo || !heroRef.current || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [canPlayVideo]);

  // ── GSAP staggered intro ──
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const hero = heroRef.current;
    const content = contentRef.current;
    if (!hero || !content) return;

    let ctx = null;

    import('../../lib/gsap.js').then(({ gsap }) => {
      if (!heroRef.current) return;

      ctx = gsap.context(() => {
        const items = content.querySelectorAll('.hero-anim');

        gsap.set(items, { opacity: 0, y: 24 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          delay: 0.1,
          onComplete() {
            gsap.set(items, { clearProps: 'transform,opacity' });
          },
        });
      }, hero);
    }).catch(() => {});

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  // Fade and scale the hero text as the following section covers the hero.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const hero = heroRef.current;
    const content = contentRef.current;
    const nextSection = hero?.nextElementSibling;
    if (!hero || !content || !nextSection) return;

    let animationFrame = null;
    const updateContent = () => {
      animationFrame = null;
      const heroRect = hero.getBoundingClientRect();
      if (heroRect.bottom <= 0) return; // Hero has scrolled completely offscreen

      const viewportHeight = heroRect.height;
      const covered = viewportHeight - nextSection.getBoundingClientRect().top;
      const progress = Math.max(0, Math.min(covered / viewportHeight, 1));

      content.style.opacity = String(1 - progress * 0.8);
      content.style.transform = `scale(${1 - progress * 0.04})`;
    };
    const scheduleUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateContent);
      }
    };

    updateContent();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
      content.style.opacity = '';
      content.style.transform = '';
    };
  }, []);

  const currentTestimonial = HERO_TESTIMONIALS[activeTestimonial];

  return (
    <section ref={heroRef} className="hero-fullscreen" aria-label="Hero Section">
      {/* Background Poster */}
      <img
        src="/hero-poster.webp"
        alt=""
        className="hero-media-bg hero-poster-bg"
        width="1920"
        height="1080"
        fetchPriority="high"
        decoding="async"
      />

      {/* Background Video */}
      {canPlayVideo && (
        <video
          ref={videoRef}
          className="hero-media-bg hero-video-bg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.webp"
          aria-hidden="true"
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark overlay */}
      <div className="hero-dark-overlay" aria-hidden="true" />

      {/* Main Grid Layout (Left Content + Right Blur Glass Testimonial Card) */}
      <div className="container hero-container-layout" ref={contentRef}>
        {/* Left Content Column */}
        <div className="hero-left-content">
          <span className="hero-badge-label hero-anim">{COMPANY_NAME}</span>
          <h1 className="hero-quote-heading hero-anim">{TAGLINE}</h1>
          <p className="hero-single-subtext hero-anim">
            Engineering scalable web applications, intelligent systems, and resilient cloud architectures.
          </p>

          <div className="hero-button-group hero-anim">
            <Link
              to="/services"
              className="btn btn-primary hero-btn"
              onMouseEnter={() => prefetchChunk('/services')}
              onFocus={() => prefetchChunk('/services')}
            >
              Our Services
            </Link>
            <Link
              to="/contact"
              className="btn btn-outline-light hero-btn"
              onMouseEnter={() => prefetchChunk('/contact')}
              onFocus={() => prefetchChunk('/contact')}
            >
              Build with Us
            </Link>
          </div>

          <div className="hero-contact-row hero-anim">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hero-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="hero-contact-icon">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>{CONTACT_EMAIL}</span>
            </a>

            <div className="hero-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="hero-contact-icon">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{ADDRESS}</span>
            </div>
          </div>
        </div>

        {/* Right Blurred Glassmorphism Card Column */}
        <div className="hero-right-content hero-anim">
          <div className="hero-testimonial-card">
            <div className="hero-testi-top">
              <span className="hero-testi-badge">Client Impact</span>
              <span className="hero-testi-metric">{currentTestimonial.metric}</span>
            </div>
            
            <div className="hero-testi-body" key={activeTestimonial}>
              <p className="hero-testi-quote">"{currentTestimonial.quote}"</p>
              <div className="hero-testi-author">
                <span className="hero-testi-line" />
                <span className="hero-testi-name">{currentTestimonial.client}</span>
              </div>
            </div>

            <div className="hero-testi-indicators">
              {HERO_TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`hero-testi-dot ${idx === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(idx)}
                  aria-label={`Show testimonial ${idx + 1}`}
                  aria-current={idx === activeTestimonial ? 'true' : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}