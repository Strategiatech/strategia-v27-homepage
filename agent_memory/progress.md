# Progress

## Current Goal

- Wire `/v27` Contact us to the home page Azure Function App without exposing backend secrets.

## Status

- Code pulled, v27 implementation pass complete, GitHub Pages custom-domain deployment verified, and secure Contact us wiring implemented locally with backend deployed to `strategia-home-api`.

## Done

- Added v27 in-page nav links including Industries.
- Separated hero subhead lines and updated hero body text.
- Reworked instinct/industry section paragraph structure.
- Updated Solutions questions and quote treatment.
- Replaced Pillar 1 module box wall with an interactive module journey/spotlight.
- Adjusted Triangulate meta placement and card sizing.
- Added stronger science structure copy.
- Removed unused ROI time-to-fill input and restored three-input wording.
- Added final CTA paragraph spacing and closer line.
- Added GitHub Pages workflow for the private `Strategiatech/strategia-v27-homepage` repo.
- Added static-export base path handling for images/videos and hid the dev PageNav for published Pages builds.
- Fixed responsive clipping by making the mobile hero non-pinned, folding industry tabs into a grid, tightening mobile nav, and clipping decorative/carousel overflow.
- Corrected private Pages build to use the assigned root Pages URL rather than a `/strategia-v27-homepage` base path.
- Tuned the hero section: widened the left content column, moved the headline away from the nav, reduced logo sizing, and gave the hero triangle a teal/cyan glow matching the nav mark.
- Added UI polish pass: hero signal architecture, upgraded module active states, and higher-end Science/Security card surfaces.
- Removed the abstract Pillar 1 module architecture/flow panel after review; the section now moves directly from module selector to spotlight.
- Fixed /v27 first-scroll friction by disabling the legacy pinned hero release only for the V27 snapshot, keeping /vx and /v25 default behavior unchanged.
- Changed `Strategiatech/strategia-v27-homepage` from private to public and restored the public GitHub Pages base path `/strategia-v27-homepage`.
- Applied the latest Platform-section feedback: module selector titles now stay on one line with equal-width items, and the spotlight target/crosshair decoration was removed.
- Moved the local working copy from `/Users/minghao/Documents/home page` to `/Users/minghao/code/strategia-v27-homepage`.
- Applied the 20260601 Browser comment pass on `/v27`: 75% page sizing, hero/Industries text removals, ROI USD labels, Science dot removal, stats/ROI font alignment, Assess two-card display, Security accent alignment, Signal weighting gradient segmentation, final CTA/footer removals.
- Replaced the V-Agent placeholder video carousel with 12 supplied candidate portrait photos, optimized as WebP assets under `public/vx/v-agent/photos/`.
- Applied follow-up `/v27` layout fixes: restored header/footer visual size under the 75% page scale, centered the V-Agent photo carousel content gutter, stacked multi-card module phases vertically, matched Solutions quote marks to the teal accent, added footer in-page anchors, increased hero copy spacing, capped annual hires at 300, and moved the Triangulate score to the triangle visual centre with explicit triangle side strokes.
- Updated `/v27` FAQ answers from single-block strings to segmented paragraphs matching the supplied copy structure.
- Adjusted `/v27` hero alignment so the headline uses the shared content gutter, stays left-aligned on narrower viewports, and has more space below the fixed header.
- Added a 13th V-Agent avatar photo (`candidate-13.webp`) to the carousel.
- Increased `/v27` hero vertical spacing between the headline/proposition/body/buttons.
- Removed the extra gap between the three Industries proof lines (`Finance relies...`, `Medicine relies...`, `Operations rely...`).
- Updated the shared VX final CTA used by `/v27`: removed the CTA logo, changed the section to a left-copy/right-contact-form layout, and kept the header Book demo target on `#demo`.
- Updated `/v27` footer Solutions links so every item jumps to `#solutions`; changed Annual hires slider bounds to 30-2000; wrapped `Microsoft-partnered.` in a nowrap span.
- Applied latest `/v27` polish: merged the Science AI/framework copy into one sentence, changed Signal weighting values to `40 % / 20 % / 40 %` with white text, and widened the ROI assumptions note to align with the `USD$` value row.
- Aligned `/v27` Science framework cards and Three pillars cards with grid/subgrid rows so card heights, content starts, subcontent starts, and divider/footer line positions match across desktop columns.
- Fixed `/v27` mobile header transparency on direct hash-anchor loads by adding deferred nav scroll-state sync and a mobile solid-background fallback.
- Replaced the browser tab favicon with the same white line-frame Strategia triangle mark used in the header, using a transparent background and teal glow, and added an SVG app icon for modern browsers.
- Confirmed the existing Azure `strategia-home-api` Function App has a `POST /api/send_email` endpoint and Graph notification email settings that can be reused for the `/v27` Contact us form, pending frontend wiring, GitHub Pages env injection, Azure CORS update, and abuse protection.
- Tested `strategiatech.ai` after GoDaddy DNS changes; authoritative GoDaddy nameservers returned GitHub Pages A records and `www` CNAME before the GitHub Pages custom domain was configured.
- Configured GitHub Pages custom domain for `strategiatech.ai`, enabled HTTPS after certificate approval, and updated the Pages workflow to build for the custom-domain root path with `out/CNAME`.
- Pushed the custom-domain workflow change and verified the GitHub Pages deployment run completed successfully.
- Rechecked live `https://strategiatech.ai/`; ordinary DNS and in-app Browser now resolve to the GitHub Pages v27 site instead of the old GoDaddy Website Builder site.
- Added a dedicated home page Function App endpoint at `POST /api/contact` with strict allowed-origin checks, Turnstile verification, honeypot sink, basic per-IP rate limiting, sanitized contact-message construction, and Microsoft Graph notification reuse.
- Updated the v27 Contact us form to post to `https://strategia-home-api.azurewebsites.net/api/contact` using `NEXT_PUBLIC_CONTACT_API_URL` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, without exposing `FUNCTION_APP_API_KEY`.
- Updated Azure Function App app settings and platform CORS allowlists to include `https://strategiatech.ai`, `https://www.strategiatech.ai`, local dev origins, and the GitHub Pages fallback origin.
- Deployed the updated `strategia-home-api` Function App via remote-build zip deploy; Azure now lists the `strategia-home-api/contact` function.
- Enabled `httpsOnly=true` on `strategia-home-api`.

