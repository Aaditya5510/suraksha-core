import React from 'react';
import type { Habitation } from '../../types/suraksha';
import { BASELINE_HABITATIONS } from '../../data/baselineData';
import {
  Radio,
  Compass,
  AlertTriangle,
  Users,
  Plus,
  Minus,
  ShieldCheck,
  AlertOctagon,
} from 'lucide-react';

interface IncidentQueueDrawerProps {
  selectedHabitationId: string;
  onSelectHabitation: (id: string) => void;
  selectedHabitation: Habitation;
  simulatedPopulation: number;
  onPopulationChange: (pop: number) => void;
  primaryCapacity: number;
  isLoading?: boolean;
}

export const IncidentQueueDrawer: React.FC<IncidentQueueDrawerProps> = ({
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

  const baselinePop = selectedHabitation.population;

  const handleStep = (delta: number) => {
    const next = Math.max(500, Math.min(6000, simulatedPopulation + delta));
    onPopulationChange(next);
  };

  const presets = [
    { label: 'Baseline', value: baselinePop, desc: 'Census' },
    { label: '+500 Tourists', value: baselinePop + 500, desc: 'Influx' },
    { label: '+1,500 Mass Evac', value: baselinePop + 1500, desc: 'Valley' },
  ];

  return (
    <aside className="w-[330px] max-w-[calc(100vw-2rem)] flex flex-col gap-3 font-mono select-none">
      {/* 1. Active Incident & Demand Queue */}
      <div className="bg-[#0c111d]/90 backdrop-blur-xl border border-gray-800/90 rounded-2xl p-4 shadow-2xl space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-2">
          <div className="flex items-center gap-2 text-white font-bold text-xs tracking-wide">
            <Radio className="w-4 h-4 text-red-500 animate-pulse" />
            <span>ACTIVE INCIDENT QUEUE</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30 font-bold">
            3 SECTORS ACTIVE
          </span>
        </div>

        {/* 3 Operational Incident Cards */}
        <div className="space-y-2">
          {BASELINE_HABITATIONS.map((hab) => {
            const isSelected = hab.id === selectedHabitationId;
            const isHabRed = hab.riskZone === 'CRITICAL_RED_ZONE';

            return (
              <div
                key={hab.id}
                onClick={() => onSelectHabitation(hab.id)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer text-xs space-y-1.5 ${
                  isSelected
                    ? isHabRed
                      ? 'bg-red-500/15 border-red-500/70 shadow-[0_0_15px_rgba(239,68,68,0.25)] ring-1 ring-red-500/50'
                      : 'bg-amber-500/15 border-amber-500/70 shadow-[0_0_15px_rgba(245,158,11,0.25)] ring-1 ring-amber-500/50'
                    : 'bg-[#060911]/80 border-gray-800/80 hover:border-gray-700 hover:bg-slate-900/60'
                }`}
              >
                {/* Top: Name and Risk Pill */}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isHabRed ? 'bg-red-500 animate-pulse' : 'bg-amber-400'
                      }`}
                    />
                    {hab.id}: {hab.name}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                      isHabRed
                        ? 'bg-red-950/80 text-red-300 border-red-800'
                        : 'bg-amber-950/80 text-amber-300 border-amber-800'
                    }`}
                  >
                    {isHabRed ? 'CRITICAL RED' : 'AMBER MONITOR'}
                  </span>
                </div>

                {/* Telemetry Metrics */}
                <div className="grid grid-cols-3 gap-1 text-[10px] text-slate-300 pt-0.5">
                  <div>
                    <span className="text-slate-400 block text-[9px]">Pop:</span>
                    <strong className="text-white">{hab.population.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">CRI:</span>
                    <strong className={isHabRed ? 'text-red-400' : 'text-amber-400'}>
                      {hab.compositeRiskIndex}/100
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">Slope:</span>
                    <strong className="text-slate-200">{hab.slopeDegrees}°</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Active Threat Breakdown Card */}
      <div className={`bg-[#0c111d]/90 backdrop-blur-xl border border-gray-800/90 rounded-2xl p-4 shadow-2xl space-y-3 transition-opacity ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-500" /> Sector Threat Telemetry
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {selectedHabitation.latitude.toFixed(4)}°N, {selectedHabitation.longitude.toFixed(4)}°E
          </span>
        </div>

        {/* Big CRI and Slope Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-[#060911]/90 border border-gray-800 space-y-0.5">
            <span className="text-[9px] text-slate-400 uppercase block">Composite Risk (CRI)</span>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-black ${isRedZone ? 'text-red-500' : 'text-amber-400'}`}>
                {selectedHabitation.compositeRiskIndex}
              </span>
              <span className="text-[10px] text-slate-500">/ 100</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#060911]/90 border border-gray-800 space-y-0.5">
            <span className="text-[9px] text-slate-400 uppercase block flex items-center gap-1">
              <Compass className="w-3 h-3 text-blue-400" /> Slope Angle
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-black ${selectedHabitation.slopeDegrees >= 35 ? 'text-red-400' : 'text-amber-400'}`}>
                {selectedHabitation.slopeDegrees}°
              </span>
              <span className="text-[10px] text-slate-500">{selectedHabitation.slopeDegrees >= 35 ? 'Critical' : 'Moderate'}</span>
            </div>
          </div>
        </div>

        {/* Hazard Progress Indicators */}
        <div className="space-y-2 pt-0.5">
          <div className="space-y-0.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400">Landslide Runout Vector</span>
              <span className="text-red-400 font-bold">{selectedHabitation.landslideHazardIndex}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-gray-800">
              <div
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${selectedHabitation.landslideHazardIndex}%` }}
              />
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400">Flash-Flood Vulnerability</span>
              <span className="text-blue-400 font-bold">{selectedHabitation.floodRiskIndex}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-gray-800">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${selectedHabitation.floodRiskIndex}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Influx Stress Controller & Dynamic Presets */}
      <div className="bg-[#0c111d]/90 backdrop-blur-xl border border-gray-800/90 rounded-2xl p-4 shadow-2xl space-y-3">
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-400" /> Influx Stress Controller
          </span>
          <span className="text-[10px] text-emerald-400 font-bold">
            Cap: {primaryCapacity.toLocaleString()}
          </span>
        </div>

        {/* Counter Stepper with Value */}
        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#060911]/90 border border-gray-800">
          <button
            type="button"
            onClick={() => handleStep(-100)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title="Decrease 100 evacuees"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <div className="text-center">
            <span className="text-base font-black text-white">{simulatedPopulation.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 block leading-none">evacuees</span>
          </div>

          <button
            type="button"
            onClick={() => handleStep(+100)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title="Increase 100 evacuees"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Presets Grid */}
        <div className="grid grid-cols-3 gap-1.5">
          {presets.map((p) => {
            const isActive = simulatedPopulation === p.value;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => onPopulationChange(p.value)}
                className={`p-1.5 rounded-lg border text-center transition-all ${
                  isActive
                    ? 'bg-blue-600/20 border-blue-500 text-white font-bold shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                    : 'bg-[#060911]/60 border-gray-800 text-slate-400 hover:border-gray-700 hover:text-slate-200'
                }`}
              >
                <div className="text-[10px] font-bold">{p.label}</div>
                <div className="text-[8px] text-slate-500">{p.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Range Slider */}
        <div className="space-y-1 pt-1">
          <input
            type="range"
            min="1000"
            max="5000"
            step="10"
            value={simulatedPopulation}
            onChange={(e) => onPopulationChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500 border border-gray-800"
          />
          <div className="flex justify-between text-[9px] text-slate-500">
            <span>1,000</span>
            <span className="text-amber-400">Sat: {primaryCapacity.toLocaleString()}</span>
            <span>5,000</span>
          </div>
        </div>

        {/* Headroom / Spillover Badge */}
        <div>
          {isDeficit ? (
            <div className="p-2 rounded-xl bg-red-500/15 border border-red-500/40 text-red-400 text-[10px] font-bold flex items-center gap-1.5 animate-pulse">
              <AlertOctagon className="w-3.5 h-3.5 shrink-0" />
              <span>DEFICIT ({residualHeadroom} SOULS) — AUTO-SPILLOVER ACTIVE</span>
            </div>
          ) : (
            <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>SAFE HEADROOM (+{residualHeadroom} SOULS)</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
