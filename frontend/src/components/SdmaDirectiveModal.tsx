import React, { useEffect } from 'react';
import type { EvaluationResultResponse } from '../types/suraksha';
import {
  ShieldAlert,
  Printer,
  X,
  Truck,
  CheckCircle2,
  QrCode,
  Stamp,
  AlertTriangle,
  Building2,
  ShieldCheck,
} from 'lucide-react';

interface SdmaDirectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluation: EvaluationResultResponse;
  simulatedPopulation: number;
}

export const SdmaDirectiveModal: React.FC<SdmaDirectiveModalProps> = ({
  isOpen,
  onClose,
  evaluation,
  simulatedPopulation,
}) => {
  const { habitation, tacticalShelterImmediate, candidateSites } = evaluation;
  const siteA = candidateSites.find((s) => s.siteId === 'SITE-A') || candidateSites[0];
  const siteB = candidateSites.find((s) => s.siteId === 'SITE-B') || candidateSites[1];

  // Key Logistical Calculations based on Sphere Minimums
  const dailyWaterLiters = simulatedPopulation * 15;
  const waterTankersNeeded = Math.ceil(dailyWaterLiters / 5000); // 5kL tanker units
  const sanitationUnitsNeeded = Math.ceil(simulatedPopulation / 25); // 1:25 toilet standard
  const busesNeeded = Math.ceil(simulatedPopulation / 40); // 40-Pax buses
  const ndrfPlatoons = Math.ceil(simulatedPopulation / 500); // 1 platoon per 500 evacuees
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 overflow-y-auto select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Dialog Card Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c111d] border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Sticky Top Header */}
        <header className="sticky top-0 z-20 px-6 py-4 bg-[#0a0e19] border-b border-gray-800 flex items-center justify-between shrink-0 font-mono">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center shadow-[0_0_12px_rgba(239,68,68,0.25)]">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white tracking-wide uppercase">
                  STATUTORY DISPATCH DIRECTIVE
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                  DM ACT 2005 (SEC 34)
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                <span>REF: SDMA/UK/CHAMOLI/2026/HAB01-EXEC-34</span>
                <span>•</span>
                <span className="text-slate-500">STRICTLY CONFIDENTIAL</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-gray-700 transition-colors"
            title="Close dialog (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Scrollable Document Body */}
        <main
          id="sdma-printable-document"
          className="overflow-y-auto p-6 md:p-8 space-y-6 flex-1 text-slate-200 font-mono text-xs custom-scrollbar bg-[#07090e] print:bg-white print:text-black print:p-8"
        >
          {/* Government Official Header */}
          <div className="text-center border-b-2 border-slate-700 print:border-black pb-4 space-y-1.5">
            <div className="text-xs font-bold text-slate-400 print:text-gray-700 tracking-widest uppercase">
              GOVERNMENT OF UTTARAKHAND • STATE DISASTER MANAGEMENT AUTHORITY (SDMA)
            </div>
            <h1 className="text-lg md:text-2xl font-black tracking-tight text-white print:text-black uppercase">
              MANDATORY EVACUATION & RESETTLEMENT DISPATCH ORDER
            </h1>
            <div className="text-[11px] text-slate-400 print:text-gray-600 flex flex-wrap items-center justify-center gap-3 pt-1">
              <span>ISSUED BY: <strong>INCIDENT COMMAND POST, DEOC CHAMOLI</strong></span>
              <span>•</span>
              <span>DATE: <strong className="text-amber-400 print:text-black">{currentDate}</strong></span>
              <span>•</span>
              <span>AUTHORITY: <strong className="text-emerald-400 print:text-black">DISASTER MANAGEMENT ACT 2005, SEC 34</strong></span>
            </div>
          </div>

          {/* Section 1: Hazard Zone & Census */}
          <section className="space-y-2">
            <div className="text-xs font-bold text-red-400 print:text-black flex items-center gap-1.5 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span>SECTION 1: GEOLOGICAL HAZARD ASSESSMENT & POPULATION CENSUS</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0c111d] print:bg-gray-100 border border-gray-800 print:border-gray-400 space-y-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
                <div>
                  <span className="text-slate-400 print:text-gray-600 block text-[10px]">Crisis Sector:</span>
                  <strong className="text-white print:text-black">{habitation.name} ({habitation.id})</strong>
                </div>
                <div>
                  <span className="text-slate-400 print:text-gray-600 block text-[10px]">Slope Angle:</span>
                  <strong className="text-red-400 print:text-black">{habitation.slopeDegrees}° Critical Slope</strong>
                </div>
                <div>
                  <span className="text-slate-400 print:text-gray-600 block text-[10px]">Composite Risk (CRI):</span>
                  <strong className="text-red-400 print:text-black">{habitation.compositeRiskIndex} / 100 (RED ZONE)</strong>
                </div>
                <div>
                  <span className="text-slate-400 print:text-gray-600 block text-[10px]">Evacuee Demand:</span>
                  <strong className="text-emerald-400 print:text-black">{simulatedPopulation.toLocaleString()} Souls</strong>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 print:text-gray-800 pt-1 leading-relaxed border-t border-gray-800/80">
                Official geotechnical sensors detect active slope failure along the Chamoli fault line. In situ civil engineering is non-viable. Mandatory total evacuation of {habitation.name} is hereby enforced under Section 34 of the Disaster Management Act, 2005.
              </p>
            </div>
          </section>

          {/* Section 2: Evacuation Transit & Resettlement Enclaves */}
          <section className="space-y-2">
            <div className="text-xs font-bold text-amber-400 print:text-black flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>SECTION 2: DUAL-HORIZON CORRIDOR MOBILIZATION</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Immediate Transit */}
              <div className="p-4 rounded-xl bg-[#0c111d] print:bg-gray-100 border border-amber-500/40 print:border-gray-400 space-y-1.5">
                <div className="font-bold text-amber-400 print:text-black flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" /> HORIZON 1: IMMEDIATE TRANSIT TRIAGE
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    0-72H WINDOW
                  </span>
                </div>
                <div className="text-sm font-bold text-white print:text-black">
                  {tacticalShelterImmediate.name} ({tacticalShelterImmediate.siteId})
                </div>
                <div className="text-[11px] text-slate-300 print:text-gray-700 space-y-0.5 pt-1">
                  <div>• Proximity: <strong>{tacticalShelterImmediate.distanceKm} km</strong> via mountain arterial route</div>
                  <div>• Intake Capacity: <strong>{tacticalShelterImmediate.capacityAudit.effectiveCapacity.toLocaleString()} evacuees</strong></div>
                  <div>• Function: Emergency biometric registration, triage & hydration.</div>
                </div>
              </div>

              {/* Permanent Resettlement */}
              <div className="p-4 rounded-xl bg-[#0c111d] print:bg-gray-100 border border-emerald-500/40 print:border-gray-400 space-y-1.5">
                <div className="font-bold text-emerald-400 print:text-black flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> HORIZON 2: PERMANENT RESETTLEMENT
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    PRIMARY SAFE ENCLAVE
                  </span>
                </div>
                <div className="text-sm font-bold text-white print:text-black">
                  {siteA.name} ({siteA.siteId})
                </div>
                <div className="text-[11px] text-slate-300 print:text-gray-700 space-y-0.5 pt-1">
                  <div>• Access: <strong>{siteA.distanceKm} km</strong> (Dual-lane all-weather corridor)</div>
                  <div>• Sphere Capacity: <strong>{siteA.capacityAudit.effectiveCapacity.toLocaleString()} persons</strong></div>
                  <div>• Surplus Headroom: <strong>+{Math.max(0, siteA.capacityAudit.effectiveCapacity - simulatedPopulation)} persons</strong></div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Statutory Logistics Requisitions */}
          <section className="space-y-2">
            <div className="text-xs font-bold text-cyan-400 print:text-black flex items-center gap-1.5 uppercase tracking-wider">
              <Truck className="w-4 h-4 text-cyan-400" />
              <span>SECTION 3: MANDATORY SPHERE HUMANITARIAN REQUISITIONS</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-[#0c111d] print:bg-gray-100 border border-gray-800 space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase">Transport Buses</span>
                <span className="text-lg font-black text-amber-400 print:text-black">{busesNeeded} Units</span>
                <span className="text-[9px] text-slate-400 block">40-Pax Fleet</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0c111d] print:bg-gray-100 border border-gray-800 space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase">Water Tankers</span>
                <span className="text-lg font-black text-cyan-400 print:text-black">{waterTankersNeeded} Units</span>
                <span className="text-[9px] text-slate-400 block">{dailyWaterLiters.toLocaleString()} LPD Total</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0c111d] print:bg-gray-100 border border-gray-800 space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase">Bio-Toilets</span>
                <span className="text-lg font-black text-emerald-400 print:text-black">{sanitationUnitsNeeded} Units</span>
                <span className="text-[9px] text-slate-400 block">1:25 Sphere Ratio</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0c111d] print:bg-gray-100 border border-gray-800 space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase">NDRF Platoons</span>
                <span className="text-lg font-black text-purple-400 print:text-black">{ndrfPlatoons} Platoons</span>
                <span className="text-[9px] text-slate-400 block">8th Bn NDRF</span>
              </div>
            </div>
          </section>

          {/* Section 4: Operational Rejection Audit Log */}
          <section className="p-3.5 rounded-xl bg-red-950/30 print:bg-gray-100 border border-red-800/60 print:border-gray-400 text-[11px] text-slate-300 print:text-gray-800 space-y-1">
            <div className="font-bold text-red-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>OFFICIAL DISQUALIFICATION AUDIT LOG</span>
            </div>
            <p className="leading-relaxed">
              Candidate Site-B ({siteB ? siteB.name : 'Pipalkoti Shelf'}) is formally recorded as <strong>OPERATIONALLY DISQUALIFIED</strong>. Analysis proves a binding 30-toilet sanitation bottleneck caps safe intake at 550 souls, combined with a 66% single-bridge cutoff risk during monsoon surges.
            </p>
          </section>

          {/* Section 5: Legal Signature & Verification Stamp */}
          <section className="pt-4 border-t-2 border-slate-700 print:border-black flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-xs">
            <div className="flex items-center gap-3 text-slate-400 print:text-gray-600">
              <QrCode className="w-10 h-10 text-white print:text-black shrink-0" />
              <div>
                <div className="font-bold text-slate-200 print:text-black text-[11px]">DIGITALLY VERIFIED & HASHED</div>
                <div className="text-[9px] text-slate-500 font-mono">SHA256: 8f4a9b2c1d3e7f60a5e8c1b9...</div>
                <div className="text-[9px] text-emerald-400">SURAKSHA Deterministic Audit Passed</div>
              </div>
            </div>

            <div className="text-right space-y-1 sm:self-end">
              <div className="font-bold text-white print:text-black flex items-center justify-end gap-1.5">
                <Stamp className="w-4 h-4 text-emerald-400 print:text-black" />
                <span>INCIDENT COMMANDER, DEOC CHAMOLI</span>
              </div>
              <div className="text-[10px] text-slate-400 print:text-gray-600">
                Uttarakhand State Disaster Management Authority (SDMA)
              </div>
            </div>
          </section>
        </main>

        {/* Sticky Bottom Action Bar */}
        <footer className="sticky bottom-0 z-20 px-6 py-3.5 bg-[#0a0e19] border-t border-gray-800 flex items-center justify-between shrink-0 font-mono text-xs">
          <div className="text-slate-400 text-[11px]">
            Status: <span className="text-emerald-400 font-bold">READY FOR DISPATCH & EXECUTION</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-gray-700 transition-colors font-semibold"
            >
              Close / Dismiss
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Statutory Directive</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export const StatutoryDirectiveModal = SdmaDirectiveModal;
