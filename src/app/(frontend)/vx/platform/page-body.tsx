'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import VxNav from '@/components/vx/VxNav'
import VxFooter from '@/components/vx/VxFooter'

/* eslint-disable @next/next/no-img-element */

// Module index: a flat catalogue (no phase grouping — that's the V25
// homepage's job). Each card links to its detail page. Modules without
// a dedicated page link to the relevant anchor on /vx.
type ModuleEntry = {
  num: string
  title: string
  blurb: string
  href: string
}

const MODULES: ModuleEntry[] = [
  { num: 'M01', title: 'V-Job', blurb: 'Generative competency models authored from any input.', href: '/vx#modules' },
  { num: 'M02', title: 'V-Parse', blurb: 'A thousand CVs an hour into structured talent data.', href: '/vx/module/v-parse' },
  { num: 'M03', title: 'V-Psych', blurb: 'OCEAN-based psychometric assessment with T-score conversion.', href: '/vx/module/v-psych' },
  { num: 'M04', title: 'V-Interview', blurb: 'Structured AI avatar interviews, scored by NLP.', href: '/vx/module/v-interview' },
  { num: 'M05', title: 'V-Fit', blurb: 'Triangulated composite score with full evidence trail.', href: '/vx#triangulate' },
  { num: 'M06', title: 'V-Scenario', blurb: 'Role-specific scenario judgement, multi-dimensional scoring.', href: '/vx/module/v-scenario' },
  { num: 'M07', title: 'V-Onboarding', blurb: 'Ninety-day plans tailored to the hire and the team.', href: '/vx/module/v-onboarding' },
  { num: 'M08', title: 'V-Insights', blurb: 'Group-level workforce visibility and internal mobility.', href: '/vx/module/v-insights' },
]

const PILLARS = [
  { num: '01', title: 'Screening capacity', desc: 'Replace slow manual screening with scalable AI that is faster, cheaper, and consistent across every requisition.' },
  { num: '02', title: 'Decision quality', desc: 'Move from gut feel to the Triangulate Method. Objective, bias-mitigated, and data-driven scoring with an audit trail.' },
  { num: '03', title: 'Scientific rigour', desc: 'Big Five benchmarks and ISO-aligned validation. Not retrofitted retail norms or unvalidated personality tests.' },
  { num: '04', title: 'Automated workflow', desc: 'High-volume, low-value tasks like CV parsing, ranking, and first-round interviews run themselves on your data.' },
  { num: '05', title: 'Closed-loop learning', desc: 'Strategia improves with every hire. Performance data flows back to recalibrate the model for your population.' },
  { num: '06', title: 'Candidate experience', desc: '24/7 flexibility for candidates while generating 100x more screening capacity for your team.' },
]

// Architecture flow: nodes laid out left-to-right with connectors.
// Each node has its own role in the data pipeline.
type FlowNode = {
  id: string
  label: string
  sub: string
  kind: 'input' | 'engine' | 'signal' | 'synthesis' | 'output' | 'loop'
}

const FLOW: FlowNode[] = [
  { id: 'cv', label: 'Inputs', sub: 'CV, JD, ATS req', kind: 'input' },
  { id: 'job', label: 'V-Job', sub: 'Competency spec', kind: 'engine' },
  { id: 'parse', label: 'V-Parse', sub: 'CV signal', kind: 'signal' },
  { id: 'psych', label: 'V-Psych', sub: 'Psych signal', kind: 'signal' },
  { id: 'interview', label: 'V-Interview', sub: 'Interview signal', kind: 'signal' },
  { id: 'scenario', label: 'V-Scenario', sub: 'Judgement signal', kind: 'signal' },
  { id: 'fit', label: 'V-Fit', sub: 'Triangulated score', kind: 'synthesis' },
  { id: 'onboarding', label: 'V-Onboarding', sub: '90-day plan', kind: 'output' },
  { id: 'insights', label: 'V-Insights', sub: 'Performance feedback', kind: 'loop' },
]

const INTEGRATIONS = [
  { name: 'Workday', kind: 'HRIS' },
  { name: 'SAP SuccessFactors', kind: 'HRIS' },
  { name: 'Oracle HCM', kind: 'HRIS' },
  { name: 'BambooHR', kind: 'HRIS' },
  { name: 'Greenhouse', kind: 'ATS' },
  { name: 'Lever', kind: 'ATS' },
  { name: 'iCIMS', kind: 'ATS' },
  { name: 'Ashby', kind: 'ATS' },
  { name: 'Snowflake', kind: 'BI' },
  { name: 'Power BI', kind: 'BI' },
  { name: 'Tableau', kind: 'BI' },
  { name: 'Okta', kind: 'IdP' },
]

