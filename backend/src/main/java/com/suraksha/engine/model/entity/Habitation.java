package com.suraksha.engine.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "habitations")
public class Habitation {

    @Id
    @Column(name = "id", length = 64, nullable = false)
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "lat", nullable = false)
    private Double lat;

    @Column(name = "lng", nullable = false)
    private Double lng;

    @Column(name = "population", nullable = false)
    private Integer population;

    @Column(name = "slope_deg", nullable = false)
    private Double slopeDeg;

    @Column(name = "landslide_risk", nullable = false)
    private Double landslideRisk;

    @Column(name = "flood_risk", nullable = false)
    private Double floodRisk;

    @Column(name = "vulnerability_score", nullable = false)
    private Double vulnerabilityScore;

    @Column(name = "cutoff_risk", nullable = false)
    private Double cutoffRisk;

    @Column(name = "composite_risk", nullable = false)
    private Double compositeRisk;

    @Column(name = "risk_zone", length = 32, nullable = false)
    private String riskZone;

    @Column(name = "horizon", length = 32, nullable = false)
    private String horizon;

    public Habitation() {
    }

    public Habitation(String id, String name, Double lat, Double lng, Integer population,
                      Double slopeDeg, Double landslideRisk, Double floodRisk,
                      Double vulnerabilityScore, Double cutoffRisk, Double compositeRisk,
                      String riskZone, String horizon) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.population = population;
        this.slopeDeg = slopeDeg;
        this.landslideRisk = landslideRisk;
        this.floodRisk = floodRisk;
        this.vulnerabilityScore = vulnerabilityScore;
        this.cutoffRisk = cutoffRisk;
        this.compositeRisk = compositeRisk;
        this.riskZone = riskZone;
        this.horizon = horizon;
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

    public Integer getPopulation() {
        return population;
    }

    public void setPopulation(Integer population) {
        this.population = population;
    }

    public Double getSlopeDeg() {
        return slopeDeg;
    }

    public void setSlopeDeg(Double slopeDeg) {
        this.slopeDeg = slopeDeg;
    }

    public Double getLandslideRisk() {
        return landslideRisk;
    }

    public void setLandslideRisk(Double landslideRisk) {
        this.landslideRisk = landslideRisk;
    }

    public Double getFloodRisk() {
        return floodRisk;
    }

    public void setFloodRisk(Double floodRisk) {
        this.floodRisk = floodRisk;
    }

    public Double getVulnerabilityScore() {
        return vulnerabilityScore;
    }

    public void setVulnerabilityScore(Double vulnerabilityScore) {
        this.vulnerabilityScore = vulnerabilityScore;
    }

    public Double getCutoffRisk() {
        return cutoffRisk;
    }

    public void setCutoffRisk(Double cutoffRisk) {
        this.cutoffRisk = cutoffRisk;
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
}
