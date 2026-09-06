package com.suraksha.engine;

import com.suraksha.engine.model.entity.Habitation;
import com.suraksha.engine.model.entity.RelocationSite;
import com.suraksha.engine.repository.HabitationRepository;
import com.suraksha.engine.repository.RelocationSiteRepository;
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
    private RelocationSiteRepository relocationSiteRepository;

    @Test
    @DisplayName("Context Loads and Datastore contains Chamoli Pilot Seed Data")
    void contextLoadsAndSeedDataIsPresent() {
        // Verify Habitation Seed Data
        assertEquals(2, habitationRepository.count(), "Should have exactly 2 seeded habitations");

        Optional<Habitation> nandikotOpt = habitationRepository.findById("HAB-01");
        assertTrue(nandikotOpt.isPresent(), "HAB-01 (Nandikot) must be present");
        Habitation nandikot = nandikotOpt.get();
        assertEquals("Nandikot Settlement (Joshimath Sector)", nandikot.getName());
        assertEquals(2840, nandikot.getPopulation());
        assertEquals(42.0, nandikot.getSlopeDeg());
        assertEquals(89.4, nandikot.getCompositeRisk());
        assertEquals("CRITICAL_RED_ZONE", nandikot.getRiskZone());
        assertEquals("IMMEDIATE", nandikot.getHorizon());

        // Verify Relocation Sites Seed Data
        assertEquals(3, relocationSiteRepository.count(), "Should have exactly 3 seeded relocation sites");

        Optional<RelocationSite> gopeshwarOpt = relocationSiteRepository.findById("SITE-A");
        assertTrue(gopeshwarOpt.isPresent(), "SITE-A (Gopeshwar) must be present");
        RelocationSite gopeshwar = gopeshwarOpt.get();
        assertEquals("Gopeshwar Administrative Enclave", gopeshwar.getName());
        assertEquals(16000.0, gopeshwar.getUsableAreaSqm());
        assertEquals(55000, gopeshwar.getWaterLpd());
        assertEquals(150, gopeshwar.getToiletsCount());
        assertEquals(400, gopeshwar.getExistingOccupancy());

        Optional<RelocationSite> pipalkotiOpt = relocationSiteRepository.findById("SITE-B");
        assertTrue(pipalkotiOpt.isPresent(), "SITE-B (Pipalkoti) must be present");
        RelocationSite pipalkoti = pipalkotiOpt.get();
        assertEquals("Pipalkoti Industrial Shelf", pipalkoti.getName());
        assertEquals(25000.0, pipalkoti.getUsableAreaSqm());
        assertEquals(18000, pipalkoti.getWaterLpd());
        assertEquals(30, pipalkoti.getToiletsCount());
        assertEquals(34.0, pipalkoti.getRoadReliability());

        Optional<RelocationSite> schoolOpt = relocationSiteRepository.findById("SITE-C");
        assertTrue(schoolOpt.isPresent(), "SITE-C (Govt Model Inter-College Grounds) must be present");
        RelocationSite school = schoolOpt.get();
        assertEquals("IMMEDIATE_SHELTER", school.getHorizonType());
        assertEquals(12000.0, school.getUsableAreaSqm());
    }
}
