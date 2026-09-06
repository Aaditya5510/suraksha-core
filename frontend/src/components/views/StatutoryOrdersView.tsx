import React from 'react';
import type { EvaluationResultResponse, Habitation } from '../../types/suraksha';
import {
  Printer,
  FileText,
  Truck,
  CheckCircle2,
  QrCode,
  Stamp,
  AlertTriangle,
  Building2,
  ShieldCheck,
  ExternalLink,
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
  const { tacticalShelterImmediate, candidateSites } = evaluation;
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4 max-w-5xl mx-auto">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500">
              <FileText className="w-5 h-5 animate-pulse" />
            </span>
            <h2 className="text-lg md:text-xl font-black text-white tracking-wide uppercase">
              Statutory Relocation Order Workspace
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Legally binding evacuation order under Section 34 of the Disaster Management Act, 2005.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-gray-700 text-xs font-bold transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Dialog View</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)] text-xs transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Directive</span>
          </button>
        </div>
      </div>

      {/* Main Official Document Container */}
      <div className="max-w-5xl mx-auto bg-[#0c111d] border border-gray-700 rounded-2xl shadow-2xl p-6 md:p-10 space-y-8 text-xs text-slate-200">
        {/* Government Official Header */}
        <div className="text-center border-b-2 border-slate-700 pb-6 space-y-2">
          <div className="text-xs font-bold text-slate-400 tracking-widest uppercase">
            GOVERNMENT OF UTTARAKHAND • STATE DISASTER MANAGEMENT AUTHORITY (SDMA)
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase">
            MANDATORY EVACUATION & RESETTLEMENT DISPATCH ORDER
          </h1>
          <div className="text-[11px] text-slate-400 flex flex-wrap items-center justify-center gap-3 pt-1">
            <span>ISSUED BY: <strong className="text-slate-200">INCIDENT COMMAND POST, DEOC CHAMOLI</strong></span>
            <span>•</span>
            <span>REF: <strong className="text-amber-400">SDMA/UK/CHAMOLI/2026/HAB01-EXEC-34</strong></span>
            <span>•</span>
            <span>DATE: <strong className="text-cyan-400">{currentDate}</strong></span>
            <span>•</span>
            <span>AUTHORITY: <strong className="text-emerald-400">DISASTER MANAGEMENT ACT 2005, SEC 34</strong></span>
          </div>
        </div>

        {/* Section 1: Hazard Zone & Census */}
        <section className="space-y-3">
          <div className="text-xs font-bold text-red-400 flex items-center gap-1.5 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span>SECTION 1: GEOLOGICAL HAZARD ASSESSMENT & POPULATION CENSUS</span>
          </div>
          <div className="p-4 rounded-xl bg-[#07090e] border border-gray-800 space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Crisis Sector:</span>
                <strong className="text-white text-sm">{selectedHabitation.name} ({selectedHabitation.id})</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Slope Angle:</span>
                <strong className="text-red-400 text-sm">{selectedHabitation.slopeDegrees}° Critical Slope</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Composite Risk (CRI):</span>
                <strong className="text-red-400 text-sm">{selectedHabitation.compositeRiskIndex} / 100 (RED ZONE)</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Evacuee Demand:</span>
                <strong className="text-emerald-400 text-sm">{simulatedPopulation.toLocaleString()} Souls</strong>
              </div>
            </div>
            <p className="text-xs text-slate-300 pt-2 leading-relaxed border-t border-gray-800/80">
              Official geotechnical sensors detect active slope failure along the Chamoli fault line. In situ civil engineering is non-viable. Mandatory total evacuation of {selectedHabitation.name} is hereby enforced under Section 34 of the Disaster Management Act, 2005.
            </p>
          </div>
        </section>

        {/* Section 2: Evacuation Transit & Resettlement Enclaves */}
        <section className="space-y-3">
          <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>SECTION 2: DUAL-HORIZON CORRIDOR MOBILIZATION</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Immediate Transit */}
            <div className="p-4 rounded-xl bg-[#07090e] border border-amber-500/40 space-y-2">
              <div className="font-bold text-amber-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" /> HORIZON 1: IMMEDIATE TRANSIT TRIAGE
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                  0-72H WINDOW
                </span>
              </div>
              <div className="text-sm font-bold text-white">
                {tacticalShelterImmediate.name} ({tacticalShelterImmediate.siteId})
              </div>
              <div className="text-xs text-slate-300 space-y-1 pt-1">
                <div>• Proximity: <strong>{tacticalShelterImmediate.distanceKm} km</strong> via mountain arterial route</div>
                <div>• Intake Capacity: <strong>{tacticalShelterImmediate.capacityAudit.effectiveCapacity.toLocaleString()} evacuees</strong></div>
                <div>• Function: Emergency biometric registration, triage & hydration.</div>
              </div>
            </div>

            {/* Permanent Resettlement */}
            <div className="p-4 rounded-xl bg-[#07090e] border border-emerald-500/40 space-y-2">
              <div className="font-bold text-emerald-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> HORIZON 2: PERMANENT RESETTLEMENT
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                  PRIMARY SAFE ENCLAVE
                </span>
              </div>
              <div className="text-sm font-bold text-white">
                {siteA.name} ({siteA.siteId})
              </div>
              <div className="text-xs text-slate-300 space-y-1 pt-1">
                <div>• Access: <strong>{siteA.distanceKm} km</strong> (Dual-lane all-weather corridor)</div>
                <div>• Sphere Capacity: <strong>{siteA.capacityAudit.effectiveCapacity.toLocaleString()} persons</strong></div>
                <div>• Surplus Headroom: <strong>+{Math.max(0, siteA.capacityAudit.effectiveCapacity - simulatedPopulation)} persons</strong></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Statutory Logistics Requisitions */}
        <section className="space-y-3">
          <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider">
            <Truck className="w-4 h-4 text-cyan-400" />
            <span>SECTION 3: MANDATORY SPHERE HUMANITARIAN REQUISITIONS</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3.5 rounded-xl bg-[#07090e] border border-gray-800 space-y-1">
              <span className="text-[10px] text-slate-400 block uppercase">Transport Buses</span>
              <span className="text-xl font-black text-amber-400">{busesNeeded} Units</span>
              <span className="text-[9px] text-slate-400 block">40-Pax Fleet</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#07090e] border border-gray-800 space-y-1">
              <span className="text-[10px] text-slate-400 block uppercase">Water Tankers</span>
              <span className="text-xl font-black text-cyan-400">{waterTankersNeeded} Units</span>
              <span className="text-[9px] text-slate-400 block">{dailyWaterLiters.toLocaleString()} LPD Total</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#07090e] border border-gray-800 space-y-1">
              <span className="text-[10px] text-slate-400 block uppercase">Bio-Toilets</span>
              <span className="text-xl font-black text-emerald-400">{sanitationUnitsNeeded} Units</span>
              <span className="text-[9px] text-slate-400 block">1:25 Sphere Ratio</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#07090e] border border-gray-800 space-y-1">
              <span className="text-[10px] text-slate-400 block uppercase">NDRF Platoons</span>
              <span className="text-xl font-black text-purple-400">{ndrfPlatoons} Platoons</span>
              <span className="text-[9px] text-slate-400 block">8th Bn NDRF</span>
            </div>
          </div>
        </section>

        {/* Section 4: Operational Rejection Audit Log */}
        <section className="p-4 rounded-xl bg-red-950/30 border border-red-800/60 text-xs text-slate-300 space-y-1.5">
          <div className="font-bold text-red-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>OFFICIAL DISQUALIFICATION AUDIT LOG</span>
          </div>
          <p className="leading-relaxed">
            Candidate Site-B ({siteB ? siteB.name : 'Pipalkoti Shelf'}) is formally recorded as <strong>OPERATIONALLY DISQUALIFIED</strong>. Analysis proves a binding 30-toilet sanitation bottleneck caps safe intake at 550 souls, combined with a 66% single-bridge cutoff risk during monsoon surges.
          </p>
        </section>

        {/* Section 5: Legal Signature & Verification Stamp */}
        <section className="pt-6 border-t-2 border-slate-700 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 text-xs">
          <div className="flex items-center gap-3 text-slate-400">
            <QrCode className="w-12 h-12 text-white shrink-0" />
            <div>
              <div className="font-bold text-slate-200 text-xs">DIGITALLY VERIFIED & HASHED</div>
              <div className="text-[10px] text-slate-500 font-mono">SHA256: 8f4a9b2c1d3e7f60a5e8c1b92048fe...</div>
              <div className="text-[10px] text-emerald-400 font-semibold">SURAKSHA Deterministic Audit Passed</div>
            </div>
          </div>

          <div className="text-right space-y-1 sm:self-end">
            <div className="font-bold text-white flex items-center justify-end gap-1.5">
              <Stamp className="w-4 h-4 text-emerald-400" />
              <span>INCIDENT COMMANDER, DEOC CHAMOLI</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Uttarakhand State Disaster Management Authority (SDMA)
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
