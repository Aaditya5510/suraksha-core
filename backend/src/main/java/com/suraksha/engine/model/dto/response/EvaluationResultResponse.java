package com.suraksha.engine.model.dto.response;

import java.util.List;

public class EvaluationResultResponse {

    private HabitationSummaryResponse habitation;
    private TacticalShelterResponse tacticalShelterImmediate;
    private List<CandidateSiteEvaluationResponse> candidateSites;

    public EvaluationResultResponse() {
    }

    public EvaluationResultResponse(HabitationSummaryResponse habitation,
                                    TacticalShelterResponse tacticalShelterImmediate,
                                    List<CandidateSiteEvaluationResponse> candidateSites) {
        this.habitation = habitation;
        this.tacticalShelterImmediate = tacticalShelterImmediate;
        this.candidateSites = candidateSites;
    }

    public HabitationSummaryResponse getHabitation() {
        return habitation;
    }

    public void setHabitation(HabitationSummaryResponse habitation) {
        this.habitation = habitation;
    }

    public TacticalShelterResponse getTacticalShelterImmediate() {
        return tacticalShelterImmediate;
    }

    public void setTacticalShelterImmediate(TacticalShelterResponse tacticalShelterImmediate) {
        this.tacticalShelterImmediate = tacticalShelterImmediate;
    }

    public List<CandidateSiteEvaluationResponse> getCandidateSites() {
        return candidateSites;
    }

    public void setCandidateSites(List<CandidateSiteEvaluationResponse> candidateSites) {
        this.candidateSites = candidateSites;
    }
}
