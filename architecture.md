# Architecture — Developer Portfolio

> Living document. Updated whenever the technical design changes.
> **Status: Implemented (v4 — cinematic multi-page redesign) — 2026-11-19**

## Project Overview

- **Type:** Personal developer portfolio website (static, single page)
- **Owner:** Krish Arya — Data Analyst (CS / AI background)
- **Goal:** Present identity, skills, experience, projects and contact details clearly, with a one-click CV download.
- **Stack:** Plain HTML, CSS, JavaScript (no build step, no framework, no dependencies)

## Design History

| Version | Direction | Outcome |
| --- | --- | --- |
| v1.0 | Clean light theme, indigo accent | Built and verified |
| v2.0 | Dark theme copied from friend's site (https://mohitdixit.in/) | Rejected — user said it was too much of a copy |
| v3.0 | Modern light tech / blueprint aesthetic — original design | Approved |
| v3.1 | Added scroll-driven animations and motion polish | Approved |
| v3.2 | UI/UX polish — design system, hierarchy, component states, navigation experience | Approved |
| v4.0 | Cinematic dark, portrait-led multi-page redesign inspired by the Creativo YouTube tutorial | Superseded in part — image scroll animation removed per user feedback |
| **v4.1** | **Same cinematic layout with a clean, static portrait (no image animation)** | **Current** |

v3 keeps a "techie" feel but shares no layout, palette, typography, fonts or components with the reference site.

## Key Decisions

| Decision | Choice | Reason |
| --- | --- | --- |
| Theme | Light, blueprint-grid aesthetic | User requested "Modern light tech" after rejecting the dark copy |
| Palette | `#f5f7fb` bg, white surfaces, `#0b1220` ink, indigo `#4f46e5`, cyan `#06b6d4` | Distinct from friend's dark navy/blue-violet scheme |
| Fonts | Sora (headings), DM Sans (body), IBM Plex Mono (labels/code) | Fresh developer look; different from reference fonts |
| Differentiators | Blueprint grid, analytics dashboard hero, scrolling tech ticker, numbered section labels, skill tiles with mono captions, stack lines, check-icon cert list | Ensure originality, not a copy |
| Hero visual | CSS bar chart + Python→SQL→Power BI pipeline (no code terminal) | Avoids the friend's signature terminal card |
| Framework | None (vanilla HTML/CSS/JS) | Zero setup, hosts anywhere |
| Styling | Single `styles.css` with CSS variables | Easy to maintain |
| Behavior | Single `script.js` | Year, back-to-top, mobile menu, active nav |
| Icons | Inline SVG sprite + local `assets/favicon.svg` | Self-contained |
| Content source | User's CV + confirmed links | Single source of truth |
| Contact | Links only + CV download | No backend |
| Hosting | Static (GitHub Pages / Netlify compatible) | No server needed |

## File Structure (implemented)

```
Portfolio/
├── architecture.md
├── planning.md
├── progress.md
├── index.html               # Markup, JSON-LD, font links, SVG sprite
├── styles.css               # Blueprint light theme, responsive rules
├── script.js                # Menu, year, scroll progress, counters, reveal, back-to-top, active nav
└── assets/
    ├── favicon.svg          # White/indigo code-brackets icon
    ├── cv/
    │   └── Krish_Arya_CV.pdf
    └── images/              # Reserved for future images
```

## Page Sections (implemented)

1. **Header** — sticky translucent bar, `KA` logo mark, nav links, Resume button, mobile hamburger
2. **Hero** — availability eyebrow, name headline with indigo dot, role with blinking cursor, lead, two CTAs, 3 inline stats
3. **Analytics panel** — "ANALYTICS / OVERVIEW", CSS bar chart, Python→SQL→Power BI pipeline, footer metrics
4. **Ticker** — infinite marquee of tech keywords
5. **01 / ABOUT** — summary, cyan callout, 4 info cards (location, role, email, phone)
6. **02 / STACK** — 4 stack cards containing 18 skill tiles with mono captions
7. **03 / EXPERIENCE** — 3 job cards on a gradient timeline rail, each with a `STACK` line
8. **04 / PROJECTS** — AgriSmart card with browser mockup + CSS weather-bar visualization
9. **05 / FOUNDATION** — education cards (year labels, scores) + certification checklist
10. **06 / CONTACT** — blueprint-pattern panel with email/CV buttons and social row
11. **Footer + floating back-to-top**

## Design System

