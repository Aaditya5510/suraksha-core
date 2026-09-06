package com.suraksha.engine.service.impl;

import com.suraksha.engine.common.exception.ResourceNotFoundException;
import com.suraksha.engine.model.dto.request.EvaluateRelocationRequest;
import com.suraksha.engine.model.dto.response.*;
import com.suraksha.engine.model.entity.Habitation;
import com.suraksha.engine.model.entity.RelocationSite;
import com.suraksha.engine.repository.HabitationRepository;
import com.suraksha.engine.repository.RelocationSiteRepository;
import com.suraksha.engine.service.DecisionEngineService;
import com.suraksha.engine.service.SphereCapacityEngine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class DecisionEngineServiceImpl implements DecisionEngineService {

    private static final Logger log = LoggerFactory.getLogger(DecisionEngineServiceImpl.class);

    // Mountain road tortuosity factor for Himalayan gorge corridors (road distance vs straight-line)
    public static final double HIMALAYAN_TERRAIN_TORTUOSITY_FACTOR = 1.326;

    private final HabitationRepository habitationRepository;
    private final RelocationSiteRepository relocationSiteRepository;
    private final SphereCapacityEngine sphereCapacityEngine;

    public DecisionEngineServiceImpl(HabitationRepository habitationRepository,
                                    RelocationSiteRepository relocationSiteRepository,
                                    SphereCapacityEngine sphereCapacityEngine) {
        this.habitationRepository = habitationRepository;
        this.relocationSiteRepository = relocationSiteRepository;
        this.sphereCapacityEngine = sphereCapacityEngine;
    }

    @Override
    public EvaluationResultResponse evaluateRelocation(EvaluateRelocationRequest request) {
        log.info("Evaluating relocation for Habitation ID: {} with Simulated Population: {}",
                request.getHabitationId(), request.getSimulatedPopulation());

        Habitation habitation = habitationRepository.findById(request.getHabitationId())
                .orElseThrow(() -> new ResourceNotFoundException("Habitation", "id", request.getHabitationId()));

        int targetPopulation = (request.getSimulatedPopulation() != null && request.getSimulatedPopulation() > 0)
                ? request.getSimulatedPopulation()
                : habitation.getPopulation();

        // 1. Build Habitation Summary DTO
        HabitationSummaryResponse habitationSummary = new HabitationSummaryResponse(
                habitation.getId(),
                habitation.getName(),
                habitation.getPopulation(),
                habitation.getCompositeRisk(),
                habitation.getRiskZone(),
                habitation.getHorizon(),
                habitation.getLandslideRisk(),
                habitation.getFloodRisk(),
                habitation.getSlopeDeg(),
                habitation.getVulnerabilityScore(),
                habitation.getCutoffRisk()
        );

        // 2. Fetch all sites and partition by Horizon
        List<RelocationSite> allSites = relocationSiteRepository.findAll();

        // Find Tactical Immediate Shelter (Horizon 1)
        RelocationSite tacticalSite = allSites.stream()
                .filter(site -> "IMMEDIATE_SHELTER".equalsIgnoreCase(site.getHorizonType()))
                .findFirst()
                .orElse(null);

        TacticalShelterResponse tacticalShelterResponse;
        if (tacticalSite != null) {
            double straightLineKm = calculateHaversineDistanceKm(
                    habitation.getLat(), habitation.getLng(),
                    tacticalSite.getLat(), tacticalSite.getLng()
            );
            double distanceKm = Math.round((straightLineKm * HIMALAYAN_TERRAIN_TORTUOSITY_FACTOR) * 10.0) / 10.0;

            int effectiveCapacity = sphereCapacityEngine.calculateNetEffectiveCapacity(
                    tacticalSite.getUsableAreaSqm(),
                    tacticalSite.getWaterLpd(),
                    tacticalSite.getToiletsCount(),
                    tacticalSite.getExistingOccupancy()
            );

            tacticalShelterResponse = new TacticalShelterResponse(
                    tacticalSite.getId(),
                    tacticalSite.getName(),
                    tacticalSite.getHorizonType(),
                    effectiveCapacity,
                    distanceKm,
                    "VIABLE_FOR_IMMEDIATE_EVACUATION"
            );
        } else {
            tacticalShelterResponse = new TacticalShelterResponse(
                    "NONE", "No Designated Transit Shelter", "NONE", 0, 0.0, "NOT_AVAILABLE"
            );
        }

        // 3. Evaluate Candidate Resettlement Sites (Horizon 2)
        List<CandidateSiteEvaluationResponse> candidateSites = new ArrayList<>();

        List<RelocationSite> mediumTermSites = allSites.stream()
                .filter(site -> !"IMMEDIATE_SHELTER".equalsIgnoreCase(site.getHorizonType()))
                .toList();

        for (RelocationSite site : mediumTermSites) {
            CapacityAuditBreakdownResponse capacityAudit = sphereCapacityEngine.calculateCapacity(site, targetPopulation);

            double feasibilityScore = calculateSiteFeasibilityScore(
                    site.getHazardSafety(),
                    capacityAudit.getEffectiveCapacity(),
                    targetPopulation,
                    site.getRoadReliability(),
                    site.getHospitalDistKm(),
                    site.getLivelihoodScore()
            );

            // Rejection Gates & Recommendation Logic
            String recommendation;
            String decisionJustification;

            if (site.getRoadReliability() < 40.0 || site.getToiletsCount() < 40) {
                recommendation = "OPERATIONALLY_REJECTED";
                decisionJustification = String.format(
                        "Operationally rejected. Despite %,.0f sqm land area, acute sanitation bottleneck (%d toilets = %d gross) yields only %d net effective capacity, creating a severe deficit of %d persons. Critical access road reliability of %.0f%% breaches minimum safety threshold (40%%).",
                        site.getUsableAreaSqm(),
                        site.getToiletsCount(),
                        capacityAudit.getGrossBySanitation(),
                        capacityAudit.getEffectiveCapacity(),
                        capacityAudit.getResidualHeadroom(),
                        site.getRoadReliability()
                );
            } else if (capacityAudit.getResidualHeadroom() < 0) {
                recommendation = "CAPACITY_DEFICIT";
                decisionJustification = String.format(
                        "Capacity deficit detected. Maximum absorbing capacity (%d persons) is insufficient for displaced load of %d (Deficit: %d). Requires multi-site split allocation.",
                        capacityAudit.getEffectiveCapacity(),
                        targetPopulation,
                        capacityAudit.getResidualHeadroom()
                );
            } else {
                recommendation = "RECOMMENDED_PRIMARY";
                decisionJustification = String.format(
                        "Recommended as primary relocation haven. Absorbs entire displaced population of %d with +%d positive headroom. %s is the binding constraint (%,d net capacity). Robust road reliability (%.0f%%) and secondary hospital proximity (%.1f km).",
                        targetPopulation,
                        capacityAudit.getResidualHeadroom(),
                        capacityAudit.getLimitingBottleneck().replace("_", " "),
                        capacityAudit.getEffectiveCapacity(),
                        site.getRoadReliability(),
                        site.getHospitalDistKm()
                );
            }

            SiteIndicatorsResponse indicators = new SiteIndicatorsResponse(
                    site.getHazardSafety(),
                    site.getRoadReliability(),
                    site.getHospitalDistKm(),
                    site.getLivelihoodScore()
            );

            candidateSites.add(new CandidateSiteEvaluationResponse(
                    site.getId(),
                    site.getName(),
                    site.getHorizonType(),
                    feasibilityScore,
                    recommendation,
                    capacityAudit,
                    indicators,
                    decisionJustification
            ));
        }

        // Sort candidates by feasibility score descending
        candidateSites.sort((a, b) -> Double.compare(b.getFeasibilityScore(), a.getFeasibilityScore()));

        return new EvaluationResultResponse(habitationSummary, tacticalShelterResponse, candidateSites);
    }

    @Override
    public double calculateHaversineDistanceKm(double lat1, double lng1, double lat2, double lng2) {
        final double R = 6371.0; // Earth's mean radius in kilometers
        double dLat = Math.toRadians(lat2 - lat1);
        double dLng = Math.toRadians(lng2 - lng1);
        double a = Math.sin(dLat / 2.0) * Math.sin(dLat / 2.0)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLng / 2.0) * Math.sin(dLng / 2.0);
        double c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
        return R * c;
    }

    @Override
    public double calculateCompositeRiskIndex(double landslideRisk, double floodRisk, double slopeDeg,
                                             double vulnerabilityScore, double cutoffRisk) {
        double hazardComposite = (0.60 * landslideRisk) + (0.40 * floodRisk);
        double terrainMultiplier = 1.0 + (slopeDeg / 90.0);
        double rawCri = (0.40 * hazardComposite * terrainMultiplier)
                + (0.30 * vulnerabilityScore)
                + (0.30 * cutoffRisk);
        return Math.min(100.0, Math.round(rawCri * 10.0) / 10.0);
    }

    @Override
    public double calculateSiteFeasibilityScore(double hazardSafety, double effectiveCapacity, int displacedPopulation,
                                               double roadReliability, double hospitalDistKm, double livelihoodScore) {
        double capacityAdequacy = Math.min(100.0, (effectiveCapacity / (double) displacedPopulation) * 100.0);
        double hospitalScore = Math.max(0.0, 100.0 - (hospitalDistKm * 4.0));
        double rawSfs = (0.30 * hazardSafety)
                + (0.25 * capacityAdequacy)
                + (0.20 * roadReliability)
                + (0.15 * hospitalScore)
                + (0.10 * livelihoodScore);
        return Math.round(rawSfs * 100.0) / 100.0;
    }
}
