package com.suraksha.engine.service;

import com.suraksha.engine.model.dto.request.EvaluateRelocationRequest;
import com.suraksha.engine.model.dto.response.CandidateSiteEvaluationResponse;
import com.suraksha.engine.model.dto.response.CapacityAuditBreakdownResponse;
import com.suraksha.engine.model.dto.response.EvaluationResultResponse;
import com.suraksha.engine.model.entity.Habitation;
import com.suraksha.engine.model.entity.RelocationSite;
import com.suraksha.engine.repository.HabitationRepository;
import com.suraksha.engine.repository.RelocationSiteRepository;
import com.suraksha.engine.service.impl.DecisionEngineServiceImpl;
import com.suraksha.engine.service.impl.SphereCapacityEngineImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DecisionEngineServiceTest {

    @Mock
    private HabitationRepository habitationRepository;

    @Mock
    private RelocationSiteRepository relocationSiteRepository;

    private SphereCapacityEngine sphereCapacityEngine;
    private DecisionEngineService decisionEngineService;

    private Habitation nandikot;
    private RelocationSite gopeshwar;
    private RelocationSite pipalkoti;
    private RelocationSite school;

    @BeforeEach
    void setUp() {
        sphereCapacityEngine = new SphereCapacityEngineImpl();
        decisionEngineService = new DecisionEngineServiceImpl(
                habitationRepository,
                relocationSiteRepository,
                sphereCapacityEngine
        );

        nandikot = new Habitation(
                "HAB-01", "Nandikot Settlement (Joshimath Sector)",
                30.5520, 79.5640, 2840,
                42.0, 92.0, 74.0, 86.0, 88.0, 89.4,
                "CRITICAL_RED_ZONE", "IMMEDIATE"
        );

        school = new RelocationSite(
                "SITE-C", "Govt Model Inter-College Grounds",
                30.5580, 79.5490, "IMMEDIATE_SHELTER",
                12000.0, 45000, 114, 0,
                94.0, 90.0, 1.8, 50.0
        );

        gopeshwar = new RelocationSite(
                "SITE-A", "Gopeshwar Administrative Enclave",
                30.4120, 79.3240, "PERMANENT_RESETTLEMENT",
                16000.0, 55000, 150, 400,
                96.0, 88.0, 2.4, 85.0
        );

        pipalkoti = new RelocationSite(
                "SITE-B", "Pipalkoti Industrial Shelf",
                30.4310, 79.4320, "PERMANENT_RESETTLEMENT",
                25000.0, 18000, 30, 200,
                91.0, 34.0, 18.5, 65.0
        );
    }

    @Test
    @DisplayName("Sphere Engine: Correctly identifies Water as limiting bottleneck for Gopeshwar")
    void testSphereEngineGopeshwar() {
        CapacityAuditBreakdownResponse audit = sphereCapacityEngine.calculateCapacity(gopeshwar, 2840);
        assertEquals(4571, audit.getGrossByArea());
        assertEquals(3666, audit.getGrossByWater());
        assertEquals(3750, audit.getGrossBySanitation());
        assertEquals("POTABLE_WATER", audit.getLimitingBottleneck());
        assertEquals(3266, audit.getEffectiveCapacity());
        assertEquals(426, audit.getResidualHeadroom());
        assertFalse(audit.getIsDeficit());
    }

    @Test
    @DisplayName("Sphere Engine: Correctly identifies Sanitation as acute bottleneck for Pipalkoti")
    void testSphereEnginePipalkoti() {
        CapacityAuditBreakdownResponse audit = sphereCapacityEngine.calculateCapacity(pipalkoti, 2840);
        assertEquals(7142, audit.getGrossByArea());
        assertEquals(1200, audit.getGrossByWater());
        assertEquals(750, audit.getGrossBySanitation());
        assertEquals("SANITATION_TOILETS", audit.getLimitingBottleneck());
        assertEquals(550, audit.getEffectiveCapacity());
        assertEquals(-2290, audit.getResidualHeadroom());
        assertTrue(audit.getIsDeficit());
    }

    @Test
    @DisplayName("Mathematical Engine: Verifies Composite Risk Index (CRI) calculation and upper bound clamping")
    void testCompositeRiskIndex() {
        double clampedCri = decisionEngineService.calculateCompositeRiskIndex(92.0, 74.0, 42.0, 86.0, 88.0);
        assertEquals(100.0, clampedCri, 0.1);

        double moderateCri = decisionEngineService.calculateCompositeRiskIndex(58.0, 45.0, 28.0, 62.0, 40.0);
        assertEquals(58.3, moderateCri, 0.2);
    }

    @Test
    @DisplayName("Haversine Trigonometry: Verifies geodesic distance calculation")
    void testHaversineDistance() {
        double dist = decisionEngineService.calculateHaversineDistanceKm(
                nandikot.getLat(), nandikot.getLng(),
                school.getLat(), school.getLng()
        );
        assertEquals(1.58, dist, 0.05);
    }

    @Test
    @DisplayName("Full Relocation Evaluation: Recommends Gopeshwar and Rejects Pipalkoti")
    void testEvaluateRelocationPipeline() {
        when(habitationRepository.findById("HAB-01")).thenReturn(Optional.of(nandikot));
        when(relocationSiteRepository.findAll()).thenReturn(List.of(school, gopeshwar, pipalkoti));

        EvaluateRelocationRequest request = new EvaluateRelocationRequest("HAB-01", 2840);
        EvaluationResultResponse response = decisionEngineService.evaluateRelocation(request);

        assertNotNull(response);
        assertEquals("HAB-01", response.getHabitation().getId());
        assertEquals(89.4, response.getHabitation().getCompositeRisk());

        // Verify Horizon 1 Transit Shelter
        assertNotNull(response.getTacticalShelterImmediate());
        assertEquals("SITE-C", response.getTacticalShelterImmediate().getSiteId());
        assertEquals(2850, response.getTacticalShelterImmediate().getEffectiveCapacity());
        assertEquals(2.1, response.getTacticalShelterImmediate().getDistanceKm(), 0.1);
        assertEquals("VIABLE_FOR_IMMEDIATE_EVACUATION", response.getTacticalShelterImmediate().getStatus());

        // Verify Horizon 2 Candidate Sites
        assertEquals(2, response.getCandidateSites().size());

        CandidateSiteEvaluationResponse primarySite = response.getCandidateSites().stream()
                .filter(s -> "SITE-A".equals(s.getSiteId()))
                .findFirst()
                .orElseThrow();
        assertEquals("RECOMMENDED_PRIMARY", primarySite.getRecommendation());
        assertEquals(3266, primarySite.getCapacityAudit().getEffectiveCapacity());
        assertEquals(426, primarySite.getCapacityAudit().getResidualHeadroom());

        CandidateSiteEvaluationResponse rejectedSite = response.getCandidateSites().stream()
                .filter(s -> "SITE-B".equals(s.getSiteId()))
                .findFirst()
                .orElseThrow();
        assertEquals("OPERATIONALLY_REJECTED", rejectedSite.getRecommendation());
        assertEquals(550, rejectedSite.getCapacityAudit().getEffectiveCapacity());
        assertEquals(-2290, rejectedSite.getCapacityAudit().getResidualHeadroom());
    }
}
