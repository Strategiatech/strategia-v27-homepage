'use client'

/* ============================================================================
   STRATEGIA — REGION-AWARE ROI CALCULATOR  (homepage section)
   ----------------------------------------------------------------------------
   Ported from the standalone StrategiaROICalculator mockup. Logic is preserved
   verbatim; the palette and fonts are remapped onto the v27 design tokens so
   the section blends with the rest of the page. It lives inside a
   `.v25-section--light` band (#ECEDEB), so any text that sits on the light
   surface uses the design system's accessible Cobalt-tinted accents
   (#005072 / #006D6A / #1F6A47) rather than the dark-surface Teal/Lime.
   Conservative by design. Freed recruiter capacity is framed as time
   redirected to higher-value work — never headcount reduction.
   ========================================================================== */

import { memo, useEffect, useMemo, useRef, useState } from 'react'

const C = {
  white: '#FFFFFF',
  abyss: 'var(--v25-abyss, #012236)',
  abyss2: '#013a5c',
  cobalt: 'var(--v25-cobalt, #005072)',
  teal: 'var(--v25-accent, #00C6C1)', // dark-surface / decorative accent
  sky: 'var(--v25-sky, #5CC8E8)',
  lime: 'var(--v25-lime, #A1E2B7)', // dark-surface accent
  line: 'rgba(1,34,54,0.14)',
  muted: 'rgba(1,34,54,0.62)',
}
const HD = "var(--font-display, 'Literata', Georgia, serif)"
const SUB = "var(--font-tight, var(--font-inter-tight), ui-sans-serif, system-ui, sans-serif)"
const BD = "var(--font-sans, ui-sans-serif, system-ui, sans-serif)"

/* --- Regional benchmark table (USD, directional, editable) ---------------- */
type Region = { label: string; sal: number; cph: number; ttf: number; attr: number; note: string }
const REGIONS: Record<string, Region> = {
  global: { label: 'Global averages', sal: 70000, cph: 5000, ttf: 45, attr: 15,
    note: "Blended global averages — all-in cost-per-hire ~US$5,000 (SHRM); time-to-fill ~45 days median (SHRM 2025; ~54 days in 2022); voluntary turnover ~15% (Mercer; all-cause churn nearer 20% per Work Institute)." },
  uk: { label: 'United Kingdom', sal: 78000, cph: 7800, ttf: 44, attr: 15,
    note: "UK employer-reported labour turnover ~15% (CIPD); recruitment cost ≈ £6,125/hire (CIPD); time-to-fill ~44 days (slower than the US per SmartRecruiters' 5-market study)." },
  europe: { label: 'Europe', sal: 80000, cph: 6500, ttf: 47, attr: 12,
    note: "Voluntary turnover ~10–14% across European markets (Mercer Comptryx); time-to-fill ~45–50 days (France/Germany slower than the US, SmartRecruiters)." },
  me: { label: 'Middle East', sal: 65000, cph: 6000, ttf: 50, attr: 14,
    note: "Voluntary turnover ~12–16% across the wider Middle East / Gulf (Mercer, Hays); longer time-to-fill (~50 days) for visa-sponsored and specialist roles." },
  sa: { label: 'South Asia', sal: 22000, cph: 3000, ttf: 48, attr: 17,
    note: "Regional attrition ~16–18% (Deloitte, Aon talent surveys); time-to-fill ~45–50 days; lower loaded salaries and higher churn than mature markets." },
  sea: { label: 'Southeast Asia', sal: 30000, cph: 3500, ttf: 46, attr: 13,
    note: "Voluntary attrition ~10–15% across ASEAN markets (Mercer Asia); time-to-fill ~45–48 days." },
  anz: { label: 'Australasia', sal: 85000, cph: 7500, ttf: 46, attr: 16,
    note: "Total turnover ~16% across the region (AHRI); time-to-fill ~46 days (slower than the US per SmartRecruiters); voluntary ~10–11% (Mercer)." },
  na: { label: 'North America', sal: 95000, cph: 5500, ttf: 40, attr: 16,
    note: "Voluntary turnover ~13–16% across North America (Mercer); time-to-fill ~35–44 days (fastest region — SmartRecruiters 35d median, SHRM ~44d); all-in cost-per-hire ~US$5,500 (SHRM)." },
}

