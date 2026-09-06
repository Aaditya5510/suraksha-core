package com.suraksha.engine.model.dto.response;

public class CapacityAuditBreakdownResponse {

    private Integer grossByArea;
    private Integer grossByWater;
    private Integer grossBySanitation;
    private String limitingBottleneck;
    private Integer effectiveCapacity;
    private Integer residualHeadroom;
    private Boolean isDeficit;

    public CapacityAuditBreakdownResponse() {
    }

    public CapacityAuditBreakdownResponse(Integer grossByArea, Integer grossByWater, Integer grossBySanitation,
                                          String limitingBottleneck, Integer effectiveCapacity,
                                          Integer residualHeadroom, Boolean isDeficit) {
        this.grossByArea = grossByArea;
        this.grossByWater = grossByWater;
        this.grossBySanitation = grossBySanitation;
        this.limitingBottleneck = limitingBottleneck;
        this.effectiveCapacity = effectiveCapacity;
        this.residualHeadroom = residualHeadroom;
        this.isDeficit = isDeficit;
    }

    public Integer getGrossByArea() {
        return grossByArea;
    }

    public void setGrossByArea(Integer grossByArea) {
        this.grossByArea = grossByArea;
    }

    public Integer getGrossByWater() {
        return grossByWater;
    }

    public void setGrossByWater(Integer grossByWater) {
        this.grossByWater = grossByWater;
    }

    public Integer getGrossBySanitation() {
        return grossBySanitation;
    }

    public void setGrossBySanitation(Integer grossBySanitation) {
        this.grossBySanitation = grossBySanitation;
    }

    public String getLimitingBottleneck() {
        return limitingBottleneck;
    }

    public void setLimitingBottleneck(String limitingBottleneck) {
        this.limitingBottleneck = limitingBottleneck;
    }

    public Integer getEffectiveCapacity() {
        return effectiveCapacity;
    }

    public void setEffectiveCapacity(Integer effectiveCapacity) {
        this.effectiveCapacity = effectiveCapacity;
    }

    public Integer getResidualHeadroom() {
        return residualHeadroom;
    }

    public void setResidualHeadroom(Integer residualHeadroom) {
        this.residualHeadroom = residualHeadroom;
    }

    public Boolean getIsDeficit() {
        return isDeficit;
    }

    public void setIsDeficit(Boolean deficit) {
        isDeficit = deficit;
    }
}
