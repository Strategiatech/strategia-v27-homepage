'use client'

import { useEffect } from 'react'
import VxNav from '@/components/vx/VxNav'
import VxFooter from '@/components/vx/VxFooter'

/* eslint-disable @next/next/no-img-element */

// Long-form text styles. Reused across every <h2> and <p> in the policy body
// so the document reads as one consistent column on the dark V25 surface.
const H2_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-display, "Literata", Georgia, serif)',
  fontSize: 'clamp(1.5rem, 2.6vw, 1.875rem)',
  fontWeight: 400,
  lineHeight: 1.2,
  letterSpacing: '-0.015em',
  color: '#ffffff',
  margin: '64px 0 20px',
  maxWidth: '34ch',
  textWrap: 'balance',
}

const H3_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-tight, system-ui)',
  fontSize: '1.125rem',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  color: '#ffffff',
  margin: '32px 0 12px',
}

const P_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-inter, system-ui)',
  fontSize: '1rem',
  lineHeight: 1.75,
  color: 'rgba(255, 255, 255, 0.78)',
  margin: '0 0 16px',
  maxWidth: '70ch',
}

const UL_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-inter, system-ui)',
  fontSize: '1rem',
  lineHeight: 1.75,
  color: 'rgba(255, 255, 255, 0.78)',
  margin: '0 0 20px',
  paddingLeft: '1.25rem',
  maxWidth: '70ch',
}