- **Tokens:** `--bg:#f5f7fb`, `--surface:#fff`, `--ink:#0b1220`, `--muted:#56657d`, `--line:#dbe2ee`, indigo/cyan accents, `--max:1120px`.
- **Background:** fixed blueprint grid (`linear-gradient` lines every 34px) with a soft cyan radial glow top-right.
- **Typography:** Sora headings with tight tracking, DM Sans body, IBM Plex Mono for eyebrows, dates, chips and panel labels.
- **Layout:** `.wrap` max 1120px / 92% width, CSS Grid, breakpoints at `900px` and `600px`.
- **Components:** pill-less square-ish buttons (8px radius), info cards, skill tiles, timeline jobs, browser mockup project card, checklist certs, contact panel.
- **Motion:** pulse dot, blinking cursor, marquee ticker, hover lifts, animated bar charts, count-up stats, staggered scroll reveals, scroll-progress bar, drifting contact grid; all disabled under `prefers-reduced-motion`.

## Motion & Animation System (v3.1)

- **Technique:** `IntersectionObserver` adds `.is-visible` to `.reveal` elements as they enter the viewport.
- **Graceful degradation:** an inline head script adds `.js-enabled`; reveal hiding only applies with JS. If JS or `IntersectionObserver` is unavailable, everything is shown.
- **Staggering:** `--delay` custom property on hero items; `nth-child` transition delays for skill tiles, job cards, info cards, education and certification items.
- **Directional reveal:** `.reveal-right` slides the hero analytics panel in from the right.
- **Animated data:** hero stats count up (65+, 100K+, 4) with eased `requestAnimationFrame`; chart and visualization bars grow from zero when their containers become visible.
- **Continuous motion:** ticker marquee, pulsing availability dot, blinking role cursor, flowing pipeline gradient, drifting contact blueprint grid.
- **Micro-interactions:** button lift + icon slide, skill-tile lift, project hover, back-to-top reveal after 500px.
- **Scroll progress:** thin indigo→cyan bar under the header tracks page scroll.
- **Accessibility:** `prefers-reduced-motion` disables all animations/transitions and immediately reveals content + final counter values.

## UI/UX Polish (v3.2)

- **Design tokens:** added neutral scale (`--ink-soft`, `--line-strong`, `--surface-soft`), 3 shadow levels, and a spacing scale (`--s1`…`--s7`) used consistently for padding and gaps.
- **Hierarchy:** modular type scale, max 60–64ch line length for body copy, clearer section kickers, stronger primary/secondary text separation.
- **Components:** unified radius (8/12/18px), consistent card padding and shadows, date pills, badge pills, outlined social pills, refined browser mockup and visualization.
- **Interaction states:** hover lifts on cards/tiles/buttons, animated nav underline, active nav `aria-current`, button `:active` feedback, underline animation on inline email links, hover scale on timeline dots.
- **Navigation UX:** sticky translucent header, clickable backdrop for the mobile menu, `body.menu-open` state, animated mobile menu entrance, visible focus rings.
- **Detail polish:** custom slim scrollbar, rotated logo mark on hover, darker accessible success green for scores/certification ticks.

## Responsiveness & Accessibility

- `900px`: stacked hero/about/foundation, mobile menu, single-column project, hidden nav CTA.
- `600px`: smaller headings, 2-column skill tiles, full-width contact buttons, stacked footer.
- Semantic HTML, skip link, ARIA-expanded menu, decorative SVGs hidden from AT.
- Verified: **Lighthouse Accessibility 100, Best Practices 100**. SEO 80 only from `robots.txt` warning under `file://` preview — not applicable when deployed.
- No console errors; no horizontal overflow.
- Motion verified: counters settle at 65+ / 100K+ / 4, chart bars grow to full height, staggered cards reveal on scroll, progress bar tracks scroll, back-to-top appears after 500px.
- UI/UX verified: mobile menu backdrop and body state work, nav underline and active state render, no console errors; contrast issue on green score badges fixed by darkening `--success` to `#0a6e4d`.

## Data / Content Model

- All content from Krish's CV and confirmed links:
  - Email `krisharya.official@gmail.com`, phone `+91 95877 01191`, Jaipur, India
  - GitHub `https://github.com/KrishArya07`, LinkedIn `https://www.linkedin.com/in/krish-arya-60573a318`
  - Portfolio `https://krish-arya01.onrender.com/`, AgriSmart repo `https://github.com/Akshatjangid/AgriSmart`
