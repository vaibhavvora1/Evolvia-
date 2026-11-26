# SEO Implementation & Validation Report — Evolvia Tech

**Production URL:** `https://evolvia.vrvora11.workers.dev/`  
**Company:** Evolvia Tech (`Evolvia Infotech`) — Maninagar, Ahmedabad, Gujarat, India  
**Implementation Date:** 2026-11-26  

---

## 1. Before vs. After Comparison

| Area | Before | After |
| :--- | :--- | :--- |
| **Canonical & Base Domain** | Hardcoded `https://evolvia.tech` across `index.html`, `robots.txt`, `sitemap.xml`, and all 19 pages | Centralized in `src/config/seo.js` (`SITE_URL` via `VITE_SITE_URL` or `https://evolvia.vrvora11.workers.dev`) |
| **404 / Invalid Slug `noindex`** | Detail pages overwrote `NotFound`'s `noindex, nofollow` due to React `useEffect` order | Detail pages pass `robots: item ? 'index, follow' : 'noindex, nofollow'` and omit `canonicalUrl` when missing |
| **Technical SEO Files** | `robots.txt` & `sitemap.xml` pointed to `evolvia.tech`; `llms.txt` and `llms.xml` missing | `public/robots.txt`, `public/sitemap.xml` (82 URLs), `public/llms.txt`, and `public/llms.xml` aligned to production URL |
| **Structured Data (JSON-LD)** | Basic `Organization` only in `index.html` with `evolvia.tech` | `Organization`, `ProfessionalService`, `WebSite`, `WebPage`/`CollectionPage`/`AboutPage`/`ContactPage`, `Service`, `BreadcrumbList`, `BlogPosting`, `Person` |
| **Blog Section (`/blog`)** | 5 short 3-paragraph posts; no filters, no search, `takeaways` bug, no `BlogPosting` schema | 10 full guides covering all core topics, category filters, search, H2/H3 sections, takeaways, updated dates, social sharing, and `BlogPosting` JSON-LD |
| **Local SEO & AEO** | Minimal Ahmedabad context; no FAQ Q&A section on Home | Natural Maninagar, Ahmedabad, Gujarat, India context across Home, About, Services, Contact, Footer + 6-question AEO FAQ section on Home |

---

## 2. Files Created & Modified

### Documentation & Strategy
- `SEO_AUDIT.md` — Full Phase 1 crawl and codebase audit.
- `KEYWORD_RESEARCH.md` — Primary, secondary, long-tail, intent classification, and 1:1 page mapping.
- `SEO_IMPLEMENTATION_REPORT.md` — This report, validation summary, and Search Console / Bing instructions.

### Centralized SEO & Technical Files
- `src/config/seo.js` — Single source of truth for `SITE_URL`, `buildCanonicalUrl`, `buildImageUrl`, and JSON-LD builders.
- `src/hooks/usePageMeta.js` — Dynamic `<title>`, meta description, Open Graph, Twitter Card, `robots`, `canonical` cleanup, and dynamic JSON-LD injection.
- `index.html` — Updated canonical, OG/Twitter metadata, `robots`, and `@graph` (`Organization` + `WebSite`) JSON-LD.
- `public/robots.txt` — Allows public routes, disallows `/careers/*/apply`, points `Sitemap:` to `https://evolvia.vrvora11.workers.dev/sitemap.xml`.
- `scripts/generate-sitemap.js` & `public/sitemap.xml` — Generates 82 canonical HTTPS URLs using `SITE_URL`.
- `public/llms.txt` & `public/llms.xml` — Accurate AI-discovery summaries (informational convention; not a guaranteed ranking mechanism).

### Pages & Components
- `src/data/blog.js`, `src/pages/Blog.jsx`, `src/pages/BlogDetail.jsx` — 10 full articles, category filtering, search, H2/H3 sections, takeaways, internal/external links, social sharing, and `BlogPosting` JSON-LD.
- `src/pages/Home.jsx`, `src/pages/About.jsx`, `src/pages/Services.jsx`, `src/pages/Contact.jsx`, `src/components/Footer/Footer.jsx` — Local Ahmedabad/Gujarat context, AEO FAQ section, breadcrumbs, and structured data.
- `src/pages/ServiceDetail.jsx`, `src/pages/Works.jsx`, `src/pages/WorkDetail.jsx`, `src/pages/Technologies.jsx`, `src/pages/TechnologyDetail.jsx`, `src/pages/Team.jsx`, `src/pages/TeamDetail.jsx`, `src/pages/Careers.jsx`, `src/pages/CareerDetail.jsx`, `src/pages/ApplyForm.jsx`, `src/pages/PrivacyPolicy.jsx`, `src/pages/TermsOfService.jsx`, `src/pages/CookiePolicy.jsx` — Migrated to `src/config/seo.js` and fixed `noindex` handling.

---

## 3. Local Build & Validation Results

