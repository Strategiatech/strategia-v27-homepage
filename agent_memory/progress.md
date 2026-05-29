# Progress

## Current Goal

- Pull Aaron-905/StrategiaTech, update /v27 based on the 20260529 Website JS revision PPT plus email notes, publish to a new private Strategiatech GitHub Pages repo, and resolve go-live responsive clipping.

## Status

- Code pulled, v27 implementation pass complete, GitHub Pages static export support added, private repo created/pushed, Pages deployment verified successful, and responsive clipping fixes completed.

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

## Next

- Verify the final root-path Pages workflow run after the base path correction.

## Validation

- Verified: repo pulled from origin/main; no matching GitHub issue found; npm ci completed after user confirmation.
- Verified: npm run build passed.
- Verified: GitHub Pages static export build passed with `NEXT_PUBLIC_HIDE_PAGE_NAV=true NEXT_PUBLIC_PUBLISH_V27_AS_HOME=true` and no base path for the private Pages root domain.
- Verified: focused ESLint passed on touched v27/vx files with only existing no-img-element warnings in nav/footer image components.
- Verified: Browser was used first for /v27 render checks; Playwright was used only as viewport fallback for desktop screenshot checks.
- Verified: responsive smoke at 360, 390, 576, 768, and 1440 widths showed no document horizontal overflow, no PageNav, no framework overlay, no 400 responses, and no console errors.
- Verified: root-path static preview served CSS, logo, and carousel poster assets with HTTP 200.
- Not verified: full npm run lint is not clean because of pre-existing unrelated lint errors across older pages/components.
