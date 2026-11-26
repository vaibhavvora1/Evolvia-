import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { SITE_URL, buildCanonicalUrl } from '../src/config/seo.js';
import { services, aiServices } from '../src/data/services.js';
import { projects } from '../src/data/projects.js';
import technologies from '../src/data/technologies.js';
import { team } from '../src/data/team.js';
import { blog } from '../src/data/blog.js';
import { jobs } from '../src/data/careers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const currentDate = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/works', priority: '0.9', changefreq: 'weekly' },
  { path: '/technology', priority: '0.8', changefreq: 'monthly' },
  { path: '/team', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/careers', priority: '0.7', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
  { path: '/cookie-policy', priority: '0.3', changefreq: 'yearly' },
];

const urls = [];

for (const route of staticRoutes) {
  urls.push({
    loc: buildCanonicalUrl(route.path),
    lastmod: currentDate,
    changefreq: route.changefreq,
    priority: route.priority,
  });
}

const allServices = [...services, ...(aiServices || [])];
const seenServiceIds = new Set();
for (const s of allServices) {
  if (s.id && !seenServiceIds.has(s.id)) {
    seenServiceIds.add(s.id);
    urls.push({
      loc: buildCanonicalUrl(`/services/${s.id}`),
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8',
    });
  }
}

for (const p of projects) {
  if (p.id) {
    urls.push({
      loc: buildCanonicalUrl(`/works/${p.id}`),
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8',
    });
  }
}

for (const t of technologies) {
  if (t.slug) {
    urls.push({
      loc: buildCanonicalUrl(`/technology/${t.slug}`),
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7',
    });
  }
}

for (const m of team) {
  if (m.id) {
    urls.push({
      loc: buildCanonicalUrl(`/team/${m.id}`),
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6',
    });
  }
}

for (const b of blog) {
  if (b.slug || b.id) {
    urls.push({
      loc: buildCanonicalUrl(`/blog/${b.slug || b.id}`),
      lastmod: b.updatedIso || b.publishedIso || currentDate,
      changefreq: 'monthly',
      priority: '0.7',
    });
  }
}

for (const j of jobs) {
  if (j.id) {
    urls.push({
      loc: buildCanonicalUrl(`/careers/${j.id}`),
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7',
    });
  }
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemapXml, 'utf-8');
console.log(`Successfully generated sitemap for ${SITE_URL} with ${urls.length} URLs at ${outputPath}`);
