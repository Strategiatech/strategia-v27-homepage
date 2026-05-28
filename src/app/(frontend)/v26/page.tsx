'use client'

/* /v26 — snapshot of /vx as it stood before the 2026-05-25 content
   re-write. Identical composition to the original /vx/page.tsx
   (V25Page rendered with VX nav + footer slots and Triangulate
   variants on), but pinned with V26-scoped nav / footer so any
   future evolution of /vx does not retroactively change /v26. */

import V25Page from '../v25/V25Page'
import V26Nav from '@/components/v26/V26Nav'
import V26Footer from '@/components/v26/V26Footer'

export default function Page() {
  return (
    <V25Page
      navSlot={<V26Nav />}
      footerSlot={<V26Footer />}
      showTriangulateVariants
      inertOutboundLinks
    />
  )
}
