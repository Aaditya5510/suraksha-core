import React from 'react';
import type { CandidateSiteEvaluationDTO } from '../types/suraksha';
import {
  ShieldAlert,
  Droplets,
  Maximize2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface SphereConstraintMeterProps {
  site: CandidateSiteEvaluationDTO;
  simulatedPopulation: number;
}

export const SphereConstraintMeter: React.FC<SphereConstraintMeterProps> = ({
  site,
  simulatedPopulation,
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

  // Percentage calculations against simulated demand
  const areaPercent = Math.min(Math.round((grossByArea / simulatedPopulation) * 100), 100);
  const waterPercent = Math.min(Math.round((grossByWater / simulatedPopulation) * 100), 100);
  const sanitationPercent = Math.min(Math.round((grossBySanitation / simulatedPopulation) * 100), 100);

  const isAreaBottleneck = limitingBottleneck === 'COVERED_SPACE';
  const isWaterBottleneck = limitingBottleneck === 'WATER_SUPPLY';
  const isSanitationBottleneck = limitingBottleneck === 'SANITATION_UNITS';

  return (
    <div className="tactical-card p-4 space-y-4">
      {/* Header & Bottleneck Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-borderDark pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Sphere Carrying-Capacity Breakdown
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {siteId}
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 mt-0.5">
            {name}
          </h3>
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

      {/* Binding Bottleneck Alert Banner if present */}
      {limitingBottleneck !== 'NONE' && (
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
              . Even if land/water are abundant, sanitation caps maximum safe shelter intake.
            </p>
          </div>
        </div>
      )}

      {/* 3 Sphere Constraint Meters */}
      <div className="space-y-3.5">
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
            <span className="text-slate-200 font-semibold">
              {grossBySanitation.toLocaleString()} persons{' '}
              <span className="text-slate-400">({sanitationPercent}%)</span>
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-borderDark flex">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isSanitationBottleneck
                  ? 'bg-gradient-to-r from-red-600 to-alertRed shadow-[0_0_10px_rgba(239,68,68,0.7)]'
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
