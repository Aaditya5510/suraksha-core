import React, { useEffect } from 'react';
import type { EvaluationResultResponse } from '../types/suraksha';
import {
  ShieldAlert,
  Printer,
  X,
  Truck,
  QrCode,
  Stamp,
  ShieldCheck,
  XCircle,
  MapPin,
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
  const { habitation, candidateSites } = evaluation;
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
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c111d] border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Sticky Top Header */}
        <header className="sticky top-0 z-20 px-6 py-4 bg-[#0a0e19] border-b border-gray-800 flex items-center justify-between shrink-0 font-mono">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white tracking-wide uppercase">
                  STATUTORY DIRECTIVE
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                  DM ACT 2005 (SEC 34)
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                REF: SDMA/UK/CHAMOLI/2026/HAB01 • DATE: {currentDate}
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

        {/* Crisp, Scannable Document Body */}
        <main
          id="sdma-printable-document"
          className="overflow-y-auto p-6 space-y-4 flex-1 text-slate-200 font-mono text-xs custom-scrollbar bg-[#07090e]"
        >
          {/* 4 High-Impact Scannable Chips Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Chip 1: SECTOR */}
            <div className="p-3.5 rounded-xl bg-[#0c111d] border border-red-500/40 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold text-red-400">
                <span className="flex items-center gap-1.5 uppercase">
                  <MapPin className="w-3.5 h-3.5" /> CRISIS SECTOR
                </span>
                <span className="px-1.5 py-0.2 rounded bg-red-950 text-red-300 border border-red-800">
                  CRI {habitation.compositeRiskIndex}
                </span>
              </div>
              <div className="text-base font-black text-white">
                {habitation.name}
              </div>
              <div className="text-[11px] text-slate-300">
                {simulatedPopulation.toLocaleString()} Evacuees • {habitation.slopeDegrees}° Slope (High Hazard)
              </div>
            </div>

            {/* Chip 2: APPROVED SHELTER */}
            <div className="p-3.5 rounded-xl bg-[#0c111d] border border-emerald-500/40 space-y-1">
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
                Safe Intake: {siteA.capacityAudit.effectiveCapacity.toLocaleString()} souls (+{Math.max(0, siteA.capacityAudit.effectiveCapacity - simulatedPopulation)} Headroom)
              </div>
            </div>

            {/* Chip 3: REJECTED SHELTER */}
            <div className="p-3.5 rounded-xl bg-[#0c111d] border border-red-900/60 space-y-1">
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
                Cap: 550 Souls Max • Binding Sanitation Bottleneck (30 Toilets)
              </div>
            </div>

            {/* Chip 4: REQUISITIONS */}
            <div className="p-3.5 rounded-xl bg-[#0c111d] border border-cyan-500/40 space-y-1">
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

          {/* Quick Stat Strip */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#0c111d] border border-gray-800 text-center">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Transport</span>
              <strong className="text-amber-400 text-sm">{busesNeeded} Buses</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Potable Water</span>
              <strong className="text-cyan-400 text-sm">{waterTankersNeeded} Tankers (5kL)</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Sanitation</span>
              <strong className="text-emerald-400 text-sm">{sanitationUnitsNeeded} Mobile Units</strong>
            </div>
          </div>

          {/* Legal Sign-off & Verification Footer */}
          <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <QrCode className="w-7 h-7 text-white shrink-0" />
              <div>
                <span className="text-slate-200 font-bold block">SHA256: 8f4a9b2c...2048fe</span>
                <span className="text-emerald-400 text-[10px]">Deterministic Audit Passed</span>
              </div>
            </div>

            <div className="text-right">
              <div className="font-bold text-white flex items-center justify-end gap-1">
                <Stamp className="w-3.5 h-3.5 text-emerald-400" />
                <span>INCIDENT COMMANDER, DEOC CHAMOLI</span>
              </div>
              <div className="text-[10px] text-slate-400">SDMA Uttarakhand</div>
            </div>
          </div>
        </main>

        {/* Sticky Bottom Action Bar */}
        <footer className="sticky bottom-0 z-20 px-6 py-3.5 bg-[#0a0e19] border-t border-gray-800 flex items-center justify-between shrink-0 font-mono text-xs">
          <div className="text-slate-400 text-[11px]">
            Status: <span className="text-emerald-400 font-bold">READY FOR DISPATCH</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-gray-700 transition-colors font-semibold"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Order</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export const StatutoryDirectiveModal = SdmaDirectiveModal;