/* --- Conservative impact scenarios (NOT over-promised) -------------------- */
type Scenario = { l: string; d: string; screen: number; ttf: number; turn: number }
const SCENARIOS: Record<string, Scenario> = {
  conservative: { l: 'Conservative', d: 'Lower-bound, defensible', screen: 30, ttf: 15, turn: 10 },
  moderate: { l: 'Base Case', d: 'Expected platform impact', screen: 50, ttf: 30, turn: 20 },
  ambitious: { l: 'Ambitious', d: 'Full platform adoption', screen: 65, ttf: 40, turn: 30 },
}

/* --- Fixed, documented model constants ------------------------------------ */
const K = { workingDays: 260, vacancyShare: 0.50, badHirePct: 0.30, earlyOfAttr: 0.50, labourShare: 0.55, blendedHrs: 40, automatable: 0.65, fteHrs: 1840 }

const big = (n: number): string => n >= 1e6 ? (n / 1e6).toFixed(2) + 'm' : n >= 1e3 ? Math.round(n / 1e3) + 'k' : Math.round(n).toString()
const usd = (n: number): string => n >= 1e6 ? 'USD$' + (n / 1e6).toFixed(2) + 'm' : n >= 1e3 ? 'USD$' + Math.round(n / 1e3) + 'k' : 'USD$' + Math.round(n).toLocaleString()
const num = (n: number): string => Math.round(n).toLocaleString()

/* --- count-up hook (no external lib) -------------------------------------- */
function useCountUp(target: number, duration = 600): number {
  const [val, setVal] = useState(target)
  const ref = useRef(target)
  useEffect(() => {
    const start = ref.current
    const delta = target - start
    const t0 = performance.now()
    let raf: number
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3) // easeOutCubic
      const cur = start + delta * e
      ref.current = cur
      setVal(cur)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return val
}

/* Isolated count-up text. Keeping the per-frame setState inside this tiny
   component means the animation only re-renders this text node — not the six
   sliders, constellation, and stats — so dragging a slider stays smooth. */
function CountUpText({ target }: { target: number }) {
  return <>{big(useCountUp(target))}</>
}

/* --- Slider ---------------------------------------------------------------- */
type SldProps = { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; display: string; hint?: string }
// Memoized: while one slider is being dragged, the other five have unchanged
// props and skip re-rendering, keeping the drag responsive.
const Sld = memo(function Sld({ label, value, min, max, step = 1, onChange, display, hint }: SldProps) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div style={{ marginBottom: 24, paddingBottom: 18, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 11 }}>
        <span style={{ fontFamily: SUB, fontWeight: 700, fontSize: 15.5, color: C.abyss }}>{label}</span>
        <span style={{ fontFamily: SUB, fontWeight: 700, fontSize: 18, color: C.cobalt }}>{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', height: 3, appearance: 'none', WebkitAppearance: 'none', borderRadius: 2,
          background: `linear-gradient(90deg, ${C.teal} 0%, ${C.cobalt} ${pct}%, ${C.line} ${pct}%, ${C.line} 100%)`, outline: 'none', cursor: 'pointer' }} />
      {hint && <div style={{ fontFamily: BD, fontSize: 11, color: C.muted, marginTop: 9 }}>{hint}</div>}
    </div>
  )
})
function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ flex: '1 1 0', minWidth: 84 }}>
      <div style={{ fontFamily: HD, fontWeight: 500, fontSize: 25, color: C.white, lineHeight: 1.05 }}>{value}</div>
      <div style={{ fontFamily: SUB, fontWeight: 700, fontSize: 10, letterSpacing: '0.07em', textTransform: 'uppercase', color: C.teal, marginTop: 6 }}>{label}</div>
      {sub && <div style={{ fontFamily: BD, fontSize: 10.5, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>{sub}</div>}
    </div>
  )
}

