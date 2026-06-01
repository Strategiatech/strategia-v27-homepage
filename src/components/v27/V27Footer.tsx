'use client'

/* V27 footer — snapshot of the VX homepage shipped as a stand-alone
   page. Column links jump to sections within the one-page /v27 build
   instead of pointing to /vx subpages. */

import { assetPath } from '@/lib/sitePath'

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
              <li><a href="#pillars">Overview</a></li>
              <li><a href="#modules">Modules</a></li>
              <li><a href="#science">Science</a></li>
              <li><a href="#security">Security</a></li>
            </ul>
          </div>

          <div>
            <h5>Solutions</h5>
            <ul>
              <li><a href="#solution-chro">CHRO</a></li>
              <li><a href="#solution-talent-acquisition">Talent Acquisition</a></li>
              <li><a href="#solution-hospital-ceo">Executive Team</a></li>
              <li><a href="#solution-clinical-operations">Clinical Operations</a></li>
            </ul>
          </div>

          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="#industries">About</a></li>
              <li><a href="#demo">Contact</a></li>
              <li><a href="#security">Privacy</a></li>
              <li><a href="#security">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="v25-footer-bottom">
          <div className="v25-footer-bottom-left">&copy; 2026 Strategia, Inc. All rights reserved.</div>
          <div className="v25-footer-bottom-right">
            <a href="#security">Privacy</a>
            <a href="#security">Terms</a>
            <a href="#security">Security</a>
            <a href="#demo">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
