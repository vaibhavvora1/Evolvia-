# Evolvia Tech: Design System

Tagline: **Evolving Ideas into Impact**
Style: clean, modern, premium tech. White canvas, black structure, orange energy.

---

## 1. Color Palette

| Token | Hex | Use |
|---|---|---|
| `--white` | `#FFFFFF` | Page background, cards |
| `--cream` | `#FFF4E8` | Soft section backgrounds, illustration circle |
| `--orange` | `#F97316` | Primary accent, CTA button, links, highlights |
| `--orange-light` | `#FDBA74` | Hover tints, badges, illustration details |
| `--black` | `#111111` | Headings, navbar pill, footer, dark sections |
| `--charcoal` | `#2B2B2B` | Body text, secondary dark surfaces |
| `--gray-500` | `#6B6B6B` | Captions, muted text |
| `--border` | `#EAEAEA` | Dividers, card borders |

**Rules**
- 70% white/cream, 20% black/charcoal, 10% orange. Orange is an accent, never a background for large areas.
- Text on orange is **black** (`#111111`), not white. White on `#F97316` fails contrast.
- Orange text on white is for large text only (24px+) or icons. For small links use `--black` with an orange underline.
- No blue, purple, teal or brown anywhere.

```css
:root {
  --white: #FFFFFF;
  --cream: #FFF4E8;
  --orange: #F97316;
  --orange-light: #FDBA74;
  --black: #111111;
  --charcoal: #2B2B2B;
  --gray-500: #6B6B6B;
  --border: #EAEAEA;
}
```

---

## 2. Typography

- **Headings:** Sora (600, 700)
- **Body / UI:** DM Sans (400, 500, 700)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Sora:wght@600;700&display=swap" rel="stylesheet">
```

| Element | Font | Size | Weight |
|---|---|---|---|
| H1 | Sora | 56px / 40px mobile | 700 |
| H2 | Sora | 40px / 30px mobile | 600 |
| H3 | Sora | 24px | 600 |
| Body | DM Sans | 17px, line-height 1.6 | 400 |
| Nav links | DM Sans | 15px | 500 |
| Button | DM Sans | 15px | 700 |

---

## 3. Logo

- Use the Evolvia logo you provided: black "E" in a circle with an upward arrow, plus the bold "EVOLVIA" wordmark.
- **Navbar version:** horizontal lockup, mark + "EVOLVIA" only (no tagline), height **40px**. Export as SVG or transparent PNG and save as `/public/logo.svg`.
- Keep the arrow tip in its original accent color, or switch it to `--orange` to match the palette.
- Clear space around the logo: at least the height of the "E" mark's circle / 4.

---

## 4. Navbar

### Structure (left to right)

1. **Logo** (links to `/`)
2. **Gooey navigation pill** with: Home, About, Services, Our Works, Technology, Careers, Our Team
3. **"Build with Us" button** (orange, right-aligned)

| Label | Route |
|---|---|
| Home | `/` |
| About | `/about` |
| Services | `/services` |
| Our Works | `/works` |
| Technology | `/technology` |
| Careers | `/careers` |
| Our Team | `/team` |

### Style
- Height 72px, sticky top, white background with 90% opacity and a backdrop blur, 1px `--border` bottom line.
- Inner width max 1280px, horizontal padding 24px.
- The nav links sit inside a **black pill** (`--black`, fully rounded).
- Links are white. The active link gets a **white pill with black text**, with the gooey bubble effect when switching.
- Hover on inactive links: text turns `--orange-light`.
- "Build with Us": `--orange` background, black text, 700 weight, fully rounded, 12px 24px padding, small arrow icon. Hover: black background, white text.

### Gooey effect (React Bits `GooeyNav`)

Use the component exactly as provided: `GooeyNav.jsx` + `GooeyNav.css`, **no changes to the CSS**.

> **Important:** the gooey layer uses `filter: contrast(100)`, which snaps every color to pure black/white/primary colors. Keep the effect layer black and white. If you set the particles or the pill to orange, they will render red or yellow. Orange belongs on the button, hover states and accents instead.

Props to use:

```jsx
<GooeyNav
  items={items}
  particleCount={15}
  particleDistances={[90, 10]}
  particleR={100}
  initialActiveIndex={activeIndex}
  animationTime={600}
  timeVariance={300}
  colors={[1, 2, 3, 1, 2, 3, 1, 4]}
