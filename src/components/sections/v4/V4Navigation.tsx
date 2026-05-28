export default function V4Navigation() {
  return (
    <nav className="v4-nav">
      <a href="#top" className="v4-logo-lockup">
        <img
          src="/images/logos/STRATEGIA_INLINE_SILVER.svg"
          alt="Strategia"
          className="v4-logo-img"
          style={{ height: 24, width: 'auto', filter: 'drop-shadow(0 0 12px rgba(252,240,153,.35))' }}
        />
      </a>
      <ul className="v4-nav-links">
        <li><a href="#method">Platform</a></li>
        <li><a href="#science">Science</a></li>
        <li><a href="#enterprise">Enterprise</a></li>
        <li><a href="#contact">About</a></li>
      </ul>
      <a href="#contact" className="v4-nav-cta"><span>Request Briefing</span></a>
    </nav>
  )
}
