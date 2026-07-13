# Context

## Project

- Name: StrategiaTech homepage
- Root: /Users/minghao/code/strategia-v27-homepage
- Original source: GitHub repo Aaron-905/StrategiaTech, branch main
- Published repo: public GitHub repo Strategiatech/strategia-v27-homepage, branch main
- Published Pages URL: https://strategiatech.ai/

## Scope

- In scope: /v27 homepage revisions from 20260529 go-live PPT annotations; v27 navigation; shared VX homepage body used by /v27.
- In scope when requested: static `/questionnaire` and `/questionnaire/detail` routes copied from the old home website, backed by the existing Azure `strategia-home-api` Function App.
- Out of scope: backend/Payload schema changes and old version routes unless explicitly requested.

## Key Paths

- src/app/(frontend)/v27/page.tsx
- src/app/(frontend)/vx/VxPage.tsx
- src/app/(frontend)/vx/vx-overrides.css
- src/components/v27/V27Nav.tsx
- src/components/vx/VxNav.css
- src/app/(frontend)/questionnaire/
- src/features/questionnaire-management/
- src/lib/functionAppClient.ts
- .github/workflows/deploy-pages.yml

## Decisions

- Existing GitHub issues were checked read-only; no matching issue was found for v27/go-live/PPT homepage work.
- Do not create a real GitHub issue, commit, push, or deploy without explicit user authorization.
- /v27 uses the shared VX homepage body; content/style changes in VxPage also affect /vx unless the page is later forked.
- Public GitHub Pages uses the custom domain `strategiatech.ai`; the Pages workflow should build at the root path with no `NEXT_PUBLIC_BASE_PATH`.
- The v27 questionnaire must not expose `FUNCTION_APP_API_KEY` or `NEXT_PUBLIC_FUNCTION_APP_API_KEY`; browser clients use short-lived bearer tokens issued by `strategia-home-api` after password/admin-key validation.
- Questionnaire backend changes live in `/Users/minghao/Documents/GitHub/strategia-home-website/function-app`, not this v27 repo, because `strategia-home-api` is owned by the old home website repo.
- 2026-07-13 temporary recovery: the deleted `strategia-home-api` is not being rebuilt yet. Public questionnaire submissions use the existing dev Function App route `POST https://func-stg-api-dev-aue.azurewebsites.net/api/questionnaire`, which writes to `ai-stg.questionnaire.submissions` through `ADMIN_QUESTIONNAIRE_SUBMISSIONS_TABLE=questionnaire.submissions`.
- 2026-07-13 temporary recovery: public questionnaire password validation is intentionally frontend-only (`Strategia2025`). Treat it as a UI gate, not a security boundary, because the password is present in the static bundle.

## Assumptions

- PPT visible annotations and PowerPoint comments are the accepted source for the current v27 revision pass.
- Slides without commentary are treated as acceptable unless a small polish change is needed to integrate surrounding sections.

## Open Questions

- Whether to fork `/v27` away from shared `/vx` before launch, because current body changes affect both routes.
- Whether to add a custom domain later; no custom domain is currently configured.
