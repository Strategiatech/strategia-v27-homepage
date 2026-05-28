import Link from 'next/link'

export default function VxFooter() {
  return (
    <footer className="v25-footer">
      <div className="v25-footer-inner">
        <div className="v25-footer-top">
          <div className="v25-footer-brand">
            <img
              src="/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png"
              alt="Strategia"
            />
            <p>
              The intelligence engine for the healthcare workforce. Hire defensibly.
              Plan rigorously. Operate at scale.
            </p>
            <div className="v25-footer-version">Strategia Intelligence Engine v2.1 &middot; Live</div>
          </div>

          <div>
            <h5>Platform</h5>
            <ul>
              <li><Link href="/vx/platform">Overview</Link></li>
              <li><Link href="/vx#modules">Modules</Link></li>
              <li><Link href="/vx/science">Science</Link></li>
              <li><Link href="/vx/institutional">Security</Link></li>
            </ul>
          </div>

          <div>
            <h5>Solutions</h5>
            <ul>
              <li><Link href="/vx/solutions#chro">CHRO</Link></li>
              <li><Link href="/vx/solutions#talent-acquisition">Talent Acquisition</Link></li>
              <li><Link href="/vx/solutions#executive-team">Executive Team</Link></li>
              <li><Link href="/vx/solutions#clinical-operations">Clinical Operations</Link></li>
            </ul>
          </div>

          <div>
            <h5>Resources</h5>
            <ul>
              <li><Link href="/vx/science">Validity studies</Link></li>
              <li><Link href="/vx/process">Our Process</Link></li>
              <li><Link href="/vx/institutional#trust">Security &amp; trust</Link></li>
              <li><Link href="/vx/brand">Design system</Link></li>
            </ul>
          </div>

          <div>
            <h5>Company</h5>
            <ul>
              <li><Link href="/vx">About</Link></li>
              <li><Link href="/vx/contact">Contact</Link></li>
              <li><Link href="/vx/privacy-policy">Privacy</Link></li>
              <li><Link href="/vx/terms">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="v25-footer-bottom">
          <div className="v25-footer-bottom-left">&copy; 2026 Strategia, Inc. All rights reserved.</div>
          <div className="v25-footer-bottom-right">
            <Link href="/vx/privacy-policy">Privacy</Link>
            <Link href="/vx/terms">Terms</Link>
            <Link href="/vx/institutional#trust">Security</Link>
            <Link href="/vx/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
