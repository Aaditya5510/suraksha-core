import React from 'react';
import type { CandidateSiteEvaluationDTO } from '../types/suraksha';
import {
  ShieldAlert,
  Droplets,
  Maximize2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Layers,
  XCircle,
  AlertTriangle,
  Flame,
} from 'lucide-react';

interface SphereConstraintMeterProps {
  site: CandidateSiteEvaluationDTO;
  allSites?: CandidateSiteEvaluationDTO[];
  simulatedPopulation: number;
  onSelectSite?: (siteId: string) => void;
}

export const SphereConstraintMeter: React.FC<SphereConstraintMeterProps> = ({
  site,
  allSites = [],
  simulatedPopulation,
  onSelectSite,
}) => {
  const { capacityAudit, name, siteId, recommendation } = site;
  const {
    grossByArea,
    grossByWater,
    grossBySanitation,
    limitingBottleneck,
    effectiveCapacity,
  } = capacityAudit;

  const residualHeadroom = effectiveCapacity - simulatedPopulation;
  const isDeficit = residualHeadroom < 0;
  const isSiteB = siteId === 'SITE-B';
  const isSiteA = siteId === 'SITE-A';
  const isRecommended = recommendation === 'RECOMMENDED_PRIMARY';

  // Percentage calculations against simulated demand
  const areaPercent = Math.min(Math.round((grossByArea / simulatedPopulation) * 100), 100);
  const waterPercent = Math.min(Math.round((grossByWater / simulatedPopulation) * 100), 100);
  const sanitationPercent = Math.min(Math.round((grossBySanitation / simulatedPopulation) * 100), 100);

  const isAreaBottleneck = limitingBottleneck === 'COVERED_SPACE';
  const isWaterBottleneck = limitingBottleneck === 'WATER_SUPPLY';
  const isSanitationBottleneck = limitingBottleneck === 'SANITATION_UNITS';

  return (
    <div className="tactical-card p-4 space-y-4">
      {/* Top Header with Site Switcher Tabs */}
      <div className="space-y-2.5 border-b border-borderDark pb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-infoBlue" />
            <span>Site Constraint Inspector</span>
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            SPHERE 2018 AUDIT
          </span>
        </div>

        {/* Clickable Candidate Site Selector Tabs */}
        {allSites.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {allSites.filter(s => s.siteId === 'SITE-A' || s.siteId === 'SITE-B').map((s) => {
              const isSelected = s.siteId === siteId;
              const isSafe = s.recommendation === 'RECOMMENDED_PRIMARY';
              return (
                <button
                  key={s.siteId}
                  type="button"
                  onClick={() => onSelectSite?.(s.siteId)}
                  className={`p-2 rounded-lg border text-left font-mono text-xs transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-800/95 border-infoBlue shadow-[0_0_12px_rgba(59,130,246,0.35)] ring-1 ring-infoBlue'
                      : 'bg-slate-950/70 border-borderDark hover:border-slate-600 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-slate-100 text-[11px]">{s.siteId}</span>
                    {isSafe ? (
                      <span className="text-[9px] font-bold text-safeGreen flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" /> PRIMARY
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold text-alertRed flex items-center gap-0.5">
                        <XCircle className="w-2.5 h-2.5" /> REJECTED
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-300 truncate mt-0.5">{s.name}</div>
                </button>
              );
            })}
          </div>
        )}

        {/* Selected Site Title & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              {name}
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              {isSiteA ? 'Primary Long-Term Enclave (3.4 km)' : 'Disqualified Shelf Enclave (11.2 km)'}
            </span>
          </div>

          {/* Effective Ceiling Badge */}
          <div className="flex items-center gap-2">
            {isDeficit ? (
              <div className="px-2.5 py-1 rounded bg-alertRed/20 border border-alertRed/50 text-alertRed text-xs font-mono font-bold flex items-center gap-1.5 animate-pulse">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>DEFICIT ({residualHeadroom} SOULS)</span>
              </div>
            ) : (
              <div className="px-2.5 py-1 rounded bg-safeGreen/20 border border-safeGreen/50 text-safeGreen text-xs font-mono font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>HEADROOM (+{residualHeadroom} SOULS)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Critical Rejection Alert for Site-B */}
      {isSiteB && (
        <div className="p-3 rounded-lg bg-alertRed/20 border border-alertRed/60 text-xs font-mono space-y-2 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]">
          <div className="flex items-center gap-1.5 text-alertRed font-extrabold text-[11px]">
            <XCircle className="w-4 h-4 shrink-0" />
            <span>REJECTED: Sanitation Ceiling 550 Souls (30 toilets strictly violate Sphere 1:25 ratio)</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            With only 30 functional toilets and 200 existing occupants, Pipalkoti Shelf is mathematically limited to 550 net evacuees. Attempting to place {simulatedPopulation.toLocaleString()} evacuees creates a deadly hygiene deficit of <strong className="text-alertRed">{Math.abs(residualHeadroom).toLocaleString()} souls</strong>.
          </p>
          <div className="text-[10px] text-red-300 bg-red-950/60 p-1.5 rounded border border-red-800 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-alertRed shrink-0" />
            <span>Secondary Hazard: 66% single-bridge mountain road cutoff probability.</span>
          </div>
        </div>
      )}

      {/* Binding Bottleneck Alert Banner for Site-A or nominal site */}
      {!isSiteB && limitingBottleneck !== 'NONE' && (
        <div
          className={`p-2.5 rounded-lg border text-xs font-mono flex items-start gap-2 ${
            recommendation === 'OPERATIONALLY_REJECTED' || isDeficit
              ? 'bg-alertRed/15 border-alertRed/40 text-red-200'
              : 'bg-warnAmber/15 border-warnAmber/40 text-amber-200'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-alertRed shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="font-bold flex items-center gap-1.5">
              <span>BINDING BOTTLENECK CEILING:</span>
              <span className="px-1.5 py-0.2 rounded bg-slate-900 font-mono text-white">
                {effectiveCapacity.toLocaleString()} SOULS
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              Theory of Constraints active: Constrained by{' '}
              <span className="font-bold text-white underline decoration-alertRed">
                {limitingBottleneck.replace(/_/g, ' ')}
              </span>
              . Even with {grossByArea.toLocaleString()} sqm space capacity, sanitation caps maximum safe intake at {effectiveCapacity.toLocaleString()}.
            </p>
          </div>
        </div>
      )}

      {/* Reactive Spillover Protocol Alert if Demand Exceeds 3,266 */}
      {isRecommended && simulatedPopulation > effectiveCapacity && (
        <div className="p-2.5 rounded-lg bg-alertRed/15 border border-alertRed/50 text-xs font-mono space-y-1 animate-pulse">
          <div className="flex items-center gap-1.5 text-alertRed font-bold text-[11px]">
            <Flame className="w-4 h-4 shrink-0 text-alertRed animate-bounce" />
            <span>🚨 CAPACITY DEFICIT: Primary site saturated at {effectiveCapacity.toLocaleString()}</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Spillover Protocol active — Re-routing remaining <strong className="text-amber-400">{(simulatedPopulation - effectiveCapacity).toLocaleString()} evacuees</strong> to Site-C Transit Triage post.
          </p>
        </div>
      )}

      {/* 3 Sphere Constraint Meters */}
      <div className="space-y-3.5 pt-1">
        {/* 1. Usable Space (3.5 m² / person) */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Maximize2 className="w-3.5 h-3.5 text-infoBlue" />
              <span>Usable Space (3.5 m² / person)</span>
            </span>
            <span className="text-slate-200 font-semibold">
              {grossByArea.toLocaleString()} persons{' '}
              <span className="text-slate-400">({areaPercent}%)</span>
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-borderDark flex">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isAreaBottleneck
                  ? 'bg-gradient-to-r from-red-600 to-alertRed shadow-[0_0_10px_rgba(239,68,68,0.7)]'
                  : 'bg-gradient-to-r from-emerald-600 to-safeGreen'
              }`}
              style={{ width: `${Math.min(areaPercent, 100)}%` }}
            />
          </div>
        </div>

        {/* 2. Water Supply (15 LPD / person) */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Droplets className="w-3.5 h-3.5 text-infoBlue" />
              <span>Water Supply (15 LPD / person)</span>
            </span>
            <span className="text-slate-200 font-semibold">
              {grossByWater.toLocaleString()} persons{' '}
              <span className="text-slate-400">({waterPercent}%)</span>
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-borderDark flex">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isWaterBottleneck
                  ? 'bg-gradient-to-r from-red-600 to-alertRed shadow-[0_0_10px_rgba(239,68,68,0.7)]'
                  : 'bg-gradient-to-r from-emerald-600 to-safeGreen'
              }`}
              style={{ width: `${Math.min(waterPercent, 100)}%` }}
            />
          </div>
        </div>

        {/* 3. Sanitation Units (1 toilet / 25 persons) */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-infoBlue" />
              <span>Sanitation Units (1:25 toilet ratio)</span>
            </span>
            <span className={`font-semibold ${isSiteB ? 'text-alertRed font-extrabold' : 'text-slate-200'}`}>
              {grossBySanitation.toLocaleString()} persons{' '}
              <span className="text-slate-400">({sanitationPercent}%)</span>
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-borderDark flex">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isSanitationBottleneck || isSiteB
                  ? 'bg-gradient-to-r from-red-600 to-alertRed shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse'
                  : 'bg-gradient-to-r from-emerald-600 to-safeGreen'
              }`}
              style={{ width: `${Math.min(sanitationPercent, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sphere Standards Compliance Note */}
      <div className="pt-2 border-t border-borderDark/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>SPHERE PROJECT 2018 GUIDELINE</span>
        <span className="text-infoBlue font-medium">FORMULA: MIN(A/3.5, W/15, T*25) - OCC</span>
      </div>
    </div>
  );
};
