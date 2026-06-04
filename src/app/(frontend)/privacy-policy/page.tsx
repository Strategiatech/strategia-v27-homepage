import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Strategia',
  description:
    'This Privacy Policy applies to information collected and processed by Strategia Technology Partners Pty Limited.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#012236] text-white">
      <header className="border-b border-white/12 bg-[linear-gradient(135deg,#1C1C1C_0%,#00162E_24%,#003D6B_55%,#005072_100%)] py-24">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 rounded-lg bg-[linear-gradient(135deg,#00C6C1_0%,#5CC8E8_100%)] px-4 py-2 text-sm font-semibold !text-[#012236] shadow-[0_14px_32px_-18px_rgba(92,200,232,0.9)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_rgba(92,200,232,1)]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-[#A5DCD0]">
            Legal
          </span>
          <h1 className="mb-6 font-serif text-4xl !text-white md:text-5xl">
            Privacy Policy
          </h1>
          <p className="max-w-2xl text-lg font-light text-white/88">
            This Privacy Policy applies to information collected and processed
            by Strategia Technology Partners Pty Limited (ABN 85 667 971 173).
          </p>
          <p className="mt-4 text-sm text-[#A5DCD0]">
            Version 1.1 · Last updated: November 2025
          </p>
        </div>
      </header>

      <main className="bg-[radial-gradient(900px_520px_at_85%_0%,rgba(0,198,193,0.14),transparent_60%),radial-gradient(740px_480px_at_10%_20%,rgba(92,200,232,0.10),transparent_60%)] py-16">
        <div className="mx-auto max-w-4xl space-y-12 px-6">
          <Section title="1. Who we are and what we do">
            <SubSection title="1.1 Who we are">
              <p>
                Strategia Technology Partners Pty Limited is an
                Australian-incorporated software company that designs and
                operates the Strategia workforce intelligence platform.
              </p>
              <p>
                We comply with the Australian Privacy Principles (APPs) under
                the Privacy Act 1988 (Cth), and with applicable international
                data-protection regulations such as the EU General Data
                Protection Regulation (GDPR). We may rely on exemptions
                permitted under the Privacy Act, including those relating to
                employee records and related bodies corporate.
              </p>
            </SubSection>
            <SubSection title="1.2 What we do">
              <p>
                Strategia operates an AI-enabled workforce intelligence SaaS
                platform that assists organisations to understand workforce
                capability, behaviour, role-fit and potential. Strategia is not
                a recruitment agency. We provide insight and analysis tools used
                by organisations to support workforce optimisation.
              </p>
              <p>
                Where permitted by law, Strategia may also use de-identified
                and aggregated data to improve platform performance, train AI
                models, support analytics, benchmarking, research, and future
                commercial development. De-identified data does not identify
                individuals.
              </p>
            </SubSection>
          </Section>

          <Section title="2. How to contact us">
            <div className="rounded-xl border border-[#00C6C1]/35 bg-[linear-gradient(135deg,rgba(0,198,193,0.14)_0%,rgba(92,200,232,0.10)_100%)] p-6">
              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-6 w-6 flex-shrink-0 stroke-1 text-[#A5DCD0]" />
                <div>
                  <p className="font-medium !text-white">Privacy Officer</p>
                  <p className="text-white/84">
                    Strategia Technology Partners Pty Limited
                  </p>
                  <a
                    href="mailto:privacy@strategiatech.io"
                    className="font-semibold text-[#A5DCD0] transition-colors hover:text-[#5CC8E8]"
                  >
                    privacy@strategiatech.io
                  </a>
                </div>
              </div>
            </div>
          </Section>

          <Section title="3. What information we collect">
            <SubSection title="3.1 What is personal information">
              <p>
                The term &apos;personal information&apos; has the meaning given
                to it in the Privacy Act or any other applicable data protection
                law. In general terms, it is any information that can be used to
                identify an individual. This may include the name, age, gender
                and contact details (including phone numbers, address and email
                addresses) of the individual.
              </p>
            </SubSection>
            <SubSection title="3.2 Contact information">
              <p>
                When you sign up to use our products or services, we will
                generally collect your contact details which may include your
                name, residential address, email address, telephone number, age
                and/or birth date, profession, occupation or job title, and
                gender.
              </p>
            </SubSection>
            <SubSection title="3.3 Transaction information">
              <p>
                Transaction information includes information about your
                interactions with us, the products and services you have used or
                purchased from us or which you have enquired about and your use
                of these products and services.
              </p>
            </SubSection>
            <SubSection title="3.4 Location information">
              <p>
                We collect information about your location when you use our
                products and services, such as location information provided by
                a mobile or other device interacting with one of our websites or
                apps, or associated with your IP address.
              </p>
            </SubSection>
            <SubSection title="3.5 Job information">
              <p>
                We collect information about job opportunities, which may
                include job descriptions, industry, the estimated remuneration
                package and employer details.
              </p>
            </SubSection>
            <SubSection title="3.6 Candidate information">
              <p>
                If you are a candidate for a job opportunity, we may collect
                information that is necessary to assess your suitability for
                placement in a particular role. This includes your curriculum
                vitae or resume which will include your contact details, job
                history, and details about your educational and other
                qualifications.
              </p>
            </SubSection>
            <SubSection title="3.7 Identification information">
              <p>
                In some cases, we may collect identification documentation from
                you (e.g. a driver&apos;s licence or passport). When you send
                us these or similar documents, you agree we may keep those
                images on file for the sole purpose of performing our function
                as a business organisation.
              </p>
            </SubSection>
            <SubSection title="3.8 Financial information">
              <p>
                Financial information may include payment details, such as
                direct debit or credit card information, used to pay for our
                products and services.
              </p>
            </SubSection>
            <SubSection title="3.9 Cookies and usage activity">
              <p>
                When you visit our websites or use our apps, we or our business
                partners may also collect information about your use of those
                websites or apps (usage data). We may do this by using cookies
                and other tracking software.
              </p>
              <p>
                You can manage the use of cookies on your computer or mobile
                device. If you do not wish to receive cookies you can set your
                browser so that your computer or device does not accept them.
              </p>
            </SubSection>
            <SubSection title="3.10 Profile information and insights">
              <p>
                We collect profile information which includes information
                relating to you that you provide to us directly through your use
                of our products or services, and information or insights that we
                generate about you based on the use of our products or services.
              </p>
            </SubSection>
            <SubSection title="3.11 Metadata">
              <p>
                You may use our website without providing any personal
                information. In this case, we will collect metadata that results
                from your usage of our website including browser type and
                version, operating system, referrer URL, webpage(s) you are
                visiting, date and time of accessing our website and IP address.
              </p>
            </SubSection>
          </Section>

          <Section title="4. How we collect your information">
            <SubSection title="4.1 Directly from you">
              <p>
                We collect your personal information directly from you unless it
                is unreasonable or impractical to do so. We do this in ways
                including:
              </p>
              <BulletList
                items={[
                  'when you use or acquire our products and services',
                  'when you contact or request information from us including via our websites, apps, online forms, surveys and emails',
                  'through your conversations with our staff and our representatives',
                  'when you write to us',
                ]}
              />
            </SubSection>
            <SubSection title="4.2 Indirectly from others">
              <p>
                We may also collect personal information from third parties
                including:
              </p>
              <BulletList
                items={[
                  'from our service providers',
                  'from publicly available sources of information',
                  'recruitment agencies',
                  'contractors and business partners',
                  'credit reporting bodies',
                  'law enforcement agencies and other government entities',
                  'through someone else who has provided us with your information (e.g. your employer or your referees)',
                ]}
              />
            </SubSection>
            <SubSection title="4.3 From your use of the Strategia platform">
              <p>
                We collect information about you when you use our products and
                services. For example, we may collect usage analytics about when
                and how you use our products and services. We may also generate
                and collect insights about you based on your use of our products
                and services.
              </p>
            </SubSection>
          </Section>

          <Section title="5. What happens if we can't collect your information">
            <p>
              The provision of your personal information may be necessary to use
              our products and services. If you choose not to provide personal
              information as described in this Privacy Policy, some or all of
              the following may happen:
            </p>
            <BulletList
              items={[
                'we may not be able to provide you with the products or services you requested',
                'we may not be able to continue our business relationship with you',
                'we may not be able to provide you with information about products and services that you may want',
                'we may be unable to tailor the content of our platform to your preferences',
              ]}
            />
          </Section>

          <Section title="6. How we use your information">
            <SubSection title="6.1 To provide our products and services">
              <p>Your information is collected and used by us:</p>
              <BulletList
                items={[
                  'to provide products and services to you and deliver the best possible quality of user experience',
                  'to provide you with news, information or advice about our existing and new products and services',
                  'to communicate with you, including by email, mail, SMS or telephone',
                  'to manage and enhance our products and services',
                  'to personalise and customise your experience',
                  'to verify your identity',
                  'to conduct business processing functions',
                  'to manage our business relationship with you',
                  'to administer and manage services relating to payment',
                  'to investigate any complaints about or made by you',
                ]}
              />
            </SubSection>
            <SubSection title="6.2 For marketing">
              <p>
                We may collect, use and disclose your personal information for
                marketing purposes, including to send you marketing
                communications about our products and services. You can contact
                us at any time to opt-out from receiving direct marketing
                communications.
              </p>
            </SubSection>
            <SubSection title="6.3 To develop insights">
              <p>
                We use your information to develop insights about an individual,
                which we may provide to third parties or to use internally in
                our business. We also aggregate your information with the
                information of other people to create statistical or other
                business data and insights.
              </p>
            </SubSection>
            <SubSection title="6.4 Use of de-identified information">
              <p>
                Strategia may use de-identified or aggregated information for
                research, analytics, product development, benchmarking, AI
                training, and other business purposes. No identifiable personal
                information will be shared without your consent.
              </p>
            </SubSection>
          </Section>

          <Section title="7. Who we share your information with and why">
            <SubSection title="7.1 Business operations and service providers">
              <p>
                We may disclose your personal information to third parties in
                the course of operating our business. These parties include:
              </p>
              <BulletList
                items={[
                  'our employees, related bodies corporate, business partnerships and joint venture entities',
                  'our external service providers including web hosting providers, IT systems administrators, payment processors, and professional advisers',
                  'specific third parties authorised by you to receive information held by us',
                  'the police, any relevant government authority or enforcement body, if required by law',
                ]}
              />
            </SubSection>
            <SubSection title="7.2 Sharing of CVs with potential employers">
              <p>
                If you are a job candidate, we will only reveal or disclose your
                CV and other personal information to a potential employer if
                authorised by you.
              </p>
            </SubSection>
          </Section>

          <Section title="8. Your rights in relation to your information">
            <SubSection title="Accessing your personal information">
              <p>
                You have the right to obtain from us confirmation about whether
                or not personal information concerning you is being held and
                processed by us, and, if it is, to request access to that
                personal information. You may request access by contacting us.
                We will not charge for simply making a request and will not
                charge to correct or update your personal information.
              </p>
            </SubSection>
            <SubSection title="Correcting your personal information">
              <p>
                We take reasonable steps to ensure that the personal information
                we collect, hold, use and disclose is correct, complete and
                up-to-date. If you believe that personal information we hold
                about you is incorrect, incomplete or inaccurate, then you may
                ask us to amend it.
              </p>
            </SubSection>
            <SubSection title="Deleting your personal information">
              <p>
                You may request that we delete information that we hold about
                you or that we delete your account by contacting us. We will
                consider and respond to your request within a reasonable period.
              </p>
            </SubSection>
            <SubSection title="Complaints">
              <p>
                If you believe your privacy has been breached by us or have any
                feedback, questions or concerns about our Privacy Policy, please
                contact us and provide details of the incident so that we can
                investigate it. If you are not satisfied with the outcome, you
                may contact the Office of the Australian Information
                Commissioner at www.oaic.gov.au or by calling 1300 363 992.
              </p>
            </SubSection>
          </Section>

          <Section title="9. Information transfers outside Australia">
            <p>
              We may transfer personal information to service providers and
              related entities located in Australia, Singapore, the United Arab
              Emirates, the European Union, and other jurisdictions where
              Strategia operates or hosts technology services.
            </p>
            <p>
              We take reasonable steps to ensure these recipients handle
              information in accordance with applicable privacy laws.
            </p>
          </Section>

          <Section title="10. EU residents (GDPR)">
            <p>
              For the purposes of the European General Data Protection
              Regulation (GDPR), we are the &apos;controller&apos;.
            </p>
            <SubSection title="Legal basis for processing">
              <p>
                In most instances, we will obtain consent from the data subject
                to the collection and processing of their personal information.
                Where we have not obtained that consent, we may process personal
                information if it is necessary for the performance of a
                contract.
              </p>
            </SubSection>
            <SubSection title="Data retention">
              <p>
                We will retain personal information until we no longer have a
                legal basis to process it.
              </p>
            </SubSection>
            <SubSection title="Additional rights for EEA residents">
              <p>
                If you are a resident in the EEA, you have the following
                additional rights:
              </p>
              <BulletList
                items={[
                  'Access: Obtain a copy of the personal information undergoing processing',
                  'Rectification: Have incomplete or inaccurate personal information rectified',
                  'Deletion: Request that we delete personal information that we process about you',
                  'Restriction: Restrict our processing of your personal information in certain circumstances',
                  'Portability: Obtain personal information in a structured, electronic format',
                  'Objection: Object to the processing of your personal information for profiling or direct marketing',
                  'Withdrawing Consent: Withdraw your consent at any time, free of charge',
                ]}
              />
            </SubSection>
          </Section>

          <Section title="11. Other important details">
            <SubSection title="11.1 Privacy Collection Statement">
              <p>
                Under the Privacy Act and GDPR, we are required to make you
                aware of certain matters. This Privacy Policy is our Privacy
                Collection Statement, addressing our identity, purposes of
                collection, consequences if information is not collected,
                entities to which information is disclosed, and information
                about access and correction.
              </p>
            </SubSection>
            <SubSection title="11.2 Third-party links">
              <p>
                Our website may contain links to other websites operated by
                third parties. We make no representations or warranties in
                relation to the privacy practices of any third party website and
                we are not responsible for the privacy policies or the content
                of any third party website.
              </p>
            </SubSection>
            <SubSection title="11.3 Updates to this policy">
              <p>
                This Privacy Policy may be updated from time to time. Updated
                versions will be published on our website and will apply to all
                information held by Strategia.
              </p>
            </SubSection>
          </Section>
        </div>
      </main>

      <footer className="border-t border-white/12 bg-[#012236] py-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Strategia Technology Partners Pty
            Limited. All rights reserved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-[linear-gradient(135deg,#00C6C1_0%,#5CC8E8_100%)] px-6 py-2.5 text-sm font-semibold !text-[#012236] shadow-[0_16px_34px_-18px_rgba(92,200,232,0.95)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-18px_rgba(92,200,232,1)]"
          >
            Return to Home
          </Link>
        </div>
      </footer>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-white/15 bg-white/[0.075] p-8 shadow-[0_28px_70px_-45px_rgba(0,0,0,0.75)] backdrop-blur-sm">
      <h2 className="mb-6 font-serif text-xl !text-white">{title}</h2>
      <div className="space-y-4 leading-relaxed text-white/86">{children}</div>
    </section>
  )
}

function SubSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold !text-[#A5DCD0]">{title}</h3>
      <div className="space-y-2 text-sm">{children}</div>
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="ml-4 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[linear-gradient(135deg,#00C6C1,#5CC8E8)]" />
          <span className="text-sm">{item}</span>
        </li>
      ))}
    </ul>
  )
}
