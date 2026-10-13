// Route chunk prefetch map
const ROUTE_CHUNK_IMPORTS = {
  '/': () => import('../pages/Home'),
  '/about': () => import('../pages/About'),
  '/services': () => import('../pages/Services'),
  '/portfolio': () => import('../pages/Portfolio'),
  '/technologies': () => import('../pages/Technologies'),
  '/contact': () => import('../pages/Contact'),
  '/careers': () => import('../pages/Careers'),
  '/blog': () => import('../pages/Blog'),
  '/ai': () => import('../pages/AISolutions'),
  '/services/detail': () => import('../pages/ServiceDetail'),
  '/portfolio/detail': () => import('../pages/PortfolioDetail'),
  '/team/detail': () => import('../pages/TeamDetail'),
  '/technologies/detail': () => import('../pages/TechnologyDetail'),
  '/careers/detail': () => import('../pages/CareerDetail'),
};

export function prefetchChunk(path) {
  if (!path) return;
  // Direct match
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
    if (path.startsWith('/services/')) ROUTE_CHUNK_IMPORTS['/services/detail']?.();
    else if (path.startsWith('/portfolio/') || path.startsWith('/works/')) ROUTE_CHUNK_IMPORTS['/portfolio/detail']?.();
    else if (path.startsWith('/team/')) ROUTE_CHUNK_IMPORTS['/team/detail']?.();
    else if (path.startsWith('/technologies/') || path.startsWith('/technology/')) ROUTE_CHUNK_IMPORTS['/technologies/detail']?.();
    else if (path.startsWith('/careers/')) ROUTE_CHUNK_IMPORTS['/careers/detail']?.();
  } catch {
    // Ignored
  }
}
