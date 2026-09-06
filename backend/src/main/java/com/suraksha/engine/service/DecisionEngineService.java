package com.suraksha.engine.service;

import com.suraksha.engine.model.dto.EvaluationResultResponse;
import com.suraksha.engine.model.dto.RelocationEvaluationRequest;
import com.suraksha.engine.model.dto.request.EvaluateRelocationRequest;

public interface DecisionEngineService {

    EvaluationResultResponse evaluateRelocation(RelocationEvaluationRequest request);

    com.suraksha.engine.model.dto.response.EvaluationResultResponse evaluateRelocation(EvaluateRelocationRequest request);

    double calculateHaversineDistanceKm(double lat1, double lng1, double lat2, double lng2);

    double calculateCompositeRiskIndex(double landslideRisk, double floodRisk, double slopeDeg,
                                       double vulnerabilityScore, double cutoffRisk);

    double calculateSiteFeasibilityScore(double hazardSafety, double effectiveCapacity, int displacedPopulation,
                                        double roadReliability, double hospitalDistKm, double livelihoodScore);
}