/>
```

Add these color variables once (in `Navbar.css`). They are white on purpose, see the note above:

```css
.gooey-nav-container { --color-1: #fff; --color-2: #fff; --color-3: #fff; --color-4: #fff; }
```

### One small patch to GooeyNav.jsx (only for React Router)

The component renders plain `<a href>` links, which reload the page in a single-page app. To navigate without reloading, change the `<a>` inside `GooeyNav.jsx` to:

```jsx
<a
  href={item.href}
  onClick={e => { handleClick(e, index); item.onClick?.(e); }}
  onKeyDown={e => handleKeyDown(e, index)}
>
  {item.label}
</a>
```

### Navbar.jsx

```jsx
import { useNavigate, useLocation } from 'react-router-dom';
import GooeyNav from './GooeyNav';
import './Navbar.css';

const links = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Our Works', path: '/works' },
  { label: 'Technology', path: '/technology' },
  { label: 'Careers', path: '/careers' },
  { label: 'Our Team', path: '/team' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const items = links.map(l => ({
    label: l.label,
    href: l.path,
    onClick: e => { e.preventDefault(); navigate(l.path); },
  }));

  const activeIndex = Math.max(
    0,
    links.findIndex(l => (l.path === '/' ? pathname === '/' : pathname.startsWith(l.path)))
  );

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="/" className="site-header__logo" onClick={e => { e.preventDefault(); navigate('/'); }}>
          <img src="/logo.svg" alt="Evolvia Tech" height="40" />
        </a>

        <div className="site-header__nav">
          <GooeyNav
            key={activeIndex}
            items={items}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={activeIndex}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>

        <a
          href="/contact"
          className="btn-build"
          onClick={e => { e.preventDefault(); navigate('/contact'); }}
        >
          Build with Us
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </header>
  );
}
```

### Navbar.css

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #EAEAEA;
  font-family: 'DM Sans', 'Helvetica Neue', sans-serif;
}

.site-header__inner {
  max-width: 1280px;
  height: 72px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.site-header__logo img { display: block; height: 40px; width: auto; }

/* Black pill that hosts the gooey effect */
.site-header__nav .gooey-nav-container {
  background: #111111;
  border-radius: 999px;
  padding: 6px 8px;
  --color-1: #fff; --color-2: #fff; --color-3: #fff; --color-4: #fff;
}

.site-header__nav .gooey-nav-container nav ul { gap: 0.25em; font-size: 15px; font-weight: 500; }
.site-header__nav .gooey-nav-container nav ul li:not(.active):hover { color: #FDBA74; }

/* Build with Us button */
.btn-build {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 999px;
  background: #F97316;
  color: #111111;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
}
.btn-build:hover { background: #111111; color: #FFFFFF; transform: translateY(-1px); }
.btn-build:focus-visible { outline: 3px solid #FDBA74; outline-offset: 3px; }

/* Tablet and below: the pill is too wide for small screens */
@media (max-width: 1100px) {
  .site-header__nav { display: none; }
}
```

> On screens under 1100px the gooey pill is hidden. Add a hamburger menu (simple full-screen list of the same 7 links + "Build with Us") for mobile. The gooey effect is desktop-only.

---

## 5. Buttons

| Type | Style |
|---|---|
| Primary | Orange background, black text, pill shape, 700 weight. Hover: black background, white text |
| Secondary | White background, 1.5px black border, black text. Hover: black background, white text |
| Text link | Black text with an orange underline. Hover: orange text on large sizes only |

Border radius: buttons 999px, cards 20px, inputs 12px.

---

## 6. Layout and Spacing

- Max content width 1280px. Section padding 96px vertical (64px on mobile).
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96.
- Cards: white, 1px `--border`, 20px radius, soft shadow `0 8px 30px rgba(17,17,17,0.06)`. On hover lift 4px and the shadow gets slightly stronger.
- Alternate section backgrounds: white, cream, white, black (for contrast and CTA bands).

---

## 7. Imagery

- Hero and section art: flat vector illustration, rounded friendly shapes, on white with a soft cream circle behind the scene.
- Palette for illustrations: white, cream, orange, light orange, black, charcoal. Only tiny green accents on plants.
- Do not put numbers or statistics in illustrations. Add real text in HTML.
- Intro video: client and robot handshake, then the logo reveal on a light textured background.

---

## 8. Motion

- Default transition 250ms ease. Hover lifts 1 to 4px.
- Page sections fade up (opacity 0 to 1, translateY 24px to 0, 500ms) when scrolled into view.
- The gooey navbar effect is the signature motion. Do not add a second heavy effect in the header.
- Respect `prefers-reduced-motion`: turn off the fade-ups and particles.

---

## 9. Accessibility

- Text contrast at least 4.5:1 (3:1 for 24px+).
- Visible focus ring on all links and buttons: 3px `--orange-light` with 3px offset.
- Nav links must be real `<a>` elements and work with keyboard (Tab, Enter, Space). GooeyNav already supports this.
- The logo image needs `alt="Evolvia Tech"`.

---

## 10. Assumptions to confirm

- "Our time" in your list was read as **Our Team** (`/team`). Change the label if you meant something else.
- Routes are assumed as listed in the Navbar table. The button goes to `/contact`.
- The project uses React with React Router. If you use Next.js, replace `useNavigate` and `useLocation` with `next/link` and `usePathname`, and keep `'use client'` at the top.
- The logo is saved at `/public/logo.svg`.
