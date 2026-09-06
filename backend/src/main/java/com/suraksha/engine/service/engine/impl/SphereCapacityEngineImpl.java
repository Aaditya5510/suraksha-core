package com.suraksha.engine.service.engine.impl;

import com.suraksha.engine.model.dto.CapacityAuditResult;
import com.suraksha.engine.model.entity.CandidateSite;
import com.suraksha.engine.model.enums.BottleneckType;
import com.suraksha.engine.service.engine.SphereCapacityEngine;
import org.springframework.stereotype.Service;

@Service("scientificSphereCapacityEngine")
public class SphereCapacityEngineImpl implements SphereCapacityEngine {

    @Override
    public CapacityAuditResult evaluateCapacity(CandidateSite site, int targetEvacuees) {
        if (site == null) {
            throw new IllegalArgumentException("CandidateSite cannot be null");
        }

        // 1. Sphere Standards Gross Computations
        int grossArea = (int) Math.floor(site.getUsableAreaSqm() / 3.5);
        int grossWater = (int) Math.floor(site.getWaterSupplyLpd() / 15.0);
        int grossSanitation = site.getToiletCount() * 25;

        // 2. Identify Limiting Bottleneck (Priority on tie: SANITATION_UNITS > WATER_SUPPLY > COVERED_SPACE)
        BottleneckType limitingBottleneck;
        if (grossSanitation <= grossWater && grossSanitation <= grossArea) {
            limitingBottleneck = BottleneckType.SANITATION_UNITS;
        } else if (grossWater <= grossArea) {
            limitingBottleneck = BottleneckType.WATER_SUPPLY;
        } else {
            limitingBottleneck = BottleneckType.COVERED_SPACE;
        }

        // 3. Gross Capacity is the minimum of the three Sphere resource limits
        int grossCapacity = Math.min(grossArea, Math.min(grossWater, grossSanitation));

        // 4. Net Effective Capacity Deductions
        int existingOccupancy = site.getExistingOccupancy() != null ? site.getExistingOccupancy() : 0;
        int allocatedPopulation = site.getAllocatedPopulation() != null ? site.getAllocatedPopulation() : 0;
        int deduction = existingOccupancy + allocatedPopulation;

        int effectiveCapacity = Math.max(0, grossCapacity - deduction);
        int residualHeadroom = effectiveCapacity - targetEvacuees;
        boolean isDeficit = residualHeadroom < 0;

        return CapacityAuditResult.builder()
                .grossByArea(grossArea)
                .grossByWater(grossWater)
                .grossBySanitation(grossSanitation)
                .limitingBottleneck(limitingBottleneck)
                .grossCapacity(grossCapacity)
                .effectiveCapacity(effectiveCapacity)
                .residualHeadroom(residualHeadroom)
                .isDeficit(isDeficit)
                .build();
    }
}
