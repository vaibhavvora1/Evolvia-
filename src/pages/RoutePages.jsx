import React, { lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { SERVICES_DATA } from '../data/services';
import { PROJECTS_DATA } from '../data/projects';
import { BLOG_POSTS } from '../data/blog';
import technologies, { findTechnology, HOME_MARQUEE_SLUGS } from '../data/technologies';
import { aiServices, jobs, team } from '../data/demoData';
import EmailLink from '../components/UI/EmailLink';
import { CONTACT_EMAIL } from '../config/contact';
import './RoutePages.css';

const Hero = lazy(() => import('../components/Hero/Hero'));
const About = lazy(() => import('../components/About/About'));
const Services = lazy(() => import('../components/Services/Services'));
const AIServices = lazy(() => import('../components/Services/AIServices'));
const Works = lazy(() => import('../components/Works/Works'));
const Technology = lazy(() => import('../components/Technology/Technology'));
const TechnologyMarquee = lazy(() => import('../components/Technology/TechnologyMarquee'));
const Blog = lazy(() => import('../components/Blog/Blog'));
const Careers = lazy(() => import('../components/Careers/Careers'));
const Team = lazy(() => import('../components/Team/Team'));
const FinalCTA = lazy(() => import('../components/FinalCTA/FinalCTA'));
const Process = lazy(() => import('../components/Process/Process'));
const Industries = lazy(() => import('../components/Industries/Industries'));
const TechnologyItem = lazy(() => import('../components/Technology/TechnologyItem'));

const HOME_MARQUEE_TECHNOLOGIES = HOME_MARQUEE_SLUGS
  .map((slug) => technologies.find((technology) => technology.slug === slug))
  .filter(Boolean);

const handleHomeScroll = (path) => {
  const targetId = path.replace('#', '');
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

function LazySection({ component: Component, id, minHeight = '40vh', ...props }) {
  const sectionRef = React.useRef(null);
  const [isNearViewport, setIsNearViewport] = React.useState(() => Boolean(window.location.hash));

  React.useEffect(() => {
    if (isNearViewport) return undefined;
    const placeholder = sectionRef.current;
    if (!placeholder || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: '1000px 0px' });
    const loadAll = () => setIsNearViewport(true);
    observer.observe(placeholder);
    window.addEventListener('evolvia:load-home-sections', loadAll);
    return () => {
      observer.disconnect();
      window.removeEventListener('evolvia:load-home-sections', loadAll);
    };
  }, [isNearViewport]);

  if (!isNearViewport) {
    return (
      <div
        ref={sectionRef}
        id={id}
        className="home-section-placeholder"
        style={{ minHeight }}
        aria-hidden="true"
      />
    );
  }

  return (
    <Suspense fallback={<div className="home-section-placeholder" style={{ minHeight }} aria-hidden="true" />}>
      <Component {...props} />
    </Suspense>
  );
}

export function HomePage({ onNavigate }) {
  return (
    <>
      <LazySection component={Hero} id="home" minHeight="100svh" onNavigate={onNavigate || handleHomeScroll} />

      {/* ── Curtain wrapper: slides over the sticky hero as the user scrolls ── */}
      <div className="content-over-hero">
        <LazySection component={About} id="about" minHeight="740px" />
        <LazySection component={Services} id="services" minHeight="760px" onNavigate={onNavigate || handleHomeScroll} />
        <LazySection component={AIServices} id="ai-services" minHeight="700px" />
        <LazySection component={Works} id="works" minHeight="900px" onNavigate={onNavigate || handleHomeScroll} />
        <LazySection component={Technology} id="technology" minHeight="1000px" />
        <LazySection component={TechnologyMarquee}
          technologies={HOME_MARQUEE_TECHNOLOGIES}
          speed={40}
          className="home-technology-marquee"
        />
        <LazySection component={Process} id="process" minHeight="780px" />
        <LazySection component={Industries} id="industries" minHeight="700px" />
        <LazySection component={Blog} id="blog" minHeight="800px" />
        <LazySection component={Careers} id="careers" minHeight="1000px" />
        <LazySection component={Team} id="team" minHeight="800px" />
        <section id="cta" className="home-cta-section">
          <div className="container home-cta-inner">
            <div>
              <span className="section-tag">READY WHEN YOU ARE</span>
              <h2>Have an idea worth building?</h2>
              <p>Tell us what you&apos;re working on. We&apos;ll help turn it into a reliable digital product.</p>
            </div>
            <div className="home-cta-actions">
              <button type="button" className="home-cta-primary" onClick={() => (onNavigate || handleHomeScroll)('/#contact')}>
                Start a project <span aria-hidden="true">→</span>
              </button>
              <EmailLink className="home-cta-secondary">Talk to us</EmailLink>
            </div>
          </div>
        </section>
        <LazySection component={FinalCTA} id="contact" minHeight="500px" />
      </div>
    </>
  );
}

function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="route-page-header">
      <div className="container route-page-inner">
        <span className="section-tag">{eyebrow}</span>
        <h1 className="route-page-title">{title}</h1>
        {subtitle && <p className="route-page-subtitle">{subtitle}</p>}
      </div>
    </header>
  );
}

