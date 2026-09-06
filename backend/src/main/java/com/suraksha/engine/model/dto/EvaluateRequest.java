package com.suraksha.engine.model.dto;

import com.suraksha.engine.model.dto.request.EvaluateRelocationRequest;

public class EvaluateRequest extends EvaluateRelocationRequest {

    public EvaluateRequest() {
        super();
    }

    public EvaluateRequest(String habitationId, Integer simulatedPopulation) {
        super(habitationId, simulatedPopulation);
    }
}
