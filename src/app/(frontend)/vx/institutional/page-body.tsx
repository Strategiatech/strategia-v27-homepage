'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import VxNav from '@/components/vx/VxNav'
import VxFooter from '@/components/vx/VxFooter'

/* eslint-disable @next/next/no-img-element */

const SOVEREIGNTY = [
  {
    code: 'US',
    region: 'United States',
    residency: 'East and West paired Azure regions. Replication never crosses the U.S. border.',
    frameworks: 'SOC 2 Type II, HIPAA, HITRUST CSF, EEOC and OFCCP evidence.',
    latency: 'Sub-40ms p95 from any U.S. metro.',
  },
  {
    code: 'AU',
    region: 'Australia',
    residency: 'Sydney and Melbourne Azure regions. Hosted under Australian sovereignty.',
    frameworks: 'IRAP-aligned controls for federal and state workforce deployments.',
    latency: 'Sub-30ms p95 from Sydney, Melbourne, Brisbane.',
  },
  {
    code: 'SG',
    region: 'Singapore',
    residency: 'Singapore Azure region. Optional Hong Kong replica for APAC continuity.',
    frameworks: 'MAS TRM-aligned controls. PDPA processing terms on file.',
    latency: 'Sub-25ms p95 across the ASEAN core.',
  },
  {
    code: 'UAE',
    region: 'United Arab Emirates',
    residency: 'UAE North Azure region. Data stays inside the Gulf.',
    frameworks: 'Ministry-grade public sector engagements. ADGM and DIFC data protection rules respected.',
    latency: 'Sub-20ms p95 from Dubai and Abu Dhabi.',
  },
  {
    code: 'EU',
    region: 'European Union',
    residency: 'Frankfurt and Amsterdam Azure regions. Standard Contractual Clauses and EU DPA on file.',
    frameworks: 'GDPR aligned. ISO 27001 and 27701 framework alignment.',
    latency: 'Sub-25ms p95 across the EU 27.',
  },
]

const TRUST = [
  {
    num: 'T01',
    tag: 'Audit',
    title: 'SOC 2 Type II',
    desc: 'Continuous audit across the five Trust Services Criteria: security, availability, processing integrity, confidentiality, and privacy. Independent annual report available under NDA on request.',
  },
  {
    num: 'T02',
    tag: 'Healthcare',
    title: 'HIPAA',
    desc: 'Operating model aligned with the HIPAA Privacy, Security, and Breach Notification Rules. Business Associate Agreement included in the standard contract. PHI handling restricted to encrypted enclaves with row-level access logging.',
  },
  {
    num: 'T03',
    tag: 'Healthcare',
    title: 'HITRUST CSF',
    desc: 'Controls mapped to the HITRUST Common Security Framework. Annual self-assessment maintained. Path to HITRUST r2 validation available on request for engagements that require it.',
  },
  {
    num: 'T04',
    tag: 'Fair-chance',
    title: 'EEOC and OFCCP',
    desc: 'Every requisition produces an adverse-impact analysis, the four-fifths rule snapshot, and a written rationale per score band. Defensible to a regulator and to the General Counsel on the same day.',
  },
  {
    num: 'T05',
    tag: 'Tenancy',
    title: 'Single tenant',
    desc: 'Customer data is logically isolated in every deployment. Single-tenant enclaves with dedicated compute, dedicated storage, and dedicated keys are available for engagements that require physical isolation as well as logical.',
  },
  {
    num: 'T06',
    tag: 'Residency',
    title: 'In-region data',
    desc: 'Pick a deployment region at contract sign. Storage, processing, backups, and disaster-recovery replicas all stay inside that jurisdiction. The boundary is enforced by network policy, not by promise.',
  },
  {
    num: 'T07',
    tag: 'Identity',
    title: 'SAML and OIDC SSO',
    desc: 'Federated authentication via Azure AD, Okta, Ping, Google Workspace, or any SAML 2.0 or OIDC provider. SCIM provisioning, MFA enforcement, and per-role access scopes ship in the base tier, not an upsell.',
  },
  {
    num: 'T08',
    tag: 'Retention',
    title: 'Audit packet, 7-year retention',
    desc: 'Every hire produces an exportable evidence trail: the spec, the signals, the score, the rationale, and the access log. Retained for seven years per the standard regulatory expectation for employment decisions.',
  },
]

const WHITE_GLOVE = [
  {
    num: '01',
    title: 'Dedicated solutions architect',
    desc: 'A senior engineer on your engagement from kick-off to go-live. Configures competency models, weighting, and ATS handoff against your roles. Stays on through the first 90 days post go-live, not just deployment week.',
  },
  {
    num: '02',
    title: 'Custom ATS integration middleware',
    desc: 'Pre-built connectors for Workday, SuccessFactors, Greenhouse, iCIMS, and Oracle HCM. Where your ATS does not fit a pre-built path, our middleware layer is built to your contract. Signed webhooks, replay, and idempotency in both directions.',
  },
  {
    num: '03',
    title: 'Custom onboarding plan',
    desc: 'You receive a sequenced 90-day plan with named owners, success metrics, and a written go-live gate. Procurement, IT-risk, security review, and clinical or operational stakeholders run in parallel, not in series.',
  },
  {
    num: '04',
    title: 'Sustained engineering ownership',
    desc: 'After go-live, the engagement transitions to a named account engineer plus the same architect for any model recalibration, role-family additions, or audit support. No ticket-queue handoff.',
  },
]

