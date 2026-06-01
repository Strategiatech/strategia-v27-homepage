# Bugs And Risks

## Active Issues

- Full `npm run lint` fails on pre-existing unrelated lint errors outside the touched v27/vx files.
- `npm ci` reported 15 npm audit vulnerabilities (11 moderate, 4 high); no audit fix was run.
- Focused ESLint still warns about existing `<img>` usage in v27 nav/footer.

## Risks

- /v27 shares `src/app/(frontend)/vx/VxPage.tsx`; body changes also affect `/vx`.
- /v27 75% page sizing is implemented with CSS `zoom` scoped by `.vx-self-contained`; Browser verified Chromium/in-app behavior only, not a separate Safari/Firefox pass.
- Playwright fallback can generate untracked `.playwright-mcp/` logs during QA; generated logs were cleaned from the worktree.
- Decorative SVG pulse elements can have off-viewport bounding boxes, but the document scroll width remains constrained to the viewport.

## Failed Attempts

- Attempted `npm run lint` before dependency install; command could not find local eslint.
- Attempted full `npm run lint` after install; it failed on existing unrelated lint debt.
- Initial private Pages workflow build used `/strategia-v27-homepage` as a base path, but the assigned private Pages URL is a root domain. Corrected workflow to build without a base path.
- Initial wrapper-level 75% zoom attempt on `.v25.vx-self-contained` produced document horizontal overflow; corrected by applying `zoom: 0.75` at `html:has(.v25.vx-self-contained)`.

## Follow-Up

- Decide whether npm audit vulnerabilities should be triaged separately.
