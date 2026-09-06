package com.suraksha.engine.model.dto;

import com.suraksha.engine.model.entity.Habitation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationResultResponse {

    private Habitation habitation;
    private CandidateSiteEvaluationDTO tacticalShelterImmediate;
    private List<CandidateSiteEvaluationDTO> candidateSites;
    private String operationalDirectiveSummary;
    private Boolean requiresSpillover;
    private Map<String, Integer> spilloverAllocation;

    public EvaluationResultResponse() {
    }

    public EvaluationResultResponse(Habitation habitation,
                                    CandidateSiteEvaluationDTO tacticalShelterImmediate,
                                    List<CandidateSiteEvaluationDTO> candidateSites,
                                    String operationalDirectiveSummary,
                                    Boolean requiresSpillover,
                                    Map<String, Integer> spilloverAllocation) {
        this.habitation = habitation;
        this.tacticalShelterImmediate = tacticalShelterImmediate;
        this.candidateSites = candidateSites;
        this.operationalDirectiveSummary = operationalDirectiveSummary;
        this.requiresSpillover = requiresSpillover;
        this.spilloverAllocation = spilloverAllocation;
    }

    public static EvaluationResultResponseBuilder builder() {
        return new EvaluationResultResponseBuilder();
    }

    public static class EvaluationResultResponseBuilder {
        private Habitation habitation;
        private CandidateSiteEvaluationDTO tacticalShelterImmediate;
        private List<CandidateSiteEvaluationDTO> candidateSites;
        private String operationalDirectiveSummary;
        private Boolean requiresSpillover;
        private Map<String, Integer> spilloverAllocation;

        public EvaluationResultResponseBuilder habitation(Habitation habitation) {
            this.habitation = habitation;
            return this;
        }

        public EvaluationResultResponseBuilder tacticalShelterImmediate(CandidateSiteEvaluationDTO tacticalShelterImmediate) {
            this.tacticalShelterImmediate = tacticalShelterImmediate;
            return this;
        }

        public EvaluationResultResponseBuilder candidateSites(List<CandidateSiteEvaluationDTO> candidateSites) {
            this.candidateSites = candidateSites;
            return this;
        }

        public EvaluationResultResponseBuilder operationalDirectiveSummary(String operationalDirectiveSummary) {
            this.operationalDirectiveSummary = operationalDirectiveSummary;
            return this;
        }

        public EvaluationResultResponseBuilder requiresSpillover(Boolean requiresSpillover) {
            this.requiresSpillover = requiresSpillover;
            return this;
        }

        public EvaluationResultResponseBuilder spilloverAllocation(Map<String, Integer> spilloverAllocation) {
            this.spilloverAllocation = spilloverAllocation;
            return this;
        }

        public EvaluationResultResponse build() {
            return new EvaluationResultResponse(habitation, tacticalShelterImmediate, candidateSites,
                    operationalDirectiveSummary, requiresSpillover, spilloverAllocation);
        }
    }

    public Habitation getHabitation() {
        return habitation;
    }

    public void setHabitation(Habitation habitation) {
        this.habitation = habitation;
    }

    public CandidateSiteEvaluationDTO getTacticalShelterImmediate() {
        return tacticalShelterImmediate;
    }

    public void setTacticalShelterImmediate(CandidateSiteEvaluationDTO tacticalShelterImmediate) {
        this.tacticalShelterImmediate = tacticalShelterImmediate;
    }

    public List<CandidateSiteEvaluationDTO> getCandidateSites() {
        return candidateSites;
    }

    public void setCandidateSites(List<CandidateSiteEvaluationDTO> candidateSites) {
        this.candidateSites = candidateSites;
    }

    public String getOperationalDirectiveSummary() {
        return operationalDirectiveSummary;
    }

    public void setOperationalDirectiveSummary(String operationalDirectiveSummary) {
        this.operationalDirectiveSummary = operationalDirectiveSummary;
    }

    public Boolean getRequiresSpillover() {
        return requiresSpillover;
    }

    public void setRequiresSpillover(Boolean requiresSpillover) {
        this.requiresSpillover = requiresSpillover;
    }

    public Map<String, Integer> getSpilloverAllocation() {
        return spilloverAllocation;
    }

    public void setSpilloverAllocation(Map<String, Integer> spilloverAllocation) {
        this.spilloverAllocation = spilloverAllocation;
    }
}
