import { assetPath } from '@/lib/sitePath'

const TEAM_MEMBERS = [
  {
    name: 'James Scott',
    role: 'Group Chief Executive Officer',
    image: 'james-scott-linkedin.jpeg',
    photoClass: 'vx-team-photo--james',
    biography: [
      'James Scott is a global workforce executive with more than 25 years of experience across healthcare staffing, workforce technology, executive leadership and international business growth.',
      'His career has spanned Australia, New Zealand, the United Kingdom, the United States and Canada, with much of that time spent selling, configuring and deploying the technology hospitals use to source, book and pay clinical staff.',
      'At Pulse, James built the Allied Health division into the UK’s largest managed service provider in its field at the time, supporting 120 NHS Trusts. He later repeated elements of that model at DRC Locums and MSI Group, where he led the design and deployment of i-Engage, a proprietary procure-to-pay platform for NHS clients.',
      'As Managing Director, Australasia for Medacs Global Group, James led four brands, including Litmus, before later serving as CEO of HealthX Australia.',
      'As Group CEO of Lateralus Group, James leads the execution, commercial growth and international scaling of Strategia and the broader group.',
    ],
  },
  {
    name: 'Michael Murray',
    role: 'Founder & Executive Chairman',
    image: 'michael-murray-no-tie-draft.png',
    photoClass: 'vx-team-photo--michael',
    biography: [
      'Michael Murray is an entrepreneur and workforce technology founder whose career has spanned global consulting, financial services, healthcare and enterprise workforce strategy.',
      'He began his career working across major organisations including Accenture, KPMG and Credit Suisse, before co-founding Litmus Solutions, a healthcare workforce SaaS platform. Litmus was subsequently acquired by Medacs Global Group, one of the UK’s largest healthcare workforce organisations and part of Impellam Group plc, a publicly listed global workforce and specialist recruitment group. The platform continues to support healthcare organisations internationally.',
      'Michael later founded C-Suite Partners, building the business across Australia, Asia and the Middle East and advising Boards, CEOs and executive teams on leadership and workforce strategy.',
      'That experience became the foundation for Strategia — bringing together AI, behavioural science and workforce intelligence to help enterprises better understand, assess and deploy their people.',
      'Michael now leads strategy, enterprise relationships and international growth across Lateralus Group.',
    ],
  },
  {
    name: 'Johny Mair',
    role: 'Co-Founder & Strategic Advisor',
    image: 'johnny-whatsapp.jpeg',
    photoClass: 'vx-team-photo--johnny',
    biography: [
      'Johny Mair is a New York-based technology entrepreneur, product leader and co-founder of Ethic, a technology-driven investment platform that has scaled from startup to a major institutional business managing billions of dollars in client assets.',
      'Johny has helped shape Ethic’s product, technology, strategy and governance as the company has grown and attracted more than US$160 million in institutional capital from investors including State Street Global Advisors, Fidelity Investments, UBS, Oak HC/FT, Nyca Partners and Jordan Park Group.',
      'Before Ethic, Johny built and led technology products across multiple markets and worked with organisations including Goldman Sachs, J.P. Morgan, BlackRock, Fidelity and Deutsche Bank.',
      'His experience spans enterprise technology, product architecture, institutional partnerships, venture financing and the commercialisation of technology in highly regulated environments.',
      'At Strategia, Johny brings direct experience in building enterprise-grade technology, attracting institutional capital and scaling a sophisticated technology platform globally.',
    ],
  },
] as const

export default function V27TeamSection() {
  return (
    <section className="v25-section v25-section--light vx-team-section" id="team" aria-labelledby="vx-team-heading">
      <div className="v25-section-inner v25-reveal">
        <h2 className="v25-h2" id="vx-team-heading">
          Leadership Behind <span className="accent accent--teal">Strategia</span>
        </h2>
        <p className="vx-team-subtitle">
          A founding and executive team with deep experience across workforce strategy, healthcare, enterprise technology and company building.
        </p>
        <p className="vx-team-intro">
          Strategia brings together leaders who have spent their careers working inside the problems the platform is designed to solve — across global consulting, healthcare workforce technology, executive leadership, institutional capital and international business growth.
        </p>

        <div className="vx-team-grid">
          {TEAM_MEMBERS.map((person) => (
            <article className="vx-team-member" key={person.name}>
              {/* Static GitHub Pages export uses the original team portraits. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`vx-team-photo ${person.photoClass}`}
                src={assetPath(`/v27/team/${person.image}`)}
                alt={`Portrait of ${person.name}`}
                loading="lazy"
                decoding="async"
              />
              <h3>{person.name}</h3>
              <p className="vx-team-role">{person.role}</p>
              <p className="vx-team-bio-lead">{person.biography[0]}</p>
              <details className="vx-team-bio">
                <summary>
                  <span className="vx-team-bio-read">Read full biography: {person.name}</span>
                  <span className="vx-team-bio-hide">Hide biography: {person.name}</span>
                </summary>
                <div className="vx-team-bio-content">
                  {person.biography.slice(1).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </details>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
