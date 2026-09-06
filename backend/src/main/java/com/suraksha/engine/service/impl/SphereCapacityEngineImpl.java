package com.suraksha.engine.service.impl;

import com.suraksha.engine.model.dto.response.CapacityAuditBreakdownResponse;
import com.suraksha.engine.model.entity.RelocationSite;
import com.suraksha.engine.service.SphereCapacityEngine;
import org.springframework.stereotype.Service;

@Service
public class SphereCapacityEngineImpl implements SphereCapacityEngine {

    public static final double SPHERE_SPACE_PER_PERSON_SQM = 3.5;
    public static final double SPHERE_WATER_PER_PERSON_LPD = 15.0;
    public static final int SPHERE_PEOPLE_PER_TOILET = 25;

    @Override
    public CapacityAuditBreakdownResponse calculateCapacity(RelocationSite site, int targetPopulation) {
        if (site == null) {
            throw new IllegalArgumentException("RelocationSite cannot be null");
        }

        int grossByArea = (int) Math.floor(site.getUsableAreaSqm() / SPHERE_SPACE_PER_PERSON_SQM);
        int grossByWater = (int) Math.floor(site.getWaterLpd() / SPHERE_WATER_PER_PERSON_LPD);
        int grossBySanitation = site.getToiletsCount() * SPHERE_PEOPLE_PER_TOILET;

        int grossCapacity = Math.min(grossByArea, Math.min(grossByWater, grossBySanitation));
        int effectiveCapacity = Math.max(0, grossCapacity - site.getExistingOccupancy());
        int residualHeadroom = effectiveCapacity - targetPopulation;
        boolean isDeficit = residualHeadroom < 0;

        String limitingBottleneck;
        if (grossCapacity == grossByWater) {
            limitingBottleneck = "POTABLE_WATER";
        } else if (grossCapacity == grossBySanitation) {
            limitingBottleneck = "SANITATION_TOILETS";
        } else {
            limitingBottleneck = "SHELTER_SPACE";
        }

        return new CapacityAuditBreakdownResponse(
                grossByArea,
                grossByWater,
                grossBySanitation,
                limitingBottleneck,
                effectiveCapacity,
                residualHeadroom,
                isDeficit
        );
    }

    @Override
    public int calculateGrossCapacity(double usableAreaSqm, int waterLpd, int toiletsCount) {
        int grossByArea = (int) Math.floor(usableAreaSqm / SPHERE_SPACE_PER_PERSON_SQM);
        int grossByWater = (int) Math.floor(waterLpd / SPHERE_WATER_PER_PERSON_LPD);
        int grossBySanitation = toiletsCount * SPHERE_PEOPLE_PER_TOILET;
        return Math.min(grossByArea, Math.min(grossByWater, grossBySanitation));
    }

    @Override
    public int calculateNetEffectiveCapacity(double usableAreaSqm, int waterLpd, int toiletsCount, int existingOccupancy) {
        int gross = calculateGrossCapacity(usableAreaSqm, waterLpd, toiletsCount);
        return Math.max(0, gross - existingOccupancy);
    }
}
