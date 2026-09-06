import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  AlertTriangle,
  Zap,
  ShieldCheck,
  Filter,
  GitFork,
  CheckCircle2,
  ArrowRight,
  Compass,
  Layers,
  Activity,
  Search,
  Sparkles,
} from 'lucide-react';

export const DecisionArchitectureLanding: React.FC = () => {
  const navigate = useNavigate();
  const [activeStage, setActiveStage] = useState<number>(1);
  const [showSafeHavenModal, setShowSafeHavenModal] = useState<boolean>(false);

  const stages = [
    {
      id: 1,
      badge: 'STAGE 01: INTAKE',
      title: 'Multi-Hazard Telemetry & SMR Intake',
      subtitle: 'Multi-hazard telemetry & SMR slope monitoring',
      borderColor: 'border-red-500/40 hover:border-red-500/80',
      badgeColor: 'bg-red-500/10 text-red-400 border-red-500/30',
      accentColor: 'text-red-400',
      glowColor: 'hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]',
      icon: AlertTriangle,
      description:
        'Continuous ingestion of slope deformation, geological SMR surveys, rain gauge telemetry, and flood runout vectors across vulnerable Himalayan sectors.',
      telemetryPoints: [
        'Critical Slope Trigger: Angle \u2265 35\u00b0 with debris slide hazard > 70%',
        'Hazard Runout Zone: 900m non-mitigable safety buffer',
        'Composite Risk Index: CRI = 0.40(Slope) + 0.35(Landslide) + 0.25(Flood)',
      ],
      caseStudy: 'HAB-01 Nandikot Settlement (Pop: 2,840 | 42\u00b0 Slope | CRI: 89.4 \u2192 CRITICAL RED ZONE)',
    },
    {
      id: 2,
      badge: 'STAGE 02: TRIAGE',
      title: '0-72h Rapid Transit Triage',
      subtitle: '0-72h transit triage & mountain route cutoff risk',
      borderColor: 'border-amber-500/40 hover:border-amber-500/80',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      accentColor: 'text-amber-400',
      glowColor: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]',
      icon: Zap,
      description:
        'Immediate separation between Horizon 1 emergency staging (0-72 hours) and Horizon 2 permanent resettlement to prevent valley-wide gridlock.',
      telemetryPoints: [
        'Haversine Mountain Tortuosity: d_mountain = d_haversine \u00d7 1.326',
        'Cutoff Disqualification: Route bridge failure probability \u2265 50%',
        'Transit Radius: Immediate community staging within 1.0 km radius',
      ],
      caseStudy: 'Govt Model Inter-College Grounds (Site-C | 0.4 km proximity | 2,850 transit capacity)',
    },
    {
      id: 3,
      badge: 'STAGE 03: SPHERE AUDIT',
      title: '3D Sphere Carrying-Capacity Solver',
      subtitle: '3D capacity solver (3.5 m\u00b2 space, 15 LPD, 1:25 sanitation)',
      borderColor: 'border-emerald-500/40 hover:border-emerald-500/80',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      accentColor: 'text-emerald-400',
      glowColor: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]',
      icon: ShieldCheck,
      description:
        'Deterministic mathematical audit across 3 non-negotiable humanitarian resource axes based on Sphere 2018 Humanitarian Charter standards.',
      telemetryPoints: [
        'Covered Usable Living Space: Floor Area / 3.5 m\u00b2 per individual',
        'Daily Potable Water Supply: Daily Inflow / 15 Litres per person',
        'Sanitation Containment: Toilet Units \u00d7 25 persons per cubicle',
      ],
      caseStudy: 'Gopeshwar Enclave (Site-A | 18,000 m\u00b2 | 65k LPD | 140 Toilets \u2192 3,266 Safe Intake)',
    },
    {
      id: 4,
      badge: 'STAGE 04: BOTTLENECK',
      title: 'Goldratt Bottleneck Constraint Isolation',
      subtitle: 'Goldratt constraint isolation (Pipalkoti toilet cap rejection)',
      borderColor: 'border-cyan-500/40 hover:border-cyan-500/80',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      accentColor: 'text-cyan-400',
      glowColor: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]',
      icon: Filter,
      description:
        'Applies the Theory of Constraints (ToC) to identify the single limiting resource that binds true carrying capacity, preventing fatal overcrowding.',
      telemetryPoints: [
        'Binding Bottleneck Formula: C_eff = min(C_space, C_water, C_sanitation) - Occupancy',
        'Epidemic Prevention Filter: Gross land area never masks sanitation deficits',
        'Automatic Disqualification Flag: Flagged as OPERATIONALLY_REJECTED',
      ],
      caseStudy: 'Pipalkoti Shelf (Site-B | 25,000 m\u00b2 space but 30 toilets strictly caps safe shelter at 550 \u2192 REJECTED)',
    },
    {
      id: 5,
      badge: 'STAGE 05: ALLOCATE',
      title: 'Surge Stress-Test & Auto-Spillover',
      subtitle: 'Dynamic influx stress-test & multi-enclave auto-spillover',
      borderColor: 'border-indigo-500/40 hover:border-indigo-500/80',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      accentColor: 'text-indigo-400',
      glowColor: 'hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]',
      icon: GitFork,
      description:
        'Live sensitivity solving for unpredictable population surges (Yatra pilgrims, tourists, mass valley evacuations) with automated multi-site load balancing.',
      telemetryPoints: [
        'Dynamic Influx Slider: 1,000 to 5,000 souls with real-time recalculation',
        'Saturation Trigger: If Demand > C_eff(Site-A), surplus overflows to Site-C',
        'Zero-Deficit Guarantee: Evacuees are never assigned beyond safe capacity',
      ],
      caseStudy: 'Surge to 3,600 souls \u2192 Site-A absorbs 3,266 (saturated) + Site-C absorbs 334 (auto-spillover)',
    },
    {
      id: 6,
      badge: 'STAGE 06: DISPATCH',
      title: 'Statutory DM Act Directive & Logistics Requisition',
      subtitle: 'Statutory DM Act Section 34 requisition & PDF order',
      borderColor: 'border-purple-500/40 hover:border-purple-500/80',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      accentColor: 'text-purple-400',
      glowColor: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]',
      icon: CheckCircle2,
      description:
        'Generates legally-binding Disaster Management Act 2005 (Section 34) executive evacuation orders paired with calculated fleet and logistics requisitions.',
      telemetryPoints: [
        'Fleet Requisition: Transport Buses = ceil(N / 40)',
        'Water Logistics: 5,000L Tankers = ceil(N \u00d7 15 / 5000)',
        'Sanitation Units: Bio-Toilets = ceil(N / 25) | Medical Tents = ceil(N / 500)',
      ],
      caseStudy: 'Official SDMA / NDRF Incident Commander Dispatch Order with cryptographic audit checksum',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* 1. Ultra-Premium Glassmorphic Navigation Bar */}
      <header className="h-16 bg-[#0a0d14]/90 backdrop-blur-xl border-b border-gray-800/80 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 select-none">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-cyan-500/40 rounded-xl text-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent font-mono">
                SURAKSHA
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800 font-bold">
                MHA • SIH26191
              </span>
            </div>
            <p className="hidden sm:block text-[11px] font-mono text-slate-400">
              Disaster Relocation Intelligence & Carrying-Capacity Engine
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowSafeHavenModal(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-gray-700 hover:border-cyan-500/60 bg-slate-900/60 hover:bg-slate-800/80 text-xs font-mono font-semibold text-slate-300 hover:text-cyan-300 transition-all"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Public Safe Haven Finder</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/app')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-xs font-mono font-bold shadow-[0_0_18px_rgba(6,182,212,0.4)] transition-all transform hover:scale-[1.02]"
          >
            <span>Launch Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. Hero Header Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14 space-y-12">
        {/* Hero Top Title & Overview */}
        <section className="text-center max-w-4xl mx-auto space-y-4">
          {/* Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase font-bold shadow-[0_0_12px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>DECISION ARCHITECTURE</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            How <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">SURAKSHA</span> Decides
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            Every relocation directive flows through a deterministic, Sphere-standardized, human-supervised pipeline designed to eliminate fatal disaster-camp bottlenecks.
          </p>

          {/* Value Badges Banner */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-lg bg-[#0c111d] border border-gray-800 text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              100% Deterministic Pure Java
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#0c111d] border border-gray-800 text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Sphere 2018 Standards Certified
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#0c111d] border border-gray-800 text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              1.326\u00d7 Mountain Tortuosity Factor
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#0c111d] border border-gray-800 text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              DM Act 2005 (Sec 34) Enforceable
            </span>
          </div>
        </section>

        {/* 3. 6-Stage Pipeline Grid (Horizontal / Responsive Connected Cards) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3 font-mono">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>6-Stage Sequential Mathematical Pipeline</span>
            </div>
            <span className="text-[11px] text-slate-500">
              Deterministic • Zero Hallucination • Zero Native C++
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {stages.map((stage) => {
              const IconComponent = stage.icon;
              const isSelected = activeStage === stage.id;

              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`relative p-5 rounded-2xl bg-[#0c111d]/90 backdrop-blur-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 ${stage.borderColor} ${stage.glowColor} ${
                    isSelected ? 'ring-1 ring-cyan-500/60 shadow-xl scale-[1.01]' : 'opacity-95 hover:opacity-100'
                  }`}
                >
                  {/* Top Stage Header */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border tracking-wider ${stage.badgeColor}`}
                      >
                        {stage.badge}
                      </span>
                      <div className={`p-2 rounded-xl bg-slate-900 border border-gray-800 ${stage.accentColor}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Stage Title & Subtitle */}
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {stage.title}
                      </h3>
                      <p className={`text-xs font-mono mt-0.5 ${stage.accentColor}`}>
                        {stage.subtitle}
                      </p>
                    </div>

                    {/* Operational Description */}
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  {/* Telemetry Rules Checklist */}
                  <div className="space-y-2 pt-2 border-t border-gray-800/80 font-mono text-[11px]">
                    <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                      <Activity className="w-3 h-3 text-cyan-400" /> Key Telemetry & Formulas:
                    </div>
                    <ul className="space-y-1 text-slate-300">
                      {stage.telemetryPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-cyan-400 font-bold">\u2022</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Chamoli Benchmark Case Study Highlight */}
                    <div className="p-2.5 rounded-xl bg-[#060911]/90 border border-gray-800/90 text-[10px] text-slate-300 mt-2 space-y-0.5">
                      <span className="text-[9px] text-slate-400 uppercase font-bold block flex items-center gap-1">
                        <Compass className="w-2.5 h-2.5 text-amber-400" /> Chamoli Pilot Benchmark:
                      </span>
                      <div className="text-slate-100 font-semibold">{stage.caseStudy}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Interactive Mathematical Assurance Section */}
        <section className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#0c111d] to-[#070b14] border border-gray-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>THEORY OF CONSTRAINTS GUARANTEE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Why Standard Emergency Dashboards Fail
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Conventional disaster portals merely sum gross land area. If a football ground spans 25,000 m², conventional software assigns 7,000 people — ignoring that having only 30 toilets causes catastrophic cholera outbreaks within 48 hours.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                SURAKSHA binds carrying capacity strictly by the lowest humanitarian resource denominator. Pipalkoti is immediately disqualified, and surplus souls are automatically routed across secondary mountain enclaves.
              </p>
            </div>

            {/* Comparison Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-1.5">
                <span className="text-[10px] text-red-400 uppercase font-bold">Conventional Portals</span>
                <div className="text-xl font-black text-white">7,142 Souls</div>
                <p className="text-[11px] text-red-300">
                  Gross Area Only \u2022 Ignores 30-toilet limit \u2022 High epidemic risk
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <span className="text-[10px] text-emerald-400 uppercase font-bold">SURAKSHA Engine</span>
                <div className="text-xl font-black text-emerald-400">550 Souls Max</div>
                <p className="text-[11px] text-emerald-200">
                  Strict Goldratt Sanitation Cap \u2022 Auto-rejected for mass relocation
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 space-y-1.5">
                <span className="text-[10px] text-blue-400 uppercase font-bold">Distance Calculation</span>
                <div className="text-xl font-black text-white">1.326\u00d7 Factor</div>
                <p className="text-[11px] text-blue-300">
                  Haversine with real mountain tortuosity \u2022 Accurate road transit times
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-1.5">
                <span className="text-[10px] text-purple-400 uppercase font-bold">Execution Authority</span>
                <div className="text-xl font-black text-white">DM Act 2005</div>
                <p className="text-[11px] text-purple-300">
                  Section 34 statutory binding evacuation orders with legal audit log
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Footer Action Banner */}
        <section className="text-center py-8 border-t border-gray-800/80 space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Ready to inspect live tactical operations?
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto font-mono">
            Switch into the full-density Incident Operations Room with real-time multi-habitation triage, road cutoff simulations, and dynamic carrying capacity solvers.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/app')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-mono font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all transform hover:scale-[1.03]"
            >
              <span>Access Incident Operations Room</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      {/* 6. Public Safe Haven Finder Modal */}
      {showSafeHavenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-[#0c111d] border border-gray-800 rounded-3xl p-6 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Search className="w-4 h-4 text-cyan-400" />
                <span>PUBLIC SAFE HAVEN FINDER</span>
              </div>
              <button
                type="button"
                onClick={() => setShowSafeHavenModal(false)}
                className="text-slate-400 hover:text-white text-base"
              >
                \u2715
              </button>
            </div>

            <p className="text-slate-300 text-[11px] leading-relaxed">
              Public citizens and localized first-responders can verify safe transit corridors and certified shelters for their designated sector:
            </p>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-400">
                  <span>SITE-A: Gopeshwar Enclave</span>
                  <span>RECOMMENDED PRIMARY</span>
                </div>
                <div className="text-slate-300 text-[10px]">
                  All-Weather Dual Lane Access \u2022 Capacity: 3,266 souls \u2022 Water: 65,000 LPD \u2022 Sanitation: 140 Bio-units
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                <div className="flex items-center justify-between font-bold text-amber-400">
                  <span>SITE-C: Govt Model Inter-College Grounds</span>
                  <span>0-72H IMMEDIATE TRANSIT</span>
                </div>
                <div className="text-slate-300 text-[10px]">
                  Direct Mountain Road Access \u2022 Capacity: 2,850 souls \u2022 Proximity: 0.4 km from Nandikot
                </div>
              </div>

              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 space-y-1">
                <div className="flex items-center justify-between font-bold text-red-400">
                  <span>SITE-B: Pipalkoti Shelf</span>
                  <span>OPERATIONALLY REJECTED</span>
                </div>
                <div className="text-slate-300 text-[10px]">
                  DO NOT EVACUATE TO SITE-B: 30-toilet bottleneck caps safe intake at 550 individuals. Single-access bridge has 66% cutoff risk.
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowSafeHavenModal(false);
                  navigate('/app');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
              >
                Open Tactical Command Center \u2192
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
