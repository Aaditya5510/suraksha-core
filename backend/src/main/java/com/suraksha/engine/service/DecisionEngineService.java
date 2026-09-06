package com.suraksha.engine.service;

import com.suraksha.engine.model.dto.request.EvaluateRelocationRequest;
import com.suraksha.engine.model.dto.response.EvaluationResultResponse;

public interface DecisionEngineService {

    EvaluationResultResponse evaluateRelocation(EvaluateRelocationRequest request);

    double calculateHaversineDistanceKm(double lat1, double lng1, double lat2, double lng2);

    double calculateCompositeRiskIndex(double landslideRisk, double floodRisk, double slopeDeg,
                                      double vulnerabilityScore, double cutoffRisk);

    double calculateSiteFeasibilityScore(double hazardSafety, double effectiveCapacity, int displacedPopulation,
                                        double roadReliability, double hospitalDistKm, double livelihoodScore);
}
