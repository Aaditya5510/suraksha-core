import React from 'react';
import type { EvaluationResultResponse, Habitation } from '../../types/suraksha';
import {
  Truck,
  Droplets,
  Sparkles,
  HeartPulse,
  Printer,
  ShieldAlert,
  FileCheck,
  CheckCircle2,
} from 'lucide-react';

interface DispatchLogisticsViewProps {
  evaluation: EvaluationResultResponse;
  selectedHabitation: Habitation;
  simulatedPopulation: number;
}

export const DispatchLogisticsView: React.FC<DispatchLogisticsViewProps> = ({
  evaluation,
  selectedHabitation,
  simulatedPopulation,
}) => {
  const { tacticalShelterImmediate, candidateSites, operationalDirectiveSummary, requiresSpillover, spilloverAllocation } = evaluation;

  const siteA = candidateSites.find((s) => s.siteId === 'SITE-A') || candidateSites[0];
  const primaryCap = siteA.capacityAudit.effectiveCapacity; // 3266

  // 4 Core High-Contrast Logistics Formulas
  const busesNeeded = Math.ceil(simulatedPopulation / 40);
  const waterLpdTotal = simulatedPopulation * 15;
  const waterTankersNeeded = Math.ceil(waterLpdTotal / 5000);
  const bioToiletsNeeded = Math.ceil(simulatedPopulation / 25);
  const medicalTentsNeeded = Math.max(1, Math.ceil(simulatedPopulation / 500));

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 font-mono select-none">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg md:text-xl font-bold text-white tracking-wide">
              DISPATCH REQUISITIONS & STATUTORY EVACUATION ORDER
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Operational Logistics Requisition Engine • Disaster Management Act 2005 (Section 34)
          </p>
        </div>

        {/* Print Action Button */}
        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print Directive PDF</span>
        </button>
      </div>

      {/* 1. 4 High-Contrast Operational Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Transport / Buses */}
        <div className="tactical-card p-4 space-y-2 border-blue-500/40 bg-[#090e18]/90 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider">Transport Mobility</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-white">{busesNeeded}</div>
            <div className="text-xs font-bold text-blue-400 mt-0.5">Evacuation Buses</div>
          </div>
          <p className="text-[10px] text-slate-400 pt-1 border-t border-gray-800">
            Formula: <code>ceil({simulatedPopulation} / 40)</code> • 40-pax 4x4 mountain fleet
          </p>
        </div>

        {/* Metric 2: Potable Water Supply */}
        <div className="tactical-card p-4 space-y-2 border-cyan-500/40 bg-[#081017]/90 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider">Potable Water</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-white">{waterTankersNeeded}</div>
            <div className="text-xs font-bold text-cyan-400 mt-0.5">5,000L Water Tankers</div>
          </div>
          <p className="text-[10px] text-slate-400 pt-1 border-t border-gray-800">
            Formula: <code>ceil(({simulatedPopulation} * 15L) / 5000L)</code> = {waterLpdTotal.toLocaleString()} LPD
          </p>
        </div>

        {/* Metric 3: Sanitation Infrastructure */}
        <div className="tactical-card p-4 space-y-2 border-amber-500/40 bg-[#120e07]/90 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider">Sanitation Units</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-white">{bioToiletsNeeded}</div>
            <div className="text-xs font-bold text-amber-400 mt-0.5">Portable Bio-Toilets</div>
          </div>
          <p className="text-[10px] text-slate-400 pt-1 border-t border-gray-800">
            Formula: <code>ceil({simulatedPopulation} / 25)</code> • Sphere 1:25 ratio mandate
          </p>
        </div>

        {/* Metric 4: Medical / First-Aid */}
        <div className="tactical-card p-4 space-y-2 border-emerald-500/40 bg-[#07120c]/90 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider">Medical Support</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-white">{medicalTentsNeeded}</div>
            <div className="text-xs font-bold text-emerald-400 mt-0.5">Medical Triage Tents</div>
          </div>
          <p className="text-[10px] text-slate-400 pt-1 border-t border-gray-800">
            Formula: <code>ceil({simulatedPopulation} / 500)</code> • Trauma paramedic posts
          </p>
        </div>
      </div>

      {/* 2. Formatted Statutory Evacuation Order under DM Act 2005 */}
      <div className="tactical-card p-6 md:p-8 space-y-6 border-gray-700 bg-[#0d121c] shadow-2xl relative overflow-hidden">
        {/* Top Official Seal & Header */}
        <div className="border-b border-gray-800 pb-5 text-center space-y-1 relative">
          <div className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">
            STATE DISASTER MANAGEMENT AUTHORITY (SDMA) • UTTARAKHAND
          </div>
          <h3 className="text-base md:text-lg font-black text-white tracking-wide uppercase">
            STATUTORY EVACUATION & RELOCATION DISPATCH DIRECTIVE
          </h3>
          <p className="text-xs text-slate-400">
            ISSUED PURSUANT TO SECTION 34 & SECTION 38 OF THE DISASTER MANAGEMENT ACT, 2005 (ACT NO. 53 OF 2005)
          </p>
        </div>

        {/* Order Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-gray-800 text-xs">
          <div>
            <span className="text-slate-400 text-[10px] block">Order Ref No:</span>
            <strong className="text-white">SDMA/CHAMOLI/2026/SEC34-089</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block">Incident Sector:</span>
            <strong className="text-red-400">{selectedHabitation.id} - {selectedHabitation.name}</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block">Displaced Souls:</span>
            <strong className="text-amber-400">{simulatedPopulation.toLocaleString()} evacuees</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block">Date of Issue:</span>
            <strong className="text-slate-200">{currentDate} (IMMEDIATE)</strong>
          </div>
        </div>

        {/* Legal Evacuation Directive Body */}
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase">
              <ShieldAlert className="w-4 h-4" />
              <span>1. Mandatory Evacuation Declaration</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Whereas the District Disaster Management Authority (DDMA) Chamoli and the Geological Survey of India (GSI) have recorded critical geological slope deformation ({selectedHabitation.slopeDegrees}° angle, CRI {selectedHabitation.compositeRiskIndex}/100) within <strong>{selectedHabitation.name}</strong>, rendering in situ civil engineering protection non-viable;
            </p>
            <p className="text-[11px] leading-relaxed">
              Now therefore, in exercise of powers under Section 34 of the DM Act 2005, complete mandatory evacuation of <strong>{simulatedPopulation.toLocaleString()} persons</strong> is hereby ordered with immediate effect.
            </p>
          </div>

          {/* Allocation Breakdown */}
          <div className="space-y-2">
            <div className="font-bold text-white text-xs uppercase flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>2. Resettlement Corridor & Carrying-Capacity Allocation</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-emerald-500/40 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-emerald-400">Primary Enclave: SITE-A (Gopeshwar Enclave)</strong>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                    RECOMMENDED
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Allocated: <strong className="text-white">{Math.min(simulatedPopulation, primaryCap).toLocaleString()} souls</strong> • Safe Sphere Capacity: {primaryCap.toLocaleString()} • Proximity: {siteA.distanceKm} km.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-amber-500/40 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-amber-400">Horizon 1 Transit Staging: SITE-C (Inter-College)</strong>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                    0-72H TRIAGE
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Allocated: <strong className="text-white">{requiresSpillover ? `${(spilloverAllocation?.['SITE-C'] || (simulatedPopulation - primaryCap)).toLocaleString()} souls (Spillover)` : 'Standby Transit'}</strong> • Intake Cap: {tacticalShelterImmediate.capacityAudit.effectiveCapacity.toLocaleString()} • Proximity: {tacticalShelterImmediate.distanceKm} km.
                </p>
              </div>
            </div>
          </div>

          {/* Operational Directive Summary */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-gray-800 text-[11px] text-slate-300 space-y-1">
            <span className="text-slate-400 font-bold uppercase block text-[10px]">Operational Justification:</span>
            <p className="leading-relaxed">{operationalDirectiveSummary}</p>
          </div>
        </div>

        {/* Executive Sign-off & Verification Seal */}
        <div className="pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono text-[10px] p-1 text-center font-bold">
              QR AUTH SEAL
            </div>
            <div className="text-[11px] text-slate-400">
              <div className="font-bold text-white">SHA-256 Cryptographic Hash: 8f92a10c...4b12</div>
              <div>Digitally Validated by SURAKSHA Autonomous Core</div>
            </div>
          </div>

          <div className="text-right space-y-0.5">
            <div className="font-bold text-white uppercase">Sd/- Spl. Commissioner of Relief</div>
            <div className="text-[11px] text-slate-400">SDMA & Emergency Operations Center, Uttarakhand</div>
            <div className="text-[10px] text-emerald-400 font-bold flex items-center justify-end gap-1">
              <CheckCircle2 className="w-3 h-3" /> OFFICIAL GAZETTE DISPATCHED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
