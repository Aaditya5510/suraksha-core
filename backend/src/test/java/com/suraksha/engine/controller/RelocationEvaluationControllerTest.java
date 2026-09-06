package com.suraksha.engine.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.suraksha.engine.model.dto.request.EvaluateRelocationRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class RelocationEvaluationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("GET /api/v1/habitations returns seeded habitations")
    void testGetAllHabitations() throws Exception {
        mockMvc.perform(get("/api/v1/habitations")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(2)))
                .andExpect(jsonPath("$.data[0].id", is("HAB-01")))
                .andExpect(jsonPath("$.data[0].name", containsString("Nandikot")))
                .andExpect(jsonPath("$.data[0].compositeRisk", is(89.4)));
    }

    @Test
    @DisplayName("GET /api/v1/sites returns seeded candidate sites")
    void testGetAllSites() throws Exception {
        mockMvc.perform(get("/api/v1/sites")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(3)));
    }

    @Test
    @DisplayName("POST /api/v1/relocation/evaluate returns 200 OK with accurate carrying capacity audit")
    void testEvaluateRelocationSuccess() throws Exception {
        EvaluateRelocationRequest request = new EvaluateRelocationRequest("HAB-01", 2840);

        mockMvc.perform(post("/api/v1/relocation/evaluate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.habitation.id", is("HAB-01")))
                .andExpect(jsonPath("$.data.habitation.compositeRisk", is(89.4)))
                .andExpect(jsonPath("$.data.habitation.riskZone", is("CRITICAL_RED_ZONE")))
                .andExpect(jsonPath("$.data.tacticalShelterImmediate.siteId", is("SITE-C")))
                .andExpect(jsonPath("$.data.tacticalShelterImmediate.effectiveCapacity", is(2850)))
                .andExpect(jsonPath("$.data.candidateSites", hasSize(2)))
                .andExpect(jsonPath("$.data.candidateSites[0].siteId", is("SITE-A")))
                .andExpect(jsonPath("$.data.candidateSites[0].recommendation", is("RECOMMENDED_PRIMARY")))
                .andExpect(jsonPath("$.data.candidateSites[0].capacityAudit.effectiveCapacity", is(3266)))
                .andExpect(jsonPath("$.data.candidateSites[0].capacityAudit.residualHeadroom", is(426)))
                .andExpect(jsonPath("$.data.candidateSites[1].siteId", is("SITE-B")))
                .andExpect(jsonPath("$.data.candidateSites[1].recommendation", is("OPERATIONALLY_REJECTED")))
                .andExpect(jsonPath("$.data.candidateSites[1].capacityAudit.effectiveCapacity", is(550)))
                .andExpect(jsonPath("$.data.candidateSites[1].capacityAudit.residualHeadroom", is(-2290)));
    }

    @Test
    @DisplayName("POST /api/v1/relocation/evaluate with simulated surge population triggers CAPACITY_DEFICIT")
    void testEvaluateRelocationPopulationSurge() throws Exception {
        // Surge to 3600 (exceeds Gopeshwar capacity of 3266 -> Deficit: -334)
        EvaluateRelocationRequest request = new EvaluateRelocationRequest("HAB-01", 3600);

        mockMvc.perform(post("/api/v1/relocation/evaluate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.candidateSites[0].siteId", is("SITE-A")))
                .andExpect(jsonPath("$.data.candidateSites[0].recommendation", is("CAPACITY_DEFICIT")))
                .andExpect(jsonPath("$.data.candidateSites[0].capacityAudit.residualHeadroom", is(-334)))
                .andExpect(jsonPath("$.data.candidateSites[0].capacityAudit.isDeficit", is(true)));
    }

    @Test
    @DisplayName("POST /api/v1/relocation/evaluate with invalid payload returns 400 Bad Request")
    void testEvaluateRelocationValidationFailure() throws Exception {
        EvaluateRelocationRequest request = new EvaluateRelocationRequest("", -5);

        mockMvc.perform(post("/api/v1/relocation/evaluate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", containsString("Validation failed")));
    }
}
