package com.suraksha.engine.model.dto.response;

public class SiteIndicatorsResponse {

    private Double hazardSafety;
    private Double roadReliability;
    private Double hospitalDistanceKm;
    private Double livelihoodAccess;

    public SiteIndicatorsResponse() {
    }

    public SiteIndicatorsResponse(Double hazardSafety, Double roadReliability,
                                  Double hospitalDistanceKm, Double livelihoodAccess) {
        this.hazardSafety = hazardSafety;
        this.roadReliability = roadReliability;
        this.hospitalDistanceKm = hospitalDistanceKm;
        this.livelihoodAccess = livelihoodAccess;
    }

    public Double getHazardSafety() {
        return hazardSafety;
    }

    public void setHazardSafety(Double hazardSafety) {
        this.hazardSafety = hazardSafety;
    }

    public Double getRoadReliability() {
        return roadReliability;
    }

    public void setRoadReliability(Double roadReliability) {
        this.roadReliability = roadReliability;
    }

    public Double getHospitalDistanceKm() {
        return hospitalDistanceKm;
    }

    public void setHospitalDistanceKm(Double hospitalDistanceKm) {
        this.hospitalDistanceKm = hospitalDistanceKm;
    }

    public Double getLivelihoodAccess() {
        return livelihoodAccess;
    }

    public void setLivelihoodAccess(Double livelihoodAccess) {
        this.livelihoodAccess = livelihoodAccess;
    }
}
