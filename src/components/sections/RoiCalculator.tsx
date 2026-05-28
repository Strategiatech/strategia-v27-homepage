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

export default function RoiCalculator() {
  const [ftes, setFtes] = useState(3500)
  const [turnover, setTurnover] = useState(21)
  const [replacementCost, setReplacementCost] = useState(58000)

  const current = ftes * (turnover / 100) * replacementCost
  const newCost = current * 0.74
  const platformCost = Math.max(250_000, ftes * 700)
  const net = current - newCost - platformCost

  const bigValue = net >= 1_000_000
    ? (net / 1_000_000).toFixed(2) + 'M'
    : Math.round(net / 1_000) + 'K'

  return (
    <section className="section roi-section" id="roi">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
          <span className="eyebrow">
            <span className="eb-dot" />
            ROI calculator
          </span>
          <h2 className="section-title" style={{ margin: '0 auto 16px' }}>
            See the savings for your system.
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Plug in three numbers and see what a 26% reduction in avoidable attrition
            could mean for your bottom line.
          </p>
        </div>

        <div className="roi-card">
          {/* Left: inputs */}
          <div className="roi-left">
            <h2>Model it for your organisation.</h2>
            <p>
              Three inputs. Conservative assumptions. A number you can take to your CFO.
            </p>

            <div className="roi-input-group">
              <div className="roi-input-row">
                <div className="roi-input-label">
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
                <span className="roi-value">{ftes.toLocaleString()}</span>
              </div>

              <div className="roi-input-row">
                <div className="roi-input-label">
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
                <span className="roi-value">{turnover}%</span>
              </div>

              <div className="roi-input-row">
                <div className="roi-input-label">
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
                <span className="roi-value">${(replacementCost / 1000).toFixed(0)}K</span>
              </div>
            </div>
          </div>

          {/* Right: output */}
          <div className="roi-output">
            <div className="roi-output-label">Projected annual savings with Strategia</div>
            <div className="roi-output-value">
              <span className="dollar">$</span>{bigValue}
            </div>
            <p className="roi-output-sub">
              Based on a 26% reduction in avoidable attrition across comparable systems.
            </p>

            <div className="roi-breakdown">
              <div className="roi-bd-row">
                <span className="k">Current attrition cost</span>
                <span className="v">{fmt(current)}</span>
              </div>
              <div className="roi-bd-row">
                <span className="k">Attrition with Strategia</span>
                <span className="v">{fmt(newCost)}</span>
              </div>
              <div className="roi-bd-row">
                <span className="k">Platform cost (est.)</span>
                <span className="v">{fmt(platformCost)}</span>
              </div>
              <div className="roi-bd-row" style={{ color: 'var(--lemon)' }}>
                <span className="k" style={{ color: 'var(--lemon)' }}>Net benefit (Yr 1)</span>
                <span className="v" style={{ color: 'var(--lemon)' }}>{fmt(net)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