- Content lives directly in `index.html`; no CMS/backend; no placeholder text remains.
- JSON-LD Person schema included for SEO.

## v4 — Cinematic Multi-Page Architecture (current)

### Direction
- Brief: rebuild "like" the Creativo tutorial ($7000 portfolio with free AI tools) using Krish's own portrait.
- Video design language extracted from its transcript: cinematic scroll animation, dark minimal sections placed directly on the background, warm orange-red low-opacity gradients, reduced side padding, multiple pages sharing one style.
- Reinterpreted for a static vanilla site — no AI image frames, no generated video, no framework.

### Pages
| File | Purpose |
| --- | --- |
| `index.html` | Cinematic hero, about, impact stats, toolkit, featured project, experience, foundation, contact |
| `about.html` | Story, info cards, full experience timeline, education and certifications |
| `projects.html` | Page intro plus three CV-grounded project sections (AgriSmart, field ops analytics, predictive/Gen AI work) |
| `contact.html` | Direct contact links, CV download, social links |

- Shared `styles.css`, `script.js`, SVG sprite, nav and footer across all pages.
- Relative links work from `file://` and any static host.

### Hero (v4.1 — static)
- Portrait-led hero: single `<img>` in an arch-shaped `.cinema-portrait`, layered over radial red/orange glows, faint concentric rings and a left-to-right vignette for text legibility.
- Editorial headline: Sora display type with an italic Georgia serif accent line and gradient text.
- **v4.0 scroll-driven image sequence (three stacked photo layers with progress-based scale, brightness and cross-fade) was removed** after user feedback: "remove image animation its not look satisfing".
- The hero is now a normal one-screen section; the portrait has a fixed transform and does not react to scroll. Only subtle non-image motion remains (scroll-progress bar, reveal fades, scroll cue dot).
- Scene labels and the in-hero progress rail were removed with the animation.

### Design tokens
- Dark palette: `--bg:#09090c`, `--surface:#14141b`, `--ink:#f6f3ef`, `--muted:#9893a1`, accents `--accent:#ff6b35`, `--accent-2:#e63946`, `--gold:#ffb37a`.
- Warm radial gradients on body and hero, low-opacity grid overlays, 9/14/24px radii, deep shadows.
- Fonts unchanged: Sora / DM Sans / IBM Plex Mono; italic serif accent added for editorial feel.

### Assets
- `assets/images/Krish_Arya.jpg` — user-supplied portrait (1409×1600), copied from `D:\\DOWNLOADS\\Documents\\Krish_Arya.jpg`; used once in the hero, with `alt` text.
- `assets/cv/Krish_Arya_CV.pdf` — unchanged CV download.

### Motion / JS
- `script.js` still handles year, mobile menu (+backdrop/Escape), scroll-progress bar, sticky-header state, back-to-top, `IntersectionObserver` reveals, count-up stats, chart bars and active nav.
- Cinema-specific `--p` scroll variable and all `calc(var(--p) …)` photo transforms removed.
- `prefers-reduced-motion` disables all animation/transition; no-JS fallback still shows all content.

### Verification
- All four pages: no console errors, no broken images, no horizontal overflow, correct active nav.
- Static portrait transform/opacity identical at scroll 0 and scroll 400 — confirmed no image animation.
- Lighthouse (home and projects): Accessibility **100**, Best Practices **100**; SEO ~80–83 only from the `file://` `robots.txt` warning.
- Fixed accessibility audit `label-content-name-mismatch` by removing `aria-label` from the logo links so the accessible name matches visible text.
- Fixed tablet overlap by constraining hero copy to `min(560px, 50vw)` at ≤980px.

## Security Posture (v4.1)

- See `SECURITY.md` for the full policy and the A–D backend rules requested by the user.
- Current site is static (no server, DB, accounts, forms or secrets), so injection, broken access control, server-side verification and password hashing are not applicable in code today.
- Applied static hardening: CSP meta tag in all pages with hashed inline script, `referrer` policy, `form-action 'none'`, `object-src 'none'`, `frame-src 'none'`, `base-uri 'self'`, and `noopener noreferrer` on all external links.
- Verified after adding CSP: all four pages load with no console violations; fonts, portrait, `js-enabled` class and reveals still work.

## Future / Optional Enhancements

- Deploy to GitHub Pages / Netlify
- Add `robots.txt` / `sitemap.xml` for a custom domain
