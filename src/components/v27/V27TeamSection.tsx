import { assetPath } from '@/lib/sitePath'

const TEAM_MEMBERS = [
  {
    name: 'James Scott',
    role: 'Group Chief Executive Officer',
    image: 'james-scott-linkedin.jpeg',
    biography: [
      'James Scott is a global workforce executive with more than 25 years of experience across healthcare staffing, workforce technology, executive leadership and international business growth.',
      'His career has spanned Australia, New Zealand, the United Kingdom, the United States and Canada, with much of that time spent selling, configuring and deploying the technology hospitals use to source, book and pay clinical staff.',
      'James built an Allied Health division into the UK’s largest managed service provider in its field at the time, supporting 120 NHS Trusts. He later repeated elements of that model at two further businesses, where he led the design and deployment of a proprietary procure-to-pay platform for NHS clients.',
      'As Managing Director, Australasia for a global healthcare workforce group, James led four brands before later serving as CEO of an Australian business.',
      'As Group CEO, James leads the execution, commercial growth and international scaling of Strategia and the broader group.',
    ],
  },
  {
    name: 'Michael Murray',
    role: 'Founder & Executive Chairman',
    image: 'michael-murray-no-tie-draft.png',
    biography: [
      'Michael Murray is an entrepreneur and workforce technology founder whose career has spanned global consulting, financial services, healthcare and enterprise workforce strategy.',
      'He began his career working across major global consulting and financial services organisations, before co-founding a healthcare workforce SaaS platform. The platform was subsequently acquired by one of the UK’s largest healthcare workforce organisations, part of a publicly listed global workforce and specialist recruitment group, and continues to support healthcare organisations internationally.',
      'Michael later founded an executive search and leadership advisory firm, building the business across Australia, Asia and the Middle East and advising Boards, CEOs and executive teams on leadership and workforce strategy.',
      'That experience became the foundation for Strategia — bringing together AI, behavioural science and workforce intelligence to help enterprises better understand, assess and deploy their people.',
      'Michael now leads strategy, enterprise relationships and international growth across Strategia and the broader group.',
    ],
  },
  {
    name: 'David Taylor',
    role: 'Group Managing Director',
    image: 'david-taylor.jpeg',
    biography: [
      'David Taylor is an international workforce executive with more than 25 years of experience scaling workforce, managed services and technology-enabled businesses across the Middle East, the United Kingdom, Europe, APAC and Africa.',
      'His career includes senior leadership roles with global workforce groups, alongside deep experience supporting healthcare and workforce transformation across complex international environments.',
      'David’s strength is turning strategy, people, systems and technology into commercial outcomes across multiple markets.',
      'As Group Managing Director, David supports international growth, enterprise delivery and operating execution across Strategia and the broader group, with a focus on regional growth, enterprise partnerships and the practical application of technology and AI across workforce systems.',
    ],
  },
  {
    name: 'Johny Mair',
    role: 'Executive Strategic Advisor',
    image: 'johnny-whatsapp.jpeg',
    biography: [
      'Johny Mair is a New York-based technology entrepreneur, product leader and co-founder of a technology-driven investment platform that has scaled from startup to a major institutional business managing billions of dollars in client assets.',
      'Johny has helped shape the company’s product, technology, strategy and governance as it has grown and attracted more than US$160 million in institutional capital.',
      'Before this, Johny built and led technology products across multiple markets and worked with major global financial institutions.',
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
                className={`vx-team-photo${person.name === 'Johny Mair' ? ' vx-team-photo--johnny' : ''}`}
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
