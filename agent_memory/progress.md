# Progress

## Current Goal

- Pull Aaron-905/StrategiaTech and update /v27 based on the 20260529 Website JS revision PPT plus email notes.

## Status

- Code pulled, v27 implementation pass complete, GitHub Pages static export support added, and responsive clipping fixes completed.

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
- Added GitHub Pages workflow for the `Strategiatech/strategia-v27-homepage` project path.
- Added static-export base path handling for images/videos and hid the dev PageNav for published Pages builds.
- Fixed responsive clipping by making the mobile hero non-pinned, folding industry tabs into a grid, tightening mobile nav, and clipping decorative/carousel overflow.

## Next

- Create the private GitHub repo under `Strategiatech`, push `main`, enable/verify GitHub Pages deployment.

## Validation

- Verified: repo pulled from origin/main; no matching GitHub issue found; npm ci completed after user confirmation.
- Verified: npm run build passed.
- Verified: GitHub Pages static export build passed with `NEXT_PUBLIC_BASE_PATH=/strategia-v27-homepage`.
- Verified: focused ESLint passed on touched v27/vx files with only existing no-img-element warnings in nav/footer image components.
- Verified: Browser was used first for /v27 render checks; Playwright was used only as viewport fallback for desktop screenshot checks.
- Verified: responsive smoke at 360, 390, 576, 768, and 1440 widths showed no document horizontal overflow, no PageNav, no framework overlay, no 400 responses, and no console errors.
- Not verified: full npm run lint is not clean because of pre-existing unrelated lint errors across older pages/components.
