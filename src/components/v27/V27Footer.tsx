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
            <p className="v27-footer-company">
              <a href="https://lateralusgroup.ai">Strategia is a Lateralus&nbsp;Group&nbsp;company</a>
            </p>
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
              <li><a href="#solutions">CHRO</a></li>
              <li><a href="#solutions">Talent Acquisition</a></li>
              <li><a href="#solutions">Executive Team</a></li>
              <li><a href="#solutions">Clinical Operations</a></li>
            </ul>
          </div>

          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="#industries">About</a></li>
              <li><a href="#demo">Contact</a></li>
              <li><a href="/privacy-policy">Privacy</a></li>
              <li><a href="/terms">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="v25-footer-bottom">
          <div className="v25-footer-bottom-left">&copy; 2026 Strategia, Inc. All rights reserved.</div>
          <div className="v25-footer-bottom-right">
            <a href="/privacy-policy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="#security">Security</a>
            <a href="#demo">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
