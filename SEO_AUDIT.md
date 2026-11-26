# Technical SEO & Site Audit — Evolvia Tech

**Audited URL:** `https://evolvia.vrvora11.workers.dev/`  
**Repository:** `f:\Projects\EVOLVIA`  
**Audit Date:** 2026-11-26  
**Stack:** React 19 + Vite 8 SPA (`react-router-dom` v7), deployed on Cloudflare Workers  

---

## 1. Executive Summary

A full crawl of the live Cloudflare Workers deployment (`https://evolvia.vrvora11.workers.dev/`) and a source-level inspection of the Vite/React codebase revealed **critical indexing, canonicalization, domain-consistency, and content-depth issues** that currently prevent search engines and AI answer engines from properly indexing and attributing Evolvia Tech.

Most critically, every page, `robots.txt`, `sitemap.xml`, `index.html`, and JSON-LD block currently references **`https://evolvia.tech`**, which does not match the actual production deployment domain (**`https://evolvia.vrvora11.workers.dev`**).

---

## 2. Live Crawl & HTTP Status Results

Live HTTP `HEAD` / `GET` checks against `https://evolvia.vrvora11.workers.dev/`:

| Route | HTTP Status | Content-Type | X-Robots-Tag | Finding |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `200` | `text/html` | None | Serves SPA shell; `<link rel="canonical">` points to `https://evolvia.tech/` |
| `/about`, `/services`, `/works`, `/technology`, `/team`, `/blog`, `/careers`, `/contact` | `200` | `text/html` | None | SPA fallback serves `index.html`; client-side `usePageMeta` updates tags after JS execution |
| `/services/web`, `/services/ai`, `/works/nexa-ai`, `/blog/ai-in-software-dev` | `200` | `text/html` | None | Same as above; canonical points to `https://evolvia.tech/...` |
| `/privacy-policy`, `/terms-of-service`, `/cookie-policy` | `200` | `text/html` | None | Indexable; canonical points to `https://evolvia.tech/...` |
| `/robots.txt` | `200` | `text/plain` | None | Points `Sitemap:` to `https://evolvia.tech/sitemap.xml` |
| `/sitemap.xml` | `200` | `application/xml` | None | Contains 77 URLs, all using `https://evolvia.tech` |
| `/llms.txt` | `200` | `text/html` | None | **Missing file** — Cloudflare Workers SPA fallback serves `index.html` |
| `/llms.xml` | `200` | `text/html` | None | **Missing file** — Cloudflare Workers SPA fallback serves `index.html` |
| `/solutions`, `/portfolio` | `200` | `text/html` | None | Client-side `<Navigate>` redirects to `/services`, `/works` |
| `/nonexistent-404-check` | `200` | `text/html` | None | **Soft 404** at HTTP layer (SPA fallback); `NotFound.jsx` sets `noindex, nofollow` client-side |

---

## 3. Existing SEO Problems & Missing Elements

### Critical Issues
1. **Domain & Canonical Mismatch (`https://evolvia.tech` vs `https://evolvia.vrvora11.workers.dev`)**
   - `index.html`, `public/robots.txt`, `public/sitemap.xml`, `scripts/generate-sitemap.js`, `src/hooks/usePageMeta.js`, and all 19 page components hardcode `https://evolvia.tech`.
   - Search engines crawling `evolvia.vrvora11.workers.dev` see a cross-domain canonical pointing to `evolvia.tech`, causing `evolvia.vrvora11.workers.dev` URLs to be treated as duplicates and dropped from the index.
2. **No Centralized SEO Configuration**
   - Base URLs, OG image defaults, and organization metadata are duplicated across `index.html`, `scripts/generate-sitemap.js`, `src/hooks/usePageMeta.js`, and every page component.
3. **Invalid Detail Slugs Override `noindex` (Hook Execution Order Bug)**
   - In `BlogDetail.jsx`, `ServiceDetail.jsx`, `WorkDetail.jsx`, `TeamDetail.jsx`, `CareerDetail.jsx`, `TechnologyDetail.jsx`, and `ApplyForm.jsx`, `usePageMeta(...)` is called unconditionally before `if (!item) return <NotFound />;`.
   - Because child `useEffect` (`NotFound`) runs before parent `useEffect` (`*Detail`), the parent's default `robots: 'index, follow'` and `canonicalUrl` overwrite `NotFound`'s `robots: 'noindex, nofollow'`.
4. **Root URL Trailing Slash Inconsistency**
   - `scripts/generate-sitemap.js` emits `https://...` (no trailing slash) for the homepage, whereas `index.html` and `Home.jsx` emit `https://.../`.

