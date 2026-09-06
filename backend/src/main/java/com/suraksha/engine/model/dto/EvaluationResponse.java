package com.suraksha.engine.model.dto;

import com.suraksha.engine.model.dto.response.CandidateSiteEvaluationResponse;
import com.suraksha.engine.model.dto.response.EvaluationResultResponse;
import com.suraksha.engine.model.dto.response.HabitationSummaryResponse;
import com.suraksha.engine.model.dto.response.TacticalShelterResponse;

import java.util.List;

public class EvaluationResponse extends EvaluationResultResponse {

    public EvaluationResponse() {
        super();
    }

    public EvaluationResponse(HabitationSummaryResponse habitation,
                              TacticalShelterResponse tacticalShelterImmediate,
                              List<CandidateSiteEvaluationResponse> candidateSites) {
        super(habitation, tacticalShelterImmediate, candidateSites);
    }
}