function PointsList({ points, className = 'check-list' }) {
  if (!points?.length) return null;

  return (
    <ul className={className}>
      {points.map((point) => <li key={point}>{point}</li>)}
    </ul>
  );
}

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = SERVICES_DATA.find((item) => item.id === slug);
  const aiService = aiServices.find((item) => item.id === slug);

  if (!service && !aiService) return <NotFoundPage />;

  const item = service || aiService;
  const tags = service?.tags || aiService.technologies;
  const serviceTechnologies = tags.map(findTechnology).filter(Boolean);

  return (
    <div className="route-page-shell">
      <PageHeader
        eyebrow={aiService ? 'AI SERVICE' : 'SERVICE'}
        title={item.title}
        subtitle={aiService?.description || item.points.join(' · ')}
      />
      <section className="route-section container">
        <div className="detail-layout">
          <div className="content-card large-card">
            {item.image && (
              <div className="detail-cover">
                <img src={item.image} alt={`${item.title} cover`} width={item.imageWidth} height={item.imageHeight} loading="lazy" decoding="async" />
              </div>
            )}
            <div className="detail-heading">
              <span className="mini-number">{service?.number || 'AI'}</span>
              <h2>{item.title}</h2>
            </div>
            {service ? (
              <PointsList points={service.points} />
            ) : (
              <>
                <p>{aiService.description}</p>
                <h3>What this service supports</h3>
                <PointsList points={aiService.points} />
                <div className="metric-block">
                  <span className="metric-label">Key benefit</span>
                  <strong>{aiService.benefit}</strong>
                </div>
              </>
            )}
            <div className="route-tech-block">
              <span className="capsule-label">Relevant technology</span>
              <div className="route-tech-list">
                {serviceTechnologies.map((technology) => (
                  <TechnologyItem technology={technology} variant="chip" key={technology.slug} />
                ))}
              </div>
            </div>
          </div>
          <aside className="content-card sidebar-card">
            <h3>{service ? 'What this service delivers' : 'A practical outcome'}</h3>
            {service ? (
              <ul className="check-list">
                <li>Delivery architecture and roadmap planning</li>
                <li>Cross-functional product and engineering execution</li>
                <li>Performance, reliability, and scale optimization</li>
                <li>Documentation and operational handoff</li>
              </ul>
            ) : <p>{aiService.benefit}</p>}
            <div className="metric-block">
              <span className="metric-label">Outcome</span>
              <strong>{service?.stat || aiService.benefit}</strong>
            </div>
          </aside>
        </div>
      </section>
      <section className="route-section container route-row-actions">
        <Link to="/#services" className="secondary-link">← Back to services</Link>
      </section>
    </div>
  );
}

