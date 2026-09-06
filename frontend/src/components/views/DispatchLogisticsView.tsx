import React from 'react';
import type { EvaluationResultResponse, Habitation } from '../../types/suraksha';
import {
  Truck,
  Droplets,
  Sparkles,
  HeartPulse,
  Printer,
  Radio,
  Fuel,
  Users2,
  Warehouse,
  MapPin,
} from 'lucide-react';

interface DispatchLogisticsViewProps {
  evaluation: EvaluationResultResponse;
  selectedHabitation: Habitation;
  simulatedPopulation: number;
}

export const DispatchLogisticsView: React.FC<DispatchLogisticsViewProps> = ({
  evaluation: _evaluation,
  selectedHabitation: _selectedHabitation,
  simulatedPopulation,
}) => {
  // 4 Core High-Contrast Logistics Formulas
  const busesNeeded = Math.ceil(simulatedPopulation / 40);
  const waterLpdTotal = simulatedPopulation * 15;
  const waterTankersNeeded = Math.ceil(waterLpdTotal / 5000);
  const bioToiletsNeeded = Math.ceil(simulatedPopulation / 25);
  const medicalTentsNeeded = Math.max(1, Math.ceil(simulatedPopulation / 500));
  const driversNeeded = busesNeeded * 2; // Dual-driver relay for mountain terrain

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 font-mono select-none">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg md:text-xl font-bold text-white tracking-wide uppercase">
              Fleet & Transport Requisition Dispatch Dashboard
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Operational Logistics Requisition Engine • Sphere 2018 Standards & UKSRTC Staging Protocol
          </p>
        </div>

        {/* Print Action Button */}
        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print Fleet Manifest</span>
        </button>
      </div>

      {/* 1. 4 High-Contrast Operational Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Transport / Buses */}
        <div className="p-4 rounded-2xl border border-blue-500/40 bg-[#090e18]/90 shadow-[0_0_15px_rgba(59,130,246,0.1)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider">Transport Mobility</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-white">{busesNeeded}</div>
            <div className="text-xs font-bold text-blue-400 mt-0.5">Evacuation Buses (40-Pax)</div>
          </div>
          <p className="text-[10px] text-slate-400 pt-1 border-t border-gray-800">
            Formula: <code>ceil({simulatedPopulation} / 40)</code> • 4x4 Mountain Fleet
          </p>
        </div>

        {/* Metric 2: Potable Water Supply */}
        <div className="p-4 rounded-2xl border border-cyan-500/40 bg-[#081017]/90 shadow-[0_0_15px_rgba(6,182,212,0.1)] space-y-2">
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
        <div className="p-4 rounded-2xl border border-amber-500/40 bg-[#120e07]/90 shadow-[0_0_15px_rgba(245,158,11,0.1)] space-y-2">
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
            Formula: <code>ceil({simulatedPopulation} / 25)</code> • Sphere 1:25 ratio
          </p>
        </div>

        {/* Metric 4: Medical / First-Aid */}
        <div className="p-4 rounded-2xl border border-emerald-500/40 bg-[#07120c]/90 shadow-[0_0_15px_rgba(16,185,129,0.1)] space-y-2">
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

      {/* 2. Depot Staging & Driver Allocation Dashboard */}
      <div className="p-6 rounded-2xl border border-gray-800 bg-[#0c111d] space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <Warehouse className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Depot Staging, Fleet Clusters & Driver Readiness
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Total Allocated Fleet: {busesNeeded} Buses • {driversNeeded} Drivers
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Depot 1: Gopeshwar Central Depot */}
          <div className="p-4 rounded-xl bg-[#07090e] border border-emerald-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Gopeshwar Central Depot
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                PRIMARY STAGE
              </span>
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Buses:</span>
                <strong className="text-white">{Math.round(busesNeeded * 0.6)} Units</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Water Tankers Staged:</span>
                <strong className="text-cyan-400">{Math.round(waterTankersNeeded * 0.6)} Tankers</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Bio-Toilets Ready:</span>
                <strong className="text-amber-400">{Math.round(bioToiletsNeeded * 0.6)} Units</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Certified Drivers:</span>
                <strong className="text-emerald-400">{Math.round(driversNeeded * 0.6)} Personnel</strong>
              </div>
            </div>
          </div>

          {/* Depot 2: Joshimath Transit Depot */}
          <div className="p-4 rounded-xl bg-[#07090e] border border-amber-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> Joshimath Forward Depot
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 font-bold">
                FORWARD RELAY
              </span>
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Buses:</span>
                <strong className="text-white">{Math.round(busesNeeded * 0.3)} Units</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Water Tankers Staged:</span>
                <strong className="text-cyan-400">{Math.round(waterTankersNeeded * 0.3)} Tankers</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Bio-Toilets Ready:</span>
                <strong className="text-amber-400">{Math.round(bioToiletsNeeded * 0.3)} Units</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Certified Drivers:</span>
                <strong className="text-emerald-400">{Math.round(driversNeeded * 0.3)} Personnel</strong>
              </div>
            </div>
          </div>

          {/* Depot 3: Chamoli Quick Reaction Reserve */}
          <div className="p-4 rounded-xl bg-[#07090e] border border-blue-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" /> Chamoli Tactical Reserve
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800 font-bold">
                QRF STANDBY
              </span>
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Buses:</span>
                <strong className="text-white">{Math.max(1, busesNeeded - Math.round(busesNeeded * 0.6) - Math.round(busesNeeded * 0.3))} Units</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Water Tankers Staged:</span>
                <strong className="text-cyan-400">{Math.max(1, waterTankersNeeded - Math.round(waterTankersNeeded * 0.6) - Math.round(waterTankersNeeded * 0.3))} Tankers</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Bio-Toilets Ready:</span>
                <strong className="text-amber-400">{Math.max(1, bioToiletsNeeded - Math.round(bioToiletsNeeded * 0.6) - Math.round(bioToiletsNeeded * 0.3))} Units</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Certified Drivers:</span>
                <strong className="text-emerald-400">{Math.max(2, driversNeeded - Math.round(driversNeeded * 0.6) - Math.round(driversNeeded * 0.3))} Personnel</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Support Infrastructure Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-gray-800/80">
          <div className="p-3 rounded-xl bg-[#07090e] border border-gray-800 flex items-center gap-3">
            <Fuel className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Fuel Staging Point:</span>
              <strong className="text-white">15,000L Diesel @ Birahi Depot</strong>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#07090e] border border-gray-800 flex items-center gap-3">
            <Users2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Driver Mobilization:</span>
              <strong className="text-emerald-400">{driversNeeded} Mountain Drivers (100% Ready)</strong>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#07090e] border border-gray-800 flex items-center gap-3">
            <Radio className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Convoy Radio Frequency:</span>
              <strong className="text-cyan-300">148.550 MHz (DEOC Chamoli Net)</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
