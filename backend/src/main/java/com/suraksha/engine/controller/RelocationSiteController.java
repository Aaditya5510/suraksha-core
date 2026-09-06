package com.suraksha.engine.controller;

import com.suraksha.engine.common.api.ApiResponse;
import com.suraksha.engine.model.entity.RelocationSite;
import com.suraksha.engine.service.RelocationSiteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sites")
@CrossOrigin(origins = "*")
public class RelocationSiteController {

    private final RelocationSiteService relocationSiteService;

    public RelocationSiteController(RelocationSiteService relocationSiteService) {
        this.relocationSiteService = relocationSiteService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RelocationSite>>> getAllSites(
            @RequestParam(required = false) String horizonType) {
        List<RelocationSite> sites;
        if (horizonType != null && !horizonType.isBlank()) {
            sites = relocationSiteService.getSitesByHorizonType(horizonType);
        } else {
            sites = relocationSiteService.getAllSites();
        }
        return ResponseEntity.ok(ApiResponse.success(sites, "Retrieved relocation sites successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RelocationSite>> getSiteById(@PathVariable String id) {
        RelocationSite site = relocationSiteService.getSiteById(id);
        return ResponseEntity.ok(ApiResponse.success(site, "Retrieved relocation site details successfully"));
    }
}
