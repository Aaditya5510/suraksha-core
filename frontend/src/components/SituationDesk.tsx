import React from 'react';
import type { Habitation } from '../types/suraksha';
import {
  Radio,
  Compass,
  AlertTriangle,
  Users,
  Waves,
  Mountain,
  ShieldCheck,
  AlertOctagon,
  ChevronDown,
  Flame,
} from 'lucide-react';

interface SituationDeskProps {
  habitations: Habitation[];
  selectedHabitationId: string;
  onSelectHabitation: (id: string) => void;
  selectedHabitation: Habitation;
  simulatedPopulation: number;
  onPopulationChange: (pop: number) => void;
  primaryCapacity: number; // e.g. 3266
  isLoading?: boolean;
}

export const SituationDesk: React.FC<SituationDeskProps> = ({
  habitations,
  selectedHabitationId,
  onSelectHabitation,
  selectedHabitation,
  simulatedPopulation,
  onPopulationChange,
  primaryCapacity = 3266,
  isLoading = false,
}) => {
  const isRedZone = selectedHabitation.riskZone === 'CRITICAL_RED_ZONE';
  const residualHeadroom = primaryCapacity - simulatedPopulation;
  const isDeficit = residualHeadroom < 0;
  const excessEvacuees = Math.max(0, simulatedPopulation - primaryCapacity);

  const baselinePop = selectedHabitation.population;
  const surge25Pop = Math.round(baselinePop * 1.25);
  const massEvacPop = Math.min(Math.round(baselinePop * 1.5), 5000);

  const presets = [
    { label: 'Baseline', value: baselinePop, desc: `${baselinePop.toLocaleString()} Census` },
    { label: 'Surge +25%', value: surge25Pop, desc: `${surge25Pop.toLocaleString()} Influx` },
    { label: 'Mass Evac', value: massEvacPop > 4000 ? 4200 : massEvacPop, desc: 'Valley Evac' },
  ];

  return (
    <aside className="w-full lg:w-[320px] shrink-0 space-y-4 font-mono text-xs">
      {/* 1. Sector Triage Header & Selector */}
      <div className="tactical-card p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-borderDark pb-2.5">
          <div className="flex items-center gap-2 text-slate-200 font-bold uppercase tracking-wider text-xs">
            <Radio className="w-4 h-4 text-alertRed animate-pulse" />
            <span>SECTOR TRIAGE DESK</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            OP-DESK
          </span>
        </div>

        {/* Habitation Selector Dropdown */}
        <div className="space-y-1.5">
          <label className="text-[11px] text-slate-400 font-semibold block uppercase">
            Active Crisis Habitation:
          </label>
          <div className="relative">
            <select
              value={selectedHabitationId}
              onChange={(e) => onSelectHabitation(e.target.value)}
              className="w-full bg-slate-950 border border-borderDark text-slate-100 py-2 pl-3 pr-8 rounded-lg appearance-none font-mono text-xs focus:outline-none focus:border-infoBlue cursor-pointer shadow-inner"
            >
              {habitations.map((hab) => (
                <option key={hab.id} value={hab.id} className="bg-slate-900 text-slate-100">
                  {hab.id}: {hab.name} ({hab.riskZone === 'CRITICAL_RED_ZONE' ? 'RED ZONE' : 'AMBER ZONE'})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 2. Threat Matrix Card (with crisp skeleton loading state) */}
      <div className={`tactical-card p-4 space-y-3.5 transition-opacity duration-200 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        <div className="flex items-center justify-between border-b border-borderDark pb-2">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-alertRed" /> Threat Matrix Telemetry
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            {selectedHabitation.latitude.toFixed(4)}°N, {selectedHabitation.longitude.toFixed(4)}°E
          </span>
        </div>

        {/* Big CRI Readout */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/80 border border-borderDark">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Composite Risk Index</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span
                className={`text-2xl font-extrabold tracking-tight ${
                  isRedZone ? 'text-alertRed' : 'text-warnAmber'
                }`}
              >
                {selectedHabitation.compositeRiskIndex}
              </span>
              <span className="text-slate-400 text-xs">/ 100</span>
            </div>
          </div>

          {/* Risk Pill */}
          <div
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${
              isRedZone
                ? 'bg-alertRed/15 border-alertRed/50 text-alertRed tactical-pulse-red'
                : 'bg-warnAmber/15 border-warnAmber/50 text-warnAmber'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isRedZone ? 'bg-alertRed animate-ping' : 'bg-warnAmber'
              }`}
            />
            <span>{isRedZone ? 'CRITICAL RED ZONE' : 'AMBER MONITORING'}</span>
          </div>
        </div>

        {/* 3 Mini Threat Indicators */}
        <div className="space-y-2.5 pt-1">
          {/* 1. Slope Angle */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-infoBlue" /> Slope Angle
              </span>
              <span
                className={`font-bold ${
                  selectedHabitation.slopeDegrees >= 35 ? 'text-alertRed' : 'text-warnAmber'
                }`}
              >
                {selectedHabitation.slopeDegrees}° ({selectedHabitation.slopeDegrees >= 35 ? 'Debris Avalanche' : 'Moderate Slope'})
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  selectedHabitation.slopeDegrees >= 35 ? 'bg-alertRed' : 'bg-warnAmber'
                }`}
                style={{ width: `${Math.min((selectedHabitation.slopeDegrees / 60) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* 2. Landslide Runout */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Mountain className="w-3 h-3 text-infoBlue" /> Landslide Hazard Index
              </span>
              <span
                className={`font-bold ${
                  selectedHabitation.landslideHazardIndex >= 75 ? 'text-alertRed' : 'text-amber-400'
                }`}
              >
                {selectedHabitation.landslideHazardIndex}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full rounded-full bg-alertRed transition-all duration-500"
                style={{ width: `${selectedHabitation.landslideHazardIndex}%` }}
              />
            </div>
          </div>

          {/* 3. Flash-Flood Vector */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Waves className="w-3 h-3 text-infoBlue" /> Flash-Flood Risk Index
              </span>
              <span className="text-amber-400 font-bold">
                {selectedHabitation.floodRiskIndex}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full rounded-full bg-infoBlue transition-all duration-500"
                style={{ width: `${selectedHabitation.floodRiskIndex}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Population Demand & Stress Slider */}
      <div className="tactical-card p-4 space-y-3.5">
        <div className="flex items-center justify-between border-b border-borderDark pb-2">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-infoBlue" /> Evacuee Demand & Stress
          </span>
          <div className="text-white font-extrabold text-sm flex items-center gap-1">
            <span>{simulatedPopulation.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 font-normal">souls</span>
          </div>
        </div>

        {/* Dynamic Headroom / Deficit Badge */}
        <div>
          {isDeficit ? (
            <div className="p-2 rounded-lg bg-alertRed/15 border border-alertRed/50 text-alertRed text-[11px] font-bold flex items-center gap-1.5 animate-pulse">
              <AlertOctagon className="w-4 h-4 shrink-0" />
              <span>OVERFLOW DEFICIT ({residualHeadroom} SOULS) — SPILLOVER MANDATED</span>
            </div>
          ) : (
            <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/50 text-safeGreen text-[11px] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>WITHIN SAFE HEADROOM (+{residualHeadroom} SOULS)</span>
            </div>
          )}
        </div>

        {/* Reactive Spillover Protocol Alert Card */}
        {isDeficit && (
          <div className="p-2.5 rounded-lg bg-alertRed/20 border border-alertRed/60 text-xs font-mono space-y-1.5 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.3)]">
            <div className="flex items-center gap-1.5 text-alertRed font-extrabold text-[11px]">
              <Flame className="w-3.5 h-3.5 shrink-0" />
              <span>🚨 CAPACITY DEFICIT: Primary site saturated at {primaryCapacity.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-slate-300 leading-snug">
              Spillover Protocol active — Re-routing remaining <strong className="text-amber-300 font-bold">{excessEvacuees.toLocaleString()} evacuees</strong> to Site-C Transit Triage.
            </p>
          </div>
        )}

        {/* Presets Grid */}
        <div className="grid grid-cols-3 gap-1.5">
          {presets.map((p) => {
            const isActive = simulatedPopulation === p.value;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => onPopulationChange(p.value)}
                className={`px-2 py-1.5 rounded border text-[10px] text-center transition-all ${
                  isActive
                    ? 'bg-infoBlue/20 border-infoBlue text-white font-bold shadow-[0_0_8px_rgba(59,130,246,0.4)]'
                    : 'bg-slate-950 border-borderDark text-slate-400 hover:border-slate-600 hover:text-slate-200'
                }`}
              >
                <div className="font-bold">{p.label}</div>
                <div className="text-[9px] text-slate-500">{p.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Continuous Range Slider */}
        <div className="space-y-1 pt-1">
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>1,000</span>
            <span className="text-amber-400">Cap: {primaryCapacity.toLocaleString()}</span>
            <span>5,000</span>
          </div>
          <input
            type="range"
            min="1000"
            max="5000"
            step="10"
            value={simulatedPopulation}
            onChange={(e) => onPopulationChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-infoBlue border border-borderDark"
          />
        </div>
      </div>
    </aside>
  );
};