- **Stale Domain Check:** `Select-String` for `evolvia.tech` across `index.html`, `public/`, `scripts/`, and `src/` returned **0 matches**.
- **Linter (`npm run lint`):** `oxlint` passed with **0 warnings and 0 errors** across 59 files.
- **Sitemap (`npm run sitemap`):** Generated `public/sitemap.xml` with **82 URLs** under `https://evolvia.vrvora11.workers.dev`.
- **Production Build (`npm run build`):** Vite v8.3.2 transformed 109 modules and built cleanly in 6.26s.
- **Verified `dist/` Technical Assets:**
  - `dist/robots.txt` (109 bytes)
  - `dist/sitemap.xml` (15,654 bytes)
  - `dist/llms.txt` (4,358 bytes)
  - `dist/llms.xml` (4,452 bytes)

---

## 4. Google Search Console Submission Instructions

1. Open [Google Search Console](https://search.google.com/search-console) and click **Add Property**.
2. Choose **URL prefix** and enter `https://evolvia.vrvora11.workers.dev/`.
3. Verify ownership using the **HTML tag** method (add the verification `<meta>` tag to `index.html` and redeploy) or Google Analytics if connected.
4. Go to **Indexing > Sitemaps**, enter `sitemap.xml`, and click **Submit**.
5. Use **URL Inspection** on key pages (`/`, `/services`, `/services/ai`, `/services/web`, `/about`, `/contact`, `/blog`) and click **Request Indexing** after deploying the updated `dist/`.
6. Monitor **Indexing > Pages** for crawl errors, soft-404s, or canonical conflicts.

---

## 5. Bing Webmaster Tools Submission Instructions

1. Open [Bing Webmaster Tools](https://www.bing.com/webmasters) and sign in.
2. Add `https://evolvia.vrvora11.workers.dev/` (you can import directly from Google Search Console once verified, or verify via HTML meta tag).
3. Go to **Sitemaps > Submit Sitemap** and submit `https://evolvia.vrvora11.workers.dev/sitemap.xml`.
4. Check **Site Explorer** and **URL Inspection** to confirm Bingbot can render JavaScript and read canonical tags.

---

## 6. Google Business Profile (Local SEO) Recommendations

- **Eligibility:** Create/claim a Google Business Profile for **Evolvia Tech** (or **Evolvia Infotech**) in Ahmedabad only if you have a verifiable physical office or service-area registration. Do **not** use a virtual/fake street address.
- **Category:** Primary category *Software company*; secondary categories *Web designer*, *Consultant*.
- **Service Areas:** Ahmedabad, Gandhinagar, Gujarat, India.
- **Website Link:** `https://evolvia.vrvora11.workers.dev/` (update when a custom domain launches).
- **Reviews:** Request genuine reviews from real clients after project delivery; never generate fake testimonials or ratings.

---

## 7. Checklist & Remaining Manual Steps

### Completed
- [x] Phase 1: Full codebase & live site audit (`SEO_AUDIT.md`)
- [x] Phase 2: Keyword research & 1:1 page mapping (`KEYWORD_RESEARCH.md`)
- [x] Phase 3–4: Centralized SEO config, unique metadata, and self-referencing canonicals across all routes
- [x] Phase 5: Updated `robots.txt`, regenerated `sitemap.xml` (82 URLs), created `llms.txt` & `llms.xml`
- [x] Phase 6: Implemented `Organization`, `ProfessionalService`, `WebSite`, `WebPage`, `Service`, `BreadcrumbList`, `BlogPosting`, and `Person` JSON-LD
- [x] Phase 7–8, 10: Local Ahmedabad/Gujarat optimization, AEO FAQ section, and GEO-ready readable HTML
- [x] Phase 9: Upgraded `/blog` & `/blog/:slug` with 10 in-depth articles, search, category filters, takeaways, and sharing
- [x] Phase 11 & 13: Verified 0 lint errors, clean Vite production build, and presence of all SEO assets in `dist/`

### Remaining / Manual Steps Requiring Account Ownership
- [ ] **Deploy `dist/` to Cloudflare Workers** so `https://evolvia.vrvora11.workers.dev/` serves the updated build, `robots.txt`, `sitemap.xml`, `llms.txt`, and `llms.xml`.
- [ ] **Verify & Submit in Google Search Console and Bing Webmaster Tools** (requires property ownership).
- [ ] **Validate Live URLs after deployment** with Google Rich Results Test, Schema Markup Validator, and PageSpeed Insights / Lighthouse.
- [ ] **Replace Demo Testimonials** in `src/data/testimonials.js` and `src/components/Hero/Hero.jsx` with real client feedback before adding any `Review` schema.
- [ ] **Custom Domain Migration (Future):** When moving to a custom domain, set `VITE_SITE_URL`, update `index.html` and `public/robots.txt`, run `npm run sitemap`, and configure HTTP 301 redirects from `workers.dev` to the custom domain.
