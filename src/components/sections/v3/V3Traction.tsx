const cohorts = [
  { tag: 'First', operators: 'King\u2019s College Hospital Dubai \u00B7 Kuok Group', reach: '~26K', region: 'UAE \u00B7 APAC' },
  { tag: 'Second', operators: 'PureHealth \u00B7 Swire \u00B7 IHH \u00B7 Aster \u00B7 VAMED', reach: '~170K', region: 'Global' },
  { tag: 'Third', operators: 'St John of God \u00B7 Icon Group', reach: '~20K', region: 'AU \u00B7 NZ' },
  { tag: 'Fourth', operators: 'Fakeeh \u00B7 KPJ \u00B7 Sunway \u00B7 Metro Pacific \u00B7 AC Health', reach: '~45K+', region: 'APAC' },
]

export default function V3Traction() {
  return (
    <section className="v3-section">
      <div className="v3-section-label">Traction</div>
      <h2 className="v3-section-title">
        Enterprise pipeline across <em>four cohorts.</em>
      </h2>

      <div className="v3-trac-stats">
        <div>
          <div className="v3-big-stat">260K+</div>
          <div className="v3-big-stat-lbl">
            Addressable staff across current pipeline. 3-year contract terms
            standard.
          </div>
        </div>
        <div>
          <div className="v3-big-stat">5</div>
          <div className="v3-big-stat-lbl">
            Continents with active enterprise engagement. Middle East, APAC, ANZ,
            Europe, North America.
          </div>
        </div>
      </div>

      <table className="v3-client-table">
        <thead>
          <tr>
            <th>Cohort</th>
            <th>Representative Operators</th>
            <th>Staff Reach</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {cohorts.map((c) => (
            <tr key={c.tag}>
              <td>
                <span className="v3-cohort-tag">{c.tag}</span>
              </td>
              <td>{c.operators}</td>
              <td>{c.reach}</td>
              <td>{c.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
