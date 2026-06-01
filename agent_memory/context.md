# Context

## Project

- Name: StrategiaTech homepage
- Root: /Users/minghao/code/strategia-v27-homepage
- Original source: GitHub repo Aaron-905/StrategiaTech, branch main
- Published repo: public GitHub repo Strategiatech/strategia-v27-homepage, branch main
- Published Pages URL: https://strategiatech.github.io/strategia-v27-homepage/

## Scope

- In scope: /v27 homepage revisions from 20260529 go-live PPT annotations; v27 navigation; shared VX homepage body used by /v27.
- Out of scope: backend/Payload schema changes and old version routes unless explicitly requested.

## Key Paths

- src/app/(frontend)/v27/page.tsx
- src/app/(frontend)/vx/VxPage.tsx
- src/app/(frontend)/vx/vx-overrides.css
- src/components/v27/V27Nav.tsx
- src/components/vx/VxNav.css
- .github/workflows/deploy-pages.yml

## Decisions

- Existing GitHub issues were checked read-only; no matching issue was found for v27/go-live/PPT homepage work.
- Do not create a real GitHub issue, commit, push, or deploy without explicit user authorization.
- /v27 uses the shared VX homepage body; content/style changes in VxPage also affect /vx unless the page is later forked.
- Public GitHub Pages uses the project path `/strategia-v27-homepage`; the Pages workflow should build with `NEXT_PUBLIC_BASE_PATH=/strategia-v27-homepage`.

## Assumptions

- PPT visible annotations and PowerPoint comments are the accepted source for the current v27 revision pass.
- Slides without commentary are treated as acceptable unless a small polish change is needed to integrate surrounding sections.

## Open Questions

- Whether to fork `/v27` away from shared `/vx` before launch, because current body changes affect both routes.
- Whether to add a custom domain later; no custom domain is currently configured.
