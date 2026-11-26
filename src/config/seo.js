import { ADDRESS, COMPANY_NAME, CONTACT_EMAIL, TAGLINE } from './contact.js';
import { FOOTER_INFO, SOCIAL_LINKS } from './footer.js';

const DEFAULT_SITE_URL = 'https://evolvia.vrvora11.workers.dev';

function resolveSiteUrl() {
  const viteUrl =
    typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL
      ? import.meta.env.VITE_SITE_URL
      : '';
  const nodeUrl =
    typeof globalThis !== 'undefined' &&
    globalThis.process &&
    globalThis.process.env &&
    globalThis.process.env.VITE_SITE_URL
      ? globalThis.process.env.VITE_SITE_URL
      : '';

  const raw = (viteUrl || nodeUrl || DEFAULT_SITE_URL).trim();
  return raw.replace(/\/+$/, '');
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = COMPANY_NAME;
export const LEGAL_NAME = FOOTER_INFO.legalName || 'Evolvia Infotech';
export const DEFAULT_OG_IMAGE = '/hero-poster.webp';
export const SITE_TAGLINE = TAGLINE;
export const SITE_DESCRIPTION =
  'Evolvia Tech (Evolvia Infotech) is an AI-focused software development and IT company in Ahmedabad, Gujarat, India. We engineer custom web applications, mobile apps, AI systems, and scalable cloud solutions.';

export const VERIFIED_SOCIAL_URLS = SOCIAL_LINKS.map((item) => item.url).filter(Boolean);

/**
 * Build an absolute canonical URL with consistent trailing-slash handling:
 * - Root path "/" -> `${SITE_URL}/`
 * - Inner paths   -> `${SITE_URL}/path` (no trailing slash)
 */
export function buildCanonicalUrl(path = '/') {
  if (!path || path === '/') {
    return `${SITE_URL}/`;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath.replace(/\/+$/, '')}`;
}

export function buildImageUrl(imagePath = DEFAULT_OG_IMAGE) {
  if (!imagePath) return `${SITE_URL}${DEFAULT_OG_IMAGE}`;
  if (/^https?:\/\//i.test(imagePath)) return imagePath;
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${SITE_URL}${cleanPath}`;
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: `${SITE_URL}/`,
    logo: buildImageUrl('/logo-full.webp'),
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    telephone: FOOTER_INFO.phone || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Maninagar',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    areaServed: [
      { '@type': 'City', name: 'Ahmedabad' },
      { '@type': 'State', name: 'Gujarat' },
      { '@type': 'Country', name: 'India' },
    ],
    sameAs: VERIFIED_SOCIAL_URLS,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT_EMAIL,
      telephone: FOOTER_INFO.phone || undefined,
      availableLanguage: ['English', 'Hindi', 'Gujarati'],
    },
  };
}

export function buildProfessionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: `${SITE_URL}/`,
    image: buildImageUrl(DEFAULT_OG_IMAGE),
    logo: buildImageUrl('/logo-full.webp'),
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    telephone: FOOTER_INFO.phone || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS,
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    areaServed: ['Ahmedabad', 'Gujarat', 'India'],
    sameAs: VERIFIED_SOCIAL_URLS,
    knowsAbout: [
      'Custom Software Development',
      'Artificial Intelligence Development',
      'Generative AI Integration',
      'Web Application Development',
      'Mobile App Development',
      'Cloud Computing & DevOps',
      'UI/UX Design Systems',
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: SITE_DESCRIPTION,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

export function buildBreadcrumbSchema(items = []) {
  if (!items || items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      ...(item.path ? { item: buildCanonicalUrl(item.path) } : {}),
    })),
  };
}

export function buildWebPageSchema({ title, description, path, type = 'WebPage' }) {
  const url = buildCanonicalUrl(path);
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-IN',
  };
}

export function buildServiceSchema(service) {
  if (!service) return null;
  const url = buildCanonicalUrl(`/services/${service.id}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.title,
    serviceType: service.category || service.title,
    description: service.tagline || service.overview?.[0] || SITE_DESCRIPTION,
    url,
    image: buildImageUrl(service.image),
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    areaServed: ['Ahmedabad', 'Gujarat', 'India'],
  };
}

export function buildBlogPostingSchema(post) {
  if (!post) return null;
  const url = buildCanonicalUrl(`/blog/${post.slug}`);
  const authorName = post.author || 'Evolvia Engineering Team';
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: post.title,
    description: post.metaDescription || post.summary,
    image: buildImageUrl(post.image),
    datePublished: post.publishedIso || undefined,
    dateModified: post.updatedIso || post.publishedIso || undefined,
    author: {
      '@type': post.authorType || 'Organization',
      name: authorName,
      url: post.authorUrl ? buildCanonicalUrl(post.authorUrl) : `${SITE_URL}/team`,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    articleSection: post.category,
    keywords: Array.isArray(post.tags) ? post.tags.join(', ') : undefined,
    inLanguage: 'en-IN',
  };
}

export function buildPersonSchema(member) {
  if (!member) return null;
  const url = buildCanonicalUrl(`/team/${member.id}`);
  const sameAs = Object.values(member.socials || {}).filter(
    (link) => typeof link === 'string' && /^https?:\/\//i.test(link)
  );
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${url}#person`,
    name: member.name,
    jobTitle: member.role,
    description: member.bio || member.tagline,
    image: buildImageUrl(member.image),
    url,
    worksFor: {
      '@id': `${SITE_URL}/#organization`,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}
