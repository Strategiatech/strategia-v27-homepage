'use client';
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { Turnstile } from "@/components/ui/turnstile";
import { defaultApiAdapter, defaultNotificationAdapter } from "../container";
import { INITIAL_FORM_DATA } from "../constants/questionnaireFormConstants";
import {
  calculateTurnoverRate,
  serializeAdvertisingPlatforms,
  serializeOtherOfficeLocations,
  serializePilotJobDescriptions,
  serializePilotOfficeLocations,
  serializePilotRoles,
  serializeWorkflow,
} from "../utils/questionnaireSerializers";

const REGIONS = [
  "United Kingdom", "Europe", "Middle East", "South Asia",
  "Southeast Asia", "Australasia", "North America",
];

const REGION_CITIES = {
  "United Kingdom": ["London, UK","Manchester, UK","Birmingham, UK","Edinburgh, UK","Glasgow, UK","Leeds, UK","Bristol, UK","Liverpool, UK","Cardiff, UK","Belfast, UK","Newcastle, UK","Aberdeen, UK"],
  "Europe": ["Paris, France","Berlin, Germany","Munich, Germany","Frankfurt, Germany","Amsterdam, Netherlands","Rotterdam, Netherlands","Brussels, Belgium","Zurich, Switzerland","Geneva, Switzerland","Madrid, Spain","Barcelona, Spain","Milan, Italy","Rome, Italy","Lisbon, Portugal","Dublin, Ireland","Copenhagen, Denmark","Stockholm, Sweden","Oslo, Norway","Helsinki, Finland","Vienna, Austria","Warsaw, Poland","Prague, Czech Republic","Athens, Greece","Bucharest, Romania"],
  "Middle East": ["Dubai, UAE","Abu Dhabi, UAE","Riyadh, Saudi Arabia","Jeddah, Saudi Arabia","Doha, Qatar","Muscat, Oman","Kuwait City, Kuwait","Manama, Bahrain","Amman, Jordan","Beirut, Lebanon","Cairo, Egypt","Tel Aviv, Israel"],
  "South Asia": ["Mumbai, India","Delhi, India","Bangalore, India","Hyderabad, India","Chennai, India","Kolkata, India","Pune, India","Ahmedabad, India","Colombo, Sri Lanka","Dhaka, Bangladesh","Karachi, Pakistan","Lahore, Pakistan","Islamabad, Pakistan","Kathmandu, Nepal"],
  "Southeast Asia": ["Singapore, Singapore","Kuala Lumpur, Malaysia","Penang, Malaysia","Johor Bahru, Malaysia","Bangkok, Thailand","Jakarta, Indonesia","Manila, Philippines","Ho Chi Minh City, Vietnam","Hanoi, Vietnam","Phnom Penh, Cambodia","Yangon, Myanmar","Brunei, Brunei"],
  "Australasia": ["Sydney, Australia","Melbourne, Australia","Brisbane, Australia","Perth, Australia","Adelaide, Australia","Canberra, Australia","Gold Coast, Australia","Hobart, Australia","Darwin, Australia","Auckland, New Zealand","Wellington, New Zealand","Christchurch, New Zealand"],
  "North America": ["New York, USA","Los Angeles, USA","Chicago, USA","Houston, USA","San Francisco, USA","Boston, USA","Miami, USA","Dallas, USA","Seattle, USA","Washington D.C., USA","Atlanta, USA","Denver, USA","Toronto, Canada","Vancouver, Canada","Montreal, Canada","Calgary, Canada"],
};

const INDUSTRIES = [
  "Aviation & Airlines", "Banking & Finance", "Healthcare / Medical",
  "Hospitality & Tourism", "Mining & Resources", "Oil & Gas / Energy",
  "Pharmaceuticals & Biotech", "Shipping & Maritime",
];

const CURRENCIES = ["USD","GBP","EUR","AED","AUD","SGD","INR","MYR","SAR","QAR","NZD","CAD","ZAR","PHP","THB"];

const JOB_CATEGORIES = [
  "All","C-Suite / Executives","Operations","Finance","Human Resources",
  "Information Technology","Marketing & Communications","Legal & Risk",
  "Sales & Business Development","Clinical / Medical","Research & Innovation",
  "Customer or Patient Services","Other",
];

const AD_PLATFORMS = [
  "LinkedIn","Indeed","Seek","Monster","ZipRecruiter",
  "Glassdoor","Google for Jobs","JobStreet","JobsDB","Naukri","Bayt",
  "Internal Website / Job Board","Current HRIS Platform","Other",
];

const WORKFLOW_STEPS_DEFAULT = [
  "Job Requisition Approval","Job Description Crafting","Job Advertising Management",
  "Candidate Application / CV Review & Shortlisting","Candidate Interview #1",
  "Candidate Interview #2","Candidate Interview #3",
  "Profile Assessments / Psychometrics","Scenario / Practical Testing",
  "Employment Offer Process","Candidate Onboarding",
];

const PERSONNEL = ["HR / Recruitment Officer","Hiring Manager","Senior Manager","Peer Group Employees"];

const SUCCESS_CRITERIA = [
  "Streamlined Application Screening","Increased Candidate Quality",
  "Increased Candidate Fit (with Organisation)","Reduced Time-to-Hire",
  "Reduction in Agency Spend","Improved Onboarding Insights",
];

const SECTIONS = [
  "Organisation Information","Project Champion","Recruitment Activity",
  "Organisational Insights","Technology & Platforms","Psychometrics & Assessment",
  "Recruitment Workflow","Success Criteria","Platform Setup","Projected Value","Sign-Off",
];

// Workflow card accents — restrained 3-tone rotation
const CARD_ACCENTS = ["#c4956a","#9aab8a","#8a9aab"];

// All values normalised to USD for consistency
const REGION_DATA = {
  "United Kingdom": { cph: 7800, ttf: 42, turnover: 35, agencyFee: 5700, mgtCph: 24200, turnoverCost: 39000, sources: [
    { s: "Avg. cost per hire: $7,800 (£6,125)", src: "CIPD Resourcing & Talent Planning Report" },
    { s: "Management hire: $24,200 (£19,000)", src: "CIPD" },
    { s: "Avg. time-to-fill: 42 days", src: "CIPD / Talent Insight Group UK, 2025" },
    { s: "Annual staff turnover: 35%", src: "CIPD Labour Market Outlook, 2025" },
    { s: "Cost of turnover per employee: $39,000 (£30,614)", src: "Oxford Economics / Unum" },
    { s: "37% of employers report hard-to-fill vacancies", src: "CIPD, 2025" },
  ]},
  "Europe": { cph: 5700, ttf: 48, turnover: 28, agencyFee: 5500, mgtCph: 18000, turnoverCost: 32000, sources: [
    { s: "Avg. cost per hire: ~$5,700 (€5,200)", src: "Bersin by Deloitte, Talent Acquisition Factbook" },
    { s: "Avg. time-to-fill: 48 days", src: "CIPD / Talent Insight Group" },
    { s: "Only 36% of EU orgs use AI in HR (vs 76% US)", src: "McKinsey State of AI, 2025" },
  ]},
  "Middle East": { cph: 14800, ttf: 52, turnover: 22, agencyFee: 18000, mgtCph: 35000, turnoverCost: 45000, sources: [
    { s: "Agency fees in GCC: 8–15% of annual salary", src: "Hays / Robert Half ME Salary Guides, 2025" },
    { s: "Emiratisation target exceeded: 131,000+ nationals in private sector", src: "Barclay Simpson ME Report, 2025" },
    { s: "GCC financial wealth projected to hit $3.5 trillion by 2027", src: "Barclay Simpson, 2025" },
    { s: "56% of ME professionals cite remuneration as #1 job factor", src: "Barclay Simpson, 2025" },
  ]},
  "South Asia": { cph: 1000, ttf: 38, turnover: 20, agencyFee: 1500, mgtCph: 4000, turnoverCost: 8000, sources: [
    { s: "Avg. attrition: ~20%", src: "Mercer Total Remuneration Survey India, 2024" },
    { s: "Significant international demand for skilled professionals creating domestic supply gaps", src: "BIMCO / Mercer" },
  ]},
  "Southeast Asia": { cph: 8000, ttf: 52, turnover: 18, agencyFee: 12000, mgtCph: 15000, turnoverCost: 28000, sources: [
    { s: "Avg. all-in cost per hire: $8,000–$15,000 (incl. manager time)", src: "SHRM 2026; NOW Healthcare 2025" },
    { s: "Avg. time-to-fill: 50–65 days; specialist roles 120–250 days", src: "SHRM HCM 2023; Apploi" },
    { s: "Applications per role: 100–200+ (among highest globally)", src: "CareerPlug 2025; Jobsdb 2024" },
    { s: "Agency dependency: 25–40% of hires; fees 15–25% of salary", src: "Mercer SEA" },
    { s: "Avg. turnover: ~18%; early turnover (<12mo): 15–20%", src: "Mercer SEA Workforce Insights, 2024" },
    { s: "Recruiter time per hire: ~105 hours", src: "Stratus HR 2024; Ashby 2025" },
    { s: "AI adoption in SE Asia recruiting: ~29%", src: "LinkedIn / HCA Magazine, 2025" },
  ]},
  "Australasia": { cph: 4700, ttf: 44, turnover: 25, agencyFee: 5500, mgtCph: 16000, turnoverCost: 28000, sources: [
    { s: "Avg. cost per hire: $4,700 (A$7,200)", src: "AHRI Pulse of HR Survey, 2024" },
    { s: "Avg. time-to-fill: 44 days", src: "SEEK Employment Report, 2025" },
    { s: "Avg. turnover: ~25%", src: "ABS Labour Mobility Survey, 2024" },
  ]},
  "North America": { cph: 4700, ttf: 44, turnover: 24, agencyFee: 6000, mgtCph: 28000, turnoverCost: 36000, sources: [
    { s: "Avg. cost per hire: $4,700", src: "SHRM Talent Acquisition Benchmarking Report, 2025" },
    { s: "Executive CPH: $28,000+ (up 113% since 2017)", src: "SHRM Recruiting Executives Report, Jan 2026" },
    { s: "Avg. time-to-fill: 44 days", src: "SHRM Human Capital Benchmark, 2025" },
    { s: "Only 20% of orgs track quality-of-hire", src: "SHRM Benchmarking Survey, 2025" },
  ]},
};

