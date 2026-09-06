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
  MapPin,
  Layers,
  Search,
  Sparkles,
  X,
} from 'lucide-react';

export const DecisionArchitectureLanding: React.FC = () => {
  const navigate = useNavigate();
  const [activeStage, setActiveStage] = useState<number>(1);
  const [showSafeHavenModal, setShowSafeHavenModal] = useState<boolean>(false);

  const stages = [
    {
      id: 1,
      badge: 'STAGE 01: INTAKE',
      title: 'Threat Detection',
      borderColor: 'border-red-500/40 hover:border-red-500/80',
      badgeColor: 'bg-red-500/10 text-red-400 border-red-500/30',
      accentColor: 'text-red-400',
      glowColor: 'hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]',
      icon: AlertTriangle,
      description:
        'Continuous slope telemetry and weather feeds flag settlements entering active danger zones.',
      actionTag:
        'Nandikot Settlement: 2,840 residents flagged for red-zone evacuation.',
    },
    {
      id: 2,
      badge: 'STAGE 02: TRIAGE',
      title: 'Corridor Recon',
      borderColor: 'border-amber-500/40 hover:border-amber-500/80',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      accentColor: 'text-amber-400',
      glowColor: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]',
      icon: Zap,
      description:
        'Verifies mountain road passability and marks immediate 0-72h staging havens.',
      actionTag:
        'Govt Inter-College: Activated for initial first-aid & intake triage.',
    },
    {
      id: 3,
      badge: 'STAGE 03: SPHERE AUDIT',
      title: 'Humanitarian Audit',
      borderColor: 'border-emerald-500/40 hover:border-emerald-500/80',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      accentColor: 'text-emerald-400',
      glowColor: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]',
      icon: ShieldCheck,
      description:
        'Calculates true safe capacity across shelter living space, clean water, and sanitation.',
      actionTag:
        'Gopeshwar Enclave: Certified safe for 3,266 evacuees.',
    },
    {
      id: 4,
      badge: 'STAGE 04: BOTTLENECK',
      title: 'Safety Filtering',
      borderColor: 'border-cyan-500/40 hover:border-cyan-500/80',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      accentColor: 'text-cyan-400',
      glowColor: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]',
      icon: Filter,
      description:
        'Rejects large open grounds that lack sanitation to prevent fatal epidemic outbreaks.',
      actionTag:
        'Pipalkoti Shelf: Disqualified due to 30-toilet shortage (550 cap).',
    },
    {
      id: 5,
      badge: 'STAGE 05: ALLOCATE',
      title: 'Surge Balancing',
      borderColor: 'border-indigo-500/40 hover:border-indigo-500/80',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      accentColor: 'text-indigo-400',
      glowColor: 'hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]',
      icon: GitFork,
      description:
        'Simulates sudden pilgrim or evacuee influxes, automatically diverting overflow to secondary hubs.',
      actionTag:
        'Automated Spillover: Keeps shelters safe from deadly overcrowding.',
    },
    {
      id: 6,
      badge: 'STAGE 06: DISPATCH',
      title: 'Statutory Order',
      borderColor: 'border-purple-500/40 hover:border-purple-500/80',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      accentColor: 'text-purple-400',
      glowColor: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]',
      icon: CheckCircle2,
      description:
        'Calculates logistical vehicle needs and outputs legally binding evacuation decrees under DM Act 2005.',
      actionTag:
        'Requisition Sheet: 71 Buses, 9 Water Tankers, and 114 Mobile Toilets.',
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
              100% Deterministic Engine
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#0c111d] border border-gray-800 text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Sphere 2018 Standards
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#0c111d] border border-gray-800 text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Terrain-Adjusted Proximity
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#0c111d] border border-gray-800 text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              DM Act 2005 Enforceable
            </span>
          </div>
        </section>

        {/* 3. 6-Stage Pipeline Grid (Clean, ResQFlow Minimal Standard) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3 font-mono">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>6-Stage Sequential Decision Pipeline</span>
            </div>
            <span className="text-[11px] text-slate-500">
              Deterministic • Zero Bottlenecks • Fully Auditable
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

                    {/* Stage Title */}
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {stage.title}
                      </h3>
                    </div>

                    {/* Core Function (1 sentence, text-slate-300, text-sm) */}
                    <p className="text-sm text-slate-300 leading-relaxed font-sans">
                      {stage.description}
                    </p>
                  </div>

                  {/* Chamoli Pilot Example (1 concise highlighted chip, text-xs) */}
                  <div className="pt-2 border-t border-gray-800/80">
                    <div className="p-2.5 rounded-xl bg-[#060911]/90 border border-gray-800 text-xs text-slate-300 font-mono flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{stage.actionTag}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Executive Safety Guarantee Section */}
        <section className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#0c111d] to-[#070b14] border border-gray-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SAFETY FIRST ARCHITECTURE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Why Standard Emergency Portals Fail
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Conventional disaster portals merely sum gross land area. If an open ground spans 25,000 m², conventional systems assign 7,000 people — ignoring that having only 30 toilets causes catastrophic epidemic outbreaks within 48 hours.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                SURAKSHA binds carrying capacity strictly by the lowest humanitarian resource denominator. Pipalkoti is immediately disqualified, and surplus evacuees are automatically routed across certified secondary enclaves.
              </p>
            </div>

            {/* Comparison Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-1.5">
                <span className="text-[10px] text-red-400 uppercase font-bold">Conventional Systems</span>
                <div className="text-xl font-black text-white">7,142 Souls</div>
                <p className="text-[11px] text-red-300">
                  Gross Area Only • Ignores 30-toilet limit • High epidemic risk
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <span className="text-[10px] text-emerald-400 uppercase font-bold">SURAKSHA Engine</span>
                <div className="text-xl font-black text-emerald-400">550 Souls Max</div>
                <p className="text-[11px] text-emerald-200">
                  Strict Sanitation Cap • Auto-rejected for mass relocation
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 space-y-1.5">
                <span className="text-[10px] text-blue-400 uppercase font-bold">Terrain Distance</span>
                <div className="text-xl font-black text-white">1.326× Factor</div>
                <p className="text-[11px] text-blue-300">
                  Mountain Road Tortuosity • Accurate transit timings
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-1.5">
                <span className="text-[10px] text-purple-400 uppercase font-bold">Execution Authority</span>
                <div className="text-xl font-black text-white">DM Act 2005</div>
                <p className="text-[11px] text-purple-300">
                  Section 34 statutory binding evacuation orders
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
            Access the full-density Incident Operations Room with real-time multi-habitation triage, road cutoff simulations, and dynamic carrying capacity solvers.
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
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
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
                  All-Weather Dual Lane Access • Capacity: 3,266 souls • Water: 65,000 LPD • Sanitation: 140 Bio-units
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                <div className="flex items-center justify-between font-bold text-amber-400">
                  <span>SITE-C: Govt Model Inter-College Grounds</span>
                  <span>0-72H IMMEDIATE TRANSIT</span>
                </div>
                <div className="text-slate-300 text-[10px]">
                  Direct Mountain Road Access • Capacity: 2,850 souls • Proximity: 0.4 km from Nandikot
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
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all"
              >
                <span>Open Tactical Command Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
