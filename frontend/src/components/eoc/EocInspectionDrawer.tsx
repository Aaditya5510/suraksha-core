import React from 'react';
import type { EvaluationResultResponse, CandidateSiteEvaluationDTO, Habitation } from '../../types/suraksha';
import {
  Layers,
  XCircle,
  Maximize2,
  Droplets,
  Sparkles,
  Truck,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Users,
  Plus,
  Minus,
  AlertOctagon,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

interface EocInspectionDrawerProps {
  evaluation: EvaluationResultResponse;
  selectedHabitation: Habitation;
  simulatedPopulation: number;
  onPopulationChange: (pop: number) => void;
  selectedSiteId: string;
  onSelectSite: (siteId: string) => void;
  onOpenDirectiveModal: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const EocInspectionDrawer: React.FC<EocInspectionDrawerProps> = ({
  evaluation,
  selectedHabitation,
  simulatedPopulation,
  onPopulationChange,
  selectedSiteId,
  onSelectSite,
  onOpenDirectiveModal,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const { candidateSites } = evaluation;

  const siteA = candidateSites.find((s) => s.siteId === 'SITE-A') || candidateSites[0];
  const siteB = candidateSites.find((s) => s.siteId === 'SITE-B') || candidateSites[1];

  const currentSite: CandidateSiteEvaluationDTO =
    selectedSiteId === 'SITE-B' ? siteB : siteA;

  const isSiteB = selectedSiteId === 'SITE-B';
  const primaryCap = siteA ? siteA.capacityAudit.effectiveCapacity : 3266;
  const isSpillover = simulatedPopulation > primaryCap;
  const excessEvacuees = Math.max(0, simulatedPopulation - primaryCap);
  const baselinePop = selectedHabitation.population;

  // Logistics calculations
  const busesNeeded = Math.ceil(simulatedPopulation / 40);
  const waterLpdTotal = simulatedPopulation * 15;
  const waterTankersNeeded = Math.ceil(waterLpdTotal / 5000);
  const bioToiletsNeeded = Math.ceil(simulatedPopulation / 25);
  const medicalTentsNeeded = Math.max(1, Math.ceil(simulatedPopulation / 500));

  const handleStep = (delta: number) => {
    const next = Math.max(500, Math.min(6000, simulatedPopulation + delta));
    onPopulationChange(next);
  };

  const presets = [
    { label: 'Baseline', value: baselinePop, desc: 'Census' },
    { label: '+500 Tourists', value: baselinePop + 500, desc: 'Influx' },
    { label: '+1,500 Mass Evac', value: baselinePop + 1500, desc: 'Valley' },
  ];

  if (isCollapsed) {
    return (
      <div className="h-full bg-[#090d16] border-l border-gray-800 p-2 flex flex-col items-center justify-between shrink-0 select-none z-20">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-gray-700 text-cyan-400 shadow-md"
          title="Expand Inspection Drawer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="text-[10px] font-mono font-bold text-slate-400 rotate-90 whitespace-nowrap tracking-wider">
          SITE DOSSIER & METRICS
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
      </div>
    );
  }

  return (
    <aside className="w-[380px] bg-[#090d16] border-l border-gray-800 flex flex-col h-full overflow-y-auto custom-scrollbar p-4 space-y-4 font-mono text-xs select-none shrink-0 z-20">
      {/* 1. Drawer Header */}
      <div className="flex items-center justify-between border-b border-gray-800/80 pb-2.5">
        <div className="flex items-center gap-2 text-white font-bold tracking-wide">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>INSPECTION DOCK & DOSSIER</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
            SPHERE 2018
          </span>
          {onToggleCollapse && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white ml-1"
              title="Collapse Drawer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Site-A vs Site-B Selector Tabs */}
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
          Candidate Enclave Audit:
        </label>
        <div className="grid grid-cols-2 gap-2">
          {/* Site-A */}
          <button
            type="button"
            onClick={() => onSelectSite('SITE-A')}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              selectedSiteId === 'SITE-A'
                ? 'bg-emerald-500/15 border-emerald-500/70 shadow-[0_0_12px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/50'
                : 'bg-[#060911]/80 border-gray-800 text-slate-400 hover:border-gray-700 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-white">SITE-A</span>
              <span className="text-emerald-400 flex items-center gap-0.5 text-[9px]">
                <CheckCircle2 className="w-2.5 h-2.5" /> PRIMARY
              </span>
            </div>
            <div className="text-[11px] font-bold text-slate-200 truncate mt-0.5">{siteA.name}</div>
            <div className="text-[9px] text-emerald-400 font-semibold">Cap: {primaryCap.toLocaleString()} souls</div>
          </button>

          {/* Site-B */}
          <button
            type="button"
            onClick={() => onSelectSite('SITE-B')}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              selectedSiteId === 'SITE-B'
                ? 'bg-red-500/15 border-red-500/70 shadow-[0_0_12px_rgba(239,68,68,0.25)] ring-1 ring-red-500/50'
                : 'bg-[#060911]/80 border-gray-800 text-slate-400 hover:border-gray-700 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-white">SITE-B</span>
              <span className="text-red-400 flex items-center gap-0.5 text-[9px]">
                <XCircle className="w-2.5 h-2.5" /> REJECTED
              </span>
            </div>
            <div className="text-[11px] font-bold text-slate-200 truncate mt-0.5">
              {siteB ? siteB.name : 'Pipalkoti Shelf'}
            </div>
            <div className="text-[9px] text-red-400 font-semibold">Ceiling: 550 souls</div>
          </button>
        </div>
      </div>

      {/* 3. Selected Site Dossier & Goldratt Bottleneck Alert */}
      <div className="p-3 rounded-2xl bg-[#060911]/90 border border-gray-800/90 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              {currentSite.name}
            </h4>
            <span className="text-[10px] text-slate-400">
              {isSiteB ? 'Disqualified Shelf (10.0 km mountain transit)' : 'Recommended Enclave (0.9 km access corridor)'}
            </span>
          </div>
          <span
            className={`text-xs font-black px-2 py-0.5 rounded border ${
              isSiteB
                ? 'bg-red-950/80 border-red-800 text-red-400'
                : 'bg-emerald-950/80 border-emerald-800 text-emerald-400'
            }`}
          >
            {isSiteB ? '550 MAX' : `${primaryCap.toLocaleString()} CAP`}
          </span>
        </div>

        {/* Pipalkoti Explicit Goldratt Bottleneck Rejection Card */}
        {isSiteB ? (
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/60 space-y-1.5 text-xs shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <div className="flex items-center gap-1.5 text-red-400 font-bold text-[11px]">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-500 animate-pulse" />
              <span>REJECTED BY GOLDRATT BOTTLENECK</span>
            </div>
            <p className="text-[10px] text-slate-200 leading-snug">
              30 Toilets strictly caps safe shelter at 550 individuals. Allocating {simulatedPopulation.toLocaleString()} evacuees triggers catastrophic epidemic risk.
            </p>
            <div className="text-[9px] text-red-300 font-semibold pt-1 border-t border-red-500/30">
              Secondary Disqualification: 66% single-bridge mountain road cutoff probability.
            </div>
          </div>
        ) : (
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-200 leading-snug">
            ✓ <strong>Safe Resettlement Enclave</strong>: 18,000 m² usable land, 65,000 LPD water supply, and 140 sanitation toilets provide +{Math.max(0, primaryCap - simulatedPopulation)} surplus headroom.
          </div>
        )}

        {/* 3-Resource Sphere 2018 Carrying-Capacity Bars */}
        <div className="space-y-2 pt-1 text-[10px]">
          {/* Space */}
          <div className="space-y-0.5">
            <div className="flex justify-between">
              <span className="text-slate-300 flex items-center gap-1">
                <Maximize2 className="w-3 h-3 text-blue-400" /> Usable Space (3.5 m² / soul)
              </span>
              <strong className="text-white">
                {currentSite.capacityAudit.grossByArea.toLocaleString()} souls
              </strong>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-gray-800">
              <div
                className={`h-full rounded-full ${isSiteB ? 'bg-slate-600' : 'bg-emerald-500'}`}
                style={{ width: `${Math.min((currentSite.capacityAudit.grossByArea / 6000) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Water */}
          <div className="space-y-0.5">
            <div className="flex justify-between">
              <span className="text-slate-300 flex items-center gap-1">
                <Droplets className="w-3 h-3 text-cyan-400" /> Potable Water (15 LPD / soul)
              </span>
              <strong className="text-white">
                {currentSite.capacityAudit.grossByWater.toLocaleString()} souls
              </strong>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-gray-800">
              <div
                className={`h-full rounded-full ${isSiteB ? 'bg-slate-600' : 'bg-cyan-500'}`}
                style={{ width: `${Math.min((currentSite.capacityAudit.grossByWater / 6000) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Sanitation */}
          <div className="space-y-0.5">
            <div className="flex justify-between">
              <span className={`flex items-center gap-1 font-semibold ${isSiteB ? 'text-red-400' : 'text-slate-300'}`}>
                <Sparkles className="w-3 h-3 text-amber-400" /> Sanitation (1:25 toilet standard)
              </span>
              <strong className={isSiteB ? 'text-red-400 font-black' : 'text-amber-300'}>
                {currentSite.capacityAudit.grossBySanitation.toLocaleString()} gross ({currentSite.capacityAudit.effectiveCapacity.toLocaleString()} net)
              </strong>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-gray-800">
              <div
                className={`h-full rounded-full ${isSiteB ? 'bg-red-600 animate-pulse' : 'bg-gradient-to-r from-amber-500 to-emerald-500'}`}
                style={{ width: `${Math.min((currentSite.capacityAudit.grossBySanitation / 6000) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Influx Stress Controller & Sensitivity Stepper */}
      <div className="p-3 rounded-2xl bg-[#060911]/90 border border-gray-800/90 space-y-3">
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-400" /> Influx Stress Controller
          </span>
          <span className="text-[10px] text-emerald-400 font-bold">
            Cap: {primaryCap.toLocaleString()}
          </span>
        </div>

        {/* Counter Stepper with Value */}
        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#0a0f1d] border border-gray-800">
          <button
            type="button"
            onClick={() => handleStep(-100)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title="Decrease 100 evacuees"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <div className="text-center">
            <span className="text-base font-black text-white">{simulatedPopulation.toLocaleString()}</span>
            <span className="text-[9px] text-slate-400 block leading-none">evacuees</span>
          </div>

          <button
            type="button"
            onClick={() => handleStep(+100)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title="Increase 100 evacuees"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Presets Grid */}
        <div className="grid grid-cols-3 gap-1.5">
          {presets.map((p) => {
            const isActive = simulatedPopulation === p.value;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => onPopulationChange(p.value)}
                className={`p-1.5 rounded-lg border text-center transition-all ${
                  isActive
                    ? 'bg-blue-600/20 border-blue-500 text-white font-bold shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                    : 'bg-[#060911]/60 border-gray-800 text-slate-400 hover:border-gray-700 hover:text-slate-200'
                }`}
              >
                <div className="text-[10px] font-bold">{p.label}</div>
                <div className="text-[8px] text-slate-500">{p.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Granular Slider */}
        <div className="space-y-1 pt-1">
          <input
            type="range"
            min="1000"
            max="5000"
            step="10"
            value={simulatedPopulation}
            onChange={(e) => onPopulationChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500 border border-gray-800"
          />
          <div className="flex justify-between text-[9px] text-slate-500">
            <span>1,000</span>
            <span className="text-amber-400">Sat: {primaryCap.toLocaleString()}</span>
            <span>5,000</span>
          </div>
        </div>

        {/* Headroom / Spillover Badge */}
        <div>
          {isSpillover ? (
            <div className="p-2 rounded-xl bg-red-500/15 border border-red-500/40 text-red-400 text-[10px] font-bold flex items-center gap-1.5 animate-pulse">
              <AlertOctagon className="w-3.5 h-3.5 shrink-0" />
              <span>DEFICIT (+{excessEvacuees.toLocaleString()} SOULS) — AUTO-SPILLOVER ROUTED TO SITE-C</span>
            </div>
          ) : (
            <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>SAFE HEADROOM (+{primaryCap - simulatedPopulation} SURPLUS SOULS)</span>
            </div>
          )}
        </div>
      </div>

      {/* 5. Live Fleet & Logistics Matrix */}
      <div className="p-3 rounded-2xl bg-[#060911]/90 border border-gray-800/90 space-y-2.5">
        <div className="flex items-center justify-between border-b border-gray-800 pb-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
            <Truck className="w-3 h-3 text-amber-400" /> Fleet Requisition Matrix
          </span>
          <span className="text-[9px] text-slate-500 font-mono">
            {simulatedPopulation.toLocaleString()} EVACUEES
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-2 rounded-xl bg-[#0a0f1d] border border-blue-500/30">
            <div className="text-slate-400 text-[9px]">Transport Buses</div>
            <div className="text-base font-black text-white">{busesNeeded}</div>
            <div className="text-[9px] text-blue-400">40-Pax Fleet</div>
          </div>

          <div className="p-2 rounded-xl bg-[#0a0f1d] border border-cyan-500/30">
            <div className="text-slate-400 text-[9px]">Water Tankers</div>
            <div className="text-base font-black text-white">{waterTankersNeeded}</div>
            <div className="text-[9px] text-cyan-400">5,000L Units</div>
          </div>

          <div className="p-2 rounded-xl bg-[#0a0f1d] border border-amber-500/30">
            <div className="text-slate-400 text-[9px]">Bio-Toilets</div>
            <div className="text-base font-black text-white">{bioToiletsNeeded}</div>
            <div className="text-[9px] text-amber-400">1:25 Standard</div>
          </div>

          <div className="p-2 rounded-xl bg-[#0a0f1d] border border-emerald-500/30">
            <div className="text-slate-400 text-[9px]">Medical Triage</div>
            <div className="text-base font-black text-white">{medicalTentsNeeded}</div>
            <div className="text-[9px] text-emerald-400">1 per 500</div>
          </div>
        </div>
      </div>

      {/* 6. Action Button: Generate Statutory Evacuation Order */}
      <div className="pt-1">
        <button
          type="button"
          onClick={onOpenDirectiveModal}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-xs font-bold shadow-[0_0_18px_rgba(16,185,129,0.35)] transition-all transform hover:scale-[1.01]"
        >
          <FileText className="w-4 h-4" />
          <span>GENERATE STATUTORY EVACUATION ORDER</span>
        </button>
      </div>
    </aside>
  );
};
