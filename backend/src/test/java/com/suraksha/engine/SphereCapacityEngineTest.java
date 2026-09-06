package com.suraksha.engine;

import com.suraksha.engine.model.dto.CapacityAuditResult;
import com.suraksha.engine.model.entity.CandidateSite;
import com.suraksha.engine.model.enums.BottleneckType;
import com.suraksha.engine.model.enums.SiteType;
import com.suraksha.engine.service.engine.GeoScoringEngine;
import com.suraksha.engine.service.engine.SphereCapacityEngine;
import com.suraksha.engine.service.engine.impl.GeoScoringEngineImpl;
import com.suraksha.engine.service.engine.impl.SphereCapacityEngineImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Phase B2: Pure Scientific Math & Constraint Engine Unit Tests")
class SphereCapacityEngineTest {

    private SphereCapacityEngine sphereCapacityEngine;
    private GeoScoringEngine geoScoringEngine;

    private CandidateSite pipalkoti;
    private CandidateSite gopeshwar;

    @BeforeEach
    void setUp() {
        sphereCapacityEngine = new SphereCapacityEngineImpl();
        geoScoringEngine = new GeoScoringEngineImpl();

        pipalkoti = CandidateSite.builder()
                .id("SITE-B")
                .name("Pipalkoti Shelf")
                .siteType(SiteType.RELOCATION_ENCLAVE)
                .latitude(30.4300)
                .longitude(79.3400)
                .usableAreaSqm(25000.0)
                .waterSupplyLpd(80000.0)
                .toiletCount(30)
                .existingOccupancy(200)
                .allocatedPopulation(0)
                .slopeDegrees(12.0)
                .multiRouteAccess(false)
                .bridgeCutoffProbability(0.66)
                .hospitalProximityKm(18.5)
                .livelihoodProximityKm(14.0)
                .build();

        gopeshwar = CandidateSite.builder()
                .id("SITE-A")
                .name("Gopeshwar Enclave")
                .siteType(SiteType.RELOCATION_ENCLAVE)
                .latitude(30.4080)
                .longitude(79.3190)
                .usableAreaSqm(18000.0)
                .waterSupplyLpd(55000.0)
                .toiletCount(150)
                .existingOccupancy(400)
                .allocatedPopulation(0)
                .slopeDegrees(8.5)
                .multiRouteAccess(true)
                .bridgeCutoffProbability(0.12)
                .hospitalProximityKm(3.2)
                .livelihoodProximityKm(4.5)
                .build();
    }

    @Test
    @DisplayName("1. Pipalkoti Shelf: Detects 30 toilets sanitation bottleneck & severe capacity deficit")
    void testPipalkotiShelfCapacityDeficit() {
        CapacityAuditResult audit = sphereCapacityEngine.evaluateCapacity(pipalkoti, 2840);

        assertNotNull(audit);
        assertEquals(BottleneckType.SANITATION_UNITS, audit.getLimitingBottleneck());
        assertEquals(7142, audit.getGrossByArea());       // floor(25000 / 3.5)
        assertEquals(5333, audit.getGrossByWater());      // floor(80000 / 15.0)
        assertEquals(750, audit.getGrossBySanitation());  // 30 * 25
        assertEquals(750, audit.getGrossCapacity());      // min(7142, 5333, 750)
        assertEquals(550, audit.getEffectiveCapacity());  // 750 - 200
        assertEquals(-2290, audit.getResidualHeadroom()); // 550 - 2840
        assertTrue(audit.isDeficit());
    }

    @Test
    @DisplayName("2. Gopeshwar Enclave: Computes water bottleneck with positive residual headroom")
    void testGopeshwarEnclaveCapacityFeasible() {
        CapacityAuditResult audit = sphereCapacityEngine.evaluateCapacity(gopeshwar, 2840);

        assertNotNull(audit);
        assertEquals(BottleneckType.WATER_SUPPLY, audit.getLimitingBottleneck());
        assertEquals(5142, audit.getGrossByArea());       // floor(18000 / 3.5)
        assertEquals(3666, audit.getGrossByWater());      // floor(55000 / 15.0)
        assertEquals(3750, audit.getGrossBySanitation()); // 150 * 25
        assertEquals(3666, audit.getGrossCapacity());     // min(5142, 3666, 3750)
        assertEquals(3266, audit.getEffectiveCapacity()); // 3666 - 400
        assertEquals(426, audit.getResidualHeadroom());   // 3266 - 2840
        assertFalse(audit.isDeficit());
    }

    @Test
    @DisplayName("3. Haversine Geo-Distance: Accurately computes great-circle distance in kilometers")
    void testHaversineDistanceAccuracy() {
        // Nandikot (30.4150, 79.3240) to Gopeshwar (30.4080, 79.3190)
        double distanceKm = geoScoringEngine.calculateHaversineDistanceKm(30.4150, 79.3240, 30.4080, 79.3190);
        assertEquals(0.9, distanceKm, 0.1);
    }

    @Test
    @DisplayName("4. Composite Risk Index (CRI): Computes weighted multi-hazard vulnerability index")
    void testCompositeRiskIndexCalculation() {
        // slope = 42.0, landslide = 92.0, flood = 74.0, vuln = 0.86
        // (92.0 * 0.40) + (42.0 * 0.35) + (74.0 * 0.15) + (0.86 * 100.0 * 0.10) = 36.8 + 14.7 + 11.1 + 8.6 = 71.2
        double cri = geoScoringEngine.calculateCompositeRiskIndex(42.0, 92.0, 74.0, 0.86);
        assertEquals(71.2, cri, 0.05);
    }

    @Test
    @DisplayName("5. Site Feasibility Score (SFS): Evaluates comprehensive candidate ranking score")
    void testSiteFeasibilityScoreCalculation() {
        // Base 100.0 - (4.7 * 2.5) - (8.5 * 1.5) - (0.12 * 30.0) = 100.0 - 11.75 - 12.75 - 3.6 = 71.9
        double sfs = geoScoringEngine.calculateSiteFeasibilityScore(gopeshwar, 4.7);
        assertEquals(71.9, sfs, 0.05);
    }

    @Test
    @DisplayName("6. Tie-breaker Priority: Prioritizes SANITATION > WATER > SPACE when resource capacities match")
    void testTieBreakingPriority() {
        CandidateSite equalSite = CandidateSite.builder()
                .id("SITE-TIE")
                .name("Tie Test Enclave")
                .usableAreaSqm(3500.0)   // 1000 persons (3500 / 3.5)
                .waterSupplyLpd(15000.0) // 1000 persons (15000 / 15.0)
                .toiletCount(40)         // 1000 persons (40 * 25)
                .existingOccupancy(0)
                .allocatedPopulation(0)
                .slopeDegrees(5.0)
                .bridgeCutoffProbability(0.0)
                .build();

        CapacityAuditResult audit = sphereCapacityEngine.evaluateCapacity(equalSite, 1000);
        assertEquals(BottleneckType.SANITATION_UNITS, audit.getLimitingBottleneck());
    }
}
