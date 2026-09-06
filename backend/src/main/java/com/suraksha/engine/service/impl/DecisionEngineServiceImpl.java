package com.suraksha.engine.service.impl;

import com.suraksha.engine.common.exception.BusinessRuleException;
import com.suraksha.engine.common.exception.ResourceNotFoundException;
import com.suraksha.engine.model.dto.CandidateSiteEvaluationDTO;
import com.suraksha.engine.model.dto.CapacityAuditResult;
import com.suraksha.engine.model.dto.EvaluationResultResponse;
import com.suraksha.engine.model.dto.RelocationEvaluationRequest;
import com.suraksha.engine.model.dto.request.EvaluateRelocationRequest;
import com.suraksha.engine.model.dto.response.*;
import com.suraksha.engine.model.entity.CandidateSite;
import com.suraksha.engine.model.entity.Habitation;
import com.suraksha.engine.model.entity.RelocationSite;
import com.suraksha.engine.model.enums.BottleneckType;
import com.suraksha.engine.model.enums.RecommendationStatus;
import com.suraksha.engine.model.enums.SiteType;
import com.suraksha.engine.repository.CandidateSiteRepository;
import com.suraksha.engine.repository.HabitationRepository;
import com.suraksha.engine.repository.RelocationSiteRepository;
import com.suraksha.engine.service.DecisionEngineService;
import com.suraksha.engine.service.engine.GeoScoringEngine;
import com.suraksha.engine.service.engine.impl.GeoScoringEngineImpl;
import com.suraksha.engine.service.engine.impl.SphereCapacityEngineImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class DecisionEngineServiceImpl implements DecisionEngineService {

    private static final Logger log = LoggerFactory.getLogger(DecisionEngineServiceImpl.class);

    public static final double HIMALAYAN_TERRAIN_TORTUOSITY_FACTOR = 1.326;

    private final HabitationRepository habitationRepository;
    private final CandidateSiteRepository candidateSiteRepository;
    private final RelocationSiteRepository relocationSiteRepository;
    private final com.suraksha.engine.service.engine.SphereCapacityEngine scientificSphereEngine;
    private final GeoScoringEngine geoScoringEngine;
    private final com.suraksha.engine.service.SphereCapacityEngine legacySphereEngine;

    @Autowired
    public DecisionEngineServiceImpl(HabitationRepository habitationRepository,
                                    @Autowired(required = false) CandidateSiteRepository candidateSiteRepository,
                                    @Autowired(required = false) RelocationSiteRepository relocationSiteRepository,
                                    @Autowired(required = false) com.suraksha.engine.service.SphereCapacityEngine legacySphereEngine) {
        this.habitationRepository = habitationRepository;
        this.candidateSiteRepository = candidateSiteRepository;
        this.relocationSiteRepository = relocationSiteRepository;
        this.scientificSphereEngine = new SphereCapacityEngineImpl();
        this.geoScoringEngine = new GeoScoringEngineImpl();
        this.legacySphereEngine = legacySphereEngine != null ? legacySphereEngine : new com.suraksha.engine.service.impl.SphereCapacityEngineImpl();
    }

    public DecisionEngineServiceImpl(HabitationRepository habitationRepository,
                                    RelocationSiteRepository relocationSiteRepository,
                                    com.suraksha.engine.service.SphereCapacityEngine legacySphereEngine) {
        this(habitationRepository, null, relocationSiteRepository, legacySphereEngine);
    }


    @Override
    public EvaluationResultResponse evaluateRelocation(RelocationEvaluationRequest request) {
        if (request == null || request.getHabitationId() == null || request.getHabitationId().isBlank()) {
            throw new BusinessRuleException("Habitation ID cannot be blank");
        }
        if (request.getSimulatedPopulation() != null && request.getSimulatedPopulation() <= 0) {
            throw new BusinessRuleException("Simulated population must be greater than zero");
        }

        Habitation habitation = habitationRepository.findById(request.getHabitationId())
                .orElseThrow(() -> new ResourceNotFoundException("Habitation", "id", request.getHabitationId()));

        int targetPopulation = (request.getSimulatedPopulation() != null && request.getSimulatedPopulation() > 0)
                ? request.getSimulatedPopulation()
                : habitation.getPopulation();

        List<CandidateSite> allSites = getOrCreateCandidateSites();

        // 1. Horizon 1: Immediate Tactical Shelter
        CandidateSite tacticalSite = allSites.stream()
                .filter(s -> s.getSiteType() == SiteType.TRANSIT_SHELTER || s.getSiteType() == SiteType.IMMEDIATE_SHELTER)
                .min(Comparator.comparingDouble(s -> GeoScoringEngineImpl.computeHaversineDistanceKm(
                        habitation.getLatitude(), habitation.getLongitude(), s.getLatitude(), s.getLongitude())))
                .orElse(null);

        CandidateSiteEvaluationDTO tacticalShelterDto = null;
        if (tacticalSite != null) {
            double distanceKm = GeoScoringEngineImpl.computeHaversineDistanceKm(
                    habitation.getLatitude(), habitation.getLongitude(),
                    tacticalSite.getLatitude(), tacticalSite.getLongitude());
            CapacityAuditResult capacityAudit = scientificSphereEngine.evaluateCapacity(tacticalSite, targetPopulation);
            double feasibilityScore = GeoScoringEngineImpl.computeSiteFeasibilityScore(tacticalSite, distanceKm);

            tacticalShelterDto = CandidateSiteEvaluationDTO.builder()
                    .siteId(tacticalSite.getId())
                    .name(tacticalSite.getName())
                    .siteType(tacticalSite.getSiteType())
                    .latitude(tacticalSite.getLatitude())
                    .longitude(tacticalSite.getLongitude())
                    .distanceKm(distanceKm)
                    .feasibilityScore(feasibilityScore)
                    .recommendation(RecommendationStatus.RECOMMENDED_PRIMARY)
                    .capacityAudit(capacityAudit)
                    .decisionJustification("Horizon 1 Immediate Emergency Transit Shelter (0-72h window). Proximity: "
                            + distanceKm + " km.")
                    .build();
        }

        // 2. Horizon 2: Relocation Enclaves
        List<CandidateSite> enclaveSites = allSites.stream()
                .filter(s -> s.getSiteType() == SiteType.RELOCATION_ENCLAVE
                        || s.getSiteType() == SiteType.MEDIUM_TERM_SITE
                        || s.getSiteType() == SiteType.PERMANENT_RESETTLEMENT)
                .collect(Collectors.toList());

        List<CandidateSiteEvaluationDTO> evaluatedSites = new ArrayList<>();
        for (CandidateSite site : enclaveSites) {
            double distanceKm = GeoScoringEngineImpl.computeHaversineDistanceKm(
                    habitation.getLatitude(), habitation.getLongitude(),
                    site.getLatitude(), site.getLongitude());
            CapacityAuditResult capacityAudit = scientificSphereEngine.evaluateCapacity(site, targetPopulation);
            double feasibilityScore = GeoScoringEngineImpl.computeSiteFeasibilityScore(site, distanceKm);

            RecommendationStatus status;
            String justification;

            if (site.getSlopeDegrees() != null && site.getSlopeDegrees() > 15.0) {
                status = RecommendationStatus.OPERATIONALLY_REJECTED;
                justification = "Steep terrain (" + site.getSlopeDegrees() + "°) exceeds structural stability threshold (15.0°).";
            } else if (site.getBridgeCutoffProbability() != null && site.getBridgeCutoffProbability() >= 0.50) {
                status = RecommendationStatus.OPERATIONALLY_REJECTED;
                justification = "Bridge cutoff probability (" + (int) (site.getBridgeCutoffProbability() * 100)
                        + "%) presents critical single-point-of-failure risk during monsoon surges.";
            } else if (capacityAudit.isDeficit()) {
                status = RecommendationStatus.CAPACITY_DEFICIT;
                justification = "Resource deficit: " + capacityAudit.getLimitingBottleneck()
                        + " bottleneck caps effective capacity at " + capacityAudit.getEffectiveCapacity()
                        + " (shortfall of " + Math.abs(capacityAudit.getResidualHeadroom()) + " evacuees).";
            } else {
                status = RecommendationStatus.RECOMMENDED_PRIMARY;
                justification = "Optimal candidate: Safe slope (" + site.getSlopeDegrees()
                        + "°), high access reliability, and sufficient carrying capacity ("
                        + capacityAudit.getEffectiveCapacity() + " capacity, +" + capacityAudit.getResidualHeadroom() + " headroom).";
            }

            evaluatedSites.add(CandidateSiteEvaluationDTO.builder()
                    .siteId(site.getId())
                    .name(site.getName())
                    .siteType(site.getSiteType())
                    .latitude(site.getLatitude())
                    .longitude(site.getLongitude())
                    .distanceKm(distanceKm)
                    .feasibilityScore(feasibilityScore)
                    .recommendation(status)
                    .capacityAudit(capacityAudit)
                    .decisionJustification(justification)
                    .build());
        }

        // Sort: Recommended first, followed by deficit and rejected, sorted by SFS descending
        evaluatedSites.sort((a, b) -> {
            int recCompare = Integer.compare(getRank(a.getRecommendation()), getRank(b.getRecommendation()));
            if (recCompare != 0) return recCompare;
            return Double.compare(b.getFeasibilityScore(), a.getFeasibilityScore());
        });

        // Ensure only top feasible is RECOMMENDED_PRIMARY
        boolean primaryFound = false;
        for (CandidateSiteEvaluationDTO dto : evaluatedSites) {
            if (dto.getRecommendation() == RecommendationStatus.RECOMMENDED_PRIMARY) {
                if (!primaryFound) {
                    primaryFound = true;
                } else {
                    dto.setRecommendation(RecommendationStatus.CONDITIONALLY_FEASIBLE);
                }
            }
        }

        // 3. Auto-Split Spillover Logic
        CandidateSiteEvaluationDTO primarySite = evaluatedSites.stream()
                .filter(s -> s.getRecommendation() == RecommendationStatus.RECOMMENDED_PRIMARY)
                .findFirst()
                .orElse(!evaluatedSites.isEmpty() ? evaluatedSites.get(0) : null);

        boolean requiresSpillover = false;
        Map<String, Integer> spilloverAllocation = new LinkedHashMap<>();

        if (primarySite != null) {
            int primaryCap = primarySite.getCapacityAudit().getEffectiveCapacity();
            if (targetPopulation > primaryCap) {
                requiresSpillover = true;
                spilloverAllocation.put(primarySite.getSiteId(), primaryCap);
                int overflow = targetPopulation - primaryCap;

                // Allocate overflow to tactical shelter or next feasible enclave
                if (tacticalShelterDto != null) {
                    spilloverAllocation.put(tacticalShelterDto.getSiteId(), overflow);
                } else {
                    spilloverAllocation.put("SECONDARY-OVERFLOW", overflow);
                }
            } else {
                requiresSpillover = false;
                spilloverAllocation.put(primarySite.getSiteId(), targetPopulation);
            }
        }

        // 4. Generate SDMA Operational Directive Summary
        String directiveSummary = buildOperationalDirective(habitation, targetPopulation, primarySite, requiresSpillover, spilloverAllocation);

        return EvaluationResultResponse.builder()
                .habitation(habitation)
                .tacticalShelterImmediate(tacticalShelterDto)
                .candidateSites(evaluatedSites)
                .operationalDirectiveSummary(directiveSummary)
                .requiresSpillover(requiresSpillover)
                .spilloverAllocation(spilloverAllocation)
                .build();
    }

    private int getRank(RecommendationStatus status) {
        if (status == null) return 4;
        return switch (status) {
            case RECOMMENDED_PRIMARY -> 1;
            case CONDITIONALLY_FEASIBLE -> 2;
            case CAPACITY_DEFICIT -> 3;
            case OPERATIONALLY_REJECTED -> 4;
        };
    }

    private String buildOperationalDirective(Habitation habitation, int targetPopulation,
                                            CandidateSiteEvaluationDTO primarySite,
                                            boolean requiresSpillover,
                                            Map<String, Integer> allocation) {
        if (primarySite == null) {
            return "SDMA EMERGENCY ALERT: No viable resettlement enclaves identified for " + habitation.getName();
        }

        if (requiresSpillover) {
            return String.format("SDMA TACTICAL DISPATCH DIRECTIVE: Evacuate %s (%d displaced). " +
                            "PRIMARY RELOCATION: %s (%s) allocated %d evacuees (100%% capacity saturation). " +
                            "SPILLOVER ROUTING: %s evacuees directed to secondary safe havens. " +
                            "Primary limiting resource: %s.",
                    habitation.getName(), targetPopulation,
                    primarySite.getName(), primarySite.getSiteId(),
                    allocation.get(primarySite.getSiteId()),
                    targetPopulation - allocation.get(primarySite.getSiteId()),
                    primarySite.getCapacityAudit().getLimitingBottleneck());
        } else {
            return String.format("SDMA TACTICAL DISPATCH DIRECTIVE: Evacuate %s (%d evacuees) to %s (%s). " +
                            "Effective capacity: %d (+%d surplus headroom). " +
                            "Limiting resource: %s. Rejection flags applied to high-risk cutoff routes.",
                    habitation.getName(), targetPopulation,
                    primarySite.getName(), primarySite.getSiteId(),
                    primarySite.getCapacityAudit().getEffectiveCapacity(),
                    primarySite.getCapacityAudit().getResidualHeadroom(),
                    primarySite.getCapacityAudit().getLimitingBottleneck());
        }
    }

    private List<CandidateSite> getOrCreateCandidateSites() {
        if (candidateSiteRepository != null) {
            List<CandidateSite> fromDb = candidateSiteRepository.findAll();
            if (!fromDb.isEmpty()) {
                return fromDb;
            }
        }

        // Default Chamoli Pilot Candidate Sites
        List<CandidateSite> seedSites = new ArrayList<>();
        seedSites.add(CandidateSite.builder()
                .id("SITE-C")
                .name("Govt Model Inter-College Grounds")
                .siteType(SiteType.TRANSIT_SHELTER)
                .latitude(30.4120)
                .longitude(79.3210)
                .usableAreaSqm(12000.0)
                .waterSupplyLpd(45000.0)
                .toiletCount(120)
                .existingOccupancy(150)
                .allocatedPopulation(0)
                .slopeDegrees(4.0)
                .multiRouteAccess(true)
                .bridgeCutoffProbability(0.02)
                .hospitalProximityKm(0.9)
                .livelihoodProximityKm(0.5)
                .build());

        seedSites.add(CandidateSite.builder()
                .id("SITE-A")
                .name("Gopeshwar Enclave")
                .siteType(SiteType.RELOCATION_ENCLAVE)
                .latitude(30.4080)
                .longitude(79.3190)
                .usableAreaSqm(18000.0)
                .waterSupplyLpd(65000.0)
                .toiletCount(140)
                .existingOccupancy(234)
                .allocatedPopulation(0)
                .slopeDegrees(8.5)
                .multiRouteAccess(true)
                .bridgeCutoffProbability(0.08)
                .hospitalProximityKm(1.8)
                .livelihoodProximityKm(2.2)
                .build());

        seedSites.add(CandidateSite.builder()
                .id("SITE-B")
                .name("Pipalkoti Shelf")
                .siteType(SiteType.RELOCATION_ENCLAVE)
                .latitude(30.4290)
                .longitude(79.4270)
                .usableAreaSqm(25000.0)
                .waterSupplyLpd(45000.0)
                .toiletCount(30)
                .existingOccupancy(200)
                .allocatedPopulation(0)
                .slopeDegrees(6.2)
                .multiRouteAccess(false)
                .bridgeCutoffProbability(0.66)
                .hospitalProximityKm(8.4)
                .livelihoodProximityKm(4.1)
                .build());

        if (candidateSiteRepository != null) {
            try {
                return candidateSiteRepository.saveAll(seedSites);
            } catch (Exception ignored) {
            }
        }
        return seedSites;
    }

    @Override
    public com.suraksha.engine.model.dto.response.EvaluationResultResponse evaluateRelocation(EvaluateRelocationRequest request) {
        log.info("Evaluating relocation for Habitation ID: {} with Simulated Population: {}",
                request.getHabitationId(), request.getSimulatedPopulation());

        Habitation habitation = habitationRepository.findById(request.getHabitationId())
                .orElseThrow(() -> new ResourceNotFoundException("Habitation", "id", request.getHabitationId()));

        int targetPopulation = (request.getSimulatedPopulation() != null && request.getSimulatedPopulation() > 0)
                ? request.getSimulatedPopulation()
                : habitation.getPopulation();

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

        List<RelocationSite> allSites = (relocationSiteRepository != null) ? relocationSiteRepository.findAll() : List.of();

        RelocationSite tacticalSite = allSites.stream()
                .filter(s -> "IMMEDIATE_SHELTER".equalsIgnoreCase(s.getHorizonType()))
                .findFirst()
                .orElse(null);
        TacticalShelterResponse tacticalShelter = null;
        if (tacticalSite != null) {
            double straightLineDist = calculateHaversineDistanceKm(
                    habitation.getLat(), habitation.getLng(),
                    tacticalSite.getLat(), tacticalSite.getLng()
            );
            double roadDistKm = Math.round((straightLineDist * HIMALAYAN_TERRAIN_TORTUOSITY_FACTOR) * 10.0) / 10.0;

            CapacityAuditBreakdownResponse capacityAudit = legacySphereEngine.calculateCapacity(tacticalSite, targetPopulation);

            tacticalShelter = new TacticalShelterResponse(
                    tacticalSite.getId(),
                    tacticalSite.getName(),
                    tacticalSite.getHorizonType(),
                    capacityAudit.getEffectiveCapacity(),
                    roadDistKm,
                    "VIABLE_FOR_IMMEDIATE_EVACUATION"
            );
        }

        List<RelocationSite> mediumTermSites = allSites.stream()
                .filter(s -> !"IMMEDIATE_SHELTER".equalsIgnoreCase(s.getHorizonType()))
                .collect(Collectors.toList());

        List<CandidateSiteEvaluationResponse> candidateEvaluations = new ArrayList<>();

        for (RelocationSite site : mediumTermSites) {
            double straightLineDist = calculateHaversineDistanceKm(
                    habitation.getLat(), habitation.getLng(),
                    site.getLat(), site.getLng()
            );

            CapacityAuditBreakdownResponse capacityAudit = legacySphereEngine.calculateCapacity(site, targetPopulation);

            double feasibilityScore = calculateSiteFeasibilityScore(
                    site.getHazardSafety(),
                    capacityAudit.getEffectiveCapacity(),
                    targetPopulation,
                    site.getRoadReliability(),
                    site.getHospitalDistKm(),
                    site.getLivelihoodScore()
            );

            String status;
            String justification;

            if (site.getRoadReliability() < 60.0) {
                status = "OPERATIONALLY_REJECTED";
                justification = String.format("Road connectivity reliability (%.1f%%) fails 60%% threshold; severe monsoon cutoff risk.", site.getRoadReliability());
            } else if (capacityAudit.getEffectiveCapacity() < targetPopulation) {
                status = "CAPACITY_DEFICIT";
                justification = String.format("Carrying capacity bottleneck (%s limits to %d persons, shortfall of %d).",
                        capacityAudit.getLimitingBottleneck(), capacityAudit.getEffectiveCapacity(), (targetPopulation - capacityAudit.getEffectiveCapacity()));
            } else {
                status = "RECOMMENDED_PRIMARY";
                justification = String.format("High feasibility score (%.1f), safe terrain, robust access (%.1f%%), and adequate headroom (+%d).",
                        feasibilityScore, site.getRoadReliability(), capacityAudit.getResidualHeadroom());
            }

            SiteIndicatorsResponse indicators = new SiteIndicatorsResponse(
                    site.getHazardSafety(),
                    site.getRoadReliability(),
                    site.getHospitalDistKm(),
                    site.getLivelihoodScore()
            );

            CandidateSiteEvaluationResponse evaluation = new CandidateSiteEvaluationResponse(
                    site.getId(),
                    site.getName(),
                    site.getHorizonType(),
                    feasibilityScore,
                    status,
                    capacityAudit,
                    indicators,
                    justification
            );

            candidateEvaluations.add(evaluation);
        }

        candidateEvaluations.sort((a, b) -> Double.compare(b.getFeasibilityScore(), a.getFeasibilityScore()));

        return new com.suraksha.engine.model.dto.response.EvaluationResultResponse(
                habitationSummary,
                tacticalShelter,
                candidateEvaluations
        );
    }

    @Override
    public double calculateHaversineDistanceKm(double lat1, double lng1, double lat2, double lng2) {
        final double R = 6371.0;
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
        double capacityScore = Math.min(100.0, (effectiveCapacity / Math.max(1.0, displacedPopulation)) * 100.0);
        double distanceScore = Math.max(0.0, 100.0 - (hospitalDistKm * 4.0));
        double infraScore = (roadReliability * 0.6) + (livelihoodScore * 0.4);

        double score = (capacityScore * 0.35) + (distanceScore * 0.25) + (hazardSafety * 0.20) + (infraScore * 0.20);
        return roundOneDecimal(Math.max(0.0, Math.min(100.0, score)));
    }

    private double roundOneDecimal(double val) {
        return BigDecimal.valueOf(val).setScale(1, RoundingMode.HALF_UP).doubleValue();
    }
}
