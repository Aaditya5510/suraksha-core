package com.suraksha.engine.service.engine.impl;

import com.suraksha.engine.model.entity.CandidateSite;
import com.suraksha.engine.service.engine.GeoScoringEngine;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service("scientificGeoScoringEngine")
public class GeoScoringEngineImpl implements GeoScoringEngine {

    private static final double EARTH_RADIUS_KM = 6371.0;

    @Override
    public double calculateHaversineDistanceKm(double lat1, double lon1, double lat2, double lon2) {
        return computeHaversineDistanceKm(lat1, lon1, lat2, lon2);
    }

    @Override
    public double calculateCompositeRiskIndex(double slope, double landslideIdx, double floodIdx, double vuln) {
        return computeCompositeRiskIndex(slope, landslideIdx, floodIdx, vuln);
    }

    @Override
    public double calculateSiteFeasibilityScore(CandidateSite site, double distanceKm) {
        return computeSiteFeasibilityScore(site, distanceKm);
    }

    /**
     * Pure static calculation of Great-Circle Haversine Distance (in km), rounded to 1 decimal place.
     */
    public static double computeHaversineDistanceKm(double lat1, double lon1, double lat2, double lon2) {
        double lat1Rad = Math.toRadians(lat1);
        double lon1Rad = Math.toRadians(lon1);
        double lat2Rad = Math.toRadians(lat2);
        double lon2Rad = Math.toRadians(lon2);

        double deltaLat = lat2Rad - lat1Rad;
        double deltaLon = lon2Rad - lon1Rad;

        double a = Math.sin(deltaLat / 2.0) * Math.sin(deltaLat / 2.0)
                + Math.cos(lat1Rad) * Math.cos(lat2Rad)
                * Math.sin(deltaLon / 2.0) * Math.sin(deltaLon / 2.0);

        double c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
        double distance = EARTH_RADIUS_KM * c;

        return BigDecimal.valueOf(distance).setScale(1, RoundingMode.HALF_UP).doubleValue();
    }

    /**
     * Pure static calculation of Composite Risk Index (CRI).
     * Formula: (landslideIdx * 0.40) + (slope * 0.35) + (floodIdx * 0.15) + (vuln * 100.0 * 0.10)
     */
    public static double computeCompositeRiskIndex(double slope, double landslideIdx, double floodIdx, double vuln) {
        double normalizedVuln = (vuln <= 1.0) ? (vuln * 100.0) : vuln;
        double rawCri = (landslideIdx * 0.40) + (slope * 0.35) + (floodIdx * 0.15) + (normalizedVuln * 0.10);
        return BigDecimal.valueOf(rawCri).setScale(1, RoundingMode.HALF_UP).doubleValue();
    }

    /**
     * Pure static calculation of Site Feasibility Score (SFS 0 - 100).
     * Formula: Base (100.0) - (distanceKm * 2.5) - (site.getSlopeDegrees() * 1.5) - (site.getBridgeCutoffProbability() * 30.0)
     */
    public static double computeSiteFeasibilityScore(CandidateSite site, double distanceKm) {
        if (site == null) {
            throw new IllegalArgumentException("CandidateSite cannot be null");
        }

        double slope = site.getSlopeDegrees() != null ? site.getSlopeDegrees() : 0.0;
        double bridgeCutoff = site.getBridgeCutoffProbability() != null ? site.getBridgeCutoffProbability() : 0.0;

        double score = 100.0 - (distanceKm * 2.5) - (slope * 1.5) - (bridgeCutoff * 30.0);
        score = Math.max(0.0, Math.min(100.0, score));

        return BigDecimal.valueOf(score).setScale(1, RoundingMode.HALF_UP).doubleValue();
    }
}
