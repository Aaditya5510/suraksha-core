package com.suraksha.engine.service;

import com.suraksha.engine.model.dto.response.CapacityAuditBreakdownResponse;
import com.suraksha.engine.model.entity.RelocationSite;

public interface SphereCapacityEngine {

    CapacityAuditBreakdownResponse calculateCapacity(RelocationSite site, int targetPopulation);

    int calculateGrossCapacity(double usableAreaSqm, int waterLpd, int toiletsCount);

    int calculateNetEffectiveCapacity(double usableAreaSqm, int waterLpd, int toiletsCount, int existingOccupancy);
}
