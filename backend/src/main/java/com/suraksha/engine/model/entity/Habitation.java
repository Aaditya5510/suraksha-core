package com.suraksha.engine.model.entity;

import com.suraksha.engine.model.enums.RelocationHorizon;
import com.suraksha.engine.model.enums.RiskZone;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "habitations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Habitation {

    @Id
    @Column(name = "id", length = 64, nullable = false)
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "lat", nullable = false)
    private Double latitude;

    @Column(name = "lng", nullable = false)
    private Double longitude;

    @Column(name = "population", nullable = false)
    private Integer population;

    @Column(name = "slope_deg", nullable = false)
    private Double slopeDegrees;

    @Column(name = "landslide_risk", nullable = false)
    private Double landslideHazardIndex;

    @Column(name = "flood_risk", nullable = false)
    private Double floodRiskIndex;

    @Column(name = "vulnerability_score", nullable = false)
    private Double vulnerabilityFactor;

    @Column(name = "cutoff_risk")
    private Double cutoffRisk;

    @Column(name = "composite_risk", nullable = false)
    private Double compositeRiskIndex;

    @Enumerated(EnumType.STRING)
    @Column(name = "risk_zone", length = 32, nullable = false)
    private RiskZone riskZone;

    @Enumerated(EnumType.STRING)
    @Column(name = "horizon", length = 32, nullable = false)
    private RelocationHorizon horizon;

    @Column(name = "is_permanently_unsuitable")
    @Builder.Default
    private Boolean isPermanentlyUnsuitable = false;

    @Column(name = "red_zone_declared_date")
    private String redZoneDeclaredDate;

    public Habitation() {
    }

    public Habitation(String id, String name, Double latitude, Double longitude, Integer population,
                      Double slopeDegrees, Double landslideHazardIndex, Double floodRiskIndex,
                      Double vulnerabilityFactor, Double cutoffRisk, Double compositeRiskIndex,
                      RiskZone riskZone, RelocationHorizon horizon,
                      Boolean isPermanentlyUnsuitable, String redZoneDeclaredDate) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.population = population;
        this.slopeDegrees = slopeDegrees;
        this.landslideHazardIndex = landslideHazardIndex;
        this.floodRiskIndex = floodRiskIndex;
        this.vulnerabilityFactor = vulnerabilityFactor;
        this.cutoffRisk = cutoffRisk != null ? cutoffRisk : (vulnerabilityFactor != null ? vulnerabilityFactor : 0.0);
        this.compositeRiskIndex = compositeRiskIndex;
        this.riskZone = riskZone;
        this.horizon = horizon;
        this.isPermanentlyUnsuitable = isPermanentlyUnsuitable != null ? isPermanentlyUnsuitable : false;
        this.redZoneDeclaredDate = redZoneDeclaredDate;
    }

    public Habitation(String id, String name, Double lat, Double lng, Integer population,
                      Double slopeDeg, Double landslideRisk, Double floodRisk,
                      Double vulnerabilityScore, Double cutoffRisk, Double compositeRisk,
                      String riskZone, String horizon) {
        this.id = id;
        this.name = name;
        this.latitude = lat;
        this.longitude = lng;
        this.population = population;
        this.slopeDegrees = slopeDeg;
        this.landslideHazardIndex = landslideRisk;
        this.floodRiskIndex = floodRisk;
        this.vulnerabilityFactor = vulnerabilityScore;
        this.cutoffRisk = cutoffRisk;
        this.compositeRiskIndex = compositeRisk;
        this.riskZone = riskZone != null ? RiskZone.valueOf(riskZone) : null;
        this.horizon = horizon != null ? RelocationHorizon.valueOf(horizon) : null;
        this.isPermanentlyUnsuitable = false;
    }

    public static HabitationBuilder builder() {
        return new HabitationBuilder();
    }

    public static class HabitationBuilder {
        private String id;
        private String name;
        private Double latitude;
        private Double longitude;
        private Integer population;
        private Double slopeDegrees;
        private Double landslideHazardIndex;
        private Double floodRiskIndex;
        private Double vulnerabilityFactor;
        private Double cutoffRisk;
        private Double compositeRiskIndex;
        private RiskZone riskZone;
        private RelocationHorizon horizon;
        private Boolean isPermanentlyUnsuitable = false;
        private String redZoneDeclaredDate;

        public HabitationBuilder id(String id) {
            this.id = id;
            return this;
        }

        public HabitationBuilder name(String name) {
            this.name = name;
            return this;
        }

        public HabitationBuilder latitude(Double latitude) {
            this.latitude = latitude;
            return this;
        }

        public HabitationBuilder longitude(Double longitude) {
            this.longitude = longitude;
            return this;
        }

        public HabitationBuilder population(Integer population) {
            this.population = population;
            return this;
        }

        public HabitationBuilder slopeDegrees(Double slopeDegrees) {
            this.slopeDegrees = slopeDegrees;
            return this;
        }

        public HabitationBuilder landslideHazardIndex(Double landslideHazardIndex) {
            this.landslideHazardIndex = landslideHazardIndex;
            return this;
        }

        public HabitationBuilder floodRiskIndex(Double floodRiskIndex) {
            this.floodRiskIndex = floodRiskIndex;
            return this;
        }

        public HabitationBuilder vulnerabilityFactor(Double vulnerabilityFactor) {
            this.vulnerabilityFactor = vulnerabilityFactor;
            return this;
        }

        public HabitationBuilder cutoffRisk(Double cutoffRisk) {
            this.cutoffRisk = cutoffRisk;
            return this;
        }

        public HabitationBuilder compositeRiskIndex(Double compositeRiskIndex) {
            this.compositeRiskIndex = compositeRiskIndex;
            return this;
        }

        public HabitationBuilder riskZone(RiskZone riskZone) {
            this.riskZone = riskZone;
            return this;
        }

        public HabitationBuilder horizon(RelocationHorizon horizon) {
            this.horizon = horizon;
            return this;
        }

        public HabitationBuilder isPermanentlyUnsuitable(Boolean isPermanentlyUnsuitable) {
            this.isPermanentlyUnsuitable = isPermanentlyUnsuitable;
            return this;
        }

        public HabitationBuilder redZoneDeclaredDate(String redZoneDeclaredDate) {
            this.redZoneDeclaredDate = redZoneDeclaredDate;
            return this;
        }

        public Habitation build() {
            return new Habitation(id, name, latitude, longitude, population, slopeDegrees,
                    landslideHazardIndex, floodRiskIndex, vulnerabilityFactor, cutoffRisk,
                    compositeRiskIndex, riskZone, horizon, isPermanentlyUnsuitable, redZoneDeclaredDate);
        }
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

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Integer getPopulation() {
        return population;
    }

    public void setPopulation(Integer population) {
        this.population = population;
    }

    public Double getSlopeDegrees() {
        return slopeDegrees;
    }

    public void setSlopeDegrees(Double slopeDegrees) {
        this.slopeDegrees = slopeDegrees;
    }

    public Double getLandslideHazardIndex() {
        return landslideHazardIndex;
    }

    public void setLandslideHazardIndex(Double landslideHazardIndex) {
        this.landslideHazardIndex = landslideHazardIndex;
    }

    public Double getFloodRiskIndex() {
        return floodRiskIndex;
    }

    public void setFloodRiskIndex(Double floodRiskIndex) {
        this.floodRiskIndex = floodRiskIndex;
    }

    public Double getVulnerabilityFactor() {
        return vulnerabilityFactor;
    }

    public void setVulnerabilityFactor(Double vulnerabilityFactor) {
        this.vulnerabilityFactor = vulnerabilityFactor;
    }

    public Double getCompositeRiskIndex() {
        return compositeRiskIndex;
    }

    public void setCompositeRiskIndex(Double compositeRiskIndex) {
        this.compositeRiskIndex = compositeRiskIndex;
    }

    public RiskZone getRiskZone() {
        return riskZone;
    }

    public void setRiskZone(RiskZone riskZone) {
        this.riskZone = riskZone;
    }

    public void setRiskZone(String riskZoneStr) {
        if (riskZoneStr != null) {
            this.riskZone = RiskZone.valueOf(riskZoneStr);
        }
    }

    public RelocationHorizon getHorizon() {
        return horizon;
    }

    public void setHorizon(RelocationHorizon horizon) {
        this.horizon = horizon;
    }

    public void setHorizon(String horizonStr) {
        if (horizonStr != null) {
            this.horizon = RelocationHorizon.valueOf(horizonStr);
        }
    }

    public Boolean getIsPermanentlyUnsuitable() {
        return isPermanentlyUnsuitable;
    }

    public void setIsPermanentlyUnsuitable(Boolean isPermanentlyUnsuitable) {
        this.isPermanentlyUnsuitable = isPermanentlyUnsuitable;
    }

    public String getRedZoneDeclaredDate() {
        return redZoneDeclaredDate;
    }

    public void setRedZoneDeclaredDate(String redZoneDeclaredDate) {
        this.redZoneDeclaredDate = redZoneDeclaredDate;
    }

    public Double getLat() {
        return latitude;
    }

    public void setLat(Double lat) {
        this.latitude = lat;
    }

    public Double getLng() {
        return longitude;
    }

    public void setLng(Double lng) {
        this.longitude = lng;
    }

    public Double getSlopeDeg() {
        return slopeDegrees;
    }

    public void setSlopeDeg(Double slopeDeg) {
        this.slopeDegrees = slopeDeg;
    }

    public Double getLandslideRisk() {
        return landslideHazardIndex;
    }

    public void setLandslideRisk(Double landslideRisk) {
        this.landslideHazardIndex = landslideRisk;
    }

    public Double getFloodRisk() {
        return floodRiskIndex;
    }

    public void setFloodRisk(Double floodRisk) {
        this.floodRiskIndex = floodRisk;
    }

    public Double getVulnerabilityScore() {
        return vulnerabilityFactor;
    }

    public void setVulnerabilityScore(Double vulnerabilityScore) {
        this.vulnerabilityFactor = vulnerabilityScore;
    }

    public Double getCutoffRisk() {
        return cutoffRisk != null ? cutoffRisk : (vulnerabilityFactor != null ? vulnerabilityFactor : 0.0);
    }

    public void setCutoffRisk(Double cutoffRisk) {
        this.cutoffRisk = cutoffRisk;
    }

    public Double getCompositeRisk() {
        return compositeRiskIndex;
    }

    public void setCompositeRisk(Double compositeRisk) {
        this.compositeRiskIndex = compositeRisk;
    }
}
