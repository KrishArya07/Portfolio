# Progress — Developer Portfolio

> Status log. Updated after every meaningful step.
> **Current version: v4.1 — cinematic dark multi-page portfolio with a static portrait, built and verified.**

## Current Status

- **Phase:** Complete — v4.1 delivered
- **Overall progress:** 100%
- **Blocked on:** Nothing. Optional next step is deployment (user action).
- **Files delivered:** `index.html`, `about.html`, `projects.html`, `contact.html`, `styles.css`, `script.js`, `assets/favicon.svg`, `assets/images/Krish_Arya.jpg`, `assets/cv/Krish_Arya_CV.pdf`, plus the three tracking docs

## Log

### 2026-11-19 — Project start (v1.0)

- Requirements confirmed: developer portfolio, plain HTML/CSS/JS, clean light theme, sections including About/Skills/Projects/Contact/CV download.
- Created tracking files.
- Extracted CV content with `pypdf` and hyperlinks from PDF annotations.
- Confirmed links, indigo accent, links-only contact, CV-only content.
- Built and verified v1.0 (light theme) — Accessibility 100, Best Practices 100.

### 2026-11-19 — v2.0 (rejected)

- User shared https://mohitdixit.in/ and asked for a portfolio "like techcie".
- Studied the reference site: dark navy theme, Space Grotesk / Inter / JetBrains Mono, terminal code card, gradient headline, metric tiles.
- Rebuilt the site closely in that style (dark theme, terminal card, chips, gradient heading).
- Verified: Accessibility 100, Best Practices 100.
- **User feedback: "you exactly match my friends portfolio but want different not copied."**
- v2.0 rejected as too similar.

### 2026-11-19 — v3.0 (current)

- Asked user to choose an original direction; user chose **Modern light tech**.
- Rebuilt from scratch with a distinct visual language:
  - Light `#f5f7fb` background with fixed blueprint grid and cyan radial glow
  - Sora headings, DM Sans body, IBM Plex Mono labels (different from reference fonts)
  - Analytics dashboard hero (CSS bar chart + Python→SQL→Power BI pipeline) instead of a terminal code card
  - Infinite tech-keyword ticker
  - Numbered section labels (`01 / ABOUT`, etc.)
  - 18 skill tiles with mono captions instead of plain chips
  - Timeline with gradient rail and `STACK` lines
  - Project card with browser mockup and CSS weather-bar visualization
  - White/indigo code-brackets favicon
- Verified in browser:
  - No console errors, no horizontal overflow
  - No copied markers from the reference site (checked for its headline, terminal text, fonts and palette)
  - Mobile menu opens/closes with correct ARIA state
  - Lighthouse: **Accessibility 100, Best Practices 100**, SEO 80 (only `robots.txt` warning under `file://`, irrelevant once deployed)
- Updated all three tracking files to v3.

### 2026-11-19 — v3.1 (animations)

- User asked to "add animations" to the modern site.
- Added a motion layer:
  - `IntersectionObserver` scroll reveals with staggered delays on 38 elements
  - Directional slide-in for the hero analytics panel
  - Count-up numbers for hero stats (65+, 100K+, 4) using eased `requestAnimationFrame`
  - Hero chart bars and project visualization bars grow from zero when visible
  - Thin indigo→cyan scroll-progress bar under the header
  - Button icon slide, skill-tile lift, flowing pipeline gradient, drifting contact blueprint grid
  - Kept marquee, pulse dot and blinking cursor
- Added no-JS fallback (`.js-enabled` set inline in `<head>`) and full `prefers-reduced-motion` support.
- Verified in browser: fresh load shows only hero reveals; counters settle at correct values; bars reach full height; scrolling reveals skill cards and updates progress; back-to-top appears after 500px.
- Lighthouse re-run: Accessibility 100, Best Practices 100 (SEO 80 only from `file://` robots.txt warning).
- Updated all three tracking files to v3.1.

### 2026-11-19 — v3.2 (UI/UX polish)

- User asked for the site to be "built like UI/UX design"; clarified they wanted the existing content refined, not repositioned as a design portfolio.
- Clarified intent: keep content and design direction, polish the interface and experience.
- Polish pass:
  - Added spacing scale, shadow/radius tokens and consistent component padding
  - Improved type hierarchy and readable line lengths
  - Unified buttons, cards, pills, badges and the project browser mockup
  - Added animated nav underline, active `aria-current`, press states and inline-link underline motion
  - Added clickable mobile-menu backdrop with `body.menu-open` state and entrance animation
  - Added custom scrollbar, logo hover rotation, tile accent lines and timeline dot hover
