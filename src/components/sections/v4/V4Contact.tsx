export default function V4Contact() {
  return (
    <div className="v4-contact-band" id="contact">
      <div className="v4-contact-inner">
        <div className="v4-section-label v4-reveal" data-delay="1">Engage</div>
        <div className="v4-contact-grid v4-reveal" data-delay="2">
          <div className="v4-contact-copy">
            <h3>
              The future of workforce intelligence <em>starts now.</em>
            </h3>
            <p>
              Strategia is secure, tested, and integration-ready. We augment your internal capability — we don&apos;t replace it. Request a confidential executive briefing to discuss deployment for your organisation.
            </p>
            <ul className="v4-contact-checks">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Seamless integration with existing ATS / HRIS
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                8–12 week deployment to live operation
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Executive-level accountability throughout
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Deployment region of your choosing
              </li>
            </ul>
          </div>

          <div className="v4-form-card">
            <div className="v4-form-title">Request Executive Briefing</div>
            <div className="v4-form-row">
              <div className="v4-form-field"><label>First Name</label><input type="text" /></div>
              <div className="v4-form-field"><label>Last Name</label><input type="text" /></div>
            </div>
            <div className="v4-form-field"><label>Work Email</label><input type="email" /></div>
            <div className="v4-form-field"><label>Organisation</label><input type="text" /></div>
            <div className="v4-form-field"><label>Role</label><input type="text" /></div>
            <div className="v4-form-field">
              <label>Staff Headcount</label>
              <select>
                <option>Select range</option>
                <option>1,000 – 5,000</option>
                <option>5,000 – 20,000</option>
                <option>20,000 – 100,000</option>
                <option>100,000+</option>
              </select>
            </div>
            <button className="v4-form-submit"><span>Submit Request</span><span>→</span></button>
          </div>
        </div>
      </div>
    </div>
  )
}