/* --- Composition ring centerpiece ----------------------------------------- */
type CompSeg = { k: string; v: number; w: number; c: string }
function Ring({ comp, target }: { comp: CompSeg[]; target: number }) {
  const size = 248, stroke = 19, r = (size - stroke) / 2, Cc = 2 * Math.PI * r, cx = size / 2, cy = size / 2, gap = 16
  const lens = comp.map((s) => (s.w / 100) * Cc)
  const arcs = comp.map((s, i) => {
    const offset = lens.slice(0, i).reduce((acc, l) => acc + l, 0)
    return { len: Math.max(lens[i] - gap, 0.001), off: -offset, c: s.c }
  })
  // Shrink the headline figure as it gets longer so it (and the USD$ prefix)
  // always fit inside the ring instead of overlapping. Sized from the final
  // target so the font doesn't jiggle while the count-up animates.
  const savFont = big(target).length >= 8 ? 30 : big(target).length >= 7 ? 34 : big(target).length >= 6 ? 40 : big(target).length >= 5 ? 46 : 52
  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* dark separator ring sits just under the bands so gaps read as channels */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(1,34,54,0.85)" strokeWidth={stroke + 4} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={stroke} />
        {arcs.map((a, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={a.c} strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={`${a.len} ${Cc - a.len}`} strokeDashoffset={a.off}
            style={{ transition: 'stroke-dasharray .55s ease, stroke-dashoffset .55s ease' }} />
        ))}
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 22px' }}>
        <div style={{ fontFamily: SUB, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>Annual savings</div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 3, lineHeight: 1, whiteSpace: 'nowrap' }}>
          <span style={{ fontFamily: SUB, fontWeight: 700, fontSize: 16, color: C.teal }}>USD$</span>
          <span style={{ fontFamily: HD, fontWeight: 500, fontSize: savFont, color: C.white, textShadow: '0 0 30px rgba(0,198,193,0.5)' }}><CountUpText target={target} /></span>
        </div>
      </div>
    </div>
  )
}

/* Static decorative backdrop — hoisted to a stable element reference so React
   skips reconciling it on every slider input event. */
const CONSTELLATION = (
  <svg viewBox="0 0 460 520" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.32, pointerEvents: 'none' }}>
    <g stroke="rgba(92,200,232,0.18)" strokeWidth="0.7">
      <line x1="40" y1="60" x2="150" y2="120" /><line x1="150" y1="120" x2="120" y2="240" />
      <line x1="380" y1="80" x2="300" y2="180" /><line x1="300" y1="180" x2="410" y2="260" />
      <line x1="60" y1="420" x2="180" y2="380" /><line x1="180" y1="380" x2="120" y2="240" />
      <line x1="410" y1="260" x2="360" y2="420" /><line x1="300" y1="180" x2="150" y2="120" />
    </g>
    {[[40, 60], [150, 120], [120, 240], [380, 80], [300, 180], [410, 260], [60, 420], [180, 380], [360, 420]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.6 : 1.8} fill="rgba(160,226,183,0.6)" style={{ animation: `vxroi-pulse ${3 + i % 4}s ease-in-out ${i * 0.3}s infinite` }} />
    ))}
  </svg>
)

