'use client'

/* /v27 — stand-alone snapshot of the /vx homepage. Shares VxPage's
   body so future visual refinements to the homepage flow through,
   but ships with its own nav and footer (no /vx/* subpage links)
   and passes selfContained so the inline outbound links to /vx
   subpages are suppressed. The page lives entirely under /v27 with
   in-page anchors only — there are no V27 subpages. */

import V27Home from '@/components/v27/V27Home'

export default function Page() {
  return <V27Home />
}
