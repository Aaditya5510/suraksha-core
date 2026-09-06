package com.suraksha.engine.controller;

import com.suraksha.engine.model.dto.EvaluateRequest;
import com.suraksha.engine.model.dto.response.EvaluationResultResponse;
import com.suraksha.engine.service.DecisionEngineService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/relocation")
@CrossOrigin(origins = "*")
public class RelocationController {

    private final DecisionEngineService decisionEngineService;

    public RelocationController(DecisionEngineService decisionEngineService) {
        this.decisionEngineService = decisionEngineService;
    }

    @PostMapping("/evaluate")
    public ResponseEntity<EvaluationResultResponse> evaluateDirect(
            @Valid @RequestBody EvaluateRequest request) {
        EvaluationResultResponse evaluationResult = decisionEngineService.evaluateRelocation(request);
        return ResponseEntity.ok(evaluationResult);
    }
}
