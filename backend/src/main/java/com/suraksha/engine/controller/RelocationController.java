package com.suraksha.engine.controller;

import com.suraksha.engine.common.api.ApiResponse;
import com.suraksha.engine.model.dto.EvaluationResultResponse;
import com.suraksha.engine.model.dto.RelocationEvaluationRequest;
import com.suraksha.engine.service.DecisionEngineService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/relocation")
@CrossOrigin(origins = "*")
public class RelocationController {

    private static final Logger log = LoggerFactory.getLogger(RelocationController.class);

    private final DecisionEngineService decisionEngineService;

    public RelocationController(DecisionEngineService decisionEngineService) {
        this.decisionEngineService = decisionEngineService;
    }

    @PostMapping("/evaluate")
    public ResponseEntity<ApiResponse<EvaluationResultResponse>> evaluateRelocation(
            @Valid @RequestBody RelocationEvaluationRequest request) {
        log.info("Received relocation evaluation request for Habitation ID: {}, Simulated Pop: {}",
                request.getHabitationId(), request.getSimulatedPopulation());

        EvaluationResultResponse evaluationResult = decisionEngineService.evaluateRelocation(request);

        return ResponseEntity.ok(ApiResponse.success(
                evaluationResult,
                "Deterministic relocation carrying-capacity evaluated successfully"
        ));
    }
}