- Found and fixed a contrast regression on green score badges (`#0f9d6e` → `#0a6e4d`).
- Verified: no console errors, no horizontal overflow, backdrop and menu state work, Lighthouse Accessibility 100 / Best Practices 100.
- Updated all three tracking files to v3.2.

### 2026-11-19 — v4.0 (cinematic multi-page redesign)

- User shared a Creativo YouTube tutorial and asked to "build like this", attaching `Krish_Arya.jpg`.
- Extracted the full transcript via `youtube-transcript-api` (the inline caption URL was expired). Key ideas: cinematic scroll animation, dark palette, sections placed directly on the background, warm orange-red low-opacity gradients, multiple pages.
- Copied the portrait into `assets/images/` (1409×1600 JPEG).
- Rebuilt the site as four static pages sharing one stylesheet/script:
  - Home: cinematic hero, about, stats, toolkit, featured project, experience, education/certs, contact
  - About / Projects / Contact as separate pages, matching the tutorial's multi-page structure
- Kept every CV fact and confirmed link unchanged; the three projects page items are all CV-grounded.
- Verification: all pages load with no console errors, no broken images, no overflow; active nav correct; Lighthouse Accessibility 100 / Best Practices 100 after removing the logo `aria-label` mismatch.

### 2026-11-19 — v4.1 (image animation removed)

- **User feedback: "remove image animation its not look satisfing".**
- Removed the scroll-driven photo effect entirely: three stacked layers, progress-based scale/brightness, cross-fade, scene labels and the in-hero progress rail.
- Hero now uses one static portrait image with meaningful alt text, in a normal one-screen section. The `--p` scroll variable and all related `calc()` transforms were deleted from CSS and JS.
- Cleaned up now-obsolete tablet/mobile/reduced-motion rules and constrained hero copy width so text does not run under the portrait.
- Verified in browser: portrait transform and opacity are identical at scroll 0 and scroll 400; no console errors; no overflow; Lighthouse Accessibility 100 / Best Practices 100 maintained.

### 2026-11-19 — Security review (v4.1)

- User requested: A) injection attacks, B) broken access control, C) backend-only verification, D) hashed passwords.
- Confirmed these are backend concerns and the current site is fully static — no forms, DB, accounts or secrets — so they cannot be exploited as implemented.
- Created `SECURITY.md` documenting the current posture plus mandatory rules for a future backend: parameterized queries and allowlist validation/encoding (A), deny-by-default server-side authorisation with object ownership checks (B), re-verify everything server-side with client validation as UX only (C), and Argon2id/bcrypt/scrypt password hashing with unique salts (D).
- Applied static hardening: CSP meta tag on all four pages with a SHA-256 hash for the inline `js-enabled` script, strict referrer policy, `form-action 'none'`, `object-src 'none'`, `frame-src 'none'`, `base-uri 'self'`; verified existing `noopener noreferrer` external links.
- Verified after the change: no console/CSP errors on any page; fonts, portrait, JS class and reveals all still work.

## Decisions Log

| Date | Decision |
| --- | --- |
| 2026-11-19 | Use vanilla HTML/CSS/JS — no framework or build step |
| 2026-11-19 | CV is the single source of truth; no placeholder content |
| 2026-11-19 | Contact via links only — no form/backend |
| 2026-11-19 | Static hosting target (GitHub Pages / Netlify compatible) |
| 2026-11-19 | v2 dark look-alike rejected — originality is a requirement |
| 2026-11-19 | v3 uses blueprint light theme with Sora/DM Sans/IBM Plex Mono and no reference layout patterns |
| 2026-11-19 | Included Experience and Certifications sections from CV beyond the initial minimum list |
| 2026-11-19 | Added scroll-driven animations with no-JS fallback and reduced-motion support |
| 2026-11-19 | Kept content and design direction; polished UI/UX via design tokens, consistent components and interaction states |
| 2026-11-19 | Rebuilt as a cinematic dark multi-page portfolio using the user's own portrait, inspired by the tutorial but not copied |
| 2026-11-19 | Removed the hero image scroll animation after user feedback; portrait is static |

## Notes / Open Questions

- Site ready to deploy; hosting platform not yet chosen.
- Portfolio link from CV (`krish-arya01.onrender.com`) is in SEO metadata but not a visible CTA; add if desired.
- User-supplied portrait is used in the hero; project screenshots not provided.
- `robots.txt` / `sitemap.xml` can be added when deploying to a custom domain.
