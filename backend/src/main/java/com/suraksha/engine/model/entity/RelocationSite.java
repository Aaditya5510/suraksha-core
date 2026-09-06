package com.suraksha.engine.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "relocation_sites")
public class RelocationSite {

    @Id
    @Column(name = "id", length = 64, nullable = false)
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "lat", nullable = false)
    private Double lat;

    @Column(name = "lng", nullable = false)
    private Double lng;

    @Column(name = "horizon_type", length = 32, nullable = false)
    private String horizonType;

    @Column(name = "usable_area_sqm", nullable = false)
    private Double usableAreaSqm;

    @Column(name = "water_lpd", nullable = false)
    private Integer waterLpd;

    @Column(name = "toilets_count", nullable = false)
    private Integer toiletsCount;

    @Column(name = "existing_occupancy", nullable = false)
    private Integer existingOccupancy;

    @Column(name = "hazard_safety", nullable = false)
    private Double hazardSafety;

    @Column(name = "road_reliability", nullable = false)
    private Double roadReliability;

    @Column(name = "hospital_dist_km", nullable = false)
    private Double hospitalDistKm;

    @Column(name = "livelihood_score", nullable = false)
    private Double livelihoodScore;

    public RelocationSite() {
    }

    public RelocationSite(String id, String name, Double lat, Double lng, String horizonType,
                          Double usableAreaSqm, Integer waterLpd, Integer toiletsCount,
                          Integer existingOccupancy, Double hazardSafety, Double roadReliability,
                          Double hospitalDistKm, Double livelihoodScore) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.horizonType = horizonType;
        this.usableAreaSqm = usableAreaSqm;
        this.waterLpd = waterLpd;
        this.toiletsCount = toiletsCount;
        this.existingOccupancy = existingOccupancy;
        this.hazardSafety = hazardSafety;
        this.roadReliability = roadReliability;
        this.hospitalDistKm = hospitalDistKm;
        this.livelihoodScore = livelihoodScore;
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

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public String getHorizonType() {
        return horizonType;
    }

    public void setHorizonType(String horizonType) {
        this.horizonType = horizonType;
    }

    public Double getUsableAreaSqm() {
        return usableAreaSqm;
    }

    public void setUsableAreaSqm(Double usableAreaSqm) {
        this.usableAreaSqm = usableAreaSqm;
    }

    public Integer getWaterLpd() {
        return waterLpd;
    }

    public void setWaterLpd(Integer waterLpd) {
        this.waterLpd = waterLpd;
    }

    public Integer getToiletsCount() {
        return toiletsCount;
    }

    public void setToiletsCount(Integer toiletsCount) {
        this.toiletsCount = toiletsCount;
    }

    public Integer getExistingOccupancy() {
        return existingOccupancy;
    }

    public void setExistingOccupancy(Integer existingOccupancy) {
        this.existingOccupancy = existingOccupancy;
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

    public Double getHospitalDistKm() {
        return hospitalDistKm;
    }

    public void setHospitalDistKm(Double hospitalDistKm) {
        this.hospitalDistKm = hospitalDistKm;
    }

    public Double getLivelihoodScore() {
        return livelihoodScore;
    }

    public void setLivelihoodScore(Double livelihoodScore) {
        this.livelihoodScore = livelihoodScore;
    }
}
