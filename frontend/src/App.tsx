import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, type NavTab } from './components/layout/Navbar';
import { SituationMapView } from './components/views/SituationMapView';
import { ShelterMatrixView } from './components/views/ShelterMatrixView';
import { DispatchLogisticsView } from './components/views/DispatchLogisticsView';
import { SdmaDirectiveModal } from './components/SdmaDirectiveModal';
import { BASELINE_HABITATIONS, DEFAULT_EVALUATION } from './data/baselineData';
import { fetchEvaluation } from './services/apiService';
import type { EvaluationResultResponse, Habitation } from './types/suraksha';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('map');
  const [selectedHabitationId, setSelectedHabitationId] = useState<string>('HAB-01');
  const [evaluation, setEvaluation] = useState<EvaluationResultResponse>(DEFAULT_EVALUATION);
  const [simulatedPopulation, setSimulatedPopulation] = useState<number>(2840);
  const [selectedSiteId, setSelectedSiteId] = useState<string>('SITE-A');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLiveBackend, setIsLiveBackend] = useState<boolean>(false);

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

  // Debounced population sync to avoid flooding backend requests while dragging slider
  useEffect(() => {
    const timer = setTimeout(() => {
      loadEvaluation(selectedHabitationId, simulatedPopulation);
    }, 120);

    return () => clearTimeout(timer);
  }, [selectedHabitationId, simulatedPopulation, loadEvaluation]);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-red-500/30 selection:text-white">
      {/* 1. Sleek Modern Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        isLive={isLiveBackend}
        onExportOrder={() => setIsModalOpen(true)}
      />

      {/* 2. Main 3-View Tab Content */}
      <main className="flex-1 w-full flex flex-col">
        {activeTab === 'map' && (
          <SituationMapView
            evaluation={evaluation}
            selectedHabitationId={selectedHabitationId}
            onSelectHabitation={handleHabitationChange}
            selectedHabitation={selectedHabitation}
            selectedSiteId={selectedSiteId}
            onSelectSite={(siteId) => setSelectedSiteId(siteId)}
          />
        )}

        {activeTab === 'shelter' && (
          <div className="flex-1 bg-[#07090e]">
            <ShelterMatrixView
              evaluation={evaluation}
              selectedHabitation={selectedHabitation}
              simulatedPopulation={simulatedPopulation}
              onPopulationChange={handlePopulationChange}
              selectedSiteId={selectedSiteId}
              onSelectSite={(siteId) => setSelectedSiteId(siteId)}
            />
          </div>
        )}

        {activeTab === 'dispatch' && (
          <div className="flex-1 bg-[#07090e]">
            <DispatchLogisticsView
              evaluation={evaluation}
              selectedHabitation={selectedHabitation}
              simulatedPopulation={simulatedPopulation}
            />
          </div>
        )}
      </main>

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

export default App;
