import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TacticalMap } from './components/TacticalMap';
import { SphereConstraintMeter } from './components/SphereConstraintMeter';
import { SurgeSimulator } from './components/SurgeSimulator';
import { SdmaDirectiveModal } from './components/SdmaDirectiveModal';
import { DEFAULT_EVALUATION } from './data/baselineData';
import { evaluateRelocation } from './services/apiService';
import type { EvaluationResultResponse, CandidateSiteEvaluationDTO } from './types/suraksha';
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Compass,
  ShieldCheck,
  TrendingUp,
  Users,
  XCircle,
  Layers,
  Crosshair,
  FileText,
  Clock,
  Zap,
} from 'lucide-react';

export const App: React.FC = () => {
  const [evaluation, setEvaluation] = useState<EvaluationResultResponse>(DEFAULT_EVALUATION);
  const [simulatedPopulation, setSimulatedPopulation] = useState<number>(2840);
  const [selectedSiteId, setSelectedSiteId] = useState<string>('SITE-A');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLiveBackend, setIsLiveBackend] = useState<boolean>(false);

  // Synchronize evaluation state with backend or local zero-failover engine
  useEffect(() => {
    let isSubscribed = true;

    evaluateRelocation('HAB-01', simulatedPopulation).then(({ data, isLive }) => {
      if (isSubscribed) {
        setEvaluation(data);
        setIsLiveBackend(isLive);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [simulatedPopulation]);

  const { habitation, tacticalShelterImmediate, candidateSites, operationalDirectiveSummary } = evaluation;

  // Find currently selected site for deep Sphere constraint analysis
  const currentSelectedSite: CandidateSiteEvaluationDTO =
    candidateSites.find((s) => s.siteId === selectedSiteId) || candidateSites[0];

  const siteA = candidateSites.find((s) => s.siteId === 'SITE-A') || candidateSites[0];
  const primaryCapacity = siteA.capacityAudit.effectiveCapacity; // 3266
  const transitCapacity = tacticalShelterImmediate.capacityAudit.effectiveCapacity; // 2850

  return (
    <div className="min-h-screen bg-bgDark text-slate-100 flex flex-col font-sans selection:bg-alertRed/30 selection:text-white">
      {/* Tactical Top Operations Header */}
      <Header isLive={isLiveBackend} />

      {/* Main Operations Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {/* Top Tactical KPI Ribbon */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* KPI 1: Displaced Souls */}
          <div className="tactical-card p-3.5 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-infoBlue" />
              <span>Evacuee Demand</span>
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl md:text-2xl font-mono font-extrabold text-white">
                {simulatedPopulation.toLocaleString()}
              </span>
              <span className="text-[10px] font-mono text-slate-400">souls</span>
            </div>
            <div className="text-[10px] font-mono text-amber-400">
              {simulatedPopulation > primaryCapacity ? '⚠️ Surge Exceeds Primary Cap' : '✓ Within Safe Headroom'}
            </div>
          </div>

          {/* KPI 2: Composite Risk Index (CRI) */}
          <div className="tactical-card p-3.5 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-alertRed" />
              <span>Composite Risk (CRI)</span>
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl md:text-2xl font-mono font-extrabold text-alertRed">
                {habitation.compositeRiskIndex}
              </span>
              <span className="text-[10px] font-mono text-slate-400">/ 100</span>
            </div>
            <div className="text-[10px] font-mono text-alertRed font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-alertRed animate-ping" />
              <span>CRITICAL RED ZONE</span>
            </div>
          </div>

          {/* KPI 3: Terrain Slope & Runout */}
          <div className="tactical-card p-3.5 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-alertRed" />
              <span>Slope & Hazard</span>
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl md:text-2xl font-mono font-extrabold text-amber-400">
                {habitation.slopeDegrees}°
              </span>
              <span className="text-[10px] font-mono text-slate-400">Angle</span>
            </div>
            <div className="text-[10px] font-mono text-slate-300">
              Landslide Index: <strong>88%</strong> • Flood: <strong>45%</strong>
            </div>
          </div>

          {/* KPI 4: Evacuation Horizon */}
          <div className="tactical-card p-3.5 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-safeGreen" />
              <span>Relocation Horizon</span>
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg md:text-xl font-mono font-extrabold text-safeGreen">
                0-72H + ENCLAVE
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-300">
              Triage: Site-C • Enclave: Site-A
            </div>
          </div>
        </section>

        {/* SDMA Operational Directive Banner */}
        <section className="p-4 rounded-xl bg-alertRed/10 border border-alertRed/30 backdrop-blur-md shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-alertRed shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-alertRed uppercase">
                  SDMA Statutory Evacuation Order Active
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-alertRed/20 text-alertRed border border-alertRed/40">
                  DISASTER MANAGEMENT ACT 2005 - SEC 38
                </span>
              </div>
              <p className="text-xs font-mono text-slate-300 leading-relaxed max-w-4xl">
                {operationalDirectiveSummary}
              </p>
            </div>
          </div>

          {/* Direct Trigger to Modal */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-alertRed hover:bg-red-600 text-white text-xs font-mono font-bold shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>GENERATE SDMA DIRECTIVE</span>
          </button>
        </section>

        {/* Central 2-Column Tactical Operations Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 of 12 / ~60%): Tactical Geospatial Map & Candidate Comparison */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tactical Map Container */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Crosshair className="w-4 h-4 text-alertRed" />
                  <span className="font-bold text-slate-200 uppercase tracking-wider">
                    Geospatial Tactical Assessment Viewport
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> LIVE ROUTING ACTIVE
                </span>
              </div>

              <TacticalMap
                evaluation={evaluation}
                selectedSiteId={selectedSiteId}
                onSelectSite={(siteId) => setSelectedSiteId(siteId)}
              />
            </div>

            {/* Candidate Comparison & Operational Rejection Card */}
            <div className="tactical-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-borderDark pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-safeGreen" />
                  <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                    Candidate Resettlement Enclave Comparison
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Click any site to inspect Sphere meters
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {candidateSites.map((site) => {
                  const isSelected = selectedSiteId === site.siteId;
                  const isRecommended = site.recommendation === 'RECOMMENDED_PRIMARY';
                  const headroom = site.capacityAudit.effectiveCapacity - simulatedPopulation;

                  return (
                    <div
                      key={site.siteId}
                      onClick={() => setSelectedSiteId(site.siteId)}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer font-mono text-xs space-y-2.5 ${
                        isSelected
                          ? 'bg-slate-800/95 border-infoBlue shadow-[0_0_15px_rgba(59,130,246,0.3)] ring-1 ring-infoBlue'
                          : 'bg-slate-900/80 border-borderDark hover:border-slate-600'
                      }`}
                    >
                      {/* Card Top */}
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{site.name}</span>
                        {isRecommended ? (
                          <span className="flex items-center gap-1 text-safeGreen font-bold text-[10px] bg-safeGreen/10 px-2 py-0.5 rounded border border-safeGreen/30">
                            <CheckCircle2 className="w-3 h-3" /> PRIMARY
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-alertRed font-bold text-[10px] bg-alertRed/10 px-2 py-0.5 rounded border border-alertRed/30">
                            <XCircle className="w-3 h-3" /> REJECTED
                          </span>
                        )}
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 bg-slate-950/60 p-2 rounded border border-slate-800">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Sphere Cap:</span>
                          <span className="font-bold text-white">
                            {site.capacityAudit.effectiveCapacity.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Headroom vs Demand:</span>
                          <span className={`font-bold ${headroom >= 0 ? 'text-safeGreen' : 'text-alertRed'}`}>
                            {headroom >= 0 ? `+${headroom}` : headroom}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Road Distance:</span>
                          <span className="text-slate-200">{site.distanceKm} km</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Feasibility (SFS):</span>
                          <span className="font-bold text-amber-400">{site.feasibilityScore} / 100</span>
                        </div>
                      </div>

                      {/* Decision Justification */}
                      <p className="text-[11px] text-slate-300 leading-snug">
                        {site.decisionJustification}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (5 of 12 / ~40%): What-If Surge Slider, Sphere Constraint Meters & Immediate Transit */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Dynamic What-If Population Surge Simulator */}
            <SurgeSimulator
              population={simulatedPopulation}
              onChange={(newPop) => setSimulatedPopulation(newPop)}
              primaryCapacity={primaryCapacity}
              transitCapacity={transitCapacity}
            />

            {/* 2. 3-Way Sphere Carrying-Capacity Meters */}
            <SphereConstraintMeter
              site={currentSelectedSite}
              simulatedPopulation={simulatedPopulation}
            />

            {/* 3. Horizon 1 Immediate Transit Triage Quick Card */}
            <div className="tactical-card p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-borderDark pb-2.5">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-warnAmber" /> Horizon 1 Immediate Staging
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-warnAmber/20 text-warnAmber border border-warnAmber/40">
                  0-72H TRIAGE
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">{tacticalShelterImmediate.name}</h4>
                <p className="text-xs font-mono text-slate-400">
                  Distance: {tacticalShelterImmediate.distanceKm} km • Intake Cap:{' '}
                  <strong className="text-emerald-400">
                    {tacticalShelterImmediate.capacityAudit.effectiveCapacity.toLocaleString()} evacuees
                  </strong>
                </p>
              </div>

              <div className="text-[11px] font-mono text-slate-300 bg-slate-900/90 p-2 rounded border border-borderDark leading-relaxed">
                {tacticalShelterImmediate.decisionJustification}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Floating Operations Action Bar */}
        <section className="p-4 rounded-xl bg-cardDark/95 border border-borderDark backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
            <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-safeGreen">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white">DECISION ENGINE OPERATIONAL & ZERO-FAILOVER CERTIFIED</div>
              <div className="text-slate-400 text-[11px]">
                Deterministic Pure-Java / TypeScript Sphere 2018 Carrying-Capacity Decision Core
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>DISPATCH OFFICIAL SDMA DIRECTIVE</span>
          </button>
        </section>
      </main>

      {/* Printable SDMA Evacuation Directive Modal */}
      <SdmaDirectiveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        evaluation={evaluation}
        simulatedPopulation={simulatedPopulation}
      />
    </div>
  );
};

export default App;
