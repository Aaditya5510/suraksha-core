package com.suraksha.engine;

import com.suraksha.engine.model.entity.CandidateSite;
import com.suraksha.engine.model.entity.Habitation;
import com.suraksha.engine.model.enums.RelocationHorizon;
import com.suraksha.engine.model.enums.RiskZone;
import com.suraksha.engine.model.enums.SiteType;
import com.suraksha.engine.repository.CandidateSiteRepository;
import com.suraksha.engine.repository.HabitationRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SurakshaEngineApplicationTests {

    @Autowired
    private HabitationRepository habitationRepository;

    @Autowired
    private CandidateSiteRepository candidateSiteRepository;

    @Test
    @DisplayName("Context Loads and Datastore contains Chamoli Pilot Seed Data")
    void contextLoadsAndSeedDataIsPresent() {
        // Verify Habitation Seed Data
        assertEquals(2, habitationRepository.count(), "Should have exactly 2 seeded habitations");

        Optional<Habitation> nandikotOpt = habitationRepository.findById("HAB-01");
        assertTrue(nandikotOpt.isPresent(), "HAB-01 (Nandikot) must be present");
        Habitation nandikot = nandikotOpt.get();
        assertEquals("Nandikot Settlement", nandikot.getName());
        assertEquals(2840, nandikot.getPopulation());
        assertEquals(42.0, nandikot.getSlopeDeg());
        assertEquals(89.4, nandikot.getCompositeRisk());
        assertEquals(RiskZone.CRITICAL_RED_ZONE, nandikot.getRiskZone());
        assertEquals(RelocationHorizon.IMMEDIATE_0_72H, nandikot.getHorizon());

        // Verify Candidate Sites Seed Data
        assertEquals(3, candidateSiteRepository.count(), "Should have exactly 3 seeded candidate sites");

        Optional<CandidateSite> gopeshwarOpt = candidateSiteRepository.findById("SITE-A");
        assertTrue(gopeshwarOpt.isPresent(), "SITE-A (Gopeshwar) must be present");
        CandidateSite gopeshwar = gopeshwarOpt.get();
        assertEquals("Gopeshwar Enclave", gopeshwar.getName());
        assertEquals(SiteType.RELOCATION_ENCLAVE, gopeshwar.getSiteType());
        assertEquals(18000.0, gopeshwar.getUsableAreaSqm());
        assertEquals(65000.0, gopeshwar.getWaterSupplyLpd());
        assertEquals(140, gopeshwar.getToiletCount());
        assertEquals(234, gopeshwar.getExistingOccupancy());

        Optional<CandidateSite> pipalkotiOpt = candidateSiteRepository.findById("SITE-B");
        assertTrue(pipalkotiOpt.isPresent(), "SITE-B (Pipalkoti) must be present");
        CandidateSite pipalkoti = pipalkotiOpt.get();
        assertEquals("Pipalkoti Shelf", pipalkoti.getName());
        assertEquals(25000.0, pipalkoti.getUsableAreaSqm());
        assertEquals(45000.0, pipalkoti.getWaterSupplyLpd());
        assertEquals(30, pipalkoti.getToiletCount());
        assertEquals(0.66, pipalkoti.getBridgeCutoffProbability());

        Optional<CandidateSite> schoolOpt = candidateSiteRepository.findById("SITE-C");
        assertTrue(schoolOpt.isPresent(), "SITE-C (Govt Model Inter-College Grounds) must be present");
        CandidateSite school = schoolOpt.get();
        assertEquals(SiteType.TRANSIT_SHELTER, school.getSiteType());
        assertEquals(12000.0, school.getUsableAreaSqm());
    }
}
