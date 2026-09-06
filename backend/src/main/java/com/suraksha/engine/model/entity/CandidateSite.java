package com.suraksha.engine.model.entity;

import com.suraksha.engine.model.enums.SiteType;
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
@Table(name = "candidate_sites")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidateSite {

    @Id
    @Column(name = "id", length = 64, nullable = false)
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "site_type", length = 32, nullable = false)
    private SiteType siteType;

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @Column(name = "usable_area_sqm", nullable = false)
    private Double usableAreaSqm;

    @Column(name = "water_supply_lpd", nullable = false)
    private Double waterSupplyLpd;

    @Column(name = "toilet_count", nullable = false)
    private Integer toiletCount;

    @Column(name = "existing_occupancy", nullable = false)
    @Builder.Default
    private Integer existingOccupancy = 0;

    @Column(name = "allocated_population", nullable = false)
    @Builder.Default
    private Integer allocatedPopulation = 0;

    @Column(name = "slope_degrees", nullable = false)
    private Double slopeDegrees;

    @Column(name = "multi_route_access", nullable = false)
    @Builder.Default
    private Boolean multiRouteAccess = true;

    @Column(name = "bridge_cutoff_probability", nullable = false)
    private Double bridgeCutoffProbability;

    @Column(name = "hospital_proximity_km", nullable = false)
    private Double hospitalProximityKm;

    @Column(name = "livelihood_proximity_km", nullable = false)
    private Double livelihoodProximityKm;

    public CandidateSite() {
    }

    public CandidateSite(String id, String name, SiteType siteType, Double latitude, Double longitude,
                         Double usableAreaSqm, Double waterSupplyLpd, Integer toiletCount,
                         Integer existingOccupancy, Integer allocatedPopulation, Double slopeDegrees,
                         Boolean multiRouteAccess, Double bridgeCutoffProbability,
                         Double hospitalProximityKm, Double livelihoodProximityKm) {
        this.id = id;
        this.name = name;
        this.siteType = siteType;
        this.latitude = latitude;
        this.longitude = longitude;
        this.usableAreaSqm = usableAreaSqm;
        this.waterSupplyLpd = waterSupplyLpd;
        this.toiletCount = toiletCount;
        this.existingOccupancy = existingOccupancy != null ? existingOccupancy : 0;
        this.allocatedPopulation = allocatedPopulation != null ? allocatedPopulation : 0;
        this.slopeDegrees = slopeDegrees;
        this.multiRouteAccess = multiRouteAccess != null ? multiRouteAccess : true;
        this.bridgeCutoffProbability = bridgeCutoffProbability;
        this.hospitalProximityKm = hospitalProximityKm;
        this.livelihoodProximityKm = livelihoodProximityKm;
    }

    public static CandidateSiteBuilder builder() {
        return new CandidateSiteBuilder();
    }

    public static class CandidateSiteBuilder {
        private String id;
        private String name;
        private SiteType siteType;
        private Double latitude;
        private Double longitude;
        private Double usableAreaSqm;
        private Double waterSupplyLpd;
        private Integer toiletCount;
        private Integer existingOccupancy = 0;
        private Integer allocatedPopulation = 0;
        private Double slopeDegrees;
        private Boolean multiRouteAccess = true;
        private Double bridgeCutoffProbability;
        private Double hospitalProximityKm;
        private Double livelihoodProximityKm;

        public CandidateSiteBuilder id(String id) {
            this.id = id;
            return this;
        }

        public CandidateSiteBuilder name(String name) {
            this.name = name;
            return this;
        }

        public CandidateSiteBuilder siteType(SiteType siteType) {
            this.siteType = siteType;
            return this;
        }

        public CandidateSiteBuilder latitude(Double latitude) {
            this.latitude = latitude;
            return this;
        }

        public CandidateSiteBuilder longitude(Double longitude) {
            this.longitude = longitude;
            return this;
        }

        public CandidateSiteBuilder usableAreaSqm(Double usableAreaSqm) {
            this.usableAreaSqm = usableAreaSqm;
            return this;
        }

        public CandidateSiteBuilder waterSupplyLpd(Double waterSupplyLpd) {
            this.waterSupplyLpd = waterSupplyLpd;
            return this;
        }

        public CandidateSiteBuilder toiletCount(Integer toiletCount) {
            this.toiletCount = toiletCount;
            return this;
        }

        public CandidateSiteBuilder existingOccupancy(Integer existingOccupancy) {
            this.existingOccupancy = existingOccupancy;
            return this;
        }

        public CandidateSiteBuilder allocatedPopulation(Integer allocatedPopulation) {
            this.allocatedPopulation = allocatedPopulation;
            return this;
        }

        public CandidateSiteBuilder slopeDegrees(Double slopeDegrees) {
            this.slopeDegrees = slopeDegrees;
            return this;
        }

        public CandidateSiteBuilder multiRouteAccess(Boolean multiRouteAccess) {
            this.multiRouteAccess = multiRouteAccess;
            return this;
        }

        public CandidateSiteBuilder bridgeCutoffProbability(Double bridgeCutoffProbability) {
            this.bridgeCutoffProbability = bridgeCutoffProbability;
            return this;
        }

        public CandidateSiteBuilder hospitalProximityKm(Double hospitalProximityKm) {
            this.hospitalProximityKm = hospitalProximityKm;
            return this;
        }

        public CandidateSiteBuilder livelihoodProximityKm(Double livelihoodProximityKm) {
            this.livelihoodProximityKm = livelihoodProximityKm;
            return this;
        }

        public CandidateSite build() {
            return new CandidateSite(id, name, siteType, latitude, longitude, usableAreaSqm,
                    waterSupplyLpd, toiletCount, existingOccupancy, allocatedPopulation,
                    slopeDegrees, multiRouteAccess, bridgeCutoffProbability, hospitalProximityKm, livelihoodProximityKm);
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

    public SiteType getSiteType() {
        return siteType;
    }

    public void setSiteType(SiteType siteType) {
        this.siteType = siteType;
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

    public Double getUsableAreaSqm() {
        return usableAreaSqm;
    }

    public void setUsableAreaSqm(Double usableAreaSqm) {
        this.usableAreaSqm = usableAreaSqm;
    }

    public Double getWaterSupplyLpd() {
        return waterSupplyLpd;
    }

    public void setWaterSupplyLpd(Double waterSupplyLpd) {
        this.waterSupplyLpd = waterSupplyLpd;
    }

    public Integer getToiletCount() {
        return toiletCount;
    }

    public void setToiletCount(Integer toiletCount) {
        this.toiletCount = toiletCount;
    }

    public Integer getExistingOccupancy() {
        return existingOccupancy;
    }

    public void setExistingOccupancy(Integer existingOccupancy) {
        this.existingOccupancy = existingOccupancy;
    }

    public Integer getAllocatedPopulation() {
        return allocatedPopulation;
    }

    public void setAllocatedPopulation(Integer allocatedPopulation) {
        this.allocatedPopulation = allocatedPopulation;
    }

    public Double getSlopeDegrees() {
        return slopeDegrees;
    }

    public void setSlopeDegrees(Double slopeDegrees) {
        this.slopeDegrees = slopeDegrees;
    }

    public Boolean getMultiRouteAccess() {
        return multiRouteAccess;
    }

    public void setMultiRouteAccess(Boolean multiRouteAccess) {
        this.multiRouteAccess = multiRouteAccess;
    }

    public Double getBridgeCutoffProbability() {
        return bridgeCutoffProbability;
    }

    public void setBridgeCutoffProbability(Double bridgeCutoffProbability) {
        this.bridgeCutoffProbability = bridgeCutoffProbability;
    }

    public Double getHospitalProximityKm() {
        return hospitalProximityKm;
    }

    public void setHospitalProximityKm(Double hospitalProximityKm) {
        this.hospitalProximityKm = hospitalProximityKm;
    }

    public Double getLivelihoodProximityKm() {
        return livelihoodProximityKm;
    }

    public void setLivelihoodProximityKm(Double livelihoodProximityKm) {
        this.livelihoodProximityKm = livelihoodProximityKm;
    }
}
