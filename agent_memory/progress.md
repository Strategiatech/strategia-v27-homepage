# Progress

## Current Goal

- Pull Aaron-905/StrategiaTech, update /v27 based on the 20260529 Website JS revision PPT plus email notes, publish to a new private Strategiatech GitHub Pages repo, and resolve go-live responsive clipping.

## Status

- Code pulled, v27 implementation pass complete, GitHub Pages static export support added, private repo created/pushed, Pages deployment verified successful, responsive clipping fixes completed, and UI polish pass applied locally.

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

## Next

- None for the current deployment task.

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
- Not verified: full npm run lint is not clean because of pre-existing unrelated lint errors across older pages/components.
