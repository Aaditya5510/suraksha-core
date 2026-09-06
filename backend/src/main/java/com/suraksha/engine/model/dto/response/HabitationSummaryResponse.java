package com.suraksha.engine.model.dto.response;

import com.suraksha.engine.model.enums.RelocationHorizon;
import com.suraksha.engine.model.enums.RiskZone;

public class HabitationSummaryResponse {

    private String id;
    private String name;
    private Integer population;
    private Double compositeRisk;
    private String riskZone;
    private String horizon;
    private Double landslide;
    private Double flood;
    private Double slopeDegrees;
    private Double vulnerability;
    private Double roadCutoffRisk;

    public HabitationSummaryResponse() {
    }

    public HabitationSummaryResponse(String id, String name, Integer population, Double compositeRisk,
                                     String riskZone, String horizon, Double landslide, Double flood,
                                     Double slopeDegrees, Double vulnerability, Double roadCutoffRisk) {
        this.id = id;
        this.name = name;
        this.population = population;
        this.compositeRisk = compositeRisk;
        this.riskZone = riskZone;
        this.horizon = horizon;
        this.landslide = landslide;
        this.flood = flood;
        this.slopeDegrees = slopeDegrees;
        this.vulnerability = vulnerability;
        this.roadCutoffRisk = roadCutoffRisk;
    }

    public HabitationSummaryResponse(String id, String name, Integer population, Double compositeRisk,
                                     RiskZone riskZone, RelocationHorizon horizon, Double landslide, Double flood,
                                     Double slopeDegrees, Double vulnerability, Double roadCutoffRisk) {
        this(id, name, population, compositeRisk,
             riskZone != null ? riskZone.name() : null,
             horizon != null ? horizon.name() : null,
             landslide, flood, slopeDegrees, vulnerability, roadCutoffRisk);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPopulation() {
        return population;
    }

    public void setPopulation(Integer population) {
        this.population = population;
    }

    public Double getCompositeRisk() {
        return compositeRisk;
    }

    public void setCompositeRisk(Double compositeRisk) {
        this.compositeRisk = compositeRisk;
    }

    public String getRiskZone() {
        return riskZone;
    }

    public void setRiskZone(String riskZone) {
        this.riskZone = riskZone;
    }

    public String getHorizon() {
        return horizon;
    }

    public void setHorizon(String horizon) {
        this.horizon = horizon;
    }

    public Double getLandslide() {
        return landslide;
    }

    public void setLandslide(Double landslide) {
        this.landslide = landslide;
    }

    public Double getFlood() {
        return flood;
    }

    public void setFlood(Double flood) {
        this.flood = flood;
    }

    public Double getSlopeDegrees() {
        return slopeDegrees;
    }

    public void setSlopeDegrees(Double slopeDegrees) {
        this.slopeDegrees = slopeDegrees;
    }

    public Double getVulnerability() {
        return vulnerability;
    }

    public void setVulnerability(Double vulnerability) {
        this.vulnerability = vulnerability;
    }

    public Double getRoadCutoffRisk() {
        return roadCutoffRisk;
    }

    public void setRoadCutoffRisk(Double roadCutoffRisk) {
        this.roadCutoffRisk = roadCutoffRisk;
    }
}
