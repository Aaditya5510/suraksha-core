package com.suraksha.engine.model.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RelocationEvaluationRequest {

    @NotBlank(message = "habitationId cannot be blank")
    private String habitationId;

    @NotNull(message = "simulatedPopulation cannot be null")
    @Min(value = 1, message = "simulatedPopulation must be at least 1")
    private Integer simulatedPopulation;

    public RelocationEvaluationRequest() {
    }

    public RelocationEvaluationRequest(String habitationId, Integer simulatedPopulation) {
        this.habitationId = habitationId;
        this.simulatedPopulation = simulatedPopulation;
    }

    public static RelocationEvaluationRequestBuilder builder() {
        return new RelocationEvaluationRequestBuilder();
    }

    public static class RelocationEvaluationRequestBuilder {
        private String habitationId;
        private Integer simulatedPopulation;

        public RelocationEvaluationRequestBuilder habitationId(String habitationId) {
            this.habitationId = habitationId;
            return this;
        }

        public RelocationEvaluationRequestBuilder simulatedPopulation(Integer simulatedPopulation) {
            this.simulatedPopulation = simulatedPopulation;
            return this;
        }

        public RelocationEvaluationRequest build() {
            return new RelocationEvaluationRequest(habitationId, simulatedPopulation);
        }
    }

    public String getHabitationId() {
        return habitationId;
    }

    public void setHabitationId(String habitationId) {
        this.habitationId = habitationId;
    }

    public Integer getSimulatedPopulation() {
        return simulatedPopulation;
    }

    public void setSimulatedPopulation(Integer simulatedPopulation) {
        this.simulatedPopulation = simulatedPopulation;
    }
}
