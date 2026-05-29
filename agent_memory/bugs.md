# Bugs And Risks

## Active Issues

- Full `npm run lint` fails on pre-existing unrelated lint errors outside the touched v27/vx files.
- `npm ci` reported 15 npm audit vulnerabilities (11 moderate, 4 high); no audit fix was run.
- Focused ESLint still warns about existing `<img>` usage in v27 nav/footer.

## Risks

- /v27 shares `src/app/(frontend)/vx/VxPage.tsx`; body changes also affect `/vx`.
- Playwright fallback can generate untracked `.playwright-mcp/` logs during QA; generated logs were cleaned from the worktree.
- Decorative SVG pulse elements can have off-viewport bounding boxes, but the document scroll width remains constrained to the viewport.

## Failed Attempts

- Attempted `npm run lint` before dependency install; command could not find local eslint.
- Attempted full `npm run lint` after install; it failed on existing unrelated lint debt.

## Follow-Up

- Decide whether to create an issue/commit/push/PR for this go-live revision.