const INDUSTRY_DATA = {
  "Healthcare / Medical": { cphMult: 1.8, ttfAdd: 15, turnoverAdd: 5, notes: [
    { s: "Healthcare CPH: $9,000–$15,000 per hire (all-in incl. manager time)", src: "SHRM 2026; NOW Healthcare 2025" },
    { s: "Physician/specialist recruitment: $50,000–$250,000 per hire", src: "PracticeMatch, 2024; Advanced Scope" },
    { s: "Clinical fill times: 60–80+ days; specialist roles: 120–250 days", src: "JobTarget Summer 2025; Apploi; SHRM HCM" },
    { s: "First-year nursing turnover: 22.3%", src: "NSI Nursing Solutions Report, 2025" },
    { s: "Every 1% change in RN turnover = ~$289,000/yr per hospital", src: "NSI, 2025; McKinsey Healthcare" },
    { s: "Cost of bad hire: 30–150% of annual salary", src: "SHRM; CareerBuilder" },
    { s: "Recruiter-to-hire ratio: 1:40–65 (credential verification adds overhead)", src: "Deloitte Human Capital Trends" },
    { s: "Agency fees: 15–25% of salary; specialist placements $20,000–$50,000", src: "Mercer; industry benchmarks" },
  ]},
  "Banking & Finance": { cphMult: 1.3, ttfAdd: 5, turnoverAdd: 3, notes: [
    { s: "Banking & Finance CPH: ~$4,323", src: "Factorial HR Benchmark" },
    { s: "57.5% of bank executive transitions are external hires", src: "McDermott + Bull, 2025" },
    { s: "Financial services AI adoption: 76%", src: "Gartner / Second Talent, 2025" },
    { s: "Financial Analyst roles fill in ~15 days; compliance roles significantly longer", src: "GLOZO Banking Report, 2025" },
  ]},
  "Shipping & Maritime": { cphMult: 1.5, ttfAdd: 15, turnoverAdd: 10, notes: [
    { s: "Maritime crew turnover: 20–40%", src: "Quay Group" },
    { s: "Mentorship programs reduce maritime turnover by 15%", src: "CDR General Services, 2025" },
    { s: "Hidden hiring cost per crew placement: $1,400+ in management time alone", src: "Quay Group" },
    { s: "STCW/IMO compliance creates unique credential-verification burden", src: "IMO / Martide" },
  ]},
  "Aviation & Airlines": { cphMult: 1.6, ttfAdd: 18, turnoverAdd: 5, notes: [
    { s: "Aviation operational roles: 45–60 day TTF", src: "Industry estimates" },
    { s: "Heavy compliance & credential checking similar to maritime", src: "ICAO / industry" },
    { s: "Flight crew recruitment costs can exceed $25,000 per hire", src: "Aviation recruitment benchmarks" },
  ]},
  "Oil & Gas / Energy": { cphMult: 2.0, ttfAdd: 15, turnoverAdd: 4, notes: [
    { s: "Specialist roles: CPH can exceed $15,000", src: "Industry benchmarks" },
    { s: "Remote/FIFO positions add $5,000–$15,000 in mobilisation costs", src: "Industry estimates" },
    { s: "Agency reliance: 20–30% of salary for specialist roles", src: "Robert Half / Hays" },
  ]},
  "Hospitality & Tourism": { cphMult: 0.7, ttfAdd: -5, turnoverAdd: 30, notes: [
    { s: "Avg. CPH: ~$2,700 (lower per hire but high volume)", src: "SHRM / Engagedly" },
    { s: "Industry turnover: up to 73% annually", src: "US Bureau of Labor Statistics" },
    { s: "Volume makes total annual spend significant despite low unit cost", src: "Industry analysis" },
  ]},
  "Mining & Resources": { cphMult: 2.0, ttfAdd: 15, turnoverAdd: 5, notes: [
    { s: "Specialist roles (geologists, mining engineers): CPH >$15,000", src: "Industry benchmarks" },
    { s: "Remote site hiring adds significant logistics costs", src: "Industry estimates" },
  ]},
  "Pharmaceuticals & Biotech": { cphMult: 2.5, ttfAdd: 20, turnoverAdd: 5, notes: [
    { s: "Among highest CPH industries due to regulatory & credential requirements", src: "Industry analysis" },
    { s: "Scarcity of specialised talent drives premium agency fees", src: "Hays Life Sciences" },
  ]},
};

const AI_STATS = [
  { s: "AI reduces time-to-hire by 50% on average", src: "PwC / IBM / Yomly compilation, 2025" },
  { s: "AI-powered hiring cuts recruitment costs by ~30%", src: "Yomly AI in HR Statistics, 2025" },
  { s: "20–40% lower CPH when AI automates screening", src: "Greenhouse / GoodTime, 2025" },
  { s: "AI saves recruiters up to 23 hours per hire", src: "Deloitte (via Homans.ai)" },
  { s: "Predictive hiring improves performance predictions by 67%", src: "Deloitte People Analytics" },
  { s: "AI screening accuracy: 89–94%", src: "SHRM AI in HR Study" },
  { s: "AI + human oversight = 73% better fairness outcomes", src: "McKinsey, 2025" },
  { s: "AI interview screening: 53% success rate vs 29% traditional", src: "World Economic Forum" },
  { s: "TA teams using AI analytics 2.1x more likely to meet hiring SLAs", src: "Deloitte Human Capital Trends, 2024" },
];

const GLOBAL_CSS = `
  @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes checkPop { 0% { transform: scale(0.4); opacity: 0; } 60% { transform: scale(1.2); } 100% { transform: scale(1); opacity: 1; } }
  .si:focus { border-color: #c4956a !important; box-shadow: 0 0 0 3px rgba(196,149,106,0.1) !important; }
  .si::placeholder { color: #c4c0ba; }
  .sb:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 3px 10px rgba(42,37,32,0.1); }
  .sb:active:not(:disabled) { transform: translateY(0); box-shadow: none; }
  .sp:hover { transform: scale(1.05); }
  .sp:active { transform: scale(0.96); }
  .sn:hover { background: #f7f3ee !important; }
  .sc:hover { border-color: #d4c4a8 !important; box-shadow: 0 2px 8px rgba(42,37,32,0.04) !important; }
  .sa:hover { background: #faf5ef !important; border-color: #c4956a !important; }
  .sr:hover { color: #a07050 !important; }
  .scp { animation: checkPop 0.25s ease-out; }
  .sse { animation: fadeSlideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
  @media (max-width: 720px) {
    .q-header {
      padding: 12px 20px !important;
      gap: 14px !important;
    }
    .q-brand {
      gap: 10px !important;
      flex-wrap: wrap !important;
    }
    .q-form-shell {
      flex-direction: column !important;
      gap: 24px !important;
      max-width: none !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 24px 16px 56px !important;
    }
    .q-progress-nav {
      position: static !important;
      top: auto !important;
      width: 100% !important;
    }
    .q-form-card {
      width: 100% !important;
      padding: 24px 18px !important;
      border-radius: 10px !important;
    }
    .q-row,
    .q-summary-grid,
    .q-checkbox-grid {
      grid-template-columns: 1fr !important;
    }
    .q-bottom-actions {
      gap: 12px !important;
    }
  }
`;

const normaliseOrgType = (value) => {
  if (value === "Public") return "public";
  if (value === "Private") return "private";
  if (value === "NFP") return "nfp";
  return "";
};

const normaliseDateValue = (value) => {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(value).trim());
  if (!match) return "";

  const [, day, month, year] = match;
  return `${year}-${month}-${day}`;
};

// ─── UI Primitives ──────────────────────────────────────────────────────

function SH({ number, title, subtitle }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#b8a080", letterSpacing: 1 }}>{String(number).padStart(2, "0")}</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: "#2a2520", margin: 0, letterSpacing: -0.5 }}>{title}</h2>
      </div>
      {subtitle && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9a8e82", margin: 0, paddingLeft: 36, letterSpacing: 0.2 }}>{subtitle}</p>}
    </div>
  );
}

