'use client'

import { useState } from 'react'

function fmt(n: number): string {
  if (Math.abs(n) >= 1_000_000) {
    return '$' + (n / 1_000_000).toFixed(2) + 'M'
  }
  if (Math.abs(n) >= 1_000) {
    return '$' + Math.round(n / 1_000) + 'K'
  }
  return '$' + Math.round(n).toLocaleString()
}

export default function V3RoiCalculator() {
  const [ftes, setFtes] = useState(3500)
  const [turnover, setTurnover] = useState(21)
  const [replacementCost, setReplacementCost] = useState(58000)

  const current = ftes * (turnover / 100) * replacementCost
  const newCost = current * 0.74
  const platformCost = Math.max(250_000, ftes * 700)
  const net = current - newCost - platformCost

  const bigValue =
    net >= 1_000_000
      ? (net / 1_000_000).toFixed(2) + 'M'
      : Math.round(net / 1_000) + 'K'

  return (
    <section className="v3-roi" id="roi">
      <div className="v3-section-label">ROI Calculator</div>
      <h2 className="v3-section-title">
        See the savings <em>for your system.</em>
      </h2>
      <p className="v3-section-sub">
        Plug in three numbers and see what a 26% reduction in avoidable
        attrition could mean for your bottom line.
      </p>

      <div className="v3-roi-card">
        <div className="v3-roi-left">
          <h3>Model it for your organisation.</h3>
          <p>Three inputs. Conservative assumptions. A number you can take to your CFO.</p>

          <div className="v3-roi-input-group">
            <div className="v3-roi-input-row">
              <div className="v3-roi-input-label">
                <span className="k">Total Employees</span>
                <span className="hint">Full-time equivalents</span>
              </div>
              <input
                type="range"
                min={200}
                max={20000}
                step={100}
                value={ftes}
                onChange={(e) => setFtes(Number(e.target.value))}
              />
              <span className="v3-roi-value">{ftes.toLocaleString()}</span>
            </div>

            <div className="v3-roi-input-row">
              <div className="v3-roi-input-label">
                <span className="k">Annual turnover</span>
                <span className="hint">Percentage</span>
              </div>
              <input
                type="range"
                min={8}
                max={40}
                step={0.5}
                value={turnover}
                onChange={(e) => setTurnover(Number(e.target.value))}
              />
              <span className="v3-roi-value">{turnover}%</span>
            </div>

            <div className="v3-roi-input-row">
              <div className="v3-roi-input-label">
                <span className="k">Replacement cost</span>
                <span className="hint">Per employee</span>
              </div>
              <input
                type="range"
                min={30000}
                max={150000}
                step={1000}
                value={replacementCost}
                onChange={(e) => setReplacementCost(Number(e.target.value))}
              />
              <span className="v3-roi-value">
                ${(replacementCost / 1000).toFixed(0)}K
              </span>
            </div>
          </div>
        </div>

        <div className="v3-roi-output">
          <div className="v3-roi-output-label">
            Projected annual savings with Strategia
          </div>
          <div className="v3-roi-output-value">
            <span className="dollar">$</span>
            {bigValue}
          </div>
          <p className="v3-roi-output-sub">
            Based on a 26% reduction in avoidable attrition across comparable
            systems.
          </p>

          <div className="v3-roi-breakdown">
            <div className="v3-roi-bd-row">
              <span className="k">Current attrition cost</span>
              <span className="v">{fmt(current)}</span>
            </div>
            <div className="v3-roi-bd-row">
              <span className="k">Attrition with Strategia</span>
              <span className="v">{fmt(newCost)}</span>
            </div>
            <div className="v3-roi-bd-row">
              <span className="k">Platform cost (est.)</span>
              <span className="v">{fmt(platformCost)}</span>
            </div>
            <div className="v3-roi-bd-row" style={{ color: 'var(--lemon)' }}>
              <span className="k" style={{ color: 'var(--lemon)' }}>
                Net benefit (Yr 1)
              </span>
              <span className="v" style={{ color: 'var(--lemon)' }}>
                {fmt(net)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
