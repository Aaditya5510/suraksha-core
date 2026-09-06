package com.suraksha.engine.service.engine;

import com.suraksha.engine.model.entity.CandidateSite;

public interface GeoScoringEngine {

    double calculateHaversineDistanceKm(double lat1, double lon1, double lat2, double lon2);

    double calculateCompositeRiskIndex(double slope, double landslideIdx, double floodIdx, double vuln);

    double calculateSiteFeasibilityScore(CandidateSite site, double distanceKm);
}