function F({ label, required, children, half, note, tooltip }) {
  const [showTip, setShowTip] = useState(false);
  return (
    <div style={{ flex: half ? "1 1 0" : "1 1 100%", minWidth: 0, display: "flex", flexDirection: "column" }}>
      <label style={{ display: "flex", alignItems: "flex-start", gap: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, color: "#6b6058", letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 6, minHeight: half ? 32 : "auto", lineHeight: 1.4 }}>
        <span>{label}{required && <span style={{ color: "#c4956a", marginLeft: 3 }}>*</span>}</span>
        {tooltip && (
          <span style={{ position: "relative", display: "inline-flex", flexShrink: 0 }}>
            <span
              onMouseEnter={() => setShowTip(true)}
              onMouseLeave={() => setShowTip(false)}
              onClick={() => setShowTip(!showTip)}
              style={{
                width: 16, height: 16, borderRadius: "50%", border: "1.5px solid #d4ccc2",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", fontSize: 10, fontWeight: 700, color: "#b8a080",
                fontFamily: "'DM Sans', sans-serif", lineHeight: 1, marginTop: -1,
                transition: "border-color 0.15s, color 0.15s",
                borderColor: showTip ? "#c4956a" : "#d4ccc2",
                color: showTip ? "#c4956a" : "#b8a080",
              }}
            >?</span>
            {showTip && (
              <span style={{
                position: "absolute", top: 22, left: "50%", transform: "translateX(-50%)",
                background: "#2a2520", color: "#f0ebe4", padding: "10px 14px", borderRadius: 8,
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 400,
                lineHeight: 1.5, letterSpacing: 0, textTransform: "none",
                width: 260, zIndex: 50, boxShadow: "0 4px 16px rgba(42,37,32,0.2)",
              }}>
                {tooltip}
                <span style={{
                  position: "absolute", top: -5, left: "50%", transform: "translateX(-50%)",
                  width: 10, height: 10, background: "#2a2520", borderRadius: 2,
                  transform: "translateX(-50%) rotate(45deg)",
                }} />
              </span>
            )}
          </span>
        )}
      </label>
      <div style={{ marginTop: "auto" }}>
        {children}
        {note && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#b8a080", margin: "4px 0 0", fontStyle: "italic" }}>{note}</p>}
      </div>
    </div>
  );
}

const ib = {
  width: "100%", padding: "10px 14px", border: "1px solid #e0d8cf", borderRadius: 6,
  fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#2a2520",
  background: "#faf8f5", outline: "none", boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s", height: 42,
};
const sb = {
  ...ib, appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%239a8e82' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: 32,
};

function TI({ value, onChange, placeholder, type = "text" }) {
  return <input className="si" type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={ib} />;
}

function DateInput({ value, onChange }) {
  return (
    <input
      className="si"
      type="date"
      value={normaliseDateValue(value)}
      onChange={(e) => onChange(e.target.value)}
      style={{ ...ib, colorScheme: "light" }}
    />
  );
}

function Sel({ value, onChange, options, placeholder }) {
  return (
    <select className="si" value={value} onChange={(e) => onChange(e.target.value)} style={sb}>
      <option value="">{placeholder || "Select..."}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

// Currency + text input combo
function CurrencyInput({ value, onChange, currency, onCurrencyChange, placeholder }) {
  return (
    <div style={{ display: "flex", gap: 0, height: 42 }}>
      <select className="si" value={currency} onChange={(e) => onCurrencyChange(e.target.value)} style={{
        ...sb, width: 80, borderRadius: "6px 0 0 6px", borderRight: "none", fontSize: 12, padding: "10px 28px 10px 10px",
        flexShrink: 0, color: "#6b6058",
      }}>
        {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <input className="si" type="text" value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} style={{ ...ib, borderRadius: "0 6px 6px 0", flex: 1 }} />
    </div>
  );
}

const RADIO_TOOLTIPS = { "NFP": "Not for Profit" };

function RG({ value, onChange, options }) {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      {options.map((o) => (
        <label key={o} onClick={() => onChange(o)} title={RADIO_TOOLTIPS[o] || ""} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#4a4238", position: "relative" }}>
          <span onClick={(e) => { e.stopPropagation(); onChange(o); }} className="sp" style={{
            width: 18, height: 18, minWidth: 18, minHeight: 18, borderRadius: "50%", border: `2px solid ${value === o ? "#c4956a" : "#d4ccc2"}`,
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s", flexShrink: 0,
          }}>
            {value === o && <span className="scp" style={{ width: 8, height: 8, borderRadius: "50%", background: "#c4956a" }} />}
          </span>
          {o}
          {RADIO_TOOLTIPS[o] && (
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#b8a080", fontStyle: "italic", marginLeft: -4 }}>
              ({RADIO_TOOLTIPS[o]})
            </span>
          )}
        </label>
      ))}
    </div>
  );
}

function Chk({ checked, onToggle }) {
  return (
    <span onClick={(e) => { e.stopPropagation(); onToggle(); }} className="sp" style={{
      width: 17, height: 17, borderRadius: 4, border: `1.5px solid ${checked ? "#c4956a" : "#d4ccc2"}`,
      background: checked ? "#c4956a" : "transparent", display: "flex", alignItems: "center",
      justifyContent: "center", flexShrink: 0, cursor: "pointer", transition: "all 0.15s",
    }}>
      {checked && <svg className="scp" width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
    </span>
  );
}

function CG({ selected, onChange, options, columns = 2 }) {
  const toggle = (opt) => onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  return (
    <div className="q-checkbox-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: "8px 24px" }}>
      {options.map((o) => (
        <label key={o} onClick={() => toggle(o)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#4a4238" }}>
          <Chk checked={selected.includes(o)} onToggle={() => toggle(o)} />{o}
        </label>
      ))}
    </div>
  );
}

function Row({ children, gap = 24 }) { return <div className="q-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap, alignItems: "end" }}>{children}</div>; }
function Divider() { return <div style={{ height: 1, background: "linear-gradient(90deg, #e0d8cf, transparent)", margin: "8px 0" }} />; }

// ─── Progress Ring ──────────────────────────────────────────────────────

function ProgressRing({ completed, total }) {
  const size = 38, stroke = 2.5, r = (size - stroke) / 2, circ = 2 * Math.PI * r;
  const offset = circ * (1 - (total > 0 ? completed / total : 0));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#ebe6df" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={completed >= total ? "#8bab7a" : "#c4956a"}
          strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.3s ease" }} />
      </svg>
      <div>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: "#2a2520", fontWeight: 500 }}>
          {completed}<span style={{ color: "#c4c0ba" }}>/{total}</span>
        </span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#b8a080", marginLeft: 6 }}>
          {completed >= total ? "ready" : "complete"}
        </span>
      </div>
    </div>
  );
}

// ─── Live Summary ───────────────────────────────────────────────────────

function SummaryPanel({ data, isOpen, onToggle }) {
  const items = [
    { label: "Organisation", value: data.orgName },
    { label: "Industry", value: data.industry },
    { label: "Head Office", value: data.headOffice },
    { label: "Staff", value: data.totalStaff ? Number(data.totalStaff).toLocaleString() : "" },
    { label: "Champion", value: data.champName },
    { label: "Vacancies (12m)", value: data.totalVacancies },
    { label: "Time-to-Fill", value: data.timeToFill ? `${data.timeToFill} days` : "" },
    { label: "Agency Spend", value: data.agencySpend },
    { label: "Roles", value: data.pilotRoleCount },
  ].filter((i) => i.value);
  return (
    <div style={{ borderTop: "1px solid #ebe6df", background: "#fdfcfa" }}>
      <button onClick={onToggle} className="sn" style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 40px", background: "none", border: "none", cursor: "pointer",
        fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#b8a080", letterSpacing: 1.5, textTransform: "uppercase",
        transition: "background 0.15s",
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: items.length > 0 ? "#c4956a" : "#d4ccc2", transition: "background 0.3s" }} />
          Live Summary
          {items.length > 0 && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#c4956a", fontWeight: 500, letterSpacing: 0, textTransform: "none" }}>— {items.length} field{items.length !== 1 ? "s" : ""} captured</span>}
        </span>
        <svg width="10" height="6" viewBox="0 0 10 6" style={{ transition: "transform 0.3s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
          <path d="M1 1L5 5L9 1" stroke="#b8a080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </button>
      <div style={{ maxHeight: isOpen ? 300 : 0, opacity: isOpen ? 1 : 0, padding: isOpen ? "0 40px 16px" : "0 40px 0", transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)", overflow: "hidden" }}>
        {items.length > 0 ? (
          <div className="q-summary-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px 32px" }}>
            {items.map((item, idx) => (
              <div key={item.label} style={{ animation: `fadeSlideIn 0.3s ease ${idx * 0.04}s both` }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#b8a080", letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#2a2520", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.value}</div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#c4c0ba", fontStyle: "italic", margin: 0 }}>Start filling in the form to see a live snapshot here.</p>
        )}
      </div>
    </div>
  );
}

// ─── Section Components ─────────────────────────────────────────────────

function OfficeCard({ office, onUpdate, onRemove, isHead }) {
  const label = isHead ? "HEAD OFFICE" : "OTHER OFFICE LOCATION";
  const bg = isHead ? "#f7f3ee" : "#faf8f5";
  return (
    <div className="sc" style={{ background: bg, border: isHead ? "1.5px solid #d4c4a8" : "1px solid #e8e2da", borderRadius: 10, padding: 20, position: "relative", transition: "border-color 0.2s, box-shadow 0.2s" }}>
      <span style={{
        fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#b8a080",
        letterSpacing: 1.5, textTransform: "uppercase", position: "absolute",
        top: -9, left: 16, background: bg, padding: "0 6px",
      }}>{label}</span>
      {!isHead && (
        <button onClick={onRemove} className="sr" style={{
          position: "absolute", top: 10, right: 12, background: "none", border: "none",
          cursor: "pointer", color: "#c4956a", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, padding: "4px 8px", transition: "color 0.15s",
        }}>Remove</button>
      )}
      <Row>
        <F label="Region" required half><Sel value={office.region} onChange={(v) => onUpdate({ region: v, location: "" })} options={REGIONS} placeholder="Select region..." /></F>
        <F label="City & Country" required half>
          {office.region
            ? <Sel value={office.location} onChange={(v) => onUpdate({ location: v })} options={REGION_CITIES[office.region] || []} placeholder="Select city..." />
            : <Sel value="" onChange={() => {}} options={[]} placeholder="Select a region first..." />}
        </F>
      </Row>
    </div>
  );
}

function PilotRoleRow({ role, onChange, onRemove }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid #f0ebe4" }}>
      <div style={{ flex: 2 }}><TI value={role.title} onChange={(v) => onChange("title", v)} placeholder="Job Title" /></div>
      <div style={{ flex: 2 }}><TI value={role.department} onChange={(v) => onChange("department", v)} placeholder="Department" /></div>
      <div style={{ flex: 1 }}><TI value={role.positions} onChange={(v) => onChange("positions", v)} placeholder="#" type="number" /></div>
      <div style={{ flex: 3 }}><TI value={role.notes} onChange={(v) => onChange("notes", v)} placeholder="Core Competencies / Notes" /></div>
      <button onClick={onRemove} className="sr" style={{ background: "none", border: "none", cursor: "pointer", color: "#c4956a", fontSize: 18, lineHeight: 1, padding: "8px 4px", marginTop: 1, transition: "color 0.15s" }}>×</button>
    </div>
  );
}

function WorkflowBuilder({ steps, onReorder, onRemoveStep, onAddStep, personnelMap, onPersonnelChange }) {
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);
  const [showAddInput, setShowAddInput] = useState(false);
  const [customStep, setCustomStep] = useState("");

  const handleAdd = () => {
    if (customStep.trim()) {
      onAddStep(customStep.trim());
      setCustomStep("");
      setShowAddInput(false);
    }
  };

  return (
    <div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6b6058", marginBottom: 6, lineHeight: 1.6 }}>
        <strong style={{ fontWeight: 600 }}>Step 1:</strong> Click, hold, and drag individual cards up and down to build <em>your</em> current recruitment workflow. Remove any steps that don't apply.
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6b6058", marginBottom: 16, lineHeight: 1.6 }}>
        <strong style={{ fontWeight: 600 }}>Step 2:</strong> Once done, click and select the relevant personnel in each card to indicate who is involved in each step.
      </div>
      {steps.map((step, i) => {
        const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
        const isEven = i % 2 === 0;
        const restBg = isEven ? "#faf8f5" : "#f7f4f0";
        return (
          <div key={step} draggable
            onDragStart={() => setDragIdx(i)}
            onDragOver={(e) => { e.preventDefault(); setOverIdx(i); }}
            onDragEnd={() => {
              if (dragIdx !== null && overIdx !== null && dragIdx !== overIdx) onReorder(dragIdx, overIdx);
              setDragIdx(null); setOverIdx(null);
            }}
            className="sc" style={{
              display: "flex", alignItems: "flex-start", gap: 12, padding: "11px 14px", marginBottom: 6,
              background: dragIdx === i ? "#f0ebe4" : overIdx === i ? "#f3efe9" : restBg,
              border: `1px solid ${isEven ? "#e8e2da" : "#e2dcd3"}`, borderRadius: 8, cursor: "grab",
              opacity: dragIdx === i ? 0.5 : 1, borderLeft: `3.5px solid ${accent}`,
              transition: "border-color 0.2s, box-shadow 0.2s, opacity 0.15s",
            }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: accent, minWidth: 20, paddingTop: 2, fontWeight: 500 }}>{i + 1}.</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#2a2520", fontWeight: 500, marginBottom: 6 }}>{step}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {PERSONNEL.map((p) => {
                  const active = (personnelMap[step] || []).includes(p);
                  return (
                    <button key={p} onClick={() => onPersonnelChange(step, p)} className="sp" style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 11, padding: "3px 10px", borderRadius: 20,
                      border: `1px solid ${active ? accent : "#e0d8cf"}`, background: active ? accent : "transparent",
                      color: active ? "#fff" : "#8a7e72", cursor: "pointer", transition: "all 0.15s",
                    }}>{p}</button>
                  );
                })}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <button onClick={() => onRemoveStep(i)} className="sr" title="Remove this step" style={{
                background: "none", border: "none", cursor: "pointer", color: "#c4c0ba",
                fontSize: 15, lineHeight: 1, padding: "2px 4px", transition: "color 0.15s",
              }}>×</button>
              <svg width="14" height="20" viewBox="0 0 14 20" fill="none" style={{ opacity: 0.35 }}>
                <circle cx="4" cy="4" r="1.5" fill="#ccc4ba" /><circle cx="10" cy="4" r="1.5" fill="#ccc4ba" />
                <circle cx="4" cy="10" r="1.5" fill="#ccc4ba" /><circle cx="10" cy="10" r="1.5" fill="#ccc4ba" />
                <circle cx="4" cy="16" r="1.5" fill="#ccc4ba" /><circle cx="10" cy="16" r="1.5" fill="#ccc4ba" />
              </svg>
            </div>
          </div>
        );
      })}

      {/* Add custom step */}
      {showAddInput ? (
        <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
          <input className="si" type="text" value={customStep} onChange={(e) => setCustomStep(e.target.value)}
            placeholder="e.g. Reference Check, Medical Screening..."
            onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
            style={{ ...ib, flex: 1 }} autoFocus />
          <button onClick={handleAdd} className="sb" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#fff",
            background: "#c4956a", border: "none", borderRadius: 6, padding: "10px 16px",
            cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
          }}>Add</button>
          <button onClick={() => { setShowAddInput(false); setCustomStep(""); }} style={{
            background: "none", border: "none", cursor: "pointer", color: "#b8a080",
            fontFamily: "'DM Sans', sans-serif", fontSize: 12, padding: "10px 8px",
          }}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setShowAddInput(true)} className="sa" style={{
          marginTop: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#c4956a",
          background: "none", border: "1px dashed #d4c4a8", borderRadius: 8,
          padding: "8px 20px", cursor: "pointer", width: "100%", transition: "all 0.15s",
        }}>+ Add Custom Step</button>
      )}
    </div>
  );
}

