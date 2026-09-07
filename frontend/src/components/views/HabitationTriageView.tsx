import React from 'react';
import { BASELINE_HABITATIONS } from '../../data/baselineData';
import {
  Compass,
  Radio,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

interface HabitationTriageViewProps {
  selectedHabitationId: string;
  onSelectHabitation: (habId: string) => void;
  onFocusOnMap: (habId: string) => void;
}

export const HabitationTriageView: React.FC<HabitationTriageViewProps> = ({
  selectedHabitationId,
  onSelectHabitation,
  onFocusOnMap,
}) => {
  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-6 space-y-6 font-mono bg-[#07090e] text-slate-100 select-none">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500">
              <Radio className="w-4 h-4 animate-pulse" />
            </span>
            <h2 className="text-lg font-black text-white tracking-wide uppercase">
              Habitation Demands & SMR Threat Telemetry
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Multi-hazard slope monitoring, SMR structural degradation indices, and valley-wide population exposure.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-red-950 text-red-400 border border-red-800 font-bold">
            2 RED ZONES
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-950 text-amber-400 border border-amber-800 font-bold">
            1 AMBER ZONE
          </span>
        </div>
      </div>

      {/* 3 Sector Summary Dossier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BASELINE_HABITATIONS.map((hab) => {
          const isSelected = hab.id === selectedHabitationId;
          const isRed = hab.riskZone === 'CRITICAL_RED_ZONE';

          return (
            <div
              key={hab.id}
              onClick={() => onSelectHabitation(hab.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? isRed
                    ? 'bg-red-500/15 border-red-500/70 shadow-[0_0_20px_rgba(239,68,68,0.25)] ring-1 ring-red-500/50'
                    : 'bg-amber-500/15 border-amber-500/70 shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-1 ring-amber-500/50'
                  : 'bg-[#0c111d] border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${isRed ? 'bg-red-500 animate-pulse' : 'bg-amber-400'}`} />
                    {hab.id}: {hab.name}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                      isRed ? 'bg-red-950 text-red-300 border-red-800' : 'bg-amber-950 text-amber-300 border-amber-800'
                    }`}
                  >
                    {isRed ? 'CRITICAL RED' : 'AMBER MONITOR'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2 rounded-xl bg-[#060911] border border-gray-800">
                    <span className="text-[10px] text-slate-400 block">Census Population</span>
                    <strong className="text-white text-sm">{hab.population.toLocaleString()} Residents</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-[#060911] border border-gray-800">
                    <span className="text-[10px] text-slate-400 block">Composite Risk (CRI)</span>
                    <strong className={`text-sm ${isRed ? 'text-red-400' : 'text-amber-400'}`}>
                      {hab.compositeRiskIndex} / 100
                    </strong>
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px] pt-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Compass className="w-3 h-3 text-blue-400" /> Critical Slope Angle:
                    </span>
                    <strong className={hab.slopeDegrees >= 35 ? 'text-red-400' : 'text-amber-400'}>
                      {hab.slopeDegrees}° ({hab.slopeDegrees >= 35 ? 'Debris Slide Trigger' : 'Moderate Incline'})
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Landslide Hazard Index:</span>
                    <strong className="text-red-400">{hab.landslideHazardIndex}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Flash-Flood Runout Risk:</span>
                    <strong className="text-blue-400">{hab.floodRiskIndex}%</strong>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  {hab.latitude.toFixed(4)}° N, {hab.longitude.toFixed(4)}° E
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFocusOnMap(hab.id);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold shadow-sm transition-all"
                >
                  <span>Focus on Map</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* High-Density Comparative Telemetry Table */}
      <div className="p-4 rounded-2xl bg-[#0c111d] border border-gray-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            Comprehensive Geotechnical & Vulnerability Matrix
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">
            SMR Standards • Ministry of Mines (GSI) Guidelines
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-gray-800 text-slate-400 text-[10px] uppercase">
                <th className="py-2.5 px-3">Sector ID & Name</th>
                <th className="py-2.5 px-3">Risk Classification</th>
                <th className="py-2.5 px-3">Census Pop</th>
                <th className="py-2.5 px-3">Slope Angle</th>
                <th className="py-2.5 px-3">Landslide %</th>
                <th className="py-2.5 px-3">Flood %</th>
                <th className="py-2.5 px-3">CRI Formula Breakdown</th>
                <th className="py-2.5 px-3">Civil Mitigation Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {BASELINE_HABITATIONS.map((hab) => {
                const isRed = hab.riskZone === 'CRITICAL_RED_ZONE';

                return (
                  <tr key={hab.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{hab.name}</div>
                      <div className="text-[10px] text-slate-500">{hab.id}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                          isRed
                            ? 'bg-red-950 text-red-300 border-red-800'
                            : 'bg-amber-950 text-amber-300 border-amber-800'
                        }`}
                      >
                        {isRed ? 'CRITICAL RED ZONE' : 'AMBER MONITORING'}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-200">
                      {hab.population.toLocaleString()} Residents
                    </td>
                    <td className="py-3 px-3 font-bold text-red-400">
                      {hab.slopeDegrees}°
                    </td>
                    <td className="py-3 px-3 text-red-300">
                      {hab.landslideHazardIndex}%
                    </td>
                    <td className="py-3 px-3 text-blue-300">
                      {hab.floodRiskIndex}%
                    </td>
                    <td className="py-3 px-3 text-[10px] text-slate-300">
                      0.4({hab.slopeDegrees}°) + 0.35({hab.landslideHazardIndex}%) + 0.25({hab.floodRiskIndex}%)
                    </td>
                    <td className="py-3 px-3 text-[11px]">
                      {isRed ? (
                        <span className="text-red-400 font-semibold">
                          Non-Mitigable (Evacuation Enforced)
                        </span>
                      ) : (
                        <span className="text-amber-400 font-semibold">
                          Monitoring Active (Standby)
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => onFocusOnMap(hab.id)}
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-cyan-600 text-slate-200 hover:text-white text-[10px] font-bold transition-colors"
                      >
                        Select & Map →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
