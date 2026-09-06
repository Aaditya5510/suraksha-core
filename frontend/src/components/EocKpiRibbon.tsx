import React from 'react';
import type { EvaluationResultResponse, Habitation } from '../types/suraksha';
import {
  AlertTriangle,
  Users,
  ShieldCheck,
  TrendingUp,
  Truck,
  Droplets,
  AlertOctagon,
} from 'lucide-react';

interface EocKpiRibbonProps {
  evaluation: EvaluationResultResponse;
  selectedHabitation: Habitation;
  simulatedPopulation: number;
}

export const EocKpiRibbon: React.FC<EocKpiRibbonProps> = ({
  evaluation,
  selectedHabitation,
  simulatedPopulation,
}) => {
  const isRedZone = selectedHabitation.riskZone === 'CRITICAL_RED_ZONE';

  const siteA =
    evaluation.candidateSites.find((s) => s.siteId === 'SITE-A') ||
    evaluation.candidateSites[0];
  const primaryCapacity = siteA ? siteA.capacityAudit.effectiveCapacity : 3266;
  const primarySiteName = siteA ? siteA.name : 'Gopeshwar Enclave';

  const residualHeadroom = primaryCapacity - simulatedPopulation;
  const isDeficit = residualHeadroom < 0;

  const busesNeeded = Math.ceil(simulatedPopulation / 40);
  const waterLpdTotal = simulatedPopulation * 15;
  const tankersNeeded = Math.ceil(waterLpdTotal / 5000);

  return (
    <section className="w-full bg-[#0a0e19] border-b border-gray-800/90 px-4 py-2.5 font-mono select-none">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* Card 1: INCIDENT CRI */}
        <div className="p-2.5 rounded-xl bg-[#060911]/90 border border-gray-800 flex flex-col justify-between space-y-1">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span className="uppercase font-semibold flex items-center gap-1">
              <AlertTriangle className={`w-3 h-3 ${isRedZone ? 'text-red-500' : 'text-amber-400'}`} />
              INCIDENT CRI
            </span>
            <span
              className={`text-[8px] font-bold px-1 py-0.5 rounded ${
                isRedZone
                  ? 'bg-red-950 text-red-400 border border-red-800'
                  : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}
            >
              {isRedZone ? 'RED ZONE' : 'AMBER ZONE'}
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-xl font-black ${isRedZone ? 'text-red-500' : 'text-amber-400'}`}>
              {selectedHabitation.compositeRiskIndex}
            </span>
            <span className="text-[10px] text-slate-500">/ 100</span>
          </div>
          <div className="text-[9px] text-slate-400 truncate">
            {selectedHabitation.name} ({selectedHabitation.slopeDegrees}\u00b0 slope)
          </div>
        </div>

        {/* Card 2: EVACUEE DEMAND */}
        <div className="p-2.5 rounded-xl bg-[#060911]/90 border border-blue-500/30 flex flex-col justify-between space-y-1 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span className="uppercase font-semibold flex items-center gap-1 text-blue-400">
              <Users className="w-3 h-3 text-blue-400" />
              EVACUEE DEMAND
            </span>
            <span className="text-[8px] font-bold px-1 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
              CENSUS+SURGE
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-white">
              {simulatedPopulation.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400">Souls</span>
          </div>
          <div className="text-[9px] text-blue-300 font-semibold truncate">
            Life-safety priority
          </div>
        </div>

        {/* Card 3: PRIMARY CAPACITY */}
        <div className="p-2.5 rounded-xl bg-[#060911]/90 border border-emerald-500/30 flex flex-col justify-between space-y-1 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span className="uppercase font-semibold flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              PRIMARY CAPACITY
            </span>
            <span className="text-[8px] font-bold px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              SITE-A
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-emerald-400">
              {primaryCapacity.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400">Souls</span>
          </div>
          <div className="text-[9px] text-emerald-300 truncate">
            {primarySiteName}
          </div>
        </div>

        {/* Card 4: SAFE HEADROOM */}
        <div
          className={`p-2.5 rounded-xl bg-[#060911]/90 border flex flex-col justify-between space-y-1 ${
            isDeficit
              ? 'border-red-500/50 bg-red-500/10 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
              : 'border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span className={`uppercase font-semibold flex items-center gap-1 ${isDeficit ? 'text-red-400' : 'text-emerald-400'}`}>
              {isDeficit ? <AlertOctagon className="w-3 h-3 text-red-500 animate-pulse" /> : <TrendingUp className="w-3 h-3 text-emerald-400" />}
              SAFE HEADROOM
            </span>
            <span
              className={`text-[8px] font-bold px-1 py-0.5 rounded ${
                isDeficit
                  ? 'bg-red-950 text-red-300 border border-red-800'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}
            >
              {isDeficit ? 'DEFICIT' : 'SURPLUS'}
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-xl font-black ${isDeficit ? 'text-red-400' : 'text-emerald-400'}`}>
              {isDeficit ? residualHeadroom : `+${residualHeadroom}`}
            </span>
            <span className="text-[10px] text-slate-400">Souls</span>
          </div>
          <div className={`text-[9px] font-semibold truncate ${isDeficit ? 'text-red-400 animate-pulse' : 'text-emerald-300'}`}>
            {isDeficit ? 'Auto-spillover routed' : 'Surplus margin safe'}
          </div>
        </div>

        {/* Card 5: FLEET REQUISITION */}
        <div className="p-2.5 rounded-xl bg-[#060911]/90 border border-amber-500/30 flex flex-col justify-between space-y-1 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span className="uppercase font-semibold flex items-center gap-1 text-amber-400">
              <Truck className="w-3 h-3 text-amber-400" />
              FLEET REQUISITION
            </span>
            <span className="text-[8px] font-bold px-1 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
              40-PAX
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-amber-400">
              {busesNeeded}
            </span>
            <span className="text-[10px] text-slate-400">Buses</span>
          </div>
          <div className="text-[9px] text-amber-300 truncate">
            Staging at Chamoli Depot
          </div>
        </div>

        {/* Card 6: WATER DEMAND */}
        <div className="p-2.5 rounded-xl bg-[#060911]/90 border border-cyan-500/30 flex flex-col justify-between space-y-1 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span className="uppercase font-semibold flex items-center gap-1 text-cyan-400">
              <Droplets className="w-3 h-3 text-cyan-400" />
              WATER DEMAND
            </span>
            <span className="text-[8px] font-bold px-1 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              15 LPD
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black text-cyan-400">
              {waterLpdTotal.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400">LPD</span>
          </div>
          <div className="text-[9px] text-cyan-300 truncate">
            {tankersNeeded} Heavy Tankers (5kL)
          </div>
        </div>
      </div>
    </section>
  );
};