// ─── Progress Nav ───────────────────────────────────────────────────────

function ProgressNav({ currentSection, onNavigate, completionMap }) {
  return (
    <div className="q-progress-nav" style={{ position: "sticky", top: 100, width: 210, flexShrink: 0 }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#b8a080", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Progress</div>
      {SECTIONS.map((s, i) => {
        const active = currentSection === i;
        const complete = completionMap[i];
        return (
          <button key={s} onClick={() => onNavigate(i)} className="sn" style={{
            display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "7px 8px",
            borderRadius: 6, background: active ? "#f7f3ee" : "none", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.15s",
          }}>
            <span style={{
              width: 20, height: 20, borderRadius: "50%",
              border: `1.5px solid ${complete ? "#8bab7a" : active ? "#c4956a" : "#ddd6cc"}`,
              background: complete ? "#8bab7a" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.3s",
            }}>
              {complete
                ? <svg className="scp" width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                : <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: active ? "#c4956a" : "#b8a080" }}>{i + 1}</span>}
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: active ? "#2a2520" : "#8a7e72", fontWeight: active ? 600 : 400, transition: "all 0.2s" }}>{s}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Main ───────────────────────────────────────────────────────────────

export default function QuestionnaireReferenceExperience() {
  const [section, setSection] = useState(0);
  const [sectionKey, setSectionKey] = useState(0);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [turnstileRenderKey, setTurnstileRenderKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [orgName, setOrgName] = useState("");
  const [offices, setOffices] = useState([{ region: "", location: "", isHead: true }, { region: "", location: "", isHead: false }]);
  const [industry, setIndustry] = useState("");
  const [orgType, setOrgType] = useState("");
  const [totalStaff, setTotalStaff] = useState("");
  const [hrRecruiters, setHrRecruiters] = useState("");
  const [avgRecruiterSalary, setAvgRecruiterSalary] = useState("");
  const [totalHiringManagers, setTotalHiringManagers] = useState("");
  const [avgManagerSalary, setAvgManagerSalary] = useState("");
  const [salaryCurrency, setSalaryCurrency] = useState("USD");

  const [champName, setChampName] = useState("");
  const [champTitle, setChampTitle] = useState("");
  const [champDept, setChampDept] = useState("");
  const [champEmail, setChampEmail] = useState("");
  const [champPhone, setChampPhone] = useState("");

  const [totalVacancies, setTotalVacancies] = useState("");
  const [totalCVs, setTotalCVs] = useState("");
  const [totalApplications, setTotalApplications] = useState("");
  const [jobsCrossSection, setJobsCrossSection] = useState([]);
  const [forecastTotal, setForecastTotal] = useState("");
  const [specialistPct, setSpecialistPct] = useState("");
  const [generalPct, setGeneralPct] = useState("");
  const [forecastCategories, setForecastCategories] = useState([]);
  const [forecastCounts, setForecastCounts] = useState({});
  const [adSpend, setAdSpend] = useState("");
  const [agencyPct, setAgencyPct] = useState("");
  const [agencySpend, setAgencySpend] = useState("");
  const [costPerHire, setCostPerHire] = useState("");
  const [timeToFill, setTimeToFill] = useState("");

  const [annualExits, setAnnualExits] = useState("");
  const [internalMoves, setInternalMoves] = useState("");

  const [adPlatforms, setAdPlatforms] = useState([]);
  const [adPlatformOther, setAdPlatformOther] = useState("");
  const [ats, setAts] = useState("");
  const [hris, setHris] = useState("");
  const [payroll, setPayroll] = useState("");
  const [lms, setLms] = useState("");
  const [perfMgmt, setPerfMgmt] = useState("");
  const [usesPsychometrics, setUsesPsychometrics] = useState("");
  const [psychToolName, setPsychToolName] = useState("");

  const [psychInternal, setPsychInternal] = useState([]);
  const [psychInternalNotes, setPsychInternalNotes] = useState("");
  const [psychAccess, setPsychAccess] = useState([]);
  const [leadershipInterest, setLeadershipInterest] = useState("");
  const [leadershipNotes, setLeadershipNotes] = useState("");

  const [workflowSteps, setWorkflowSteps] = useState([...WORKFLOW_STEPS_DEFAULT]);
  const [personnelMap, setPersonnelMap] = useState({});
  const [flowchartNote, setFlowchartNote] = useState("");

  const [successCriteria, setSuccessCriteria] = useState([]);
  const [successOther, setSuccessOther] = useState("");

  const [pilotStart, setPilotStart] = useState("");
  const [pilotDuration, setPilotDuration] = useState("");
  const [pilotOffices, setPilotOffices] = useState([{ region: "", location: "" }]);
  const [pilotUnits, setPilotUnits] = useState("");
  const [pilotRoleCount, setPilotRoleCount] = useState("");
  const [pilotRoles, setPilotRoles] = useState([{ title: "", department: "", positions: "", notes: "" }]);
  const [pilotJDs, setPilotJDs] = useState([{ roleIdx: "", title: "", text: "" }]);

  const [signName, setSignName] = useState("");
  const [signTitle, setSignTitle] = useState("");
  const [signDate, setSignDate] = useState("");
  const [signAgree, setSignAgree] = useState(false);
  const [signAuthority, setSignAuthority] = useState(false);

  const updateOffice = (i, u) => { const n = [...offices]; n[i] = { ...n[i], ...u }; setOffices(n); };
  const addOffice = () => setOffices([...offices, { region: "", location: "", isHead: false }]);
  const removeOffice = (i) => setOffices(offices.filter((_, idx) => idx !== i));
  const addPilotOffice = () => setPilotOffices([...pilotOffices, { region: "", location: "" }]);
  const addPilotRole = () => setPilotRoles([...pilotRoles, { title: "", department: "", positions: "", notes: "" }]);
  const reorderWorkflow = (from, to) => { const n = [...workflowSteps]; const [m] = n.splice(from, 1); n.splice(to, 0, m); setWorkflowSteps(n); };
  const removeWorkflowStep = (i) => setWorkflowSteps(workflowSteps.filter((_, idx) => idx !== i));
  const addWorkflowStep = (name) => setWorkflowSteps([...workflowSteps, name]);
  const togglePersonnel = (step, person) => {
    const c = personnelMap[step] || [];
    setPersonnelMap({ ...personnelMap, [step]: c.includes(person) ? c.filter((p) => p !== person) : [...c, person] });
  };

  const completionMap = {
    0: !!(orgName && offices[0].region && offices[0].location && industry && orgType),
    1: !!(champName && champEmail),
    2: !!totalVacancies,
    3: !!annualExits,
    4: !!(ats || hris),
    5: psychInternal.length > 0,
    6: Object.keys(personnelMap).length > 0,
    7: successCriteria.length > 0,
    8: !!pilotRoleCount,
    9: !!(offices[0]?.region && industry),
    10: !!(signName && signAgree && signAuthority),
  };
  const completedCount = Object.values(completionMap).filter(Boolean).length;

  const parseNum = (v) => { const n = Number(String(v).replace(/[,\s]/g, "")); return isNaN(n) ? 0 : n; };

  const go = (i) => { setSection(i); setSectionKey((k) => k + 1); };
  const next = () => go(Math.min(section + 1, SECTIONS.length - 1));
  const prev = () => go(Math.max(section - 1, 0));

  const summaryData = { orgName, industry, headOffice: offices[0]?.location || "", totalStaff, champName, totalVacancies, timeToFill, agencySpend, pilotRoleCount };

  const buildPayload = () => {
    const normalizedOffices = offices.map((office, index) => ({
      region: office.region,
      location: office.location,
      isHeadOffice: index === 0,
    }));
    const normalizedPilotOffices = pilotOffices.map((office) => ({
      region: office.region,
      location: office.location,
      isHeadOffice: false,
    }));
    const normalizedPilotJds = pilotJDs.map((entry) => ({
      roleIndex: entry.roleIdx,
      title: entry.title,
      text: entry.text,
    }));

    return {
      ...INITIAL_FORM_DATA,
      organisationName: orgName,
      headOfficeRegion: normalizedOffices[0]?.region || "",
      headOfficeLocation: normalizedOffices[0]?.location || "",
      officeLocations: normalizedOffices,
      otherOfficeLocations: serializeOtherOfficeLocations(normalizedOffices),
      industrySector: industry,
      organisationType: normaliseOrgType(orgType),
      totalInternalStaff: totalStaff,
      hrRecruitmentStaffCount: hrRecruiters,
      avgRecruiterSalary,
      totalHiringManagers,
      avgManagerSalary,
      currencyCode: salaryCurrency,
      keyContactPerson: champName,
      keyContactTitle: champTitle,
      keyContactDepartment: champDept,
      contactEmail: champEmail,
      contactNumber: champPhone,
      totalRolesRecruited: totalVacancies,
      totalCVsReceived: totalCVs,
      totalApplicationsReceived: totalApplications,
      jobTypes: jobsCrossSection,
      jobTypesOther: "",
      specialistRolePercentage: specialistPct,
      generalRolePercentage: generalPct,
      forecastedRoles: forecastTotal,
      jobAdvertisingSpend: adSpend,
      jobAdvertisingPlatformSelections: adPlatforms,
      jobAdvertisingPlatformsOther: adPlatformOther,
      jobAdvertisingPlatforms: serializeAdvertisingPlatforms(adPlatforms, adPlatformOther),
      annualAgencySpend: agencySpend,
      agencyVsInternalPercentage: agencyPct,
      avgTimeToFill: timeToFill,
      avgCostPerHire: costPerHire,
      annualEmployeeExits: annualExits,
      annualTurnoverRate: calculateTurnoverRate(annualExits, totalStaff),
      internalMobility: internalMoves,
      deiPriorities: "",
      talentChallenges: "",
      currentATS: ats,
      currentHRIS: hris,
      payrollProvider: payroll,
      lms,
      performanceManagementSystem: perfMgmt,
      usePsychometricTools: usesPsychometrics === "Yes" ? "yes" : usesPsychometrics === "No" ? "no" : "",
      psychometricToolsUsed: psychToolName,
      internalStaffAssessment: psychInternal,
      internalAssessmentUseCases: psychInternalNotes,
      reportAccessRoles: psychAccess,
      reportAccessOther: psychAccess.includes("Other") ? "Other" : "",
      leadershipAssessmentInterest: leadershipInterest,
      leadershipAssessmentNotes: leadershipNotes,
      recruitmentAssessment: [],
      recruitmentAssessmentOther: "",
      internalStaffDepartments: "",
      workflowSteps,
      workflowPersonnelMap: personnelMap,
      workflowAdditionalNotes: flowchartNote,
      recruitmentWorkflow: serializeWorkflow(workflowSteps, personnelMap, flowchartNote),
      successCriteria,
      successCriteriaOther: successOther,
      proposedStartDate: normaliseDateValue(pilotStart),
      pilotDuration,
      pilotOfficeLocations: normalizedPilotOffices,
      regionsOffices: serializePilotOfficeLocations(normalizedPilotOffices),
      businessUnitsInvolved: pilotUnits,
      approximateRoles: pilotRoleCount,
      pilotRoles,
      pilotRolesDetails: serializePilotRoles(pilotRoles),
      pilotJobDescriptions: normalizedPilotJds,
      jobDescriptions: serializePilotJobDescriptions(normalizedPilotJds, pilotRoles),
      projectedValueSummary: "",
      signOffName: signName,
      signOffTitle: signTitle,
      signOffDate: normaliseDateValue(signDate),
    };
  };

  const handleSubmit = async () => {
    if (!signAuthority) {
      defaultNotificationAdapter.error("Please confirm you have authority to proceed on behalf of your organisation.");
      return;
    }

    if (!turnstileToken) {
      defaultNotificationAdapter.error("Please complete the bot verification");
      return;
    }

    let loadingToast;
    try {
      setSubmitting(true);
      loadingToast = defaultNotificationAdapter.loading("Submitting questionnaire...");
      const result = await defaultApiAdapter.submitQuestionnaire(buildPayload(), turnstileToken);
      defaultNotificationAdapter.dismiss(loadingToast);

      if (result.success) {
        setSubmissionId(result.submissionId || null);
        setSubmitted(true);
        defaultNotificationAdapter.success("Questionnaire submitted successfully!");
        return;
      }

      setTurnstileToken(null);
      setTurnstileRenderKey((key) => key + 1);
      const errorMessage = result.error ? `${result.message} (${result.error})` : result.message;
      defaultNotificationAdapter.error(errorMessage || "Failed to submit questionnaire. Please try again.");
    } catch (error) {
      if (loadingToast !== undefined) {
        defaultNotificationAdapter.dismiss(loadingToast);
      }
      setTurnstileToken(null);
      setTurnstileRenderKey((key) => key + 1);
      console.error("Error submitting questionnaire:", error);
      defaultNotificationAdapter.error(
        `An error occurred: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const renderSection = () => {
    switch (section) {
      case 0: return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <SH number={1} title="Organisation Information" subtitle="Basic details about your organisation" />
          <F label="Organisation Name" required><TI value={orgName} onChange={setOrgName} placeholder="e.g. Acme Healthcare Group" /></F>
          <div>
            <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, color: "#6b6058", letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 10 }}>
              Office Locations<span style={{ color: "#c4956a", marginLeft: 3 }}>*</span>
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {offices.map((o, i) => <OfficeCard key={i} office={o} isHead={i === 0} onUpdate={(u) => updateOffice(i, u)} onRemove={() => removeOffice(i)} />)}
            </div>
            <button onClick={addOffice} className="sa" style={{ marginTop: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#c4956a", background: "none", border: "1px dashed #d4c4a8", borderRadius: 8, padding: "8px 20px", cursor: "pointer", width: "100%", transition: "all 0.15s" }}>+ Add Office Location</button>
          </div>
          <Row>
            <F label="Industry / Sector" required half><Sel value={industry} onChange={setIndustry} options={INDUSTRIES} placeholder="Select industry..." /></F>
            <F label="Organisation Type" required half><RG value={orgType} onChange={setOrgType} options={["Public", "Private", "NFP"]} /></F>
          </Row>
          <Divider />
          <F label="Total Internal Staff" required><TI value={totalStaff} onChange={setTotalStaff} placeholder="e.g. 5,000" type="number" /></F>
          <Row>
            <F label="HR Personnel Dedicated to Recruitment" required half><TI value={hrRecruiters} onChange={setHrRecruiters} placeholder="e.g. 12" type="number" /></F>
            <F label="Avg. Annual Salary of Recruiters (optional)" half>
              <CurrencyInput value={avgRecruiterSalary} onChange={setAvgRecruiterSalary} currency={salaryCurrency} onCurrencyChange={setSalaryCurrency} placeholder="e.g. 45,000" />
            </F>
          </Row>
          <Row>
            <F label="Total Hiring Managers with Authority" required half><TI value={totalHiringManagers} onChange={setTotalHiringManagers} placeholder="e.g. 120" type="number" /></F>
            <F label="Avg. Annual Salary of Managers (optional)" half>
              <CurrencyInput value={avgManagerSalary} onChange={setAvgManagerSalary} currency={salaryCurrency} onCurrencyChange={setSalaryCurrency} placeholder="e.g. 85,000" />
            </F>
          </Row>
        </div>
      );
      case 1: return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <SH number={2} title="Strategia Project Champion" subtitle="Primary contact for the engagement" />
          <Row>
            <F label="Full Name" required half><TI value={champName} onChange={setChampName} placeholder="e.g. Sarah Chen" /></F>
            <F label="Title" required half><TI value={champTitle} onChange={setChampTitle} placeholder="e.g. Head of Talent Acquisition" /></F>
          </Row>
          <F label="Department" required><TI value={champDept} onChange={setChampDept} placeholder="e.g. Human Resources" /></F>
          <Row>
            <F label="Email" required half><TI value={champEmail} onChange={setChampEmail} placeholder="sarah.chen@company.com" type="email" /></F>
            <F label="Telephone" required half><TI value={champPhone} onChange={setChampPhone} placeholder="+65 9123 4567" /></F>
          </Row>
        </div>
      );
      case 2: return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <SH number={3} title="Recruitment Activity Overview" subtitle="Your hiring activity from the last 12 months — this helps Strategia's Workforce Intelligence engine benchmark and model your outcomes" />
          <Row>
            <F label="Total Vacancies Advertised" required half note="Last 12 months"><TI value={totalVacancies} onChange={setTotalVacancies} placeholder="e.g. 250" type="number" /></F>
            <F label="Total CVs Received" half note="Last 12 months"><TI value={totalCVs} onChange={setTotalCVs} placeholder="e.g. 12,000" type="number" /></F>
          </Row>
          <F label="Total Job Applications" note="Total formal applications submitted through your ATS or application portal (may differ from CVs received via email or referrals)">
            <TI value={totalApplications} onChange={setTotalApplications} placeholder="e.g. 8,500" type="number" />
          </F>
          <F label="Cross-section of Jobs Recruited (Last 12 Months)"><CG selected={jobsCrossSection} onChange={setJobsCrossSection} options={JOB_CATEGORIES} /></F>
          <div>
            <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, color: "#6b6058", letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 6 }}>
              Role Complexity Split
            </label>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9a8e82", margin: "0 0 12px", lineHeight: 1.6 }}>
              Approximate percentage split between specialist/hard-to-fill roles and high-volume/general roles. Specialist roles typically require longer search times, niche sourcing, or specific credentials. General roles attract larger applicant pools and fill more quickly.
            </p>
            <Row>
              <F label="% Specialist / Hard-to-Fill" half><TI value={specialistPct} onChange={(v) => { setSpecialistPct(v); const n = Number(v); if (!isNaN(n) && n >= 0 && n <= 100) setGeneralPct(String(100 - n)); }} placeholder="e.g. 30" type="number" /></F>
              <F label="% General / High-Volume" half><TI value={generalPct} onChange={(v) => { setGeneralPct(v); const n = Number(v); if (!isNaN(n) && n >= 0 && n <= 100) setSpecialistPct(String(100 - n)); }} placeholder="e.g. 70" type="number" /></F>
            </Row>
          </div>
          <Divider />
          <div>
            <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, color: "#6b6058", letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 6 }}>Forecasted Roles — Next 12 Months</label>
            <F label="Estimated total number of roles to recruit in the next 12 months"><TI value={forecastTotal} onChange={setForecastTotal} placeholder="e.g. 300" type="number" /></F>
          </div>
          <Divider />
          <F label="Total Spend on Job Advertising (Last 12 Months)" note="Include all advertising costs: LinkedIn sponsored posts, job board subscriptions (Indeed, Seek, etc.), print media, recruitment marketing platforms, and any other paid channels used to attract candidates">
            <CurrencyInput value={adSpend} onChange={setAdSpend} currency={salaryCurrency} onCurrencyChange={setSalaryCurrency} placeholder="e.g. 150,000" />
          </F>
          <Row>
            <F label="% Agency vs Internal Placements" half><TI value={agencyPct} onChange={setAgencyPct} placeholder="e.g. 40% agency" /></F>
            <F label="Current Annual Agency Spend (Approx.)" half>
              <CurrencyInput value={agencySpend} onChange={setAgencySpend} currency={salaryCurrency} onCurrencyChange={setSalaryCurrency} placeholder="e.g. 500,000" />
            </F>
          </Row>
          <Row>
            <F label="Typical Cost-per-Hire" half tooltip="Cost-per-hire is the total average spend to fill a single vacancy — including job advertising, agency fees, recruiter time, and screening costs. If you're unsure of your exact figure, leave this blank and we'll apply industry benchmarks for your region.">
              <CurrencyInput value={costPerHire} onChange={setCostPerHire} currency={salaryCurrency} onCurrencyChange={setSalaryCurrency} placeholder="e.g. 4,200" />
            </F>
            <F label="Typical Time-to-Fill (Working Days)" half><TI value={timeToFill} onChange={setTimeToFill} placeholder="e.g. 45" type="number" /></F>
          </Row>
        </div>
      );
      case 3: return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <SH number={4} title="Organisational Insights" subtitle="Workforce dynamics that help Strategia calibrate to your organisation" />
          <Row>
            <F label="Avg. Employees Exiting per Annum" required half><TI value={annualExits} onChange={setAnnualExits} placeholder="e.g. 200" type="number" /></F>
            <F label="Internal Moves / Promotions per Annum" required half><TI value={internalMoves} onChange={setInternalMoves} placeholder="e.g. 80" type="number" /></F>
          </Row>
        </div>
      );
      case 4: return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <SH number={5} title="Technology & Platforms" subtitle="Current tools and systems you use" />
          <div style={{ background: "#f7f3ee", border: "1px solid #e8e2da", borderRadius: 8, padding: "14px 18px", marginBottom: 4 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#4a4238", lineHeight: 1.7, margin: 0 }}>
              Strategia is a <strong style={{ fontWeight: 600 }}>Workforce Intelligence platform</strong> — not an ATS. It sits as an intelligence layer on top of your existing tools (ATS, HRIS, payroll, LMS), enriching and connecting them rather than replacing them. The information below helps us understand your current ecosystem so we can configure Strategia to integrate seamlessly.
            </p>
          </div>
          <F label="Job Advertising Platforms Used">
            <CG selected={adPlatforms} onChange={setAdPlatforms} options={AD_PLATFORMS} />
            {adPlatforms.includes("Other") && (
              <div style={{ marginTop: 8 }}>
                <TI value={adPlatformOther} onChange={setAdPlatformOther} placeholder="Please specify other platform(s)..." />
              </div>
            )}
          </F>
          <Divider />
          <Row>
            <F label="Current ATS" half>
              <Sel value={ats} onChange={setAts} options={["Workday","SAP SuccessFactors","iCIMS","Greenhouse","Lever","BambooHR","SmartRecruiters","Taleo","Teamtailor","Bullhorn","Other"]} placeholder="Select or type..." />
            </F>
            <F label="Current HRIS Platform" half><TI value={hris} onChange={setHris} placeholder="e.g. SAP SuccessFactors" /></F>
          </Row>
          <Row>
            <F label="Payroll Provider" half><TI value={payroll} onChange={setPayroll} placeholder="e.g. ADP, Xero" /></F>
            <F label="Learning Management System (LMS)" half><TI value={lms} onChange={setLms} placeholder="e.g. Cornerstone, Moodle" /></F>
          </Row>
          <Row>
            <F label="Performance Management System" half><TI value={perfMgmt} onChange={setPerfMgmt} placeholder="e.g. Lattice, 15Five, Culture Amp" /></F>
          </Row>
          <Divider />
          <F label="Do you use any psychometric or assessment tools currently?" required><RG value={usesPsychometrics} onChange={setUsesPsychometrics} options={["Yes", "No"]} /></F>
          {usesPsychometrics === "Yes" && <F label="Please name the tools used"><TI value={psychToolName} onChange={setPsychToolName} placeholder="e.g. Hogan, SHL, Saville" /></F>}
        </div>
      );
      case 5: return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <SH number={6} title="Psychometrics & Assessment Scope" subtitle="Understanding how assessments can support your workforce" />
          <div style={{ background: "#f7f3ee", border: "1px solid #e8e2da", borderRadius: 8, padding: "14px 18px" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#4a4238", lineHeight: 1.7, margin: 0 }}>
              Some of our clients' preference is to leverage Strategia's psychometric capabilities beyond recruitment — gaining deeper insight into their <strong style={{ fontWeight: 600 }}>existing workforce</strong>, whether that's around leadership potential, succession readiness, team dynamics, or professional development pathways. This section helps us understand whether that's something your organisation would find valuable.
            </p>
          </div>
          <F label="Would you like to use psychometric assessments for your internal staff?">
            <CG selected={psychInternal} onChange={setPsychInternal} options={["Leadership Team Only", "Selected Departments or Roles", "Entire Organisation", "Not Applicable"]} columns={1} />
          </F>
          <F label="How would you envision using internal assessments?" note="For example: succession planning, team development, identifying high-potential employees, onboarding insights for new managers">
            <textarea className="si" value={psychInternalNotes} onChange={(e) => setPsychInternalNotes(e.target.value)}
              placeholder="Describe how you'd like to use psychometric insights for your existing team..."
              rows={3} style={{ ...ib, resize: "vertical", lineHeight: 1.5 }} />
          </F>
          <F label="Who should receive access to psychometric reports?">
            <CG selected={psychAccess} onChange={setPsychAccess} options={["HR", "Hiring Manager", "Line Manager", "Executive Team", "Other"]} />
          </F>
          <Divider />
          <div style={{ background: "#f7f3ee", border: "1px solid #e8e2da", borderRadius: 8, padding: "14px 18px" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#4a4238", lineHeight: 1.7, margin: 0 }}>
              Strategia also offers <strong style={{ fontWeight: 600 }}>Leadership Assessments</strong> — structured evaluations that combine psychometric profiling with scenario-based analysis to give you a clear, data-driven view of leadership capability, readiness, and development needs across your senior team.
            </p>
          </div>
          <F label="Would your organisation be interested in leadership assessments or scenario analysis for your senior team?">
            <RG value={leadershipInterest} onChange={setLeadershipInterest} options={["Yes — we'd like to explore this", "Possibly — tell us more during onboarding", "Not at this stage"]} />
          </F>
          {leadershipInterest && leadershipInterest !== "Not at this stage" && (
            <F label="What would you most want to understand about your leadership team?" note="For example: succession readiness, decision-making under pressure, leadership style alignment, team dynamics at the executive level">
              <textarea className="si" value={leadershipNotes} onChange={(e) => setLeadershipNotes(e.target.value)}
                placeholder="Describe what you'd like to learn about your leadership team..."
                rows={3} style={{ ...ib, resize: "vertical", lineHeight: 1.5, height: "auto" }} />
            </F>
          )}
        </div>
      );
      case 6: return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <SH number={7} title="Recruitment Workflow & Process" subtitle="Map your current recruitment process — Strategia's Workforce Intelligence layer will integrate with and enhance each step" />
          <WorkflowBuilder steps={workflowSteps} onReorder={reorderWorkflow} onRemoveStep={removeWorkflowStep} onAddStep={addWorkflowStep} personnelMap={personnelMap} onPersonnelChange={togglePersonnel} />
          <F label="Flowchart or Additional Notes" note="Note if a process flowchart will be provided separately">
            <textarea className="si" value={flowchartNote} onChange={(e) => setFlowchartNote(e.target.value)} placeholder="Additional process notes..." rows={3} style={{ ...ib, resize: "vertical", lineHeight: 1.5 }} />
          </F>
        </div>
      );
      case 7: return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <SH number={8} title="Success Criteria" subtitle="What would define success for your organisation" />
          <CG selected={successCriteria} onChange={setSuccessCriteria} options={SUCCESS_CRITERIA} columns={1} />
          <F label="Other Success Criteria" note="If applicable"><TI value={successOther} onChange={setSuccessOther} placeholder="Any additional success measures..." /></F>
        </div>
      );
      case 8: return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <SH number={9} title="Platform Setup" subtitle="Configure your Strategia Workforce Intelligence deployment" />
          <F label="Desired Initial Duration"><TI value={pilotDuration} onChange={setPilotDuration} placeholder="e.g. 12 months (minimum)" /></F>
          <div>
            <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, color: "#6b6058", letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 10 }}>
              Deployment Locations<span style={{ color: "#c4956a", marginLeft: 3 }}>*</span>
            </label>
            {pilotOffices.map((o, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8, alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}><Sel value={o.region} onChange={(v) => { const n = [...pilotOffices]; n[i] = { ...n[i], region: v, location: "" }; setPilotOffices(n); }} options={REGIONS} placeholder="Select region..." /></div>
                <div style={{ flex: 1 }}>
                  {o.region
                    ? <Sel value={o.location} onChange={(v) => { const n = [...pilotOffices]; n[i] = { ...n[i], location: v }; setPilotOffices(n); }} options={REGION_CITIES[o.region] || []} placeholder="Select city..." />
                    : <Sel value="" onChange={() => {}} options={[]} placeholder="Select a region first..." />}
                </div>
                {i > 0 && <button onClick={() => setPilotOffices(pilotOffices.filter((_, idx) => idx !== i))} className="sr" style={{ background: "none", border: "none", color: "#c4956a", cursor: "pointer", fontSize: 18, padding: "8px 4px", transition: "color 0.15s" }}>×</button>}
              </div>
            ))}
            <button onClick={addPilotOffice} className="sa" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#c4956a", background: "none", border: "1px dashed #d4c4a8", borderRadius: 6, padding: "6px 16px", cursor: "pointer", marginTop: 4, transition: "all 0.15s" }}>+ Add Location</button>
          </div>
          <F label="Business Units / Functions Involved"><TI value={pilotUnits} onChange={setPilotUnits} placeholder="e.g. HR, IT, Operations, Clinical" /></F>
          <F label="Approx. Number of Roles to Onboard" required><TI value={pilotRoleCount} onChange={setPilotRoleCount} placeholder="e.g. 50" type="number" /></F>
        </div>
      );
      case 9: {
        const reg = REGION_DATA[offices[0]?.region] || null;
        const ind = INDUSTRY_DATA[industry] || null;
        const hasRegion = !!reg;
        const hasIndustry = !!ind;
        const hasAnyContext = hasRegion || hasIndustry;

        // Parse user inputs
        const agencyVal = parseNum(agencySpend);
        const ttfVal = parseNum(timeToFill);
        const cphVal = parseNum(costPerHire);
        const vacVal = parseNum(totalVacancies);
        const staffVal = parseNum(totalStaff);

        // Calculate projected metrics
        const adjCph = reg ? Math.round(reg.cph * (ind?.cphMult || 1)) : null;
        const adjTtf = reg ? reg.ttf + (ind?.ttfAdd || 0) : null;
        const adjTurnover = reg ? reg.turnover + (ind?.turnoverAdd || 0) : null;

        const userAgencySave = agencyVal > 0 ? { low: Math.round(agencyVal * 0.3), high: Math.round(agencyVal * 0.5) } : null;
        const userTtfSave = ttfVal > 0 ? Math.round(ttfVal * 0.5) : null;
        const userCphSave = cphVal > 0 ? Math.round(cphVal * 0.3) : null;
        const userAnnualCphSave = userCphSave && vacVal > 0 ? userCphSave * vacVal : null;

        const usd = (n) => `$${n.toLocaleString()}`;

        const metricCard = (label, value, sub, accent) => (
          <div style={{
            background: "#fff", border: "1px solid #ebe6df", borderRadius: 10,
            padding: "18px 20px", display: "flex", flexDirection: "column", gap: 4,
            borderTop: `3px solid ${accent}`,
          }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#b8a080", letterSpacing: 1.2, textTransform: "uppercase" }}>{label}</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: "#2a2520", letterSpacing: -0.5 }}>{value}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: "#8a7e72", lineHeight: 1.5 }}>{sub}</span>
          </div>
        );

        const sourceRow = (item, i) => (
          <div key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: "#6b6058", lineHeight: 1.5, padding: "3px 0" }}>
            <span style={{ color: "#4a4238", fontWeight: 500 }}>{item.s}</span>
            <span style={{ color: "#b8a080" }}> — {item.src}</span>
          </div>
        );

        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SH number={10} title="Projected Value" subtitle="Data-backed insights on what Strategia could deliver" />

            {!hasAnyContext ? (
              <div style={{ background: "#f7f3ee", border: "1px solid #e0d8cf", borderRadius: 10, padding: "32px 24px", textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#c4956a", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>SELECT YOUR REGION & INDUSTRY</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#6b6058", lineHeight: 1.7, margin: 0, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
                  Head back to <strong>Organisation Information</strong> and select your region and industry — we'll generate projected savings and benchmarks tailored to your market.
                </p>
              </div>
            ) : (
              <>
                {/* Intro */}
                <div style={{ background: "linear-gradient(135deg, #f7f3ee 0%, #f0ebe4 100%)", border: "1px solid #e0d8cf", borderRadius: 10, padding: "20px 24px" }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#4a4238", lineHeight: 1.7, margin: 0 }}>
                    The insights below are based on {hasRegion ? `${offices[0].region} regional` : "global"}{hasIndustry ? ` and ${industry}` : ""} recruitment benchmarks from published research{agencyVal > 0 || ttfVal > 0 || cphVal > 0 ? ", combined with the data you've provided" : ""}. These are indicative projections to give you a sense of what's possible.
                  </p>
                </div>
                <div style={{ background: "#fff", border: "1.5px solid #c4956a", borderRadius: 10, padding: "18px 22px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20, lineHeight: 1, marginTop: 2, flexShrink: 0 }}>◈</span>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#2a2520", fontWeight: 600, lineHeight: 1.5, margin: "0 0 4px" }}>
                      Want the full picture?
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6b6058", lineHeight: 1.7, margin: "0 0 8px" }}>
                      Once you submit this discovery form, our team will respond within <strong style={{ color: "#2a2520" }}>48 hours</strong> with your cost savings.
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6b6058", lineHeight: 1.7, margin: 0 }}>
                      Following that, Strategia will prepare an <strong style={{ color: "#2a2520" }}>in-depth, organisation-specific report</strong> — with precise dollar-value projections, workforce efficiency modelling, and a detailed business case built from your actual recruitment data. What you see below is a starting point; the full report goes significantly deeper.
                    </p>
                  </div>
                </div>

                {/* Your projected savings — only if they entered data */}
                {(userAgencySave || userTtfSave || userCphSave) && (
                  <>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#c4956a", letterSpacing: 1.5, textTransform: "uppercase" }}>YOUR PROJECTED SAVINGS</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      {userAgencySave && metricCard(
                        "Agency Spend Reduction",
                        `${usd(userAgencySave.low)}–${usd(userAgencySave.high)}/yr`,
                        `30–50% reduction on your ${usd(agencyVal)} annual agency spend`,
                        "#8bab7a"
                      )}
                      {userTtfSave && metricCard(
                        "Time-to-Fill Improvement",
                        `${userTtfSave} days`,
                        `Down from your current ${ttfVal} days — AI screening reduces time-to-hire by 50% (Deloitte / PwC)`,
                        "#c4956a"
                      )}
                      {userAnnualCphSave ? metricCard(
                        "Annual Hiring Savings",
                        `${usd(userAnnualCphSave)}/yr`,
                        `${usd(userCphSave)} saved per hire × ${vacVal.toLocaleString()} annual roles`,
                        "#8a9aab"
                      ) : userCphSave ? metricCard(
                        "Cost-per-Hire Reduction",
                        `${usd(userCphSave)} per hire`,
                        `~30% efficiency gain on your ${usd(cphVal)} CPH through AI-driven screening and reduced agency reliance`,
                        "#8a9aab"
                      ) : null}
                    </div>
                  </>
                )}

                {/* Market benchmarks */}
                {hasRegion && (
                  <>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#b8a080", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>
                      {offices[0].region.toUpperCase()} MARKET BENCHMARKS
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                      {metricCard("Avg. Cost-per-Hire", usd(adjCph || reg.cph), ind ? `${industry} adjusted` : `${offices[0].region} average`, "#c4956a")}
                      {metricCard("Avg. Time-to-Fill", `${adjTtf || reg.ttf} days`, ind ? `${industry} adjusted` : `${offices[0].region} average`, "#9aab8a")}
                      {metricCard("Annual Employee Churn", `${adjTurnover || reg.turnover}%`, ind ? `${industry} adjusted` : `${offices[0].region} average`, "#8a9aab")}
                    </div>

                    {/* Comparison table if user entered data */}
                    {(ttfVal > 0 || cphVal > 0 || agencyVal > 0) && (
                      <div style={{ background: "#fff", border: "1px solid #ebe6df", borderRadius: 8, overflow: "hidden" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr 1.5fr", padding: "8px 16px", background: "#f7f3ee", fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#b8a080", letterSpacing: 0.8, textTransform: "uppercase", borderBottom: "1px solid #e8e2da" }}>
                          <span>Metric</span><span>Your Current</span><span>{offices[0].region} Avg.</span><span>With Strategia</span>
                        </div>
                        {ttfVal > 0 && (
                          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr 1.5fr", padding: "10px 16px", borderBottom: "1px solid #f0ebe4", background: "#faf8f5", fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: "#4a4238" }}>
                            <span style={{ fontWeight: 500 }}>Time-to-Fill</span>
                            <span>{ttfVal} days</span>
                            <span style={{ color: "#9a8e82" }}>{adjTtf} days</span>
                            <span style={{ color: "#8bab7a", fontWeight: 600 }}>{userTtfSave} days</span>
                          </div>
                        )}
                        {cphVal > 0 && (
                          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr 1.5fr", padding: "10px 16px", borderBottom: agencyVal > 0 ? "1px solid #f0ebe4" : "none", background: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: "#4a4238" }}>
                            <span style={{ fontWeight: 500 }}>Cost-per-Hire</span>
                            <span>{usd(cphVal)}</span>
                            <span style={{ color: "#9a8e82" }}>{usd(adjCph)}</span>
                            <span style={{ color: "#8bab7a", fontWeight: 600 }}>{usd(Math.round(cphVal * 0.7))}</span>
                          </div>
                        )}
                        {agencyVal > 0 && (
                          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr 1.5fr", padding: "10px 16px", background: "#faf8f5", fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: "#4a4238" }}>
                            <span style={{ fontWeight: 500 }}>Agency Spend</span>
                            <span>{usd(agencyVal)}</span>
                            <span style={{ color: "#9a8e82" }}>—</span>
                            <span style={{ color: "#8bab7a", fontWeight: 600 }}>{usd(Math.round(agencyVal * 0.55))}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* ═══ WHAT STRATEGIA COULD DELIVER ═══ */}
                <div style={{ background: "#2a2520", borderRadius: 12, padding: "28px 28px 24px", marginTop: 4 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: "#f0ebe4", marginBottom: 4 }}>
                    What Strategia Could Deliver
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: "#b8a080", margin: "0 0 20px", lineHeight: 1.6 }}>
                    Based on research from leading institutions, here's what organisations like yours typically see when adopting structured, AI-assisted workforce platforms. These are indicative ranges — actual outcomes are shaped during onboarding.
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                    {/* Time-to-Fill */}
                    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "16px 18px", borderLeft: "3px solid #c4956a" }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#c4956a", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 6 }}>TIME-TO-FILL</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#f0ebe4", marginBottom: 4 }}>
                        {ttfVal > 0 ? `${ttfVal} → ~${userTtfSave} days` : "Up to 50% faster"}
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9a8e82", lineHeight: 1.5 }}>
                        {ttfVal > 0 ? `AI-assisted screening could reduce your ${ttfVal}-day cycle significantly` : "Research suggests AI-driven screening can halve average time-to-hire"}
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, color: "#6b6058", marginTop: 6, fontStyle: "italic" }}>Deloitte / PwC / IBM, 2025</div>
                    </div>

                    {/* Cost-per-Hire */}
                    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "16px 18px", borderLeft: "3px solid #8bab7a" }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#8bab7a", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 6 }}>COST-PER-HIRE</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#f0ebe4", marginBottom: 4 }}>
                        {cphVal > 0 ? `${usd(cphVal)} → ~${usd(Math.round(cphVal * 0.7))}` : "20–40% potential reduction"}
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9a8e82", lineHeight: 1.5 }}>
                        {cphVal > 0 ? `Automated screening and reduced agency reliance could lower your cost-per-hire by up to 30%` : "Organisations using AI-automated screening typically report 20–40% lower cost-per-hire"}
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, color: "#6b6058", marginTop: 6, fontStyle: "italic" }}>Greenhouse / GoodTime, 2025</div>
                    </div>

                    {/* Agency Cost Reduction */}
                    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "16px 18px", borderLeft: "3px solid #9aab8a" }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#9aab8a", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 6 }}>AGENCY COST REDUCTION</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#f0ebe4", marginBottom: 4 }}>
                        {agencyVal > 0 ? `${usd(userAgencySave.low)}–${usd(userAgencySave.high)}/yr` : "30–50% potential savings"}
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9a8e82", lineHeight: 1.5 }}>
                        {agencyVal > 0 ? `By building internal sourcing capability, your organisation could progressively reduce up to ${usd(agencyVal)} in annual agency fees` : "Strategia helps build your internal sourcing capability, enabling a gradual reduction in external agency dependency"}
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, color: "#6b6058", marginTop: 6, fontStyle: "italic" }}>SHRM / CIPD benchmarks</div>
                    </div>

                    {/* Quality of Hire */}
                    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "16px 18px", borderLeft: "3px solid #8a9aab" }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#8a9aab", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 6 }}>QUALITY OF HIRE</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#f0ebe4", marginBottom: 4 }}>
                        Up to +67% improvement
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9a8e82", lineHeight: 1.5 }}>
                        Research indicates predictive hiring models can improve candidate-role fit by up to 67% over traditional methods. Currently, only 20% of organisations measure this metric.
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, color: "#6b6058", marginTop: 6, fontStyle: "italic" }}>Deloitte People Analytics / SHRM, 2025</div>
                    </div>
                  </div>

                  {/* Strategia capability row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    {[
                      { icon: "◎", label: "Build Internal Agency Capability", desc: "Reduce external agency reliance over time by developing your own AI-powered sourcing and screening engine" },
                      { icon: "◉", label: "Screening Automation", desc: `Potential to process ${vacVal > 0 ? vacVal.toLocaleString() + "+ applications" : "thousands of CVs"} with high accuracy, freeing up to 23 hours of recruiter time per hire` },
                      { icon: "◈", label: "Workforce Intelligence", desc: "Strategia sits on top of your existing tools — each hire enriches your organisation's data, progressively building a Workforce DNA that sharpens every subsequent decision" },
                    ].map((c, ci) => (
                      <div key={ci} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "14px 16px" }}>
                        <div style={{ fontSize: 18, color: "#c4956a", marginBottom: 6 }}>{c.icon}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#f0ebe4", marginBottom: 4 }}>{c.label}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#8a7e72", lineHeight: 1.5 }}>{c.desc}</div>
                      </div>
                    ))}
                  </div>

                  {/* Total projected value callout */}
                  {(userAgencySave || userAnnualCphSave) && (
                    <div style={{ marginTop: 16, background: "rgba(139,171,122,0.12)", borderRadius: 8, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#8bab7a", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 2 }}>POTENTIAL ANNUAL VALUE</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9a8e82" }}>Indicative combined savings based on your data</div>
                      </div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: "#8bab7a" }}>
                        ~{usd((userAgencySave?.low || 0) + (userAnnualCphSave || 0))}<span style={{ fontSize: 16, color: "#6b6058" }}>+</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Industry insights */}
                {hasIndustry && ind.notes && ind.notes.length > 0 && (
                  <div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#b8a080", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>
                      {industry.toUpperCase()} — INDUSTRY INSIGHTS
                    </div>
                    <div style={{ background: "#fff", border: "1px solid #ebe6df", borderRadius: 8, padding: "14px 18px", display: "flex", flexDirection: "column", gap: 2 }}>
                      {ind.notes.map(sourceRow)}
                    </div>
                  </div>
                )}

                {/* Sources — region + industry combined, clearly labelled */}
                {(hasRegion || hasIndustry) && (
                  <div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#b8a080", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>
                      BENCHMARK SOURCES
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {hasRegion && reg.sources.map(sourceRow)}
                      {hasIndustry && ind.notes && ind.notes.map(sourceRow)}
                    </div>
                  </div>
                )}

                {/* Scale insight */}
                {staffVal >= 1000 && (
                  <div style={{ background: "#f7f3ee", border: "1px solid #e0d8cf", borderRadius: 8, padding: "14px 18px" }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#4a4238", lineHeight: 1.7, margin: 0 }}>
                      With <strong>{staffVal.toLocaleString()} staff</strong>, your organisation has the scale where Strategia's Workforce DNA layer compounds value over time — each hire, assessment, and outcome enriches your organisation's intelligence, making every subsequent decision sharper and faster.
                    </p>
                  </div>
                )}

                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#b8a080", fontStyle: "italic", margin: 0 }}>
                  All values in USD. Projections calculated from your inputs where provided. Benchmarks sourced from SHRM, CIPD, Deloitte, McKinsey, Greenhouse, and other cited research. Actual outcomes refined during platform onboarding.
                </p>
              </>
            )}
          </div>
        );
      }
      case 10: return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <SH number={11} title="Sign-Off" subtitle="Final acknowledgment and authorisation" />
          <div style={{ background: "#f7f3ee", border: "1px solid #e0d8cf", borderRadius: 8, padding: 20, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6b6058", lineHeight: 1.7 }}>
            By completing and submitting this document, you confirm that you have the authority to act on behalf of your organisation in engaging with Strategia.
          </div>
          <Row>
            <F label="Name" required half><TI value={signName} onChange={setSignName} placeholder="Full name" /></F>
            <F label="Title" required half><TI value={signTitle} onChange={setSignTitle} placeholder="Your title" /></F>
          </Row>
          <F label="Date" required><DateInput value={signDate} onChange={setSignDate} /></F>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label onClick={() => setSignAuthority(!signAuthority)} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#4a4238", lineHeight: 1.5 }}>
              <Chk checked={signAuthority} onToggle={() => setSignAuthority(!signAuthority)} />
              <span>I confirm that I have the authority to enter into this engagement on behalf of my organisation.</span>
            </label>
            <label onClick={() => setSignAgree(!signAgree)} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#4a4238", lineHeight: 1.5 }}>
              <Chk checked={signAgree} onToggle={() => setSignAgree(!signAgree)} />
              <span>I agree to the <a href="https://strategiatech.io/terms" target="_blank" rel="noopener" style={{ color: "#c4956a", textDecoration: "underline" }}>Terms of Service</a> and <a href="https://strategiatech.io/privacy-policy" target="_blank" rel="noopener" style={{ color: "#c4956a", textDecoration: "underline" }}>Privacy Policy</a>.</span>
            </label>
          </div>
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 4 }}>
            <Turnstile
              key={turnstileRenderKey}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
              onVerify={setTurnstileToken}
              onError={(errorCode) => {
                console.error("Turnstile verification failed:", errorCode);
                setTurnstileToken(null);
                defaultNotificationAdapter.error("Bot verification failed. Please refresh and try again.");
              }}
              onExpire={() => setTurnstileToken(null)}
            />
          </div>
        </div>
      );
    }
  };

  // ─── Thank You Page ─────────────────────────────────────────────────
  if (submitted) return (
    <div style={{ minHeight: "100vh", background: "#fdfcfa", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{GLOBAL_CSS}</style>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{
        borderBottom: "1px solid #e8e2da", padding: "14px 40px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "#fdfcfa",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#2a2520", letterSpacing: -0.5 }}>Strategia</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#b8a080", letterSpacing: 1 }}>DISCOVERY FORM</span>
        </div>
      </div>
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "80px 40px", textAlign: "center" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", background: "#8bab7a",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px",
          }}>
            <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
              <path d="M2 11L10 19L26 3" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, color: "#2a2520", margin: "0 0 12px", letterSpacing: -0.5 }}>
            Thank You
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#6b6058", lineHeight: 1.7, margin: 0 }}>
            Your discovery form has been submitted successfully.
          </p>
        </div>
        <div style={{ background: "#f7f3ee", border: "1px solid #e0d8cf", borderRadius: 12, padding: "28px 32px", textAlign: "left", marginBottom: 32 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#c4956a", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>WHAT HAPPENS NEXT</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { num: "01", title: "We review your submission", desc: "Our team will analyse the information you've provided and prepare a tailored response." },
              { num: "02", title: "Your organisation-specific report", desc: "Strategia will prepare an in-depth report with precise dollar-value projections, workforce efficiency modelling, and a detailed business case — built from your actual data." },
              { num: "03", title: "Discovery call", desc: `We'll reach out to ${champName || "your project champion"} to schedule a walkthrough of the report and discuss next steps.` },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 14 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#c4956a", fontWeight: 600, flexShrink: 0, marginTop: 2 }}>{step.num}</span>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "#2a2520", marginBottom: 2 }}>{step.title}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#8a7e72", lineHeight: 1.6 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9a8e82", lineHeight: 1.6 }}>
          Questions in the meantime? Reach us at <a href="https://strategiatech.io" target="_blank" rel="noopener" style={{ color: "#c4956a", textDecoration: "underline" }}>strategiatech.io</a>
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#fdfcfa", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{GLOBAL_CSS}</style>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <div className="q-header" style={{
        borderBottom: "1px solid #e8e2da", padding: "14px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(253,252,250,0.92)", backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div className="q-brand" style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#2a2520", letterSpacing: -0.5 }}>Strategia</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#b8a080", letterSpacing: 1 }}>DISCOVERY FORM</span>
        </div>
        <ProgressRing completed={completedCount} total={SECTIONS.length} />
      </div>
      <SummaryPanel data={summaryData} isOpen={summaryOpen} onToggle={() => setSummaryOpen(!summaryOpen)} />
      <div className="q-form-shell" style={{ display: "flex", gap: 48, maxWidth: 1000, margin: "0 auto", padding: "32px 40px 80px" }}>
        <ProgressNav currentSection={section} onNavigate={go} completionMap={completionMap} />
        <div className="q-form-card" style={{ flex: 1, minWidth: 0, background: "#fff", border: "1px solid #ebe6df", borderRadius: 12, padding: "36px 40px", boxShadow: "0 1px 4px rgba(42,37,32,0.04)" }}>
          <div key={sectionKey} className="sse">{renderSection()}</div>
          <div className="q-bottom-actions" style={{ display: "flex", justifyContent: "space-between", marginTop: 40, paddingTop: 24, borderTop: "1px solid #f0ebe4" }}>
            <button onClick={prev} disabled={section === 0} className="sb" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
              color: section === 0 ? "#d4ccc2" : "#6b6058", background: "none",
              border: "1px solid #e0d8cf", borderRadius: 8, padding: "10px 24px",
              cursor: section === 0 ? "default" : "pointer", transition: "all 0.2s",
            }}>← Previous</button>
            {section < SECTIONS.length - 1 ? (
              <button onClick={next} className="sb" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#fff",
                background: "#2a2520", border: "none", borderRadius: 8, padding: "10px 28px",
                cursor: "pointer", transition: "all 0.2s",
              }}>Continue →</button>
            ) : (
              <button onClick={handleSubmit} disabled={!(signAgree && signAuthority) || submitting} className="sb" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#fff",
                background: (signAgree && signAuthority) ? "#8bab7a" : "#c4c0ba", border: "none", borderRadius: 8,
                padding: "10px 28px", cursor: (signAgree && signAuthority) ? "pointer" : "default", transition: "all 0.2s",
              }}>Submit Form</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
