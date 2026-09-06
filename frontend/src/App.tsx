import React, { useState } from 'react';
import { Header } from './components/Header';
import { DEFAULT_EVALUATION } from './data/baselineData';
import type { EvaluationResultResponse } from './types/suraksha';
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Compass,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Users,
  XCircle,
  Layers,
} from 'lucide-react';

export const App: React.FC = () => {
  const [evaluation] = useState<EvaluationResultResponse>(DEFAULT_EVALUATION);
  const { habitation, tacticalShelterImmediate, candidateSites, operationalDirectiveSummary } = evaluation;

  return (
    <div className="min-h-screen bg-bgDark text-slate-100 flex flex-col font-sans selection:bg-alertRed/30 selection:text-white">
      {/* Tactical Top Operations Header */}
      <Header />

      {/* Main Operations Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {/* SDMA Operational Directive Banner */}
        <section className="p-4 rounded-lg bg-alertRed/10 border border-alertRed/30 backdrop-blur-md">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-alertRed shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold tracking-wider text-alertRed uppercase">
                SDMA Mandatory Operational Directive
              </span>
              <p className="text-sm font-mono text-slate-200 leading-relaxed">
                {operationalDirectiveSummary}
              </p>
            </div>
          </div>
        </section>

        {/* Tactical Metrics Quick View Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Active Habitation Card */}
          <div className="tactical-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-alertRed" /> Origin Habitation
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-alertRed/20 text-alertRed border border-alertRed/40">
                {habitation.riskZone.replace(/_/g, ' ')}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">{habitation.name}</h2>
              <p className="text-xs font-mono text-slate-400">
                ID: {habitation.id} • Lat: {habitation.latitude.toFixed(4)}, Lng: {habitation.longitude.toFixed(4)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-borderDark text-xs font-mono">
              <div>
                <span className="text-slate-400 block">Population</span>
                <span className="text-slate-100 font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-infoBlue" />
                  {habitation.population.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Slope Angle</span>
                <span className="text-alertRed font-bold flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  {habitation.slopeDegrees}° (Critical)
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Composite Risk (CRI)</span>
                <span className="text-alertRed font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {habitation.compositeRiskIndex} / 100
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Red Zone Status</span>
                <span className="text-alertRed font-bold">
                  {habitation.isPermanentlyUnsuitable ? 'Declared Non-Mitigable' : 'Monitoring'}
                </span>
              </div>
            </div>
          </div>

          {/* Immediate Transit Triage (0-72h) */}
          <div className="tactical-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-warnAmber" /> Horizon 1 Transit
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-warnAmber/20 text-warnAmber border border-warnAmber/40">
                0-72H TRIAGE
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">{tacticalShelterImmediate.name}</h2>
              <p className="text-xs font-mono text-slate-400">
                Site ID: {tacticalShelterImmediate.siteId} • Distance: {tacticalShelterImmediate.distanceKm} km
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-borderDark text-xs font-mono">
              <div>
                <span className="text-slate-400 block">Effective Capacity</span>
                <span className="text-safeGreen font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {tacticalShelterImmediate.capacityAudit.effectiveCapacity.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Feasibility Score</span>
                <span className="text-slate-100 font-bold">
                  {tacticalShelterImmediate.feasibilityScore} / 100
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block">Operational Assessment</span>
                <span className="text-slate-300 text-[11px]">
                  {tacticalShelterImmediate.decisionJustification}
                </span>
              </div>
            </div>
          </div>

          {/* Permanent Relocation Enclave Status */}
          <div className="tactical-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-safeGreen" /> Horizon 2 Enclaves
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-safeGreen/20 text-safeGreen border border-safeGreen/40">
                {candidateSites.length} CANDIDATES
              </span>
            </div>
            <div className="space-y-2 pt-1">
              {candidateSites.map((site) => (
                <div
                  key={site.siteId}
                  className="p-2.5 rounded bg-slate-900/80 border border-borderDark flex items-center justify-between text-xs font-mono"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-200">{site.name}</div>
                    <div className="text-[11px] text-slate-400">
                      Cap: {site.capacityAudit.effectiveCapacity.toLocaleString()} | Headroom: {site.capacityAudit.residualHeadroom > 0 ? `+${site.capacityAudit.residualHeadroom}` : site.capacityAudit.residualHeadroom}
                    </div>
                  </div>
                  {site.recommendation === 'RECOMMENDED_PRIMARY' ? (
                    <span className="flex items-center gap-1 text-safeGreen font-bold text-[11px] bg-safeGreen/10 px-2 py-1 rounded border border-safeGreen/30">
                      <CheckCircle2 className="w-3 h-3" /> PRIMARY
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-alertRed font-bold text-[11px] bg-alertRed/10 px-2 py-1 rounded border border-alertRed/30">
                      <XCircle className="w-3 h-3" /> REJECTED
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phase F1 Completion Milestone Banner */}
        <section className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400 flex flex-col md:flex-row items-center justify-between gap-2">
          <span>
            SURAKSHA Core Engine v1.0.0 • Phase F1 Baseline Scaffold Initialized • Gate 4 Active
          </span>
          <span className="text-safeGreen flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-safeGreen" />
            Types, Tailwind & Baseline Data Store 100% Synchronized
          </span>
        </section>
      </main>
    </div>
  );
};

export default App;
