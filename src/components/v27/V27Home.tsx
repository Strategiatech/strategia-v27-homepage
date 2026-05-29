'use client'

import VxPage from '@/app/(frontend)/vx/VxPage'
import V27Nav from '@/components/v27/V27Nav'
import V27Footer from '@/components/v27/V27Footer'

export default function V27Home() {
  return (
    <VxPage
      navSlot={<V27Nav />}
      footerSlot={<V27Footer />}
      selfContained
      disableHeroScrollLock
    />
  )
}
