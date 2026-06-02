export default function V4Footer() {
  return (
    <footer className="v4-footer">
      <div className="v4-footer-inner">
        <div className="v4-footer-brand v4-reveal" data-delay="1">
          <a href="#top" className="v4-logo-lockup">
            <img
              src="/images/logos/STRATEGIA_INLINE_SILVER.svg"
              alt="Strategia"
              style={{ height: 28, width: 'auto' }}
            />
          </a>
          <p>AI-native workforce intelligence for enterprise operators in healthcare and beyond. A Lateralus Capital company.</p>
        </div>
        <div className="v4-footer-col v4-reveal" data-delay="2">
          <h5>Platform</h5>
          <ul>
            <li><a href="#method">Modules</a></li>
            <li><a href="#science">Science</a></li>
            <li><a href="#method">Method</a></li>
            <li><a href="#enterprise">Enterprise</a></li>
          </ul>
        </div>
        <div className="v4-footer-col v4-reveal" data-delay="3">
          <h5>Company</h5>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>
        <div className="v4-footer-col v4-reveal" data-delay="4">
          <h5>Contact</h5>
          <ul>
            <li><a href="#contact">Request Briefing</a></li>
            <li><a href="mailto:partnerships@strategiatech.io">Partnerships</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Legal</a></li>
          </ul>
        </div>
      </div>
      <div className="v4-footer-bot v4-reveal" data-delay="5">
        <div>© 2026 Strategia. A Lateralus Capital Company.</div>
        <div className="v4-tag">AI-Native Workforce Intelligence.</div>
      </div>
    </footer>
  )
}
