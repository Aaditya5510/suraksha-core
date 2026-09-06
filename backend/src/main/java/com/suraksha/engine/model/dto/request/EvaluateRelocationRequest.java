package com.suraksha.engine.model.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class EvaluateRelocationRequest {

    @NotBlank(message = "habitationId cannot be blank")
    private String habitationId;

    @NotNull(message = "simulatedPopulation cannot be null")
    @Min(value = 1, message = "simulatedPopulation must be at least 1")
    private Integer simulatedPopulation;

    public EvaluateRelocationRequest() {
    }

    public EvaluateRelocationRequest(String habitationId, Integer simulatedPopulation) {
        this.habitationId = habitationId;
        this.simulatedPopulation = simulatedPopulation;
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
