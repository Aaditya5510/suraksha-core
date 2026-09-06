package com.suraksha.engine.controller;

import com.suraksha.engine.common.api.ApiResponse;
import com.suraksha.engine.model.entity.CandidateSite;
import com.suraksha.engine.model.entity.RelocationSite;
import com.suraksha.engine.model.enums.SiteType;
import com.suraksha.engine.repository.CandidateSiteRepository;
import com.suraksha.engine.service.RelocationSiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sites")
@CrossOrigin(origins = "*")
public class SiteController {

    private final CandidateSiteRepository candidateSiteRepository;
    private final RelocationSiteService relocationSiteService;

    @Autowired
    public SiteController(@Autowired(required = false) CandidateSiteRepository candidateSiteRepository,
                          @Autowired(required = false) RelocationSiteService relocationSiteService) {
        this.candidateSiteRepository = candidateSiteRepository;
        this.relocationSiteService = relocationSiteService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllSites(
            @RequestParam(required = false) String siteType) {
        if (candidateSiteRepository != null && candidateSiteRepository.count() > 0) {
            List<CandidateSite> sites;
            if (siteType != null && !siteType.isBlank()) {
                sites = candidateSiteRepository.findBySiteType(SiteType.valueOf(siteType));
            } else {
                sites = candidateSiteRepository.findAll();
            }
            return ResponseEntity.ok(ApiResponse.success(sites, "Retrieved candidate sites successfully"));
        }

        if (relocationSiteService != null) {
            List<RelocationSite> legacySites = relocationSiteService.getAllSites();
            return ResponseEntity.ok(ApiResponse.success(legacySites, "Retrieved candidate sites successfully"));
        }

        return ResponseEntity.ok(ApiResponse.success(List.of(), "No candidate sites available"));
    }

    @GetMapping("/topographically-safe")
    public ResponseEntity<ApiResponse<List<CandidateSite>>> getTopographicallySafeSites() {
        if (candidateSiteRepository != null) {
            List<CandidateSite> sites = candidateSiteRepository.findTopographicallySafeSites();
            return ResponseEntity.ok(ApiResponse.success(sites, "Retrieved topographically safe sites (slope <= 15 deg)"));
        }
        return ResponseEntity.ok(ApiResponse.success(List.of(), "Candidate site repository not initialized"));
    }
}
