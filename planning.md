# Planning — Developer Portfolio

> Task list and phases. **Status: v4.1 complete — cinematic multi-page with a static portrait (2026-11-19).**

## Requirements (final)

- [x] Portfolio type: Developer / Engineer (Data Analyst)
- [x] Tech stack: Plain HTML, CSS, JavaScript
- [x] Content source: User's CV + confirmed links
- [x] Sections: Hero, About, Tech Skills, Experience, Projects, Education, Certifications, Contact, CV download, Footer
- [x] Final style: **Modern light tech / blueprint aesthetic — original, not a copy**
- [x] Contact: links only (no form)
- [x] Extras: CV content only; user later supplied a portrait photo for the hero

## Design Iterations

- [x] v1.0 — clean light theme (built, verified)
- [x] v2.0 — dark look-alike of friend's portfolio (built, then rejected by user as too copied)
- [x] v3.0 — original modern light tech design (current)
- [x] Confirmed distinctiveness: no shared fonts, palette, hero card, section headings or layout patterns with the reference site

## Phase 1 — Setup & Tracking - COMPLETE

- [x] Confirm requirements with user
- [x] Create and maintain `architecture.md`, `planning.md`, `progress.md`

## Phase 2 — Content Preparation - COMPLETE

- [x] Extract CV text with `pypdf` and hyperlinks from PDF annotations
- [x] Map CV content to site sections
- [x] Confirm links, accent direction and extras with user
- [x] Copy CV to `assets/cv/Krish_Arya_CV.pdf`
- [x] Create local `assets/favicon.svg`

## Phase 3 — Build HTML Structure (v3) - COMPLETE

- [x] Semantic markup with JSON-LD Person schema and SEO meta
- [x] Header, logo, nav and mobile menu
- [x] Hero with availability chip, headline, role, CTAs, stats
- [x] Analytics dashboard panel (bar chart + pipeline)
- [x] Scrolling tech ticker
- [x] About with callout and info cards
- [x] Stack grid with 18 skill tiles
- [x] Experience timeline with 3 roles and stack lines
- [x] AgriSmart project card with browser mockup and CSS visualization
- [x] Education and certification sections
- [x] Contact panel and footer
- [x] 3 CV download links (nav, hero, contact)

## Phase 4 — Styling (v3) - COMPLETE

- [x] Blueprint grid background and cyan glow
- [x] CSS variables, typography (Sora / DM Sans / IBM Plex Mono)
- [x] All section and component styles
- [x] Hover states and keyframe animations
- [x] Responsive breakpoints at 900px / 600px
- [x] Reduced-motion support

## Phase 5 — JavaScript - COMPLETE

- [x] Auto-updating footer year
- [x] Floating back-to-top button (appears after 500px)
- [x] Mobile menu toggle with ARIA state, outside-click and Escape close
- [x] Active nav highlighting on scroll

## Phase 6 — Review & Finish - COMPLETE

- [x] Browser check — no console errors, no horizontal overflow
- [x] Verified originality — no copied markers from reference site
- [x] Lighthouse — Accessibility 100, Best Practices 100; SEO 80 only from `file://` robots.txt warning
- [x] Mobile menu behavior verified
- [x] Content proofread against CV
- [x] All three tracking files updated to v3

## Phase 7 — Motion & Animation (v3.1) - COMPLETE

- [x] Add inline `js-enabled` class for no-JS fallback
- [x] Add scroll-reveal observer with staggered delays across 38 elements
- [x] Add directional reveal for hero analytics panel
- [x] Add count-up animation for hero stats (65+, 100K+, 4)
- [x] Animate hero chart bars and project visualization bars from zero
- [x] Add scroll-progress bar under the header
- [x] Add button icon slide, skill-tile lift and drifting contact grid
- [x] Keep ticker, pulse dot and blinking cursor running
- [x] Respect `prefers-reduced-motion` (instant reveal + final values)
- [x] Verify counters, bars, reveals, progress bar and back-to-top in browser
- [x] Re-run Lighthouse — Accessibility 100, Best Practices 100 maintained

## Phase 8 — UI/UX Polish (v3.2) - COMPLETE

- [x] Add spacing scale and shadow/radius tokens for consistent layout rhythm
- [x] Refine typography hierarchy and body line length
- [x] Unify card, badge, pill and button components
- [x] Add animated nav underline, active `aria-current`, button press and icon states
- [x] Add clickable mobile menu backdrop with body scroll-state class
- [x] Add custom scrollbar, logo hover, inline-link underline and tile accent interactions
- [x] Fix green score-badge contrast (`#0f9d6e` → `#0a6e4d`)
- [x] Verify menu backdrop, states, no console errors, Lighthouse 100/100 accessibility & best practices

## Phase 9 — Cinematic Redesign (v4.0) - COMPLETE

- [x] Researched the linked YouTube tutorial via oEmbed, description and full auto-caption transcript
- [x] Identified design language: cinematic scroll animation, dark minimal sections, warm orange-red gradients, multiple pages
- [x] Copied user photo to `assets/images/Krish_Arya.jpg`
- [x] Rebuilt as a 4-page static site: Home, About, Projects, Contact
- [x] Built portrait-led dark hero with warm glows, editorial headline and gradient accents
- [x] Added impact stats, skill chips, timeline, project cards and contact panel
- [x] Built a three-project page from CV-grounded work (no invented projects)
- [x] Shared nav, footer, sprite, stylesheet and script across pages
- [x] Verified all pages: no errors, no broken images, no overflow, correct active nav
- [x] Fixed logo accessible-name mismatch; Lighthouse Accessibility 100 / Best Practices 100

## Phase 10 — Static Portrait (v4.1) - COMPLETE

- [x] User feedback: "remove image animation its not look satisfing"
- [x] Removed the three-layer scroll-driven photo cross-fade / zoom / brightness sequence
- [x] Removed cinema `--p` scroll variable, scene labels and in-hero progress rail
- [x] Replaced with one static `<img>` in `.cinema-portrait` with meaningful alt text
- [x] Converted the 230vh sticky hero back into a normal one-screen section
- [x] Removed responsive/reduced-motion rules that only existed for the old animated layers
- [x] Constrained tablet hero copy width to prevent overlap with the portrait
- [x] Verified portrait transform/opacity unchanged between scroll 0 and 400px
- [x] Re-ran browser checks and Lighthouse — still clean

## Phase 11 — Security Review (v4.1) - COMPLETE

- [x] Confirmed the site is static: no forms, DB, accounts, sessions, secrets or user-controlled DOM input
- [x] Documented A–D (injection, BAC, backend verification, password hashing) in `SECURITY.md`, with rules for any future backend
- [x] Added CSP meta tag to all four pages with exact SHA-256 hash for the inline script
- [x] Added `referrer` meta policy; existing `noopener noreferrer` links verified
- [x] Verified no CSP violations, fonts/images/JS still working on every page

## Possible Next Steps (user action)

- [ ] Deploy to GitHub Pages / Netlify
- [ ] Add `robots.txt` / `sitemap.xml` for a custom domain
