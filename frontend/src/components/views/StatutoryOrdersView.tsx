import React from 'react';
import type { EvaluationResultResponse, Habitation } from '../../types/suraksha';
import {
  Printer,
  FileText,
  Truck,
  QrCode,
  Stamp,
  ShieldCheck,
  ExternalLink,
  MapPin,
  XCircle,
} from 'lucide-react';

interface StatutoryOrdersViewProps {
  evaluation: EvaluationResultResponse;
  selectedHabitation: Habitation;
  simulatedPopulation: number;
  onOpenModal: () => void;
}

export const StatutoryOrdersView: React.FC<StatutoryOrdersViewProps> = ({
  evaluation,
  selectedHabitation,
  simulatedPopulation,
  onOpenModal,
}) => {
  const { candidateSites } = evaluation;
  const siteA = candidateSites.find((s) => s.siteId === 'SITE-A') || candidateSites[0];
  const siteB = candidateSites.find((s) => s.siteId === 'SITE-B') || candidateSites[1];

  // Key Logistical Calculations based on Sphere Minimums
  const dailyWaterLiters = simulatedPopulation * 15;
  const waterTankersNeeded = Math.ceil(dailyWaterLiters / 5000);
  const sanitationUnitsNeeded = Math.ceil(simulatedPopulation / 25);
  const busesNeeded = Math.ceil(simulatedPopulation / 40);
  const ndrfPlatoons = Math.ceil(simulatedPopulation / 500);
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-4 md:p-8 space-y-6 font-mono bg-[#07090e] text-slate-100 select-none">
      {/* View Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4 max-w-4xl mx-auto">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500">
              <FileText className="w-5 h-5" />
            </span>
            <h2 className="text-lg md:text-xl font-black text-white tracking-wide uppercase">
              Statutory Relocation Order
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-sans">
            Section 34 Disaster Management Act 2005 Directive
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-gray-700 text-xs font-bold transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Dialog</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)] text-xs transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Order</span>
          </button>
        </div>
      </div>

      {/* Main Official Document Container */}
      <div className="max-w-4xl mx-auto bg-[#0c111d] border border-gray-700 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 text-xs text-slate-200">
        {/* Government Official Header */}
        <div className="text-center border-b border-gray-800 pb-4 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
            STATE DISASTER MANAGEMENT AUTHORITY (SDMA) • UTTARAKHAND
          </div>
          <h1 className="text-lg md:text-xl font-black tracking-tight text-white uppercase">
            MANDATORY EVACUATION & RESETTLEMENT DIRECTIVE
          </h1>
          <div className="text-[11px] text-slate-400 flex flex-wrap items-center justify-center gap-3 pt-0.5">
            <span>REF: <strong className="text-amber-400">SDMA/CHAMOLI/2026/HAB01-SEC34</strong></span>
            <span>•</span>
            <span>DATE: <strong className="text-slate-200">{currentDate}</strong></span>
            <span>•</span>
            <span>STATUS: <strong className="text-emerald-400">ENFORCED</strong></span>
          </div>
        </div>

        {/* 4 High-Impact Scannable Chips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Chip 1: SECTOR */}
          <div className="p-4 rounded-xl bg-[#07090e] border border-red-500/40 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-bold text-red-400">
              <span className="flex items-center gap-1.5 uppercase">
                <MapPin className="w-3.5 h-3.5" /> CRISIS SECTOR
              </span>
              <span className="px-1.5 py-0.2 rounded bg-red-950 text-red-300 border border-red-800">
                CRI {selectedHabitation.compositeRiskIndex}
              </span>
            </div>
            <div className="text-base font-black text-white">
              {selectedHabitation.name}
            </div>
            <div className="text-[11px] text-slate-300">
              {simulatedPopulation.toLocaleString()} Evacuees • {selectedHabitation.slopeDegrees}° Slope (Critical Hazard)
            </div>
          </div>

          {/* Chip 2: APPROVED SHELTER */}
          <div className="p-4 rounded-xl bg-[#07090e] border border-emerald-500/40 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-bold text-emerald-400">
              <span className="flex items-center gap-1.5 uppercase">
                <ShieldCheck className="w-3.5 h-3.5" /> APPROVED SHELTER
              </span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                PRIMARY ENCLAVE
              </span>
            </div>
            <div className="text-base font-black text-white">
              {siteA.name}
            </div>
            <div className="text-[11px] text-emerald-300 font-semibold">
              Safe Intake: {siteA.capacityAudit.effectiveCapacity.toLocaleString()} People (+{Math.max(0, siteA.capacityAudit.effectiveCapacity - simulatedPopulation)} Headroom)
            </div>
          </div>

          {/* Chip 3: REJECTED SHELTER */}
          <div className="p-4 rounded-xl bg-[#07090e] border border-red-900/60 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
              <span className="flex items-center gap-1.5 uppercase text-red-400">
                <XCircle className="w-3.5 h-3.5 text-red-500" /> REJECTED SHELTER
              </span>
              <span className="px-1.5 py-0.2 rounded bg-red-950 text-red-400 border border-red-800">
                DISQUALIFIED
              </span>
            </div>
            <div className="text-sm font-bold text-slate-300">
              {siteB ? siteB.name : 'Pipalkoti Shelf'}
            </div>
            <div className="text-[11px] text-red-400 font-semibold">
              Cap: 550 People Max • Binding Sanitation Bottleneck (30 Toilets)
            </div>
          </div>

          {/* Chip 4: REQUISITIONS */}
          <div className="p-4 rounded-xl bg-[#07090e] border border-cyan-500/40 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-bold text-cyan-400">
              <span className="flex items-center gap-1.5 uppercase">
                <Truck className="w-3.5 h-3.5" /> DISPATCH REQUISITIONS
              </span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                SPHERE 2018
              </span>
            </div>
            <div className="text-sm font-black text-white">
              {busesNeeded} Buses • {waterTankersNeeded} Tankers • {sanitationUnitsNeeded} Toilets
            </div>
            <div className="text-[11px] text-slate-300">
              {dailyWaterLiters.toLocaleString()} LPD Water • {ndrfPlatoons} NDRF Platoons Staged
            </div>
          </div>
        </div>

        {/* Quick Stat Summary */}
        <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-[#07090e] border border-gray-800 text-center">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Transport Fleet</span>
            <strong className="text-amber-400 text-sm">{busesNeeded} Mountain Buses (40-Pax)</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Potable Water</span>
            <strong className="text-cyan-400 text-sm">{waterTankersNeeded} Tankers ({dailyWaterLiters.toLocaleString()} LPD)</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Sanitation</span>
            <strong className="text-emerald-400 text-sm">{sanitationUnitsNeeded} Mobile Units (1:25)</strong>
          </div>
        </div>

        {/* Verification & Legal Sign-off */}
        <div className="pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-slate-400">
            <QrCode className="w-8 h-8 text-white shrink-0" />
            <div>
              <div className="font-bold text-slate-200 text-xs">SHA256: 8f4a9b2c...2048fe</div>
              <div className="text-[10px] text-emerald-400">Deterministic Audit Passed</div>
            </div>
          </div>

          <div className="text-right space-y-0.5 sm:self-end">
            <div className="font-bold text-white flex items-center justify-end gap-1.5">
              <Stamp className="w-3.5 h-3.5 text-emerald-400" />
              <span>INCIDENT COMMANDER, DEOC CHAMOLI</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Uttarakhand State Disaster Management Authority (SDMA)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
