package com.suraksha.engine.service.engine;

import com.suraksha.engine.model.dto.CapacityAuditResult;
import com.suraksha.engine.model.entity.CandidateSite;

public interface SphereCapacityEngine {

    CapacityAuditResult evaluateCapacity(CandidateSite site, int targetEvacuees);
}
