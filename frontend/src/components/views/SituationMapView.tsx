import React from 'react';
import type { EvaluationResultResponse, Habitation } from '../../types/suraksha';
import { EocTacticalMap } from '../eoc/EocTacticalMap';
import { IncidentQueueDrawer } from '../eoc/IncidentQueueDrawer';
import { ResourceConstraintDock } from '../eoc/ResourceConstraintDock';

interface SituationMapViewProps {
  evaluation: EvaluationResultResponse;
  selectedHabitationId: string;
  onSelectHabitation: (habId: string) => void;
  selectedHabitation: Habitation;
  selectedSiteId: string;
  onSelectSite: (siteId: string) => void;
  simulatedPopulation: number;
  onPopulationChange: (pop: number) => void;
  onOpenDirectiveModal: () => void;
}

export const SituationMapView: React.FC<SituationMapViewProps> = ({
  evaluation,
  selectedHabitationId,
  onSelectHabitation,
  selectedHabitation,
  selectedSiteId,
  onSelectSite,
  simulatedPopulation,
  onPopulationChange,
  onOpenDirectiveModal,
}) => {
  const primaryCap =
    evaluation.candidateSites.find((s) => s.siteId === 'SITE-A')?.capacityAudit
      .effectiveCapacity || 3266;

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#07090e] overflow-hidden select-none">
      {/* 1. Full-Screen Background EOC Tactical Leaflet Map */}
      <div className="absolute inset-0 z-0">
        <EocTacticalMap
          evaluation={evaluation}
          selectedHabitationId={selectedHabitationId}
          onSelectHabitation={onSelectHabitation}
          selectedHabitation={selectedHabitation}
          selectedSiteId={selectedSiteId}
          onSelectSite={onSelectSite}
          simulatedPopulation={simulatedPopulation}
        />
      </div>

      {/* 2. Left Overlay: Multi-Habitation Active Incident Queue & Demand Stepper (330px) */}
      <div className="absolute top-4 left-4 z-[1000] max-h-[calc(100vh-5.5rem)] overflow-y-auto custom-scrollbar pointer-events-auto pr-1">
        <IncidentQueueDrawer
          selectedHabitationId={selectedHabitationId}
          onSelectHabitation={onSelectHabitation}
          selectedHabitation={selectedHabitation}
          simulatedPopulation={simulatedPopulation}
          onPopulationChange={onPopulationChange}
          primaryCapacity={primaryCap}
        />
      </div>

      {/* 3. Right Overlay: Dynamic Resource & Sphere Constraint Dock (360px) */}
      <div className="absolute top-4 right-4 z-[1000] max-h-[calc(100vh-5.5rem)] overflow-y-auto custom-scrollbar pointer-events-auto pl-1">
        <ResourceConstraintDock
          evaluation={evaluation}
          simulatedPopulation={simulatedPopulation}
          selectedSiteId={selectedSiteId}
          onSelectSite={onSelectSite}
          onOpenDirectiveModal={onOpenDirectiveModal}
        />
      </div>
    </div>
  );
};
