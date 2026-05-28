'use client'

import { useRef } from 'react'

/* eslint-disable @next/next/no-img-element */

/* Placeholder candidate interview clips, sourced from Mixkit (free license).
   Each card pairs the video with its own first-frame thumbnail so the still
   matches what plays on hover. Replace with real candidate clips when ready. */
type Item = {
  name: string
  role: string
  id: string
}

const ITEMS: Item[] = [
  { id: '28287', name: 'Olumide Adebayo', role: 'Solutions Architect' },
  { id: '4834',  name: 'Mei Chen',        role: 'Clinical Operations Lead' },
  { id: '42323', name: 'Priya Iyer',      role: 'Data Science Lead' },
  { id: '23887', name: 'Daniel Park',     role: 'Head of Product' },
  { id: '52193', name: 'Sofia Carvalho',  role: 'Customer Success Manager' },
  { id: '37027', name: 'Marcus Webb',     role: 'Principal Designer' },
  { id: '46900', name: 'Lena Schroeder',  role: 'Talent Acquisition Lead' },
  { id: '2957',  name: 'Amelia Nyong’o',  role: 'Senior Backend Engineer' },
]

export default function VxVideoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.querySelector('video')
    if (video) {
      video.muted = false
      video.volume = 0.85
      void video.play().catch(() => { /* ignore aborted plays */ })
    }
    trackRef.current?.classList.add('vx-carousel-track--paused')
  }

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.querySelector('video')
    if (video) {
      video.pause()
      video.currentTime = 0
      video.muted = true
    }
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
              <video
                className="vx-carousel-card-video"
                src={`/vx/videos/clip-${item.id}.mp4`}
                poster={`/vx/videos/posters/poster-${item.id}.jpg`}
                muted
                playsInline
                preload="none"
                loop
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
