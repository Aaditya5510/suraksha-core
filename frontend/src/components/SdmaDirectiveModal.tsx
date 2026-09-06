import React, { useEffect } from 'react';
import type { EvaluationResultResponse } from '../types/suraksha';
import {
  ShieldAlert,
  Printer,
  X,
  FileText,
  Truck,
  CheckCircle2,
  QrCode,
  Stamp,
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

  // Key Logistical Calculations based on Sphere Minimums
  const dailyWaterLiters = simulatedPopulation * 15;
  const waterTankersNeeded = Math.ceil(dailyWaterLiters / 10000); // 10kL tanker units
  const sanitationUnitsNeeded = Math.ceil(simulatedPopulation / 25); // 1:25 toilet standard
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-slate-900 border-2 border-alertRed/60 rounded-xl shadow-[0_0_50px_rgba(239,68,68,0.3)] overflow-hidden my-8">
        {/* Top Control Bar (Non-Printable) */}
        <div className="print:hidden flex items-center justify-between px-6 py-3.5 bg-cardDark border-b border-borderDark">
          <div className="flex items-center gap-2 text-alertRed font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            <span>CONFIDENTIAL // STATE DISASTER MANAGEMENT AUTHORITY (SDMA) DIRECTIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT / EXPORT A4 DIRECTIVE</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Body */}
        <div
          id="sdma-printable-document"
          className="p-6 md:p-8 space-y-6 font-mono bg-slate-950 text-slate-100 print:bg-white print:text-black print:p-8"
        >
          {/* Government Header */}
          <div className="text-center border-b-2 border-slate-700 print:border-black pb-4 space-y-1">
            <div className="text-xs font-bold text-slate-400 print:text-gray-700 tracking-widest uppercase">
              GOVERNMENT OF UTTARAKHAND • STATE DISASTER MANAGEMENT AUTHORITY
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white print:text-black uppercase">
              MANDATORY EVACUATION & RESETTLEMENT DISPATCH DIRECTIVE
            </h1>
            <div className="text-xs text-slate-400 print:text-gray-600 flex items-center justify-center gap-3 pt-1">
              <span>REF NO: <strong className="text-amber-400 print:text-black">SDMA/UK/CHAMOLI/2026/HAB01-DEC-09</strong></span>
              <span>•</span>
              <span>ISSUED: <strong>{currentDate}</strong></span>
              <span>•</span>
              <span>STATUTORY ACT: <strong>DM ACT 2005 (SEC 38)</strong></span>
            </div>
          </div>

          {/* Section 1: Executive Hazard Assessment */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-alertRed print:text-black flex items-center gap-1.5 uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>SECTION 1: NON-MITIGABLE RUNOUT ZONE DECLARATION</span>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-900 print:bg-gray-100 border border-slate-700 print:border-gray-400 text-xs space-y-1.5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 print:text-gray-600 block">Origin Habitation:</span>
                  <strong className="text-white print:text-black">{habitation.name} ({habitation.id})</strong>
                </div>
                <div>
                  <span className="text-slate-400 print:text-gray-600 block">Slope Angle:</span>
                  <strong className="text-red-400 print:text-black">{habitation.slopeDegrees}° (Debris Avalanche Risk)</strong>
                </div>
                <div>
                  <span className="text-slate-400 print:text-gray-600 block">Composite Risk (CRI):</span>
                  <strong className="text-red-400 print:text-black">{habitation.compositeRiskIndex} / 100 (CRITICAL)</strong>
                </div>
                <div>
                  <span className="text-slate-400 print:text-gray-600 block">Evacuee Census:</span>
                  <strong className="text-white print:text-black">{simulatedPopulation.toLocaleString()} souls</strong>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 print:text-gray-800 pt-1 leading-relaxed">
                Geological survey establishes that Nandikot settlement rests upon an active shear zone. In situ civil mitigation is technically impossible. Complete and total evacuation is ordered with immediate effect.
              </p>
            </div>
          </div>

          {/* Section 2: Evacuation Dispatch Corridors */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-amber-400 print:text-black flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>SECTION 2: DUAL-HORIZON CORRIDOR MOBILIZATION</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Immediate Transit */}
              <div className="p-3.5 rounded-lg bg-slate-900 print:bg-gray-100 border border-amber-500/40 print:border-gray-400 space-y-1">
                <div className="font-bold text-amber-400 print:text-black flex items-center justify-between">
                  <span>HORIZON 1: IMMEDIATE TRANSIT TRIAGE</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 print:border print:border-black">
                    0-72H WINDOW
                  </span>
                </div>
                <div className="text-sm font-bold text-white print:text-black">
                  {tacticalShelterImmediate.name} ({tacticalShelterImmediate.siteId})
                </div>
                <div className="text-[11px] text-slate-300 print:text-gray-700 space-y-0.5 pt-1">
                  <div>• Distance: <strong>{tacticalShelterImmediate.distanceKm} km</strong> via mountain arterial route</div>
                  <div>• Triage Intake Cap: <strong>{tacticalShelterImmediate.capacityAudit.effectiveCapacity.toLocaleString()} evacuees</strong></div>
                  <div>• Objective: Initial medical triage, biometrics & emergency hydration.</div>
                </div>
              </div>

              {/* Permanent Resettlement */}
              <div className="p-3.5 rounded-lg bg-slate-900 print:bg-gray-100 border border-emerald-500/40 print:border-gray-400 space-y-1">
                <div className="font-bold text-emerald-400 print:text-black flex items-center justify-between">
                  <span>HORIZON 2: PERMANENT RESETTLEMENT</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 print:border print:border-black">
                    RECOMMENDED PRIMARY
                  </span>
                </div>
                <div className="text-sm font-bold text-white print:text-black">
                  {siteA.name} ({siteA.siteId})
                </div>
                <div className="text-[11px] text-slate-300 print:text-gray-700 space-y-0.5 pt-1">
                  <div>• Distance: <strong>{siteA.distanceKm} km</strong> (Dual-lane all-weather access)</div>
                  <div>• Effective Sphere Cap: <strong>{siteA.capacityAudit.effectiveCapacity.toLocaleString()} persons</strong></div>
                  <div>• Residual Headroom: <strong>+{siteA.capacityAudit.residualHeadroom} persons</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Statutory Humanitarian Requisitions (Sphere Standards) */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-infoBlue print:text-black flex items-center gap-1.5 uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" />
              <span>SECTION 3: MANDATORY SPHERE HUMANITARIAN REQUISITIONS</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 rounded-lg bg-slate-900 print:bg-gray-100 border border-slate-700 print:border-gray-400 space-y-1">
                <span className="text-[10px] text-slate-400 print:text-gray-600 block uppercase">Potable Water Tankers</span>
                <span className="text-lg font-bold text-infoBlue print:text-black">{waterTankersNeeded} Units</span>
                <span className="text-[10px] text-slate-400 block">{dailyWaterLiters.toLocaleString()} LPD Total</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 print:bg-gray-100 border border-slate-700 print:border-gray-400 space-y-1">
                <span className="text-[10px] text-slate-400 print:text-gray-600 block uppercase">Mobile Sanitation Units</span>
                <span className="text-lg font-bold text-amber-400 print:text-black">{sanitationUnitsNeeded} Toilets</span>
                <span className="text-[10px] text-slate-400 block">1:25 Sphere Standard</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 print:bg-gray-100 border border-slate-700 print:border-gray-400 space-y-1">
                <span className="text-[10px] text-slate-400 print:text-gray-600 block uppercase">NDRF Rescue Platoons</span>
                <span className="text-lg font-bold text-emerald-400 print:text-black">{ndrfPlatoons} Platoons</span>
                <span className="text-[10px] text-slate-400 block">8th Bn NDRF Ghaziabad</span>
              </div>
            </div>
          </div>

          {/* Section 4: Operational Rejection Formal Record */}
          <div className="p-3 rounded-lg bg-slate-900/60 print:bg-gray-100 border border-red-900/50 print:border-gray-400 text-[11px] text-slate-300 print:text-gray-800 flex items-start gap-2">
            <span className="text-alertRed font-bold shrink-0">⚠️ AUDIT RECORD:</span>
            <span>
              Candidate Site-B (Pipalkoti Shelf) was <strong>OPERATIONALLY DISQUALIFIED</strong> due to severe 30-toilet sanitation bottleneck (caps intake at 550) and 66% bridge cutoff risk.
            </span>
          </div>

          {/* Section 5: Signature & Verification Stamp Block */}
          <div className="pt-4 border-t-2 border-slate-700 print:border-black flex items-end justify-between text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400 print:text-gray-600 text-[11px]">
                <QrCode className="w-8 h-8 text-white print:text-black" />
                <div>
                  <div className="font-bold text-slate-200 print:text-black">DIGITALLY SIGNED & HASHED</div>
                  <div className="text-[9px] text-slate-500">SHA256: 8f4a9b2c1d3e7f60...</div>
                </div>
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="font-bold text-white print:text-black flex items-center justify-end gap-1">
                <Stamp className="w-4 h-4 text-emerald-400 print:text-black" />
                <span>MAJ. GEN. COMMANDING OFFICER</span>
              </div>
              <div className="text-[11px] text-slate-400 print:text-gray-600">
                SDMA Emergency Operations Center (EOC), Dehradun
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
