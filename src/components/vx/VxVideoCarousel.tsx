'use client'

import { useRef } from 'react'
import { assetPath } from '@/lib/sitePath'

/* eslint-disable @next/next/no-img-element */

type Item = {
  name: string
  role: string
  photo: string
}

const ITEMS: Item[] = [
  { photo: 'candidate-01.webp', name: 'Dr. James Hart', role: 'Clinical Director' },
  { photo: 'candidate-02.webp', name: 'Omar Al-Fayed', role: 'Regional Operations Lead' },
  { photo: 'candidate-03.webp', name: 'Amara Okafor', role: 'People Strategy Lead' },
  { photo: 'candidate-04.webp', name: 'Layla Hassan', role: 'Workforce Governance Advisor' },
  { photo: 'candidate-05.webp', name: 'Mei Chen', role: 'Clinical Operations Lead' },
  { photo: 'candidate-06.webp', name: 'Arjun Patel', role: 'Solutions Architect' },
  { photo: 'candidate-07.webp', name: 'Marcus Webb', role: 'Enterprise Risk Lead' },
  { photo: 'candidate-08.webp', name: 'Sofia Carvalho', role: 'Talent Acquisition Lead' },
  { photo: 'candidate-09.webp', name: 'Daniel Reed', role: 'Head of Product' },
  { photo: 'candidate-10.webp', name: 'Lena Park', role: 'Customer Success Manager' },
  { photo: 'candidate-11.webp', name: 'Kenji Sato', role: 'Data Science Lead' },
  { photo: 'candidate-12.webp', name: 'Amelia Brooks', role: 'Senior Program Lead' },
]

export default function VxVideoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    trackRef.current?.classList.add('vx-carousel-track--paused')
  }

  const handleLeave = () => {
    trackRef.current?.classList.remove('vx-carousel-track--paused')
  }

  // Duplicate the list so the marquee can loop seamlessly: animating from
  // 0 to -50% scrolls through the first copy, then wraps without a visible jump.
  const loop = [...ITEMS, ...ITEMS]

  return (
    <section className="v25-section v25-section--light vx-carousel-section" id="v-agent-carousel">
      <div className="vx-carousel-viewport">
        <div className="vx-carousel-track" ref={trackRef}>
          {loop.map((item, i) => (
            <div
              key={i}
              className="vx-carousel-card"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              aria-hidden={i >= ITEMS.length ? 'true' : undefined}
            >
              <img
                className="vx-carousel-card-photo"
                src={assetPath(`/vx/v-agent/photos/${item.photo}`)}
                alt={`${item.name}, ${item.role}`}
                loading="lazy"
                decoding="async"
              />
              <div className="vx-carousel-card-meta">
                <div className="vx-carousel-card-name">{item.name}</div>
                <div className="vx-carousel-card-role">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