export default function VxPrivacyBody() {
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

      {/* ================================================================
          HERO
          ================================================================ */}
      <section
        className="v25-section"
        style={{ paddingTop: 'clamp(140px, 18vw, 220px)', paddingBottom: 48 }}
      >
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">Legal · Last updated 21 May 2026</div>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Literata", Georgia, serif)',
              fontSize: 'clamp(2.5rem, 6.4vw, 5.6rem)',
              fontWeight: 400,
              lineHeight: 0.98,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 1.5rem',
              maxWidth: '20ch',
              textWrap: 'balance',
            }}
          >
            Privacy <span className="accent accent--teal">Policy</span>.
          </h1>
          <p
            className="v25-desc"
            style={{ maxWidth: '64ch', fontSize: '1.15rem' }}
          >
            This Privacy Policy applies to information collected and processed
            by Strategia Technology Partners Pty Limited (ABN 85 667 971 173).
            Version 1.1.
          </p>
        </div>
      </section>

      {/* ================================================================
          BODY
          ================================================================ */}
      <section
        className="v25-section"
        style={{ paddingTop: 0, paddingBottom: 'clamp(96px, 14vw, 180px)' }}
      >
        <div className="v25-section-inner">
          <article style={{ maxWidth: '70ch' }}>
            <h2 style={{ ...H2_STYLE, marginTop: 0 }}>1. Who we are and what we do</h2>

            <h3 style={H3_STYLE}>1.1 Who we are</h3>
            <p style={P_STYLE}>
              Strategia Technology Partners Pty Limited is an Australian
              incorporated software company that designs and operates the
              Strategia workforce intelligence platform.
            </p>
            <p style={P_STYLE}>
              The company complies with the Australian Privacy Principles under
              the Privacy Act 1988 (Cth), and with applicable international data
              protection regulations such as the EU General Data Protection
              Regulation (GDPR).
            </p>

            <h3 style={H3_STYLE}>1.2 What we do</h3>
            <p style={P_STYLE}>
              Strategia operates an AI-enabled workforce intelligence SaaS
              platform that assists organisations to understand workforce
              capability, behaviour, role-fit and potential. The platform
              provides insight and analysis tools for workforce optimisation.
            </p>
            <p style={P_STYLE}>
              Where permitted by law, the company may use de-identified and
              aggregated data to improve platform performance, train AI models,
              support analytics, benchmarking, research, and future commercial
              development.
            </p>

            <h2 style={H2_STYLE}>2. How to contact us</h2>
            <p style={P_STYLE}>
              For any privacy enquiry, contact the Privacy Officer at Strategia
              Technology Partners Pty Limited:{' '}
              <a
                href="mailto:info@strategiatech.ai"
                style={{ color: 'var(--v25-accent-text, #A5DCD0)' }}
              >
                info@strategiatech.ai
              </a>
              .
            </p>

            <h2 style={H2_STYLE}>3. What information we collect</h2>

            <h3 style={H3_STYLE}>3.1 What is personal information</h3>
            <p style={P_STYLE}>
              Personal information includes any information that can be used to
              identify an individual, including name, age, gender, and contact
              details.
            </p>

            <h3 style={H3_STYLE}>3.2 Contact information</h3>
            <p style={P_STYLE}>
              The company collects contact details when users sign up,
              including name, residential address, email address, telephone
              number, age, birth date, profession, occupation, job title, and
              gender.
            </p>

            <h3 style={H3_STYLE}>3.3 Transaction information</h3>
            <p style={P_STYLE}>
              This includes information about user interactions with the
              company, products and services used or purchased, and inquiries
              made.
            </p>

            <h3 style={H3_STYLE}>3.4 Location information</h3>
            <p style={P_STYLE}>
              Location information collected includes data from mobile or other
              devices interacting with websites or apps, or associated with IP
              addresses.
            </p>

            <h3 style={H3_STYLE}>3.5 Job information</h3>
            <p style={P_STYLE}>
              The company collects information about job opportunities,
              including job descriptions, industry, estimated remuneration
              packages, and employer details.
            </p>

            <h3 style={H3_STYLE}>3.6 Candidate information</h3>
            <p style={P_STYLE}>
              If you are a job candidate, the company may collect information
              necessary to assess suitability for placement, including
              curriculum vitae or resume containing contact details, job
              history, and educational qualifications.
            </p>

            <h3 style={H3_STYLE}>3.7 Identification information</h3>
            <p style={P_STYLE}>
              In some cases, identification documentation such as driver
              licences or passports may be collected. When you send us these or
              similar documents, you agree we may keep those images on file for
              the sole purpose of performing our function as a business
              organisation.
            </p>

            <h3 style={H3_STYLE}>3.8 Financial information</h3>
            <p style={P_STYLE}>
              Financial information includes payment details, such as direct
              debit or credit card information, used to pay for products and
              services.
            </p>

            <h3 style={H3_STYLE}>3.9 Cookies and usage activity</h3>
            <p style={P_STYLE}>
              The company or business partners may collect usage data through
              cookies and other tracking software. Users can manage cookie
              settings in their browser.
            </p>

            <h3 style={H3_STYLE}>3.10 Profile information and insights</h3>
            <p style={P_STYLE}>
              The company collects profile information provided directly by
              users and insights generated based on platform use.
            </p>

            <h3 style={H3_STYLE}>3.11 Metadata</h3>
            <p style={P_STYLE}>
              The company collects metadata from website usage, including
              browser type and version, operating system, referrer URL,
              webpages visited, access date and time, and IP address.
            </p>

            <h2 style={H2_STYLE}>4. How we collect your information</h2>

            <h3 style={H3_STYLE}>4.1 Directly from you</h3>
            <p style={P_STYLE}>
              Personal information is collected directly from users through
              product acquisition, contact requests, website forms, surveys,
              emails, conversations with staff, and written correspondence.
            </p>

            <h3 style={H3_STYLE}>4.2 Indirectly from others</h3>
            <p style={P_STYLE}>
              The company may collect personal information from service
              providers, publicly available sources, recruitment agencies,
              contractors, business partners, credit reporting bodies, law
              enforcement agencies, government entities, and third parties such
              as employers or referees.
            </p>

            <h3 style={H3_STYLE}>4.3 From your use of the Strategia platform</h3>
            <p style={P_STYLE}>
              The company collects usage analytics about when and how users
              interact with products and services, and generates insights based
              on platform usage.
            </p>

            <h2 style={H2_STYLE}>5. What happens if we cannot collect your information</h2>
            <p style={P_STYLE}>
              If you choose not to provide personal information, several
              consequences may follow: the company may not provide requested
              products or services, may not continue the business relationship,
              may not provide information about new offerings, and may be
              unable to customise platform content.
            </p>

            <h2 style={H2_STYLE}>6. How we use your information</h2>

            <h3 style={H3_STYLE}>6.1 To provide our products and services</h3>
            <p style={P_STYLE}>
              Information is used to provide products and services, deliver
              quality user experience, provide news and advice, communicate via
              email, mail, SMS or telephone, manage and enhance services,
              personalise experiences, verify identity, conduct business
              processing, manage business relationships, administer payments,
              and investigate complaints.
            </p>

            <h3 style={H3_STYLE}>6.2 For marketing</h3>
            <p style={P_STYLE}>
              The company may use personal information for marketing purposes,
              including sending marketing communications. Users can opt-out at
              any time.
            </p>

            <h3 style={H3_STYLE}>6.3 To develop insights</h3>
            <p style={P_STYLE}>
              The company uses information to develop insights about
              individuals and may provide these to third parties, or aggregate
              information to create statistical or business data and insights.
            </p>

            <h3 style={H3_STYLE}>6.4 Use of de-identified information</h3>
            <p style={P_STYLE}>
              Strategia may use de-identified or aggregated information for
              research, analytics, product development, benchmarking, AI
              training, and other business purposes.
            </p>

            <h2 style={H2_STYLE}>7. Who we share your information with and why</h2>

            <h3 style={H3_STYLE}>7.1 Business operations and service providers</h3>
            <p style={P_STYLE}>
              The company may disclose personal information to employees,
              related bodies corporate, business partnerships, joint venture
              entities, external service providers including web hosting, IT
              administrators, payment processors, professional advisers,
              authorised third parties, and law enforcement or government
              authorities if required by law.
            </p>

            <h3 style={H3_STYLE}>7.2 Sharing of CVs with potential employers</h3>
            <p style={P_STYLE}>
              If you are a job candidate, we will only reveal or disclose your
              CV and other personal information to a potential employer if
              authorised by you.
            </p>

            <h2 style={H2_STYLE}>8. Your rights in relation to your information</h2>

            <h3 style={H3_STYLE}>Accessing your personal information</h3>
            <p style={P_STYLE}>
              Users have the right to confirm whether personal information is
              held and processed, and to request access. The company will not
              charge for requests or for correcting or updating information.
            </p>

            <h3 style={H3_STYLE}>Correcting your personal information</h3>
            <p style={P_STYLE}>
              The company takes reasonable steps to ensure information is
              correct, complete and up-to-date. Users may request amendments if
              they believe information is incorrect, incomplete or inaccurate.
            </p>

            <h3 style={H3_STYLE}>Deleting your personal information</h3>
            <p style={P_STYLE}>
              Users may request deletion of information or account deletion by
              contacting the company, which will respond within a reasonable
              period.
            </p>

            <h3 style={H3_STYLE}>Complaints</h3>
            <p style={P_STYLE}>
              If users believe privacy has been breached or have concerns about
              this Privacy Policy, they should contact the company with
              incident details. If unsatisfied, users may contact the Office of
              the Australian Information Commissioner at{' '}
              <a
                href="https://www.oaic.gov.au"
                style={{ color: 'var(--v25-accent-text, #A5DCD0)' }}
                rel="noopener noreferrer"
                target="_blank"
              >
                www.oaic.gov.au
              </a>{' '}
              or 1300 363 992.
            </p>

            <h2 style={H2_STYLE}>9. Information transfers outside Australia</h2>
            <p style={P_STYLE}>
              The company may transfer personal information to service
              providers and related entities located in Australia, Singapore,
              the United Arab Emirates, the European Union, and other
              jurisdictions where Strategia operates or hosts technology
              services. The company takes reasonable steps to ensure recipients
              handle information in accordance with applicable privacy laws.
            </p>

            <h2 style={H2_STYLE}>10. EU residents (GDPR)</h2>
            <p style={P_STYLE}>
              For GDPR purposes, the company is the controller.
            </p>

            <h3 style={H3_STYLE}>Legal basis for processing</h3>
            <p style={P_STYLE}>
              The company will generally obtain consent from data subjects for
              collection and processing. Where consent has not been obtained,
              the company may process information if necessary for contract
              performance.
            </p>

            <h3 style={H3_STYLE}>Data retention</h3>
            <p style={P_STYLE}>
              The company retains personal information until it no longer has a
              legal basis to process it.
            </p>

            <h3 style={H3_STYLE}>Additional rights for EEA residents</h3>
            <p style={P_STYLE}>EEA residents have the following additional rights:</p>
            <ul style={UL_STYLE}>
              <li>Access: obtain a copy of personal information undergoing processing.</li>
              <li>Rectification: have incomplete or inaccurate information rectified.</li>
              <li>Deletion: request deletion of personal information.</li>
              <li>Restriction: restrict processing in certain circumstances.</li>
              <li>Portability: obtain information in a structured, electronic format.</li>
              <li>Objection: object to processing for profiling or direct marketing.</li>
              <li>Withdrawing consent: withdraw consent at any time, free of charge.</li>
            </ul>

            <h2 style={H2_STYLE}>11. Other important details</h2>

            <h3 style={H3_STYLE}>11.1 Privacy collection statement</h3>
            <p style={P_STYLE}>
              This Privacy Policy serves as the Privacy Collection Statement,
              addressing the company identity, collection purposes,
              consequences of non-collection, disclosure entities, and access
              and correction information.
            </p>

            <h3 style={H3_STYLE}>11.2 Third-party links</h3>
            <p style={P_STYLE}>
              The website may contain links to third-party websites. We make no
              representations or warranties in relation to the privacy
              practices of any third-party website and we are not responsible
              for the privacy policies or the content of any third-party
              website.
            </p>

            <h3 style={H3_STYLE}>11.3 Updates to this policy</h3>
            <p style={P_STYLE}>
              This Privacy Policy may be updated from time to time. Updated
              versions will be published on our website and will apply to all
              information held by Strategia.
            </p>
          </article>
        </div>
      </section>

      <VxFooter />
    </div>
  )
}