const PACKET = [
  'SOC 2 Type II report (under NDA)',
  'HIPAA risk assessment summary',
  'HITRUST CSF control mapping',
  'Penetration test executive summary',
  'Standard BAA and DPA templates',
  'Sub-processor inventory (Microsoft Azure only)',
  'Data flow and residency diagrams',
  'Insurance certificates and SLA',
]

export default function VxInstitutionalBody() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.v25-reveal')
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="v25 v25--complete">
      <VxNav />

      {/* HERO */}
      <section className="v25-section" style={{ paddingTop: 'clamp(140px, 18vw, 220px)' }}>
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">Enterprise &middot; Security and compliance</div>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Literata", Georgia, serif)',
              fontSize: 'clamp(2.5rem, 6.4vw, 5.6rem)',
              fontWeight: 400,
              lineHeight: 0.98,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 2rem',
              maxWidth: '22ch',
              textWrap: 'balance',
            }}
          >
            Enterprise infrastructure. <span className="accent accent--lime">Zero compromise.</span>
          </h1>
          <p className="v25-desc" style={{ maxWidth: '54ch', fontSize: '1.15rem' }}>
            Deploy to the most regulated workforces in the country. Engineered for the General Counsel and the CISO, not just the CHRO.
          </p>
          <div className="v25-hero-actions" style={{ marginTop: 32 }}>
            <a href="#trust" className="v25-btn-outline">Trust posture</a>
            <a href="#sovereignty" className="v25-link-arrow">
              Data sovereignty<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <section className="v25-stats v25-section--light v25-reveal">
        <div className="v25-stats-grid">
          <div className="v25-stat-card">
            <div className="v25-stat-value">5</div>
            <div className="v25-stat-label">Sovereign regions</div>
            <div className="v25-stat-sub">US, AU, SG, UAE, EU</div>
          </div>
          <div className="v25-stat-card">
            <div className="v25-stat-value">0</div>
            <div className="v25-stat-label">Sub-processors</div>
            <div className="v25-stat-sub">Microsoft Azure only</div>
          </div>
          <div className="v25-stat-card">
            <div className="v25-stat-value">7yr</div>
            <div className="v25-stat-label">Audit packet retention</div>
            <div className="v25-stat-sub">Score, evidence, rationale</div>
          </div>
        </div>
      </section>

      {/* DATA SOVEREIGNTY */}
      <section className="v25-section" id="sovereignty">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">Data sovereignty</div>
              <h2 className="v25-h2">
                For regulated workforces, data location is not a preference. <span className="accent accent--sky">It is a law.</span>
              </h2>
            </div>
            <a href="#trust" className="v25-link-arrow">
              Trust posture<span aria-hidden="true"> ↗</span>
            </a>
          </div>
          <p className="v25-desc" style={{ maxWidth: '62ch', marginBottom: 48 }}>
            Pick a deployment region at contract sign. Storage, processing, backups, and disaster-recovery replicas all stay inside that jurisdiction. Single-tenant options are available for engagements that need physical isolation as well as logical.
          </p>

          <div className="v25-solutions-grid">
            {SOVEREIGNTY.map((s) => (
              <div key={s.code} className="v25-solution-card">
                <div className="v25-solution-role">{s.code} &middot; Sovereign region</div>
                <div className="v25-solution-title">{s.region}</div>
                <p className="v25-solution-body" style={{ marginTop: 12 }}>
                  <span style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 500 }}>Residency. </span>
                  {s.residency}
                </p>
                <p className="v25-solution-body" style={{ marginTop: 10 }}>
                  <span style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 500 }}>Frameworks. </span>
                  {s.frameworks}
                </p>
                <p className="v25-solution-body" style={{ marginTop: 10 }}>
                  <span style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 500 }}>Latency. </span>
                  {s.latency}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST POSTURE */}
      <section className="v25-section" id="trust">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">Trust posture</div>
              <h2 className="v25-h2">
                Eight controls. <span className="accent accent--lime">Real depth on every one.</span>
              </h2>
            </div>
            <a href="#trust-packet" className="v25-link-arrow">
              Request the packet<span aria-hidden="true"> ↗</span>
            </a>
          </div>
          <p className="v25-desc" style={{ maxWidth: '62ch', marginBottom: 32 }}>
            Procurement and IT-risk teams should not have to read between the lines. Here is what each badge actually means in practice.
          </p>

          <div className="v25-modules-phased" style={{ marginTop: 24 }}>
            <div className="v25-module-phase">
              <div className="v25-module-phase-header">
                <span className="v25-module-phase-step">Posture</span>
                <span className="v25-module-phase-name">Compliance</span>
                <p className="v25-module-phase-desc">The eight surfaces a General Counsel, a CISO, or a CFO will ask Strategia about during procurement and audit.</p>
              </div>
              <div className="v25-module-phase-cards">
                {TRUST.map((t) => (
                  <div key={t.num} className="v25-module">
                    <div className="v25-module-header">
                      <span className="v25-module-num">{t.num}</span>
                      <span className="v25-module-tag">{t.tag}</span>
                    </div>
                    <div className="v25-module-title">{t.title}</div>
                    <p className="v25-module-desc">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHITE-GLOVE IMPLEMENTATION */}
      <section className="v25-section v25-section--light">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">White-glove implementation</div>
          <h2 className="v25-h2">
            We do not hand you a login. <span className="accent accent--teal">We engineer the outcome.</span>
          </h2>
          <p className="v25-desc" style={{ maxWidth: '60ch' }}>
            Every engagement runs against a sequenced plan with named owners, success metrics, and a written go-live gate. Implementation is the product.
          </p>

          <div className="v25-science-grid" style={{ marginTop: 48 }}>
            {WHITE_GLOVE.map((w) => (
              <div key={w.num} className="v25-science-stat">
                <div className="v25-science-stat-header">
                  <span className="value">{w.num}</span>
                  <span className="evidence">Step</span>
                </div>
                <div className="label">{w.title}</div>
                <div className="sub">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NO SUB-PROCESSORS */}
      <section className="v25-section" id="no-subprocessors">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">Vendor surface</div>
              <h2 className="v25-h2">
                Zero sub-processors. <span className="accent accent--teal">One vendor to vet.</span>
              </h2>
            </div>
            <a href="#trust-packet" className="v25-link-arrow">
              Get the inventory<span aria-hidden="true"> ↗</span>
            </a>
          </div>
          <p className="v25-desc" style={{ maxWidth: '64ch' }}>
            Strategia runs the entire platform on Microsoft Azure. No third-party AI vendors. No third-party data warehouses. No third-party background-check providers in the processing path. Your procurement team vets one supply chain, not ten.
          </p>

          <div className="v25-science-grid" style={{ marginTop: 48 }}>
            <div className="v25-science-stat">
              <div className="v25-science-stat-header">
                <span className="value">01</span>
                <span className="evidence">Hosting</span>
              </div>
              <div className="label">Microsoft Azure only</div>
              <div className="sub">Compute, storage, identity, networking, and AI inference all run inside one Microsoft tenant. Your data never leaves Azure for processing.</div>
            </div>
            <div className="v25-science-stat">
              <div className="v25-science-stat-header">
                <span className="value">02</span>
                <span className="evidence">AI</span>
              </div>
              <div className="label">In-tenant model inference</div>
              <div className="sub">Language models run inside the Azure tenant under enterprise data-protection terms. Prompts and completions are not used to train shared models.</div>
            </div>
            <div className="v25-science-stat">
              <div className="v25-science-stat-header">
                <span className="value">03</span>
                <span className="evidence">Risk</span>
              </div>
              <div className="label">One supply chain to vet</div>
              <div className="sub">Your TPRM team reviews Microsoft, not a chain of sub-processors. Fewer review cycles, fewer surprises at renewal, faster procurement.</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST PACKET */}
      <section className="v25-section v25-section--light" id="trust-packet">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-enterprise-wrap">
            <div className="v25-enterprise-bg" aria-hidden="true" />
            <div className="v25-enterprise-content">
              <div>
                <div className="v25-eyebrow">The trust packet</div>
                <h2 className="v25-h2">
                  Everything your procurement team <span className="accent accent--teal">needs to sign.</span>
                </h2>
                <p className="v25-desc" style={{ marginTop: 24 }}>
                  Request the full evidence packet. Under NDA, delivered same-week. Everything below ships together, not in a drip of follow-up emails.
                </p>
                <div className="v25-hero-actions" style={{ marginTop: 32 }}>
                  <a href="/vx#demo" className="v25-btn-solid">Request the trust packet</a>
                  <Link href="/vx/process" className="v25-link-arrow">
                    Deployment process<span aria-hidden="true"> ↗</span>
                  </Link>
                </div>
              </div>
              <div className="v25-badges-grid">
                {PACKET.map((b) => (
                  <div key={b} className="v25-badge-item">
                    <span className="v25-badge-check" aria-hidden="true">&#10003;</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="v25-cta-section">
        <div className="v25-cta-wrap v25-reveal">
          <div className="v25-cta-bg" aria-hidden="true" />
          <img
            src="/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png"
            alt="Strategia"
            className="v25-cta-logo"
          />
          <h2 className="v25-h2">
            Deploy to the workforce that <span className="accent accent--teal">cannot afford a miss.</span>
          </h2>
          <p className="v25-desc">
            Talk to a solutions architect. We will route the right legal, security, and engineering contacts into the first call.
          </p>
          <div className="v25-cta-actions">
            <a href="/vx#demo" className="v25-btn-primary">Book a demo</a>
            <Link href="/vx/process" className="v25-link-arrow">
              Deployment process<span aria-hidden="true"> ↗</span>
            </Link>
          </div>
        </div>
      </section>

      <VxFooter />
    </div>
  )
}