export function WorkDetailPage() {
  const { slug } = useParams();
  const project = PROJECTS_DATA.find((item) => item.id === slug);

  if (!project) return <NotFoundPage />;

  const projectTechnologies = project.technologies.map(findTechnology).filter(Boolean);

  return (
    <div className="route-page-shell">
      <PageHeader
        eyebrow="CASE STUDY"
        title={project.title}
        subtitle={project.points.join(' · ')}
      />
      <section className="route-section container">
        <div className="detail-layout">
          <div className="content-card large-card">
            <div className="project-banner" style={{ background: project.gradient }}>
              {project.image && (
                <img
                  className="project-banner-image"
                  src={project.image}
                  alt={`${project.title} project interface`}
                  width={project.imageWidth}
                  height={project.imageHeight}
                  loading="lazy"
                  decoding="async"
                />
              )}
              <span>{project.category}</span>
              <strong>{project.caseStudyType || 'Case study'}</strong>
            </div>
            <div className="detail-copy-space">
              <p className="case-study-note">Illustrative portfolio concept; not a client engagement or reported result.</p>
              <h2>Challenge</h2>
              <p>{project.challenge}</p>
              <h2>Solution</h2>
              <p>{project.solution}</p>
              <h2>Approach</h2>
              <PointsList points={project.approach} />
              <h2>Key features</h2>
              <PointsList points={project.features} />
              <h2>Architecture</h2>
              <PointsList points={project.architecture} />
              <h2>Development process</h2>
              <PointsList points={project.developmentProcess} />
              <h2>Illustrative outcomes</h2>
              <PointsList points={project.results} />
              <h2>Measures to track</h2>
              <PointsList points={project.metrics} />
              <h2>Lessons</h2>
              <PointsList points={project.lessons} />
              <div className="route-tech-block">
                <span className="capsule-label">Technology</span>
                <div className="route-tech-list">
                  {projectTechnologies.map((technology) => (
                    <TechnologyItem technology={technology} variant="chip" key={technology.slug} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <aside className="content-card sidebar-card">
            <h3>Project snapshot</h3>
            <ul className="check-list">
              <li><strong>Category:</strong> {project.category}</li>
              <li><strong>Year:</strong> {project.year}</li>
            <li><strong>Industry:</strong> {project.industry}</li>
            <li><strong>Timeline:</strong> {project.timeline}</li>
            <li><strong>Team:</strong> {project.teamSize}</li>
            <li><strong>Services:</strong> {project.services.join(', ')}</li>
            </ul>
          </aside>
        </div>
      </section>
      <section className="route-section container route-row-actions">
        <Link to="/#works" className="secondary-link">← Back to work</Link>
      </section>
    </div>
  );
}

export function TechnologyDetailPage() {
  const { slug } = useParams();
  const reduceMotion = useReducedMotion();
  const tech = technologies.find((item) => item.slug === slug);
  const techGroups = tech?.groups || (tech ? [tech.category] : []);
  const relatedTechnologies = technologies
    .filter((item) => item.slug !== tech?.slug
      && (item.groups || [item.category]).some((group) => techGroups.includes(group)))
    .slice(0, 5);
  const usingProjects = tech
    ? PROJECTS_DATA.filter((project) => (
      project.technologies.some((name) => findTechnology(name)?.slug === tech.slug)
    ))
    : [];
  const capabilityMap = {
    Frontend: ['Responsive interface architecture', 'Accessible, reusable components', 'Performance-conscious rendering'],
    Backend: ['Typed service and API boundaries', 'Reliable business logic and integrations', 'Scalable request and data workflows'],
    Database: ['Thoughtful data modeling and access patterns', 'Reliable persistence and query design', 'Performance-aware indexing and caching'],
    Cloud: ['Resilient infrastructure and deployment', 'Managed services aligned to product needs', 'Secure, observable operations'],
    DevOps: ['Repeatable releases and environment setup', 'Infrastructure and workload automation', 'Production observability and reliability'],
    AI: ['Grounded model and data workflows', 'Evaluation and orchestration patterns', 'Responsible integration into products'],
    'AI & Backend': ['Production-ready data and model services', 'Scalable API and processing workflows', 'Maintainable application architecture'],
    Design: ['Consistent design and interaction systems', 'High-fidelity motion and prototyping', 'Accessible, responsive experiences'],
    Mobile: ['Native-feeling cross-platform experiences', 'Device-aware performance and interaction', 'Reliable release and update workflows'],
  };
  const useCaseMap = {
    Frontend: ['Customer-facing web applications', 'Product dashboards and design systems'],
    Backend: ['Product APIs and business platforms', 'Real-time services and integrations'],
    Database: ['Transactional and product data', 'Search, cache, and event-driven workloads'],
    Cloud: ['Global application delivery', 'Reliable, scalable platform infrastructure'],
    DevOps: ['Automated delivery pipelines', 'Containerized and observable services'],
    AI: ['Intelligent assistants and automation', 'Search, synthesis, and decision support'],
    'AI & Backend': ['Intelligent product services', 'Data-intensive application backends'],
    Design: ['Interaction-rich product interfaces', 'Design systems and 3D experiences'],
    Mobile: ['iOS and Android applications', 'Field, commerce, and companion apps'],
  };
  const capabilities = capabilityMap[tech?.category] || capabilityMap.Backend;
  const useCases = useCaseMap[tech?.category] || useCaseMap.Backend;

  if (!tech) return <NotFoundPage />;

  return (
    <div className="route-page-shell technology-detail-page">
      <header className="technology-detail-hero">
        <div className="container technology-detail-hero__inner">
          <motion.div
            className="technology-detail-hero__visual"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.86, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <TechnologyItem technology={tech} variant="hero" />
            <span className="technology-detail-scroll" aria-hidden="true">↓ SCROLL TO EXPLORE</span>
          </motion.div>
          <motion.div
            className="technology-detail-hero__copy"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-tag">{tech.category.toUpperCase()} / {tech.level.toUpperCase()}</span>
            <h1 className="route-page-title">{tech.name}</h1>
            <p className="route-page-subtitle">{tech.description}</p>
          </motion.div>
        </div>
      </header>
      <section className="route-section container">
        <div className="detail-layout">
          <article className="content-card large-card">
            <span className="capsule-label">Why we use it</span>
            <h2>{tech.name} in the stack</h2>
            <p>{tech.description}</p>
            <p>
              We bring {tech.name} into a product when it strengthens the system as a whole:
              clear interfaces, maintainable delivery, and a dependable experience for the people
              who use it.
            </p>
          </article>
          <aside className="content-card sidebar-card">
            <span className="capsule-label">Capabilities</span>
            <ul className="check-list">
              {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
            </ul>
          </aside>
        </div>
      </section>
      <section className="route-section container">
        <div className="route-grid route-grid-2">
          <div className="content-card">
            <span className="capsule-label">Use cases</span>
            <h2>Where it creates value</h2>
            <ul className="check-list">
              {useCases.map((useCase) => <li key={useCase}>{useCase}</li>)}
            </ul>
          </div>
          <blockquote className="technology-quote">
            <p>“We choose {tech.name} when it fits the product’s real constraints—not simply because it is popular.”</p>
            <cite>Our engineering principle</cite>
          </blockquote>
        </div>
      </section>
      {usingProjects.length > 0 && (
        <section className="route-section container">
          <div className="technology-detail-section-heading">
            <span className="section-tag">IN PRACTICE</span>
            <h2>Projects using {tech.name}</h2>
          </div>
          <div className="route-grid route-grid-2">
            {usingProjects.map((project) => (
              <Link className="content-card link-card" to={`/works/${project.id}`} key={project.id}>
                <span className="mini-flag">{project.category}</span>
                <h3>{project.title}</h3>
                <PointsList points={project.points} />
                <span className="secondary-link">View case study →</span>
              </Link>
            ))}
          </div>
        </section>
      )}
      {relatedTechnologies.length > 0 && (
        <section className="route-section container">
          <div className="technology-detail-section-heading">
            <span className="section-tag">CONNECTED STACK</span>
            <h2>Related technologies</h2>
          </div>
          <div className="route-tech-list">
            {relatedTechnologies.map((technology) => (
              <TechnologyItem technology={technology} variant="chip" key={technology.slug} />
            ))}
          </div>
        </section>
      )}
      <section className="route-section container route-row-actions">
        <div className="technology-detail-cta">
          <div>
            <span className="section-tag">BUILD WITH INTENT</span>
            <h2>Make the right technology work for your product.</h2>
          </div>
          <EmailLink className="secondary-link" subject="Technology consultation">
            Start a conversation →
          </EmailLink>
        </div>
        <Link to="/#technology" className="secondary-link">← Back to technology</Link>
      </section>
    </div>
  );
}

export function BlogDetailPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) return <NotFoundPage />;

  const article = buildArticle(post);

  return (
    <div className="route-page-shell">
      <PageHeader
        eyebrow={post.category}
        title={post.title}
        subtitle={post.points.join(' · ')}
      />
      <section className="route-section container">
        <article className="article-panel">
          {post.image && (
            <img className="article-cover" src={post.image} alt={`${post.title} cover`} width={post.imageWidth} height={post.imageHeight} loading="lazy" decoding="async" />
          )}
          <div className="article-meta">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="tag-row">
            {post.tags.map((tag) => (
              <span className="tag-pill" key={tag}>{tag}</span>
            ))}
          </div>
        </article>
      </section>
      <section className="route-section container route-row-actions">
        <Link to="/#blog" className="secondary-link">← Back to blog</Link>
      </section>
    </div>
  );
}

export function CareerDetailPage() {
  const { slug } = useParams();
  const job = jobs.find((item) => item.id === slug);
  if (!job) return <NotFoundPage />;

  return (
    <div className="route-page-shell">
      <PageHeader eyebrow={`${job.department} · ${job.type}`} title={job.position} subtitle={job.description} />
      <section className="route-section container">
        <div className="detail-layout">
          <article className="content-card large-card">
            {job.image && (
              <div className="detail-cover">
                <img src={job.image} alt={`${job.position} workspace`} width={job.imageWidth} height={job.imageHeight} loading="lazy" decoding="async" />
              </div>
            )}
            <h2>Responsibilities</h2>
            <PointsList points={job.responsibilities} />
            <h2>Requirements</h2>
            <PointsList points={job.requirements} />
            <h2>Nice to have</h2>
            <PointsList points={job.niceToHave} />
            <h2>Interview process</h2>
            <PointsList points={job.interviewProcess} />
          </article>
          <aside className="content-card sidebar-card">
            <span className="capsule-label">ROLE DETAILS</span>
            <ul className="check-list">
              <li><strong>Location:</strong> {job.location}</li>
              <li><strong>Experience:</strong> {job.experience}</li>
              <li><strong>Employment:</strong> {job.type}</li>
              {job.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
            <p>
              {job.applicationProcess.split(CONTACT_EMAIL)[0]}
              <EmailLink />
              {job.applicationProcess.split(CONTACT_EMAIL)[1]}
            </p>
            <EmailLink className="secondary-link" subject={`Application: ${job.position}`}>
              Apply by email →
            </EmailLink>
          </aside>
        </div>
      </section>
      <section className="route-section container route-row-actions">
        <Link to="/#careers" className="secondary-link">← Back to careers</Link>
      </section>
    </div>
  );
}

export function TeamDetailPage() {
  const { slug } = useParams();
  const member = team.find((item) => item.id === slug);
  if (!member) return <NotFoundPage />;

  return (
    <div className="route-page-shell">
      <PageHeader eyebrow="TEAM PROFILE" title={member.name} subtitle={member.role} />
      <section className="route-section container">
        <div className="detail-layout">
          <article className="content-card large-card">
            {member.image ? (
              <img className="team-detail-image" src={member.image} alt={member.name} width={member.imageWidth} height={member.imageHeight} loading="lazy" decoding="async" />
            ) : (
              <div className="team-avatar" style={{ background: member.gradient }}>{member.initials}</div>
            )}
            <h2>{member.role}</h2>
            <p>{member.bio}</p>
            <h3>Areas of focus</h3>
            <PointsList points={member.expertise} />
          </article>
          <aside className="content-card sidebar-card">
            <span className="capsule-label">WORKING PRINCIPLES</span>
            <PointsList points={member.points} />
          </aside>
        </div>
      </section>
      <section className="route-section container route-row-actions">
        <Link to="/#team" className="secondary-link">← Back to the team</Link>
      </section>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="route-page-shell">
      <PageHeader
        eyebrow="404 ERROR"
        title="Page not found."
        subtitle="The page you are looking for may have been moved, renamed, or does not exist."
      />
      <section className="route-section container">
        <div className="content-card large-card text-center py-5">
          <p className="mb-4" style={{ maxWidth: '520px', margin: '0 auto 24px', color: 'var(--text-muted)' }}>
            Looking for something specific? Return to the homepage or explore our core capabilities and projects below.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap mb-5">
            <Link
              to="/"
              className="secondary-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 28px',
                borderRadius: '9999px',
                background: 'var(--accent)',
                color: 'var(--warm-white)',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              ← Return Home
            </Link>
            <Link
              to="/#contact"
              className="secondary-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 28px',
                borderRadius: '9999px',
                border: '1px solid color-mix(in srgb, var(--black) 15%, transparent)',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Contact Us →
            </Link>
          </div>
          <div className="route-grid route-grid-3 text-start mt-4">
            <Link to="/#services" className="link-card p-4">
              <span className="capsule-label">SERVICES</span>
              <h3 className="h5 mt-2 mb-1">Our Capabilities</h3>
              <p className="small text-muted mb-0">Web, mobile, AI automation, and cloud platforms.</p>
            </Link>
            <Link to="/#works" className="link-card p-4">
              <span className="capsule-label">PROJECTS</span>
              <h3 className="h5 mt-2 mb-1">Selected Work</h3>
              <p className="small text-muted mb-0">Engineered systems and digital architectures.</p>
            </Link>
            <Link to="/#technology" className="link-card p-4">
              <span className="capsule-label">STACK</span>
              <h3 className="h5 mt-2 mb-1">Technology</h3>
              <p className="small text-muted mb-0">Tools and platforms powering our builds.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function buildArticle(post) {
  const articleMap = {
    'ai-in-software-dev': {
      paragraphs: [
        'AI changes the nature of engineering work in a more interesting way than it changes the engineering profession itself. The strongest teams use AI to compress research cycles, speed up routine implementation, and focus human attention on system design, trade-offs, and product judgment.',
        'This does not eliminate the need for senior technical taste. It increases the value of people who can define what a system should do, what constraints matter, and how to evaluate output before it reaches production. In other words, AI is a multiplier for thoughtful builders, not a replacement for them.',
        'The real shift is in the workflow: faster prototyping, easier exploration, and more time spent understanding user goals and edge cases. The companies that win are the ones that combine AI with clear engineering standards, not the ones that push raw model output straight to production.',
      ],
    },
    'building-for-scale': {
      paragraphs: [
        'Architecture should be a consequence of constraints, not a fashion statement. Many teams adopt microservices too early, creating a sprawling operational burden before the product has reached the point where distribution and load justify that complexity.',
        'At Evolvia, we prefer systems that stay simple until the real reasons for complexity appear: throughput bottlenecks, team boundaries, or event-driven workflows that genuinely require decoupling across services. The right architecture is one you can explain in a sentence and operate without ceremony.',
        'Simplicity is not a lack of ambition. It is the discipline that keeps product and infrastructure aligned while the business grows.',
      ],
    },
    'cloud-cost-control': {
      paragraphs: [
        'Cloud cost overruns are rarely caused by a single expensive service. They are usually an accumulation of decisions made while speed was the priority and cost was an abstract future problem. By the time those decisions are visible in a monthly bill, they are already baked into the system design.',
        'The better approach is to treat cost as a design variable from the start. That means making performance and resource trade-offs explicit, understanding the real cost of a query path or background job, and designing for observability before demand spikes.',
        'When architecture, telemetry, and business model are aligned, cloud cost becomes a product discipline rather than a recurring operational surprise.',
      ],
    },
    'design-system-value': {
      paragraphs: [
        'Design systems become valuable not because they make a product look consistent, but because they reduce the amount of repetitive decision-making a team has to do. Over time, that compounding effect becomes a serious productivity advantage.',
        'The first year is often frustrating because a design system feels like overhead. The second year pays off because the team has a common language for interaction, layout, and motion, which makes implementation faster and quality more consistent.',
        'The best design systems are not static libraries. They evolve with product reality and encode the patterns teams keep returning to because they work in context.',
      ],
    },
    'rag-production': {
      paragraphs: [
        'Retrieval-augmented generation succeeds in demos because the setup is narrow, controlled, and highly curated. Production introduces noisy data, changing retrieval quality, and downstream expectations that the system behaves predictably over time.',
        'The gap between a promising prototype and a reliable AI feature is usually filled by evaluation, observability, and system boundaries. If you do not define what success looks like, which outputs are acceptable, and how retrieval quality will be measured, the model will appear confident while the product quietly drifts out of alignment.',
        'Good RAG systems do not just retrieve context well; they provide a disciplined framework for satisfying user intent in a way that remains auditable and composable over time.',
      ],
    },
  };

  return articleMap[post.slug] || {
    paragraphs: [
      'This article explores the trade-offs behind modern product engineering, the role of thoughtfulness in technology decisions, and the way systems scale with deliberate operational design.',
      'The most durable digital products are built by teams that balance business goals with technical clarity, not by those who chase trends without discipline.',
    ],
  };
}
