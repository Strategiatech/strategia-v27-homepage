export default function Footer() {
  return (
    <>
      {/* ── Final CTA ── */}
      <section className="final-cta">
        <div className="container">
          <span className="eyebrow">
            <span className="eb-dot" />
            Get started
          </span>
          <h2>The Future of Workforce Intelligence Starts&nbsp;Now</h2>
          <p>
            Strategia is secure, tested, and integration-ready. It enhances your
            internal capabilities, not replaces&nbsp;them.
          </p>
          <div className="hero-ctas">
            <a href="#" className="btn btn-primary">Request Demo</a>
            <a href="#" className="btn btn-ghost-light">Talk to sales</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <div className="container">
          <div className="footer-top">
            {/* Brand */}
            <div className="footer-col footer-brand">
              <a href="/" className="logo">
                <img
                  src="/images/logos/STRATEGIA_INLINE_WHITE.svg"
                  alt="Strategia"
                  style={{ height: 28, width: 'auto' }}
                />
              </a>
              <p>
                Workforce intelligence for organisations that refuse to
                accept guesswork as strategy.
              </p>
            </div>

            {/* Platform */}
            <div className="footer-col">
              <h5>Platform</h5>
              <ul>
                <li><a href="#">V-Parse</a></li>
                <li><a href="#">V-Psych</a></li>
                <li><a href="#">V-Interview</a></li>
                <li><a href="#">V-Scenario</a></li>
                <li><a href="#">V-Onboarding</a></li>
                <li><a href="#">V-Insights</a></li>
              </ul>
            </div>

            {/* Solutions */}
            <div className="footer-col">
              <h5>Solutions</h5>
              <ul>
                <li><a href="#">Financial Services</a></li>
                <li><a href="#">Healthcare &amp; Pharma</a></li>
                <li><a href="#">Technology</a></li>
                <li><a href="#">Government</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="footer-col">
              <h5>Company</h5>
              <ul>
                <li><a href="#">Science</a></li>
                <li><a href="#">Enterprise</a></li>
                <li><a href="#">Our Process</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-col footer-newsletter">
              <h5>Stay in the loop</h5>
              <p>Monthly workforce intelligence digest. No spam, unsubscribe anytime.</p>
              <form className="newsletter-form" action="#" method="post">
                <input type="email" placeholder="you@company.com" required />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>

          {/* Bottom row */}
          <div className="footer-bottom">
            <span>&copy; 2025 Strategia Intelligence Systems. All rights reserved.</span>

            <div className="links">
              <a href="#">Platform</a>
              <a href="#">Science</a>
              <a href="#">Solutions</a>
              <a href="#">Enterprise</a>
              <a href="#">Our Process</a>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>

            <div className="footer-social">
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4.5 6.5v5M4.5 4.5v.01M7 11.5v-3c0-1 .5-2 1.75-2S10.5 7.5 10.5 8.5v3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.25" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" aria-label="X">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l4.5 5L3 13M13 3l-4.5 5L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Mobile sticky CTA ── */}
      <MobileCta />
    </>
  )
}

function MobileCta() {
  return (
    <div className="mobile-cta" id="mobile-cta">
      <span style={{ fontSize: 14, fontWeight: 500 }}>See Strategia on your data</span>
      <a href="#" className="btn btn-primary btn-sm">Request Demo</a>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var el = document.getElementById('mobile-cta');
              if (!el) return;
              var shown = false;
              function check() {
                var shouldShow = window.scrollY > 600;
                if (shouldShow !== shown) {
                  shown = shouldShow;
                  el.classList.toggle('show', shown);
                }
              }
              window.addEventListener('scroll', check, { passive: true });
              check();
            })();
          `,
        }}
      />
    </div>
  )
}
