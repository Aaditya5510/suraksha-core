import React from 'react';
import {
  Users,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Layers,
} from 'lucide-react';

interface SurgeSimulatorProps {
  population: number;
  onChange: (pop: number) => void;
  primaryCapacity: number; // e.g. 3266 (SITE-A Gopeshwar)
  transitCapacity: number; // e.g. 2850 (SITE-C Inter-College)
}

export const SurgeSimulator: React.FC<SurgeSimulatorProps> = ({
  population,
  onChange,
  primaryCapacity = 3266,
  transitCapacity = 2850,
}) => {
  const isSpillover = population > primaryCapacity;
  const primaryAllocated = Math.min(population, primaryCapacity);
  const spilloverCount = Math.max(0, population - primaryCapacity);
  const transitAllocated = Math.min(spilloverCount, transitCapacity);
  const unallocatedExcess = Math.max(0, spilloverCount - transitCapacity);

  const presets = [
    { label: 'Baseline (2,840)', value: 2840, desc: 'Chamoli Census' },
    { label: 'Surge +25% (3,550)', value: 3550, desc: 'Tourist Influx' },
    { label: 'Mass Evac (4,200)', value: 4200, desc: 'Valley Wide' },
  ];

  return (
    <div className="tactical-card p-4 space-y-4">
      {/* Header with Title & Current Value */}
      <div className="flex items-center justify-between border-b border-borderDark pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-infoBlue/10 border border-infoBlue/30 text-infoBlue">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              Dynamic "What-If" Population Surge Simulator
            </h3>
            <p className="text-[11px] font-mono text-slate-400">
              Stress-test carrying-capacity thresholds & automated overflow routing
            </p>
          </div>
        </div>

        {/* Live Population Counter */}
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-slate-700">
          <Users className="w-4 h-4 text-infoBlue" />
          <span className="text-base font-mono font-extrabold text-white tracking-tight">
            {population.toLocaleString()}
          </span>
          <span className="text-[10px] font-mono text-slate-400 uppercase">evacuees</span>
        </div>
      </div>

      {/* Preset Action Buttons */}
      <div className="grid grid-cols-3 gap-2">
        {presets.map((p) => {
          const isActive = population === p.value;
          return (
            <button
              key={p.value}
              type="button"
              onClick={() => onChange(p.value)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all text-left ${
                isActive
                  ? 'bg-infoBlue/20 border-infoBlue text-white font-bold shadow-[0_0_12px_rgba(59,130,246,0.4)]'
                  : 'bg-slate-900/80 border-borderDark text-slate-300 hover:border-slate-600 hover:text-white'
              }`}
            >
              <div className="font-semibold">{p.label}</div>
              <div className="text-[10px] text-slate-400">{p.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Interactive Range Slider */}
      <div className="space-y-2 pt-1">
        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span>1,000 Min</span>
          <span className="text-amber-400 font-semibold">
            Primary Saturation: {primaryCapacity.toLocaleString()}
          </span>
          <span>5,000 Max</span>
        </div>
        <div className="relative flex items-center">
          <input
            type="range"
            min="1000"
            max="5000"
            step="10"
            value={population}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-infoBlue border border-borderDark"
          />
        </div>
      </div>

      {/* Reactive Spillover / Headroom Protocol Card */}
      {isSpillover ? (
        <div className="p-3 rounded-lg bg-alertRed/15 border border-alertRed/40 text-xs font-mono space-y-2 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-alertRed font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>CRITICAL SURGE: MULTI-SITE SPILLOVER PROTOCOL TRIGGERED</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-alertRed text-white text-[10px] font-bold">
              +{spilloverCount.toLocaleString()} OVERFLOW
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            Site-A (Gopeshwar Enclave) saturated at its maximum Sphere carrying-capacity limit of{' '}
            <span className="font-bold text-white">{primaryCapacity.toLocaleString()}</span>. Automatic load-balancer directing overflow to secondary staging points:
          </p>

          {/* Dynamic Allocation Routing Path */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <div className="p-2 rounded bg-slate-900/90 border border-slate-700 flex items-center justify-between">
              <div>
                <div className="font-bold text-emerald-400">SITE-A (Gopeshwar)</div>
                <div className="text-[10px] text-slate-400">Primary Enclave (Saturated)</div>
              </div>
              <span className="text-white font-bold">{primaryAllocated.toLocaleString()}</span>
            </div>

            <div className="p-2 rounded bg-slate-900/90 border border-amber-500/50 flex items-center justify-between">
              <div>
                <div className="font-bold text-amber-400">SITE-C (Inter-College)</div>
                <div className="text-[10px] text-slate-400">Spillover Transit Staging</div>
              </div>
              <span className="text-amber-300 font-bold">+{transitAllocated.toLocaleString()}</span>
            </div>
          </div>

          {unallocatedExcess > 0 && (
            <div className="text-[11px] text-red-300 font-bold pt-1 flex items-center gap-1">
              <span>⚠️ UNALLOCATED REGIONAL DEFICIT: {unallocatedExcess.toLocaleString()} evacuees require inter-district transit mobilization!</span>
            </div>
          )}
        </div>
      ) : (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-safeGreen" />
            <div>
              <span className="text-safeGreen font-bold">NOMINAL CAPACITY ALLOCATION</span>
              <p className="text-[11px] text-slate-400">
                Site-A can comfortably absorb full evacuation demand with{' '}
                <span className="text-white font-bold">+{primaryCapacity - population}</span> headroom remaining.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange(2840)}
            title="Reset to Chamoli baseline"
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
