package com.suraksha.engine.model.dto;

import com.suraksha.engine.model.enums.BottleneckType;
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
public class CapacityAuditResult {

    private int grossByArea;
    private int grossByWater;
    private int grossBySanitation;
    private BottleneckType limitingBottleneck;
    private int grossCapacity;
    private int effectiveCapacity;
    private int residualHeadroom;
    private boolean isDeficit;

    public CapacityAuditResult() {
    }

    public CapacityAuditResult(int grossByArea, int grossByWater, int grossBySanitation,
                               BottleneckType limitingBottleneck, int grossCapacity,
                               int effectiveCapacity, int residualHeadroom, boolean isDeficit) {
        this.grossByArea = grossByArea;
        this.grossByWater = grossByWater;
        this.grossBySanitation = grossBySanitation;
        this.limitingBottleneck = limitingBottleneck;
        this.grossCapacity = grossCapacity;
        this.effectiveCapacity = effectiveCapacity;
        this.residualHeadroom = residualHeadroom;
        this.isDeficit = isDeficit;
    }

    public static CapacityAuditResultBuilder builder() {
        return new CapacityAuditResultBuilder();
    }

    public static class CapacityAuditResultBuilder {
        private int grossByArea;
        private int grossByWater;
        private int grossBySanitation;
        private BottleneckType limitingBottleneck;
        private int grossCapacity;
        private int effectiveCapacity;
        private int residualHeadroom;
        private boolean isDeficit;

        public CapacityAuditResultBuilder grossByArea(int grossByArea) {
            this.grossByArea = grossByArea;
            return this;
        }

        public CapacityAuditResultBuilder grossByWater(int grossByWater) {
            this.grossByWater = grossByWater;
            return this;
        }

        public CapacityAuditResultBuilder grossBySanitation(int grossBySanitation) {
            this.grossBySanitation = grossBySanitation;
            return this;
        }

        public CapacityAuditResultBuilder limitingBottleneck(BottleneckType limitingBottleneck) {
            this.limitingBottleneck = limitingBottleneck;
            return this;
        }

        public CapacityAuditResultBuilder grossCapacity(int grossCapacity) {
            this.grossCapacity = grossCapacity;
            return this;
        }

        public CapacityAuditResultBuilder effectiveCapacity(int effectiveCapacity) {
            this.effectiveCapacity = effectiveCapacity;
            return this;
        }

        public CapacityAuditResultBuilder residualHeadroom(int residualHeadroom) {
            this.residualHeadroom = residualHeadroom;
            return this;
        }

        public CapacityAuditResultBuilder isDeficit(boolean isDeficit) {
            this.isDeficit = isDeficit;
            return this;
        }

        public CapacityAuditResult build() {
            return new CapacityAuditResult(grossByArea, grossByWater, grossBySanitation,
                    limitingBottleneck, grossCapacity, effectiveCapacity, residualHeadroom, isDeficit);
        }
    }

    public int getGrossByArea() {
        return grossByArea;
    }

    public void setGrossByArea(int grossByArea) {
        this.grossByArea = grossByArea;
    }

    public int getGrossByWater() {
        return grossByWater;
    }

    public void setGrossByWater(int grossByWater) {
        this.grossByWater = grossByWater;
    }

    public int getGrossBySanitation() {
        return grossBySanitation;
    }

    public void setGrossBySanitation(int grossBySanitation) {
        this.grossBySanitation = grossBySanitation;
    }

    public BottleneckType getLimitingBottleneck() {
        return limitingBottleneck;
    }

    public void setLimitingBottleneck(BottleneckType limitingBottleneck) {
        this.limitingBottleneck = limitingBottleneck;
    }

    public int getGrossCapacity() {
        return grossCapacity;
    }

    public void setGrossCapacity(int grossCapacity) {
        this.grossCapacity = grossCapacity;
    }

    public int getEffectiveCapacity() {
        return effectiveCapacity;
    }

    public void setEffectiveCapacity(int effectiveCapacity) {
        this.effectiveCapacity = effectiveCapacity;
    }

    public int getResidualHeadroom() {
        return residualHeadroom;
    }

    public void setResidualHeadroom(int residualHeadroom) {
        this.residualHeadroom = residualHeadroom;
    }

    public boolean isDeficit() {
        return isDeficit;
    }

    public void setDeficit(boolean deficit) {
        isDeficit = deficit;
    }
}