## Next

- Push/deploy the frontend contact-form change when ready; `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is now configured in the v27 GitHub Pages repo.

## Validation

- Verified: repo pulled from origin/main; no matching GitHub issue found; npm ci completed after user confirmation.
- Verified: npm run build passed.
- Verified: GitHub Pages static export build passed with `NEXT_PUBLIC_HIDE_PAGE_NAV=true NEXT_PUBLIC_PUBLISH_V27_AS_HOME=true` and no base path for the private Pages root domain.
- Verified: focused ESLint passed on touched v27/vx files with only existing no-img-element warnings in nav/footer image components.
- Verified: Browser was used first for /v27 render checks; Playwright was used only as viewport fallback for desktop screenshot checks.
- Verified: responsive smoke at 360, 390, 576, 768, and 1440 widths showed no document horizontal overflow, no PageNav, no framework overlay, no 400 responses, and no console errors.
- Verified: root-path static preview served CSS, logo, and carousel poster assets with HTTP 200.
- Verified: final GitHub Pages workflow run `26621899178` completed successfully after the root-path correction.
- Verified: local static preview at `/strategia-v27-homepage/` after hero tuning builds successfully and has no document horizontal overflow at 390px or 1954px.
- Verified: local UI polish build passed and `/strategia-v27-homepage/` has no document horizontal overflow at 390px and 1440px; the abstract module panel is absent and module selector remains active.
- Verified: `/v27` in Browser at `http://127.0.0.1:3000/v27` starts with normal-scroll hero mode (`vx-no-hero-scroll-lock`), first scroll stays at `scrollY=420`, and continued scroll reaches the Industries section with content visible.
- Verified: `npm run build` passed after the /v27 scroll-lock fix.
- Verified: focused ESLint passed for `src/app/(frontend)/v25/tetrahedron.ts`, `src/app/(frontend)/vx/VxPage.tsx`, and `src/components/v27/V27Home.tsx`.
- Verified: GitHub API reports repo visibility `public` and Pages `public=true`; public URL moved to `https://strategiatech.github.io/strategia-v27-homepage/`.
- Verified: `npm run build` passed after the Platform-section selector/decorative-element fix.
- Verified: focused ESLint passed for `src/app/(frontend)/vx/VxPage.tsx`.
- Verified: Browser checks at 1440x900 and 390x844 show module selector item widths are equal, module titles use `white-space: nowrap`, the spotlight `::after` target decoration is absent, and document horizontal overflow is `0`.
- Verified: after moving folders, git status and remotes still work from `/Users/minghao/code/strategia-v27-homepage`.
- Verified: `npm run build` passed after the 20260601 `/v27` Browser comment pass.
- Verified: focused ESLint passed for `src/app/(frontend)/vx/VxPage.tsx` and `src/components/v27/V27Footer.tsx` with only the existing v27 footer `<img>` warning.
- Verified: Browser path used first for `/v27`; 746x734 checks show 75% zoom, removed requested text, USD labels, matching high-governance/AI-native teal, Science dot removed, stats and ROI value fonts aligned, gradient Signal weighting with dividers, no console warnings/errors, no framework overlay, and no document horizontal overflow.
- Verified: Browser interaction at `http://localhost:3000/v27#modules` clicking `Phase 03 Assess` shows both `V-Psych` and `V-Interview` spotlight cards side by side at 746px width.
- Verified: Browser mobile smoke at 390x844 shows the `/v27` page renders with no document horizontal overflow and no framework overlay.
- Verified: `npm run build` passed after the V-Agent photo carousel replacement.
- Verified: focused ESLint passed for `src/components/vx/VxVideoCarousel.tsx` and `src/app/(frontend)/vx/VxPage.tsx`.
- Verified: Browser at `http://localhost:3000/v27#v-agent-carousel` shows 24 photo cards including duplicated loop items, zero video elements, 16:9 card aspect, no console warnings/errors, and no document horizontal overflow.
- Verified: all 12 `/vx/v-agent/photos/candidate-*.webp` assets return HTTP 200 from the local dev server.
- Verified: `npm run build` passed after the follow-up layout fixes.
- Verified: focused ESLint passed for touched TSX files; warnings only for CSS ignored by ESLint config and existing v27 footer `<img>` usage.
- Verified: Browser path used first for `/v27`; 746px checks show header height restored to 72px, footer inverse scale applied, carousel gutters equal left/right, Annual hires max/value at 300, footer Modules link jumps to `#modules`, Assess shows `V-Psych` then `V-Interview` vertically, Operate shows `V-Onboarding` then `V-Insights` vertically, no console warnings/errors, and no document horizontal overflow.
- Verified: desktop Playwright fallback at 1306x768 was used only for Triangulate viewport coverage; screenshot shows all three triangle sides visible and the JobFit score card centered visually in the triangle.
- Verified: ROI projected annual savings value color now matches the `USD` input value color `#006D6A`.
- Verified: Triangulate triangle updated to a taller isosceles geometry with the score marker moved to the triangle centre/centroid at `y=280`; Browser confirmed three side strokes and no console warnings/errors, and a 1306px desktop screenshot verified the visual placement.
- Verified: `npm run build` passed after the final Triangulate centre-position adjustment.
- Verified: Browser at `http://localhost:3000/v27#faqs` shows FAQ 1 split into 2 paragraphs and FAQ 5 split into 7 paragraphs with 16px paragraph spacing; no console warnings/errors, no framework overlay, and no document horizontal overflow.
- Verified: `npm run build` passed after the FAQ paragraph rendering change.
- Verified: Browser at `http://localhost:3000/v27` shows the hero headline left-aligned rather than pushed to the right at 746px viewport, with a 36px gap below the header and no document horizontal overflow.
- Verified: Browser at `http://localhost:3000/v27#v-agent-carousel` shows 13 unique avatar images, 26 loop cards, `candidate-13.webp` rendered twice in the loop, no console warnings/errors, and no document horizontal overflow; `curl -I` returns HTTP 200 for the new WebP asset.
- Verified: `npm run build` passed after the hero alignment and V-Agent avatar changes.
- Verified: Browser at `http://localhost:3000/v27` shows hero spacing increased to 33px between `Intelligence` and `Predict`, 71px between `Build the engine...` and the body copy, and 72px between the body copy and the buttons; no console warnings/errors and no document horizontal overflow.
- Verified: `npm run build` passed after the hero spacing increase.
- Verified: Browser at `http://localhost:3000/v27#industries` shows `0px` grid gap and `0px` paragraph margins between the three Industries proof lines; no console warnings/errors and no document horizontal overflow.
- Verified: `npm run build` passed after the Industries proof-line spacing adjustment.
- Verified: focused ESLint passed for `src/app/(frontend)/vx/VxPage.tsx` after the final CTA/contact-form update.
- Verified: `npm run build` passed after the final CTA/contact-form update.
- Verified: Browser path used first for `/v27`; desktop 1280x720 and mobile 390x844 checks showed header Book demo jumps to `#demo`, the CTA logo is absent, Contact us fields exist, no framework overlay is visible, no console warnings/errors were captured, and document horizontal overflow is `0`.
- Verified: focused ESLint passed for `src/app/(frontend)/vx/VxPage.tsx` and `src/components/v27/V27Footer.tsx` after the footer/Solutions/ROI polish; only the existing v27 footer `<img>` warning remains.
- Verified: `npm run build` passed after the footer/Solutions/ROI polish.
- Verified: Browser path used first for `/v27`; desktop check showed all four footer Solutions hrefs are `#solutions`, clicking one lands on `#solutions`, Annual hires min/max are `30`/`2000`, `Microsoft-partnered.` has `white-space: nowrap`, no console warnings/errors, no framework overlay, and no horizontal overflow.
- Verified: Browser mobile check at 390x844 showed `Microsoft-partnered.` remains one line, fits inside the trust block, Annual hires min/max remain `30`/`2000`, and document horizontal overflow is `0`.
- Verified: `npm run build` passed after Science/Three pillars alignment changes.
- Verified: `git diff --check` passed after Science/Three pillars alignment changes.
- Verified: Browser path used first for `/v27`; desktop 1440x900 showed Three pillars card height/title/italic/body/footer-line deltas all `0`, Science card height/title/tag/tag-bottom/body deltas all `0`, no console warnings/errors, no framework overlay, and no horizontal overflow.
- Verified: Browser mobile smoke at 390x844 showed Science and Three pillars remain single-column, both still render three cards, no console warnings/errors, no framework overlay, and no horizontal overflow.
- Verified: Browser path used first for `/v27`; Science copy has the merged sentence and no separate `Every result...` paragraph, Signal weighting reads `40 %`, `20 %`, `40 %` with white text for all three values, ROI note width matches the `USD$1.51m` value row at 633px, no console warnings/errors, no framework overlay, and no horizontal overflow.
- Verified: `npm run build` passed after the Science/Signal/ROI polish.
- Verified: focused ESLint passed for `src/components/v27/V27Nav.tsx` after the mobile header fix; only the existing v27 nav `<img>` warning remains.
- Verified: `npm run build` passed after the mobile header fix.
- Verified: `git diff --check` passed after the mobile header fix.
- Verified: Browser path used first for `/v27`; mobile 390x844 direct load to `http://127.0.0.1:3000/v27?navfix=3#pillars` computed nav background `rgb(1, 34, 54)`, nav shadow was present, no console warnings/errors, no framework overlay, and no horizontal overflow.
- Verified: `npm run build` passed after the favicon/logo icon update.
- Verified: `git diff --check` passed after the favicon/logo icon update.
- Verified: Browser path used first for `/v27`; after reload, page head exposes `/favicon.ico?...` as `image/x-icon` and `/icon.svg?...` as `image/svg+xml`, the SVG icon has no background rect, and the page header mark path remains `M20 4L36 34H4L20 4Z`, with no console warnings/errors.
- Verified: Azure CLI read-only checks showed `strategia-home-api` is running in `strategia-home-rg`, exposes `POST /api/send_email`, has Microsoft Graph mail settings and notification recipients configured, but does not currently allow the `https://strategiatech.github.io` origin in `ALLOWED_ORIGINS`.
- Verified: `dig @ns67.domaincontrol.com strategiatech.ai A` and `dig @ns68.domaincontrol.com strategiatech.ai A` return GitHub Pages IPs `185.199.108.153` through `185.199.111.153`; `www.strategiatech.ai` CNAME returns `strategiatech.github.io`.
- Verified: before GitHub Pages custom-domain configuration, in-app Browser still showed the old GoDaddy Website Builder page due DNS/cache path and forced GitHub Pages routing returned GitHub `Site not found`.
- Verified: GitHub Pages now reports `custom_domain=strategiatech.ai`, `html_url=https://strategiatech.ai/`, `https_certificate_state=approved`, and `enforce_https=true`.
- Verified: `GITHUB_PAGES=true NEXT_PUBLIC_HIDE_PAGE_NAV=true NEXT_PUBLIC_PUBLISH_V27_AS_HOME=true npm run build:pages` passes after removing the project base path.
- Verified: GitHub Actions run `26740426632` completed successfully for the custom-domain Pages deployment.
- Verified: forcing `strategiatech.ai` to GitHub Pages IP `185.199.108.153` returns the v27 homepage with `Own the workforce intelligence layer`, no `/strategia-v27-homepage` base path, and root `/_next/` assets.
- Verified: ordinary `curl https://strategiatech.ai/` now returns GitHub Pages `HTTP/2 200`, contains v27 content, has no GoDaddy Website Builder text, and has no `/strategia-v27-homepage` base path.
- Verified: in-app Browser at `https://strategiatech.ai/` shows the v27 hero, title `Strategia | AI-driven workforce intelligence`, the Contact us form exists, no GoDaddy content is present, no `/strategia-v27-homepage` base path is present, and horizontal overflow is `0`.
- Verified: focused Function App tests passed with Python 3.12 Azure Functions environment: `test_contact.py` and `test_send_email.py` both pass.
- Verified: focused ESLint passed for `src/app/(frontend)/vx/VxPage.tsx` and `src/components/vx/VxTurnstile.tsx`.
- Verified: `npm run build` and GitHub Pages-style `npm run build:pages` passed with contact env vars supplied.
- Verified: deployed `https://strategia-home-api.azurewebsites.net/api/contact` returns CORS preflight `204` with `access-control-allow-origin: https://strategiatech.ai`, allowed-origin POST without Turnstile returns JSON `403 Verification failed`, and disallowed-origin POST returns JSON `403 Origin not allowed`.
- Verified: Azure reports `strategia-home-api` is running on `Python|3.11` with `httpsOnly=true`.
- Verified: Browser path used first for local `/v27#demo`; contact fields render, missing Turnstile site key disables submit safely, and document horizontal overflow is `0`.
- Verified: extracted the public Turnstile site key from the old deployed home page questionnaire bundle and configured it as `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in `Strategiatech/strategia-v27-homepage` GitHub Actions secrets.
- Not verified: full npm run lint is not clean because of pre-existing unrelated lint errors across older pages/components.
- Not verified: successful live contact email submission, because the frontend contact-form code has not been pushed/deployed in this turn.