### High-Priority Issues
5. **Missing `llms.txt` and `llms.xml`**
   - Requests to `/llms.txt` and `/llms.xml` currently fall through to `index.html` (`200 text/html`).
6. **Incomplete Structured Data (JSON-LD)**
   - `index.html` only includes a minimal `Organization` block with `https://evolvia.tech`.
   - Missing `WebSite`, `ProfessionalService`, `WebPage`, `Service`, `BreadcrumbList`, `BlogPosting`/`Article`, and `Person` schemas.
   - `Organization` schema omits verified `LEGAL_NAME` (`Evolvia Infotech`), `telephone` (`8153875076` from `footer.js`), and `sameAs` social URLs.
7. **On-Page & Local SEO Gaps (Ahmedabad, Gujarat, India)**
   - Homepage `<h1>` is only the brand tagline (`"Evolving Ideas into Impact"`), with no clear service + location context in the hero or primary copy.
   - `About`, `Services`, and `Contact` have minimal natural references to Ahmedabad, Gujarat, India, and lack AEO question-and-answer sections.
8. **Blog Section Gaps & Bugs**
   - `BlogDetail.jsx` reads `post.takeaways`, while `src/data/blog.js` defines `post.points` — key takeaways never render.
   - `BlogDetail.jsx` ignores `post.relatedIds` and slices the first 3 posts instead.
   - `Blog.jsx` lacks category filters and search.
   - `BlogDetail.jsx` lacks H2/H3 structured sections, `updatedDate`, social sharing, and `BlogPosting` JSON-LD.
   - Only 5 short 3-paragraph posts exist; the 10 core educational/commercial topics are missing.
9. **Client-Side-Only Rendering (CSR) Risk**
   - As a Vite SPA, initial HTML for inner routes contains the homepage `<title>`, `<meta name="description">`, and `<link rel="canonical">` until JavaScript executes. While Googlebot executes JS, Bing, Perplexity, ChatGPT crawlers, and social link unfurlers often rely on initial HTML or lightweight rendering.

### Medium-Priority / Content & Hygiene Issues
10. **Alias Routes Without Canonical Redirects**
    - `/solutions/:slug`, `/portfolio/:slug`, `/technologies/:slug` render detail components directly without redirecting to `/services/:slug`, `/works/:slug`, `/technology/:slug` (mitigated if canonicals point to the primary route, better if redirected or canonicalized cleanly).
11. **Placeholder / Demo Data Awareness**
    - `src/data/testimonials.js` contains demo testimonials (`Sample Founder`, `Demo Client`). These must **not** be marked up with `Review` or `AggregateRating` schema.
    - `src/data/team.js` contains `"#"` placeholders for team member `socials`.

---

## 4. Recommended Fixes (Implementation Plan)

1. **Centralize SEO Config (`src/config/seo.js`)**: Single source of truth for `SITE_URL` (`https://evolvia.vrvora11.workers.dev`, overridable via `VITE_SITE_URL`), brand metadata, social profiles, and helper builders (`buildCanonicalUrl`, `buildImageUrl`).
2. **Fix `usePageMeta` & Detail Page `noindex` Bug**: Support dynamic JSON-LD injection/cleanup in `usePageMeta` (or a dedicated `StructuredData` / `JsonLd` helper) and ensure invalid slugs never emit `index, follow` or a canonical tag.
3. **Update `index.html`, `robots.txt`, `sitemap.xml`, `generate-sitemap.js`**: Align all URLs to `SITE_URL`, fix root trailing slash consistency, and automate `sitemap.xml` generation in the build pipeline.
4. **Add `public/llms.txt` and `public/llms.xml`**: Accurate, factual AI-discovery files matching `SITE_URL`.
5. **Implement Comprehensive JSON-LD**: `Organization`, `ProfessionalService`, `WebSite`, `WebPage`, `Service`, `BreadcrumbList`, `BlogPosting`, and `Person` using only verified facts.
6. **Upgrade Blog (`/blog` & `/blog/:slug`)**: Add all 10 requested in-depth articles, category filters, search, H2/H3 sections, takeaways, updated dates, social sharing, and `BlogPosting` schema.
7. **On-Page, Local SEO, AEO & GEO**: Naturally weave Evolvia Tech / Evolvia Infotech, Ahmedabad, Gujarat, India, core services, and clear Q&A sections across Home, About, Services, and Contact while preserving the existing design system and animations.
