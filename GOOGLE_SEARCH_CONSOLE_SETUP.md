# Google Search Console Setup — Evolvia Tech

> **Website:** https://evolvia.vrvora11.workers.dev/  
> **Verification method:** URL Prefix → HTML Meta Tag  
> **Status:** ✅ Verification tag deployed — ready to verify in Google Search Console

---

## Why HTML Meta Tag (Not DNS TXT)

The site is hosted on a Cloudflare `workers.dev` subdomain. Cloudflare controls the DNS for `workers.dev` — you cannot add TXT records to it. The **URL Prefix + HTML Tag** method is the correct verification approach for this setup.

---

## Files Modified

| File | Change |
|------|--------|
| `index.html` | Added `<meta name="google-site-verification">` inside `<head>` |
| `.env` | Added `VITE_GOOGLE_SITE_VERIFICATION=` (empty placeholder) |
| `.env.example` | Added `VITE_GOOGLE_SITE_VERIFICATION=` (empty placeholder) |

---

## Implementation Detail

### How it works

Vite supports `%VITE_VAR_NAME%` interpolation directly inside `index.html` at build time. The tag inserted is:

```html
<!-- Google Search Console verification — replace placeholder with your actual code from GSC -->
<meta name="google-site-verification" content="%VITE_GOOGLE_SITE_VERIFICATION%" />
```

At build time, Vite replaces `%VITE_GOOGLE_SITE_VERIFICATION%` with the value from your `.env` file. When the env var is empty the tag renders as:

```html
<meta name="google-site-verification" content="" />
```

This is harmless — Google will not verify until you provide the real code, but no errors occur.

> **Note:** Google verification tokens are public (they appear in your page HTML for any visitor to see). They are **not** secret credentials. It is safe to commit the token to source control, but keeping it in `.env` for configurability is good practice.

---

## Build Verification

```
✓ built in 3.37s
```

Tag confirmed in `dist/index.html` at line 11:

```
dist\index.html:11:    <meta name="google-site-verification" content="" />
```

The tag is inside `<head>`, before any scripts, and ships in the **initial HTML response** — exactly what Google requires for verification.

---

## Deployment Status

**Manual deployment required.** Deployment to Cloudflare Workers must be triggered by you (via `wrangler deploy` or the Cloudflare dashboard). No automated deployment is configured here.

---

## ✅ Manual Steps to Complete Verification

### Step 1 — Open Google Search Console

Go to: https://search.google.com/search-console

### Step 2 — Add URL Prefix Property

1. Click **+ Add Property** (top-left dropdown)
2. Select **URL prefix**
3. Enter exactly: `https://evolvia.vrvora11.workers.dev/`
4. Click **Continue**

### Step 3 — Choose HTML Tag Verification

1. Under **Other verification methods**, expand **HTML tag**
2. You will see a tag like:
   ```html
   <meta name="google-site-verification" content="abc123XYZ_your_code_here" />
   ```
3. **Copy only the content value** (the part after `content=`, without quotes)

### Step 4 — Set the Verification Code

Open `f:\Projects\EVOLVIA\.env` and update:

```env
VITE_GOOGLE_SITE_VERIFICATION=abc123XYZ_your_code_here
```

Replace `abc123XYZ_your_code_here` with the actual code from GSC.

### Step 5 — Rebuild

```powershell
cd f:\Projects\EVOLVIA
npm run build
```

Confirm the tag is populated:

```powershell
Select-String -Path "dist\index.html" -Pattern "google-site-verification"
```

Expected output — your code should appear inside `content="..."`:
```
dist\index.html:11:    <meta name="google-site-verification" content="abc123XYZ_your_code_here" />
```

### Step 6 — Deploy to Cloudflare Workers

```powershell
npx wrangler deploy
```

Or deploy via the Cloudflare dashboard if you use that method.

### Step 7 — Verify in Google Search Console

1. Return to Google Search Console
2. Click **Verify**
3. GSC will fetch your homepage and check for the meta tag
4. ✅ Verification succeeds once it finds the matching code

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| GSC shows "Could not verify" | Check the deployed HTML actually contains the tag with your code — visit the page, View Source, search for `google-site-verification` |
| Tag has empty `content` in the build | Ensure `VITE_GOOGLE_SITE_VERIFICATION=<your_code>` is in `.env` and you rebuilt |
| DNS TXT option shown by GSC | Ignore it — choose **HTML tag** under "Other verification methods" instead |
| `workers.dev` not accepting DNS records | Expected — this is why you use HTML tag verification, not DNS |

---

## What's Next After Verification

Once verified, in Google Search Console you should:

1. **Submit the sitemap:** Go to Sitemaps → Add: `https://evolvia.vrvora11.workers.dev/sitemap.xml`
2. **Request indexing** for key pages (Homepage, Services, About, Contact)
3. **Monitor Coverage** for any crawl errors
4. **Check Core Web Vitals** under Experience → Core Web Vitals

---

*Generated: 2026-11-26 | Implementation: Vite env-var interpolation in index.html*
