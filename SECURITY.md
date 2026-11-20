# Security Notes — Krish Arya Portfolio

> Last reviewed: 2026-11-19 · Current version: v4.1

## Scope (important)

The deployed site is a **static website**: plain HTML, CSS and JavaScript. It has:

- no server-side code
- no database
- no user accounts, sessions or roles
- no forms, no file uploads, no URL parameters consumed by the page
- no API keys, tokens or secrets in the client

Therefore items **A–D below cannot be exploited in the current site** — there is no input to inject, no protected resource to access, no backend decision to bypass, and no password to store. The rules are documented here so they are enforced the moment a backend is introduced.

---

## A. Injection Attacks

**Current posture**

- All page content is hardcoded from the CV; nothing is read from the URL, forms, storage or third parties and inserted into the DOM.
- No `innerHTML`, `outerHTML`, `document.write`, `eval()`, `new Function()` or inline event handlers anywhere in the code.
- The only dynamic DOM writes are `textContent` (footer year, counter numbers) and `style.width` / `style.setProperty` with locally computed numeric values.
- External links are fixed constants and use `rel="noopener noreferrer"`.
- A Content-Security-Policy meta tag restricts script/style/font/image sources and sets `form-action 'none'`, `object-src 'none'`, `frame-src 'none'`, `base-uri 'self'`.

**Mandatory when a backend is added**

- Use **parameterized queries / prepared statements** for every SQL call. Never concatenate user input into SQL, NoSQL, LDAP or command strings.
- Prefer an ORM with bound parameters; if raw SQL is unavoidable, bind values explicitly.
- Validate input with **allowlists** (type, length, format, range). Reject instead of trying to sanitise "bad" characters.
- Apply **context-aware output encoding** (HTML, attribute, JS, URL) when reflecting any value.
- Never pass user input to shell commands, file paths, template names, redirect targets or `fetch()` URLs without strict allowlisting.
- Use CSRF tokens on state-changing requests; set `SameSite=Lax/Strict` cookies.

---

## B. BAC — Broken Access Control

**Current posture**

- Every page is intentionally public. There are no private routes, accounts, roles or sessions, so there is nothing to bypass.
- Directory listing is a hosting concern: keep `index.html` at the root and do not place private files inside the published folder.

**Mandatory when a backend is added**

- **Deny by default.** Every request must be authorised server-side; never rely on a hidden button, disabled field, client-side route guard or obfuscated ID.
- Enforce authorisation on **every** endpoint and for **every** object: verify the authenticated user owns or may access the requested record (`/users/123/invoices/456` must check both IDs).
- Check on the server: authentication state, role/permission, object ownership, and current workflow state.
- Use centralised middleware/policy checks; do not scatter ad-hoc `if (isAdmin)` checks.
- Do not trust client-supplied `userId`, `role`, `isAdmin`, price or status values — derive them from the server session/token.
- Return `403`/`404` consistently (avoid revealing whether a resource exists), log denials, and add rate limiting.
- Revoke sessions/tokens on logout and password change; set short expiry and rotate secrets.

---

## C. Everything Verified by the Backend — No Frontend Dependency

**Current posture**

- The site performs no transactions. "Explore my work", "Download CV", email and phone are plain links; nothing needs trust or verification.
- Frontend JS is presentation-only (menu, reveals, counters, scroll progress, active nav). No security or business decision is made in the browser.

**Mandatory when a backend is added**

- Treat **all** client input as hostile, including values from hidden fields, disabled inputs, cookies, local storage, headers and signed-looking IDs.
- Re-validate and re-authorise on the server: identity, role, ownership, amounts, quantities, stock, prices, discounts and state transitions.
- Recompute totals and prices server-side; never accept a total submitted by the client.
- Validate file uploads server-side (type by magic bytes, size limit, rename, store outside the web root, scan) — never trust the `Content-Type` header or file extension.
- Verify webhooks by signature and check idempotency keys for payments/state changes.
- Use server-side sessions or verify JWT signature, issuer, audience and expiry on every request.
- Frontend validation is **UX only** — it reduces friction, it is not a security control.

---

## D. Passwords Stored as Hashes

**Current posture**

- No accounts, no password field, no database — nothing is stored.

**Mandatory when a backend is added**

- Store only a **salted, adaptive one-way hash**: prefer **Argon2id**, otherwise **bcrypt** (cost ≥ 12) or **scrypt**.
- Never store plaintext, reversible encryption, MD5, SHA-1 or fast SHA-256/SHA-512 password digests.
- Generate a unique random salt per password (Argon2id/bcrypt handle this internally).
- Never log passwords, include them in error messages, analytics, URLs or support tools.
- Rehash on successful login when parameters are upgraded; force reset on breach.
- Enforce TLS everywhere, rate-limit login attempts, use generic error messages, and support MFA for privileged accounts.
- Store session tokens hashed at rest as well, with expiry and rotation.

---

## Hardening already applied to this static site

| Control | Where |
| --- | --- |
| Content-Security-Policy (scripts, styles, fonts, images restricted; `form-action 'none'`, `object-src 'none'`, `frame-src 'none'`, `base-uri 'self'`) | Meta tag in all four HTML pages |
| Inline `js-enabled` script allowed by exact SHA-256 hash — no `'unsafe-inline'` for scripts | CSP `script-src` |
| Referrer policy `strict-origin-when-cross-origin` | Meta tag in all four pages |
| `rel="noopener noreferrer"` on every `target="_blank"` link | All external links |
| No inline event handlers, no `eval`/`innerHTML`, no secrets in client code | `script.js` |
| HTTPS | Enforce on your host (Netlify/GitHub Pages/Render all provide it) |

### Optional host-level headers (stronger than meta tags)

If your host supports custom headers, prefer these over the meta CSP:

```text
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-src 'none'; form-action 'none'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data:
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

Moving the `js-enabled` class into `script.js` would let you drop the script hash from CSP entirely; keep the inline version only if you want the no-flash no-JS fallback.

---

## Summary

| Item | Static site today | Rule for a future backend |
| --- | --- | --- |
| A. Injection | No input surface, CSP, safe DOM APIs | Parameterized queries, allowlist validation, output encoding |
| B. Broken Access Control | All pages public by design | Deny by default, server-side authN/authZ + object ownership checks |
| C. Backend verification | No transactions to verify | Re-check everything server-side; client validation is UX only |
| D. Password hashing | No passwords stored | Argon2id/bcrypt/scrypt with unique salt; never plaintext or fast hashes |
