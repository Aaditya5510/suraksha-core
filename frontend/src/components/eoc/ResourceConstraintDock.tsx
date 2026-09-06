import React from 'react';
import type { EvaluationResultResponse, CandidateSiteEvaluationDTO } from '../../types/suraksha';
import {
  Layers,
  XCircle,
  Maximize2,
  Droplets,
  Sparkles,
  Truck,
  HeartPulse,
  FileText,
  AlertTriangle,
  Flame,
  CheckCircle2,
} from 'lucide-react';

interface ResourceConstraintDockProps {
  evaluation: EvaluationResultResponse;
  simulatedPopulation: number;
  selectedSiteId: string;
  onSelectSite: (siteId: string) => void;
  onOpenDirectiveModal: () => void;
}

export const ResourceConstraintDock: React.FC<ResourceConstraintDockProps> = ({
  evaluation,
  simulatedPopulation,
  selectedSiteId,
  onSelectSite,
  onOpenDirectiveModal,
}) => {
  const { tacticalShelterImmediate, candidateSites } = evaluation;

  const siteA = candidateSites.find((s) => s.siteId === 'SITE-A') || candidateSites[0];
  const siteB = candidateSites.find((s) => s.siteId === 'SITE-B') || candidateSites[1];

  const currentSite: CandidateSiteEvaluationDTO =
    selectedSiteId === 'SITE-B' ? siteB : siteA;

  const isSiteB = selectedSiteId === 'SITE-B';
  const primaryCap = siteA.capacityAudit.effectiveCapacity; // 3266
  const isSpillover = simulatedPopulation > primaryCap;
  const excessEvacuees = Math.max(0, simulatedPopulation - primaryCap);

  // Live 4-Card Logistics Metrics
  const busesNeeded = Math.ceil(simulatedPopulation / 40);
  const waterLpdTotal = simulatedPopulation * 15;
  const waterTankersNeeded = Math.ceil(waterLpdTotal / 5000);
  const bioToiletsNeeded = Math.ceil(simulatedPopulation / 25);
  const medicalTentsNeeded = Math.max(1, Math.ceil(simulatedPopulation / 500));

  return (
    <aside className="w-[360px] max-w-[calc(100vw-2rem)] flex flex-col gap-3 font-mono select-none">
      {/* 1. Candidate Enclave Dossier (Sphere 2018 Carrying Capacity) */}
      <div className="bg-[#0c111d]/90 backdrop-blur-xl border border-gray-800/90 rounded-2xl p-4 shadow-2xl space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-2">
          <div className="flex items-center gap-2 text-white font-bold text-xs tracking-wide">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>SHELTER CAPACITY DOSSIER</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
            SPHERE 2018
          </span>
        </div>

        {/* Site-A vs Site-B Interactive Selector Tabs */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onSelectSite('SITE-A')}
            className={`p-2 rounded-xl border text-left transition-all ${
              selectedSiteId === 'SITE-A'
                ? 'bg-emerald-500/15 border-emerald-500/70 shadow-[0_0_12px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/50'
                : 'bg-[#060911]/80 border-gray-800 text-slate-400 hover:border-gray-700 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-white">SITE-A</span>
              <span className="text-emerald-400 flex items-center gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" /> PRIMARY
              </span>
            </div>
            <div className="text-[11px] font-bold text-slate-200 truncate mt-0.5">{siteA.name}</div>
            <div className="text-[9px] text-emerald-400 font-semibold">Cap: {primaryCap.toLocaleString()} souls</div>
          </button>

          <button
            type="button"
            onClick={() => onSelectSite('SITE-B')}
            className={`p-2 rounded-xl border text-left transition-all ${
              selectedSiteId === 'SITE-B'
                ? 'bg-red-500/15 border-red-500/70 shadow-[0_0_12px_rgba(239,68,68,0.25)] ring-1 ring-red-500/50'
                : 'bg-[#060911]/80 border-gray-800 text-slate-400 hover:border-gray-700 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-white">SITE-B</span>
              <span className="text-red-400 flex items-center gap-0.5">
                <XCircle className="w-2.5 h-2.5" /> REJECTED
              </span>
            </div>
            <div className="text-[11px] font-bold text-slate-200 truncate mt-0.5">{siteB ? siteB.name : 'Pipalkoti Shelf'}</div>
            <div className="text-[9px] text-red-400 font-semibold">Ceiling: 550 souls</div>
          </button>
        </div>

        {/* Site Details & Constraint Breakdown */}
        <div className="space-y-2.5 pt-1">
          {/* Active Site Title */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                {currentSite.name}
              </h4>
              <span className="text-[10px] text-slate-400">
                {isSiteB ? 'Disqualified Enclave (10.0 km)' : 'Recommended Enclave (0.9 km)'}
              </span>
            </div>
            <span
              className={`text-xs font-extrabold px-2 py-0.5 rounded border ${
                isSiteB
                  ? 'bg-red-950/80 border-red-800 text-red-400'
                  : 'bg-emerald-950/80 border-emerald-800 text-emerald-400'
              }`}
            >
              {isSiteB ? '550 Max' : `${primaryCap.toLocaleString()} Cap`}
            </span>
          </div>

          {/* Pipalkoti Explicit Goldratt Bottleneck Rejection Card */}
          {isSiteB ? (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/60 space-y-1.5 text-xs animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <div className="flex items-center gap-1.5 text-red-400 font-bold text-[11px]">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                <span>REJECTED BY GOLDRATT BOTTLENECK</span>
              </div>
              <p className="text-[10px] text-slate-200 leading-snug">
                30 Toilets strictly caps safe shelter at 550 individuals. Placing {simulatedPopulation.toLocaleString()} souls would cause catastrophic epidemic risk.
              </p>
              <div className="text-[9px] text-red-300 font-semibold pt-0.5 border-t border-red-500/30">
                Secondary Disqualification: 66% single-bridge mountain road cutoff probability.
              </div>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-200 leading-snug">
              ✓ <strong>Safe Resettlement Enclave</strong>: 18,000 m² usable land, 65k LPD water supply, and 140 sanitation toilets provide +{primaryCap - simulatedPopulation >= 0 ? primaryCap - simulatedPopulation : 0} headroom.
            </div>
          )}

          {/* 3 Sphere Resource Metric Bars */}
          <div className="space-y-2 pt-1 text-[10px]">
            {/* 1. Usable Space */}
            <div className="space-y-0.5">
              <div className="flex justify-between">
                <span className="text-slate-300 flex items-center gap-1">
                  <Maximize2 className="w-3 h-3 text-blue-400" /> Space (3.5 m² / soul)
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

            {/* 2. Potable Water */}
            <div className="space-y-0.5">
              <div className="flex justify-between">
                <span className="text-slate-300 flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-blue-400" /> Water (15 LPD / soul)
                </span>
                <strong className="text-white">
                  {currentSite.capacityAudit.grossByWater.toLocaleString()} souls
                </strong>
              </div>
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-gray-800">
                <div
                  className={`h-full rounded-full ${isSiteB ? 'bg-slate-600' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.min((currentSite.capacityAudit.grossByWater / 6000) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* 3. Sanitation Units */}
            <div className="space-y-0.5">
              <div className="flex justify-between">
                <span className={`flex items-center gap-1 font-semibold ${isSiteB ? 'text-red-400' : 'text-slate-300'}`}>
                  <Sparkles className="w-3 h-3 text-amber-400" /> Sanitation (1:25 toilet standard)
                </span>
                <strong className={isSiteB ? 'text-red-400 font-extrabold' : 'text-amber-300'}>
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
      </div>

      {/* 2. Live Fleet & Logistics Requisition (Real-time reactive calculation) */}
      <div className="bg-[#0c111d]/90 backdrop-blur-xl border border-gray-800/90 rounded-2xl p-4 shadow-2xl space-y-3">
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-amber-400" /> Logistics Requisition Matrix
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
            {simulatedPopulation.toLocaleString()} SOULS
          </span>
        </div>

        {/* 4 High-Density Operational Metric Cards */}
        <div className="grid grid-cols-2 gap-2">
          {/* Transport Buses */}
          <div className="p-2 rounded-xl bg-[#060911]/90 border border-blue-500/30 space-y-0.5">
            <div className="flex items-center justify-between text-slate-400 text-[9px]">
              <span>Transport</span>
              <Truck className="w-3 h-3 text-blue-400" />
            </div>
            <div className="text-lg font-black text-white">{busesNeeded}</div>
            <div className="text-[9px] font-bold text-blue-400">40-Pax Buses</div>
          </div>

          {/* Water Tankers */}
          <div className="p-2 rounded-xl bg-[#060911]/90 border border-cyan-500/30 space-y-0.5">
            <div className="flex items-center justify-between text-slate-400 text-[9px]">
              <span>Water</span>
              <Droplets className="w-3 h-3 text-cyan-400" />
            </div>
            <div className="text-lg font-black text-white">{waterTankersNeeded}</div>
            <div className="text-[9px] font-bold text-cyan-400">5kL Tankers</div>
          </div>

          {/* Bio-Toilets */}
          <div className="p-2 rounded-xl bg-[#060911]/90 border border-amber-500/30 space-y-0.5">
            <div className="flex items-center justify-between text-slate-400 text-[9px]">
              <span>Sanitation</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </div>
            <div className="text-lg font-black text-white">{bioToiletsNeeded}</div>
            <div className="text-[9px] font-bold text-amber-400">Bio-Toilets</div>
          </div>

          {/* Medical Tents */}
          <div className="p-2 rounded-xl bg-[#060911]/90 border border-emerald-500/30 space-y-0.5">
            <div className="flex items-center justify-between text-slate-400 text-[9px]">
              <span>Medical</span>
              <HeartPulse className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="text-lg font-black text-white">{medicalTentsNeeded}</div>
            <div className="text-[9px] font-bold text-emerald-400">Triage Units</div>
          </div>
        </div>

        {/* Auto-Spillover Notification if demand > primary capacity */}
        {isSpillover && (
          <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/40 text-[10px] space-y-1 animate-pulse">
            <div className="text-red-400 font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>Spillover Active: +{excessEvacuees.toLocaleString()} Overflow</span>
            </div>
            <p className="text-slate-300 text-[9px] leading-tight">
              Site-A saturated at 3,266. Re-routing surplus to Site-C Inter-College grounds ({tacticalShelterImmediate.distanceKm} km).
            </p>
          </div>
        )}

        {/* Action Button: Generate Statutory Evacuation Order */}
        <button
          type="button"
          onClick={onOpenDirectiveModal}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>GENERATE STATUTORY EVACUATION ORDER</span>
        </button>
      </div>
    </aside>
  );
};