export default function VxRoiCalculator() {
  const [region, setRegion] = useState('global')
  const [scenario, setScenario] = useState('conservative')

  const [annH, setAnnH] = useState(1000)
  const [sal, setSal] = useState(REGIONS.global.sal)
  const [cph, setCph] = useState(REGIONS.global.cph)
  const [ttf, setTtf] = useState(REGIONS.global.ttf)
  const [attr, setAttr] = useState(REGIONS.global.attr)
  const [growth, setGrowth] = useState(5)

  const applyRegion = (key: string) => {
    setRegion(key)
    const rg = REGIONS[key]
    setSal(rg.sal)
    setCph(rg.cph)
    setTtf(rg.ttf)
    setAttr(rg.attr)
  }

  const sc = SCENARIOS[scenario]

  const m = useMemo(() => {
    const dailyValue = sal / K.workingDays
    const vacancyCost = annH * ttf * dailyValue * K.vacancyShare
    const recruitmentCost = annH * cph
    const regrettableHires = annH * (attr / 100) * K.earlyOfAttr
    const regrettableCost = regrettableHires * sal * K.badHirePct
    const totalCurrent = recruitmentCost + vacancyCost + regrettableCost
    const screenSav = recruitmentCost * K.labourShare * (sc.screen / 100)
    const ttfSav = vacancyCost * (sc.ttf / 100)
    const turnSav = regrettableCost * (sc.turn / 100)
    const totalSav = screenSav + ttfSav + turnSav
    const hoursReclaimed = annH * K.blendedHrs * K.automatable * (sc.screen / 100)
    const ftes = hoursReclaimed / K.fteHrs
    const newTtf = ttf * (1 - sc.ttf / 100)
    const savPct = totalCurrent > 0 ? (totalSav / totalCurrent) * 100 : 0
    const g = growth / 100
    const threeYear = totalSav + totalSav * (1 + g) + totalSav * (1 + g) * (1 + g)
    const ts = totalSav || 1
    const comp: CompSeg[] = [
      { k: 'Recruiter time reclaimed', v: screenSav, w: (screenSav / ts) * 100, c: C.teal },
      { k: 'Faster time-to-fill', v: ttfSav, w: (ttfSav / ts) * 100, c: C.sky },
      { k: 'Fewer regrettable hires', v: turnSav, w: (turnSav / ts) * 100, c: C.lime },
    ]
    return { dailyValue, vacancyCost, recruitmentCost, regrettableHires, regrettableCost, totalCurrent, screenSav, ttfSav, turnSav, totalSav, hoursReclaimed, ftes, newTtf, savPct, threeYear, comp }
  }, [annH, sal, cph, ttf, attr, growth, sc])

  return (
    <div className="vxroi" style={{ fontFamily: BD, color: C.abyss }}>
      {/* eyebrow + headline — reuse the page's section header classes */}
      <div className="v25-eyebrow">ROI calculator</div>
      <h2 className="v25-h2">
        See the savings for <span className="accent accent--teal">your&nbsp;system.</span>
      </h2>
      <p className="v25-desc" style={{ marginBottom: 30 }}>
        Five inputs. Conservative assumptions. A number you can take to your&nbsp;CFO.
      </p>

      {/* controls */}
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 14 }}>
        <div style={{ flex: '1 1 260px', minWidth: 230 }}>
          <label style={{ display: 'block', fontFamily: SUB, fontWeight: 700, fontSize: 12, letterSpacing: '0.06em', color: C.abyss, marginBottom: 9 }}>REGION</label>
          <select value={region} onChange={(e) => applyRegion(e.target.value)}
            style={{ width: '100%', padding: '13px 16px', fontSize: 15.5, fontFamily: SUB, fontWeight: 700, color: C.abyss, backgroundColor: C.white, border: `1.5px solid ${C.teal}`, borderRadius: 8, cursor: 'pointer', appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8'%3E%3Cpath d='M1 1l6 6 6-6' stroke='%23012236' stroke-width='2' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}>
            {Object.entries(REGIONS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
        <div style={{ flex: '1 1 320px', minWidth: 280 }}>
          <label style={{ display: 'block', fontFamily: SUB, fontWeight: 700, fontSize: 12, letterSpacing: '0.06em', color: C.abyss, marginBottom: 9 }}>STRATEGIA IMPACT</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {Object.entries(SCENARIOS).map(([k, v]) => (
              <button key={k} onClick={() => setScenario(k)} title={v.d}
                style={{ flex: 1, padding: '12px 6px', fontFamily: SUB, fontWeight: 700, fontSize: 13, cursor: 'pointer', borderRadius: 7, transition: 'all .15s',
                  border: `1.5px solid ${scenario === k ? C.teal : C.line}`, background: scenario === k ? C.teal : C.white, color: scenario === k ? C.abyss : C.muted }}>{v.l}</button>
            ))}
          </div>
        </div>
      </div>

      {/* main grid */}
      <div className="vxroi-grid2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.92fr) minmax(0,1.08fr)', gap: 48, alignItems: 'start' }}>

        {/* LEFT — inputs */}
        <div>
          <Sld label="Annual hires" value={annH} min={50} max={10000} step={10} onChange={setAnnH} display={num(annH)} hint="Total roles filled per year" />
          <Sld label="Average loaded salary per hire" value={sal} min={15000} max={250000} step={1000} onChange={setSal} display={usd(sal)} />
          <Sld label="Average cost-per-hire (today)" value={cph} min={1000} max={30000} step={100} onChange={setCph} display={'USD$' + num(cph)} />
          <Sld label="Average time-to-fill (days)" value={ttf} min={10} max={120} step={1} onChange={setTtf} display={ttf + ' days'} />
          <Sld label="Annual attrition rate" value={attr} min={3} max={40} step={1} onChange={setAttr} display={attr + '%'} />
          <Sld label="Annual headcount growth" value={growth} min={-10} max={40} step={1} onChange={setGrowth} display={(growth > 0 ? '+' : '') + growth + '%'} />
        </div>

        {/* RIGHT — dark glowing result panel */}
        <div style={{ background: `linear-gradient(155deg, ${C.abyss} 0%, ${C.abyss2} 100%)`, borderRadius: 22, padding: '38px 36px 32px', boxShadow: '0 34px 80px -30px rgba(1,34,54,0.6)', position: 'relative', overflow: 'hidden' }}>
          {/* constellation backdrop */}
          {CONSTELLATION}
          {/* glow */}
          <div style={{ position: 'absolute', top: -90, right: -70, width: 230, height: 230, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,198,193,0.20), transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative' }}>
            <Ring comp={m.comp} target={m.totalSav} />

            {/* legend */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 16px', marginTop: 20 }}>
              {m.comp.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ width: 9, height: 9, borderRadius: 2, background: s.c, flexShrink: 0 }} />
                  <span style={{ fontFamily: BD, fontSize: 11.5, color: 'rgba(255,255,255,0.62)' }}>{s.k}</span>
                  <span style={{ fontFamily: SUB, fontWeight: 700, fontSize: 11.5, color: C.white }}>{usd(s.v)}</span>
                </div>
              ))}
            </div>

            {/* proof stats */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 22, marginTop: 24 }}>
              <Stat label="Faster time-to-fill" value={`${ttf}→${Math.round(m.newTtf)}d`} />
              <Stat label="Recruiter hours reclaimed" value={`${num(m.hoursReclaimed)} hrs`} sub="per year" />
              <Stat label="3-year value" value={usd(m.threeYear)} sub="incl. growth" />
            </div>

            {/* disclaimer — small muted line under the metric tiles */}
            <div style={{ fontFamily: BD, fontSize: 11.5, lineHeight: 1.5, color: 'rgba(165,220,208,0.55)', borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: 16, marginTop: 20 }}>
              Indicative only, based on inputs and Regional benchmarks. Your tailored report uses your actual hiring data, roles and cost structure - results may differ from what&apos;s shown.
            </div>
          </div>
        </div>
      </div>

      {/* CTA — bright highlight band */}
      <div style={{ marginTop: 34, background: `linear-gradient(135deg, ${C.lime}, ${C.teal})`, borderRadius: 18, padding: '30px 34px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div style={{ flex: '1 1 440px' }}>
          <div style={{ fontFamily: HD, fontWeight: 500, fontSize: 23, color: C.abyss, lineHeight: 1.2, marginBottom: 7 }}>
            These are the averages — we&apos;ll show you yours.
          </div>
          <div style={{ fontFamily: BD, fontSize: 14, color: 'rgba(1,34,54,0.78)', lineHeight: 1.55 }}>
            Get a free, curated ROI report modelled on your actual roles, regions, hiring volumes and cost structure — a clear, organisation-specific view of where the value really sits. Book a short walkthrough to start.
            <span style={{ display: 'block', marginTop: 7, fontSize: 12.5, color: 'rgba(1,34,54,0.55)' }}>
              Prefer email? <a href="mailto:info@strategiatech.ai?subject=Free%20ROI%20Analysis%20Report%20Request" style={{ color: C.cobalt, fontWeight: 600, textDecoration: 'none', borderBottom: `1px solid ${C.cobalt}` }}>info@strategiatech.ai</a>
            </span>
          </div>
        </div>
        <a href="#demo"
          style={{ fontFamily: SUB, fontWeight: 700, fontSize: 14.5, color: C.white, background: C.abyss, padding: '15px 28px', borderRadius: 10, textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Get my tailored report →
        </a>
      </div>

      <style>{`
        @keyframes vxroi-pulse { 0%,100%{opacity:0.35;} 50%{opacity:0.9;} }
        .vxroi input[type=range]::-webkit-slider-thumb{ -webkit-appearance:none; width:24px; height:22px; border:none; background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 22'%3E%3Cpolygon points='12,2.5 21.5,19.5 2.5,19.5' fill='%23FFFFFF' stroke='%2300C6C1' stroke-width='3' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center/contain; cursor:pointer; margin-top:-9px; filter:drop-shadow(0 2px 4px rgba(0,198,193,0.45)); }
        .vxroi input[type=range]::-moz-range-thumb{ width:24px; height:22px; border:none; background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 22'%3E%3Cpolygon points='12,2.5 21.5,19.5 2.5,19.5' fill='%23FFFFFF' stroke='%2300C6C1' stroke-width='3' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center/contain; cursor:pointer; filter:drop-shadow(0 2px 4px rgba(0,198,193,0.45)); }
        .vxroi select:focus{ outline:none; border-color:${C.teal}; }
        @media (max-width: 820px){ .vxroi-grid2{ grid-template-columns:1fr !important; } }
      `}</style>
    </div>
  )
}
