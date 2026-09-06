package com.suraksha.engine.controller;

import com.suraksha.engine.common.api.ApiResponse;
import com.suraksha.engine.model.dto.CapacityAuditResult;
import com.suraksha.engine.model.entity.CandidateSite;
import com.suraksha.engine.repository.CandidateSiteRepository;
import com.suraksha.engine.service.engine.SphereCapacityEngine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/capacity")
@CrossOrigin(origins = "*")
public class CapacityController {

    private static final Logger log = LoggerFactory.getLogger(CapacityController.class);

    private final CandidateSiteRepository candidateSiteRepository;
    private final SphereCapacityEngine sphereCapacityEngine;

    public CapacityController(CandidateSiteRepository candidateSiteRepository,
                              @Qualifier("scientificSphereCapacityEngine") SphereCapacityEngine sphereCapacityEngine) {
        this.candidateSiteRepository = candidateSiteRepository;
        this.sphereCapacityEngine = sphereCapacityEngine;
    }

    @PostMapping("/audit")
    public ResponseEntity<ApiResponse<CapacityAuditResult>> auditSite(@RequestBody Map<String, Object> request) {
        String siteId = (String) request.get("siteId");
        int evacuees = request.get("evacuees") != null ? ((Number) request.get("evacuees")).intValue() : 2840;

        log.info("Received capacity audit request for Site ID: {}, Evacuees: {}", siteId, evacuees);

        if (siteId == null || siteId.isBlank()) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, "siteId is required"));
        }

        CandidateSite site = candidateSiteRepository.findById(siteId).orElse(null);

        if (site == null) {
            return ResponseEntity.status(404).body(ApiResponse.error(404, "Candidate site not found: " + siteId));
        }

        CapacityAuditResult audit = sphereCapacityEngine.evaluateCapacity(site, evacuees);
        return ResponseEntity.ok(ApiResponse.success(audit, "Sphere capacity audit evaluated successfully"));
    }
}
