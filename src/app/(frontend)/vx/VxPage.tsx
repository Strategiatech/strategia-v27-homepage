'use client'

import { type ChangeEvent, type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react'
import { initTetrahedron } from '../v25/tetrahedron'
import VxNav from '@/components/vx/VxNav'
import VxFooter from '@/components/vx/VxFooter'
import VxVideoCarousel from '@/components/vx/VxVideoCarousel'
import { assetPath } from '@/lib/sitePath'
import '../v25/v25.css'
import './vx-overrides.css'

/* eslint-disable @next/next/no-img-element */

/* ============================================================================
   VxPage — homepage for /vx, forked from V25Page so V25 stays untouched.
   Section order matches the client's 20260518 website re-write deck.
   ============================================================================ */

type PhaseName = 'Foundation' | 'Screen' | 'Assess' | 'Decide' | 'Assess+' | 'Operate'

type Module = { num: string; tag: PhaseName; title: string; desc: string }
type DemoFormState = { name: string; email: string; company: string; message: string }

const DEMO_FORM_INITIAL: DemoFormState = { name: '', email: '', company: '', message: '' }

const MODULES: Module[] = [
  { num: 'M01', tag: 'Foundation', title: 'V-Job',
    desc: 'Every job description, rebuilt into a world-class specification in your voice. Engineered to attract the right people, and the foundation every downstream signal measures against.' },
  { num: 'M02', tag: 'Screen', title: 'V-Parse',
    desc: 'Every resume read in full, every applicant scored against the same specification. 1,000 in under 25 minutes, trained to your role family. Consistent assessments at scale. The right candidates surface; none lost to volume.' },
  { num: 'M03', tag: 'Assess', title: 'V-Psych',
    desc: 'Under 10 minute proprietary OCEAN-based assessment. Built with organisational psychologists, calibrated to your sector, performance prediction to the specific role.' },
  { num: 'M04', tag: 'Assess', title: 'V-Interview',
    desc: 'STAR-method AI-avatar interviews, on-demand, any language. Questions drawn from the role, the resume, the psych profile. Recorded, transcribed, structured NLP scoring; the same interviewer for every candidate.' },
  { num: 'M05', tag: 'Decide', title: 'V-Fit',
    desc: 'Triangulates V-Parse, V-Psych and V-Interview, three signals combined in a single composite rank. Configurable weightings per role family. Every shortlist position defensible, with the evidence trail behind it.' },
  { num: 'M06', tag: 'Assess+', title: 'V-Scenario',
    desc: 'Interactive role-specific scenarios that test how candidates decide under pressure: the calls that matter most in your sector and role. The judgement you only see on the job, surfaced before the hire.' },
  { num: 'M07', tag: 'Assess+', title: 'V-RefCheck',
    desc: 'Automated reference checking at scale. Structured questionnaires to every referee, synthesised into a comparable reference signal for every candidate. The reference check that does not get skipped, does not get phoned in.' },
  { num: 'M08', tag: 'Operate', title: 'V-Onboarding',
    desc: 'A personalised 0 to 90 day plan, drawn from everything the platform learned during the process (resume, psychometric, interview). The data that landed the hire keeps working, setting them up for success.' },
  { num: 'M09', tag: 'Operate', title: 'V-Insights',
    desc: 'All module data converges here: a Group-level real time dashboard of your assessed talent pool. Patterns surface before they become crises. Every new opening shortlists from the same pool, re-ranked.' },
]

const PHASES: { step: string; name: PhaseName; desc: string }[] = [
  { step: '01', name: 'Foundation', desc: 'Get the job description right.' },
  { step: '02', name: 'Screen', desc: 'Process every resume properly.' },
  { step: '03', name: 'Assess', desc: 'How they think. How they answer.' },
  { step: '04', name: 'Decide', desc: 'From signals to shortlist.' },
  { step: 'Premium', name: 'Assess+', desc: 'What they do. What others say.' },
  { step: '05', name: 'Operate', desc: 'Onboard, observe, recalibrate.' },
]

const INDUSTRIES: { tag: string; body: string }[] = [
  {
    tag: 'Healthcare',
    body: 'Patient outcomes depend on the people delivering care. Strategia turns clinical hiring into a defensible, evidence-led process across nursing, allied health, medical, and executive layers.',
  },
  {
    tag: 'Finance',
    body: 'Trading floors, treasury teams, and risk functions live and die on judgement under pressure. Strategia brings psychometric and behavioural rigour to the people who move capital.',
  },
  {
    tag: 'Mining',
    body: 'Remote operations, safety-critical roles, FIFO workforces. Strategia surfaces the operators whose temperament and capability hold up where the cost of error is highest.',
  },
  {
    tag: 'Maritime',
    body: 'Crews live and work in confined, high-stakes environments for months at a time. Strategia assesses the temperament, resilience, and team fit that separate a functional ship from a fragile one.',
  },
  {
    tag: 'Hospitality',
    body: 'Service consistency, guest experience, and brand reputation rest entirely on the people in uniform. Strategia industrialises front-line and leadership hiring at the speed hospitality demands.',
  },
  {
    tag: 'Aviation',
    body: 'Cockpit, cabin, and ground crew operate inside the most regulated workforce environment on earth. Strategia brings evidence-led assessment to the appointments that hold safety, compliance, and brand together.',
  },
]

function IndustrySwitcher({ items }: { items: { tag: string; body: string }[] }) {
  const [i, setI] = useState(0)
  return (
    <div className="vx-industries-switcher">
      <div className="vx-industries-tabs" role="tablist" aria-label="Industries">
        {items.map((it, idx) => (
          <button
            key={it.tag}
            role="tab"
            type="button"
            aria-selected={idx === i}
            className={`vx-industries-tab${idx === i ? ' is-active' : ''}`}
            onClick={() => setI(idx)}
          >
            {it.tag}
          </button>
        ))}
        <div
          className="vx-industries-underline"
          style={{ ['--idx' as string]: i, ['--total' as string]: items.length } as React.CSSProperties}
          aria-hidden="true"
        />
      </div>
      <div className="vx-industries-panel" key={i}>
        <div className="vx-industries-panel-tag">{items[i].tag}</div>
        <p>{items[i].body}</p>
      </div>
    </div>
  )
}

function ModuleJourney({ modules, phases }: { modules: Module[]; phases: typeof PHASES }) {
  const [activeTitle, setActiveTitle] = useState(modules[0]?.title ?? '')
  const [activePhaseName, setActivePhaseName] = useState<PhaseName | null>(null)
  const fallbackModule = modules[0]
  if (!fallbackModule) return null
  const activeModule = modules.find((m) => m.title === activeTitle) ?? fallbackModule
  const phaseModules = activePhaseName
    ? modules.filter((m) => m.tag === activePhaseName)
    : []
  const visibleModules = phaseModules.length ? phaseModules : [activeModule]

  return (
    <div className="vx-module-journey">
      <div className="vx-module-selector" aria-label="Pillar 1 modules">
        {modules.map((mod) => {
          const isActive = activePhaseName
            ? mod.tag === activePhaseName
            : mod.title === activeModule.title

          return (
            <button
              key={mod.title}
              type="button"
              className={`vx-module-selector-item${isActive ? ' is-active' : ''}`}
              onClick={() => {
                setActivePhaseName(null)
                setActiveTitle(mod.title)
              }}
              aria-pressed={isActive}
            >
              <span>{mod.num}</span>
              {mod.title}
            </button>
          )
        })}
      </div>

      <aside className="vx-module-journey-rail" aria-label="Pillar 1 acquisition phases">
        <div className="vx-module-journey-kicker">Pillar 01 · Acquire</div>
        <h3>From open role to defensible shortlist.</h3>
        <p>
          Nine modules turn every open role into a defensible hire. Three independent
          signals triangulated; every decision evidence-led from the job description to the
          first 90 days.
        </p>
        <div className="vx-module-phase-rail">
          {phases.map((phase) => {
            const phaseModules = modules.filter((m) => m.tag === phase.name)
            const isActive = activePhaseName
              ? activePhaseName === phase.name
              : activeModule.tag === phase.name
            return (
              <button
                key={phase.name}
                type="button"
                className={`vx-module-phase-pill${isActive ? ' is-active' : ''}`}
                onClick={() => {
                  if (!phaseModules.length) return
                  setActivePhaseName(phase.name)
                  setActiveTitle(phaseModules[0].title)
                }}
                aria-pressed={isActive}
              >
                <span>{phase.step === 'Premium' ? 'Premium' : `Phase ${phase.step}`}</span>
                <strong>{phase.name}</strong>
              </button>
            )
          })}
        </div>
      </aside>

      <div className={`vx-module-journey-stage${visibleModules.length > 1 ? ' vx-module-journey-stage--multi' : ''}`}>
        {visibleModules.map((module) => {
          const modulePhase = phases.find((p) => p.name === module.tag)

          return (
            <article key={module.title} className="vx-module-spotlight">
              <div className="vx-module-spotlight-meta">
                <span>{module.num}</span>
                <span>{module.tag}</span>
              </div>
              <h3>{module.title}</h3>
              <p>{module.desc}</p>
              {modulePhase && (
                <div className="vx-module-spotlight-foot">
                  <span>{modulePhase.step === 'Premium' ? 'Premium layer' : `Phase ${modulePhase.step}`}</span>
                  <strong>{modulePhase.desc}</strong>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}

const PILLARS = [
  {
    num: 'Pillar 01',
    title: 'Acquire',
    italic: 'Bring the right people in.',
    body: 'Nine modules turn every open role into a defensible hire. Three independent signals triangulated, every decision evidence-led, from the open job description to the first 90 days.',
    foot: 'V-Job · V-Parse · V-Psych · V-Interview · V-Fit · V-Scenario · V-RefCheck · V-Onboarding · V-Insights · culminating in V-Agent.',
  },
  {
    num: 'Pillar 02',
    title: 'Elevate',
    italic: 'Develop the workforce you have.',
    body: 'Workforce intelligence for the people already on your payroll. Surface tomorrow’s leaders, map the skills gaps, catch attrition risk before it walks.',
    foot: 'V-Scan · V-Culture · V-Leadership, plus wellbeing, succession, skills mapping.',
  },
  {
    num: 'Pillar 03',
    title: 'Empower',
    italic: 'Dignified departure. Brand intact.',
    body: 'Departing employees leave with what they need: verified CV, psychometric profile, references, recommendations. The exit interview feeds the platform; your brand walks out with them.',
    foot: 'V-Outplacement · exit passport · references · exit intelligence.',
  },
]

const SOLUTIONS = [
  {
    id: 'solution-hospital-ceo',
    role: 'Chief Executive Officer',
    title: 'Hospital CEO',
    quote: 'Will the workforce delivering my margins today still be here in twelve months?',
    body: 'Workforce intelligence at the level your strategy operates on, not the level your HRIS reports on. Service-line risk, retention forecasts, and capital implications in one weekly brief.',
  },
  {
    id: 'solution-chro',
    role: 'Chief Human Resources Officer',
    title: 'CHRO',
    quote: 'How do I make every hire defensible, both to the board, GC, and the regulator?',
    body: 'Replace binders, disparate vendors, and gut-feel reviews with a single instrument that produces an audit packet for every requisition.',
  },
  {
    id: 'solution-talent-acquisition',
    role: 'VP Talent · Recruiting Lead',
    title: 'Talent Acquisition',
    quote: 'How do my recruiters working on 70 vacancies stop drowning and start operating?',
    body: 'Interview 150 of 200 applicants, not 4. Recruiters do the relationships; the engine does the synthesis.',
  },
  {
    id: 'solution-clinical-operations',
    role: 'CMO · CNO · Service-line Chief',
    title: 'Clinical Operations',
    quote: "How do I staff the floor without burning out the team I've got?",
    body: 'Match clinicians to roles where their cognitive, behavioural, and clinical-competence profile predicts they will perform, and stay.',
  },
]

const DEPLOYMENT = [
  {
    phase: 'Phase 01',
    weeks: 'Weeks 1 to 2',
    title: 'Calibration',
    desc: 'Your role families mapped. Your existing job descriptions rebuilt into world-class specifications in your voice. The foundation every downstream signal will measure against.',
  },
  {
    phase: 'Phase 02',
    weeks: 'Weeks 3 to 6',
    title: 'Configuration',
    desc: 'The platform configured to your environment. API integration with your ATS, HRIS, and CRM, SSO setup, security review, single-tenant build if required, regional data residency. Your stack stays; the intelligence layer plugs in.',
  },
  {
    phase: 'Phase 03',
    weeks: 'Weeks 7 to 8',
    title: 'Pilot',
    desc: 'First triangulated pipeline goes live on a target role family. Real resumes, real assessments, real shortlists, your team in the loop on every weighting decision.',
  },
  {
    phase: 'Phase 04',
    weeks: 'Weeks 9 to 11',
    title: 'Scale',
    desc: 'Roll out across remaining role families. Recruiters trained on V-Insights. First hires made through the platform, onboarding personalised by V-Onboarding from day one.',
  },
  {
    phase: 'Phase 05',
    weeks: 'Week 12+',
    title: 'Compound',
    desc: 'Every hire, every assessment, every interview makes the retained pipeline smarter. V-Insights surfaces patterns across the workforce. The system gets more valuable every month. V-Agent activation.',
  },
]

const COMPARISON: { factor: string; legacy: string; agency: string; strategia: string }[] = [
  {
    factor: 'Speed & Scale',
    legacy: 'Slow, manual, inconsistent.',
    agency: 'Fast but costly, uneven quality.',
    strategia: '1,000 resumes in under 25 minutes. 24/7 interviews. Consistent at any scale.',
  },
  {
    factor: 'Decision Quality',
    legacy: 'Gut feel, keyword-driven.',
    agency: 'Subjective, low transparency.',
    strategia: 'Triangulate Method, three independent signals, one structured ranking.',
  },
  {
    factor: 'Scientific Rigour',
    legacy: 'Generic, unvalidated tests.',
    agency: 'Recruiter judgement, ad hoc.',
    strategia: 'Big Five + STAR method. Built on validated psychometric and behavioural science.',
  },
  {
    factor: 'Workforce Impact',
    legacy: 'Stops at hire.',
    agency: 'Limited to placement only.',
    strategia: 'Extends to onboarding and real-time workforce intelligence.',
  },
  {
    factor: 'Data & Intelligence',
    legacy: 'One-off, no learning.',
    agency: 'Minimal reporting.',
    strategia: 'Real-time dashboard. Patterns surface before they become crises.',
  },
  {
    factor: 'Candidate Experience',
    legacy: 'Delays, poor comms.',
    agency: 'Agency brand dominates.',
    strategia: 'Consistent assessments for every candidate. Self-paced. No ghosting.',
  },
  {
    factor: 'Cost Trajectory',
    legacy: 'Flat or rising with volume.',
    agency: 'Rising with every hire.',
    strategia: 'Declining toward zero as V-Agent matures.',
  },
]

const BADGES = [
  'Azure-hosted',
  'SOC 2 Type II aligned',
  'ISO 27001',
  'GDPR aligned',
  'Single tenant',
  'Regional data residency',
  'SAML / OIDC SSO',
  'DPA / Regional',
]

const FAQS = [
  {
    q: 'What about data security?',
    a: [
      'Strategia is partnered with Microsoft and built on their enterprise cloud, inheriting the security architecture Microsoft enforces across the stack. The platform is SOC 2 Type II aligned, built on GDPR principles, and supports ISO 27001 controls, regional data residency, and single-tenant deployment where required.',
      'Beyond infrastructure, candidate Personal Identification Information (PII) is segregated during the triangulation process and re-attached only when a candidate moves to in-person interview. The platform’s decision-making sits behind privacy by design.',
    ],
  },
  {
    q: 'How do you handle bias in the platform?',
    a: [
      'Bias enters most hiring platforms in one of two places: through the training data the model was built on, or through the human reviewing a candidate’s name, gender, age, or background while making the call. Strategia is designed to address both.',
      'The platform is calibrated against role-specific frameworks built on validated psychometric and behavioural science. During triangulation (the screening, assessment, and ranking phase) all Personal Identification Information is stripped from the candidate record. The platform sees the signals, not the person. PII is re-attached only when a candidate progresses to in-person interview, where human judgement rightly takes over. The result: the strongest role-relevant signals surface to the top, not the most familiar names.',
    ],
  },
  {
    q: 'Does Strategia replace our existing ATS, HRIS, or CRM?',
    a: [
      'No. Strategia is an intelligence layer that sits on top of the systems you have already invested in.',
      'Connection happens via secure APIs to your existing ATS, HRIS, and CRM. Your team plugs in; they do not rebuild. The systems you have spent years configuring keep their jobs. Strategia adds the workforce intelligence layer that turns the data inside them into evidence-led decisions.',
      'If a system you depend on does not have a native integration ready on day one, we build it.',
    ],
  },
  {
    q: 'What happens to our recruiters, will the platform replace them?',
    a: [
      'The work changes, but the recruiters do not.',
      'Strategia automates the parts of recruitment that should not be human: screening 1,000 resumes in under 25 minutes, running structured AI-avatar interviews around the clock, triangulating signals into a defensible ranking. Your team is freed from the volume work, and freed up for the parts of recruitment that can only be human: shortlist nuance, senior candidate relationships, internal alignment, candidate care.',
      'In practice, internal recruiters become more strategic, not less needed. The platform now handles the work that burns them out.',
    ],
  },
  {
    q: 'How long does deployment take?',
    a: [
      'Twelve weeks from contract to your first live triangulated hiring pipeline.',
      'Calibration in Weeks 1 to 2: your role families mapped, your existing job descriptions rebuilt into world-class specifications.',
      'Configuration in Weeks 3 to 6: API integration with your stack, SSO setup, security review, single-tenant build if required.',
      'Pilot in Weeks 7 to 8: the first triangulated pipeline goes live on a target role family.',
      'Scale in Weeks 9 to 11: roll out across remaining role families.',
      'Compound from Week 12: V-Insights surfaces patterns, V-Agent activates.',
      'The output of every step is auditable, exportable, and yours.',
    ],
  },
  {
    q: 'Will candidates engage with AI-led assessments and interviews?',
    a: [
      'Yes, and often more readily than recruiters expect.',
      'Candidates running through Strategia get a fair, self-paced, consistent experience. They are not held in agency limbo.',
      'The AI-avatar interview format reduces interviewer bias, scheduling friction, and time-zone constraints. STAR-method questions are drawn from the role, the resume, and the psych profile, so candidates engage with scenarios that actually relate to the job.',
      'The alternative is the one candidates increasingly resent: being judged on whether their CV happens to be the first one a recruiter sees on a busy Monday morning. Strategia replaces that with consistency.',
    ],
  },
  {
    q: 'What evidence do you have that the platform works?',
    a: [
      'Three supporting evidence layers.',
      'The science: every signal Strategia produces comes from peer-reviewed methodology, Big Five (OCEAN), STAR-method behavioural interviewing, and triangulation across independent signals. The frameworks have decades of meta-analytic support outperforming any single-source assessment.',
      'Deployed system benchmarks: across systems running Strategia, the median internal recruitment workload now automated sits at 80%. A thousand resumes processed in under 25 minutes. The same fair assessment for every candidate.',
      'Client outcomes: available under NDA in commercial conversations. We can share the scope and methodology of the case study most relevant to your sector.',
    ],
  },
  {
    q: 'When does V-Agent activate, and what does the journey actually look like?',
    a: [
      'V-Agent activates in Week 12 as part of the Compound phase of deployment. From that point it operates across your assessed talent pool around the clock, searching, reaching out, interviewing, and shortlisting on your behalf.',
      'Every candidate Strategia processes, hired or not, enriches the intelligence layer underneath. Past applicants are re-engaged, and internal talent is surfaced by V-Scan. Yesterday’s near-misses are brought back into the frame today. The deeper the pool, the sharper V-Agent operates.',
      'The end state: an internal recruitment engine you built by being on the platform, with recruitment fees that decline toward zero as V-Agent matures.',
    ],
  },
  {
    q: 'How do you stay ahead of emerging AI regulation?',
    a: [
      'The regulatory direction is clear: more transparency on automated decision-making, more candidate rights, more scrutiny under equal-opportunity frameworks. The EU AI Act, state-level US legislation, and tightening enforcement of existing law all push the same way.',
      'Strategia is built for that direction rather than against it. Every signal carries an evidence trail. Every ranking is explainable to the candidate, the regulator, and the General Counsel. PII handling is privacy-by-design. The frameworks behind the platform are peer-reviewed and disclosable, and Microsoft’s regulatory posture is inherited across the stack.',
      'We track regulation by jurisdiction, and the platform is engineered to be configurable to local requirements, not retrofitted to them after a regulator asks.',
    ],
  },
  {
    q: 'Could we just build this platform ourselves?',
    a: [
      'Technically, anyone with the right team, capital, and time can build a workforce intelligence platform. The real question is whether it is worth building rather than buying.',
      'Three things make Strategia hard to replicate even if you started today.',
      'Calibrated frameworks: V-Psych, V-Interview, V-Scenario, and V-RefCheck each carry validated psychometric and behavioural science built with organisational psychologists. Replicating that takes years, not months.',
      'Compounding data: every hire feeds the platform’s intelligence layer. Each subsequent decision is sharper than the last because there are more signals to triangulate against. A platform built from scratch starts at zero and stays there for a long time.',
      'The Microsoft partnership: Azure hosting and a Microsoft-aligned commercial path support procurement, security, compliance, and Marketplace readiness from day one. Building those in-house consumes IT capacity that most organisations have already allocated elsewhere.',
      'Build versus buy is a real decision. We are happy to help you scope what an in-house equivalent would cost. We would rather give you the maths than the sales pitch.',
    ],
  },
]

type VxPageProps = {
  /* Replace default <VxNav /> — used by /v27 snapshot to ship a nav
     with no /vx/* subpage links. */
  navSlot?: ReactNode
  /* Replace default <VxFooter /> — used by /v27 snapshot to ship a
     footer with no /vx/* subpage links. */
  footerSlot?: ReactNode
  /* When true, suppress the inline anchor links that point at /vx/*
     subpages (Platform "All modules", Science "Read the research" /
     "Methodology", CTA "Book a demo" / "Our process"). Headings,
     descriptions and visual layout stay; only the outbound links go
     away so the page is "just the homepage". */
  selfContained?: boolean
  /* Used by /v27 so first-scroll input moves the page immediately instead
     of completing the legacy pinned hero sequence. */
  disableHeroScrollLock?: boolean
}

export default function VxPage({
  navSlot,
  footerSlot,
  selfContained = false,
  disableHeroScrollLock = false,
}: VxPageProps = {}) {
  const navRef = useRef<HTMLElement>(null)

  // ROI calculator (three inputs per slide 14).
  // Defaults sit at realistic mid-market values; the formula combines
  // recruiter-labour savings on cost-per-hire with the regrettable-hire
  // reduction (PDF caveat: ~70% labour automation, regrettable hire cost =
  // 30% of first-year salary). Assumes a 12% baseline regrettable-hire rate
  // (industry-typical) reduced by 35% by triangulated assessment.
  const [annualHires, setAnnualHires] = useState(300)
  const [loadedSalary, setLoadedSalary] = useState(95000)
  const [costPerHire, setCostPerHire] = useState(5500)

  const recruiterLabourSavings = annualHires * costPerHire * 0.70
  const regrettableRate = 0.12
  const regrettableReduction = 0.35
  const regrettableSavings =
    annualHires * regrettableRate * regrettableReduction * loadedSalary * 0.30

  const projectedSavings = recruiterLabourSavings + regrettableSavings
  const savingsDisplay =
    projectedSavings >= 1_000_000
      ? (projectedSavings / 1_000_000).toFixed(2) + 'm'
      : Math.round(projectedSavings / 1_000) + 'K'

  const [complete, setComplete] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [demoForm, setDemoForm] = useState<DemoFormState>(DEMO_FORM_INITIAL)
  const [demoSubmitted, setDemoSubmitted] = useState(false)

  const updateDemoForm =
    (field: keyof DemoFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDemoForm((current) => ({ ...current, [field]: event.target.value }))
    }

  const handleDemoSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDemoSubmitted(true)
  }

  useEffect(() => {
    const cleanup = initTetrahedron({ releaseHeroOnComplete: !disableHeroScrollLock })
    return cleanup
  }, [disableHeroScrollLock])

  useEffect(() => {
    const handler = () => setComplete(true)
    window.addEventListener('v25:complete', handler)
    return () => window.removeEventListener('v25:complete', handler)
  }, [])

  useEffect(() => {
    const _nav = navRef.current
    if (!_nav) return
    const nav: HTMLElement = _nav
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  const rootClassName = [
    'v25',
    selfContained ? 'vx-self-contained' : '',
    complete ? 'v25--complete' : '',
    disableHeroScrollLock ? 'vx-no-hero-scroll-lock' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={rootClassName}>
      <div className="v25-pulse-overlay" id="v25PulseOverlay" aria-hidden="true" />

      {navSlot ?? <VxNav />}

      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="v25-hero">
        <div className="v25-cursor-aura" id="v25CursorAura" aria-hidden="true" />
        <div className="v25-plasma-layer" id="v25PlasmaLayer" aria-hidden="true" />

        <div className="v25-hero-copy">
          <h1>
            AI Driven<br />Workforce<br />
            <span className="accent accent--sky">Intelligence</span>
          </h1>
          <div className="vx-hero-lines" aria-label="Platform proposition">
            <p>Predict performance before it lands.</p>
            <p>Build the engine that finds the next one.</p>
          </div>
          <p>
            A multi-module workforce intelligence platform built on structured scientific
            frameworks, automating 80% of the recruitment lifecycle - and compounding every
            hire into the internal engine that finds the next one.
          </p>
          {!selfContained && (
            <p className="vx-hero-sub">
              For HR, Talent, and Executive teams making better, faster, more defensible
              decisions at scale, and compounding every hire into the internal engine that
              finds the next one.
            </p>
          )}
          <div className="v25-hero-actions">
            <a href="#demo" className="v25-btn-primary">Book a demo</a>
            <a href="#modules" className="v25-link-arrow">
              Explore the platform<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>

        <div className="v25-tetra-stage" id="v25Stage">
          <svg id="v25Tetra" viewBox="-110 -110 220 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <radialGradient id="v25CoreGlow" cx="50%" cy="50%" r="50%">
                <stop id="v25GlowStop0" offset="0%" stopColor="var(--glow-color)" stopOpacity="0.55" />
                <stop id="v25GlowStop1" offset="40%" stopColor="var(--glow-color)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="var(--glow-color)" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="v25PulseGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--glow-color)" stopOpacity="0" />
                <stop offset="55%" stopColor="var(--glow-color)" stopOpacity="0.55" />
                <stop offset="78%" stopColor="var(--glow-color)" stopOpacity="0.30" />
                <stop offset="100%" stopColor="var(--glow-color)" stopOpacity="0" />
              </radialGradient>
              <filter id="v25GlowBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <filter id="v25PulseBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" />
              </filter>
            </defs>
            <g id="v25Pulses" />
            <circle id="v25Glow" cx="0" cy="0" r="60" fill="url(#v25CoreGlow)" filter="url(#v25GlowBlur)" />
            <g id="v25Edges" />
          </svg>

          <div className="v25-brand-lockup" id="v25BrandLockup" aria-hidden="true">
            <img src={assetPath('/images/brand/strategia-wordmark-white.svg')} alt="Strategia" />
          </div>

          <div className="vx-hero-signal-layer" aria-hidden="true">
            <span className="vx-hero-signal-node vx-hero-signal-node--parse" />
            <span className="vx-hero-signal-node vx-hero-signal-node--psych" />
            <span className="vx-hero-signal-node vx-hero-signal-node--interview" />
            <span className="vx-hero-signal-line vx-hero-signal-line--parse" />
            <span className="vx-hero-signal-line vx-hero-signal-line--psych" />
            <span className="vx-hero-signal-line vx-hero-signal-line--interview" />
            <span className="vx-hero-signal-core" />
          </div>
        </div>
      </section>
      <div className="v25-scroll-spacer" aria-hidden="true" />

      {/* ================================================================
          INDUSTRIES — "Why is your largest investment still driven by instinct?"
          ================================================================ */}
      <section className="v25-section v25-section--light" id="industries">
        <div className="v25-section-inner v25-reveal">
          <div className="vx-industries-layout">
            <div className="vx-industries-lead">
              <div className="v25-eyebrow">Why instinct alone is not enough</div>
              <h2 className="v25-h2">
                Why is your largest investment still driven by <span className="accent accent--teal">instinct</span>?
              </h2>
              <div className="vx-instinct-proof" aria-label="Decision disciplines">
                <p>Finance relies on mathematics.</p>
                <p>Medicine relies on evidence.</p>
                <p>Operations rely on data.</p>
              </div>
              <p className="v25-desc">
                Yet workforce decisions are still shaped by intuition, fragmented opinions
                and subjective judgement.
              </p>
              <p className="v25-desc">
                Strategia brings together the art and science of workforce decision-making,
                helping organisations make better human decisions while managing risk.
              </p>
              <p className="vx-industries-tagline">
                Intuition matters. Workforce intelligence helps guide it.
              </p>
            </div>

            <IndustrySwitcher items={INDUSTRIES} />
          </div>
        </div>
      </section>

      {/* ================================================================
          THREE PILLARS
          ================================================================ */}
      <section className="v25-section" id="pillars">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">Three pillars</div>
              <h2 className="v25-h2">
                Three pillars. One platform. <span className="accent accent--teal">The full workforce lifecycle.</span>
              </h2>
              <p className="v25-desc" style={{ marginTop: 24, maxWidth: '54ch' }}>
                Acquire the right people. Elevate the ones you have. Empower those who leave.
              </p>
            </div>
          </div>

          <div className="vx-pillars-grid">
            {PILLARS.map((p) => (
              <article key={p.num} className="vx-pillar-card">
                <div className="vx-pillar-num">{p.num}</div>
                <h3 className="vx-pillar-title">{p.title}</h3>
                <div className="vx-pillar-italic">{p.italic}</div>
                <p className="vx-pillar-body">{p.body}</p>
                <p className="vx-pillar-foot">{p.foot}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          V-AGENT FUTURE STATE
          ================================================================ */}
      <section className="v25-section v25-section--light" id="v-agent">
        <div className="v25-section-inner v25-reveal">
          <div className="vx-agent-wrap">
            <div className="vx-agent-side">
              <div className="v25-eyebrow">Future state</div>
              <h2 className="v25-h2">
                Your agency, <span className="accent accent--teal">built in.</span>
              </h2>
              <p className="vx-agent-sub">Where the Strategia journey takes you.</p>
            </div>
            <div className="vx-agent-panel">
              <div className="vx-agent-panel-head">V-Agent</div>
              <p>
                V-Agent is the internal agency you build from your own data. Always on, it
                searches your assessed pool, reaches out directly, interviews and shortlists.
                Internal talent surfaced when V-Scan is live. Past applicants re-engaged, and
                yesterday’s near-misses become today’s new hires. Your
                organisation’s DNA sets the benchmark for the talent V-Agent delivers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          V-AGENT VIDEO CAROUSEL — placeholder candidate clips
          Scrolls continuously; hover a card to play it.
          ================================================================ */}
      <VxVideoCarousel />

      {/* ================================================================
          SOLUTIONS — questions bigger and bolder, no roles in the title
          ================================================================ */}
      <section className="v25-section" id="solutions">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">Solutions</div>
          <h2 className="v25-h2">
            Built for the people who <span className="accent accent--teal">own the workforce.</span>
          </h2>

          <div className="v25-solutions-grid vx-solutions-grid">
            {SOLUTIONS.map((sol) => (
              <div key={sol.title} id={sol.id} className="v25-solution-card vx-solution-card">
                <div className="v25-solution-title">{sol.title}</div>
                <p className="vx-solution-quote">{sol.quote}</p>
                <p className="v25-solution-body">{sol.body}</p>
                <div className="v25-solution-link">Explore <span aria-hidden="true">&rarr;</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          STATS — 4 cards per PDF slide 6
          ================================================================ */}
      <section className="v25-stats v25-section--light v25-reveal">
        <div className="v25-stats-grid vx-stats-grid-4">
          <div className="v25-stat-card">
            <div className="v25-stat-value">80%</div>
            <div className="v25-stat-label">Of internal recruitment automated</div>
            <div className="v25-stat-sub">Median across early deployment programs</div>
          </div>
          <div className="v25-stat-card">
            <div className="v25-stat-value">&lt;25mins</div>
            <div className="v25-stat-label">1,000 resumes end-to-end</div>
            <div className="v25-stat-sub">Trained to your role family, every applicant against the specification</div>
          </div>
          <div className="v25-stat-card">
            <div className="v25-stat-value">3</div>
            <div className="v25-stat-label">Independent signals per candidate</div>
            <div className="v25-stat-sub">Triangulated into one defensible ranking</div>
          </div>
          <div className="v25-stat-card">
            <div className="v25-stat-value">24/7</div>
            <div className="v25-stat-label">Interviews on demand</div>
            <div className="v25-stat-sub">STAR method, AI-avatar, any language, any time zone</div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PLATFORM — 09 V-modules grouped by phase
          ================================================================ */}
      <section className="v25-section" id="modules">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">The Platform · 09 V-modules</div>
              <h2 className="v25-h2">
                Nine modules. <span className="accent accent--teal">One acquisition engine.</span>
              </h2>
              <p className="v25-desc" style={{ marginTop: 24, maxWidth: '58ch' }}>
                The Pillar 1 acquisition engine runs from role calibration through
                screening, assessment, decisioning, onboarding and workforce insight.
              </p>
            </div>
            {!selfContained && (
              <a href="/vx/platform" className="v25-link-arrow">
                All modules<span aria-hidden="true"> ↗</span>
              </a>
            )}
          </div>

          <ModuleJourney modules={MODULES} phases={PHASES} />
        </div>
      </section>

      {/* ================================================================
          TRIANGULATE METHOD  (V26 Variant E — centroid / ternary plot)
          Equilateral triangle with three signal cards anchored at each
          vertex. Three medians draw from each vertex to the midpoint of
          the opposite side and meet at the centroid where the V-Fit
          JobFit score sits. Medians draw in on scroll-in and the
          centroid pulses with the score.
          ================================================================ */}
      <section className="v25-triangulate v25-triE v25-section--light" id="triangulate">
        <div className="v25-triangulate-inner v25-reveal">
          <div className="v25-tri-intro">
            <div className="v25-tri-intro-lead">
              <div className="v25-eyebrow">The Triangulate Method&trade;</div>
              <h2 className="v25-h2">
                Three signals. <span className="accent accent--lime">One ranking.</span>
              </h2>
              <div className="v25-tri-board-meta">
                <span className="v25-tri-board-meta-key">Role</span>
                <span className="v25-tri-board-meta-value">ICU Nurse Specialist</span>
                <span className="v25-tri-board-meta-sep">&middot;</span>
                <span className="v25-tri-board-meta-sub">authored by V-Job</span>
              </div>
            </div>
            <p className="v25-tri-intro-desc">
              V-Parse, V-Psych and V-Interview, three independent signals, each measured
              against the role specification. V-Fit triangulates them into one defensible
              ranking, with the evidence trail behind every result. The trust infrastructure
              that lets V-Agent operate on your behalf.
            </p>
          </div>

          <div className="v25-tri-board v25-triE-board">
            <div className="v25-triE-stage">
              {/* Isosceles triangle in viewBox 600 x 390.
                  Vertices: Top (300,130), BL (180,355), BR (420,355).
                  Score sits on the geometric centre at (300,280). */}
              <svg
                className="v25-triE-svg"
                viewBox="0 0 600 390"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <polygon
                  className="v25-triE-outline"
                  points="300,130 180,355 420,355"
                  pathLength={100}
                />
                <line className="v25-triE-side v25-triE-side--left"  x1="300" y1="130" x2="180" y2="355" pathLength={100} />
                <line className="v25-triE-side v25-triE-side--base"  x1="180" y1="355" x2="420" y2="355" pathLength={100} />
                <line className="v25-triE-side v25-triE-side--right" x1="420" y1="355" x2="300" y2="130" pathLength={100} />
                <line className="v25-triE-median v25-triE-median--parse"     x1="300" y1="130" x2="300" y2="280" pathLength={100} />
                <line className="v25-triE-median v25-triE-median--psych"     x1="180" y1="355" x2="300" y2="280" pathLength={100} />
                <line className="v25-triE-median v25-triE-median--interview" x1="420" y1="355" x2="300" y2="280" pathLength={100} />
                <circle className="v25-triE-spark v25-triE-spark--p1" cx="300" cy="130" r="3" />
                <circle className="v25-triE-spark v25-triE-spark--p2" cx="180" cy="355" r="3" />
                <circle className="v25-triE-spark v25-triE-spark--p3" cx="420" cy="355" r="3" />
                <circle className="v25-triE-centroid-halo" cx="300" cy="280" r="56" />
                <circle className="v25-triE-centroid-dot"  cx="300" cy="280" r="6" />
              </svg>

              <article className="v25-triE-vertex v25-triE-vertex--parse">
                <span className="kind">CV signal</span>
                <span className="name">V-Parse&trade;</span>
                <span className="weight">40%</span>
                <span className="evidence">Reg. Nurse (RN) License</span>
                <span className="sub">Verified &middot; Lic. ID #PR01</span>
              </article>
              <article className="v25-triE-vertex v25-triE-vertex--psych">
                <span className="kind">Psych signal</span>
                <span className="name">V-Psych&trade;</span>
                <span className="weight">20%</span>
                <span className="evidence">Resilience + Empathy</span>
                <span className="sub">T = 64 / 61 &middot; ICU cohort</span>
              </article>
              <article className="v25-triE-vertex v25-triE-vertex--interview">
                <span className="kind">Interview signal</span>
                <span className="name">V-Interview&trade;</span>
                <span className="weight">40%</span>
                <span className="evidence">Decision quality</span>
                <span className="sub">0.91 weighted &middot; 4 probes</span>
              </article>

              <div className="v25-triE-centroid">
                <span className="label">JobFit&trade;</span>
                <span className="score">94</span>
                <span className="verdict">
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M3 7l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Highly recommended
                </span>
              </div>
            </div>

            <div className="v25-triE-footer">
              <div className="v25-tri-weighting">
                <div className="v25-tri-weighting-label">Signal weighting</div>
                <div className="v25-tri-weighting-bar">
                  <span className="v25-tri-weighting-seg v25-tri-weighting-seg--parse" style={{ flex: 40 }}>
                    <span className="v25-tri-weighting-pct">40 %</span>
                    <span className="v25-tri-weighting-name">Parse</span>
                  </span>
                  <span className="v25-tri-weighting-seg v25-tri-weighting-seg--psych" style={{ flex: 20 }}>
                    <span className="v25-tri-weighting-pct">20 %</span>
                    <span className="v25-tri-weighting-name">Psych</span>
                  </span>
                  <span className="v25-tri-weighting-seg v25-tri-weighting-seg--interview" style={{ flex: 40 }}>
                    <span className="v25-tri-weighting-pct">40 %</span>
                    <span className="v25-tri-weighting-name">Interview</span>
                  </span>
                </div>
              </div>
              <div className="v25-triE-meta-row">
                <span>L. Ortega &middot; ICU Nurse Specialist</span>
                <span>Generated 14 Nov &middot; 2.3s synthesis</span>
                <span>Audit packet &middot; 7-year retention</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          THE SCIENCE — Big Five / STAR / Triangulation
          ================================================================ */}
      <section className="v25-section" id="science">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">The Science</div>
              <h2 className="v25-h2">
                Built on validated frameworks. <span className="accent accent--sky">Calibrated to your sector.</span>
              </h2>
              <div className="vx-science-copy">
                <p>
                  Every signal the platform produces comes from a peer-reviewed methodology:
                  adapted, calibrated, and applied consistently across workforces.
                </p>
                <p>
                  Anyone can use AI. The question is whether it is structured enough to be
                  effective at scale, where every result is defensible by the framework behind it.
                </p>
              </div>
            </div>
            {!selfContained && (
              <div className="v25-hero-actions">
                <a href="/vx/science" className="v25-btn-outline">Read the research</a>
                <a href="/vx/science" className="v25-link-arrow">
                  Methodology<span aria-hidden="true"> ↗</span>
                </a>
              </div>
            )}
          </div>

          <div className="vx-science-frameworks">
            <article className="vx-science-framework">
              <div className="vx-science-framework-title">Big Five (OCEAN)</div>
              <div className="vx-science-framework-tag">The most rigorously validated framework in personality science.</div>
              <p>V-Psych applies it, calibrated to role families.</p>
            </article>
            <article className="vx-science-framework">
              <div className="vx-science-framework-title">STAR Method</div>
              <div className="vx-science-framework-tag">The structured behavioural interview standard used by occupational psychologists.</div>
              <p>V-Interview applies it the same way, every candidate.</p>
            </article>
            <article className="vx-science-framework">
              <div className="vx-science-framework-title">Triangulation</div>
              <div className="vx-science-framework-tag">Three independent signals, weighted against the role.</div>
              <p>Composite assessments outperform any single-source; well-established across the meta-analytic literature.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ================================================================
          WHY IT MATTERS — comparison table
          ================================================================ */}
      <section className="v25-section v25-section--light" id="why-it-matters">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">Why it matters</div>
          <h2 className="v25-h2">
            Workforce decisions, <span className="accent accent--teal">rebuilt on evidence.</span>
          </h2>

          <div className="vx-compare">
            <div className="vx-compare-row vx-compare-row--head">
              <span className="vx-compare-factor">Key Factor</span>
              <span className="vx-compare-cell">Legacy HR Systems</span>
              <span className="vx-compare-cell">Agencies</span>
              <span className="vx-compare-cell vx-compare-cell--strategia">Strategia</span>
            </div>
            {COMPARISON.map((row) => (
              <div key={row.factor} className="vx-compare-row">
                <span className="vx-compare-factor">{row.factor}</span>
                <span className="vx-compare-cell">{row.legacy}</span>
                <span className="vx-compare-cell">{row.agency}</span>
                <span className="vx-compare-cell vx-compare-cell--strategia">{row.strategia}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          PROCESS — 12 weeks (Pillar One, Acquire)
          ================================================================ */}
      <section className="v25-section" id="process">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">Our process · Pillar One (Acquire)</div>
              <h2 className="v25-h2">
                Live in weeks, <span className="accent accent--teal">not months.</span>
              </h2>
              <p className="v25-desc" style={{ marginTop: 24, maxWidth: '64ch' }}>
                Every Strategia engagement runs the same disciplined deployment. Five phases.
                The output of every step is auditable, exportable, and yours.
              </p>
            </div>
          </div>

          <div className="vx-deploy-grid">
            {DEPLOYMENT.map((d) => (
              <article key={d.title} className="vx-deploy-card">
                <div className="vx-deploy-meta">
                  <span className="vx-deploy-phase">{d.phase}</span>
                  <span className="vx-deploy-weeks">{d.weeks}</span>
                </div>
                <h3 className="vx-deploy-title">{d.title}</h3>
                <p className="vx-deploy-desc">{d.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          ROI CALCULATOR — new sliders per slide 13
          ================================================================ */}
      <section className="v25-section v25-section--light" id="roi">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">ROI calculator</div>
          <h2 className="v25-h2">See the savings for <span className="accent accent--teal">your&nbsp;system.</span></h2>
          <p className="v25-desc">
            Three inputs. Conservative assumptions. A number you can take to
            your&nbsp;CFO.
          </p>

          <div className="v25-roi-grid">
            <div className="v25-roi-inputs">
              <div>
                <div className="v25-roi-input-header">
                  <span className="k">Annual hires</span>
                  <span className="v">{annualHires.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  className="v25-roi-slider"
                  min={30} max={2000} step={10}
                  value={annualHires}
                  onChange={(e) => setAnnualHires(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="v25-roi-input-header">
                  <span className="k">Average loaded salary per hire</span>
                  <span className="v">USD ${(loadedSalary / 1000).toFixed(0)}K</span>
                </div>
                <input
                  type="range"
                  className="v25-roi-slider"
                  min={40000} max={250000} step={1000}
                  value={loadedSalary}
                  onChange={(e) => setLoadedSalary(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="v25-roi-input-header">
                  <span className="k">Average cost-per-hire (today)</span>
                  <span className="v">USD ${costPerHire.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  className="v25-roi-slider"
                  min={1000} max={20000} step={100}
                  value={costPerHire}
                  onChange={(e) => setCostPerHire(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="v25-roi-output">
              <div className="v25-roi-output-label">Projected annual savings</div>
              <div className="v25-roi-output-value">
                <span className="dollar">USD$</span>
                <span className="num">{savingsDisplay}</span>
              </div>
              <p className="v25-roi-output-sub">
                Includes screening and assessment automation (around 70% recruiter-labour
                reduction) and reduced regrettable hires (cost = 30% of first-year salary).
                Conservative against published industry benchmarks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECURITY — renamed from Enterprise (slide 14)
          Three intro cards + badges grid + Microsoft trust block
          ================================================================ */}
      <section className="v25-section" id="security">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">Security</div>
          <h2 className="v25-h2">
            An overlay, <span className="accent accent--teal">not an overhaul.</span>
          </h2>
          <p className="v25-desc" style={{ marginTop: 24, maxWidth: '64ch' }}>
            Strategia is an intelligence layer for your existing stack, connecting via
            secure APIs to your ATS, HRIS, and CRM. The systems you have invested in keep
            their jobs.
          </p>

          <div className="vx-security-tri">
            <article className="vx-security-card">
              <div className="vx-security-card-title">Minimal IT lift</div>
              <p>Modular design with custom API integration. We connect Strategia to your systems. Your team plugs in, does not rebuild.</p>
            </article>
            <article className="vx-security-card">
              <div className="vx-security-card-title">Works with what you have</div>
              <p>Augments your ATS, HRIS, and CRM rather than replacing them. Every existing investment intact.</p>
            </article>
            <article className="vx-security-card">
              <div className="vx-security-card-title">Flexible security and access</div>
              <p>Enterprise-grade SSO, authentication, and role-based governance. Compliant by design, regional by deployment.</p>
            </article>
          </div>

          <div className="v25-enterprise-wrap" style={{ marginTop: 56 }}>
            <div className="v25-enterprise-bg" aria-hidden="true" />
            <div className="v25-enterprise-content">
              <div>
                <div className="v25-eyebrow">High-governance workforces</div>
                <h3 className="v25-h2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
                  Built for <span className="accent accent--teal">high-governance workforces</span>, anywhere.
                </h3>
                <p className="v25-desc" style={{ marginTop: 20 }}>
                  Hosted on Microsoft Azure. Single-tenant options with regional data
                  residency. Engineered for the General Counsel as much as the CHRO.
                </p>
              </div>
              <div className="v25-badges-grid">
                {BADGES.map((b) => (
                  <div key={b} className="v25-badge-item">
                    <span className="v25-badge-check" aria-hidden="true">&#10003;</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="vx-trust-block">
            <div className="vx-trust-copy">
              <div className="v25-eyebrow">Trust</div>
              <h3 className="v25-h2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
                <span className="vx-nowrap">Microsoft-partnered.</span>{' '}
                <span className="accent accent--teal">AI-native.</span>
              </h3>
              <p>
                Partnered with Microsoft, AI-native by design, and built on their enterprise
                cloud, Strategia inherits the security, compliance, and procurement
                integration that Microsoft enforces across the stack. The trust layer your
                CIO and CISO already work inside, ready from day one for the Marketplace
                listing, the security review, and the procurement gate.
              </p>
            </div>
            <div className="vx-microsoft-lockup" aria-label="Microsoft">
              <span className="vx-microsoft-mark" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </span>
              <span className="vx-microsoft-wordmark">Microsoft</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FAQs
          ================================================================ */}
      <section className="v25-section v25-section--light" id="faqs">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">FAQs</div>
          <h2 className="v25-h2">
            Direct answers, <span className="accent accent--teal">without the brochure language.</span>
          </h2>
          <p className="v25-desc" style={{ marginTop: 24, maxWidth: '64ch' }}>
            If you are scoping a workforce intelligence platform seriously, these are the
            questions that surface first.
          </p>

          <div className="vx-faq-list">
            {FAQS.map((f, i) => {
              const open = openFaq === i
              return (
                <div key={f.q} className={`vx-faq-item${open ? ' vx-faq-item--open' : ''}`}>
                  <button
                    type="button"
                    className="vx-faq-q"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : i)}
                  >
                    <span className="vx-faq-q-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="vx-faq-q-text">{f.q}</span>
                    <span className="vx-faq-q-icon" aria-hidden="true">{open ? '−' : '+'}</span>
                  </button>
                  {open && (
                    <div className="vx-faq-a">
                      {f.a.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA
          ================================================================ */}
      <section className="v25-cta-section" id="demo">
        <div className="v25-cta-wrap v25-reveal vx-demo-cta">
          <div className="v25-cta-bg" aria-hidden="true" />
          <div className="vx-demo-cta-copy">
            <h2 className="v25-h2">
              Own the workforce intelligence layer.
            </h2>
            <p className="vx-cta-italic">Turn workforce data into better decisions.</p>
            <p className="v25-desc">
              Most organisations have workforce data. Few turn it into intelligence. Strategia
              helps leaders understand workforce capability, hiring risk, performance and
              culture, creating a workforce intelligence layer that compounds with every
              decision.
            </p>
            {!selfContained && (
              <p className="v25-desc">
                Every day without workforce intelligence impacts hiring quality, retention,
                productivity and leadership decisions.
              </p>
            )}
            <p className="vx-cta-closer">
              Book a demo. See what your organisation may be missing.
            </p>
            {!selfContained && (
              <div className="v25-cta-actions">
                <a href="/vx/process" className="v25-link-arrow">
                  Our process<span aria-hidden="true"> ↗</span>
                </a>
              </div>
            )}
          </div>

          <div className="vx-demo-contact">
            {demoSubmitted ? (
              <div className="vx-demo-success" role="status" aria-live="polite">
                <div className="v25-eyebrow">Message received</div>
                <h3>Contact us</h3>
                <p>
                  Thank you. Our team will get back to you within one business day.
                </p>
              </div>
            ) : (
              <form className="vx-demo-form" onSubmit={handleDemoSubmit} noValidate>
                <h3>Contact us</h3>
                <div className="vx-demo-fields">
                  <div className="vx-demo-field">
                    <label htmlFor="demo-name">Name</label>
                    <input
                      id="demo-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={demoForm.name}
                      onChange={updateDemoForm('name')}
                    />
                  </div>
                  <div className="vx-demo-field">
                    <label htmlFor="demo-email">Email</label>
                    <input
                      id="demo-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={demoForm.email}
                      onChange={updateDemoForm('email')}
                    />
                  </div>
                  <div className="vx-demo-field">
                    <label htmlFor="demo-company">Company</label>
                    <input
                      id="demo-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={demoForm.company}
                      onChange={updateDemoForm('company')}
                    />
                  </div>
                  <div className="vx-demo-field">
                    <label htmlFor="demo-message">Message</label>
                    <textarea
                      id="demo-message"
                      name="message"
                      required
                      rows={5}
                      value={demoForm.message}
                      onChange={updateDemoForm('message')}
                    />
                  </div>
                </div>
                <button type="submit" className="v25-btn-primary vx-demo-submit">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {footerSlot ?? <VxFooter />}
    </div>
  )
}
