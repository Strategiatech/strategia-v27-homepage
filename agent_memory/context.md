# Context

## Project

- Name: StrategiaTech homepage
- Root: /Users/minghao/Documents/home page
- Current source of truth: GitHub repo Aaron-905/StrategiaTech, branch main

## Scope

- In scope: /v27 homepage revisions from 20260529 go-live PPT annotations; v27 navigation; shared VX homepage body used by /v27.
- Out of scope: commits, pushes, deployments, backend/Payload schema changes, old version routes unless explicitly requested.

## Key Paths

- src/app/(frontend)/v27/page.tsx
- src/app/(frontend)/vx/VxPage.tsx
- src/app/(frontend)/vx/vx-overrides.css
- src/components/v27/V27Nav.tsx
- src/components/vx/VxNav.css

## Decisions

- Existing GitHub issues were checked read-only; no matching issue was found for v27/go-live/PPT homepage work.
- Do not create a real GitHub issue, commit, push, or deploy without explicit user authorization.
- /v27 uses the shared VX homepage body; content/style changes in VxPage also affect /vx unless the page is later forked.

## Assumptions

- PPT visible annotations and PowerPoint comments are the accepted source for the current v27 revision pass.
- Slides without commentary are treated as acceptable unless a small polish change is needed to integrate surrounding sections.

## Open Questions

- Whether to commit/push/open PR for the completed v27 revision.
- Whether to fork `/v27` away from shared `/vx` before launch, because current body changes affect both routes.
