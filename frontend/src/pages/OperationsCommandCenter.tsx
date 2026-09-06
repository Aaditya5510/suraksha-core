import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { EocSidebar, type EocNavModule } from '../components/layout/EocSidebar';
import { EocKpiRibbon } from '../components/EocKpiRibbon';
import { EocTacticalMap } from '../components/eoc/EocTacticalMap';
import { EocInspectionDrawer } from '../components/eoc/EocInspectionDrawer';
import { HabitationTriageView } from '../components/views/HabitationTriageView';
import { ShelterMatrixView } from '../components/views/ShelterMatrixView';
import { DispatchLogisticsView } from '../components/views/DispatchLogisticsView';
import { StatutoryOrdersView } from '../components/views/StatutoryOrdersView';
import { SdmaDirectiveModal } from '../components/SdmaDirectiveModal';
import { BASELINE_HABITATIONS, DEFAULT_EVALUATION } from '../data/baselineData';
import { fetchEvaluation } from '../services/apiService';
import type { EvaluationResultResponse, Habitation } from '../types/suraksha';
import {
  Workflow,
  Compass,
} from 'lucide-react';

export const OperationsCommandCenter: React.FC = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState<EocNavModule>('dashboard');
  const [selectedHabitationId, setSelectedHabitationId] = useState<string>('HAB-01');
  const [evaluation, setEvaluation] = useState<EvaluationResultResponse>(DEFAULT_EVALUATION);
  const [simulatedPopulation, setSimulatedPopulation] = useState<number>(2840);
  const [selectedSiteId, setSelectedSiteId] = useState<string>('SITE-A');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLiveBackend, setIsLiveBackend] = useState<boolean>(false);
  const [isDrawerCollapsed, setIsDrawerCollapsed] = useState<boolean>(false);

  // Active selected habitation record
  const selectedHabitation: Habitation =
    BASELINE_HABITATIONS.find((h) => h.id === selectedHabitationId) || BASELINE_HABITATIONS[0];

  // Core reactive evaluation dispatcher
  const loadEvaluation = useCallback(async (habId: string, pop: number) => {
    try {
      const { data, isLive } = await fetchEvaluation(habId, pop);
      setEvaluation(data);
      setIsLiveBackend(isLive);
    } catch (_err) {
      // Handled in apiService offline fallback
    }
  }, []);

  // Handler when user selects a different crisis sector / habitation
  const handleHabitationChange = (habId: string) => {
    setSelectedHabitationId(habId);
    const hab = BASELINE_HABITATIONS.find((h) => h.id === habId);
    const newPop = hab ? hab.population : simulatedPopulation;
    setSimulatedPopulation(newPop);
    loadEvaluation(habId, newPop);
  };

  // Handler when user moves population stress slider
  const handlePopulationChange = (newPop: number) => {
    setSimulatedPopulation(newPop);
  };

  // Handler when user selects a candidate site from map pin or drawer tab
  const handleSelectSite = (siteId: string) => {
    setSelectedSiteId(siteId);
    setIsDrawerCollapsed(false); // Automatically expand inspection drawer
  };

  // Handler to focus map from Triage view
  const handleFocusOnMap = (habId: string) => {
    handleHabitationChange(habId);
    setActiveModule('dashboard');
  };

  // Debounced population sync to avoid flooding backend requests while dragging slider
  useEffect(() => {
    const timer = setTimeout(() => {
      loadEvaluation(selectedHabitationId, simulatedPopulation);
    }, 120);

    return () => clearTimeout(timer);
  }, [selectedHabitationId, simulatedPopulation, loadEvaluation]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#07090e] text-slate-100 font-sans select-none">
      {/* 1. Left Dedicated Navigation Sidebar */}
      <EocSidebar
        activeModule={activeModule}
        onSelectModule={(module) => setActiveModule(module)}
        selectedHabitationId={selectedHabitationId}
        onSelectHabitation={handleHabitationChange}
        isLive={isLiveBackend}
        onOpenOrdersModal={() => setIsModalOpen(true)}
      />

      {/* 2. Main Enterprise Command Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Operational Status Bar */}
        <header className="h-14 bg-[#0a0d16] border-b border-gray-800 px-4 md:px-6 flex items-center justify-between shrink-0 font-mono text-xs">
          {/* Active Sector Readout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-400 uppercase text-[10px] font-bold">ACTIVE SECTOR:</span>
              <span className="font-extrabold text-white text-xs">
                {selectedHabitation.id}: {selectedHabitation.name.toUpperCase()}
              </span>
            </div>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-[11px]">
              <span>COORDS:</span>
              <span className="text-amber-400 font-semibold">
                {selectedHabitation.latitude.toFixed(4)}° N, {selectedHabitation.longitude.toFixed(4)}° E
              </span>
            </div>
          </div>

          {/* Right Status Actions */}
          <div className="flex items-center gap-3">
            {/* Elegant System Status Indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-gray-800 text-[11px] font-medium">
              <span className={`w-2 h-2 rounded-full ${isLiveBackend ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-500'}`} />
              <span className="text-slate-300">System Online</span>
            </div>

            {/* Public Pipeline Link */}
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-700 hover:border-cyan-500/50 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-[11px] transition-all"
            >
              <Workflow className="w-3.5 h-3.5 text-cyan-400" />
              <span>Decision Pipeline</span>
            </button>
          </div>
        </header>

        {/* Top 6-Card KPI Ribbon */}
        <EocKpiRibbon
          evaluation={evaluation}
          selectedHabitation={selectedHabitation}
          simulatedPopulation={simulatedPopulation}
        />

        {/* Main Work Viewport */}
        <div className="flex-1 flex overflow-hidden relative">
          {activeModule === 'dashboard' ? (
            <>
              {/* Clean Map Viewport without heavy overlays */}
              <main className="flex-1 h-full relative overflow-hidden bg-[#07090e]">
                <EocTacticalMap
                  evaluation={evaluation}
                  selectedHabitationId={selectedHabitationId}
                  onSelectHabitation={handleHabitationChange}
                  selectedHabitation={selectedHabitation}
                  selectedSiteId={selectedSiteId}
                  onSelectSite={handleSelectSite}
                  simulatedPopulation={simulatedPopulation}
                />
              </main>

              {/* Right-Hand Inspection Drawer (380px, Docked & Collapsible) */}
              <EocInspectionDrawer
                evaluation={evaluation}
                selectedHabitation={selectedHabitation}
                simulatedPopulation={simulatedPopulation}
                onPopulationChange={handlePopulationChange}
                selectedSiteId={selectedSiteId}
                onSelectSite={handleSelectSite}
                onOpenDirectiveModal={() => setIsModalOpen(true)}
                isCollapsed={isDrawerCollapsed}
                onToggleCollapse={() => setIsDrawerCollapsed(!isDrawerCollapsed)}
              />
            </>
          ) : activeModule === 'triage' ? (
            <HabitationTriageView
              selectedHabitationId={selectedHabitationId}
              onSelectHabitation={handleHabitationChange}
              onFocusOnMap={handleFocusOnMap}
            />
          ) : activeModule === 'sphere' ? (
            <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-[#07090e]">
              <ShelterMatrixView
                evaluation={evaluation}
                selectedHabitation={selectedHabitation}
                simulatedPopulation={simulatedPopulation}
                onPopulationChange={handlePopulationChange}
                selectedSiteId={selectedSiteId}
                onSelectSite={handleSelectSite}
              />
            </div>
          ) : activeModule === 'fleet' ? (
            <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-[#07090e]">
              <DispatchLogisticsView
                evaluation={evaluation}
                selectedHabitation={selectedHabitation}
                simulatedPopulation={simulatedPopulation}
              />
            </div>
          ) : (
            <StatutoryOrdersView
              evaluation={evaluation}
              selectedHabitation={selectedHabitation}
              simulatedPopulation={simulatedPopulation}
              onOpenModal={() => setIsModalOpen(true)}
            />
          )}
        </div>
      </div>

      {/* 3. Printable SDMA Evacuation Directive Modal */}
      <SdmaDirectiveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        evaluation={evaluation}
        simulatedPopulation={simulatedPopulation}
      />
    </div>
  );
};
