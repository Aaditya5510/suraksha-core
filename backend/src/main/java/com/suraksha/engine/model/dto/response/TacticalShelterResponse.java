package com.suraksha.engine.model.dto.response;

public class TacticalShelterResponse {

    private String siteId;
    private String name;
    private String type;
    private Integer effectiveCapacity;
    private Double distanceKm;
    private String status;

    public TacticalShelterResponse() {
    }

    public TacticalShelterResponse(String siteId, String name, String type, Integer effectiveCapacity,
                                   Double distanceKm, String status) {
        this.siteId = siteId;
        this.name = name;
        this.type = type;
        this.effectiveCapacity = effectiveCapacity;
        this.distanceKm = distanceKm;
        this.status = status;
    }

    public String getSiteId() {
        return siteId;
    }

    public void setSiteId(String siteId) {
        this.siteId = siteId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getEffectiveCapacity() {
        return effectiveCapacity;
    }

    public void setEffectiveCapacity(Integer effectiveCapacity) {
        this.effectiveCapacity = effectiveCapacity;
    }

    public Double getDistanceKm() {
        return distanceKm;
    }

    public void setDistanceKm(Double distanceKm) {
        this.distanceKm = distanceKm;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
