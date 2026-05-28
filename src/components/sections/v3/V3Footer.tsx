export default function V3Footer() {
  return (
    <footer className="v3-footer">
      <div className="v3-footer-inner">
        <div className="v3-footer-brand">
          <a href="#top" className="logo-lockup">
            <svg className="logo-triangle" viewBox="0 0 28 24" fill="none">
              <path
                d="M14 2L26 22H2L14 2Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
            <span className="logo-wordmark">Strategia</span>
          </a>
          <p>
            AI-native workforce intelligence for enterprise operators in
            healthcare and beyond. A Lateralus Capital company.
          </p>
        </div>

        <div className="v3-footer-col">
          <h5>Platform</h5>
          <ul>
            <li><a href="#method">Modules</a></li>
            <li><a href="#science">Science</a></li>
            <li><a href="#method">Method</a></li>
            <li><a href="#enterprise">Enterprise</a></li>
          </ul>
        </div>

        <div className="v3-footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        <div className="v3-footer-col">
          <h5>Contact</h5>
          <ul>
            <li><a href="#contact">Request Briefing</a></li>
            <li><a href="mailto:partnerships@strategiatech.io">Partnerships</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Legal</a></li>
          </ul>
        </div>
      </div>

      <div className="v3-footer-bot">
        <div>&copy; 2026 Strategia. A Lateralus Capital Company.</div>
        <div className="tag">AI Driven Workforce Intelligence.</div>
      </div>
    </footer>
  )
}