const DEPLOYMENT_REGIONS = [
  { code: 'US', region: 'United States', desc: 'Primary commercial enclave. SOC 2 Type II, HIPAA, HITRUST CSF.' },
  { code: 'AU', region: 'Australia', desc: 'IRAP-aligned region for federal and state workforce deployments.' },
  { code: 'SG', region: 'Singapore', desc: 'APAC enclave for cross-border health systems and financial workforces.' },
  { code: 'EU', region: 'European Union', desc: 'GDPR-aligned region with EU data residency and DPA on file.' },
  { code: 'UAE', region: 'United Arab Emirates', desc: 'Gulf enclave for ministry-grade public sector engagements.' },
]

export default function VxPlatformBody() {
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
          <div className="v25-eyebrow">The Platform &middot; Architecture v2.4</div>
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
            One platform. <span className="accent accent--teal">Eight modules.</span>
            <br />
            The hire-and-retain loop, end to end.
          </h1>
          <p className="v25-desc" style={{ maxWidth: '54ch', fontSize: '1.15rem' }}>
            An API-first ecosystem with a single data model underneath every module. Predict performance before it lands. Defend every decision after it does.
          </p>
          <div className="v25-hero-actions" style={{ marginTop: 32 }}>
            <a href="/vx#demo" className="v25-btn-primary">Book a demo</a>
            <a href="#modules" className="v25-link-arrow">
              See the modules<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* SIX PILLARS (light band) */}
      <section className="v25-section v25-section--light">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">Value &middot; Six pillars</div>
          <h2 className="v25-h2">
            Practical. Modular. <span className="accent accent--teal">Engineered to scale.</span>
          </h2>
          <p className="v25-desc" style={{ maxWidth: '60ch' }}>
            Stop relying on spreadsheets, gut feel, and vendor sprawl. Start using data the General Counsel and the CHRO can both defend.
          </p>

          <div className="v25-science-grid" style={{ marginTop: 48 }}>
            {PILLARS.map((p) => (
              <div key={p.num} className="v25-science-stat">
                <div className="v25-science-stat-header">
                  <span className="value">{p.num}</span>
                  <span className="evidence">Pillar</span>
                </div>
                <div className="label">{p.title}</div>
                <div className="sub">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE / DATA FLOW (dark band) */}
      <section className="v25-section" id="architecture">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">Architecture &middot; Data flow</div>
              <h2 className="v25-h2">
                One data model. <span className="accent accent--sky">Every signal connected.</span>
              </h2>
            </div>
            <Link href="/vx/science" className="v25-link-arrow">
              Read the methodology<span aria-hidden="true"> ↗</span>
            </Link>
          </div>
          <p className="v25-desc" style={{ maxWidth: '64ch', marginBottom: 56 }}>
            Every applicant flows through the same pipeline. Inputs become a competency spec. The spec becomes three independent signals. The signals triangulate into one defensible score. Onboarding plans and performance feedback close the loop.
          </p>

          <div className="vx-flow" aria-label="Strategia data flow">
            <div className="vx-flow-rail" aria-hidden="true" />
            <div className="vx-flow-row">
              {FLOW.map((node, i) => (
                <div key={node.id} className={`vx-flow-node vx-flow-node--${node.kind}`}>
                  <div className="vx-flow-node-step">{String(i + 1).padStart(2, '0')}</div>
                  <div className="vx-flow-node-dot" aria-hidden="true" />
                  <div className="vx-flow-node-label">{node.label}</div>
                  <div className="vx-flow-node-sub">{node.sub}</div>
                </div>
              ))}
            </div>
            <div className="vx-flow-loop-meta">
              <span className="vx-flow-loop-arrow" aria-hidden="true">&larr;</span>
              <span>Performance data from V-Insights recalibrates V-Job, V-Parse, V-Psych, and V-Fit for your population. The model improves with every hire.</span>
            </div>
          </div>
        </div>
      </section>

      {/* API-FIRST ECOSYSTEM (light band) */}
      <section className="v25-section v25-section--light" id="api">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">API-first &middot; Ecosystem</div>
              <h2 className="v25-h2">
                Strategia is a system of record. <span className="accent accent--teal">Not a silo.</span>
              </h2>
            </div>
            <Link href="/vx/institutional" className="v25-link-arrow">
              Enterprise posture<span aria-hidden="true"> ↗</span>
            </Link>
          </div>
          <p className="v25-desc" style={{ maxWidth: '64ch' }}>
            Every signal Strategia produces is available over a signed, versioned API. Inbound, we ingest from your ATS and HRIS. Outbound, scores and audit packets flow to your BI stack on the same cadence as the rest of your workforce data.
          </p>

          <div className="vx-integrations" role="list">
            {INTEGRATIONS.map((it) => (
              <div key={it.name} className="vx-integration" role="listitem">
                <span className="vx-integration-kind">{it.kind}</span>
                <span className="vx-integration-name">{it.name}</span>
              </div>
            ))}
          </div>

          <div className="vx-api-claims">
            <div className="vx-api-claim">
              <div className="vx-api-claim-key">Inbound</div>
              <div className="vx-api-claim-value">ATS and HRIS</div>
              <div className="vx-api-claim-sub">Requisitions, applicants, attributes, role taxonomy. Webhooks or scheduled sync.</div>
            </div>
            <div className="vx-api-claim">
              <div className="vx-api-claim-key">Outbound</div>
              <div className="vx-api-claim-value">BI and reporting</div>
              <div className="vx-api-claim-sub">Scores, evidence, decisions, and audit packets exported to your warehouse on a schedule you set.</div>
            </div>
            <div className="vx-api-claim">
              <div className="vx-api-claim-key">Authentication</div>
              <div className="vx-api-claim-value">SAML / OIDC SSO</div>
              <div className="vx-api-claim-sub">Identity-provider passthrough. Signed webhooks. Per-endpoint scopes and rotation.</div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE INDEX (dark, flat catalogue, no phases) */}
      <section className="v25-section" id="modules">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">Module index &middot; 08 V-modules</div>
              <h2 className="v25-h2">
                Every module, <span className="accent accent--teal">addressable on its own.</span>
              </h2>
            </div>
            <Link href="/vx/process" className="v25-link-arrow">
              How they sequence<span aria-hidden="true"> ↗</span>
            </Link>
          </div>
          <p className="v25-desc" style={{ maxWidth: '60ch', marginBottom: 40 }}>
            Adopt the eight modules together or in any subset. Each one runs against the same underlying data model.
          </p>

          <div className="vx-module-index">
            {MODULES.map((mod) => (
              <Link key={mod.num} href={mod.href} className="vx-module-card">
                <div className="vx-module-card-head">
                  <span className="vx-module-card-num">{mod.num}</span>
                  <span className="vx-module-card-arrow" aria-hidden="true">&rarr;</span>
                </div>
                <div className="vx-module-card-title">{mod.title}</div>
                <p className="vx-module-card-blurb">{mod.blurb}</p>
                <div className="vx-module-card-cta">
                  Learn more<span aria-hidden="true"> &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DEPLOYMENT MODEL (light band) */}
      <section className="v25-section v25-section--light" id="deployment">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">Deployment model</div>
          <h2 className="v25-h2">
            Single-tenant. Dedicated VPC. <span className="accent accent--teal">Your jurisdiction, your data.</span>
          </h2>
          <p className="v25-desc" style={{ maxWidth: '64ch' }}>
            Every customer runs on a dedicated virtual private cloud inside the region they select. No shared compute, no shared storage, no cross-tenant inference. Pick your region; your data stays inside it.
          </p>

          <div className="v25-science-grid" style={{ marginTop: 48 }}>
            {DEPLOYMENT_REGIONS.map((r) => (
              <div key={r.code} className="v25-science-stat">
                <div className="v25-science-stat-header">
                  <span className="value">{r.code}</span>
                  <span className="evidence">Region</span>
                </div>
                <div className="label">{r.region}</div>
                <div className="sub">{r.desc}</div>
              </div>
            ))}
          </div>

          <div className="vx-deployment-meta">
            <div>
              <div className="vx-deployment-meta-key">Tenancy</div>
              <div className="vx-deployment-meta-value">Single-tenant by default</div>
            </div>
            <div>
              <div className="vx-deployment-meta-key">Hosting</div>
              <div className="vx-deployment-meta-value">Microsoft Azure, dedicated VPC</div>
            </div>
            <div>
              <div className="vx-deployment-meta-key">Sub-processors</div>
              <div className="vx-deployment-meta-value">None</div>
            </div>
            <div>
              <div className="vx-deployment-meta-key">Retention</div>
              <div className="vx-deployment-meta-value">7-year audit packet</div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="v25-cta-section" id="demo">
        <div className="v25-cta-wrap v25-reveal">
          <div className="v25-cta-bg" aria-hidden="true" />
          <img
            src="/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png"
            alt="Strategia"
            className="v25-cta-logo"
          />
          <h2 className="v25-h2">
            One platform. <span className="accent accent--teal">Every defensible hire.</span>
          </h2>
          <p className="v25-desc">
            See the architecture run on your data. Thirty minutes, your terms, no slides.
          </p>
          <div className="v25-cta-actions">
            <a href="/vx#demo" className="v25-btn-primary">Book a demo</a>
            <Link href="/vx/process" className="v25-link-arrow">
              Talk to us<span aria-hidden="true"> ↗</span>
            </Link>
          </div>
        </div>
      </section>

      <VxFooter />
    </div>
  )
}
