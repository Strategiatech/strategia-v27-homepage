'use client'

/* V27 footer — snapshot of the VX homepage shipped as a stand-alone
   page. Visually identical to VxFooter so the design review captures
   what the footer looks like — but every column link is inert
   (preventDefault on click) because /v27 is "just the homepage" with
   no subpages to point to. */

import type { MouseEvent } from 'react'
import { assetPath } from '@/lib/sitePath'

const inert = (e: MouseEvent<HTMLAnchorElement>) => e.preventDefault()

export default function V27Footer() {
  return (
    <footer className="v25-footer v27-footer">
      <div className="v25-footer-inner">
        <div className="v25-footer-top">
          <div className="v25-footer-brand">
            <img
              src={assetPath('/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png')}
              alt="Strategia"
            />
            <p>
              The intelligence engine for the modern workforce. Hire defensibly.
              Plan rigorously. Operate at scale.
            </p>
            <div className="v25-footer-version">Strategia Intelligence Engine v2.1 &middot; Live</div>
          </div>

          <div>
            <h5>Platform</h5>
            <ul>
              <li><a href="#" onClick={inert}>Overview</a></li>
              <li><a href="#" onClick={inert}>Modules</a></li>
              <li><a href="#" onClick={inert}>Science</a></li>
              <li><a href="#" onClick={inert}>Security</a></li>
            </ul>
          </div>

          <div>
            <h5>Solutions</h5>
            <ul>
              <li><a href="#" onClick={inert}>CHRO</a></li>
              <li><a href="#" onClick={inert}>Talent Acquisition</a></li>
              <li><a href="#" onClick={inert}>Executive Team</a></li>
              <li><a href="#" onClick={inert}>Clinical Operations</a></li>
            </ul>
          </div>

          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="#" onClick={inert}>About</a></li>
              <li><a href="#" onClick={inert}>Contact</a></li>
              <li><a href="#" onClick={inert}>Privacy</a></li>
              <li><a href="#" onClick={inert}>Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="v25-footer-bottom">
          <div className="v25-footer-bottom-left">&copy; 2026 Strategia, Inc. All rights reserved.</div>
          <div className="v25-footer-bottom-right">
            <a href="#" onClick={inert}>Privacy</a>
            <a href="#" onClick={inert}>Terms</a>
            <a href="#" onClick={inert}>Security</a>
            <a href="#" onClick={inert}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
