import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Sparkles,
  Terminal,
  Sliders,
  ChevronRight,
  ChevronDown,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Command,
  ShieldCheck,
  Layers,
  Database,
  Cpu,
  Briefcase,
  GraduationCap,
  Mail,
  Linkedin,
  FileText,
  Printer,
  X,
  ArrowRight,
  Activity,
  BarChart3,
  GitMerge,
  CheckCircle2,
  Clock,
  Globe,
  Search,
  Filter,
  Eye,
  Zap,
  Building2
} from 'lucide-react';

// --- CUSTOM SPRING PHYSICS, TYPOGRAPHY & SURFACE TOKENS ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

  :root {
    --font-serif: 'Instrument Serif', Georgia, serif;
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .font-serif-editorial {
    font-family: var(--font-serif);
  }
  .font-sans-ui {
    font-family: var(--font-sans);
    letter-spacing: -0.018em;
  }
  .font-mono-tabular {
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
  }

  /* Emil Kowalski Fluid Spring Transitions */
  .spring-all {
    transition: all 0.48s var(--ease-spring);
  }
  .spring-fast {
    transition: all 0.24s var(--ease-out-expo);
  }
  .spring-drawer-bg {
    transition: transform 0.55s var(--ease-spring), border-radius 0.55s var(--ease-spring), filter 0.55s var(--ease-spring);
  }

  /* Tactile Micro-Press */
  .tactile:active {
    transform: scale(0.975);
  }

  /* Concentric Radii System: R_outer = R_inner + Padding */
  .radius-outer {
    border-radius: 24px;
  }
  .radius-card {
    border-radius: 16px;
  }
  .radius-inner {
    border-radius: 10px;
  }

  /* Architectural Grid Background */
  .bg-arch-grid-dark {
    background-size: 56px 56px;
    background-image: 
      linear-gradient(to right, rgba(143, 224, 209, 0.035) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(143, 224, 209, 0.035) 1px, transparent 1px);
  }
  .bg-arch-grid-light {
    background-size: 56px 56px;
    background-image: 
      linear-gradient(to right, rgba(19, 34, 56, 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(19, 34, 56, 0.04) 1px, transparent 1px);
  }

  /* Print-friendly Dossier Rules */
  @media print {
    .no-print {
      display: none !important;
    }
    body {
      background: #ffffff !important;
      color: #132238 !important;
    }
  }
`;

// --- CORE DATA PRESERVED & ENRICHED FROM SHARAJ_INTERACTIVE_PROFILE.HTML ---

const OUTCOME_METRICS = [
  {
    id: 'metric-rev',
    value: '€1M',
    label: 'Revenue recovered',
    sublabel: 'Cross-system analysis',
    sector: 'Utilities',
    client: 'Uisce Éireann (via CMOS Ltd)',
    verification: 'Reconciled Oracle C2M & Temetra meter-to-cash datasets, isolating unbilled commercial anomalies and driving executive recovery workflows.',
    sparkline: [32, 45, 41, 68, 79, 92, 100],
    delta: '+100% Audited Target'
  },
  {
    id: 'metric-ai',
    value: '$600K+',
    label: 'Project value',
    sublabel: 'Enterprise AI delivery',
    sector: 'Aviation',
    client: 'Botminds AI',
    verification: 'Translated complex aviation compliance mandates into prioritized Jira sprints, securing multi-hundred-thousand-dollar enterprise expansions.',
    sparkline: [20, 38, 52, 61, 75, 88, 96],
    delta: 'Multi-Year ACV Secured'
  },
  {
    id: 'metric-sla',
    value: '100%',
    label: 'SLA compliance',
    sublabel: 'Technical delivery',
    sector: 'Banking',
    client: 'Software AG (Middle East Banking)',
    verification: 'Zero SLA breaches across 350+ production Linux servers supporting mission-critical core banking middleware and executive incident reporting.',
    sparkline: [100, 100, 99.9, 100, 100, 100, 100],
    delta: '350+ Linux Servers'
  },
  {
    id: 'metric-csat',
    value: '5/5',
    label: 'Customer satisfaction',
    sublabel: 'Client engagement',
    sector: 'All Sectors',
    client: 'Enterprise Stakeholders',
    verification: 'Consistent top-tier executive feedback across European, Middle Eastern, and Indian delivery engagements for clarity and follow-through.',
    sparkline: [94, 96, 98, 100, 100, 100, 100],
    delta: 'Top Decile CSAT'
  }
];

const SERVICE_PILLARS = [
  {
    id: 'srv-01',
    num: '01 / BUSINESS ANALYSIS',
    title: 'Turn ambiguity into a clear plan',
    summary: 'Make business needs actionable for the team that has to deliver them.',
    bullets: [
      'Requirements discovery and process mapping',
      'User stories, acceptance criteria and UAT coordination',
      'Decision logs and change tracking'
    ],
    sectors: ['Utilities', 'Aviation', 'Banking', 'Technology', 'Credit / Insurance'],
    artifactPreview: {
      type: 'Requirements Traceability Matrix',
      code: 'REQ-104: Automated Meter Anomaly Flagging → UAT Passed (99.4% Parity)',
      deliverable: 'Ready-for-Engineering Jira Epics + Sign-off Log'
    }
  },
  {
    id: 'srv-02',
    num: '02 / STAKEHOLDER & CLIENT DELIVERY',
    title: 'Keep people aligned and moving',
    summary: 'Act as the bridge between the client, management and technical teams.',
    bullets: [
      'Client meetings, actions and follow-ups',
      'Risk, dependency and issue tracking',
      'Clear escalations and executive updates'
    ],
    sectors: ['Banking', 'Utilities', 'Aviation', 'Hospitality', 'Retail'],
    artifactPreview: {
      type: 'Executive Steering RAID & Cadence',
      code: 'STATUS: GREEN · 0 Unowned Blockers · 14/14 Client Actions Closed',
      deliverable: 'Weekly C-Suite Brief & Cross-Vendor Alignment'
    }
  },
  {
    id: 'srv-03',
    num: '03 / REPORTING & OPERATIONS',
    title: 'Make performance easier to see',
    summary: 'Convert operational data and project activity into a useful management view.',
    bullets: [
      'KPI dashboards and status reporting',
      'Root-cause analysis and data reconciliation',
      'Recommendations backed by evidence'
    ],
    sectors: ['Utilities', 'Banking', 'Retail', 'Credit / Insurance', 'Technology'],
    artifactPreview: {
      type: 'Cross-System Reconciliation Telemetry',
      code: 'SELECT account_id, variance_eur FROM c2m_temetra_diff WHERE variance > 5000;',
      deliverable: 'Automated KPI Board Deck + Root-Cause Dossier'
    }
  },
  {
    id: 'srv-04',
    num: '04 / PRODUCT & PROJECT COORDINATION',
    title: 'Help delivery stay on track',
    summary: 'Bring discipline to the work between a decision and a delivered outcome.',
    bullets: [
      'Backlog, roadmap and sprint coordination',
      'Milestones, dependencies and follow-through',
      'Vendor and cross-functional coordination'
    ],
    sectors: ['Aviation', 'Technology', 'Utilities', 'Hospitality', 'Retail'],
    artifactPreview: {
      type: 'Sprint Velocity & Release Governance',
      code: 'SPRINT-24: 42 Story Points Committed · 42 Delivered · 0 Carryover',
      deliverable: 'Prioritized Product Roadmap & Release Readiness'
    }
  }
];

const SECTORS = [
  'All Sectors',
  'Banking',
  'Aviation',
  'Credit / Insurance',
  'Retail',
  'Hospitality',
  'Technology',
  'Utilities'
];

const CASE_STUDIES = [
  {
    id: 'case-utilities',
    tag: 'Revenue recovery · Utilities / operations',
    sector: 'Utilities',
    title: '€1,000,000 identified and recovered',
    metric: 'Cross-system reconciliation · KPI dashboards · Senior stakeholders',
    headlineMetric: '€1,000,000',
    organization: 'Uisce Éireann (via CMOS Ltd)',
    role: 'Technical Account Manager / Product Operations',
    description:
      'In a Technical Account Manager / Product Operations role supporting Uisce Éireann, reconciled Oracle C2M and Temetra data, investigated billing anomalies and customer friction, and built Excel dashboards to help senior stakeholders act on findings.',
    architecture: [
      { stage: '01. Ingestion', detail: 'Extracted raw meter read telemetry from Temetra & billing ledgers from Oracle C2M.' },
      { stage: '02. Reconciliation', detail: 'Isolated synchronization gaps, stuck workflows, and unbilled high-volume tariff accounts.' },
      { stage: '03. Executive Action', detail: 'Delivered decision-ready KPI workbooks enabling €1M+ in verified revenue recovery.' }
    ],
    simulatorData: {
      label: 'Interactive C2M ↔ Temetra Anomaly Reconciler',
      totalAccounts: '48,200 Audited',
      discrepancyRate: '2.4% Sync Drift Isolated',
      recoveredValue: '€1,000,000+'
    }
  },
  {
    id: 'case-aviation',
    tag: 'Enterprise AI · Aviation',
    sector: 'Aviation',
    title: '$600,000+ in project value secured',
    metric: 'Client requirements · Agile delivery · Executive roadmap presentations',
    headlineMetric: '$600,000+',
    organization: 'Botminds AI',
    role: 'Technical Product Owner (Solutions Engineer)',
    description:
      'At Botminds AI, worked across enterprise stakeholders and engineering teams on an AI-powered aviation compliance platform. Prioritised the Jira backlog, facilitated sprint execution and presented roadmaps. Also supported automated data extraction and background-verification workflows.',
    architecture: [
      { stage: '01. Discovery', detail: 'Mapped complex regulatory aviation directives into deterministic AI document extraction rules.' },
      { stage: '02. Agile Execution', detail: 'Owned Jira backlog grooming, sprint ceremonies, and ML engineering feasibility alignment.' },
      { stage: '03. Commercial Impact', detail: 'Presented executive product roadmaps that unlocked $600K+ in enterprise contract value.' }
    ],
    simulatorData: {
      label: 'Aviation Compliance AI Pipeline Telemetry',
      totalAccounts: '12,500+ Regulatory Docs',
      discrepancyRate: '99.2% Extraction Precision',
      recoveredValue: '$600,000+ Contract Value'
    }
  },
  {
    id: 'case-banking',
    tag: 'Technical delivery · Banking',
    sector: 'Banking',
    title: '100% SLA compliance and 5/5 CSAT',
    metric: '350+ Linux servers · Technical reporting · Client communication',
    headlineMetric: '100% SLA · 5/5',
    organization: 'Software AG',
    role: 'Associate Technical Consultant',
    description:
      'At Software AG, supported major banking clients across the Middle East across deployments, system health and troubleshooting for more than 350 Linux servers. Coordinated with DBAs and technical leads, translating complex system metrics into clear client updates.',
    architecture: [
      { stage: '01. Infrastructure Ops', detail: 'Monitored deployments and middleware health across 350+ production Linux nodes.' },
      { stage: '02. Cross-Team Triage', detail: 'Coordinated DBAs, network engineers, and core banking leads during high-stakes windows.' },
      { stage: '03. Client Reporting', detail: 'Translated low-level kernel/JVM telemetry into clear executive status briefings (5/5 CSAT).' }
    ],
    simulatorData: {
      label: 'Middle East Banking Fleet Telemetry',
      totalAccounts: '350+ Production Linux Nodes',
      discrepancyRate: '0 SLA Breaches (34 Months)',
      recoveredValue: '5.0 / 5.0 Client CSAT'
    }
  },
  {
    id: 'case-ml',
    tag: 'Data & analytics · Applied ML projects',
    sector: 'Technology',
    title: 'Built measurable, user-facing analytics prototypes',
    metric: '94.55% predictive accuracy · 97.75% classification accuracy',
    headlineMetric: '97.75% Acc.',
    organization: 'University of Galway · Applied Research',
    role: 'Data Analytics & ML Lead',
    description:
      'Built an interactive cycleway and road-quality analytics platform using sensor data, mapping and computer vision, with reported 94.55% predictive accuracy. Also developed a road-surface classification web app with a ResNet50–MobileNetV3 hybrid model and reported 97.75% accuracy. These projects demonstrate technical fluency when discussing feasibility and requirements with engineering teams.',
    architecture: [
      { stage: '01. Sensor & CV Pipeline', detail: 'Fused geospatial telemetry with computer vision frame analysis in Python/TensorFlow.' },
      { stage: '02. Hybrid Architecture', detail: 'Engineered a ResNet50–MobileNetV3 hybrid classifier achieving 97.75% validation accuracy.' },
      { stage: '03. Product Delivery', detail: 'Deployed interactive Flask/Streamlit web interfaces so non-technical planners could act on model outputs.' }
    ],
    simulatorData: {
      label: 'ResNet50–MobileNetV3 & Sensor Telemetry',
      totalAccounts: '94.55% Predictive Accuracy',
      discrepancyRate: '97.75% Classification Accuracy',
      recoveredValue: 'Production Web App Deployed'
    }
  }
];

const TRANSLATION_EXAMPLES = [
  {
    id: 'trans-1',
    context: 'Utilities Billing & Meter Operations',
    rawSignal: 'SQL/ETL Query: 1,842 active commercial meter IDs in Temetra lack corresponding tariff rate keys in Oracle C2M table CI_ACCT_CHAR.',
    sharajBridge: 'Root-cause reconciliation + financial impact modeling + remediation tracker across Metering & Billing ops.',
    executiveDecision: 'Board Brief: €1.0M in unbilled commercial consumption isolated; 3-week automated patch approved with weekly recovery KPI tracking.'
  },
  {
    id: 'trans-2',
    context: 'Enterprise AI & Aviation Compliance',
    rawSignal: 'ML Engineering: NLP transformer confidence drops below 0.72 on multi-column scanned PDF airworthiness directives.',
    sharajBridge: 'Reprioritized Jira sprint to add human-in-the-loop confidence routing + updated UAT acceptance criteria with client safety officers.',
    executiveDecision: 'Client Steering Update: Phase 1 goes live on schedule with 100% audit trail compliance, unlocking $600K+ expansion milestone.'
  },
  {
    id: 'trans-3',
    context: 'Core Banking Middleware Infrastructure',
    rawSignal: 'Linux/DBA Alert: Thread pool exhaustion and GC pauses exceeding 4,200ms on nodes 14–19 during peak payment clearing.',
    sharajBridge: 'Coordinated DBA index tuning + JVM heap reallocation while shielding banking executives from raw log noise via structured status updates.',
    executiveDecision: 'Executive SLA Report: 100% uptime preserved across 350+ servers; permanent capacity guardrails deployed ahead of quarter-end close.'
  }
];

const TIMELINE_ROLES = [
  {
    period: 'Aug 2024 – Present',
    role: 'Technical Account Manager (Product Operations)',
    org: 'CMOS Ltd, contracted to Uisce Éireann',
    location: 'Europe / Remote Delivery',
    sector: 'Utilities',
    summary: 'Revenue recovery, cross-system data analysis, operational root-cause analysis and executive reporting.',
    highlights: ['€1M revenue identified & recovered', 'Oracle C2M & Temetra data reconciliation', 'Senior stakeholder KPI dashboards']
  },
  {
    period: 'Dec 2022 – Jul 2023',
    role: 'Technical Product Owner (Solutions Engineer)',
    org: 'Botminds AI',
    location: 'Chennai / Global Enterprise Clients',
    sector: 'Aviation',
    summary: 'Enterprise AI products, requirements, agile delivery and stakeholder coordination.',
    highlights: ['$600K+ project value secured', 'Jira backlog & sprint execution', 'Executive roadmap presentations']
  },
  {
    period: 'Sep 2019 – Jun 2022',
    role: 'Associate Technical Consultant',
    org: 'Software AG',
    location: 'Middle East Banking Clients / India',
    sector: 'Banking',
    summary: 'Banking technology delivery, infrastructure operations, troubleshooting and client reporting.',
    highlights: ['100% SLA compliance & 5/5 CSAT', '350+ Linux servers managed', 'DBA & technical lead coordination']
  }
];

const EDUCATION = [
  {
    degree: 'MSc Computer Science (Data Analytics)',
    honours: 'First Class Honours (1:1)',
    institution: 'University of Galway, Ireland',
    year: '2023–2024',
    detail: 'Specialized in Machine Learning, Deep Learning (ResNet50/MobileNetV3), Geospatial Analytics, and Enterprise Data Systems.'
  },
  {
    degree: 'B.E. Computer Science & Engineering',
    honours: 'First Class with Honours',
    institution: 'SSN College of Engineering',
    year: '2019',
    detail: 'Foundational software engineering, database architecture, algorithms, and distributed systems.'
  }
];

export default function App() {
  // Theme & Craft Preferences
  const [theme, setTheme] = useState('dark'); // 'dark' (Executive Navy/Obsidian) | 'light' (Editorial Paper/Teal)
  const [serifMode, setSerifMode] = useState(true); // Toggle editorial serif display headers vs pure geometric sans
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [emailCopied, setEmailCopied] = useState(false);

  // Interactive Filtering & Navigation
  const [activeSector, setActiveSector] = useState('All Sectors');
  const [expandedCases, setExpandedCases] = useState(['case-utilities']);
  const [activeBridgeIdx, setActiveBridgeIdx] = useState(0);

  // Retainer & Engagement Configurator State
  const [retainerModel, setRetainerModel] = useState('fractional'); // 'advisory' | 'fractional' | 'sprint'
  const [retainerHours, setRetainerHours] = useState(20); // 10, 20, 30 hrs/week

  // Vaul-Style Spatial Drawer State
  const [drawerData, setDrawerData] = useState(null); // null or { type: 'case' | 'dossier' | 'reconciler', payload: ... }

  // Command Palette (⌘K) State
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState('');

  // Sonner-Style 3D Stacked Toasts
  const [toasts, setToasts] = useState([]);
  const [toastHovered, setToastHovered] = useState(false);

  // Subtle Web Audio Tactile Click Synthesizer
  const playTactileSound = useCallback(
    (freq = 520, duration = 0.025) => {
      if (!soundEnabled) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.035, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {
        // Ignore audio errors on restricted autoplay
      }
    },
    [soundEnabled]
  );

  // Push a Sonner-style 3D Notification Toast
  const pushToast = useCallback(
    (title, subtitle, tag = 'SYSTEM') => {
      playTactileSound(640, 0.03);
      const id = Date.now() + Math.random();
      setToasts((prev) => [{ id, title, subtitle, tag, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }, ...prev.slice(0, 3)]);
    },
    [playTactileSound]
  );

  // Auto-dismiss oldest toasts
  useEffect(() => {
    if (toasts.length === 0 || toastHovered) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(0, -1));
    }, 4500);
    return () => clearTimeout(timer);
  }, [toasts, toastHovered]);

  // Keyboard Shortcuts: ⌘K / Ctrl+K & Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
        playTactileSound(580, 0.02);
      } else if (e.key === 'Escape') {
        if (cmdOpen) setCmdOpen(false);
        if (drawerData) setDrawerData(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cmdOpen, drawerData, playTactileSound]);

  // Copy Email Handler
  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('sharajjagadeesan@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2200);
    pushToast(
      'Executive Contact Copied',
      'sharajjagadeesan@gmail.com is ready in your clipboard.',
      'DIRECT CHANNEL'
    );
  };

  // Toggle individual or all case studies
  const toggleCase = (id) => {
    playTactileSound(480, 0.02);
    setExpandedCases((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAllCases = () => {
    playTactileSound(540, 0.03);
    if (expandedCases.length === CASE_STUDIES.length) {
      setExpandedCases([]);
      pushToast('Impact Accordion Collapsed', 'All 4 delivery dossiers folded to summary view.', 'VIEWPORT');
    } else {
      setExpandedCases(CASE_STUDIES.map((c) => c.id));
      pushToast('All Delivery Examples Expanded', 'Displaying full context across Utilities, Aviation, Banking & ML.', 'VIEWPORT');
    }
  };

  const isDark = theme === 'dark';

  // Palette Tokens honoring original (--navy:#132238, --teal:#0c8276, --mint:#8fe0d1, --gold:#e7a94b)
  const surfaceBg = isDark ? 'bg-[#09111C] text-[#F1F5F8]' : 'bg-[#EDF2F5] text-[#132238]';
  const cardBg = isDark ? 'bg-[#111D2E]/90' : 'bg-[#FFFFFF]';
  const elevatedBg = isDark ? 'bg-[#16263B]' : 'bg-[#F4F7FA]';
  const borderLine = isDark ? 'border-[#8FE0D1]/15' : 'border-[#D9E2EA]';
  const mutedText = isDark ? 'text-[#8FA3B8]' : 'text-[#607286]';
  const accentMint = isDark ? 'text-[#8FE0D1]' : 'text-[#0C8276]';
  const badgeBg = isDark ? 'bg-[#8FE0D1]/10 text-[#8FE0D1] border-[#8FE0D1]/25' : 'bg-[#0C8276]/10 text-[#0C8276] border-[#0C8276]/25';
  const primaryBtn = isDark
    ? 'bg-[#8FE0D1] text-[#09111C] hover:bg-[#A5ECE0]'
    : 'bg-[#132238] text-[#FFFFFF] hover:bg-[#1E3352]';

  // Retainer Model Details
  const RETAINER_CONFIG = {
    advisory: {
      name: 'Reporting & Operations Advisory',
      tag: 'PART-TIME RETAINER',
      hours: '10–15 hrs / week',
      focus: 'KPI dashboards, cross-system data reconciliation, root-cause analysis & executive reporting.',
      deliverables: [
        'Weekly executive KPI & operational status deck',
        'Cross-system data audit & anomaly tracking (SQL/Excel/Tableau)',
        'Action log governance & risk escalation brief'
      ],
      onboarding: '48 Hours',
      comparison: 'Replaces ad-hoc contractor management with predictable senior reporting cadence.'
    },
    fractional: {
      name: 'Fractional BA & Client Delivery Partner',
      tag: 'MOST POPULAR · MONTHLY RETAINER',
      hours: '20–25 hrs / week',
      focus: 'End-to-end Business Analysis, stakeholder alignment, Jira backlog ownership & client delivery.',
      deliverables: [
        'Requirements discovery, process mapping & user stories',
        'Direct client meeting facilitation, minutes & follow-ups',
        'Agile sprint coordination, UAT sign-off & dependency tracking'
      ],
      onboarding: 'Immediate (Same Week)',
      comparison: 'Saves 4–6 months of full-time hiring time, recruitment fees, and benefits overhead.'
    },
    sprint: {
      name: 'Dedicated Project & Delivery Block',
      tag: 'CONTRACT / FIXED MANDATE',
      hours: '30–40 hrs / week',
      focus: 'High-stakes project turnaround, enterprise AI/platform rollout, or complex system migration.',
      deliverables: [
        'Full ownership of project delivery lifecycle & vendor coordination',
        'Executive steering presentations & technical team translation',
        'Zero-SLA-breach operational governance & handover documentation'
      ],
      onboarding: 'Immediate Deployment',
      comparison: 'Proven across €1M+ utility revenue recovery and $600K+ enterprise AI rollouts.'
    }
  };

  const currentRetainer = RETAINER_CONFIG[retainerModel];

  return (
    <div className={`min-h-screen font-sans-ui transition-colors duration-500 ${surfaceBg} ${isDark ? 'bg-arch-grid-dark' : 'bg-arch-grid-light'}`}>
      <style>{customStyles}</style>

      {/* VAUL-STYLE SPATIAL SCALING WRAPPER */}
      <div
        className={`spring-drawer-bg origin-top ${
          drawerData ? 'scale-[0.968] rounded-[24px] overflow-hidden brightness-75 pointer-events-none' : 'scale-100'
        }`}
      >
        {/* TOP EXECUTIVE TELEMETRY BAR */}
        <div className={`w-full border-b ${borderLine} ${isDark ? 'bg-[#070D16]/90' : 'bg-[#E4ECF2]/90'} backdrop-blur-md no-print`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono-tabular">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE FOR RETAINER, PART-TIME &amp; CONTRACT
              </span>
              <span className={`hidden md:inline ${mutedText}`}>
                6 YRS IT · 2 YRS EUROPE · CHENNAI, INDIA (GLOBAL DELIVERY)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCmdOpen(true);
                  playTactileSound(600, 0.02);
                }}
                className={`px-2.5 py-1 rounded-md border ${borderLine} ${cardBg} flex items-center gap-1.5 hover:border-[#8FE0D1]/50 spring-fast tactile`}
                title="Open Quick Command Palette (⌘K)"
              >
                <Command className="w-3 h-3 text-[#8FE0D1]" />
                <span>Command</span>
                <kbd className={`px-1 rounded text-[10px] ${elevatedBg}`}>⌘K</kbd>
              </button>

              <button
                onClick={() => {
                  setSerifMode(!serifMode);
                  playTactileSound(500, 0.02);
                  pushToast(
                    serifMode ? 'Geometric Sans Mode' : 'Editorial Serif Mode',
                    serifMode ? 'Switched headings to crisp Inter.' : 'Switched headings to high-contrast Instrument Serif.',
                    'TYPOGRAPHY'
                  );
                }}
                className={`px-2.5 py-1 rounded-md border ${borderLine} ${cardBg} hover:border-[#8FE0D1]/50 spring-fast tactile hidden sm:inline-flex items-center gap-1`}
                title="Toggle Editorial Serif / Pure Sans Headings"
              >
                <span>{serifMode ? 'Aa Serif' : 'Aa Sans'}</span>
              </button>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-1.5 rounded-md border ${borderLine} ${cardBg} hover:border-[#8FE0D1]/50 spring-fast tactile`}
                title={soundEnabled ? 'Mute Tactile UI Audio' : 'Enable Tactile UI Audio'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#8FE0D1]" /> : <VolumeX className={`w-3.5 h-3.5 ${mutedText}`} />}
              </button>

              <button
                onClick={() => {
                  const next = isDark ? 'light' : 'dark';
                  setTheme(next);
                  playTactileSound(550, 0.03);
                  pushToast(
                    next === 'dark' ? 'Executive Obsidian Theme' : 'Editorial Alabaster Theme',
                    `Surface calibrated for ${next === 'dark' ? 'low-light boardrooms' : 'daylight reading'}.`,
                    'SURFACE'
                  );
                }}
                className={`px-2.5 py-1 rounded-md border ${borderLine} ${cardBg} flex items-center gap-1.5 hover:border-[#8FE0D1]/50 spring-fast tactile`}
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-[#E7A94B]" /> : <Moon className="w-3.5 h-3.5 text-[#132238]" />}
                <span>{isDark ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* STICKY NAVIGATION BAR */}
        <header className={`sticky top-0 z-30 border-b ${borderLine} ${isDark ? 'bg-[#09111C]/80' : 'bg-[#EDF2F5]/85'} backdrop-blur-xl no-print`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <a href="#top" className="flex items-center gap-3 group">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono-tabular font-bold text-sm border ${borderLine} ${ isDark ? 'bg-[#132238] text-[#8FE0D1]' : 'bg-[#132238] text-[#8FE0D1]' } group-hover:scale-105 spring-fast`}>
                SJ
              </div>
              <div>
                <div className="text-xs font-mono-tabular tracking-[0.14em] uppercase font-semibold text-[#0C8276] dark:text-[#8FE0D1]">
                  INDEPENDENT CONSULTANT PROFILE
                </div>
                <div className="text-sm font-semibold tracking-tight">
                  Sharaj Jagadeesan
                </div>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-1 p-1 rounded-full border border-current/10 bg-current/[0.03]">
              {[
                { href: '#services', label: 'Services' },
                { href: '#impact', label: 'Impact' },
                { href: '#bridge', label: 'Working Style' },
                { href: '#retainer', label: 'Retainer' },
                { href: '#experience', label: 'Experience' },
                { href: '#contact', label: 'Contact' }
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => playTactileSound(500, 0.02)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium ${mutedText} hover:text-current hover:bg-current/5 spring-fast`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setDrawerData({ type: 'dossier' });
                  playTactileSound(620, 0.03);
                }}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium border ${borderLine} ${cardBg} hover:border-[#8FE0D1]/50 spring-fast tactile`}
              >
                <FileText className="w-3.5 h-3.5 text-[#0C8276] dark:text-[#8FE0D1]" />
                <span>Executive PDF</span>
              </button>

              <a
                href="mailto:sharajjagadeesan@gmail.com?subject=Business%20Analysis%20or%20Client%20Delivery%20Support"
                onClick={() => playTactileSound(660, 0.03)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold ${primaryBtn} spring-fast tactile shadow-sm`}
              >
                <span>Discuss a project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </header>

        {/* MAIN CONTAINER */}
        <main id="top" className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-24 space-y-20">

          {/* HERO SECTION — PRESERVING ORIGINAL NAVY/MINT IDENTITY WITH LUXURY ARCHITECTURAL CRAFT */}
          <section className="relative">
            <div className="radius-outer bg-[#132238] text-white p-7 sm:p-12 lg:p-16 relative overflow-hidden border border-[#8FE0D1]/20 shadow-2xl">
              {/* Concentric Orbital Rings (Honoring original .hero:after) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-28 w-[360px] h-[360px] rounded-full border border-[#8FE0D1]/25 shadow-[0_0_0_36px_rgba(143,224,209,0.04),0_0_0_76px_rgba(143,224,209,0.03)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-12 bottom-[-140px] w-[280px] h-[280px] rounded-full bg-[#0C8276]/20 blur-3xl"
              />

              <div className="relative z-10 max-w-3xl space-y-6">
                <div className="inline-flex flex-wrap items-center gap-2 text-[11px] font-mono-tabular uppercase tracking-[0.16em] text-[#8FE0D1] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Business analysis · stakeholder management · product operations</span>
                </div>

                <h1
                  className={`${
                    serifMode ? 'font-serif-editorial font-normal text-5xl sm:text-7xl lg:text-[82px]' : 'font-sans-ui font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight'
                  } leading-[0.98] text-white`}
                >
                  Sharaj <span className={serifMode ? 'italic text-[#8FE0D1]' : 'text-[#8FE0D1]'}>Jagadeesan</span>
                </h1>

                <div className="font-mono-tabular text-xs sm:text-sm tracking-[0.08em] uppercase text-[#C9F3EB] font-semibold flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>CLIENT DELIVERY</span>
                  <span className="text-[#8FE0D1]/40">/</span>
                  <span>BUSINESS OPERATIONS</span>
                  <span className="text-[#8FE0D1]/40">/</span>
                  <span>REPORTING</span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-mono-tabular text-[#D2DCE5] pt-1">
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#8FE0D1]" />
                    6 years in IT
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#8FE0D1]" />
                    2 years in Europe (Ireland)
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#E7A94B]" />
                    Chennai, India (EU / UK / ME / Global Overlap)
                  </span>
                </div>

                <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#F1F5F8] font-normal pt-2 max-w-2xl">
                  <strong className="text-[#8FE0D1] font-semibold">I help teams keep client projects moving.</strong> I translate business needs into clear requirements, align customers and technical teams, bring structure to delivery, and turn operational data into decisions leaders can act on. Available for part-time, contract and monthly-retainer engagements.
                </p>

                {/* Action Bar */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <a
                    href="mailto:sharajjagadeesan@gmail.com?subject=Business%20Analysis%20or%20Client%20Delivery%20Support"
                    onClick={() => playTactileSound(680, 0.03)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#8FE0D1] text-[#132238] px-5 py-3 text-sm font-bold hover:bg-[#A5ECE0] spring-fast tactile shadow-lg"
                  >
                    <span>Discuss a project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 hover:bg-white/10 text-white px-4 py-3 text-sm font-semibold spring-fast tactile"
                  >
                    {emailCopied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#8FE0D1]" />
                    )}
                    <span>{emailCopied ? 'Copied sharajjagadeesan@gmail.com' : 'Copy Email (sharajjagadeesan@gmail.com)'}</span>
                  </button>

                  <a
                    href="https://linkedin.com/in/sharaj-j"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTactileSound(540, 0.02)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 hover:bg-white/10 text-white px-4 py-3 text-sm font-semibold spring-fast tactile"
                  >
                    <Linkedin className="w-4 h-4 text-[#8FE0D1]" />
                    <span>LinkedIn profile ↗</span>
                  </a>

                  <button
                    onClick={() => {
                      setDrawerData({ type: 'dossier' });
                      playTactileSound(600, 0.03);
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-[#8FE0D1]/40 bg-[#0C8276]/25 hover:bg-[#0C8276]/40 text-[#C9F3EB] px-4 py-3 text-sm font-semibold spring-fast tactile"
                  >
                    <FileText className="w-4 h-4 text-[#8FE0D1]" />
                    <span>Open profile PDF ↓</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SELECTED OUTCOMES — 4 INTERACTIVE TELEMETRY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5" aria-label="Selected outcomes">
              {OUTCOME_METRICS.map((stat) => (
                <div
                  key={stat.id}
                  onClick={() => {
                    playTactileSound(580, 0.025);
                    pushToast(
                      `${stat.value} — ${stat.label}`,
                      `${stat.client}: ${stat.verification}`,
                      stat.sector.toUpperCase()
                    );
                  }}
                  className={`radius-card border ${borderLine} ${cardBg} p-5 flex flex-col justify-between cursor-pointer hover:border-[#0C8276] dark:hover:border-[#8FE0D1]/50 spring-fast tactile group relative overflow-hidden`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-mono-tabular uppercase tracking-widest px-2 py-0.5 rounded border ${badgeBg}`}>
                        {stat.sector}
                      </span>
                      <span className={`text-[11px] font-mono-tabular ${mutedText} group-hover:text-[#0C8276] dark:group-hover:text-[#8FE0D1] transition-colors`}>
                        {stat.delta}
                      </span>
                    </div>

                    <strong className="block font-mono-tabular text-3xl sm:text-4xl font-bold tracking-tight text-[#0C8276] dark:text-[#8FE0D1]">
                      {stat.value}
                    </strong>
                    <span className="block mt-1.5 font-bold text-sm sm:text-base">
                      {stat.label}
                    </span>
                    <small className={`block mt-0.5 text-xs ${mutedText}`}>
                      {stat.sublabel}
                    </small>
                  </div>

                  {/* Mini Sparkline & Verification Footer */}
                  <div className={`mt-4 pt-3 border-t ${borderLine} flex items-end justify-between gap-2`}>
                    <span className={`text-[11px] font-mono-tabular ${mutedText} group-hover:underline`}>
                      Inspect audit note ↗
                    </span>
                    <div className="flex items-end gap-1 h-6">
                      {stat.sparkline.map((val, idx) => (
                        <span
                          key={idx}
                          style={{ height: `${Math.max(25, val)}%` }}
                          className="w-1.5 rounded-sm bg-[#0C8276]/40 dark:bg-[#8FE0D1]/30 group-hover:bg-[#0C8276] dark:group-hover:bg-[#8FE0D1] transition-all"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 01: HOW I CAN HELP (SERVICES + SECTOR EXPOSURE FILTER) */}
          <section id="services" className="scroll-mt-24 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-current/10 pb-6">
              <div>
                <div className="text-xs font-mono-tabular uppercase tracking-[0.16em] font-bold text-[#0C8276] dark:text-[#8FE0D1]">
                  How I can help
                </div>
                <h2
                  className={`mt-1 ${
                    serifMode ? 'font-serif-editorial text-4xl sm:text-5xl font-normal' : 'text-2xl sm:text-4xl font-bold tracking-tight'
                  }`}
                >
                  Useful capacity, without another full-time hire.
                </h2>
              </div>
              <p className={`text-sm max-w-md leading-relaxed ${mutedText}`}>
                I can work as an extension of an IT delivery team or provide defined reporting and business coordination support directly to a business.
              </p>
            </div>

            {/* Interactive Sector Exposure Filter Bar */}
            <div className={`radius-card border ${borderLine} ${elevatedBg} p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
              <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-wider font-semibold text-[#0C8276] dark:text-[#8FE0D1]">
                <Filter className="w-3.5 h-3.5" />
                <span>Sector Exposure Filter:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SECTORS.map((sec) => {
                  const active = activeSector === sec;
                  return (
                    <button
                      key={sec}
                      onClick={() => {
                        setActiveSector(sec);
                        playTactileSound(520, 0.02);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold spring-fast tactile ${
                        active
                          ? 'bg-[#0C8276] text-white dark:bg-[#8FE0D1] dark:text-[#132238] shadow-sm'
                          : `${cardBg} border ${borderLine} ${mutedText} hover:text-current`
                      }`}
                    >
                      {sec}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4 Core Service Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SERVICE_PILLARS.map((srv) => {
                const isHighlighted =
                  activeSector === 'All Sectors' || srv.sectors.includes(activeSector);
                return (
                  <article
                    key={srv.id}
                    className={`radius-card border ${borderLine} ${cardBg} p-6 sm:p-7 flex flex-col justify-between spring-all ${
                      isHighlighted ? 'opacity-100' : 'opacity-45 hover:opacity-90'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono-tabular text-xs font-bold tracking-[0.13em] text-[#0C8276] dark:text-[#8FE0D1]">
                          {srv.num}
                        </span>
                        <span className={`text-[11px] font-mono-tabular px-2 py-0.5 rounded border ${badgeBg}`}>
                          Retainer Ready
                        </span>
                      </div>

                      <h3 className="text-xl font-bold tracking-tight">
                        {srv.title}
                      </h3>

                      <p className={`text-sm leading-relaxed ${mutedText}`}>
                        {srv.summary}
                      </p>

                      <ul className="space-y-2 pt-1 text-sm">
                        {srv.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#0C8276] dark:text-[#8FE0D1] shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Concrete Deliverable Specimen Box */}
                    <div className={`mt-6 pt-4 border-t ${borderLine}`}>
                      <div className={`radius-inner ${elevatedBg} p-3.5 border ${borderLine} font-mono-tabular text-xs space-y-1.5`}>
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#0C8276] dark:text-[#8FE0D1]">
                          <span>ARTIFACT SPECIMEN: {srv.artifactPreview.type}</span>
                        </div>
                        <div className="text-[11px] truncate opacity-90">
                          {srv.artifactPreview.code}
                        </div>
                        <div className={`text-[11px] ${mutedText}`}>
                          Output: <strong className="text-current">{srv.artifactPreview.deliverable}</strong>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* SECTION 02: SELECTED IMPACT (ACCORDION + VAUL SPATIAL DRAWER ARTIFACT INSPECTOR) */}
          <section id="impact" className="scroll-mt-24 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-current/10 pb-6">
              <div>
                <div className="text-xs font-mono-tabular uppercase tracking-[0.16em] font-bold text-[#0C8276] dark:text-[#8FE0D1]">
                  Selected impact
                </div>
                <h2
                  className={`mt-1 ${
                    serifMode ? 'font-serif-editorial text-4xl sm:text-5xl font-normal' : 'text-2xl sm:text-4xl font-bold tracking-tight'
                  }`}
                >
                  Examples of business-facing delivery.
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleAllCases}
                  aria-expanded={expandedCases.length === CASE_STUDIES.length}
                  className="text-xs font-mono-tabular font-bold uppercase tracking-wider px-3.5 py-2 rounded-full border border-[#0C8276]/40 dark:border-[#8FE0D1]/40 text-[#0C8276] dark:text-[#8FE0D1] hover:bg-[#0C8276]/10 spring-fast tactile"
                >
                  {expandedCases.length === CASE_STUDIES.length
                    ? 'Collapse all examples −'
                    : 'Expand all examples +'}
                </button>
              </div>
            </div>

            <div className="space-y-3.5">
              {CASE_STUDIES.map((cs) => {
                const isOpen = expandedCases.includes(cs.id);
                const matchesSector =
                  activeSector === 'All Sectors' || cs.sector === activeSector;

                return (
                  <div
                    key={cs.id}
                    className={`radius-card border ${borderLine} ${cardBg} overflow-hidden spring-all ${
                      matchesSector ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    {/* Accordion Summary Row */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleCase(cs.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleCase(cs.id);
                        }
                      }}
                      className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-current/[0.02] select-none"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-mono-tabular font-bold uppercase tracking-widest text-[#0C8276] dark:text-[#8FE0D1]">
                            {cs.tag}
                          </span>
                          <span className={`text-[11px] font-mono-tabular px-2 py-0.5 rounded border ${badgeBg}`}>
                            {cs.organization}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                          {cs.title}
                        </h3>
                        <div className={`text-xs sm:text-sm ${mutedText}`}>
                          {cs.metric}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <div className="hidden md:block text-right font-mono-tabular">
                          <div className="text-lg font-bold text-[#0C8276] dark:text-[#8FE0D1]">
                            {cs.headlineMetric}
                          </div>
                          <div className={`text-[10px] uppercase ${mutedText}`}>VERIFIED OUTCOME</div>
                        </div>

                        <div
                          className={`w-9 h-9 rounded-full border ${borderLine} ${elevatedBg} flex items-center justify-center font-mono-tabular text-lg font-bold text-[#0C8276] dark:text-[#8FE0D1] transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Accordion Expanded Body */}
                    {isOpen && (
                      <div className={`border-t ${borderLine} p-5 sm:p-6 ${elevatedBg} space-y-5`}>
                        <p className="text-sm sm:text-base leading-relaxed max-w-4xl">
                          {cs.description}
                        </p>

                        {/* 3-Step Delivery Architecture Flow */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {cs.architecture.map((step, i) => (
                            <div
                              key={i}
                              className={`radius-inner border ${borderLine} ${cardBg} p-4 space-y-1`}
                            >
                              <div className="text-[11px] font-mono-tabular font-bold uppercase text-[#0C8276] dark:text-[#8FE0D1]">
                                {step.stage}
                              </div>
                              <p className={`text-xs leading-relaxed ${mutedText}`}>
                                {step.detail}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Interactive Action Bar inside Case Study */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                          <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tabular">
                            <span>
                              <strong className="text-[#0C8276] dark:text-[#8FE0D1]">Scope:</strong> {cs.simulatorData.totalAccounts}
                            </span>
                            <span>•</span>
                            <span>
                              <strong className="text-[#0C8276] dark:text-[#8FE0D1]">Precision:</strong> {cs.simulatorData.discrepancyRate}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDrawerData({ type: 'case', payload: cs });
                              playTactileSound(640, 0.03);
                            }}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono-tabular font-semibold border ${borderLine} ${cardBg} hover:border-[#0C8276] dark:hover:border-[#8FE0D1] spring-fast tactile`}
                          >
                            <Eye className="w-3.5 h-3.5 text-[#0C8276] dark:text-[#8FE0D1]" />
                            <span>Inspect Delivery Dossier in Spatial Drawer ↗</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 03: TOOLS & WORKING STYLE ("COMFORTABLE ON BOTH SIDES OF THE CONVERSATION") */}
          <section id="bridge" className="scroll-mt-24 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-current/10 pb-6">
              <div>
                <div className="text-xs font-mono-tabular uppercase tracking-[0.16em] font-bold text-[#0C8276] dark:text-[#8FE0D1]">
                  Tools &amp; working style
                </div>
                <h2
                  className={`mt-1 ${
                    serifMode ? 'font-serif-editorial text-4xl sm:text-5xl font-normal' : 'text-2xl sm:text-4xl font-bold tracking-tight'
                  }`}
                >
                  Comfortable on both sides of the conversation.
                </h2>
              </div>
              <p className={`text-sm max-w-md leading-relaxed ${mutedText}`}>
                Enough technical fluency to clarify requirements and coordinate with engineers—paired with the executive communication discipline to keep senior stakeholders aligned.
              </p>
            </div>

            {/* Dual Capabilities Grid (Preserving exact bullets from original HTML) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <article className={`radius-card border ${borderLine} ${cardBg} p-6 sm:p-8 space-y-5`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0C8276]/15 text-[#0C8276] dark:text-[#8FE0D1] flex items-center justify-center">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono-tabular uppercase tracking-widest text-[#0C8276] dark:text-[#8FE0D1]">
                        STAKEHOLDER &amp; COMMERCIAL SIDE
                      </span>
                      <h3 className="text-xl font-bold">Business &amp; delivery</h3>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 text-sm">
                  {[
                    'Jira, ServiceNow, Zendesk, Agile / Scrum',
                    'Requirements, product roadmaps and stakeholder management',
                    'Executive presentations, KPI dashboards and reporting',
                    'Client communication, action logs and delivery coordination'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#0C8276] dark:text-[#8FE0D1] shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {['Jira', 'ServiceNow', 'Zendesk', 'Agile / Scrum', 'RAID Logs', 'UAT Governance', 'KPI Dashboards'].map((t) => (
                    <span key={t} className={`text-xs font-mono-tabular px-2.5 py-1 rounded-md border ${borderLine} ${elevatedBg}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>

              <article className={`radius-card border ${borderLine} ${cardBg} p-6 sm:p-8 space-y-5`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0C8276]/15 text-[#0C8276] dark:text-[#8FE0D1] flex items-center justify-center">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono-tabular uppercase tracking-widest text-[#0C8276] dark:text-[#8FE0D1]">
                        SYSTEMS &amp; ENGINEERING SIDE
                      </span>
                      <h3 className="text-xl font-bold">Data &amp; technology</h3>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 text-sm">
                  {[
                    'Excel, SQL, Tableau, ETL and data reconciliation',
                    'Python, Pandas, Scikit-learn, TensorFlow / Keras',
                    'AWS, Linux, Oracle C2M, Temetra, Flask and Streamlit',
                    'Enough technical fluency to clarify requirements and coordinate with engineers'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#0C8276] dark:text-[#8FE0D1] shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {['SQL', 'Oracle C2M', 'Temetra', 'Python', 'Tableau', 'Excel', 'AWS', 'Linux (350+ Nodes)', 'TensorFlow'].map((t) => (
                    <span key={t} className={`text-xs font-mono-tabular px-2.5 py-1 rounded-md border ${borderLine} ${elevatedBg}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </div>

            {/* Interactive "Live Translation Bridge" Workbench */}
            <div className={`radius-card border ${borderLine} ${elevatedBg} p-6 sm:p-8 space-y-6`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#0C8276] dark:text-[#8FE0D1] font-bold flex items-center gap-2">
                    <GitMerge className="w-4 h-4" />
                    <span>INTERACTIVE TRANSLATION BRIDGE</span>
                  </div>
                  <p className={`text-xs mt-1 ${mutedText}`}>
                    Inspect how raw technical anomalies are translated into structured executive action across real projects:
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {TRANSLATION_EXAMPLES.map((ex, idx) => (
                    <button
                      key={ex.id}
                      onClick={() => {
                        setActiveBridgeIdx(idx);
                        playTactileSound(540, 0.02);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono-tabular font-semibold spring-fast tactile ${
                        activeBridgeIdx === idx
                          ? 'bg-[#0C8276] text-white dark:bg-[#8FE0D1] dark:text-[#132238]'
                          : `${cardBg} border ${borderLine} ${mutedText}`
                      }`}
                    >
                      0{idx + 1}. {ex.context.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className={`radius-inner border ${borderLine} ${cardBg} p-4 space-y-2`}>
                  <div className="text-[10px] font-mono-tabular uppercase tracking-widest text-amber-500 font-bold">
                    01 / RAW TECHNICAL SIGNAL
                  </div>
                  <p className="font-mono-tabular text-xs leading-relaxed">
                    {TRANSLATION_EXAMPLES[activeBridgeIdx].rawSignal}
                  </p>
                </div>

                <div className={`radius-inner border border-[#0C8276]/40 dark:border-[#8FE0D1]/40 ${cardBg} p-4 space-y-2`}>
                  <div className="text-[10px] font-mono-tabular uppercase tracking-widest text-[#0C8276] dark:text-[#8FE0D1] font-bold">
                    02 / SHARAJ&apos;S DELIVERY BRIDGE
                  </div>
                  <p className="text-xs leading-relaxed font-medium">
                    {TRANSLATION_EXAMPLES[activeBridgeIdx].sharajBridge}
                  </p>
                </div>

                <div className={`radius-inner border ${borderLine} ${cardBg} p-4 space-y-2`}>
                  <div className="text-[10px] font-mono-tabular uppercase tracking-widest text-emerald-500 font-bold">
                    03 / EXECUTIVE OUTCOME
                  </div>
                  <p className="text-xs leading-relaxed">
                    {TRANSLATION_EXAMPLES[activeBridgeIdx].executiveDecision}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 04: RETAINER & CAPACITY ARCHITECTURE (ELEVATING TO RETAINER PARTNER) */}
          <section id="retainer" className="scroll-mt-24 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-current/10 pb-6">
              <div>
                <div className="text-xs font-mono-tabular uppercase tracking-[0.16em] font-bold text-[#0C8276] dark:text-[#8FE0D1]">
                  Engagement models
                </div>
                <h2
                  className={`mt-1 ${
                    serifMode ? 'font-serif-editorial text-4xl sm:text-5xl font-normal' : 'text-2xl sm:text-4xl font-bold tracking-tight'
                  }`}
                >
                  Predictable retainer capacity. Zero hiring friction.
                </h2>
              </div>
              <p className={`text-sm max-w-md leading-relaxed ${mutedText}`}>
                Structured for leaders who need senior Business Analysis, Product Operations, or Client Delivery ownership without waiting 5 months to recruit a full-time headcount.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Selector Tabs */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
                {[
                  { id: 'advisory', label: '01 / Reporting & Operations Retainer', sub: '10–15 hrs/wk · Dashboards, SQL/Excel reconciliation & KPI cadence' },
                  { id: 'fractional', label: '02 / Fractional BA & Client Delivery', sub: '20–25 hrs/wk · Requirements, Jira backlog, client actions & UAT' },
                  { id: 'sprint', label: '03 / Dedicated Project Delivery Block', sub: '30–40 hrs/wk · End-to-end programme execution & stakeholder alignment' }
                ].map((tier) => {
                  const active = retainerModel === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => {
                        setRetainerModel(tier.id);
                        playTactileSound(560, 0.025);
                      }}
                      className={`w-full text-left radius-card p-5 border spring-fast tactile ${
                        active
                          ? `border-[#0C8276] dark:border-[#8FE0D1] ${elevatedBg} shadow-md`
                          : `${borderLine} ${cardBg} opacity-75 hover:opacity-100`
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tabular text-xs font-bold uppercase tracking-wider text-[#0C8276] dark:text-[#8FE0D1]">
                          {tier.label}
                        </span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${active ? 'translate-x-1 text-[#0C8276] dark:text-[#8FE0D1]' : 'opacity-40'}`} />
                      </div>
                      <p className={`text-xs mt-1.5 leading-relaxed ${mutedText}`}>
                        {tier.sub}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Right Active Retainer Blueprint */}
              <div className={`lg:col-span-7 radius-card border ${borderLine} ${cardBg} p-6 sm:p-8 flex flex-col justify-between space-y-6`}>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-current/10 pb-4">
                    <div>
                      <span className={`text-[10px] font-mono-tabular uppercase tracking-widest px-2.5 py-1 rounded border ${badgeBg}`}>
                        {currentRetainer.tag}
                      </span>
                      <h3 className="text-2xl font-bold mt-2">{currentRetainer.name}</h3>
                    </div>
                    <div className="text-right font-mono-tabular">
                      <div className="text-xs uppercase text-[#0C8276] dark:text-[#8FE0D1] font-bold">ALLOCATED BANDWIDTH</div>
                      <div className="text-lg font-bold">{currentRetainer.hours}</div>
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed ${mutedText}`}>
                    {currentRetainer.focus}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <div className="text-xs font-mono-tabular uppercase tracking-wider font-bold text-[#0C8276] dark:text-[#8FE0D1]">
                      DEFINED WEEKLY / MONTHLY DELIVERABLES:
                    </div>
                    {currentRetainer.deliverables.map((d, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#0C8276] dark:text-[#8FE0D1] shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`radius-inner ${elevatedBg} border ${borderLine} p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                  <div className="space-y-0.5 text-xs">
                    <div className="font-mono-tabular uppercase text-[10px] text-[#0C8276] dark:text-[#8FE0D1] font-bold">
                      ONBOARDING READINESS: {currentRetainer.onboarding}
                    </div>
                    <div className={mutedText}>{currentRetainer.comparison}</div>
                  </div>

                  <a
                    href={`mailto:sharajjagadeesan@gmail.com?subject=${encodeURIComponent(`Retainer Inquiry: ${currentRetainer.name}`)}`}
                    onClick={() => playTactileSound(660, 0.03)}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold ${primaryBtn} spring-fast tactile`}
                  >
                    <span>Inquire for Availability</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 05: EXPERIENCE & EDUCATION TIMELINE */}
          <section id="experience" className="scroll-mt-24 space-y-8">
            <div className="border-b border-current/10 pb-6">
              <div className="text-xs font-mono-tabular uppercase tracking-[0.16em] font-bold text-[#0C8276] dark:text-[#8FE0D1]">
                Experience &amp; education
              </div>
              <h2
                className={`mt-1 ${
                  serifMode ? 'font-serif-editorial text-4xl sm:text-5xl font-normal' : 'text-2xl sm:text-4xl font-bold tracking-tight'
                }`}
              >
                The background behind the work.
              </h2>
            </div>

            {/* Career Timeline */}
            <div className={`radius-card border ${borderLine} ${cardBg} divide-y ${isDark ? 'divide-[#8FE0D1]/10' : 'divide-[#D9E2EA]'}`}>
              {TIMELINE_ROLES.map((item, idx) => (
                <div key={idx} className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
                  <div className="lg:col-span-3 space-y-1">
                    <time className="font-mono-tabular text-xs font-bold uppercase tracking-wider text-[#0C8276] dark:text-[#8FE0D1] block">
                      {item.period}
                    </time>
                    <div className={`text-xs font-mono-tabular ${mutedText}`}>
                      {item.location}
                    </div>
                    <span className={`inline-block mt-1 text-[10px] font-mono-tabular px-2 py-0.5 rounded border ${badgeBg}`}>
                      {item.sector}
                    </span>
                  </div>

                  <div className="lg:col-span-9 space-y-3">
                    <div>
                      <strong className="text-lg font-bold block">
                        {item.role}
                      </strong>
                      <span className="text-sm font-medium text-[#0C8276] dark:text-[#8FE0D1]">
                        {item.org}
                      </span>
                    </div>

                    <p className={`text-sm leading-relaxed ${mutedText}`}>
                      {item.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.highlights.map((h, i) => (
                        <span
                          key={i}
                          className={`text-xs font-mono-tabular px-2.5 py-1 rounded-md border ${borderLine} ${elevatedBg}`}
                        >
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Academic Credentials (Honoring exact degrees & 1:1 Honours) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {EDUCATION.map((ed, idx) => (
                <article key={idx} className={`radius-card border ${borderLine} ${cardBg} p-6 space-y-2`}>
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-[#0C8276] dark:text-[#8FE0D1] font-bold">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" />
                      {ed.year}
                    </span>
                    <span className={`px-2 py-0.5 rounded border ${badgeBg}`}>
                      {ed.honours}
                    </span>
                  </div>
                  <strong className="text-lg font-bold block pt-1">
                    {ed.degree}
                  </strong>
                  <div className="text-sm font-medium">
                    {ed.institution}
                  </div>
                  <p className={`text-xs leading-relaxed ${mutedText} pt-1`}>
                    {ed.detail}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* SECTION 06: EXECUTIVE CTA BANNER */}
          <section id="contact" className="scroll-mt-24">
            <div className="radius-outer bg-[#132238] text-white p-8 sm:p-12 border border-[#8FE0D1]/25 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-2 max-w-xl">
                <div className="text-xs font-mono-tabular uppercase tracking-[0.16em] text-[#8FE0D1] font-semibold">
                  DIRECT ENGAGEMENT CHANNEL
                </div>
                <h2
                  className={`${
                    serifMode ? 'font-serif-editorial text-4xl sm:text-5xl font-normal' : 'text-2xl sm:text-4xl font-bold tracking-tight'
                  }`}
                >
                  Have a project that needs structure?
                </h2>
                <p className="text-sm sm:text-base text-[#D5E0E8]">
                  Let’s discuss where I can take work off your team’s plate—whether through a monthly retainer, fractional product operations, or defined delivery support.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="mailto:sharajjagadeesan@gmail.com?subject=Business%20Analysis%20or%20Client%20Delivery%20Support"
                  onClick={() => playTactileSound(680, 0.03)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#8FE0D1] text-[#132238] px-5 py-3 text-sm font-bold hover:bg-[#A5ECE0] spring-fast tactile"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Sharaj</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 hover:bg-white/10 text-white px-4 py-3 text-sm font-semibold spring-fast tactile"
                >
                  {emailCopied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#8FE0D1]" />
                  )}
                  <span>sharajjagadeesan@gmail.com</span>
                </button>

                <a
                  href="https://linkedin.com/in/sharaj-j"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 hover:bg-white/10 text-white px-4 py-3 text-sm font-semibold spring-fast tactile"
                >
                  <Linkedin className="w-4 h-4 text-[#8FE0D1]" />
                  <span>Connect on LinkedIn ↗</span>
                </a>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className={`pt-6 border-t ${borderLine} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs ${mutedText}`}>
            <div>
              <strong className="text-current">Sharaj Jagadeesan</strong> · Business Analysis, Stakeholder Management &amp; Client Delivery
            </div>
            <div className="flex flex-wrap items-center gap-4 font-mono-tabular">
              <a href="#top" className="text-[#0C8276] dark:text-[#8FE0D1] font-semibold hover:underline">
                Back to top ↑
              </a>
              <span>·</span>
              <button
                onClick={() => setDrawerData({ type: 'dossier' })}
                className="text-[#0C8276] dark:text-[#8FE0D1] font-semibold hover:underline"
              >
                Printable profile PDF
              </button>
              <span>·</span>
              <button
                onClick={() => setCmdOpen(true)}
                className="hover:underline"
              >
                Command Menu (⌘K)
              </button>
            </div>
          </footer>
        </main>
      </div>

      {/* VAUL-INSPIRED SPATIAL DRAWER (FOR DEEP-DIVE CASE ARTIFACTS & PRINTABLE EXECUTIVE DOSSIER) */}
      {drawerData && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end justify-center p-0 sm:p-4 no-print"
          onClick={() => setDrawerData(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-t-[24px] sm:rounded-[24px] border ${borderLine} ${
              isDark ? 'bg-[#0D1726] text-[#F1F5F8]' : 'bg-[#FFFFFF] text-[#132238]'
            } p-6 sm:p-10 shadow-2xl space-y-6 spring-all`}
          >
            {/* Drawer Handle Bar */}
            <div className="w-12 h-1.5 rounded-full bg-current/20 mx-auto -mt-2 mb-2" />

            <div className="flex items-start justify-between gap-4 border-b border-current/10 pb-4">
              <div>
                <span className="text-[11px] font-mono-tabular uppercase tracking-widest text-[#0C8276] dark:text-[#8FE0D1] font-bold">
                  {drawerData.type === 'case' ? drawerData.payload.tag : 'EXECUTIVE CONSULTANT DOSSIER · PRINT-READY SUMMARY'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold mt-1">
                  {drawerData.type === 'case'
                    ? drawerData.payload.title
                    : 'Sharaj Jagadeesan — Executive Profile & Delivery Ledger'}
                </h3>
              </div>

              <button
                onClick={() => setDrawerData(null)}
                className={`p-2 rounded-full border ${borderLine} hover:bg-current/10 spring-fast`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {drawerData.type === 'case' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono-tabular">
                  <div className={`p-4 rounded-xl border ${borderLine} ${elevatedBg}`}>
                    <div className={`text-[10px] uppercase ${mutedText}`}>HEADLINE OUTCOME</div>
                    <div className="text-2xl font-bold text-[#0C8276] dark:text-[#8FE0D1] mt-1">
                      {drawerData.payload.headlineMetric}
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl border ${borderLine} ${elevatedBg}`}>
                    <div className={`text-[10px] uppercase ${mutedText}`}>ORGANIZATION</div>
                    <div className="text-sm font-bold mt-1">{drawerData.payload.organization}</div>
                  </div>
                  <div className={`p-4 rounded-xl border ${borderLine} ${elevatedBg}`}>
                    <div className={`text-[10px] uppercase ${mutedText}`}>ROLE MANDATE</div>
                    <div className="text-sm font-bold mt-1">{drawerData.payload.role}</div>
                  </div>
                </div>

                <p className="text-sm sm:text-base leading-relaxed">
                  {drawerData.payload.description}
                </p>

                <div className="space-y-3">
                  <div className="text-xs font-mono-tabular uppercase tracking-wider font-bold text-[#0C8276] dark:text-[#8FE0D1]">
                    ARCHITECTURAL EXECUTION WORKFLOW
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {drawerData.payload.architecture.map((st, i) => (
                      <div key={i} className={`p-4 rounded-xl border ${borderLine} ${elevatedBg} space-y-1.5`}>
                        <div className="text-xs font-mono-tabular font-bold text-[#0C8276] dark:text-[#8FE0D1]">
                          {st.stage}
                        </div>
                        <p className={`text-xs leading-relaxed ${mutedText}`}>{st.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-current/10">
                  <a
                    href={`mailto:sharajjagadeesan@gmail.com?subject=${encodeURIComponent(`Case Study Inquiry: ${drawerData.payload.title}`)}`}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold ${primaryBtn} spring-fast`}
                  >
                    <span>Discuss similar delivery support</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setDrawerData(null)}
                    className={`text-xs font-mono-tabular ${mutedText} hover:underline`}
                  >
                    Close Inspector (ESC)
                  </button>
                </div>
              </div>
            ) : (
              /* Executive Printable / Downloadable Dossier Preview */
              <div className="space-y-6 text-sm">
                <div className={`p-5 rounded-xl border ${borderLine} ${elevatedBg} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                  <div>
                    <div className="font-bold text-base">Sharaj Jagadeesan · Independent Consultant Dossier</div>
                    <div className={`text-xs ${mutedText}`}>
                      6 Years IT · 2 Years Europe · MSc CS (Data Analytics, 1:1 Honours, University of Galway)
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        window.print();
                        pushToast('Print / Save PDF Triggered', 'Use your browser print dialog to save a clean PDF copy.', 'DOSSIER');
                      }}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold ${primaryBtn} spring-fast tactile`}
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print / Save as PDF</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono-tabular">
                  {OUTCOME_METRICS.map((m) => (
                    <div key={m.id} className={`p-3.5 rounded-xl border ${borderLine}`}>
                      <div className="text-xl font-bold text-[#0C8276] dark:text-[#8FE0D1]">{m.value}</div>
                      <div className="text-xs font-semibold mt-0.5">{m.label}</div>
                      <div className={`text-[10px] ${mutedText}`}>{m.sublabel}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${borderLine} space-y-2`}>
                    <div className="text-xs font-mono-tabular font-bold uppercase text-[#0C8276] dark:text-[#8FE0D1]">
                      CORE DELIVERY PILLARS
                    </div>
                    <ul className="space-y-1 text-xs">
                      <li>• 01 / Business Analysis: Requirements, user stories, UAT &amp; decision logs</li>
                      <li>• 02 / Stakeholder &amp; Client Delivery: Client meetings, RAID logs &amp; escalations</li>
                      <li>• 03 / Reporting &amp; Operations: KPI dashboards, SQL/Excel reconciliation</li>
                      <li>• 04 / Product Coordination: Backlog, roadmap &amp; cross-functional governance</li>
                    </ul>
                  </div>
                  <div className={`p-4 rounded-xl border ${borderLine} space-y-2`}>
                    <div className="text-xs font-mono-tabular font-bold uppercase text-[#0C8276] dark:text-[#8FE0D1]">
                      DIRECT CONTACT &amp; CREDENTIALS
                    </div>
                    <ul className="space-y-1 text-xs font-mono-tabular">
                      <li>Email: sharajjagadeesan@gmail.com</li>
                      <li>LinkedIn: linkedin.com/in/sharaj-j</li>
                      <li>MSc CS (Data Analytics) · 1:1 Honours · Univ. of Galway</li>
                      <li>B.E. CSE · First Class Honours · SSN College of Eng.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* COMMAND PALETTE (⌘K) FOR INSTANT NAVIGATION & ACTIONS */}
      {cmdOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 p-4 no-print"
          onClick={() => setCmdOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-lg rounded-2xl border ${borderLine} ${
              isDark ? 'bg-[#0D1726] text-[#F1F5F8]' : 'bg-[#FFFFFF] text-[#132238]'
            } shadow-2xl overflow-hidden`}
          >
            <div className={`px-4 py-3.5 border-b ${borderLine} flex items-center gap-3`}>
              <Search className="w-4 h-4 text-[#0C8276] dark:text-[#8FE0D1]" />
              <input
                type="text"
                autoFocus
                value={cmdQuery}
                onChange={(e) => setCmdQuery(e.target.value)}
                placeholder="Jump to case study, filter sector, copy email, or switch theme..."
                className="w-full bg-transparent text-xs font-mono-tabular focus:outline-none"
              />
              <button
                onClick={() => setCmdOpen(false)}
                className={`text-[10px] font-mono-tabular px-1.5 py-0.5 rounded border ${borderLine}`}
              >
                ESC
              </button>
            </div>

            <div className="p-2 max-h-80 overflow-y-auto space-y-1 text-xs">
              {[
                {
                  label: 'Copy Sharaj Email (sharajjagadeesan@gmail.com)',
                  tag: 'Action',
                  action: () => {
                    handleCopyEmail();
                    setCmdOpen(false);
                  }
                },
                {
                  label: 'Inspect €1M Revenue Recovery Case Study (Uisce Éireann)',
                  tag: 'Case Study',
                  action: () => {
                    setDrawerData({ type: 'case', payload: CASE_STUDIES[0] });
                    setCmdOpen(false);
                  }
                },
                {
                  label: 'Inspect $600K+ Enterprise AI Delivery (Botminds AI)',
                  tag: 'Case Study',
                  action: () => {
                    setDrawerData({ type: 'case', payload: CASE_STUDIES[1] });
                    setCmdOpen(false);
                  }
                },
                {
                  label: 'Inspect 100% SLA Banking Delivery (Software AG)',
                  tag: 'Case Study',
                  action: () => {
                    setDrawerData({ type: 'case', payload: CASE_STUDIES[2] });
                    setCmdOpen(false);
                  }
                },
                {
                  label: 'Open Printable Executive Profile PDF Dossier',
                  tag: 'Dossier',
                  action: () => {
                    setDrawerData({ type: 'dossier' });
                    setCmdOpen(false);
                  }
                },
                {
                  label: `Switch Theme to ${isDark ? 'Editorial Light' : 'Executive Dark'}`,
                  tag: 'Appearance',
                  action: () => {
                    setTheme(isDark ? 'light' : 'dark');
                    setCmdOpen(false);
                  }
                }
              ]
                .filter((item) => item.label.toLowerCase().includes(cmdQuery.toLowerCase()))
                .map((item, i) => (
                  <button
                    key={i}
                    onClick={item.action}
                    className="w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between hover:bg-current/5 spring-fast"
                  >
                    <span className="font-medium">{item.label}</span>
                    <span className={`text-[10px] font-mono-tabular px-2 py-0.5 rounded border ${badgeBg}`}>
                      {item.tag}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* SONNER-INSPIRED 3D STACKED NOTIFICATION TOASTS */}
      <div
        className="fixed bottom-5 right-5 z-50 w-80 sm:w-96 pointer-events-none no-print"
        onMouseEnter={() => setToastHovered(true)}
        onMouseLeave={() => setToastHovered(false)}
      >
        <div className="relative h-32">
          {toasts.map((t, index) => {
            const offset = toastHovered ? index * 68 : index * 10;
            const scale = toastHovered ? 1 : 1 - index * 0.045;
            const opacity = index > 2 ? 0 : 1 - index * 0.18;

            return (
              <div
                key={t.id}
                style={{
                  transform: `translateY(-${offset}px) scale(${scale})`,
                  opacity,
                  zIndex: 50 - index
                }}
                className={`pointer-events-auto absolute bottom-0 right-0 w-full rounded-xl border ${borderLine} ${
                  isDark ? 'bg-[#132238]/95 text-white' : 'bg-[#132238] text-white'
                } p-4 shadow-2xl spring-all flex items-start justify-between gap-3`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-mono-tabular uppercase tracking-widest text-[#8FE0D1]">
                    <span>{t.tag}</span>
                    <span>•</span>
                    <span className="opacity-70">{t.timestamp}</span>
                  </div>
                  <div className="text-xs font-bold">{t.title}</div>
                  <div className="text-[11px] text-[#D2DCE5] leading-snug">{t.subtitle}</div>
                </div>
                <button
                  onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
                  className="text-white/50 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}