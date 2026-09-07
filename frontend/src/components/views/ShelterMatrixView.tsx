import React from 'react';
import type { EvaluationResultResponse, Habitation } from '../../types/suraksha';
import {
  ShieldCheck,
  XCircle,
  Users,
  Droplets,
  Maximize2,
  Sparkles,
  AlertTriangle,
  Flame,
  Building2,
  TrendingUp,
  Layers,
} from 'lucide-react';

interface ShelterMatrixViewProps {
  evaluation: EvaluationResultResponse;
  selectedHabitation: Habitation;
  simulatedPopulation: number;
  onPopulationChange: (pop: number) => void;
  selectedSiteId: string;
  onSelectSite: (siteId: string) => void;
}

export const ShelterMatrixView: React.FC<ShelterMatrixViewProps> = ({
  evaluation,
  selectedHabitation,
  simulatedPopulation,
  onPopulationChange,
  selectedSiteId: _selectedSiteId,
  onSelectSite: _onSelectSite,
}) => {
  const { tacticalShelterImmediate, candidateSites } = evaluation;

  const siteA = candidateSites.find((s) => s.siteId === 'SITE-A') || candidateSites[0];
  const siteB = candidateSites.find((s) => s.siteId === 'SITE-B') || candidateSites[1];

  const primaryCap = siteA.capacityAudit.effectiveCapacity; // 3266
  const transitCap = tacticalShelterImmediate.capacityAudit.effectiveCapacity; // 2850
  const isSpillover = simulatedPopulation > primaryCap;
  const spilloverCount = Math.max(0, simulatedPopulation - primaryCap);
  const siteAHeadroom = primaryCap - simulatedPopulation;

  // Site-A Capacity Audit Breakdown
  const siteASpaceGross = siteA.capacityAudit.grossByArea; // 5142
  const siteAWaterGross = siteA.capacityAudit.grossByWater; // 4333
  const siteASanitationGross = siteA.capacityAudit.grossBySanitation; // 3500

  // Site-B Capacity Audit Breakdown
  const siteBSpaceGross = siteB ? siteB.capacityAudit.grossByArea : 7142;
  const siteBWaterGross = siteB ? siteB.capacityAudit.grossByWater : 3000;
  const siteBSanitationGross = siteB ? siteB.capacityAudit.grossBySanitation : 750;
  const siteBEffective = siteB ? siteB.capacityAudit.effectiveCapacity : 550;
  const siteBDeficit = siteBEffective - simulatedPopulation;

  const presets = [
    { label: 'Baseline Census', value: selectedHabitation.population, desc: `${selectedHabitation.population.toLocaleString()} People` },
    { label: 'Surge +25%', value: Math.round(selectedHabitation.population * 1.25), desc: `${Math.round(selectedHabitation.population * 1.25).toLocaleString()} Evacuees` },
    { label: 'Mass Evacuation', value: 4200, desc: '4,200 Evacuees' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 font-mono select-none">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg md:text-xl font-bold text-white tracking-wide">
              SHELTER CARRYING-CAPACITY MATRIX & STRESS SIMULATOR
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Theory of Constraints / Goldratt Bottleneck Evaluation • Sphere Humanitarian Standards 2018
          </p>
        </div>

        {/* Active Evacuee Demand Counter */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#0b0f19] border border-gray-800 shadow-lg">
          <Users className="w-4 h-4 text-blue-400" />
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Current Evacuee Demand:</span>
            <div className="text-base font-extrabold text-white leading-tight">
              {simulatedPopulation.toLocaleString()} <span className="text-xs text-slate-400 font-normal">Evacuees</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Side-By-Side Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Card 1: Gopeshwar Enclave (Site-A) - Safe Primary Resettlement */}
        <div className="tactical-card p-5 space-y-4 border-emerald-500/40 bg-[#0a1017]/90 shadow-[0_0_20px_rgba(16,185,129,0.1)] ring-1 ring-emerald-500/20">
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase">SITE-A</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> RECOMMENDED PRIMARY
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white mt-1">{siteA.name}</h3>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Sphere Safe Cap:</span>
              <span className="text-lg font-extrabold text-emerald-400">{primaryCap.toLocaleString()}</span>
            </div>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-gray-800 text-xs text-center">
            <div>
              <span className="text-[10px] text-slate-400 block">Safe Intake:</span>
              <span className="font-bold text-white text-sm">{primaryCap.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Headroom:</span>
              <span className={`font-bold text-sm ${siteAHeadroom >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {siteAHeadroom >= 0 ? `+${siteAHeadroom}` : siteAHeadroom}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Road Distance:</span>
              <span className="font-bold text-slate-200 text-sm">{siteA.distanceKm} km</span>
            </div>
          </div>

          {/* 3 Sphere Capacity Progress Bars */}
          <div className="space-y-3 pt-1">
            {/* 1. Usable Space */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-blue-400" /> Usable Space (3.5 m² / person)
                </span>
                <span className="text-white font-bold">{siteASpaceGross.toLocaleString()} People</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-gray-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                  style={{ width: `${Math.min((siteASpaceGross / 5500) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* 2. Water Supply */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-400" /> Potable Water (15 LPD / person)
                </span>
                <span className="text-white font-bold">{siteAWaterGross.toLocaleString()} People</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-gray-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                  style={{ width: `${Math.min((siteAWaterGross / 5500) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* 3. Sanitation Units (Limiting Bottleneck) */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Sanitation Units (1:25 toilet ratio)
                </span>
                <span className="text-amber-300 font-bold">{siteASanitationGross.toLocaleString()} gross (3,266 net)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-gray-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
                  style={{ width: `${Math.min((siteASanitationGross / 5500) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-200 leading-relaxed">
            ✓ <strong>Optimal Permanent Enclave</strong>: 18,000 m² flat terrain with 140 sanitation units and 65k LPD gravity-fed water line. 0.08 bridge cutoff risk.
          </div>
        </div>

        {/* Card 2: Pipalkoti Shelf (Site-B) - Operationally Rejected Alert Card */}
        <div className="tactical-card p-5 space-y-4 border-red-500/50 bg-[#120a0c]/90 shadow-[0_0_20px_rgba(239,68,68,0.15)] ring-1 ring-red-500/30">
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-red-500 uppercase">SITE-B</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 font-bold flex items-center gap-1">
                  <XCircle className="w-3 h-3" /> OPERATIONALLY REJECTED
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white mt-1 line-through decoration-red-500">
                {siteB ? siteB.name : 'Pipalkoti Shelf'}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Sanitation Ceiling:</span>
              <span className="text-lg font-extrabold text-red-500">550 People Max</span>
            </div>
          </div>

          {/* Critical Rejection Banner */}
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/60 text-xs space-y-1.5 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.25)]">
            <div className="flex items-center gap-1.5 text-red-400 font-extrabold text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
              <span>REJECTED BY GOLDRATT BOTTLENECK</span>
            </div>
            <p className="text-[11px] text-slate-200 leading-snug">
              25,000 m² open land available, but only 30 functional toilets. 550 individual ceiling strictly enforced to prevent epidemic outbreak.
            </p>
          </div>

          {/* 3 Sphere Capacity Progress Bars Showing Fatal Sanitation Ceiling */}
          <div className="space-y-3 pt-1">
            {/* 1. Usable Space (Abundant) */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-blue-400" /> Usable Space (25,000 m²)
                </span>
                <span className="text-slate-300">{siteBSpaceGross.toLocaleString()} People (Abundant)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-gray-800">
                <div
                  className="h-full bg-slate-600 rounded-full"
                  style={{ width: `${Math.min((siteBSpaceGross / 7500) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* 2. Water Supply */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-400" /> Potable Water (45,000 LPD)
                </span>
                <span className="text-slate-300">{siteBWaterGross.toLocaleString()} People</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-gray-800">
                <div
                  className="h-full bg-slate-600 rounded-full"
                  style={{ width: `${Math.min((siteBWaterGross / 7500) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* 3. Sanitation Units (The Fatal Bottleneck) */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-red-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-500" /> Sanitation Ceiling (30 Toilets)
                </span>
                <span className="text-red-400 font-extrabold">{siteBEffective} People MAX ({siteBDeficit} Deficit)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-red-500/50">
                <div
                  className="h-full bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                  style={{ width: `${Math.min((siteBSanitationGross / 7500) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-800 text-[11px] text-red-300 leading-relaxed">
            ⚠️ <strong>Secondary Fatal Flaw</strong>: 66% single-bridge mountain road cutoff probability. Evacuees would risk isolation during heavy monsoon debris flow.
          </div>
        </div>
      </div>

      {/* 2. Interactive Evacuee Surge Simulator & Auto-Spillover Engine */}
      <div className="tactical-card p-5 space-y-4 border-gray-800 bg-[#090d14]/95">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Dynamic Evacuee Surge Simulator (Stress-Test Thresholds)
            </h3>
          </div>

          <div className="text-xs font-mono text-slate-300 flex items-center gap-2">
            <span className="text-slate-400">Primary Capacity Ceiling:</span>
            <strong className="text-emerald-400">{primaryCap.toLocaleString()} People</strong>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="grid grid-cols-3 gap-2">
          {presets.map((p) => {
            const isActive = simulatedPopulation === p.value;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => onPopulationChange(p.value)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-blue-600/20 border-blue-500 text-white font-bold shadow-[0_0_12px_rgba(59,130,246,0.35)]'
                    : 'bg-[#05070c] border-gray-800 text-slate-400 hover:border-gray-700 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold text-white">{p.label}</div>
                <div className="text-[10px] text-slate-400">{p.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Interactive Continuous Range Slider */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs text-slate-400">
            <span>1,000 Min</span>
            <span className="text-amber-400 font-bold">Saturation Threshold: {primaryCap.toLocaleString()}</span>
            <span>5,000 Max</span>
          </div>
          <input
            type="range"
            min="1000"
            max="5000"
            step="10"
            value={simulatedPopulation}
            onChange={(e) => onPopulationChange(Number(e.target.value))}
            className="w-full h-3 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500 border border-gray-800"
          />
        </div>

        {/* Active Auto-Spillover Triggered Alert Banner */}
        {isSpillover ? (
          <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/50 space-y-3 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.25)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-400 font-extrabold text-xs">
                <Flame className="w-4 h-4 text-red-500 animate-bounce" />
                <span>🚨 AUTO-SPILLOVER TRIGGERED: Primary site saturated at {primaryCap.toLocaleString()}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold">
                +{spilloverCount.toLocaleString()} OVERFLOW
              </span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">
              Site-A (Gopeshwar Enclave) saturated at its maximum Sphere carrying-capacity limit of{' '}
              <strong className="text-white">{primaryCap.toLocaleString()}</strong>. Dynamic spillover load-balancer re-routing surplus evacuees to Site-C Inter-College grounds:
            </p>

            {/* Split Allocation Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-950/90 border border-emerald-500/40 flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-400 text-xs">SITE-A (Gopeshwar)</div>
                  <div className="text-[10px] text-slate-400">Primary Enclave (100% Saturation)</div>
                </div>
                <span className="text-base font-extrabold text-white">{primaryCap.toLocaleString()}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/90 border border-amber-500/50 flex items-center justify-between">
                <div>
                  <div className="font-bold text-amber-400 text-xs flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" /> SITE-C (Inter-College)
                  </div>
                  <div className="text-[10px] text-slate-400">Spillover Transit Staging (Cap: {transitCap.toLocaleString()})</div>
                </div>
                <span className="text-base font-extrabold text-amber-300">+{spilloverCount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-emerald-400 font-bold">NOMINAL CAPACITY ALLOCATION</span>
                <p className="text-[11px] text-slate-300">
                  Site-A comfortably absorbs entire crisis population with{' '}
                  <strong className="text-white">+{siteAHeadroom}</strong> surplus headroom remaining.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
