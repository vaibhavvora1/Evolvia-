// Route chunk prefetch map
const ROUTE_CHUNK_IMPORTS = {
  '/': () => import('../pages/Home'),
  '/about': () => import('../pages/About'),
  '/services': () => import('../pages/Services'),
  '/works': () => import('../pages/Works'),
  '/portfolio': () => import('../pages/Works'),
  '/technology': () => import('../pages/Technologies'),
  '/technologies': () => import('../pages/Technologies'),
  '/team': () => import('../pages/Team'),
  '/blog': () => import('../pages/Blog'),
  '/careers': () => import('../pages/Careers'),
  '/careers/apply': () => import('../pages/ApplyForm'),
  '/contact': () => import('../pages/Contact'),
  '/privacy-policy': () => import('../pages/PrivacyPolicy'),
  '/terms-of-service': () => import('../pages/TermsOfService'),
  '/cookie-policy': () => import('../pages/CookiePolicy'),
  '/services/detail': () => import('../pages/ServiceDetail'),
  '/works/detail': () => import('../pages/WorkDetail'),
  '/technology/detail': () => import('../pages/TechnologyDetail'),
  '/team/detail': () => import('../pages/TeamDetail'),
  '/blog/detail': () => import('../pages/BlogDetail'),
  '/careers/detail': () => import('../pages/CareerDetail'),
};

export function prefetchChunk(path) {
  if (!path) return;

  // Direct exact match
  if (ROUTE_CHUNK_IMPORTS[path]) {
    try {
      ROUTE_CHUNK_IMPORTS[path]();
      return;
    } catch {
      // Ignored
    }
  }

  // Prefix matching for dynamic detail routes
  try {
    if (path.includes('/careers/') && path.endsWith('/apply')) ROUTE_CHUNK_IMPORTS['/careers/apply']?.();
    else if (path.startsWith('/services/')) ROUTE_CHUNK_IMPORTS['/services/detail']?.();
    else if (path.startsWith('/works/') || path.startsWith('/portfolio/')) ROUTE_CHUNK_IMPORTS['/works/detail']?.();
    else if (path.startsWith('/technology/') || path.startsWith('/technologies/')) ROUTE_CHUNK_IMPORTS['/technology/detail']?.();
    else if (path.startsWith('/team/')) ROUTE_CHUNK_IMPORTS['/team/detail']?.();
    else if (path.startsWith('/blog/')) ROUTE_CHUNK_IMPORTS['/blog/detail']?.();
    else if (path.startsWith('/careers/')) ROUTE_CHUNK_IMPORTS['/careers/detail']?.();
  } catch {
    // Ignored
  }
}
